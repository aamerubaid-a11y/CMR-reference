# Validation report — 2026.11-r1 (branch remediation/audit-2026-11)

Environment: Linux sandbox, Playwright 1.63, **Chromium only** (Firefox and WebKit downloads are blocked here:
403 from cdn.playwright.dev). Desktop 1280×900 and phone 360×740 viewports. Local build of `src/index.html`; the
live GitHub Pages site was **not** tested (unreachable from this environment).

## Layer 1 — software correctness (executed)

| Area | Tests | Result |
|---|---|---|
| Required population, unavailable states (no sex, under 20, aorta <20 and above oldest group) | 6 | Pass |
| Invalid / impossible inputs (negative, ESV ≥ EDV, RVSV ≤ LVSV) | 3 | Pass |
| Rounding (52.6 shown with "Below reference"; 104.04 with boundary note) | 2 | Pass |
| Copy agrees with screen, includes context and version; no stale copy after switching population | 2 | Pass |
| Clear page vs New patient; cross-module carry-over visible | 2 | Pass |
| Persistence: measurements cleared on reload, center range kept; invalid center range reported; center range in copy | 3 | Pass |
| Keyboard reaches and operates population buttons; `aria-pressed` | 1 | Pass |
| Phone width: no horizontal scroll, population buttons visible | 1 | Pass |
| Scan: nothing filled before Apply; filled after; sex not applied (`tests/scan_gate.js`, real OCR) | 1 | Pass |
| axe-core 4.10.2 (5 pages × light/dark) | — | 1 remaining rule: nested interactive control in home list rows (favourite button inside a row button) |

## Layer 2 — evidence concordance (executed)

138 boundary tests just below, at and just above every implemented cut-off. Expected values were typed from the
primary sources in `docs/EVIDENCE.md`; no app function is used to compute an expected value. Hand-calculated ECV
(26.2%) uses the standard formula. All 138 pass. Aortic z-scores: 580-case sweep against SCMR Tables 63, 65, 67
values, 0 discrepancies; age edge cases now return "interpretation unavailable" outside the studied ages.

Passing these tests shows the app matches the sources as transcribed here. It does not show the sources are the
right ones for a given patient.

## Layer 3 — clinical review (NOT done)

No independent CMR clinician has reviewed representative cases or the interpretation choices. Required before
wider sharing:
1. Decisions on ADJUDICATION.md Q1–Q5, signed and dated.
2. A second reader grades about 20 de-identified studies (spanning normal, each disease context and boundary
   values) independently; disagreements with the app are reviewed.
3. Spot-check of 10% of EVIDENCE.md rows by a clinician against the primary papers.

## Original suite (77 tests) on the remediated build

The original suite was run unchanged except for one harness line (the population buttons moved out of the
collapsed Settings row, so the click target changed). Result: 26 pass, 51 fail. On the audited baseline it was
62 pass, 15 fail. The new failures are expected and fall into four groups:

| Group | Count | Why the original expectation no longer applies |
|---|---|---|
| Relabelled, same interpretation: "Normal" → "Within reference", "Below normal" → "Below reference", "Increased" → "Above reference"; Khan, HF-category and AR/MR/TR labels reworded (AR/MR middle band is "Intermediate" because no source derives it; TR bands are named as risk strata, as in the sources) | 32 | Wording changed deliberately; each boundary is re-tested with the new wording in the revised suite |
| Interpretation withheld as unsupported (Kang grades outside DCM/ICM ×5, supranormal EF, LV mass borderline ×2, RVEF echo tier, AS grey zone ×2) | 11 | Original tests asserted labels that are no longer shown |
| Cardiac T2* now requires choosing 1.5 T or 3 T | 4 | Revised tests cover both field strengths |
| Mechanism changed (impossible-input warnings shown as a results note; reset split into "Clear this page" and "New patient") | 3 | Revised tests check the new mechanism |
| Original expectation was wrong (AS AVA 1.0 is severe by SCMR Table 57, ≤1.0) | 1 | Audit error, corrected |

### Disposition of the 15 tests that failed on the baseline

| Original test | Original expectation | Now | Revised test |
|---|---|---|---|
| LV-EDVi-101, -104, -age, -F91 | "Normal" | "Within reference", no grade | REF-lv-vol-LVEDV/BSA-104, -104.1, -108, -91 |
| LV-EF-79 | "Normal" | "Within reference", no supranormal label | REF-lv-vol-EF-79 |
| LV-EF-round | display and label agree (integer) | **Expectation revised**: grading stays on the unrounded value; display has one decimal (52.6) | ROUND, ROUND-2dp |
| LV-M-170 | Increased/Above | "Above reference" (passes) | REF-lv-vol-LV mass-169.1 |
| LV-ESV>EDV | warning | message in results ("Check inputs") — original detector looked only at the input warning bar | ESV>EDV |
| DEF-sex | no male default | passes | NOSEX |
| RESET | reset clears BSA and sex | **Expectation revised**: two labelled actions; "New patient" clears both, "Clear this page" keeps them by design | RESET (asserts both behaviours) |
| COPY | context in copy | passes | COPY, COPY-stale |
| RV-EF-F-46, -45, -mass-48 | below reference | passes | REF-rv-vol-EF-46.9, -48.9 |
| PR-indirect-neg | message | message shown as a results note (original detector counted result rows only) | PR-indirect-neg |

### Audit errors corrected
- The audit called the EACVI Simpson LA tiers "3D echo". They are 2/3/4-SD bands from CMR volunteers (Maceira
  2010). They are still withheld, for a different reason (SD extrapolation, not modality).
- The audit expected "Grey zone" at AVA 1.0. SCMR 2025 Table 57 defines severe as ≤1.0, so 1.0 is severe.
- The audit did not notice the RACI definition error (RA maximum used instead of RA end-diastolic volume) or the
  Kim 2026 operator (≤6.6 vs <6.6).

## Not tested
Firefox, Safari/WebKit, real iOS/Android devices, screen readers, PWA install and update on a device, offline
cache replacement after an update, the live deployment, browser zoom above 200%.
