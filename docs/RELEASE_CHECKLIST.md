# Release checklist and merge / deploy / rollback instructions (2026.11-eval4)

Proposed sequence only. Nothing here has been done: no merge, deploy or publish. Use it only after your explicit approval.

## Deploy configuration (as inspected)

- Repository `aamerubaid-a11y/CMR-reference` is **public**, with `has_pages: true` and a `.nojekyll` file. There is no workflow file; deploys use the built-in `pages-build-deployment` ("Deploy from a branch").
- The deployments API shows environment `github-pages`, **ref `main`**, last deployed at 0af7de5 (26 Nov 2026 18:23 UTC). Branch pushes are not deployed. The Pages settings endpoint was refused from here, so the folder (root `/`, as the layout suggests) should be confirmed in GitHub → Settings → Pages.
- Pages serves exactly what is committed at the root. `src/` holds the source and `build/build.py` produces the root files, so after any source change, rebuild and commit the root `index.html` and `sw.js` together.

## A/B. Gates

Merge only after your explicit approval. The application files to publish are those of commit `8372877` on
branch `release/2026.11-eval4` (cache `cmr-ref-e89599153d`); later commits on that branch change documentation,
tests, `README.txt` and the ZIP only.

## C. Merge (owner)

```
git fetch origin
git checkout main && git pull
git tag pre-eval4-main          # rollback point (currently bd8ae97, eval3)
git merge --no-ff origin/release/2026.11-eval4 -m "Release 2026.11-eval4 (evaluation release)"
git push origin main pre-eval4-main
```
Or open a pull request from `release/2026.11-eval4` into `main` and merge it there.

Before merging, confirm the app files at the branch head equal the tested commit:
`git diff --stat 8372877 origin/release/2026.11-eval4 -- index.html sw.js THIRD_PARTY_NOTICES.txt src/ manifest.webmanifest ocr/ icon-192.png icon-512.png icon-maskable.png apple-touch-icon.png`
must print nothing.

## D. Deployment verification (after Pages finishes; Actions tab, "pages-build-deployment")

1. `https://aamerubaid-a11y.github.io/CMR-reference/sw.js` line 2 reads `const CACHE='cmr-ref-e89599153d';`.
2. About shows `2026.11-eval4 (evaluation release; validation incomplete)`.
3. LV calculator: "Reference population required", nothing selected. Adult male, EDV 100, ESV 47.4 → LVEF 52.6 · Below reference; Copy result contains `2026.11-eval4`.
4. Iron → liver T2* 8 ms at 1.5 T → 3.4 mg/g · 60 µmol/g, "Severity not graded: band source not verified".
5. Report → scan button present (HTTPS only).

## E. Detecting an old cached version (service worker)

The worker uses `skipWaiting` and `clients.claim`, loads the page network-first and deletes old caches on
activation (checked by `tests/sw_update.js`: eval2 → eval3 on reload). An installed app opened offline, or before
the browser re-checks `sw.js` (GitHub Pages caches for up to 10 minutes), can still show the previous version.
- About and every copied result show the version.
- Fix on a device: open the site online, close all its tabs and the installed app, reopen. Still stale: clear the
  site's data (iOS Settings → Safari → Advanced → Website Data; Chrome site settings → Clear data).
- Desktop: DevTools → Application → Cache Storage lists only `cmr-ref-e89599153d`.

## F. Rollback

```
git checkout main
git revert -m 1 <merge-commit>   # preferred: keeps history
git push origin main
```
Or, if nothing else has been merged since: `git reset --hard pre-eval4-main && git push --force-with-lease origin main`.
The previous live build (bd8ae97, eval3) uses cache `cmr-ref-bc8b4440f1` and shows 2026.11-eval3 in About; after a
rollback confirm D.1 shows that name and About shows 2026.11-eval3.
