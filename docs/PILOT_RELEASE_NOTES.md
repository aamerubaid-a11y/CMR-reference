# CMR Reference 2026.11-rc1: draft pilot release notes

**Status: draft.** This is for a limited pilot with named CMR readers who are told that the app is not
validated. It is not for public release. The app is an educational and reference aid. It has not been
clinically validated and is not a medical device. Always check against the primary sources.

## What changed since the last live version (0af7de5)

- A reference population must be chosen; there is no default sex. Under 18 y gives no adult reference interpretation. The aorta below 20 y, or outside the studied ages, shows "unavailable".
- SCMR reference comparisons ("Within / Above / Below reference") are shown separately from sourced clinical markers. Each marker names its source population.
- Several unsourced or other-modality grades were removed or withheld: supranormal EF, borderline LV mass, echo RVEF tiers, the AS grey zone, generic ECV tiers, echo MS/PS bands, and repaired-TOF timing labels.
- Corrections: the RACI definition (RA minimum volume), the AS AVA operator (≤1.0), the RA strain operator, the AR LGE citation, and the Khan LA bands.
- Iron: you must choose 1.5 T or 3 T. Liver iron concentration (mg/g) is withheld because the calibration could not be verified. Liver T2* and R2* are still shown.
- Near a cut-off, values are shown with extra decimals so that the displayed value never contradicts its label, on screen or in copied text.
- Copied text includes population, method, age group, table, center ranges, and the app and data versions.
- Two reset buttons: "Clear this page" (keeps population and BSA) and "New patient" (clears everything).
- Scan fills fields only after you press Apply, and never sets sex.

## Known limitations

- Tested automatically in Chromium only. Not yet tested on real iPhone or Android devices or with screen readers.
- Accessibility: in the home list, a favourite button sits inside a row button. Screen readers may announce this oddly.
- No independent clinician review yet. The decisions in `ADJUDICATION.md` (Q1–Q5) are pending, and the related outputs are withheld or shown conservatively.
- Some thresholds were verified only from abstracts (see `EVIDENCE.md`, status column).
- Center-specific ranges have no author or date fields.
- No in-app prompt when an update is available. Reload once while online after an update.
- Third-party licence notices (tesseract.js, fonts) are not yet in the app.
- A hematocrit entered as a fraction (0.42) is held with a message, not converted.

## Reporting problems

Send the copied result text (it contains the version) and a description to the app owner. Do not send patient
identifiers.
