// <foresight-character-sheet> — the rule-enforcing ForeSight character builder as a
// Shadow-DOM custom element, embeddable in any rules page. Ported from the
// standalone static/character.html: same rules, same localStorage store, same
// JSON export. Shadow DOM keeps its generic CSS (body/h1/table/button) from
// colliding with the doc-system theme. Data (skills, background factors) loads
// from static/data/*.json — the single source of truth shared with the rules.

import { SITE_ROOT } from './site-root'
// Rules, constants and the point economy live in character-rules.ts as pure
// functions — shared with (eventually) the Firestore backend and NPC generation.
import * as R from './character-rules'

const ATTRS = R.ATTRS as readonly string[]
const ARCH = R.ARCH
const ALL_TAGS = R.ALL_TAGS
const BF_CAT = R.BF_CAT as readonly string[]
const KEY = 'foresight_characters_v2'

const STYLE = `
  :host{display:block;--ink:#1c1a17;--muted:#6b645c;--line:#d9d2c7;--paper:#fbf8f2;--accent:#7a3b2e;--accent2:#2e5a7a;--good:#2f7a4d;--warn:#b23a2e;--chip:#efe9df;
    color:var(--ink);font:15px/1.45 "Iowan Old Style","Palatino Linotype",Georgia,serif;}
  *{box-sizing:border-box}
  .wrap{max-width:940px;margin:0 auto;}
  .sheet{background:var(--paper);border:1px solid var(--line);border-radius:10px;box-shadow:0 1px 0 #fff inset,0 6px 24px rgba(0,0,0,.08);padding:22px 26px;}
  h1{font-size:26px;margin:0 0 2px;letter-spacing:.06em}
  h1 .sub{font-size:12px;color:var(--muted);letter-spacing:.18em;text-transform:uppercase}
  h2{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:var(--accent);border-bottom:1px solid var(--line);padding-bottom:4px;margin:22px 0 10px}
  label{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  input,select,textarea{font:inherit;color:var(--ink);background:#fff;border:1px solid var(--line);border-radius:6px;padding:5px 7px}
  input:focus,select:focus,textarea:focus{outline:2px solid var(--accent2)}
  textarea{width:100%;resize:vertical;min-height:46px}
  .row{display:flex;gap:14px;flex-wrap:wrap;align-items:flex-end}
  .row>div{display:flex;flex-direction:column;gap:3px}
  .grow{flex:1 1 180px}
  .toolbar{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
  button{font:inherit;cursor:pointer;border:1px solid var(--line);background:#fff;border-radius:7px;padding:7px 12px}
  button:hover{background:var(--chip)}
  button.primary{background:var(--accent);color:#fff;border-color:var(--accent)}
  .pill{font-size:12px;padding:3px 9px;border-radius:999px;background:var(--chip);color:var(--muted)}
  .pill.ok{background:#dff0e4;color:var(--good)} .pill.bad{background:#f6dedb;color:var(--warn)}
  .attrs{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}
  .attr{background:#fff;border:1px solid var(--line);border-radius:8px;padding:8px 6px;text-align:center}
  .attr .nm{font-size:11px;letter-spacing:.1em;color:var(--muted)}
  .attr .fin{font-size:26px;font-weight:700;line-height:1.1}
  .attr .ctl{display:flex;justify-content:center;gap:4px;margin-top:4px}
  .attr .ctl button{padding:2px 8px;border-radius:5px}
  table{width:100%;border-collapse:collapse;margin-top:4px}
  th,td{text-align:left;padding:5px 6px;border-bottom:1px solid var(--line);font-size:14px}
  th{font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  td.sc{font-weight:700;font-size:18px;text-align:center}
  td.center,th.center{text-align:center}
  .lvlctl{display:inline-flex;gap:4px;align-items:center}
  .lvlctl button{padding:1px 8px}
  .maxnote{font-size:10px;color:var(--muted)}
  .rm{color:var(--warn);border:none;background:none;font-size:16px;padding:0 4px;cursor:pointer}
  .tags{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}
  .tag{background:var(--chip);border-radius:999px;padding:3px 10px;font-size:13px;display:flex;gap:6px;align-items:center}
  .tag button{border:none;background:none;color:var(--warn);font-size:14px;padding:0;cursor:pointer}
  .bfcard{border:1px solid var(--line);border-radius:8px;padding:10px 12px;margin:8px 0;background:#fff}
  .bfhead{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .bfhead .ord{font-weight:700;color:var(--muted);width:20px}
  .bfhead .bfname{font-weight:700;font-size:15px}
  .badge{font-size:10px;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:999px;background:var(--chip);color:var(--muted)}
  .badge.species{background:#e6eef5;color:var(--accent2)} .badge.intrinsic{background:#f3e7e4;color:var(--accent)}
  .bfgrants{font-size:12px;color:var(--muted);margin-top:5px}
  .minirow{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin:3px 0}
  .spacer{flex:1}
  .track{display:flex;align-items:center;gap:10px;margin:6px 0;flex-wrap:wrap}
  .track .nm{width:90px;font-size:13px}
  .dots{display:flex;gap:5px;align-items:center}
  .dot{width:20px;height:20px;border-radius:50%;border:1.5px solid var(--line);background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--muted)}
  .dot.on{background:var(--warn);border-color:var(--warn);color:#fff}
  .dot.dead{border-color:#000}
  .exh .dot.on{background:var(--accent2);border-color:var(--accent2)}
  .zeropill{padding:3px 10px;border:1.5px solid var(--line);border-radius:999px;background:#fff;cursor:pointer;font-size:11px;color:var(--muted);white-space:nowrap}
  .zeropill.on{background:#dff0e4;border-color:var(--good);color:var(--good);font-weight:700}
  .toggle{display:inline-flex;gap:6px;align-items:center;margin-right:16px;font-size:13px}
  .hint{font-size:12px;color:var(--muted);margin:4px 0 0}
  .two{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .sideband{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);border:1px solid var(--line);border-radius:6px;padding:7px 11px;margin:14px 0 2px;background:var(--chip)}
  .tagtoggle{font-size:12px;text-transform:capitalize;padding:4px 12px;border:1.5px solid var(--line);border-radius:999px;background:#fff;color:var(--muted);cursor:pointer}
  .tagtoggle.on{background:var(--accent2);border-color:var(--accent2);color:#fff}
  @media(max-width:680px){.attrs{grid-template-columns:repeat(4,1fr)}.two{grid-template-columns:1fr}}
  @media print{
    .wrap{max-width:none}
    .sheet{border:none;box-shadow:none;border-radius:0;padding:0}
    .no-print{display:none !important}
    .dot,.zeropill,.sideband,.badge{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    h2{break-after:avoid} table{font-size:12px} .sideB{break-before:page}
  }
`

const MARKUP = `
<div class="wrap">
  <div class="toolbar no-print">
    <strong style="letter-spacing:.1em">ForeSight</strong>
    <select id="slotPicker" title="Saved characters"></select>
    <button data-click="newChar">New</button>
    <button data-click="saveChar" class="primary">Save</button>
    <button data-click="deleteChar">Delete</button>
    <span style="flex:1"></span>
    <button data-click="exportChar">Export</button>
    <button data-click="triggerImport">Import</button>
    <input type="file" id="importFile" accept="application/json" style="display:none">
    <button data-click="printSheet">Print</button>
  </div>

  <div class="sheet">
    <h1>ForeSight <span class="sub">Character Sheet</span></h1>
    <div id="loaderr" class="no-print" style="display:none;background:#f6dedb;color:var(--warn);border:1px solid var(--warn);border-radius:6px;padding:8px 11px;margin:8px 0;font-size:13px">
      Couldn't load <code>data/*.json</code>. Open this page from its published URL or a local server.</div>
    <div class="sideband">Side I &middot; The Character</div>

    <div class="row" style="margin-top:10px">
      <div class="grow"><label>Name</label><input id="f_name"></div>
      <div><label>Archetype</label><select id="f_arch">
        <option value="">&mdash; choose &mdash;</option><option>Athlete</option><option>Scholar</option><option>Socialite</option><option>Artist</option></select></div>
      <div style="width:70px"><label>Age</label><input id="f_age"></div>
    </div>
    <div class="row" style="margin-top:10px"><div class="grow" style="flex-basis:100%"><label>Concept &middot; personality &middot; what they want</label><input id="f_concept" style="width:100%"></div></div>
    <div class="row no-print" style="margin-top:10px"><div style="flex-basis:100%"><label>Show content for setting</label><div id="tagToggles" class="tags" style="margin-top:3px"></div></div></div>

    <h2>Attributes <span id="attrStatus" class="pill no-print" style="float:right;text-transform:none;letter-spacing:0"></span></h2>
    <div class="attrs" id="attrs"></div>
    <p class="hint no-print">Each attribute is 6&ndash;10 (&#9650;/&#9660;); your first 50 points are free. Raising past 10, or past your 50, spends points (10/pt to 12, 20 beyond). Background factors add on top for free.</p>

    <h2>Background Factors <span class="hint no-print" style="float:right;text-transform:none">order matters &mdash; add in life-story sequence</span></h2>
    <div class="row no-print" style="margin:2px 0 6px;align-items:center">
      <div class="pill" id="slotPill" style="font-size:13px">BF slots used <b id="slotsUsed">0</b> of <b id="slotsBudget">4</b></div>
      <div><label>Slot budget</label><input id="f_slots" type="number" min="0" style="width:56px"></div>
      <div class="hint" style="align-self:center">neutral species are free; every other factor costs one slot</div>
    </div>
    <div id="bfList"></div>
    <div class="row no-print" style="margin-top:8px">
      <div><label>Category</label><select id="bfCat"></select></div>
      <div class="grow"><label>Factor</label><select id="bfPick"></select></div>
      <div><label>&nbsp;</label><button data-click="addBF">+ Add factor</button></div>
    </div>

    <h2>Skills</h2>
    <table><thead><tr><th>Skill</th><th>Formula</th><th class="center">Cost</th><th class="center">Level</th><th class="center">Score</th><th class="center">BEF</th></tr></thead>
      <tbody id="skillBody"></tbody></table>
    <p class="hint no-print">Assign <b>Level</b> to any skill. Score = formula + level &middot; max level = best attribute &times; limit &middot; cost: 3&times; to reach level 1, then per level. <b>No skill</b> &rarr; BEF &minus;2 (shown <span style="color:var(--warn)">red</span>). Background factors set a floor you can't drop below.</p>

    <div class="two">
      <div>
        <h2>Long-Term Familiarities</h2>
        <div class="tags" id="ltfTags"></div>
        <div class="row no-print"><div class="grow"><input id="ltfIn" placeholder="+1 throwing&hellip; (Enter)"></div></div>
        <h2>Fields of Knowledge</h2>
        <div id="fieldList"></div>
        <div class="row no-print" style="margin-top:6px"><div class="grow"><input id="fieldIn" placeholder="buy a field &mdash; Medicine, Law&hellip; (Enter, 4 pts/yr)"></div></div>
      </div>
      <div>
        <h2>Quirks &amp; Talents</h2>
        <div class="tags" id="quirkTags"></div>
        <div class="row no-print"><div class="grow"><input id="quirkIn" placeholder="Reads People, Minor Phobia&hellip; (Enter)"></div></div>
        <h2>Points</h2>
        <div class="row" style="align-items:center">
          <div class="pill" style="font-size:13px">Granted <b id="ptsGranted">0</b></div>
          <div class="pill" style="font-size:13px">Spent <b id="ptsSpent">0</b></div>
          <div class="pill" id="ptsPill" style="font-size:13px">Available <b id="ptsAvail">0</b></div>
        </div>
        <div class="hint">Some factors grant build points; awards/downtime add more. Spend on attributes (10/pt to 12, 20 beyond), skill levels (3&times;cost to L1 then cost/level), and fields (4/yr).</div>
        <div id="awardList" style="margin-top:6px"></div>
        <div class="row no-print" style="margin-top:6px">
          <div class="grow"><label>Extra points (downtime, GM award)</label><input id="awLabel" placeholder="e.g. downtime"></div>
          <div style="width:80px"><label>Amount</label><input id="awAmt" type="number"></div>
          <div><label>&nbsp;</label><button data-click="addAward">+</button></div>
        </div>
      </div>
    </div>

    <p class="hint" style="margin-top:14px;border-top:1px solid var(--line);padding-top:8px">
      <b>Resolve:</b> D100 &le; Score &times; Ease Factor. QR &le;SC/10&middot;1 &le;SC/4&middot;2 &le;SC/2&middot;3 &le;SC&middot;4 (over=fail; &times;10=botch). Yield 100/80/50/25%. +1 EF &asymp; +Score. +5 easy / &minus;5 hard. Pain Resistance = EN/WP &middot; Stamina = EN.</p>

    <div class="sideB">
    <div class="sideband">Side II &middot; Ephemera &amp; Condition <span id="sideBName" style="float:right;font-weight:700;letter-spacing:0;text-transform:none"></span></div>
    <div class="row" style="margin-top:10px"><div style="width:140px"><label>Wealth</label><input id="f_wealth"></div></div>

    <h2>Physical Condition</h2>
    <div class="track wound"><span class="nm">Wounds</span><div class="dots" id="woundDots"></div><span class="hint">&minus;level to <b>everything</b></span></div>
    <div id="exhTracks"></div>
    <div class="row no-print" style="margin-top:4px"><div class="grow" style="flex-basis:auto"><input id="exhIn" placeholder="add exhaustion track (Mana, Piety)&hellip; (Enter)"></div></div>
    <div style="margin-top:8px">
      <label class="toggle"><input type="checkbox" id="f_shaken"> Shaken (&minus;2, one action)</label>
      <label class="toggle"><input type="checkbox" id="f_stunned"> Stunned (recover-from-stun only)</label>
    </div>

    <h2>Possessions, Gear &amp; Notes</h2>
    <textarea id="f_gear" style="min-height:120px"></textarea>
    </div>
  </div>
</div>
`

interface SkillDef { a: string[]; half: boolean; limit: number; bef: number; cost: number; tags: string[]; covers: string; formula: string; academic?: boolean }
interface BFDef { cat: string; excl: string | null; once: boolean; free: boolean; grant: number; tags: string[]; attrs: Record<string, number>; skills: Record<string, number>; fields: { name: string; years: number }[]; note: string }

class ForesightCharacterSheet extends HTMLElement {
  private root!: ShadowRoot
  private SKILLS: Record<string, SkillDef> = {}
  private SKILLNAMES: string[] = []
  private BF_CATALOG: Record<string, BFDef> = {}
  private C: any
  private uidc = 1
  private ready = false

  constructor() {
    super()
    this.C = this.blank()
  }

  connectedCallback() {
    if (this.ready) return
    this.ready = true
    this.root = this.attachShadow({ mode: 'open' })
    this.root.innerHTML = `<style>${STYLE}</style>${MARKUP}`
    this.wireStatic()
    this.loadData().then(ok => {
      if (!ok) { const e = this.$id('loaderr'); if (e) e.style.display = 'block' }
      this.render(); this.refreshSlots()
    })
  }

  // ── dom helpers ──
  private $id(id: string): any { return this.root.getElementById(id) }
  private v(id: string, val: any) { const e = this.$id(id); if (e) e.value = val || '' }
  private val(id: string): string { const e = this.$id(id); return e ? e.value : '' }

  private uid() { return 'b' + (this.uidc++) }

  private blank() { return R.blankCharacter() as any }

  private async loadData(): Promise<boolean> {
    try {
      const [sk, bf] = await Promise.all([
        fetch(new URL('data/skills.json', SITE_ROOT).href).then(r => { if (!r.ok) throw 0; return r.json() }),
        fetch(new URL('data/background-factors.json', SITE_ROOT).href).then(r => { if (!r.ok) throw 0; return r.json() }),
      ])
      this.SKILLS = {}; this.SKILLNAMES = []
      sk.forEach((s: any) => { this.SKILLS[s.name] = { a: s.attributes, half: !!s.half, limit: s.limit, bef: s.bef, cost: s.cost, tags: s.tags || [], covers: s.covers || '', formula: s.formula, academic: s.academic }; this.SKILLNAMES.push(s.name) })
      this.BF_CATALOG = {}
      bf.forEach((b: any) => { this.BF_CATALOG[b.name] = { cat: b.category, excl: b.exclusive || null, once: !!b.once, free: (b.slot === 'free'), grant: b.grant || 0, tags: b.tags || [], attrs: b.attrs || {}, skills: b.skills || {}, fields: (b.fields || []).map((f: any) => ({ name: f.name, years: f.years })), note: b.note || '' } })
      return true
    } catch (e) { return false }
  }

  // ── event wiring ──
  private wireStatic() {
    // delegated clicks for every [data-click] (static toolbar + all dynamically rendered controls)
    this.root.addEventListener('click', (e: Event) => {
      const el = (e.target as HTMLElement).closest('[data-click]') as HTMLElement | null
      if (!el || !this.root.contains(el)) return
      const m = el.getAttribute('data-click') as string
      const a = el.getAttribute('data-args')
      const args = a ? JSON.parse(a) : []
      ;(this as any)[m](...args)
    })
    const inputTouch = ['f_name', 'f_age', 'f_concept', 'f_wealth', 'f_gear']
    inputTouch.forEach(id => this.$id(id)?.addEventListener('input', () => this.touch()))
    this.$id('f_arch')?.addEventListener('change', () => this.applyArchetype())
    this.$id('f_slots')?.addEventListener('change', (e: any) => this.setSlots(e.target.value))
    this.$id('f_shaken')?.addEventListener('change', () => this.touch())
    this.$id('f_stunned')?.addEventListener('change', () => this.touch())
    this.$id('bfCat')?.addEventListener('change', () => this.renderBFAdd())
    this.$id('importFile')?.addEventListener('change', (e: any) => this.importChar(e))
    this.$id('slotPicker')?.addEventListener('change', (e: any) => { const n = e.target.value; if (!n) return; const o = this.store(); if (o[n]) { this.C = this.migrate(o[n]); this.render() } })
    const onEnter = (id: string, fn: () => void) => this.$id(id)?.addEventListener('keydown', (e: any) => { if (e.key === 'Enter') fn() })
    onEnter('ltfIn', () => this.addTag('ltf'))
    onEnter('fieldIn', () => this.addField())
    onEnter('quirkIn', () => this.addTag('quirk'))
    onEnter('awLabel', () => this.$id('awAmt')?.focus())
    onEnter('awAmt', () => this.addAward())
    onEnter('exhIn', () => this.addExh())
  }

  // ── conferred (from BFs) ──
  private conferAttr(a: string) { return R.conferAttr(this.C, a) }
  private conferSkill(n: string) { return R.conferSkill(this.C, n) }
  private conferFields() { return R.conferFields(this.C) }
  private finalAttr(a: string) { return R.finalAttr(this.C, a) }
  private skillTotal(n: string) { return R.skillTotal(this.C, n) }
  private formulaVal(n: string) { return R.formulaVal(this.C, this.SKILLS as any, n) }
  private maxLevel(n: string) { return R.maxLevel(this.C, this.SKILLS as any, n) }
  private score(n: string) { return R.score(this.C, this.SKILLS as any, n) }
  private fmtFormula(n: string) { return (this.SKILLS[n] && this.SKILLS[n].formula) || '' }
  private tagMatch(tags: string[]) { return R.tagMatch(this.C, tags) }

  // ── point economy ──
  private attrBuySpend(a: string) { return R.attrBuySpend(this.C, a) }
  private skillBuySpend(n: string) { return R.skillBuySpend(this.C, this.SKILLS as any, n) }
  private fieldBuySpend() { return R.fieldBuySpend(this.C) }
  private usedSlots() { return R.usedSlots(this.C) }
  private pools() { return R.pools(this.C, this.SKILLS as any, this.SKILLNAMES) }

  // ── render ──
  private render() {
    this.v('f_name', this.C.name); this.v('f_age', this.C.age); this.v('f_wealth', this.C.wealth); this.v('f_concept', this.C.concept); this.v('f_gear', this.C.gear)
    this.$id('f_arch').value = this.C.arch || ''
    this.$id('f_shaken').checked = this.C.shaken; this.$id('f_stunned').checked = this.C.stunned
    this.$id('sideBName').textContent = this.C.name || ''
    this.renderTagToggles()
    this.renderAttrs(); this.renderBF(); this.renderBFAddCats(); this.renderSlots(); this.renderSkills()
    this.renderTags('ltf'); this.renderTags('quirk'); this.renderFields(); this.renderAwards(); this.renderPools(); this.renderStatus()
  }

  private renderTagToggles() {
    const host = this.$id('tagToggles'); host.innerHTML = ''
    ALL_TAGS.forEach(t => { const b = document.createElement('button'); b.textContent = t; b.className = 'tagtoggle' + (this.C.activeTags.includes(t) ? ' on' : ''); b.onclick = () => this.toggleTag(t); host.appendChild(b) })
  }
  toggleTag(t: string) { const i = this.C.activeTags.indexOf(t); if (i >= 0) this.C.activeTags.splice(i, 1); else this.C.activeTags.push(t); this.touch(); this.render() }

  private renderAttrs() {
    const host = this.$id('attrs'); host.innerHTML = ''
    ATTRS.forEach(a => {
      const d = document.createElement('div'); d.className = 'attr'
      d.innerHTML = `<div class="nm">${a}</div><div class="fin">${this.finalAttr(a)}</div>
        <div class="ctl no-print"><button data-click="bumpAttr" data-args='["${a}",-1]'>&#9660;</button><button data-click="bumpAttr" data-args='["${a}",1]'>&#9650;</button></div>`
      host.appendChild(d)
    })
    const total = ATTRS.reduce((s, a) => s + this.C.base[a], 0)
    const el = this.$id('attrStatus'); el.textContent = total === 50 ? 'base 50/50 ✓' : `base ${total}/50 (${50 - total > 0 ? '+' : ''}${50 - total})`
    el.className = 'pill ' + (total === 50 ? 'ok' : 'bad')
  }
  bumpAttr(a: string, d: number) {
    if (d > 0) { const bt = ATTRS.reduce((s, x) => s + this.C.base[x], 0); if (this.C.base[a] < 10 && bt < 50) this.C.base[a]++; else this.C.buyBonus[a] = (this.C.buyBonus[a] || 0) + 1 }
    else { if ((this.C.buyBonus[a] || 0) > 0) this.C.buyBonus[a]--; else if (this.C.base[a] > 6) this.C.base[a]-- }
    this.clampSkills(); this.touch(); this.render()
  }

  // ── background factors ──
  private renderBFAddCats() { const sel = this.$id('bfCat'); if (sel.children.length) return; BF_CAT.forEach(c => { const o = document.createElement('option'); o.value = c; o.textContent = c; sel.appendChild(o) }); this.renderBFAdd() }
  renderBFAdd() {
    const cat = this.$id('bfCat').value; const sel = this.$id('bfPick'); sel.innerHTML = ''
    Object.keys(this.BF_CATALOG).filter(k => this.BF_CATALOG[k].cat === cat && this.tagMatch(this.BF_CATALOG[k].tags)).forEach(k => { const c = this.BF_CATALOG[k]; const o = document.createElement('option'); o.value = k; o.textContent = k + (c.free ? ' (free)' : (c.grant ? ` (1 BF · grants ${c.grant})` : ' (1 BF)')); sel.appendChild(o) })
  }
  addBF() {
    const key = this.$id('bfPick').value; if (!key) return; const t = this.BF_CATALOG[key]
    if (t.excl && this.C.bfs.some((b: any) => b.excl === t.excl)) { alert('You already have a ' + t.excl + ' factor — remove it first (mutually exclusive).'); return }
    if (t.once && this.C.bfs.some((b: any) => b.name === key)) { alert(key + ' can be taken only once.'); return }
    this.C.bfs.push({ uid: this.uid(), name: key, cat: t.cat, excl: t.excl || null, once: !!t.once, free: !!t.free, grant: t.grant || 0, attrs: Object.assign({}, t.attrs || {}), skills: Object.assign({}, t.skills || {}), fields: (t.fields || []).map(f => ({ name: f.name, years: f.years })), note: t.note || '' })
    this.clampSkills(); this.touch(); this.render()
  }
  rmBF(uid: string) { this.C.bfs = this.C.bfs.filter((b: any) => b.uid !== uid); this.clampSkills(); this.touch(); this.render() }
  moveBF(uid: string, d: number) { const i = this.C.bfs.findIndex((b: any) => b.uid === uid); const j = i + d; if (j < 0 || j >= this.C.bfs.length) return; const t = this.C.bfs[i]; this.C.bfs[i] = this.C.bfs[j]; this.C.bfs[j] = t; this.touch(); this.render() }
  private renderBF() {
    const host = this.$id('bfList'); host.innerHTML = ''
    if (this.C.bfs.length === 0) { host.innerHTML = '<p class="hint">No background factors yet. Add them in life-story order below — one Species and one Origin max.</p>'; return }
    this.C.bfs.forEach((b: any, idx: number) => {
      const card = document.createElement('div'); card.className = 'bfcard'
      const grants: string[] = []; grants.push(b.free ? 'free' : '1 slot'); if (b.grant) grants.push(`grants ${b.grant}`)
      const attrStr = Object.keys(b.attrs || {}).filter(a => b.attrs[a]).map(a => `${a}${b.attrs[a] > 0 ? '+' : ''}${b.attrs[a]}`).join(' '); if (attrStr) grants.push(attrStr)
      const skillStr = Object.keys(b.skills || {}).filter(k => b.skills[k]).map(k => `${k} ${b.skills[k]}`).join(', ')
      const fieldStr = (b.fields || []).map((f: any) => `${f.name} ${f.years}yr`).join(', ')
      let confer = ''
      if (skillStr) confer += `<div class="bfgrants">Skills: ${this.escapeHtml(skillStr)}</div>`
      if (fieldStr) confer += `<div class="bfgrants">Fields: ${this.escapeHtml(fieldStr)}</div>`
      const args = this.escapeHtml(JSON.stringify([b.uid]))
      card.innerHTML = `<div class="bfhead"><span class="ord">${idx + 1}</span>
        <span class="bfname">${this.escapeHtml(b.name)}</span><span class="badge ${b.cat.toLowerCase()}">${b.cat}</span>
        <span class="bfgrants">${grants.join(' · ') || '—'}</span><span class="spacer"></span>
        <button class="no-print" data-click="moveBF" data-args='${this.escapeHtml(JSON.stringify([b.uid, -1]))}' title="up">&#9650;</button>
        <button class="no-print" data-click="moveBF" data-args='${this.escapeHtml(JSON.stringify([b.uid, 1]))}' title="down">&#9660;</button>
        <button class="rm no-print" data-click="rmBF" data-args='${args}' title="remove">&times;</button></div>
        ${confer}
        <div class="bfgrants" style="font-style:italic">${this.escapeHtml(b.note)}</div>`
      host.appendChild(card)
    })
  }

  // ── skills ──
  private renderSkills() {
    const tb = this.$id('skillBody'); tb.innerHTML = ''
    this.SKILLNAMES.slice().sort().forEach(name => {
      const conf0 = this.conferSkill(name), lv0 = (this.C.skills[name] && this.C.skills[name].level) || 0
      if (conf0 === 0 && lv0 === 0 && !this.tagMatch(this.SKILLS[name].tags)) return
      if (!this.C.skills[name]) this.C.skills[name] = { level: 0 }
      const s = this.SKILLS[name], mx = this.maxLevel(name), conf = this.conferSkill(name), lv = this.C.skills[name].level || 0
      const has = (conf + lv) >= 1, befv = has ? s.bef : (s.bef - 2)
      const befCell = has ? `${befv}` : `<span style="color:var(--warn)">${befv}</span>`
      const nameArg = this.escapeHtml(JSON.stringify([name, 1])), nameArgD = this.escapeHtml(JSON.stringify([name, -1]))
      const tr = document.createElement('tr')
      tr.innerHTML = `<td><b>${this.escapeHtml(name)}</b></td>
        <td>${this.escapeHtml(this.fmtFormula(name))}${s.half ? ' <span class="maxnote">½</span>' : ''}${s.academic ? ' <span class="maxnote">acad</span>' : ''}</td>
        <td class="center">${s.cost}</td>
        <td class="center"><span class="lvlctl"><button class="no-print" data-click="bumpLevel" data-args='${nameArgD}'>&minus;</button><span>${conf + lv}</span><button class="no-print" data-click="bumpLevel" data-args='${nameArg}'>+</button></span><div class="maxnote no-print">max ${mx}</div></td>
        <td class="sc">${this.score(name)}</td>
        <td class="center">${befCell}</td>`
      tb.appendChild(tr)
    })
  }
  bumpLevel(name: string, d: number) { const mx = this.maxLevel(name); let lv = (this.C.skills[name].level || 0) + d; if (lv < 0) lv = 0; if (this.conferSkill(name) + lv > mx) lv = Math.max(0, mx - this.conferSkill(name)); this.C.skills[name].level = lv; this.touch(); this.render() }
  private clampSkills() { R.clampSkills(this.C, this.SKILLS as any) }

  // ── tags / fields / awards ──
  private renderTags(kind: string) {
    const host = this.$id(kind + 'Tags'); host.innerHTML = ''
    this.C[kind].forEach((t: string, i: number) => { const s = document.createElement('span'); s.className = 'tag'; s.innerHTML = `${this.escapeHtml(t)} <button class="no-print" data-click="delTag" data-args='${this.escapeHtml(JSON.stringify([kind, i]))}'>&times;</button>`; host.appendChild(s) })
    if (this.C[kind].length === 0) { const s = document.createElement('span'); s.className = 'hint'; s.textContent = '—'; host.appendChild(s) }
  }
  addTag(kind: string) { const inp = this.$id(kind + 'In'); const val = inp.value.trim(); if (!val) return; this.C[kind].push(val); inp.value = ''; this.touch(); this.renderTags(kind) }
  delTag(kind: string, i: number) { this.C[kind].splice(i, 1); this.touch(); this.renderTags(kind) }
  private renderFields() {
    const host = this.$id('fieldList'); host.innerHTML = ''
    const conf = this.conferFields()
    if (conf.length) { const h = document.createElement('div'); h.className = 'hint'; h.textContent = 'conferred (free):'; host.appendChild(h); const wrap = document.createElement('div'); wrap.className = 'tags'; conf.forEach((f: any) => { const s = document.createElement('span'); s.className = 'tag'; s.textContent = `${f.name} ${f.years}yr`; s.title = 'from ' + f.src; wrap.appendChild(s) }); host.appendChild(wrap) }
    if (this.C.field.length) { const h = document.createElement('div'); h.className = 'hint'; h.textContent = 'purchased (4 pts/yr):'; host.appendChild(h) }
    const wrap2 = document.createElement('div'); wrap2.className = 'tags'
    this.C.field.forEach((f: any, i: number) => { const s = document.createElement('span'); s.className = 'tag'; s.innerHTML = `${this.escapeHtml(f.name)} <span class="maxnote">${f.years}yr</span><button class="no-print" data-click="bumpFY" data-args='${this.escapeHtml(JSON.stringify([i, 1]))}'>+</button><button class="no-print" data-click="bumpFY" data-args='${this.escapeHtml(JSON.stringify([i, -1]))}'>&minus;</button><button class="no-print" data-click="delField" data-args='${this.escapeHtml(JSON.stringify([i]))}'>&times;</button>`; wrap2.appendChild(s) })
    host.appendChild(wrap2)
  }
  addField() { const inp = this.$id('fieldIn'); const vv = inp.value.trim(); if (!vv) return; this.C.field.push({ name: vv, years: 1 }); inp.value = ''; this.touch(); this.render() }
  bumpFY(i: number, d: number) { this.C.field[i].years = Math.max(1, (this.C.field[i].years || 1) + d); this.touch(); this.render() }
  delField(i: number) { this.C.field.splice(i, 1); this.touch(); this.render() }
  private renderAwards() { const host = this.$id('awardList'); host.innerHTML = ''; this.C.awards.forEach((a: any, i: number) => { const s = document.createElement('span'); s.className = 'tag'; s.innerHTML = `${this.escapeHtml(a.label || 'award')} <b>${(Number(a.amt) >= 0 ? '+' : '')}${Number(a.amt) || 0}</b> <button class="no-print" data-click="delAward" data-args='${this.escapeHtml(JSON.stringify([i]))}'>&times;</button>`; host.appendChild(s) }) }
  addAward() { const l = this.$id('awLabel').value.trim(); const amt = Number(this.$id('awAmt').value); if (!amt) return; this.C.awards.push({ label: l || 'award', amt }); this.$id('awLabel').value = ''; this.$id('awAmt').value = ''; this.touch(); this.render() }
  delAward(i: number) { this.C.awards.splice(i, 1); this.touch(); this.render() }
  private renderPools() { const p = this.pools(); this.$id('ptsGranted').textContent = p.granted; this.$id('ptsSpent').textContent = p.spent; this.$id('ptsAvail').textContent = p.pts; this.$id('ptsPill').className = 'pill ' + (p.pts < 0 ? 'bad' : 'ok') }
  private renderSlots() { const used = this.usedSlots(); this.$id('slotsUsed').textContent = used; this.$id('slotsBudget').textContent = this.C.slots; this.$id('f_slots').value = this.C.slots; this.$id('slotPill').className = 'pill ' + (used > this.C.slots ? 'bad' : 'ok') }
  setSlots(v: any) { this.C.slots = Math.max(0, parseInt(v) || 0); this.touch(); this.renderSlots() }

  // ── status ──
  private zeroPill(on: boolean, label: string, fn: () => void) { const s = document.createElement('div'); s.className = 'zeropill' + (on ? ' on' : ''); s.textContent = label; s.onclick = fn; return s }
  private renderStatus() {
    const w = this.$id('woundDots'); w.innerHTML = ''
    w.appendChild(this.zeroPill(this.C.wound === 0, 'Healthy', () => { this.C.wound = 0; this.touch(); this.renderStatus() }))
    for (let i = 1; i <= 8; i++) { const d = document.createElement('div'); d.className = 'dot' + (i <= this.C.wound ? ' on' : '') + (i === 8 ? ' dead' : ''); d.textContent = i === 8 ? '☠' : String(i); d.onclick = () => { this.C.wound = (this.C.wound === i ? i - 1 : i); this.touch(); this.renderStatus() }; w.appendChild(d) }
    const host = this.$id('exhTracks'); host.innerHTML = ''
    Object.keys(this.C.exh).forEach(name => {
      const t = document.createElement('div'); t.className = 'track exh'
      const z = /fatigue/i.test(name) ? 'Rested' : 'Fresh'
      const nm = document.createElement('span'); nm.className = 'nm'; nm.textContent = name
      const dots = document.createElement('div'); dots.className = 'dots'
      dots.appendChild(this.zeroPill(this.C.exh[name] === 0, z, () => { this.C.exh[name] = 0; this.touch(); this.renderStatus() }))
      for (let i = 1; i <= 5; i++) { const d = document.createElement('div'); d.className = 'dot' + (i <= this.C.exh[name] ? ' on' : ''); d.textContent = String(i); d.onclick = () => this.setExh(name, i); dots.appendChild(d) }
      const hint = document.createElement('span'); hint.className = 'hint no-print'; hint.textContent = 'full to own domain, ½ else '
      const rm = document.createElement('button'); rm.className = 'rm'; rm.textContent = '×'; rm.onclick = () => this.delExh(name); hint.appendChild(rm)
      t.appendChild(nm); t.appendChild(dots); t.appendChild(hint); host.appendChild(t)
    })
  }
  private setExh(name: string, i: number) { this.C.exh[name] = (this.C.exh[name] === i ? i - 1 : i); this.touch(); this.renderStatus() }
  addExh() { const inp = this.$id('exhIn'); const vv = inp.value.trim(); if (!vv) return; if (!this.C.exh[vv]) this.C.exh[vv] = 0; inp.value = ''; this.touch(); this.renderStatus() }
  private delExh(name: string) { delete this.C.exh[name]; this.touch(); this.renderStatus() }

  // ── identity / archetype ──
  private touch() {
    this.C.name = this.val('f_name'); this.C.age = this.val('f_age'); this.C.wealth = this.val('f_wealth'); this.C.concept = this.val('f_concept'); this.C.gear = this.val('f_gear')
    this.C.shaken = this.$id('f_shaken').checked; this.C.stunned = this.$id('f_stunned').checked
    this.$id('sideBName').textContent = this.C.name || ''; this.autosave()
  }
  applyArchetype() { const a = this.$id('f_arch').value; this.C.arch = a; if (a && ARCH[a]) { ATTRS.forEach(x => this.C.base[x] = ARCH[a][x]); this.clampSkills() } this.touch(); this.render() }

  // ── persistence ──
  private store() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') } catch (e) { return {} } }
  private setStore(o: any) { localStorage.setItem(KEY, JSON.stringify(o)) }
  private autosave() { if (this.C.name) { const o = this.store(); o[this.C.name] = this.C; this.setStore(o); this.refreshSlots() } }
  saveChar() { this.C.name = this.val('f_name').trim(); if (!this.C.name) { alert('Name the character first.'); return } const o = this.store(); o[this.C.name] = this.C; this.setStore(o); this.refreshSlots() }
  newChar() { this.C = this.blank(); this.render() }
  deleteChar() { const n = this.val('f_name').trim(); const o = this.store(); if (o[n] && confirm('Delete “' + n + '”?')) { delete o[n]; this.setStore(o); this.newChar(); this.refreshSlots() } }
  private refreshSlots() { const sel = this.$id('slotPicker'); const o = this.store(); const cur = this.C.name; sel.innerHTML = '<option value="">— saved —</option>'; Object.keys(o).sort().forEach(n => { const op = document.createElement('option'); op.value = n; op.textContent = n; if (n === cur) op.selected = true; sel.appendChild(op) }) }
  private migrate(obj: any) {
    const b = this.blank(); const m = Object.assign(b, obj); ATTRS.forEach(a => { if (m.base[a] == null) m.base[a] = 6; if (m.buyBonus[a] == null) m.buyBonus[a] = 0 })
    if (!m.exh) m.exh = { Fatigue: 0 }; if (!Array.isArray(m.field)) m.field = []; if (!Array.isArray(m.bfs)) m.bfs = []; if (!Array.isArray(m.awards)) m.awards = []
    if (m.slots == null) m.slots = 4
    if (!Array.isArray(m.activeTags)) m.activeTags = ['standard', 'modern']
    m.bfs.forEach((b2: any) => { if (b2.free == null) b2.free = false; if (b2.grant == null) b2.grant = b2.unr || 0; delete b2.unr; delete b2.res; delete b2.cost })
    m.field = m.field.map((f: any) => typeof f === 'string' ? { name: f, years: 1 } : f)
    if (m.skills) Object.keys(m.skills).forEach(k => { if (!this.SKILLS[k]) { delete m.skills[k]; return } const e = m.skills[k]; if (typeof e.level !== 'number') e.level = (typeof e.buy === 'number' ? e.buy : 0); delete e.buy; delete e.bef })
    return m
  }
  exportChar() { const name = (this.val('f_name').trim() || 'foresight-character'); const blob = new Blob([JSON.stringify(this.C, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name + '.json'; a.click() }
  triggerImport() { this.$id('importFile').click() }
  importChar(ev: any) { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { try { this.C = this.migrate(JSON.parse(r.result as string)); this.render(); this.autosave() } catch (e) { alert('Bad file.') } }; r.readAsText(f); ev.target.value = '' }
  printSheet() { window.print() }
  private escapeHtml(s: any) { return ('' + s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' } as any)[c]) }
}

if (!customElements.get('foresight-character-sheet')) customElements.define('foresight-character-sheet', ForesightCharacterSheet)

export { ForesightCharacterSheet }
