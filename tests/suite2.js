// Revised validation suite. Layer 1 = software correctness; Layer 2 = evidence concordance (expected values are
// typed in from the primary sources listed in "prov", never computed with app code). Layer 3 (clinical review)
// is not executable and is tracked in docs/VALIDATION.md.
const mk=require('./harness2');const fs=require('fs');
const BROWSER=process.argv[2]||'chromium';
const T=[];const rec=(layer,id,mod,input,expect,prov,actual,pass)=>T.push({layer,id,mod,input,expect,prov,actual:String(actual).slice(0,300),pass:!!pass});
const has=(pills,re)=>pills.some(x=>re.test(x));const none=(pills,re)=>!pills.some(x=>re.test(x));
(async()=>{const H=await mk(BROWSER);const {p}=H;
// ---------- chamber helpers ----------
async function cham(id,pop,o,vals){await H.open(id);if(pop)await H.pop(pop);if(o&&Object.keys(o).length)await H.settings(o);for(const [k,v] of Object.entries(vals))await H.fill(`#${k}-${id}`,v);return H.rows()}
const R=(rs,l)=>rs.find(r=>r.lab===l)||{pills:[],val:''};
// ===== Layer 2: SCMR reference boundaries (SCMR 2025 Tables 2, 3, 5, 8, 9, 13, 18) =====
const SC=[ // id, pop, settings, label, input key, value, bsa, expected, prov
 ['lv-vol','m',{},'LVEDV/BSA','a',104,1,/^Within reference$/,'T2 male UL 104 (inclusive)'],
 ['lv-vol','m',{},'LVEDV/BSA','a',104.1,1,/^Above reference$/,'T2 male UL 104'],
 ['lv-vol','m',{},'LVEDV/BSA','a',45.9,1,/^Below reference$/,'T2 male LL 46'],
 ['lv-vol','f',{},'LVEDV/BSA','a',91,1,/^Within reference$/,'T2 female UL 91'],
 ['lv-vol','f',{},'LVEDV/BSA','a',91.1,1,/^Above reference$/,'T2 female UL 91'],
 ['lv-vol','m',{age:0},'LVEDV/BSA','a',108,1,/^Within reference$/,'T5 male 20–29 UL 108'],
 ['lv-vol','m',{age:0},'LVEDV/BSA','a',108.1,1,/^Above reference$/,'T5 male 20–29 UL 108'],
 ['lv-vol','f',{method:'vol'},'LVEDV/BSA','a',90.1,1,/^Above reference$/,'T3 female UL 90'],
 ['lv-vol','m',{},'LV mass','c',169,null,/^Within reference$/,'T2 male mass UL 169'],
 ['lv-vol','m',{},'LV mass','c',169.1,null,/^Above reference$/,'T2 male mass UL 169'],
 ['rv-vol','f',{method:'vol'},'RVEDV/BSA','a',99.1,1,/^Above reference$/,'T9 female UL 99'],
 ['la-vol','m',{},'Max LA volume/BSA','a',56.1,1,/^Above reference$/,'T13 biplane male UL 56'],
 ['la-vol','f',{method:'simpson'},'Max LA volume/BSA','a',56,1,/^Within reference$/,'T13 Simpson female UL 56'],
 ['ra-vol','f',{},'Max RA volume/BSA','a',56.1,1,/^Above reference$/,'T18 single-plane female UL 56'],
 ['ra-vol','m',{method:'simpson'},'Max RA volume/BSA','a',78,1,/^Within reference$/,'T18 Simpson male UL 78']];
for(const [id,pop,o,lab,k,v,bsa,exp,prov] of SC){const vals={};if(bsa)vals.bsa=bsa;vals[k]=v;const rs=await cham(id,pop,o,vals);const r=R(rs,lab);
 rec(2,`REF-${id}-${lab}-${v}`,id,`${pop} ${JSON.stringify(o)} ${lab} ${v}`,String(exp),'SCMR 2025 '+prov,r.val+' '+r.pills.join(' | ')+' ['+r.small+']',exp.test(r.pills[0]||''))}
// EF boundaries (computed from EDV 100)
for(const [id,pop,o,esv,exp,prov] of [['lv-vol','m',{},47,/^Within/,'T2 male LVEF LL 53'],['lv-vol','m',{},47.1,/^Below/,'T2 male LL 53'],['lv-vol','m',{},21,/^Within/,'T2 male UL 79 (no supranormal label)'],['lv-vol','m',{},20.9,/^Above/,'T2 male UL 79'],
 ['rv-vol','f',{method:'vol'},53,/^Within/,'T9 female RVEF LL 47'],['rv-vol','f',{method:'vol'},53.1,/^Below/,'T9 female LL 47'],['rv-vol','f',{method:'mass'},51,/^Within/,'T8 female LL 49'],['rv-vol','f',{method:'mass'},51.1,/^Below/,'T8 female LL 49']]){
 const rs=await cham(id,pop,o,{a:100,b:esv});const r=R(rs,id==='lv-vol'?'LVEF':'RVEF');rec(2,`REF-${id}-EF-${100-esv}`,id,`${pop} EDV 100 ESV ${esv}`,String(exp),'SCMR 2025 '+prov,r.val+' '+r.pills.join(' | '),exp.test(r.pills[0]||'')&&none(r.pills,/supranormal/i))}
// HF category (Universal Definition 2021: ≤40 reduced, 41–49 mildly reduced)
for(const [esv,exp] of [[60,/reduced EF \(≤40/],[59.9,/mildly reduced/],[50.1,/mildly reduced/],[50,null]]){const rs=await cham('lv-vol','m',{},{a:100,b:esv});const r=R(rs,'LVEF');const ok=exp?has(r.pills,exp):none(r.pills,/HF category/);rec(2,`HF-${(100-esv).toFixed(1)}`,'lv-vol',`LVEF ${(100-esv).toFixed(1)}`,exp?String(exp):'no HF category','Bozkurt 2021 Universal Definition',r.pills.join(' | '),ok)}
// Kang 2026 (DCM/ICM context only)
for(const [sx,v,exp] of [['m',100,null],['m',100.1,/mild/],['m',149.9,/mild/],['m',150,/moderate/],['m',199.9,/moderate/],['m',200,/severe/],['f',90,null],['f',90.1,/mild/],['f',130,/moderate/],['f',170,/severe/]]){
 const rs=await cham('lv-vol',sx,{ctx:'cm',method:'vol'},{bsa:1,a:v});const r=R(rs,'LVEDV/BSA');const ok=exp?has(r.pills,new RegExp('Kang: '+exp.source)):none(r.pills,/Kang/);rec(2,`KANG-${sx}-${v}`,'lv-vol',`DCM/ICM ${sx} LVEDVi ${v}`,exp?'Kang '+exp.source:'no Kang label','Kang 2026 JACC Fig 1C',r.pills.join(' | '),ok)}
{const rs=await cham('lv-vol','m',{},{bsa:1,a:160});const r=R(rs,'LVEDV/BSA');rec(2,'KANG-general','lv-vol','General context, male LVEDVi 160','no Kang grade outside DCM/ICM','Kang 2026 population = DCM/ICM',r.pills.join(' | '),none(r.pills,/Kang|dilation/))}
// Khan 2019 (biplane only)
for(const [v,exp] of [[51.9,null],[52,/mild/],[62,/mild/],[62.1,/moderate/],[73,/moderate/],[73.1,/severe/]]){const rs=await cham('la-vol','m',{},{bsa:1,a:v});const r=R(rs,'Max LA volume/BSA');const ok=exp?has(r.pills,new RegExp('Khan: '+exp.source)):none(r.pills,/Khan/);rec(2,`KHAN-${v}`,'la-vol',`biplane LAVi ${v}`,exp?'Khan '+exp.source:'no Khan label','Khan 2019 JCMR Table 2',r.pills.join(' | '),ok)}
{const rs=await cham('la-vol','m',{method:'simpson'},{bsa:1,a:80});const r=R(rs,'Max LA volume/BSA');rec(2,'LA-simpson-noTier','la-vol','Simpson LAVi 80','reference only, no tier','EACVI SD bands withheld',r.pills.join(' | '),none(r.pills,/mild|moderate|severe/i))}
// LACI (Pezel MESA >25%)
for(const [mn,exp] of [[25,/25% or less/],[25.1,/Above 25%/]]){const rs=await cham('la-vol','m',{},{a:60,b:mn,lv:100});const r=R(rs,'LACI (min LA ÷ LVEDV)');rec(2,`LACI-${mn}`,'la-vol',`LACI ${mn}%`,String(exp),'Pezel 2022 MESA (>25%)',r.pills.join(' | '),has(r.pills,exp))}
// RV/LV ratio
// inputs chosen so the ratio is exact (RVEDV ÷ LVEDV with LVEDV 100)
for(const [ctx,rv,exp,neg] of [['gen',126.9,/Below 1.27/,null],['gen',127,/Above published normal/,null],['pah',229,null,/severe/],['pah',230,/severe RV dilation in PH/,null]]){const rs=await cham('rv-vol','m',ctx==='gen'?{}:{ctx},{a:rv,lv:100});const r=R(rs,'RV/LV EDV ratio');const ok=(exp?has(r.pills,exp):true)&&(neg?none(r.pills,neg):true);
 rec(2,`RVLV-${ctx}-${rv/100}`,'rv-vol',`${ctx} ratio ${rv/100}`,exp?String(exp):'no severe label','Altmayer 2018 (normal limit ≥1.27 from Han controls; PH severe ≥2.30)',r.val+' '+r.pills.join(' | '),ok&&none(r.pills,/SCMR/))}
// RV contexts
for(const [ctx,esv,exp,prov] of [['tr',50.1,/High risk in severe TR/,'Hinojar <50'],['tr',50,/Intermediate risk in severe TR/,'Hinojar 50–60'],['tr',40,/Intermediate/,'Hinojar 60 inclusive'],['tr',39.9,/Lower risk/,'Hinojar >60'],['pah',63.1,/High 1-year risk/,'ASPIRE <37'],['pah',63,/Intermediate risk in PAH/,'ASPIRE 37'],['pah',46,/Intermediate/,'ASPIRE 54'],['pah',45.9,/Low risk in PAH/,'ASPIRE >54'],['tof',70,/withheld/,'TOF awaiting adjudication'],['gen',70,null,'general: no RVEF severity']]){
 const rs=await cham('rv-vol','m',ctx==='gen'?{}:{ctx},{a:100,b:esv});const r=R(rs,'RVEF');const ok=exp?has(r.pills,exp):none(r.pills,/risk|mild|moderate|severe/i);rec(2,`RVEF-${ctx}-${(100-esv).toFixed(1)}`,'rv-vol',`${ctx} RVEF ${(100-esv).toFixed(1)}`,exp?String(exp):'reference only',prov,r.pills.join(' | '),ok)}
// RA
for(const [ctx,m,vals,lab,exp,prov] of [['pah','simpson',{bsa:1,a:74},'Max RA volume/BSA',null,'Bredfelt >74'],['pah','simpson',{bsa:1,a:74.1},'Max RA volume/BSA',/pre-capillary PH/,'Bredfelt >74'],
 ['tr',null,{a:80,b:61.9,rv:100},'RACI (RA min vol ÷ RVEDV)',/<0.62/,'Zhang 2026 RACI (min ÷ RVEDV)'],['tr',null,{a:80,b:62,rv:100},'RACI (RA min vol ÷ RVEDV)',/≥0.62/,'Zhang 2026'],
 ['pah',null,{str:16},'RA reservoir strain',/High risk in PAH/,'Guo 2026 <16.1'],['pah',null,{str:16.1},'RA reservoir strain',/Intermediate risk in PAH/,'Guo 2026'],['pah',null,{str:36.9},'RA reservoir strain',/Low risk in PAH/,'Guo 2026 >36.8'],
 ['tr',null,{str:6.5},'RA reservoir strain',/<6.6%/,'Kim 2026 <6.6'],['tr',null,{str:6.6},'RA reservoir strain',/≥6.6%/,'Kim 2026 ≥6.6'],['arvc',null,{str:18.5},'RA reservoir strain',/end-stage/,'Xu 2026 <18.6'],['arvc',null,{str:22.9},'RA reservoir strain',/arrhythmic/,'Xu 2026 <23'],['gen',null,{area:30},'RA area (4ch, max)',/Not graded/,'echo-only bands withheld']]){
 const o={};if(ctx!=='gen')o.ctx=ctx;if(m)o.method=m;const rs=await cham('ra-vol','m',o,vals);const r=R(rs,lab);const ok=exp?has(r.pills,exp):none(r.pills,/PH/);rec(2,`RA-${ctx}-${lab}-${JSON.stringify(vals)}`,'ra-vol',`${ctx} ${JSON.stringify(vals)}`,exp?String(exp):'no marker',prov,r.val+' '+r.pills.join(' | '),ok)}
// ===== valves =====
async function av(id,o){await H.open(id);for(const [k,v] of Object.entries(o)){if(['m','t'].includes(k))await H.sel('#av-'+k,v);else await H.fill('#av-'+k,v)}return H.rows()}
const VB=[ // id, inputs, row label, expected, prov
 ['ar-calc',{fwd:100,rev:14.9},'Regurgitant fraction',/Mild/,'Steeds & Myerson 2020 AR RF <15'],['ar-calc',{fwd:100,rev:15},'Regurgitant fraction',/Intermediate/,'between published limits'],['ar-calc',{fwd:100,rev:31.9},'Regurgitant fraction',/Intermediate/,''],['ar-calc',{fwd:100,rev:32},'Regurgitant fraction',/Severe/,'Hashimoto 2022 ≥32'],
 ['ar-calc',{fwd:100,rev:40},'Regurgitant volume',/≤40/,'Polte 2017 direct >40'],['ar-calc',{fwd:100,rev:40.1},'Regurgitant volume',/Severe range/,'Polte 2017 direct >40'],
 ['mr-calc',{t:'p',lvsv:100,fwd:80.1},'Regurgitant fraction',/Mild/,'Steeds & Myerson <20'],['mr-calc',{t:'p',lvsv:100,fwd:80},'Regurgitant fraction',/Intermediate/,''],['mr-calc',{t:'p',lvsv:100,fwd:60},'Regurgitant fraction',/Intermediate/,'Myerson >40 exclusive'],['mr-calc',{t:'p',lvsv:100,fwd:59.9},'Regurgitant fraction',/Severe/,'Myerson 2016 >40'],
 ['mr-calc',{t:'p',lvsv:155,fwd:100},'Regurgitant volume',/≤55/,'Myerson 2016 >55'],['mr-calc',{t:'p',lvsv:155.1,fwd:100},'Regurgitant volume',/>55/,'Myerson 2016'],['mr-calc',{t:'p',lvsv:160,fwd:100},'Regurgitant volume',/≥60/,'Penicka 2018 ≥60'],
 ['mr-calc',{t:'s',lvsv:100,fwd:80.1},'Regurgitant fraction',/Mild/,'Wang 2023'],['mr-calc',{t:'s',lvsv:100,fwd:80},'Regurgitant fraction',/Moderate \(20/,'Wang 2023 ≥20'],['mr-calc',{t:'s',lvsv:100,fwd:65.1},'Regurgitant fraction',/Moderate/,''],['mr-calc',{t:'s',lvsv:100,fwd:65},'Regurgitant fraction',/Severe \(≥35/,'Wang 2023 ≥35'],
 ['tr-calc',{rvsv:100,pf:80.1},'TR fraction',/Below the 20%/,'Margonato 2025'],['tr-calc',{rvsv:100,pf:80},'TR fraction',/Elevated risk/,'Margonato ≥20'],['tr-calc',{rvsv:100,pf:60.1},'TR fraction',/Elevated/,''],['tr-calc',{rvsv:100,pf:60},'TR fraction',/High risk \(≥40/,'Margonato ≥40'],['tr-calc',{rvsv:100,pf:50},'TR fraction',/Highest-risk/,'Zhan 2020 ≥50'],
 ['tr-calc',{rvsv:100,pf:55},'TR volume',/Highest risk/,'Zhan ≥45'],['tr-calc',{rvsv:100,pf:65.1},'TR volume',/<35|&lt;35/,'Wang 2021 ≥35'],['tr-calc',{rvsv:100,pf:65},'TR volume',/Elevated/,'Wang 2021 ≥35'],
 ['tr-calc',{rvsv:100,pf:25,rvedv:100},'Effective RVEF (forward flow ÷ RVEDV)',/≤25%/,'Zhang 2026 ≤25'],['tr-calc',{rvsv:100,pf:25.1,rvedv:100},'Effective RVEF (forward flow ÷ RVEDV)',/>25%/,'Zhang 2026'],
 ['tr-calc',{rvsv:100,pf:57,rvesv:100},'Forward SV ÷ RVESV',/≤0.57/,'Margonato 2026 ≤0.57'],['tr-calc',{rvsv:100,pf:57.1,rvesv:100},'Forward SV ÷ RVESV',/>0.57/,''],
 ['tr-calc',{lecv:31.9},'Liver ECV',/<32%/,'Margonato 2025 ≥32'],['tr-calc',{lecv:32},'Liver ECV',/≥32%/,''],
 ['tr-calc',{ra:61.9,rvedv:100},'RACI (RA end-diastolic vol ÷ RVEDV)',/<0.62/,'Zhang 2026'],['tr-calc',{ra:62,rvedv:100},'RACI (RA end-diastolic vol ÷ RVEDV)',/≥0.62/,''],
 ['pr-calc',{fwd:100,rev:19.9},'PR fraction',/Mild/,'Frontiers 2022 review <20'],['pr-calc',{fwd:100,rev:20},'PR fraction',/Moderate/,'20–40'],['pr-calc',{fwd:100,rev:40},'PR fraction',/Moderate/,'40 inclusive'],['pr-calc',{fwd:100,rev:40.1},'PR fraction',/Severe/,'>40'],
 ['pr-calc',{fwd:100,rev:30,bsa:1,rvedv:170},'RVEDV/BSA',/Not interpreted/,'TOF thresholds withheld'],
 ['as-calc',{ava:1.0},'Planimetric AVA',/Severe \(≤1.0/,'SCMR 2025 Table 57 ≤1.0'],['as-calc',{ava:1.01},'Planimetric AVA',/does not exclude/,'no grey-zone label'],
 ['as-calc',{ava:0.6,bsa:1},'AVA/BSA',/Severe/,'SCMR Table 57 ≤0.6'],['as-calc',{ava:0.61,bsa:1},'AVA/BSA',/>0.6|&gt;0.6/,''],
 ['as-calc',{vmax:3.99},'Peak velocity (PC)',/does not exclude/,'Table 57 ≥4'],['as-calc',{vmax:4},'Peak velocity (PC)',/Severe \(≥4/,'Table 57'],['as-calc',{vmax:5},'Peak velocity (PC)',/Very severe/,'Table 57 ≥5'],
 ['as-calc',{sv:34.9,bsa:1},'SV/BSA',/Low flow/,'echo definition <35 (Thornton 2022)'],['as-calc',{sv:44.9,bsa:1},'SV/BSA',/35–44/,'Thornton <45'],['as-calc',{sv:45,bsa:1},'SV/BSA',/≥45/,''],
 ['as-calc',{ecv:27},'ECV',/≤27%/,'Kwak 2021 >27'],['as-calc',{ecv:45},'ECV',/Higher risk/,'no amyloid label']];
for(const [id,inp,lab,exp,prov] of VB){const rs=await av(id,inp);const r=R(rs,lab);let ok=has(r.pills,exp);if(id==='as-calc'&&inp.ecv===45)ok=ok&&none(r.pills,/amyloid/i);
 rec(2,`${id}-${lab}-${JSON.stringify(inp)}`,id,JSON.stringify(inp),String(exp),prov,r.val+' '+r.pills.join(' | '),ok)}
// stenosis variants
async function sten(v,o){await H.open('mitral-valve');if(v!=='ms'){await H.open(v==='ps'?'pulmonic-valve':'tricuspid-valve');await p.click('[data-vv='+v+']').catch(()=>{});}else{await p.click('[data-vv=ms]').catch(()=>{})}await p.waitForTimeout(200);for(const [k,x] of Object.entries(o))await H.fill('#av-'+k,x);return H.rows()}
for(const [v,o,lab,exp,prov] of [['ms',{mva:1.64},'Planimetric MVA (cine)',/<1.65/,'Djavidani 2005'],['ms',{mva:1.65},'Planimetric MVA (cine)',/≥1.65/,''],['ms',{pht:200},'Pressure half-time (PC)',/Not graded/,'echo criterion withheld'],['ps',{pv:4},'Peak velocity (PC)',/not graded/,'Table 57 >4 exclusive'],['ps',{pv:4.01},'Peak velocity (PC)',/Severe/,'Table 57 >4']]){
 const rs=await sten(v,o);const r=R(rs,lab);rec(2,`sten-${v}-${JSON.stringify(o)}`,'sten-calc',JSON.stringify(o),String(exp),prov,r.val+' '+r.pills.join(' | '),has(r.pills,exp))}
// ===== iron (SCMR 2025 Table 100) =====
for(const [f,t,exp] of [['1.5',20.1,/Normal/],['1.5',20,/Iron overload/],['1.5',10,/Iron overload/],['1.5',9.9,/Severe/],['3',12.1,/Normal/],['3',12,/Iron overload/],['3',5.5,/Iron overload/],['3',5.4,/Severe/],['',25,/Select the field/]]){
 await H.open('iron');if(f)await p.click(`[data-ironf="${f}"]`);await p.waitForTimeout(100);await H.fill('#ir-c',t);const tx=await H.text();rec(2,`FE-${f||'none'}-${t}`,'iron',`${f||'no'} T, T2* ${t}`,String(exp),'SCMR 2025 Table 100',tx.replace(/\s+/g,' ').slice(0,160),exp.test(tx))}
// ===== ECV: independent hand calculation =====
{await H.open('ecv');for(const [k,v] of Object.entries({hct:42,mpre:1000,mpost:450,bpre:1600,bpost:300}))await H.fill('#ecv-'+k,v);const r=R(await H.rows(),'ECV');
 const ex=((1-0.42)*((1/450-1/1000)/(1/300-1/1600))*100).toFixed(1);rec(2,'ECV-hand','ecv','Hct 42, myo 1000→450, blood 1600→300',ex+'% and no generic grade','(1−Hct)×ΔR1myo/ΔR1blood; generic tiers withheld',r.val+' '+r.pills.join(' | '),r.val===ex&&has(r.pills,/Not interpreted/))}
// ===== Layer 1: software correctness =====
{await H.open('lv-vol');await H.fill('#bsa-lv-vol',1);await H.fill('#a-lv-vol',120);const r=R(await H.rows(),'LVEDV/BSA');const s=await p.$eval('.rctx',e=>e.textContent);
 rec(1,'NOSEX','lv-vol','No population chosen','values shown, no reference label, context says not selected','F03',r.val+' '+r.pills.join('|')+' / '+s,r.val==='120.0'&&has(r.pills,/Select the reference population/)&&/Sex not selected/.test(s))}
{const rs=await cham('lv-vol','p',{},{bsa:1,a:120});const r=R(rs,'LVEDV/BSA');rec(1,'PEDS-LV','lv-vol','Under 18 y','unavailable state, value kept','F07',r.val+' '+r.pills.join('|'),r.val==='120.0'&&has(r.pills,/unavailable under 18/)&&none(r.pills,/Within|Above|Below/))}
for(const age of [12,19.9]){await H.open('ao-calc');await p.click('[data-aosex=m]');await H.fill('#ao-age',age);await H.fill('#ao-d',30);const t=await H.text();rec(1,`PEDS-AO-${age}`,'ao-calc',`Aorta age ${age}`,'no z-score, unavailable','F07',t.replace(/\s+/g,' ').slice(0,200),/unavailable/.test(t)&&!/Above \+2 SD|Within ±2 SD/.test(t))}
{await H.open('ao-calc');await p.click('[data-aosex=m]');await H.fill('#ao-age',85);await H.fill('#ao-d',36);const t=await H.text();rec(1,'AO-above-oldest','ao-calc','Sinus, age 85 (oldest group 70–79)','unavailable, no substitution','explicit unsupported state',t.replace(/\s+/g,' ').slice(0,200),/unavailable/.test(t))}
{const rs=await cham('lv-vol','m',{},{a:100,b:120});const t=await H.text();rec(1,'ESV>EDV','lv-vol','EDV 100, ESV 120','explicit message','F13',t.replace(/\s+/g,' ').slice(0,200),/Check inputs/.test(t))}
{const rs=await av('pr-calc',{m:'indirect',rvsv:70,lvsv:80});const t=await H.text();rec(1,'PR-indirect-neg','pr-calc','RVSV 70 < LVSV 80','explicit message','F13',t.replace(/\s+/g,' ').slice(0,200),/Check inputs/.test(t))}
{const rs=await cham('lv-vol','m',{},{a:-50});const h=await p.evaluate(()=>[document.getElementById('results').classList.contains('held'),document.querySelectorAll('.vmsg').length]);rec(1,'NEG','lv-vol','EDV −50','held with message','input validation',JSON.stringify(h),h[0]&&h[1]>0)}
{const rs=await cham('lv-vol','m',{},{a:100,b:47.4});const r=R(rs,'LVEF');rec(1,'ROUND','lv-vol','EF 52.6 (male LL 53)','displayed 52.6 with Below reference','F06: unrounded threshold, sufficient precision',r.val+' '+r.pills.join('|'),r.val==='52.6'&&/^Below/.test(r.pills[0]))}
{const rs=await cham('lv-vol','m',{},{bsa:1,a:104.04});const r=R(rs,'LVEDV/BSA');const t=await H.text();rec(1,'ROUND-2dp','lv-vol','LVEDVi 104.04 (UL 104)','displayed 104.04 with Above reference (adaptive precision)','F06',r.val+' '+r.pills.join('|'),/^Above/.test(r.pills[0])&&r.val==='104.04')}
// copy agrees with screen and carries context
await H.ctx.grantPermissions(['clipboard-read','clipboard-write']).catch(()=>{});
{const rs=await cham('lv-vol','f',{age:3},{bsa:1.9,a:150,b:60,c:100});await p.click('[data-copyres]');await p.waitForTimeout(300);let c='';try{c=await p.evaluate(()=>navigator.clipboard.readText())}catch(e){c='ERR '+e.message}
 const ef=R(rs,'LVEF');rec(1,'COPY','lv-vol','Female 50–59, copy','copy names population, method, age group, table, version, and screen values','F04',c,/Adult female/.test(c)&&/Papillary in mass/.test(c)&&/50–59/.test(c)&&/Table 5/.test(c)&&/2026\.11-rc2/.test(c)&&c.includes('EF '+ef.val+'%'))}
// stale: change population after copy -> new copy reflects
{await p.click('.incard [data-sex=m]');await p.waitForTimeout(500);await p.click('[data-copyres]');await p.waitForTimeout(300);let c='';try{c=await p.evaluate(()=>navigator.clipboard.readText())}catch(e){}rec(1,'COPY-stale','lv-vol','Switch to male then copy again','copy shows male, not female','screen/copy agreement',c.slice(0,120),/Adult male/.test(c)&&!/Adult female/.test(c))}
// reset vs new patient
{await cham('lv-vol','f',{},{bsa:1.95,a:150,b:60});await p.click('[data-reset]');await p.waitForTimeout(300);const a=await p.$eval('#bsa-lv-vol',e=>e.value),pop=await p.$eval('.incard [data-sex=f]',e=>e.classList.contains('on'));
 await p.click('[data-newpt]');await p.waitForTimeout(300);const b=await p.$eval('#bsa-lv-vol',e=>e.value),pop2=await p.$$eval('.incard [data-sex].on',e=>e.length);
 rec(1,'RESET','lv-vol','Clear page, then New patient','clear keeps population+BSA (labelled); New patient clears both','F10',`after clear BSA=${a} female=${pop}; after new patient BSA="${b}" selected=${pop2}`,a==='1.95'&&pop&&b===''&&pop2===0)}
// cross-module carry-over of population is visible
{await cham('lv-vol','f',{},{bsa:2});await p.goto(H.URL+'#rv-vol');await p.waitForTimeout(300);const s=await p.$eval('.rctx',e=>e.textContent).catch(()=>'');rec(1,'XFER','rv-vol','Female on LV, open RV','population carried over and visible beside results','design',s,/Adult female/.test(s))}
// persistence: reload clears measurements, keeps center ranges
{await H.open('ecv');await p.click('[data-lrtoggle]').catch(()=>{});await p.waitForTimeout(200);await H.fill('[data-lr=t1lo]',950);await H.fill('[data-lr=t1hi]',1050);await H.fill('#ecv-mpre',1100);await p.waitForTimeout(400);
 await p.reload();await p.waitForTimeout(400);const v=await p.$eval('#ecv-mpre',e=>e.value);const ls=await p.evaluate(()=>localStorage.getItem('cmr-local'));rec(1,'PERSIST','ecv','Enter T1 and a center range, reload','measurement cleared; center range kept','privacy / persistence',`mpre="${v}" local=${ls}`,v===''&&/950/.test(ls||''))}
{await H.open('ecv');await p.click('[data-lrtoggle]').catch(()=>{});await p.waitForTimeout(200);await H.fill('[data-lr=t1lo]',1050);await H.fill('[data-lr=t1hi]',950);await p.waitForTimeout(300);const s=await p.$eval('#lrsum',e=>e.textContent).catch(()=>'');rec(1,'LR-invalid','ecv','Center T1 min 1050 > max 950','visible message, range not used','F14',s,/not used until/.test(s))}
{await H.open('ecv');await p.click('[data-lrtoggle]').catch(()=>{});await p.waitForTimeout(200);await H.fill('[data-lr=t1lo]',950);await H.fill('[data-lr=t1hi]',1050);await H.fill('[data-lr=lab]','Test MOLLI');await H.fill('#ecv-mpre',1100);await p.waitForTimeout(400);
 await p.click('[data-copyres]');await p.waitForTimeout(300);let c='';try{c=await p.evaluate(()=>navigator.clipboard.readText())}catch(e){}rec(1,'LR-copy','ecv','Center range active, copy','copy names the center range and label','F14',c,/center range \(Test MOLLI\)/.test(c)&&/950–1050/.test(c))}
// keyboard: population buttons reachable and operable
{await H.open('lv-vol');let found=false;for(let i=0;i<40&&!found;i++){await p.keyboard.press('Tab');found=await p.evaluate(()=>document.activeElement&&document.activeElement.dataset&&document.activeElement.dataset.sex==='f')}
 if(found){await p.keyboard.press('Enter');await p.waitForTimeout(200)}const pr=await p.$eval('.incard [data-sex=f]',e=>e.getAttribute('aria-pressed'));rec(1,'KEYBOARD','lv-vol','Tab to "Adult female", press Enter','reachable, selected, aria-pressed=true','WCAG 2.1.1 / 4.1.2',`reached=${found} aria-pressed=${pr}`,found&&pr==='true')}
// scan: nothing applied before confirmation (unit-level: no scan image in this environment, so check the source flow is gated)
{const src=await p.content();rec(1,'SCAN-gate','scan','Static check of built page','scanFill only on Apply; sex never auto-applied','F11',/a==='apply'\)\{if\(scan&&!scan\.phi\)scanFill\(\)/.test(src)?'gated':'not gated',/a==='apply'\)\{if\(scan&&!scan\.phi\)scanFill\(\)/.test(src)&&!/setCase\('sex',scan\.sex\)/.test(src))}
// mobile width layout
{const m=await H.b.newPage({viewport:{width:360,height:740}});await m.goto(H.URL+'#lv-vol');await m.waitForTimeout(300);const ov=await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);const vis=await m.$eval('.incard [data-sex=m]',e=>{const r=e.getBoundingClientRect();return r.width>=44||r.height>=36});rec(1,'MOBILE','lv-vol','360 px viewport','no horizontal scroll; population buttons visible','layout',`overflow=${ov} visible=${vis}`,!ov&&vis);await m.close()}

// ===== RC additions: adaptive precision across modules (display never contradicts the label) =====
{const rs=await cham('lv-vol','m',{},{a:100,b:47.04});const r=R(rs,'LVEF');rec(1,'PREC-LVEF','lv-vol','EF 52.96 (LL 53)','shows 52.96 and Below reference','precision',r.val+' '+r.pills.join('|'),r.val==='52.96'&&/^Below/.test(r.pills[0]))}
{const rs=await av('ar-calc',{fwd:100,rev:31.96});const r=R(rs,'Regurgitant fraction');rec(1,'PREC-AR','ar-calc','RF 31.96 (cut 32)','shows 31.96 and Intermediate','precision',r.val+' '+r.pills.join('|'),r.val==='31.96'&&has(r.pills,/Intermediate/))}
{const rs=await av('as-calc',{vmax:4.96});const r=R(rs,'Peak velocity (PC)');rec(1,'PREC-AS','as-calc','Vmax 4.96 (cut 5)','shows 4.96 and Severe, not Very severe','precision',r.val+' '+r.pills.join('|'),r.val==='4.96'&&has(r.pills,/^Severe/))}
{const rs=await cham('rv-vol','m',{},{a:126.96,lv:100});const r=R(rs,'RV/LV EDV ratio');rec(1,'PREC-RVLV','rv-vol','ratio 1.2696 (cut 1.27)','not shown as 1.27 with Below','precision',r.val+' '+r.pills.join('|'),r.val!=='1.27'&&has(r.pills,/Below 1.27/))}
{const rs=await av('tr-calc',{rvsv:100,pf:60.04});const r=R(rs,'TR fraction');rec(1,'PREC-TR','tr-calc','TRF 39.96 (cut 40)','shows 39.96 and Elevated','precision',r.val+' '+r.pills.join('|'),r.val==='39.96'&&has(r.pills,/Elevated/))}
{await H.open('ao-calc');await p.click('[data-aosex=m]');await p.selectOption('#ao-lvl','sinus');await H.fill('#ao-age',25);await H.fill('#ao-d',(30.1+2.04*3.0).toFixed(2));const t=await H.text();rec(1,'PREC-AO','ao-calc','sinus male 20–29, z 2.04','z shown +2.04 with Above +2 SD','precision',t.replace(/\s+/g,' ').slice(0,160),/\+2\.04/.test(t)&&/Above \+2 SD/.test(t))}
{await H.open('ao-calc');await p.click('[data-aosex=m]');await p.selectOption('#ao-lvl','sinus');await H.fill('#ao-age',25);await H.fill('#ao-d',(30.1+1.96*3.0).toFixed(2));const t=await H.text();rec(1,'PREC-AO2','ao-calc','sinus male 20–29, z 1.96','z shown +1.96 with Within ±2 SD','precision',t.replace(/\s+/g,' ').slice(0,160),/\+1\.96/.test(t)&&/Within ±2 SD/.test(t))}
{const rs=await av('ar-calc',{fwd:100,rev:31.96});await p.click('[data-copyres]');await p.waitForTimeout(300);let c='';try{c=await p.evaluate(()=>navigator.clipboard.readText())}catch(e){}rec(1,'PREC-COPY','ar-calc','copy AR RF 31.96','copy shows 31.96 and intermediate','screen/copy agreement',c.slice(0,160),/31\.96/.test(c)&&/intermediate/i.test(c))}
// ===== RC additions: evidence-closure items =====
{await H.open('iron');await H.fill('#ir-l15',8);const t=await H.text();rec(2,'IRON-liver-withheld','iron','Liver T2* 8 ms at 1.5 T','R2* 125 shown; LIC withheld','Wood 2005 calibration not verifiable (primary inaccessible)',t.replace(/\s+/g,' ').slice(0,200),/R2\* 125/.test(t)&&/withheld/.test(t)&&!/mg\/g\s*Within|[0-9.]+ mg\/g\s*(?:Not|Above)/.test(t))}
for(const [ef,exp] of [[55,/stage C2/],[55.1,/>55%/]]){const rs=await av('ar-calc',{ef});const r=R(rs,'LVEF');rec(2,`AR-LVEF-${ef}`,'ar-calc',`LVEF ${ef}`,String(exp),'ACC/AHA 2020 Table 15 (C2 LVEF ≤55%)',r.val+' '+r.pills.join('|'),has(r.pills,exp))}
for(const [mg,exp] of [[39.9,/does not exclude/],[40,/Severe \(≥40/]]){const rs=await av('as-calc',{mg});const r=R(rs,'Mean gradient (PC)');rec(2,`AS-MG-${mg}`,'as-calc',`MG ${mg}`,String(exp),'ACC/AHA 2020 Table 13 (mean ΔP ≥40)',r.val+' '+r.pills.join('|'),has(r.pills,exp))}
{const rs=await cham('la-vol','p',{},{bsa:1,a:80});const r=R(rs,'Max LA volume/BSA');rec(1,'PEDS-LA','la-vol','Under 18 y, LAVi 80','unavailable; no Khan label','population',r.val+' '+r.pills.join('|'),has(r.pills,/unavailable under 18/)&&none(r.pills,/Khan/))}
// ===== rc2 additions =====
const clip=async()=>{await p.evaluate(()=>navigator.clipboard.writeText('SENTINEL')).catch(()=>{});await p.click('[data-copyres]');await p.waitForTimeout(300);try{return await p.evaluate(()=>navigator.clipboard.readText())}catch(e){return 'ERR'}};
// liver ECV label and copy carry source method
{const rs=await av('tr-calc',{lecv:32});const r=R(rs,'Liver ECV');const c=await clip();rec(2,'LECV-label','tr-calc','Liver ECV 32','≥32% label names TR population; source method stated on screen and in copy','Margonato 2025 Circulation full text (1.5 T MOLLI, spline-derived)',r.pills.join('|')+' || '+c.replace(/\s+/g,' ').slice(0,300),/right-sided HF/.test(r.pills.join(' '))&&/comparable liver ECV method/.test(await H.text())&&/32/.test(c)&&/right-sided HF/.test(c)&&/MOLLI/.test(c)&&/right-sided HF/.test(c))}
// hematocrit: percentage required, fraction gives no ECV on screen or in copy
const ecvIn=async(h)=>{await H.open('ecv');for(const [k,v] of Object.entries({hct:h,mpre:1000,mpost:450,bpre:1600,bpost:300}))await H.fill('#ecv-'+k,v);await p.waitForTimeout(800)};
{await ecvIn(0.42);const t=await H.text();const c=await clip();rec(1,'HCT-fraction','ecv','Hct 0.42 (fraction)','no ECV value; message says percentage; copy has no ECV value','F17 conservative',t.replace(/\s+/g,' ').slice(0,200)+' || copy: '+c.slice(0,120),/must be a percentage/.test(t)&&!/(^|[^0-9])26\.\d/.test(t)&&!/(^|[^0-9])26\.\d/.test(c))}
{await ecvIn(42);await p.waitForTimeout(300);const t1=await H.text();await H.fill('#ecv-hct',0.42);await p.waitForTimeout(900);const t2=await H.text();const c=await clip();rec(1,'HCT-switch','ecv','Hct 42 then changed to 0.42','26.2 disappears from screen and copy','no stale ECV',t2.replace(/\s+/g,' ').slice(0,160)+' || copy: '+c.slice(0,100),/26\.2/.test(t1)&&!/(^|[^0-9])26\.\d/.test(t2)&&!/(^|[^0-9])26\.\d/.test(c))}
{await ecvIn(70);const t=await H.text();rec(1,'HCT-70','ecv','Hct 70','no ECV value','range 15–65',t.replace(/\s+/g,' ').slice(0,160),!/\b\d+\.\d %?\s*Not interpreted/.test(t)&&/must be a percentage/.test(t))}
{await ecvIn(15);const r=R(await H.rows(),'ECV');rec(1,'HCT-15','ecv','Hct 15 (lower bound)','ECV calculated','range inclusive',r.val,/^\d+\.\d$/.test(r.val))}
{const rep=async()=>{await p.evaluate(()=>document.getElementById('nav-report').click());await p.waitForTimeout(800);return p.evaluate(()=>{const e=document.getElementById('rtext');return e?e.getAttribute('data-all'):''})};
 await ecvIn(0.42);const a=await rep();await ecvIn(42);const b=await rep();rec(1,'HCT-report','report','Report text with Hct 0.42, then 42','0.42: ECV not calculated in report; 42: ECV 26.2','screen/report agreement',a.slice(0,120)+' || '+b.slice(0,90),/ECV —%/.test(a)&&!/(^|[^0-9])26\.\d/.test(a)&&/ECV 26\.2%/.test(b))}
// home list: no interactive control nested in a button; favourite operable and named
{await p.evaluate(()=>{history.replaceState(null,'',location.pathname)});await p.reload();await p.waitForTimeout(400);const sec=await p.$('#app [data-sec][aria-expanded=false]');if(sec){await sec.click();await p.waitForTimeout(300)}
 const a=await p.evaluate(()=>{const nest=[...document.querySelectorAll('button,[role=button]')].filter(b=>b.querySelector('button,a,input,[tabindex]')).length;const row=document.querySelector('#app .item');if(!row)return {nest,row:false};const o=row.querySelector('.open'),f=row.querySelector('.fav');return {nest,row:true,openTag:o&&o.tagName,openName:o&&o.textContent.trim().slice(0,40),favName:f&&f.getAttribute('aria-label'),favPressed:f&&f.getAttribute('aria-pressed'),sib:!!(o&&f&&o.parentElement===f.parentElement&&!o.contains(f))}});
 let ok=a.row&&a.nest===0&&a.openTag==='BUTTON'&&a.sib&&/^Favorite: /.test(a.favName||'')&&a.favPressed==='false';
 let after='';if(ok){await p.focus('#app .item .fav');await p.keyboard.press('Enter');await p.waitForTimeout(300);after=await p.evaluate(()=>{const f=document.activeElement;return (f&&f.matches('[data-fav]')?'focus-kept ':'focus-lost ')+(f&&f.getAttribute('aria-pressed'))});ok=after==='focus-kept true';await p.keyboard.press('Enter');await p.waitForTimeout(300)}
 let opened='';if(ok){await p.focus('#app .item .open');await p.keyboard.press('Enter');await p.waitForTimeout(400);opened=await p.evaluate(()=>location.hash);ok=opened.length>1}
 rec(1,'A11Y-home','home','Home list row','row = button + sibling favourite toggle; no nesting; keyboard toggles fav (focus kept) and opens item','WCAG 4.1.2 / axe nested-interactive',JSON.stringify(a)+' '+after+' '+opened,ok)}
fs.writeFileSync(`results-v2-${BROWSER}.json`,JSON.stringify(T,null,1));
const f=T.filter(t=>!t.pass);console.log(BROWSER,'total',T.length,'fail',f.length);for(const t of f)console.log('FAIL',t.id,'|',t.actual.slice(0,160));console.log('pageerrors',H.errs);await H.b.close()})()
