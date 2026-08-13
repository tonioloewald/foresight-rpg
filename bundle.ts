import 'tosijs-ui'
import { tosiTable } from 'tosijs-ui'
import './src/character-sheet' // registers <foresight-character-sheet>
import { ENTITY_SPECS, fmt, slug, ALL_TAGS, type EntitySpec } from './src/entity-specs'
import { SITE_ROOT } from './src/site-root'

/**
 * <foresight-table src="skills.json" columns='[…]'>
 *   …static table + detail cards, generated at build time by entity-views.ts…
 * </foresight-table>
 *
 * The static content is the SUBSTRATE, not an afterthought: it is what the
 * ePub/print edition reads (a book runs no JS), and what stays on screen if the
 * fetch fails. In a browser this upgrades it to an interactive entity view —
 * summary or cards, with a text + tag filter.
 */
class ForesightTable extends HTMLElement {
  private _init = false
  private _rows: any[] = []
  private _view: 'summary' | 'cards' = 'summary'
  private _query = ''
  private _tags = new Set<string>()
  private _body: HTMLElement | null = null
  private _spec: EntitySpec | undefined

  async connectedCallback() {
    if (this._init) return
    this._init = true

    // `filter` mode: no data fetch, no cards — just add a free-text box that
    // hides non-matching rows of the static table (matching a hidden data-search).
    if (this.hasAttribute('filter')) return this.enhanceFilter()

    const file = this.getAttribute('src')
    if (!file) return // nothing to enhance — leave the static content alone
    this._spec = ENTITY_SPECS[file]
    const staticHTML = this.innerHTML

    try {
      const data = await (await fetch(new URL('data/' + file, SITE_ROOT).href)).json()
      this._rows = Array.isArray(data) ? data : data.rows || []
      if (!this._rows.length) return // keep the substrate rather than blank the page
      this._body = document.createElement('div')
      this.replaceChildren(this.buildToolbar(), this._body)
      this.render()
    } catch (e) {
      // The book's own view beats an error message.
      this.innerHTML = staticHTML
    }
  }

  /** Live free-text filter over the static table's rows (preserves their links). */
  private enhanceFilter(): void {
    const table = this.querySelector('table')
    if (!table) return
    const rows = Array.from(table.querySelectorAll('tbody tr')) as HTMLElement[]
    const total = rows.length

    const bar = document.createElement('div')
    bar.className = 'ev-bar'
    const search = document.createElement('input')
    search.type = 'search'
    search.className = 'ev-search'
    search.placeholder = this.getAttribute('placeholder') || 'Search…'
    const count = document.createElement('span')
    count.className = 'ev-count'
    const setCount = (n: number) => (count.textContent = n === total ? `${total} applications` : `${n} of ${total}`)
    setCount(total)

    search.oninput = () => {
      const q = search.value.trim().toLowerCase()
      let shown = 0
      for (const r of rows) {
        const hay = r.getAttribute('data-search') || r.textContent || ''
        const ok = !q || hay.indexOf(q) >= 0
        r.style.display = ok ? '' : 'none'
        if (ok) shown++
      }
      setCount(shown)
    }
    bar.append(search, count)
    this.insertBefore(bar, this.firstChild)
  }

  private presentTags(): string[] {
    const present = new Set<string>()
    for (const row of this._rows) for (const t of row.tags || []) present.add(t)
    return ALL_TAGS.filter((t) => present.has(t))
  }

  private buildToolbar(): HTMLElement {
    const bar = document.createElement('div')
    bar.className = 'ev-bar'

    const views = document.createElement('div')
    views.className = 'ev-views'
    for (const v of ['summary', 'cards'] as const) {
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'ev-toggle'
      b.textContent = v === 'summary' ? 'Summary' : 'Cards'
      b.setAttribute('aria-pressed', String(this._view === v))
      b.onclick = () => {
        this._view = v
        for (const other of Array.from(views.children)) other.setAttribute('aria-pressed', 'false')
        b.setAttribute('aria-pressed', 'true')
        this.render()
      }
      views.append(b)
    }
    bar.append(views)

    const search = document.createElement('input')
    search.type = 'search'
    search.className = 'ev-search'
    search.placeholder = 'Filter…'
    search.oninput = () => {
      this._query = search.value.trim().toLowerCase()
      this.render()
    }
    bar.append(search)

    const tags = this.presentTags()
    if (tags.length > 1) {
      const chips = document.createElement('div')
      chips.className = 'ev-tags'
      for (const t of tags) {
        const chip = document.createElement('button')
        chip.type = 'button'
        chip.className = 'ev-chip'
        chip.textContent = t
        chip.setAttribute('aria-pressed', 'false')
        chip.onclick = () => {
          if (this._tags.has(t)) this._tags.delete(t)
          else this._tags.add(t)
          chip.setAttribute('aria-pressed', String(this._tags.has(t)))
          this.render()
        }
        chips.append(chip)
      }
      bar.append(chips)
    }
    return bar
  }

  /** No selected tags = show everything (the tag toggles are a narrowing tool). */
  private filtered(): any[] {
    return this._rows.filter((row) => {
      if (this._tags.size && !(row.tags || []).some((t: string) => this._tags.has(t))) return false
      if (!this._query) return true
      const body = this._spec?.body ? row[this._spec.body] : ''
      return [row.name, body, ...(row.tags || [])].join(' ').toLowerCase().includes(this._query)
    })
  }

  private render() {
    if (!this._body) return
    const rows = this.filtered()
    this._body.replaceChildren()

    if (!rows.length) {
      const empty = document.createElement('p')
      empty.className = 'ev-empty'
      empty.textContent = 'Nothing matches that filter.'
      this._body.append(empty)
      return
    }

    if (this._view === 'cards' && this._spec) {
      const grid = document.createElement('div')
      grid.className = 'ev-cards'
      for (const row of rows) grid.append(this.card(row, this._spec))
      this._body.append(grid)
      return
    }

    const colsAttr = this.getAttribute('columns')
    const table = tosiTable({
      array: rows,
      columns: colsAttr ? JSON.parse(colsAttr) : undefined,
      rowHeight: 34,
    }) as HTMLElement
    // Don't force a tall box on a short table: size to content, capped at 60vh.
    // (A 10-row table was rendering 773px tall with most of it empty.)
    const rowH = 34
    const contentH = rows.length * rowH + 44 // header + chrome
    table.style.height = this.getAttribute('height') || `min(60vh, ${contentH}px)`
    table.style.display = 'block'
    this._body.append(table)
  }

  private card(row: any, spec: EntitySpec): HTMLElement {
    const section = document.createElement('section')
    section.className = 'ev-card'
    section.id = `${spec.idPrefix}-${slug(row.name)}`

    // Optional per-item illustration (root-relative path in `image`).
    if (row.image) {
      const img = document.createElement('img')
      img.className = 'ev-img'
      img.src = new URL(row.image, SITE_ROOT).href
      img.alt = row.name
      img.loading = 'lazy'
      section.append(img)
    }

    const title = document.createElement('h3')
    title.textContent = row.name
    section.append(title)

    const dl = document.createElement('dl')
    dl.className = 'ev-fields'
    for (const field of spec.card) {
      const dt = document.createElement('dt')
      dt.textContent = field.label
      const dd = document.createElement('dd')
      dd.textContent = fmt(row[field.prop])
      dl.append(dt, dd)
    }
    section.append(dl)

    if (spec.body && row[spec.body]) {
      const p = document.createElement('p')
      p.className = 'ev-body'
      p.textContent = row[spec.body]
      section.append(p)
    }
    return section
  }
}
if (!customElements.get('foresight-table')) customElements.define('foresight-table', ForesightTable)

// ── Haltija dev widget (localhost only) ──────────────────────────────────────
// Agent-drivable browser control for UI work. Runtime injection doesn't survive
// navigation, so it has to be embedded — but it must NEVER load on the published
// site, hence the hostname guard: foresight-rpg.com never even makes the request.
// Start the server with `bunx haltija --server --name foresight`, then drive it
// from a shell with `hj tree` / `hj eval` / `hj click`.
if (/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname)) {
  // Match the page's scheme. An http:// script on an https:// page is mixed
  // content and gets blocked outright — which silently broke this on the real
  // dev server (https://localhost:1986). Haltija serves HTTP on 8700 and HTTPS
  // on 8701, so run it with `--both`:
  //   bunx haltija --server --both --name foresight
  // The HTTPS cert is self-signed, so visit https://localhost:8701 once and
  // accept it, or the script load fails the same way.
  const secure = location.protocol === 'https:'
  const http = secure ? 'https://localhost:8701' : 'http://localhost:8700'
  const ws = secure ? 'wss://localhost:8701' : 'ws://localhost:8700'
  const s = document.createElement('script')
  s.src = `${http}/component.js?autoInject=true&serverUrl=${ws}/ws/browser`
  s.async = true
  s.onerror = () => {} // no Haltija server running: silently skip
  document.head.appendChild(s)
}
