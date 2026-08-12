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
  // ── 1986 restoration tables ──────────────────────────────────────────────
  // The original ForeSight Master Weapon Chart (p.51), reconstructed from the
  // pixel-art table into structured data so it's filterable + card-backed (and
  // correctable). Columns: PM · Ammo · RoF · DC · short/long range · Con · Draw ·
  // Reload · Jam · melee Close/Reach/Long-reach (PM/DC) · Wgt · Use · TL · Cost.
  '1986-weapons.json': {
    file: '1986-weapons.json',
    noun: 'weapon',
    idPrefix: 'w86',
    columns: [
      { prop: 'name', name: 'Weapon', width: 180 },
      { prop: 'dc', name: 'DC', width: 70, align: 'center' },
      { prop: 'long', name: 'Long Rng', width: 100, align: 'center' },
      { prop: 'use', name: 'Use', width: 56, align: 'center' },
      { prop: 'tl', name: 'TL', width: 44, align: 'center' },
      { prop: 'cost', name: 'Cost', width: 64, align: 'center' },
    ],
    card: [
      { label: 'PM', prop: 'pm' },
      { label: 'Ammo', prop: 'ammo' },
      { label: 'RoF', prop: 'rof' },
      { label: 'DC', prop: 'dc' },
      { label: 'Short range', prop: 'short' },
      { label: 'Long range', prop: 'long' },
      { label: 'Concealment', prop: 'con' },
      { label: 'Draw', prop: 'draw' },
      { label: 'Reload', prop: 'reload' },
      { label: 'Jam', prop: 'jam' },
      { label: 'Close PM/DC', prop: 'mClose' },
      { label: 'Reach PM/DC', prop: 'mReach' },
      { label: 'Long-reach PM/DC', prop: 'mLong' },
      { label: 'Recoil', prop: 'recoil' },
      { label: 'Weight', prop: 'weight' },
      { label: 'Use', prop: 'use' },
      { label: 'TL', prop: 'tl' },
      { label: 'Cost', prop: 'cost' },
    ],
  },
  // The original Vehicle Modification Table (p.109) — adjectives on a base
  // vehicle. Pur/Man/Red are ease-factor deltas; Speed/DT/Cargo/Pass/Cost are
  // multipliers; Size shifts the size class.
  '1986-vehicle-mods.json': {
    file: '1986-vehicle-mods.json',
    noun: 'modification',
    idPrefix: 'vmod86',
    columns: [
      { prop: 'name', name: 'Modification', width: 180 },
      { prop: 'pur', name: 'Pur', width: 52, align: 'center' },
      { prop: 'man', name: 'Man', width: 52, align: 'center' },
      { prop: 'red', name: 'Red', width: 52, align: 'center' },
      { prop: 'speed', name: 'Speed', width: 64, align: 'center' },
      { prop: 'cost', name: 'Cost', width: 64, align: 'center' },
    ],
    card: [
      { label: 'Pursuit', prop: 'pur' },
      { label: 'Maneuver', prop: 'man' },
      { label: 'Redline', prop: 'red' },
      { label: 'Speed', prop: 'speed' },
      { label: 'Damage Track', prop: 'dt' },
      { label: 'Cargo', prop: 'cargo' },
      { label: 'Passengers', prop: 'pass' },
      { label: 'Cost', prop: 'cost' },
      { label: 'Size', prop: 'size' },
    ],
  },
  // The original Weapon Modification Table (p.110) — adjectives on a base weapon.
  // Recoil/PM/DC/Draw/Con/Jam are deltas; Ammo/Ranges/Mass/Cost are multipliers.
  // Quality (†): one value improved, another worsened (purchaser's choice).
  '1986-weapon-mods.json': {
    file: '1986-weapon-mods.json',
    noun: 'modification',
    idPrefix: 'wmod86',
    columns: [
      { prop: 'name', name: 'Modification', width: 180 },
      { prop: 'recoil', name: 'Recoil', width: 60, align: 'center' },
      { prop: 'pm', name: 'PM', width: 48, align: 'center' },
      { prop: 'dc', name: 'DC', width: 48, align: 'center' },
      { prop: 'con', name: 'Con', width: 52, align: 'center' },
      { prop: 'cost', name: 'Cost', width: 60, align: 'center' },
    ],
    card: [
      { label: 'Recoil', prop: 'recoil' },
      { label: 'PM', prop: 'pm' },
      { label: 'DC', prop: 'dc' },
      { label: 'Ammo', prop: 'ammo' },
      { label: 'Ranges', prop: 'ranges' },
      { label: 'Draw', prop: 'draw' },
      { label: 'Concealment', prop: 'con' },
      { label: 'Jam', prop: 'jam' },
      { label: 'Mass', prop: 'mass' },
      { label: 'Cost', prop: 'cost' },
    ],
  },
  // The original Vehicle Table (p.58): every sample vehicle. PUR (pursuit), MAN
  // (maneuver), RED (redline) are ease-factor ratings; CRUISE/MAX in km/h; CLG =
  // ceiling (or dive depth for subs); DT = damage track; SIZ = size class; CGO =
  // cargo (kg), PAS = passengers. Multi-mode vehicles note alternate modes.
  '1986-vehicles.json': {
    file: '1986-vehicles.json',
    noun: 'vehicle',
    idPrefix: 'veh86',
    columns: [
      { prop: 'name', name: 'Vehicle', width: 170 },
      { prop: 'group', name: 'Class', width: 96 },
      { prop: 'tl', name: 'TL', width: 44, align: 'center' },
      { prop: 'cruise', name: 'Cruise', width: 72, align: 'center' },
      { prop: 'max', name: 'Max', width: 64, align: 'center' },
      { prop: 'type', name: 'Type', width: 64, align: 'center' },
    ],
    card: [
      { label: 'Class', prop: 'group' },
      { label: 'Cost', prop: 'cost' },
      { label: 'TL', prop: 'tl' },
      { label: 'Pursuit', prop: 'pur' },
      { label: 'Maneuver', prop: 'man' },
      { label: 'Redline', prop: 'red' },
      { label: 'Cruise', prop: 'cruise' },
      { label: 'Max', prop: 'max' },
      { label: 'Ceiling', prop: 'clg' },
      { label: 'DT', prop: 'dt' },
      { label: 'Size', prop: 'siz' },
      { label: 'Type', prop: 'type' },
      { label: 'Cargo', prop: 'cargo' },
      { label: 'Passengers', prop: 'pass' },
    ],
    body: 'notes',
  },
  // The original Armour Protection table (p.53). Protection by damage type —
  // M(elee), I(mpact/stun), B(eam) — where an `A`/`AA` suffix marks the armour's
  // absorb rating. Spd = speed loss per limb, Con = concealability, Vis = the
  // Search/Scan modifier under a helm. Mass/Cost are per location.
  '1986-armour.json': {
    file: '1986-armour.json',
    noun: 'armour',
    idPrefix: 'arm86',
    columns: [
      { prop: 'name', name: 'Armour', width: 150 },
      { prop: 'm', name: 'M', width: 48, align: 'center' },
      { prop: 'i', name: 'I', width: 48, align: 'center' },
      { prop: 'b', name: 'B', width: 48, align: 'center' },
      { prop: 'tl', name: 'TL', width: 44, align: 'center' },
      { prop: 'cost', name: 'Cost', width: 60, align: 'center' },
    ],
    card: [
      { label: 'Melee', prop: 'm' },
      { label: 'Impact', prop: 'i' },
      { label: 'Beam', prop: 'b' },
      { label: 'Speed', prop: 'spd' },
      { label: 'Concealability', prop: 'con' },
      { label: 'Vision', prop: 'vis' },
      { label: 'Mass', prop: 'mass' },
      { label: 'TL', prop: 'tl' },
      { label: 'Cost', prop: 'cost' },
    ],
  },
  // The original Exoskeletons table (p.53) — powered frames for heavy armour.
  // SL = min EVA skill level; Mv = move multiplier; DC/ST = melee/strength bonus;
  // Pow = combat-turns of power (∞ = reactor-fed).
  '1986-exoskeletons.json': {
    file: '1986-exoskeletons.json',
    noun: 'exoskeleton',
    idPrefix: 'exo86',
    columns: [
      { prop: 'name', name: 'Exoskeleton', width: 160 },
      { prop: 'dc', name: 'DC', width: 48, align: 'center' },
      { prop: 'st', name: 'ST', width: 48, align: 'center' },
      { prop: 'mass', name: 'Mass', width: 56, align: 'center' },
      { prop: 'tl', name: 'TL', width: 44, align: 'center' },
      { prop: 'cost', name: 'Cost', width: 60, align: 'center' },
    ],
    card: [
      { label: 'EVA SL', prop: 'sl' },
      { label: 'Move', prop: 'mv' },
      { label: 'DC bonus', prop: 'dc' },
      { label: 'ST bonus', prop: 'st' },
      { label: 'Power', prop: 'pow' },
      { label: 'Mass', prop: 'mass' },
      { label: 'TL', prop: 'tl' },
      { label: 'Cost', prop: 'cost' },
    ],
  },
  // The original Environment Suits table (p.54) — breathing/NBC/thermal/vacuum
  // gear. Spd adds to armour speed; Vis is cumulative with armour vision; End is
  // how long protection lasts; Ext is the mass to extend End by the time shown.
  '1986-environment-suits.json': {
    file: '1986-environment-suits.json',
    noun: 'suit',
    idPrefix: 'esuit86',
    columns: [
      { prop: 'name', name: 'Suit', width: 150 },
      { prop: 'end', name: 'Endurance', width: 80, align: 'center' },
      { prop: 'mass', name: 'Mass', width: 60, align: 'center' },
      { prop: 'tl', name: 'TL', width: 44, align: 'center' },
      { prop: 'cost', name: 'Cost', width: 60, align: 'center' },
    ],
    card: [
      { label: 'Speed', prop: 'spd' },
      { label: 'Vision', prop: 'vis' },
      { label: 'Endurance', prop: 'end' },
      { label: 'Extension', prop: 'ext' },
      { label: 'Mass', prop: 'mass' },
      { label: 'TL', prop: 'tl' },
      { label: 'Cost', prop: 'cost' },
    ],
  },
  // Ch'i extraordinary feats — the "outer way": what a skill taken twice unlocks.
  // `home` is the modern skill or attribute the feat hangs off (the 2004 source
  // used skills this edition merged away — see each feat's note).
  'chi-feats.json': {
    file: 'chi-feats.json',
    noun: 'feat',
    idPrefix: 'feat',
    columns: [
      { prop: 'name', name: 'Feat', width: 170 },
      { prop: 'home', name: 'Through', width: 200 },
      { prop: 'path', name: 'Path', width: 90, align: 'center' },
    ],
    card: [
      { label: 'Through', prop: 'home' },
      { label: 'Path', prop: 'path' },
      { label: 'Note', prop: 'note' },
    ],
    body: 'effect',
  },
  // Ch'i orb structures — the vocabulary a Ch'i weaver forms gathered energy
  // into. `E` in the text is the energy woven into the orb. `path` records which
  // spiritual path forms that structure more easily (+2); unresolved for now —
  // the assignment table didn't survive extraction (see REVIEW).
  'chi-orbs.json': {
    file: 'chi-orbs.json',
    noun: 'orb structure',
    idPrefix: 'orb',
    columns: [
      { prop: 'name', name: 'Structure', width: 120 },
      { prop: 'forms', name: 'Forms', width: 230 },
      { prop: 'path', name: 'Path', width: 90, align: 'center' },
    ],
    card: [
      { label: 'Forms', prop: 'forms' },
      { label: 'Preferred path', prop: 'path' },
      { label: 'Infused', prop: 'infused' },
    ],
    body: 'effect',
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
  // The original 1986 Damage Table (p.49): Quality Rating × Damage Class → the
  // Damage Result. `S` = target must make a Pain Resistance roll or be stunned;
  // a number = that increase in wound level (and a PR roll). `—` = no effect
  // (QR4 at DC0). DAMAGE = DC × (yield% for QR)/2, rounded; a zero becomes `S`.
  '1986-damage-table': {
    rowAxis: 'QR ↓',
    colAxis: 'Damage Class (DC) →',
    cols: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'],
    rows: [
      { head: 'QR4', cells: ['—', 'S', 'S', '1', '1', '1', '1', '2', '2', '2', '2', '2', '3', '3'] },
      { head: 'QR3', cells: ['S', 'S', 'S', '1', '1', '1', '2', '2', '3', '3', '3', '4', '4', '4'] },
      { head: 'QR2', cells: ['S', 'S', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '5', '6'] },
      { head: 'QR1', cells: ['S', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7'] },
    ],
    muted: ['S', '—'],
  },
  // The original Damage Track Table (p.109): Damage Track (DT) × wound/damage
  // status → the damage-point threshold at which that status is reached. `S` =
  // stun-check only; a blank = that DT skips that status; `Inc[4]`/`Inc[5]` are
  // Part-Destroyed / Destroyed for equipment. To extend past DT 11, alternately
  // add the two modifier rows noted on the page.
  '1986-damage-track': {
    rowAxis: 'DT ↓',
    colAxis: 'Wound (Damage) Status →',
    cols: ['Okay', 'Light', 'Medium', 'Heavy', 'Inc[4] Part', 'Inc[5] Dstr', 'Dead'],
    rows: [
      { head: 'A (0.05)', cells: ['0', '', '', '', '', '', 'S'] },
      { head: 'B (0.1)', cells: ['0', '', 'S', '', '', '', '1'] },
      { head: 'C (0.2)', cells: ['0', '', 'S', '', '1', '', '2'] },
      { head: 'D (0.4)', cells: ['0', 'S', '', '1', '2', '', '3'] },
      { head: 'E (0.6)', cells: ['0', 'S', '1', '2', '3', '', '4'] },
      { head: 'F (0.8)', cells: ['0', '1', '2', '3', '4', '', '5'] },
      { head: '1', cells: ['S', '1', '2', '3', '4', '5', '6'] },
      { head: '2', cells: ['1', '2', '4', '5', '7', '8', '9'] },
      { head: '3', cells: ['1', '3', '5', '7', '9', '11', '12'] },
      { head: '4', cells: ['2', '4', '7', '9', '12', '14', '15'] },
      { head: '5', cells: ['2', '5', '8', '11', '14', '17', '18'] },
      { head: '6', cells: ['3', '6', '10', '13', '17', '20', '21'] },
      { head: '7', cells: ['3', '7', '11', '15', '19', '23', '24'] },
      { head: '8', cells: ['4', '8', '13', '17', '22', '26', '27'] },
      { head: '9', cells: ['4', '9', '14', '19', '24', '29', '30'] },
      { head: '10', cells: ['5', '10', '16', '21', '27', '32', '33'] },
      { head: '11', cells: ['5', '11', '17', '23', '29', '35', '36'] },
    ],
    muted: ['S', ''],
  },
  // The original Burn Damage Class Table (p.110): example sources of burn/energy
  // damage across categories, by Damage Class. DC is per location per pulse;
  // brief exposure or small contact area reduces DC by 1–2.
  '1986-burn-dc': {
    rowAxis: 'DC ↓',
    colAxis: 'Source type →',
    cols: ['Flame', 'Hot Object', 'Corrosive', 'Cold Object', 'Electricity'],
    rows: [
      { head: 'DC 1', cells: ['Campfire', 'Boiling Water', 'HCl', 'Dry Ice', 'Appliance'] },
      { head: 'DC 3', cells: ['Blowtorch', 'Hot Metal', 'Conc. HCl', 'Liquid Air', 'Mains'] },
      { head: 'DC 5', cells: ['Cutting Torch', 'Molten Metal', 'Hot H₂SO₄', 'Cryogenics', 'Heavy Duty'] },
    ],
  },
  // The original Terrain Value Chart (p.58): terrain Contour × terrain Feature →
  // the terrain value that divides a vehicle's speed (Modified Terrain Value / 2).
  // Higher = harder going. (Suburban/Urban features extend this — see the page.)
  // The original Incident Radiation Table (p.75 / §703) — the star's spectral
  // class × the radiation Result, giving the D10 roll needed for that result.
  // This is the table the 1987 errata corrected (a displaced bottom row); this
  // printing already shows it correct. Modifiers are noted on the page.
  // The original Finding Cover Before Combat table (p.43): terrain value × the
  // Quality Rating of a Scan roll → the cover a character reaches. A `*` means
  // the character ends up adjacent to (not in) such a hex. Suburban/Urban get a
  // higher row for the ready cover there. A character may take any worse result.
  '1986-finding-cover': {
    rowAxis: 'Terrain Value ↓',
    colAxis: 'Quality Rating of Scan roll →',
    cols: ['QR1', 'QR2', 'QR3', 'QR4'],
    rows: [
      { head: '0, 1', cells: ['½ cover', '*½ cover', '—', '—'] },
      { head: '2, 3', cells: ['*¾ cover', '½ cover', '*½ cover', '—'] },
      { head: '4, 5, SU', cells: ['¾ cover', '½ cover', '*¾ cover', '*½ cover'] },
      { head: '6+, UR', cells: ['*blocked', '¾ cover', '½ cover', '*¾ cover'] },
    ],
    muted: ['—'],
  },
  '1986-incident-radiation': {
    rowAxis: 'Result ↓',
    colAxis: 'Star spectral class →',
    cols: ['A0–4', 'A5–9', 'F0–4', 'F5–9', 'G0–4', 'G5–9', 'K, M, S'],
    rows: [
      { head: 'Benign', cells: ['≤1', '≤2', '≤2', '≤3', '≤4', '≤5', '≤8'] },
      { head: 'Harmful *', cells: ['2–3', '3–4', '3–5', '4–6', '5–7', '6–9', '≥9'] },
      { head: 'Dangerous **', cells: ['4–5', '5–7', '6–8', '7–8', '8–9', '10–11', '—'] },
      { head: 'Inimical', cells: ['≥6', '≥8', '≥9', '≥9', '≥10', '≥12', '—'] },
    ],
    muted: ['—'],
  },
  '1986-terrain': {
    rowAxis: 'Contour ↓',
    colAxis: 'Terrain Feature →',
    cols: ['Barren [BN]', 'Lt.Veg [LV]', 'Md.Veg [MV]', 'Hv.Veg [HV]', 'Marsh [MA]', 'Ice [IC]'],
    rows: [
      { head: 'Broken [BR]', cells: ['3', '4', '5', '8', '—', '5'] },
      { head: 'Uneven [UN]', cells: ['1', '2', '3', '6', '3', '3'] },
      { head: 'Flat [FL]', cells: ['1', '1', '2', '4', '2', '2'] },
    ],
    muted: ['—'],
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
