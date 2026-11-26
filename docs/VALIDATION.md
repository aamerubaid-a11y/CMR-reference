# Validation report: 2026.11-rc2 (branch remediation/audit-2026-11)

## Final run (after the last code change)

- **Tested code commit:** `c68d431`. Root `index.html` is byte-identical to the build output (sha256 `df3d263ec250d7d3…`); `sw.js` reads `CACHE='cmr-ref-af44e7d671'`; About shows `2026.11-rc2 (release candidate, not deployed)`. Later commits change documentation, test results, and the output file name in `tests/owner_cases.js` only.
- **Environment:** Linux 6.18 sandbox, Node 22.23.4, Playwright 1.63.0, **Chromium only** (Firefox/WebKit downloads blocked here, 403). Desktop 1280×900 and phone 360/390/320 px viewports. Local files (`file://`) and `http://localhost:8765`. Run on 26 Nov 2026 (UTC ≈ 20:30–20:50).
- **Not tested:** real iPhone Safari, real Android Chrome, desktop Safari/Firefox, any screen reader, the live GitHub Pages site (unreachable from here), installed-app and offline behaviour on a device.

| Command (from `tests/`) | Result | Skips | Failures |
|---|---|---|---|
| `CMR_URL=file://…/index.html node suite2.js chromium` | 184 run (40 Layer 1 software, 144 Layer 2 evidence boundaries) | 0 | 0 |
| `node owner_cases.js` | 23 owner cases executed; screen and copy recorded in `results/final-owner-cases.txt` | 0 | n/a (record, not assertions) |
| `node aorta_sweep.js ../src/index.html` | 580 cases | 0 | 0 |
| `python3 aorta_transcription.py ../src/index.html <SCMR 2025 text>` | 132 values (116 mean/SD pairs + 16 percentiles) | "All" rows not compared | 0 mismatches |
| `node scan_gate.js` (real OCR) | Before Apply: fields empty. After Apply: 1.92/182/74/128. Population not applied | 0 | 0 |
| `node axe.js` (axe-core 4.10.2; home, LV, ECV, PR, report × light/dark) | No violations (the earlier `nested-interactive` is fixed) | — | 0 |
| `node suite_original.js` | 77 run: 26 pass, 51 fail; all 51 classified in `TEST_DISPOSITION.md` (unchanged from rc1) | 0 | 51 (expected) |

Raw outputs are in `tests/results/final-*`.

### Screen, copy and report agreement
Checked by COPY, COPY-stale, PREC-COPY, LR-copy, LECV-label, HCT-fraction, HCT-switch, HCT-report, COPY-iron15,
COPY-iron3, COPY-liver, COPY-aorta and COPY-checkinputs, and by the screen/copy pairs in the owner-case record.
Fixed in rc2 after this check exposed them: acronyms lowercased in copied text; iron and aortic copies missing the
measured T2*/diameter; the "Check inputs" note missing from copies.

### Withheld features stay withheld
KANG-general, LA-simpson-noTier, RVEF-gen-30.0, RVEF-tof-30.0, pr-calc TOF RVEDVi, sten-ms PHT, sten-ps 4.0, RA
area, as-calc AVA 1.01 (no grey zone), ECV-hand (no generic tier), IRON-liver-withheld, COPY-liver, PEDS-LV,
PEDS-LA, PEDS-AO-12/19.9, AO-above-oldest, NOSEX: all pass.

### Accessibility (rc2)
The defect: each home-list row was a `div role="button"` that contained the favourite `<button>` (axe
`nested-interactive`, WCAG 2.2 SC 4.1.2 Name, Role, Value). Children of a button role are presentational, so
assistive technology could merge the favourite into the row's name ("… Add to favorites, button") or skip it.
It affected screen-reader users, especially iOS VoiceOver swipe navigation. Opening calculators still worked by
keyboard and screen reader. Only the favourite toggle (not essential) was affected, so it did not block the pilot.
Fixed: the row is now a real item `<button>` plus a sibling favourite `<button aria-pressed>` named
"Favorite: <item>", with focus kept after toggling. Test A11Y-home checks the structure, keyboard toggle, focus
and opening. axe now reports no violations. **This is not a compliance claim:** only automated checks were run,
with no real screen-reader session.

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
