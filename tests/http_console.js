// Loads every page over http (service worker active) and records console errors, page errors and failed requests.
const pw=require('playwright');(async()=>{const U=process.argv[2]||'http://127.0.0.1:8765/';const b=await pw.chromium.launch();const p=await b.newPage();const bad=[];
p.on('console',m=>{if(m.type()==='error')bad.push('console:'+m.text())});p.on('pageerror',e=>bad.push('pageerror:'+e.message));p.on('requestfailed',r=>bad.push('failed:'+r.url()));
await p.goto(U);await p.waitForTimeout(1500);const ids=await p.evaluate(()=>[...new Set([...document.querySelectorAll('#side [data-open],#app [data-open]')].map(x=>x.dataset.open))]);
for(const id of ids){await p.goto(U+'#'+id);await p.reload();await p.waitForTimeout(250)}
console.log(JSON.stringify({pages:ids.length,problems:bad}));await b.close();process.exit(bad.length?1:0)})();
