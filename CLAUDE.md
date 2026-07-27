# CLAUDE.md

> **Shared engineering practices** live at
> **https://github.com/tonioloewald/tosijs-coding-practices** — and, when checked out beside
> this repo, at [`../tosijs-coding-practices`](../tosijs-coding-practices/README.md). Read that
> index first for the cross-project defaults (development, testing, code quality, performance,
> review, releasing, deployment, and the **observant** tosijs/tjs stack). This file records only
> what is **specific to or divergent from** those defaults — when they conflict, this file wins.
>
> Those docs are **living, not graven in stone.** Don't rewrite them unprompted, but do speak up:
> voice concerns, flag inconsistencies, and suggest improvements as you work. Continuous
> improvement is the goal — see the repo's `CONTRIBUTING.md`.
>
> **This repo is mostly a *book*, not a library** — the deliverable is rules prose, a data layer,
> and a static site/ePub. So the practices bite unevenly: `cross-project.md` (this project
> consumes tosijs-ui and files issues against it — see `UPSTREAM.md`), `code-quality.md` and
> `web-components.md` (`bundle.ts`, `src/character-sheet.ts`, `entity-views.ts`) apply directly.
> `testing.md` / `releasing.md` largely don't — there is no test runner and nothing is published
> to npm; the build + a look at the dev site is the gate. Don't import ceremony this repo has no
> use for; do import the reasoning.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**ForeSight 2026.** Context for any AI agent (Claude Code, Cowork, etc.) continuing this project. Read this first, then `Design Document.md` (the design bible) and `REVIEW.md` (the running to-fix list).

**Talking to other repos:** file a GitHub issue on the target repo — never edit it from here — and mirror it in `UPSTREAM.md` with the issue URL. See `cross-project.md`.

## What this is

A streamlined, modern edition of **ForeSight**, a general-purpose tabletop RPG by Tonio Loewald (1st ed. 1986, ISBN 0958789401). Goal: one resolution rule, rules you can run from memory, a character buildable in minutes.

### Source hierarchy (which edition wins)

1. **2004 2nd-edition draft — the base text.** Extensively edited, modernized, and proofread. The rules derive from it: text, structure, terminology.
2. **2026 simplifications override it** where already decided — power pools/fatigue as exhaustion levels, familiarities cut to examples, generalized combat, 9→7 attributes. See Design Document → "Decided simplifications".
3. **1986 original = a content quarry**, not a rules source. Mine it for material 2004 dropped, and for tone — but assume anything taken from it **needs revision and updating**.
4. **2015 "ForePlay"** contributes the combat/initiative sequence only. Its dice and four-attribute model are a blind alley.

> **The caveat that matters:** 2004 has editorial quality but **zero table evidence** — it was never playtested. 1986 shipped and got played. So "2004 is the base text" must not quietly become "2004's numbers win": where the two disagree on a **number or a probability**, that's an untested 2004 intention meeting 1986's empirical weight. Flag it as a REVIEW.md calibration item rather than defaulting. Prose and structure: 2004, no argument.

Legacy source PDFs/HTML live in `legacy/` and `Abortive Previous Attempt/` (gitignored — large, copyrighted). The 2004 magic rules HTML under `legacy/foresight2004/magic/fundamentals/` is the source for the magic catalog.

## How to work on it

- **Author content** in `src/` and `static/` (NOT in `docs/`, which is generated — every file under it is build output).
- **Build:** `bun run build` (= `bun build.ts`) → generates `docs/` (the static site Pages serves) **and** `docs/foresight-2026.epub`. Bun-only (the doc-system uses `Bun.build`/`Bun.write`/`$`). The ePub step needs `happy-dom` (a devDep) and the `zip` CLI (present on macOS).
- **Dev:** `bun run tls` once (needs `mkcert`), then `bun run dev` → live-rebuild HTTPS server at `https://localhost:1986/` (watches `README.md`, `src/`, `static/`). Since the domain cutover, both dev and production serve at **root** (`basePath: '/'`), so `dev`'s `BASE_PATH=` is now vestigial.
- **Deploy:** `bun run build` then commit `docs/` and push. GitHub Pages serves from `/docs` at the custom domain **foresight-rpg.com** (apex A/AAAA to GitHub + `www` CNAME → `tonioloewald.github.io`; `static/CNAME` carries the domain through the build's `rm -rf docs`). Repo: `github.com/tonioloewald/foresight-rpg`.
- First time / after pulling: `rm -rf docs && bun install`.
- **No tests, linter, or formatter are configured** (`package.json` has only `build`/`dev`/`tls` scripts). Don't hunt for a test runner — validate changes by building and loading the dev site. The build also emits a `demo/` dir (created by `build.ts`/`dev.ts`).

### Important environment caveat (Cowork sandbox only)
The Cowork sandbox mounts the repo on a filesystem that **denies `unlink`**, so `git` and the build's `rm -rf docs` both FAIL there. In the sandbox: build in `/tmp` (copy source there, `npx bun build.ts`) and never run `git` (it leaves stale `.git/*.lock` files). On a normal machine (Tonio's Mac) everything works normally. Do not run `git` from the sandbox.

## Architecture (see Design Document.md → "Delivery, hosting & persistence")

**One source (`src/` + `static/`) must produce two outputs: a live interactive site AND a distributable book (ePub/PDF).** That constraint drives most of what follows.

- **`site.config.ts`** is the single knob for the whole build: `docPaths` (`src`, `README.md`), `sectionsDir` (`src/docs`), `staticDirs` (`static`), `bundleEntry` (`bundle.ts`), `outputDir` (`docs`), `basePath`, `epub`, dev `port`/`watchPaths`. Change the site's shape here, not in `build.ts` (which is four lines: `buildSite(config)`).
- **Single source of truth = JSON** in `static/data/` (`skills`, `background-factors`, `fields`, `magic-fundamentals`, `magic-applications`). Consumed by both the rules pages and the character sheet. Build copies it to `docs/data/`.
- **Doc site** = tosijs-ui doc-system (`tosijs-ui/site`). Markdown one-pagers in `src/rules/*.md`, each with a metadata block **after its H1**: `<!--{ "parent": "<section>", "order": N }-->`. **`order` must be a whole number** — the doc-system sorts by `String(order).padStart(4,'0')` lexically, so a fractional order like `1.5` becomes `"01.5"` and sorts *after* `"0002"`… i.e. it silently lands at the end of the section (filed as tosijs-ui#24). To insert between neighbours, renumber with integers, don't use a fraction. (`character-builder.md` still carries a stale `3.5` and thus mis-sorts to the end of `core` — see REVIEW.) Section "parent" pages in `src/docs/{core,conflict,world,magic,reference}.md`; their `<!-- toc -->` blocks are auto-regenerated by the build. `README.md` is the home page (`"pin":"top"`).
- **`bundle.ts`** (the `bundleEntry`) imports `tosijs-ui`, imports `./src/character-sheet`, and defines `<foresight-table>`. Both it and `character-sheet.ts` resolve `data/*.json` against **`SITE_ROOT` from `src/site-root.ts`**, so paths survive any `basePath` (project page, custom domain, local dev) — **use that import when adding fetches; do not reintroduce `document.currentScript.src`.** (It was that once; the doc-system's 1.7.0 move to `<script type="module">` made `currentScript` null in the loaded code, and `import.meta.url` can't be used because the entry is *also* built as a classic `iife.js` where `import.meta` is a parse error. `site-root.ts` sniffs the doc-system's own bootstrap script / stylesheet URL, which works in both. Tracked upstream as tosijs-ui#16 — replace the sniff with the runtime basePath helper if one lands.)
- **Entity views — the static substrate.** The book ships **zero JS** (no `iife.js`, no `<script>` in any chapter), so a custom element renders as an empty shell there. Therefore: `entity-views.ts` runs from `site.config`'s **`prebuild`** (which the orchestrator calls *before* doc extraction) and renders `static/data/*.json` into a limited-column `<table>` + per-item detail cards, written into the `<!-- entity-view: X.json -->` / `<!-- /entity-view -->` block in the page (same idiom as the doc-system's own `<!-- toc -->`). `<foresight-table>` then **enhances** that substrate in the browser (summary/cards toggle, text + tag filter) and restores it if the fetch fails. `src/entity-specs.ts` holds the summary/card projection and is imported by **both** sides so they can't drift.
  - **Author flow:** add a spec to `src/entity-specs.ts`, drop an `<!-- entity-view: X.json -->` marker in the page, build. Never hand-edit inside the block — it's regenerated.
  - **Never let the book depend on a custom element.** If you add one to a rules page, give it a static substrate or exclude the page from `book`.
- **Character editor** = `src/character-sheet.ts` (~500 lines), a Shadow-DOM `<foresight-character-sheet>` element registered via `bundle.ts` and embedded in `src/rules/character-builder.md`. Rule-enforcing; localStorage (key `foresight_characters_v2`) + JSON export; loads skills/BFs from `data/`. Shadow DOM is deliberate — its generic CSS (`body`/`h1`/`table`) would otherwise collide with the doc-system theme. (It was ported from a standalone `static/character.html`, now gone; ignore older references to that file.) Next: Tonio's forthcoming **Firestore backend** (fine-grained security) so players save characters online and GMs host campaigns with custom rulesets.
- **Custom elements are inert in the ePub/PDF.** Anything rendered by JS is blank in the book, so every custom element needs real fallback content between its tags (see `character-builder.md`, which falls back to a link to the printable sheet). The planned fix for data tables is build-time static HTML: a limited-column `<table>` whose rows link to per-item detail cards, which the web build then enhances with sort/filter/tag toggles.
- **PDF = a print button, not Playwright.** `tosijs-ui/site` exports `buildPdf`, but it needs Chromium; the chosen path is print-optimized book HTML with a "Save as PDF" button. Don't add a headless-browser dependency.
- **Future:** all major entity collections become Firestore-backed (author fixes propagate; GMs add content). Data model = base (author) → GM/community custom → per-campaign overrides. So keep data **mergeable/overridable** and each character a **self-contained record**. Keep every entity JSON shaped with a summary projection (table) AND a detail body (card).

### Gotchas
- A `navbarLinks` entry **must** have an `icon` — without one the doc-system emits `class=""` and tosijs-ui's element builder throws on the empty class token, crashing the page render.
- **A custom element at the start of a Markdown line gets wrapped in a `<p>`.** marked only treats *known* block-level tags as raw HTML, so `<foresight-table>` is parsed as inline — and because a `<div>` may not sit inside a `<p>`, the browser then hoists the element's whole static substrate *out* of it, leaving it empty. This fails **silently** (the page looks fine; the element is just hollow). Always open a generated block with a real `<div>`, and keep **no blank line** inside it (a blank line ends the raw-HTML block and drops back to markdown).
- **`prebuild` writes into `src/`, which the dev server watches**, so a `bun run build` while `bun run dev` is up makes the two fight: the dev server holds the `entity-views` module it loaded *at startup* and will regenerate the block with stale code, silently reverting your edit. Restart the dev server after touching `entity-views.ts` / `entity-specs.ts`. (The generator only writes when bytes actually change, so it doesn't loop.)
- **`bun run dev` does not do an initial build** — it serves `docs/`, so run a build first. (Historical: production `basePath` used to be `/foresight-2026`, differing from dev's root, so a `bun run build` output would 404 its own assets on the dev server. Since the cutover, production `basePath` is `/` too, so `bun run build` and `BASE_PATH= bun build.ts` now produce identical root-based output and that mismatch is gone.)
- The ePub currently ships **coverless**: the build prints `epub: no cover generated — @resvg/resvg-js is unavailable`. Fix by `bun add -d @resvg/resvg-js` (renders one from the title) or by setting `epub.cover` to an image. Harmless for now, but a real book needs a cover.
- `outputDir` (`docs`) must not overlap `docPaths`/`staticDirs` — `buildSite()` `rm -rf`s the output dir first, so an overlap deletes your source. There's an output-guard in tosijs-ui that catches this.

## The system in brief (full detail in Design Document.md)

- **One Rule:** Success Chance = **Score × Ease Factor**; roll D100 ≤ SC. EF ladder 0,¼,½,1,2…15. A +1 EF ≈ +your Score in the sweet spot (so modifiers stay small). **Sacred — do not replace** (a clever-dice replacement was tried and failed).
- **Quality Ratings:** roll vs SC/10, SC/4, SC/2, SC = QR1–4; over = QR7 (fail), over+multiple-of-10 = QR10 (botch); natural 100 never better than QR7, natural 99 never better than QR4. Yield 100/80/50/25%. Read ONE column per task (fast OR good OR much). PM = 4−QR. Never penalize the same choice twice.
- **7 attributes:** ST EN CO IN PC WP AP (DX+AG→Coordination; EM folded into PC; AP kept). Cost more past 12.
- **Skills:** Score = formula (avg of attributes, or ½-avg) + level. Cost 1–2 (powersets dearer). Limit = max level multiplier (1, or 1.5 for ½ skills) → max level = best attribute × limit. Pain Resistance & Stamina are NOT skills (roll EN or WP / EN). Social = Charm + Confidence only.
- **Combat:** awareness sets Initiative; declare best→worst, act-or-wait (waiting persists → ambush is deadly); pre-empt = Coordination roll modified by Initiative QR (you never *know* you'll act first). Primary + secondary action; reactions stack −2. Turn length elastic.
- **Damage:** Damage = Yield × DC/2 (÷ Damage Scale). DC anchors: inhuman fist 4, 9mm pistol 8, 7.62 rifle 11. Types M/I/B; weapon P pierces armor, armor A absorbs.
- **Wounds & exhaustion:** wound level 0→8, −(level) to everything. Fatigue & power pools are wound-style **exhaustion levels** (full to own domain, ½ to others, stack). Pain Resistance roll (EN/WP) → shrug / Shaken / Stunned. Recovery: convalescence rolls (wounds) / rest, deepest-level-first (exhaustion).
- **Points economy:** attributes 10/pt to 12 then 20; skills cost×(L+2); fields 4/yr. Background factors cost **one BF slot or nothing** (only neutral species free); some grant build points.
- **Background factors:** ordered, categorized (Species/Origin/General/Unusual/Intrinsic), one-species/one-origin exclusivity; confer skills/fields/attrs (conferred levels free) + optional points.
- **Fields of Knowledge:** a **hierarchy** (First Aid 1yr → Medicine 3 → Surgery 4; Science → Physics → …). years = depth = cost (×4/yr); a deeper field implies its ancestors. Load-bearing for magic.
- **Magic:** two skills — **Mana** (gather/power-pool) + **Incantation** (cast); ritual/snap-cast are time/EF trade-offs. **Fundamentals** (23, e.g. Fire, Form, Essence) are fields split **Basic** (≤ complexity 1) / **Advanced**. Magic is **generative** (effects compose) and must be designed with care. Balance keystone: **conscious targets intrinsically resist direct magical effects** when unwilling/unaware; **coercion never cheaper than consent**; **bestowal gated per-effect** (controlled vs bestowed vs fixed vs immediate); **benchmark vs the mundane** (combat: a good archer; social: judge by what the world becomes if the effect is reliable — a reliable truth detector is transformative); **price the capability, not its costume**.

## Tags

Every data entity carries `tags` from `{standard, ancient, modern, sf, fantasy}`. The character sheet's tag toggles show/hide content by setting; magic is tagged `fantasy`. Used to keep e.g. SF clutter off a fantasy sheet.

## Status / what's next (see REVIEW.md for the live list)

Done: all rules one-pagers drafted and migrated into the doc-system with sections; full data layer (skills/BFs/fields/magic) as tagged JSON; the **232-application magic catalog** named + formatted; the doc-system site + live `foresight-table` + dev server; the character sheet componentized into `<foresight-character-sheet>` and embedded in a rules page; **ePub emitted on every build**; Sense §16A3/§16A5 recovered.
Open (high level): static/build-time rendering for `foresight-table` (so tables survive the book) + card/detail views + tag filter; swap remaining static Markdown tables over to it; **draft the Magic one-pager** (plus NPCs, Interpersonal, Travel, Religion, Ch'i, equipment lists, Advancement); the print-to-PDF button; move the sheet from localStorage to Firestore; fix duplicate magic codes (Summon §20A4, Time §23A6) and the OCR-mangled scaling formulas; playtest-calibrate the point economy.

## Conventions / preferences

- Tonio prefers concise, direct responses; challenge assumptions; ask follow-ups when genuinely blocked.
- Design rationale matters — capture *why*, not just *what* (that's what `Design Document.md` is for).
- When in doubt on balance, apply the magic balance lenses above and the first principles: **simple mechanics, right-direction/right-magnitude probabilities, and transparency** (the setting seen through the rules is just the setting; never hidden world-shaping).
