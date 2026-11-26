# Maintenance

## Layout
- `src/index.html` — the whole app (single file). Reference data and rules live in clearly marked blocks:
  `LV_AGE`, `ITEMS[...].methods` (SCMR chamber tables), `AO` (aorta), `ECV_REF`, `KANG`, `KHAN`,
  `markers()` (all clinical markers with sources), `avResults()` (valves), `cardCat()` (iron).
- `build/build.py` — builds `dist/` (PWA), `CMR-Reference-offline.html` and the zip. It expects the source at
  `../src/index.html` relative to a working copy; see the header of the script.
- `tests/` — `suite2.js` (revised validation suite), `aorta_sweep.js`, `harness2.js`, the original `suite.js`.
- `docs/EVIDENCE.md`, `docs/ADJUDICATION.md`, `docs/VALIDATION.md`.

## Changing a reference value or threshold
1. Find the primary source and the exact table/figure. Record it in `docs/EVIDENCE.md` with status.
2. Edit only the data constant or the one marker line in `markers()` / `avResults()`. Keep the source comment.
3. Add or update boundary tests in `tests/suite2.js` (just below, at, just above). Type the expected values
   from the paper; never compute them with app functions.
4. Bump `APP_VERSION` in `src/index.html` and add a `CHANGELOG.md` entry.
5. Build, run `node tests/suite2.js chromium` and `node tests/aorta_sweep.js src/index.html`.
6. Do not ship a new classification without a named clinician sign-off in `docs/ADJUDICATION.md` if the source
   does not itself define the categories.

## Versioning
- `APP_VERSION` (shown in About and in every copied result) uses `YYYY.MM-rN`.
- `DATA_VERSION` names the reference dataset. Change it whenever any reference value changes.
- The service worker cache name is derived from a hash of the built page, so each build invalidates the cache.

## Release and rollback
- GitHub Pages serves the `main` branch root. Work happens on a branch; merging to `main` is the release.
- Before merging: all suites pass, CHANGELOG updated, clinician sign-offs recorded.
- Rollback: `git revert <merge commit>` on `main` (or reset `main` to the previous release tag) and push. Users
  get the previous build on their next online load; the service worker replaces the cache because the build hash
  changes.
- Tag each release: `git tag vYYYY.MM-rN`.
