# Release-candidate package: 2026.11-rc1

Branch `remediation/audit-2026-11`. Parent commit c0f2f52. The RC commit is the commit that adds this file.
Not merged, deployed or published.

## Contents

| Item | File |
|---|---|
| Diff since c0f2f52 / full diff vs baseline 0af7de5 | `rc1-since-c0f2f52.diff` / `remediation.diff` |
| Change summary | `../CHANGELOG.md` (2026.11-rc1) |
| Evidence matrix, including 2026 publication status | `EVIDENCE.md` |
| Decision sheet (Q1–Q5) | `ADJUDICATION.md` |
| 77-test disposition | `TEST_DISPOSITION.md` |
| Final test results, commands, environment | `VALIDATION.md`, `../tests/results/*rc1*` |
| Device / keyboard / screen-reader checklist | `DEVICE_CHECKLIST.md` |
| Proposed synthetic validation cases | `PROPOSED_VALIDATION_CASES.md` |
| Draft pilot release notes and known limitations | `PILOT_RELEASE_NOTES.md` |
| Merge, deployment verification, stale-cache detection, rollback | `RELEASE_CHECKLIST.md` |

## Changes since c0f2f52

1. Liver iron concentration withheld (UI and copied text). Liver T2* and R2* kept.
2. AR LVEF ≤55% and AS mean gradient ≥40 labels aligned with ACC/AHA 2020 (verified in the full text).
3. "Under 20" → "Under 18 y" for chamber references. Aorta stays <20 unavailable.
4. Adaptive precision at every cut-off, on screen and in copied text.
5. Citation fix (Zhang RS 2026). APP_VERSION → 2026.11-rc1.
6. Tests: 14 new (precision, iron, AR/AS boundaries, under-18 LA); COPY test updated for the version string; aortic transcription script; disposition script.

## Feature inventory

**Shown with interpretation (source verified; method in EVIDENCE.md):** SCMR 2025 reference comparison for LV,
RV, LA, RA, aorta, ECV and T2* (adults); HF LVEF categories; Kang LVEDVi (DCM/ICM only); Khan LA grades; LACI;
RA PH marker; RACI; RA strain (PAH, ARVC, TR); RV/LV ratio (TR; PH severe only); RVEF/RVEDVi in TR and PAH;
AR RF/RVol/reversal/LGE/LVESVi/LVEDV/LVEF ≤55; primary and secondary MR RF/RVol, inflow method, LVEDVi, LA
emptying fraction, MVP LGE; TR fraction/volume strata, effective RVEF, forward SV ÷ RVESV, liver ECV; PR
fraction; AS AVA, AVA/BSA, Vmax, mean gradient, mild limits, SVi, LGE, ECV >27%; MS planimetry; PS Vmax >4;
RVOT conduit; TOF RV mass/volume; cardiac T2* grading at 1.5 T and 3 T; cardiac iron (1.5 T only).

Many of these rest on abstracts only, as flagged in EVIDENCE.md. "Verified" means that the threshold and
operator match the source. It does not mean the source is clinically appropriate for a given patient.

**Calculated but interpretation withheld:** liver iron concentration (calibration not verified); any reference
interpretation under 18 y (chambers) or outside the studied aortic ages; supranormal LVEF (Q1); repaired-TOF RV
labels and Geva count (Q2); echo-derived tiers: RVEF 45/40/30, MS PHT/gradient, PS moderate, RA area (Q3); Kang
outside DCM/ICM (Q4); LV mass borderline; AS grey zone 1.0–1.3; generic ECV tiers; EACVI Simpson LA tiers;
RV/LV PH mild/moderate.

## Decision

**Ready for owner review and device/clinical checks.** Not ready for a limited pilot until the owner completes
section A of `RELEASE_CHECKLIST.md`. Not ready for public sharing (section B).
