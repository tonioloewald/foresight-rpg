# The One Rule
<!--{ "parent": "core", "order": 2 }-->

*To play ForeSight you learn **one** rule. It's called **resolution**, and it runs every uncertain thing anyone attempts — a **task** — from picking a lock to winning a trial. Everything else in this book is that rule applied to a situation, or an example of applying it. Learn this page and you can run the game from memory.*

## The core

Every ability — an **attribute** (innate, like Strength or Perception) or a **skill** (trained, like Firearms or Stealth) — has a **Score** and a **Base Ease Factor (BEF)**.

- **Score** is how good you are: 1 is hopeless, 10–15 is competent, 20+ is very good. Skills climb far higher than attributes.
- **BEF** is how forgiving the ability is by nature — usually around 5.

To resolve a task, judge how hard *this particular* attempt is as an **ease-factor modifier**, add it to the BEF to get the **Ease Factor (EF)**, and multiply:

> ### SC = Score × Ease Factor
> Roll **D100**. Roll ≤ your Success Chance and you succeed.

*Amy fires a stun pistol at a suspect. Firearms BEF 4; the suspect is 12 m off (−2 range) and moving (−2), but she braced (+1), took a bead and got it (+2), and the pistol is well-balanced (+1). EF = 4 − 2 − 2 + 1 + 2 + 1 = **4**. Her Firearms Score is 17, so SC = 4 × 17 = **68%**. That is about as complicated as it ever gets.*

## How ease factors work

Ease factors aren't a linear scale at the bottom — they run:

> **0 — ¼ — ½ — 1 — 2 — 3 — 4 — 5 — 6 — 7 — 8 — 9 — 10 — 11 — 12 — 13 — 14 — 15**

Adding a modifier moves right along the ladder, subtracting moves left. **Sum every modifier first, then apply it** (6 + 10 − 4 is 6 + 6 = 12, not 15 − 4). EF can't fall below **0** (flatly impossible) or rise above **15** (as easy as things get). A Score over 20 counts as 20 but adds **+1 EF per 3 points above** — written 20+1 (23–25), 20+2 (26–28)… — which is how the truly gifted do what lesser mortals simply cannot.

**One step is a big lever, and it scales with skill.** In the sweet spot, **+1 EF adds your whole Score to the SC** — Score 15 going EF 5→6 jumps 75%→90%. Down at the ¼/½ rungs a step is worth about half your Score. Two consequences: modifiers stay **small** (a typical situational modifier is ±1 or ±2 — each is already potent), and the same good conditions help a skilled character *more*, which is exactly right.

*Fractions round to nearest (½ or more rounds up): Score 13 at EF ¼ → 3.25 → roll ≤ 3.*

*Designer's Note — a lever you can feel. One EF step is a **big** lever, and a **fixed-size** one: because SC = Score × EF, a step moves your success chance by your whole Score in points **wherever you sit on the range** — 30%→45% and 60%→75% cost the same single step. Almost no other dice engine can say that. A 2D6 or 3D6 **bell curve** gives a lever that's huge near the middle and near-useless at the tails, so a +1 barely dents a long shot or a near-certainty. A flat **D20** is the reverse — a modest lever in the middle that turns brutal at the 1/20 edges, and the change in *odds* is nastier still. A raw flat **D100** is the cautionary tale: a flat +10 runs 10→20 (doubling your chances) in one place and 45→55 in another — the "same" modifier doing wildly different work, a giant lever with poverty traps at the bottom. (Savage Worlds' exploding dice are more erratic yet.) Score × EF is deliberately none of these: the same-sized step wherever you pull it.*

### Competence at a glance

What a Score buys you on an ordinary task (a typical BEF ≈ 5, no modifiers):

| Score | Who they are | SC on an average task |
|---|---|---:|
| 5 | rank amateur | 25% |
| 10 | capable | 50% |
| 15 | seasoned professional | 75% |
| 20 | expert | 100% |
| 20+3 (26+) | master — only a natural 100 fails | over 100% |

### Challenge at a glance

What the situation is worth. This table is *really all you need to remember* — every other modifier in the book is an example of it.

| The task is… | Modifier |
|---|---:|
| Trivially easy | +5 |
| Very easy | +3 |
| Relatively easy | +1 |
| Average | +0 |
| Relatively hard | −1 |
| Very hard | −3 |
| Extremely hard | −5 |
| Near impossible | −7 |

Modifiers **accumulate**, and can run past either end: wounded *and* firing at a small, distant, dodging target with a badly-made gun can pile well below −7. So it should be.

## Success comes in degrees — Quality Ratings

One roll tells you *whether* and *how well*. Read the **Quality Rating (QR)** off where your roll fell under the SC:

| Your roll | QR | |
|---|---|---|
| ≤ SC ÷ 10 | **QR1** | brilliant |
| ≤ SC ÷ 4 | **QR2** | good |
| ≤ SC ÷ 2 | **QR3** | solid |
| ≤ SC | **QR4** | scraped through |
| > SC | **QR7** | failure |
| > SC and a multiple of 10 | **QR10** | fumble — it went *wrong* |

**And succeeding is not the same as prevailing.** A Success Chance of 100 makes the *roll* certain, never the *outcome*: most interesting tasks are **opposed** (his defence meets your attack, better QR taking it) and most consequences are then **mitigated** — by armour, by cover, by location, by what the world does about it. So the quantity that actually decides things is your **net result relative to his**, not your number on its own. This is why stacking several small ease-factor advantages beats holding out for one big one, and why an expert profits from bad conditions: a penalty applied to both of you comes out of his chance of succeeding at all, and merely out of your surplus.

Two hard limits: a roll of **100 is never better than QR7** (even a near-certainty can fail), and **99 is never better than QR4** (you can always succeed, but never brilliantly, on a 99). *(The character sheet's Resolution Table precomputes the four thresholds so you never divide at the table.)*

### Read one column: fast, good, or much

**A QR1 is quick *or* superb *or* plentiful — never all three.** Decide before you roll what was at stake, and read only that column:

- **Yield — how *much*?** QR1 **100%**, QR2 **80%**, QR3 **50%**, QR4 **25%** of the maximum. Damage, intel gathered, ground covered, gold panned, rope salvaged. *(Damage = Yield × Damage Class ÷ 2.)*
- **Time — how *fast*?** QR4 takes roughly twice a competent estimate; QR1 is done in a flash. This is what answers *"did you pick it before the guard rounded the corner?"*
- **Product (PM) — how *good*, for later?** When a task makes something used in a *later* task, carry it forward as **PM = 4 − QR**: QR1 → +3 … QR4 → +0, QR7 → −3. (That's why the scale is numbered 1-2-3-4-7-10.)

**Never penalize the same choice twice.** If you took a penalty to do it a certain way, *success already includes that thing*. Pick the lock fast under a haste penalty and a plain success **means you were fast** — no separate Time roll on top. Call the head-shot at a penalty and a hit **lands where you aimed**. Pay once, up front.

**Half of all successes are QR4** — twice the time, a quarter of the take — and that's just life: the plumbing rarely gets fixed *well*. When a result is hidden (was the alarm well-installed?), a **failure yields and takes time exactly as a QR4** would; the dice stay quiet and the GM knows.

### Speed answers "why can't I just try again?"

No special rule needed. **A failure already spent the time** — a QR7 eats ~200% of the estimate, same as a QR4 success — so retrying isn't free, and when time matters the guard is coming. **A QR10 shuts the door**: you've fouled the approach (snapped the pick, convinced yourself the safe turns the wrong way) — find another way. The worst-to-best conga line never forms.

## Opposed resolution — oppose or build

Tasks rarely stand alone. Two moves cover every chain:

- **Oppose — both roll, compare QRs; the better QR wins.** A big gap is a rout, a small gap a narrow win, and **equal QRs cancel** — the blow *just* parried, the tail *almost* spotted. That's a feature: nothing decisive happens, the tension holds, you keep going, and a string of ties is a long taut struggle. If someone *must* act now, the higher Score edges it.
- **Build — a prior result feeds the next as a modifier: +(5 − QR).** QR1 → +4 … QR4 → +1. The follow-up still uses its own ability and BEF, nudged by what came before. Opposing a *standing* result instead (hacking a system someone built well)? Take the same value as a penalty.

## Worked examples

- **Picking a lock** — Lockpicking (or Sleight of Hand) vs a difficulty for the lock's quality, minus haste, plus good picks. Time is usually the real stake: take the haste penalty and success *is* beating the guard.
- **Fixing an engine — a chain.** First **diagnose** it: a Knowledge task (the relevant field, with Perception or Intelligence to read the symptoms). The diagnosis is the *product* that feeds the fix (**PM = 4 − QR**) — a spot-on read (QR1) is **+3** to the repair; a botched one (QR7) sends you chasing the wrong fault at **−3**. The repair may still be hard for its own reasons (access, a seized bolt), and its **Yield** is how much you restore — capped at *as good as before*. So: **+3 to *do* the repair from a perfect diagnosis, never +3 to the thing repaired.** A repair only restores.
- **Hot-rodding it** — the same **plan-then-execute** chain (plan the modification as a Knowledge task; the plan feeds the execution), but where a repair only restores, hot-rodding *improves* a chosen quality at a **tradeoff** — and it's the book's clearest picture of what a QR actually *means*:
  - **QR1–2** — the gain, with the tradeoff shrunk or gone; maybe a little extra on top.
  - **QR4** — the gain *and* the full tradeoff: quicker off the line, worse through the bends (the normal deal).
  - **QR7** — all downside, no upside: you paid the price and got nothing.
  - **QR10** — you broke it completely.
- **Persuading the Duke** — Charm (or Confidence) opposed by his resolve (WP, or Confidence if he's arguing back). Compare QRs; the gap is *how* convinced. A tie: he wavers but won't commit — yet.
- **Picking a pocket** — Sleight of Hand opposed by the mark's Perception. Reaching for a guarded inside pocket is a penalty *and* a called outcome: succeed and you got *that* pocket.
- **Sneaking past** — Stealth opposed by their Perception (or Search, if they're actively looking). A tie means they sense *something* and can't place it.

## Random QR

When you need a QR out of nowhere — area damage catching a bystander, how well an unseen NPC did their job — roll **D10**: **1**→QR1, **2**→QR2, **3–5**→QR3, **6–10**→QR4.

*Designer's Note: resolution is adapted from Victory Games' James Bond 007 — the finest published RPG of its era — generalized, then beaten into shape by four decades of play. It is not negotiable: a cleverer-looking dice engine was built to replace it, looked fine on paper, and failed at the table. Score × EF works because the value is a **percentage**, and people understand percentages and multiplication in their bones. The QR scale is the secret engine — combat damage, a chase's gained ground, an interrogation's leaked truth, a forged passport's quality are all "read the QR in the column that matters." Learn these two things and the rest of the book is examples.*
