# Scores
<!--{ "parent": "core", "order": 4 }-->

*One-pager. Every ability you roll — attribute or skill — has a **Score** (how good you are) and a **Base Ease Factor** (how hard a standard use is). This page is where scores come from.*

## Score = formula + level

An **attribute's** score is simply its value (Strength 11 is a score of 11).

A **skill's** score is built from two parts:

> **Score = formula + level**

- The **formula** is an **average of the relevant attributes** — the talent the skill draws on. Firearms is (CO + PC) ÷ 2; Athletics is (ST + CO) ÷ 2; a purely mental skill might be just IN (the "average" of one attribute).
- The **level** is what training and experience add on top. A brand-new skill is level 0 — you perform at the bare talent your attributes give you — and every level bought raises the score by one.

So a character with CO 12, PC 10 has a Firearms *formula* of 11; untrained (level 0) their Firearms score is 11, and ten levels of training make it 21. **Skills can climb well past attributes** — that's why a trained specialist outshoots a naturally well-coordinated amateur.

### Talent-light skills (open question)

Some skills reward training far more than raw talent. The classic ForeSight move is to halve the formula for these — **Score = (average of attributes) ÷ 2 + level** — so the untrained baseline is low and almost all of a master's score is earned. *Decision pending: keep this two-tier system (full-average vs. half-average formulas), or flatten to a single full-average rule for simplicity? The 2004 templates went further still, with quarter-average formulas for a few skills (Confidence, then `(AP+WP)÷4`, was one — both of those attributes have since gone); those should probably collapse into whichever tiering we keep.*

## Limit (and maximum level)

Every skill has a **Limit**, which follows directly from its formula type: **1** for an average-formula skill, **1.5** for a half-average (talent-light) one. The Limit is the **max-level multiplier**:

> **Maximum level = highest constituent attribute × Limit.**

So a talent-balanced skill tops out around its best attribute, while a training-dominated one can be pushed half again as far. You can't become world-class on mediocre fundamentals — and the cap is the strongest argument for keeping the half-average tier: it's not just a lower floor, it's a higher ceiling *earned* by training.

## Cost

Every skill also has a **Cost** — the points it takes to raise one level, for advancement and point-buy. **Most skills cost 1 or 2**, the broader and more useful ones costing 2. A **pervasive powerset** — a whole school of magic or a Chi discipline reached through a single skill — costs far more, on the order of **6–8 per level**, because that one skill unlocks an enormous, ever-expanding toolbox. Acquiring a skill from scratch (reaching its formula baseline) costs a small flat amount; thereafter each level costs the skill's Cost. *(Full advancement economy lives with the experience rules.)*

## Beyond 20

Scores are counted as at most **20** for the multiplication — but they keep paying off above that as an **ease-factor bonus**: every full **3 points over 20** is **+1 EF**.

> 20–22 → 20 — 23–25 → 20+1 — 26–28 → 20+2 — and so on.

This is what lets the truly exceptional attempt things lesser practitioners simply cannot. A score of 20+2 doesn't just succeed more often; the extra ease factor opens up tasks that were at EF 0 (impossible) for everyone else. (See The One Rule for how a +1 EF is worth your whole score in the sweet spot — which is why these bonuses matter so much at the top end.)

## Base Ease Factor

Each ability also carries a **BEF** — the ease factor of a *standard* application, before any situational modifiers. BEFs hover around 5 and may fold in a standing familiarity (e.g. an Initiative BEF written 3 + E builds in your environment familiarity). The Score × BEF product is your baseline success chance; the situation moves it from there.

*Designer's Note: "formula + level" is why ForeSight needs no separate stat for natural talent versus trained skill — the attributes are the talent, the level is the training, and the same number captures both. Set your attributes once; everything you learn builds on them.*
