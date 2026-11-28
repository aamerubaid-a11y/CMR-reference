# CMR Reference 2026.11-eval3: release notes

**Status:** evaluation release for professional evaluation and feedback by CMR readers. Validation is incomplete.
It is not clinically validated, certified or approved for independent clinical reliance, and it is not a medical
device. Every result names its source; check it before using it in a report.

**Identifiers:** branch `release/2026.11-eval3`, application commit `ce1bdf9`, service-worker cache
`cmr-ref-bc8b4440f1`, version shown in About and copied text `2026.11-eval3 (evaluation release; validation incomplete)`.
Production (`main`, 0af7de5, cache `cmr-ref-ab54ebbf36`, live on GitHub Pages) is unchanged.

## What it does
- Chamber calculators (LV, RV, LA, RA): volumes, EF, mass and indexed values against SCMR 2025 reference ranges by
  sex, age group and contouring method; a reference population must be chosen; no adult reference under 18 y.
- Valve calculators (aortic, mitral, tricuspid, pulmonic regurgitation; aortic stenosis; mitral, pulmonic and
  tricuspid stenosis), each label naming its source study and population.
- Tissue: native T1, T2 and ECV (with SCMR sequence-matched sets or your center's ranges); cardiac and liver iron from T2*.
- Aortic size z-scores; reference tables; evidence pages; report builder; optional on-device report scan (HTTPS only).

## Changes in this release (interface only)
Calculator pages read context → inputs → results → actions → collapsed detail; key values first (EF, indexed
volumes); reference comparisons and clinical markers visually distinct; one action row (Copy result, Clear page,
New patient with a confirming second tap); grouped calculator index on Home; consistent Calculate | Evidence tabs;
phone layout fixes; result summary bar when results are off screen; accessibility names, states and 44 px targets.
No formula, threshold, reference value or clinical wording changed in eval2 or eval3.

## Known limitations
- **Withheld interpretations (numbers still shown):** heart-failure category for LVEF; liver iron severity bands;
  ECV and native T1 without a sequence-matched SCMR set or a center range; aortic status where rounding moves the
  value across ±2 SD or the 5th/95th percentile; supranormal LVEF, LV size grades outside DCM/ICM, repaired-TOF RV
  labels, echo-only tiers, generic ECV tiers and other items listed on each page's "Interpretations used" panel.
- **Grading uses the displayed (rounded) value** (owner decision P2, e.g. EF 52.96 → 53.0 → within reference).
- Many thresholds rest on single outcome studies in specific populations; several were verified from abstracts only
  (docs/EVIDENCE.md). 3 T liver iron uses a preliminary conversion and is labelled as such.
- Tested in Chromium only (desktop and phone/tablet emulation). Not tested on real iPhone/Android after eval1, in
  Safari/Firefox engines, or with screen readers beyond one earlier VoiceOver check. No independent clinical review.
- Pediatric reference values are not included.
- Center ranges, favorites and display preferences are stored only in the browser on that device.

## Package
`CMR-Reference-2026.11-eval3.zip` (app, source, docs, tests). SHA-256 `fc3e9003e6f6f00badfaf277e993d2be37c99547118259cf338a3017795db035`. The application files inside are byte-identical to commit `ce1bdf9` (checked with `cmp`). The copy of these notes inside the ZIP predates this checksum line.
