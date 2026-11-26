const fs=require('fs');const src=fs.readFileSync(process.argv[2]||'/home/claude/work/cmr-ref/index.html','utf8');
const code=src.slice(src.indexOf('const DEC='),src.indexOf('function aoView'));
const {AO,aoState,aoResults}=new Function('esc','REF','sexLabel',code+';return {AO,aoState,aoResults}')(x=>x,'',x=>x==='m'?'Adult male':x==='f'?'Adult female':'');
const strip=h=>h.replace(/<tr><td>/g,'\n@@').replace(/<[^>]+>/g,'|').replace(/\|+/g,'|');
// 1. exact boundary + idx sweep
let bad=0,tot=0;
for(const lvl of Object.keys(AO)){const A=AO[lvl];if(A.pct)continue;for(const sx of ['m','f']){
 for(const kind of ['abs','idx']){const arr=A[kind][sx];arr.forEach(([m,s],i)=>{
  for(const [nm,z] of [['mean',0],['+2',2],['-2',-2],['+2.5',2.5],['-2.5',-2.5]]){
   const v=Math.round((m+z*s)*1000)/1000;const age=20+i*10+5;const bsa=2;
   const d=kind==='abs'?v:v*bsa;Object.assign(aoState,{lvl,sex:sx,age:String(age),d:String(d),bsa:String(bsa)});
   const h=strip(aoResults());const row=h.split('\n').find(l=>l.startsWith('@@'+(kind==='abs'?'Absolute':'Indexed')));
   const t=row.slice(2).split('|').filter(x=>x);tot++;
   const zz=parseFloat(t[3].replace('−','-'));const pill=t[4];
   const want=z>2-1e-9&&z>2?'Above +2 SD':(z<-2?'Below −2 SD':'Within ±2 SD');
   // exact ±2 may differ by rounding of v to 3 decimals; allow only within-boundary
   const okp=(Math.abs(z)===2)?true:pill===want;
   if(Math.abs(zz-z)>0.06||!okp){bad++;console.log('BAD',lvl,sx,kind,A.groups[i],nm,v,t)}}})}}}
console.log('sweep',tot,'bad',bad);
// 2. age edge cases
for(const [lvl,ages] of [['sinus',[19,19.9,20,29.9,30,79.9,80,95]],['annulus',[69.9,70,75]],['asc',[44,45,54.9,55,84.9,85,90]]]){
 for(const a of ages){Object.assign(aoState,{lvl,sex:'m',age:String(a),d:'30',bsa:'2'});const h=strip(aoResults());const rows=h.split('\n').filter(l=>l.startsWith('@@')).map(l=>l.split('|').filter(x=>x).slice(0,3).join(' ; '));
  const notes=(aoResults().match(/<span class="ref">[^<]*<\/span>/g)||[]).map(x=>x.replace(/<[^>]+>/g,'')).filter(x=>/age|No |below/i.test(x));
  console.log(lvl,a,'=>',rows.map(r=>r.split(' ; ')[2]).join(' | '),notes.length?'NOTE: '+notes.join(' / '):'')}}
