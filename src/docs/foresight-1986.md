# ForeSight 1986
<!--{ "pin": "top", "order": 99, "book": "foresight-1986", "headTitle": "ForeSight 1986 — the original edition (restoration in progress)", "description": "A community restoration of the original 1986 ForeSight rules — machine-extracted from the first edition with the 1987 errata folded in. Work in progress; corrections welcome." }-->

> **⚠️ Work in progress — a machine restoration, not a clean text (yet).**
> These pages are **automatically extracted** from the original 1986 first edition
> and still carry OCR noise — garbled table cells, stray characters, the odd
> run-together line. They are published *because* they're rough: help us finish
> restoring them.

*This is the **original ForeSight** (Tonio Loewald, 1986, ISBN 0958789401) — the edition that actually shipped and was **playtested hard for years**. In all that time, no errors turned up beyond the single [1987 errata sheet](#the-1987-errata), which is folded in below. That track record is why the 1986 numbers are treated as **calibration ground-truth** for the modern edition: where the streamlined rules and the original disagree on a probability, the original has the table evidence.*

## Why it's here

The out-of-print 1986 rules are hard to find, and a number of players want a faithful, readable copy very badly. So rather than sit on a private extraction, it's public — rough edges and all — as a base the community can correct toward a fully-restored original.

## Read alongside the original

Every chapter is machine-extracted, so **the source scan is the ground truth**. Download it and compare: **[ForeSight 1986 — original scan (PDF, 37 MB)](/foresight-1986.pdf)**. Each page here carries a small **`ForeSight 1986 · p.N ↗`** link that opens the PDF at that exact page — so a correction can point right at the original.

## How the extraction works (so you can read around the noise)

- **Prose** is reflowed into flowing paragraphs using the original's indentation, and lightly de-noised. This is a **best-effort cleanup**, not a faithful typesetting — expect residual OCR glitches (mangled title-graphics, the odd wrong letter, split words). Nothing is knowingly reworded and no rule is "improved"; when in doubt, trust the PDF.
- **Stat charts** are being **reconstructed into live, filterable data tables** (the weapon chart, damage table, vehicle table, and more are done — browse and filter them). Charts not yet reconstructed are shown verbatim in monospaced blocks.
- This section is **site-only** on the web, and also ships as its **own ePub volume** — separate from the streamlined edition; it's a different book.

## Help finish it

Corrections are hugely welcome — this is exactly the kind of thing a few dozen readers can fix faster than one person. Spot a mangled table cell, a dropped word, a chart that needs rebuilding?

- **File an issue or a pull request** on the repo: **[github.com/tonioloewald/foresight-rpg](https://github.com/tonioloewald/foresight-rpg)** — cite the page number from the source marker.
- The source lives in `src/rules/1986-*.md`; table blocks are the priority.

## The 1987 errata

The only known corrections to the 1986 rules, printed **Fri, Oct 23 1987**, keyed to the book's chapter-page codes (`2xx` Characters, `3xx` Resolution, `5xx` Travel, `7xx` Star System, `8xx` Starships):

- **Skills / Limit (205R)** — *"1 indicates a skill where talent is as important as experience; 1.5 indicates a skill where experience outweighs talent. A character may not possess a skill at a level higher than the highest of the attributes … in the skill's formula, multiplied by its limit, plus two (rounded off)."* (The headline fix; already present in this printing.)
- **Resolution table (facing 301)** — the "30" row / "QR4" column entry should be **30**.
- **Travel (501R)** — the terrain-value limit for **submarine** vehicles should be **2**.
- **Travel (502L)** — the net **Red(line)** rating is normal Red **plus** (Modified Terrain Value)/2 *(still misprinted as "minus" — see the inline note on the Travel page)*; and *"(or 1 if this is lower)"* means divide by one only if the **result** would be lower.
- **Pursuit (504L)** — "double back" is the old name for the **reverse** manoeuvre.
- **Star System (703R)** — the Incident Radiation Table's bottom row was displaced; a corrected table + collected modifiers were issued.
- **Starships (804R)** — Hibersleep compartments **do not consume 0.25 power**; they run on bleed power from the drives.

<!-- toc -->
- [ForeWord — Introduction & Definitions](/1986-01-foreword/)
- [Characters](/1986-02-characters/)
- [Resolution System](/1986-03-resolution/)
- [Combat](/1986-04-combat/)
- [Travel & Vehicles](/1986-05-travel/)
- [Equipment](/1986-06-equipment/)
- [Star System Generation](/1986-07-star-system/)
- [Spacecraft Design](/1986-08-spacecraft/)
- [Appendices](/1986-09-appendices/)
- [Designer's Commentary](/1986-10-commentary/)
<!-- /toc -->
