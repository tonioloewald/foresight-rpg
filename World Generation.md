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
| **Kin obligation** | how far the boundary of "us" is **ascribed** — genealogically computable and unresignable — rather than joined and revocable; measured by genealogical depth | nepotism as duty or as corruption; inheritance; whether a crime implicates a family; what a marriage is for | **absence of institutions** — where no court will enforce, kin is the enforcement; also risk, frontier, low state capacity |
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

#### Kinship theory, and what it actually hands the engine

> Tonio, 2026-10-19: *"Maybe we could look at anthropology and sociology for pointers.
> Anthropology is very keen on explaining society from kinship theory which tends to map to this."*

It does map, and more usefully than as a source of vocabulary: **kinship theory is already a
generative model.** Descent, residence and marriage rules are rule systems with computable
consequences, which is exactly what this engine needs and exactly what a list of value-axes does
not supply. Five things it gives that would change the implementation, not just the prose.

**1. Residence and descent rules set the flow matrix — the biggest practical gift.** The drift
engine needs a flow operator, and in kin-based societies the dominant channel of norm transmission
is **marriage exchange**: who moves, how far, and in which direction. That is not free — it falls
out of the residence rule. **Patrilocality** means women move between groups every generation: a
large, regular, *directional* flow. **Matrilocality** reverses it; **neolocality** nearly stops it.
So a faction should carry a kinship *configuration* — descent, residence, marriage preference —
and the engine should **derive** its flow matrix from that rather than taking flow as a tunable
parameter. Fewer free parameters, and the ones that remain are things an anthropologist would
recognise.

**2. Segmentary lineage theory supplies the split/fuse metric.** I had sketched split and fuse on
an arbitrary trait-distance threshold. Evans-Pritchard's Nuer material gives something far better:
fission and fusion at **every level simultaneously**, keyed to **genealogical distance**, with
mobilisation happening at the level of the dispute — the "structural relativity of the segment".
So split/fuse is not binary, it is **scale-relative**: the same two groups are one unit against an
outsider and two units against each other. That is a better operator than the one I had, it is
already worked out, and it is the behaviour a feud needs.

**3. Marriage rules set the shape of the alliance graph.** Lévi-Strauss's distinction between
**restricted exchange** (two groups swap, closing a pair) and **generalised exchange** (A → B →
C → A, chaining many) is directly the difference between a narrow and a wide bridging structure —
so marriage rule is an *input* to the connectivity graph rather than a flavour note. And
**cousin marriage is the measurable version of the kin axis**: father's-brother's-daughter marriage
closes a lineage in on itself, which is the mechanism under amoral familism. It is also the proxy
the quantitative literature uses, so it is how this axis gets **calibrated against real data**
rather than guessed.

**4. Grid/group is the projection layer the model is missing.** Mary Douglas's two axes — *group*
(how strongly one is incorporated into a bounded unit) and *grid* (how far life is regulated by
classification) — were built to be **generative of cosmology**: social structure predicting what
people hold to be dangerous, polluting or blameworthy. That is precisely the gap between "a vector
of six numbers" and "something a GM can play", because it answers **what this faction is afraid
of**, and fear is what drives a plot. Her four cells (hierarchical, individualist, enclave,
fatalist) and the cultural theory of risk built on them are a ready-made table from structure to
anxiety. Worth noting that grid/group is *not* a seventh and eighth axis — group is close to kin
obligation and grid to tightness — so it is best used as a **readout**, which is what it was for.

**5. The classical sociology is the same split, already argued.** Durkheim's mechanical against
organic solidarity, with organic solidarity arising from the **division of labour**, is the
impersonal-obligation axis and its driver, stated in 1893. Tönnies' *Gemeinschaft/Gesellschaft*
is the same cut. Weber's patrimonialism is already cited above. And the named forms of
particularistic exchange *inside* modern institutional states — *guanxi*, *blat*, *wasta* — are
the evidence that the high-kin/high-impersonal cell is genuinely occupied rather than a gap in the
table.

#### Genealogical depth: the guess, and the ambiguity worth chasing

> Tonio, 2026-10-19: *"At a wild guess I'd suggest societies with deep close kinship ties (where
> you track your cousins and uncles and so forth tightly) tend to be more family loyal and less
> group loyal."*

**That is not a wild guess, it is the published result.** Kinship intensity — measured by cousin
marriage, lineage organisation, clan presence and co-residence — negatively predicts generalised
trust, impersonal prosociality and institutional quality. It is the spine of Henrich's WEIRD
argument and of the Schulz work cited above. The axis structure is doing what it should if an
offhand intuition and the quantitative literature land in the same place.

**Genealogical depth is also the right *measurable* for the axis**, which the vaguer "how hard do
kin claims bind" was not. *Which relationships are actually maintained, and do they impose duties?* is a
question with an answer — note **maintained**, not *nameable*, for the reason set out under
Finland below — and it gives the mechanism a budget rather than a disposition:
tracking second cousins is **maintenance work**, and the reciprocity it consumes is the same
finite resource a relationship with a stranger would need. Deep tracking does not merely correlate
with weak impersonal obligation — it *spends the budget* that impersonal obligation would run on.

#### Finland and Vietnam: the matched pair that settles it

> Tonio, 2026-10-19: *"Finland is a relatively collectivist society but with strong institutional
> loyalty. Vietnam is more collectivist but far weaker institutional loyalty."*

**This is the best single demonstration that the split is necessary**, and better than the
Scandinavia-against-familism contrast above, because the pair is **matched**: both societies read
as collectivist on the folk question, and they sit in **opposite cells**.

| | kin obligation | impersonal obligation | cell |
| --- | --- | --- | --- |
| **Finland** | low — nuclear households, neolocal residence, no lineage reckoning, the old cared for institutionally | very high — trusted institutions, accepted taxation, the office outlives its holder | **civic** |
| **Vietnam** | high — patrilineal lineage, ancestor veneration, dense kin reckoning, multi-generational households | low — relationship-based exchange, the office staffed through someone | **clan** |

What makes Finland *feel* collectivist is not a kin claim at all: it is that its impersonal
obligation is **enormous**. You owe a great deal — simply not to relatives. One axis cannot say
that, and this is what it sounds like when it tries.

#### Nomenclature is a fossil, not a measurement

> Tonio, 2026-10-19: *"And I think Finland's kinship nomenclature is actually weaker than
> English."*

**I think the specifics go the other way, and the reason they do is the useful part.** Finnish
distinguishes **setä** (father's brother) from **eno** (mother's brother) where English has only
*uncle*; and it carries **appi**, **anoppi**, **lanko** and **käly** as single words where English
compounds *father-in-law*, *mother-in-law*, *brother-in-law*, *sister-in-law*. By word count,
Finnish is the more differentiated of the two. *(From memory, and Finnish is not a language I can
check — but the setä/eno distinction in particular is a well-known feature.)*

**And Finland is still plainly the low-kin society.** Which means nomenclature is the wrong
instrument, for three reasons worth writing into the model:

1. **Kin terms are among the most conservative items in a lexicon.** They record a *past* kinship
   system, often by centuries. `setä`/`eno` preserves a distinction from a period when paternal
   and maternal obligations differed in kind; the distinction survived the practice. This is the
   error that sank Morgan's attempt to read social evolution off terminology, and it is the same
   error in miniature here.
2. **A rich terminology coexists easily with weak obligation.** An English speaker can say *second
   cousin once removed* and will mostly not be able to name one. Having the **word** is not
   tracking the **person**.
3. **And the converse**: a sparse terminology coexists with strong obligation wherever the
   relationships are maintained some other way — recited genealogies, lineage membership, naming
   systems.

**So the measurable is relationships *maintained*, not categories *available*.** That corrects what
I wrote above — "how many relatives can you name" was sloppy, because it slides between the two.
The behavioural measures are the ones the literature uses and the ones this axis should take:
cousin marriage rate, household structure and co-residence, whether kin obligations are enforceable
(inheritance, collective liability, who must consent to a marriage), and support flows. Finland is
low-kin on every one of them while having a richer uncle vocabulary than English, which is the
whole point.

#### But the intuition is right at the level that carries information

Terminology *does* encode structure — just not in the word count. What carries the signal is
**which kin are merged**, which is Murdock's typology: *Hawaiian, Eskimo, Iroquois, Omaha, Crow,
Sudanese*. And there the intuition lands:

- English and Finnish are both **Eskimo/lineal** — all cousins merged under one term, the nuclear
  family picked out — which is the type that goes with **bilateral descent and weak lineages**.
  So they are in the **same class**, and `setä`/`eno` is a within-type detail.
- Vietnamese is **not** in that class: dense differentiation by side, age and lineage position, in
  the direction of **Sudanese**, which is what a patrilineal descent system produces.

So the instinct — that a weakly kin-organised society should show it in its kinship terms — is
correct; it is the English comparison that is the wrong instrument, because both languages sit in
the same type. **Typology separates Finland from Vietnam; word count separates nothing.**

#### Which hands the readout a free piece of colour

This is cheap and worth having: **the engine can emit a terminology type** as a projection of
descent rule × kin obligation. A generated culture that reckons patrilineally with high kin
obligation gets a Sudanese-style terminology; a bilateral low-kin one gets a lineal one — and a
GM who wants to know what these people call their uncles has an answer that **follows from the
structure** rather than being invented. One of the better ratios of table colour to model
complexity in the whole plan, and it comes directly from Tonio's observation being worth checking.

#### Which yields the cleanest statement yet: collectivism is a magnitude, not a direction

The two obligation axes form a **vector**. What Finland and Vietnam share is its **magnitude** —
in both, the individual's own claim is weak against whatever group holds them. What they differ on
is its **direction** — toward kin, or toward offices.

So *"collectivist"* is a reading of the magnitude, and the clan/civic distinction is the
direction. Individual autonomy is just a short vector. **That means no seventh axis is needed**:
collectivism is derived, and the information is in the direction, which is exactly where the folk
term throws it away.

It also explains what Hofstede's individualism index is really measuring. Its items are about
family and in-group — so it tracks something close to **the kin axis, inverted**, while being
named as though it measured obligation in general. From memory the scores run Vietnam ~20, Finland
~63, Sweden ~71, the United States ~91: a clean reading of kin intensity, and nearly blind to
impersonal obligation, which is why Finland and the United States land on the same side of it
despite institutional loyalty being the thing that most distinguishes them. The index's
correlation with prosperity then falls out of the substitution mechanism rather than being a
discovery. *(Scores from memory — worth checking before any of this is quoted.)*

#### And the pair is a fixture for the projection layer, which is where it will break

Tschai and Maz test the engine. **Finland and Vietnam test the readout**, and that is the part most
likely to fail, because a GM-facing one-liner is exactly where two axes get flattened back into one
word — and *collectivist* is a very tempting word.

So: **the projection must never emit "collectivist" on its own.** It has to name the direction.

- Finland: *obligation runs wide and impersonal — you owe the stranger and the office, not the
  cousin.*
- Vietnam: *obligation runs deep and narrow — the lineage first, and the office is staffed by
  somebody's nephew.*

If a generated culture's summary cannot tell those two apart, the readout has collapsed the axes
whatever the engine is doing underneath. Cheap test, and it catches the likeliest failure.

#### But "less group loyal" hides the same confound as "collectivist"

A deep-kinship society is often **ferociously** loyal to a group — the lineage, the clan, the
sect. What it lacks is not loyalty. So the difference is not *how much*, it is **where the boundary
comes from**:

- **Ascribed** — the boundary is genealogically computable. You are born inside it, you cannot
  resign, and anyone can work out whether you are in.
- **Achieved** — the boundary is membership. You join, you can leave, and being in is a fact about
  your choices.

That is a better statement of the kin axis than strength was, because **strength is a consequence
of ascription**: a bond you never chose is a bond you cannot shed. One fact seen twice. (It is also
Parsons' particularism/universalism and Linton's ascribed/achieved status, arriving from the other
direction.)

#### Which makes the split/fuse operator asymmetric by cell — a real prediction

This is where the refinement pays, because it tells the engine's own operator to behave
differently depending on the axis:

| | high kin (ascribed) | low kin (achieved) |
| --- | --- | --- |
| **fission** | **easy and clean** — a lineage splits along a genealogical seam that already exists, and everyone knows which side they are on | **messy** — no natural seam, so a split has to be *argued*: doctrine, or markers |
| **fusion** | **nearly impossible** except through **marriage alliance**, which is exactly why marriage rules are the mechanism rather than a detail | **easy** — you simply join |

So clans split over genealogy and sects split over doctrine, and both fall out of one axis rather
than needing separate rules. That also explains why the marker vector matters most in the
*low*-kin cell: where there is no genealogical seam to split along, differentiation has to be
manufactured, and markers are what it is manufactured from.

*Falsifier, in the engine's own terms:* deep genealogical tracking should yield **many small,
cohesive, mutually hostile, stable groups with no large-scale cooperation**; shallow tracking on
the same world should yield **fewer, larger, more permeable ones**. And because kin networks and
institutions compete for the same functions — insurance, enforcement, credit, care — the
transition between them should show **hysteresis**: once a world is in a cell it should tend to
stay, which is what the historical record looks like and what a model with independent axes and
substitutive selection should produce without being told to.

**And it is the Tschai mechanism exactly.** Fictive descent — a client population believing
itself descended from its patron — can only bind in an ascribed-boundary society, because the lie
has to be a *genealogical* lie to do any work. In a civic society you would merely be an employee,
and could resign. So Tschai is a prediction about its clients' kin axis, and the corpus can check
it.

#### One caution, which the model happens to answer

**Anthropology substantially dismantled kinship-as-foundation**, and it would be careless to build
on the 1950s version as though it had not. Schneider's critique — that "kinship" may be a
Western analytic category projected onto everyone — and the later turn toward kinship as
*practice* rather than structure are both serious, and a model that explains every society from
descent rules would be baking in a theory the field itself abandoned.

The resolution is pleasing, because the model already contains it. **Kinship's explanatory power is
a variable here, not an assumption.** In the clan cell it explains nearly everything; in the civic
cell it explains very little, because obligation has moved into offices and contracts. So
*"how much does kinship explain this society?"* is an **output** of the kin-obligation axis rather
than a premise of the engine. Use kinship mechanics hard where that axis is high, and let them
fall away where it is low — which is also simply what happened historically.

*(The specific citations above are from memory and are offered as pointers, not references. If any
of this reaches the book rather than the engine, they want checking first.)*

#### Tested against 1986's social features table

> Tonio, 2026-10-19: *"take the social quirks set from foresight 1986 and see which typologies it
> would map to and if any are clearly missing. When we have typologies they will also evoke missing
> social features."* — and *"Or big six or whatever."*

**This is a real test and not a circular one**, which is rare. 1986's Social Features table was
authored in 1986, play-tested for years, and owes nothing to any of the theory above — so it is an
**independent instrument**. Same discipline as the item-matching pilot (#3062): does an
independently-built set of items span the space the model claims? All 48 entries mapped. Five
findings, and three of them are worth more than the agreement.

**1. Every escalation ladder in the table is a tightness ladder.** Ghetto-ization → Segregation;
Family Reputation → Class → Caste; National Religion → Discrimination → Persecution;
Xenophobia → Xenopersecution; Low Cultural Tolerance → Intolerance → Violent Intolerance;
Obligation System → Personal Honour → Honour System; Elaborate → Critical Business Customs;
every taboo escalation. **In every case, rolling again hardens enforcement rather than adding
content.** So 1986 encoded tightness as a *meta-operator applied to features* rather than as a
feature of its own — which is exactly the claim that tightness is a meta-axis and in the engine
*is* selection strength. That is independent confirmation of the oddest choice in the set, from a
table that had never heard the argument.

**2. Roughly 40% of the table is pure marker.** No facial expression, masks, no gesticulation, no
vocal modulation, musical accompaniment, perfumes, clothing-as-signal, strange performing art,
strange sport, horrific cuisine, fanatical cleanliness, tolerance for dirt, body beautiful,
bizarre sexual ritual. **None of them is selected for anything**; all of them say *we are the
people who do this*. An author generating social features from play experience spent nearly half
his table on identity markers with no adaptive function — which is the evidence that the
unselected marker vector is load-bearing rather than a nicety. (And *Perversely* Horrific Cuisine,
where the locals take pride in food they also dislike, is counter-signalling in one table row.)

**3. The gap is Time horizon.** It is the one axis the table barely touches — Spartan Tendency,
and arguably Drug Culture, out of 48 entries. Two readings, and I think both are true:

- **1986 has a genuine hole**, and the axis *evokes* what is missing: ancestor veneration, dynastic
  obligation, debt bondage, guild apprenticeship, generational feud, monumental public works, a
  norm of providing for a descendant nobody will meet.
- **And the axis projects onto a different readout.** Time horizon shows up in **institutions and
  infrastructure** — debt, public works, inheritance law — far more than in *customs*. So the
  lesson is more general and worth stating: **not every axis projects onto every readout.** Time
  horizon belongs mostly to the history layer, and a social-features generator driven by all six
  equally would manufacture nonsense on that one.

**4. 1986 named the anomie cell.** *Society without Trust* — "the locals regard all as fair game"
— is low kin obligation **and** low impersonal obligation, which is the fourth cell of the
four-cell table above. The cell was predicted from the axis split and an independent author had
already written an entry for it. Likewise *Progress Through Assassination* is low impersonal
obligation stated as sharply as it can be: **an office that can be taken by killing its holder is
not an institution.** And *Great Hospitality* is the subtle one — a duty owed to a stranger *as
such*, which is impersonal obligation implemented as a norm rather than as an institution, and is
exactly how a narrow-kin society handles strangers at all.

**5. And one generalisation that pays for itself.** The table has four segregation-flavoured
entries — by race, by social group, by birth (Family Reputation → Class → Caste), and by sex
(Marked Sex-role Differentiation → Discrimination → Segregation). Only the third is about kin.
So the axis is better named **ascription**: *how far a person's standing and group are fixed by
birth rather than by what they do* — with **kinship as its principal channel but not its only
one**. Renaming it covers eight entries it did not before, and costs nothing, because the
mechanism (unresignable, externally checkable, therefore binding) is identical whether the
ascribed thing is a lineage, a caste, a race or a sex.

*Test before adopting:* societies with strong kin ascription should also show strong non-kin
ascription. I expect a high correlation, which would make it one axis; if they dissociate, it is
two.

#### The one candidate for a seventh, and why the count is an output

Tonio: *"Or big six or whatever."* — right, and worth saying why. **The number is an output of
the method, not a target.** Five became six when reach-of-obligation turned out to be two things,
and the table above suggests one more candidate while *removing* pressure elsewhere by generalising
the kin axis.

The candidate is **Openness, which the table splits in two**: *Xenophobia* and *Low Cultural
Tolerance* are openness to **persons**; *Mistrust of AI → Computer Ban* is openness to
**novelty**. 1986 gave them separate entries, and they dissociate in life — Tokugawa Japan closed
to foreigners while selectively importing technique; the Amish comparatively open to persons and
closed to machines. That is a real dissociation, so this is a genuine seventh axis rather than
axis-proliferation, and it should be adopted if generated societies show the two uncorrelated.

#### What the axes evoke that 1986 lacks — the test running the other way

Tonio's second half: typologies should evoke missing features. They do, and the pattern of what is
missing is itself a finding.

| Axis and end | Features 1986 has no entry for |
| --- | --- |
| Time horizon | ancestor veneration, dynastic obligation, debt bondage, apprenticeship and guilds, generational feud, monumental works |
| Impersonal obligation, high | civic duty as an obligation (jury, conscription), oath-of-office ritual, professional licensure, universal record-keeping, whistleblowing as a virtue, the queue as a moral institution |
| Impersonal obligation, low | patronage networks, nepotism as *explicit duty*, bribery as etiquette |
| Ascription, high | bride-price and dowry, cousin-marriage preference, blood feud, collective liability, adoption for heirs, ancestor cult |
| Openness to novelty, high | technophilia, a cult of the new, fashion cycles, planned obsolescence as a virtue |
| Openness to persons, high | **nothing at all** — no easily-granted citizenship, no cosmopolitanism, no radical hospitality as policy |

**That last row is the finding.** 1986's table is **asymmetric toward the hostile and the exotic**,
because it was written to generate *problems for travellers* — which is a reasonable GM-facing
choice for a table a referee rolls on, and a bad one for a generator that has to populate a galaxy.
A model driven by the axes will produce both ends by construction, and **the entries to write first
are the positive ones**, because they are the ones no existing table supplies.

#### Classify a feature by what it does to play, not by whether it is hostile

> Tonio, 2026-10-19: *"Tea ceremonies and elaborate weddings are less likely to trip up
> adventurers."*

True of the table as written — and **1986 has exactly one entry in the other class, which is the
model for all of them.** *Elaborate Business Customs* is the tea ceremony, and the reason it works
is one clause:

> "… but they make allowance for foreigners (in fact if a foreigner does observe their customs,
> **their demeanor will improve by one row**)"

**A bonus for doing your homework.** That is this project's own standard arriving in a 1986 table:
*friction needs a countermove that pays*. An uphill penalty with no route-reading to reward is a
tax; the same penalty with a learnable answer is friction. So the useful cut is not hostile against
pleasant, it is **what the feature does to play**:

| Class | What it does | Generated by |
| --- | --- | --- |
| **Gate** | removes an option; the answer is "not here" | high tightness × low openness |
| **Procedure** | rewards competence — learn it, perform it, gain | high tightness × high ascription, or high impersonal obligation (a ritual is a *rule*, therefore learnable) |
| **Resource** | something a player can *use* | high ascription → patronage; high impersonal → courts and contracts; hospitality → shelter |
| **Marker** | colour, and it tells you who you are dealing with | the marker vector |

By that cut, 1986 is heavy on **gates** (Xenophobia, Violent Cultural Intolerance, Computer Ban,
Religious Persecution) and thin on **procedures** and **resources** — though not empty: the
*Obligation System* is a genuine resource, since a catalogue of favours owed is a currency a clever
player can bank and spend, and *Domination* / *Duel System* opens a status channel a PC can enter.
**A gate is the weakest of the four**, because it fails the compressible/answerable/rewarded test
at the second step: there is no countermove, so it is a wall rather than friction. So the generator
should keep gates in the **minority**, which is the opposite of what a travellers'-problems table
is built to do.

#### Better: gates get their workarounds from the other axes

> Tonio, 2026-10-19: *"Or gates should have workarounds suggested by other axes."*

**That is better than the quota I proposed**, and structurally rather than by degree. "Keep gates
in the minority" is a blunt instrument — a count, imposed from outside. This is derived: a gate
is high tightness on **one** dimension, and tightness says how hard norms bind, not that the
other axes have stopped having values. **Every gate is a gate on one axis; the other axes are the
doors.**

Take *Xenophobia* — strangers shunned and feared — and read the rest of the vector:

| The culture is also… | …so the way in is |
| --- | --- |
| high **ascription** | get adopted, sponsored, married in, blood-brothered. If the boundary is genealogical there is a genealogical door |
| high **impersonal obligation** | a licence, a visa, a guild ticket, a contract. The office does not care who you are |
| high **hierarchy** | a patron vouches for you; the gate opens from above |
| long **time horizon** | residence. Stay twenty years and you are local |
| high **openness to novelty** | be a curiosity rather than a threat |
| low **tightness** | the rule exists and nobody checks — there is a quarter where it is not enforced |

One gate, six different keys, and **which key it is characterises the society more sharply than
the gate did.** "Strangers are feared here, and the way in is adoption" and "strangers are feared
here, and the way in is a permit" are two completely different places, generated from the same
feature.

The sharpest case is *Religious Persecution*, because the ascription axis decides whether
**conversion is even available**. In a low-ascription society you simply join the state religion
and the gate opens. In a high-ascription one you cannot convert out of what you were born as, so
the only routes are concealment or clientage. Same gate, and whether the obvious answer exists at
all is derived rather than authored.

**Which simplifies the classification above.** Gate / procedure / resource / marker are not four
*kinds of feature* — they are **how a feature reads against the rest of the vector**. Xenophobia
is a gate where no other axis supplies a door, and a *procedure* where ascription supplies an
adoption rite that can be learned and performed. One feature, read differently. That is a smaller
model than four categories of content, and it does more.

So the generator rule, in place of the quota: **when a feature presents as a gate, derive at least
one workaround from the highest other axis value, and price it.** A generated culture with a gate
and no derivable workaround is then a *bug* — either the vector is degenerate, or the projection
is incomplete.

#### A prohibition in a hierarchy does not vanish — it sinks

> Tonio, 2026-10-19: *"a society that bans computers but is very hierarchical might ignore the rule
> or be blind to it for a certain caste. Oh of course untouchables can use computers, they're too
> stupid to misuse them."*

**This is a better reading of hierarchy than mine.** I had the exemption at the **top** — a patron
vouches for you, the gate opens from above. Tonio's is at the **bottom**, and it is the more useful
of the two for three reasons.

A hierarchy does not only grade power. It grades **who the rules are about** — so a norm's scope
of applicability is itself ranked, and there are two quite different exemptions:

- **Privilege**, at the top: the rule does not bind you because you are above it.
- **Beneath notice**, at the bottom: the rule does not bind you because you do not fully count.

The second is better table material. It is **accessible** — a PC cannot become the Prince, but a
PC can be taken for a nobody, or simply *hire* one. It is **cheaper and dirtier**, which is the
register adventures live in. And it creates **a class holding a capability the elite have forbidden
themselves**, which is a time bomb: the untouchables end up the only people who know how the
machines work.

**So the general rule: a prohibition in a hierarchical society sinks rather than disappearing.** The
forbidden-but-necessary work is delegated to whoever is beneath the rule's dignity — and the
prohibition therefore *creates an occupational niche at the bottom*. Which is a **power base**, and
feeds straight back into the faction engine as a monopoly on something nobody respectable may touch.

This is attested and not speculative: tanners, butchers, gravediggers, executioners, nightsoil
carriers, moneylenders. The forbidden thing gets done by people who do not count.

#### Three shapes of exemption, one per axis pair

| Tightness combines with… | …and the exemption is | justified by |
| --- | --- | --- |
| **hierarchy** | it sinks: an underclass does it, beneath the rule's notice (or the elite are privileged above it) | **contempt** — "they are too stupid to misuse them" |
| **impersonal obligation** | a **licence**: a registered operator, a bonded technician | **procedure** — it is permitted, in writing, under conditions |
| **ascription** | a **hereditary keeper**: one lineage has always tended the machines | **tradition** — it is what they are for |
| low **hierarchy**, no other door | it actually binds, or everyone openly breaks it | nothing — and this is the genuine wall |

Tonio's example **fuses the first and third** — "untouchables" is a caste at a hierarchy's bottom
— and that compound is the richest version: a lineage both despised and indispensable. It is also
where the purity cluster in 1986's table finally gets its mechanism, which it lacked when I mapped
it: **purity norms generate occupational castes**, because what must not be touched still has to be
handled by somebody. Douglas, arriving exactly where she is useful.

#### The generator should emit the rationalisation, not just the rule

The sharpest thing in Tonio's example is not the exemption, it is *"they're too stupid to misuse
them."* **The lie is load-bearing**: it is what lets a society hold the prohibition and the
exemption at once without noticing the contradiction. So a feature should be emitted as **three**
parts, not one:

> **the rule** — computers are banned
> **the door** — except for untouchables
> **the lie** — because they are too stupid to misuse them

The third part is what a GM says out loud, it tells the players more about the society than the
rule did, and it is the seam a clever player works: *a society's contempt for a class is available
as cover.* And it is derivable, because the justification follows from whichever axis supplied the
door — contempt from hierarchy, procedure from impersonal obligation, tradition from ascription.

#### "And funnier" — which turns out to be a correctness check

> Tonio, 2026-10-19: *"And funnier."*

It is, and the humour is diagnostic rather than decorative. **The lie is funny precisely when it is
self-refuting**: if the untouchables are too stupid to *misuse* a computer they are too stupid to
*use* one, and the society cannot see it. That is dramatic irony — the players know what the
speaker does not — sitting on top of bathos, a grand renunciation of the machines resolved by the
sweepers doing it after dark.

**And that self-refutation is the signature of a real social rationalisation.** A *coherent*
justification for an exemption would have forced the rule to change; the incoherent ones survive
exactly because nobody examines them. So:

> **If the generated lie is funny, it is probably right. If it reads as reasonable, the generator
> has produced a licence rather than a rationalisation.**

A usable heuristic for reading the readout's output, and it also predicts the *register* per axis,
which falls out of the same table as before:

| The door came from… | …and the register is |
| --- | --- |
| **hierarchy** | contempt, and therefore comic — self-refuting on inspection |
| **ascription** | absurdity by antiquity — *the Vane family have always tended the engines, and no one now remembers why they alone may* |
| **impersonal obligation** | dry, and correctly so: a licence is coherent, so the comedy is bureaucratic rather than ironic — the form in triplicate, not the self-deception |

#### Tonio wrote this joke in 1986

Worth recording, because it is the best validation in this whole section. The derivation above —
prohibition sinks, the underclass does the forbidden work, contempt supplies the excuse — is
already in the Social Features table, as a parenthesis:

> **Intolerance for Animals**: the locals cannot abide animals … They regard them as "unclean", or
> whatever *(they may still eat them, once prepared by robots, or **untouchables**, or something;
> **hypocrisy has always been popular**)*

Same mechanism, same class, same joke, forty years earlier and thrown away in a bracket. The model
did not discover anything here; it **recovered** something the author already knew intuitively and
had never generalised. That is the best possible result for an axis set — it means the axes are
tracking what the designer's instincts were tracking, and can now do it on purpose and at volume.

It also fixes the tone. **This is Vance's register**, which is the right one for this project given
the hussade and Tschai references and 1986's own voice (*"converted, killed, fed to lions,
crucified, etc."*): appalling customs described with mild ethnographic interest. A generator
producing wry, straight-faced absurdity is tonally **correct**, not lapsing.

**One guard rail, and it matters.** The butt of the joke is **always the rationaliser**. The
untouchable-computer line is funny at the *elite's* expense, because the self-deception is theirs.
If an output reads as mocking the despised class rather than the society that despises them, the
projection has gone wrong — the same failure, in a different coat, as collapsing a world to one
culture.

#### Which yields a falsifier for the engine, not just the readout

The delegated class holds a monopoly on something necessary while being denied standing. **That is
unstable, and history says how it resolves**: the mamluks and the janissaries were raised to do what
the elite would not, and ended up holding the state.

So: **the engine should sometimes produce the delegated class seizing power**, without anyone
authoring a revolution. If prohibition-plus-hierarchy never generates that outcome over enough
runs, the power-base model is not actually treating a monopoly as power — it is treating it as
flavour.

#### Except that some walls should stay walls

With one caution, because the rule taken absolutely would cost something. **If every wall has a
door, the setting loses the ability to say no**, and *Violent Cultural Intolerance* with a
workaround is merely a difficulty modifier. This project's own principle cuts the other way here:
*an alternative that cannot go wrong is an exit, not an option* — so a genuine wall is what makes
the other paths matter.

The resolution is the compression principle again: a thing must be **answerable at some scale**,
not necessarily at the scale where you met it. A gate with no key at the door is legitimate when
the *world* supplies the alternative — another province, another faction, another planet. So:
workarounds by default, derived from the vector; and a true wall as a rarer, deliberate output
whose answer is at campaign scale rather than scene scale. What is never acceptable is a wall with
no answer at **any** scale, which is the only version that is actually just a tax.

#### And both of Tonio's examples are derived rather than decorative

- **Elaborate weddings** come from **high ascription**. A wedding is the moment ascribed status is
  conferred and an alliance made — and where marriage *is* the fusion operator (Lévi-Strauss,
  above), the wedding is the most politically consequential event the society has. So its scale is
  not flavour: **an elaborate wedding is the visible form of the fusion operator.** Low ascription
  with neolocal residence gives you a party instead.
- **A tea ceremony** comes from **high tightness × hierarchy × marker investment**: a procedure
  precise enough to be performed correctly or incorrectly, encoding rank in who pours and who sits
  where. Which is also why it is a *procedure* in the table above and not a gate — it can be
  learned, and getting it right is worth something.

Both were evoked by the axes, which is the backwards test working as Tonio predicted: the
typologies name the features that are missing, and the features turn out to be generable rather
than needing authoring one at a time.

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
