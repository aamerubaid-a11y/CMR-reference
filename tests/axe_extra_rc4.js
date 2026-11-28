// rc4 extra axe states: Check-inputs alert with highlighted fields; iron page with liver LIC; ECV with T1 fallback; AR and AS calculators.
const {chromium}=require('playwright');const axe=require('fs').readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
(async()=>{const b=await chromium.launch();
for(const scheme of ['light','dark'])for(const [id,acts] of [['lv-vol',async p=>{await p.click('.incard [data-sex=m]');await p.fill('#a-lv-vol','100');await p.dispatchEvent('#a-lv-vol','input');await p.fill('#b-lv-vol','120');await p.dispatchEvent('#b-lv-vol','input')}],
 ['iron',async p=>{await p.fill('#ir-l15','8');await p.dispatchEvent('#ir-l15','input');await p.fill('#ir-l3','4');await p.dispatchEvent('#ir-l3','input')}],
 ['ecv',async p=>{await p.fill('#ecv-mpre','1000');await p.dispatchEvent('#ecv-mpre','input')}],
 ['ar-calc',async p=>{await p.fill('#av-fwd','100');await p.dispatchEvent('#av-fwd','input');await p.fill('#av-rev','32');await p.dispatchEvent('#av-rev','input')}],
 ['as-calc',async p=>{await p.fill('#av-mg','45');await p.dispatchEvent('#av-mg','input')}]]){
 const p=await b.newPage({viewport:{width:390,height:844},colorScheme:scheme});await p.goto('file:///home/claude/work/pwa/dist/index.html#'+id);await p.waitForTimeout(400);await acts(p);await p.waitForTimeout(900);
 await p.addScriptTag({content:axe});const r=await p.evaluate(async()=>{const x=await axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa','wcag22aa']});return x.violations.map(v=>v.id+' ('+v.nodes.length+')')});
 const ov=await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
 console.log('==',scheme+':'+id,r.length?r.join(', '):'none','| overflow',ov);await p.close()}
await b.close()})();
