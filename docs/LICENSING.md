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

## 3. SCMR reference values (re-checked 26 Nov 2026)

- **Same article in every record:** DOI 10.1016/j.jocmr.2025.101853; PMID 39914499; PMC12159681; Elsevier pii S1097664725000158. That is J Cardiovasc Magn Reson 2025;27(1):101853, published online 4 Feb 2025. The text the app was transcribed from is the version-of-record PDF (journal header "Journal of Cardiovascular Magnetic Resonance 27 (2025) 101853").
- **Licence wording that applies, and where it appears:**
  - *Version-of-record PDF, first page footnote:* "1097-6647/© 2025 The Authors. Published by Elsevier Inc. on behalf of Society for Cardiovascular Magnetic Resonance. This is an open access article under the CC BY license (http://creativecommons.org/licenses/by/4.0/)."
  - *Publisher article page (ScienceDirect):* header "Open access · Under a Creative Commons license", and the line "© 2025 The Authors. Published by Elsevier Inc. on behalf of Society for Cardiovascular Magnetic Resonance."
- **The "All rights reserved" records are not article licences.** PubMed's copyright field ("Copyright © 2025 The Authors. Published by Elsevier Inc. All rights reserved") is generic metadata. The ScienceDirect site footer ("All content on this site: Copyright © 2026 Elsevier B.V. … All rights are reserved …") is a site-wide notice, and it adds that "for all open access content, the relevant licensing terms apply". Neither overrides the article-specific CC BY 4.0 statement. **There is no permission conflict, only inconsistent metadata.** The earlier report wrongly called it a conflict.
- **Separate exclusions or notices on reproduced material:** none found. No "reproduced from", "reprinted", "with permission" or "courtesy" lines appear in the article text or on the publisher page, and no supplementary files are listed. Table 57 is "adapted from echocardiography according to references [92,93]": its thresholds are attributed to guidelines, with no rights notice. Figure captions cite methods ("according to reference …"), and the app does not reproduce figures.
- **Corrections:** none found on the publisher page, and no erratum record under the first author's JCMR records in PubMed (checked 26 Nov 2026).
- **What the app reproduces or adapts:** numeric values from Tables 2, 3, 5, 8, 9, 13, 18, 57, 63, 65, 67, 89, 90, 95 and 100. They are transcribed into calculators, rearranged, and given interpretation labels.
- **Attribution and adaptation notices already in rc3:**
  - About: authors, title, journal and citation; "© 2025 The Authors"; "open access under CC BY 4.0" with the licence link; a list of changes; and a statement that the authors and SCMR do not endorse the app.
  - `THIRD_PARTY_NOTICES.txt`: the same attribution block.
  - Copied text: a footer citing "SCMR 2025 reference values, JCMR 2025;27:101853".
- **Conclusion:** the article-specific terms (CC BY 4.0) permit the adaptation, with the attribution and change notice that rc3 includes. No publisher inquiry is needed for these terms. This is my reading of the documents, not legal advice.
- **Still open, for qualified advice (not publisher clarification):** use of the SCMR name in the app, a naming or trademark question that the copyright licence does not settle. The app uses it descriptively, with a non-endorsement statement.
- **Already distributed vs hosted:** the repository is public, so the source files (including the transcribed tables, the OCR libraries and the fonts) are already distributed via GitHub. That is true of `main` (0af7de5, live on GitHub Pages) and of this branch. **`main` and the live site still lack the rc3 notices:** no CC BY attribution block, no third-party licence texts. That gap stays in production until an approved merge. "Not deployed" applies only to the rc3 candidate as a hosted site.

## 4. Other cited papers

The app cites single thresholds from many papers (EVIDENCE.md). Each is stated as a fact with its source; no
tables, figures or text are reproduced. Kang 2026 (Fig 1C cut-points) and Khan 2019 (Table 2 bands) are
numerical thresholds only. No permission question was identified, but none was investigated beyond this.

rc4: the liver iron severity bands (normal <37, mild 37–150, moderate 151–300, severe >300 µmol/g) are taken as
shown on the Columbia T2* calculator (columbia.edu/~sj2532/t2_star.html), which is credited in the iron page
sources with the four papers it cites (Anderson 2011, Carpenter 2011, Wood 2005, Storey 2007). Only four
numerical cut-points and two published equations are used; no page text, layout or code from the site is copied.
SCMR 2025 Table 89 (already listed above) is now also used as a native T1 reference set, under the same CC BY 4.0 attribution.

## 5. Distribution blockers

| Item | Pilot | Public release |
|---|---|---|
| Third-party software, data and font notices | Done in rc3 | Done (re-check if dependencies change) |
| SCMR reuse terms | CC BY 4.0 verified on the article and publisher page; attribution in place | Same |
| Production gap: `main`/live site lack the rc3 notices | Fixed by an approved merge of rc3 | Same |
| Licence for your own code | Optional | Decide |
| Name use (SCMR, OSU) | Non-endorsement statement present | Qualified advice recommended |
