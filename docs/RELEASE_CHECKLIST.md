# Release checklist and merge / deploy / rollback instructions (2026.11-rc2)

Proposed sequence only. Nothing here has been done: no merge, deploy or publish. Use it only after your explicit approval.

## Deploy configuration (as inspected)

- Repository `aamerubaid-a11y/CMR-reference` is **public**, with `has_pages: true` and a `.nojekyll` file. There is no workflow file; deploys use the built-in `pages-build-deployment` ("Deploy from a branch").
- The deployments API shows environment `github-pages`, **ref `main`**, last deployed at 0af7de5 (26 Nov 2026 18:23 UTC). Branch pushes are not deployed. The Pages settings endpoint was refused from here, so the folder (root `/`, as the layout suggests) should be confirmed in GitHub → Settings → Pages.
- Pages serves exactly what is committed at the root. `src/` holds the source and `build/build.py` produces the root files, so after any source change, rebuild and commit the root `index.html` and `sw.js` together.

## A/B. Gates

Use `OWNER_CHECKLIST.md`. It replaces the earlier gate lists. Merge only after you have completed sections A–D
there and given explicit approval.

## Before merging: version label (needs your decision)

The About text reads "release candidate, not deployed", which will be wrong once the build is live. Choose one:
(a) keep it for the pilot, accepting the wording; or (b) approve a label-only change (for example
`2026.11-pilot1`). Option (b) needs a rebuild, a full test rerun and a new candidate commit. I will not make it
without your approval.

## C. Merge (owner)

```
git fetch origin
git checkout main && git pull
git tag pre-rc2-main            # rollback point (currently 0af7de5)
git merge --no-ff remediation/audit-2026-11 -m "Release 2026.11-rc2 (limited pilot)"
git push origin main pre-rc2-main
```
Or open a pull request from `remediation/audit-2026-11` into `main` and merge it there.

Before merging, confirm that the app files at the branch head equal the tested commit:
`git diff --stat c68d431 origin/remediation/audit-2026-11 -- index.html sw.js src/ manifest.webmanifest ocr/`
must print nothing.

## D. Deployment verification (after Pages finishes; check the Actions tab for "pages-build-deployment")

1. Open `https://aamerubaid-a11y.github.io/CMR-reference/sw.js`. Line 2 must read `const CACHE='cmr-ref-af44e7d671';`.
2. Open the site and go to About. The version must read `2026.11-rc2 (release candidate, not deployed)`. Edit this string, then rebuild and retest, if you want a different label for the live release.
3. In the LV calculator, "Reference population required" is visible and nothing is selected.
4. Run case P1 (Adult male, LVEF 52.6): it should show "Below reference". Copy it and confirm the copied text contains `2026.11-rc2`.
5. Iron → Liver: the result should say "Liver iron concentration withheld".

## E. Detecting an old cached version (service worker)

The service worker uses `skipWaiting` and `clients.claim`, loads the page network-first, and deletes old caches
on activation. An online visit therefore normally picks up the new version, but an installed app that is opened
offline, or opened before the browser has re-checked `sw.js`, can still show the old one.

- **On any device:** About shows the version. Anything other than `2026.11-rc2` means a stale copy. Copied results also carry the version line, so pilot reports show which version produced them.
- **Fix on the device:** open the site once while online, close all of its tabs and the installed app, then reopen. If it is still stale: iOS Settings → Safari → Advanced → Website Data → delete the `github.io` entry (or remove and re-add the Home Screen app). Android Chrome: Site settings → Storage → Clear. Desktop: DevTools → Application → Service workers → Unregister, then Clear storage.
- **Desktop check:** DevTools → Application → Cache Storage should list only `cmr-ref-af44e7d671`. An older name means the previous worker is still active.

## F. Rollback

```
git checkout main
git revert -m 1 <merge-commit>   # preferred: keeps history
git push origin main
```
Or, if nothing else has been merged since: `git reset --hard pre-rc2-main && git push --force-with-lease origin main`.

The reverted build has a different `sw.js` cache name (the current live main, 0af7de5, is `cmr-ref-ab54ebbf36`),
so clients replace the RC on their next online visit. Verify with step D.1 that the old cache name is being
served, and that About no longer shows `2026.11-rc2`. 0af7de5 has no version line in About, so after a rollback
check that "Reference population required" is absent.
