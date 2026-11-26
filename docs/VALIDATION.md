# Validation report: 2026.11-rc1 (branch remediation/audit-2026-11)

## Environment and commands (final run, after the last code change)

- Code: `src/index.html` with `APP_VERSION='2026.11-rc1 (release candidate, not deployed)'`; build `cmr-ref-f34dd26b4a` (from `build/build.py`).
- Commit: the RC commit on this branch that contains this file (see `git log`); the parent is c0f2f52.
- Machine: Linux 6.18 sandbox, Node 22.23.4, Playwright 1.63.0. **Chromium only**: Firefox and WebKit downloads are blocked here (403). Tests used the local build (`file://` and `http://localhost:8765`). The live GitHub Pages site was **not** tested, because it cannot be reached from this environment.

| Command (run from `tests/`, with the build at `../` or `CMR_URL`) | Result | Skips | Failures |
|---|---|---|---|
| `node suite2.js chromium` | 172 run: 29 Layer 1 (software), 143 Layer 2 (evidence boundaries) | 0 | 0 |
| `node aorta_sweep.js` | 580 cases | 0 | 0 |
| `python3 aorta_transcription.py ../src/index.html <SCMR 2025 text>` | 116 mean/SD pairs + 16 percentile values = 132 values | "All" rows not compared | 0 mismatches |
| `node scan_gate.js` (real OCR, local http server) | Before Apply: LV fields empty. After Apply: 1.92 / 182 / 74 / 128. Population not applied | 0 | 0 |
| `node axe.js` (axe-core 4.10.2; 5 pages × light/dark) | 1 rule remaining: `nested-interactive` on home list rows (favourite button inside a row button), serious | — | known, open |
| `node suite_original.js` | 77 run: 26 pass, 51 fail; all 51 are explained in `TEST_DISPOSITION.md` | 0 | 51 (expected) |

Raw outputs are in `tests/results/*-rc1.*`.

### What "580/0" means

The aortic sweep builds 580 inputs from the app's own AO table: every aortic level × sex × age group × absolute/indexed, each at
z = 0, ±2 and ±2.5, plus age edge cases (19, 19.9, 20, 29.9, 30, 79.9, 80, 95 for the sinus; group edges for
the annulus and the MESA ascending aorta). It then checks that the z-score and the status pill are computed and
rounded consistently (adaptive precision, unavailable states, exact ±2 boundaries). It tests the software, not
the data: because the inputs come from the app's table, a transcription error would not show up here. The data
are checked separately by `aorta_transcription.py`, which compares the app's table against the SCMR 2025 text of
Tables 63, 65 and 67 (132 values, 0 mismatches). The "All" rows are not compared.

## Population and precision re-check (Step 4)

- **Under 18 (chamber datasets):** the SCMR 2025 adult chamber reference values come from adults (18 years and older). The app now labels the group "Under 18 y" and shows "Reference interpretation unavailable under 18 y". This was checked on screen and in copied text (PEDS-LV, PEDS-LA).
- **Aorta under 20:** the SCMR 2025 aortic age groups start at 20–29. Below 20 the app shows no z-score or status. Above the oldest group, or outside 45–84 for the MESA ascending aorta, it shows "unavailable" (PEDS-AO-12, PEDS-AO-19.9, AO-above-oldest).
- **Precision:** values are shown to the usual decimal places. Within 0.05 (or 0.005) of a cut-off, the app adds decimals until the displayed value is on the same side of the cut-off as the true value. This applies to the SCMR limits, every sourced marker, the valve tables, the aorta (z ±2), ECV, T1 and T2. Tests PREC-LVEF (52.96 vs 53), PREC-AR, PREC-AS, PREC-RVLV, PREC-TR, PREC-AO (+2.04 Above) and PREC-AO2 (+1.96 Within) check the screen. PREC-COPY checks that the copied text matches the screen. ROUND-2dp checks that 104.04 is shown as 104.04 and "Above".

## Verification pass against sources (Step 6)

This was a second pass by the same reviewer (Claude), using the primary sources as the authority. **It is not
independent human review.** It covered:

- the four evidence gaps (ACC/AHA 2020 full text Tables 13 and 15; Storey 2007 abstract; Wood 2005 primary not obtainable, so its output is withheld);
- publication status of every 2026 source cited (PubMed records listed in EVIDENCE.md);
- the aortic tables, by script, against the SCMR text.

Boundary expectations in suite2 were typed from the sources, not computed with app code.

## Layer 3: clinical review (NOT done)

No CMR clinician has reviewed representative cases or the interpretation choices. `PROPOSED_VALIDATION_CASES.md`
and `DEVICE_CHECKLIST.md` are prepared for the owner. Decisions Q1–Q5 in `ADJUDICATION.md` are blank.

Passing these tests shows that the app matches the sources as transcribed. It does not show that the app is
clinically validated or that the sources fit a given patient.
