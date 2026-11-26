# CMR Reference 2026.11-rc3: draft pilot release notes

**Status: draft.** This is for a limited pilot with named CMR readers who are told that the app is not
validated. It is not for public release. The app is an educational and reference aid. It has not been
clinically validated and is not a medical device. Always check against the primary sources.

## What changed since the last live version (0af7de5)

- A reference population must be chosen; there is no default sex. Under 18 y gives no adult reference interpretation. The aorta below 20 y, or outside the studied ages, shows "unavailable".
- SCMR reference comparisons ("Within / Above / Below reference") are shown separately from sourced clinical markers. Each marker names its source population.
- Several unsourced or other-modality grades were removed or withheld: supranormal EF, borderline LV mass, echo RVEF tiers, the AS grey zone, generic ECV tiers, echo MS/PS bands, and repaired-TOF timing labels.
- Corrections: the RACI definition (RA minimum volume), the AS AVA operator (≤1.0), the RA strain operator, the AR LGE citation, and the Khan LA bands.
- Iron: you must choose 1.5 T or 3 T. Liver iron concentration (mg/g) is withheld because the calibration could not be verified. Liver T2* and R2* are still shown.
- Liver ECV label names its source population and method; hematocrit must be a percentage; copied text keeps measured inputs and acronyms.
- Near a cut-off, values are shown with extra decimals so that the displayed value never contradicts its label, on screen or in copied text.
- Copied text includes population, method, age group, table, center ranges, and the app and data versions.
- Two reset buttons: "Clear this page" (keeps population and BSA) and "New patient" (clears everything).
- Scan fills fields only after you press Apply, and never sets sex.

## Known limitations

- Tested automatically in Chromium only. Not yet tested on real iPhone or Android devices or with screen readers.
- Accessibility: only automated checks (axe-core, no violations on 5 pages × 2 themes) and scripted keyboard tests. No real screen-reader session yet. This is not a claim of accessibility compliance.
- No independent clinician review yet. The decisions in `ADJUDICATION.md` (Q1–Q5) are pending, and the related outputs are withheld or shown conservatively.
- Some thresholds were verified only from abstracts (see `EVIDENCE.md`, status column).
- Center-specific ranges have no author or date fields.
- No in-app prompt when an update is available. Reload once while online after an update.
- Third-party notices are shipped (THIRD_PARTY_NOTICES.txt). SCMR values are reused under the article's CC BY 4.0 licence with attribution (LICENSING.md).
- Several labels describe prognostic thresholds from single studies in specific populations (named in each label); they are not severity grades.
- Hematocrit must be entered as a percentage (15–65). Anything else gives no ECV.
- Liver ECV ≥32% comes from one network's 1.5 T MOLLI method and is not externally validated. It may not apply to other sequences.

## Reporting problems

Send the copied result text (it contains the version) and a description to the app owner. Do not send patient
identifiers.
