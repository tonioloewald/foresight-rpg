// Build-time entity views — runs from site.config's `prebuild`, i.e. BEFORE the
// doc-system extracts docs, so whatever it writes into src/rules/*.md is picked
// up as ordinary markup and lands in the site AND the ePub.
//
// WHY this exists: custom elements are inert in a book. The ePub ships zero JS
// (no iife.js, no <script>), so a page that is nothing but <foresight-table>
// renders as an empty shell — the skill list was simply missing from the book.
// So the STATIC table + cards are the substrate, and <foresight-table> enhances
// them in the browser (see bundle.ts). The book never depends on the component.
//
// Idiom: mirrors the doc-system's own `<!-- toc -->` / `<!-- /toc -->` blocks —
// the author owns the prose and the marker, the build owns what's between.
//
//   <!-- entity-view: skills.json -->
//   ...generated...
//   <!-- /entity-view -->

import { readFileSync, writeFileSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { ENTITY_SPECS, MATRIX_SPECS, APP_SPEC, EQUIPMENT_COLLECTIONS, fmt, slug, type EntitySpec, type MatrixSpec } from './src/entity-specs'

const RULES_DIR = 'src/rules'
const DATA_DIR = 'static/data'

const esc = (s: unknown) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Light inline markdown for data fields (magic app descriptions carry **bold** /
// *italic*): escape HTML first, then unescape just those two so the source can't
// inject tags. No block-level anything.
const mdInline = (s: unknown) =>
  esc(s)
    .replace(/\s+/g, ' ') // collapse newlines — a raw-HTML block must have no blank line
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')

// Styling for both outputs. Theme-agnostic (rgba borders, `color: inherit`) so
// it sits correctly on the doc-system's light/dark themes AND on an e-reader's
// own palette. Deliberately conservative: no grid/`display:contents` in the card
// fields, because e-reader engines are old — dt/dd inline with a forced break
// works everywhere and degrades to plain stacked text.
const STYLE = `<style>
.ev-table{width:100%;border-collapse:collapse;margin:0 0 1.5em;font-size:.92em}
.ev-table th,.ev-table td{border:1px solid rgba(128,128,128,.3);padding:.35em .5em;text-align:left;vertical-align:top}
.ev-table th{font-size:.78em;text-transform:uppercase;letter-spacing:.06em}
.ev-cards{display:grid;gap:1em;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}
.ev-card{border:1px solid rgba(128,128,128,.3);border-radius:8px;padding:.75em 1em;break-inside:avoid;page-break-inside:avoid}
.ev-card h3{margin:0 0 .4em}
.ev-img{display:block;max-width:100%;height:auto;border-radius:6px;margin:0 0 .5em}
.ev-fields{margin:0 0 .6em}
.ev-fields dt{display:inline;font-size:.78em;text-transform:uppercase;letter-spacing:.06em;opacity:.65}
.ev-fields dt::after{content:": "}
.ev-fields dd{display:inline;margin:0}
.ev-fields dd::after{content:"";display:block}
.ev-body{margin:0}
.ev-bar{display:flex;gap:.5em;align-items:center;flex-wrap:wrap;margin:0 0 .75em}
.ev-toggle,.ev-chip{border:1px solid rgba(128,128,128,.4);background:transparent;color:inherit;border-radius:999px;padding:.2em .7em;cursor:pointer;font:inherit;font-size:.85em}
.ev-toggle[aria-pressed="true"],.ev-chip[aria-pressed="true"]{background:rgba(128,128,128,.25);font-weight:600}
.ev-search{flex:1;min-width:8em;font:inherit;padding:.25em .5em;border:1px solid rgba(128,128,128,.4);border-radius:6px;background:transparent;color:inherit}
.ev-empty{opacity:.7;font-style:italic}
.ev-count{font-size:.85em;opacity:.65;white-space:nowrap}
</style>`

// Matrix styling — a cross-tab with a spanning header over each axis. The
// row-axis label reads vertically (writing-mode), which every EPUB3 reader
// supports and which degrades to horizontal in an ancient one.
const MATRIX_STYLE = `<style>
.mx-table{border-collapse:collapse;margin:0 0 1em;font-size:.9em}
.mx-table th,.mx-table td{border:1px solid rgba(128,128,128,.35);padding:.32em .6em;text-align:center;vertical-align:middle}
.mx-corner{border:0;background:transparent}
/* Header cells live in <thead>, which the doc-system theme paints
   background:var(--brand-color) + color:var(--brand-text-color). Overriding only
   the background there left brand-white text on light grey — so these keep the
   theme's own background/text PAIR and just restyle the type. (color:inherit
   doesn't help: it inherits that same brand text colour from <thead>.) */
.mx-colaxis,.mx-colhead{background:var(--brand-color,transparent);color:var(--brand-text-color,inherit)}
.mx-colaxis{font-size:.72em;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.mx-colhead{font-weight:600;font-size:.85em}
/* Row headers are in <tbody> — no brand paint there, so a subtle tint + the body
   text colour is correct and readable in light and dark themes. */
.mx-rowaxis{font-size:.72em;text-transform:uppercase;letter-spacing:.08em;font-weight:600;background:rgba(128,128,128,.14);color:var(--tosi-text,inherit);writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;width:1.7em}
.mx-rowhead{font-weight:600;background:rgba(128,128,128,.06);font-size:.85em;color:var(--tosi-text,inherit)}
.mx-blocked{opacity:.45;font-style:italic}
</style>`

/**
 * A cross-tab table with a spanning header over each axis — the thing markdown
 * can't do. One line, no blank line inside (same marked constraint as below).
 */
function renderMatrix(spec: MatrixSpec): string {
  const colHead = spec.cols.map((c) => `<th class="mx-colhead">${esc(c)}</th>`).join('')
  const body = spec.rows
    .map((r, i) => {
      const axis =
        i === 0 ? `<th class="mx-rowaxis" rowspan="${spec.rows.length}">${esc(spec.rowAxis)}</th>` : ''
      const cells = r.cells
        .map((c) => `<td${spec.muted?.includes(c) ? ' class="mx-blocked"' : ''}>${esc(c)}</td>`)
        .join('')
      return `<tr>${axis}<th class="mx-rowhead">${esc(r.head)}</th>${cells}</tr>`
    })
    .join('')
  return (
    `<div class="matrix">` +
    MATRIX_STYLE +
    `<table class="mx-table"><thead>` +
    `<tr><td class="mx-corner" colspan="2" rowspan="2"></td><th class="mx-colaxis" colspan="${spec.cols.length}">${esc(spec.colAxis)}</th></tr>` +
    `<tr>${colHead}</tr>` +
    `</thead><tbody>${body}</tbody></table>` +
    `</div>`
  )
}

/**
 * The static substrate: a limited-column table whose every row links down to
 * that item's detail card, then the cards themselves.
 *
 * Emitted as ONE line — a blank line inside a raw-HTML block makes marked drop
 * back into markdown mode and mangle the rest of the block.
 */
function renderStatic(spec: EntitySpec, rows: any[]): string {
  const head = spec.columns
    .map((c) => `<th${c.align ? ` align="${c.align}"` : ''}>${esc(c.name)}</th>`)
    .join('')

  const body = rows
    .map((row) => {
      const id = `${spec.idPrefix}-${slug(row.name)}`
      const cells = spec.columns
        .map((c, i) => {
          const text = fmt(row[c.prop])
          // first column is the handle: link it to the card
          const inner = i === 0 ? `<a href="#${id}">${esc(text)}</a>` : esc(text)
          return `<td${c.align ? ` align="${c.align}"` : ''}>${inner}</td>`
        })
        .join('')
      return `<tr>${cells}</tr>`
    })
    .join('')

  const cards = rows
    .map((row) => {
      const id = `${spec.idPrefix}-${slug(row.name)}`
      const defs = spec.card
        .map((f) => `<dt>${esc(f.label)}</dt><dd>${esc(fmt(row[f.prop]))}</dd>`)
        .join('')
      const prose = spec.body && row[spec.body]
        ? `<p class="ev-body">${spec.bodyMarkdown ? mdInline(row[spec.body]) : esc(row[spec.body])}</p>`
        : ''
      // Optional per-item illustration (any entity may carry an `image` path,
      // root-relative, e.g. "images/weapons/pistol.png"). Absent on most items.
      const img = row.image ? `<img class="ev-img" src="/${esc(row.image)}" alt="${esc(row.name)}" loading="lazy"/>` : ''
      return `<section class="ev-card" id="${id}">${img}<h3>${esc(row.name)}</h3><dl class="ev-fields">${defs}</dl>${prose}</section>`
    })
    .join('')

  return (
    `<div class="ev-static">` +
    `<table class="ev-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>` +
    `<div class="ev-cards">${cards}</div>` +
    `</div>`
  )
}

/**
 * A single Fundamental's applications, sliced from the nested magic-applications.json
 * and rendered as the static table + cards (sorted by intensity). Static-only.
 */
function renderMagicApps(fundamental: string, path: string): string {
  const groups = JSON.parse(readFileSync(join(DATA_DIR, 'magic-applications.json'), 'utf8')) as any[]
  const g = groups.find((x) => x.fundamental === fundamental)
  if (!g) throw new Error(`magic-apps: no fundamental "${fundamental}" in magic-applications.json (${path})`)
  const rows = (g.applications ?? [])
    .slice()
    .sort((a: any, b: any) => a.intensity - b.intensity || String(a.code).localeCompare(String(b.code)))
  return `<div class="entity-view">\n${STYLE}\n${renderStatic(APP_SPEC, rows)}\n</div>`
}

/**
 * A single flat, searchable table of EVERY application across all fundamentals —
 * for finding an effect you know exists but not which Fundamental holds it. No
 * cards; the Application name links to its detail card on the fundamental's page,
 * and a hidden `data-search` (name + fundamental + description) lets the browser
 * filter match on the description too. `<foresight-table filter>` adds the search
 * box in the browser; the static table is the book/no-JS fallback (a plain index).
 */
function renderAllApplications(): string {
  const groups = JSON.parse(readFileSync(join(DATA_DIR, 'magic-applications.json'), 'utf8')) as any[]
  const rows = groups
    .flatMap((g) => (g.applications ?? []).map((a: any) => ({ ...a, fundamental: g.fundamental })))
    .sort((a, b) => String(a.name).localeCompare(String(b.name)))
  const plain = (s: unknown) => String(s ?? '').replace(/\*+([^*]+)\*+/g, '$1')
  const body = rows
    .map((r) => {
      const href = `/magic-${slug(r.fundamental)}/#app-${slug(r.name)}`
      const search = esc(`${r.name} ${r.fundamental} ${plain(r.desc)}`.replace(/\s+/g, ' ').toLowerCase())
      return (
        `<tr data-search="${search}">` +
        `<td><a href="${href}">${esc(r.name)}</a></td>` +
        `<td><a href="/magic-${slug(r.fundamental)}/">${esc(r.fundamental)}</a></td>` +
        `<td align="center">${esc(r.intensity)}</td>` +
        `<td align="center">${esc(r.code)}</td></tr>`
      )
    })
    .join('')
  const table =
    `<table class="ev-table"><thead><tr><th>Application</th><th>Fundamental</th>` +
    `<th align="center">Int</th><th align="center">§</th></tr></thead><tbody>${body}</tbody></table>`
  return (
    `<div class="entity-view">\n${STYLE}\n` +
    `<foresight-table filter placeholder="Search all ${rows.length} applications…">${table}</foresight-table>\n</div>`
  )
}

/**
 * A single flat, searchable table of EVERY equipment item across all categories
 * (weapons, armor, vehicles, spacecraft, gear) — the "Find Equipment" index, the
 * exact analogue of renderAllApplications(). No cards; the item name links to its
 * detail card on the category page, a Category column links to that page, and a
 * hidden `data-search` (name + category + description) lets the browser filter
 * match on the description too. Book/no-JS fallback is the plain sorted index.
 */
function renderAllEquipment(): string {
  const plain = (s: unknown) => String(s ?? '').replace(/\*+([^*]+)\*+/g, '$1')
  const rows = EQUIPMENT_COLLECTIONS.flatMap((c) => {
    const items = JSON.parse(readFileSync(join(DATA_DIR, c.file), 'utf8')) as any[]
    return items.map((it) => ({ ...it, _category: c.category, _page: c.page }))
  }).sort((a, b) => String(a.name).localeCompare(String(b.name)))

  const idPrefixOf = (page: string) =>
    Object.values(ENTITY_SPECS).find((s) => EQUIPMENT_COLLECTIONS.some((c) => c.page === page && c.file === s.file))?.idPrefix ?? page

  const body = rows
    .map((r) => {
      const href = `/${r._page}/#${idPrefixOf(r._page)}-${slug(r.name)}`
      const search = esc(`${r.name} ${r._category} ${plain(r.desc)}`.replace(/\s+/g, ' ').toLowerCase())
      return (
        `<tr data-search="${search}">` +
        `<td><a href="${href}">${esc(r.name)}</a></td>` +
        `<td><a href="/${r._page}/">${esc(r._category)}</a></td>` +
        `<td align="center">${esc(fmt(r.tl))}</td>` +
        `<td align="center">${esc(fmt(r.price))}</td></tr>`
      )
    })
    .join('')
  const table =
    `<table class="ev-table"><thead><tr><th>Item</th><th>Category</th>` +
    `<th align="center">TL</th><th align="center">Price</th></tr></thead><tbody>${body}</tbody></table>`
  return (
    `<div class="entity-view">\n${STYLE}\n` +
    `<foresight-table filter placeholder="Search all ${rows.length} items…">${table}</foresight-table>\n</div>`
  )
}

/** Rewrite every build-time table block (`entity-view`, `matrix`, `magic-apps`, `all-applications`, `all-equipment`) in the rules pages. */
export function renderEntityViews(): void {
  const files = readdirSync(RULES_DIR).filter((f) => f.endsWith('.md'))
  let ev = 0
  let mx = 0
  let ma = 0
  let aa = 0
  let ae = 0

  for (const file of files) {
    const path = join(RULES_DIR, file)
    const orig = readFileSync(path, 'utf8')
    let out = orig

    // <!-- entity-view: X.json --> — a data collection as a table + detail cards.
    if (out.includes('<!-- entity-view:')) {
      out = out.replace(
        /(<!-- entity-view: *([\w.-]+) *-->)[\s\S]*?(<!-- \/entity-view -->)/g,
        (_all, open, dataFile, close) => {
          const spec = ENTITY_SPECS[dataFile]
          if (!spec) throw new Error(`entity-view: no spec for "${dataFile}" (${path}). Add one to src/entity-specs.ts.`)
          const rows = JSON.parse(readFileSync(join(DATA_DIR, dataFile), 'utf8'))
          if (!Array.isArray(rows)) throw new Error(`entity-view: ${dataFile} is not an array of entities`)
          ev++
          const columns = esc(JSON.stringify(spec.columns))
          // <style> sits OUTSIDE the element: <foresight-table> replaces its own
          // children when it enhances, which would take the stylesheet with it.
          const element =
            `<foresight-table src="${esc(spec.file)}" columns="${columns}">` +
            renderStatic(spec, rows) +
            `</foresight-table>`
          // The wrapping <div> is load-bearing. marked only treats KNOWN block-level
          // tags as raw HTML; a line starting with a custom element is "inline", so
          // it gets wrapped in a <p> — and since a <div> may not live inside a <p>,
          // the parser then hoists the whole static substrate OUT of the element,
          // leaving it empty. Opening with <div> keeps the block raw. (The block must
          // also contain NO blank line, which would end it and drop back to markdown.)
          return `${open}\n<div class="entity-view">\n${STYLE}\n${element}\n</div>\n${close}`
        }
      )
    }

    // <!-- matrix: name --> — a cross-tab with spanning axis headers.
    if (out.includes('<!-- matrix:')) {
      out = out.replace(
        /(<!-- matrix: *([\w-]+) *-->)[\s\S]*?(<!-- \/matrix -->)/g,
        (_all, open, name, close) => {
          const spec = MATRIX_SPECS[name]
          if (!spec) throw new Error(`matrix: no spec for "${name}" (${path}). Add one to src/entity-specs.ts.`)
          mx++
          return `${open}\n${renderMatrix(spec)}\n${close}`
        }
      )
    }

    // <!-- magic-apps: Fundamental --> — that fundamental's applications, by intensity.
    if (out.includes('<!-- magic-apps:')) {
      out = out.replace(
        /(<!-- magic-apps: *([^>]+?) *-->)[\s\S]*?(<!-- \/magic-apps -->)/g,
        (_all, open, fundamental, close) => {
          ma++
          return `${open}\n${renderMagicApps(fundamental, path)}\n${close}`
        }
      )
    }

    // <!-- all-applications --> — the flat, searchable index of every application.
    if (out.includes('<!-- all-applications')) {
      out = out.replace(
        /(<!-- all-applications *-->)[\s\S]*?(<!-- \/all-applications -->)/g,
        (_all, open, close) => {
          aa++
          return `${open}\n${renderAllApplications()}\n${close}`
        }
      )
    }

    // <!-- all-equipment --> — the flat, searchable index of every equipment item.
    if (out.includes('<!-- all-equipment')) {
      out = out.replace(
        /(<!-- all-equipment *-->)[\s\S]*?(<!-- \/all-equipment -->)/g,
        (_all, open, close) => {
          ae++
          return `${open}\n${renderAllEquipment()}\n${close}`
        }
      )
    }

    if (out !== orig) writeFileSync(path, out)
  }
  console.log(`entity-views: rendered ${ev} entity-view + ${mx} matrix + ${ma} magic-apps + ${aa} all-applications + ${ae} all-equipment block(s)`)
}
