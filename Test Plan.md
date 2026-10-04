# ForeSight RPG — Review & Test Plan

How we find out whether the rules work. This is the **methodology**, not the
backlog: the lenses, the testers, the protocols, the corpora and the stated
limitations. Which of these have been run lives on the **virta board**
(`virta list "project:foresight-rpg area:playtest"`), because a protocol you
execute and a list you tick are different documents and keeping them in one
file guarantees the list rots.

It exists because the rules have an evidence problem that is the mirror of the
code's. `Design Document.md` → *Evidence standard: use is not testing* records
it: the **1986** core was blind-tested for decades and shipped, so it has table
evidence and no editorial polish; the **2004** draft was edited, modernised and
proofread and was **never played**, so it has polish and zero table evidence.
The 2026 edition inherits 2004's prose and 2004's silence. Every number we
changed this year was changed on an argument.

Distinct from the nine-lens code review, which this borrows its shape from:
tier by what changed, not by ceremony.

---

**Premise:** the nine-lens code review is oriented to library development and doesn't transfer. Rules need their own lenses. **And the case is stronger than symmetry:** this project has accumulated a pile of *falsifiable distributional claims* — fights end in a few exchanges, the outcome middle is populated, adverse conditions favour the expert, the fencer stays viable at `+1/−1/−3`, a light wound already bites, ambush is decisive — and the Design Document's own evidence standard says **distributional evidence is exactly what the 2026 work lacks.** A test process is the missing half of a standard we already wrote down.

## The programme

### The lenses (Tonio's five, plus two)

| Lens | Hunts | Runnable by agents? |
|---|---|---|
| **Lawyer** | contradictions, double-counting, rules that don't compose | **yes — best yield, start here** |
| **War-gamer** | dominant strategies, exploits, gaps | yes (a search problem) |
| **Combat war-game** | what duels / uneven fights / ambushes actually look like | **yes, computationally** |
| **Blind tester** | comprehension; extrapolation from the page | **only with enforced context isolation** |
| **Role-player** | can it express oddball characters? | partly — see the matching test below |
| **+ Survival** | *will anyone bother tracking this?* | needs a table |
| **+ Regression fixtures** | named behaviours that must not silently break | yes |

**Lawyer first, on evidence:** it found five real defects in one session *by accident* — the `Score ÷ 5` beats gotcha, the `Build`(5−QR)/`PM`(4−QR) divergence, Charm and Confidence both claiming persuasion, `playtest-pack.md`'s never-synced social formulas, and Firearms BEF double-counting the aimed shot.

**Survival is distinct from comprehension:** a rule can be clear, exploit-free, and still get dropped in play — which is what happened to 1986 fatigue tracking.

**Regression fixtures:** the **fencer** is the first one (already flagged). Reviews find new problems; fixtures stop old wins breaking when the ladder slope moves.

- [ ] **Tier by what changed, not by ceremony** (mirrors the code process's *trigger on the work, not the version letter*): a changed **number** → distributional + fixtures; a changed **rule** → lawyer + war-gamer + survival; changed **prose** → blind comprehension; a new **subsystem** → all of it.

⚠ **Ceremony risk:** five lenses on a pre-playtest book generates reports nobody acts on, and `CLAUDE.md` warns against importing ceremony this repo has no use for. **Start with two** (lawyer + simulator); add a third only when one stops finding things.

### Blind testing with local LLMs (Tonio)

**Use deliberately weaker local models** — `ollama` + `llama3:latest` is installed, plus LM Studio. The reason is methodological: **capability is a confound.** A frontier model extrapolates successfully *because* it's smart enough to fill the gap, hiding the defect being hunted. A weak model fails where a tired human fails. **Consistency beats quality** — pin one model so scores compare across revisions.

**Measure extrapolation and application, not recall.** Best items are cases the page *doesn't* cover but implies: if a weak reader can derive an uncovered case, the page taught the rule; if it only answers what's literally stated, the page listed facts.

- [ ] **Examples vs statements of principle** — Tonio expects examples to win. Likely true, with a refinement worth testing rather than assuming: examples can *degrade* extrapolation via surface pattern-matching (an example about shooting teaches "this is a shooting rule" when Intense Action is a general attention rule). Hypothesis: **principle once, then an example deliberately *distant* from the obvious case.** Test near-variant vs far-variant on the same battery.

Note our one-pagers are **already example-dense**, so the first run may not say "add examples" but **which examples are load-bearing vs decorative**.

- [ ] **⚠ Validate the instrument first — git history is a labelled test set.** Run the battery against known-bad revisions with already-diagnosed defects: `intense-action.md` before the beats fix, `fire-combat.md` before the bead, `playtest-pack.md` with contradictory social formulas. **If the harness doesn't flag the `Score ÷ 5` breakpoint, the battery is too easy** — and we'd get a clean report on the next gotcha and believe it.

**The real prize: a regression harness for prose.** Same model, same battery, re-run on every one-pager edit — comprehension as a number that can go *down*. Only possible because this book is also a build.

### Character-expression test (Tonio's design)

**Phase 1 — recognition.** Express a list of excellent story characters in the rules; hand testers the descriptions and the (shuffled) sheets. Two separate metrics: **discriminability** (can they match sheet → description? — do the rules carry distinguishing information?) and **fidelity** (do they judge it a *good* representation? — a sheet can be matchable and still wrong).

**Phase 2 — generation.** Give descriptions, ask testers to build the character. **Convergence is the metric, and divergence is the finding:** *where* builds scatter names the under-determined axis (agreement on skills but scatter on attributes ⇒ thin attribute guidance).

- [ ] **Run it as a retrospective test of the attribute cut — highest value.** Express the same list under **7 attributes and under 5**, compare matching accuracy. 9→7→5 was argued on the claim that the removed axes didn't discriminate; **matching accuracy is that measurement**, and it currently rests on argument alone.

⚠ **Near-pairs or the test is trivial.** Conan vs Miss Marple is separable by ST alone. It only bites on superficially-similar, actually-different pairs: **Holmes/Poirot, Fafhrd/the Mouser, Ripley/Sarah Connor, Aragorn/Boromir** — which is also where a reduced attribute set is most at risk.

⚠ **Strip names and flavour text.** A tester matches on *"Weaseling in the Beyond"* or a quirk called *Reads People* without reading the mechanics. Mechanical content only, or you're testing our labelling — a real question, but a different one.

Local models suit the **matching** task well (closed-form, scoreable, so run it 50× for a distribution). The **fidelity** half needs humans.

*Operationalizes the Design Document's existing instinct — "ask objectors for character concepts CO+quirks genuinely can't express" — making it measurable instead of rhetorical.*

### Character corpus: clusters within a role (Tonio, 2026-09)

**The unit is a cluster of same-role characters, not arbitrary pairs** — it controls for *function*, so a tester can't shortcut via "this one's the detective" and has to match on *how*. Tonio's starting clusters:

| Cluster | Characters | What it probes |
|---|---|---|
| **Detectives** | Holmes · Columbo · Poirot · Marlowe | IN/PC brilliance vs method vs street |
| **Action / spy** | Bond · Ethan Hunt · Bourne · John McClane | resources vs team vs reflex vs punishment |
| **Swordsmen** | Lancelot · Fafhrd · Aragorn · Aillas | the melee + reach work; ST vs CO builds |
| **Faces / con-artists** *(suggested)* | Danny Ocean · Abagnale · Saul Goodman · Sawyer | **the brand-new Charm / Confidence / Perform split** — liked vs obeyed vs believed-to-be-someone-else |

| **Wizards** | Gandalf · Ged · Harry Potter | **the magic power/finesse split** — see below |

**The wizards cluster probes the magic design precisely, because the three sit at different points on the axis:**

**Ged** is the **design target** — true names, precision, knowledge-gated power. Literally the *fencer-mage*: IN, Fields, small exact effects.

**Gandalf** is the awkward one: most of his power is never spent, and what he *does* all book is **Charm, Confidence, Perform and Fields**. Expect a low-spend social character with a huge unused reserve — arguably correct, and it will *look* wrong on a sheet.

- [ ] **Harry Potter is the amplitude model we explicitly reject** (spell-per-effect, intensity as the only lever) and **probably cannot be expressed well, by design.** Worth making a **stated limitation rather than a discovered surprise** — tell a reader arriving from those books, in the same breath as naming *"say the magic word harder"* an anti-pattern.

#### Worked confirmation on two clusters (Tonio, 2026-09)

**Skills don't differentiate, in either cluster.** *"Han Solo uses a blaster well but so does Leia and aside from tech so does Chewbacca"* — yet all three are trivially separable by **voice, quote, personality, manner**, any one alone. And *"Bourne vs Hunt vs Bond comes down to personality, edge case abilities, and things like needs."* All three have spy skills maxed.

- [ ] **Testable prediction for the ablation, from this:** the action/spy cluster should show **near-zero lift at the skills rung and large lift at the quirk rung.** If that pattern appears, the thesis is confirmed on data rather than argument.

**"Edge case abilities" = the perk layer — and here it carries the *competence* differentiation skills can't.** Bourne's reflexive training he doesn't remember acquiring; Hunt's absurd physical envelope; Bond's gadget access and social licence. Base skills identical, perks separate them. **So the quirk/perk rung does double duty in this cluster: competence *and* personality.**

**Both of Bourne's defining traits are *Lines*:** *"avoids killing people in general especially bystanders"*; *"doesn't want to do anyone's bidding."* He is defined almost entirely by **refusals**, and the plot is his attempt to stop being an instrument.

**This upgrades Need/Self-image/Line from a checklist to a structure: *which field dominates is itself characterizing.*** **Need**-dominant: Macbeth, Gatsby. **Self-image**-dominant: Lancelot, Don Quixote. **Line**-dominant: Bourne, Ned Stark. A second axis for free, and it predicts *which* field a given character's sheet most needs filled.

**And *"Bond has no apparent needs beyond libido"* is a finding about Bond.** He sits **between Han Solo and Kinnison** — not hollow (manner, taste, appetite) but thin on interiority, which is exactly why he has been recastable across sixty years and wildly different actors: **there is no fixed person to contradict.**

- [ ] **Include Bond deliberately as a *mid-hollowness* case**, so the corpus grades **hollow / thin / rich** and the test has resolution rather than a binary pass-fail against Kinnison.

#### Prior art #2 — the Red Letter Media test (Tonio, 2026-09)

In RLM's Star Wars prequel reviews, people are asked to **describe the major characters without mentioning their name or their appearance** *(corrected 2026-09 — an earlier version of this note had it as "or what they do", which is wrong and weakened the finding)*. **Behaviour and role are permitted.** For the original trilogy: no trouble. For the prequels: **nobody knows where to start.**

**That is our protocol run on fiction instead of sheets, and it independently reaches the Kinnison finding:** the exercise isn't too hard — **some characters are hollow.** And because role *is* allowed, the result is **worse** than the mis-stated version implied: not *"stripping his job left nothing"* but **"even knowing his job leaves nothing."**

**It also validates the proposed Need / Self-image / Line structure.** Han Solo, no name, no job: *wants money; believes he's a cynic who works alone; won't actually abandon his friends* — and the **Line is his whole arc**. Qui-Gon Jinn, no name, no job: *…calm?* Nothing to hold.

- [ ] **Adopt it as a corpus admission criterion.** Before a character enters the expression test, run the RLM check: **describable without name or role?** If not, they go in the **negative-control** group with Kinnison, not the test set — otherwise we measure our sheets against subjects with nothing to encode. *(It also explains Kinnison crisply: describe him without name or deeds and you get "extremely capable and morally upright" — a rating, not a description.)*

**No conflict with our protocol — they agree.** RLM permits what a character *does*, so Holmes-identified-by-`Chemistry · Forensics · Music` is entirely within their rules. And their **appearance** exclusion maps onto our strip rule almost exactly: **appearance is a trivial correlate; behaviour is a consequence.** Same move, arrived at independently.

**The competence/personality split still holds, on better logic.** Han Solo and Qui-Gon Jinn *both* have perfectly clear roles, available to the describer in both cases — so **role is not what separates the describable from the hollow.** If it were, both would work. What remains is personality. The ablation's rungs split on that line:

| Rungs | Measures |
|---|---|
| attributes · skills · Fields | **competence identity** — a distinct *professional*? |
| + quirks and flaws | **personality identity** — a distinct *person*? |

**RLM's result says the second is what makes a character memorable.** So the quirk rung isn't merely *a* rung — it answers whether the sheet describes **a character at all**, while the earlier rungs answer whether it describes a competent stranger. **Report the two separately.**

#### ⚠ Prior art, and it warns us: Traveller ran this test (Tonio, 2026-09)

*Citizens of the Imperium*-era Traveller had a guess-the-SF-character exercise — **six attributes, some skills, and a precis** — and **the precis did a lot of the lifting.**

**⚠ But Traveller's character representation was *terrible* (Tonio), so its failure is evidence about Traveller — not about character sheets in general.** An earlier version of this note promoted it to a null hypothesis; that over-weighted it. **Traveller is a *floor*, not a *baseline*:** beating something bad proves nothing, so the *"+ skills"* rung below is **not** a meaningful external reference point. The ablation stands on its own logic — the lift curve is interpretable without any comparison system.

**The decisive example (Tonio): Kimball Kinnison was basically `FFFFFF`** — hex F = 15, i.e. **maxed on all six attributes** — plus a pile of exotic skills. *And he still could not be told apart from Doc Smith's other protagonists except by the precis.*

**That generalises into a real principle: any capped system loses all discriminating power at its ceiling.** A character at maximum on every axis carries zero information beyond *"superman"*, and Smith's protagonists are all supermen, so their sheets converge. **It is the Lancelot problem in its purest form, with evidence attached.**

**And the sixth attribute was *social standing* (Tonio) — so one of the six wasn't a character attribute at all.** Social standing is a property of your **situation**, not of your body or mind: it can change without *you* changing. So "six attributes" was really **four capability axes** (STR/DEX/END/INT) + **EDU** doing knowledge work that belongs in something like Fields + **one external circumstance**.

**SOC fails our own attribute test harder than anything we removed this session.** The test that emerged: an attribute must be **independent**, must **discriminate between characters**, and must be a **scalar, observer-independent quantity**. AP failed the last for being in the eye of the beholder; **SOC isn't about the character at all.** The framework would have caught it immediately.

**It also explains more of the collapse than the ceiling does alone: their only social axis measured *position*, not *personality*.** Position is nearly worthless for identification — Kinnison and Seaton are both effectively high-standing, Holmes and Watson sit close together — while **disposition** is exactly what distinguishes characters, and Traveller had **no axis for it at all**.

*We already have social standing in the right buckets without needing a rule about it: **background factors** (Privileged Childhood; ForePlay's* Blue Blood *past) and **wealth** as a build-derived field. Neither is an attribute, and both can move during play — correct behaviour for a circumstance.*

**We cap too** (attributes 16 human, Score 20 for the multiplication) **but have three layers Traveller didn't, and none of them caps:**

**Quirks and flaws** — *qualitative*, not quantitative. Maxed-plus-*Monomaniacal · Known Blade · Iron Gut* ≠ maxed-plus-*Nondescript · Reads People*, and both are legal at `FFFFFF`.

**Fields of Knowledge** — unbounded in breadth, don't compete with attributes. Kinnison's Fields aren't Seaton's (Lensman lore vs physics and engineering).

**Background factors** — ordered life history, which two supermen don't share.

- [ ] **Testable prediction: ForeSight should degrade more gracefully at the ceiling than Traveller, *because* of the non-capping qualitative layers** — precisely what the ablation measures. Needs **two kinds of ceiling pair**, and conflating them was an error in an earlier version of this note:
  - **Positive test — maxed but quirk-bearing:** **Lancelot / Galahad.** Both maxed by definition, but each *has* defining quirks (the affair; incorruptible purity), so the **quirk rung should lift them**. This is the real test.
  - **⚠ Negative control — maxed *and quirkless*:** **Kinnison / Seaton.** Tonio: *"Kinnison is maxed on any set of attributes but basically lacks all defining quirks."* The quirk rung **cannot** lift him, so a failure here is **not** a defect — it's the correct answer. **If the ablation ever "identifies" Kinnison, something is leaking** (Fields, equipment, or our own labelling) **and the harness is invalid.** A measurement needs a negative control; this is it.
  - **Corollary, with the balance restored** (Tonio): Kinnison alone is **not** evidence against Traveller's sheet — there was nothing there to represent. **But the *other* characters in that exercise are**, and they're the actual indictment: they *did* have distinguishing shape and the six-attributes-plus-skills sheet still failed to carry it, which is why the precis did the lifting. *(An earlier version of this note over-corrected into exonerating Traveller.)*
  - **Their exercise accidentally had the right structure:** a **negative control** (Kinnison, correctly unidentifiable) **and real test cases** (characters with genuine traits) — **and the test cases failed.** So the null hypothesis is **weak**: Traveller missed on characters that *should* have been representable, which means there is real headroom for a system that puts differentiation somewhere other than the numbers.

**⚠ The honest conclusion may be that we're bad at pulp supermen — and that it's a choice, not a defect.** Attribute costs escalate past 12 specifically to discourage maxing (*"genetics is not fair"*), perks are capped by credibility, immunity isn't purchasable. Such a system is built for characters defined by **shape**, not **magnitude**, so `FFFFFF` is outside its expressive range *on purpose*.

- [ ] **Three accumulating *stated limitations* to declare up front** rather than let a reader discover: **Harry Potter** (amplitude-only magic), **Kimball Kinnison** (the maxed superman), and **Lancelot** as the borderline case where a defining flaw may rescue him.

**Its specific failures are more useful than its result, and two are live risks here:**

- [ ] **Compressed effective range.** Traveller's 2D6 attributes put nearly everyone at 7 on a nominal 1–15. We say 3–16 but *"most people sit around 7 or 8; a 10 is remarkable"* — a narrow band doing all the discriminating. **Check our range isn't decorative in the same way.**
- [ ] **Thin skill lists — and ours are thin *by design*.** Traveller's were sparse via term-based acquisition. We **deliberately folded** skills (Acrobatics → Athletics, surgery → Repair) so a sheet has *fewer* entries, arguing Fields and familiarities carry the specificity. **A real tension between simplicity and expressiveness, and the ablation measures what the folding cost:** if the Fields rung lifts and skills doesn't, folding was free; if neither lifts, we bought simplicity with discriminability.

Failures we *have* avoided: **no personality layer at all** (we have quirks, albeit unwritten) and **random career generation**, where the sheet records what happened *to* you rather than who you are — two Navy officers with the same rolls being genuinely identical.

**Consequence: absolute accuracy is uninterpretable. Make it an ablation.** *"40% matched"* means nothing alone; run the same characters at increasing layers and read the **lift curve**:

| Sheet contains | Measures |
|---|---|
| attributes only | the floor — probably near chance |
| + skills | what folded skills carry — see the folding risk above |
| + Fields of Knowledge | career / expertise identity |
| + quirks and flaws | **the layer we predict does the work** |

That answers the question that actually matters — **which layer buys expressiveness?** If quirks add 30 points and Fields add 5, the **quirk buildout jumps the queue**. If nothing lifts, sheets don't encode identity and we should stop pretending they do — also a real finding, and cheap.

**And Traveller conflated the two metrics, which is the fixable error.** The precis is the answer key: it must be **absent** during matching and **present** for fidelity.

**Discriminability** — sheets only, shuffled, no prose. *Can they be told apart?*

**Fidelity** — sheet **and** precis together, deliberately. *Does this fit?*

One test with both materials cannot distinguish *"the stats work"* from *"the prose works."* **Splitting the materials is most of what makes ours worth running.**

#### Test protocol: strip *labels*, keep *consequences*

**Settled (Tonio, 2026-09): this is a test-only transform — the fields stay on the real sheet.** Omit *"physical description, name obviously, sex, age, and other trivial correlates."* **"Trivial correlates" is the rule; any enumerated list will be incomplete.**

The line, because over-stripping destroys the test:

| | | |
|---|---|---|
| **Labels — STRIP** | name, sex, age, physical description, **any proper noun** | *attached* to a build, not derived from it |
| **Consequences — KEEP** | attributes, skills, Fields, quirks, wealth | these **are** the build, and they're what's measured |

**Several fields are both mechanically real and revealing, and that's fine.** `Chemistry 3yr · Forensics 4yr · Music 1yr` gives Holmes away — **a pass, not a leak.** The test is not *"make identification hard"*, it is *"make identification depend on mechanics."* If the Fields alone identify him, the build carries distinguishing information, which is exactly the property under test.

**Equipment is the mixed case:** *generic-ize proper nouns, don't remove the item.* "Walther PPK" is a label; "concealable 9mm, fine (+1)" is the content.

**Quirks:** we author the sheets, so use the **shared quirk vocabulary** and never bespoke flavour names — otherwise we're testing our own naming again.

**Age stays on the real sheet:** it's largely derivable (each adult BF is one to five years) but **aging quirks** are planned, so the field earns its place.

**⚠ Prediction worth recording before running it: within a cluster the *attributes* will not discriminate — the *quirks and fields* will.** Holmes and Poirot are both IN+PC brilliance; what separates them is method, order, vanity, monomania and which Fields they hold. If that holds it cuts two ways: it **validates the 9→5 reduction** (those axes were never doing that work) and it puts the whole expressive burden on **quirk families that are mostly unwritten** — which would **re-prioritise the quirk buildout above everything else queued.**

**Three probes already hiding in the lists:**

- [ ] **Columbo — can the system express *"actually sharp, performs dim"*?** His defining trait isn't an attribute; it's **Perform + a quirk (*Underestimated*)**. The best single expressiveness test in the corpus.
- [ ] **John McClane — a direct probe of this session's EN removal.** Absorbing punishment and continuing was EN's job and is now **ST** (robustness) + **WP** (keeps going) + **Endurance quirks**. If McClane can't be built distinctly from Ethan Hunt, the removal cost something real — a far better test than argument.
- [ ] **Lancelot — the awkward case, usefully.** *"The best knight in the world"* is a high-everything build: expensive and dull, with nothing but his flaw to make it interesting. Tests whether **quirks and flaws can carry a character whose capability is undifferentiated.**

### Apply the matching test to the item-modification system (Tonio, 2026-09)

*"Which of these looks like Andúril or the Millennium Falcon?"* — same protocol as the character test, and **the better pilot**: small corpus, sheets that are a handful of numbers, far less flavour text to leak the answer. Validate the methodology here before building character batteries.

**Near-pairs are sharper here:** **Millennium Falcon / Serenity** (beat-up freighter, smuggling hold, unreliable engines, outperforms its looks), **Andúril / Glamdring / Sting** (all fine elvish or Númenórean blades).

**Predicted outcome: it fails — and that's the finding.** A legendary item is mostly *not* mechanically distinctive. The Falcon is **fast** + **unreliable** (expressible) and *Han's ship that made the Kessel Run* (not). Andúril is **a fine sword** (expressible) and *the reforged blade of Elendil* (not). So the test says: **the mod system captures capability, not identity** — the *price the capability, not its costume* keystone working as designed, and simultaneously a gap if Andúril should feel like Andúril.

- [ ] **The fix is already in the machinery, pointed the other way: items get quirks.** The Design Document already states that background factors are *"character modifications — the same machinery that makes a sword 'fine' or a vehicle 'sporty' makes a character 'ex-military'."* Reverse it: Andúril takes **Known Blade** (recognised, and by whom); the Falcon takes **Notorious** beside *fast* and *unreliable*. **Legend becomes a quirk, not a stat bonus** — which keeps it out of the capability economy where it would otherwise need pricing.

**Metric for the mod system, stated properly:** distinct items → **distinct modifier sets drawn from a *small shared* adjective vocabulary.** Too coarse and two famous ships collide; too fine and every item needs bespoke modifiers, i.e. a stat block per item — the exact thing adjectives-on-nouns exists to avoid. That tension is what the matching test measures.

---

## Where the rest of this went

This document was the largest section of `REVIEW.md`, and the tail of that section had drifted
off-topic as the session ran — a source survey, the Interpersonal design brief, the chronic-condition
template and a change log had all accumulated under a heading about test methodology. Those moved
out when the file was split (2026-10):

- the **source survey** (the 2008 website), the **Interpersonal one-pager brief**, and the
  **quirks / chronic-conditions** items → `REVIEW.md`, and from there to the board;
- the **change log** of the attribute cut and the combat-tempo rework → `Design Document.md` →
  *Applied 2026-08/09*, where the reasoning for each change already lives;
- the **obligations those changes left behind** — numbers to calibrate, contracts to state in the
  rules text — → `REVIEW.md` → *Calibration & contracts from the 2026-08/09 changes*.

What belongs here is only the method: who tests, what they hunt, what they are shown, and what we
have promised to declare as a limitation before we read any result.

