# Owner checklist: CMR Reference 2026.11-rc3 (remaining actions only)

**Candidate:** branch `remediation/audit-2026-11`. App code is commit **442a377**, build cache
`cmr-ref-c9f86960bf`, version `2026.11-rc3 (release candidate: evaluation use; validation incomplete)`. Later
commits change documentation and test results only. Production (`main`, 0af7de5) is unchanged.

Each item is tagged:
- **[EV]** evidence verification
- **[LIC]** licensing / permission
- **[DEV]** technical or device testing
- **[CLIN]** clinical applicability judgement
- **[OPT]** optional feature decision

No approval below is filled in.

## 0. Smoke test first (about 10 minutes, one phone; it does not replace B–D)

1. About shows `2026.11-rc3 (release candidate: evaluation use; validation incomplete)`.
2. LV volumes, EF and mass: enter EDV 100 and ESV 47.4. You should see EF **52.6** with "Select the reference population". Tap **Adult male**: **52.6 · Below reference**.
3. Change ESV to 40: **60.0 · Within reference**.
4. Copy result and paste into Notes: it includes "Adult male", "SCMR 2025 Table 2", "EF 60.0% (within reference)" and "2026.11-rc3".
5. New patient: all fields are empty and no population is selected.

## A. Clinical applicability decisions [CLIN]

The evidence for each feature is checked (MARKER_INVENTORY.md). These rows are only about fit to your patients
and methods. You have not yet given your acquisition method, strain software or pilot population, so
applicability is **unconfirmed** for every row. Every feature below is enabled in rc3. No decision blocks the
pilot. Any label you do not approve before the pilot is withheld: the number is still shown, without the label.
That is a small change, followed by a retest and a new candidate ID.

| # | Feature | Current behaviour (rc3) | Evidence population / method | Decision needed | Fallback if not approved |
|---|---|---|---|---|---|
| A1 | Khan LA grades (full-text source; outside the 30-marker abstract inventory) | Mild/moderate/severe shown beside the SCMR comparison, including "mild" while "Within reference" | 10,890 CMR referrals; biplane, appendage excluded; mild not independently prognostic | Show "mild"? Keep the >62 → moderate convention? | Khan moderate/severe only |
| A2 | Kang LVEDVi grades (full-text source) | DCM/ICM context only; note if contouring differs | DCM derivation, DCM/ICM validation; papillary muscles in blood pool | Keep enabled in DCM/ICM? | Withhold Kang grades |
| A3 | Liver ECV ≥32% (TR calc) | Label with "(source method: 1.5 T MOLLI)" | 371 TR patients; 1.5 T Siemens MOLLI inline ECV; same-day hematocrit; not externally validated | Does your liver ECV method match? (unconfirmed) | Number only |
| A4a | RA strain in PAH (M07) | Low/intermediate/high risk in PAH | n=348 PAH; software not stated in abstract | Does your strain software match? (unconfirmed) | Number only |
| A4b | RA strain in ARVC (M08) | <18.6 end-stage HF; <23 arrhythmia (no LV involvement) | n=316 ARVC; software not stated | Same (unconfirmed) | Number only |
| A4c | RA longitudinal strain in TR (Kim 2026, full text) | <6.6% → RA pressure likely >10 mmHg | n=47 severe TR; exploratory | Same (unconfirmed) | Number only |
| A5a | RVEF/RVEDVi tiers in severe TR (M05) | Labels say "in severe TR"; shown in the TR calculator for any TR | ≥severe TR by echo, n=314 | Keep in the TR calculator when TR may be less than severe? | Show only in the RV page TR context |
| A5b | Secondary MR RF ≥20/≥35 (M11) | Labels say "functional MR with LVEF <50%" | ICM/NICM, LVEF <50% | Keep? (atrial functional MR not covered) | Number with no grade |
| A5c | AS ECV >27% (M21) | "Higher post-AVR mortality in severe AS" | Severe AS before AVR; ECV sequence-dependent | Keep? | Number only |
| A5d | AS SVi <35/<45 (M19) | Echo low-flow convention; CMR mortality gradient below 45 | Severe AS undergoing AVR | Keep? | Number only |
| A5e | RV mass/volume ≥0.45 (M24) | "after PVR in repaired TOF" | Pre-PVR repaired TOF | Keep in the stenosis/conduit calculator? | Number only |

## B. Device tests [DEV]

Run these on iPhone Safari and Android Chrome (see **P** for how). Record pass or fail for each device.

| # | Action | Expected |
|---|---|---|
| B1 | Home → About and disclaimer | rc3 wording; attribution and licence notices visible |
| B2 | LV: population buttons | "Reference population required"; none selected |
| B3 | EDV 100, ESV 47.4, then tap Adult male | 52.6 with "Select…", then 52.6 · Below reference |
| B4 | Change ESV to 40 | 60.0 · Within reference, updates immediately; no overlapping text |
| B5 | Copy result, paste | Matches the screen; includes population, table and version |
| B6 | Change ESV to 120 | "Check inputs…"; no EF; the copy includes the note |
| B7 | Clear this page | Inputs cleared; population and BSA kept |
| B8 | New patient | Everything cleared |
| B9 | Under 18 y, EDV 120, BSA 1 | "Reference interpretation unavailable under 18 y" on screen and in the copy |
| B10 | ECV: Hct 0.42, myocardium 1000 → 450, blood 1600 → 300 | "Not calculated: hematocrit must be a percentage…"; Copy refused. Change Hct to 42: ECV 26.2 |
| B11 | Iron: cardiac T2* 9.9 with no field strength, then choose 1.5 T | No category, then "Severe iron overload (<10 ms)", 2.74 mg/g; the copy includes T2* 9.9 ms |
| B12 | VoiceOver or TalkBack on a home row | Item and "Favorite: <name>" announced as separate controls; pressed state announced |
| B13 | Landscape; largest text size | No horizontal scroll |
| B14 *(HTTPS or localhost only)* | Install to the home screen | Opens full screen; About shows rc3 |
| B15 *(HTTPS or localhost only)* | Airplane mode, then reopen | Works offline; THIRD_PARTY_NOTICES.txt opens |
| B16 *(HTTPS or localhost only)* | Back online, reopen | Still rc3 (stale-cache check: RELEASE_CHECKLIST §E) |

## C. Cases to review [CLIN]

Expected outputs below are what this build shows, recorded by `tests/owner_cases.js`
(`tests/results/final-owner-cases.txt`). They are **not** clinician-verified. Record what you see and whether
you agree. Population is Adult male unless stated; leave BSA blank unless given.

| Case | Inputs and reference configuration | Expected number (how it is computed) | Reference comparison | Separate clinical interpretation (source) | Your judgment needed on |
|---|---|---|---|---|---|
| P1 | LV: EDV 100, ESV 47.4; papillary in mass; all ages | EF 52.6% = (EDV−ESV)/EDV | Below reference (LL 53, SCMR 2025 Table 2) | None | Is "below reference" right for this method and table? |
| P2 | LV: EDV 100, ESV 47.04 | EF 52.96% (extra decimal because it is within 0.05 of 53) | Below reference | None | Is showing 2 decimals near the cut-off acceptable? |
| P3 | LV: EDV 100, ESV 60 | EF 40.0% | Below reference | "HFrEF range if clinical HF (≤40%)" (Bozkurt 2021) | Is the wording right when HF status is unknown? |
| P4 | LV: BSA 1.00, EDV 150; Settings: papillary in volume, context DCM/ICM | LVEDVi 150.0 mL/m² | Above reference (SCMR 2025 Table 3) | Kang: moderate dilation (150–199) (Kang 2026 JACC, Fig 1C) | A2 |
| P5 | LV: BSA 1, EDV 120; **no population** | LVEDVi 120.0 | "Select the reference population" (no status) | None | Is the prompt clear enough? |
| P6 | LV: BSA 1, EDV 120; **Under 18 y** | 120.0 | "Reference interpretation unavailable under 18 y" | None | Agree no adult reference under 18? |
| P7 | LV: EDV 100, ESV 120 | No SV or EF | "Check inputs…"; EDV/ESV still compared | None | Is the message adequate? |
| P8 | LA biplane: BSA 1, max vol 56.1 | LAVi 56.1 | Above reference (UL 56, Table 13) | Khan: mild enlargement (52–62) (Khan 2019 Table 2) | A1 |
| P9 | LA biplane: BSA 1, max vol 62.1 | LAVi 62.1 | Above reference | Khan: moderate enlargement (63–73) | A1 (the >62 convention) |
| P10 | AR: forward 100, reverse 32 | RF 32.0% = reverse/forward; RVol 32 mL | n/a (valve) | "High risk (≥32%: death or HF events)" (Hashimoto 2022; not a severity grade) | Is the prognostic wording acceptable instead of "Severe"? |
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

## D. Approval record (blank)

| Field | Entry |
|---|---|
| Reviewer / role | |
| Date | |
| Candidate commit tested | |
| Cache name seen in `sw.js` / About version | |
| Device 1 (model, OS, browser) and result | |
| Device 2 (model, OS, browser) and result | |
| Cases P1–P23 reviewed; disagreements | |
| Decisions A1–A5e | |
| Licensing decisions (E) | |
| Unresolved issues | |
| Approved for limited pilot? | |

## E. Licensing decisions [LIC] (details: LICENSING.md)

| # | Item | Pilot | Public |
|---|---|---|---|
| E1 | Third-party notices (OCR stack, model, fonts) | Done | Done |
| E2 | SCMR article licence: CC BY 4.0, verified on the article PDF and the publisher page. The PubMed "All rights reserved" field is generic metadata (LICENSING.md §3) | Done | Done |
| E3 | Licence for your own code (none chosen) | Optional | Decide |
| E4 | Name / trademark use (SCMR, OSU) | Non-endorsement statement present | Qualified advice |

## F. Evidence work still open [EV]

None blocks the pilot. All 30 abstract-dependent markers are dispositioned (MARKER_INVENTORY.md). Optional for public release:
- re-check the evidence-page reference cards;
- re-read the Messroghli 2017 ECV timing hint;
- read full texts where the method is not in the abstract (markers #7, #13, #15).

## G. Optional feature decisions [OPT] (not needed for any release)

These stay withheld unless you decide otherwise:
- supranormal LVEF (ADJUDICATION Q1);
- repaired-TOF RV labels and the Geva count (Q2);
- echo-derived tiers (Q3);
- liver iron concentration;
- AS grey zone;
- generic ECV tiers;
- borderline LV mass;
- EACVI Simpson LA tiers.

## P. Preview options for your phones (production stays unchanged)

| Option | What it can test | Access / exposure | Needs |
|---|---|---|---|
| **1. Local Wi-Fi server (recommended first)** | Interface and calculations on both phones (B1–B13). Not HTTPS, so no install or offline (service workers need HTTPS or localhost), and Copy may fall back to selecting text | Anyone on the same network can open it while the server runs. Use a private home network, not hospital or guest Wi-Fi | Computer and both phones on the same Wi-Fi; Python 3 (built in on macOS/Linux, a free install on Windows) |
| 2. Android via USB (Chrome port forwarding) | Everything on Android, including B14–B16: the phone opens `localhost`, which browsers treat as secure | USB cable only | USB debugging enabled on the phone; desktop Chrome |
| 3. Tailscale Serve | Everything on both phones over real HTTPS | Only devices and users in your tailnet, subject to your access rules. Enabling HTTPS publishes the machine and tailnet names in public certificate logs | A Tailscale account and the app on the computer and both phones. **Needs your approval** |
| 4. After an approved merge, on the live site | Everything, including iPhone install and offline | Public | Only after A–D |

Not proposed: GitHub Pages from another branch or repo (public; changes hosting), and public tunnels (an
obscure URL is not access control).
