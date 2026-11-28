// Service-worker update check: serve the previous build, install it, replace the files with the new build,
// reload, and confirm the page, About version and cache all move to the new build (old cache deleted).
// Usage: node sw_update.js <served dir> <new build dir> <port>
const pw=require('playwright');const fs=require('fs');const path=require('path');
const [dir,newDir,port]=[process.argv[2],process.argv[3],process.argv[4]||'8766'];const U=`http://127.0.0.1:${port}/`;
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext();const p=await ctx.newPage();
 const state=async()=>p.evaluate(async()=>({ver:(document.body.innerHTML.match(/2026\.11-[a-z0-9]+(?= \(evaluation)/)||[''])[0],caches:await caches.keys(),ctl:!!navigator.serviceWorker.controller}));
 await p.goto(U);await p.waitForTimeout(2500);await p.reload();await p.waitForTimeout(1500);const before=await state();
 for(const f of ['index.html','sw.js','manifest.webmanifest','THIRD_PARTY_NOTICES.txt'])fs.copyFileSync(path.join(newDir,f),path.join(dir,f));
 await p.reload();await p.waitForTimeout(3000);await p.reload();await p.waitForTimeout(1500);const after=await state();
 const newKey=(fs.readFileSync(path.join(newDir,'sw.js'),'utf8').match(/cmr-ref-[0-9a-f]+/)||[''])[0];
 const ok=before.ctl&&after.ver!==before.ver&&after.caches.length===1&&after.caches[0]===newKey;
 console.log(JSON.stringify({before,after,newKey,pass:ok}));await b.close();process.exit(ok?0:1)})();
