# Quality Ratings & Yield
<!--{ "parent": "core", "order": 5 }-->

*One-pager. Every resolved task returns not just success/failure but a **Quality Rating** — how well it went. One roll, read three ways depending on what was at stake: how **fast**, how **good**, or how **much**.*

## The QR scale

A success is graded **QR1** (superb) → **QR2** → **QR3** → **QR4** (it worked, barely). Failures continue the same scale as **QR7** and **QR10** (bad and disastrous). The odd numbering isn't arbitrary — see *Carry*, below.

You read the QR off your D100 roll against fractions of your success chance (SC):

| Roll | Result |
|---|---|
| ≤ SC ÷ 10 | **QR1** |
| ≤ SC ÷ 4 | **QR2** |
| ≤ SC ÷ 2 | **QR3** |
| ≤ SC | **QR4** |
| > SC | **QR7** (failure) |
| > SC *and* a multiple of 10 | **QR10** (botch) |

Two hard limits, whatever your SC: **a roll of 100 is never better than QR7** (so even a near-certainty can fail), and **a roll of 99 is never better than QR4** (you can always succeed, never *brilliantly*, on a 99).

*(The character sheet's Resolution Table precomputes the four success thresholds so you never divide at the table — look up your score and EF, read the numbers. The table holds only those thresholds: Yield, Time, Carry and the Bands are flat values keyed to the QR itself, below.)*

## Read one column, not four

> **A QR1 is fast *or* fabulous — never both.** Decide before the roll what was at stake, quantify *that*, and let the rest be narration.

If speed mattered, read **Time**. If what it leaves behind mattered, read **Carry**. If the amount mattered, read **Yield**. If a rule just wants to know how it went, read the **Band**. A superb dance is in time with the music; a superb *quick* repair is done early — not both at once.

## Never penalize the same choice twice

If a player accepts an ease-factor penalty to do something a particular way, the **success already includes that thing** — don't also make them earn it on a QR column.

- *Picking the lock fast because the guard is coming:* take the penalty for haste, and then **success means they were fast** (the guard didn't catch them); **failure means they couldn't do it that quickly.** You don't penalize for hurrying *and* require a good Time QR on top.
- *The called head shot, or shooting the one part not behind cover:* take the penalty for the small target, and a **hit lands where they aimed.** No second hit-location roll to "confirm" it.

The up-front modifier is the price of the special outcome. Pay once.

## The three readings

**Yield — how much did you get?** A percentage of the maximum: **QR1 100%, QR2 80%, QR3 50%, QR4 25%** (failures yield as a QR4). Used for damage (**damage = Yield × DC ÷ 2**), and equally for intelligence gathered, gold panned, ground covered, rope salvaged.

**Time — how long did it take?** A percentage of what a competent practitioner would estimate up front. QR4 takes roughly twice as long; QR1 is quick. *This is what answers "did you pick the lock before the guard rounded the corner?" — a time-critical task where QR is the whole story.*

**Carry — how good is it for later use?** When a task makes something a *later* task will use (a built weapon, a forged document, a set-up security system), or simply leaves the next attempt better placed, the QR carries forward as an ease-factor modifier: **5 − QR.** So QR1 → +4, QR2 → +3, QR3 → +2, QR4 → +1, QR7 → −2, QR10 → −5. (That's why the scale is numbered 1-2-3-4-7-10.)

**There is only one chaining number in ForeSight, and it is `5 − QR`.** It does not matter whether the thing carried forward is an object, a position, a diagnosis or a reputation — **Build**, below, is the same rule, and a made object simply keeps its `5 − QR` as the **PM** (Performance Modifier) that objects already carry on the [Objects](/equipment/) page. **Any success leaves the next attempt something to stand on**, which is why QR4 is +1 and not zero: the job came in late and rough, but the door is open.

## Bands — when a rule wants a coarse outcome

Some rules don't want a percentage or a modifier, only *how it went*. They read the QR as four **bands**, and these are the names the rest of the book uses:

| Band | QR |
|---|---|
| **Solid** | QR1–3 |
| **Marginal** | QR4 |
| **Poor** | QR7 |
| **Bad** | QR10 |

Still one column. And since **half of all successes are QR4**, *marginal* is the ordinary result of succeeding — *solid* means you had something to spare.

Three rules read the bands, and all three say the same shape — you got it, you got it at a price, you didn't, you made it worse:

| | solid | marginal | poor | bad |
|:--|:--|:--|:--|:--|
| **Pain Resistance** ([Damage](/damage/)) | shrug it off | **Shaken** | **Stunned** | unconscious |
| **Getting exhausted** ([Exhaustion](/exhaustion/)) | you're fine | +1 level | +1 level | worse, or the effort fails |
| **The gather roll** ([Exhaustion](/exhaustion/)) | the power comes free | it comes, and costs a level | it doesn't come | fizzle *and* a level |

## Failures yield like a QR4

When players can't tell success from failure (hidden results — was the alarm well installed? did the panning find anything?), a *failure* yields and takes time exactly as a **QR4** would. The dice stay quiet; the GM knows.

## Why QR4 is so common — and so mediocre

Half of all successes are QR4: twice the time, a quarter of the take. That's not a flaw, it's life. How often is the plumbing fixed *well*? How often does the job come in on the estimate? How much of a newspaper article is the 25% that's both true and relevant? Life is full of QR4s.

## "Why can't I just try again?"

The bane of skill systems — players lining up worst-to-best to retry a lock until someone makes it (we're looking at you, RuneQuest). ForeSight answers it with the time mechanic, no special rule required:

- **A failure already cost you time.** A QR7 takes ~200% of the estimate — the same as a QR4 success. So you *can* try again, but the clock has already run, and it keeps running. When time matters (and in tense situations it does), endless retries aren't free; eventually the guard rounds the corner.
- **QR10 closes the door.** A disastrous failure means you've fouled the approach — for yourself and often for the next person (the pick snaps in the lock; you've convinced yourself the safe opens left when it opens right). There's no "try the same thing again": find another way.

So the conga line never forms. The first failure is slow, the next is slower, and a bad enough failure spoils the method outright.

## Open-ended resolution: oppose or build

Any result can be opposed or built upon — this is what makes the system chain. *(Full treatment, including the blocking table, is on the Opposed Resolution page.)*

- **Oppose** a prior result two ways: use its QR as the *base ease factor* for your counter-task, **or** simply roll your own opposing task and compare QRs.
- **Build on** a prior result by adding **+(5 − QR)** as a modifier to your follow-up: QR1 → +4, QR2 → +3, QR3 → +2, QR4 → +1. Even a marginal success gives a successor something to stand on. *(The same number as **Carry**, above, because it is the same idea.)*

## Random QR

When you need a QR out of nowhere (area damage on a bystander, how well an unseen NPC did their job): roll D10 — **1**→QR1, **2**→QR2, **3–5**→QR3, **6–10**→QR4.

*Designer's Note: this one table is the secret engine of the whole game. Combat damage, a chase's gained ground, an interrogation's leaked truth, a forged passport's quality — all of it is "read the QR in the column that matters." Learn it once and most of the rest of this book is just examples.*
