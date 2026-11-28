// Runs the owner-review cases (docs/OWNER_CHECKLIST.md, section C) exactly as written and records what the
// build shows on screen and in copied text. Output: results/owner-cases.json. Synthetic values only.
// Usage: node owner_cases.js   (CMR_URL may point at another build)
const mk=require('./harness2');const fs=require('fs');
(async()=>{const H=await mk('chromium');const p=H.p;await H.ctx.grantPermissions(['clipboard-read','clipboard-write']).catch(()=>{});
const out=[];
const clip=async()=>{await p.evaluate(()=>navigator.clipboard.writeText('(nothing copied)')).catch(()=>{});const b=await p.$('[data-copyres]');if(b){await b.click();await p.waitForTimeout(300)}try{return await p.evaluate(()=>navigator.clipboard.readText())}catch(e){return 'ERR'}};
const row=async(lab)=>{const rs=await H.rows();const r=rs.find(x=>x.lab===lab)||{};return (r.val||'—')+' | '+(r.pills||[]).join(' | ')};
const cham=async(id,pop,o,vals)=>{await H.open(id);if(pop)await H.pop(pop);if(o&&Object.keys(o).length)await H.settings(o);for(const [k,v] of Object.entries(vals))await H.fill(`#${k}-${id}`,v)};
const av=async(id,o)=>{await H.open(id);for(const [k,v] of Object.entries(o)){if(['m','t'].includes(k))await H.sel('#av-'+k,v);else await H.fill('#av-'+k,v)}};
const rec=async(id,lab)=>{const s=lab?await row(lab):(await H.text()).replace(/\s+/g,' ').slice(0,220);const c=await clip();out.push({id,screen:s,copy:c.replace(/\s+/g,' ').slice(0,260)})};
await cham('lv-vol','m',{},{a:100,b:47.4});await rec('P1','LVEF');
await cham('lv-vol','m',{},{a:100,b:47.04});await rec('P2','LVEF');
await cham('lv-vol','m',{},{a:100,b:60});await rec('P3','LVEF');
await cham('lv-vol','m',{ctx:'cm',method:'vol'},{bsa:1,a:150});await rec('P4','LVEDV/BSA');
await cham('lv-vol',null,{},{bsa:1,a:120});await rec('P5','LVEDV/BSA');
await cham('lv-vol','',{},{bsa:1,a:120});await rec('P6','LVEDV/BSA'); // eval4: no under-18 option; P6 now records the no-population state
await cham('lv-vol','m',{},{a:100,b:120});await rec('P7');
await cham('la-vol','m',{},{bsa:1,a:56.1});await rec('P8','Max LA volume/BSA');
await cham('la-vol','m',{},{bsa:1,a:62.1});await rec('P9','Max LA volume/BSA');
await av('ar-calc',{fwd:100,rev:32});await rec('P10','Regurgitant fraction');
await av('ar-calc',{ef:55});await rec('P11','LVEF');
await av('tr-calc',{rvsv:100,pf:60});await rec('P12','TR fraction');
await av('pr-calc',{fwd:100,rev:40.1});await rec('P13','PR fraction');
await av('as-calc',{ava:1});await rec('P14','Planimetric AVA');
await av('as-calc',{mg:40});await rec('P15','Mean gradient (PC)');
await H.open('iron');await p.click('[data-ironf="1.5"]');await H.fill('#ir-c',9.9);await rec('P16');
await H.open('iron');await p.click('[data-ironf="3"]');await H.fill('#ir-c',5.4);await rec('P17');
await H.open('iron');await H.fill('#ir-l15',8);await rec('P18');
await H.open('ao-calc');await p.click('[data-aosex=m]');await p.selectOption('#ao-lvl','sinus');await H.fill('#ao-age',25);await H.fill('#ao-d',36.22);await rec('P19');
await H.open('ao-calc');await p.click('[data-aosex=m]');await p.selectOption('#ao-lvl','sinus');await H.fill('#ao-age',19.9);await H.fill('#ao-d',30);await rec('P20');
await av('tr-calc',{lecv:32});await rec('P21','Liver ECV');
await H.open('ecv');for(const [k,v] of Object.entries({hct:0.42,mpre:1000,mpost:450,bpre:1600,bpost:300}))await H.fill('#ecv-'+k,v);await p.waitForTimeout(800);await rec('P22','ECV');
await H.open('ecv');for(const [k,v] of Object.entries({hct:42,mpre:1000,mpost:450,bpre:1600,bpost:300}))await H.fill('#ecv-'+k,v);await p.waitForTimeout(800);await rec('P23','ECV');
fs.mkdirSync('results',{recursive:true});fs.writeFileSync(`results/owner-cases.json`,JSON.stringify(out,null,1));
for(const o of out)console.log(o.id,'|',o.screen,'||',o.copy);console.log('pageerrors',H.errs);await H.b.close()})();
