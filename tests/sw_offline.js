// Chromium: service worker registers on http://localhost, cache name matches sw.js, app and notices load offline.
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext();const p=await ctx.newPage();
await p.goto('http://localhost:8765/');await p.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.controller||false,null,{timeout:15000}).catch(()=>{});await p.reload();await p.waitForTimeout(1500);
const keys=await p.evaluate(async()=>{const k=await caches.keys();const c=await caches.open(k[0]);return {k,files:(await c.keys()).map(r=>new URL(r.url).pathname)}});
await ctx.setOffline(true);await p.reload();await p.waitForTimeout(800);const t=await p.evaluate(()=>document.body.innerText.slice(0,80));
const n=await p.evaluate(async()=>{try{const r=await fetch('THIRD_PARTY_NOTICES.txt');return (await r.text()).slice(0,40)}catch(e){return 'ERR '+e.message}});
console.log(JSON.stringify(keys));console.log('offline page:',t.replace(/\s+/g,' '));console.log('offline notices:',n);await b.close()})();
