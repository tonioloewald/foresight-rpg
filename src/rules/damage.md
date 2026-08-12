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

## How much damage a hit does

> **Damage (in wound levels) = Yield × DC × ½, rounded down.**
> And **any hit whose raw damage is ≥ ¼ forces a stun check** (below), even when it rounds to no wound.

Read the hit's **Yield** off its QR (QR1 100%, QR2 80%, QR3 50%, QR4 25% — see The One Rule), multiply by half the DC, and round down for the **wound levels** dealt. The quarter-level stun floor is why even a graze rattles you: real weapons are dangerous and ForeSight doesn't pretend otherwise.

*A 9mm (DC 8): a solid QR3 hit does 0.5 × 8 × ½ = **2** (medium); a brilliant QR1 does **4** (incapacitated); a scraping QR4 does 0.25 × 8 × ½ = 1.0 → **1** (light) plus a stun check. A 7.62 rifle (DC 11) center-mass at QR1 does 5.5 → **5 (dying)**. A bare fist (DC 4) at QR4 does 0.5 raw → no wound, but a stun check.*

## Wounds — the 0–6 track

Injury is a single number, and it is **−(level) to everything you do** — pain and blood loss don't care what you're attempting:

| Lvl | State | What it means |
|---|---|---|
| 0 | Healthy | — |
| 1 | Light | −1 to all activity |
| 2 | Medium | −2 |
| 3 | Heavy | −3 |
| 4 | Incapacitated | −4; you can barely act — roll EN or WP each turn to do anything at all |
| 5 | Dying | down and bleeding out; **without intervention you deteriorate toward 6** |
| 6 | Dead | — |

New damage **adds to your current level** (a medium 2 plus a heavy 3 is a dying 5). Toughness rolls throughout are made on **Endurance *or* Willpower, player's choice** — some people are physically hard to put down, some just refuse to quit. Pain resistance is **not a skill**; you roll the raw attribute.

## Stun & Shaken

Damage doesn't only wound — it rattles. Any hit that clears the **¼-level stun floor** (or any **stun-class "S" weapon**, which skips straight to it) forces a **pain-resistance roll — EN or WP**:

| The roll | Effect |
|---|---|
| **Shrug it off** (good) | carry on |
| **Shaken** (ordinary) | −2 to everything and one action only; roll EN/WP at end of turn to clear it |
| **Stunned** (poor, or any S-weapon) | no action but to **recover** (an EN/WP roll each turn); a QR1 clears it at once, a QR10 drops you unconscious |

Shaken is off-balance and hurting; Stunned is out of the fight until you pull yourself together. Both are temporary and leave no lasting level.

## Hit location

By default roll **D10** for where a hit lands:

| D10 | Location | |
|:--:|---|---|
| 1 | Left leg | |
| 2 | Right leg | |
| 3–4 | Abdomen | 1-in-10 chance of an extra point; wounds here are **−1 EF on Pain Resistance** |
| 5–7 | Chest | 1-in-10 chance of an extra point |
| 8 | Left arm | |
| 9 | Right arm | |
| 10 | Head | **1 natural armor** (the skull), but **piercing damage is +1** |

The distribution is the body as a target: the chest is the biggest thing pointing at you, the head the smallest and the worst place to be hit. Or **call your shot** — the head, a weapon hand, the sliver of someone showing past cover — for an **up-front EF penalty** for the smaller target. The same penalty covers shooting through cover: you pay in ease factor for precision, and a success *is* the called hit (don't charge it twice).

## Damage type & armor

What the damage *is* decides how armor and bodies answer it:

| Type | What it is |
|---|---|
| **M — Melee** | slow, low-energy, high-momentum (blades, clubs, fists) |
| **I — Impact** | fast, high-energy, low-momentum (bullets, shrapnel) |
| **B — Beam** | energy, no momentum (lasers) — respectable, but never a pulp death-ray (we were physics majors) |

**Armor** carries a **Protection** rating (a DC of defence) against the types it's built for; subtract it from the incoming DC before the damage formula. A DC reduced **below zero is harmless**. Two annotations settle the arms race at the margin:

| Mark | Effect |
|---|---|
| **P — Piercing** (weapon) | ignores that many points of the target's Protection |
| **A — Absorbing** (armor) | stops one point of *damage* that still gets through |

*Designer's Note: in a straight fight, armor has the edge. ForeSight carries a small, deliberate bias against killing player characters too easily — enough that armor is plainly worth wearing and one unlucky roll rarely ends a character outright, without making anyone bulletproof.*

## Scale

A very large or tough target — a vehicle, a dragon, a stone wall — has a **Damage Scale**; divide the damage done by the scale before applying it. A person is Scale 1. That is the whole of how one DC is "lethal" to a man and "a scratch" to a tank, with no separate rules. (Vehicle damage in [Pursuit](/pursuit/) routes here.)

## Recovery — and relapse

Healing is slow. At the interval for your level, make a **convalescence roll** (EN or WP):

| Lvl | Roll every | On the roll |
|---|---|---|
| 1 Light | day | success drops a level; **QR10 raises one (relapse)** |
| 2 Medium | 5 days | " |
| 3 Heavy | 20 days | " |
| 4 Incapacitated | day | " |
| 5 Dying | minutes | **deterioration** — a poor roll drops you *toward death*, not away |

Convalescence carries a penalty equal to the **worst level you've sunk to** since you were last healthy — a relapse leaves you fragile — until you fully recover or get **medical care**. Care (closing wounds, transfusion, surgery) lowers that worst-level penalty or buys levels back directly; it is what hauls a **dying** character off the 5→6 slide before the dice do.

## Poison, disease, and the environment

The same machine handles the slow killers — resolve each as a task and read its **Yield/QR** for how much it does, or roll a **random QR** (D10: 1→QR1, 2→QR2, 3–5→QR3, 6–10→QR4) when nothing is opposed:

- **Poison & venom** carry a **DC** and a type; the victim resists with an **EN roll**, and what gets through applies as wounds (or, for sedatives and toxins that sap rather than injure, as [exhaustion](/exhaustion/)) on the poison's own clock — seconds for a nerve agent, hours for a septic wound.
- **Disease & infection** are the tax on untreated wounds and foul conditions: at intervals the GM sets, an **EN roll** either fights it off or lets it add a level / stall convalescence. Antibiotics and clean care are a fat positive modifier; a battlefield wound left dirty is a negative one.
- **Environmental damage** — falls, fire, cold, blast, drowning — is just a DC and a QR like any hit (a two-storey fall, a burning room), while slow exposure (heat, cold, thin air, thirst) meters as [exhaustion](/exhaustion/) rather than wounds until it turns lethal.
