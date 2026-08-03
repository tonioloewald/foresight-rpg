# Star System Generation
<!--{ "parent": "foresight-1986", "order": 7 }-->

*ForeSight (1986), pp. 71–88 — a best-effort cleanup of the machine-extracted original; expect residual OCR noise. Compare with the [source PDF](/foresight-1986.pdf#page=71). [About this restoration](/foresight-1986/).*

> **Set aside — slated for a rewrite.** The planet- and star-system generators here are out of step with modern astrophysics; even devoted 1986 fans won't miss them. Kept for historical interest — a fresh worldbuilding system will replace this chapter.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=71">ForeSight 1986 · p.71 ↗</a></div>

*[Illustration in the original — see the source-PDF page link above. Historical; a replacement is planned.]*

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=72">ForeSight 1986 · p.72 ↗</a></div>

*[Illustration in the original — see the source-PDF page link above. Historical; a replacement is planned.]*

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=73">ForeSight 1986 · p.73 ↗</a></div>

#### [7.0] Star System Generation

**Designer's Notes:** In a Science Fiction Role-Playing Game, some form of Star System Generator is desireable. This system should not put the GM to too much trouble; it should allow for a good degree of detail; and it should be "dumb" (ie. a GM should be able to plug it into his/her computer without having to add any algorithms), as well as fulfilling the pre-requisites outlined in the Introduction.

I think that the following system qualifies in these respects, although there may be some controversy over how much trouble the system is to implement, I feel that a more simple generation system (like Traveller's) pays for its relative simplicity by being too lacking in detail (planets are neither interesting, nor different enough), and this detail must be added by the GM, without help from the rules. ForeSight planets are detailed enough to be interesting to players and GMs alike, and furthermore the whole thing, down to rough planetary maps, can be performed by a computer (the program will not take long to write: if there is sufficient interest, I may publish my own). Finally, the system is, at least to a degree, scientifically sound, which is important in a Science Fiction RPG.

##### Generating a Star System

**Procedure:** A Star-System in ForeSight must first be located around a star. The star should be chosen from an appropriate document (eg. a decent Star Catalogue), and should be within thirty light-years, or so, of Sol. This system was designed with solitary type V (dwarf) stars (like the sun) in mind. Furthermore, I recommend that, barring special circumstances, you restrict yourself to type F, G, K, and M stars. Once the star has been chosen, and its name recorded appropriately on the System Display, proceed as follows:

**[i]** Determine the star's type: this comprises a letter (ie. A, F, G, K, M, or S) followed by a number (an integer from 0 to 9). Look at the following table under Range; this will give a range of numbers. There are sixteen orbitals listed on the System display: roll D10 for each of orbitals 1 to 10, and D6 for each of orbitals 11 to 16; if the roll for a given orbital falls in the star's range, then tick the Orbital Radius slot of that orbital.

**Stellar Type Table**

| Stellar Type | Range | Radius | Mass |
| --- | --- | --- | --- |
| B0 - B4 | ≤1 | 37 | 6.2 |
| B5 - B9 | ≤1 | 11 | 3.3 |
| A0 - A4 | ≤1 | 6 | 2.4 |
| A5 - A9 | ≤2 | 3 | 1.8 |
| F0 - F4 | ≤3 | 2 | 1.5 |
| F5 - F9 | ≤4 | 1.5 | 1.3 |
| G0 - G4 | ≤6 | 1 | 1.1 |
| G5 - G9 | ≤5 | 0.65 | 0.92 |
| K0 - K4 | ≤4 | 0.4 | 0.74 |
| K5 - K9 | ≤3 | 0.18 | 0.54 |
| M0 - M4 | ≤2 | 0.08 | 0.22 |
| M5 - M9 | ≤1 | 0.03 | 0.11 |
| S0 - S4 | ≤3 | 0.1? | 1.5? |
| S5 - S9 | ≤2 | 0.04? | ? |

**[ii]** Consult the Stellar Type table under Radius; this will yield a number. Replace each tick placed in the previous step with the multiple of this number and the number beside it (in the Base Radius column). The new number is the actual Orbital Radius of the "planet" located in that orbital, in Astronomical Units (1 AU = the Earth's Orbital Radius about Sol).

**[iii]** For any orbitals filled in step [i] roll D10 and consult the Planet Type Table to determine the table to be used to determine planet size.

**Planet Type Table**

| Roll | Modifier |
| --- | --- |
| 1-3 | Use the Standard Planet Size Table. |
| 4-9 | Use the Gas Giant Planet Size Table if Orbital 11 to 16, otherwise as above. |
| 10 | The "planet" is an asteroid belt. |

**[iv]** For each Orbital to be occupied by a planet (as indicated in step [ii]) roll D10, and consult the table indicated. Write down the resulting planet size in the Planet Size slot for that orbital.

**Standard Planet Size Table**

| Roll\* | Size | CG | Diameter (km) | SubZone Size (km) |
| --- | --- | --- | --- | --- |
| ≤1 | 0 | 0.2 | 2500 | 500 |
| 2 | 1 | 0.3 | 3750 | 750 |
| 3 | 2 | 0.4 | 5000 | 1000 |
| 4 | 3 | 0.6 | 7500 | 1500 |
| 5 | 4 | 0.8 | 10000 | 2000 |
| 6 | 5 | 1.0 | 12500 | 2500 |
| 7 | 6 | 1.2 | 15000 | 3000 |
| 8 | 7 | 1.6 | 20000 | 4000 |
| 9 | 8 | 2.4 | 30000 | 6000 |
| ≥10 | 9 | 3.6 | 45000 | 9000 |

**Gas Giant Size Table**

| Roll\* | Size | CG | Diameter (km) | SubZone Size (km) |
| --- | --- | --- | --- | --- |
| ≤0 | Add ten to result and consult previous table. | | | |
| 1-4 | G1 | 4.8 | 60000 | 12000 |
| 5-9 | G2 | 9.6 | 120000 | 24000 |
| ≥10 | G3 | 20.0 | 250000 | 50000 |

\* Subtract 3 from the roll if planet orbiting a Type S star.

Note: in certain formulae, a planet's size is treated as being a numerical value. In such cases, treat sizes G1, G2, and G3, as having values of 10, 11, and 12 respectively.

**[v]** Determine the density of each planet generated by rolling D6, modifying the roll as indicated under the Planet Density table, and then consulting the table. Write the results into the appropriate Planet Density slots.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=74">ForeSight 1986 · p.74 ↗</a></div>

**Planet Density Table**

| D6 Roll | Density (Earth's = 1) | Effect on Atmosphere Density | Effect on Atmosphere Composition |
| --- | --- | --- | --- |
| ≤-1 | 0.10 | [B] Soupy | Modify roll by -12 |
| 0 | 0.12 | [B] Soupy | Modify roll by -8 |
| 1 | 0.18 | Modify roll by +12 | Modify roll by -4 |
| 2 | 0.25 | Modify roll by +8 | Modify roll by -2 |
| 3 | 0.35 | Modify roll by +4 | Modify roll by -1 |
| 4 | 0.5 | Modify roll by +2 | |
| 5 | 0.7 | | |
| 6 | 0.8 | | |
| 7 | 0.9 | | |
| 8 | 1.0 | | |
| 9 | 1.05 | | |
| 10 | 1.1 | | |
| 11 | 1.2 | | |
| 12 | 1.4 | | |
| 13 | 1.6 | | |
| ≥14 | 1.8 | | |

**Modifiers for use with this table**

| Size | Mod | Orbital / Star | Mod |
| --- | --- | --- | --- |
| G3 | -4 | Type S star | +3 |
| G2 | -3 | Orbital 1 | +6 |
| G1 | -2 | Orbital 2-4 | +5 |
| 7-9 | -1 | Orbital 5-8 | +4 |
| 4-6 | 0 | Orbital 9-10 | +3 |
| 0-3 | +1 | Orbital 11-16 | 0 |

**[vi]** Multiply each planet's Density by its CG to determine its surface gravity (in Earth gees, and assuming that it's dense enough to have a recognisable "surface"), and record this in its Gravity slot.

**[vii]** For each planet roll D10, modify the roll as indicated under the Air Pressure table *[i.e. the **Atmosphere Density Table** below — the original's prose uses a name that appears nowhere as a heading]*, and write the appropriate result from that table into its Pressure slot.

**Atmosphere Density Table**

| D10 Roll | Atmosphere Density | Opacity Modifier | Hydrographics Modifier |
| --- | --- | --- | --- |
| ≤-1 | [-1] None | -11 | -10 |
| 0 | [0] Trace | -9 | -10 |
| 1 | [1] Trace | -6 | -10 |
| 2 | [2] Very Thin | -5 | -8 |
| 3 | [3] Very Thin | -4 | -6 |
| 4 | [4] Thin | -3 | -4 |
| 5 | [5] Thin | -2 | -2 |
| 6 | [6] Normal | -1 | 0 |
| 7 | [7] Normal | 0 | +1 |
| 8 | [8] Dense | +2 | 0 |
| 9 | [9] Dense | +5 | -2 |
| 10 | [10] Soupy | +8 | -4 |
| ≥11 | [11] Soupy | +10 | -10 |

**Modifiers for use with this table**

G1/G2/G3 planets automatically have density [B]. There may be a modifier for density (see Density Table).

| Gravity | Mod | Size | Mod |
| --- | --- | --- | --- |
| Gravity ≥ 2.0 | +3 | 9 | +5 |
| 1.3 ≤ Gravity < 2.0 | +1 | 8 | +3 |
| 0.4 < Gravity ≤ 0.7 | -1 | 7 | +2 |
| 0.3 < Gravity ≤ 0.4 | -3 | 5, 6 | +1 |
| 0.2 < Gravity ≤ 0.3 | -5 | 1, 2 | -1 |
| Gravity ≤ 0.2 | -8 | 0 | -3 |

**[viii]** For each planet roll D10, add the appropriate Opacity modifier from the Air Pressure table *[again, the **Atmosphere Density Table**]*, consult the Atmosphere Opacity table, and write the approprate result from that table into its Opacity slot.

**Atmosphere Opacity Table**

| D10 Roll\* | Opacity | Temperature Modifier |
| --- | --- | --- |
| ≤-1 | [-1] None | -35° |
| 0 | [0] Very Small | -25° |
| 1 | [1] Very Small | -20° |
| 2 | [2] Small | -15° |
| 3 | [3] Small | -10° |
| 4 | [4] Average | -5° |
| 5 | [5] Average | None |
| 6 | [6] Average | None |
| 7 | [7] Average | +5° |
| 8 | [8] High | +10° |
| 9 | [9] High | +15° |
| 10 | [A] Extreme | +30° |
| ≥11 | [B] Extreme | Intolerable (Hot/Cold) |

\* Add the opacity modifier from the Atmosphere Density Table to the die roll.

**[ix]** For each planet add the appropriate temperature modifier from the Opacity table to the temperature given for that Orbital in the Temp column. Record the result in the planet's Mean Temp slot. Intolerable over-rides cold. Cold planets will have partially or wholly frozen atmospheres.

**[x]** For each planet roll D10, and modify it as indicated under the Planet Hydrographics table. Record the result from that table in the planet's Hydro slot.

**Hydrographics Table**

| D10 Roll | Hydrographics |
| --- | --- |
| ≤0 | 0% |
| 1 | 10% |
| 2 | 20% |
| 3 | 30% |
| 4 | 40% |
| 5 | 50% |
| 6 | 60% |
| 7 | 70% |
| 8 | 80% |
| 9 | 90% |
| 10 | 100%. Scattered Islands. |
| ≥11 | 100%. No islands. |

**Modifiers for use with this table.** Use the hydrographics modifier from the Atmosphere Density table.

Subtract |(Mean Temp - 10)/10| (dropping fractions). Note the absolute value signs in this formula!

**[xi]** For each planet roll D10, and modify it as indicated under the Atmosphere Composition table. Write the appropriate result from that table into the planet's AtComp slot.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=75">ForeSight 1986 · p.75 ↗</a></div>

**Atmosphere Composition Table**

| Roll\* | Atmosphere Composition |
| --- | --- |
| ≤-1 | Hostile: poisonous, oxygen-free |
| 0 | Hostile: poisonous, oxygen-free, corrosive |
| 1 | Unpleasant: poisonous. Life on Planet: SC = 2% |
| 2 | Unpleasant: oxygen-free. Life on Planet: SC = 2% |
| 3 | Unpleasant: corrosive. Life on Planet: SC = 2% |
| 4 | Hostile: poisonous, oxygen-free. Life on Planet: SC = 2% |
| 5 | Tolerable (Fatigue rolls at -2): oxygen-poor. Life on Planet: SC = 50 - \|Mean Temp - 10\| |
| 6 | Tolerable (Fatigue rolls at -2): contaminated. Life on Planet: SC = 50 - \|Mean Temp - 10\| |
| 7 | Tolerable (Fatigue rolls at -2): oxygen-poor. Life on Planet: SC = 50 - \|Mean Temp - 10\| |
| 8 | Breathable (Fatigue rolls at -1): slightly poisonous. Life on Planet: SC = 100 |
| 9 | Breathable (Fatigue rolls at -1): slightly contaminated. Life on Planet: SC = 100 |
| 10 | Earthlike: Life on Planet: SC = 120 |
| 11 | Invigourating (Fatigue rolls at +1; Search, Scan, & Initiative at -1): Life on Planet: SC = 120 |
| ≥12 | Earthlike: Life on Planet: SC = 120 |

\* Subtract |Appropriate Opacity Modifier from Atmosphere Density Table| (note absolute value signs) from, and add (Planet's Hydrographics)/20 (rounded off) to, the die roll.

**[xii]** Determine whether or not there is life on the planet by rolling against any SC given beside Atmosphere Composition. QR 4 indicates presence of primitive life-forms (certainly no more evolved than, say, bony fishes, amphibians, and ferns; perhaps no more advanced than polyps ... ); QR 3 indicates a moderate stage of evolution: anywhere from (the equivalent of) dinosaurs to mammals; QR 2 indicates highly advanced, but non-sapient organisms - perhaps semi-intelligent and/or very dangerous (eg. Alien ); QR 1 indicates the presence of local HILFs (Highly Intelligent Life-Forms, to borrow a term); who will be at a lesser state of advancement than humanity, or oriented in non-technological (perhaps psionic or magical) directions. Note any successful result by writing the QR number into the top right corner of the Habitability Index box. In theory, planets with intelligent life will not be knowingly colonised by idealistic regimes.

**[xiii]** Determine each planet's Incident Radiation Class by rolling D10, modifying the roll as indicated under the Incident Radiation table, and recording the result under the planet's Radiation slot.

#### Incident Radiation Table

*The star's spectral class × the radiation Result → the D10 roll needed for that result. **\* Prolonged** exposure is harmful to unprotected humans; **\*\* any** exposure is harmful. This is the table the [1987 errata](/foresight-1986/#the-1987-errata) corrected (a displaced bottom row) — this printing already shows it right.*

<!-- matrix: 1986-incident-radiation -->
<div class="matrix"><style>
.mx-table{border-collapse:collapse;margin:0 0 1em;font-size:.9em}
.mx-table th,.mx-table td{border:1px solid rgba(128,128,128,.35);padding:.32em .6em;text-align:center;vertical-align:middle}
.mx-corner{border:0;background:transparent}
/* Header cells live in <thead>, which the doc-system theme paints
   background:var(--brand-color) + color:var(--brand-text-color). Overriding only
   the background there left brand-white text on light grey — so these keep the
   theme's own background/text PAIR and just restyle the type. (color:inherit
   doesn't help: it inherits that same brand text colour from <thead>.) */
.mx-colaxis{font-size:.72em;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.mx-colhead{font-weight:600;font-size:.85em}
/* Row headers are in <tbody> — no brand paint there, so a subtle tint + the body
   text colour is correct and readable in light and dark themes. */
.mx-rowaxis{font-size:.72em;text-transform:uppercase;letter-spacing:.08em;font-weight:600;background:rgba(128,128,128,.14);color:inherit;writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;width:1.7em}
.mx-rowhead{font-weight:600;background:rgba(128,128,128,.06);font-size:.85em;color:inherit}
.mx-blocked{opacity:.45;font-style:italic}
</style><table class="mx-table"><thead><tr><td class="mx-corner" colspan="2" rowspan="2"></td><th class="mx-colaxis" colspan="7">Star spectral class →</th></tr><tr><th class="mx-colhead">A0–4</th><th class="mx-colhead">A5–9</th><th class="mx-colhead">F0–4</th><th class="mx-colhead">F5–9</th><th class="mx-colhead">G0–4</th><th class="mx-colhead">G5–9</th><th class="mx-colhead">K, M, S</th></tr></thead><tbody><tr><th class="mx-rowaxis" rowspan="4">Result ↓</th><th class="mx-rowhead">Benign</th><td>≤1</td><td>≤2</td><td>≤2</td><td>≤3</td><td>≤4</td><td>≤5</td><td>≤8</td></tr><tr><th class="mx-rowhead">Harmful *</th><td>2–3</td><td>3–4</td><td>3–5</td><td>4–6</td><td>5–7</td><td>6–9</td><td>≥9</td></tr><tr><th class="mx-rowhead">Dangerous **</th><td>4–5</td><td>5–7</td><td>6–8</td><td>7–8</td><td>8–9</td><td>10–11</td><td class="mx-blocked">—</td></tr><tr><th class="mx-rowhead">Inimical</th><td>≥6</td><td>≥8</td><td>≥9</td><td>≥9</td><td>≥10</td><td>≥12</td><td class="mx-blocked">—</td></tr></tbody></table></div>
<!-- /matrix -->

**Modifiers.** Orbital 1–4 **+1**, 9–12 **−1**, 13–16 **−2**. Subtract (Atmosphere Opacity − 8). Atmosphere: Tolerable **−1**, Earthlike **−2**, Invigourating **−3**.

**[xiv]** Determine each planet's **Habitability Index** (**HI**). Multiply the planet's values for T, G, A, H, and R; this product determines the planet's HI (see subsequent table).

**T (Temperature)**

| Code | Value |
| --- | --- |
| VC | 0 |
| CD | 1 |
| NL | 5 |
| HO | 1 |
| VH | 0 |

**R (Radiation)**

| Class | Value |
| --- | --- |
| Benign | 5 |
| Harmful | 4 |
| Dangerous | 1 |
| Inimical to Life | 0.01 |

**G (Gravity)**

| Code | Value |
| --- | --- |
| NW (0.00-0.40) | 2 |
| LT (0.41-1.00) | 3 |
| HY (1.01-1.29) | 2 |
| HY (1.31-1.60) | 1 |
| EX (>1.60) | 0.05 |

**A (Atmosphere)**

| Type | Value |
| --- | --- |
| Invigourating | 10 |
| Earthlike | 9 |
| Breathable | 5 |
| Tolerable | 2 |
| Unpleasant | 0.25 |
| Hostile | 0 |

**H (Hydrographics)**

| Coverage | Value |
| --- | --- |
| 0 | 0.2 |
| 10% | 1 |
| 20-30% | 2 |
| 40-50% | 3 |
| 60-80% | 4 |
| 90-100% | 5 |

**Habitability Index**

| T×R×G×A×H | Habitability Index |
| --- | --- |
| 0 | **[5\*] Inimical** — Rapid death without equipment |
| ≤5, ≠0 | **[5] Uninhabitable** — Death without equipment |
| 6-150 | **[4] Marginal** — Probable death without equipment |
| 151-500 | **[3] Tolerable** — Unsuitable for large scale colonisation |
| 501-1500 | **[2] Promising** — Suitable for large scale colonisation |
| ≥1501 | **[1] Paradise** — Ideal for human habitation |

*The product T×R×G×A×H is often fractional (several of the multipliers are 0.01, 0.05, 0.25…). ForeSight's general [rounding convention](/1986-01-foreword/) applies: unless otherwise stated, a fractional value that must become an integer is **rounded off to the nearest integer** — so a product rounding to 0 is Inimical, and anything else up to 5 is Uninhabitable.*

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=76">ForeSight 1986 · p.76 ↗</a></div>

#### [7.1] Detailing Planets

**Designer's Notes:** the GM should complete the following steps (with the possible exception of step [xvi] for planets in orbitals 1 to 10) only for planets he/she wishes to detail. A copy of the Planet Record should be set aside for the planet, and relevant information copied from the Star System Record onto it.

**[1]** Determine the planet's day length, and average daily temperature variation.

**Day Length** = 3.5(D10 + D10 + 12)/|(Planet Size - 1.5)| hours

**Daily Temperature Variation** = ±1.67d/(Atmosphere Opacity + 0.5)° celsius

(Where d is day length in hours. Add this value to determine approximate maximum daily temperature, subtract it for minimum. Seasonal variation depends on axial tilt, ocean currents, etc. and will be partially handled in ForeScene.)

**[2]** (Optional) Determine if the planet has any moons. Roll on the moon table a number of times equal to the planet's size plus one (treat G1 as size 10, G2 as size 11, G3 as size 12, for the purposes of this rule); this will yield a modifier to the planet's size, indicating the planet has a moon of that size (if the result is zero or positive), or derives no moon from that roll.

Each moon acquired has a one in ten chance of having broken up into a ring, otherwise it is generated exactly as a planet its size in the orbital of the planet it orbits, except that it will not have [its own] moons.

*Example: the rolls for a size five planet are 99, 49, 30, 58, 96, and 9. The modifiers resulting are -1, -9, -10, -8, -4, and -12 (since the roll of 9 is modified by -2 for the two moons already acquired, reducing the roll to 7). The planet ends up with one size 4 moon, and one size 1 moon.*

**Moon Table**

| D100 Roll\* | Modifier to Planet Size |
| --- | --- |
| ≤8 | -12 |
| 9-28 | -11 |
| 29-48 | -10 |
| 49-72 | -9 |
| 73-84 | -8 |
| 85-90 | -7 |
| 91-93 | -6 |
| 94-95 | -5 |
| 96 | -4 |
| 97 | -3 |
| 98 | -2 |
| 99 | -1 |
| 100 | 0 |

\* Subtract one from the die roll for each moon (or ring) the planet has already acquired.

Note: a result of 10 gives a moon of size G1; 11 gives G2, and 12 gives G3.

##### [3] Mapping Planets

**Designer's Notes:** GMs will probably want reasonable maps of habitable planets; if for no other reason than that they are pretty. The following system allows GMs to map any of the planets generated using the previous system, except Gas Giants (G1, and G2 planets). I do not recommend that the you map planets with Habitability Indices greater than 3 unless you have a specific purpose in mind (ie. some part of a planned scenario has something to do with it), or you will just be making extra work for yourself (unless you're using a computer, in which case paper is your greatest constraint).

You will require a copy of the Planet Record, and a normal deck of playing cards minus tens and picture-cards. The cards are ordered 1c ... 9c, 1d ... 9d, 1h ... 9h, 1s ... 9s (where "1"s are aces). eg. 5d is in the range 4d-4h.

A planet is mapped in stages (everything in FS is done in stages ... sigh ...).

**[i]** Notice that the map is divided up into lots of triangles. Each triangle is referred to as a sub-zone. A zone comprises five sub-zones. Divide the map into thirty six disjoint zones in any way you see fit (I suggest taking them in groups of five from top left to bottom right, but never let anyone claim I don't allow freedom of choice). Now shuffle your deck of thirty-six cards. Draw one card for each zone in turn and consult the water distribution over surface table, which will inform you how many of the sub-zones of that zone are covered in water, choose that many sub-zones (your choice of method, random is as good as any) within that zone, and put a light cross in them to signify coverage by water. Do this for each of the thirty-six zones.

**Water Distribution over Surface**

*Number of Water Sub-zones in Zone*

| Planet Hydrographics | 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| 0% | 1c-9s | | | | | |
| 10% | 1c-9h | 1s-3s | 4s-6s | 7s-9s | | |
| 20% | 1c-8d | 9d-4h | 5h-9h | 1s-5s | 6s-9s | |
| 30% | 1c-4d | 5d-2h | 3h-8h | 9h-4s | 5s-9s | |
| 40% | 1c-8c | 9c-6d | 7d-4h | 5h-2s | 3s-7s | 8s-9s |
| 50% | 1c-6c | 7c-3d | 4d-9d | 1h-6h | 7h-3s | 4s-9s |
| 60% | 1c-2c | 3c-7c | 8c-5d | 6d-3h | 4h-1s | 2s-9s |
| 70% | | 1c-5c | 6c-1d | 2d-7d | 8d-5h | 6h-9s |
| 80% | | 1c-4c | 5c-9c | 1d-5d | 6d-1h | 2h-9s |
| 90% | | | 1c-3c | 4c-6c | 7c-9c | 1d-9s |
| 100%\* | | | | | 1c-6c\*\* | 7c-9s |

Note: \*\* with islands; one sub-zone has islands, rather than being filled with land.

**[ii]** For each sub-zone not covered with water roll D10: 1-3 indicates that the sub-zone is predominantly flat, mark it with a horizontal line; 4-8 indicates that the sub-zone is predominantly uneven, mark it with an upside-down U shape; 9-10 indicates that the sub-zone is predominantly broken, mark it with an upside-down W shape.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=77">ForeSight 1986 · p.77 ↗</a></div>

*[Illustration in the original — see the source-PDF page link above. Historical; a replacement is planned.]*

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=78">ForeSight 1986 · p.78 ↗</a></div>

```
                    FORESIGHT PL.A.NET RECORD

Temper ature I
 Modifiers I     -1 5°




Planet Name                                       Settlement Details
Sub-zone size                       Icm   I nitial Settler          jDate
Grauity          g's   INWILTjHVjEXj      Population Density
Temp.            °C I VCICDINLIHOjVHj     Total Population
Atmosphere Pressure                       Gouernment 1~pe
 - Composition                            Hard Tl          j Soft Tl
Hydrographics                   '70       Settlement Structure
Radiation                                 law Enforcement leuel
Habitability I ndeH                       legal Features
Day length                      h
Daily Temp. Uariation ±         °C

Moons
Size Density Pressure Notes
                                          Corruption OR       lYield        '70
                                          Social Features




Space Port I Size        IType                                         1
                                          Planet is beyond the Pale? YES I NO

```

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=79">ForeSight 1986 · p.79 ↗</a></div>

**[iii]** For each sub-zone not covered with water roll D10, and modify the roll as instructed beneath the Terrain Features table, mark the presence of the terrain feature indicated in the sub-zone.

Note that the map on the Planet Record can be folded into an icosahedron (the same shape as a twenty-sided die). Consider the map as the projection of the planet's features onto such an icosahedron embedded in it. The upshot of this is that two sub-zones are considered adjacent if they would be so were the map folded into an icosahedron.

**Terrain Features.** *This table came through the scanner too badly scrambled to reconstruct — the roll ranges survive, but which feature column each belongs to does not. Reproduced as extracted; see the source-PDF page link above.*

```
Terrain Features Sub-zone             Terrain Feature In Sub-zone
Temp Contour         BN LV MV HV MA IC VH
     BR             s4 5-7 8-9 ~10
     UN             ~3   4-6 7-8 ~10
     FL             ~5   6-7 8    9   ~10
HO   BR             s3 4-7 8-9 ~10
     UN             ~2   3-5 6-8 9-10 ~11
     FL             ~4   5-7 8-9 10 ~11
NL   BR             s2 3-6 7-8 ~9
     UN             ~1   2-4 5-7 8-10 ~11
     FL             s1   2-4 5-7 8-10 ~11
CD   BR             s3 4-5 6      7        ~8
     UN             S2 3-5 6-7 8           ~
     FL             ~4   5-6 7             ~8
VC   BR             S5 6                   ~7
     UN             ~4   5   6             ~7
     FL             ~5   6                 ~7
```

If the planet has no life on it, change -V results to BN.

**Modifiers for use with this table**

| Mod | Condition |
| --- | --- |
| -2 | no water subzone shares a side with this one |
| +1 | this subzone shares sides only with water subzones |
| -4 | planet's hydro = 0% |
| -2 | planet's hydro = 10% |
| -1 | planet's hydro = 20 or 30% |
| +1 | planet's hydro ≥ 80% |

**[iv]** To determine whether two, or more, land sub-zones which meet at a point, but not an edge, actually meet or not, roll D100, and consult the Isthmus table:

**Isthmus Table**

| Proportion of Land | Likelihood of Isthmus (D100 range required) |
| --- | --- |
| Two of six about point | 1-25 |
| Three of six about point\* | 1-50 |
| Three of six about point\*\* | 01-25, all three meet; 26-50, two of three meet |
| Four of six about point | 1-75 |
| Two of five about point | 1-33 |
| Three of five about point | 1-67 |

Notes: \*Two of the three share an edge; \*\*No two of the three share an edge

**[v]** Fill in Planet Description as appropriate (sub-zone size, indicated on the Planet Size table, is the length of one of the sides of a triangular sub-zone). The actual temperature of a sub-zone varies with latitude, as indicated on the Planet Record, and you may wish to fill in the boxes provided with the latitude mean temperature (equal to the Planet's Mean Temperature, modified as indicated).

#### [7.2] Detailing the Human Population of a Planet

A planet with a Habitability index of 1, 2, or 3, is pretty likely to be inhabited, if it has been discovered, by humans. In determining the details of a planet's population one needs to know the following things about it:

**[1]** Its Habitability Index

**[2]** Its distance from Sol

**[3]** Its density

From these three pieces of data the following system will generate, in relative detail, the population of a planet. Unless otherwise instructed, conduct the following steps in order:

**[i]** The first thing to determine is when the system was first explored. This is a function solely of its distance from Sol, and luck. Record this date on the system display; all planets in the system's first ten orbitals are considered to have been explored at this time. Go to the appropriate table, and roll D100.

**Within 10 LY of Sol**

| Roll | First Explored |
| --- | --- |
| 01-90 | c.2100 |
| 91-99 | c.2150 |
| 100 | c.2200 |

**10-30 LY from Sol**

| Roll | First Explored |
| --- | --- |
| 01-15 | c.2200 |
| 15-95 | c.2250 |
| 96-99 | c.2300 |
| 100 | c.2350 |

**30-50 LY from Sol**

| Roll | First Explored |
| --- | --- |
| 01-40 | c.2300 |
| 41-99 | c.2350 |
| 100 | c.2400 |

**50-100 LY from Sol**

| Roll | First Explored |
| --- | --- |
| 01-15 | c.2350 |
| 16-30 | c.2400 |
| 31-60 | c.2450 |
| 61-95 | c.2500 |
| 96-99 | c.2550 |
| 100 | c.2550 + D10 × 50 |

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=80">ForeSight 1986 · p.80 ↗</a></div>

**[ii]** What is your Campaign Year? If you can't decide, then choose AD2535 (this is my campaign year, and much of ForeSight's support material is geared towards this time). If the date of first exploration is larger than this, the system is unexplored, and hence uninhabited. That was easy.

Otherwise: round down your campaign year to the nearest multiple of twenty-five, so if your campaign year is 2735, round down to 2725. Now, subtract the year of first exploration from this, and divide it by twenty-five. This is about the number of generations since the planet was first explored. Call this number g (for generations), and set Date equal to the year the system was first explored.

**[iii]** Subtract one from g. Add 25 to Date.

**[iv]** Roll D100. If this is greater than (120 - 24 × HI) × planet Density go to step [iii].

**[v]** Someone colonised the planet in the year Date (note this). To determine who it was, roll D10, add one to this roll per 25y (after the first 25) since the planet was first explored, to determine the group which instigated colonisation (ie. the Initial settler), and the initial population density (in persons per square km of land).

**Initial Settler Table** — *D10 Roll, by Habitability Index*

| HI 4 | HI 3 | HI 2 | HI 1 | Instigator | Initial PD |
| --- | --- | --- | --- | --- | --- |
| | 1-3 | 1-7 | 1-9 | Government | 5/HI |
| 1 | 4-5 | 8-9 | 10 | Social Group | 1/HI |
| 2 | 6 | 10-11 | 11-12 | MegaCorp | 2/HI |
| | 7 | 12 | 13 | Subsidized | 3.5/HI |
| ≥3 | ≥8 | 13 | 14 | Unsubsidized | 1/(HI^2) |
| | | 14-15 | 15-16 | MegaCorp | 2/HI |
| | | ≥16 | ≥17 | Unsubsidized | 5/(HI^2) |

**[vi]** From the information (1) what the planet's initial population density was, and (2) how long ago it was colonised (ie. g), we now determine the current population density. Use the following procedure, keeping track of current population density (PD) and c, which is initially set equal to g. (This 'c' keeps count of 25 year periods assessed.)

**(a)** Subtract one from c.

**(b)** Roll on the appropriate column of the population growth table, to yield a number. Multiply PD by this to determine the new PD value.

**Population Growth Table** — *(Adjusted) HI (Habitability Index)*

| D10 Roll | 5 | 4 | 3 | 2 | 1 |
| --- | --- | --- | --- | --- | --- |
| 1 | 0 | 0 | 0.2 | 0.75 | 0.9 |
| 2 | 0 | 0.1 | 0.5 | 0.9 | 0.95 |
| 3 | 0 | 0.2 | 0.75 | 1.0 | 1.0 |
| 4 | 0.1 | 0.4 | 0.9 | 1.1 | 1.1 |
| 5 | 0.2 | 0.6 | 1.0 | 1.1 | 1.2 |
| 6 | 0.4 | 0.8 | 1.1 | 1.2 | 1.2 |
| 7 | 0.6 | 1.0 | 1.2 | 1.2 | 1.2 |
| 8 | 0.8 | 1.1 | 1.3 | 1.2 | 1.3 |
| 9 | 1.0 | 1.2 | 1.4 | 1.3 | 1.3 |
| 10 | 1.1 | 1.3 | 1.5 | 1.3 | 1.4 |

**Die Roll Modifiers for this table**

| Mod | Condition |
| --- | --- |
| -1 | if Pop. Density < 0.1 |
| +1 | if 10 ≤ Pop. Density ≤ 25 |

**HI Modifiers for this table**

| Mod | Condition |
| --- | --- |
| -1 | if Pop. Density ≥ 25 |
| +1 | if Pop. Density ≥ 20(6-[unmodified]HI) |
| +1 | if Pop. Density ≥ 40(6-HI) |

(These modifiers are cumulative)

Multiply current Population Density by the resulting number.

**(c)** If c is greater than zero, go back to step (a).

The value for PD thus obtained becomes the planet's current PD.

The planet's total population = π(d^2)(1-h/100)PD (where d is the planet's diameter in km, and h is its hydrographic percentage).

**[vii]** From the information (1) the planet's current population, (2) its density, and (3) g, we determine the planet's current technological levels (plural is correct) relative to "the norm" for its time (eg. TL 8 appears around 2400, a planet with relative TLs of -1 in a campaign set in 2400 would have TLs of 7).

A planet's technology is rated by the degree of advancement the planet has achieved in (1) physical ("hard") sciences, and (2) biological ("soft") sciences. The former is easier to utilize, and often cheaper, while the other does not require heavy elements (such as copper and iron). Very little information on biotechnology appears in ForeSight at this stage, but more is included in ForeScene.

**Procedure:** roll D10 and modify it using the Hard Technology Modifiers, index this on the proper column (determined by total population) and this will yield the relative Hard TL of the planet. Do the same using the Soft Technology Modifiers to determine the planet's Soft TL.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=81">ForeSight 1986 · p.81 ↗</a></div>

**Relative Technology Level Table** — *Total Population*

| Modified Die Roll | ≤10^4 | 10^4-10^5 | 10^5-10^6 | 10^6-10^7 | 10^7-10^8 | 10^8-10^9 | ≥10^9 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ≤-1 | -5 | -4 | -4 | -4 | -3 | -3 | -3 |
| 0 | -5 | -4 | -3 | -3 | -3 | -2 | -2 |
| 1 | -5 | -3 | -3 | -2 | -2 | -2 | -1 |
| 2 | -4 | -3 | -2 | -2 | -2 | -1 | -1 |
| 3 | -4 | -2 | -2 | -1 | -1 | -1 | 0 |
| 4 | -3 | -2 | -1 | -1 | -1 | 0 | 0 |
| 5 | -3 | -1 | -1 | -1 | 0 | 0 | 0 |
| 6 | -2 | -1 | -1 | 0 | 0 | 0 | 0 |
| 7 | -2 | -1 | 0 | 0 | 0 | 0 | 0 |
| 8 | -1 | -1 | 0 | 0 | 0 | 0 | +1\* |
| 9 | -1 | 0 | 0 | 0 | 0 | +1\* | +1\* |
| 10 | -1 | 0 | 0 | 0 | +1\* | +1\* | +1 |
| 11 | 0 | 0 | 0 | +1\* | +1\* | +1 | +1 |
| ≥12 | +1\* | +1\* | +1\* | +1\* | +1 | +1 | +1 |

Note: \* this applies only in some specific areas, in many the relative TL is 0.

**Hard Technology Modifiers**

| Mod | Density |
| --- | --- |
| -3 | Density ≤ 0.5 |
| -2 | 0.5 < Density ≤ 0.8 |
| -1 | 0.8 < Density ≤ 0.95 |
| +1 | 1.1 < Density ≤ 1.2 |
| +2 | 1.2 < Density ≤ 1.3 |
| +3 | Density > 1.3 |

Then: - g/4 (round up) if the modifier for density is negative; + g/4 (round down) if the modifier for density is positive.

**Soft Technology Modifiers**

| Mod | Density |
| --- | --- |
| +3 | Density ≤ 0.5 |
| +2 | 0.5 < Density ≤ 0.8 |
| +1 | 0.8 < Density ≤ 0.95 |
| -1 | 1.1 < Density ≤ 1.2 |
| -2 | 1.2 < Density ≤ 1.3 |
| -3 | Density > 1.3 |

Then: + g/4 (round down) if the modifier for density is positive; - g/4 (round up) if the modifier for density is negative.

**[viii]** Using much of the information collated above, we now determine the planet's government type by rolling D5 and multiplying it by ten, modifying it as follows and then consulting the government type chart.

**Modifiers for Government Type Roll**

| Mod | Condition |
| --- | --- |
| +2D6 | Roll two D6 and add their sum to the roll |
| -50 | Planet's Population Density ≤ 0.0078 |
| -40 | 0.0078 < Planet's Population Density ≤ 0.0156 |
| -30 | 0.0156 < Planet's Population Density ≤ 0.0313 |
| -20 | 0.0313 < Planet's Population Density ≤ 0.0625 |
| -10 | 0.0625 < Planet's Population Density ≤ 0.125 |
| +0 | 0.125 < Planet's Population Density ≤ 0.25 |
| +10 | 0.25 < Planet's Population Density ≤ 0.5 |
| +20 | 0.5 < Planet's Population Density ≤ 1 |
| +30 | 1 < Planet's Population Density ≤ 2 |
| +40 | 2 < Planet's Population Density ≤ 4 |
| +50 | 4 < Planet's Population Density ≤ 8 |
| +60 | 8 < Planet's Population Density ≤ 16 |
| +70 | 16 < Planet's Population Density ≤ 32 |
| +80 | 32 < Planet's Population Density ≤ 64 |
| +90 | 64 < Planet's Population Density ≤ 128 |
| +100 | Planet's Population Density > 128 |
| +3 | Planet originally colonised by government |
| +6 | Planet originally colonised by social group |
| +7 | Planet originally colonised by MegaCorp |
| +5 | Colonisation of planet was government subsidized |
| +8 | Colonisation of planet was unsubsidized |

**Government Type Chart**

| Roll | Govt. Type | Roll | Govt. Type |
| --- | --- | --- | --- |
| ≤25 | 0A | 76 | 2C |
| 26 | 0C | 77 | 1C |
| 27-28 | 0B | 78-79 | 4B |
| 29-30 | 0A | 80-81 | 4C |
| 31 | 0B | 82-83 | 4A |
| 32-33 | 1B | 84-85 | 6B |
| 34-35 | 1C | 86-87 | 6C |
| 36-38 | 1A | 88-89 | 5A |
| 39-40 | 2B | 90-91 | 5C |
| 41 | 2A | 92-94 | 5A |
| 42-44 | 2B | 95-96 | 5B |
| 45 | 2C | 97 | 4C |
| 46 | 0C | 98-100 | 3C |
| 47 | 0B | 101-102 | 6B |
| 48 | 1S | 103-104 | 6A |
| 49-50 | 0A | 105-106 | 6C |
| 51 | 0B | 107 | 6B |
| 52-53 | 1B | 108 | 4S |
| 54-55 | 1C | 109-111 | 7C |
| 56-57 | 1A | 112-113 | 7A |
| 58 | 0S | 114-116 | 7B |
| 59-60 | 2B | 117 | 0C |
| 61 | 2A | 118 | 5C |
| 62-64 | 2B | 119-120 | 8A |
| 65-66 | 2C | 121-122 | 8B |
| 67 | 0C | 123 | 8A |
| 68 | 0S | 124-126 | 8C |
| 69 | 3A | 127 | 2S |
| 70-71 | 3C | 128 | 3S |
| 72-73 | 3B | 129 | 3C |
| 74 | 2C | ≥130 | Subtract 60 from roll (then check table again) |
| 75 | 1C | | |

The Government Type codes are explained later under Explanation of Government Types.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=82">ForeSight 1986 · p.82 ↗</a></div>

##### Explanation of Government Types

**0A** No rules or conventions: Might is Right. (A truly free market economy.)

**0B** Balkanised into tribes, or communal autarchies

**0C Theocracy\***: the planet's government is determined along religious tenets and rules, and it is ruled by a religious hierarchy

**1A** A (Wo)man's Spread Is Her/His Castle, (s)he has full rights to do what (s)he wants on her/his property

**1B** Balkanised into petty oligarchies, feudal holdings, and mayoralties

**1C Hereditary Autarchy\***: the planet is ruled by a single person who shall be succeeded by one of his/her offspring

**2A Idealistic Anarchy**: the only law is against weapons and violence, upheld by convention, rather than some agency.

**2B** Balkanised into republics (democracies), monarchies, and "empires".

**2C Planetary Oligarchy\***: rule by wealthy families, and corporations, either in name, or in fact (while probably disguised as representative democracy).

**3A Idealistic Anarchy**: the only organisation is the "police force" who prevent violence and weapon ownership and use.

**3B** Balkanised into republics, dictatorships, and "superpowers".

**3C Representative Democracy**: parliamentary (as per Australia, and Great Britain), or presidential (as per France, and the U.S.A.).

**4A Subservient Bureaucracy**: a publicly answerable, but generally autonomous bureaucracy runs the planet.

**4B** Balkanised into participant democracies, republics, dictatorships, and MegaCorps.

**4C Participant Democracy**: major issues are decided by the people as a whole via a vast telecommunications net.

**5A Stable Bureaucracy**: a self perpetuating bureaucracy, answerable to itself only, runs everything.

**5B** Balkanised into MegaCorps, various democracies, and dictatorships.

**5C Randomly Selected Assembly**: an assembly of randomly selected people govern the planet for a fixed period, after which a new assembly is selected.

**6A Oppressive Bureaucracy\***: a self perpetuating, heedless bureaucracy, answerable only to itself, runs things; promotion within it may be by birth or connections.

**6B Corporate Administration\***: the planet is governed, owned, and run, by a huge corporate entity.

**6C Malevolent Autocrat\***: a self seeking person has absolute power over the planet.

**7A Stable Bureaucracy**: a self perpetuating bureaucracy, answerable only to itself, runs the planet.

**7B** Balkanised into MegaCorps, various democracies, and dictatorships.

**7C Benevolent Autocrat\***: a well intentioned person has absolute power over the planet.

**8A Subservient Bureaucracy**: a publically answerable, but generally autonomous, bureaucracy runs things.

**8B** Balkanised into MegaCorps, various democracies, and dictatorships.

**8C Malevolent Autocrat\***: a self seeking person has absolute power over the planet.

**0S Syndicate\***: the planet is ruled by a conglomerate of criminal syndicates which use it as a base of operations.

**1S Intellectual Oligarchy\***: the planet is ruled by people selected on the basis of their intellectual achievement.

**2S Computer\***: "The computer is your friend, trust the computer. The computer knows the optimal path to human happiness and welfare. Thank you for your cooperation." The planet is ruled by a computer.

**3S Front**: the planet is run by a computer, but disguises its decisions by channelling them through unwitting human servants.

**4S Computer Balkans\***: As per 2S, or 3S, above, but the planet is balkanised into lots of small computer controlled communities.

**5S Rule by Dice**: the planet is ruled by wargamers.

Note: \* indicates a government unacceptable to the Federation, and hence automatically external to it ("Beyond the Pale"). Also note that some government types are repeated. The reasons for this may, one day, become clear, if the planetary history generator is ever completed, which seems unlikely.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=83">ForeSight 1986 · p.83 ↗</a></div>

**Government Effects Table**

| Type Code | Law Level | Social Features | Settlement Structure | Tech Level |
| --- | --- | --- | --- | --- |
| 0A | 0 | 0 | -4 | 40% |
| 0B | 1 | 3 | -3 | 40% |
| 0C | 6 | 3 | -1 | 60% |
| 1A | 0 | 0 | -3 | 30% |
| 1B | 2 | 2 | -2 | 30% |
| 1C | 2 | 3 | -2 | 40% |
| 2A | 1 | 1 | -2 | 20% |
| 2B | 3 | 2 | -1 | 2% |
| 2C | 4 | 2 | 0 | 10% |
| 3A | 2 | 2 | -1 | 10% |
| 3B | 4 | 2 | 0 | 2% |
| 3C | 3 | 2 | 0 | 1% |
| 4A | 4 | 2 | 0 | 10% |
| 4B | 4 | 1 | 0 | 2% |
| 4C | 3 | 3 | 0 | 1% |
| 5A | 5 | 2 | +1 | 2% |
| 5B | 4 | 2 | 0 | 2% |
| 5C | 3 | 3 | 0 | 4% |
| 6A | 6 | 2 | +1 | 20% |
| 6B | 5 | 0 | +2 | 7% |
| 6C | 6 | 2 | 0 | 15% |
| 7A | 5 | 1 | -1 | 7% |
| 7B | 5 | 0 | +1 | 2% |
| 7C | 4 | 2 | +2 | 10% |
| 8A | 5 | 1 | -1 | 7% |
| 8B | 6 | 0 | 0 | 2% |
| 8C | 7 | 3 | -2 | 40% |
| 0S | 1 | 2 | 0 | 10% |
| 1S | 3 | 3 | +2 | 2% |
| 2S | 7 | 3 | +6 | 20% |
| 3S | 6 | 2 | +5 | 10% |
| 4S | 7 | 4 | +6 | 5% |

The values given on the above table are used in the stages which follow.

**[ix]** Individually modify the planet's hard and soft TLs as follows. The Tech Level value on the Government Effects Table (above) is the chance per generation (25 years) that each of the planet's TLs will have 0.5 subtracted from it while the government is in power. Roll D100 for each TL g times (remember g? Generations since colonisation?), and reduce each TL by 0.5 per roll less than or equal to the Tech Level rating.

**[x]** Given the planet's population density, government, and its current Hard TL, we now determine the planet's settlement structure (the organisation of its settlements). This is determined simply by rolling D10, which will give a number, n; consulting the Settlement structure chart and choosing the nth lowest structure allowable (ie. the nth structure, with suitable values of TL, and PD, from the bottom of the Settlement Structures table); if there is none, then choose the top-most allowable structure.

| D10 Roll | n |
| --- | --- |
| ≤-1 | 5 |
| 0-2 | 4 |
| 3-5 | 3 |
| 6-8 | 2 |
| ≥9 | 1 |

Modify the die roll by the Settlement Structure modifier given on the Government Effects Table.

**Settlement Structures**

*The Hard TL thresholds marked "≥ ?" were illegible in the scan.*

| PD | Hard TL | Description |
| --- | --- | --- |
| 0-2 | | Nomadic and Primitive Agriculture |
| 0-5 | ≥1 | Pastoral Subsistence Farming, and Cottage Industry |
| 0.25-20 | ≥4 | Spread Farming and Centralised Industry |
| 1-30 | ≥ ? | Factory Farming and Centralised, Segregated Industry |
| 0-20 | ≥ ? | Decentralised Co-operative Communes |
| 2-50 | ≥ ? | Purpose-specific Community Modules |
| 0-30 | ≥ ? | Self-sufficient Community Modules ("Arcologies") |
| ≥10 | 6 | Megaplexes (huge self-sufficient City Structures) |

**[xi]** Determine the planet population's social features via the following procedure. Add to the number given for Social Features on the Government Effects Table the modifiers given below, to determine the number of times you should roll on the Social Features table for social features or structures.

**Modifiers to Base Number of Social Features**

| Mod | Condition |
| --- | --- |
| +D6/2 - 1 | (round up); add this to the number of social features for all planets |
| -1 | PD < 1 |
| -3 | PD < 0.1 |
| +1 | Population ≤ 10 000 000 |
| 0 | Originally colonised by Government |
| +3 | Colonised by Social Group |
| -1 | Colonised by MegaCorp |
| +1 | Colonisation was subsidized |
| +2 | Colonisation was unsubsidized |

**Social Features**

| Roll | Structure or Feature |
| --- | --- |
| 01-30 | No Feature |
| 31-40 | DESIGN or CHOOSE your own feature. |
| 41-42 | **Ghetto-ization**: informal segregation of some racial groups; if rolled a second time this becomes **Racial Segregation**: enforced segregation of certain racial groups |
| 43-44 | **Ghetto-ization**: informal segregation of some social groups; if rolled a second time this becomes **Social Segregation**: enforced segregation of certain social/economic groups |

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=84">ForeSight 1986 · p.84 ↗</a></div>

| Roll | Structure or Feature |
| --- | --- |
| 45-46 | **Family Reputation**: a person's initial standing is determined by his/her family reputation, which he/she can do little to alter; if rolled a second time this becomes **Class System**: each person has some social class, determined by his/her birth status (at least in general), which is not easily changed; if rolled a third time this becomes **Caste System**: each person is born into a social caste, which is essentially unalterable, and which restricts his/her position, profession, and social contacts to those allowed to one of his/her caste |
| 47-48 | **Marked Sex-role Differentiation**: a person's sex has a considerable effect on his/her possible professions, positions, duties, pay-scales, and so forth; if rolled a second time this becomes **Sexual Discrimination**: not only are sex-roles differentiated, but one, or the other, sex has considerably inferior legal status; if rolled a third time this becomes **Sexual Segregation**: members of one sex or the other are segregated from members of the opposite sex other than their spouse/owner/whatever, as well as suffering the previous two problems |
| 49-50 | **National Religion**: there is a vast propensity towards one particular religion (ie. it has official recognition in the government, the armed forces, official documents, the law, eg. "Christianity" in the U.S.A.); if rolled a second time this becomes **Religious Discrimination**: not only is there inherent bias towards one religion, other beliefs are discriminated against, perhaps informally segregated; and if rolled a third time this becomes **Religious Persecution**: members of rival religions to that of the state (heretics and unbelievers) are hunted down and converted, killed, fed to lions, crucified, etc. |
| 51-52 | **Obligation System**: an individual's actions are governed, to a considerable extent, by a catalogue of debts and favours owed, which he/she feels inclined to (respectively) pay and utilize. People who fail their obligations are (at least informally) outcast, while those who are owed many favours gain status; if rolled again this becomes **Personal Honour**: an individual must act to maintain his/her honour, according to a strict ethical, religious, and esthetic code; which on a third roll becomes **Honour System**: not only personal, but family, and organisation honour, and a concept akin to self-esteem must be maintained, even unto death, etc. |
| 53-54 | **Domination**: an individual's status is to a measurable extent governed by his/her ability to dominate others in some field of conflict: political debate, archaic-style duel, four-dimensional chess, hussade, or whatever; if rolled a second time this becomes **Duel System**: individual differences, and relative status are settled by formal duels, of some form (not necessarily violent) |
| 55 | **No facial expression**: people on the planet conceal their faces, perhaps as a result of exposure taboo, and hence must interact without the benefit of facial expression; if rolled again this becomes **Masks**: the people on this planet feel that involuntary facial expressions, and the differing physical attractivenesses of people's faces, prevent them from fully controlling the way in which others view them, and hence each wears a mask he/she feels suits the way he/she wishes to approach a given occasion |
| 56 | **No gesticulation**: people on the planet find manual gesticulation to be vulgar and awkward, or for some other reason do not gesture when interacting |
| 57 | **No vocal modulation**: if a person cannot say precisely what he/she intends to say in a level voice, then his/her command of the language is faulty, and he/she is probably too stupid to be worth talking to. For whatever reasons, people on this planet speak in a dull monotone; if rolled a second time this becomes **No speech**: the locals do not use speech in any recognisable form, having either dropped it for something more precise, and refined, or having altered their language to cope with their lack of vocal expression |
| 58 | **Musical Instruments**: in order to perfect the conveyance of emotional undertone in personal interaction, the locals augment their speech with musical accompaniment |
| 59-60 | **Perfumes**: people on this planet use specific perfumes to indicate their current emotional state, marital status, openness to sexual advances, etc. |
| 61-62 | **Clothing**: the colour, form, and arrangement of the clothing worn by a local serve to announce his/her social standing, emotional state, marital status, openness to sexual advances, etc. |
| 63-64 | **Xenophobia**: strangers are shunned and feared on this planet; if rolled a second time this becomes **Xenopersecution**: strangers are actively, if not officially, persecuted on this planet |
| 65-66 | **Mistrust of AI**: locals shun and abhor Artificial Intelligence, and refuse to allow robots, AI computers, and so forth onto the planet; if rolled a second time this becomes **Mistrust of Computers**: AI is banned, and locals dislike even fairly primitive computers, and this has forced most people to avoid using them; if rolled a third time becomes **Computer Ban**: computers and AI are banned on the planet |

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=85">ForeSight 1986 · p.85 ↗</a></div>

| Roll | Structure or Feature |
| --- | --- |
| 67-68 | **Great Hospitality**: tradition has led people here to regard hospitality as akin to personal decency, and only scum would refuse people food and shelter, or abuse it once proffered |
| 69-70 | **Spartan Tendency**: people on this planet take a perverse pride in their ability to do without physical comforts; if rolled twice this becomes **Spartan Propensity**: luxury items are regarded as folly on this planet, and no native would use such rubbish |
| 71-72 | **Exposure Taboo**: genitalia are regarded as extremely repulsive or religiously forbidden subjects for viewing, and exposure of them in public, or by way of entertainment, is illegal; if rolled twice becomes as before plus breasts; if rolled thrice becomes as before plus chests; if rolled four times becomes as before plus legs above the knees; if rolled five times becomes as before plus arms above elbows and body below neck; if rolled six times becomes entire body, face, etc. Each time this feature is rolled, roll D10, and if the result is lower than 4, treat it as though it has been rolled twice, instead |
| 73-74 | **Strange Performing Art**: some performing art peculiar to the planet is highly popular. Eg. Scent Wafting, or Artistic Public Executions; if rolled a second time then this becomes **Pervasive Performing Art**: the planet has a peculiar, and almost pervasive performing art, which is more or less a National Hobby |
| 75-76 | **Strange Sport**: some sport peculiar to the planet is highly popular. Eg. hussade, hadaul (these are described in Trullion, and The Face, by Jack Vance); if rolled a second time then this becomes **Pervasive Sport**: this planet boasts a peculiar sport which is followed by nearly everyone on it |
| 77-78 | **Low Cultural Tolerance**: the locals are sick of foreigners who cannot comprehend their customs (if they apparently have none, this just shows your insensitivity); if rolled twice then this becomes **Cultural Intolerance**: the locals despise people who fail to understand their customs, and have no respect for anyone else's; if rolled three times this becomes **Violent Cultural Intolerance**: the locals have a violent dislike for people unable to comprehend their customs, and, in fact, for foreigners in general. |
| 79-80 | **Elaborate Business Customs**: the locals have strange customs which must be performed before serious business is engaged in, involving exchange of gifts, religious observances, etc.., but they make allowance for foreigners (in fact if a foreigner does observe their customs, their demeanor will improve by one row); if rolled twice, this becomes **Critical Business Customs**: the locals are intolerant of those who fail to observe their customs, and will become hostile if a person tries to make a deal without making proper observances. |
| 81 | **Horrific Local Cuisine**: the local food is disgusting to outsiders; if rolled twice becomes **Perversely Horrific Local Cuisine**: not only is the local food horrible to outsiders, but to locals as well, who take a perverse pride in their ability to devour it with (somewhat simulated) relish, and eat it off-world as well; if rolled three times, becomes **Harmful Local Cuisine**: the local food is downright dangerous to those not used to it (it is both nauseous, and possibly poisonous). |
| 82 | **Progress Through Assassination (PTA)**: the standard method of progress in the local society is through either character or physical (or both) assassination of direct superiors. |
| 83 | **Fanatical Cleanliness**: members of the society are as clean as they are able, and prefer sterile, colourless environments. |
| 84 | **Tolerance for Dirt**: the locals have no desire or affection for personal hygiene, and take "joy in nature's gifts" etc., etc.. |
| 85 | **Intolerance for Animals**: the locals cannot abide animals, and regard plants with distaste. They regard them as "unclean", or whatever (they may still eat them, once prepared by robots, or untouchables, or something; hypocrisy has always been popular); if rolled twice becomes **Intolerance for Non-human Life**: the locals cannot countenance any non-human life. |
| 86-87 | **Extreme Privacy**: the locals regard personal privacy as critically important, and avoid large groups where possible. Listening in on other people's conversations is not done, and locals are able to "tune out" of their non-immediate surroundings, and are extraordinarily careful to mind their own business. |
| 88-89 | **Society without Trust**: the locals regard all as fair game, although the line is drawn at murder, rape, and extortion, it is considered okay to lift anything not nailed down and protected by a minefield. If rolled several times, crimes of greater and greater severity become unrestricted. |
| 90-91 | **Bizarre Sexual Ritual**: the locals steep their sexual activity in complex and unusual ritual, although they make some allowance for outsiders; if rolled twice becomes **Compulsory Sexual Ritual**: as before, but any transgression of the local customs is regarded with huge repugnance, similar to that accorded rape in our society. |

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=86">ForeSight 1986 · p.86 ↗</a></div>

| Roll | Structure or Feature |
| --- | --- |
| 92-93 | **Drug Culture**: the taking of mood-altering drugs is widely accepted, and even encouraged by the government, The Computer, The Church, The Book, or whatever; if rolled twice becomes **Widespread Drug Dependence**: almost everyone is dependent on drugs for coping with day-to-day life, and in fact the drugs may be dispensed through the air, the water supply, the food, or whatever. |
| 94 | **Ritual Torture**: the society accepts torture, corporal punishment, etc., as natural and desirable, and the ability to withstand pain is a respected skill. |
| 95 | **Perverse Intellectual Duelling**: asking questions is regarded as a sign of stupidity; members of the society do not question others directly, but try to deduce what they wish to know instead. Furthermore, if someone asks a person to do something, then he/she can demonstrate superior intelligence by doing something else which achieves the desired result, or (better) more. |
| 96 | **Artificial Reproduction**: the locals abstain from reproductive acts, since the society relies solely upon artificial means to produce its next generation (even if their technology is insufficient for this, it still applies - the cloning banks or artificial wombs, or whatever, are controlled by artisans, or priests, etc.); if rolled twice becomes **Genetic Selection**: the locals select the genetic background of members of the next generation; if rolled three times becomes **Genetic Design**: the society designs its next generation much as androids are designed (requires TL9). |
| 97 | **Body Beautiful**: the human body is beautiful, and the locals flaunt as much as they can of it (the exterior that is), although not to the hazard of their lives; if rolled twice becomes **Organs Beautiful**: the locals not only flaunt their body's exteriors, but their working parts as well, through transparent membranes grafted into their hides. |
| 98-99 | Roll Twice More |
| 100 | Roll Thrice More |

**[xii]** Finally, one determines the planet's law level, and legal features, using the following procedure. Add to the number under Law Level in the row corresponding to the planet's government type, the Technological Factor (use highest TL of Hard and Soft TLs) given below.

| TL | Tech. Factor | TL | Tech. Factor |
| --- | --- | --- | --- |
| 0 | -5 | 6 | 1 |
| 1 | -4 | 7 | 1 |
| 2 | -3 | 8 | 2 |
| 3 | -2 | 9 | 3 |
| 4 | -1 | 10 | 4 |
| 5 | 0 | | |

The sum of the Tech. Factor and the Law Level number gleaned from the government effects table determines the column used on the law level table, below; roll D10, and modify it using the modifiers listed below.

**Law Level Table** — *SUM*

| Roll | ≤1 | 2-3 | 4 | 5 | 6 | 7 | 8 | 9-10 | ≥11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ≤-1 | 0 | 0 | 0 | 1 | 1 | 2 | 2 | 3 | 3 |
| 0 | 0 | 0 | 0 | 1 | 2 | 2 | 3 | 4 | 5 |
| 1 | 0 | 0 | 1 | 2 | 3 | 3 | 4 | 5 | 6 |
| 2 | 0 | 1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| 3 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| 4 | 0 | 2 | 3 | 3 | 4 | 5 | 6 | 7 | 8 |
| 5 | 0 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| 6 | 1 | 2 | 4 | 4 | 5 | 6 | 7 | 8 | 9 |
| 7 | 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 8 | 1 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 9 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| 10 | 2 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 10 |
| 11 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 10 |
| ≥12 | 3 | 5 | 6 | 7 | 8 | 9 | 10 | 10 | 10 |

**(Die Roll) Modifiers for use with this table**

| Mod | Condition | Mod | Condition |
| --- | --- | --- | --- |
| -3 | PD < 0.1 | +2 | Colonised by MegaCorp |
| -2 | PD < 1 | -2 | Unsubsidized Colony |
| -1 | PD < 5 | -1 | Subsidized Colony |
| +1 | PD > 15 | | |

**Law Level Definition.** Law Level is a quantification, from 0 (non-existant) to 10 (all-pervasive) of the planetary law-enforcement body's capabilities and size.

Whether or not the law enforcement officers are corrupt in a given locale, precinct, county, or whatever, can be determined by attempting to roll versus an

SC = 20 + 3 × Law Level

using percentile dice. Success indicating corruption (and QR determining degree of corruption; so yield percentage is percentage of officers on the take, if you like; QR10 denotes an incorruptible and idealistic system, QR1 a wholly corrupt one).

Not only does law level reflect raw personpower, and equipment, but ability to invade privacy, hold without charges, use listening and surveillance devices, (including satellites), maintain and access detailed personal files etc.. On the whole, law level is proportional to effectiveness (assuming a non-corrupt system).

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=87">ForeSight 1986 · p.87 ↗</a></div>

**Legal System Features.** Roll once on the table below for the planet to determine if the local legal system harbours any peculiarities:

| Die Roll | Feature |
| --- | --- |
| 01-20 | No feature |
| 21-25 | No jury system; the verdict in criminal proceedings is decided by a panel of, or a single legal expert(s) |
| 26-28 | No jury system; the verdict in criminal proceedings is decided by a specially designed legal computer (GM's whim as to accuracy of verdicts) |
| 29-30 | Guilty until proven Innocent (like France); the burden of proof falls upon the defendant (although the prosecution requires some evidence) |
| 31 | Guilty until discovered DEAD (removes the burden from the taxpayer) |
| 32-36 | Death Penalty for murder |
| 37-39 | Death Penalty for rape and murder |
| 40-42 | Death Penalty for drug trafficking offences (if applicable), rape, and murder |
| 43-44 | Death Penalty for grand theft (ie. theft of more than an average annual salary), et al. |
| 45 | Death Penalty for all felonies |
| 46-48 | Mindwipe for violent crimes (TL 8); roll up new character |
| 49-51 | Mindwipe for "antisocial" behaviour (TL 8); roll up new character |
| 52-53 | Mindwipe for "subversive" behaviour (TL 8); roll up new character |
| 54-58 | Handguns are legal, and readily available |
| 59-61 | Light Military weapons are readily available |
| 62 | Lethal weapons are strictly licensed and controlled, even for police |
| 63-65 | Vigilante action implicitly encouraged by establishment |
| 66-67 | Kidnapping is accepted way of life |
| 68 | Murder is a family affair, settled between relatives |
| 69 | Crimes of passion go unpunished (even lauded) |
| 70 | Criminals are indelibly and prominently labelled |
| 71 | Criminals are ostracised or exiled (perhaps to a region set aside for them) |
| 72 | Jury decisions are based on majority verdicts |
| 73-74 | Trials are broadcast live |
| 75 | Trials are broadcast live, citizens are polled before verdict is finalised |
| 76 | Trials are broadcast live, viewers determine verdict |
| 77-78 | Judges are elected |
| 79-80 | Prosecution has the right to appeal against a "not guilty" verdict |
| 81-82 | Legal restrictions on the use and ownership of vehicles |
| 83 | Only the government may use and own high technology vehicles |
| 84-85 | Choose or Invent a legal feature |
| 86-95 | Roll Twice More |
| 96-100 | Roll Thrice More |

Note: this table implies a "normal" legal system not greatly unlike that currently found in (some states of) the U.S.A., but without broadcasting of trials, judicial elections, or the ready availability of concealable weapons. Imprisonment is still widely used as a punitive retaliation against criminals. Recreational drugs, homosexuality, prostitution, are assumed to be legal, and cash gambling, racial and sexual discrimination illegal.

##### Space Ports

A word on space ports and interstellar trade. A planet is likely to see interplanetary cargo shipping (import and export) equal to:

Total population × TL^2 / 5 000 000 tonnes per day

This corresponds to about ten grams of cargo per person per day at TL 7.

This value varies as follows:

| Multiplier | Condition |
| --- | --- |
| ×24 | Planet's relative TL is +2 (hard & soft) |
| ×16 | Planet's relative TL is +2 (either hard or soft) |
| ×8 | Planet's relative TL is +1 (hard & soft) |
| ×4 | Planet's relative TL is +1 (either hard or soft) |
| ×2 | Planet's relative TL is +1\* (hard & soft) |
| ×1.5 | Planet's relative TL is +1\* (either hard or soft) |
| ×0.5 | Planet's best relative TL is -1 |
| ×0.25 | Planet's best relative TL is -2 |
| ×0.125 | Planet's best relative TL is -3 (etc..) |
| ×0.2 | Planet is "beyond the pale" (ie. outside the Federation) |

A planet's trade tonnage determines the quality of its space port facilities. A space port is called a Space Port n, where it handles 10^n to 10^(n+1) tonnes of cargo per day. Add n to the planet's Hard TL to determine the space port type.

| Sum | Space Port Type |
| --- | --- |
| ≤5 | N: No formal landing area |
| 6-9 | G: Ground Facility (similar to airport, but better shielded) |
| 10-12 | O: Orbital Facility (large orbital "space station") |
| ≥13 | T: Tower facility (elevator to geostationary orbit) |

So a tower space port handling 11000 tonnes of cargo per day would be referred to as a Space Port 4T.

##### A Final Note on Asteroid Belts

If Asteroid mining figures prominently in your campaign, or you are simply curious, determine the size of the belt (roll on the Standard Planet Size Table) and its density (again as per a planet, but adding two to the roll). The larger and denser an asteroid belt is, the more valuable it will be.

<div style="text-align:right;font-size:.78em;opacity:.5;margin:.4em 0"><a href="/foresight-1986.pdf#page=88">ForeSight 1986 · p.88 ↗</a></div>

#### Information for Maniacal Gamemasters

**Relative Brightness of Stars of MK Spectral Types (Sol = 1.00)**

| Spectral Class | VI | V | IV | III | II | Ib | Iab | Ia | IaO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B0 | | 3630 | 5800 | 8320 | 12000 | 20900 | 22900 | 39800 | 132000 |
| B5 | | 209 | 363 | 525 | 2760 | 17400 | 30200 | 52500 | 158600 |
| A0 | | 52.5 | 83.2 | 145 | 1100 | 12000 | 36300 | 63100 | 190700 |
| A5 | | 13.2 | 27.5 | 63.1 | 525 | 6310 | 47900 | 110000 | 229000 |
| F0 | | 6.31 | 15.9 | 43.7 | 525 | 5760 | 39800 | 209000 | 251000 |
| F5 | 1 | 3.02 | 10.0 | 39.8 | 525 | 5760 | 33100 | 132000 | 276000 |
| G0 | .44 | 1.45 | 6.31 | 47.5 | 525 | 5250 | 27600 | 132000 | 331000 |
| G5 | .23 | .692 | 4.37 | 57.6 | 525 | 4790 | 25100 | 132000 | |
| K0 | .10 | .251 | 4.37 | 83.2 | 525 | 4790 | 20900 | 132000 | |
| K5 | .036 | .0631 | | 100 | 631 | 4790 | 17400 | 132000 | |
| M0 | .0083 | .0100 | | 120 | 1000 | 6310 | 15900 | 69200 | |
| M5 | .0013 | .00132 | | 120 | 2090 | 6920 | 12000 | 52500 | |

Notes: the Radius value given in [7.0] for various kinds of stars roughly derives from the square roots of these values. So, if you want to generate star systems around stars of the kinds given here, use these values accordingly. Also note that the larger stars (ie. those of higher spectral type and/or lower class) will have shorter lifespans. So much so that in reasonably extreme cases, no planet orbiting them would have time to become geologically mature.

**Relative Mass of Stars of MK Spectral Types (Sol = 1.00)**

| Spectral Class | VI | V | IV | III | II | Ib | Iab | Ia | IaO |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| B0 | | 6.2 | 6.9 | 9.6 | 22.9 | 27.5 | 28.4 | 34.1 | 50.9 |
| B5 | | 3.3 | 3.7 | 4.0 | 14.0 | 25.9 | 31.1 | 37.4 | 54.1 |
| A0 | | 2.4 | 2.7 | 3.0 | 10.3 | 22.9 | 33.1 | 39.8 | 57.6 |
| A5 | | 1.8 | 2.1 | 2.5 | 4.0 | 18.5 | 36.3 | 47.9 | 61.2 |
| F0 | | 1.5 | 1.9 | 2.3 | 4.0 | 17.9 | 34.1 | 59.3 | 63.1 |
| F5 | 1 | 1.3 | 1.7 | 2.3 | 4.0 | 17.9 | 32.1 | 50.9 | 65.1 |
| G0 | .76 | 1.1 | 1.5 | 2.4 | 4.0 | 17.4 | 30.2 | 51.0 | 69.2 |
| G5 | .61 | .92 | 1.4 | 2.5 | 4.0 | 16.9 | 29.3 | 51.0 | |
| K0 | .46 | .74 | 1.4 | 2.7 | 4.0 | 16.9 | 27.6 | 51.0 | |
| K5 | .33 | .54 | | 2.8 | 4.2 | 16.9 | 25.9 | 51.0 | |
| M0 | .20 | .22 | | 2.9 | 10.0 | 18.5 | 25.1 | 41.1 | |
| M5 | .11 | .11 | | 2.9 | 12.8 | 19.1 | 22.9 | 37.4 | |

Notes: you can use these values to determine the length of a planet's year. (Also note that this formula is independent of the planet's mass.)

Year Length = √[(Orbital Radius in AUs)^3 ÷ (Mass of Star relative to Sol)] EARTH YEARS

*ForeSight Stellar Data*





