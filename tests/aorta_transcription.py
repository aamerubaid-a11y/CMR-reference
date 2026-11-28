# Source-provenance check: every aortic mean±SD (and MESA median/percentiles) in the app vs SCMR 2025 text.
import re,json,subprocess,sys
src=open(sys.argv[1]).read(); txt=open(sys.argv[2]).read()
code=src[src.index('const DEC='):src.index('function groupIdx')]
js=code+";console.log(JSON.stringify(AO))"
AO=json.loads(subprocess.run(['node','-e',"const esc=x=>x;"+js],capture_output=True,text=True).stdout)
row=re.compile(r'(\d\d-\d\d)\s+(?:\[[^\]]*\]\s+)?(\d+)\s+([\d.]+) ± ([\d.]+)\s+(\d+)\s+([\d.]+) ± ([\d.]+)')
def rows(seg):return [(m.group(1).replace('-','–'),(float(m.group(3)),float(m.group(4))),(float(m.group(6)),float(m.group(7)))) for m in row.finditer(seg)]
lines=txt.split('\n');i=[k for k,l in enumerate(lines) if l.strip()=='Table 67'][0]
t67=rows('\n'.join(lines[i:i+60]))
t63=rows(txt[429900:436500])[:24]
# Table 63 rows appear interleaved with Table 64/65 text; keep only age-group rows (Table 65 rows have no ±)
order67=[('annulus','abs'),('annulus','idx'),('sinus','abs'),('sinus','idx'),('stj','abs'),('stj','idx')]
order63=[('cc','abs'),('cc','idx'),('ccu','abs'),('ccu','idx')]
def flat(order):
    out=[]
    for lvl,kind in order:
        L=AO[lvl];arr_m=L[kind]['m'];arr_f=L[kind]['f']
        for gi,(am,af) in enumerate(zip(arr_m,arr_f)):out.append((lvl,kind,L['groups'][gi],tuple(am),tuple(af)))
    return out
bad=0;n=0
for name,order,src_rows in [('Table 67',order67,t67),('Table 63',order63,t63)]:
    app=flat(order)
    if len(app)!=len(src_rows):print(name,'row count app',len(app),'source',len(src_rows))
    for a,sr in zip(app,src_rows):
        n+=2
        ok=a[2]==sr[0] and abs(a[3][0]-sr[1][0])<1e-9 and abs(a[3][1]-sr[1][1])<1e-9 and abs(a[4][0]-sr[2][0])<1e-9 and abs(a[4][1]-sr[2][1])<1e-9
        if not ok:bad+=1;print('MISMATCH',name,a,sr)
print('mean/SD pairs compared',n,'mismatches',bad)
# Table 65 (MESA ascending, percentiles)
asc=AO['asc'];seg=txt[431700:436000]
pm=re.findall(r'(\d\d-\d\d)\s+(\d+) \((\d+)-(\d+)\)\s+(\d+) \((\d+)-(\d+)\)',seg)
print('Table 65 percentile rows in source',len(pm))
k=0
for kind in ['abs','idx']:
    for gi in range(len(asc[kind]['m'])):
        g,a,b,c,d,e,f=pm[k];k+=1;am=asc[kind]['m'][gi];af=asc[kind]['f'][gi]
        ok=g.replace('-','–')==asc['groups'][gi] and list(am)==[int(a),int(b),int(c)] and list(af)==[int(d),int(e),int(f)]
        n+=2
        if not ok:bad+=1;print('MISMATCH 65',kind,asc['groups'][gi],am,af,(g,a,b,c,d,e,f))
print('total values compared',n,'mismatches',bad)
