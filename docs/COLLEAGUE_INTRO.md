# CMR Reference: a note for colleagues

CMR Reference is a free, offline-capable web app I built to put SCMR 2025 normal values and published CMR
outcome thresholds in one place while reporting. You enter measurements; it shows the calculated values, how they
compare with the SCMR reference range for the population and method you choose, and, separately, any published
clinical marker with its source study and population.

**Please treat it as an evaluation release.** It has not been clinically validated and is not a medical device.
Several interpretations are deliberately withheld where the evidence was not secure enough; the number is still
shown. Check anything you would put in a report against the cited source.

**How to open it**
- Web link: [to be added once the release is published].
- Or, from the ZIP: unzip, then in the `app` folder run `python -m http.server 8080` and open http://localhost:8080.
- On a phone you can add it to the home screen (Safari: Share → Add to Home Screen; Chrome: Install app). After the
  first online visit it works offline. About shows the version you are using.

**What I would value most:** wrong or confusing outputs, labels whose wording or population you disagree with,
missing measurements you use routinely, and anything awkward on your phone or browser. A short template is in
FEEDBACK_TEMPLATE.md. Please never include patient identifiers; synthetic or rounded values are enough.

Aamer Ubaid, MD
