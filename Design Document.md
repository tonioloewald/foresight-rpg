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

## Design note: don't hide a player's own character from them (2026-08)

**The case:** in HindSight, **Piety is a secret the GM keeps about your character**. You spend time and experience pursuing belief, and the GM privately tracks how well you're doing.

**Why it's out.** It is, in one sense, atmospheric — and the reason it's tempting is real: a devout character shouldn't *know* their standing with a god the way they know their Strength. But the cost is that **part of your own character sheet is unavailable to you**, and that makes it an *untrusting* mechanic. It is the same move as making a player roleplay a delusional character by lying to them: it manufactures the experience by withholding, rather than by giving the player something to play. Equivalent techniques used on actors by directors are now generally regarded as abuse, and the analogy is not a stretch — both work by denying an informed participant their own ground truth.

**What replaces it.** Piety is a **skill, visible on the sheet, driven by deeds rather than experience points** and earned back by devotion rather than rest, gating a **divine-favour exhaustion track** (see Exhaustion). The player can see it, plan around it, and *choose* to spend it — which is more playable, and produces the same fiction without the deception. It also decouples the character from one GM's private ledger: the old design effectively welded a character to a single setting and referee, which is fine until the campaign ends or the group changes.

**It also assumes a social framing most tables don't have.** A GM-held ledger presupposes one persistent referee running one continuous campaign. A great deal of actual play isn't that: a **pool of characters, rotating GMs, and a "campaign" that is vague, cooperative, or nonexistent**. Bob runs something this week, Shirley runs something next week, and players pull their characters off the rack — which is exactly how *James Bond 007* adventures worked, the very system ForeSight's resolution engine descends from. Any stat that lives in one GM's head makes a character non-portable between tables, and silently punishes the most common way people actually play.

This converges with the architecture: the delivery model already requires **each character to be a self-contained record** (see *Delivery, hosting & persistence* — characters saved by players, campaigns hosted by GMs). GM-secret state is not merely untrusting, it is **unserializable** — it cannot live in the character record, so it cannot travel with the character. The design principle and the data model point the same way.

**The general principle, which will recur:** *a player's own character is not a place to hide information.* Uncertainty belongs in the **world** (what the god will actually do, whether the omen means what you think) and in the **roll** (QR is already a graded-confidence report — see the EM/PC note). It does not belong in a hidden stat. Watch for this whenever a subsystem is tempted to track something about a PC in secret — corruption, sanity, standing, true loyalties. Model the *uncertainty*, not the *concealment*.

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

**So there are five downward carriers, not two** — each *narrower* than a new axis, but they are not interchangeable, and they differ most importantly in **permanence**:

| Carrier | What it says | Permanence | Cost shape |
|---|---|---|---|
| **Quirk** | who you *are* — nimble-fingered, one-eyed, graceful | **permanent and irrevocable**, character-defining | a **tradeoff**: the good half is paid for by the bad half (or by points/slots). Cheap in the sense a bargain is cheap, not in the sense a small purchase is |
| **Perk** | a focused advantage you *bought* — no downside attached | **permanent** | **not cheap.** A straight-out advantage, so it's paid for in points at full price. Narrow scope is what keeps it affordable at all |
| **Inclination** | what you'll *choose* to do | persistent, but shifts through **play** rather than purchase | free; it costs nothing and constrains nothing mechanically |
| **Familiarity** | what you've *been doing lately* | acquirable, and **losable** | cheap **and fast** — a motivated adult, or a whole stunt team, can go and get one |
| **Field of Knowledge** | what your hands are *pointed at* | acquired over years, then kept | 4 points per year, hierarchical, shared across skills |

**Quirk and perk are the same *shape*, differing in how you pay.** Both are permanent and narrow. A **quirk is a trade** — the good half comes with the bad half. A **perk is a purchase** — a clean advantage with no drawback, paid for in points at full price, affordable only because it is tightly focused.

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

**The selection heuristic falls out of the permanence column: a quirk is who you are; a familiarity is what you've been doing lately.** Jackie Chan learning roller-skating for one film is emphatically *not* a quirk — it isn't permanent and it isn't character-defining; it's a familiarity, and pricing it as a quirk would be a category error that also makes it far too expensive. Conversely "nimble-fingered" is not a familiarity: you don't stop being it because you changed jobs.

Before adding an attribute or a skill, check whether one of those five already carries the distinction — **and check you've picked the right one**, because getting the carrier wrong misprices the thing even when the decision not to add an axis was correct.

**The test — and it must fail in *both* directions to justify a split:**

1. *Forward:* does being good at X make you good at Y? — "Can I be a skilled acrobat and be hopeless at climbing a rope or throwing a ball?" **No.**
2. *Reverse:* does not having X make Y impossible? — "Is a gifted athlete fundamentally unable to do a cartwheel?" **No.**

If competence transfers either way, it's one skill. Split only when both answers are genuinely yes — which is rare, and is why the skill list is short.

**The real-world case is Jackie Chan.** Trained from childhood in acrobatics and martial arts, then acquiring whole new physical vocabularies for individual films — extreme roller-skating for one, a ball sport for another. That is *exactly* the model: a very high broad skill, plus narrow **familiarities picked up deliberately and comparatively fast** for a specific purpose. It also marks the real difference between the two mechanisms — a skill is long accumulation, a familiarity is something a motivated adult can go and get. Trying to model Chan with a pile of separate skills gets both halves wrong: it fails to explain why he's instantly credible at a sport he learned last month, *and* it charges every other character for distinctions they don't have.

**And crucially it isn't lone-genius stuff — his whole stunt team learned the same disciplines.** That matters for calibration, because it means rapid acquisition of a new physical vocabulary on a strong athletic base is **ordinary behaviour for trained professionals**, not a superhuman outlier to be modelled with a rare talent or a heroic point cost. So the familiarity mechanism has to be priced accordingly: cheap and quick enough that *an entire team* can pick one up for a project. If acquiring a familiarity feels like a character-defining investment, it's priced wrong.

Why this is the right default: a new attribute or skill is a **permanent column on every character sheet**, paid for by everyone in complexity whether or not they care. A quirk, an inclination, or a familiarity is **opt-in, cheap, and narrower than the thing it modifies** — and, being narrower, it can express distinctions the broader axis can't (specifically good at *climbing*, not at all agility).

The bound is the same one recorded in the Coordination note: don't collapse so far that one axis concentrates all the mechanical leverage, and don't backfill with a sprawl of faux-attributes (the GURPS failure). Collapse to the level where the *rule* lives, and let quirks, inclinations and familiarities carry the *exceptions*.

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
| **Quirk** | a narrow permanent trait; cheaper than an attribute point | nimble-fingered, graceful, superb eyesight |
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

**The test, stated fully.** Collapse two axes when *all three* hold: (1) they are the **same faculty**, not merely correlated; (2) their apparent differences are explained by **skill, quirk, or condition**; and (3) the merged axis doesn't **concentrate too much mechanical leverage**. Otherwise keep them apart — which is why **AP** stays (it correlates with nothing: you can be weak, stupid, clumsy and gorgeous) and why sub-capabilities like eyesight or left-hand coordination stay quirks.

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

## Evidence standard: use is not testing (2026-08)

**The 1986 core was blind-tested and iterated over decades — sent out to testers who didn't know the intent, across dozens of full distributions.** That is measurement. It is a different kind of evidence from "published and then played by a lot of people", which generates volume but very little signal: there's no control, nothing is recorded, and players **silently house-rule around anything broken**, so the failure is patched at ten thousand tables and reported by none of them. A rule whose text and behaviour diverge can survive many editions on those terms, because editions are additive and nobody re-derives arithmetic that looks fine. (Tonio's example: GURPS's impaling damage rule doing the opposite of what it describes, across six-plus editions.)

**Blind is the load-bearing word.** A tester who knows what the designer intended corrects toward it unconsciously and reports success. That's a demonstration, not a test.

**Now apply it to ourselves, which is the only reason it's worth writing down.** The 1986 *numbers* have this evidence behind them. **The 2026 decisions do not.** The attribute merge, exhaustion replacing pools, the QR-ladder change (SC/5 → SC/4, and the 100/90/75/50 → 100/80/50/25 yields), the point economy, broad skills — all of it is currently in exactly the category we're criticising: reasoned carefully, never measured. Being better-argued than the alternative is not the same as being tested, and this document is full of good arguments.

So the obligations that follow:
1. **Where 1986 and 2026 disagree on a number, 1986 has evidence and we have an opinion.** Log it as a calibration item rather than defaulting to the new value (already the rule in CLAUDE.md — this is why).
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
