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
