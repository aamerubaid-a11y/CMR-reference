# Clinical decision sheet (2026.11-rc2; summary and pilot-relevant items in OWNER_CHECKLIST.md §A)

No clinician has made a decision. Every "Proposal" below is a proposal by the reviewer, not an approval. Each
interpretation stays in its conservative pending state until the app owner (or a CMR clinician the owner
names) fills in the decision line.

**Can the pilot proceed without these decisions?** Yes. Every item below is already in a conservative state
(withheld, or shown with its source population and labelled as separate from the reference comparison). No
decision is needed for a limited pilot. All five are needed before public sharing.

---

## Q1. LVEF inside the reference interval but high ("supranormal")

1. **Exact question:** Should an LVEF that is inside the SCMR 2025 interval (men 53–79%, women 55–80%; up to 83% in some age groups) ever carry a risk marker?
2. **What the sources support:** SCMR 2025 Tables 2, 3, 5 treat these values as within the healthy reference. Krittayaphong 2025 JAHA (CMR referral cohort with suspected CAD; abstract only) and Shah 2022 JACC HF (MESA and Dallas Heart; cohort quartiles, with risk driven mostly by low stroke volume) link high LVEF with risk. Neither gives a fixed CMR cut-off for general use.
3. **Population and convention:** referral and community cohorts; cohort-specific quartiles; not the SCMR healthy reference population.
4. **Fit:** weak. No source gives a portable threshold.
5. **Proposal:** no flag inside the SCMR interval. Optionally add an information-only line: "LVEF ≥70% with low LV stroke volume index has been associated with risk in community cohorts (Shah 2022)."
6. **Pending behaviour (now):** no supranormal label. The value is compared with the SCMR interval only.

**Decision:** ______ **By / date:** ______

## Q2. Repaired tetralogy of Fallot RV thresholds

1. **Exact question:** Which RV thresholds should appear in the repaired-TOF context, and labelled for what purpose (surveillance, risk marker, or timing criterion for pulmonary valve replacement)?
2. **What the sources support:** Bokma 2023 JACC (abstract): PVR associated with less death/VT only when RVESVi >80 mL/m² (observational). Geva criteria, read only through a 2022 review: PR fraction ≥25% plus ≥2 of RVEDVi ≥160, RVESVi ≥70, LVEDVi ≤65, RVEF ≤45%. Geva 2018 (abstract): RV mass/volume ≥0.45 g/mL and RVEF <40% predict outcomes after PVR (still shown in the stenosis/conduit calculator).
3. **Population and convention:** repaired TOF; contouring conventions differ between centres; the Geva primary paper was not read.
4. **Fit:** good for TOF patients, but these are thresholds for decisions, not severity grades.
5. **Proposal:** show both, labelled by purpose, never combined into one verdict, and never worded as a recommendation. Read the Geva primary paper before enabling.
6. **Pending behaviour (now):** TOF-context RV labels and the Geva count in the PR calculator are withheld. Values and the SCMR comparison are still shown.

**Decision:** ______ **By / date:** ______

## Q3. Echo-derived tiers where no CMR tiers exist

1. **Exact question:** For general-population RVEF, MS pressure half-time and mean gradient, the PS moderate band and RA area, should the app show echo tiers labelled "echo-derived", or only the reference comparison?
2. **What the sources support:** Muraru 2020 (3D echo RVEF 45/40/30%, abstract), the echo valve guidelines and the ESC/ERS RA-area bands. None of them is CMR-derived.
3. **Population and convention:** echo. CMR volumes run larger, and phase-contrast gradients run lower.
4. **Fit:** poor. The values are not interchangeable between modalities.
5. **Proposal:** keep them withheld.
6. **Pending behaviour (now):** withheld. Values are compared with the SCMR reference only.

**Decision:** ______ **By / date:** ______

## Q4. Kang LVEDVi grades outside DCM/ICM

1. **Exact question:** Should the Kang 2026 sex-specific grades (men >100 / 150 / 200; women >90 / 130 / 170 mL/m²) apply outside DCM/ICM, or with papillary muscles included in the mass?
2. **What the sources support:** Kang 2026 JACC 88:773 (brief report, published): derived in DCM and validated in DCM/ICM, with papillary muscles in the blood pool. Only the severe grade is outcome-derived.
3. **Population and convention:** DCM/ICM; papillary muscles in the blood pool.
4. **Fit:** good only in DCM/ICM with matching contouring.
5. **Proposal:** keep the current behaviour.
6. **Pending behaviour (now):** shown only in the DCM/ICM context, with a note when the contouring setting differs.

**Decision:** ______ **By / date:** ______

## Q5. Khan LA grades when the value is inside the SCMR interval

1. **Exact question:** Khan 2019 grades LAVi using its own normal limit (<52 mL/m², biplane, appendage excluded). The SCMR 2025 biplane upper limit is 56 for men and 54 for women. Between 52 and that limit, the app shows "Within reference" and "Khan: mild enlargement" together. Should the Khan line appear only above the SCMR limit, or only for moderate and severe? A related point: Khan's bands are integers (mild 52–62, moderate 63–73), and the app treats values above 62 and below 63 as moderate. Confirm this convention.
2. **What the sources support:** Khan 2019 JCMR Table 2 (full text). Mild enlargement was not independently associated with death. SCMR 2025 Table 13 (full text).
3. **Population and convention:** 10,890 clinical referrals, biplane method, appendage excluded.
4. **Fit:** moderate.
5. **Proposal:** show Khan grades only for moderate and severe, and rely on the SCMR comparison below that. Keep the >62 → moderate convention.
6. **Pending behaviour (now):** both lines are shown, labelled separately, each with its own source and boundaries.

**Decision:** ______ **By / date:** ______

---

## Closed in rc2

- **F17, hematocrit as a fraction:** the input must now be a percentage from 15 to 65. There is no conversion, and no ECV is shown or exported otherwise.
- **Liver ECV ≥32%:** source verified in full text; the label is now method-qualified. Whether it applies at your centre is OWNER_CHECKLIST A3.
