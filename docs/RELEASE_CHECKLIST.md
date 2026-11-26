# Release checklist

## A. Limited colleague pilot (named CMR readers, told it is unvalidated)
- [x] All revised-suite tests pass in Chromium (158/158) and the aortic sweep (580/0).
- [x] No sex/population default; unavailable states explicit; withheld interpretations not shown.
- [x] Copy/report text names population, method, age group, table, center ranges, app and data version.
- [ ] Merge reviewed by the app owner (diff: `docs/remediation.diff`).
- [ ] Manual check on one iPhone (Safari) and one Android (Chrome): open, choose population, enter a case, copy, install, reload offline.
- [ ] After merge and deploy, verify the live site (section C).
- [ ] Pilot users told: education/reference aid; verify against sources; report errors to the listed address.

## B. Broader public sharing (in addition to A)
- [ ] Clinician decisions recorded for ADJUDICATION.md Q1–Q5.
- [ ] Layer 3 clinical review done (≈20 de-identified studies, second reader, discrepancies resolved).
- [ ] Remaining unverified sources resolved (Wood 2005 liver calibration, Storey 2007, ACC/AHA 2020 AR LVEF, echo mean gradient for AS) or their outputs withheld.
- [ ] Firefox and Safari tested; screen-reader pass (VoiceOver, NVDA).
- [ ] Home-list nested-interactive accessibility issue fixed.
- [ ] Third-party licence notices added (tesseract.js Apache-2.0, fonts OFL) and SCMR table reuse terms confirmed.
- [ ] Qualified review of intended-use / regulatory status (no claim is made here).
- [ ] Release tag and changelog entry; rollback steps rehearsed.

## C. Deployment verification (manual; not performed)
1. After merging, open `https://aamerubaid-a11y.github.io/CMR-reference/sw.js` and confirm the `CACHE` name matches the build hash printed by `build.py` for the merged commit.
2. Open the site, About and disclaimer: version reads `2026.11-r1` (or the released version).
3. Open LV calculator: "Reference population — required" is visible and nothing is selected.
4. Enter EDV 100, ESV 47.4 with Adult male: LVEF shows 52.6 and "Below reference".
5. Copy result: text includes "Adult male", the table, and the version line.
6. Installed app: close and reopen online once; confirm the version updates (service worker replaced).
