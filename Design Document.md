# ForeSight — New Edition Design Document

*Status: working draft, 2026-06-12. Captures decisions from initial design discussion.*

## Goal

A streamlined, updated edition of ForeSight built on the unpublished 2004 2nd edition draft (primary text source) and the 1986 original (tone, and anything 2004 dropped), with combat and several simplifications drawn from ForePlay (2015, the "ForeSight Lite" experiment). The benchmark for accessibility is the original tournament one-pager: a player who has never seen the system should be playing in minutes.

**Source hierarchy, sharpened (2026-07-17).** The rules *derive* from 2004 — text, structure, terminology — as amended by the decided simplifications below. 1986 is a **content quarry**: mine it for what 2004 dropped and for tone, but assume anything drawn from it needs revision and updating. The asymmetry to keep in mind is that the two drafts fail in opposite directions: **2004 is edited, modernized and proofread but was never playtested; 1986 shipped and got played.** So 2004 winning the *prose* is uncontroversial, while 2004 winning a *number* is an untested intention overriding table evidence. Where they disagree on a number or a probability, that is a calibration question for REVIEW.md, not a default.

## First principle (the thesis)

**Keep mechanics simple, but push the probabilities in the right general direction with the right general magnitude — and let the results speak for themselves.** ForeSight does not chase precise simulation. It chases *believable* outcomes from *memorable* rules: a handful of common-sense ease-factor modifiers, one resolution rule, and outcomes whose likelihoods lean the way reality leans. Everything below serves this. When a choice is between mechanical fidelity and a rule you can run from memory that still points the right way, choose the latter. The emergent behaviors this produces — combat that rewards suppression over focus-fire, snipers who can't be certain they'll fire first, armor that's worth wearing — are evidence the approach works, not features that were each separately engineered.

**Companion principle — transparency.** ForeSight must not color the setting it's used for. *The setting viewed through ForeSight is just the setting.* Rules are adaptable *to* a world, never grafted *onto* it (this is why the game is genre-agnostic). The practical test: any rule with a setting-level consequence — an ability everyone would take, a power that implies a whole class of people, an economy a price list assumes — must make that consequence **explicit**, so the GM chooses their world rather than inheriting one by accident. Hidden world-shaping is the cardinal sin; the strong-but-declared is fine.

This litmus test has driven every refinement of ForeSight for decades, and the family history maps the two ways to fail it. **ForeSight Enhanced (FSE)** overshot into complexity — it went explosively in the wrong direction and is being ignored entirely. **ForePlay** overshot the other way into minimalism — it abandoned Score × EF and collapsed the attributes, losing too much grain — but in the process it produced the **most refined combat sequence** of any version. The new edition aims for the saddle point between those failures: hence we lift ForePlay's combat/initiative sequence wholesale while discarding its dice and its four-attribute model, and keep the proven 2004 chassis everywhere else.

## Load-bearing — do not touch

**Score × Ease Factor resolution.** SC = Score × EF, roll D100 under. Playtested to death; works well in the middle of the probability range and acceptably at the edges, which alternative systems (including a clever-dice-math replacement engine that was actually built and tried) do not. Sacred.

**Wound levels** as the model for status effects. Good enough for the most important status effect in the game, therefore the template for the others (see Exhaustion below).

**The 2004 modifications system**, including treating NPCs as modifiable objects. Extended rather than trimmed — see Background Factors below.

**Fields of Knowledge.** Survive as a concept but kept simple. Load-bearing for game balance: skills like Theory and magical spellcasting collapse the game balance once characters get good, unless gated by fields.

**Quality Ratings.** Incredibly well tested. Not great at the extreme end (the super-soldier always scores bullseyes — though that's arguably more realistic than the alternatives) but works better in the central band (fairly good people trying fairly hard things) than anything else tried. QR levels stand in for ForePlay's margin-based critical levels wherever the combat port needs them.

**The damage model** (2004: damage classes, wound levels, hit location). Proven. ForePlay's Toughness/Shaken model was calibrated for the open D10 probability system, which didn't work in practice, and doesn't come along.

**Magic's two-step structure** (gather mana, then weave). Gather is the roll that can cause exhaustion; weave difficulty is driven by spell complexity (vs. size). Well balanced as is; do not collapse into one roll.

**Merit Points** — but correctly understood: they are progression/regression in social structures (how much faction A likes you, how badly the police want you in prison), not a luck currency. Hero-point "chips" are a separate, unnecessary mechanic for most games — ForeSight already has it in an appendix and it never got used. Cut.

## Decided simplifications

1. **Attributes: one number.** No inherent vs. trained values. Attributes are markedly more expensive beyond 12.

2. **One point currency.** No separate character points vs. experience points. Just points.

3. **Background factors are skill blocks** (with options in some cases), with a simple rule for overlapping skills gained from multiple sources (exact form TBD — candidate: take the better, +1). Field Experience may become a set of skill bonuses. Conceptually, background factors are *player character modifications* — same machinery as item/NPC mods.

4. **Pools become exhaustion levels.** Fatigue and mana stop being point pools and become wound-style levels. Tiring activity → EN check, failure causes exhaustion; mana-intensive activity → WP check (the existing gather-mana roll), failure causes exhaustion. Levels stack like wounds; recovery requires rest and rolls. Mana exhaustion penalizes mana-based skills; fatigue penalizes physical activity heavily and everything else somewhat. Rationale: in practice players conveniently forget to track pools; exhaustion checks produce good effects and can't be ducked. Magnitude of effort is a check modifier, not extra rolls.

5. **Delete gravity/environment/temperature familiarity tables.** G/E/T become flagship *examples* of long-term familiarity and unfamiliarity, not subsystems.

6. **Attribute consolidation: nine → seven. Final set: ST, EN, CO, IN, PC, WP, AP.**

   DX + AG merge into **Coordination**; remarkable agility or prestidigitation become talents. **EM folds into PC**, with empathy variation as a quirk — empathy is essentially perception of people, possibly handicapped (or sharpened) by neurotype, so PC is the right default and a quirk models the deviation (the way exceptional eyesight or deafness sit on top of PC). **AP stays** — the idea that looks aren't important is a conceit; a good-looking person can do things an ugly person can't, just as surely as an agile or smart person can. Pretending otherwise violates the game's founding principle (no truths denied by the system).

   The test that separates these cases: **attributes are for independent capabilities; quirks are for deviations from a correlated default.** AP correlates with nothing (you can be weak, stupid, clumsy, and gorgeous), so it must be an attribute. EM correlates strongly with PC, so it's a default plus deviations. The test cuts both ways: we don't want eyesight or left-hand coordination becoming attributes either — sub-capabilities stay quirks, independent capabilities stay attributes.

   Anti-pattern to avoid: replacing attributes with a bunch of special-case modifiers makes the game *more* complex while seeming simpler. GURPS is the huge example — four attributes plus so many special-case faux attributes that the count doesn't matter, and it still ends up making any Nobel-prize-winning scientist an expert scuba diver. Attributes should carry real weight; talents/quirks are for genuine edge cases, not attribute replacements. Corollary: keep skills costed independently of attributes (ForeSight already does) so high attributes don't make polymaths automatic.

   Guiding heuristic for everything else: almost every bad idea in ForeSight came from accepting a bad idea from a previous game (usually James Bond 007) — audit anything inherited.

7. **Combat: ForePlay's initiative/action model only, ported to Score × EF.** ForePlay's resolution and damage mechanics are a blind alley — ditch them. What survives is the awareness-based structure, extensible beyond combat.

   The design principle (why action points failed): ForeSight's action-point budgets had too big an impact. The basic division is (1) *who has situational awareness?* and (2) *who acts first?* How much you can do is determined by the limits of the human body and of skill, not by a budget. Very high firearms skill means pulling the trigger fast, independent of agility; a magician who is superb at weaving isn't slowed down by being a shitty dancer. Coordination helps *at the margin* with pre-emption; situational awareness is driven by PC + IN + combat experience + paying attention to the correct thing.

   **The settled combat model (one-pager target):**
   - **Awareness state** drives the Initiative roll, coarse-grained. ForeSight's real strength is the *transition* from narrative play to "shit going down": characters span a spectrum from totally surprised (woken by a sudden attack) to fully aware (an ambusher lying in wait). Big effects modify it (visored helmet = disadvantage; a sniper observing the scene in safety = advantage). Once the fight is live, awareness tends to level out to simple things — e.g. whether you can see.
   - **Declaration order:** best to worst Initiative, ties resolved by score. On your declaration you choose to **act** or to **wait**.
   - **Waiting persists:** anyone still waiting from the previous turn remains waiting until their declaration comes up again. The totally unaware probably get no declaration at all on turn 1 — which is exactly why ambushes are devastating.
   - **Reaction & pre-emption:** when a waiter reacts to something happening (typically someone acting), they may act immediately *after* it — or attempt to **pre-empt** and go just *before*. Pre-emption is a **Coordination roll modified by the Initiative QR**, ties resolved by Initiative Score. (Reflexes do the work; awareness biases the odds — no good having lightning reflexes if you're confused or unaware — but it's still a roll, so even a superbly coordinated, well-positioned sniper retains a lot of uncertainty.) Success → you go just before; failure → you go just after. Pre-emption can itself be pre-empted (counter-sniper), but this is rare. *(This is deliberately handling the nastiest edge cases in combat — ones that vastly more complex systems like Aftermath never even attempted.)*
   - **Turn length is elastic, set by the tempo of the contest — not a fixed number.** Direct personal combat is a ballpark 3–5s per turn, punctuated by random-duration periods of downtime (hiding behind cover, recovering your breath). Vehicle pursuits run longer turns with opportunities for direct attack further apart, and the length scales with the vehicle: sailing boats have much longer turns than fighter jets. The GM sets the tempo to fit the scene.
   - **Turn cadence:** the model of a turn is a fencer advancing–attacking–retreating, or a shooter popping out from cover–firing–pulling back. **Primary action** is the thing you concentrate on (often an attack). **Secondary actions** are positional or advantage-setting (pop up, aim) — with real tradeoffs (pop up and fire and you're still partially exposed).
   - **Reactions** (parries, dodges, flinches, ducking back to cover) are *not* a finite pool — they carry **cumulative penalties** (keep parrying and you just get worse and worse at it). Dodging-and-giving-ground grants a one-off advantage, which makes melee maneuver organically — something essentially no other TTRPG (or even most video-game RPGs) achieves.

   **The central design truth (why these scenarios work):** the actor *never knows for certain they will act first*. They can be pretty sure, but not certain. This single fact is what makes ForeSight's combat work where others fail. The driving gedanken experiments were always: the Western shootout; the Western shootout with a dastardly sniper; the Iai duel; the hostage situation. None of these resolve correctly in any other TTRPG, because removing the uncertainty collapses every one of them into "highest number goes first." In ForeSight the police sniper in a hostage standoff is *correctly* loath to just shoot the hostage-taker's sniper — because he can't be sure he'll resolve first, and the rules make that hesitation rational. The probability arrows, given situation and circumstance, all point in the right direction — which is about as much as any general simulation can hope to manage.
   - Each round, characters are **Unaware, Active, or Reactive**. Active characters try to get the first blow in; Reactive characters declare a **trigger event** and act in response to it (if they notice it). All-Reactive standoffs are a feature ("the two samurai circled each other warily…").
   - **Pre-emption:** when an Active character's action triggers a Reactive one, the simpler action type resolves first (Minor before Secondary before Main); ties go to initiative. Initiative: Active rolls reflexes/initiative, Reactive rolls perception.
   - **Turns = Main + Secondary + Minor action** (each downgradable). Sprint consumes the whole turn. No "free actions" — it's either of no consequence or it's not free.
   - **Unlimited reactions, cumulative cost:** parry/dodge/opportunity attacks as often as you like between turns at a cumulative –2 each.
   - Stance & balance; grappling as three levels of advantage (partially restrained / restrained / completely restrained, or "control" when fighting over an object).

7a. **Combat reduces to two load-bearing ideas: Initiative and Simultaneous Action.** (2026-07-17.)

   Everything in combat answers one of two questions, and the pair is exhaustive:

   - **Initiative** — *when* do you act? Order of action, pre-emption, and the **quantizing of activity** into rounds.
   - **Simultaneous Action** — *how much* do you get to do in that quantum, and *how well*?

   These are duals, and that's the point: Initiative cuts time into quanta, and Simultaneous Action prices what you cram into one. Naming them separately is what lets the second one exist at all — "how much can you do at once" is meaningless without a window to measure it against.

   **The rule:** every task takes **−1 for each *other* task attempted, −1 more for each task ranked above it** — i.e. task *i* of *n* is at −(n−1)−(i−1). One thing: 0. Two: −1/−2. Three: −2/−3/−4. Read as an ease factor hit or as reduced yield, per the usual one-column rule.

   **Why this shape:**

   - **It's not a new subsystem — it's the reaction ladder generalized.** The old rule ("reactions stack a cumulative −2") is the same ladder seen edge-on: with k reactions, the k-th is at −2k under either formulation. The magnitudes were therefore already table-calibrated; the only genuinely new claim is that *your primary also pays for your distraction*. A generalization that deletes an existing rule rather than adding one is the right kind.
   - **The spotter falls out; no assistance rule is needed.** A sniper ranging his own shot and firing is n=2 (shot at −1); hand the ranging to a spotter and he's n=1, at 0. The +1 is *derived*. This also caps help at your own focused best (n bottoms out at 1), so assistance can't be stacked, and it prices a helper by exactly what they take — a helper who takes nothing gives nothing. A helper whose *data is better than yours* is a separate, ordinary situational EF bonus (same family as aimed/braced); that's where a second point comes from.
   - **n counts attention, not activity — and it self-polices.** A task is *a thing you want rolled*. Nothing else counts, so advance–attack–retreat stays a single unpenalized task and the baseline doesn't silently become −1 (which would just rename the baseline and make the −1 do no work). It needs no GM adjudication: decline to make your movement a task and you simply move, noisily, and eat it. This preserves 2004's "secondary actions" as the common case where the secondary wants no roll, and preserves "no free actions" — consequence and attention are different currencies.
   - **It must not double-charge**, per the standing principle. The ladder owns the cost of dividing your *own* attention; situational EF describes only the *world* (range, cover, light, the target's movement). Shooting on the move pays −1 on the ladder and takes no additional "firing on the move" modifier.
   - **The floor does real work.** From a typical BEF 5 at Score 15, n=3 gives EF 3/2/1 → 45%/30%/15% — playable. The cliff only appears when the situation has *already* pushed you under EF 1, where only three rungs remain (½, ¼, 0). Clarice Starling in Buffalo Bill's basement — locate him, keep the gun on target, move quietly, in the dark — lands on 0 across the board, and that is the correct answer: she survives because he cocks the revolver, not because she rolled. The n=3 tier is mostly a **deterrent**; its job is to make "stop moving, drop the flashlight" the smart play.

   **Open question — retroactivity (needs playtest).** −(n−1) requires knowing n *up front*, but reactions arrive after you've already rolled your primary: attack at n=1 (no penalty), get forced into two parries, and the attack should retroactively have been at −2. Unworkable at the table. **Resolution adopted:** tasks you *declare together* share the cost on the ladder; an *unplanned* reaction pays the flat cumulative −2 it always has. So **the parry you saw coming is cheaper than the parry you didn't** — which is thematically right, keeps reactions unlimited, and hands another real reward to declaring a wait with a trigger, reinforcing the act-or-wait spine of the initiative system. This is a split between planned and unplanned attention, not a full unification; whether the two rates want to be reconciled further is a table question.

8. **Magic & religion come forward.** HindSight's arcane magic and religion (piety, intervention, priests & avatars) systems are carried into the new framework, rebuilt on the new chassis: gather mana (the exhaustion-triggering roll) then weave (difficulty driven by spell complexity, not size); piety/divine power likewise. ForePlay's power-pool roll semantics are the model: success = power works free and clear; failure = works but causes exhaustion; critical failure = fizzles *and* exhausts. Mystic disciplines and psionics remain underdeveloped legacy material — defer or cut.

9. **Character creation in minutes.** Base templates that take 3–7 background factors (plus quirks etc.). Fast path: template + ~3 picks and you're playing. Full tweaking available once players know the rules. ForePlay's Pasts/Perks/Flaws/Quirks tables and NPC archetype + modification tables are the raw material.

10. **Equipment tables updated.** ForeSight's and HindSight's equipment tables brought forward and refreshed. ForePlay's compact stat blocks (weapons: attack/parry/damage/reach; armor: protection with damage-type annotations plus perception/dexterity/agility costs; vehicles: cruise/max/terrain/accelerate/turn/redline) are a good model for presentation density.

11. **Broad skills, differentiated by familiarity.** Merge narrow skill splits where the underlying competence is one thing — e.g. handguns + longarms become Firearms, with a familiarity covering the gap if needed. (Same machinery as strategy 5: familiarities absorb what used to be subsystems and skill splits.)

## Direction — settings-as-configuration + the one-pager spine (2026-07-22)

Author brain-dump; **direction, not all finalized**. Numbers below marked *proposed* need a drafting/playtest pass and are grounded in **`legacy/foresight2004/ForeSight 2004 v48.pdf`** (with `Ch-i 2004 v2.pdf`, `Resolution_Table_v2.pdf`) — 2004 over 1986, per the source hierarchy.

### A. Settings as configuration

A **configuration page** lets the reader/GM pick a *setting* and have the rules, tables, and character sheet reshape to it. The setting is a level chosen on each of several **axes**:

- **Technology** — a tech level (finer-grained options later).
- **Magic** — none · rare-weak · rare · common-weak · common.
- **Ch'i / Mystic Disciplines** — none · rare · common · common + weaving.
- **Psionics** — none · rare · common-weak · common.
- **Divine Magic** — none · rare-weak · common-weak · common.

**Data-model implication (the load-bearing part):** this generalizes the flat genre `tags` we have now. Genre tags (`standard/ancient/modern/sf/fantasy`) answer *"does this fit the vibe?"*; the axes answer *"can this exist here?"* — a different question, so **keep them orthogonal**. Each entity gains a **capability requirement**: a threshold on the relevant axis (a fireball needs Magic ≥ some level; a laser needs Tech ≥ some level; a psi power needs Psionics ≥ rare). The rare/weak/common "strength" words are just ordinal levels on an axis, and a requirement is a threshold — which is what finally gives those strength words a principled home.

**Rendering is context-dependent, not one switch:** in **rules prose**, an off subsystem shows a **placeholder** ("Magic is not available in this setting") — the reader should know the subsystem exists and is disabled, and can flip it on. In **tables and the character sheet**, unavailable content is **filtered out silently** — don't clutter with options you can't take.

**Book vs interactive** (the project's recurring tension): the config page is a *web* feature. The ePub/PDF is built for **one** setting (default: everything on). So the config page is the front-end of the **setting/campaign** model — a "setting" is a saved configuration; a GM's campaign book is generated for their setting. This is the concrete first step of the Firestore/campaign roadmap (base → GM/community → per-campaign), not a detour.

**Open:** exact level-sets per axis; whether a setting is a per-reader preference (localStorage, like today's tag toggles), a per-campaign fixed config, or both (likely: site default = all-on, reader may filter, campaign/book = fixed); how finely Tech subdivides.

### B. The one-pager spine (mechanical core)

Consolidate the mechanical core into five one-pagers, replacing today's sprawl (`the-one-rule` / `combat` / `damage` / `wounds-and-recovery` / `power-pools` / `quality-ratings` / `open-ended-resolution`). **Authoring rule for each: the core rule is ≤ 1 page; the examples and extra cases run longer but are there as *examples of applying the idea*, never ceremony or flowchart procedures.** (This is the thesis, made into a house style.)

1. **One Rule** — resolution: SC × EF, how EFs work, competence-at-a-glance, challenge-at-a-glance, QRs & yield, speed, opposed resolution. Examples: lockpicking, repair, hot-rodding, persuasion, pickpocketing, sneaking. Plus **random QR** (poison, environmental damage, or any time you just need a QR with no opposed roll).
2. **Initiative** — who goes first, who knows what when, pre-emption. Examples: combat, business machinations, legal battle, car chase.
3. **Damage** — **Drafted 2026-07-27** (`damage.md`; consolidated the old `damage.md` + `wounds-and-recovery.md`). **6 wound levels; 6 = dead**, level = −(level) to all activity, **4 = incapacitated, 5 = dying without intervention**. **Damage (wound levels) = Yield × DC × ½, rounded down; raw damage ≥ ¼ forces a stun check** (EN/WP → shrug / Shaken / Stunned). Armor Protection (subtract from DC; DC<0 harmless) with P-pierce / A-absorb; hit location (D10 or called-shot penalty); damage types M/I/B; Damage Scale; recovery + relapse (convalescence rolls, worst-level penalty, medical care); poison, disease/infection, environmental. CLAUDE.md's old "0→8" line corrected.
4. **Exhaustion** — **Drafted 2026-07-27** (`exhaustion.md`; consolidated `power-pools.md`). One framework for **fatigue / magic / divine favour**, parallel to wounds but shorter (0–5) and cleared by rest not rolls. Level = modifier to all *related* activity, **domain-weighted** (full to own domain, half to others, tracks stack) — **fatigue is the exception and hits everything**; **4 = incapacitated, 5 = collapsed and may die**. Caused by taxing effort — an EN/WP check: success is fine, marginal/failure costs a level, some efforts cost one automatically. Recovery: one level at a time, deepest first — **L1 breather; L2 real rest → L1; L3 a good night's sleep → L2**; past 3, checks or it converts to wounds. **Magic by default is just fatigue** (mana-poor/rich = a cost modifier), or its own Mana track if a setting wants it separate; gather-then-weave, gather QR meters the level, volunteer a level for +4. **Divine favour** is spent in the moment but gated by **Piety** — a *skill* driven by **deeds, not experience**, earned back by devotion, not sleep. (Extends decided-simplification #4 and #8.)
5. **Intense Action** — *§7a's "Simultaneous Action," refined and renamed.* **Drafted 2026-07-24** (`intense-action.md`); `combat.md` split into `initiative.md` + `intense-action.md`. Trying to do everything at once across three tiers — **primary / secondary / automatic-reflex** — and the modifier is how you spread attention: the ladder still reads **one thing 0, two −1/−2, three −2/−3/−4**. Added: **concentrate** (go all-in on one thing → a positive modifier, at a **penalty to your automatic/reflex** actions — the sniper's tunnel vision); a secondary can take **⅓–½ effectiveness** instead of −2 (movement); **promote** a reflex → secondary **+1**, primary **+2** (the sniper who makes *noticing* his primary is +2 to spot); and **a secondary cannot pre-empt** (ties to Initiative). **§7a reconciled:** the one-thing baseline stays **0** — concentrate is an *over-commit option* that trades reflex-attention for a bonus, so it *extends* the ladder rather than shifting its baseline.

## Open questions

- Exact overlap rule for duplicated skills from background factors.
- Exhaustion trigger list and death-spiral calibration (ForePlay's calibration: tired after sustained activity, short rest + EN check to recover, –2 per missed break, 4+ levels can kill; full rest clears three levels, short rest one; multiple exhaustion types share the rest budget).
- Fate of Ch'i: it is now the chosen basis for **Mystic Disciplines** (the HindSight mystic version is dumped).

## Structural principle: one-pager per concept

Every major rules concept gets **one page** (a "one-pager"). This is the forcing function for the whole edition. It's achievable precisely because EF/QR does the heavy lifting: each one-pager is essentially "the ease-factor modifiers that matter for X" + "what the QR yields for X" + a worked example. None of it needs memorization — it's common sense plus modifiers. If a concept can't fit on a page, it's either two concepts or it's over-designed.

Planned one-pagers (each its own concept):

- **Equipment** — root object + modifiers, with specialized variants: vehicles, weapons, armor, tools, and the minimal "other stuff." **Spacecraft are just vehicles** — the brilliant-but-useless 1e space-combat system is dumped entirely. Vehicle base types + modifiers should stay simple; **add an electrification tech stratum** (≈TL6) for vehicles (EVs, hybrids, electric propulsion).
  - **Equipment design method:** object = **basic object (noun) + modifications (adjectives)** — no "headword/lemma" jargon; modifiers front-load as spoken ("cut-down pistol," not "pistol + cut-down"). Divide into categories; find and eliminate duplicate basic objects; where a "second" object is really a variant, express it as adjective-on-noun (carbine = compact rifle; **cut-down** = the one adjective covering both sawn-off shotgun and snub-nose revolver). Then **alphabetize** within each category and give **absolutely minimal descriptions** — but descriptions that actually say what the thing *is* and *why you'd want one* (anti-pattern: D&D never told us what a 10′ pole was for). Tie "can this culture make it?" back to its Social/Legal TL (possess vs. originate).
- **The SVU** (sub-one-pager, drafted) — Standard Value Unit, from Jack Vance; = fair pay for an hour of unskilled labor ≈ price of a Big Mac meal (Big Mac Index), ≈ US$10 now; 100 cents to the svu. A value yardstick, not a currency, so one price list serves every setting.
- **Tech Levels** — single TL number is shorthand for several **threads of technology** (materials, power, information, transport, medicine, weapons, manufacturing) that, *for us*, advanced in rough lockstep — but needn't for alien or fantasy civilizations (e.g. magic substituting for one thread, or a culture that never invented firearms). 1986 anchors: TL5 ≈ 1980, TL4 ≈ 1900, TL3 ≈ 1500. Now finer-grained: **we are at TL6** (information/digital/electrification); fusion looks like ~TL6.5, modular nuclear / thorium ~TL6.25 (quarter-level grain available as a tool). Key corrections from 1985: **information tech progressed far faster than originally assumed** (itself a real-world example of threads decoupling), and **no FTL is presupposed** by the default scale.
- **NPCs** — nouns + modifiers (archetype + modifications; "instant NPC" in one move).
- **Combat** — situational awareness; acting vs. waiting; reaction & pre-emption; primary vs. secondary action when you act. *(Needs a design conversation before drafting — see below.)*
- **Damage** (the proven 2004 damage-class model).
- **Wounds & recovery; power-pool exhaustion & recovery** (one-pager — both are the same wound-level mechanism).
- **Pursuit** — just combat with extra vehicle-control actions (quick turn, sudden reverse, flat out, raise the stakes, force maneuver). The GM provides the opportunity and the range (no turn available where there's nowhere to turn). Typical goals: lose the pursuer, gain on the pursued, wrong-foot, or incapacitate the vehicle. Vehicle modifiers (accelerate/turn/redline) feed the maneuver EFs. Spacecraft included — they're just vehicles.
- **QR yield factors** — stealth, lockpicking, and the like: what a given QR buys you.
- **Opposed resolution** — tennis, gambling, chess, stock-market manipulation.
- **Travel & wilderness encounters.**
- **Interpersonal interaction** — persuasion, seduction, negotiation, interrogation.
- **Magic** (HindSight, simplified presentation: spells become nouns + modifiers). **Balance caution:** magic is *not* to be folded into one cheap skill. **RESOLVED — magic is two skills: `Mana` (the power pool / gather) + `Incantation` (the casting/weave).** The old four-skill set (Mana, Incantation, Ritual, Casting) collapses: **Ritual** (slow, prepared casting) and ultra-fast snap-casting become **time/EF trade-offs on Incantation**, not separate skills — slow & prepared buys a bonus, haste pays a penalty. This costs no realized balance: in actual play Casting was too expensive for anyone to buy and most Incantation users never bothered with Ritual, so the balance always lived in Mana + Incantation. Keep those two **expensive and Talent-gated**.

  **Fundamentals — Basic vs. Advanced (provisional, will do for now).** Magical knowledge is organised into *fundamentals*, each a field of knowledge split into two tiers that slot into the fields hierarchy: a **Basic** fundamental covers all effects up to **intensity (complexity) 1**; the **Advanced** fundamental covers everything beyond. Basic = shallow/cheap, Advanced = deep/expensive — the same broad-to-specific gating as ordinary fields, and the primary lever pacing magical power.

  **The 23 fundamentals (final set).** Abeyance, Air, Apportation, Cancellation, Communication, Compulsion, Dimension *(was Expansion + Extension)*, Divination, Earth, Emotion *(was Emotions)*, Essence *(was Instil + Tap — taking effects are one complexity level harder than the matching giving effect; giving is easier than taking)*, Fire, Form *(was Shaping)*, Image *(was Images)*, Sandestin, Scent *(was Odours & Tastes)*, Sense *(was Perception)*, Sound *(was Sounds)*, Summon, Time, Touch *(was Tactile Sensations)*, Water, Wood. Each has a **Basic** tier (effects to complexity 1) and an **Advanced** tier. Data: `docs/data/magic-fundamentals.json`.

  **Effect control modes (a property of each application).** How an effect behaves once cast:
  - **Controlled** — the *caster* owns the spell. A target or object receives the effect, but the caster sustains it, can switch it off, and it lapses if the subject leaves range. (Cast Fly on an object and you steer it by remote control.)
  - **Bestowed** — the *recipient* owns and controls the effect themselves; it persists independent of the caster and range, freeing the caster.
  - **Fixed** — set running to follow its course without steering; **Immediate** — resolves once, instantly.

  **Bestowal is gated, not a universal modifier.** A bestowed form is offered only per-application, at a designer-set intensity cost (sometimes +1 — e.g. Sense's heightened/replacement senses — often more, often not at all). It is emphatically NOT a blanket "+1 to bestow anything," because for many effects bestowal is badly unbalancing. The cautionary example is **fly-and-die**: if flight can be forced on or granted to someone cheaply, you send a victim straight up until the duration lapses and they fall to their death — so flight and its kin must carry a real game-balance cost. The lesson isn't "bestowal is bad," it's "**forcing/granting potent effects must be priced deliberately, per effect**."

  **Sandestins** are where bestowal earns its keep: you can **bestow effects onto a sandestin** and have *it* control them, freeing the caster to act or maintain other magic. A sandestin is a summoned, bound extra-planar entity; intelligent ones are effectively enslaved and typically malicious, so they exploit **bad or ambiguous commands** (the literal-genie hazard). Commanding them well is its own art.

  **Coercion must never be cheaper than consent (balance rule).** Any effect that moves or controls an *unwilling* subject must be either **resistable at touch range** or implemented as **a grant the recipient controls** — so abusing it can never be easier than its legitimate use. Worked case: the Apportation **Fly** effect (§3A5) can't be a cheap ranged "force-fly," or you get *fly-and-die* for less than the cost of bestowing flight. Weaponizing such effects should demand the elaborate, avoidable route — insert a sandestin into the target, bestow the effect on the sandestin, and command it — which is costly and counterable. This is the general expression of the bestowal-is-gated principle.

  **Conscious targets intrinsically resist direct magical effects (the keystone).** This is the single rule that keeps a generative magic system from collapsing into chaos. Any magical effect that *directly* impacts an **unwilling or unaware conscious** target meets that target's **intrinsic resistance** — an innate defense opposed to the effect (a Willpower-flavored opposed roll against the effect's intensity/QR). So a spell that removes all moisture, or all air, from a region will desiccate or suffocate the environment and objects, but living, conscious beings in it resist the direct lethal impact: you cannot trivially instakill a crowd with a general environmental effect. Notes:
  - It is **intrinsic and passive** — the target needn't be aware or able to act; even an unaware or sleeping victim resists. **Willing** recipients simply don't resist, so beneficial/bestowed effects land freely.
  - It governs **direct** magical impact on the target. *Indirect* consequences (use Earth to drop a real boulder; turn a roof invisible so sunlight falls) are mundane physics resolved by damage/combat, not by this resistance — those are reined in instead by the spell's own complexity gating and GM adjudication.
  - This is the magical face of opposed resolution, and the engine behind "coercion is never cheaper than consent": forcing an effect on the unwilling means beating their resistance, which raises its real cost.

  **Why magic is "grammatical" — and the care that demands.** ForeSight's magic is *generative*: general primitives (the fundamentals' applications) compose into effects, so players invent things no designer enumerated. That creativity is the point — a virtue, not a bug. But composability cuts both ways, and two influences mark the failure modes to design against:
  - *Rolemaster (careless).* Low-level **general** spells — e.g. "remove any or all rock and soil from such-and-such a volume" — let you drop enemies into spiked pits or carve a lethal block out of a ceiling for an instant kill, while the *explicit* combat spells (drop boulders for X damage) were gated to high level. The generality leaked straight past the gating: the cheap general primitive did the expensive combat spell's job, better.
  - *DragonQuest (better, still imperfect).* "Turn an object up to size X invisible" worked on characters with the expected combat handling (you lose invisibility when you attack, à la D&D), but applying it to **inanimate objects and NPCs** opened wonderful and dangerous uses — turn the roof above a vampire invisible and kill it with a shaft of sunlight. Clever, maybe; game-breaking, maybe.

  The lesson: a grammatical spell system must be built *with care*. Keep the generality — reward the clever — but **price and gate each primitive by intensity/complexity** (plus the Basic/Advanced split, coercion-pricing, and bestowal-gating) so that composing cheap primitives can never trivially beat the cost of the "proper" high-complexity effect. Where a clever composition still slips through, **transparency makes it the GM's call**, not a hidden landmine. This is the standing design test for every fundamental and metaspell.

  **Benchmark against the mundane (combat *and* social).** To judge whether a magical effect is balanced, compare it to what an equivalently-invested **mundane specialist** achieves — for combat, a really good **archer**; for social play, a master manipulator, spy, or orator. A competent magician costs **vastly more** than a good archer (the Talent gate, the steep Incantation/Mana costs, expensive fundamentals-as-fields), and magic **always carries risk** (gather failure, exhaustion, backfire, treacherous sandestins). So an effect that lets a magician kill one or two people in a combat turn is **not a problem** — a good archer does as much, and the magician paid far more and ran real risks for it. Two opposite errors to avoid: letting **cheap** magic outclass the mundane specialist (chaos), and **over-nerfing** magic out of fear until the hugely-expensive magician is worse than an archer (pointless). The target: *roughly competitive with — and allowed to modestly exceed —* the mundane benchmark, justified by cost and risk. Socially the same: a Compulsion or Divination effect is fine if it's in line with what a brilliant con artist or spymaster could manage for comparable investment.

  **But social effects need a bigger lens than combat ones — setting-level and economic impact.** Combat lethality is *locally bounded*: a dead foe is one dead foe, and the archer benchmark captures it. A **reliable** social or informational effect, by contrast, **compounds across the entire world**. A dependable **truth detector** (reliable lie-detection via Divination/Emotion) is not merely "as good as a brilliant interrogator" — it is **socially transformative**: it rewrites justice, contracts, diplomacy, espionage, and markets. The same is true of reliable healing, scrying, teleportation, or raising the dead. So judge a social/economic effect by **what the world becomes if it is reliably available**, not by its use in a single scene. This is exactly the transparency principle and the two questions ("why doesn't every court and bank simply employ one?") applied to magic: either the setting genuinely *is* transformed — and the rules and GM own that openly — or the effect must be **unreliable, rare, costly, or resistable** enough that it cannot quietly rewrite society. For world-shaping effects, **reliability and availability are the key dials**, far more than raw power.

  **Price the capability, not its costume.** The subtle trap: a *cheap manifestation* can smuggle in an *expensive capability*. "Make someone glow red when they tell a lie" sounds trivial — and making someone glow red **is** trivial (a low-complexity Light/Image effect). But its real content is **reliable lie detection**, the world-shaping capability above; the glow is just the costume. So always find the capability a composition actually delivers and price and gate **that** (here, a Divination-class effect), never the surface effect. And note the keystone already catches this: detecting an **unwilling** liar's lie is a *direct magical impact on a conscious mind*, so the liar **resists** — which is exactly why "glow when lying" can't quietly become a society-rewriting truth detector. When the visible part of a spell is cheap, that's a flag to look harder at what it really does.

  **The two questions any magic system must answer** (transparently — the answers *are* the setting's texture):
  1. **Why isn't everyone a magician?** → a real *barrier to entry*: rare innate Talent (gated background factor), punishing skill cost, danger, years of study.
  2. **If not everyone is, why don't the magicians run the world?** → a real *ceiling on payoff*: exhaustion that bites, effects powerful but slow / unreliable / costly next to a rifle, plus social, divine, or rival-mage checks on overreach.
  These are the two ends of one lever (barrier to entry + ceiling on payoff). The Mana + Incantation expense and the Mana exhaustion track are how the game answers them; the new chapter must keep answering both — and say plainly what world its answers imply.

  **Magic's costs are playtested, not arbitrary — that's *why* HindSight is the way it is.** The steep prices are empirical balance residue, not first-principles guesses (Incantation ~6–8 per level; the old Ritual was ~cost 20 but is now folded into Incantation as a time/EF trade-off). The new edition should **preserve these hard-won balance points** and modernize only the *presentation* — re-deriving magic costs from scratch would discard decades of table data.
- **Religion** (HindSight) — reframe **Piety as a power pool**: no collecting and spending "intervention points." Instead, asking for divine intervention **exhausts your favor** with the deity (a Piety exhaustion track), and you rebuild it not by resting but through **acts of piety and sacrifice**. Same exhaustion-track machinery as mana/fatigue (full to divine acts, half to other, stacks), but with a themed recovery method — devotion, not sleep. Big interventions may cost favor automatically; "push it" (volunteer exhaustion for a bonus) reads as desperate, demanding prayer.
- **Mystic Disciplines** (Ch'i basis). **Key balance constraint:** the Chi power-pool skill is a **force multiplier on the character's entire skill list**, not a self-contained toolbox like magic. That means it is only balanced if **everyone has it or no one does** — a character with Chi in a party without it is simply better at everything. So Chi is either a **universal layer** of a Chi-flavored setting (all characters have the pool skill) or it's absent; it must never be one player's optional purchase. (Contrast magic, which only benefits the caster and so can safely be limited to some characters.)

  Why the HindSight mystic version is the one being dumped: several of its disciplines were so good as to be **almost mandatory** (one let you recover a wound level just by concentrating). An always-taken ability isn't *automatically* broken — but it quietly **shapes the setting** (now everyone heals by thinking; that's a particular kind of world). The real failure is when a rule does that **invisibly**, handing the GM a world they didn't choose.

  This ties to a core design goal: **transparency.** ForeSight should not color the setting — *the setting viewed through ForeSight is just the setting.* So the heuristic isn't "nerf every must-have." It's: **if a rule has a setting-level effect, that effect must be explicit**, so the GM can decide whether they want that world. If they do, great — leave it in. If not, re-cost it, weaken it, or fold it into the universal baseline. The sin is the hidden consequence, not the strong ability.

## Background Factor model (elaborated)

Background factors work **like skills**: you add them **sequentially as an ordered list, and order matters** — they're a chronological life story, and later factors build on earlier ones.

**Categories & exclusivity.** Each factor has a category: **Species**, **Origin** (childhood/upbringing), **General** (adult life), **Unusual**, **Intrinsic**. Some categories are **mutually exclusive**: one Species (Elf *excludes* Dwarf), one Origin (Abandoned & Self-Sufficient *excludes* Trained from Childhood — you only had one childhood). The tool/rules enforce the exclusions.

**Cost.** Factors carry a point cost:
- **Free** — net-neutral, the pluses and minuses cancel (e.g. **Dwarf**, **Halfling**: racial trade-offs balance out).
- **Costed** — a strict advantage you pay for (e.g. **High Elf**).
- **Granting** — a real disadvantage that *gives* you points (hard origins).

**What a factor confers** — a mix of three things:
1. **Unrestricted points** — spend on anything (the old "General" CPs).
2. **Restricted points** — spendable only within a domain (the old "Education" CPs → fields & academic skills only). *College's points are restricted to skills + fields.*
3. **Specific skills/fields, directly conferred and swappable** — the factor hands you a themed starter set the player may reassign to thematically-appropriate alternatives. *College → Theory, Psychology, Accounting, Business. Apprentice → Repair, Electrical, Plumbing, Carpentry.* Take them as given or swap within the spirit of the factor.

So a factor = (category, exclusivity) + (cost) + (unrestricted pts) + (restricted pts, with domain) + (default specific skills/fields, swappable). This subsumes the playtest pack's flat "skill +N" grants as the special case where everything is pre-spent into specific skills.

## Calibration notes (test these)

**The point economy has shrunk and must be re-tuned by play.** The streamlining cuts how much there is to buy:

- **7 attributes instead of 9** → only ~7/9 (≈78%) as many attribute sinks.
- **Fewer skills (heavy folding) + cheaper skills** → the skill point-sink drops by **at least ~50%**.
- **No familiarities except LTFs and temporary non-familiarities** → the old **E (environment) and G (gravity) familiarity** point-sinks are gone entirely (a sink few players ever bothered with). LTFs (+1 specializations) are now the *only* familiarity you spend points on.
- **Many minor point-buys are now Quirks (or similar)** — handedness, ambidexterity, small edges, unique insights — so they're free/self-canceling color rather than purchases. Simpler, and one more sink removed.

Consequence: an equivalent character now costs far fewer points than in old ForeSight, so **point budgets and background-factor grant sizes must come down to match — or characters will come out overpowered.** This can't be derived on paper; it needs playtesting. Treat the playtest pack's grant magnitudes (and any CP totals) as provisional and watch character power at the table. Any recalibration ripples into background factors, advancement costs, and NPC builds, so re-test after each adjustment.

## Point economy (single currency — no XP)

**There is no separate experience system: everything is points.** The reason isn't only simplicity — long-running campaigns accrue *years of downtime*, which the table handled by simply granting players more **background factors** and points. So character creation and advancement are one mechanism: points come from background factors, downtime, and awards; you spend them the same way at session zero or session fifty. Respec is just re-spending.

Costs (provisional but specified):
- **Attributes:** **10 points per point** up to 12; **20 points per point** beyond 12. (Base archetype attributes — the 6–10 spread — are free.)
- **Skills:** **3× the skill's Cost to reach level 1**, then **Cost per level** to the limit ⟶ a skill at level *L* costs **Cost × (L + 2)**. *(E.g. Firearms, Cost 2, at level 3 = 2 × 5 = 10 points — so "Military Service grants Firearms 3" is a 10-point grant.)*
- **Fields of Knowledge:** **4 points per "year"** of study (depth in years).

**Fields form a hierarchy** (broad/basic → specific/advanced), and this is load-bearing — especially for magic. Roots are general and cheap (First Aid 1yr, Science 1yr, Lore 1yr, Mathematics 2yr); children narrow and deepen (First Aid → Medicine 3yr → Surgery 4yr; Science → Physics 3yr → Engineering 4yr). **Years = study depth = cost (×4 pts/yr):** First Aid = 4 pts, Medicine = 12, Surgery = 16. A deeper field **implies competence in its ancestors** for task purposes (a surgeon knows first aid); the years figure is the *total* for that level, not additive up the chain. You acquire general-toward-specific, and the GM gates whether a deep field makes sense. Fields feed the skills that use them (a surgeon = **Repair + Surgery**; a physicist = **Theory + Physics**), and the deeper the field, the more its skill can achieve in that domain.

**Why this matters for magic:** magical knowledge is the same kind of tree — broad fundamentals gate deep, expensive applications. That progression is a primary lever for pacing magic's power and answering its two questions (barrier to entry + ceiling on payoff): world-shaking effects sit deep behind costly, prerequisite knowledge. Data: `docs/data/fields.json` now encodes `parent` + `years` + `thread` + `tags`.

These are wired into the interactive character sheet (ForeSight Character Sheet.html), which tracks granted vs. spent vs. available and enforces the caps.

**Two conceptual reframes (capture now, implement later):**
- **An "experience" award = points gained + points to *reassign*, favoring the latter.** Growth should be mostly *evolution*, not accumulation: the larger part of any award lets a player reshuffle existing points (the skills you actually used sharpen, the neglected ones fade), with only a smaller part being net-new power. This keeps long campaigns from inflating characters into demigods while letting them genuinely develop.
- **Fallow points.** A character who's been out of play for a while has points go **fallow** — dormant, as skills rust and knowledge slips — until reawakened by use. The downtime mirror of the above; both follow naturally from the single-currency, reassign-friendly model.

## Source inventory

| Source | Use |
|---|---|
| ForeSight 2004 v48 (169pp, clean text) | Primary base text and organization |
| ForeSight 1986 (124pp, OCR) | Tone, dropped material, tournament one-pager; equipment tables to update |
| ForePlay 2015 (43pp) | Initiative/action model (awareness/trigger/pre-emption) — its resolution and damage mechanics are a blind alley. Also content raw material: Pasts/Perks/Flaws/Quirks tables, NPC archetypes, compact equipment stat-block presentation |
| HindSight 1988 | Magic and religion systems to bring forward; races; equipment tables to update; 1e errata |
| 2004 magic HTML notes | Spells + metaspells framework; design intent |
| Ch'i 2004 draft | Alternative magic/mystic instantiation |
| Character Templates / Sketches / Sheet PDFs | Basis for new fast-creation templates |
| Simiolus | Adventure; example-of-play material |

## Process

Draft chapter-by-chapter in markdown in this folder. Update this document as decisions land. Proposed running order: Introduction & the One Rule → Characters (templates, background factors, attributes, skills, fields, familiarities, talents & quirks) → Resolution → Wounds, Exhaustion & Mortality → Combat → Equipment & Modifications → Magic & Religion → GM material (instant NPCs, NPCs as objects).

## Delivery, hosting & persistence (architecture roadmap)

The whole project is designed to be **data + static site now, backend later — never bespoke infrastructure.**

- **Hosting:** the tosijs-ui **doc-system** lets the entire rules site be served directly from the GitHub repo (`/docs`), giving fully optimized, SEO-friendly, web-1.0-fallback pages *and* full SPA interactivity (client nav, search, live tables) essentially for free. Source markdown (+ `/*# … */` comments) is extracted to a single `docs.json`; pages pre-render and hydrate via an IIFE bundle. **Parents/sections** (`parent`, `order`, `pin` metadata) gather and order the one-pagers thematically.
- **Single source of truth:** skills / background-factors / fields / magic all live as JSON in `docs/data/`, consumed by both the rules pages (via a `<foresight-table>` wrapper over `<tosi-table>`) and the character sheet. Tables are sortable / searchable / show-hide / tag-filtered for free.
- **Persistence (planned):** a *componentized Firestore backend* (Tonio's, to be extracted) deploying general-purpose endpoints over Firestore collections with **fine-grained, TypeScript-driven security** (schema enforcement, field/record-level rules). This enables: a player **saving characters securely online**, and a **GM hosting a campaign with a customized ruleset**.
- **Design implications to honor now:**
  - **A campaign = base ruleset + overrides.** Keep the JSON data layer *mergeable/overridable* per campaign (tweak costs, tags, availability; add/remove skills; gate magic) rather than hardcoded — the tag system already points this way.
  - **A character is a persistable record.** Keep the sheet's exported character JSON clean and self-contained so it maps directly to a secured Firestore document (player-owned, GM-readable at campaign scope) when the backend lands.

### Live entity collections & multi-view rendering (later, design for it now)

- **All major entity collections become Firestore-backed** (not just static JSON). Then the **author's fixes propagate automatically** to everyone, and **GMs add their own custom content**. The data model becomes a three-layer merge: **author base (live) → GM / community custom content → per-campaign overrides.** *Design consequence now:* abstract data-loading behind a **source** that is a static JSON file today and a Firestore collection later, so nothing downstream changes when they're swapped.
- **`foresight-table` is really an *entity-view* component** — one data source, multiple presentations: a sortable **list/table**, a set of **rendered cards**, and a **single-record detail / atlas page**. E.g. a fundamental's applications viewed as a list *or* as cards; future entities like **planets** viewed as a summary list *or* a detailed atlas page. Driven by a per-collection presentation config. *Our data already supports both views:* e.g. `magic-applications.json` carries summary fields (name, intensity, code) for the list and a rich Markdown body for the card. Keep every entity JSON shaped with both a **summary projection** and a **full detail body**.
