# ForeSight — New Edition Design Document

*Status: working draft, 2026-06-12. Captures decisions from initial design discussion.*

## Goal

A streamlined, updated edition of ForeSight built on the unpublished 2004 2nd edition draft (primary text source) and the 1986 original (tone, and anything 2004 dropped), with combat and several simplifications drawn from ForePlay (2015, the "ForeSight Lite" experiment). The benchmark for accessibility is the original tournament one-pager: a player who has never seen the system should be playing in minutes.

**Source hierarchy, sharpened (2026-07-17).** The rules *derive* from 2004 — text, structure, terminology — as amended by the decided simplifications below. 1986 is a **content quarry**: mine it for what 2004 dropped and for tone, but assume anything drawn from it needs revision and updating. The asymmetry to keep in mind is that the two drafts fail in opposite directions: **2004 is edited, modernized and proofread but was never playtested; 1986 shipped and got played.** So 2004 winning the *prose* is uncontroversial, while 2004 winning a *number* is an untested intention overriding table evidence. Where they disagree on a number or a probability, that is a calibration question for REVIEW.md, not a default.

## First principle (the thesis)

**Keep mechanics simple, but push the probabilities in the right general direction with the right general magnitude — and let the results speak for themselves.** ForeSight does not chase precise simulation. It chases *believable* outcomes from *memorable* rules: a handful of common-sense ease-factor modifiers, one resolution rule, and outcomes whose likelihoods lean the way reality leans. Everything below serves this. When a choice is between mechanical fidelity and a rule you can run from memory that still points the right way, choose the latter. The emergent behaviors this produces — combat that rewards suppression over focus-fire, snipers who can't be certain they'll fire first, armor that's worth wearing — are evidence the approach works, not features that were each separately engineered.

**Companion principle — transparency.** ForeSight must not color the setting it's used for. *The setting viewed through ForeSight is just the setting.* Rules are adaptable *to* a world, never grafted *onto* it (this is why the game is genre-agnostic). The practical test: any rule with a setting-level consequence — an ability everyone would take, a power that implies a whole class of people, an economy a price list assumes — must make that consequence **explicit**, so the GM chooses their world rather than inheriting one by accident. Hidden world-shaping is the cardinal sin; the strong-but-declared is fine.

This litmus test has driven every refinement of ForeSight for decades, and the family history maps the two ways to fail it. **ForeSight Enhanced (FSE)** overshot into complexity — it went explosively in the wrong direction and is being ignored entirely. **ForePlay** overshot the other way into minimalism — it abandoned Score × EF and collapsed the attributes, losing too much grain — but in the process it produced the **most refined combat sequence** of any version. The new edition aims for the saddle point between those failures: hence we lift ForePlay's combat/initiative sequence wholesale while discarding its dice and its four-attribute model, and keep the proven 2004 chassis everywhere else.

## The standard: absolute, not relative (2026-08)

**ForeSight began as a *delta*.** It started life as the changes worth making to the best game rules available at the time — a set of corrections measured against the competition. Almost every change since has come from a different question: not *how about being better than those?* but **how about being the best game possible?**

**The two questions produce different work, and the difference is not a matter of ambition — it's a matter of what counts as finished.** A relative standard asks for the *smoothest character generation workflow compared to everyone else's*. An absolute one asks for **the smoothest character generation workflow we can conceive of**, and the same substitution applies to every other part: the clearest combat, the least bookkeeping, the fewest rules that carry the most weight.

**The operational consequence is what makes this worth writing down: *"every game does it this way" stops being a defence and becomes a suspicion.*** Under a relative standard, matching the field *is* success, so a universal convention is invisible — there is nothing to compare it against. Under an absolute one, a convention nobody has ever questioned is the most likely place to find an unexamined defect, precisely *because* nobody has examined it.

**That is not theory; it is where the 2026 work has actually come from.** Both of the blind spots found in 2026-08 were of exactly this kind, and both had survived decades of testing without a single complaint:

- **Chargen gotchas** — new players' sheets rebuilt in the first session or two. Nobody logged it, because every RPG of the era did it.
- **Free combat movement** — a complete klutz manoeuvres in a melee exactly as well as an acrobat. Nobody logged it, because every system does it.

**So the standing heuristic: "par for the course" is a bug report.** Whenever the justification for a rule turns out to be *that's how it's done*, that is the signal to look harder. Comparison with other games remains useful for **finding** problems — they've hit the same walls — and is never sufficient for **settling** whether something is good enough.

> ⚠ **The guard, and it is necessary.** An absolute standard invites infinite polish, and an unbounded "best possible" is how you get **GURPS** — maximal fidelity, permanently unfinished, unplayable from memory. The standard is applied to *the goal*, not to simulation: **the best possible game that you can run from memory and build a character for in minutes.** Every candidate improvement still has to pass the survival criteria (cheap to track, changes only when it matters) and still has to fit on its one-pager. A change that makes the game more faithful and less runnable has failed the absolute standard, not met it.

## Story comes from friction (2026-08)

**This is the sentence the combat work keeps arriving back at, so it belongs with the first principles.** A story is something pushing back. Remove the resistance and you don't get a smoother story, you get **no story** — just a sequence of intentions being carried out.

**The failure mode at one end is frictionlessness, and it is where the whole medium has drifted.** In Skyrim you cannot even struggle running uphill. The terrain is therefore **scenery**: it can be looked at, and it can never be a *factor*. Nothing in that world is able to talk back to you, so nothing in it means very much. Tabletop has drifted the same way — the systems compared above are the *less* abstract ones; GURPS and D&D go further still.

**But the same friction succeeds or fails depending on the *medium*, and this is the distinction that actually matters.** Somebody built a 90s computer RPG where fatigue and foul weather slowed you down; it was **not very popular**. Yet trudging exhausted through appalling weather is the **load-bearing** heart of *The Left Hand of Darkness* — Genly Ai and Estraven crossing the Gobrin Ice is the best thing in the book, and it is **nothing but** friction. Identical hardship, opposite results.

**The variable is compression: can the medium deliver the *meaning* of an ordeal without making you *undergo its duration*?**

| Medium | Compression | So friction becomes |
|---|---|---|
| **CRPG** | poor — time passes in real time, and a slowed character means a slowed *player* | **tedium.** The player suffers minutes, not stakes |
| **Novel** | total — a month of ice is a chapter | **theme.** The ordeal is the point |
| **Tabletop** | excellent — *if the rules permit it* | **either**, and which one is a design decision |

**That is not a given for tabletop; it is a requirement we have to meet.** A face-to-face game sits near the novel by nature — the table narrates, elides, and cuts — but a rules set can easily destroy that advantage by demanding resolution at the wrong grain. Forty rolls for a forced march *is* the CRPG failure, reproduced with dice.

> **So the requirement: the unit of resolution must scale to the narrative unit.** A week of hard travel should be a check or three, carrying real stakes and real decisions — push on or make camp, ration or eat, keep the sledge or abandon it — and no rolls at all for the hours in between.

**Which is also the honest reason for the mechanisms this edition chose.** Exhaustion is a short **level track** with a check *when you push*, not a pool drained by the hour; turn length is **elastic**; a pursuit runs at a longer tempo than a fight. Each is a compression device. Fatigue decremented hourly would be the same phenomenon administered at the wrong grain — and the **survival criterion** (*cheap to track, changes only when it matters*) is the filter that catches it.

**Stated as a rule: friction must cost you *decisions*, not *duration* — and not *bookkeeping*.** Felt, not administered, and never merely endured.

**It is also how the setting becomes visible through the rules**, which is the transparency principle from the other side. If climate matters in your world, climate must be able to **reach the dice**; otherwise it is set dressing, however well described. That is what wounds that bite, movement that can fail, aim that can be lost, and reach bands you have to fight over are all *for*. Each one is a place the world gets to answer back.

> ⚠ **Be clear-eyed: this is a real cost and it narrows the audience.** Frictionless design is popular for reasons, and a table that wants to carry out its intentions unimpeded will not enjoy this game. The bargain ForeSight offers is that **what happens to you is worth telling someone about afterwards** — and that bargain is only honest if the friction never turns into homework.

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

6. **Attribute consolidation: nine → five. Final set: ST, CO, IN, PC, WP.** *(Was seven — EN and AP left in 2026-08; see "The five" below.)*

   DX + AG merge into **Coordination**; remarkable agility or prestidigitation become talents. **EM folds into PC**, with empathy variation as a quirk — empathy is essentially perception of people, possibly handicapped (or sharpened) by neurotype, so PC is the right default and a quirk models the deviation (the way exceptional eyesight or deafness sit on top of PC). **AP stays** *(— superseded 2026-08; AP becomes a quirk family, see "Quirk families" below. The reasoning below is preserved because its premise survives: looks matter. Its conclusion — that they are therefore one number — does not.)* The idea that looks aren't important is a conceit; a good-looking person can do things an ugly person can't, just as surely as an agile or smart person can. Pretending otherwise violates the game's founding principle (no truths denied by the system).

   The test that separates these cases: **attributes are for independent capabilities; quirks are for deviations from a correlated default.** AP correlates with nothing (you can be weak, stupid, clumsy, and gorgeous), so it looked like it must be an attribute — **superseded; see "Quirk families"**. EM correlates strongly with PC, so it's a default plus deviations. The test cuts both ways: we don't want eyesight or left-hand coordination becoming attributes either — sub-capabilities stay quirks, independent capabilities stay attributes.

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

## Design note: don't hide a player's own character from them (2026-08)

**The case:** in HindSight, **Piety is a secret the GM keeps about your character**. You spend time and experience pursuing belief, and the GM privately tracks how well you're doing.

**Why it's out.** It is, in one sense, atmospheric — and the reason it's tempting is real: a devout character shouldn't *know* their standing with a god the way they know their Strength. But the cost is that **part of your own character sheet is unavailable to you**, and that makes it an *untrusting* mechanic. It is the same move as making a player roleplay a delusional character by lying to them: it manufactures the experience by withholding, rather than by giving the player something to play. Equivalent techniques used on actors by directors are now generally regarded as abuse, and the analogy is not a stretch — both work by denying an informed participant their own ground truth.

**What replaces it.** Piety is a **skill, visible on the sheet, driven by deeds rather than experience points** and earned back by devotion rather than rest, gating a **divine-favour exhaustion track** (see Exhaustion). The player can see it, plan around it, and *choose* to spend it — which is more playable, and produces the same fiction without the deception. It also decouples the character from one GM's private ledger: the old design effectively welded a character to a single setting and referee, which is fine until the campaign ends or the group changes.

**It also assumes a social framing most tables don't have.** A GM-held ledger presupposes one persistent referee running one continuous campaign. A great deal of actual play isn't that: a **pool of characters, rotating GMs, and a "campaign" that is vague, cooperative, or nonexistent**. Bob runs something this week, Shirley runs something next week, and players pull their characters off the rack — which is exactly how *James Bond 007* adventures worked, the very system ForeSight's resolution engine descends from. Any stat that lives in one GM's head makes a character non-portable between tables, and silently punishes the most common way people actually play.

This converges with the architecture: the delivery model already requires **each character to be a self-contained record** (see *Delivery, hosting & persistence* — characters saved by players, campaigns hosted by GMs). GM-secret state is not merely untrusting, it is **unserializable** — it cannot live in the character record, so it cannot travel with the character. The design principle and the data model point the same way.

**The general principle, which will recur:** *a player's own character is not a place to hide information.* Uncertainty belongs in the **world** (what the god will actually do, whether the omen means what you think) and in the **roll** (QR is already a graded-confidence report — see the EM/PC note). It does not belong in a hidden stat. Watch for this whenever a subsystem is tempted to track something about a PC in secret — corruption, sanity, standing, true loyalties. Model the *uncertainty*, not the *concealment*.

## Worked case: EN stays separate — the test refusing a merge (2026-08)

A tester proposed folding **EN into ST and WP**. Rejected, and it's worth recording because every other worked case in this document *merges* something — this one shows the same test cutting the other way, which is evidence it's a test rather than a rationalisation for simplification.

> **Superseded in scope, 2026-08 — read this carefully, because it was not simply reversed.** The case below defeats **merging EN into ST**, and it still does: strength and endurance genuinely diverge, and that divergence is the norm. What actually happened is a **redistribution, not a merge.** EN's *rolls* went to **WP** (exhaustion, Pain Resistance, convalescence, stun recovery), its *physiological robustness* went to **ST** (poison, disease), and its *specificity* went to the **Endurance quirk family**. Nothing below is retracted; it simply answered a narrower question than the one that was finally asked. See "The five".

**1 · It fails the two-way transfer test, in both directions and commonly.** Elite endurance athletes are frequently not strong; elite strength athletes frequently have mediocre endurance; at the extremes the training is antagonistic. And the decisive point: **this divergence is the norm, not a pathology.** The whole argument for merging DX+AG was that deft-but-clumsy is the *exception* — so the same reasoning that merged those keeps ST and EN apart. Independent capability → attribute. Deviation from a correlated default → quirk. EN is plainly the former.

**2 · It would concentrate leverage on ST.** EN currently gates exhaustion checks, stamina, and half of Pain Resistance. Folded in, ST would gate melee damage *plus* carrying capacity *plus* exhaustion — exactly the double-leverage failure named as the **bound** on collapsing in the Coordination note. ST becomes the must-max attribute, which is the pathology the merge was supposed to avoid.

**3 · It asserts a falsehood.** Aerobic capacity and maximal force production are distinct physiological systems, not two readings of one. Modelling them as one is failure mode (a) from the 1986 ForeWord, aimed at bodies.

*Process note: the same tester also wants DX and AG re-separated, apparently on the grounds already answered in the Coordination note. Not relitigated here — that argument stands until its pushback is addressed on its merits. But it's telling that one person's two proposals point in opposite directions under a single consistent test: EN separate because the divergence is ordinary, CO merged because it isn't.*

## Design note: the equipment model (2026-08)

Equipment isn't one thing. Weapons, clothing, vehicles, tools and general gear **aggregate differently**, and that difference is the whole design problem. Three decisions settle it.

**1 · Two levels of modification, kept apart.**
- **Item-level** — adjectives modify *the item's own stats*. A "target heavy sliver rifle" is `sliver rifle` + `target` + `heavy`, each adjusting PM/DC/ranges/mass/cost. Closed, tabular, and resolvable at *build* time: a modified item can be precomputed into the catalogue.
- **Character-level** — the item modifies *how an action resolves* (armour protection, a toolkit's PM, a holster's effect on the draw). Resolvable only at *play* time, against a specific action.

**2 · The unifying abstraction is the modifier, not the stat block.** Each item emits zero or more modifiers carrying **target** (what it touches), **scope** (when it applies) and **combine** (how it stacks with others of its kind). Aggregation differences then live in *data*, not in special-case code:

| Kind | Combine rule |
|---|---|
| **Weapons** | **select-one** — only what's wielded contributes (mass still counts) |
| **Clothing / armour** | **per-location, not layered** — see below |
| **Vehicles** | **substitute / nest** — its stats replace yours for movement; you inherit its damage track and cover |
| **Tools** | **best applicable, never additive** |
| **General gear** | **situational hook**, best-of per trigger (draw, concealment, initiative) |
| *(all)* | **encumbrance sums** — the one thing that genuinely adds |

**3 · The three settled questions.**

- **Hit locations are long established: seven** — left and right legs, left and right arms, abdomen, chest, head. So coverage is real, and clothing that protects *some* locations (a Kevlar vest over chest and abdomen) is the normal case rather than an edge case.
- **Armour does not layer.** You don't pile armour on and sum protection; more armour is bought with **major coordination costs**, not with arithmetic. This kills the hardest sub-problem outright — no layering formula, no best-plus-one fudge. An item covers locations and protects them; the price is what it does to you.
- **Tools never stack.** *Two okay toolkits don't add up to a workshop.* Best applicable only. This one matters most numerically: a **+1 EF is worth roughly your whole Score in the sweet spot** (see the grain note), and the tradesman anchor shows the pro-versus-improvised swing is already **two EF steps** — most of the distance between an expert and an amateur. Additive tools would dwarf skill itself.

*The through-line: every combine rule above is a form of "take the relevant one", never "add them up" — except encumbrance, which is the only thing that genuinely accumulates. That's the same instinct as the rest of the system: modifiers stay small, and the interesting decision is which thing applies, not how big a pile you assembled.*

## Design principle: granularity goes *down*, not sideways (2026-08)

The same question keeps arriving in different costumes — *shouldn't X be its own attribute / skill?* — and it has one answer: **push the fine grain into the cheaper, narrower mechanism rather than adding an axis everyone has to carry.**

| Question | Wrong move | Right move |
|---|---|---|
| Deft hands vs. graceful body? | split CO into DX + AG | one **Coordination**, deviations as **quirks** |
| Reads people vs. acts on the reading? | an **EM** attribute | **PC** for the read, an **inclination** for what you'll stake on it |
| Tumbling vs. general fitness? | an **Acrobatics** skill | broad **Athletics**, specialisation via **long-term familiarity** |
| Surgery vs. plumbing? | a **Surgery** skill | broad **Repair**, directed by a **Field of Knowledge** |

**The Acrobatics case is the clearest statement of the rule.** In the source genre — the Hong Kong fantasies Ch'i is built from — *everyone* can do acrobatics; it's baseline competence, not a specialist divide, so a separate skill would assert a distinction the setting doesn't have. But hard acrobatic work is genuinely hard, so the specialist needs *something*: that something is **long-term familiarity on top of the broad skill**, which is exactly the mechanism decided-simplification #11 exists to provide (and #5 keeps G/E/T as its flagship examples rather than a subsystem).

**Repair is the precedent, and it carries the strongest evidence.** All the "doing delicate things with your hands" skills were collapsed into **Repair** on exactly this reasoning: *surgery is plumbing with different knowledge driving it.* The manual competence — steady hands, careful sequenced work under pressure, not panicking when it's wet — is generic. What differs is the **Field of Knowledge** that directs it, plus familiarity with the specific job.

The evidence that this is really true, rather than merely tidy: **non-specialists have been talked through procedures they had no training for**, in real time, by someone who has the knowledge but not the hands. That isolates the variable exactly. Same hands, no knowledge, task impossible; supply the knowledge from outside and the task becomes possible. If the manual skill and the knowledge weren't genuinely separable, remote guidance could not work at all — and the vivid limiting case is someone doing it to themselves. This also explains the ForeSight structure that has been there since 1986: a great many skills are **Skill × Field** pairs, and it's why Repair is a *diagnose-then-fix* chain, with the diagnosis QR feeding the fix.

> ### The governing rule for perks, quirks and flaws
>
> **The purpose of a quirk — and this includes perks and flaws — is to help *describe a character*. At best it is a tradeoff. It is never a currency to minimax.**
>
> Everything else in this section is a corollary, and any future rule that contradicts this one is wrong no matter how well it prices out:
>
> - **Drawbacks fund nothing.** The moment a downside pays, describing a character becomes shopping.
> - **Compensation must be non-fungible** — redirected attention, never points, because points don't remember where they came from.
> - **Would the drawback actually bite?** If no, it isn't a quirk; it's a perk wearing one, and it should be paid for.
> - **Would anyone take this deal on the merits?** If yes, the offset is too big.
> - **A family is territory, not price** — what a quirk touches is a separate question from what it costs.
> - **What limits them is credibility, not balance** — a pile of perks is ridiculous long before it is unbalanced.
>
> The test to apply to any proposed quirk, perk or flaw is simply: *does this make the character easier to picture?* If instead it makes the character sheet easier to optimize, it has failed, and no amount of careful costing rescues it.

**On what actually limits perks.** A perk is, by definition, a net good deal — that is what distinguishes it from a quirk. So it is worth being blunt about why you can't have many: **not because the economy forbids it, but because a character wearing a pile of them is ridiculous.** They stop being someone you can picture and become a shopping list. The customary cap (take about three) is a rule of thumb standing in for that judgement, not a balance figure.

**There is no game balance here to protect, and pretending otherwise causes the damage.** ForeSight does not claim that two characters built on equal points are equal, or that they should be. The points economy exists to stop *arithmetic* nonsense — buying the same thing twice, a skill above its ceiling, a total that doesn't add up. **Credibility and the GM stop *fictional* nonsense**, and that has always been an explicit power: the GM may require a rethink because the abilities don't match the concept, or because the character doesn't fit the setting.

Neither mechanism substitutes for the other, and **asking the economy to do the second job is the category error that produces disadvantage economies in the first place.** Once you believe the points guarantee balance, every drawback must have a price, and the moment every drawback has a price the whole thing is a store.

**So there are six downward carriers, not two** — each *narrower* than a new axis, but they are not interchangeable, and they differ most importantly in **permanence**:

| Carrier | What it says | Permanence | Cost shape |
|---|---|---|---|
| **Quirk** | who you *are*, in a **small** way — nimble-fingered, graceful, short-sighted *(with glasses)* | **permanent and irrevocable**, character-defining | a **tradeoff**: the good half is paid for by the bad half. Cheap in the sense a bargain is cheap, not in the sense a small purchase is |
| **Flaw** | an outright bummer — blind, haemophiliac in a world without clotting factor, doomed | **permanent**, and generally **not chosen by the character** | **free, and it funds nothing.** Not a trade at all: there is no good half paying for the bad one |
| **Perk** | a focused advantage you *bought* — no downside attached | **permanent** | **not cheap.** A straight-out advantage, so it's paid for in points at full price. Narrow scope is what keeps it affordable at all |
| **Inclination** | what you'll *choose* to do | persistent, but shifts through **play** rather than purchase | free; it costs nothing and constrains nothing mechanically |
| **Familiarity** | what you've *been doing lately* | acquirable, and **losable** | cheap **and fast** — a motivated adult, or a whole stunt team, can go and get one |
| **Field of Knowledge** | what your hands are *pointed at* | acquired over years, then kept | 4 points per year, hierarchical, shared across skills |

**Quirk and perk are the same *shape*, differing in how you pay.** Both are permanent and narrow. A **quirk is a trade** — the good half comes with the bad half. A **perk is a purchase** — a clean advantage with no drawback, paid for in points at full price, affordable only because it is tightly focused.

**ForePlay 2015 priced flaws, and 2026 stops.** ForePlay gave a flaw *one attribute point or two skill points* — and then immediately apologised for it in the text: *this isn't intended to be a store: design the character you want; sometimes a weakness is just a weakness.* That caveat is the whole 2026 position, already written down. If it is not a store, do not put a price tag on the shelf. **The grant was vestigial apology, and it goes.** What survives from ForePlay is the sentence, which belongs in the rules verbatim.

*(ForePlay's own Blind entry also shows the failure mode: −4 Perception, then **+1 and +3** for touch and hearing. That is the falsehood identified below — that the costs and compensations roughly cancel, and that the compensations are perks. A blind character's hearing is not a bonus; their attention budget is simply spent differently, and the game should not pay them for it.)*

**Flaws do pay — in capacity, not in currency, and that is what makes them safe.** Refusing the point grant does not mean a flaw leaves no mark on the build, and it shouldn't: it genuinely makes sense that someone blind from childhood concentrated on the skills blindness doesn't cripple, **and had more hours to spend on them.** That is a real tradeoff and it belongs in the character. The question is only what it's denominated in.

**The principle: the compensation must be non-fungible.** A point grant converts a specific fact about a body into **universal currency** — and universal currency is exactly what gets carried out of the room and spent on something unrelated. That is the whole mechanism of the exploit: blindness funds telepathy because points don't remember where they came from. Redirected attention *does* remember. It can only be spent **inside the space the flaw leaves open**, so a blind character's compensation can never buy marksmanship, and the optimization path closes by construction rather than by GM vigilance.

**So it's expressed in the same currency the flaw actually costs: time.** ForeSight already denominates a life in years — background factors are years lived, fields are 4 points per year. A flaw is therefore an argument about **how those years went**, and may justify a field, a deeper field, or a familiarity in an area the flaw doesn't touch. GM's call, as ever, and cheap: fields don't do violence, so nothing here is worth shopping for.

**This is the same trade as age**, and the two should be written the same way. Years buy fields, skills, contacts and background factors while taking capability away — *capability for capacity*, and it is fiction rather than a ledger. A 55-year-old with four more background factors and a bad knee is a better character than a 25-year-old, not a worse one. A flaw runs the same exchange on a different axis.

**The test that sizes it — and it is a bound, not a number: *would anyone take this deal on the merits?* If yes, the offset is too big.** However the years were redirected, a blind person would, in almost every case, still rather not be blind. That has to remain true after the offset is applied, or the offset has become a price, and a price makes the flaw shoppable. This is the mirror of the quirk-versus-perk test: that one asks *would the drawback actually bite?*, this one asks *would the compensation actually tempt?* — and the answers must be **yes** and **no** respectively.

**The consequence is a large simplification: flaws never need to be priced at all.** Because none of them is purchasable, blindness and haemophilia do not have to be costed relative to each other, and there is **no flaw point table** to build, balance, or argue about — a whole chapter other systems carry that this one simply doesn't. All that's required is to stay under the line, and for any real flaw the line is very far away. It also settles the open question above in favour of the small explicit allowance: one field is nowhere near tempting enough to buy blindness with, so it is safe *and* it matches the intuition. Cap it at one, GM-approved, and **never** in a skill that routes around the flaw's own domain.

**The offset exists to make the character right, not to make them whole.**

**And the same logic runs in reverse, which completes the pair.** A flaw redirects capacity *into* the space it leaves open; a **perk suppresses capacity it made unnecessary**. Someone strikingly good-looking may simply be a few skills short, because a range of problems were solved for them before they had to learn anything — the traffic stopped, so they never learned to cross the road carefully. That is not a penalty imposed on the perk; it is a competence that never got bought, because nothing ever forced it.

**General form: a reliably available capability atrophies its mundane substitute.** Looks are only the obvious case. Someone who levitates never learned to climb; someone rich never learned to haggle; someone with perfect recall never learned to take notes. This is the **same lens the magic rules already use** — *benchmark against the mundane, and judge an effect by what the world becomes if it is reliable*. Reliability is precisely what suppresses the ordinary skill, whether the source is a spell or a face.

**It is non-fungible in the same way, and therefore equally safe.** The player does not get to nominate which competences they skipped — the perk determines them. You cannot take *Gorgeous* and elect to have never learned underwater basket weaving; you skipped the things that stopped being your problem. And it is **not a discount**: the perk still costs full price. The gaps are a consequence, not a rebate.

**Mechanically it needs no new rule** — it is the existing permission to *sell off free-package skills a character plausibly lacks*, which until now had no reason attached to it. This is the reason. Same currency as everything else here: time, and what it went into.

> **Two guards.** It must not harden into *beautiful people are stupid* — a tired trope, and false. And it must stay an **invitation, never a tax**: the player chooses a specific, characterful gap because it makes the character real, and the GM never levies one. Keep the gaps **narrow and non-crippling**; anything that genuinely impairs is a **flaw**, and should be written as one.

The payoff is that these gaps are **story engines rather than penalties**. A gorgeous character who never learned to cross a street safely is more fun at the table — and more *legible* — than the same character carrying a −1 somewhere.

**We do not adopt disadvantages as a point source** — the GURPS / HERO pattern, where drawbacks fund advantages. A drawback may carry *some minor offset*, but never enough to be worth shopping for. A disadvantage economy turns **building an interesting character into a minimax exercise**: you take blindness to fund telepathy, then see through everyone else's eyes, and the blindness is an accounting entry rather than a fact about the character. Choose to play someone blind **because it is interesting**; the system should neither bill you for it nor pay you a windfall.

**This is empirical, not fastidious.** Every game that adopts the economy turns it into a pathology. ForeSight itself tried it long ago and the result was worse than the commercial examples — precisely *because* it was defined in the most general and powerful form available, which is the natural thing to do and the thing that maximises the exploit surface. Generality is a virtue nearly everywhere in this system; here it is the failure mode.

**Why the economy cannot be fixed, only declined.** The problem isn't sloppy pricing, it's that **a drawback's cost is unknowable at design time** — it depends on the build and the campaign, and the player knows both while the designer knows neither. Players therefore self-select the drawbacks that are *free for them*, so a symmetric trade is symmetric only on the page.

*Fallout* shows this cleanly. Its "better with handguns, worse with longarms" perk is a clean trade on its face, yet the game charges for it as a straight **advantage** — and that is the **right** call, because nobody who cares about longarms would ever take it. The drawback lands only on characters who were never going to feel it. It doesn't constrain the concept; it *leans into* one the player already had.

**And the mirror case shows why no exchange rate rescues it.** Take a drawback with genuine compensations: a blind person really does get priority seating, and really may attend to sound more acutely than a sighted person does. That is an honest trade — an actual cost with actual offsets. **Would anyone take it for points? No.** Not at any rate the system could offer.

So the two cases bracket the whole space. Where the drawback is **unreal** — a penalty on something you were never going to do — everyone takes it, and the compensation is pure profit. Where the drawback is **real**, nobody takes it, because a genuine loss is not a resource you trade for build efficiency. **The mechanism therefore selects for insincerity by construction:** the only trades that get taken are the ones that aren't trades.

There is a second reason to refuse it. Pricing blindness as a fair exchange for some purchased benefit asserts something false about blindness — that its costs and its compensations roughly cancel, and that the compensations are *perks*. That is failure mode (a) from the 1986 ForeWord, a falsehood implied by the game-system, aimed at people rather than physics.

**Stated as arithmetic, the system cannot balance.** The advantage being bought is *already points-balanced* — priced fairly on its own terms. The drawback funding it costs the taker **nothing**, because it falls on something they had no intention of doing. So the transaction is a fairly-priced benefit acquired at a discount funded by zero. Every such trade strictly increases effective power relative to a character who simply declined to play the game, and no adjustment of the numbers repairs it: the only price that makes the drawback honest is *zero*, at which point there is no economy left to run. This is why the answer is to decline the mechanism rather than to tune it.

**The test that follows, for telling a real quirk from a perk in disguise:** *would this drawback actually bite a character who wants this benefit?* If the answer is no — if the downside is one the taker has already decided not to care about — then it is **not a trade, it is an advantage**, and it should be priced as a **perk**. A trade only earns its discount when the same character genuinely feels both halves. (This is the same instinct as the magic keystone *price the capability, not its costume*.)

**So what *is* the reward for playing an interesting character? Playing an interesting character.** That is not a dodge, it is the premise of the activity. A drawback chosen because it makes someone worth playing pays out in every scene they're in; a drawback chosen because it funds a purchase pays out once, on the character sheet, before play starts.

This is also why the system must not bribe you into it. **The moment being interesting earns points, the choice stops being about the character** — you're no longer asking "who is this person?", you're asking "what's the exchange rate?" An incentive doesn't reinforce the good behaviour here; it replaces the motive with a worse one.

**And it scopes the game deliberately.** ForeSight is not built for play whose object is winning character construction. To be clear, **that is genuinely fun** — but it is *a different game*, not a style of this one. It's a construction-and-exploit puzzle that happens to use RPG rules as its raw material, and its characteristic output is **monstrosities**: builds that are mechanically superb and incoherent as people. Players who enjoy it entertain themselves precisely by producing the monstrosity; the absurdity is the punchline, and the "character" is a scorecard.

That's why the two can't be served at once. **The optimisation game's success condition is the roleplaying game's failure condition** — an extreme build is a win in one and an unplayable person in the other. A system that rewards both is just a roleplaying game with a superior alternative activity bolted on, and the alternative is easier and more immediately gratifying, so it wins.

So: no build-optimisation surface, no arbitrage between subsystems, no reason to bring a spreadsheet. Future features shouldn't chase it. The interesting decisions belong in play.

**This corrects an earlier note in this document.** The Coordination discussion claimed the CO merge "only works if quirks can be negative and grant points", reasoning that a deft-handed, clumsy-bodied character would otherwise be worse off than under DX/AG, where they could dump AG and bank the difference. That imported the GURPS assumption. **The banked points were the minimax artifact, not a feature owed to anyone.** The trade stays available and cheap — but it is a *character* choice, not an *economy*.

> ⚠ **Terminology to settle:** the DX/AG passage above says remarkable agility or prestidigitation "become **talents**". If a talent *is* a perk, unify the word; if they differ, say how. Two names for one carrier is exactly the kind of drift this document exists to prevent.

**Quirks come in two shapes: standing and intermittent.** A *standing* quirk applies whenever its scope does — nimble-fingered, one-eyed, carrying a few extra kilos (−EF on agility tasks and running speed). An *intermittent* one applies **when something already happening triggers it** — arthritis in cold or damp, an old wound that bites on the first hard exertion of the day, a limp that shows once you're carrying an exhaustion level.

The rule for intermittent quirks: **they must hang off a condition already in play, never their own timer.** Anything that asks the table to track "is it flaring today?" fails the survival criterion (cheap to track, changes only when it matters) and will be quietly dropped — at which point the character sheet is lying. Tie it to weather, exertion, an exhaustion level, or a roll that's being made anyway, and it costs nothing to run.

**Quirks come in named families, and a family carries its own combine rule.** *Appearance*, *Empathy*, *Coordination*, *Endurance*, *Age* — grouping them is not filing convenience; it is what stops a GM adjudicating stacking case by case at the table. Each emits a modifier with a **target**, a **scope** and a **combine**, exactly like a piece of equipment (see the equipment note above); the family is simply the combine group.

**A family is defined by its territory, not by how you pay for it — so one family spans perks, quirks and flaws.** *Endurance* holds a **perk** (you are built like a Kalenjin distance runner), several **quirks** (sprinter versus marathoner), and a **flaw** (a condition that guts your endurance across the board). They are one family because they all modify the same rolls and therefore all need the same combine rule; they are different carriers because they are paid for differently. Conflating the two questions — *what does it touch?* and *what does it cost?* — is what makes other systems' lists of this stuff unnavigable.

> **A note on the word — settled.** **Quirk** does two jobs: it is the **umbrella** for the whole spectrum (as in the governing rule above), and it is the name of the **middle carrier** — small, two-sided, free — as against a **perk** (great genes) or a **flaw** (blindness). The overloading is deliberate, and the alternatives are worse. *Trait* was tried and rejected: too vague, and it pulls toward **personality** when everything here is about **ability, body and circumstance** — the exact wrong connotation, given this game's central distinction between what a character *can* do and what they're *willing* to do. There is no neutral word worth teaching a reader.
>
> So: where the scope genuinely matters, **name the three** — *"perks, quirks and flaws"* — and use the umbrella elsewhere. The book's chapter is **Quirks**, because that is what a reader will look it up under.
>
> ⚠ **Still open:** *talent vs perk* (see the terminology flag above) — two names for one carrier, which is exactly the drift this document exists to prevent.

**Default: within a family, quirks do not stack — best applicable only, and this includes perks and flaws.** This holds across carriers: a perk and a quirk in the same family that fire for the same reason still give you only the better one. The same rule as tools and armor, and for the same reason: a +1 EF is worth roughly a whole Score in the sweet spot, so anything additive dwarfs the skill it modifies. 
**Exception: family members that aren't on the same axis do stack.** *Gorgeous* and *Scarred* are both Appearance, but they are not two ends of one dial to be netted off — they fire on different audiences and different readings, and a face can genuinely be both. The test is the one the combine rule is really asking: **do these two fire on this roll for the same reason?** Same reason → take the best. Different reasons → both apply. That question is answerable in a second, which is the only standard that matters.

**Why a family beats an attribute here: a quirk can be *specific* in ways a number cannot.** AP-as-an-attribute asserts a **total order** on attractiveness — that all observers would rank the same faces the same way, differing only in threshold. That is not what the world looks like. Observers agree substantially at the extremes and diverge sharply on **type**: whether an audience is oriented toward you at all, and then which particular striking thing they're struck by. A quirk can say *striking in a particular way, and here is who that works on*. An attribute can only say 13.

> **This supersedes the "AP stays" argument recorded in decided-simplification 6 and in the collapse test below.** That argument turned on **independence**: AP correlates with nothing — you can be weak, stupid, clumsy and gorgeous — therefore it must be an attribute. The reasoning was sound and **incomplete**. Independence is necessary, not sufficient. An axis must *also* be (a) something characters meaningfully differ on in play, and (b) a **scalar, observer-independent quantity**. ST is both: the rock goes up or it doesn't, and it does not matter who is watching. AP is neither — it is multi-dimensional *and* it is in the eye of the beholder.
>
> The founding principle that motivated keeping AP — **looks matter, and a system that denies it is lying** — is not abandoned here; it is better served. The false claim was never "looks matter". It was "looks are one number."

### The five: ST, CO, IN, PC, WP

**Final set, 2026-08.** DX+AG merged into CO, EM folded into PC, and **EN and AP left the attribute list entirely** to become quirk families. Nine down to five.

**The set has a shape, and the shape is the argument for stopping here.** **ST** and **CO** are the *power* and *finesse* of the body; **WP** and **IN** are the power and finesse of the mind; **PC** is the feedback loop between mind, body and surroundings. That is a structure a reader can hold in their head, which is the whole point of a game you can run from memory — and it is the first time the attribute list has had one. (It is a *presentation* virtue rather than evidence: the structure was noticed after the five were chosen, not derived before. But given two defensible sets, take the memorable one.)

**The cognitive win is geometric, not linear, and this is the part that matters most.** Counting *sinks* — how many places points can go — nine to five is a 44% cut. But that is not what a player actually does at the build screen. They **weigh attributes against each other**, and the number of pairwise tradeoffs is `n(n−1)/2`: **nine attributes present 36 comparisons; five present 10.** A **3.6× reduction in the thing that actually makes character creation feel like work.** Every axis removed takes a whole row and column of the comparison matrix with it.

That is the founding goal restated in arithmetic — *a character buildable in minutes, rules you can run from memory* — and it is the strongest single argument for stopping at five rather than six or seven. It also raises the standard each survivor must meet: with only five axes, each one gets far more of the player's attention, so an attribute that doesn't discriminate between characters is now conspicuous rather than merely inert. That is precisely the test EN and AP failed.

**Where EN's work went — and why the move was nearly free.** Exhaustion, Pain Resistance, convalescence and shaking off a stun are now **WP**. The rules had been writing those as *"EN or WP"* for years, which was the split telling us it wasn't carrying weight: if two attributes are interchangeable at every point of use, they are one attribute wearing two labels. Pushing through exhaustion really is a matter of refusing to stop. Purely **physiological** resistance — poison, venom, disease — went to **ST**, the body's robustness, where willpower plainly doesn't help. Endurance quirks supply the situational modifiers throughout.

**This rescues WP rather than diminishing it.** WP was itself a deletion candidate on the same evidence that indicted EN — it drove no skill formulas, and designs didn't differ on it. It now gates a large share of core resolution, which settles the open question of whether EN's departure should take WP with it: **decisively not.** The two had identical profiles only because neither was doing anything; give one of them the work and the tie breaks.

**And it removes a whole class of pointless finessing.** With five attributes and a folded skill list, the path from *intent* to *build* is short and obvious: **want to be good at melee? Raise the attributes the skill uses, buy levels in it. You are now good at melee.** You do not have to discover that you were also supposed to buy five adjacent things, without which your fighter is quietly non-functional.

**The rule this states, which the edition has been applying piecemeal without naming: if a build is non-functional without X, then X is not a choice — it is a tax, and it should not be a purchase.** Make it free, fold it into the skill that implies it, or make it an attribute roll everyone can make. This is exactly why **Pain Resistance and Stamina are not skills** (you roll the attribute; nobody can forget to buy them), why **Search and Initiative are in the free package**, and why *surgery is plumbing with different knowledge driving it*. It is also the same guard as the one on power-pool access above — **don't charge for what everyone must have** — so it is one rule with several applications rather than a set of ad-hoc kindnesses.

**The reason to care is that hidden prerequisites reward system mastery over characterization.** A player who knows the system builds a functional fighter; a newcomer with the same concept and the same points builds a broken one, and doesn't find out until the first fight. That is the *same* pathology as the disadvantage economy — the game quietly rewarding knowledge of the rules rather than interest in the character — and it deserves the same answer. **A purchase is only worth having as a purchase if declining it is a real choice.**

### The behavioural evidence for this, from 1986 (recorded 2026-08)

**This isn't a hypothetical failure — it is a measured one, from the edition that has the testing behind it.** 1986 chargen was full of gotchas, and the observed consequence was that **new players routinely had their character sheets rebuilt during the first session or two**, once they discovered they had built a pile of junk. That is behavioural evidence in the sense this document privileges: not an opinion about the rules, but a record of what people actually did with them.

**The dangerous part is why nobody complained: it was par for the course.** Every RPG of the era did this, so the cost was **invisible rather than absent** — normalised, and therefore never reported as a defect. This is a real limit on the evidence standard and belongs alongside it: *blind testing measures what testers noticed, and testers do not notice genre-wide conventions.* **Absence of complaint is not evidence of absence of a problem** where the problem is normal everywhere. Any rule surviving on "nobody ever objected" needs re-examining on those grounds.

**And the pleasure was real, which is what makes it a trap.** Mastery of the weird corner cases *was* part of the fun, and it would be dishonest to pretend otherwise. But that fun was **distributed regressively**: it accrued to players who already knew the system, and was **paid for by newcomers**, who bought it with a wasted evening and a character they had to throw away. That is the same shape as every other pathology in this section — the disadvantage economy, hidden prerequisites, minmaxing — a benefit to the system-literate funded by everyone else. Recognising the fun was genuine is not a reason to keep the mechanism; it is a reason to **find where that pleasure can be paid for honestly**.

**Which gives the design rule: put the depth where a mistake is cheap.** A bad decision *in play* costs you one roll, and you learn something. A bad decision *in construction* costs you the campaign, or an evening and a rebuild. So **construction should be forgiving and legible; play is where the system may be deep.** Mastering the Ease Factor ladder, reading a combat, finding the precise magical effect instead of the big one — all of that rewards system knowledge without ever producing a broken character sheet. The corner-case fun doesn't have to be deleted. It has to be **moved to where losing costs a round instead of a campaign.**

**One more consequence, and it turns the old workaround into a feature.** Rebuilding was universal and GMs permitted it as a matter of course — which means the table had already diagnosed the problem and was applying a **social** remedy to a **mechanical** fault. The 2026 edition should absorb that remedy rather than depend on it: say plainly that **a character may be rebuilt freely until the player is happy with it**, and make the tooling match. The web character sheet makes a rebuild cost nothing, so what used to be a GM's favour becomes a stated right — and the *first* line of defence stays the one above: don't build the gotchas in.

### Worked fix: the beats divisor was a gotcha, and it's gone (2026-08)

**The new rules had one of these too, and it's instructive that it survived this long.** Intense Action set beats-per-round at **Score ÷ 5** primary, **÷ 10** secondary, rounding up — which is a **breakpoint rule wearing a formula's clothes.** Firearms 20 and 21 are the same character in every way that matters and get **four** and **five** beats respectively. The player who knows this buys the 21st point; the player who doesn't spends it somewhere sensible and is quietly worse. *"WTF, you took 19 in Handguns?!"* is the sound of a system punishing someone for not having read it closely enough — the precise failure mode described above, reproduced by a 2026 rule rather than inherited from 1986.

**The fix used machinery that was already there: repetitions are tasks.** The attention ladder already priced doing two *different* things at −1 each. A second shot is simply a second thing, so it goes on the same ladder — and then there is nothing to look up, no threshold, no rounding. **You are never told how many actions you get; you decide how thin to spread yourself, and the dice price it.**

**It deletes rather than adds**, which is the signature of the right fix: the divisor goes, the round-up goes, and so does the *"an attribute used as the ability counts double"* patch — a special case that existed only because raw attributes bought almost no beats under a divisor that no longer exists.

**And the resulting behaviour is better on its own terms, independent of the gotcha.** A fixed allowance is not a decision; a ladder is one *every round*. **Skill now buys the option to spend beats rather than a ration of them** — a Firearms 25 shooter can take two near-certain shots or five long ones, and that's a real choice with a real cost. Meanwhile a **Firearms 10** shooter who empties a magazine is rolling SC 10 a shot and hits nothing, which is both correct and self-limiting: the rule no longer has to *forbid* what incompetence already punishes. Rules that stop you doing a thing are worse than rules that let you do it badly.

> ⚠ **Calibration, and it is real.** This is a meaningful nerf at the top: 5 beats used to be free for a Score-25 shooter and now costs **−4**, which at EF ≈ Score in the sweet spot is enormous. Two things to test: (1) whether **−1 per beat** is the right slope at all, and (2) whether **repeating one task should be cheaper than splitting between two** — firing twice is intuitively easier than firing while moving, and the merged ladder currently prices them the same. Resist fixing (2) with a second ladder unless play demands it; a gentler single slope is the cheaper answer.

### Worked fix: free movement was the same blind spot (2026-08)

**A second genre convention that nobody ever reported as a defect, for exactly the reason given above.** In previous editions of ForeSight — and in essentially every system either of us can name — **combat movement is free and automatic**. Which means *a complete klutz manoeuvres in a melee exactly as well as an acrobat*: the most common physical activity in the game is the one place your body doesn't matter. That is plainly wrong, it was never listed as a problem, and the reason is the one recorded above — **testers don't report conventions that are universal**. The chargen gotchas and free movement are the same blind spot found twice, which is good evidence the blind spot is real and worth hunting deliberately.

**What it costs to fix: nothing, because it rides the machinery already built.** Movement is a **Coordination** task on the attention ladder; the ground sets the ease factor; **QR7 loses your balance, QR10 puts you down.** On a clear dry floor the EF is high and nobody rolls — the rule is invisible until the footing matters, which is the survival criterion this document applies to everything.

**What it buys is disproportionate**, and it is mostly *situations rather than numbers*: backing off and tripping over something is a staple of action cinema and of real fights, and it has never once happened at anybody's table. Giving ground under pressure, disengaging from a committed opponent, fighting on stairs or scree or a wet deck — all of these become live. And it creates a **tactical distinction the old rules could not express at all**: the graceful fighter can break contact, circle to better ground and re-enter, while the clumsy one is committed to the fight whether he likes it or not, because backing out is a risk he can't afford.

**Aim gets the same treatment, and the pair suggests a general move.** Aiming stops being a free action or a special attention-cost and becomes **a fire action that points the weapon instead of discharging it** — same roll, same modifiers, and the **QR sets the advantage (`5 − QR`)**, so a brilliant bead is +4 and a botched one leaves you pointed at the wrong place. **Recoil then lands where it belongs**: re-acquiring after a shot is an aim taken under recoil, so rate of fire regulates itself physically and a heavy weapon is slower without any rule saying "heavy weapons are slower."

**Aim went one step further, and the step is worth recording because it fixed a bug in the first version.** Treating aim as an ordinary repeated task meant the attention ladder *ate* it: three aims plus a shot is four beats at −3 apiece, so the carefully aimed shot came out **worse than a snap shot** — exactly backwards. Two changes fixed it, and both improved the rule on its own terms:

1. **The bead ratchets.** Your bead is `5 − QR` of your **last** aim and it applies to your **next beat, including the next aim** — so a good bead makes a better one likelier. Aim once for a rough +1, again to settle at +2 or +3, again for +4.
2. **The ladder counts outcomes, not rolls.** Beats poured into *one* shot are concentration; beats spent taking *more* shots are division. **Patience is free; greed is not.**

**The ratchet caps itself without a cap**, which is the part to be pleased about. The ceiling is +4, and at +4 another aim can only hold or lose it — a QR4 knocks you from +4 back to +1. So you aim until satisfied and then shoot, because the next aim is pure risk. Nothing forbids over-aiming; **the mechanic simply stops paying**, which is always the better way to bound a behaviour.

**And it replaces a sticky modifier with an activity.** The old *taking a bead* handed you a flat **+3** that sat there until you did something else — a state, not an action. A bead now lasts **one beat**: spend it shooting, spend it aiming again, or lose it. The sniper lying in wait is *doing something* every beat and can be interrupted at any of them, which is both truer and far better for play. It also gives **recoil** and **target movement** an honest home — each is simply a penalty on the aim you must keep making.

### Design note: position as a named state, not a measured distance (2026-08)

**Most systems force a choice, and it is a false one.** Either position is abstracted away entirely — the theatre-of-the-mind approach, where nobody has a meaningful reason to move and combat becomes an exchange of attack rolls — or position is *measured*, which means a hexgrid, a battlemat, and a box of figures. Par for the course, both ways, and neither is what a table actually wants.

**The three-band reach model is the third option.** Each melee weapon prefers **Reach**, **Normal** or **Close**; you get +1 at your own band, −2 one off, −4 two off. Position therefore *exists, matters, and is contested* — but it has **three values**, so it can be tracked in conversation.

**The load-bearing structural detail: it is one state per *engagement*, not a position per combatant.** Two fighters share a single band, agreed between them, and changing it is a contested combat move. That is one word to remember per exchange — which is why it survives without a map, where anything requiring each fighter's location does not.

**What it buys is a *qualitative* reason to move.** *I have a two-handed sword and he has a dagger: I want him out there, he wants to be inside my guard.* That sentence is the whole tactical situation, it needs no measurement, and it generates the manoeuvring that ForeSight melee has always been good at — previously at the cost of wanting figures on the table. It also means **only one fighter can be happy at a time**, so a melee is a running argument about distance rather than a stationary dice exchange.

**It also answers the *symmetric* case, which is the common one and the one most systems fail.** Two fighters with sword and shield both prefer the same band, so reach alone gives them nothing to contest — and yet real fights between equals are full of movement. Most games have no answer here at all: movement in melee is inert unless somebody has bought a special-case feat for it. ForeSight already had the answer and it only needed connecting: **giving ground is a defence.** Yielding distance blunts an attack *and* takes you out of your own band, so the defender trades his +1 for defensive advantage and the attacker must spend a beat closing back to reclaim his. **Press, yield, close, yield** — the rhythm of a fight between equals, falling out of two rules written independently, with nothing added.

**And the two rules together make Coordination decisive in melee without a rule saying it is.** Give two identically equipped fighters different CO and the better mover can **strike and give ground**: his blow lands in-band at +1, the counter comes from a band neither wants at −1, and reclaiming it means *coming after him* — a contest the slower man is worse at and which puts him on the floor if he loses it badly. **This is the fencer, and it is emphatically *not* a happy accident — it is one of ForeSight's original gedanken cases**, designed for deliberately and **proven in play under the 1986 rules**. The claim to make here is therefore not novelty but **cost**: 1986 delivered the fencer only by finessing **three** things in concert — **Speed**, **Initiative**, and **Melee Weapons** — where 2026 gets the same archetype out of rules that all exist for other reasons (reach bands, the footwork roll, the attention ladder), and without a Speed stat at all, since **CO** absorbed it. Same proven behaviour, far less machinery.

**Which makes the fencer a regression test rather than a nice-to-have.** It has behavioural evidence behind it: it worked at tables, repeatedly, for years. So if a change to reach, footwork, or the ladder stops producing a viable strike-and-withdraw fighter, **that is a regression to be fixed, not a matter of taste.** Any recalibration of the `+1 / −1 / −3` spread or the ladder slope must be checked against it. (The magical fencer in the power/finesse note is the same design target in a different subsystem — a recurring intent, not a coincidence.)

**The exploit it would otherwise be is closed by making range *contested* rather than declared.** Withdrawal and pursuit are one opposed Coordination roll, so the better mover wins the argument **usually, not automatically**, equal QRs hold the distance, and both spend a beat on the ladder. What a CO advantage buys is *the good end of every exchange* — not free hits, and not an infinite loop.

**Why the deep-skill version works — and it is the *over-20* rule doing it, not a curve artifact.** A large skill advantage lets you back right off and *wear* the penalty, because **Score past 20 is paid in exactly the currency the penalty is denominated in**: Melee 25 is **20+1**, and that spare **+1 EF cancels the −1 for standing off-band**. A 20+1 fighter fights a band away from his weapon's best distance and is *no worse off than an ordinary expert standing in his*. That is a designed consequence of "every 3 points over 20 is +1 EF", not an accident of the arithmetic.

**Below 20 the same step bites much harder**, and here the multiplication does the work: `SC = Score × EF`, so the loss comes off a big Score's **surplus** (Melee 20 off-band is SC 80 — still fine) and off a small Score's **chance of connecting at all** (Melee 10 off-band: 60 → 40). **Adverse conditions therefore favour the expert** — darkness, rain, broken ground, awkward distance — true to life and almost never modelled, because most systems use *additive* modifiers where −2 is −2 for everybody. Worth stating in the rules text so GMs reach for it deliberately.

*(Corrected 2026-08: an earlier version of this note used "Melee 25 → SC 125", forgetting that **Scores cap at 20 for the multiplication**. The conclusion survives; the mechanism is the over-20 EF bonus.)*

### Combat tempo: decisive or ineffectual, never attritional (2026-08)

**The observed figure, across decades of tables: a ForeSight fight takes a few minutes of play, and thirty at the outside. A D&D fight can eat an entire session.** That is behavioural evidence of the kind this document privileges, and the gap is not a matter of pacing skill — it is structural.

**The mechanism is not lethality — it is that being wounded has *consequences*.** A wound is **−(its level) to everything you do**, so the first solid hit makes you worse at defending, at moving, at hitting back; which makes the next hit likelier; which makes you worse again. **Damage feeds back into the thing that prevents damage**, and a fight tips. Add stun, shaken and exhaustion, which stack on the same character, and it tips faster.

**Contrast the pool.** Hit points *are* the war of attrition — if it takes N landed blows to drop someone, combat length is bolted to N and the middle of every fight is arithmetic. Worse, an HP character fights at **full effectiveness at 1 HP**, so there is no feedback, no tipping, and no signal: the fight is a flat exchange right up until someone drops.

**So the second, less obvious gain is that a ForeSight fight has a *readable state*.** Because damage degrades, both sides can see who is losing **while it is still happening** — and that is what makes it *hopeless-looking* rather than merely short. In a pool system only the GM knows the score.

**So exchanges come out decisive or ineffectual, and rarely in between** — which is also what the QR distribution does on its own: half of all successes are QR4, a quarter of the maximum. Most passes produce a nick, a stumble, a parry that held; occasionally one produces a corpse. The *rhythm* is therefore nothing-nothing-nothing-**everything**, which is both what violence actually looks like and what reads well at a table.

**The consequence worth being explicit about: the decisive phase is *before contact*.** Awareness, initiative, waiting for a trigger, footing, distance, who is armed and who is ready — that is where the small stacked advantages accumulate, and by the time blades cross the fight is largely already decided (see the *Unforgiven* note above). Combat is a **mode you pass through**, not the main loop. If a fight consumes a session, the game is *about* fighting, whatever else its text claims.

**And because the state is readable, the *right* outcomes become available.** A losing side that can see it is losing will **surrender, break, flee, or beg** — so fights end the way fights actually end, which is rarely with everyone dead. The interesting decision is not *"do I hit him again"* but *"is this still worth it"*, and it gets made mid-fight, with real information, by both sides. **Mercy, prisoners, and running away are mechanically supported outcomes** rather than GM fiat.

> ⚠ **The honest cost, stated in the rules rather than discovered at the table.** Getting hurt is *expensive* and the loop is unforgiving once it starts, so characters who fight fair and often will accumulate consequences fast. The behaviour that follows is correct for the fiction ForeSight runs — avoid the fight, negotiate, ambush, bring overwhelming force, and disengage early when it turns — but it is genuinely **not** the D&D bargain, where combat is the entertainment, you are at full strength until you drop, and death is rare. A table expecting that will be surprised. Tell them first.

### Same odds, different outcomes — and what that gives the GM (2026-08)

**Two systems can agree on *who wins* and disagree completely on *what winning looks like*.** Put a combat-optimised ForeSight character against a combat-optimised HERO or RuneQuest one and the **probability of prevailing may be equal or better** for the ForeSight character. The *spectrum* is what differs: the HERO/BRP build tends to win **without a scratch**, or with wounds that don't signify. The ForeSight build may come off clean — and stands a fair chance of ending the fight **significantly wounded**.

**The structural reason is that ForeSight has a *populated middle*, and the comparison systems mostly don't** (Tonio's reading of them, and both are doing it deliberately):

| | What most outcomes are | What the tail is | Does the middle bite? |
|---|---|---|---|
| **HERO** | nothing — *passive defence* is a penalty on incoming attacks, i.e. **"doesn't get hit"** | *(by intent, there isn't one)* — a basic character survives a 9mm to the head, and being hurt means **hit points need topping up** | No. Characters are meant to be **practically unkillable and un-slow-downable** |
| **RuneQuest / BRP** | *"'tis but a scratch"* — passive **defence** plus active **dodge** and **parry**, and then armour subtracting on top | a critical to the head and **you are dead**; crippling exists but is rare and fixable | Barely — the middle is nominal, so outcomes are effectively **bimodal** |
| **ForeSight** | **a light wound, and a light wound is a pretty huge bummer** — as is one level of exhaustion | incapacitated, then dying | **Yes. That is the whole design.** |

**And the bimodality isn't a flaw in those systems — it is *forced* by the mitigation stack.** Layer enough machinery that reduces the chance of taking **any** damage — a passive to-hit penalty, a dodge, a parry, then armour subtracting from whatever survives all three — and the probability mass piles up at *zero*. Once nothing normally happens, the only way to make combat frightening again is a **critical, one-shot tail**. The design ends up with *nothing, nothing, nothing, dead* because it built three layers whose job is to produce *nothing*.

**ForeSight's answer is that every defensive layer is *graded* rather than binary.** A defence is an opposed QR that **eats part** of the blow rather than negating it; armour **absorbs** but weapons **pierce**; and what lands arrives as **levels that penalise you immediately**. Nothing in the chain has "and then nothing happens" as its normal output, so the middle of the distribution stays populated and no lethal tail has to be bolted on to make anyone care.

> **Design rule: prefer graded mitigation to binary mitigation.** A layer that *zeroes* outcomes hollows out the middle and forces a lethal tail to compensate. A layer that *reduces* them keeps every outcome in play.

> ⚠ **Calibration constraint that follows, and it is load-bearing: level 1 must already hurt.** A **light wound** and a **single exhaustion level** each need to be a genuine bummer. If either drifts toward "'tis but a scratch", the middle collapses, and everything above — readable state, graduated GM feedback, surrender and flight as live options — collapses with it. **Check this first whenever the damage or exhaustion numbers are recalibrated.**

**But the real prize is what it hands the GM: a feedback channel with intermediate values.** In a game where you are fine until you are dead, the GM's only instrument for *that was a bad decision* is **killing the character** — an instrument that is terminal, unrecoverable, and socially fraught, and which therefore teaches nothing except that the table is dangerous. ForeSight says the same thing quietly and proportionately:

> *"That was dumb — you died."* versus *"That was dumb — you're medium wounded now."*

**The second one is a lesson; the first is an ending.** The player learns it, keeps playing, and carries the consequence into the next scene — which is also where the wound does its second job, because it is still −(level) to everything when the next thing happens.

**And it keeps the GM honest without making them an antagonist.** With only a terminal instrument available, a GM who wants to signal *that was a mistake* must either **fudge** — dishonest, and it hollows out every future roll — or **execute** — adversarial, and it feels personal however fair the dice were. A graduated consequence lets them simply apply the rules and let the result speak, which is what this document asks of every other mechanic (see *don't hide a player's own character from them*). **Mechanics that force the GM to choose between lying and punishing are badly designed mechanics.**

### The quantity that matters is *relative net* success (2026-08)

**SC 100 is certainty of the *roll*, never of the *outcome*.** A melee attack is opposed — his defence can eat part of it or all of it — and even a landed blow is then filtered through location, armour and the wound track. So "I cannot miss" is not "I cannot fail"; it only means the first link in a chain of several holds. The same is true of the shot that is aimed, taken, located, and then absorbed.

**Which sharpens "adversity favours the expert" considerably.** The point is not the expert's absolute success chance — it's the **gap in net outcomes**. Drop the ease factor on *both* fighters and the expert pays out of surplus while the novice pays out of his chance of doing anything at all; the *ratio* of net successes moves further than either number does. **Skill in this system is expressed as skill-and-counter, not as a solo throw**, so it is always the relative quantity that decides the fight.

**The design exemplar is *Unforgiven*.** Munny does not win because he is fast. He wins on **a stack of small, individually unremarkable advantages** — he shoots the armed man first, he picks the moment, he has the weather and the dark, and above all he is *calm*. The film argues this in its own text: Beauchamp's education is precisely that the man who wins is the one who **took his time**, not the quick one. **A game that models gunfighting as one "Fast Draw" number cannot produce that scene.** A game of many small ease-factor modifiers, each attached to a decision, produces it as a matter of course — a high probability of the expected result, and no certainty.

**And the reason to decompose a task into rolled steps is *narrative legibility*, not fidelity.** This is the real justification for turning aim and movement from free actions into rolls. When the chain is made of real steps, **failure acquires a cause you can name**: you didn't "just miss" — you never settled your bead, or you didn't see him in time, or you went over on the wet cobbles. Success gets the same treatment. One roll yields "you missed"; a chain yields a *story*, at identical probability and no extra bookkeeping, because each step was a decision someone was making anyway.

> ⚠ **The bound.** Decompose only the steps that are **genuine decisions**. A step nobody chooses is not a story, it's a die roll with a costume on — and that way lies the action-point bookkeeping this edition exists to delete.

**And it composes with the footwork rule rather than duplicating it.** Range control is simply *the commonest reason to move in a fight*, so closing on a spearman is an ordinary Coordination task, opposed, that can be failed — and failing it in the wrong place is how you end up on the floor.

### Framing principle: price the good habit, not the omission (2026-08)

**A bonus for doing the sensible thing and a penalty for skipping it are arithmetically identical and behave completely differently at a table.** ForeSight 2004 already applied this to firearms — the handgun BEF was knocked *down* and *having aimed* became a positive modifier, rather than leaving the BEF high and penalising the unaimed shot. Same numbers, different bookkeeping, and the second one actually happens.

**The asymmetry is about who is holding the incentive:**

- **A bonus is claimed.** The person who benefits is the person who has to remember it — the only bookkeeping arrangement that has ever reliably worked. And a *forgotten* bonus is self-correcting, because the player notices and says so.
- **A penalty must be imposed.** The GM has to remember it *and* be the one to apply it, against a player who would rather they didn't. A forgotten penalty is **silent and permanent**: it makes everyone quietly better than they should be, and nobody at the table ever finds out.

**Applied, and it also removed a divergence rather than creating one.** Aim was briefly put on `4 − QR` to match PM, which left it disagreeing with the One Rule's general **Build** chain (`5 − QR`). The better fix keeps **one chaining number for the whole system** and moves the *baseline* instead: **aim stays on `5 − QR`, and the aimed-attack skills — Firearms, Archery, Heavy Weapons — take a BEF of 4 rather than 5.** A rough bead (+1) then reproduces the old numbers exactly, and a good one beats them. This is the general lesson in miniature: **when a modifier is mis-framed, fix the baseline, not the modifier** — moving the modifier breaks its consistency with every other use of the same idea.

*(Note the firearm's forgivingness now lives in the **skill formula** rather than the BEF, which is where it belonged: Archery is a ½-skill you spend years on, Firearms is not. That distinction survives the BEF cut untouched.)*

**So set the BEF at the careless baseline** — the shooter who raises the weapon and fires — and let aiming, bracing, choosing the moment, using the right tool and taking a spotter earn their way up. **Failing to do them earns nothing, which is punishment enough.**

**This is another instance of the absolute standard.** Games write "unaimed: −2" because that is how a *designer* thinks — a deviation from the ideal case — not how a *table* plays. It is par for the course, it has never been questioned, and it is wrong for a reason that has nothing to do with the numbers being wrong.

> ⚠ **The bound.** This does not license inflating everything into bonuses; that just moves the arithmetic and adds a stack of modifiers to remember. It says: when a modifier is genuinely *optional good practice*, express it as the bonus. Situational facts the world imposes — range, darkness, cover, a moving target — remain penalties, because there is no habit being rewarded and no player who wants to remember them anyway.

> **The general move, worth stating because it keeps paying: replace a free or automatic action with an ordinary roll whose *quality* produces the next state.** It adds no subsystem — the roll, the ladder and the QR table already exist — and it converts a piece of dead bookkeeping into a source of situations. It also gives **QR10** a consistent job across every action type: *you may take no further action of this kind this round*, which is what removed the need for a cap on beats.

> ⚠ **Watch for leverage concentration** — the standing caution from the Coordination note. **CO** gates pre-emption plus everything DX and AG separately gated; **WP** now gates every exhaustion check, Pain Resistance, and convalescence. Two of five attributes carry a lot. The mitigation for WP is that its load is almost entirely **defensive** — maxing it buys durability, not capability — so it should not dominate the way an offensive concentration would. **Verify during point-economy playtesting.**

**Worked family: Endurance — and why it does *not* follow AP out of the attribute list.** *(Written before the decision above; the conclusion did not survive, but the reasoning that produced the AP/EN distinction did, so it is kept.)* EN and AP look like the same case (both drive few or no skills; both bundle several things under one number) and they resolve differently, which makes the pair a useful calibration of the tests.

EN fails the *multi-dimensionality* half: it currently bundles at least three things that correlate poorly — **sustained output** (can you march all day), **resistance to insult** (disease, poison, cold, hunger), and **recovery rate** (how fast you clear an exhaustion level). The unfit man with an iron gut and the marathoner who catches every cold are both ordinary. So far, this is the AP complaint.

But EN **passes the observer-independence test that AP fails**. Whether you can still be walking at hour nine is a fact about the world; nobody's taste enters. There is a real central tendency — *fit* — that a single number tracks usefully. And that is precisely the configuration the framework already has an answer for, because **Coordination is the same shape**: a genuine central axis, with the interesting variation living in deviations from it. CO kept its column and grew a quirk family. EN should do the same.

So the rule the pair establishes: **multi-dimensional + observer-relative → the axis was an illusion, replace it with the family (AP). Multi-dimensional + observer-independent, with a real central tendency → keep the axis, add the family for the deviations (EN, CO).**

This also answers the standing critique that character designs don't differ on EN. The likely cause is not that endurance doesn't matter — it is that **EN is featureless**: there is nothing to *say* about your endurance except a number, so nothing about it is character-defining and nothing about it shows up on the build screen. A family gives it things to say. That is a testable prediction and a cheaper experiment than deleting an attribute: add the family, see whether designs start differing.

The family spans all three carriers, which is what a family is for: a **perk** (built like a Kalenjin distance runner — a clean advantage, bought at full price and narrow enough to be affordable), **quirks** (sprinter or marathoner; an iron gut), and **flaws** (a condition that guts endurance across the board). And it has somewhere real to attach — every member hangs off the **exhaustion track**, i.e. off rolls already being made, which is the survival criterion for intermittent quirks.

**Chronic conditions: a four-line template, not a subsystem.** Haemophilia, asthma, diabetes, epilepsy, chronic pain, a joint that never set right. These are the stress test for the quirk machinery, because they are **diverse, specific, and endless** — no catalogue will ever be complete, so what the game must ship is a way to *write one in a minute*. Four lines, and they are the equipment modifier record (target / scope / combine) with the fields renamed for a human being:

| Line | What it says | Why it's this |
|---|---|---|
| **Attach** | the roll or track it touches | must be one **already being made** — wounds, exhaustion, Pain Resistance, an attribute check |
| **Trigger** | when it bites | must be a condition **already visible at the table** — cold, dust, exertion, a missed meal, an injury. **Never its own timer** |
| **Effect** | one thing, usually an EF shift, a lost automatic pass, or a recovery penalty | one line, or it won't survive contact with play |
| **Management** | the medication, equipment or routine that suppresses it | the interesting half — see below |

**The management line decides which carrier the condition is.** ForePlay already had this exactly right, in one clause: *"Myopic — can be corrected with technology (**in which case it's a Quirk**)."* Short sight plus spectacles is a small two-sided thing you occasionally lose — a **quirk**. Short sight in a world with no lenses is a **flaw**. The condition did not change; its management did.

That makes the fourth line load-bearing rather than decorative, and it means **the same condition changes carrier with the setting**. Haemophilia at TL5 is a prescription and a quirk; at TL1 it is a flaw, and a reason you did not reach adulthood. Same four lines, entirely different life. This is the **setting visible through the rules** — a founding principle, not a bonus.

**Management is also where the drama is.** A well-managed condition is *invisible* almost all the time, which is both true to life and exactly right for play: it costs the table nothing until the story takes the management away. Insulin needs refrigeration; an inhaler is a small object that can be lost, crushed, or left in the other coat. The condition is not a penalty the character carries around — it is a **dependency the adventure can reach for**, and everyone understands its loss instantly without being told the rule.

**Severity needs no levels — write the condition twice.** Mild and severe asthma are two entries, not one with a dial; often the mild one is a quirk and the severe one a flaw. Cheaper to run and easier to pick.

**Conditions can be acquired in play.** A wound that heals badly becomes a chronic quirk — or a flaw, if it's bad enough — by the same template. This is the honest version of a scar table: consequences that are specific, permanent, and hang off machinery already in motion.

**No upside is required, and none is manufactured.** Most of these have no compensating good half — which is precisely the definition of a **flaw** rather than a quirk, and is why the sixth carrier had to exist. **They grant no points**, because drawbacks never fund anything here, and they cost none, because charging a player for their character's body would be absurd. You take one because it is who the character is — which is the whole answer this game gives about why anyone builds an interesting character. What the game must not do is treat a condition as either a tragedy or a secret advantage. It is a fact about a body, it is specific, it is bounded, and the rules should be as matter-of-fact about it as a character's height.

**The selection heuristic falls out of the permanence column: a quirk is who you are; a familiarity is what you've been doing lately.** Jackie Chan learning roller-skating for one film is emphatically *not* a quirk — it isn't permanent and it isn't character-defining; it's a familiarity, and pricing it as a quirk would be a category error that also makes it far too expensive. Conversely "nimble-fingered" is not a familiarity: you don't stop being it because you changed jobs.

Before adding an attribute or a skill, check whether one of those six already carries the distinction — **and check you've picked the right one**, because getting the carrier wrong misprices the thing even when the decision not to add an axis was correct.

**The test — and it must fail in *both* directions to justify a split:**

1. *Forward:* does being good at X make you good at Y? — "Can I be a skilled acrobat and be hopeless at climbing a rope or throwing a ball?" **No.**
2. *Reverse:* does not having X make Y impossible? — "Is a gifted athlete fundamentally unable to do a cartwheel?" **No.**

If competence transfers either way, it's one skill. Split only when both answers are genuinely yes — which is rare, and is why the skill list is short.

**The real-world case is Jackie Chan.** Trained from childhood in acrobatics and martial arts, then acquiring whole new physical vocabularies for individual films — extreme roller-skating for one, a ball sport for another. That is *exactly* the model: a very high broad skill, plus narrow **familiarities picked up deliberately and comparatively fast** for a specific purpose. It also marks the real difference between the two mechanisms — a skill is long accumulation, a familiarity is something a motivated adult can go and get. Trying to model Chan with a pile of separate skills gets both halves wrong: it fails to explain why he's instantly credible at a sport he learned last month, *and* it charges every other character for distinctions they don't have.

**And crucially it isn't lone-genius stuff — his whole stunt team learned the same disciplines.** That matters for calibration, because it means rapid acquisition of a new physical vocabulary on a strong athletic base is **ordinary behaviour for trained professionals**, not a superhuman outlier to be modelled with a rare talent or a heroic point cost. So the familiarity mechanism has to be priced accordingly: cheap and quick enough that *an entire team* can pick one up for a project. If acquiring a familiarity feels like a character-defining investment, it's priced wrong.

Why this is the right default: a new attribute or skill is a **permanent column on every character sheet**, paid for by everyone in complexity whether or not they care. A quirk, an inclination, or a familiarity is **opt-in, cheap, and narrower than the thing it modifies** — and, being narrower, it can express distinctions the broader axis can't (specifically good at *climbing*, not at all agility).

The bound is the same one recorded in the Coordination note: don't collapse so far that one axis concentrates all the mechanical leverage, and don't backfill with a sprawl of faux-attributes (the GURPS failure). Collapse to the level where the *rule* lives, and let quirks, inclinations and familiarities carry the *exceptions*.

## Design note: power/finesse as a framework template (2026-08)

**The five-attribute shape is not only a mnemonic — it's a mould for new subsystems.** ST and CO are the *power* and *finesse* of the body; WP and IN the power and finesse of the mind. Any power framework can be built by naming **which attribute supplies the oomph and which supplies the control**, and it will feel consistent with everything else without further invention.

**Magic already has this shape**, which is worth noticing before building anything new: **Mana** gathers (how much you can raise and hold — the power side) and **Incantation** weaves (how precisely you shape it — the finesse side). The two-skill structure was arrived at for other reasons and turns out to be an instance of the template.

**Psionics — currently vestigial 1986 material — is the obvious next instance**: a *mental* power framework, **WP for oomph, IN for precision**. That's most of the design decided before a word is written, which is the point of having a template at all.

### The anti-pattern this is designed against

**A magic system whose only variable is intensity has no craft in it.** If the lever is amplitude — say the magic word *harder* — then there is nothing to be good at, no interesting choice at the table, and no way for a clever character to beat a stronger one. It is one of the more infuriating features of the Harry Potter books, and it is a trap any power system falls into by default, because amplitude is the easiest dial to write.

**The fix is to let precision substitute for power.** There should be room for a magical **fencer** or **knife-thrower** as well as for Tim the Enchanter: a caster who achieves by *placement* what another achieves by *volume*. Rather than throwing a fireball, ignite the powder in his pistol. The existing two-skill structure already permits this — a high-**Incantation**, low-**Mana** caster is exactly that character — so what's needed is mostly to **say so**, and to make sure the point economy doesn't quietly punish it.

**Precision magic is knowledge-gated where brute magic is power-gated**, and that is what keeps it honest. To ignite the powder you must know the powder is there and how it behaves — a **Field of Knowledge**, bought in years. So the fencer-mage pays too, in a different currency, and **IN** acquires a third job consistent with its other two: it drives **learning rate**, it accumulates **fields**, and it supplies **precision**. The IN build knows more and places better; the WP build simply has more to spend. Both are real characters.

> ⚠ **The balance risk, and it is the serious one.** Precision magic is potentially *far* more efficient — a trivial amount of energy producing a decisive outcome — and if it is priced by the energy involved it becomes strictly better than brute force, at which point the fencer isn't an alternative, it's the answer. The keystone applies exactly as written: **price the capability, not its costume.** Igniting a pistol's charge is priced by what it *achieves* — killing an armed man at range — not by the joules. Get this wrong and the anti-pattern simply inverts: instead of "say it harder", the game becomes "always find the clever tiny effect."

## Design note: Coordination — why DX + AG collapse, and where collapsing stops (2026-08)

*Written in response to community pushback on the merge. Notably there was little objection to EM → PC — which is itself diagnostic (see "leverage", below).*

**The standard this note is measured against.** ForeSight can never be an accurate simulation, and isn't trying to be. It can only **push probabilities in the right direction by plausible amounts** (see First principle). So the theory below — feedback loops, sensitivity vs criterion, the critique of forced-choice instruments — is doing exactly one job: deciding **which bucket** a phenomenon belongs in (Score, quirk, inclination, or Ease Factor) and roughly **how big** the nudge should be. It is justification, not machinery. Nothing here licenses a subsystem, a second roll, or a tracked variable; the deliverable from all of it is *one attribute fewer* and a table of three sentences a GM might say. If any of this argument ever starts generating mechanics, it has been misread.

**The premise: the deft-but-clumsy person is the exception, not the rule.** Coordination is strongly correlated with itself. People who are good with their hands are, overwhelmingly, also good with their feet. Attributes should model *the rule*; quirks model *the exception*. An attribute per exception is how you end up with a character sheet full of things almost nobody differs on.

**Both are the same faculty.** At a neurological level, agility and dexterity are both **sensorimotor feedback loops** — brain wiring plus practice. Whole-body balance and fine finger control differ in which muscles they recruit, not in what kind of capability they are. Splitting them models one faculty as two.

**An attribute measures that loop under good conditions.** Someone may have an excellent loop *and* an inner-ear problem: capable of being a superb dancer, but operating at a deficit whenever the vestibular trouble cuts in. They are not a low-Coordination character; they are a well-wired character with a **condition**. Nobody goes to dance practice while their inner ear is playing up, or practises lockpicking with the shakes from alcohol withdrawal — so what the attribute records is trained capability under the conditions in which it was trained.

That generalises into the governing rule:

> **Stable capability belongs in the Score. Situational variance belongs in the Ease Factor.**

An attribute that absorbs situational variance is a category error. Darkness, missing glasses, gloves, the shakes, an inner-ear flare — these are EF modifiers, not different Scores. This is also the answer to "why not split PC into individual senses?": being unable to see in the dark is a modifier, not an attribute. **1986 already made this call** — superb/inferior eyesight and hearing are entries on the Abilities & Limitations table, written as narrow BEF modifiers to named skills.

**The split let you buy characters who can't exist.** Under separate DX and AG you could build a great fencer with high AG and low DX — but fencing *is* footwork and point control together. At the resolution a character sheet works at, that distinction isn't real. That's a **falsehood implied by the game-system**, which is failure mode (a) in the 1986 ForeWord — the specific thing ForeSight was designed to avoid. Merging removes a way to buy an impossible character.

**Where the variation actually lives** — three homes, narrowing:

| Home | What it covers | Example |
|---|---|---|
| **Skill** | learned, specific competence — where "good at X" mostly belongs | Fencing, Lockpicking, Dance |
| **Quirk** | a small permanent fact about you; cheaper than an attribute point | nimble-fingered, graceful, superb eyesight |
| **Condition / situation** | an Ease Factor modifier, applied when it bites | inner ear playing up, the shakes, darkness |

Quirks run **both ways** — you can be notably worse as well as better — but a drawback yields at most a *minor* offset, never a point windfall: we reject the GURPS/HERO disadvantage economy outright (see "granularity goes down" above). The deft-hands/clumsy-body character is buildable and cheap; what they don't get is banked points, because farming points by being bad at things is exactly what the merge removed.

### Companion case: EM → PC, and why it's an *inclination*, not an ability

The usual framing — "they have trouble understanding emotion" — is a poor model to design to, and building an attribute on it bakes the poor model into the system. A better model, and the one this edition designs to: the difference is largely one of **confidence policy**, not perceptual capability. Someone accustomed to domains where evidence yields a definitive or near-definitive answer is correspondingly reluctant to *act* on a low-certainty read — especially where the stakes are high-value relationships and the inference can't be checked. The neurotypical default is closer to: live in the haze, take the likelier option, move on. That's a difference in **what you'll stake on a marginal read**, not in the quality of the read.

**Sherlock Holmes is the test case, and he breaks the EM attribute.** He reads people superbly *and* is socially disastrous. Under EM-as-an-attribute he is unbuildable — you'd need high EM and low EM at once. That's the same structural failure as the fencer above, from the other direction: the attribute **conflated two different things**, the perception of people and the willingness to act on uncertain perceptions of people.

**ForeSight already has both categories, and has since 1986:** *"while what a character can do is determined by his/her abilities, what he/she chooses to do is governed by his/her inclinations"* — inclinations recorded as Personality Traits. So the fix needs no new machinery, just the correct machinery:

- **Ability → PC.** How well you read people. Holmes: high. This is a roll.
- **Inclination → Personality Trait.** What you'll commit to on a marginal read. Holmes: won't stake a valuable relationship on a weak inference, but will cheerfully run it as a testable hypothesis.

This fits the resolution system unusually well, because **QR is already a confidence gradient**. The character gets the read their PC earns; the inclination governs what they *do* with a QR3 as against a QR1. No new subsystem, no attribute — and it models the actual phenomenon rather than a deficit that isn't there.

**Why we design to the model rather than to the literature's headline.** The finding that autistic people "read emotion worse" rests largely on **forced-choice instruments**: here is a photo or sketch, which emotion is it? Two problems compound.

First, the **key is the modal judgment, not ground truth** — the scorer has no independent access to what a posed subject felt. So the instrument measures *agreement with the consensus reading*, and reports it as accuracy.

Second, and more fatal for our purposes: **forced choice cannot separate sensitivity from criterion.** It collapses exactly the gradient that distinguishes them. A respondent with a high threshold is compelled to answer below it, and their answer then loses to a confident guesser — because a confident guesser is *optimised for precisely this task*, picking the likelier option and moving on. Under that instrument, "I saw something, possibly anger or disgust" scores zero, and "anger" scores one, whether or not the subject was angry.

The isomorph: a multiple-choice English Literature exam where the strongest students score *below* the middling ones. Deeper engagement with a text surfaces defensible alternative readings, and defensible alternatives are marked wrong. Performance on a keyed instrument can be **non-monotonic in actual ability** — which tells you about the instrument, not the students.

To be honest about the limit: none of this shows there is no difference. It shows the instrument **cannot license an *ability* penalty**, because it can't distinguish "perceived less" from "required more before committing" from "declined the forced binary." That is sufficient for a design decision.

Three rules follow, and they generalise past this case:

1. **Never derive a capability score from a forced-choice instrument.** If the measurement destroys the confidence gradient, it can't tell you where to put the number.
2. **Don't let the system assert a measurement artifact as a truth about people.** Handing autistic-coded characters an attribute penalty would do exactly that — the 1986 ForeWord's failure mode (a), pointed at people instead of physics.
3. **ForeSight's own resolution is the better instrument.** QR *is* a graded-confidence report: QR1 "you know", QR3 "you have a fair read", QR4 "you have an impression". Keep the read graded and let the inclination govern the report, and the system represents the phenomenon more faithfully than the questionnaire it would otherwise have copied.

**Refinement: it's two dials, not one.** The inclination decomposes into (1) an **evidence threshold** — how much certainty before something counts as actionable — and (2) a **tolerance for suspended judgment** — whether you can hold an unresolved "maybe" open. Their *interaction* produces the behaviour:

| Threshold | Suspension | The same marginal read is experienced as |
|---|---|---|
| Low (typical) | either | "I think they're angry." Resolve, act, move on. |
| High | tolerant | "Something around the eyes — anger or disgust; I can't tell which." Held open as a testable hypothesis. |
| High | intolerant | "That was noise, not data." Discarded — and *looks* from outside like not having noticed. |

That third row is the one the standard framing misreads. The micro-expression *was* seen. What differed was the disposal of a sub-threshold signal, and with no tolerance for holding it unresolved, discarding is the only move left.

This has a precise name outside gaming: **signal detection theory** distinguishes *sensitivity* (d′ — how well you can actually discriminate signal from noise) from *criterion* (β — where you set the bar for declaring "signal"). Sensitivity is the **ability**; criterion is the **inclination**. A high-criterion observer misses real signals but rarely false-alarms; a low-criterion observer catches more and false-alarms more — which is *adaptive* socially, where warmly misreading someone is usually cheap. The Big Five framing (preference for consistency / openness) and need-for-closure point at the same dials from the personality side. This is worth stating because it makes the split defensible on grounds the playtesting community will respect, rather than as taste.

**Mechanical consequence: nothing new is needed — the GM changes the *phrasing*, not the roll.** The character rolls PC and earns a QR as normal. The inclination determines how the result is *delivered* to the player, per the table above. Same score, same roll, same QR; three different sentences. That is a GM-facing guideline, not a subsystem — and it's the kind of thing the one-pagers should carry as an example rather than a rule.

Design consequence worth noting: this makes "empathy variation as a quirk" (item 6 above) more precise. Some of it is a **quirk** (genuinely sharper or duller perception of people — a PC modifier), but much of what people mean by low EM is an **inclination**, and putting it in the wrong bucket produces characters who can't read a room when the truth is they won't bet on the reading.

**Where collapsing stops.** Two failure modes bound it in opposite directions:

- **Too broad → GURPS.** Attributes so general they stop discriminating, then backfilled with a sprawl of special-case faux-attributes: the surgeon picks locks and does sleight of hand, the Nobel physicist is an expert scuba diver. The count of "attributes" becomes meaningless and the game gets *more* complex while looking simpler.
- **Too concentrated → leverage.** Merging two *mechanically leveraged* stats yields one double-leveraged stat that every character must max. This is the real reason not to keep collapsing: **CO already gates pre-emption plus everything DX and AG separately gated.** That's the ceiling — don't merge another leveraged axis into it. (Watch for CO becoming the must-max attribute during point-economy playtesting.)

*Diagnostic aside:* the muted reaction to EM → PC supports this reading. EM carried little mechanical leverage, so nobody optimised it and nobody mourns it. AG fed Speed, and Speed drove the 1986 combat action economy — so AG was **the** optimisation lever, and the attachment is to the lever, not to the description. That lever is already detached: modern Initiative is awareness- and position-driven rather than derived from a Speed stat.

**The test, stated fully.** Collapse two axes when *all three* hold: (1) they are the **same faculty**, not merely correlated; (2) their apparent differences are explained by **skill, quirk, or condition**; and (3) the merged axis doesn't **concentrate too much mechanical leverage**. Otherwise keep them apart — which is why **AP** *appeared* to stay (it correlates with nothing: you can be weak, stupid, clumsy and gorgeous) — **but see "Quirk families": independence is necessary and not sufficient, and AP fails the further test that an attribute be a scalar, observer-independent quantity** and why sub-capabilities like eyesight or left-hand coordination stay quirks.

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

**The axis also sets the character-side baseline, and that is what decides the carrier.** An axis level says what an *ordinary person in this setting* has — and **access above or below that baseline is a perk, a quirk, or a flaw**, by exactly the rule that governs every other quirk: *a quirk is a deviation from the local default.* The setting supplies the default. The capability itself never changes carrier; its **distance from the baseline** does.

| Setting | Axis level | Baseline access | So having *more* is… | And having *less* is… |
|---|---|---|---|---|
| **Norstrilia** | Psionics: common | everyone is telepathic | ordinary skill, not a carrier | a **flaw** — you are the deaf one |
| **Earthsea** | Magic: rare | none | any access at all is a **quirk**; full access a **perk** | nothing — it's the default |
| **Modern realistic** | Magic: none | none | — | — |

This is the **same rule as the myopia case**: spectacles make short sight a quirk, their absence makes it a flaw, and the condition never changed. Here the setting dial does what the technology did. One rule, two applications — which is the test that it is a real rule.

**The expressive gain is partial access.** Today the entry point is a single Intrinsic factor — *Magical / Mystic / Psionic / Ch'i Talent* — and it is **binary**: you have the talent or you don't. A quirk family gives a ladder instead: **no access · a trickle · full**, with the baseline sitting wherever the axis puts it. A world where most people can light a candle and nobody can do more is now describable, and it wasn't.

> ⚠ **Don't let this become a tax.** In a high-magic setting, access is *free* — it's the baseline — and the interesting variation is **skill**, not access. Charging everyone a slot for the thing everyone has is the failure mode, and it's the same error as a flaw that doesn't bite.

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

## Evidence standard: use is not testing (2026-08)

**The 1986 core was blind-tested and iterated over decades — sent out to testers who didn't know the intent, across dozens of full distributions.** That is measurement. It is a different kind of evidence from "published and then played by a lot of people", which generates volume but very little signal: there's no control, nothing is recorded, and players **silently house-rule around anything broken**, so the failure is patched at ten thousand tables and reported by none of them. A rule whose text and behaviour diverge can survive many editions on those terms, because editions are additive and nobody re-derives arithmetic that looks fine. (Tonio's example: GURPS's impaling damage rule doing the opposite of what it describes, across six-plus editions.)

**Blind is the load-bearing word.** A tester who knows what the designer intended corrects toward it unconsciously and reports success. That's a demonstration, not a test.

**Two kinds of evidence, and they must not be conflated.**

- **Behavioural evidence — what players actually did.** Decades of blind testing produced observations about *use*, not just outcomes: **nobody tracked fatigue correctly; everybody tracked wounds.** That is hard evidence about a mechanic, and it is exactly what the 2026 changes are built on. Collapsing pools into an exhaustion track shaped like the wound track isn't a guess — it's collapsing *toward the mechanic that demonstrably worked*, for a reason we can name.
- **Distributional evidence — whether the numbers come out right.** This is what a specific new value does across the range, and it's what the new work mostly lacks.

**A second qualifier — testers don't report genre conventions.** Blind testing measures what testers *noticed*, and a cost that every RPG of the era imposed is invisible rather than absent. 1986's chargen gotchas are the worked case: new players' sheets were routinely rebuilt in the first session or two and **nobody logged it as a defect**, because it was normal everywhere. So "decades of testing produced no complaint" is strong evidence about anything a tester would have *noticed*, and weak evidence about anything they'd have taken for granted. See "The behavioural evidence for this, from 1986".

**A necessary qualifier on 1986's numbers: some were *fitted*, not chosen.** The old yields were reverse-engineered to reproduce **James Bond 007's** damage tables — the system ForeSight's resolution engine descends from. So they carry playtest evidence that *the fitted values worked in play*, but their **shape was an inherited constraint**, not a design intention. The special rounding rules (round off on QR1–2, down on QR3–4) are the fingerprint of that fit: they exist to smooth a curve that wasn't ours, and they're why an Excellent hit could do the same damage as a Good one. The 2026 yields, by contrast, start from *what do we actually want to happen* — which is why they separate cleanly with plain round-down.

**Consequence for the source hierarchy:** "1986 has the evidence" holds for numbers that were *designed and then tested*. Where a 1986 number was **fitted to an external table**, the evidence says it was playable, not that it was right — and a visible artefact (a collapse, a special-case rounding rule, a discontinuity) is good grounds to suspect a fit rather than an intention. Check for the fingerprint before deferring.

**So the 2026 decisions are evidenced in direction and unevidenced in calibration.** The diagnosis (fatigue was ignored, wounds weren't) and the response (make the survivor the model) rest on real observation. The *numbers* — how many exhaustion levels, what each level costs, the QR-ladder yields — do not yet, and that's what still needs measuring. Note also that the tradesman/amateur anchor above is **1986 rules surviving into the present**: it's continuity evidence, not validation of anything new.

**The survival criterion, which is the generalisable prize here.** Fatigue and wounds were both in the tested system; only one was used. The difference:

> A mechanic survives contact with a real table when it is **cheap to track** *and* **only changes when the change matters**.

Wound level passes both — it's one number, and it moves only when something significant just happened, at which point everyone is paying attention anyway. Fatigue-as-a-pool failed both: constant small bookkeeping, and almost all of that bookkeeping changed nothing. **This is a test you can apply to a proposed subsystem before building it**, and it retroactively explains several other decisions in this document (no separate XP currency, familiarities as examples rather than tables, no disadvantage ledger). Anything requiring continuous tracking of a value that rarely alters an outcome will be quietly dropped by the table, and a rule that is quietly dropped is worse than no rule, because the text still claims it applies.

So the obligations that follow:
1. **Where 1986 and 2026 disagree on a *number*, 1986 has distributional evidence and we have a reasoned intention.** Log it as a calibration item rather than defaulting to the new value (already the rule in CLAUDE.md — this is why).
2. **Prefer anchors checkable against the world** over internal elegance — the tradesman/amateur pair above is worth more than any amount of reasoning about what "feels right", because it can be wrong.
3. **Playtest blind where we can**, and treat enthusiastic reports from people who've read this document as demonstrations, not data.
4. **Re-derive the distributions** when a mechanic changes, rather than assuming the text still describes the behaviour. That's the specific failure mode above, and we are not immune to it.

## Calibration anchor: the tradesman and the amateur (2026-08)

The most useful sanity check we have on the whole engine, because it's checkable against life rather than against taste.

**A competent, experienced tradesman has a skill Score of about 15** — which is a **7–8 attribute** plus levels. (Attributes run 3–16, most people sit at 7–8; 9 is *not* typical, contrary to an earlier draft of `creating-characters.md`.)

You call them about something you couldn't fix yourself:

| | Score | Ease Factor | SC | Outcome |
|---|--:|---|--:|---|
| **Tradesman** | 15 | BEF 5, **−1** problem beyond a layperson, **+1** professional tools = **5** | **75** | fixes it 3 times in 4 |
| **You** | 10 | BEF 5, **−1** problem, **−1** whatever was in the kitchen drawer = **3** | **30** | fixes it under a third of the time |
| **You, but handy** | 15 | BEF 5, **−1** problem, **−2** never done plumbing, **−1** bad tools = **1** | **15** | one time in seven |

And the QR bands do the rest of the work: at SC 75 the bare-success band (QR4) is 38–75, i.e. **half of the tradesman's successes are "barely a fix"** — the tap stops dripping but you know they'll be back. That matches life closely enough to be uncanny, and it wasn't tuned to; it falls out of Score × EF and the QR ladder.

**The third row is the granularity principle made mechanical.** You have *exactly the tradesman's Score* — 15, you're genuinely good at fixing things — and you succeed one seventh as often, because you've never done plumbing (−2) and you're working with the wrong tools (−1). That gap is not skill; it's **familiarity and equipment**. Which is precisely why plumbing doesn't need to be its own skill, and why surgery doesn't either: the broad skill says you're competent with your hands, and the familiarity (plus the Field, plus the kit) says whether you're competent *at this*. If we'd split the skills instead, the same character would be modelled as unskilled — which is false, and would also mean their general repair ability did nothing for them at all.

**What this anchor pins down, and what to check against it:**
- **Attribute scale** — a 7–8 typical person, not 9. If "typical" drifts upward, the tradesman becomes superhuman.
- **The value of tools** — the ±1 swing between professional and improvised kit is **two EF steps**, which is most of the gap between an expert and you. That's the right weight for equipment, and a bound on how much gear should ever be worth (see the Equipment grain note).
- **The QR ladder** — that half of marginal-SC successes land on QR4 is a *feature*, and it's the 2026 ladder doing it. Worth re-checking if the ladder is ever retuned (see the live 1986-vs-2026 disagreement below).

## Calibration notes (test these)

**The point economy has shrunk and must be re-tuned by play.** The streamlining cuts how much there is to buy:

- **5 attributes instead of 9** → ~56% as many attribute *sinks*; and, more importantly, **36 → 10 pairwise tradeoffs** for the player to weigh (`n(n−1)/2`), a 3.6× cut in the actual work of building a character.
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
