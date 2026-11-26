# Evidence matrix: implemented interpretations

Checked November 2026 on branch `remediation/audit-2026-11` (app version `2026.11-rc1`; RC review 26 Nov 2026). Code locations refer to
`src/index.html`. Status key:

- **Verified (full text)**: threshold, operator, units, population and method checked in the full paper.
- **Verified (abstract)**: threshold and operator stated in the PubMed abstract; full text not read.
- **Secondary**: checked only in a review or citing paper.
- **Unverified / inaccessible**: source not retrievable here; interpretation withheld unless noted.
- **Withheld**: no longer shown as a classification.
- **Adjudication**: withheld until a CMR clinician decides (see ADJUDICATION.md).

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
| TR fraction strata | ≥20 elevated; ≥40 high; ≥50 highest | Margonato 2025 Circulation; Zhan 2020 JACC (abstracts) | Functional TR | tr-calc | Verified; **relabelled as risk strata** (sources do not name mild/moderate/severe) |
| TR volume | ≥35; ≥45 | Wang 2021; Zhan 2020 (abstracts) | TR | tr-calc | Verified (abstract) |
| Effective RVEF | ≤25% | Zhang 2026 JACC CVI (abstract) | TR | tr-calc | Verified (abstract) |
| Forward SV ÷ RVESV | ≤0.57 | Margonato 2026 Circ CVI (abstract) | TR | tr-calc | Verified (abstract) |
| Liver ECV | ≥32% | Margonato 2025 (abstract) | TR | tr-calc | Verified (abstract) |
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

Note for the owner: a separate 2026 hepatic ECV paper exists (Villar-Calle, Circ Cardiovasc Imaging 2026, doi 10.1161/CIRCIMAGING.125.018988). The app's liver ECV ≥32% cut-off is attributed to Margonato 2025 and was not re-checked against it.
