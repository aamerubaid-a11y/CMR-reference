# Owner device-test log (2026.11-rc3)

Results the owner reported in chat. This is a record of observations, **not** an approval: the approval record
(OWNER_CHECKLIST §D) stays blank until the owner fills it in.

## Session 1: 27 Nov 2026, iPhone Safari over local Wi-Fi

**Setup:** candidate zip from commit 442a377 (cache `cmr-ref-c9f86960bf`), served from a Windows PC with
`python -m http.server 8080 --bind 0.0.0.0` on a private home Wi-Fi, opened over plain `http://`, so not a secure
context. Device model and iOS version were not recorded; add them in §D.

| Item | Observation reported | Result |
|---|---|---|
| Smoke 1 / B1 | About shows 2026.11-rc3 (the attribution text was not specifically checked) | Pass (version) |
| Smoke 2 / B2–B3 | No population selected → "Select the reference population"; after Adult male: EF 52.6 · Below reference. In the first attempt Adult male was already selected before starting; on re-check nothing was pre-selected | Pass |
| Smoke 2c | After closing and reopening the tab, no population pre-selected | Pass |
| Smoke 4 / B4 | ESV 40 → EF 60.0 · Within reference, updated automatically | Pass |
| Smoke 5 / B5 | Copy worked; pasted text included Adult male, SCMR 2025 Table 2, 2026.11-rc3 | Pass |
| Smoke 6 / B8 | New patient cleared everything | Pass |
| B6, B7, B9, B10, B11 | Reported "all tests passed" | Pass (as reported) |
| B12 | VoiceOver read the row and "Favorite: …" as separate items | Pass |
| B13 | Landscape and largest text size: no sideways scrolling or cut-off text | Pass |
| B14–B16 | Install, offline, stale-cache | **Pending**: needs HTTPS (approved secure preview, or the live site after an approved merge) |

**Not covered by this session:**
- Android (no device; pending a colleague's real phone).
- Section C cases.
- Decisions A1–A5e.
