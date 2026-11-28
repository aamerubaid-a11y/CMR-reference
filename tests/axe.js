const {chromium}=require('playwright');const axe=require('fs').readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
(async()=>{const b=await chromium.launch();const out={};
for(const scheme of ['light','dark'])for(const id of ['','lv-vol','ecv','pr-calc','report']){const p=await b.newPage({viewport:{width:390,height:844},colorScheme:scheme});
 await p.goto(''+(process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html')+''+(id&&id!=='report'?'#'+id:''));await p.waitForTimeout(400);if(id==='report'){await p.click('#nav-report');await p.waitForTimeout(300)}
 if(id==='lv-vol'){await p.fill('#a-lv-vol','180');await p.fill('#b-lv-vol','90');await p.waitForTimeout(800)}
 await p.addScriptTag({content:axe});const r=await p.evaluate(async()=>{const x=await axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21aa','wcag22aa']});return x.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,eg:v.nodes.slice(0,2).map(n=>n.target.join(' ')+' :: '+(n.any[0]||n.all[0]||{}).message)}))});
 out[scheme+':'+(id||'home')]=r;await p.close()}
for(const [k,v] of Object.entries(out)){console.log('==',k,v.length?'':'none');for(const x of v)console.log(' ',x.impact,x.id,x.n,'|',x.eg.join(' || ').slice(0,260))}
// keyboard focus
const p=await b.newPage({viewport:{width:1280,height:900}});await p.goto(''+(process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html')+'#lv-vol');await p.waitForTimeout(300);
const seq=[];for(let i=0;i<8;i++){await p.keyboard.press('Tab');seq.push(await p.evaluate(()=>{const e=document.activeElement;const s=getComputedStyle(e);return e.tagName+(e.id?'#'+e.id:'')+'['+(e.getAttribute('aria-label')||e.textContent.trim().slice(0,20))+'] outline:'+s.outlineStyle+' '+s.outlineWidth+' shadow:'+(s.boxShadow!=='none')}))}
console.log(seq.join('\n'));
const segs=await p.$$eval('[data-sex],[data-method]',x=>x.map(e=>e.outerHTML.slice(0,90)));console.log(segs.slice(0,2));
const zoom=await b.newPage({viewport:{width:320,height:640}});await zoom.goto(''+(process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html')+'#mr-calc');await zoom.waitForTimeout(400);console.log('320px horizontal overflow:',await zoom.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1));
await b.close()})()
