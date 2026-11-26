# Evidence matrix: implemented interpretations

Checked November 2026 on branch `remediation/audit-2026-11` (app version `2026.11-rc3`; reviewed 26 Nov 2026). Code locations refer to
`src/index.html`. Status key:

- **Verified (full text)**: threshold, operator, units, population and method checked in the full paper.
- **Verified (abstract)**: threshold and operator stated in the PubMed abstract; full text not read.
- **Secondary**: checked only in a review or citing paper.
- **Unverified / inaccessible**: source not retrievable here; interpretation withheld unless noted.
- **Withheld**: no longer shown as a classification.
- **Adjudication**: withheld until a CMR clinician decides (see ADJUDICATION.md).

## Abstract-dependent markers: rc3 disposition (authoritative for these rows)

The earlier "25 markers checked against abstracts only" was a miscount: it counted 24 rows plus the legend line.
This table covers those 24 rows plus 5 more where the decisive threshold rests on an abstract: 29 numbered rows,
with row 20 split into 20a/20b, so **30 markers**. Class 1: 17. Class 2: 13. Class 3: 0. The authoritative
inventory with IDs, active wording and code locations is `MARKER_INVENTORY.md`.
Every marker was re-read against the PubMed record: abstract text, or full text where marked. Each appears on
screen in the result row, and the label (the "pill") is what is copied and exported. Class key: **1** = adequately
supported for its stated use; **2** = supported only with the narrower wording now shown; **3** = insufficiently
verified, withheld or removed. Evidence sufficiency is separate from whether a marker applies at your centre or to
your patients (OWNER_CHECKLIST §A). All 29 are enabled in the pilot candidate.

| # | Marker (calculator) | Displayed label (rc3; also copied) | Source checked (PMID) | Supports threshold / definition / population / interpretation? | Missing detail that could change applicability | Class |
|---|---|---|---|---|---|---|
| 1 | LVEF ≤40 / 41–49 (LV) | "HFrEF range if clinical HF (≤40%)" / "HFmrEF range if clinical HF (41–49%)" | Bozkurt 2021 Universal Definition (33605000) | Yes: defined for **symptomatic HF**. The old label implied any patient | Consensus, modality-agnostic | 2 |
| 2 | LVESVi ≥45 (LV AR context; AR calc) | "≥45 mL/m²: higher risk in chronic ≥moderate AR with no or minimal symptoms" | Hashimoto 2022 (35857306) | Yes: n=178; composite death, HF hospitalisation or NYHA progression on medical therapy. "Matches ESC 2025 >45" removed (not verified) | Contouring convention not in abstract | 2 |
| 3 | LVEDV >246 mL (LV AR context; AR calc) | LV page: ">246 mL: progression to surgery in AR"; AR calc: "Above 246 mL" | Myerson 2012 (22879371) | Yes: AUC 0.88, progression to symptoms or surgery indication, n=113 | Unindexed | 1 |
| 4 | RV/LV EDV ≥1.27 in TR (RV; TR calc) | RV page: "≥1.27: higher mortality in TR"; TR calc: "≥1.27 (weak, HR 1.47)" | Zhang RS 2025 JACC Adv (40614565) | Yes: ≥moderate TR, n=949, aHR 1.47 | Origin of the 1.27 normal limit not in abstract | 1 |
| 5 | RVEF <50 / 50–60 / >60; RVEDVi >150 / 100–150 (RV TR context; TR calc) | "High / Intermediate risk in severe TR (…)" | Hinojar 2025 (40120094) | Yes: ≥severe TR by echo, n=314, death or HF. TR-calc labels now name severe TR | Boundary inclusivity at 50/60/100/150 not stated | 2 |
| 6 | RVEF >54 / 37–54 / <37 in PAH (RV) | "Low / Intermediate / High 1-year risk in PAH" | Lewis 2020 ASPIRE (31647310) | Yes: PAH, discovery/test cohorts, 1-year mortality | — | 1 |
| 7 | RA reservoir strain 16.1 / 36.8 in PAH (RA) | "High / Intermediate / Low risk in PAH" | Guo 2026 JCMR (41831721) | Yes: n=348, 1-year mortality strata | Feature-tracking software not in abstract (strain is vendor-dependent); inclusivity not stated | 1 (applicability: centre software) |
| 8 | RA reservoir strain <18.6 / <23 in ARVC (RA) | "<18.6%: higher end-stage HF risk"; "<23%: higher malignant ventricular arrhythmia risk in ARVC without LV involvement (not significant with LV involvement)". Both now shown when <18.6 | Xu 2026 JAHA (43018039) | Yes, but the <23% association was not significant with LV involvement, so the label is narrowed | Software; no external validation | 2 |
| 9 | AR RVol >40 direct / >62 indirect (AR calc) | "Severe range (>40 / >62 mL)" | Polte 2017 (28450039) | Yes: method-specific, n=38 surgical cohort | Small cohort | 1 |
| 10 | MR inflow method RF >30 / RVol >40 (MR calc) | "Severe (>30%, inflow method)" | Polte 2017 (28450039) | Yes: MiIF−AoFF method | Small cohort | 1 |
| 11 | Secondary MR RF ≥20 / ≥35 (MR calc) | "Moderate / Severe (…; functional MR with LVEF <50%)" | Wang 2023 (37503633) | Yes: ICM/NICM with LVEF <50%, n=1,414; death, transplant or LVAD. "Houston ≥30% (Tayal 2021)" removed (not verified) | Atrial functional MR not covered | 2 |
| 12 | Primary MR LVEDVi ≥100 (MR calc) | "≥100" | Myerson 2016 (27189033) | Yes: asymptomatic primary MR; progression to surgery (weak) | Circular endpoint (surgery) | 1 |
| 13 | Primary MR LA emptying fraction <30% (MR calc) | "<30%: higher risk after repair" | Altes 2025 (40579070) | Yes: primary MR before repair, n=284, aHR 3.78 | LAEF method not in abstract | 1 |
| 14 | MVP LGE (MR calc) | "Arrhythmic risk marker" | Figliozzi 2023 Radiology (36098639); Constant Dit Beaufils 2021 (33706538) | Yes: any LGE, HR 4.2 (VT/SCD/syncope) and HR 2.6 (CV events). "EHRA 2022" removed; MAD "76% of UK Biobank" removed | Field asks about papillary/inferolateral LGE; sources studied any LGE | 2 |
| 15 | TR volume ≥35 / ≥45 (TR calc) | "Elevated (35–44 mL)" / "Highest risk (≥45 mL)" | Wang 2021 (34521215); Zhan 2020 (32912443) | Yes: isolated severe TR (Wang); functional TR (Zhan) | Quantification method not in abstracts (the same Houston group's companion paper used RV SV − pulmonary flow) | 1 |
| 16 | Effective RVEF ≤25% (TR calc) | "≤25%: higher mortality in ≥moderate functional TR" | Zhang RS 2026 JACC CVI (41995650) | Yes: forward volume ÷ RVEDV; derivation n=453 and 2 external cohorts. Unverified site names removed | — | 2 |
| 17 | Forward SV ÷ RVESV ≤0.57 (TR calc) | "≤0.57: higher risk of death or HF hospitalisation in TR" | Margonato 2026 Circ CVI (42345088) | Yes: spline cut-off, n=631, aHR 2.36. Old label "RV–PA uncoupling" overstated a surrogate | Single network | 2 |
| 18 | AS Vmax >1.65, MG >4.9 (AS calc) | "≤1.65 / ≤4.9: below the mild-AS limit" (was "no AS") | Kany 2025 (40175013) | Yes: >95th percentile in healthy UK Biobank, deep-learning PC-MRI | Automated measurement; population cohort | 2 |
| 19 | AS SVi <35 / <45 (AS calc) | "<35: below the echo low-flow definition"; "35–44: CV mortality after AVR rose more steeply below 45 (severe AS)" | Thornton 2022 (35385057) | <45: yes (severe AS undergoing AVR, n=674). <35 is the echo convention quoted in the abstract, not a CMR-derived cut-off | CMR SV runs higher than echo | 2 |
| 20a | AS LGE presence (AS calc) | "Higher mortality"; source names EVOLVED (verified: JAMA 2025, PMID 39466640) | Musa 2018 (30002099) | Yes: severe AS listed for AVR, aHR 2.39 | — | 1 |
| 20b | AS ECV >27% (AS calc) | "Higher post-AVR mortality in severe AS (>27%)" | Kwak 2021 (34353531) | Yes: severe AS before AVR, derivation and validation | ECV sequence-dependent | 2 |
| 21 | MS planimetry <1.65 (stenosis calc) | "<1.65: corresponds to cath MVA ≤1.5" | Djavidani 2005 (15963408) | Yes: n=22 (17 cath), 1.5 T trueFISP | Small cohort | 1 |
| 22 | RVOT conduit <18 mm (stenosis calc) | "<18 mm: obstruction likely" | Martinez 1992 (1634669) | Yes: n=52; abstract notes calcified obstruction could be missed (now stated) | 1992 spin-echo technique | 1 |
| 23 | RV mass/volume ≥0.45 (stenosis calc) | "≥0.45: higher death/VT risk after PVR in repaired TOF" | Geva 2018 INDICATOR (30030416) | Yes: pre-PVR repaired TOF, HR 4.08 | — | 2 |
| 24 | Cardiac iron [Fe] = 45.0 × T2*^−1.22 (iron) | mg/g shown at 1.5 T only | Carpenter 2011 (21444881), **full text PMC3435874** | Yes: 1.5 T Siemens Sonata, 12 ex-vivo hearts, mid-septal R2* | Calibration range mostly T2* 2–12 ms | 1 |
| 25 | AR RF ≥32% (AR calc) | "High risk (≥32%: death or HF events)" (was "Severe") | Hashimoto 2022 (35857306) | Threshold yes; **not a severity grade** in the source. The valve table now says "outcome threshold; not a defined severity grade" | — | 2 |
| 26 | AR holodiastolic reversal (AR calc) | "Supports significant AR" | Kammerlander 2019 (30448117) | Yes: significant AR defined by HRF; HR 2.77 | — | 1 |
| 27 | Primary MR RVol ≥60 (MR calc) | "Severe (≥60 mL: mortality)" | Penicka 2018 (29269390) | Yes: severe pre-defined as RVol ≥60 (LVSV − aortic flow); severe vs moderate predicted mortality in asymptomatic primary MR | Method-specific | 1 |
| 28 | TR fraction ≥50% (TR calc) | "Highest-risk stratum (≥50%)" | Zhan 2020 (32912443) | Yes: functional TR, n=547 | Method as in #15 | 1 |
| 29 | RACI ≥0.62 (RA TR context; TR calc) | "≥0.62: higher mortality in functional TR" | Zhang RS 2026 Circ CVI (42478366) | Yes: RA ÷ RV end-diastolic volume; Youden cut-off; n=633 | Single centre; no external validation | 1 |

**Removed secondary claims (S01–S08 in MARKER_INVENTORY.md; a separate count, not markers):** these were not threshold labels and could not be verified here.
They have been removed from the interface (test NO-UNVERIFIED):
- pre-T-TEER "RVEF ≤45% high risk (Kresoja 2021, HR 6.6)";
- "Houston ≥30% (Tayal 2021)";
- "Cavalcante 2019" as a source for the scar row (now Wang 2023 only);
- "EHRA 2022";
- "MAD in 76% of UK Biobank";
- "matches ESC 2025 >45";
- "CMR PHT feasible (Lin 2004)";
- "PC reads 6–12 lower" (valve table).

Kept with verified support: post-T-TEER caution (Bombace 2025, PMID 41147662) and the EVOLVED statement.

**Not re-reviewed in this pass:** reference cards on the evidence pages, which are descriptive literature notes
rather than result labels, and the SCMR/EACVI 2017 timing hint in the ECV input warning (Messroghli 2017, not
re-read).

## Reference intervals (statistical, shown as "Within / Above / Below reference")

| Parameter | Source location | Population / method | Code | Status |
|---|---|---|---|---|
| LV volumes, EF, mass (papillary in mass) | SCMR 2025 Table 2 | Adults, bSSFP SAX | `ITEMS[lv-vol].methods.mass` | Verified (full text), all values |
| LV (papillary in volume) | SCMR 2025 Table 3 | Adults | `methods.vol` | Verified (full text) |
| LV by age decade | SCMR 2025 Table 5 | Adults 20 to ≥70 | `LV_AGE` | Verified (full text), 54 rows |
| RV (trabeculae in mass / volume) | SCMR 2025 Tables 8, 9 | Adults | `ITEMS[rv-vol]` | Verified (full text) |
| LA biplane / Simpson | SCMR 2025 Table 13 | Adults | `ITEMS[la-vol]` | Verified (full text) |
| RA single-plane / Simpson | SCMR 2025 Table 18 (female min LL withheld per footnote a) | Adults | `ITEMS[ra-vol]` | Verified (full text) |
| Aortic diameters | SCMR 2025 Tables 63, 65, 67 | Adults 20–79 (MESA 45–84) | `AO`, `aoResults`, `groupIdx` | Verified (full text), 136 values; outside studied ages now "unavailable"; RC transcription re-check `tests/aorta_transcription.py`: 116 mean/SD pairs + 16 percentile values vs SCMR text, 0 mismatches ("All" rows not compared) |
| ECV by sequence | SCMR 2025 Table 90 | Adults, septal ROI | `ECV_REF` | Verified (full text) |
| Cardiac T2* grading 1.5 T and 3 T | SCMR 2025 Table 100 | Iron overload | `cardCat` | Verified (full text) |
| RV/LV EDV ratio normal limit 1.27 | Altmayer 2018 Sci Rep (Methods: 152 controls, Han et al. ref 5) | Controls; PH-focused group | `markers()` rv-vol | Secondary for the controls (Han et al. not read); **removed from the SCMR table** |

## Clinical classifications and risk markers (shown as separately labelled markers)

| Interpretation | Rule in app | Source location | Population / method | Code | Status |
|---|---|---|---|---|---|
| HF LVEF categories | ≤40 reduced; 41–49 mildly reduced | Bozkurt 2021, Universal Definition of HF (abstract) | Patients with HF; modality-agnostic | `markers()` lv-vol ef | Verified (abstract) |
| Kang LVEDVi grades | M: >100 / 150 / 200; F: >90 / 130 / 170 | Kang 2026 JACC 88:773, Fig 1C | DCM/ICM; papillary in blood pool | `KANG`, `markers()` ctx `cm` | Verified (full text); now **DCM/ICM context only** |
| AR LVESVi | ≥45 mL/m² | Hashimoto 2022 JAMA Cardiol (abstract) | Asymptomatic moderate–severe AR | `markers()` ctx `ar` | Verified (abstract) |
| AR LVEDV | >246 mL | Myerson 2012 Circulation (abstract) | AR | `markers()` ctx `ar` | Verified (abstract) |
| RV/LV ratio severe | ≥2.30 | Altmayer 2018, Results (full text) | PH, n=62, 8 deaths | `markers()` ctx `pah` | Verified (full text); mild/moderate **withheld** (authors call the split arbitrary) |
| RV/LV ratio in TR | ≥1.27 | Zhang 2025 JACC Adv (abstract) | TR, n=949 | `markers()` ctx `tr` | Verified (abstract) |
| RVEF / RVEDVi in TR | <50 / 50–60 / >60; >150 / 100–150 / <100 | Hinojar 2025 EHJ-CI (abstract) | Severe TR, n=314 | `markers()` ctx `tr` | Verified (abstract) |
| RVEF in PAH | >54 / 37–54 / <37 | Lewis 2020 ASPIRE (abstract) | PAH | `markers()` ctx `pah` | Verified (abstract) |
| RVEF severity tiers (45/40/30) | — | Muraru 2020 (3D echo) | 3D echo | — | **Withheld** (other modality) |
| Repaired-TOF RV thresholds | — | Bokma 2023 (RVESVi >80, abstract); Geva (via 2022 review) | Repaired TOF | — | **Adjudication** |
| LV mass borderline (+1 SD men) | — | Bluemke 2008 (≥95th percentile in abstract) | MESA | — | **Withheld** (subdivides reference interval) |
| Supranormal LVEF | — | Krittayaphong 2025; Shah 2022 (abstracts) | CMR referral / community cohorts | — | **Adjudication** |
| Khan LA grades | <52 / 52–62 / 63–73 / >73 | Khan 2019 JCMR, Table 2 (full text) | 10,890 referrals; biplane, appendage excluded | `KHAN`, `markers()` la-vol | Verified (full text); now uses Khan's own boundaries, not SCMR UL + Khan |
| EACVI Simpson LA tiers | — | Petersen 2019 (2/3/4 SD bands from Maceira 2010 CMR volunteers) | CMR volunteers | — | **Withheld** (SD extrapolation). Audit error corrected: these were CMR-derived SD bands, not 3D echo |
| LACI | >25% | Pezel 2022 Front CV Med (full text, MESA women); Pezel 2021 Hypertension (not retrieved) | MESA, no CVD | `markers()` laci | Verified (full text, companion paper) |
| RA PH marker | Simpson max RAVi >74 | Bredfelt 2018 ESC HF (full text) | Pre-capillary PH, n=75; appendage included | `markers()` ra-vol | Verified (full text); label corrected from "PAH" |
| RA area bands | — | ESC/ERS echo bands | Echo | — | **Withheld** |
| RACI | ≥0.62, **RA end-diastolic (minimum) volume ÷ RVEDV** | Zhang 2026 Circ CV Imaging (abstract); Naami 2026 review Table (full text) | Functional TR | `derive()`, `markers()`, TR calc `ra` | Verified; **definition error fixed** (app used RA maximum) |
| RA reservoir strain, PAH | <16.1 / 16.1–36.8 / >36.8 | Guo 2026 JCMR (abstract) | PAH, n=348 | `markers()` | Verified (abstract); inclusivity at 16.1/36.8 not stated |
| RA reservoir strain, ARVC | <23 / <18.6 | Xu 2026 JAHA (abstract) | ARVC | `markers()` | Verified (abstract) |
| RA longitudinal strain, TR | <6.6% → RAP >10 | Kim 2026 JCMR (full text) | Severe TR, n=47 | `markers()` | Verified (full text); **operator fixed** (≤6.6 → <6.6) |
| AR RF | <15 mild; ≥32 severe; between = intermediate | Steeds & Myerson 2020 Heart Table 3 CMR row (full text); Hashimoto 2022 (abstract) | CMR | `avResults` ar-calc | Verified. Conflict: Steeds & Myerson list severe AR RF >35–40%; outcome-derived Hashimoto ≥32 governs |
| AR RVol | >40 direct; >62 indirect | Polte 2017 Am J Cardiol (abstract) | Surgical cohort, n=38 | ar-calc | Verified (abstract) |
| AR holodiastolic reversal | presence = significant AR | Kammerlander 2019 (abstract) | AR | ar-calc | Verified; label corrected from "severe" to "significant" |
| AR LGE | presence, adjusted HR 2.53 | Malahfji 2020 JAHA Table 2 (full text) | Chronic AR | ar-calc | Verified; **citation corrected** (journal) |
| AR LVEF ≤55 | ≤55% | ACC/AHA 2020 valve guideline, Table 15 stage C2 (pp. e105–106) and Rec 4.3.3 (full text) | Chronic severe AR; echo-based | ar-calc | **Verified (full text)**. Label: "meets the stage C2 LVEF criterion if AR is chronic and severe". Not a recommendation |
| Primary MR RF / RVol | <20 mild; >40 severe; RVol >55; ≥60 | Steeds & Myerson 2020; Myerson 2016 (abstract); Penicka 2018 (abstract, pre-defined) | Primary MR | mr-calc | Verified. Conflict: Polte 2017 LVSV−AoFF severe RF >41 / RVol >64 (documented) |
| MR inflow method | RF >30, RVol >40 | Polte 2017 (abstract) | MR | mr-calc | Verified (abstract) |
| Secondary MR RF | ≥20 moderate, ≥35 severe | Wang 2023 Circ CV Imaging (abstract) | ICM/NICM, n=1,414 | mr-calc | Verified (abstract) |
| MR LVEDVi | ≥100 | Myerson 2016 (abstract) | Primary MR | mr-calc | Verified (abstract) |
| MR LA emptying fraction | <30% | Altes 2025 JACC Adv (abstract) | Primary MR, surgery | mr-calc | Verified (abstract) |
| MVP LGE | presence | Figliozzi 2023 (HR 4.2), Constant Dit Beaufils 2021 (HR 2.6) (abstracts) | MVP | mr-calc | Verified (abstract) |
| TR fraction strata | ≥20 elevated; ≥40 high; ≥50 highest | Margonato 2025 Circulation (full text, author postprint; spline relative hazard >1 from 20%, >2 from 40%); Zhan 2020 JACC (abstract) | TR across the severity spectrum (Margonato); functional TR (Zhan) | tr-calc | Verified; **relabelled as risk strata**. rc2: TR evidence page text corrected (it still named mild/moderate/severe) |
| TR volume | ≥35; ≥45 | Wang 2021; Zhan 2020 (abstracts) | TR | tr-calc | Verified (abstract) |
| Effective RVEF | ≤25% | Zhang 2026 JACC CVI (abstract) | TR | tr-calc | Verified (abstract) |
| Forward SV ÷ RVESV | ≤0.57 | Margonato 2026 Circ CVI (abstract) | TR | tr-calc | Verified (abstract) |
| Liver ECV | ≥32% | Margonato D et al. Circulation 2025;152(25):1769–80, doi 10.1161/CIRCULATIONAHA.125.074862; full text read from the author postprint in ORBi (handle 2268/339470). Methods p.1771; statistics p.1772; Fig 3 p.1776; Table 4 p.1777; limitations pp.1778–9 | 371 of 489 patients referred for CMR with TR quantification (2 Minnesota centres, 2019–24), with liver mapping; known primary liver disease excluded. **Method:** 1.5 T Siemens, motion-corrected MOLLI with inline ECV map, liver ROI avoiding the IVC and hepatic veins, same-day venous hematocrit. **Endpoint:** death or HF hospitalisation under medical management (censored at TV intervention). **Threshold:** where the spline relative hazard and its whole CI exceeded 1; no reference range exists | tr-calc | **Verified (full text)**. Single network, no external validation; authors say liver ECV sequences are not standardised. **rc2:** label changed from "congestion, higher risk" to "≥32%: associated with right-sided HF and adverse outcomes in TR (source method: 1.5 T MOLLI)" on screen and in copy; the source line states the method limits. The numeric liver ECV is always shown |
| Septal non-ischemic LGE | presence | Naami 2026 review (full text, n=663) | Functional TR | tr-calc | Secondary; HR 1.79 removed (not verified) |
| PR fraction | <20 / 20–40 / >40 | 2022 Frontiers CV Med review (full text) | Repaired-TOF convention | pr-calc | Secondary (review); not outcome-derived |
| PR timing criteria (Geva) | — | via 2022 review | Repaired TOF | pr-calc | **Adjudication** |
| AS AVA | ≤1.0 severe | SCMR 2025 Table 57 (full text) | Adapted from echo | as-calc | Verified; **operator fixed** (<1.0 → ≤1.0); grey zone **withheld** (Debl 2005 abstract reports 15% overestimation only) |
| AS AVA/BSA, Vmax | ≤0.6; ≥4 / ≥5 | SCMR 2025 Table 57 | Adapted from echo | as-calc | Verified (full text) |
| AS mild limits | Vmax >1.65; MG >4.9 | Kany 2025 JACC (abstract) | UK Biobank >95th percentile | as-calc | Verified (abstract) |
| AS mean gradient ≥40 | ≥40 mmHg | ACC/AHA 2020 valve guideline, Table 13 (p. e91) (full text) | Doppler echo | as-calc | **Verified (full text)**; labelled as Doppler criterion; app notes PC-MRI reads lower |
| AS SVi | <35 low flow; <45 higher post-AVR mortality | Thornton 2022 JAMA Cardiol (abstract) | Severe AS, AVR | as-calc | Verified (abstract) |
| AS LGE / ECV | presence (Musa 2018); >27% (Kwak 2021) | abstracts | AS | as-calc | Verified (abstract); ECV ≥38 "amyloid" flag **removed** (no source) |
| MS planimetry | <1.65 ≈ cath ≤1.5 | Djavidani 2005 JACC (abstract) | n=22 | sten-calc | Verified (abstract) |
| MS PHT / mean gradient | — | Echo criteria | Echo | — | **Withheld** |
| PS peak velocity | >4 severe | SCMR 2025 Table 57 | Adapted from echo | sten-calc | Verified; moderate 3–4 **withheld** |
| RVOT conduit | <18 mm | Martinez 1992 JACC (abstract) | Conduits, n=52 | sten-calc | Verified (abstract) |
| RV mass/volume (TOF) | ≥0.45 g/mL | Geva 2018 Circulation (abstract) | Pre-PVR repaired TOF | sten-calc | Verified (abstract) |
| ECV generic tiers (29/36/20%) | — | none specific | — | — | **Withheld**; pooled mean 25.9% (Gottbrecht 2019, abstract) shown for orientation only |
| Cardiac iron equation | 45.0 × T2*^−1.22 | Carpenter 2011 Circulation (abstract) | 1.5 T | `cardFe` | Verified (abstract); shown at 1.5 T only |
| Liver iron equation | 0.0254 × R2* + 0.202 | Wood 2005 Blood | 1.5 T | — | **Primary inaccessible** (only secondary citations seen). LIC **withheld in UI and copied text**; liver T2* and R2* still shown |
| Liver normal limit 1.8 mg/g | — | not located | — | — | **Withheld** (no LIC shown) |
| 3 T liver conversion | (R2*3T + 11)/2 | Storey 2007 JMRI (equation present in abstract) | Preliminary, n=20 + 14 | — | Equation verified from abstract; **not applied** (preliminary; LIC withheld) |


## Publication status of 2026 sources (PubMed, checked 26 Nov 2026)

All are indexed in PubMed as journal articles with issue and page or article numbers; none is a preprint.

| Source as cited in app | PubMed record | DOI |
|---|---|---|
| Kang 2026 (LVEDVi grades) | J Am Coll Cardiol 2026;88(7):773–776, brief report, PMID 41984015 (no abstract in PubMed) | 10.1016/j.jacc.2026.03.033 |
| Zhang RS 2026 (effective RVEF) | JACC Cardiovasc Imaging 2026;19(7):810–821, PMID 41995650 | 10.1016/j.jcmg.2026.02.018 |
| Zhang 2026 (RACI) | Circ Cardiovasc Imaging 2026;19(8):e019813, PMID 42478366 | 10.1161/CIRCIMAGING.126.019813 |
| Margonato 2026 (forward SV ÷ RVESV ≤0.57, aHR 2.36) | Circ Cardiovasc Imaging 2026;19(7):e019717, PMID 42345088; abstract confirms cut-off and HR | 10.1161/CIRCIMAGING.126.019717 |
| Guo 2026 (RA strain, PAH) | J Cardiovasc Magn Reson 2026, article 102711, PMID 41831721 (volume not in record) | 10.1016/j.jocmr.2026.102711 |
| Kim 2026 (RA strain, RAP) | J Cardiovasc Magn Reson 2026;28(1):102710, PMID 41825694 | 10.1016/j.jocmr.2026.102710 |
| Xu 2026 (RA strain, ARVC) | J Am Heart Assoc 2026;15(22):e050695, PMID 43018039 | 10.1161/JAHA.126.050695 |
| Naami 2026 (review) | J Cardiovasc Dev Dis 2026;13(11), PMID 43083064 | 10.3390/jcdd13110557 |

### Other liver ECV papers (checked; not used to replace the source)

- Villar-Calle et al. Circ Cardiovasc Imaging 2026;19(3):e018988 (PMID 41568441; abstract only, no PMC copy). Weill Cornell; 234 patients with ≥moderate TR. Hepatic ECV in tertiles (cut-offs 32.5% and 41.3%; mean 37.7%). Endpoint: all-cause mortality. Supports liver ECV as a prognostic marker, but uses a different centre, method and endpoint, and no 32% threshold. It neither confirms nor contradicts Margonato's cut-off. Its higher mean suggests absolute values vary between centres or methods.
- Margonato et al. JACC Cardiovasc Imaging 2026, doi 10.1016/j.jcmg.2026.08.015 (ORBi summary only). Same group and likely overlapping cohort (462 patients). Uses an above-median split (31%); adjusted HR 1.82. Not independent validation.

Disposition: keep the cited Margonato 2025 threshold, labelled with its population and method. It is not interchangeable across sequences, so applying it at the owner's centre is an owner decision (OWNER_CHECKLIST A3).
