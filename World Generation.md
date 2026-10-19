# World Generation — design record

> **Status:** plan agreed in principle 2026-10-19 (Tonio). Two decisions taken; the package does
> not exist yet and nothing is built. Board #3391.
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

## The two decisions

**1. A tool, with a hand-rollable summary in the book.** The model lives in code and may be as
deep as it earns; the book gets a short chapter a GM can roll by hand at the table. The dice
version is a **deliberately lossy projection of the model**, not a separate system — which makes
it testable (below), and which is the honest version of what 1986 was reaching for when it asked
for a generator that was *"dumb"* enough to be plugged into a computer. We have the computer now,
so the depth goes there and the table keeps the dice.

**2. A new engine-free package.** It owns astrophysics → planetology → surface → climate →
biosphere → history, is Babylon-free and runs headless. `tosijs-3d` consumes it for rendering;
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
| **L2 — surface** | plates → hypsometry → erosion → a height field and a climate, as a `PlanetSurface` | 10–100 ms, worker-friendly, cached | a world someone looks at |
| **L3 — story** | biosphere, then the iterated history: colonisation, population, tech levels, government, settlement, law | ms | a world someone plays on |

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

**Stage 0 — the package and the harness.** The repo, the `World` types in real units (no strings),
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

**Stage 5 — history.** 1986 steps [v]–[xii], re-founded and iterated: colonisation date, 25-year
generations, population compounding, hard and soft tech levels drifting under government effects,
government change, settlement structure, social features, law level. **The output is a timeline,
not a snapshot** — that is the whole point, and it is what makes a colony's present explicable.
*Falsifier: a small number of hand-authored histories the generator must be able to produce.*

1986's version of this is a gift and should be treated as one: it already iterates, its numbers
were calibrated by years of play, and the structure was designed by someone who had run it. The
work is re-founding its inputs on the new model, not inventing a replacement.

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
- **How hard the SF is.** The model can be realistic to a fault; the game wants places worth
  visiting. `GALAXY-DESIGN.md` already settled the galaxy's version of this — the spectral mix is
  skewed on purpose, because a sky of red dwarfs is realistic and dull. The same judgement will be
  needed for planets, and should be made explicitly and written down each time rather than drifting.
- **Where the expensive layers run.** L2 is a worker job and wants a cache; whether that is in the
  browser, at build time, or both, depends on what the site does with it.
