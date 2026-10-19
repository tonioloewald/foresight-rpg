# World Generation — design record

> **Status:** Stage 0 built 2026-10-19 — the package, the plugin architecture and L0/L1 — in
> `../tosijs-luontu`, not yet a GitHub repo (Tonio publishes it when ready). 39 tests, typecheck
> clean. Board #3391.
>
> This record lives in `foresight` because the *domain* decisions are the book's. It moves to the
> new package's repo once that exists, leaving a pointer — the same way `Design Document.md` keeps
> reasons and the board keeps work.

## What this is for

A star system generator good enough that a GM can ask for a world and get one worth playing on: a
real sky, a real map, a climate that follows from the planet's own facts, and a history that
explains why the colony is the way it is. The reference quality bar is the thing
[`tosijs-3d`](https://3d.tosijs.net) already draws from NASA's maps of the Earth, the Moon and
Mars — a generated world should be indistinguishable in kind, not obviously procedural.

## The third decision: configurable by construction

**Tonio, 2026-10-19: consumers must be able to override our assumptions.** That turned out to
shape the whole package rather than bolt onto it, because assumptions come in two kinds and they
want different mechanisms.

- **A parameter is a number somebody chose** — the snow-line temperature, the disk's solid budget,
  the spectral mix. Overridable with a plain object, and *declared*: units, range, and a **required
  rationale**. The declaration is what makes an override safe rather than merely possible. A typo
  is an error naming what the namespace does accept; an out-of-range value is refused with the
  reason the assumption exists attached. The only thing worse than a rejected override is an
  ignored one.
- **A stage is a process somebody chose** — how planets form, how a surface is made, how a history
  advances. Replaceable whole, and a replacement **brings its own parameter namespace**, so a
  third-party model's assumptions are declared, validated and fingerprinted exactly like ours. The
  configurability is not a privilege the library keeps for itself.

Two consequences worth recording as decisions in their own right.

**A config fingerprint seeds nothing.** Folding it into the derived seeds would have been easy and
wrong: tuning the history model would reroll everybody's planets. A parameter reaches a world only
through the stages that read it — which is precisely what makes one safe to tune. The
fingerprint's job is provenance: how two people establish they are looking at the same world, and
what a saved world records beside its address.

**The conformance kit ships in the package.** A configurable generator is only as trustworthy as
its contract, so the contract is runnable: point it at any configuration and it checks determinism,
order independence, that nothing touched `Math.random` or the clock (both booby-trapped during the
run), Kepler, Hill separation, every range — and, with a surface stage registered, that the sea
it produces matches the hydrographics its world published. That is the layering invariant below,
enforced against *plugins* and not just against us. The idiom is `tosijs-3d`'s
`min-sim-conformance`: framework-agnostic, taking the test harness as an argument.

The kit also taught its first lesson by being wrong. It had a `noMigration` option asserting no
giant sits inside the snow line — but that claim does not follow from its premise: a model
without migration still puts a giant wherever a core grew past critical mass, and in a rich disk
that happens inside the snow line. It was removed. **A conformance kit that rejects correct models
is worse than no kit at all.**

## The two decisions

**1. A tool, with a hand-rollable summary in the book.** The model lives in code and may be as
deep as it earns; the book gets a short chapter a GM can roll by hand at the table. The dice
version is a **deliberately lossy projection of the model**, not a separate system — which makes
it testable (below), and which is the honest version of what 1986 was reaching for when it asked
for a generator that was *"dumb"* enough to be plugged into a computer. We have the computer now,
so the depth goes there and the table keeps the dice.

**2. A new engine-free package — `tosijs-luontu`** (Finnish *luonto*, nature; named 2026-10-19).
It owns astrophysics → planetology → surface → climate → biosphere → history, is Babylon-free
and runs headless. The name is deliberately wider than what is built, because the ecosystem and
history stages are the point of the exercise and not an afterthought. `tosijs-3d` consumes it for rendering;
`foresight` consumes it for the book, the site's generators and the game-facing tables.

Why not inside `tosijs-3d`: that library's stated north star is *behavioural richness, not
photorealism* (`GALAXY-DESIGN.md`), and a deep planetology sim is a different product with a
different standard. Why not inside `foresight`: `tosijs-3d`'s own demos, HI filter and population
tuner want the better facts too, and a book cannot be a dependency of a rendering library.

## Why the renderer is not the problem

`tosijs-3d` draws a planet from a **`PlanetSurface`** (`src/sphere-map.ts:144`):

```ts
interface PlanetSurface {
  radius: number
  seaLevel: number
  heightAt(direction: Vec3): number
  climate?: SurfaceClimate
  palettes?: () => { palette: number[][]; paletteB: number[][] }
}
```

`b3d-planet` takes one as a public prop (`surface: PlanetSurface | null`), and `mapSurface()`
builds one from a 16-bit height image — so **a generated surface renders by exactly the same path
as a measured one.** The atmosphere, clouds, cyclones, sea colour, biome shading and relief
exaggeration are all already there and all already dials.

What is thin is everything upstream of that interface:

- **`generateStarSystem` is 23 lines** (`galaxy-data.ts:857`). Orbits accumulate as
  `r += (i/totalWeight) × rand(0.5,1) × (rMax−rMin)`; planet type is a weighted pick on
  `[insolation×100, 10, 1]`. No snow line, no disk mass budget, no stability pruning, no migration.
- **No rotation, obliquity, eccentricity, tidal locking, stellar age or binaries** — grepping
  `galaxy-data.ts` for any of them returns nothing.
- **No moons in the model.** They are invented at layout time for display (`system-layout.ts:160`),
  so a system's moons are currently a property of the renderer rather than of the system.
- **`PlanetData` carries presentation, not physics**: `g`, `tempC`, `temp` and `atmosphere` are
  *strings*. You cannot compute with `tempC: string`.
- **Every rocky world is one of five Solar System bodies.** `rockyWorldFor()`
  (`rocky-world.ts:305`) is four branches returning `moon`, `mercury`, `earth`, `venus` or `mars`.
  That single function is the whole visual identity of every generated planet in the galaxy.

So the work is a model, and the renderer is the customer.

## The architectural heart: layered detail

The galaxy generates ~20k "interesting" stars eagerly in about a second, and scores a system in
**6.5 µs**. A real planetology model cannot run at that price. So detail is **layered**, and each
layer is derivable from a star's address alone — the bright/dim lazy pattern applied to *depth*
instead of distance:

| | What it answers | Cost budget | Who asks |
| --- | --- | --- | --- |
| **L0 — star** | spectral detail, luminosity, age, `bestHI` | µs | the galaxy, the HI filter |
| **L1 — system** | planets: mass, radius, orbit, eccentricity, rotation, obliquity, moons, atmosphere, surface temperature, HI | ≤ 100 µs | the system map, search, the book's dice version |
| **L2 — surface** | plates → hypsometry → erosion → a height field, a climate and a **province graph with crossing costs** | 10–100 ms, worker-friendly, cached | a world someone looks at |
| **L3 — story** | biosphere and society, on one shared engine: populations with trait vectors drifting in niches, then the iterated history over them | ms | a world someone plays on |

**The invariant that keeps this honest: a lower layer may add detail but may never contradict the
layer above it.** L2 must land the ocean fraction L1 already published. That is a cheap, strong
test — generate L1, generate L2, measure L2's actual sea coverage, assert it matches L1's
hydrographics within tolerance — and it is the test that stops a lazy generator from quietly
becoming two generators.

Everything is a pure function of `(address, layer)`. Nothing is stored.

## Calibration — what each stage is checked against

The project already has the hard part of this: **`sol.ts`** is our own system as data, with true
radii, days and moons. A generator that cannot reproduce the Solar System's gross shape is wrong,
and a generator that can *only* produce it is overfitted. So:

- **L1 against the exoplanet census.** Generate a few thousand systems and compare the
  radius–period occurrence distribution to Kepler's. The known failure modes are the interesting
  ones: super-Earths are the most common planet in the galaxy and 1986 cannot make one; hot
  Jupiters exist and need migration; M-dwarf worlds are tidally locked and that is a *setting*, not
  a footnote.
- **L1 against Sol.** Eight planets, the rocky/giant split either side of the snow line, a belt
  where a planet failed to form, and gas giants with moon systems.
- **L2 against the Earth.** The hypsometric curve — the Earth's bimodal distribution of elevation
  (continental shelf and abyssal plain, not a bell curve) is what tectonics produces and noise does
  not. This is the single best falsifier in the whole plan.
- **L2/L3 against Köppen.** Climate-zone *areas* by latitude, not maps.
- **The book's dice version against the model.** Roll the hand version a thousand times and compare
  its distributions to the model's. Where they diverge, either the table is wrong or it is a
  deliberate simplification that gets written down as one.

## Stages

Each stage ships something visible and carries its own falsifier. Nothing proceeds on a stage whose
falsifier has not run.

**Stage 0 — the package and the harness. DONE 2026-10-19.** The architecture above, plus L0 and
most of Stage 1, in `../tosijs-luontu`. The tests found four model errors on the way, which is
what they are for: a 40-Earth ball of rock classified as a Neptune (a giant is a body that *took
gas*, not a body that is heavy); per-slot scatter applied after the budget split, which broke the
budget; giants at 0.05 AU, i.e. hot Jupiters by accident in a model whose whole claim is that it
has no migration; and 1200-Earth monsters, three times what a disk lets a planet reach. Median gas
giant is now 0.90 Mⱼ (p10 0.51, p90 1.49), and an HI 1 world is 0.4% of planets — a find,
not a commonplace. **Still owed from this stage: the Kepler occurrence comparison**, which is
Stage 1's real falsifier and is not yet written.

**Stage 0 — original scope.** The repo, the `World` types in real units (no strings),
and the calibration harness with the corpora above. Deliverable: a failing test suite that says
precisely how wrong the current generator is. *Falsifier: the harness reproduces today's measured
numbers for today's generator, so we know it measures what we think.*

**Stage 1 — formation.** Disk mass budget, snow line, oligarchic growth, migration, stability
pruning. Moons as first-class bodies. Rotation, obliquity, eccentricity, tidal locking. Atmosphere
retention from escape velocity and stellar XUV rather than a table. *Falsifier: the Kepler
occurrence comparison, and Sol.*

**Stage 2 — surface.** Plates on a sphere, uplift and subduction, then erosion. Out comes a
`PlanetSurface`, so it renders through the existing pipeline on the day it works. *Falsifier: the
Earth's hypsometric curve, and L1/L2 agreement on hydrographics.*

**Stage 3 — climate.** Energy balance with a real greenhouse term, Hadley circulation, rain shadow,
seasons from obliquity. Reuses `province-climate`, `biome-chart` and `climate-noise` rather than
replacing them. *Falsifier: Köppen areas by latitude; the Earth at 23.4° and a 0° Earth differ the
way they should.*

**Stage 4 — biosphere and HI.** Recompute habitability from the model instead of from table
products, keeping 1986's **HI 1–5** as the published index because it is a good compact answer and
the book's other rules reference it. Then rerun `bin/tune-populations.ts` and rebake the sky.
*Falsifier: the HI freshness fingerprint, which already exists and is designed to fail here.*

**Stage 4b — the drift engine.** The shared substrate of Stages 4 and 5: populations with trait
vectors in niches on a province graph, moved by drift (∝ 1/√N), selection, prestige-weighted
flow, and split/fuse on a distance threshold. A substrate rather than a stage, because the
biosphere runs it to equilibrium for a state and the society runs it tick by tick for a
trajectory. *Falsifier: the archipelago-versus-plain test, which both instantiations share.*

**Stage 5 — history.** 1986 steps [v]–[xii], re-founded and iterated: colonisation date, 25-year
generations, population compounding, hard and soft tech levels drifting under government effects,
government change, settlement structure, social features, law level. **The output is a timeline,
not a snapshot** — that is the whole point, and it is what makes a colony's present explicable.
*Falsifier: a small number of hand-authored histories the generator must be able to produce.*

1986's version of this is a gift and should be treated as one: it already iterates, its numbers
were calibrated by years of play, and the structure was designed by someone who had run it. The
work is re-founding its inputs on the new model, not inventing a replacement.

## Factions and norms: the same engine as the ecosystem

> Tonio, 2026-10-19: *"the society split into factions and power centers with cultural norms that
> fuse and drift over time. It would actually be something like the ecosystem generator."*

**It is the same engine, and that is worth building on rather than noting in passing.** Strip both
to their mechanics and they are one model: a set of **populations**, each carrying a **trait
vector**, occupying **niches** with finite carrying capacity, connected by a graph, evolving by
drift, selection and flow, and splitting or merging when distance crosses a threshold.

| | ecosystem | society |
| --- | --- | --- |
| population | a species' local population | a faction |
| niche | habitat and food-web role | a power base: land, trade, force, legitimacy, knowledge |
| trait vector | tolerances, morphology, diet | norms — who may rule, who owes whom, what is forbidden |
| carrying capacity | what the habitat yields | what the power base can support |
| drift | genetic drift | cultural drift |
| selection | survival and reproduction | which norms keep a faction's grip on its base |
| flow | migration and interbreeding | contact, trade, conquest, imitation |
| split | reproductive isolation → speciation | schism |
| anti-convergence | character displacement | sectarian distinction-seeking |
| extinction | the niche closes | the power base disappears |

**The strongest evidence that this is one engine and not an analogy: drift scales as 1/√N in
both.** Small isolated populations drift fast. That single relation gives you founder effects on an
island *and* a frontier colony with its own dialect in three generations. A superficial
resemblance would not make the *rates* obey the same law.

The anti-convergence row is the second piece of evidence, and it is the one that surprised me.
Two factions that grow too alike have a reason to differentiate — which looks like a uniquely
human vanity until you notice it is **character displacement**, the ecological result that two
similar species diverge to reduce competition. Same force, same sign, same cause: overlap is
expensive.

### Where it breaks — three places, each a feature rather than a refutation

1. **Horizontal transmission dominates, where in biology it is a special case.** Genes mostly run
   parent to child; a norm jumps sideways in one generation. And the flow is **asymmetric and
   prestige-weighted** — norms travel from the admired to the admiring, not symmetrically down a
   contact edge. So the society instantiation needs a directed flow operator that the ecosystem
   one barely uses. This is the biggest difference and it probably dominates the dynamics.
2. **Agency.** A faction can adopt a norm deliberately, or suppress one. An organism cannot. This
   is where the *game* lives: a player should be able to move a norm and pay for it. So the engine
   must take **exogenous trait shocks** and let selection answer them, rather than being a closed
   simulation that is only ever watched.
3. **Invocation shape, not mechanics.** An ecosystem is near-static across a campaign; factions
   move in decades. So the biosphere is **run to equilibrium and handed over as a state**, while
   the society is **run tick by tick and handed over as a trajectory**. Same engine, two modes —
   which is the argument for making it a **shared substrate that two stages use**, not a stage of
   its own. The precedent is `tosijs-3d`'s `biome-chart`: one pure model, two consumers that cannot
   drift apart because both import it.

### The consequence: L2 owes a connectivity graph

**Isolation is geography.** Both instantiations need the same thing from the surface, and it is not
the height field: they need **provinces and their adjacency, with crossing costs** — a mountain
range, a strait, sheer distance. Drift needs something to be isolated *from*.

I checked `tosijs-3d` for this and it does not exist. `world-topology` is a room-and-portal graph
for the simulation's coordinate-free contract, and `province-climate`'s "province" is an *authored*
region that biases climate fields. Neither is a generated planetary subdivision. So the L2 contract
in the table above grows: a surface stage owes a height field, a climate, **and a province graph**.

That also reorders the dependencies. The faction model is **blocked on L2, not on L3** — its
principal input is the connectivity graph, not the climate. So: star → formation → surface
(with provinces) → { biosphere, society }, with climate feeding the biosphere far more than the
factions.

### The falsifier, which is the best one in this plan

**Run the model on two worlds with no parameter changed: an archipelago, and an open plain.** The
archipelago must fragment into many divergent factions; the plain must homogenise into few. If both
come out the same, the model is not reading its geography and the province graph is decoration.

The same test, unchanged, is the biosphere's: the archipelago must carry more endemic species. **One
falsifier for both instantiations** — which is itself the sharpest evidence that there is one
engine here. And it cannot be fudged by tuning, because the two runs share every parameter.

Secondary checks worth having, all of them things the model would be *wrong* about rather than
snapshots: a lingua franca spreads along trade edges and not across barriers; lexical divergence
between separated populations runs at something like the Swadesh rate rather than ten times it; a
polity with many power centres and weak connectivity fragments without being told to.

### Colonisation waves: site selection is niche occupation

> Tonio, 2026-10-19: *"You might have two colonization waves. The first probably picks the nicest
> real estate. The second picks best available."*

**This is the same engine again, which is why it belongs here rather than in a system of its own.**
A wave choosing sites is a founder population occupying niches; a second wave arriving to a
settled map is an invasive population facing **competitive exclusion** — pushed to marginal
niches, or into direct competition it has to win. Ecological succession, with ships.

Four things fall out of ordering the waves, and all four are things a GM would otherwise have to
author by hand:

1. **Wave order stays legible in the map forever.** The oldest settlements sit on the best land,
   so *"why is the capital there?"* has an answer: they arrived first. A player can read the
   settlement history off the map without being told it.
2. **Later waves are structurally poorer**, which manufactures grievance without anyone writing
   any. Arrival order is then a natural **initial faction split** — the drift engine starts with
   populations already differentiated by *when they got here*, which is exactly the seed it needs.
3. **"Best" is per-wave, not absolute.** A wave with different biology or different technology
   ranks the same map differently, so it may happily take land an earlier wave passed over — and
   then the two barely compete at all. Highland against lowland agriculture; Tschai, below.
4. **The criteria move with technology.** A wave arriving at TL 10 can settle what TL 6 could not,
   so "best available" is a function of the wave's own tech level — which couples this directly to
   the history stage rather than leaving it a separate subsystem.

*Falsifier, and it is the same two-run shape as the archipelago test:* with **identical** waves,
wave two's mean site quality must come out measurably below wave one's, and the gap must widen with
each further wave. With **disjoint** criteria, there must be no penalty at all. If the model cannot
show both, site selection is not really reading the waves' preferences.

### Shocks: the gold rush

A strike is not a slow process at all — it is an **exogenous shock to the niche-value field**. A
worthless province becomes the most valuable one on the planet overnight, and the model needs to
take that as an event rather than grow into it.

So the engine wants **two shock channels, not one**. #3401 already needs trait shocks, for a
faction that changes a norm deliberately; a strike is a shock to a **niche**. Different channel,
same requirement that the simulation be open rather than closed.

What a rush then produces is worth being precise about, because the obvious model gets it backwards.
Drift goes as 1/√N, so a big rush population should drift *slowly* — and rush societies
notoriously do the opposite. The resolution is that a rush is not drift at all: it is a **founder
event with biased sampling**. The new population is drawn non-randomly from many sources at once
(young, transient, self-selected for appetite), with weak flow back to any of them and almost no
institutional transmission. That diverges fast and in an unpredictable direction — which is the
Klondike, and it is a *prediction* of the model rather than a special case bolted onto it.

And the bust is the part worth having: carrying capacity for *mining* was enormous and carrying
capacity for *living there* never was, so what is left is a stranded population, abandoned
infrastructure, and a grievance. Ghost towns fall out of the same arithmetic that made the boom.

### Two worlds worth stealing from, as a test corpus

Named scenarios are the same discipline as the rules-review harness's `fixtures.md`: **a labelled
test set written before the instrument.** Each of these can be specified now — inputs, and the
output the model must be able to produce — without the engine existing.

**Tschai** (Vance, *Planet of Adventure*). Layered, mutually hostile settlement over long
timescales: Chasch, Wankh and Dirdir each arrive, and each keeps a **client human population** —
Chaschmen, Dirdirmen, Wankhmen — shaped so thoroughly that each believes itself descended from its
patron. The Pnume were there before all of them. As a test it demands three things: waves with
**disjoint niche rankings** (so they coexist instead of resolving), **capture rather than
displacement** (a population acquired, not removed), and a **native** population older than every
wave. The capture relation is the prestige-weighted flow of #3401 turned to its maximum — norms
rewritten past the point of a false origin story — so Tschai is a stress test of a channel the
model already needs, not a new mechanism. *Can the model produce Tschai?* If those inputs come out
homogenised, either the prestige channel is too weak or the niche rankings are not really
differentiating.

**Maz** (Vance, *Galactic Effectuator*). Tonio, 2026-10-19: *"three empires have partial
jurisdiction over a planet with its own indigenous population."* I had guessed at a two-power
condominium, and the correction matters — three differences, each with a mechanical consequence.

**Three is not two.** Two powers sharing a world is a standoff: a bilateral stalemate that holds
because neither can move. Three is qualitatively different — any two can combine against the
third, so there is no stable configuration and the alignment keeps moving. The indigenous
population then becomes a *prize* each coalition would like and the agreements forbid, which is a
pressure that cannot be relieved. A two-power model would have produced a stable split and missed
the entire dynamic.

**Partial jurisdiction is not joint sovereignty.** Joint means both rule all of it. Partial means
each rules part — and therefore that **the map of authority does not tile the territory**. The
gaps and overlaps are the interesting object: places and persons where jurisdiction is ambiguous,
absent or contested. So the niche is not "divided legitimacy" but **the seams themselves**, and
what lives in them is the effectuator — a man who can act precisely where no power's writ runs
cleanly. The model needs jurisdiction as a **coverage relation over provinces and persons that may
be incomplete or overlapping**, not as an assignment of provinces to owners.

**The natives are nobody's client**, which makes Maz the exact counterpart to Tschai. Tschai is
**capture**: populations acquired and rewritten until they believe a false descent. Maz is
**constrained non-capture**: the powers would capture if they could, and an agreement between them
forbids it. So the two scenarios test opposite outcomes of the same prestige channel, which is
precisely what a corpus should do.

#### What Maz adds to the engine: agreements live on edges

Forbidding capture is not a norm in any single faction's vector — it is a norm **several factions
hold about each other's conduct**. So the engine wants **edge-level objects**, not only node-level
traits: an *agreement*, with parties, a subject, a strength, and the property of being
**breakable** — which is a different event from a norm drifting, and a much louder one.

This is less of an addition than it first looks, because the edges already carry something: the
prestige-weighted flow of #3401 is directed and asymmetric, so edges are already first-class.
Agreements extend them rather than introducing a new concept, and the same object then covers the
non-interference pact on Maz, the patron relation on Tschai, an alliance, a vassalage and a trade
compact.

It also means **a faction's power base can be an agreement** — which is what a broker's actually
is. That is the strongest argument for the exogenous-niche generalisation: not merely that a power
base may sit off-world, but that it need not be a *place* at all. **Any number of external powers,
and niches that are relations rather than territory.**

*Falsifier:* given three external powers with partial, seamed jurisdiction over a world with a
native population and a non-interference agreement, the model must produce **persistent
realignment rather than a settled split**, a **broker niche at the seams**, and **pressure on the
agreement that occasionally breaks it**. A stable three-way division means the coalition dynamics
are not being modelled — and note that this cannot be faked by tuning, because the instability
has to come from there being three parties rather than from a dial labelled instability.

### The norm vector: a cultural big five

> Tonio, 2026-10-19: *"I think we need something like a cultural big five."*

**The analogy is apt for a reason worth being precise about.** The Big Five is not a theory of
personality someone proposed; it is what *fell out of the covariance structure* of trait words
under factor analysis. So "a cultural big five" is a methodological instruction, not a shopping
list: find the axes that genuinely vary independently, and stop at the number that explains the
variance.

**And it misleads in one place that matters.** The Big Five describes *individuals*, and a culture
is not a large individual. Averaging personality over a population gives national character —
which is bad modelling and worse manners. The axes a society model needs are **relational**: how
power is graded, how obligation flows, how deviance is handled. Not dispositional.

There is real prior art — Hofstede's six dimensions, Schwartz's value orientations,
Inglehart–Welzel's two factor-analytic axes, GLOBE's nine, Gelfand's tight/loose — and none of
it is adoptable wholesale, because every one of them selected its axes for *what varies in survey
data*. We need a different criterion: **what changes what a faction does.**

#### What an axis has to earn its slot

1. **Mechanically load-bearing.** It must change a decision at the table — who this faction
   allies with, what it forbids, how it treats a stranger. An axis that produces no decision is
   decoration, and this project already has a name for that: a tax.
2. **Selectable.** The drift engine needs selection, so some niche must reward one end of it.
3. **Nearly independent**, or drift in one shows up as drift in another and the dimensionality is
   a lie.
4. **Readable in a sentence**, so a GM can say what this culture is like in one line.
5. **Few.** Parsimony is the whole point of invoking the Big Five.

#### The proposal: five relational axes

| Axis | What it is | What it changes | What selects it |
| --- | --- | --- | --- |
| **Tightness** | how hard norms are enforced; tolerance of deviance | law level, treatment of strangers, whether dissent drifts or schisms | **threat** — scarcity, disease, raiders, a hostile biosphere |
| **Hierarchy** | how steeply power and deference are graded | government type, who may address whom, whether a deal needs a patron | **concentration of the power base** — one pass, one aquifer, one elevator rewards steepness |
| **Kin obligation** | how hard the claims of kin and the face-to-face group bind, and what they override | nepotism as duty or as corruption; inheritance; whether a crime implicates a family; what a marriage is for | **absence of institutions** — where no court will enforce, kin is the enforcement; also risk, frontier, low state capacity |
| **Impersonal obligation** | whether an obligation binds independently of who is owed it — contracts, offices, rules | does a stranger's contract hold; is an office separable from its holder; can an outsider find a court; do institutions survive their founder | **scale and anonymity of exchange** — you cannot trade at distance on kin ties alone; state capacity; specialisation |
| **Openness** | novelty and outsiders as opportunity or as contamination | tech adoption, immigration, and *whether a foreign norm transmits on contact* | **whether contact has historically paid** |
| **Time horizon** | how far ahead obligation runs; ancestors and descendants against now | infrastructure, debt, whether a windfall is invested or spent | **predictability** — a reliable season rewards planning; a lottery rewards taking it now |

**Tightness is a meta-axis, and that is why it is first.** It is not a norm; it is how strongly
norms are held — so in the engine it *is* the selection strength and the drift rate. A loose
culture drifts fast and tolerates sub-factions; a tight one barely drifts and schisms instead.
One of the five slots modulating the engine's own dynamics is a property worth having on purpose,
and tightness earns it: it is also the axis with the clearest environmental driver, since norm
strength tracks ecological threat.

**Openness gates the prestige channel.** #3401's asymmetric flow — norms travelling from the
admired to the admiring — is throttled by the receiving faction's openness. That is how client
capture succeeds or fails, which makes Tschai a test of this axis specifically.

#### Why "reach of obligation" was one axis doing two jobs

> Tonio, 2026-10-19: *"Reach of obligation would seem like individual vs collective but there's a
> weird dichotomy there. A lot of collectivist cultures focus on family loyalty vs separating
> institutions from family."*

**Correct, and it is the confound that sinks the individualism/collectivism axis wherever it is
used.** That axis slides together two things which come apart, and the clearest way to see it is
that the two poles are not opposites:

- A strongly **familistic** society is "collectivist" and has a **narrow** obligation radius: you
  owe nearly everything to kin and comparatively little to the stranger or the state.
- A Scandinavian society is "individualist" — weak family claims, children leave, the old are
  cared for institutionally — and yet carries an enormously **wide** radius of *impersonal*
  obligation: high taxes for strangers never to be met, and institutions that are trusted.

So the "individualist" pole is not *"I owe nothing to anyone"*. It is *"my obligations run
through impersonal institutions rather than through persons I am related to"*. One axis cannot
hold that, and the name **reach of obligation** was hiding it: both of those societies have a wide
reach, by different routes and with opposite consequences at the table.

**And the thing Tonio named — separating institutions from family — is the second axis
exactly.** Whether an office, a contract or a rule is separable from the person who holds it, and
from that person's kin, is Weber's patrimonial-versus-rational-legal distinction, and it is
independent of how strong the family claim is.

The prior art is unusually good here and it all points the same way: Banfield's amoral familism,
Fukuyama's **radius of trust** (noting that a strong family can *narrow* it), Putnam's **bonding
versus bridging** capital — explicitly two quantities, not two ends of one — Greif on clans
against corporations, and Henrich and Schulz on kinship intensity, where the Western church's
marriage prohibitions dissolved kin networks and impersonal institutions grew into the space.

#### The four cells, each a recognisable society

| | low impersonal | high impersonal |
| --- | --- | --- |
| **high kin** | **clan**. Nepotism is not corruption, it is duty; institutions are captured by families because favouring kin is unthinkable to refuse | **lineage state**. Strong families *and* strong offices — the family as the model for the state rather than its rival |
| **low kin** | **anomie**. Nobody owes anybody: atomised, post-collapse, the frontier after the boom | **civic**. Nepotism is the *definition* of corruption; care, schooling and insurance are institutional |

Four cells, four societies anyone would recognise, and the two off-diagonals are the ones a single
axis cannot reach at all. That the off-diagonals are *nameable* is the evidence the split is real.

#### The payoff: a known correlation should emerge, not be assumed

In the real world these two are **negatively correlated** — that is Schulz and Henrich's result,
kinship intensity against impersonal prosociality. The temptation is to build that in. **Do not:
build them as two axes and let the correlation fall out of selection**, because the mechanism is
already in the drivers above — they are **substitutes**. Where kin enforce, no court is needed;
where courts enforce, the kin claim is a cost. Selection on one erodes the other without anybody
writing a rule saying so.

That gives a genuine falsifier rather than a fitted parameter: **across a few hundred generated
societies the two should come out negatively correlated but not collinear, with all four cells
occupied and the diagonal more populated.** Perfect independence means selection is not coupling
them; collinearity means the split was wrong and it really is one axis. And Hofstede's single axis
*assumes* the answer, which is exactly why it cannot produce a clan society and a civic one as
different kinds of thing.

This is also where the corpus does work. A **broker on Maz** needs high impersonal obligation and
low kin claim — a contract with a stranger must hold, and no cousin's claim may override the
deal — so the seams niche is only habitable in one of the four cells. And **Tschai's client
populations** have the kin claim *redirected*: fictive kinship, a population believing itself
descended from its patron, which is a maximal kin obligation pointed at non-kin. Capture, in this
vocabulary, is the prestige channel rewriting who counts as kin.

#### So: six axes, and six is the answer rather than a failure to hit five

Splitting an axis because it turned out to be two is what the method *is* — the Big Five is five
because that is what the variance gave, not because five is a good number. Three checks that the
other four survive the same scrutiny:

- **Hierarchy** is not the kin axis: a clan society can be flat among household heads (segmentary
  lineages) or steeply ranked, and both exist.
- **Openness** is not impersonal obligation: Tokugawa Japan was highly institutional and deeply
  closed, which is the case that proves they dissociate.
- **Time horizon** is independent of all of them.

#### Plus a marker vector, which is not one of the five

The five are all *substantive*, and that leaves a hole: two factions can converge on every
substantive norm and still be unmistakably two factions — dress, diet, dialect, calendar, which
way you face to pray. So the engine also carries a **marker vector with no selection at all**. It
drifts freely, and its only job is **distance**.

This is load-bearing rather than flavour. Without an unselected axis, any two populations in
similar niches converge and fuse, because selection is pulling them to the same place — so the
model would lose the commonest case in human history, which is neighbours who agree about almost
everything and will not eat at each other's tables. The markers are also what
distinction-seeking operates on: when substantive norms converge, differentiation goes into the
cheap channel, which is exactly what it does in life.

#### The guard rail, stated as a rule

**A norm vector belongs to a faction, never to a species or a world.** A world has many, and the
model is uninteresting — and ugly — the moment it is read as "people from X are Y". Tschai is
the illustration: its point is not that humans there are docile, it is that **four human
populations on one planet carry four different vectors**, each shaped by a different patron. Any
display, any projection, any book text that collapses a world to one culture is a bug.

#### How the projections land

1986's own outputs read off pairs, which is the test that these axes are the right ones:
**law level** off tightness × impersonal obligation (is there a *law*, as against a custom?);
**government type** off hierarchy × impersonal obligation — which is Weber's patrimonial against
bureaucratic, arriving for free; **tech level drift** off openness × time horizon. And the split
earns its keep immediately: **kin obligation** feeds the *social features* list, which 1986 rolled
on a table and had no generator for — clan structures, feuds, arranged marriage, collective
liability all read off one axis. And the scenarios above fall out rather than
needing authoring: a **gold rush** is an unpredictability shock, so it selects short horizon and
loose tightness — boom-town lawlessness as a prediction instead of a special case; a **second
wave** on marginal land under threat comes out tighter and more hierarchical, which gives the
grievance a cultural signature and not merely a resource gap.

**Still open, and a real question:** whether five axes with a marker vector is enough to generate
cultures that feel distinct at the table, or whether distinctness lives mostly in the markers and
the institutions rather than in the five. That is answerable only by generating a few hundred and
reading them, which is Stage 5 work — but it is worth writing the expectation down now so the
answer can disagree with it.

### What this does to the 1986 society tables

1986 gave a planet **one** government, one law level, one list of social features — a single
culture per world. The faction model replaces that monolith, and the old tables get a better job
than they had: they become the **projection** of the state rather than the state itself. "What
government type is this?" is then a classifier over the dominant faction's norm vector and power
base, and "what is the law level?" is read from the norms actually in force.

So the play-tested vocabulary survives, and the thing it was approximating — that a world has a
politics — gets modelled underneath it. The tables stop being the generator and become the
readout, which is the same move the whole package makes: a model underneath, a lossy projection on
top for the table.

## What stays in the book, and in this repo

The package owns the physical model. **`foresight` keeps the game's own answers**: the HI bands and
what they mean at the table, the SVU, tech levels and what they gate, the society and law tables as
*rules* rather than as a simulation's internals, and the hand-rollable chapter. The package may not
import the book's vocabulary; the book cites the package.

## What `tosijs-3d` will be asked for

Filed on its board when each is needed, never edited from here:

- `surfaceFor(world)` in place of `rockyWorldFor`'s five presets — the adapter from a modelled world
  to a `PlanetSurface` and a look.
- Moons as model bodies rather than layout inventions.
- Palettes beyond the five Solar System bodies, since the biome chart already supports per-world
  palettes and nothing generates them.
- Streaming dim voxels near the camera, which is already open in `GALAXY-DESIGN.md` and is what
  brings the other half of the earthlike systems into the live galaxy.

## Open questions, deliberately deferred

- **Binaries.** Common in reality, and a circumbinary habitable zone is a good setting. Also a large
  increase in model surface area. Not in Stage 1 unless it falls out cheaply.
- **How many dimensions a norm vector has, and which.** The faction model's whole character
  depends on it, and picking the axes is a game-design decision rather than a modelling one — the
  wrong axes give a model that technically drifts and says nothing. Worth settling against the
  Interpersonal brief (board #2990), whose four dimensions (relationship, information, persuasion,
  deception) were chosen for the same reason: they are what a table can *play*.
- **How hard the SF is.** The model can be realistic to a fault; the game wants places worth
  visiting. `GALAXY-DESIGN.md` already settled the galaxy's version of this — the spectral mix is
  skewed on purpose, because a sky of red dwarfs is realistic and dull. The same judgement will be
  needed for planets, and should be made explicitly and written down each time rather than drifting.
- **Where the expensive layers run.** L2 is a worker job and wants a cache; whether that is in the
  browser, at build time, or both, depends on what the site does with it.
