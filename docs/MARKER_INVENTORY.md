# Marker inventory: 2026.11-rc4 (authoritative)

**rc4 update (owner decisions, 27 Nov 2026):** M01 now follows the ESC 2026 HF guideline (owner decision P3); M26 states its source only (P10). Wording columns below show rc4. Line numbers are from rc3 (442a377) and have shifted in rc4 (66b1c15); search for the wording instead. Counts are unchanged. Also changed in rc4 but outside this abstract-marker inventory: Khan grades use whole-number values (P9), AS PC mean gradient ≥40 is "Severe (≥40 mmHg)" (P15), liver iron concentration is calculated (P18), and ECV/T1 are compared with all SCMR 2025 sets when no center range is entered (P23).

Generated from `docs/EVIDENCE.md` (abstract-dependent marker table) and checked against the rc3 implementation
(`src/index.html` at commit 442a377, identical in 41a2b8f). Every active wording below was found verbatim in the code. Line numbers are
for that file. The label shown on screen is also the text that is copied and exported.

**Counts.** 30 markers (M01–M30). EVIDENCE.md numbered them 1–29 with row 20 split into 20a/20b. Class 1
(adequately supported as worded): **17**. Class 2 (supported only with the narrower wording now shown): **13**.
Class 3 (withheld): **0**. The 8 removed items (S01–S08) are secondary claims in source or explanatory text, not
markers. They are **a separate count, not part of the 30**. The handoff of 26 Nov 2026 reported "13 adequately
supported, 16 narrower". That was wrong: it inverted the split and counted one marker twice. Counts are taken from this table.

Applicability to a given centre or patient is a separate question (OWNER_CHECKLIST §A). Every marker below is enabled.

| ID | EVIDENCE.md row | Marker (where shown) | Class | Active wording (rc3) | Source (PMID) | Implementation |
|---|---|---|---|---|---|---|
| M01 | 1 | HF LVEF category (LV page) | 2 | HFrEF range if clinical HF (LVEF <50%; ESC 2026) | ESC 2026 HF guideline, Eur Heart J (owner decision P3; verified from the ESC press release of 28 Aug 2026, full text not read). rc3: Bozkurt 2021 (PMID 33605000) | src/index.html:804 (markers()) |
| M02 | 2 | LVESVi ≥45 in AR (LV page AR context; AR calculator) | 2 | ≥45 mL/m²: higher risk in chronic ≥moderate AR with no or minimal symptoms / ≥45: higher risk in chronic ≥moderate AR, no or minimal symptoms | Hashimoto 2022 (35857306) | src/index.html:1117 (avResults()); src/index.html:807 (markers()) |
| M03 | 3 | LVEDV >246 mL in AR (LV page; AR calculator) | 1 | >246 mL: progression to surgery in AR / Above 246 mL | Myerson 2012 (22879371) | src/index.html:1118 (avResults()); src/index.html:808 (markers()) |
| M04 | 4 | RV/LV EDV ratio ≥1.27 in TR (RV page; TR calculator) | 1 | ≥1.27: higher mortality in TR / ≥1.27 (weak, HR 1.47) | Zhang RS 2025 (40614565) | src/index.html:1089 (avResults()); src/index.html:812 (markers()) |
| M05 | 5 | RVEF and RVEDVi risk tiers in severe TR (RV page; TR calculator) | 2 | High / Intermediate / Lower risk in severe TR (…) | Hinojar 2025 (40120094) | src/index.html:1087 (avResults()); src/index.html:813 (markers()) |
| M06 | 6 | RVEF tiers in PAH (RV page) | 1 | Low / Intermediate / High 1-year risk in PAH | Lewis 2020 (31647310) | src/index.html:815 (markers()) |
| M07 | 7 | RA reservoir strain tiers in PAH (RA page) | 1 | High / Intermediate / Low risk in PAH (<16.1 / 16.1–36.8 / >36.8%) | Guo 2026 (41831721) | src/index.html:824 (markers()) |
| M08 | 8 | RA reservoir strain in ARVC (RA page) | 2 | <18.6%: higher end-stage HF risk in ARVC; <23%: higher malignant ventricular arrhythmia risk in ARVC without LV involvement (…) | Xu 2026 (43018039) | src/index.html:825 (markers()) |
| M09 | 9 | AR regurgitant volume, direct >40 / indirect >62 mL (AR calculator) | 1 | Severe range (>40 / >62 mL) | Polte 2017 (28450039) | src/index.html:1115 (avResults()) |
| M10 | 10 | MR inflow-method RF >30% / RVol >40 mL (MR calculator) | 1 | Severe (>30%, inflow method) / Severe (>40 mL, inflow method) | Polte 2017 (28450039) | src/index.html:1098 (avResults()) |
| M11 | 11 | Secondary MR RF ≥20 / ≥35% (MR calculator) | 2 | Moderate / Severe (…; functional MR with LVEF <50%) | Wang 2023 (37503633) | src/index.html:1097 (avResults()) |
| M12 | 12 | Primary MR LVEDVi ≥100 (MR calculator) | 1 | ≥100 | Myerson 2016 (27189033) | src/index.html:1105 (avResults()) |
| M13 | 13 | Primary MR LA emptying fraction <30% (MR calculator) | 1 | <30%: higher risk after repair | Altes 2025 (40579070) | src/index.html:1106 (avResults()) |
| M14 | 14 | MVP papillary/inferolateral LGE (MR calculator) | 2 | Arrhythmic risk marker (sources now name any-LGE populations) | Figliozzi 2023 (36098639); Constant Dit Beaufils 2021 (33706538) | src/index.html:1108 (avResults()) |
| M15 | 15 | TR volume ≥35 / ≥45 mL (TR calculator) | 1 | Elevated (35–44 mL) / Highest risk (≥45 mL) | Wang 2021 (34521215); Zhan 2020 (32912443) | src/index.html:1084 (avResults()) |
| M16 | 16 | Effective RVEF ≤25% (TR calculator) | 2 | ≤25%: higher mortality in ≥moderate functional TR | Zhang RS 2026 (41995650) | src/index.html:1085 (avResults()) |
| M17 | 17 | Forward SV ÷ RVESV ≤0.57 (TR calculator) | 2 | ≤0.57: higher risk of death or HF hospitalisation in TR | Margonato 2026 (42345088) | src/index.html:1086 (avResults()) |
| M18 | 18 | AS mild limits Vmax >1.65 m/s, MG >4.9 mmHg (AS calculator) | 2 | ≤1.65 / ≤4.9: below the mild-AS limit | Kany 2025 (40175013) | src/index.html:1125 (avResults()) |
| M19 | 19 | AS SVi <35 / <45 (AS calculator) | 2 | <35: below the echo low-flow definition / 35–44: CV mortality after AVR rose more steeply below 45 (severe AS) | Thornton 2022 (35385057) | src/index.html:1127 (avResults()) |
| M20 | 20a | AS LGE presence (AS calculator) | 1 | Higher mortality | Musa 2018 (30002099); EVOLVED 2025 (39466640) in source line | src/index.html:1129 (avResults()) |
| M21 | 20b | AS ECV >27% (AS calculator) | 2 | Higher post-AVR mortality in severe AS (>27%) | Kwak 2021 (34353531) | src/index.html:1130 (avResults()) |
| M22 | 21 | MS planimetric MVA <1.65 (stenosis calculator) | 1 | <1.65: corresponds to cath MVA ≤1.5 | Djavidani 2005 (15963408) | src/index.html:1059 (avResults()) |
| M23 | 22 | RVOT conduit <18 mm (stenosis calculator) | 1 | <18 mm: obstruction likely | Martinez 1992 (1634669) | src/index.html:1063 (avResults()) |
| M24 | 23 | RV mass/volume ≥0.45 in repaired TOF (stenosis calculator) | 2 | ≥0.45: higher death/VT risk after PVR in repaired TOF | Geva 2018 (30030416) | src/index.html:1064 (avResults()) |
| M25 | 24 | Cardiac iron equation 45.0·T2*^−1.22, 1.5 T only (iron calculator) | 1 | mg/g dry weight (1.5 T only) | Carpenter 2011 (21444881; full text) | src/index.html:671 (tableView()) |
| M26 | 25 | AR RF ≥32% (AR calculator) | 2 | ≥32%: associated with death or HF events (source line: Hashimoto 2022, chronic ≥moderate AR) | Hashimoto 2022 (35857306) | src/index.html:1113 (avResults()) |
| M27 | 26 | AR holodiastolic flow reversal (AR calculator) | 1 | Supports significant AR / Absence does not exclude | Kammerlander 2019 (30448117) | src/index.html:1120 (avResults()) |
| M28 | 27 | Primary MR RVol ≥60 mL (MR calculator) | 1 | Severe (≥60 mL: mortality) | Penicka 2018 (29269390) | src/index.html:1104 (avResults()) |
| M29 | 28 | TR fraction ≥50% (TR calculator) | 1 | Highest-risk stratum (≥50%) | Zhan 2020 (32912443) | src/index.html:1082 (avResults()) |
| M30 | 29 | RACI ≥0.62 in functional TR (RA page; TR calculator) | 1 | ≥0.62: higher mortality in functional TR | Zhang RS 2026 (42478366) | src/index.html:823 (markers()) |

## Secondary claims removed in rc3 (not markers; separate count)

These were not verified, so they were removed from result rows, source lines and the valve table. They no longer appear in any calculator result or in copied text (test NO-UNVERIFIED, plus a manual grep).

| ID | Removed claim | Where it was |
|---|---|---|
| S01 | Pre-T-TEER "RVEF ≤45% high risk (Kresoja 2021, HR 6.6)" | TR calculator, RVEF source line |
| S02 | "Houston: ≥30% (Tayal 2021)" | MR calculator, secondary-MR source line |
| S03 | "Cavalcante 2019" as a source for the scar row (now Wang 2023 only) | MR calculator, ventricular-scar source line |
| S04 | "EHRA 2022" | MR calculator, MVP LGE source line |
| S05 | "MAD seen in 76% of UK Biobank" | MR calculator, MAD source line |
| S06 | "matches ESC 2025 >45" | AR calculator, LVESV/BSA source line |
| S07 | "CMR PHT feasible (Lin 2004, n=17)" | Stenosis calculator, PHT source line |
| S08 | "PC reads 6–12 lower" | Valve grading table, AS mean gradient |

**Scope note.** The narrative text on the evidence pages (TR and MR evidence pages) still mentions Cavalcante 2019 and Tayal 2021 as literature context. Those pages were outside the rc3 review (OWNER_CHECKLIST §F). They drive no label, result or copied text.
