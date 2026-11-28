# Device and accessibility checklist (to be completed by the owner)

Automated checks ran in Chromium only (desktop 1280×900, phone 360×740 and 390×844). Nothing below has been done
on a real device. Test either the local RC build (unzip `CMR-Reference-PWA.zip` and serve it over https or
localhost) or the live site after deployment. Use synthetic values from `PROPOSED_VALIDATION_CASES.md` only.

Record for each device: model, OS version, browser version, date, tester, pass/fail, notes.

| # | Check | iPhone Safari | Android Chrome | Desktop (Chrome/Edge + Safari or Firefox) |
|---|---|---|---|---|
| 1 | About shows `2026.11-rc1` | | | |
| 2 | LV calculator: "Reference population required" visible, nothing selected | | | |
| 3 | Choose Adult male; enter case P1; result card below inputs; no text hidden or overlapped | | | |
| 4 | Copy result; paste into Notes/email: population, table, method, version line present; numbers match screen | | | |
| 5 | Under 18 y: "unavailable" on screen and in copied text | | | |
| 6 | Iron: no category until 1.5 T or 3 T is chosen; liver shows "LIC withheld" | | | |
| 7 | Clear this page keeps population and BSA; New patient clears both | | | |
| 8 | Rotate to landscape and back; no horizontal scroll | | | |
| 9 | Install (Add to Home Screen / Install app); open from icon | | | |
| 10 | Airplane mode; reopen installed app; calculators work offline | | | |
| 11 | Scan (if used): nothing filled before Apply; sex never applied | | | |
| 12 | Dark mode: text and pills readable | | | |
| 13 | Text size at the largest system setting: layout usable | | | |

## Keyboard (desktop)

| # | Check | Result |
|---|---|---|
| K1 | Tab reaches search, home list rows, population buttons, inputs, Copy, Clear, New patient, in a sensible order | |
| K2 | Enter/Space toggles population buttons; selected state visible | |
| K3 | Focus outline always visible | |
| K4 | Scrollable tables reachable and scrollable with the keyboard | |
| K5 | Known issue: the favourite button inside a home row button (axe `nested-interactive`). Note how it behaves | |

## Screen reader

| # | Check | VoiceOver (iOS) | TalkBack (Android) | NVDA or VoiceOver (desktop) |
|---|---|---|---|---|
| S1 | Population buttons announced with pressed / not pressed state | | | |
| S2 | Input labels and units announced | | | |
| S3 | Result value and status ("Below reference", marker text) are read together, in order | | | |
| S4 | "Check inputs" and "unavailable" messages are announced or reachable | | | |
| S5 | Home list rows: note duplicate or confusing announcements (known issue) | | | |
