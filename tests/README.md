# Tests
- `suite2.js` + `harness2.js`: revised suite (Layer 1 software, Layer 2 evidence concordance). `node suite2.js chromium` (needs `playwright`; set `CMR_URL` to the built page).
- `aorta_sweep.js [path/to/src/index.html]`: aortic z-score sweep against SCMR values.
- `scan_gate.js`: OCR scan end-to-end; serve the built `dist/` on http://localhost:8765 first.
- `axe.js`: axe-core accessibility scan (paths inside need editing).
- `suite_original.js` + `harness_original.js`: the original audit suite, kept unchanged for comparison.
- `results/`: JSON results from the remediation run.
