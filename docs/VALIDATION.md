# Validation report: 2026.11-rc4 (branch remediation/audit-2026-11)

## Tested artifact

- **App code commit:** `66b1c15`. All application and build files were tested exactly as committed there: `index.html` (sha256 `3e775a48369ca28b…`), `sw.js` (`655922be4bedf52f…`, `CACHE='cmr-ref-df1f2551d3'`), `THIRD_PARTY_NOTICES.txt` (`4c2fbecc376fe89d…`, unchanged from rc3, so its first line still reads "CMR Reference 2026.11-rc3"; the notices content is the same for rc4), `src/index.html` (`7680872746d36e13…`).
- **Version shown in About and copied text:** `2026.11-rc4 (release candidate: evaluation use; validation incomplete)`.
- **What changed from rc3:** the owner's case-review decisions P2, P3, P7, P9, P10, P15, P18 and P23 (see CHANGELOG.md and OWNER_CHECKLIST.md §C). No other application change except the iron results table scroll region, now focusable.
- **Documentation commit:** the later commit adds this report and the other doc updates. It changes no application or build file (check: `git diff --stat 66b1c15 HEAD -- index.html sw.js src build THIRD_PARTY_NOTICES.txt` is empty).
- **Environment:** Linux 6.18 sandbox, Node 22.23.4, Playwright 1.63.0, **Chromium only**. Runs used `file://` and `http://localhost:8765` (a local server on the repository root). Run on 27 Nov 2026, about 20:30–20:50 (US Eastern).
- **Not tested:** real iPhone Safari (rc4 retest pending) or Android Chrome; desktop Safari or Firefox; any screen reader; the live GitHub Pages site; installed-app behaviour on a phone.

| Command (from `tests/`) | Result | Skips | Failures |
|---|---|---|---|
| `CMR_URL=file://…/index.html node suite2.js chromium` | 215 run | 0 | 0 |
| `node owner_cases.js` | 23 owner cases recorded (screen and copy) in `results/owner-cases-rc4.json` | 0 | n/a (record only) |
| `node sw_offline.js` (localhost) | Service worker active; cache `cmr-ref-df1f2551d3` holds the page, manifest, icons and notices; page and notices load with the network off | 0 | 0 |
| `node aorta_sweep.js ../src/index.html` | 580 cases | 0 | 0 |
| `python3 aorta_transcription.py ../src/index.html <SCMR text>` | 132 values | "All" rows not compared | 0 mismatches |
| `node scan_gate.js` (real OCR via localhost) | Before Apply: empty. After Apply: 1.92/182/74/128. Population not applied | 0 | 0 |
| `node axe.js` (axe-core 4.10.2; 5 pages × 2 themes) | No violations. This is not a compliance claim | — | 0 |
| `node axe_extra_rc4.js` (Check-inputs alert, iron with liver LIC, ECV/T1 fallback, AR, AS; 2 themes) | No violations after the iron table fix (first run: `scrollable-region-focusable` on the iron table) | — | 0 |
| `node suite_original.js` | 77 run: 25 pass, 52 fail; identical pass/fail set to rc3, all classified in `TEST_DISPOSITION.md` | 0 | 52 (expected) |

### rc4 test changes
- **Replaced (adaptive precision → classify on the displayed value, P2):** PREC-LVEF (52.96 → 53.0, Within), PREC-AR (31.96 → 32.0, ≥32%), PREC-AS (4.96 → 5.0, Very severe), PREC-RVLV (1.2696 → 1.27, ≥1.27), PREC-TR (39.96 → 40.0, High risk), PREC-AO / PREC-AO2 (z 2.04 → +2.0 Within; 2.06 → +2.1 Above), PREC-COPY, ROUND-2dp → ROUND-1dp and ROUND-1dp-up.
- **Inputs moved off the new rounding boundary** (same cut-off, value now on the intended side after rounding): RV/LV 1.269 → 1.264 (plus 1.265 above), RACI 0.619 → 0.614 (two tests), forward SV ÷ RVESV 0.571 → 0.575, AS Vmax 3.99 → 3.94, PS Vmax 4.01 → 4.05, AR LVEF adds 55.04 (→ 55.0, C2).
- **Updated wording:** HF ×4 (ESC 2026 <50%, plus 49.96 → 50.0 no label), Khan (adds 51.4/51.5, 62.4/62.5, 73.4/73.5), AR RF 32, AS MG (39.94/39.95/40), AS SVi "35 to <45", ECV-hand (compared with all Table 90 sets), COPY-aorta.
- **Removed:** IRON-liver-withheld. **Rewritten:** COPY-liver (calculated LIC).
- **New:** LIC ×6 (1.5 T normal/mild/moderate/severe; 3 T T2* and R2*, preliminary label), LIC-sources, T1-allsets, T1-seq, T1-allsets-3T, ECV-seq, P7-highlight, P7-highlight-PR, KHAN-int-note, AR-wording, AS-MG-note, COPY-rounded.
- Liver iron expectations were typed from Wood 2005 Eq 2 (owner-confirmed), Storey 2007 and the Columbia calculator bands, not computed with app code. T1 expectations were typed from SCMR 2025 Table 89.

## Earlier candidate (rc3) for reference
rc3 tests added: XU-both, WANG-pop, TR-wording, KANY-wording, NO-UNVERIFIED, ABOUT-notices. Six existing boundary
tests were updated to the new evidence-based wording (HF ×3, ARVC strain, AR RF 32, AS SVi, AS ECV).

### Screen, copy and report agreement
Checked by COPY, COPY-stale, PREC-COPY, LR-copy, LECV-label, HCT-fraction, HCT-switch, HCT-report, COPY-iron15,
COPY-iron3, COPY-liver, COPY-aorta, COPY-checkinputs and WANG-pop, and by the screen/copy pairs in the owner-case record.
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
rounded consistently (rc4: diameter and z rounded to display precision before classification; unavailable states; exact ±2 boundaries). It tests the software, not
the data: because the inputs come from the app's table, a transcription error would not show up here. The data
are checked separately by `aorta_transcription.py`, which compares the app's table against the SCMR 2025 text of
Tables 63, 65 and 67 (132 values, 0 mismatches). The "All" rows are not compared.

## Population and precision re-check (Step 4)

- **Under 18 (chamber datasets):** the SCMR 2025 adult chamber reference values come from adults (18 years and older). The app now labels the group "Under 18 y" and shows "Reference interpretation unavailable under 18 y". This was checked on screen and in copied text (PEDS-LV, PEDS-LA).
- **Aorta under 20:** the SCMR 2025 aortic age groups start at 20–29. Below 20 the app shows no z-score or status. Above the oldest group, or outside 45–84 for the MESA ascending aorta, it shows "unavailable" (PEDS-AO-12, PEDS-AO-19.9, AO-above-oldest).
- **Precision (rc4, owner decision P2):** values are shown to one decimal (two for ratios, RACI and valve areas). The rounded value is what is displayed, copied and classified, so 52.96 shows as 53.0 and is graded as 53.0. The rc1–rc3 adaptive extra decimals were removed.

## Verification pass against sources (Step 6)

This was a second pass by the same reviewer (Claude), using the primary sources as the authority. **It is not
independent human review.** It covered:

- the four evidence gaps (ACC/AHA 2020 full text Tables 13 and 15; Storey 2007 abstract; Wood 2005 primary not obtainable at the time, so its output was withheld until rc4, when the owner confirmed the equation);
- publication status of every 2026 source cited (PubMed records listed in EVIDENCE.md);
- the aortic tables, by script, against the SCMR text.

Boundary expectations in suite2 were typed from the sources, not computed with app code.

## Layer 3: clinical review (NOT done)

No CMR clinician has reviewed representative cases or the interpretation choices. `PROPOSED_VALIDATION_CASES.md`
and `DEVICE_CHECKLIST.md` are prepared for the owner. Decisions Q1–Q5 in `ADJUDICATION.md` are blank.

Passing these tests shows that the app matches the sources as transcribed. It does not show that the app is
clinically validated or that the sources fit a given patient.
