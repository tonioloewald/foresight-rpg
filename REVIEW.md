# ForeSight RPG — Review & To-Fix

Running list of things to revisit. Grouped by area; check off as resolved.

## Magic application catalog (`docs/data/magic-applications.json`)
- [x] ~~Recover missing descriptions — Sense §16A3 and §16A5~~ **Resolved:** they were the *bestowed* forms of the controlled effects one tier down (§16B2 augment → §16A3; §16A4 replace → §16A5). Rewritten accordingly; §16A4 intensity corrected to 2 (parser had been fooled by the literal "Intensity 1 Applications bestowed" text).
- [ ] **Spot-check intensities in other fundamentals** for the same parser glitch (a description line that literally began "Intensity N Applications" reset the tier). Only Sense was known to contain such phrasing, but worth a scan.
- [ ] **Duplicate codes** in the original — **Summon §20A4** appears twice; **Time §23A6** appears twice. Almost certainly numbering errors; renumber.
- [ ] **Cancellation §4A10** had several effects mashed into one source entry; they were split without inventing anything — confirm the split matches intent.
- [ ] **Scaling / Variable formulas** are rough OCR/encoding artifacts (tab-delimited columns came through as stray apostrophes, e.g. `Z'inflicts DC2Z+3'`). Need a human pass to restore the intended "base vs. scaled" columns. Descriptions themselves are clean.
- [ ] Spot-check the **auto-generated names** (124 were invented) and rename to taste.

## Book output (ePub / print)
- [x] ~~Static build-time table rendering~~ **Done** — `entity-views.ts` runs from `site.config`'s `prebuild` (before doc extraction) and renders `static/data/*.json` into a limited-column `<table>` + per-item detail cards, so the book gets real HTML. `<foresight-table>` now *enhances* that substrate (summary/cards toggle, text + tag filter) instead of replacing a blank element. `skills.md` is back in the book (20 rows, 20 cards, 20 working row→card anchors, zero JS).
- [x] ~~All internal cross-links are dead in the ePub~~ **Fixed** by consuming tosijs-ui 1.7.0-beta.5's `rewriteInBookLinks` ([#15](https://github.com/tonioloewald/tosijs-ui/issues/15)). 21 dead links → 2, both the deliberately-excluded `character-builder` (out-of-book links are left as-is by design). See `UPSTREAM.md`.
- [ ] **Two out-of-book `/character-builder/` links remain dead in the ePub** (`README`/home + the auto-generated core-section TOC). Decided: point them at the live site (`foresight-rpg.com/character-builder/`) via an upstream ePub fix — tosijs-ui [#17](https://github.com/tonioloewald/tosijs-ui/issues/17), which Tonio implements. When it ships, add `epub.baseUrl` here. See `UPSTREAM.md`. (Domain DNS is pending — no hurry; the links go live when it resolves.)
- [ ] **`src/site-root.ts` is a fragile workaround** for tosijs-ui#16 (no runtime basePath) — it hardcodes the doc-system's asset filenames. Replace with the upstream helper when one lands. See `UPSTREAM.md`.
- [ ] **On stable tosijs-ui 1.7.0, move the pin** from `1.7.0-beta.5` to `^1.7.0` (`package.json`).
- [ ] **Swap the remaining collections to entity views** — add specs to `src/entity-specs.ts` for `background-factors`, `fields`, `magic-fundamentals`, then replace the hand-written Markdown tables in the one-pagers with `<!-- entity-view: … -->` blocks. (`magic-applications.json` is nested — 23 fundamentals × 232 applications — so it needs a grouped renderer, not the flat one.)
- [ ] `character-builder.md` stays excluded from the book (`site.config.ts` → `book.exclude`): pure JS, no static substrate, so it's a stub chapter in print.

## Source-edition conflicts (2004 vs 1986)
- [ ] Where the 2004 draft and the 1986 original disagree on a **number or probability**, log it here rather than defaulting to 2004 — 2004 was never playtested, 1986 shipped. (Prose/structure: 2004 wins, no argument. See CLAUDE.md → Source hierarchy.)

## Calibration — test in play, then tune
- [ ] **Simultaneous Action ladder** (0 / −1,−2 / −2,−3,−4) — magnitudes inherited from the reaction ladder, so plausibly calibrated, but the planned-vs-unplanned split (declared tasks share the ladder; unplanned reactions pay flat −2 each) is new and untested. Does the n=3 tier ever get chosen, or is it purely a deterrent? See Design Document §7a.
- [ ] **Background-factor slot budget** (default 4) and which factors are free vs. 1 slot.
- [ ] **Point economy magnitudes** — attribute 10/20 curve, skill `cost×(L+2)`, fields 4/yr. The whole economy shrank (fewer attrs, fewer/cheaper skills, no E/G familiarity buys, minor buys → quirks); budgets/grants likely need to come down.
- [ ] **Skill Cost 1-vs-2 split** is provisional.
- [ ] **Ranged skill calibration (2026-07-xx).** Fixed **Firearms BEF 3 → 5** (a pistol is dangerous after 30 min; should be ≥ Archery). Made **Archery a ½-skill (limit 1.5)** with formula `(CO+PC)/4` — but the formula is unsettled: author floated `(CO+PC)/4` / `CO/2` / `(CO+ST)/4` and leans toward **ST mattering** (bows are strength-hungry). Decide the final Archery formula. And **Slings** should also be a limit-1.5 skill — decide whether it's its own skill or stays folded under Archery (currently Archery's "covers" says "bows and slings").
- [ ] **Tag assignments** (`standard/ancient/modern/sf/fantasy`) on skills, BFs, fields, magic fundamentals are best-guess.
- [ ] **Field hierarchy years** (First Aid 1 … Surgery 4) and the prerequisite model (implies-ancestors vs. pay-the-chain) — provisional.
- [ ] **Magic fundamentals** Basic/Advanced years (currently flat 1/3) — provisional, "will do for now".
- [ ] **Magic skills** — set Incantation per-level cost (~6–8 from old playtesting); confirm Mana cost. Magic is intentionally out of the lean playtest skill list.

## Open design questions
- [ ] **Skill overlap rule** when a skill is granted by multiple background factors (candidate: take the better, +1).
- [ ] **Field prerequisite enforcement** — tooling requires the parent before a child, or just implies ancestors and trusts the GM?
- [ ] **Magic field tree** — does magical knowledge live in `fields.json` or stay a parallel tree (`magic-fundamentals.json`)? Currently parallel.

## Architecture / app (when the `data-table` component is published)
- [ ] Swap the static Markdown tables in the one-pagers for `<data-table src="data/…json">`.
- [ ] Decide whether the character sheet should also offer **fields** (and magic) from JSON (currently fields are freeform text in the sheet; skills & BFs already load from JSON).
- [ ] Optional thin wrapper element `<foresight-table src + columns>` over `data-table`.
- [ ] Later: replace the sheet's localStorage with the Firestore persistence library (field-level security for a shared campaign roster).
- [ ] Trivial: remove the now-unused `.sub2` CSS rule in `docs/index.html`.

## Settings-as-configuration + one-pager spine (2026-07-22 direction — see Design Document)
- [ ] **Settings/configuration page** — pick a setting via axes (Tech, Magic, Ch'i, Psionics, Divine); rules/tables/sheet reshape to it. Depends on the data-model change below. Rules prose → placeholder for off subsystems; tables/sheet → filter silently. The web front-end of the setting/campaign (Firestore) model.
- [ ] **Data-model: capability requirements.** Add a per-entity threshold on the setting axes (orthogonal to the genre `tags`). This is what the config page gates on — add it to entities as the one-pagers/data are (re)drafted.
- **Refactor the mechanical core into the 5-page spine** — One Rule, Initiative, Damage, Exhaustion, Intense Action — grounded in `ForeSight 2004 v48.pdf`. House rule: core ≤ 1 page, examples longer but never ceremony.
  - [x] **One Rule** — done (spine page 1).
  - [x] **Initiative + Intense Action** — done: `combat.md` split into `initiative.md` + `intense-action.md`, grounded in 2004 (position modifier, QR7-panic/QR10-freeze, awareness ≈ ½(PC+Stealth)). Reconciled cleanly with §7a: the one-thing baseline stays **0**; *concentrate* is an over-commit that buys a bonus at a reflex penalty — an extension, not a baseline shift. Refined modifiers applied (reflex tier, +1/+2 promotion, secondary can't pre-empt, effectiveness-or-EF).
  - [x] **Damage + Exhaustion** — done: `damage.md` (0–6 wound track, Yield×DC×½ rounded down, ¼-level stun floor, stun/shaken, armor P/A, scale, recovery+relapse, poison/disease/environmental) and `exhaustion.md` (0–5 track, domain-weighted, magic-is-fatigue-by-default, divine favour gated by deed-driven Piety, push-a-level-for-+4). This **consolidated** the old `damage.md` + `wounds-and-recovery.md` + `power-pools.md` into the two spine pages; the old three are gone.
- [ ] **Remove/merge `quality-ratings.md` + `open-ended-resolution.md`** now that One Rule subsumes their cores. The **partial-blocking table** now lives on `melee-combat.md` (its permanent home) — so `open-ended-resolution.md`'s copy is safe to drop with the page. The tennis example can fold into One Rule or go.
- [ ] **`character-builder.md` has a stale `order: 3.5`** and mis-sorts to the end of `core` (the doc-system sorts order lexically — fractions break it; see tosijs-ui#24). Give it an integer slot when `core` is reorganized (blocked on the quality-ratings/open-ended removal above, which renumbers core anyway).
- [x] **Wound track → 0–6** (6 = dead, 4 = incapacitated, 5 = dying) — done in `damage.md`; CLAUDE.md's "0→8" line corrected.

## Magic restructure (2026-07-30 — decided: a page per fundamental)
- [x] **Magic overview** — done (`src/docs/magic.md`, the section landing page): the GM's setting dials (common/powerful/prominent → the magic axis), gather-then-weave (Mana + Incantation; complexity vs energy; ritual/snap-cast), effects composed from fundamentals, and the five balance keystones. Grounded in HindSight/2004 + the design-doc lenses.
- [ ] **A page per fundamental** (23: Fire, Form, Essence, …) — each = its Basic/Advanced description (range/duration/props from `magic-fundamentals.json` + `magic-applications.json`) + an **entity-view of its own applications** (by intensity). Ground the descriptions in `legacy/foresight2004/magic/fundamentals/*.html` (43 files).
- [ ] **Entity-view for applications** — extend `entity-views.ts`/`entity-specs.ts` to slice `magic-applications.json` by fundamental (each fundamental's apps are a flat list, so no nested-grouping component needed). Then retire the 1307-line `magic-applications.md` mega-page.
- [ ] **Fundamentals index** — the Magic landing page's `<!-- toc -->` will list the 23 once they exist; optionally an entity-view of the fundamentals themselves (`magic-fundamentals.json`).

## Editorial / component follow-ups (2026-07-30)
- [ ] **Bullets → tables pass** — convert definitional `- **Term:** desc` lists (damage M/I/B, armor P/A, QR readings, stun states…) to 2-column tables where it reads better; leave prose-y bullets alone.
- [ ] **Grouped/spanning-header table** — the melee attack×defence grid wants "Defence →" / "Attack ↓" spanning headers markdown can't do. Plan: a raw-HTML `colspan` table for that grid now; file a tosijs-ui issue for reusable grouped headers rather than a bespoke component (worth it only once several tables need it).
- [ ] **tosijs-ui 1.8.0 is out** (we're pinned to `1.7.0-beta.5`). Do a *deliberate* upgrade and check whether it resolves the open UPSTREAM issues (#16 basePath, #17 out-of-book links, #24 order sort, #25 mount-agnostic URLs) + move the pin to `^1.8.0`. (Also: `node_modules` went missing on 2026-07-30 and bun auto-installed a stray 1.8.0 that couldn't find `marked`; `bun install` restored the pin — flag if it recurs.)

## Rules one-pagers still to draft
- [ ] NPCs (nouns + modifiers) · Interpersonal · Travel & wilderness · Religion · Mystic Disciplines (Ch'i)
- [ ] Equipment category lists (weapons/armor/vehicles/tools) with DC-calibrated stats
- [ ] Advancement / point-buy ("Tweaking") chapter; the experience-as-reassignment and fallow-points concepts
