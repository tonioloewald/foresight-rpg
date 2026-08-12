// <foresight-character-sheet> — the rule-enforcing ForeSight character builder,
// rebuilt on tosijs + tosijs-ui.
//
// LIGHT DOM, DELIBERATELY. The previous version used Shadow DOM to stop its
// generic CSS (body/h1/table/button selectors) colliding with the doc-system
// theme. But tosijs data bindings DO NOT WORK inside a shadow root — a shadow
// component is bound like an <input> (value in, change out), which is useless for
// a composite form. So this uses `static lightStyleSpec`: a stylesheet scoped to
// the tag name, with :host semantics. Isolation now comes from scoping the
// selectors properly rather than from a shadow boundary, which is what the old
// CSS should have done anyway.
//
// Rules live in character-rules.ts (pure, checkable via `bun run check`).
// Persistence lives behind CharacterStore (localStorage now, Firestore later).
// Data (skills, background factors, fields) loads from static/data/*.json — the
// same single source of truth the rules pages render.

import { Component, elements, tosi, vars } from 'tosijs'
import { tosiField, tosiSelect, tosiSegmented, postNotification, TosiDialog } from 'tosijs-ui'
import { SITE_ROOT } from './site-root'
import * as R from './character-rules'
import { LocalCharacterStore, type CharacterStore } from './character-store'

const { div, span, label, input, button, table, thead, tbody, tr, th, td, h3, h4, p, details, summary, textarea, a, section } =
  elements

// One sheet per page in practice; a module-level reactive root keeps binding
// paths simple and stable.
const { fsSheet } = tosi({ fsSheet: { char: R.blankCharacter() as any } })

interface SkillDefRaw extends R.SkillDef {
  name: string
  attributes?: string
  covers?: string
}

export class ForesightCharacterSheet extends Component {
  static preferredTagName = 'foresight-character-sheet'

  static lightStyleSpec = {
    ':host': {
      display: 'block',
      color: vars.tosiText,
      lineHeight: 1.45,
    },
    ':host h3': { margin: `${vars.tosiSpacing} 0 ${vars.tosiSpacing50}`, fontSize: '1.1em' },
    ':host h4': { margin: `${vars.tosiSpacing50} 0`, fontSize: '0.95em', opacity: 0.8 },
    ':host .fs-grid': { display: 'flex', flexWrap: 'wrap', gap: vars.tosiSpacing },
    ':host .fs-panel': {
      border: `1px solid ${vars.tosiBgInset}`,
      borderRadius: '8px',
      padding: vars.tosiSpacing,
      marginBottom: vars.tosiSpacing,
    },
    ':host table': { width: '100%', borderCollapse: 'collapse', fontSize: '0.92em' },
    ':host th, :host td': {
      borderBottom: `1px solid ${vars.tosiBgInset}`,
      padding: `${vars.tosiSpacing50} ${vars.tosiSpacing50}`,
      textAlign: 'left',
      verticalAlign: 'middle',
    },
    ':host th': { fontSize: '0.78em', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.7 },
    ':host .fs-num': { textAlign: 'center', width: '3.5em' },
    ':host .fs-step': {
      font: 'inherit',
      cursor: 'pointer',
      border: `1px solid ${vars.tosiBgInset}`,
      background: 'transparent',
      color: 'inherit',
      borderRadius: '4px',
      width: '1.8em',
      lineHeight: 1.3,
    },
    ':host .fs-step:disabled': { opacity: 0.3, cursor: 'default' },
    ':host .fs-score': { fontWeight: 600 },
    ':host .fs-pool': { display: 'flex', gap: vars.tosiSpacing, flexWrap: 'wrap', alignItems: 'baseline' },
    ':host .fs-pool b': { fontSize: '1.3em' },
    ':host .fs-warn': { color: '#c0392b', fontWeight: 600 },
    ':host .fs-chip': {
      display: 'inline-flex',
      gap: '0.3em',
      alignItems: 'center',
      border: `1px solid ${vars.tosiBgInset}`,
      borderRadius: '999px',
      padding: '0.1em 0.6em',
      marginRight: '0.3em',
      marginBottom: '0.3em',
      fontSize: '0.9em',
    },
    ':host .fs-chip button': {
      border: 0,
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
      font: 'inherit',
      opacity: 0.6,
    },
    ':host .fs-muted': { opacity: 0.65 },
    ':host .fs-row': { display: 'flex', gap: vars.tosiSpacing50, alignItems: 'center', flexWrap: 'wrap' },
  }

  private store: CharacterStore = new LocalCharacterStore()
  private SKILLS: Record<string, SkillDefRaw> = {}
  private SKILLNAMES: string[] = []
  private BF_CATALOG: Record<string, any[]> = {}
  private FIELDS: any[] = []
  private loaded = false
  private uidc = 1

  private get char() {
    return fsSheet.char.tosi.value as R.Character
  }

  // ── handlers (arrow-function class properties, declared before `content`) ──

  private uid = () => 'b' + this.uidc++

  private changed = () => {
    // touch() keeps the bound inputs (name/concept/wound/…) in sync, but the
    // derived views are rendered explicitly: queueRender() dedupes against the
    // component's OWN attribute/value tracking, and our state lives outside it,
    // so a queued render is dropped as "nothing changed". render() is direct.
    fsSheet.char.tosi.touch()
    this.render()
    this.autosave()
  }

  private bumpAttr = (a: string, d: number) => {
    const c = this.char
    const next = (c.buyBonus[a] || 0) + d
    // attributes sell DOWN to the floor (3) as well as buying up
    if ((c.base[a] || 0) + R.conferAttr(c, a) + next < R.ATTR_FLOOR) return
    c.buyBonus[a] = next
    R.clampSkills(c, this.SKILLS)
    this.changed()
  }

  private bumpLevel = (name: string, d: number) => {
    const c = this.char
    if (!c.skills[name]) c.skills[name] = { level: 0 }
    const mx = R.maxLevel(c, this.SKILLS, name)
    const conf = R.conferSkill(c, name)
    let lv = (c.skills[name].level || 0) + d
    if (lv < 0) lv = 0
    if (conf + lv > mx) lv = Math.max(0, mx - conf)
    c.skills[name].level = lv
    this.changed()
  }

  private applyArchetype = (name: string) => {
    const c = this.char
    c.arch = name
    if (name && R.ARCH[name]) {
      for (const a of R.ATTRS) c.base[a] = R.ARCH[name][a]
      R.clampSkills(c, this.SKILLS)
    }
    this.changed()
  }

  private addBF = () => {
    const cat = (this.parts.bfCat as any)?.value
    const pick = (this.parts.bfPick as any)?.value
    const def = (this.BF_CATALOG[cat] || []).find((b: any) => b.name === pick)
    if (!def) return
    const c = this.char
    // one species / one origin — exclusivity is a rule, so enforce it here
    if ((cat === 'Species' || cat === 'Origin') && c.bfs.some((b: any) => b.cat === cat)) {
      void TosiDialog.alert(`A character has only one ${cat}. Remove the existing one first.`)
      return
    }
    c.bfs.push({ ...def, cat, uid: this.uid() })
    R.clampSkills(c, this.SKILLS)
    this.changed()
  }

  private rmBF = (uid: string) => {
    const c = this.char
    c.bfs = c.bfs.filter((b: any) => b.uid !== uid)
    R.clampSkills(c, this.SKILLS)
    this.changed()
  }

  private moveBF = (uid: string, d: number) => {
    const c = this.char
    const i = c.bfs.findIndex((b: any) => b.uid === uid)
    const j = i + d
    if (i < 0 || j < 0 || j >= c.bfs.length) return
    const tmp = c.bfs[i]
    c.bfs[i] = c.bfs[j]
    c.bfs[j] = tmp
    this.changed()
  }

  private toggleTag = (t: string) => {
    const c = this.char
    const i = c.activeTags.indexOf(t)
    if (i >= 0) c.activeTags.splice(i, 1)
    else c.activeTags.push(t)
    this.changed()
  }

  private addField = () => {
    const name = ((this.parts.fieldName as any)?.value || '').trim()
    const years = Number((this.parts.fieldYears as any)?.value) || 1
    if (!name) return
    this.char.field.push({ name, years })
    ;(this.parts.fieldName as any).value = ''
    this.changed()
  }

  private addChip = (kind: 'ltf' | 'quirk', partName: string) => {
    const el = this.parts[partName] as any
    const v = (el?.value || '').trim()
    if (!v) return
    ;(this.char as any)[kind].push(v)
    el.value = ''
    this.changed()
  }

  private addAward = () => {
    const note = ((this.parts.awardNote as any)?.value || '').trim()
    const amt = Number((this.parts.awardAmt as any)?.value) || 0
    if (!amt) return
    this.char.awards.push({ note, amt })
    ;(this.parts.awardNote as any).value = ''
    this.changed()
  }

  private autosave = () => {
    if (!this.char.name) return
    void this.store.save(this.char)
  }

  private saveChar = async () => {
    if (!this.char.name.trim()) {
      await TosiDialog.alert('Name the character first.')
      return
    }
    await this.store.save(this.char)
    await this.refreshSlots()
    postNotification({ message: `Saved “${this.char.name}”`, duration: 2 })
  }

  private loadChar = async (name: string) => {
    if (!name) return
    const c = await this.store.load(name)
    if (!c) return
    fsSheet.char.tosi.value = { ...R.blankCharacter(), ...c }
    this.changed()
  }

  private newChar = async () => {
    if (!(await TosiDialog.confirm('Start a new character? Unsaved changes are lost.'))) return
    fsSheet.char.tosi.value = R.blankCharacter()
    this.changed()
  }

  private deleteChar = async () => {
    const name = this.char.name
    if (!name) return
    if (!(await TosiDialog.confirm(`Delete “${name}”?`))) return
    await this.store.remove(name)
    fsSheet.char.tosi.value = R.blankCharacter()
    await this.refreshSlots()
    this.changed()
  }

  private exportChar = () => {
    const name = this.char.name.trim() || 'foresight-character'
    const blob = new Blob([JSON.stringify(this.char, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = a({ href: url, download: `${name}.json` }) as HTMLAnchorElement
    link.click()
    URL.revokeObjectURL(url)
  }

  private importChar = (ev: Event) => {
    const file = (ev.target as HTMLInputElement).files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        fsSheet.char.tosi.value = { ...R.blankCharacter(), ...parsed }
        this.changed()
      } catch {
        void TosiDialog.alert("That file doesn't look like a ForeSight character.")
      }
    }
    reader.readAsText(file)
  }

  // ── shell ────────────────────────────────────────────────────────────────

  content = () => [
    section(
      { class: 'fs-panel' },
      div(
        { class: 'fs-grid' },
        tosiField({ caption: 'Name', part: 'nameField' }, input({ bindValue: fsSheet.char.name, onInput: this.changed })),
        tosiField({ caption: 'Archetype' }, tosiSelect({ part: 'archPick', placeholder: 'none' })),
        tosiField({ caption: 'Age' }, input({ bindValue: fsSheet.char.age, onInput: this.changed })),
        tosiField({ caption: 'Wealth' }, input({ bindValue: fsSheet.char.wealth, onInput: this.changed }))
      ),
      tosiField(
        { caption: 'Concept' },
        textarea({ bindValue: fsSheet.char.concept, onInput: this.changed, rows: '3', style: { width: '100%' } })
      ),
      div({ class: 'fs-row' }, span({ class: 'fs-muted' }, 'Genre:'), tosiSegmented({ part: 'tagPick', multiple: true })),
      div({ class: 'fs-pool', part: 'pools' })
    ),
    section({ class: 'fs-panel' }, h3('Attributes'), div({ part: 'attrs' })),
    section(
      { class: 'fs-panel' },
      h3('Background Factors'),
      div(
        { class: 'fs-row' },
        tosiSelect({ part: 'bfCat', onChange: () => this.renderBFPicker() }),
        tosiSelect({ part: 'bfPick' }),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.addBF }, 'Add'),
        span({ class: 'fs-muted', part: 'slots' })
      ),
      div({ part: 'bfList' })
    ),
    section({ class: 'fs-panel' }, h3('Skills'), div({ part: 'skills' })),
    section(
      { class: 'fs-panel' },
      h3('Fields of Knowledge'),
      div(
        { class: 'fs-row' },
        // `list` must be set as an ATTRIBUTE: HTMLInputElement.list is a
        // read-only property (its getter returns the datalist element), so
        // assigning it as a prop throws and aborts hydration.
        input({
          part: 'fieldName',
          placeholder: 'field',
          apply(el: HTMLElement) {
            el.setAttribute('list', 'fs-field-list')
          },
        }),
        input({ part: 'fieldYears', type: 'number', min: '1', value: '1', class: 'fs-num' }),
        span({ class: 'fs-muted' }, 'years'),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.addField }, 'Add')
      ),
      div({ part: 'fieldList' }),
      div({ part: 'fieldDatalist' })
    ),
    section(
      { class: 'fs-panel' },
      h3('Familiarities & Quirks'),
      div(
        { class: 'fs-row' },
        input({ part: 'ltfIn', placeholder: 'long-term familiarity' }),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: () => this.addChip('ltf', 'ltfIn') }, 'Add')
      ),
      div({ part: 'ltfList' }),
      div(
        { class: 'fs-row' },
        input({ part: 'quirkIn', placeholder: 'quirk / talent' }),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: () => this.addChip('quirk', 'quirkIn') }, 'Add')
      ),
      div({ part: 'quirkList' })
    ),
    section(
      { class: 'fs-panel' },
      h3('Condition'),
      div(
        { class: 'fs-grid' },
        tosiField(
          { caption: 'Wound level (0–6)', type: 'number' },
          input({ type: 'number', min: '0', max: '6', class: 'fs-num', bindValue: fsSheet.char.wound, onInput: this.changed })
        ),
        tosiField(
          { caption: 'Fatigue (0–5)', type: 'number' },
          input({
            type: 'number',
            min: '0',
            max: '5',
            class: 'fs-num',
            bindValue: fsSheet.char.exh.Fatigue,
            onInput: this.changed,
          })
        )
      ),
      p({ class: 'fs-muted', part: 'condNote' })
    ),
    section(
      { class: 'fs-panel' },
      h3('Points Awards'),
      div(
        { class: 'fs-row' },
        input({ part: 'awardNote', placeholder: 'reason' }),
        input({ part: 'awardAmt', type: 'number', class: 'fs-num', value: '0' }),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.addAward }, 'Award')
      ),
      div({ part: 'awardList' })
    ),
    section(
      { class: 'fs-panel' },
      h3('Gear'),
      textarea({
        bindValue: fsSheet.char.gear,
        onInput: this.changed,
        rows: '3',
        style: { width: '100%' },
        placeholder: 'Free text for now — a real loadout arrives with the equipment + modifier model.',
      })
    ),
    section(
      { class: 'fs-panel' },
      h3('Save / Load'),
      div(
        { class: 'fs-row' },
        tosiSelect({ part: 'slotPick', placeholder: 'saved characters…', onChange: (ev: any) => this.loadChar(ev.target.value) }),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.saveChar }, 'Save'),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.newChar }, 'New'),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.deleteChar }, 'Delete'),
        button({ class: 'fs-step', style: { width: 'auto', padding: '0 0.7em' }, onClick: this.exportChar }, 'Export JSON'),
        label(
          { class: 'fs-step', style: { width: 'auto', padding: '0 0.7em', cursor: 'pointer' } },
          'Import',
          input({ type: 'file', accept: '.json', style: { display: 'none' }, onChange: this.importChar })
        )
      )
    ),
  ]

  // ── data ─────────────────────────────────────────────────────────────────

  private async loadData() {
    try {
      const [skills, bfs, fields] = await Promise.all(
        ['skills.json', 'background-factors.json', 'fields.json'].map((f) =>
          fetch(new URL('data/' + f, SITE_ROOT).href).then((r) => (r.ok ? r.json() : null))
        )
      )
      for (const s of skills || []) {
        const attrs = String(s.attributes || '')
          .split(/[^A-Z]+/)
          .filter(Boolean)
        this.SKILLS[s.name] = {
          ...s,
          a: attrs.length ? attrs : ['CO'],
          half: Number(s.limit) > 1,
          limit: Number(s.limit) || 1,
          cost: Number(s.cost) || 1,
        }
      }
      this.SKILLNAMES = Object.keys(this.SKILLS).sort()
      for (const b of bfs || []) {
        const cat = b.category || b.cat || 'General'
        ;(this.BF_CATALOG[cat] ||= []).push(b)
      }
      this.FIELDS = fields || []
      this.loaded = true
      return true
    } catch {
      return false
    }
  }

  private async refreshSlots() {
    const names = await this.store.list()
    const sel = this.parts.slotPick as any
    if (sel) sel.options = names.length ? names.join(',') : ''
  }

  connectedCallback() {
    super.connectedCallback()
    const arch = this.parts.archPick as any
    if (arch) {
      arch.options = ',' + Object.keys(R.ARCH).join(',')
      arch.addEventListener('change', (ev: any) => this.applyArchetype(ev.target.value))
    }
    const tags = this.parts.tagPick as any
    if (tags) {
      tags.choices = R.ALL_TAGS.join(',')
      tags.value = this.char.activeTags.join(',')
      tags.addEventListener('change', (ev: any) => {
        const picked = String(ev.target.value || '').split(',').filter(Boolean)
        this.char.activeTags = picked
        this.changed()
      })
    }
    void this.loadData().then(async () => {
      // `whenHydrated` matters: a render queued before hydration completes is
      // dropped by the `hydrated` guard below, and nothing re-queues it.
      try {
        await (this as any).whenHydrated
      } catch {
        /* older builds resolve immediately */
      }
      const cat = this.parts.bfCat as any
      if (cat) {
        const cats = R.BF_CAT.filter((c) => this.BF_CATALOG[c]?.length)
        cat.options = cats.join(',')
        // select the first category, or Add has nothing to add
        if (!cat.value && cats.length) cat.value = cats[0]
        this.renderBFPicker()
      }
      await this.refreshSlots()
      this.render()
    })
  }

  private renderBFPicker() {
    const cat = (this.parts.bfCat as any)?.value
    const pick = this.parts.bfPick as any
    if (!pick) return
    const list = (this.BF_CATALOG[cat] || []).filter((b: any) => R.tagMatch(this.char, b.tags))
    pick.options = list.map((b: any) => b.name).join(',')
    // keep a valid selection so Add always has a target
    if (list.length && !list.some((b: any) => b.name === pick.value)) pick.value = list[0].name
  }

  // ── derived rendering ────────────────────────────────────────────────────

  render() {
    super.render()
    if (!this.hydrated) return
    const c = this.char
    const pool = this.loaded ? R.pools(c, this.SKILLS, this.SKILLNAMES) : { pts: 0, granted: 0, spent: 0 }

    // pools + slot budget
    const used = R.usedSlots(c)
    this.parts.pools?.replaceChildren(
      span('Points left ', span({ class: pool.pts < 0 ? 'fs-warn fs-score' : 'fs-score' }, String(pool.pts))),
      span({ class: 'fs-muted' }, `granted ${pool.granted} · spent ${pool.spent}`)
    )
    if (this.parts.slots)
      this.parts.slots.replaceChildren(
        span({ class: used > c.slots ? 'fs-warn' : 'fs-muted' }, `${used} / ${c.slots} slots used`)
      )

    // attributes
    this.parts.attrs?.replaceChildren(
      table(
        thead(tr(th('Attr'), th('Base'), th('Conferred'), th('Bought'), th('Final'), th('Cost'), th())),
        tbody(
          ...R.ATTRS.map((a) => {
            const conf = R.conferAttr(c, a)
            const bought = c.buyBonus[a] || 0
            return tr(
              td(a),
              td({ class: 'fs-num' }, String(c.base[a] || 0)),
              td({ class: 'fs-num' }, conf ? `+${conf}` : '—'),
              td({ class: 'fs-num' }, bought ? `+${bought}` : '—'),
              td({ class: 'fs-num fs-score' }, String(R.finalAttr(c, a))),
              td({ class: 'fs-num fs-muted' }, String(R.attrBuySpend(c, a))),
              td(
                button({ class: 'fs-step', onClick: () => this.bumpAttr(a, -1), disabled: bought <= 0 }, '−'),
                ' ',
                button({ class: 'fs-step', onClick: () => this.bumpAttr(a, 1) }, '+')
              )
            )
          })
        )
      )
    )

    // background factors, in order (order matters — later factors build on earlier)
    this.parts.bfList?.replaceChildren(
      c.bfs.length
        ? table(
            thead(tr(th('#'), th('Factor'), th('Category'), th('Grants'), th())),
            tbody(
              ...c.bfs.map((b: any, i: number) =>
                tr(
                  td({ class: 'fs-muted' }, String(i + 1)),
                  td(b.name, b.free ? span({ class: 'fs-muted' }, ' (free)') : ''),
                  td({ class: 'fs-muted' }, b.cat || ''),
                  td(
                    { class: 'fs-muted' },
                    [
                      b.grant ? `${b.grant} pts` : '',
                      b.attrs ? Object.entries(b.attrs).map(([k, v]) => `${k}+${v}`).join(' ') : '',
                      b.skills ? Object.keys(b.skills).length + ' skills' : '',
                      b.fields?.length ? b.fields.length + ' fields' : '',
                    ]
                      .filter(Boolean)
                      .join(' · ')
                  ),
                  td(
                    button({ class: 'fs-step', onClick: () => this.moveBF(b.uid, -1), disabled: i === 0 }, '↑'),
                    ' ',
                    button({ class: 'fs-step', onClick: () => this.moveBF(b.uid, 1), disabled: i === c.bfs.length - 1 }, '↓'),
                    ' ',
                    button({ class: 'fs-step', onClick: () => this.rmBF(b.uid) }, '×')
                  )
                )
              )
            )
          )
        : p({ class: 'fs-muted' }, 'No background factors yet — this is where your initial build points come from, and most of your skills. Factors can also be conferred later, to reflect long downtime or a change of life.')
    )

    // skills, filtered by the active content tags
    const names = this.SKILLNAMES.filter((n) => R.tagMatch(c, this.SKILLS[n].tags))
    this.parts.skills?.replaceChildren(
      table(
        thead(tr(th('Skill'), th('Formula'), th('Conf.'), th('Level'), th(), th('Score'), th('Max'))),
        tbody(
          ...names.map((n) => {
            const conf = R.conferSkill(c, n)
            const lv = (c.skills[n] && c.skills[n].level) || 0
            const mx = R.maxLevel(c, this.SKILLS, n)
            const atCap = conf + lv >= mx
            return tr(
              td(n),
              td({ class: 'fs-muted' }, this.SKILLS[n].formula || ''),
              td({ class: 'fs-num' }, conf ? `+${conf}` : '—'),
              td({ class: 'fs-num' }, String(lv)),
              td(
                button({ class: 'fs-step', onClick: () => this.bumpLevel(n, -1), disabled: lv <= 0 }, '−'),
                ' ',
                button({ class: 'fs-step', onClick: () => this.bumpLevel(n, 1), disabled: atCap }, '+')
              ),
              td({ class: 'fs-num fs-score' }, conf + lv > 0 ? String(R.score(c, this.SKILLS, n)) : '—'),
              td({ class: 'fs-num fs-muted' }, String(mx))
            )
          })
        )
      )
    )

    // fields (bought + conferred), plus a datalist from fields.json
    const conferred = R.conferFields(c)
    this.parts.fieldList?.replaceChildren(
      div(
        ...c.field.map((f: any, i: number) =>
          span(
            { class: 'fs-chip' },
            `${f.name} (${f.years}y)`,
            button({ onClick: () => (c.field.splice(i, 1), this.changed()) }, '×')
          )
        ),
        ...conferred.map((f) => span({ class: 'fs-chip fs-muted' }, `${f.name} (${f.years}y — ${f.src})`))
      )
    )
    if (this.parts.fieldDatalist && this.FIELDS.length) {
      const dl = document.createElement('datalist')
      dl.id = 'fs-field-list'
      for (const f of this.FIELDS) {
        const o = document.createElement('option')
        o.value = f.name
        dl.appendChild(o)
      }
      this.parts.fieldDatalist.replaceChildren(dl)
    }

    // chips
    const chips = (kind: 'ltf' | 'quirk') =>
      (c as any)[kind].map((v: string, i: number) =>
        span({ class: 'fs-chip' }, v, button({ onClick: () => ((c as any)[kind].splice(i, 1), this.changed()) }, '×'))
      )
    this.parts.ltfList?.replaceChildren(div(...chips('ltf')))
    this.parts.quirkList?.replaceChildren(div(...chips('quirk')))

    // awards
    this.parts.awardList?.replaceChildren(
      div(
        ...c.awards.map((aw: any, i: number) =>
          span(
            { class: 'fs-chip' },
            `${aw.note || 'award'}: ${aw.amt}`,
            button({ onClick: () => (c.awards.splice(i, 1), this.changed()) }, '×')
          )
        )
      )
    )

    // condition note — wound/exhaustion penalties are the same number as the level
    const w = Number(c.wound) || 0
    const f = Number(c.exh?.Fatigue) || 0
    this.parts.condNote?.replaceChildren(
      span(
        w || f
          ? `Penalty −${w} from wounds, −${f} from fatigue (levels apply to everything; 4 = incapacitated).`
          : 'Unhurt and rested.'
      )
    )
  }
}

export const foresightCharacterSheet = ForesightCharacterSheet.elementCreator({
  tag: 'foresight-character-sheet',
})
