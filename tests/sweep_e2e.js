// End-to-end sweep of every page and control in the built app (synthetic values only).
// Checks: page errors, console errors, failed requests, NaN/undefined/Infinity in results or copied text,
// every selector/segment option, Clear page, New patient (two taps), copy, horizontal overflow at several
// viewports (details expanded), 150% zoom reflow, keyboard focus order on LV, favorites/recent persistence, search.
const pw=require('playwright');const fs=require('fs');
const URL=process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html';
const out=[];const rec=(id,ok,detail)=>{out.push({id,pass:!!ok,detail:String(detail).slice(0,300)});if(!ok)console.log('FAIL',id,'|',String(detail).slice(0,200))};
const BAD=/\bNaN\b|undefined|Infinity|\[object|\bnull\b(?! result)/;
const UNITV={'mL':'100','%':'40','ms':'1000','m²':'1.9','mmHg':'20','m/s':'2','cm²':'1.5','g':'120','min':'15','s⁻¹':'100','mm':'32','cm':'170','kg':'70','in':'67','lb':'154','y':'50','n':'20','g/mL':'0.4','cm/s':'100'};
(async()=>{const b=await pw.chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});await ctx.grantPermissions(['clipboard-read','clipboard-write']).catch(()=>{});
 const p=await ctx.newPage();const errs=[],cons=[],fails=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')cons.push(m.text())});p.on('requestfailed',r=>fails.push(r.url()));
 const open=async id=>{await p.goto(URL+'#'+id);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload();await p.waitForTimeout(250)};
 const resText=()=>p.evaluate(()=>{const r=document.getElementById('results');return r?r.innerText:''});
 const clip=async()=>{await p.evaluate(()=>navigator.clipboard.writeText('SENTINEL')).catch(()=>{});const c=await p.$('[data-copyres]');if(!c)return null;await c.click();await p.waitForTimeout(250);return p.evaluate(()=>navigator.clipboard.readText()).catch(()=>'ERR')};
 // page list from the desktop sidebar (every calculator and reference page)
 await open('');const ids=await p.evaluate(()=>[...new Set([...document.querySelectorAll('#side [data-open],#app [data-open]')].map(x=>x.dataset.open))]);
 for(const g of ids.slice()){await p.goto(URL+'#'+g);await p.reload();await p.waitForTimeout(150);for(const t of await p.$$eval('[data-vtab]',a=>a.map(x=>x.dataset.vtab+(x.dataset.vv?'|'+x.dataset.vv:''))))if(!ids.includes(t.split('|')[0]))ids.push(t.split('|')[0])}
 rec('PAGES-listed',ids.length>=30,ids.length+' pages: '+ids.join(','));
 const fillAll=async()=>{const ins=await p.$$('#app .row input[type=number]');for(const i of ins){if(!(await i.isVisible()))continue;const u=await i.evaluate(e=>{const r=e.closest('.row');return ((r&&r.querySelector('.u'))||{}).textContent||''});const id=await i.getAttribute('id');
   let v=UNITV[u.trim()]||'50';if(/esv|^b-|lvsv|rvsv|rev|pf|min|mpost|bpost|ra$/.test(id||''))v=String(Math.round(parseFloat(v)*0.5*100)/100);if(/hct/.test(id))v='42';if(/mpost/.test(id))v='450';if(/bpost/.test(id))v='300';if(/bpre/.test(id))v='1600';
   await i.fill(v);await i.dispatchEvent('input')}await p.waitForTimeout(700)};
 for(const id of ids){errs.length=0;cons.length=0;await open(id);
  const hasRes=await p.$('#results');
  if(hasRes){await fillAll();let t=await resText();rec(`FILL-${id}`,!BAD.test(t)&&errs.length===0,t.replace(/\s+/g,' ').slice(0,160)+(errs.length?' ERR '+errs.join(';'):''));
   // every segment / selector option
   const segSel='#app [data-method],#app [data-ctx],#app [data-sex],#app [data-aosex],#app [data-ironf]';
   const nseg=(await p.$$(segSel)).length;for(let k=0;k<nseg;k++){const s=(await p.$$(segSel))[k];if(!s||!(await s.isVisible()))continue;await s.click();await p.waitForTimeout(200);t=await resText();if(BAD.test(t)||errs.length){rec(`SEG-${id}-${k}`,false,t.slice(0,160)+errs.join(';'))}}
   const sels=await p.$$eval('#app select',a=>a.map(s=>({id:s.id,n:s.options.length})));
   for(const s of sels){for(let o=0;o<s.n;o++){const el=await p.$('#'+s.id);if(!el)break;const n2=await el.evaluate(e=>e.options.length);if(o>=n2)break;await el.selectOption({index:o},{timeout:3000}).catch(()=>{});await p.waitForTimeout(150);t=await resText();if(BAD.test(t)||errs.length){rec(`SEL-${id}-${s.id}-${o}`,false,t.slice(0,160)+errs.join(';'));break}}}
   rec(`OPTIONS-${id}`,errs.length===0,`${nseg} segment buttons, ${sels.length} selectors exercised`);
   await fillAll();const c=await clip();rec(`COPY-${id}`,c===null||(c!=='SENTINEL'&&!BAD.test(c)),c===null?'no copy button':c.slice(0,160));
   // clear page
   const cl=await p.$('[data-reset]');if(cl){await cl.click();await p.waitForTimeout(300);const left=await p.$$eval('#app .row input[type=number]',a=>a.filter(i=>i.value!==''&&!/bsa|age|^h-|^w-/.test(i.id)).map(i=>i.id+'='+i.value));rec(`CLEAR-${id}`,left.length===0,left.join(',')||'all measurement fields empty')}
   // new patient: first tap arms, second clears
   await fillAll();const np=await p.$('[data-newpt]');if(np){await np.click();await p.waitForTimeout(150);const armed=await p.$eval('[data-newpt]',e=>e.textContent);const still=await p.$$eval('#app .row input[type=number]',a=>a.some(i=>i.value!==''));await p.click('[data-newpt]');await p.waitForTimeout(300);
    const left=await p.$$eval('#app .row input[type=number]',a=>a.filter(i=>i.value!=='').map(i=>i.id+'='+i.value));const pop=await p.$$eval('#app [data-sex].on',a=>a.length);
    rec(`NEWPT-${id}`,/Tap again/.test(armed)&&still&&left.length===0&&pop===0,`armed="${armed}" valuesKeptAfterFirstTap=${still} after=${left.join(',')||'empty'} popSelected=${pop}`)}}
  else{const t=await p.evaluate(()=>document.getElementById('app').innerText);rec(`PAGE-${id}`,!BAD.test(t)&&errs.length===0&&t.length>200,t.replace(/\s+/g,' ').slice(0,120))}
  if(cons.length)rec(`CONSOLE-${id}`,false,cons.join(';'))}
 // invalid / implausible inputs
 await open('lv-vol');await p.click('.incard [data-sex=m]');for(const [k,v] of [['a','-5'],['b','40']]){await p.fill('#'+k+'-lv-vol',v);await p.dispatchEvent('#'+k+'-lv-vol','input')}await p.waitForTimeout(1200);
 {const w=await p.evaluate(()=>[!!document.getElementById('warnbar'),document.getElementById('results').classList.contains('held'),document.getElementById('a-lv-vol').getAttribute('aria-invalid')]);const c=await clip();rec('INVALID-negative',w[0]&&w[1]&&w[2]==='true'&&!/EDV -5/.test(c||''),JSON.stringify(w)+' copy:'+String(c).slice(0,80))}
 await p.fill('#a-lv-vol','5000');await p.dispatchEvent('#a-lv-vol','input');await p.waitForTimeout(1200);{const w=await p.evaluate(()=>!!document.getElementById('warnbar'));rec('INVALID-implausible',w,'EDV 5000 flagged='+w)}
 await p.fill('#a-lv-vol','');await p.dispatchEvent('#a-lv-vol','input');await p.fill('#b-lv-vol','');await p.dispatchEvent('#b-lv-vol','input');await p.waitForTimeout(1000);{const t=await resText();rec('MISSING-empty',/Enter volumes/.test(t),t.slice(0,100))}
 // stale: change input after copy
 await p.fill('#a-lv-vol','150');await p.dispatchEvent('#a-lv-vol','input');await p.fill('#b-lv-vol','60');await p.dispatchEvent('#b-lv-vol','input');await p.waitForTimeout(800);const c1=await clip();
 await p.fill('#b-lv-vol','90');await p.dispatchEvent('#b-lv-vol','input');await p.waitForTimeout(800);const c2=await clip();
 rec('STALE-copy-after-edit',/EF 60\.0%/.test(c1)&&/EF 40\.0%/.test(c2)&&!/EF 60\.0%/.test(c2),c1.slice(90,200)+' || '+c2.slice(90,200));
 {const s=await p.evaluate(()=>{const r=document.getElementById('rsum');return r?r.textContent:''});rec('STALE-strip',!/60\.0/.test(s),s)}
 // range bar toggle persists
 await p.click('[data-bars]');await p.waitForTimeout(200);await p.reload();await p.waitForTimeout(400);
 {const on=await p.evaluate(()=>document.body.classList.contains('bars-on'));rec('BARS-persist',on,'bars-on after reload='+on);await p.evaluate(()=>{try{localStorage.removeItem('cmr-bars')}catch(e){}})}
 // favorites and recent persist; search finds tools
 await open('');await p.click('.cgrid [data-open="ecv"]');await p.waitForTimeout(400);await p.click('.dhead [data-fav]');await p.waitForTimeout(200);
 {const pr=await p.$eval('.dhead [data-fav]',e=>[e.getAttribute('aria-pressed'),e.getAttribute('aria-label')]);await p.goto(URL);await p.reload();await p.waitForTimeout(400);const home=await p.evaluate(()=>document.getElementById('app').innerText);rec('FAV-persist',pr[0]==='true'&&/Favorites[\s\S]*T1, T2 and ECV/i.test(home)&&/Recent/i.test(home),JSON.stringify(pr)+' '+home.slice(0,200).replace(/\s+/g,' '))}
 await p.click('#nav-search');await p.waitForTimeout(300);await p.fill('#app input[type=search],#app input',' ECV');await p.dispatchEvent('#app input','input');await p.waitForTimeout(400);
 {const t=await p.evaluate(()=>document.getElementById('app').innerText);rec('SEARCH-ecv',/ECV calculator/i.test(t),t.replace(/\s+/g,' ').slice(0,160))}
 // report page builds from entered values and copies
 await open('lv-vol');await p.click('.incard [data-sex=f]');for(const [k,v] of [['bsa','1.8'],['a','140'],['b','60']]){await p.fill('#'+k+'-lv-vol',v);await p.dispatchEvent('#'+k+'-lv-vol','input')}await p.waitForTimeout(600);
 await p.click('#nav-report');await p.waitForTimeout(500);{const t=await p.evaluate(()=>document.getElementById('app').innerText);const b2=await p.$('[data-rcopy]');let c='';if(b2){await p.evaluate(()=>navigator.clipboard.writeText('S'));await b2.click();await p.waitForTimeout(300);c=await p.evaluate(()=>navigator.clipboard.readText())}
  rec('REPORT-build',/LVEF|EF/.test(t)&&/Adult female/.test(c||t)&&!BAD.test(c),t.replace(/\s+/g,' ').slice(0,140)+' || '+String(c).slice(0,120))}
 // keyboard focus order on LV follows the visual order and is visible
 await open('lv-vol');{const seq=[];for(let k=0;k<16;k++){await p.keyboard.press('Tab');seq.push(await p.evaluate(()=>{const e=document.activeElement;const r=e.getBoundingClientRect();const cs=getComputedStyle(e);return {t:(e.getAttribute('aria-label')||e.textContent||e.id||e.tagName).trim().slice(0,24),y:Math.round(r.top+scrollY),ring:cs.outlineStyle!=='none'||cs.boxShadow!=='none'}}))}
  let mono=true;for(let k=1;k<seq.length;k++)if(seq[k].y+4<seq[k-1].y&&seq[k].y>120)mono=false;rec('KEYBOARD-order-LV',mono,seq.map(x=>x.t+'@'+x.y).join(' > '));rec('KEYBOARD-focus-visible',seq.every(x=>x.ring),seq.filter(x=>!x.ring).map(x=>x.t).join(',')||'all visible')}
 // layout: no horizontal scroll at each viewport, all details expanded
 const VPS=[['phone-320',320,640],['phone-390',390,844],['landscape-844',844,390],['tablet-768',768,1024],['desktop-1280',1280,800]];
 for(const [nm,w,h] of VPS){await p.setViewportSize({width:w,height:h});const bad=[];for(const id of ['',...ids]){await p.goto(URL+(id?'#'+id:''));await p.reload();await p.waitForTimeout(200);
   if(id==='lv-vol'){await p.click('.incard [data-sex=m]');await p.fill('#a-lv-vol','150');await p.dispatchEvent('#a-lv-vol','input');await p.fill('#b-lv-vol','60');await p.dispatchEvent('#b-lv-vol','input');await p.waitForTimeout(400)}
   await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));await p.waitForTimeout(80);
   const o=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(o>1)bad.push((id||'home')+':'+o)}
  rec(`OVERFLOW-${nm}`,bad.length===0,bad.join(',')||'none')}
 // 150% page zoom at 390 px (reflow approximation of larger text)
 await p.setViewportSize({width:390,height:844});{const bad=[];for(const id of ['',...ids]){await p.goto(URL+(id?'#'+id:''));await p.reload();await p.addStyleTag({content:'html{zoom:1.5}'});await p.waitForTimeout(150);const o=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);if(o>1)bad.push((id||'home')+':'+o)}rec('ZOOM150-390',bad.length===0,bad.join(',')||'none')}
 rec('NO-FAILED-REQUESTS',fails.length===0,fails.join(',')||'none');
 fs.writeFileSync('results-sweep.json',JSON.stringify(out,null,1));console.log('sweep total',out.length,'fail',out.filter(x=>!x.pass).length);await b.close()})();
