# Labelled fixtures — the instrument's calibration set

Defects this project found and fixed. Each one is a **known positive at a known revision**,
so a battery's sensitivity can be measured instead of assumed: stage the revision, run the
battery, and see whether it finds the thing we know is there.

A battery that misses a fixture is not evidence a current page is clean.

Only the first is scored so far. The rest are recorded with the revision that fixed them, so
the before-state is one `git show` away.

| # | Defect | Fixed in | Stage at | Battery | Detectable from text alone? |
|---|---|---|---|---|---|
| 1 | **The beats divisor.** `Score ÷ 5` primary / `÷ 10` secondary, round up — a breakpoint rule wearing a formula's clothes. Firearms 20 gives 4 beats and 21 gives 5, so the point that matters is invisible unless you read closely. | `456673d` | `e06095e` | A (cat. 4) | **Yes** — wholly determined by the quoted rule plus arithmetic. The ideal fixture. |
| 2 | **`Build` / `PM` divergence.** `Build = +(5 − QR)` and `PM = 4 − QR` both appear, one page apart, as chaining rules. | kept, deliberately — both are real, and the text still does not reconcile them | current | A (cat. 1/7), B (`pm-vs-build`) | **Yes** — and it is still live, which makes it a standing sensitivity check on any run of the current pages. |
| 3 | **Charm and Confidence both claimed persuasion.** Two social skills overlapping on one use. | `2026-09` social reformulation | pre-fix `skills.json` | A (cat. 1) | Partly — needs the skill covers, not just the rules pages. |
| 4 | **Firearms BEF double-counted the aimed shot.** The BEF described a careful shot, and aiming then paid again. | the BEF cut 5 → 4 | pre-fix | A (cat. 2) | **Yes** — this is category 2 exactly. |
| 5 | **Free aim and movement.** Both were automatic, so a complete klutz manoeuvred in melee as well as an acrobat. | `b7b74cc` | pre-fix | A (cat. 3), C | Partly — "nothing in the rules stops this" is harder to see than a contradiction. |
| 6 | **Dropped attribute references.** DX / AG / EM survived in `armor.json` and `magic-applications.json` after the attributes were merged. | purge | pre-fix | A (cat. 5) | **Yes**, as undefined terms — but only if the data is staged alongside the prose. |
| 7 | **`playtest-pack.md` social formulas never synced** with `skills.json`. | 5-attribute rebase | pre-fix | A (cat. 1) | **Yes**, if both files are staged. A cross-file consistency probe. |

## What the fixture set is missing

Every entry is a defect a **careful reader** could find. Nothing here is a defect that only
shows up at a table — nobody tracking fatigue, a rule that is clear and exploit-free and still
gets dropped. That is the *survival* lens, and no agent battery can stand in for it.

So the fixture set measures the batteries' ceiling honestly: they can be calibrated for
consistency, legibility and derivability, and not for whether anyone will bother.
