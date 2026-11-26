# Release checklist and merge / deploy / rollback instructions (2026.11-rc1)

Nothing here has been done. No merge, deploy or publish has been performed.

## Deploy configuration (as inspected)

- Repository `aamerubaid-a11y/CMR-reference`: `has_pages: true`. Recent runs use the built-in `pages-build-deployment` workflow, which means Pages is set to "Deploy from a branch". There is no workflow file in `.github/`.
- The Pages source settings could not be read from here (the API was refused). The root layout (`index.html`, `sw.js` and `manifest.webmanifest` at the repo root) and the history suggest **branch `main`, folder `/` (root)**. Confirm this in GitHub → Settings → Pages before merging.
- Pages serves exactly what is committed at the root. `src/` holds the source and `build/build.py` produces the root files, so after any source change, rebuild and commit the root `index.html` and `sw.js` together.

## A. Gate for a limited pilot

- [x] Revised suite 172/172 in Chromium; aortic sweep 580/0; aortic transcription 132/0; scan gate passes.
- [x] All 77 original tests have a disposition (`TEST_DISPOSITION.md`).
- [x] Unverified outputs are withheld (liver iron concentration). The other three evidence gaps are now verified (EVIDENCE.md).
- [ ] Owner reviews the diff (`docs/rc1-since-c0f2f52.diff` and `docs/remediation.diff`).
- [ ] Device checklist completed on at least one iPhone (Safari) and one Android phone (Chrome) (`DEVICE_CHECKLIST.md`).
- [ ] Proposed cases P1–P20 entered by the owner, with agreement recorded (`PROPOSED_VALIDATION_CASES.md`).
- [ ] Pilot users named and given the release notes.

## B. Additional gate for public sharing

- [ ] Decisions Q1–Q5 recorded (`ADJUDICATION.md`).
- [ ] Second-reader review of de-identified studies, with discrepancies resolved.
- [ ] Safari/Firefox desktop and screen-reader pass; home-list `nested-interactive` fixed.
- [ ] Licence notices (tesseract.js Apache-2.0, fonts OFL); SCMR table reuse terms confirmed.
- [ ] Intended-use / regulatory review by someone qualified.

## C. Merge (owner)

```
git fetch origin
git checkout main && git pull
git tag pre-rc1-main            # rollback point (currently 0af7de5)
git merge --no-ff remediation/audit-2026-11 -m "Release 2026.11-rc1 (limited pilot)"
git push origin main pre-rc1-main
```
Or open a pull request from `remediation/audit-2026-11` into `main` and merge it there.

## D. Deployment verification (after Pages finishes; check the Actions tab for "pages-build-deployment")

1. Open `https://aamerubaid-a11y.github.io/CMR-reference/sw.js`. Line 2 must read `const CACHE='cmr-ref-f34dd26b4a';`.
2. Open the site and go to About. The version must read `2026.11-rc1 (release candidate, not deployed)`. Edit this string, then rebuild and retest, if you want a different label for the live release.
3. In the LV calculator, "Reference population required" is visible and nothing is selected.
4. Run case P1 (Adult male, LVEF 52.6): it should show "Below reference". Copy it and confirm the copied text contains `2026.11-rc1`.
5. Iron → Liver: the result should say "Liver iron concentration withheld".

## E. Detecting an old cached version (service worker)

The service worker uses `skipWaiting` and `clients.claim`, loads the page network-first, and deletes old caches
on activation. An online visit therefore normally picks up the new version, but an installed app that is opened
offline, or opened before the browser has re-checked `sw.js`, can still show the old one.

- **On any device:** About shows the version. Anything other than `2026.11-rc1` means a stale copy. Copied results also carry the version line, so pilot reports show which version produced them.
- **Fix on the device:** open the site once while online, close all of its tabs and the installed app, then reopen. If it is still stale: iOS Settings → Safari → Advanced → Website Data → delete the `github.io` entry (or remove and re-add the Home Screen app). Android Chrome: Site settings → Storage → Clear. Desktop: DevTools → Application → Service workers → Unregister, then Clear storage.
- **Desktop check:** DevTools → Application → Cache Storage should list only `cmr-ref-f34dd26b4a`. An older name means the previous worker is still active.

## F. Rollback

```
git checkout main
git revert -m 1 <merge-commit>   # preferred: keeps history
git push origin main
```
Or, if nothing else has been merged since: `git reset --hard pre-rc1-main && git push --force-with-lease origin main`.

The reverted build has a different `sw.js` cache name (the current live main, 0af7de5, is `cmr-ref-ab54ebbf36`),
so clients replace the RC on their next online visit. Verify with step D.1 that the old cache name is being
served, and that About no longer shows `2026.11-rc1`. 0af7de5 has no version line in About, so after a rollback
check that "Reference population required" is absent.
