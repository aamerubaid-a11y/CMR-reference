const mk=require('./harness_original');const fs=require('fs');
const T=[];const rec=(id,mod,input,expect,prov,actual,pass)=>T.push({id,mod,input,expect,prov,actual,pass});
(async()=>{const H=await mk();const {p}=H;
// ---- LV ----
async function lv(o,bsa,a,b,c){await H.open('lv-vol');await H.settings(o);if(bsa!=null)await H.fill('#bsa-lv-vol',bsa);if(a!=null)await H.fill('#a-lv-vol',a);if(b!=null)await H.fill('#b-lv-vol',b);if(c!=null)await H.fill('#c-lv-vol',c);return H.rows()}
const g=(rs,l)=>(rs.find(r=>r.lab===l)||{});
for(const [x,exp] of [[100,/Normal/],[101,/Normal/],[104,/Normal/],[105,/dilation/]]){const rs=await lv({sex:'m'},1,x,30);const r=g(rs,'LVEDV/BSA');rec('LV-EDVi-'+x,'LV','Male, papillary-in-mass, all ages, BSA 1, LVEDV '+x,String(exp),'SCMR 2025 Table 2 male UL 104 (row shows "normal 46–104")',r.pill+' ['+r.small+']',exp.test(r.pill))}
{const rs=await lv({sex:'m',age:0},1,106,30);const r=g(rs,'LVEDV/BSA');rec('LV-EDVi-age','LV','Male 20–29 y, LVEDVi 106','/Normal/','SCMR 2025 Table 5 male 20–29 UL 108',r.pill+' ['+r.small+']',/Normal/.test(r.pill))}
{const rs=await lv({sex:'f'},1,91,30);const r=g(rs,'LVEDV/BSA');rec('LV-EDVi-F91','LV','Female, LVEDVi 91','/Normal/','SCMR Table 2 female UL 91',r.pill,/Normal/.test(r.pill))}
for(const [x,exp] of [[149,/Mild/],[150,/Moderate/],[199,/Moderate/],[200,/Severe/]]){const rs=await lv({sex:'m'},1,x,30);const r=g(rs,'LVEDV/BSA');rec('LV-Kang-'+x,'LV','Male LVEDVi '+x,String(exp),'Kang 2026 tiers as implemented (≥150 mod, ≥200 severe)',r.pill,exp.test(r.pill))}
for(const [b,exp] of [[60,/Reduced \(≤40/],[59,/Mildly reduced/],[51,/Mildly reduced/],[50,/Below normal/],[48,/Below normal/],[47,/^Normal/],[30,/^Normal/],[29,/Supranormal/],[21,/^Normal/],[20,/Supranormal|Above/]]){const rs=await lv({sex:'m'},null,100,b);const r=g(rs,'LVEF');const ef=100-b;
 const prov=ef>=71&&ef<=79?'SCMR Table 2 male UL 79: within normal range (app adds >70% supranormal flag)':ef>=53?'SCMR Table 2 male LL 53':'App HF categories (≤40, 41–49) + SCMR LL';rec('LV-EF-'+ef,'LV','Male, EDV 100, ESV '+b+' (EF '+ef+'%)',String(exp),prov,r.val+' '+r.pill+' ['+r.small+']',exp.test(r.pill))}
{const rs=await lv({sex:'m'},null,100,47.4);const r=g(rs,'LVEF');rec('LV-EF-round','LV','Male EDV 100, ESV 47.4 (EF 52.6%)','display and label agree','Display rounds to integer; grading uses unrounded value',r.val+'% · '+r.pill,!(r.val==='53'&&/Below/.test(r.pill)))}
for(const [c,exp] of [[147,/Normal/],[148,/Borderline/],[169,/Borderline/],[170,/Increased|Above/],[171,/Increased/]]){const rs=await lv({sex:'m'},null,null,null,c);const r=g(rs,'LV mass');rec('LV-M-'+c,'LV','Male mass '+c+' g','' +exp,'SCMR Table 2 male 124±23, UL 169; MESA +1/+2 SD rule',r.pill+' ['+r.small+']',exp.test(r.pill))}
// invalid
{const rs=await lv({sex:'m'},null,100,120);const r=g(rs,'LVEF');const h=await H.held();rec('LV-ESV>EDV','LV','EDV 100, ESV 120','warning shown','Physiologically impossible input',(r.pill||'no EF row')+' · warn: '+(h.warn||'none')+' '+h.vmsg.join(';'),!!(h.warn||h.vmsg.length))}
{const rs=await lv({sex:'m'},null,-50,null);const h=await H.held();rec('LV-neg','LV','EDV −50','warning shown, no result','Invalid input',JSON.stringify(rs.map(x=>x.lab))+' · held '+h.held+' '+h.vmsg.join(';'),h.vmsg.length>0)}
{const rs=await lv({sex:'m'},0,100,40);const h=await H.held();rec('LV-BSA0','LV','BSA 0','warning, no indexed values','Invalid input',rs.map(x=>x.lab).join(',')+' · '+h.vmsg.join(';'),h.vmsg.length>0)}
// default sex
{await H.open('lv-vol');const s=await p.$eval('.setrow .ss',e=>e.textContent);rec('DEF-sex','LV','Fresh open, no settings touched','sex must be chosen explicitly','Safety expectation (auditor)','Settings summary: '+s,!/^Male/.test(s))}
// reset retains BSA
{await lv({sex:'f'},1.95,150,60);await p.click('[data-reset]');await p.waitForTimeout(300);const v=await p.$eval('#bsa-lv-vol',e=>e.value);const s=await p.$eval('.setrow .ss',e=>e.textContent);rec('RESET','LV','Female, BSA 1.95, then Reset measurements','BSA and sex cleared for next patient','Stale-patient expectation (auditor)','BSA after reset "'+v+'", '+s,v==='')}
// copy text
{await lv({sex:'f'},1.9,150,60,100);await p.context().grantPermissions(['clipboard-read','clipboard-write']);await p.click('[data-copyres]');await p.waitForTimeout(300);let t='';try{t=await p.evaluate(()=>navigator.clipboard.readText())}catch(e){t='(clipboard unavailable) '+e.message}
 rec('COPY','LV','Female, method mass, copy result','copied text names sex, contouring method and reference','Self-contained report expectation',t,/female/i.test(t)&&/papill|method|SCMR/i.test(t))}
// cross-module transfer
{await lv({sex:'f'},2.1,150,60);await H.p.goto((process.env.CMR_URL||'file:///home/claude/work/pwa/dist/index.html')+'#rv-vol');await p.waitForTimeout(300);const v=await p.$eval('#bsa-rv-vol',e=>e.value).catch(()=>'?');const s=await p.$eval('.setrow .ss',e=>e.textContent);rec('XFER','LV→RV','Enter BSA 2.1, female on LV, open RV','documented, visible carry-over','Design check',`RV opens with BSA "${v}", ${s}`,true)}
// ---- RV ----
async function rv(o,a,b){await H.open('rv-vol');await H.settings(o);await H.fill('#bsa-rv-vol',1);await H.fill('#a-rv-vol',a);await H.fill('#b-rv-vol',b);return H.rows()}
for(const [b,exp,prov] of [[53,/Normal/,'SCMR Table 9 female LL 47'],[54,/Below|reduced/,'SCMR Table 9 female LL 47: 46% is below'],[55,/Below|reduced/,'SCMR LL 47: 45% below'],[56,/reduced/,'App rule <45 mildly reduced']]){const rs=await rv({sex:'f',method:'vol'},100,b);const r=g(rs,'RVEF');rec('RV-EF-F-'+(100-b),'RV','Female, trabeculae-in-volume, RVEF '+(100-b)+'%',String(exp),prov,r.pill+' ['+r.small+']',exp.test(r.pill))}
{const rs=await rv({sex:'f',method:'mass'},100,52);const r=g(rs,'RVEF');rec('RV-EF-F-mass-48','RV','Female, trabeculae-in-mass, RVEF 48%','/Below|reduced/','SCMR Table 8 female LL 49',r.pill+' ['+r.small+']',/Below|reduced/.test(r.pill))}
// ---- LA ----
async function la(a){await H.open('la-vol');await H.settings({sex:'m'});await H.fill('#bsa-la-vol',1);await H.fill('#a-la-vol',a);return H.rows()}
for(const [x,exp] of [[56,/Normal/],[57,/Mild/],[62,/Mild/],[63,/Moderate/],[73,/Moderate/],[74,/Severe/]]){const rs=await la(x);const r=g(rs,'Max LA volume/BSA');rec('LA-'+x,'LA','Male biplane LAVi '+x,String(exp),'SCMR Table 13 UL 56; tiers 62/73 as implemented (Khan 2019)',r.pill,exp.test(r.pill))}
// ---- valves ----
async function av(id,o){await H.open(id);for(const [k,v] of Object.entries(o)){if(k==='m'||k==='t'){await H.sel('#av-'+k,v)}else await H.fill('#av-'+k,v)}return H.rows()}
for(const [r,exp] of [[14.9,/Mild/],[15,/Moderate/],[31.9,/Moderate/],[32,/Severe/]]){const rs=await av('ar-calc',{fwd:100,rev:r});const x=g(rs,'Regurgitant fraction');rec('AR-'+r,'AR','Direct, fwd 100, rev '+r,String(exp),'Implemented bands: <15 / 15–31 / ≥32 (Hashimoto 2022, Steeds & Myerson 2020)',x.val+' '+x.pill,exp.test(x.pill))}
for(const [f,exp] of [[80.1,/Mild/],[80,/Moderate/],[60,/Moderate/],[59.9,/Severe/]]){const rs=await av('mr-calc',{t:'p',lvsv:100,fwd:f});const x=g(rs,'Regurgitant fraction');rec('MRp-'+(100-f).toFixed(1),'MR','Primary, LVSV 100, Ao fwd '+f,String(exp),'Implemented: <20 / 20–40 / >40',x.val+' '+x.pill,exp.test(x.pill))}
for(const [f,exp] of [[80.1,/Mild/],[80,/Moderate/],[65.1,/Moderate/],[65,/Severe/]]){const rs=await av('mr-calc',{t:'s',lvsv:100,fwd:f});const x=g(rs,'Regurgitant fraction');rec('MRs-'+(100-f).toFixed(1),'MR','Secondary, LVSV 100, Ao fwd '+f,String(exp),'Wang 2023: ≥20 moderate, ≥35 severe',x.val+' '+x.pill,exp.test(x.pill))}
for(const [f,exp] of [[80.1,/Mild/],[80,/Moderate/],[60.1,/Moderate/],[60,/Severe \(≥40/],[50.1,/Severe \(≥40/],[50,/highest/]]){const rs=await av('tr-calc',{rvsv:100,pf:f});const x=g(rs,'TR fraction');rec('TR-'+(100-f).toFixed(1),'TR','Indirect, RVSV 100, PA fwd '+f,String(exp),'Margonato 2025 20/40; Zhan 2020 50',x.val+' '+x.pill,exp.test(x.pill))}
for(const [r,exp] of [[19.9,/Mild/],[20,/Moderate/],[40,/Moderate/],[40.1,/Severe/]]){const rs=await av('pr-calc',{fwd:100,rev:r});const x=g(rs,'PR fraction');rec('PR-'+r,'PR','Direct, fwd 100, back '+r,String(exp),'2022 Frontiers review: <20 / 20–40 / >40',x.val+' '+x.pill,exp.test(x.pill))}
{const rs=await av('pr-calc',{m:'indirect',rvsv:70,lvsv:80});rec('PR-indirect-neg','PR','Indirect, RVSV 70 < LVSV 80','message explaining no PR / inconsistent input','Invalid combination',rs.length?JSON.stringify(rs):'Empty results, no message',rs.length>0)}
for(const [a,exp] of [[0.99,/Severe/],[1.0,/Grey/],[1.3,/Grey/],[1.31,/unlikely/]]){const rs=await av('as-calc',{ava:a});const x=g(rs,'Planimetric AVA');rec('AS-AVA-'+a,'AS','AVA '+a,String(exp),'Implemented <1.0 severe; 1.0–1.3 grey',x.pill,exp.test(x.pill))}
// ---- ECV ----
async function ecv(h){await H.open('ecv');for(const [k,v] of Object.entries(h))await H.fill('#ecv-'+k,v);return H.rows()}
{const hct=0.42,mp=1000,mq=450,bp=1600,bq=300;const ex=((1-hct)*((1/mq-1/mp)/(1/bq-1/bp))*100);
 let rs=await ecv({hct:42,mpre:mp,mpost:mq,bpre:bp,bpost:bq});let x=g(rs,'ECV');rec('ECV-calc','ECV','Hct 42, T1 myo 1000→450, blood 1600→300','ECV '+ex.toFixed(1)+'% (hand calculation, standard formula)','Standard ECV equation (SCMR/EACVI 2017)',x.val+' '+x.pill,x.val===ex.toFixed(1));
 rs=await ecv({hct:0.42,mpre:mp,mpost:mq,bpre:bp,bpost:bq});x=g(rs,'ECV');const h=await H.held();rec('ECV-hctfrac','ECV','Same, hematocrit entered as 0.42','same ECV or clear prompt','Code converts fractions, validator expects 15–65',(x.val||'no ECV')+' · held '+h.held+' · '+h.vmsg.join(';'),x.val===ex.toFixed(1)||h.vmsg.length>0)}
// ---- Iron ----
async function iron(c){await H.open('iron');await H.fill('[data-iron=c], #iron-c',c);await p.waitForTimeout(700);return p.$eval('#results',e=>e.innerText)}
for(const [c,exp] of [[20.1,/Normal/],[20,/overload \(10/],[10,/overload \(10/],[9.9,/Severe/]]){let t='';try{t=await iron(c)}catch(e){t='ERR '+e.message}rec('FE-'+c,'Iron','Cardiac T2* '+c+' ms','' +exp,'SCMR 2025 Table 100 (1.5 T): >20 / 10–20 / <10',t.replace(/\s+/g,' ').slice(0,120),exp.test(t))}
fs.writeFileSync('results.json',JSON.stringify(T,null,1));
console.log('total',T.length,'fail',T.filter(t=>!t.pass).length);for(const t of T.filter(t=>!t.pass))console.log('FAIL',t.id,'|',t.actual);console.log('errors',H.errs);await H.b.close()})()
