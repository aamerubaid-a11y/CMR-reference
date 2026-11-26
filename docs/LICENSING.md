# Licensing and permissions (2026.11-rc3)

I am not a lawyer, and this file is not legal advice. It records what was checked, what was done, and what is
still open.

## 1. Your own code

The repository has no LICENSE file, and none has been chosen. That is your decision; I have not picked one.
This is separate from third-party compliance, below. Choosing a licence for your code does not grant rights in
anyone else's material.

## 2. Redistributed third-party software, data and fonts

Exact versions were taken from the build inputs (`ocrpkg`, `fontpkg`). The upstream licence was read at the
pinned commit, or from the published package's own LICENSE file. Full texts are in `THIRD_PARTY_NOTICES.txt`.
That file is shipped at the site root and in the zip, and it is cached by the service worker for offline use.
The app's About section names each component, gives the SCMR attribution, and includes the full font licence.

| Asset (file) | Version / provenance | Licence (source of the statement) | Action taken |
|---|---|---|---|
| tesseract.js (`ocr/tesseract.min.js`, `ocr/worker.min.js`) | 5.1.1 (npm) | Apache-2.0 (package LICENSE.md) | Licence text included |
| Libraries bundled inside those files (from the source maps) | regenerator-runtime 0.13.11, is-electron 2.2.2, is-url 1.2.4, bmp-js 0.1.0, zlibjs 0.3.1, idb-keyval 6.3.0, wasm-feature-detect 1.10.1; buffer 6.0.3, ieee754 1.2.1, base64-js 1.5.1 (the last three versions from the tesseract.js v5.1.1 lockfile; licence files from the npm tarballs of those versions) | MIT ×7 (regenerator-runtime, is-electron, is-url, bmp-js, zlibjs, buffer, base64-js); Apache-2.0 ×2 (idb-keyval, wasm-feature-detect); BSD-3-Clause ×1 (ieee754) | Each text or notice included |
| tesseract.js-core (`ocr/tesseract-core-simd-lstm.wasm.js`) | 5.1.1 (npm); upstream tag v5.1.1 | Apache-2.0 | Included |
| Libraries compiled into the core (submodules pinned at tag v5.1.1) | Tesseract (Balearica fork e20b1c6), Leptonica 4af068b, libjpeg 6c0fcb8, libpng a37d483, libtiff b51bb15 (read from a GitHub mirror at the same commit), libwebp 20ef03e, giflib fa37672, zlib 21767c6, openlibm ae2d916 | Apache-2.0; Leptonica BSD-style; IJG; libpng v2; libtiff; BSD-3; MIT-style; zlib; MIT/BSD/ISC | All included, plus the IJG acknowledgement. It was not verified which of these are actually linked into this .wasm, so all are listed |
| English OCR model (`ocr/lang/eng.traineddata.gz`) | `@tesseract.js-data/eng` 1.0.0, folder 4.0.0_best_int: an integerised copy of tesseract-ocr/tessdata_best, made by naptha/tessdata | **Apache-2.0** (tessdata_best README and LICENSE; naptha/tessdata LICENSE). The npm wrapper says MIT, but the upstream data terms govern | Apache-2.0 attribution included |
| Fonts embedded in `index.html` | Inter (@fontsource 5.0.18), Barlow Semi Condensed (5.0.13), IBM Plex Mono (5.0.13) | SIL OFL 1.1, with the copyright lines from each package LICENSE | Copyright lines and the OFL text are in About and in the notices file |
| Icons, inline SVG, app code | Created in this project (repository history) | Owner's (no licence chosen) | — |

Remaining caveats for third-party software:
- No NOTICE files were found in the Apache-2.0 components checked (tesseract.js, tesseract.js-core, the Tesseract fork).
- The bundled minified files keep their own licence banners.
- The single-file offline build (`CMR-Reference-offline.html`, not committed) contains fonts but no OCR. Its About section includes the font notices.

## 3. SCMR reference values

- **Article:** Kawel-Boehm N, Hetzel SJ, Ambale-Venkatesh B, Captur G, Chin CWL, François CJ, Jerosch-Herold M, Luu JM, Raisi-Estabragh Z, Starekova J, Taylor M, van Hout M, Bluemke DA. Society for Cardiovascular Magnetic Resonance reference values ("normal values") in cardiovascular magnetic resonance: 2025 update. J Cardiovasc Magn Reson 2025;27(1):101853. doi 10.1016/j.jocmr.2025.101853; PMID 39914499; PMC12159681.
- **Reuse terms established:** the article's own first-page notice (in the article text I worked from) says "© 2025 The Authors. Published by Elsevier Inc. on behalf of Society for Cardiovascular Magnetic Resonance. This is an open access article under the CC BY license (http://creativecommons.org/licenses/by/4.0/)."
- **Conflicting metadata:** PubMed's copyright record for this PMID says "All rights reserved" and not open access. I could not open the PMC or publisher page from here to settle it.
- **Supplements:** none were used. I did not check whether any exist.
- **What the app reproduces or adapts:** numeric values from Tables 2, 3 and 5 (LV); 8 and 9 (RV); 13 (LA); 18 (RA); 57 (valve stages, which the article itself adapts from echo guidelines [92,93]); 63, 65 and 67 (aorta); 89, 90 and 95 (T1, ECV and T2 ranges); and 100 (T2* grading). These are transcribed into calculators and lookup tables, sometimes rearranged, and given interpretation labels. Figures and prose are not reproduced.
- **Conditions now met in the app (CC BY 4.0):** attribution with authors, title and source; copyright notice; licence name and link; a statement of changes; and a non-endorsement statement. These are in About, in `THIRD_PARTY_NOTICES.txt`, and in the copied-text footer (version line plus "SCMR 2025 reference values, JCMR 2025;27:101853").
- **Not established; needs publisher clarification or qualified advice:**
  - which licence actually applies, given the PubMed "All rights reserved" record;
  - whether any table contains third-party material outside the CC BY licence (the article text shows no "reproduced with permission" credits; Table 57 is "adapted from echocardiography according to references [92,93]");
  - whether, and in which jurisdictions, compiled numeric reference values are protected at all;
  - use of the SCMR name in the app (descriptive only, with a non-endorsement statement); trademark questions need qualified advice.
- **Blocker status:** if the article is CC BY 4.0, a colleague pilot and public sharing look permissible with the attribution now in place. That is not confirmed. **Resolve the licence conflict before public release.** For the pilot, it is your call whether the article's own CC BY statement is enough. A notice alone does not settle a permission question.

## 4. Other cited papers

The app cites single thresholds from many papers (EVIDENCE.md). Each is stated as a fact with its source; no
tables, figures or text are reproduced. Kang 2026 (Fig 1C cut-points) and Khan 2019 (Table 2 bands) are
numerical thresholds only. No permission question was identified, but none was investigated beyond this.

## 5. Distribution blockers

| Item | Pilot | Public release |
|---|---|---|
| Third-party software, data and font notices | Done in rc3 | Done (re-check if dependencies change) |
| SCMR licence conflict (article says CC BY 4.0; PubMed says "All rights reserved") | Owner judgement; the article's own statement supports reuse | **Must be resolved** (publisher page or SCMR/Elsevier) |
| Licence for your own code | Not required to distribute your own work, but say what others may do with it | Decide |
| Trademark / name use (SCMR, OSU) | Non-endorsement statement present | Qualified advice recommended |
