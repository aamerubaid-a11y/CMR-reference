# Proposed validation cases (synthetic)

These are proposed cases, not approved ones. Every value is invented and none comes from a patient. The
"expected app output" column records what the RC build shows, checked by the named automated test. It does not
say whether that output is clinically right. The reviewer enters each case, records what they see, and records
whether they agree that the output is appropriate.

| ID | Module / context | Synthetic input | Expected app output (RC) | Test | Reviewer sees | Agree? (Y/N, note) |
|---|---|---|---|---|---|---|
| P1 | LV volumes, Adult male, all ages | LVEF 52.6% (e.g. EDV 100, ESV 47.4) | 52.6 · Below reference (LL 53) | ROUND | | |
| P2 | LV volumes, Adult male | LVEF 52.96% | 52.96 shown (not 53.0) · Below reference | PREC-LVEF | | |
| P3 | LV volumes, Adult male | LVEF 40.0% | Below reference · HF category: reduced EF (≤40%) | HF-40.0 | | |
| P4 | LV volumes, DCM/ICM, male | LVEDVi 150 mL/m² | Above reference · Kang: moderate dilation (150–199) | KANG-m-150 | | |
| P5 | LV volumes, no population chosen | LVEDV 120 | Value shown; "Select the reference population"; no status | NOSEX | | |
| P6 | LV volumes, Under 18 y | LVEDV 120 | "Reference interpretation unavailable under 18 y" | PEDS-LV | | |
| P7 | LV volumes, Adult male | EDV 100, ESV 120 | "Check inputs: end-systolic volume is not smaller than end-diastolic…"; no EF | ESV>EDV | | |
| P8 | LA, Adult male, biplane | LAVi 56.1 mL/m² | Above reference (UL 56) · Khan: mild enlargement (52–62) | REF-la-vol-…-56.1 | | |
| P9 | LA, biplane | LAVi 62.1 mL/m² | Above reference · Khan: moderate enlargement (63–73) (convention: >62 = moderate; see Q5) | KHAN-62.1 | | |
| P10 | Aortic regurgitation | Forward 100 mL, reverse 32 mL | RF 32.0 · Severe (≥32%) | ar-calc RF 32 | | |
| P11 | Aortic regurgitation | LVEF 55% | "≤55%: meets the stage C2 LVEF criterion if AR is chronic and severe" | AR-LVEF-55 | | |
| P12 | Tricuspid regurgitation | RVSV 100, pulmonary forward flow 60 | TR fraction 40.0 · High risk (≥40%) | tr-calc 60 | | |
| P13 | Pulmonic regurgitation | Forward 100, reverse 40.1 | PR fraction 40.1 · Severe (>40%) | pr-calc 40.1 | | |
| P14 | Aortic stenosis | Planimetric AVA 1.00 cm² | Severe (≤1.0) | as-calc AVA 1 | | |
| P15 | Aortic stenosis | Mean gradient 40 mmHg | Severe (≥40), labelled as the Doppler criterion | AS-MG-40 | | |
| P16 | Iron, cardiac, 1.5 T | T2* 9.9 ms | Severe iron overload (<10 ms); cardiac iron estimate shown | FE-1.5-9.9 | | |
| P17 | Iron, cardiac, 3 T | T2* 5.4 ms | Severe iron overload (<5.5 ms); no mg/g (calibrated at 1.5 T) | FE-3-5.4 | | |
| P18 | Iron, liver, 1.5 T | T2* 8 ms | T2* and R2* shown; "Liver iron concentration withheld: calibration not verified" | IRON-liver-withheld | | |
| P19 | Aorta, sinus, Adult male, 25 y | Diameter giving z +2.04 | z +2.04 · Above | PREC-AO | | |
| P20 | Aorta, sinus, Adult male | Age 19.9 y | No z-score or status: below the youngest SCMR age group | PEDS-AO-19.9 | | |

For each case, also press Copy and confirm that the copied text matches the screen and names the population,
table, method and version.
