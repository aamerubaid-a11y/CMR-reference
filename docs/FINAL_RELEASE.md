# Final evaluation release: 2026.11-eval1

**Version shown in About and copied text:** `2026.11-eval1 (evaluation release; validation incomplete)`
**Branch:** `remediation/audit-2026-11`. **Application commit:** `466ac23`. **Build cache:** `cmr-ref-f576bb84fe`.
`index.html` sha256 `b40a7e71f4e7df08…`, `sw.js` `82c7e334ba440a51…`, `src/index.html` `b1f7402edce888e5…`.
Production (`main`, 0af7de5, GitHub Pages) is unchanged. Nothing has been merged or deployed.

This is an evaluation release. Validation is incomplete. It is not clinically validated, certified, or approved
for clinical reliance, and it is not a medical device. Check results against the primary sources.

## Owner decision (27 Nov 2026)

The owner accepted the completed, evidence-supported corrections and presentation changes and ended the iterative
audit: no further audits, features, device testing or case review. This acceptance is **not** approval of any
clinical claim and **not** independent clinical validation. The approval record (OWNER_CHECKLIST §D) stays blank.

## Functionality frozen; unresolved interpretations withheld

Interpretations whose basis remained unresolved are withheld. The independently supported numbers are still shown.
No replacement thresholds were introduced and no further evidence was sought.

| Interpretation | Why unresolved | In this release |
|---|---|---|
| HF category for LVEF <50% ("ESC 2026") | Verified from the ESC press release only, not the guideline text | Label removed. LVEF and its SCMR reference comparison remain |
| Liver iron severity bands (Columbia calculator) | Primary source of the bands not identified | Not applied ("Severity not graded"). LIC in mg/g and µmol/g still calculated (Wood 2005; 3 T via Storey 2007, marked preliminary) |
| ECV / native T1 summary across unmatched SCMR sets ("within k of n") | SCMR gives sequence-specific ranges only | "Not interpreted" unless a sequence-matched SCMR set or a center range is chosen. Values and λ remain |
| Aortic status where rounding crosses ±2 SD or the 5th/95th percentile | Owner did not confirm case P19 | Status withheld ("Not graded: at the limit after rounding"). Diameter and z remain |

Rounded-value classification elsewhere (chambers, valve calculators, ECV/T1/T2) follows the owner's explicit P2
decision (Option A) and is unchanged.

## Testing

**The owner elected not to undertake any additional testing.** The finalization changes above were not run
through any test suite. Only the build was run, plus a JavaScript parse check (it confirms the script parses; it
tests no behaviour).

The recorded results apply to **commit 66b1c15 (2026.11-rc4, cache cmr-ref-df1f2551d3) only** and do not cover
466ac23: suite2 215/0; owner cases recorded; sw_offline pass; aorta sweep 580/0; aortic transcription 132/0; scan
gate pass; axe no violations; original suite 25 pass / 52 fail (all classified). Details: VALIDATION.md and
`tests/results/`. Earlier device testing: iPhone Safari on rc3 over local Wi-Fi (OWNER_TEST_LOG.md). Not done:
Android, install/offline on a phone (B14–B16), screen readers beyond one VoiceOver check, independent clinical review.

Expected differences from rc4, untested: no HF label; liver rows show "Severity not graded"; ECV and T1 with no
sequence or center range show "Not interpreted"; aortic values whose status flips on rounding show "Not graded".
Some rc4 tests (HF, LIC bands, T1-allsets, ECV-hand, COPY-aorta/P19) would now fail by design.

## Package contents (`CMR-Reference-2026.11-eval1.zip`)
- `app/`: the built application (index.html, sw.js, manifest, icons, OCR files, THIRD_PARTY_NOTICES.txt, README.txt). The notices file is unchanged since rc3 and its first line still reads "rc3".
- `source/`: `src/index.html`, `build/` (build script and licence inputs).
- `docs/`: all documentation, including this file, CHANGELOG.md and LICENSING.md.
- `tests/`: test scripts and recorded results (tied to 66b1c15 and earlier commits, as labelled).
