# Build: expects a working tree <W>/build/build.py with <W>/cmr-ref/index.html (copy of src/index.html),
# <W>/fontpkg/node_modules/@fontsource/* and <W>/ocrpkg/node_modules (tesseract.js 5.1.1, tesseract.js-core, eng traineddata).
# Output: <W>/build/dist (PWA), CMR-Reference-offline.html, CMR-Reference-PWA.zip.
# Also needs build/licenses/THIRD_PARTY_NOTICES.txt (copied to dist and listed in the service-worker cache).
import base64,re,os,shutil,hashlib,zipfile,json
B=os.path.dirname(os.path.abspath(__file__));S=os.path.dirname(B)
src=open(os.path.join(S,'cmr-ref/index.html')).read()
F=os.path.join(S,'fontpkg/node_modules/@fontsource')
fonts=[('Inter','inter',w) for w in (400,500,600)]+[('Barlow Semi Condensed','barlow-semi-condensed',w) for w in (500,600,700)]+[('IBM Plex Mono','ibm-plex-mono',w) for w in (400,500)]
ff=''.join("@font-face{font-family:'%s';font-style:normal;font-weight:%d;font-display:swap;src:url(data:font/woff2;base64,%s) format('woff2')}\n"%(fam,w,base64.b64encode(open(f'{F}/{d}/files/{d}-latin-{w}-normal.woff2','rb').read()).decode()) for fam,d,w in fonts)
# strip Google Fonts links
body=re.sub(r'<link rel="preconnect"[^>]*>\n?','',src)
body=re.sub(r'<link rel="stylesheet" href="https://fonts.googleapis.com[^>]*>\n?','',body)
title=re.search(r'<title>.*?</title>\n?',body).group(0);body=body.replace(title,'',1)
body=body.replace('<meta name="claude:viewport-fit-sides" content="cover">\n','')
body=body.replace('<style>','<style>\n'+ff,1)
install_js=r"""
<script>
(function(){
 // Offline support: register the service worker when served over http(s)
 if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
  window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});
 }
 // Install prompt (Chrome/Edge/Android); iOS uses Share > Add to Home Screen
 var deferred=null;
 function banner(html){var d=document.getElementById('installbar');if(!d){d=document.createElement('div');d.id='installbar';d.style.cssText='position:fixed;left:12px;right:12px;bottom:calc(76px + env(safe-area-inset-bottom,0px));z-index:20;max-width:596px;margin:0 auto;background:var(--band);color:var(--band-ink);border-radius:14px;padding:12px 14px;display:flex;gap:10px;align-items:center;font-size:13.5px;box-shadow:0 6px 24px rgba(0,0,0,.25)';document.body.appendChild(d)}d.innerHTML=html;return d}
 function dismissed(){try{return localStorage.getItem('cmr-install-dismissed')==='1'}catch(e){return false}}
 function dismiss(){try{localStorage.setItem('cmr-install-dismissed','1')}catch(e){}var d=document.getElementById('installbar');if(d)d.remove()}
 window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();deferred=e;if(dismissed())return;
  var d=banner('<span style="flex:1">Install CMR Reference for offline use in the reading room.</span><button id="ib-go" style="background:var(--accent);color:var(--accent-ink);border:0;border-radius:9px;padding:7px 12px;font-weight:600;cursor:pointer">Install</button><button id="ib-x" aria-label="Dismiss" style="background:none;border:0;color:inherit;font-size:18px;cursor:pointer">×</button>');
  d.querySelector('#ib-go').onclick=function(){deferred.prompt();deferred.userChoice.finally(function(){deferred=null;dismiss()})};d.querySelector('#ib-x').onclick=dismiss});
 var ios=/iphone|ipad|ipod/i.test(navigator.userAgent),standalone=window.navigator.standalone||matchMedia('(display-mode: standalone)').matches;
 if(ios&&!standalone&&/^https:$/.test(location.protocol)&&!dismissed()){window.addEventListener('load',function(){var d=banner('<span style="flex:1">To install: tap <b>Share</b>, then <b>Add to Home Screen</b>. It then works offline.</span><button id="ib-x" aria-label="Dismiss" style="background:none;border:0;color:inherit;font-size:18px;cursor:pointer">×</button>');d.querySelector('#ib-x').onclick=dismiss})}
 // Offline status chip
 function net(){var c=document.getElementById('netchip');if(!navigator.onLine){if(!c){c=document.createElement('div');c.id='netchip';c.textContent='Offline · all data available';c.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:calc(72px + env(safe-area-inset-bottom,0px));z-index:20;box-shadow:0 2px 8px rgba(0,0,0,.15);background:var(--ok-soft);color:var(--ok);border-radius:999px;padding:4px 10px;font:600 12px var(--body)';document.body.appendChild(c)}}else if(c)c.remove()}
 window.addEventListener('online',net);window.addEventListener('offline',net);net();
})();
</script>"""
head=f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{title.strip()}
<meta name="description" content="CMR normal values (SCMR 2025), outcome-based severity grading and calculators. Works offline.">
<meta name="theme-color" content="#1c2559">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="CMR Ref">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}}body{{margin:0;font:14px system-ui,sans-serif}}img{{max-width:100%}}[hidden]{{display:none!important}}</style>
</head>
<body>
'''
page=head+body+install_js+'\n</body>\n</html>\n'
NOTICES=open(os.path.join(B,'licenses','THIRD_PARTY_NOTICES.txt'),encoding='utf-8').read()
ver=hashlib.sha1((page+NOTICES).encode()).hexdigest()[:10]
D=os.path.join(B,'dist');os.makedirs(D,exist_ok=True)
open(os.path.join(D,'index.html'),'w').write(page)
open(os.path.join(D,'THIRD_PARTY_NOTICES.txt'),'w',encoding='utf-8').write(NOTICES)
O=os.path.join(D,'ocr');shutil.rmtree(O,ignore_errors=True);os.makedirs(O+'/lang')
N=os.path.join(S,'ocrpkg/node_modules')
for a,b in [('tesseract.js/dist/tesseract.min.js','tesseract.min.js'),('tesseract.js/dist/worker.min.js','worker.min.js'),('tesseract.js-core/tesseract-core-simd-lstm.wasm.js','tesseract-core-simd-lstm.wasm.js'),('@tesseract.js-data/eng/4.0.0_best_int/eng.traineddata.gz','lang/eng.traineddata.gz')]:
    shutil.copy(os.path.join(N,a),os.path.join(O,b))
json.dump({"name":"CMR Reference","short_name":"CMR Ref","description":"CMR normal values, severity grading and calculators","start_url":"./","scope":"./","display":"standalone","orientation":"portrait","background_color":"#f1f1f6","theme_color":"#1c2559",
 "icons":[{"src":"icon-192.png","sizes":"192x192","type":"image/png","purpose":"any"},{"src":"icon-512.png","sizes":"512x512","type":"image/png","purpose":"any"},{"src":"icon-maskable.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]},open(os.path.join(D,'manifest.webmanifest'),'w'),indent=1)
open(os.path.join(D,'sw.js'),'w').write(f"""// CMR Reference service worker: caches the whole app for offline use
const CACHE='cmr-ref-{ver}';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable.png','./apple-touch-icon.png','./THIRD_PARTY_NOTICES.txt'];
self.addEventListener('install',e=>{{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))}});
self.addEventListener('activate',e=>{{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))}});
self.addEventListener('fetch',e=>{{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 // network-first for the page so updates arrive when online; cache-first for everything else
 if(r.mode==='navigate'){{e.respondWith(fetch(r).then(res=>{{const c=res.clone();caches.open(CACHE).then(x=>x.put('./index.html',c));return res}}).catch(()=>caches.match('./index.html')));return}}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{{const c=res.clone();caches.open(CACHE).then(x=>x.put(r,c));return res}})));
}});
""")
open(os.path.join(D,'README.txt'),'w').write("""CMR Reference — installable offline app

Host these files on any static HTTPS site (GitHub Pages, Netlify, your hospital intranet). Then:
- iPhone/iPad (Safari): open the site, tap Share > Add to Home Screen.
- Android/Chrome/Edge: open the site, tap Install (or menu > Install app).
After the first visit everything (data, fonts, calculators) is cached and works with no network.
Updates: when online, the app fetches the newest version automatically.

Offline single file: CMR-Reference-offline.html opens in any browser with no network, but cannot be "installed".
""")
# standalone single file (no SW, no manifest)
single=page.replace('const SCAN_OK=/^https?:$/.test(location.protocol);','const SCAN_OK=false;').replace('<link rel="manifest" href="manifest.webmanifest">\n','').replace('<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">\n','').replace('<link rel="apple-touch-icon" href="apple-touch-icon.png">\n','')
open(os.path.join(B,'CMR-Reference-offline.html'),'w').write(single)
z=os.path.join(B,'CMR-Reference-PWA.zip')
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as zf:
    for r,_,fs in os.walk(D):
        for f in sorted(fs):
            fp=os.path.join(r,f);zf.write(fp,'CMR-Reference/'+os.path.relpath(fp,D))
print('version',ver,'index',len(page)//1024,'KB; zip',os.path.getsize(z)//1024,'KB')
