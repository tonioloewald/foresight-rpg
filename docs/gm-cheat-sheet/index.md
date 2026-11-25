# ForeSight — GM Cheat Sheet
<!--{ "parent": "reference", "order": 1 }-->

## The One Rule

> **Success Chance = Score × Ease Factor.** Roll **D100 ≤ SC** to succeed.

**EF ladder:** 0 — ¼ — ½ — 1 — 2 — 3 … 15. (0 = impossible, 15 = automatic.) Add all modifiers, *then* apply.

**BEF:** bare **attribute 7** · most **skills 5** · aimed attack (Firearms/Archery/Heavy Weapons) **4**. *An attribute at 15+ is past SC 100 — read the QR, not the pass.*

**A +1 EF is worth your whole Score** in the sweet spot (Score 15: EF 5→6 = 75%→90%), ~half at the ¼/½ rungs. Keep modifiers small.

**Rule of thumb:** `+5` trivial · `+3` very easy · `+1` easy · `0` average · `−1` hard · `−3` very hard · `−5` extreme · `−7` near-impossible. *(Just remember +5 easy / −5 hard.)*

## Quality Ratings

| Roll vs SC | QR |
|---|---|
| ≤ SC/10 | **QR1** |
| ≤ SC/4 | **QR2** |
| ≤ SC/2 | **QR3** |
| ≤ SC | **QR4** |
| > SC | **QR7** (fail) |
| > SC & a multiple of 10 | **QR10** (botch) |

*Caps: a 100 is never better than QR7; a 99 never better than QR4.*

**Yield %:** QR1 **100** · QR2 **80** · QR3 **50** · QR4 **25** (failures yield as QR4).
**Read one column only:** *Yield* (how much) · *Time* (QR4 ≈ 200% of estimate) · *PM* = **4 − QR**. Never penalize the same choice twice (pay the EF up front, the success includes it).

## Open-Ended Resolution

- **Oppose:** both roll, **compare QRs** — better wins; **equal cancels** (just-barely block; keep going); break ties by Score only if forced.
- **Block (how much got through):** defense ≥ attack negates; else attack drops **(5 − defending QR)** notches; failed defense = full; QR10 defense = attack one notch *worse*.
- **Build on a result:** **+(5 − QR)** as an EF *modifier* (QR1 +4 … QR4 +1); opposing a standing result, same as a penalty.

## Damage

> **Damage = Yield × (DC ÷ 2)** ⟶ wound levels.  (Large/tough target: **÷ Damage Scale**.)

**DC anchors:** very strong person's fist **4** · 9mm pistol **8** · 7.62 rifle **11**.
**Melee DC = UCDC + weapon `+n`** (UCDC from ST: 1–5 → 0 · 6–8 → 1 · 9–12 → 2 · 13–14 → 3 · 15–16 → 4); **ranged DCs are absolute**. Melee mods run +0 (fist) to +5 (greatsword) — weapons differ by **nP / Parry / reach / price**, not by DC. Parry: staff **+2**, sword & greatsword **+1**, mace/knife/spear **0**, axe **−1**, shield **+1** more. *The sword is the benchmark — everything else wins one column and pays for it.*
**Types:** M melee (slow & heavy: blades, clubs, fists, arrows) · I impact (fast: bullets, fragments) · B beam (lasers) · S stun (reads **I**). Weapon **n**P pierces n of the target's Protection; armor **A** absorbs 1 damage; **no rating in a type = no protection**.
**Hit location:** roll D10, or call the shot for an up-front EF penalty (covers cover, too).

## Combat (sequence)

1. **Awareness → Initiative.** Surprised → Startled → Alert → Ready → Lying-in-wait; modify for big factors (can't see = bad). Sets the roll.
2. **Declare best → worst Init** (ties by Score): each chooses **Act** or **Wait**. Waiting *persists* across rounds — the unaware get no declaration turn 1 (ambush!).
3. **React / pre-empt:** a waiter reacting may go just after — or **pre-empt** (Coordination roll modified by Initiative QR, ties by Init Score) to go just before. *Nobody is ever certain they act first.*
4. **Your turn:** one **Primary** + one **Secondary** action (no AP budget; throughput = skill & body).
5. **Reactions** (parry/dodge/flinch/cover): unlimited, **cumulative −2 each**.

*Round ≈ 3–5 s (longer for vehicles). Spread attacks — a hurt/stunned foe is far less dangerous than a dead-or-healthy one.*

## Wounds, Stun & Exhaustion

**Wound level** 0→6 (4 incapacitated · 5 dying · 6 dead); **−(level) to everything**. New damage adds on. Pain Resistance (WP) on a hit → shrug / **Shaken** (−2, one action) / **Stunned** (only recover-from-stun; QR1 clears, QR10 KO).
**Convalescence:** roll WP at the level's interval (Light daily, Med 5d, Heavy 20d, Incapacitated daily, Dying every few minutes — and *deteriorating*) — success drops a level, QR10 raises; worst-level penalty until healed/treated.

**Exhaustion** (fatigue, mana, etc.): hard exertion → WP check, fail = **+1 level**. **Full** penalty to its own domain, **half** to all else — *except fatigue, which is full against everything*; tracks **stack** (round half **away from zero**). Clears by **rest, one level at a time** — depth 1 = breather, 2 = long break, 3 = sleep, 4 = near-coma, 5+ = intervention. 4+ converts to wounds.

**Power pools** (Mana/Piety/Spirit): gather roll → success = free · marginal/fail = +1 exhaustion · QR10 = fizzle + exhaustion. **Push it:** take a level for a one-off **+4**.
