# Changelog

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
