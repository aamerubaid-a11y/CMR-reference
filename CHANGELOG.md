# Changelog

## 2026.11-eval1 (final evaluation release; branch remediation/audit-2026-11; code commit 466ac23; build cmr-ref-f576bb84fe)
- Functionality frozen at the owner's request; iterative audit ended. Not tested: the owner elected no further testing.
- Withheld (numbers kept): HF category label; liver iron severity bands; ECV/T1 summary across unmatched SCMR sets; aortic status where rounding crosses the limit. See docs/FINAL_RELEASE.md.
- Version: "2026.11-eval1 (evaluation release; validation incomplete)".

## 2026.11-rc4 (branch remediation/audit-2026-11; code commit 66b1c15; build cmr-ref-df1f2551d3)
Owner case-review decisions (OWNER_CHECKLIST §C2):
- P2 precision: one decimal (two for ratios and valve areas), rounded once; the displayed value is what is copied and graded, everywhere (chambers, valve calculators, aortic diameter and z, ECV/T1/T2). Adaptive extra decimals removed. Example: 52.96 → 53.0 · Within reference. Side effect: aortic case P19 (36.22 mm, z 2.04) now shows +2.0 · Within ±2 SD.
- P3 HF: LVEF <50% → "HFrEF range if clinical HF (LVEF <50%; ESC 2026)"; HFmrEF removed.
- P7 Check inputs: prominent alert at the top of the results; the fields involved are outlined and set `aria-invalid`.
- P9 Khan: graded on the whole-number LAVi (62.4 mild, 62.5 moderate); the source line says which value was graded.
- P10 AR RF ≥32%: "≥32%: associated with death or HF events", with the source; "not a severity grade" wording removed from the label, source line and valve table.
- P15 AS PC mean gradient ≥40: "Severe (≥40 mmHg)", ACC/AHA 2020 Table 13; note that PC-MRI can underestimate.
- P18 liver iron: concentration calculated (Wood 2005, 1.5 T; 3 T via Storey 2007, labelled preliminary), in mg/g and µmol/g, with severity bands as shown on the Columbia T2* calculator.
- P23 ECV/T1: with no center range and no sequence chosen, compared with every SCMR 2025 Table 90/89 set at the field strength ("Within k of n"), labelled not sequence-matched with a center range preferred. New optional native T1 sequence selector (Table 89).
- Iron results table scroll region focusable (axe). Mild wording: "35 to <45" style bands where values now carry one decimal.
- Tests: suite2 215 (see VALIDATION.md for replaced, moved and new tests); axe_extra_rc4.js; aorta sweep compares z with the displayed diameter.

## 2026.11-rc3 (branch remediation/audit-2026-11; code commit 442a377; build cmr-ref-c9f86960bf)
- Evidence: 30 abstract-dependent markers (17 class 1, 13 class 2) plus 8 removed secondary claims (MARKER_INVENTORY.md). Labels narrowed to their source population or endpoint where needed: HF categories (clinical HF), AR LVESVi and AR RF ≥32% (prognostic "High risk", not "Severe"), Hinojar (severe TR), Xu ARVC (both thresholds; LV-involvement caveat), secondary MR (LVEF <50%), effective RVEF, forward SV ÷ RVESV, Kany ("below the mild-AS limit"), Thornton, Kwak, Geva, RACI. Unverified secondary claims removed.
- Licensing: THIRD_PARTY_NOTICES.txt (tesseract.js stack, compiled libraries, English model, fonts) shipped and cached offline. About adds the CC BY 4.0 attribution for the SCMR values, the font OFL text, and the notices pointer (LICENSING.md).
- Version wording is deployment-neutral: "release candidate: evaluation use; validation incomplete". Corrected the About sentence that said inputs are not checked.
- Tests: 190 revised (6 new, 6 updated), plus sw_offline.js. The original suite has 25 pass / 52 fail (AR-32 now superseded).

## 2026.11-rc2 (branch remediation/audit-2026-11, release candidate, not deployed; code commit c68d431)
- Liver ECV ≥32%: source verified in full text (Margonato 2025 Circulation, author postprint). The label now names the TR population and source method ("source method: 1.5 T MOLLI") on screen and in copied text. Other liver ECV papers checked and documented; the source was not replaced.
- TR evidence page: removed mild/moderate/severe wording attributed to Margonato 2025 (it reports hazard thresholds).
- Accessibility: home list rows are now an item button plus a separate, named favourite toggle (`aria-pressed`). This removes the nested interactive control (WCAG 4.1.2). Focus stays on the favourite after toggling.
- Hematocrit: must be a percentage from 15 to 65. The silent fraction conversion was removed. Out of range gives "ECV not calculated" on screen and in the report, and Copy is refused.
- Copied text: no longer lowercases acronyms (HF, TR, PAH…). Iron and aortic rows now include the measured T2*/R2* and diameter. The "Check inputs" note is carried into copied and report text.
- Tests: 184 revised (was 172), plus `owner_cases.js` (23 owner cases). APP_VERSION 2026.11-rc2; build cmr-ref-af44e7d671.

## 2026.11-rc1 (branch remediation/audit-2026-11, release candidate, not deployed)
- Evidence closure: AR LVEF ≤55% and AS mean gradient ≥40 verified in the ACC/AHA 2020 full text (Tables 15 and 13) and relabelled to match the source. Liver iron concentration withheld in the UI and copied text (Wood 2005 calibration not verifiable; Storey 2007 3 T conversion preliminary and not applied); liver T2* and R2* still shown.
- Population: the chamber "Under 20" group becomes "Under 18 y" (SCMR adult datasets are 18+). The aorta stays unavailable below 20 (youngest SCMR group is 20–29).
- Adaptive precision at every cut-off (SCMR limits, markers, valve tables, aorta z ±2, ECV/T1/T2), so the shown value never contradicts its label on screen or in copied text. Replaces the earlier "near cut-off" note.
- Evidence card citation corrected (Zhang RS, JACC Cardiovasc Imaging 2026;19:810–21).
- APP_VERSION 2026.11-rc1; build cmr-ref-f34dd26b4a.
- Docs: decision sheet, 77-test disposition, device checklist, proposed synthetic cases, pilot release notes, merge/deploy/rollback steps; aortic transcription check script.

## 2026.11-r1 (branch remediation/audit-2026-11, not released)
- Reference population must be chosen (Adult male / Adult female / Under 20). No silent male default.
- Results show the reference comparison (within/above/below SCMR limits) separately from clinical markers, each
  marker with its source and population. The active reference context is shown beside the results.
- Under 20 years, outside the studied aortic age groups, or with no reference: explicit "interpretation
  unavailable" state; values are still calculated.
- Withheld: LV size grades outside DCM/ICM, supranormal LVEF, LV mass borderline band, general RVEF tiers,
  RV/LV mild/moderate, Simpson LA tiers, RA SD tiers, RA area bands, repaired-TOF thresholds, Geva criteria,
  AS grey zone, ECV "amyloid" flag, generic ECV tiers, MS PHT/gradient grades, PS moderate band, liver iron label.
- Fixed: RV/LV ratio no longer presented as SCMR; RACI uses RA end-diastolic volume; AS AVA ≤1.0 operator;
  Kim RA strain <6.6 operator; Khan LA grades use the authors' boundaries; AR LGE citation; TR fraction relabelled
  as risk strata; cardiac T2* requires 1.5 T / 3 T and uses Table 100 cut-offs for each.
- Copy and report include population, method, age group, table, center ranges and app/data version.
- One-decimal display, with a note when a value sits on a cut-off after rounding.
- "Clear this page" vs "New patient" made explicit. Scan values are applied only after the user presses Apply;
  detected sex is never applied.
- Center ranges: invalid min/max reported. Version shown in About. aria-pressed on toggle buttons.

## 2026.11 (main, commit 0af7de5) — audited baseline
