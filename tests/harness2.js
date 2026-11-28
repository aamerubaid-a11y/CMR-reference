// Test harness for the remediated app. Drives the real UI in a browser; never calls app functions directly.
const pw=require('playwright');
const URL=process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html';
module.exports=async function(browserName='chromium',vp={width:1280,height:900}){const b=await pw[browserName].launch();const ctx=await b.newContext({viewport:vp});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const H={p,b,ctx,errs,URL,
  async open(id){await p.goto(URL+'#'+id);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload();await p.waitForTimeout(200)},
  async pop(v){await p.click(`.incard [data-sex=${v}]`);await p.waitForTimeout(120)},
  async settings(o){if(!(await p.$('.setbody'))){await p.click('[data-setopen]');await p.waitForTimeout(100)}
   if(o.method){await p.click(`.setbody [data-method=${o.method}]`);await p.waitForTimeout(100)}
   if(o.ctx){await p.click(`.setbody [data-ctx=${o.ctx}]`);await p.waitForTimeout(100)}
   if(o.age!=null){await p.selectOption('.setbody select[data-in=age]',String(o.age));await p.waitForTimeout(100)}},
  async fill(sel,v){const e=await p.$(sel);if(!e)throw new Error('no '+sel);await e.fill(String(v));await e.dispatchEvent('input')},
  async sel(sel,v){await p.selectOption(sel,v);await p.waitForTimeout(150)},
  async rows(){await p.waitForTimeout(700);return p.$$eval('#results .rrow',rs=>rs.map(r=>({lab:(r.querySelector('.rl b')||{}).textContent,val:(r.querySelector('.rv')||{}).textContent,pills:[...r.querySelectorAll('.pill')].map(x=>x.textContent.trim()),small:(r.querySelector('.rl small')||{}).textContent})))},
  async row(lab){return (await H.rows()).find(x=>x.lab===lab)||{pills:[],val:''}},
  async text(){await p.waitForTimeout(600);return p.$eval('#results',e=>e.innerText)}};
 return H}
