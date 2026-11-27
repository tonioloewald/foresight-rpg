# Damage
<!--{ "parent": "conflict", "order": 6 }-->

*One-pager. A hit is resolved by the One Rule like anything else; the hit's **Quality Rating**, the weapon's **Damage Class**, and the target's **armor** decide how badly it hurts. Injury is tracked as **wound levels**, 0 (healthy) to 6 (dead) — each level is a −(level) penalty to everything you do.*

## Damage Class

Every attack has a **Damage Class (DC)** — how hard it hits before quality, armor, or luck. The scale is numerical and calibrated, not flavour:

| DC | Roughly |
|---|---|
| 4 | a very strong person's bare hands — or a nasty targeted punch |
| 8 | a 9mm pistol (the commonest pistol on Earth) |
| 11 | a 7.62mm rifle (the commonest rifle class on Earth) |

### A gun's DC is its own; a melee weapon's is yours

A 9mm does what a 9mm does whoever squeezes the trigger, so **ranged weapons carry an absolute DC**. A sword doesn't: what it delivers is your muscle and your leverage through a better shape. So **a melee weapon lists a modifier** to your **Unarmed Combat Damage Class**:

> **Melee DC = UCDC + the weapon's modifier.**

| ST | 1–5 | 6–8 | 9–12 | 13–14 | 15–16 | 17–18 |
|:--|:--:|:--:|:--:|:--:|:--:|:--:|
| **UCDC** | 0 | 1 | 2 | 3 | 4 | 5 |

Work it out once at character creation and write it on the sheet. From ST 12 up the table is simply **ST ÷ 2 − 4**, which is how it continues for anything stronger than human.

*So an ordinary person (UCDC 2) with a sword (+4) swings at DC 6, and a very strong one (UCDC 4) at DC 8 — the same weapon, and the arm behind it is half the answer.*

*Designer's Note: a weapon that is fundamentally a lump moved by muscle and leverage is very like any other lump, so the melee modifiers sit in a deliberately **narrow band** — +0 for a fist to +5 for a greatsword — and the interesting differences between a sword, a mace and an axe are **not** in that column. They are **nP** (a spear is mostly a point; a military pick is nothing else), **parry** (a sword controls the line, a staff better still, an axe worst of all), **reach**, and **price**. A table that separated them by DC instead would be claiming that a mace hits a different amount rather than hitting differently, and would make Strength almost irrelevant to the one thing it is most obviously for.*

## How much damage a hit does

> **Damage (in wound levels) = Yield × DC × ½, rounded down.**
> And **any hit whose raw damage is ≥ ¼ forces a stun check** (below), even when it rounds to no wound — while **anything under ¼ has no effect at all**.

Read the hit's **Yield** off its QR (QR1 100%, QR2 80%, QR3 50%, QR4 25% — see The One Rule), multiply by half the DC, and round down for the **wound levels** dealt.

**A hit that rounds to no wound is not a scratch.** It is the gut punch, the rifle butt, the elbow square on the funny bone — a blow that landed properly and happened to break nothing, and anyone who has taken one knows exactly how much of the next few seconds it owns. That is what the quarter-level floor is for: real weapons are dangerous and ForeSight doesn't pretend otherwise, so **no lasting injury and no consequence are different things**.

**And below the floor there is nothing at all** — no wound, no roll, nothing owed even in narration. The quarter-level line is not a rounding artefact, it is **the threshold of a blow that registers**, and it sits where it does because *that is the blow that would stun an ordinary person*. Under it, whatever the dice said, nothing happened that the next few seconds will remember. The scale has two thresholds and no third: **registers**, and **leaves a mark**.

In practice the no-effect band is something **armor produces**. Any weapon of DC 2 or more clears the floor on its own even at a scraping QR4 (a QR4 does `0.25 × DC × ½`, which reaches ¼ at DC 2), so a blow that fails to register is almost always one the target's armor has already dealt with — either by eating its DC with **Protection**, or by stepping the result off the bottom of the ladder with **Absorb** (below). A padded gambeson taking `M1` off an ordinary person's `+0 M` fist is precisely this: the punch lands, and nothing about it registers. That is the arms race paying off where it should — not in surviving the blow, but in the blow never arriving.

*A 9mm (DC 8): a solid QR3 hit does 0.5 × 8 × ½ = **2** (medium); a brilliant QR1 does **4** (incapacitated); a scraping QR4 does 0.25 × 8 × ½ = 1.0 → **1** (light) plus a stun check. A 7.62 rifle (DC 11) center-mass at QR1 does 5.5 → **5 (dying)**. A bare fist (DC 4) at QR4 does 0.5 raw → no wound, but a stun check — the gut punch.*

## Wounds — the 0–6 track

Injury is a single number, and it is **−(level) to everything you do** — pain and blood loss don't care what you're attempting:

| Lvl | State | What it means |
|---|---|---|
| 0 | Healthy | — |
| 1 | Light | −1 to all activity |
| 2 | Medium | −2 |
| 3 | Heavy | −3 |
| 4 | Incapacitated | −4; you can barely act — roll WP each turn to do anything at all |
| 5 | Dying | down and bleeding out; **without intervention you deteriorate toward 6** |
| 6 | Dead | — |

*Designer's Note — the conversion, for anyone arriving from hit points. A mid-level D&D character has something like **30 hp**. Put a **wound level at about 6 of those points** and the whole 0–6 track comes to roughly 36 — the same person. Which prices the bands: a hit that registers but leaves no mark is **1–3 points**, and what that is, in life, is **a stab wound**. People regularly survive tens of them. So the sub-wound band isn't the rules being coy about a scratch; it is the most common serious injury there is, and ForeSight's claim is that **its real cost was never the hit points** — it was the next few seconds, which is exactly what a stun check takes off you. Run the conversion the other way and the anchors hold: a 9mm at QR3 does 2 levels ≈ 12 points, and a 7.62 centre-mass at QR1 does 5 ≈ 30 — the entire mid-level character, in one round, from one round. That is the difference between a game with an hp pool and a game without one: not bigger numbers, but **a 1-point hit that costs you the fight** and a 30-point hit that doesn't need a second one.*

New damage **adds to your current level** (a medium 2 plus a heavy 3 is a dying 5). Toughness rolls throughout are made on **Willpower** — staying on your feet is mostly about refusing to stop (see [Exhaustion](/exhaustion/); what *kind* of enduring you are good at comes from **Endurance quirks**). Purely physiological resistance — poison, disease — is **Strength (ST)**, where willpower is no help at all. Pain resistance is **not a skill**; you roll the raw attribute.

## Stun & Shaken

Damage doesn't only wound — it rattles. Any hit that clears the **¼-level stun floor** (or any **stun-class "S" weapon**, which skips straight to it) forces a **pain-resistance roll — WP at BEF 7**, and you read the **QR**:

| Band | QR | Effect |
|---|:--:|---|
| **Solid** | QR1–3 | shrug it off and carry on |
| **Marginal** | QR4 | **Shaken** — −2 to everything and one action only; roll WP at the end of your turn to clear it |
| **Poor** | QR7 *(or any S-weapon)* | **Stunned** — no action but to **recover** (a WP roll each turn); a QR1 clears it at once |
| **Bad** | QR10 | **unconscious** |

*(The four bands are defined once in [Quality Ratings](/quality-ratings/) and used by three rules; this is one of them.)*

Shaken is off-balance and hurting; Stunned is out of the fight until you pull yourself together. Both are temporary and leave no lasting level.

**There is no special severity modifier, because there doesn't need to be one.** Pain Resistance is modified exactly like every other roll in the game: **−(your wound level)**, plus whatever [exhaustion](/exhaustion/) you are carrying, plus the situation. **Apply the new damage first, then roll** — so the hit that just landed is already in your wound level, and a worse hit is a worse roll by the rule that was there all along.

> *WP 10, unhurt and fresh. A blow that lands but breaks nothing: EF 7, SC 70. A 9mm doing 2 levels puts you at Medium first, so EF 5, SC 50. A 7.62 doing 5 puts you at Dying: EF 2, SC 20 — and that is before the −1 EF an abdomen wound adds, or half of a −3 mana track. The same hit on the same character already at Light 1 is one rung worse again.*

*Designer's Note: the first draft of this page gave Pain Resistance its own modifier — −1 EF per wound level the hit inflicted — and it was redundant the moment you notice that damage is applied before the roll. The universal −(level) penalty already produces the whole escalation curve, and it does something the bespoke rule couldn't: it remembers the **three** earlier hits as well as this one. A system with one resolution rule should be suspicious of any mechanic that re-implements a penalty it already has.*

## Hit location

By default roll **D10** for where a hit lands:

| D10 | Location | |
|:--:|---|---|
| 1 | Left leg | fail the Pain Resistance roll and you go **prone** |
| 2 | Right leg | fail the Pain Resistance roll and you go **prone** |
| 3–4 | Abdomen | 1-in-10 chance of an extra point; **−1 EF on Pain Resistance** while you're carrying an abdomen wound (flat, not per wound) |
| 5–7 | Chest | 1-in-10 chance of an extra point |
| 8 | Left arm | fail the Pain Resistance roll and you **drop whatever that hand held** |
| 9 | Right arm | fail the Pain Resistance roll and you **drop whatever that hand held** |
| 10 | Head | **1 natural armor** (the skull), but **piercing damage is +1** — and if they're wearing a helmet, roll its **Gap** (below) |

The distribution is the body as a target: the chest is the biggest thing pointing at you, the head the smallest and the worst place to be hit. Or **call your shot** — the head, a weapon hand, the sliver of someone showing past cover — for an **up-front EF penalty** for the smaller target. The same penalty covers shooting through cover: you pay in ease factor for precision, and a success *is* the called hit (don't charge it twice).

## Damage type & armor

What the damage *is* decides how armor and bodies answer it:

| Type | What it is | Typical |
|---|---|---|
| **M — Melee** | slow, low-energy, **high-momentum** | blades, clubs, fists, arrows, bolts, a thrown rock |
| **I — Impact** | fast, high-energy, **low-momentum** | bullets, fragments, micro-rockets |
| **B — Beam** | energy, **no momentum** | lasers — respectable, but never a pulp death-ray (we were physics majors) |

The dividing line is **velocity, not shape**. A mace is **M** and so is an arrow: both arrive slowly carrying a lot of mass. A 9mm and a shell fragment are **I** whatever they are made of. A **stun (S)** weapon reads the target's **I** protection.

**Armor** carries a **Protection** rating *per type* (a DC of defence); subtract it from the incoming DC before the damage formula. **A type the armor has no number for gets no protection at all** — a gambeson does nothing against a rifle. A DC reduced **to zero or below is harmless**. Two annotations settle the arms race, and they act at **opposite ends of the calculation**:

| Mark | Acts on | Effect |
|---|---|---|
| **nP — Piercing** (weapon) | the armor's **Protection** | take **n** off the Protection rating before it comes off the DC |
| **A — Absorbing** (armor) | the **damage**, after the formula | step the result down **A** notches |
| **Gn — Gap** (helmets) | nothing at all, **n** times in 10 | on a **head** hit roll D10: **n or less and the helmet simply wasn't there** |

### Order of operations — and the outcome ladder

> **Protection (less any `nP`) off the DC → `Yield × DC × ½` → down **A** notches.**

Protection and Absorb are not two sizes of one thing. Protection is a *DC of defence*, and because the formula multiplies what's left by the Yield, **a good roll dilutes it** — a brilliant hit against heavy Protection still does something. **Absorb comes off the result**, so the roll can't touch it, and that makes it by far the stronger of the two. The ladder it steps down has one rung below a wound, the one the quarter-level floor put there:

> … **3 levels** → **2 levels** → **1 level** → **a stun check only** → **nothing at all**

So **A1** turns two wound levels into one, one level into a bare stun check, and a stun check into nothing. And since **a QR4 does a quarter of the damage, and half of all successes are QR4**, any Absorb at all means *half the hits that land stop counting*. That is the real job of armor: not to shrink your wounds, but to decide which blows happened.

**`nP` is no help against `A`.** Piercing beats the Protection column and nothing else, so the two defences want two different answers: **Protection is beaten by penetration, Absorb only by the size of the blow.** A sword on mail is a stun check; a military pick on the same mail draws blood, because mail's strength is Protection. Against a hard shell there is no trick — a sniper round gets through Combat Armor where a 7.62 doesn't, by being bigger.

Absorb is therefore the signature of a **rigid** shell, and the soft armors have none at all: padding and leather *turn* a blow, mail and plate and rifle plates *refuse part of it*.

### Armor only protects what it covers — and a helmet has a hole in it

Every piece lists its **coverage**, and the hit-location roll decides whether the armor was even in the way: a ballistic vest is nothing to a leg hit, and a gambeson's sleeves end at the wrist. That is most of why a called shot is worth its ease-factor penalty.

Helmets are the special case, because **a helmet you can see and breathe in has a hole in it** — the open face, the eye slot, the gap above the gorget. So a helmet carries a **Gap**: on a head hit, roll D10, and on **n or less the helmet isn't there at all** (the skull's own 1 point still is). An open-faced helm is `G5`, a visored one `G2`, a sealed suit `G0`.

**The gap roll is the random twin of the called shot.** Pay the up-front ease-factor penalty to aim for the eye slot and you *buy* the gap instead of hoping for it — and then you don't roll for it, because the success already is the called hit. One rule, two prices: hope, or pay.

*Designer's Note: the three letters are **physics**, not era and not edge. A draft of the equipment tables read M as "cutting" and I as "crushing", which filed a mace in with bullets and a 9mm in with a flamethrower — and made mail carry two numbers to say one thing. The 1986 rules had it right (no suffix = melee, **I** = impact and stun, **B** = beam) and this is a restoration. Whether a weapon **defeats** armor rather than overwhelming it is the other axis, and always was: that is **nP**, not a letter.*

*Designer's Note: in a straight fight, armor has the edge. ForeSight carries a small, deliberate bias against killing player characters too easily — enough that armor is plainly worth wearing and one unlucky roll rarely ends a character outright, without making anyone bulletproof.*

## Scale

A very large or tough target — a vehicle, a dragon, a stone wall — has a **Damage Scale**; divide the damage done by the scale before applying it. A person is Scale 1. That is the whole of how one DC is "lethal" to a man and "a scratch" to a tank, with no separate rules. (Vehicle damage in [Pursuit](/pursuit/) routes here.)

## Recovery — and relapse

Healing is slow. At the interval for your level, make a **convalescence roll** (WP):

| Lvl | Roll every | On the roll |
|---|---|---|
| 1 Light | day | success drops a level; **QR10 raises one (relapse)** |
| 2 Medium | 5 days | " |
| 3 Heavy | 20 days | " |
| 4 Incapacitated | day | " |
| 5 Dying | minutes | **deterioration** — a poor roll drops you *toward death*, not away |

Convalescence carries a penalty equal to the **worst level you've sunk to** since you were last healthy — a relapse leaves you fragile — until you fully recover or get **medical care**. Care (closing wounds, transfusion, surgery) lowers that worst-level penalty or buys levels back directly; it is what hauls a **dying** character off the 5→6 slide before the dice do.

**And a recovery that goes badly leaves something behind.** A wound that relapsed, or healed without care, can become a **chronic condition** — a stiff shoulder, an old break that reads the weather, a lung that never came all the way back. Write it with the four lines on the [Quirks, Perks & Flaws](/quirks/) page (attach / trigger / effect / management) and it costs nothing and grants nothing: it is what happened to the character. That is the honest replacement for a scar table, because it names the rolls it touches instead of the mark it left.

## Poison, disease, and the environment

The same machine handles the slow killers — resolve each as a task and read its **Yield/QR** for how much it does, or roll a **random QR** (D10: 1→QR1, 2→QR2, 3–5→QR3, 6–10→QR4) when nothing is opposed:

- **Poison & venom** carry a **DC** and a type; the victim resists with a **ST roll**, and what gets through applies as wounds (or, for sedatives and toxins that sap rather than injure, as [exhaustion](/exhaustion/)) on the poison's own clock — seconds for a nerve agent, hours for a septic wound.
- **Disease & infection** are the tax on untreated wounds and foul conditions: at intervals the GM sets, a **ST roll** either fights it off or lets it add a level / stall convalescence. Antibiotics and clean care are a fat positive modifier; a battlefield wound left dirty is a negative one.
- **Environmental damage** — falls, fire, cold, blast, drowning — is just a DC and a QR like any hit (a two-storey fall, a burning room), while slow exposure (heat, cold, thin air, thirst) meters as [exhaustion](/exhaustion/) rather than wounds until it turns lethal.
