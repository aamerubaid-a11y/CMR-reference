const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:430,height:900}});
// synthetic report
const rp=await b.newPage({viewport:{width:900,height:520}});
await rp.setContent(`<body style="font:22px Arial;padding:20px;background:#fff;color:#000"><b>Cardiac MRI Measurements</b><table cellpadding=6>
<tr><td>BSA</td><td>1.92 m2</td></tr>
<tr><td>LV End-diastolic volume</td><td>182 mL</td></tr><tr><td>LV End-systolic volume</td><td>74 mL</td></tr><tr><td>LV Ejection fraction</td><td>59 %</td></tr><tr><td>LV Mass</td><td>128 g</td></tr>
<tr><td>RV End-diastolic volume</td><td>210 mL</td></tr><tr><td>RV End-systolic volume</td><td>96 mL</td></tr>
<tr><td>LA Maximum volume</td><td>96 mL</td></tr><tr><td>LA Minimum volume</td><td>42 mL</td></tr></table></body>`);
await rp.screenshot({path:'/tmp/rep.png'});
p.on('console',m=>{if(m.type()==='error')console.log('ERR',m.text())});p.on('pageerror',e=>console.log('PE',e.message));
await p.goto(process.env.U||'http://localhost:8765/');await p.waitForTimeout(800);
await p.click('#nav-report');await p.waitForTimeout(500);
let t=await p.evaluate(()=>document.body.innerText.includes('Scan report image'));console.log('btn',t);
await p.click('[data-scan=start]');
console.log('file disabled before ack',await p.evaluate(()=>!document.getElementById('scanfile')));
await p.click('[data-scan=ack]');
await p.setInputFiles('#scanfile','/tmp/rep.png');
await p.waitForSelector('.srow',{timeout:120000});
console.log(await p.evaluate(()=>[...document.querySelectorAll('.srow')].map(r=>r.querySelector('b').textContent+'='+r.querySelector('input[type=number]').value+(r.querySelector('input').checked?'':'(off)')).join(' | ')));
console.log('phi',await p.evaluate(()=>!!document.querySelector('.scan .phi')));
await p.click('#nav-home');await p.waitForTimeout(300);await p.locator('[data-open=lv-vol]:visible').first().click();await p.waitForTimeout(500);console.log('title',await p.evaluate(()=>document.querySelector('.dhead h2')?.textContent));
console.log('before Apply, LV inputs:',await p.evaluate(()=>[...document.querySelectorAll('.incard input')].map(i=>i.value).filter(Boolean).join(',')||'(empty)'));
await p.click('[data-back]').catch(()=>{});await p.waitForTimeout(300);await p.click('#nav-report');await p.waitForTimeout(400);
console.log('still reviewing:',await p.evaluate(()=>!!document.querySelector('[data-scan=apply]')));
await p.click('[data-scan=apply]');await p.waitForTimeout(300);console.log('report after apply:',(await p.evaluate(()=>document.getElementById('rbody')?.innerText||'none')).replace(/\n+/g,' ').slice(0,200));console.log('hash',await p.evaluate(()=>location.hash));
await p.click('#nav-home');await p.waitForTimeout(300);await p.locator('[data-open=lv-vol]:visible').first().click();await p.waitForTimeout(500);console.log('title',await p.evaluate(()=>document.querySelector('.dhead h2')?.textContent));
console.log('after Apply, LV inputs:',await p.evaluate(()=>[...document.querySelectorAll('.incard input')].map(i=>i.value).filter(Boolean).join(',')));
console.log('population selected after apply:',await p.evaluate(()=>document.querySelectorAll('.incard [data-sex].on').length));
await b.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});