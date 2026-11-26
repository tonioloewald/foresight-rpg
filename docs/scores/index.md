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

Some skills reward training far more than raw talent. The classic ForeSight move is to halve the formula for these — **Score = (average of attributes) ÷ 2 + level** — so the untrained baseline is low and almost all of a master's score is earned. *Decision pending: keep this two-tier system (full-average vs. half-average formulas), or flatten to a single full-average rule for simplicity? The 2004 templates went further still, with quarter-average formulas for a few skills (Confidence, then `(AP+WP)÷4`, was one — **AP** has since gone, and Confidence is now a flat `IN`); those should probably collapse into whichever tiering we keep.*

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

*Designer's Note — why attributes are not doubled. An edition of ForeSight gave an attribute a **Score of twice its value** and left BEF at 5, so an attribute of 13 became a Score of 26 → **20+2**, rolling at EF 7 for SC 140. It was built to sharpen exactly the thing this game wants — one highly effective person beating five ordinary ones — and it did, but by the wrong route and at a price. **The surplus-over-20 rule converts Score into ease factor, and ease factor is immunity to penalties.** At an attribute of 16 the doubled character rolls SC 180, and after a −3 EF for wounds and exhaustion is **still at 120** — still automatic. Today they would be at 64, which is a character in trouble. So the gifted stopped being able to struggle at all: injury, fatigue and foul conditions simply stopped registering on them, and that is the ubermensch, arriving as arithmetic rather than as a design choice. And the sharpening was an illusion — doubling helped the **ordinary** person too (an attribute of 7 went from SC 49 to 70, cutting their chance of being stunned by a registering hit from 45% to 27%). It widened the gap by **lifting the expert out of the game**, where single values at BEF 7 widen it by **leaving the mook fragile**: 45% stunned against 1%. Same asymmetry, more of it, and the expert still has something to lose. (It is not the 1986 rules, whose own PCS guidance — 10 is not particularly good, 15 okay, 20 pretty good, 25 expertise — is today's Score scale unchanged.)*

## Base Ease Factor

Each ability also carries a **BEF** — the ease factor of a *standard* application, before any situational modifiers.

| Ability | BEF |
|---|:--:|
| a bare **attribute** | **7** |
| most **skills** | **5** |
| the aimed-attack skills (Firearms, Archery, Heavy Weapons) | **4** (see [Fire Combat](/fire-combat/)) |

**An attribute is more forgiving than a skill, and that is deliberate.** A skill's BEF prices a *standard application of a craft* — the lock a locksmith meets on a Tuesday. An attribute roll isn't that: it is your body or mind doing the thing it does all day — refusing to go down, keeping going, throwing off a poison — and the base case has to be that an ordinary person usually copes. Human attributes run **3–16** with most people at **7 or 8**, so BEF 7 puts an ordinary Pain Resistance or exhaustion check at **SC 49–56** — near a coin-flip — and the remarkable WP 10 at **70**.

**Consequence worth knowing:** at an attribute of **15** the product is already past 100, so for the gifted the pass/fail axis of an attribute check all but disappears and only the **Quality Rating** still varies. Attribute checks are therefore read off their QR, not their success — which is why what the QR *bands* mean has to be nailed down (see [Quality Ratings](/quality-ratings/)).

A BEF can also **fold in a standing familiarity**, written as a sum: `3 + E`, where **E** is your familiarity with the environment, is the classic ForeSight treatment of Initiative — you react faster aboard your own ship than in a strange city. (The skill table ships Initiative at a flat **BEF 5**; the folded form is an alternative to it, not an addition.) The Score × BEF product is your baseline success chance; the situation moves it from there.

*Designer's Note: "formula + level" is why ForeSight needs no separate stat for natural talent versus trained skill — the attributes are the talent, the level is the training, and the same number captures both. Set your attributes once; everything you learn builds on them.*
