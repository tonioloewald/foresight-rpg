I read all five files and nothing else. The rule below is my reconstruction; the pages call the missing page **Exhaustion** (`damage.md` links to `/exhaustion/` twice).

## The rule I would expect

**The track.** Exhaustion is a second 0–6 track parallel to wounds, and each level is −(level) EF to everything you do.

| Lvl | State | Effect |
|---|---|---|
| 0 | Fresh | — |
| 1 | Winded | −1 |
| 2 | Tired | −2 |
| 3 | Weary | −3 |
| 4 | Spent | −4; roll WP each turn to do anything at all |
| 5 | Collapsed | helpless; continued stress now does wounds |
| 6 | — | no sixth exhaustion level; overflow becomes wound levels 1:1 |

**Stacking.** Wound and exhaustion penalties add: Medium wound plus Tired is −4.

**Voluntary exertion (sprinting, a fight, a forced march, a night without sleep).**
- **When:** roll once at the end of each stretch of exertion, never per beat. A stretch is a fight, an hour of hard labour or a day's march.
- **Roll:** Endurance or Willpower, player's choice, raw attribute, BEF 5.
- **Modifiers:**
  - the Challenge table for the effort: hard pace −1, flat-out −3;
  - load: −1 encumbered, −3 heavily laden;
  - conditions (heat, cold, altitude): −1 to −3;
  - your current wound and exhaustion levels;
  - −1 for each consecutive stretch without rest.
- **What the dice decide:**
  - QR1: no level, and you shed one if you have any (second wind).
  - QR2–4: no level gained.
  - QR7: +1 level.
  - QR10: +2 levels, and you must stop now.

**Imposed exhaustion (sedatives, sapping toxins, exposure, thirst).**
- The stressor has a DC and a clock.
- Levels = Yield × DC × ½, rounded down, with Yield from the stressor's QR (random D10 QR when nothing is opposed).
- The victim's resist roll is opposed to it; a better resist QR means nothing gets through.
- The ¼-level floor carries over: raw ≥ ¼ that rounds to zero forces a WP roll or you are Shaken (−2, one action).

**Pushing.** You may take +1 exhaustion level voluntarily for +1 EF on one task. The level lands after the roll.

**Recovery.** Rest for the interval, then roll Endurance or WP, with a penalty equal to the worst exhaustion level since you were last Fresh. Success drops one level, QR1 drops two, and QR10 means no recovery and the interval repeats.

| Lvl | Roll every |
|---|---|
| 1 | 10 minutes of rest |
| 2 | 1 hour |
| 3 | a night's sleep |
| 4 | a day |
| 5 | a day, and only with care (water, warmth, food) |

Food, water, shelter and stimulants give +1 to +3. Removing the cause is a precondition: you do not recover from thirst without water.

## Confident versus guessing

**Confident, because the pages nearly say it:**
- **Exhaustion is measured in levels on the wound scale.** `damage.md` says a poison's DC "applies as wounds (or… as exhaustion)", so one formula produces both.
- **It is a level penalty to EF.** Every lasting condition in these pages works that way.
- **Imposed exhaustion uses DC × Yield and the random-QR table.** `damage.md` says "the same machine handles the slow killers".
- **Rolls are raw attributes, not skills.** Pain resistance is explicitly "not a skill".
- **Exhaustion eventually becomes wounds.** Exposure "meters as exhaustion rather than wounds until it turns lethal".
- **It is not charged per action in combat.** `intense-action.md` says only two things stop you (the ladder and QR10) and "neither needs bookkeeping".

**Guessing:**
- Every interval in the recovery table; I only copied the shape of the convalescence table.
- The QR7 = +1 and QR10 = +2 outcomes for voluntary exertion.
- The second wind on QR1.
- The whole pushing rule; nothing in the pages supports it beyond the general taste for trade-offs.
- That level 4 copies Incapacitated's WP-to-act rule.
- That overflow converts 1:1 at level 5 rather than at some other threshold.
- The size of the load and consecutive-stretch modifiers.

## What the missing page must tell me

- **One track or two.** Whether exhaustion shares the wound number or has its own, and whether the penalties add.
- **The trigger for voluntary exertion.** What counts as a stretch, and whether ordinary combat costs anything at all.
- **How "resists… and what gets through" works.** The pages do not say whether the resist QR cancels the stressor, subtracts from it or acts as Protection. I expected the Opposed Resolution page (the "blocking table" cited in `quality-ratings.md`) to answer this.
- **Which attribute.** The BEF of Endurance and WP is given only as "usually around 5".
- **The top of the track.** What levels 4–6 mean, and the conversion rate to wounds.
- **Recovery.** The intervals, whether rest needs a roll, and whether the worst-level penalty carries over.
- **Whether the ¼ stun floor has an exhaustion analogue.**

## Where the core rules point two ways

1. **Endurance/WP versus "ST".** `damage.md` says toughness rolls "throughout" are Endurance or Willpower, player's choice, then has poison and disease resisted by "a ST roll". ST is never defined, and the only S-attribute named is Strength. Either ST is a third toughness attribute or the "throughout" claim is wrong.
2. **Yield versus pass/fail.** The slow-killers paragraph implies exhaustion arrives as Yield × DC × ½. Exertion you choose has no natural DC or attacker, which suggests a plain Endurance roll. I used both, which is exactly the two-mechanism split the game claims to avoid.
3. **Stack or pay once.** "−(level) to everything… blood loss doesn't care" argues for adding the tracks. "Never pay twice" argues for taking the worse one, since blood loss is already priced in the wound level.
4. **The death spiral.** If exhaustion penalises everything, it penalises the roll that resists more exhaustion. Convalescence's worst-level penalty is a precedent for this, but "never penalize the same choice twice" reads against it.
5. **No bookkeeping versus a track.** `intense-action.md` boasts that nothing caps your beats, yet a fatigue rule is the obvious thing that would. Either combat is exempt or that page overstates.
6. **Shaken/Stunned versus levels.** Temporary states "leave no lasting level". Being winded could be one of those rather than level 1, which would shift the whole track down.

## Files read and isolation

- `00-READ-THIS-FIRST.md`
- `the-one-rule.md`
- `quality-ratings.md`
- `damage.md`
- `intense-action.md`

I ran one directory listing and read those files; I did no search, web or filesystem access outside the directory, and followed none of the in-page links (`/exhaustion/`, `/initiative/`, `/pursuit/`, `/quirks/`, `/fire-combat/`, `/melee-combat/`).

Three things outside the directory were in my context, and none was used:
- Session metadata: your email address, the date, and the path of an empty memory directory that I did not open.
- Tool and connector listings.
- The pages themselves name the game (ForeSight) and cite James Bond 007, RuneQuest and Savage Worlds. I drew on no outside knowledge of any of them; every number above is derived from these pages or invented and flagged as such.
