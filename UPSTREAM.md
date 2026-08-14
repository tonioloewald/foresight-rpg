# Upstream — issues raised against other repos

A local mirror of what this project has raised upstream, so the context stays where we're
working. **This file is not a channel** — the upstream repo never sees it. Every entry must
have a filed issue behind it, or it's a complaint nobody will read.

See [`../tosijs-coding-practices/practices/cross-project.md`](../tosijs-coding-practices/practices/cross-project.md).
When one lands: mark `✅ RESOLVED (fixed in <pkg>@<version>)` here **and close the issue**.

---

## ✅ RESOLVED — tosijs-ui: ePub internal cross-links are dead

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/15 (closed)
**Raised:** 2026-07-17, against tosijs-ui 1.6.23
**Fixed in:** tosijs-ui **1.7.0-beta.5** — `buildEpub` gained a `rewriteInBookLinks` pass.
**Consumed:** on `tosijs-ui@1.7.0-beta.5`. Verified against our book: **21 dead `/slug/` links → 2**,
and both residuals are `/character-builder/` — the one page we deliberately exclude from the book
(the fix leaves out-of-book links untouched, by design). All 25 in-book chapter cross-links resolve.

> Pinned to the exact beta (`1.7.0-beta.5`) since caret ranges on prereleases misbehave. **When
> stable 1.7.0 ships:** move to `^1.7.0`. Residual decision for the 2 out-of-book links: either drop
> them from `README.md` / the core-section text, or accept them (the character builder is web-only).

## ⚠️ OPEN — tosijs-ui: out-of-book ePub links are dead (want: point them at the live site)

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/17 (Tonio implements — do not edit tosijs-ui from here)
**Raised:** 2026-07-18, against tosijs-ui 1.7.0-beta.5. Follow-up to #15.

The 2 residual `/character-builder/` links (home page + auto-generated core TOC) are dead in the
ePub because `character-builder.md` is `book.exclude`d and `rewriteInBookLinks` leaves out-of-book
links untouched. Proposed fix: a book base URL (`epub.baseUrl`, defaulting to `baseUrl`) and
absolutizing recognized-but-out-of-book paths to `bookBaseUrl + pathForSlug(slug)`. Issue #17 has
the full implementation sketch (exact lines, the test to update).

> **Simplified by the 2026-07-27 domain cutover:** the site's own `baseUrl` is now
> `https://foresight-rpg.com`, so when #17 lands the out-of-book links absolutize to it
> automatically — **no `epub.baseUrl` override needed** (the override plan assumed the site was
> still on github.io while the book targeted the domain; that's moot now). Just consume the fix and
> verify: unzip the ePub, `grep -oh 'href="[^"]*character-builder[^"]*"' OEBPS/*.xhtml` should show
> `https://foresight-rpg.com/character-builder/`, not a bare `/character-builder/`.

## ⚠️ OPEN — tosijs-ui: no runtime basePath for bundleEntry code

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/16
**Raised:** 2026-07-17, against tosijs-ui 1.7.0-beta.5 (surfaced consuming the fix above).

1.7.0 loads pages as `<script type="module">`, so `document.currentScript` is `null` in our bundled
code — the old `new URL('.', document.currentScript.src)` base-resolution silently broke, and
`data/*.json` fetched relative to the current *page* dir instead of the site root (404 in prod; a
misleading 200-HTML on the SPA-fallback dev server). `import.meta.url` is unusable because the entry
is *also* emitted as a classic `iife.js` where `import.meta` is a parse error the build rejects.

**Our fix (`src/site-root.ts`):** sniff the doc-system's own bootstrap script / stylesheet URL,
which works in both a module and the classic iife. Verified under the production basePath. It's
fragile — it hardcodes the doc-system's asset names (`hydrate.js`, `doc-system.css`).

> **When a runtime basePath helper lands upstream** (a global, `<html data-base-path>`, or an
> exported `siteRoot()`/`withBase()`), replace the DOM-sniffing in `src/site-root.ts` with it and
> drop the fragile filename coupling.

## ⚠️ OPEN — tosijs-ui: fractional `order` mis-sorts (nav sorts lexically)

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/24
**Raised:** 2026-07-24, against tosijs-ui 1.7.0-beta.5 (hit splitting a section page in two).

`navSortKey` builds the sort key as `String(order).padStart(4,'0')` and compares lexically, so a
fractional order like `1.5` → `"01.5"` sorts *after* `"0002"` — silently landing at the end of the
section instead of between `1` and `2`. Suggested a numeric multi-key comparator.

**Workaround:** integer `order` only; renumber the tail to insert between neighbours.

> **Local cleanup owed:** `character-builder.md` still has a stale `order: 3.5` and mis-sorts to
> the end of `core`. Fix to an integer when `core` is reorganized (see REVIEW — it's blocked on the
> `quality-ratings`/`open-ended-resolution` removal, which renumbers core anyway).

## ⚠️ OPEN — tosijs-ui: served site is mount-point-locked (basePath baked into URLs)

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/25 (related to #16 — same root cause)
**Raised:** 2026-07-27, against tosijs-ui 1.7.0-beta.5 (hit during the foresight-rpg.com cutover).

The build bakes `basePath` into every functional URL, so a build is locked to one mount point.
Setting the custom domain (serves at root) while `docs/` was built for `/foresight-2026` made every
asset 404 at the root — a blank, unstyled shell, with no warning, until we rebuilt at `basePath: '/'`.
Suggested: emit functional URLs **relative** (or resolve base at runtime), keep SEO metadata absolute.

**Workaround:** rebuild with the matching basePath at cutover; `static/CNAME` persists the domain
through `rm -rf docs`. Now moot for us (we're on the domain at root), but a future move would repeat it.

## ⚠️ OPEN — tosijs-ui: editable data-table + generalized source write-back

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/44 (Tonio implements — do not edit tosijs-ui from here)
**Raised:** 2026-08-02, against tosijs-ui 1.9.2.

Goal: surface data tables (equipment; the community 1986 restoration's pixel-art tables) and let
readers **crowd-source corrections** — edit cells, add/delete rows — persisting to the backing JSON
the way `<tosi-example>` edits persist to source markdown. From reading 1.9.2:
`tosi-table` has **no first-class editable mode** (editing only via a custom `dataCell` input that
mutates the array in place; no add/delete API, no change events, no validation — `src/data-table.ts`
`:793-805`, `:1173-1214`, `:622-669`), and the source write-back (`/__docstore/source`,
`editableSources`) is **dev-only and wired only to live examples** (`live-example/component.ts:916-999`,
`dev-server.ts:485-509,1168-1183`) — a static site returns 501/has no endpoint. Asked for (A) an
`editable` mode with add/delete + a `change` CustomEvent + optional `type`-driven validation, and
(B) a pluggable `onSave(payload)` seam so a published site can persist via a backend or an
export-and-PR flow rather than the dev endpoint.

**Blocks:** turning the 1986 restoration tables (and equipment) into reader-correctable data. Until
it lands, crowd-sourcing stays "file a GitHub issue/PR" (the current landing-page ask). The public
persistence path is a foresight-side decision anyway — Firestore backend (planned) vs edit→export→PR.

## ✅ RESOLVED — tosijs-ui: auto-surface download links for built ePub volumes

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/46 (Tonio implements — do not edit tosijs-ui from here)
**Raised:** 2026-08-02, against tosijs-ui 1.9.2.

The build produces ePub volume(s) (`epub.volumeTitles`) but surfaces **no download link
or nav entry** — a reader can't reach them, and the consumer must hard-code the derived
output filename (`book: "foresight-1986"` → `foresight-rpg-foresight-1986.epub`), which
rots on rename. We shipped a valid 1986 ePub that nobody could download until review caught
it. Asked for an auto download nav entry / a fillable `<!-- epub-downloads -->` marker / at
minimum a documented helper exposing each volume's title + URL.

**Fixed in:** tosijs-ui **1.9.3** — three ways to surface volumes: a `<!-- epub-downloads -->`
marker (fills with a link per volume), a `/epub-volumes.json` manifest, and `listEpubVolumes()`
from `tosijs-ui/site`. The ePub build now names its output through the same helper, so a link
can't point at a name nothing wrote.
**Consumed:** on `tosijs-ui@1.9.3`. The hand-written links on the home page and the 1986 landing
page were replaced with the marker; verified it's consumed (no leftover comment), both volumes
render with their real titles, and the manifest publishes. NB the marker is a **single** tag
replaced wholesale — not a paired block like `<!-- toc -->`.

## ⚠️ OPEN — haltija: embedding on an HTTPS dev server fails silently (docs)

**Issue:** https://github.com/tonioloewald/haltija/issues/33 (Tonio implements — do not edit haltija from here)
**Raised:** 2026-08-14, against haltija 1.12.2.

The canonical embed snippet is `http://localhost:8700/component.js`, which is **mixed content** on an
`https://` page and is blocked outright — no console pointer, no widget, `hj where` just says `0 tabs`.
Since the tosijs doc-system dev server is HTTPS by default, **the default project setup hits this first
try**. Asked for: a scheme-aware snippet as canonical; a note that `--both`/`--https` is required and the
cert is self-signed (needs one browser accept); a warning that **`--force` is required to change flags**
(a running server prints "already running" and *silently ignores* new flags); and clarification that port
**8701** is documented both as the default HTTPS port and as the desktop app's internal chrome port.

**Workaround (in `bundle.ts`):** derive the scheme from `location.protocol` — https pages use
`https://localhost:8701` + `wss://`, http pages keep 8700 — behind a hostname guard so it never loads in
production. Run the server with `bunx haltija --server --both --name foresight`.

## ⚠️ OPEN — tosijs-ui: no guidance for dev-only scripts on the HTTPS dev server

**Issue:** https://github.com/tonioloewald/tosijs-ui/issues/74 (Tonio implements — do not edit tosijs-ui from here)
**Raised:** 2026-08-14, against tosijs-ui 1.9.6. Companion to haltija#33.

`devServer` serves HTTPS by default, so any locally-served dev tool must be HTTPS too, and there's no
documented way to inject a **dev-only** script that stays out of the published `outputDir`. Asked for a
doc note on the blessed pattern, and floated a first-class `devScripts` hook in `defineSiteConfig`
(injected by `devServer`, omitted by `buildSite`) — safe by construction rather than by hostname check.

**Workaround:** hostname-guarded loader in `bundle.ts`. Works, but the dev-tool code does ship in the
production bundle and is merely disabled at runtime.
