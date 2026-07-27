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

> **When #17 lands and we consume it:** set `epub: { …, baseUrl: 'https://foresight-rpg.com' }` in
> `site.config.ts` (leaving the site's own `baseUrl`/`basePath` on github.io untouched, so the live
> site's canonicals stay correct). The 2 links then point at `foresight-rpg.com/character-builder/`
> and go live when the DNS does. Verify: unzip the ePub, `grep -oh 'href="[^"]*character-builder[^"]*"' OEBPS/*.xhtml`
> should show the absolute URL, not `/character-builder/`.

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
