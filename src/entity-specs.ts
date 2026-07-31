// Entity-view specs — the single description of how each data collection in
// static/data/ projects into a SUMMARY (few columns, scannable) and a CARD (the
// full detail body).
//
// Imported by BOTH sides so they cannot drift:
//   - entity-views.ts (build, via site.config's `prebuild`) renders the static
//     <table> + cards that the ePub/print edition reads.
//   - bundle.ts (browser) renders the interactive summary/cards views over it.
// Therefore: pure data + pure functions only. No node, no DOM.

export interface EntityColumn {
  prop: string
  name: string
  width?: number
  align?: 'center'
}

export interface EntityField {
  label: string
  prop: string
}

export interface EntitySpec {
  /** filename under static/data/ */
  file: string
  /** singular noun, for prose ("20 skills") */
  noun: string
  /** anchor id prefix — ids are `<idPrefix>-<slug(name)>` */
  idPrefix: string
  /** the summary projection: what the table shows */
  columns: EntityColumn[]
  /** the detail body: what the card shows beyond the title */
  card: EntityField[]
  /** prop holding the long prose shown as the card's body paragraph */
  body?: string
  /** render the body with light inline markdown (**bold**, *italic*) rather than escaped */
  bodyMarkdown?: boolean
}

// The applications of a single magic Fundamental (sliced from
// magic-applications.json by entity-views.ts). Static-only — a per-fundamental
// list of ~10 is small enough that it wants no filter, so no browser side.
export const APP_SPEC: EntitySpec = {
  file: 'magic-applications.json',
  noun: 'application',
  idPrefix: 'app',
  columns: [
    { prop: 'name', name: 'Application', width: 200 },
    { prop: 'intensity', name: 'Int', width: 48, align: 'center' },
    { prop: 'code', name: '§', width: 72, align: 'center' },
  ],
  card: [
    { label: 'Intensity', prop: 'intensity' },
    { label: 'Code', prop: 'code' },
    { label: 'Source', prop: 'source' },
  ],
  body: 'desc',
  bodyMarkdown: true,
}

export const ENTITY_SPECS: Record<string, EntitySpec> = {
  // ── Equipment ────────────────────────────────────────────────────────────
  // Objects = noun + adjectives (see equipment.md). Each category is a flat
  // JSON array with a shared core (name, tl, price, weight, tags, desc, image?)
  // plus its own stats. The summary columns stay scannable; the card carries the
  // rest. `weapons`/`armor` anchor to the DC scale (fist 4, 9mm 8, 7.62 rifle 11).
  'weapons.json': {
    file: 'weapons.json',
    noun: 'weapon',
    idPrefix: 'weapon',
    columns: [
      { prop: 'name', name: 'Weapon', width: 170 },
      { prop: 'kind', name: 'Kind', width: 90 },
      { prop: 'damage', name: 'DC', width: 90, align: 'center' },
      { prop: 'range', name: 'Range', width: 110, align: 'center' },
      { prop: 'tl', name: 'TL', width: 48, align: 'center' },
      { prop: 'price', name: 'Price', width: 72, align: 'center' },
    ],
    card: [
      { label: 'Kind', prop: 'kind' },
      { label: 'PM', prop: 'pm' },
      { label: 'Damage', prop: 'damage' },
      { label: 'Range', prop: 'range' },
      { label: 'RoF', prop: 'rof' },
      { label: 'Ammo', prop: 'ammo' },
      { label: 'Weight', prop: 'weight' },
      { label: 'TL', prop: 'tl' },
      { label: 'Price', prop: 'price' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'desc',
  },
  'armor.json': {
    file: 'armor.json',
    noun: 'armor',
    idPrefix: 'armor',
    columns: [
      { prop: 'name', name: 'Armor', width: 170 },
      { prop: 'protection', name: 'Protection', width: 130, align: 'center' },
      { prop: 'penalty', name: 'Penalty', width: 100, align: 'center' },
      { prop: 'tl', name: 'TL', width: 48, align: 'center' },
      { prop: 'price', name: 'Price', width: 72, align: 'center' },
    ],
    card: [
      { label: 'Coverage', prop: 'coverage' },
      { label: 'Protection', prop: 'protection' },
      { label: 'Absorb', prop: 'absorb' },
      { label: 'Penalty', prop: 'penalty' },
      { label: 'Weight', prop: 'weight' },
      { label: 'TL', prop: 'tl' },
      { label: 'Price', prop: 'price' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'desc',
  },
  'vehicles.json': {
    file: 'vehicles.json',
    noun: 'vehicle',
    idPrefix: 'vehicle',
    columns: [
      { prop: 'name', name: 'Vehicle', width: 170 },
      { prop: 'domain', name: 'Domain', width: 84 },
      { prop: 'cruise', name: 'Cruise', width: 90, align: 'center' },
      { prop: 'max', name: 'Max', width: 80, align: 'center' },
      { prop: 'passengers', name: 'Pass.', width: 64, align: 'center' },
      { prop: 'tl', name: 'TL', width: 48, align: 'center' },
    ],
    card: [
      { label: 'Domain', prop: 'domain' },
      { label: 'Cruise', prop: 'cruise' },
      { label: 'Max', prop: 'max' },
      { label: 'Terrain', prop: 'terrain' },
      { label: 'Passengers', prop: 'passengers' },
      { label: 'Cargo', prop: 'cargo' },
      { label: 'TL', prop: 'tl' },
      { label: 'Price', prop: 'price' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'desc',
  },
  // Spacecraft ARE vehicles (equipment.md), split out because their stats and,
  // above all, their *drives* are setting-defining. Sample fleets are tagged by
  // `setting` so a table can show one world's ships at a time.
  'spacecraft.json': {
    file: 'spacecraft.json',
    noun: 'spacecraft',
    idPrefix: 'craft',
    columns: [
      { prop: 'name', name: 'Craft', width: 180 },
      { prop: 'setting', name: 'Setting', width: 130 },
      { prop: 'class', name: 'Class', width: 120 },
      { prop: 'drive', name: 'Drive', width: 150 },
      { prop: 'crew', name: 'Crew', width: 72, align: 'center' },
    ],
    card: [
      { label: 'Setting', prop: 'setting' },
      { label: 'Class', prop: 'class' },
      { label: 'Drive', prop: 'drive' },
      { label: 'Sublight', prop: 'sublight' },
      { label: 'FTL', prop: 'ftl' },
      { label: 'Crew', prop: 'crew' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'desc',
  },
  'tools.json': {
    file: 'tools.json',
    noun: 'tool',
    idPrefix: 'tool',
    columns: [
      { prop: 'name', name: 'Item', width: 170 },
      { prop: 'aids', name: 'Helps with', width: 200 },
      { prop: 'pm', name: 'PM', width: 60, align: 'center' },
      { prop: 'tl', name: 'TL', width: 48, align: 'center' },
      { prop: 'price', name: 'Price', width: 72, align: 'center' },
    ],
    card: [
      { label: 'Helps with', prop: 'aids' },
      { label: 'PM', prop: 'pm' },
      { label: 'Weight', prop: 'weight' },
      { label: 'TL', prop: 'tl' },
      { label: 'Price', prop: 'price' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'desc',
  },
  'skills.json': {
    file: 'skills.json',
    noun: 'skill',
    idPrefix: 'skill',
    columns: [
      { prop: 'name', name: 'Skill', width: 150 },
      { prop: 'formula', name: 'Formula', width: 120 },
      { prop: 'cost', name: 'Cost', width: 64, align: 'center' },
      { prop: 'limit', name: 'Limit', width: 64, align: 'center' },
      { prop: 'bef', name: 'BEF', width: 56, align: 'center' },
      { prop: 'covers', name: 'Covers', width: 440 },
    ],
    card: [
      { label: 'Formula', prop: 'formula' },
      { label: 'Attributes', prop: 'attributes' },
      { label: 'Cost', prop: 'cost' },
      { label: 'Limit', prop: 'limit' },
      { label: 'BEF', prop: 'bef' },
      { label: 'Tags', prop: 'tags' },
    ],
    body: 'covers',
  },
}

// The equipment collections, in the order the "Find Equipment" index lists
// them. `page` is the rules-page slug that hosts that collection's cards, so the
// finder can link each item to its detail card (`/${page}/#${idPrefix}-${slug}`).
export const EQUIPMENT_COLLECTIONS: { file: string; category: string; page: string }[] = [
  { file: 'weapons.json', category: 'Weapon', page: 'weapons' },
  { file: 'armor.json', category: 'Armor', page: 'armor' },
  { file: 'vehicles.json', category: 'Vehicle', page: 'vehicles' },
  { file: 'spacecraft.json', category: 'Spacecraft', page: 'spacecraft' },
  { file: 'tools.json', category: 'Gear', page: 'tools' },
]

// ── Matrix (cross-tab) specs ────────────────────────────────────────────────
// A reference matrix — rows × columns of cells, with a spanning header over each
// axis. Markdown tables can't express the grouped "Defence →" / "Attack ↓"
// headers, so the build emits a real <table> with colspan/rowspan. Static only
// (a lookup table needs no interactivity), so — unlike EntitySpec — there's no
// browser side; entity-views.ts renders it and that HTML is what ships.

export interface MatrixSpec {
  /** spanning label down the left, over the rows (e.g. "Attack ↓") */
  rowAxis: string
  /** spanning label across the top, over the columns (e.g. "Defence →") */
  colAxis: string
  /** column headers */
  cols: string[]
  /** one per row: its header cell + its data cells (same length as `cols`) */
  rows: { head: string; cells: string[] }[]
  /** cell values that should render muted/de-emphasised (e.g. "blocked") */
  muted?: string[]
}

export const MATRIX_SPECS: Record<string, MatrixSpec> = {
  // The melee attack × defence outcome grid (see melee-combat.md). Cells are the
  // attack's *effective* QR after the defence eats into it.
  'melee-blocking': {
    rowAxis: 'Attack ↓',
    colAxis: 'Defence →',
    cols: ['QR1', 'QR2', 'QR3', 'QR4', 'QR7 fail', 'QR10 botch'],
    rows: [
      { head: 'QR1', cells: ['blocked', 'QR4', 'QR3', 'QR2', 'QR1', 'QR1'] },
      { head: 'QR2', cells: ['blocked', 'blocked', 'QR4', 'QR3', 'QR2', 'QR1'] },
      { head: 'QR3', cells: ['blocked', 'blocked', 'blocked', 'QR4', 'QR3', 'QR2'] },
      { head: 'QR4', cells: ['blocked', 'blocked', 'blocked', 'blocked', 'QR4', 'QR3'] },
    ],
    muted: ['blocked'],
  },
}

/** Render any JSON scalar/array cell as plain text. */
export function fmt(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—'
  if (typeof value === 'boolean') return value ? 'yes' : 'no'
  return String(value)
}

/** Stable anchor slug. Must agree between build and browser. */
export function slug(name: string): string {
  return String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const ALL_TAGS = ['standard', 'ancient', 'modern', 'sf', 'fantasy']
