# Owner checklist: CMR Reference 2026.11-rc2

**Candidate:** branch `remediation/audit-2026-11`. The app code was tested at commit **c68d431** (build cache
name `cmr-ref-af44e7d671`, About version `2026.11-rc2 (release candidate, not deployed)`). Later commits on the
branch change documentation and test-result files only. Production (`main` at 0af7de5) is unchanged.

Nothing in this checklist has been done by a clinician or on a real phone. The automated results are in
`VALIDATION.md`. The smoke test below does **not** replace sections B–D or clinical review.

---

## 0. Essential smoke test (about 10 minutes, one phone)

1. Open the candidate (see P below). About and disclaimer (home page) shows `2026.11-rc2`.
2. Open **LV volumes, EF and mass**. Enter EDV 100 and ESV 47.4. EF shows **52.6** and "Select the reference population".
3. Tap **Adult male**. EF shows **52.6 · Below reference**.
4. Change ESV to 40. EF changes to **60.0 · Within reference** without pressing anything.
5. Tap **Copy result** and paste into Notes. The text contains "Adult male", "SCMR 2025 Table 2", "EF 60.0% (within reference)" and "2026.11-rc2".
6. Tap **New patient (clears everything)**. The inputs are empty and no population is selected.

If any step fails, stop and send me the step number and a screenshot (synthetic values only).

---

## P. How to test this exact candidate on phones (production stays unchanged)

**What I found:**
- GitHub Pages for this repository deploys **branch `main`** to the `github-pages` environment. The current live commit is 0af7de5, last deployed 26 Nov 2026 18:23 UTC. Branch pushes are not deployed.
- The repository is **public**. Its Pages site is public, and GitHub Pages access control is not available for it (that needs GitHub Enterprise Cloud with a private repository). Pages therefore cannot give an access-controlled preview without changing production settings, and I have not changed them.
- Because the repository is public, the candidate's files are already readable by anyone on GitHub. They are not deployed at any URL.

| Option | Access control | Install / offline / clipboard | Needs |
|---|---|---|---|
| **1. Tailscale on your computer and both phones (recommended)** | Yes. Only devices signed in to your Tailscale network can reach it | Yes. It serves real HTTPS, so the service worker and clipboard work | A free Tailscale account. **This is the authorization step; I stop here** |
| 2. Local Wi-Fi server | No. Anyone on the same network can reach it. Use a private home network, never hospital or guest Wi-Fi | No. A plain `http://` LAN address is not a secure context, so install/offline cannot be tested and Copy may fall back to selecting text | Nothing |
| 3. Android only: USB port forwarding (Chrome `chrome://inspect` → Port forwarding) | Yes (USB cable) | Yes. The phone sees it as `localhost`, which counts as secure | USB debugging on the phone |

Not proposed: a second GitHub Pages site (public), quick tunnels such as ngrok or cloudflared (public URLs; an
obscure URL is not access control), or a hosted Claude page (private, but a new hosted deployment that needs
your approval, and it cannot run the service worker).

**Option 1 steps (I could not run or verify them here; check the current Tailscale documentation for the exact command syntax):**
1. Install Tailscale on your computer, iPhone and Android phone, and sign in to the same account on all three. In the Tailscale admin console, turn on MagicDNS and HTTPS certificates.
2. On the computer, download the candidate: https://github.com/aamerubaid-a11y/CMR-reference/raw/c68d431/CMR-Reference-PWA.zip. Unzip it and open a terminal in the `CMR-Reference` folder. Check that line 2 of `sw.js` reads `const CACHE='cmr-ref-af44e7d671';`.
3. In that folder, run `python3 -m http.server 8080 --bind 127.0.0.1`.
4. In another terminal: `tailscale serve --bg 8080`. It prints an `https://<computer>.<tailnet>.ts.net` address. **Do not use `tailscale funnel`**, which makes the address public.
5. Open that address on each phone. When finished, run `tailscale serve reset` and stop the Python server.

**Option 2 steps:** as above, but run `python3 -m http.server 8080` (no `--bind`). Find the computer's LAN IP
address and open `http://<that-ip>:8080` on the phones. Skip tests B10–B11.

---

## A. Decisions you must make (they affect features enabled in the pilot)

Write the decision and date beside each item. Until you decide, the current behaviour stays as described.

| # | Decision | Current behaviour | Detail |
|---|---|---|---|
| A1 | **Khan LA grades inside the SCMR interval.** Keep showing "Khan: mild enlargement" from 52 mL/m² up to the SCMR upper limit (56 men / 54 women) alongside "Within reference"? Or show Khan only for moderate and severe? Also confirm the convention that values above 62 and below 63 count as moderate. | Both lines shown, each labelled with its source | ADJUDICATION Q5; cases P8, P9 |
| A2 | **Kang LVEDVi grades.** Shown only in the DCM/ICM context. Keep this restriction? | DCM/ICM only, with a note if your contouring setting differs from Kang's (papillary muscles in the blood pool) | ADJUDICATION Q4; case P4 |
| A3 | **Liver ECV ≥32% at your centre.** The cut-off comes from one network using 1.5 T Siemens MOLLI with inline ECV maps, a liver ROI that avoids vessels, and same-day hematocrit. It was spline-derived and has not been externally validated. Does the pilot's liver ECV method match closely enough to show the label, or should the label be withheld for the pilot? | Label shown, ending "(source method: 1.5 T MOLLI)"; the number is always shown | EVIDENCE.md, liver ECV row; case P21 |
| A4 | **Abstract-only evidence.** 25 enabled markers were checked against the abstract only (threshold and operator present; methods not read). Accept this for a labelled pilot, or name the ones to withhold? | Shown, each with its source | EVIDENCE.md, "Verified (abstract)" rows |

**Not needed for the pilot (these features stay withheld):** supranormal LVEF (Q1), repaired-TOF RV labels and
Geva count (Q2), echo-derived tiers (Q3), liver iron concentration (mg/g), AS grey zone, generic ECV tiers,
borderline LV mass, EACVI Simpson LA tiers.

---

## B. Tests you must perform: iPhone Safari and Android Chrome

Use the preview from section P. Record pass/fail per device. Values are synthetic.

| # | Action | Expected | iPhone | Android |
|---|---|---|---|---|
| B1 | Home → About and disclaimer | Version `2026.11-rc2 (release candidate, not deployed)` | | |
| B2 | Open LV volumes, EF and mass | "Reference population required" shown; Adult male / Adult female / Under 18 y, none selected | | |
| B3 | Enter EDV 100, ESV 47.4; then tap Adult male | Before: EF 52.6 with "Select the reference population". After: 52.6 · Below reference | | |
| B4 | Change ESV to 40 | EF 60.0 · Within reference, updates immediately; results below the inputs, nothing overlapped | | |
| B5 | Tap Copy result; paste into Notes | Pasted text matches the screen; includes Adult male, SCMR 2025 Table 2, EF 60.0%, version line | | |
| B6 | Change ESV to 120 | "Check inputs: end-systolic volume is not smaller than end-diastolic…"; no EF. Copy includes the "Check inputs" note | | |
| B7 | Tap Clear this page | Inputs empty; Adult male still selected; BSA kept | | |
| B8 | Enter EDV 100, then tap New patient | All inputs empty; no population selected | | |
| B9 | Select Under 18 y; enter EDV 120, BSA 1 | "Reference interpretation unavailable under 18 y" on screen and in copy | | |
| B10 | ECV calculator: Hct 0.42, native/post T1 myocardium 1000/450, blood 1600/300 | "Not calculated: hematocrit must be a percentage…"; Copy result refuses ("Fix highlighted values first"). Change Hct to 42: ECV 26.2 | | |
| B11 | Iron: enter cardiac T2* 9.9 without choosing a field strength; then choose 1.5 T | Before: no category. After: Severe iron overload (<10 ms), 2.74 mg/g. Copy includes "T2* 9.9 ms" | | |
| B12 | Home list: with VoiceOver (iPhone) or TalkBack (Android) on, move through one row | Two separate controls: the item (opens it) and "Favorite: <item name>", announced as not pressed / pressed after double-tap | | |
| B13 | Rotate to landscape and back; largest system text size | No horizontal scrolling; text readable | | |
| B14 *(option 1 or 3 only)* | Install: iPhone Share → Add to Home Screen; Android ⋮ → Install app. Open from the icon | Opens full screen; About shows rc2 | | |
| B15 *(option 1 or 3 only)* | Airplane mode on; close and reopen the installed app | Opens; B3–B5 work offline | | |
| B16 *(option 1 or 3 only)* | Stale-cache check: with airplane mode off, reopen | About still rc2. If an older version appears, see RELEASE_CHECKLIST §E | | |

Desktop keyboard (optional but recommended): Tab through home → item → population buttons → inputs → Copy →
Clear → New patient. Every control is reachable, focus is visible, and Enter/Space work. Pressing Enter on a
favourite toggles it and keeps focus on it.

---

## C. Cases you must review

Expected outputs below are what this build shows, recorded by `tests/owner_cases.js`
(`tests/results/final-owner-cases.txt`). They are **not** clinician-verified. Record what you see and whether
you agree. Population is Adult male unless stated; leave BSA blank unless given.

| Case | Inputs and reference configuration | Expected number (how it is computed) | Reference comparison | Separate clinical interpretation (source) | Your judgment needed on |
|---|---|---|---|---|---|
| P1 | LV: EDV 100, ESV 47.4; papillary in mass; all ages | EF 52.6% = (EDV−ESV)/EDV | Below reference (LL 53, SCMR 2025 Table 2) | None | Is "below reference" right for this method and table? |
| P2 | LV: EDV 100, ESV 47.04 | EF 52.96% (extra decimal because it is within 0.05 of 53) | Below reference | None | Is showing 2 decimals near the cut-off acceptable? |
| P3 | LV: EDV 100, ESV 60 | EF 40.0% | Below reference | HF category: reduced EF (≤40%) (Bozkurt 2021, abstract) | Is the HF category appropriate on a CMR EF? |
| P4 | LV: BSA 1.00, EDV 150; Settings: papillary in volume, context DCM/ICM | LVEDVi 150.0 mL/m² | Above reference (SCMR 2025 Table 3) | Kang: moderate dilation (150–199) (Kang 2026 JACC, Fig 1C) | A2 |
| P5 | LV: BSA 1, EDV 120; **no population** | LVEDVi 120.0 | "Select the reference population" (no status) | None | Is the prompt clear enough? |
| P6 | LV: BSA 1, EDV 120; **Under 18 y** | 120.0 | "Reference interpretation unavailable under 18 y" | None | Agree no adult reference under 18? |
| P7 | LV: EDV 100, ESV 120 | No SV or EF | "Check inputs…"; EDV/ESV still compared | None | Is the message adequate? |
| P8 | LA biplane: BSA 1, max vol 56.1 | LAVi 56.1 | Above reference (UL 56, Table 13) | Khan: mild enlargement (52–62) (Khan 2019 Table 2) | A1 |
| P9 | LA biplane: BSA 1, max vol 62.1 | LAVi 62.1 | Above reference | Khan: moderate enlargement (63–73) | A1 (the >62 convention) |
| P10 | AR: forward 100, reverse 32 | RF 32.0% = reverse/forward; RVol 32 mL | n/a (valve) | Severe (≥32%) (Steeds & Myerson 2020; Hashimoto 2022) | Agree with ≥32% for CMR AR? |
| P11 | AR: LVEF 55 | 55% (entered) | n/a | "≤55%: meets the stage C2 LVEF criterion if AR is chronic and severe" (ACC/AHA 2020 Table 15) | Is the wording safe (not a recommendation)? |
| P12 | TR: RVSV 100, pulmonary forward flow 60 | TR fraction 40.0% = (RVSV−PF)/RVSV; TR vol 40 mL | n/a | High risk (≥40%) (Margonato 2025); TR vol elevated 35–44 mL (Wang 2021) | Agree with risk-strata labels instead of grades? |
| P13 | PR: forward 100, reverse 40.1 | PR fraction 40.1% | n/a | Severe (>40%) (2022 review; convention, not outcome-derived) | Acceptable for the pilot? |
| P14 | AS: planimetric AVA 1.00 | 1.00 cm² | n/a | Severe (≤1.0) (SCMR 2025 Table 57) | Agree? |
| P15 | AS: mean gradient 40 | 40 mmHg | n/a | Severe (≥40), Doppler criterion (ACC/AHA 2020 Table 13); app notes PC-MRI reads lower | Is a Doppler criterion appropriate on PC-MRI? |
| P16 | Iron: 1.5 T, cardiac T2* 9.9 | R2* 101 s⁻¹ = 1000/T2*; 2.74 mg/g = 45.0×T2*^−1.22 (Carpenter 2011, abstract) | — | Severe iron overload (<10 ms) (SCMR 2025 Table 100) | Agree? |
| P17 | Iron: 3 T, cardiac T2* 5.4 | R2* 185 s⁻¹; no mg/g (equation calibrated at 1.5 T) | — | Severe iron overload (<5.5 ms) (Table 100) | Agree? |
| P18 | Iron: liver T2* 8 at 1.5 T | R2* 125 s⁻¹ | — | "Liver iron concentration withheld: calibration not verified" | Is withholding mg/g acceptable for the pilot? |
| P19 | Aorta: Adult male, sinus, age 25, diameter 36.22 mm | z +2.04 = (36.22−30.1)/3.0 | Above +2 SD (Table 67, 20–29 group) | None | Agree? |
| P20 | Aorta: Adult male, sinus, age 19.9, diameter 30 | 30.0 mm, no z | "Reference interpretation unavailable" (youngest group 20–29) | None | Agree? |
| P21 | TR: liver ECV 32 | 32% (entered) | n/a | "≥32%: associated with right-sided HF and adverse outcomes in TR (source method: 1.5 T MOLLI)" (Margonato 2025) | A3 |
| P22 | ECV: Hct **0.42**, myocardium 1000→450, blood 1600→300 | No ECV | "Not calculated: hematocrit must be a percentage…"; copy refused | None | Is the message clear? |
| P23 | ECV: Hct 42, same T1 values | ECV 26.2% = (1−0.42)×ΔR1myo/ΔR1blood; λ 0.451 | "Not interpreted: choose a sequence-matched reference set or enter your center range" | None | Should the pilot require a centre range? |

For each case, also press Copy result and confirm the copied text agrees with the screen.

| Case | What you saw (screen) | Copy agrees? | Agree with output? | Note |
|---|---|---|---|---|
| P1–P23 | | | | |

---

## D. Approval record (blank; fill in yourself)

| Field | Entry |
|---|---|
| Reviewer name and role | |
| Date | |
| Candidate commit tested | |
| Build cache name seen in `sw.js` / About version | |
| Device 1 (model, OS, browser version) | |
| Device 1 result (B1–B16) | |
| Device 2 (model, OS, browser version) | |
| Device 2 result (B1–B16) | |
| Cases reviewed (P1–P23) and disagreements | |
| Decisions A1–A4 | |
| Unresolved issues | |
| Approved for limited pilot? (yes / no / with conditions) | |
| Signature | |

---

## Remaining requirements

**Before the limited pilot:** sections A–D completed by you; your review of the diff; choice of preview method;
named pilot users; your decision on licence notices (below); your explicit approval to merge.

**Before public release:** decisions Q1–Q3 (or keep them withheld); independent review by a second CMR
clinician; full screen-reader and cross-browser testing; licence notices and table-reuse permission resolved;
intended-use / regulatory review; plan for external validation of single-centre cut-offs.

### Licensing: what is established and what is not

| Item | Established | Unresolved |
|---|---|---|
| App's own licence | No LICENSE file in the repository | Choose one, or state "all rights reserved" |
| tesseract.js, tesseract.js-core (OCR, bundled in `ocr/`) | package.json: Apache-2.0 | The bundled files point to LICENSE.txt files that are **not shipped**. Apache-2.0 requires the licence and notices to be included when redistributing |
| English OCR model (`@tesseract.js-data/eng`) | npm package declares MIT | Licence of the upstream model data not checked |
| Fonts: Inter, IBM Plex Mono, Barlow Semi Condensed (embedded) | package.json: OFL-1.1; LICENSE files exist in the build packages | OFL text not shipped with the app |
| SCMR 2025 reference tables (hundreds of values reproduced) | Cited (JCMR 2025;27:101853) | **Reuse terms not established.** No licence statement in the text I worked from. Check the article's licence on the publisher page. The app's own licence cannot grant permission for third-party tables |
| Other papers | Thresholds cited with source; no figures or text reproduced as far as I know | — |
