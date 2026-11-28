const {chromium}=require('playwright');
const URL=process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html';
module.exports=async function(){const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const H={p,b,errs,
  async open(id){await p.goto(URL+'#'+id);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload();await p.waitForTimeout(250)},
  async settings(o){const open=await p.$('.setbody');if(!open){const s=await p.$('[data-setopen]');if(s){await s.click();await p.waitForTimeout(120)}}
   if(o.sex){await p.click(`.incard [data-sex=${o.sex}]`);await p.waitForTimeout(100)}
   if(o.method){await p.click(`.setbody [data-method=${o.method}]`);await p.waitForTimeout(100)}
   if(o.ctx){await p.click(`.setbody [data-ctx=${o.ctx}]`);await p.waitForTimeout(100)}
   if(o.age!=null){await p.selectOption('.setbody select[data-in=age]',String(o.age));await p.waitForTimeout(100)}},
  async fill(sel,v){const e=await p.$(sel);if(!e)throw new Error('no '+sel);await e.fill(String(v));await e.dispatchEvent('input');},
  async sel(sel,v){await p.selectOption(sel,v);await p.waitForTimeout(150)},
  async rows(){await p.waitForTimeout(750);return p.$$eval('#results .rrow',rs=>rs.map(r=>({lab:(r.querySelector('.rl b')||{}).textContent,val:(r.querySelector('.rv')||{}).textContent,pill:[...r.querySelectorAll('.pill')].map(x=>x.textContent.trim()).join(' | '),small:(r.querySelector('.rl small')||{}).textContent})))},
  async held(){return p.evaluate(()=>{const r=document.getElementById('results');return {held:r&&r.classList.contains('held'),warn:(document.getElementById('warnbar')||{}).textContent||'',vmsg:[...document.querySelectorAll('.vmsg')].map(x=>x.textContent)}})},
  async row(lab){const r=await H.rows();return r.find(x=>x.lab===lab)||null}};
 return H}
