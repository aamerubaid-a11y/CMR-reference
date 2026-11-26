import json,sys,re
r=json.load(open(sys.argv[1]))
P='Still valid and passing';PRES='Presentation-only change';SUP='Superseded by sourced behaviour change';
BAD='Based on an incorrect original expectation';DEF='Valid and exposing an unresolved defect';NE='Not executed'
def m(i):
  if i=='LV-EDVi-105':return SUP,'"Dilation" grade came from Kang tiers, now shown only in the DCM/ICM context; general context shows "Above reference" only.','REF-lv-vol-LVEDV/BSA-104.1, KANG-general'
  if re.match(r'LV-EDVi-(100|101|104|age)',i):return PRES,'Pill wording changed from "Normal/dilation" to SCMR reference wording; same 46–104 (age-band 48–108) interval and same side of it.','REF-lv-vol-LVEDV/BSA-104, -104.1, -108, -108.1'
  if i=='LV-EDVi-F91':return PRES,'Female UL 91: wording only; classification unchanged.','REF-lv-vol-LVEDV/BSA-91, -91.1'
  if i.startswith('LV-Kang'):return SUP,'Kang grades are derived in DCM/ICM and are now shown only in that context; the original test ran in the general context, where they are withheld.','KANG-m-100 … KANG-m-200, KANG-f-* (DCM/ICM context); KANG-general (withheld)'
  if i in('LV-EF-40','LV-EF-41','LV-EF-49'):return PRES,'HF category still shown (output contains "HF category: reduced/mildly reduced EF"); old regex is case-sensitive and read the pill first.','HF-40.0, HF-40.1, HF-49.9, HF-50.0'
  if i in('LV-EF-50','LV-EF-52','LV-EF-53','LV-EF-70','LV-EF-79'):return PRES,'"Below normal"/"Normal" relabelled "Below/Within reference"; same 53–79 interval.','REF-lv-vol-EF-53, -52.9, -79, -79.1'
  if i=='LV-EF-71':return SUP,'"Supranormal" 71–79 tier removed: not in SCMR 2025; 71 is within the 53–79 reference.','REF-lv-vol-EF-79, -79.1'
  if i in('LV-M-148','LV-M-169'):return SUP,'"Borderline" mass tier removed: no source; values within 78–169 reference.','REF-lv-vol-LV mass-169, -169.1'
  if i in('LV-M-147','LV-M-171'):return PRES,'Wording only; same 78–169 interval and side.','REF-lv-vol-LV mass-169, -169.1'
  if i=='RV-EF-F-44':return SUP,'"Reduced" tier came from 3D-echo partitions (Muraru 2020); withheld for CMR. Value still flagged "Below reference".','REF-rv-vol-EF-46.9 (+ ADJUDICATION Q3)'
  if i in('RV-EF-F-47',):return PRES,'Wording only ("Within/Below reference"); same 47–75 interval.','REF-rv-vol-EF-47, -46.9'
  if i.startswith('LA-'):return PRES,'Khan tiers now a separate marker line ("Khan: mild enlargement (52–62)" etc.); SCMR reference pill shown independently. Old test expected one combined label.','KHAN-51.9 … KHAN-73.1'
  if i in('AR-15','AR-31.9','MRp-20.0','MRp-40.0'):return PRES,'"Moderate" relabelled "Intermediate", matching the source wording; same cut-points.','ar-calc RF 15/31.9; mr-calc RF primary 20/40'
  if i.startswith('TR-'):return PRES,'TR fraction now labelled by the outcome-risk strata it comes from (20/40/50 %), not severity grades; same cut-points. TR-50 fails on capitalisation only.','tr-calc-TR fraction (all pf values)'
  if i=='AS-AVA-1':return BAD,'Original expected AVA 1.0 to be grey zone; ACC/AHA 2020 defines severe as AVA ≤1.0 cm². App is correct.','as-calc-Planimetric AVA {ava:1}'
  if i in('AS-AVA-1.3','AS-AVA-1.31'):return SUP,'Grey-zone/"unlikely" tiers (1.0–1.3) not supported for CMR planimetry; app now says ">1.0: does not exclude severe".','as-calc-Planimetric AVA {ava:1.01}'
  if i.startswith('FE-'):return SUP,'Iron grading now requires choosing 1.5 T or 3 T before any category is shown (3 T cut-offs differ).','FE-1.5-20.1, -20, -10, -9.9; FE-3-*; FE-none-25'
  if i=='LV-ESV>EDV':return SUP,'App now shows "Check inputs" in the results card; original harness looks only in the old warning element. Behaviour verified in new test.','ESV>EDV'
  if i=='PR-indirect-neg':return SUP,'Same as above: explicit "Check inputs" message is shown where the old harness does not look.','PR-indirect-neg'
  if i=='RESET':return SUP,'Reset split into "Clear this page (keeps population and BSA)" and "New patient (clears everything)"; original clicked the first and expected the second.','RESET'
  return None
rows=[];c={}
for x in r:
  if x['pass']:
    k,why,rep=P,'Passes unchanged on the RC.',{'DEF-sex':'NOSEX','COPY':'COPY, PREC-COPY','XFER':'XFER','LV-EF-round':'ROUND, PREC-LVEF','ECV-hctfrac':'ECV-hand (F17 hct-fraction handling still open, held with message)'}.get(x['id'],'retained as-is')
  else:
    k,why,rep=m(x['id'])
  c[k]=c.get(k,0)+1
  ev=x['actual'].replace('|','/').replace('\n',' ')[:90]
  rows.append(f"| {x['id']} | {k} | {why} | `{ev}` | {rep} |")
print('| Original test | Disposition | Reason | Evidence (RC output) | Replacement / covering test |\n|---|---|---|---|---|')
print('\n'.join(rows))
print('\n**Counts:** '+'; '.join(f'{k}: {v}' for k,v in c.items())+f'; total {len(r)}')
