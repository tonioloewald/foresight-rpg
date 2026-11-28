// Generate the fourteen character templates the rules promise.
//
// creating-characters.md step 1 is "pick a template" and names fourteen of
// them; none existed (board #4267). These are built HERE rather than typed by
// hand so the point economy is *checked* rather than asserted: every template
// is run through the live rules module and rejected if it overspends points,
// overruns its slot budget, breaks a skill's level cap, or leaves the human
// attribute range.
//
//   bun run scripts/build-templates.ts
//
// Output: static/data/templates.json — an array of Characters. The builder
// loads it for its "template…" picker, and the same file imports directly.

import * as R from '../src/character-rules'

type Raw = { name: string; formula?: string; limit?: any; cost?: any; bef?: any }

const read = async (f: string) => JSON.parse(await Bun.file(`static/data/${f}.json`).text())
const skillsRaw: Raw[] = await read('skills')
const bfsRaw: any[] = await read('background-factors')
const fieldsRaw: any[] = await read('fields')

// Mirror the sheet's own SkillDef construction (character-sheet.ts loadData).
const SKILLS: Record<string, R.SkillDef> = {}
for (const s of skillsRaw) {
  const attrs = String(s.formula || '')
    .replace(/[()/\d.]/g, ' ')
    .split(/[^A-Z]+/)
    .filter((t) => (R.ATTRS as readonly string[]).includes(t))
  SKILLS[s.name] = {
    ...(s as any),
    a: attrs.length ? attrs : ['CO'],
    half: Number(s.limit) > 1,
    limit: Number(s.limit) || 1,
    cost: Number(s.cost) || 1,
  } as R.SkillDef
}
const SKILLNAMES = Object.keys(SKILLS)
const BF = Object.fromEntries(bfsRaw.map((b) => [b.name, b]))
const FIELD = Object.fromEntries(fieldsRaw.map((f) => [f.name, f]))

interface Spec {
  name: string
  concept: string
  attrs: [number, number, number, number, number] // ST CO IN PC WP — 40 total, each 6–10
  bfs: string[]
  skills?: Record<string, number>
  fields?: [string, number][]
  /** Priority order for spending whatever the factors left over. Walked round
   *  and round, buying ONE unit at a time — a skill level, a field year, an
   *  attribute point — until nothing on the list is affordable. Keeps every
   *  template fully spent without hand-balancing fourteen of them. */
  spend?: (string | [string, number])[]
  ltf?: string[]
  quirk?: string[]
  gear?: string
  tags?: string[]
}

// Each archetype spends 40 attribute points, every attribute 6–10 (playtest
// pack). Skills listed are LEVELS BOUGHT on top of whatever the factors confer.
const SPECS: Spec[] = [
  {
    name: 'Detective',
    concept: 'Ex-police, now private. Reads people and rooms; the gun is a last resort.',
    attrs: [7, 7, 9, 10, 7],
    bfs: ['Human', 'Active Duty', 'Field Experience', 'Gifted'],
    skills: { Search: 3, Charm: 1 },
    spend: ['Search', 'PC', ['Law', 3], 'Charm', 'Stealth', ['Psychology', 2], 'IN'],
    fields: [['Law', 2]],
    ltf: ['Interviews', 'This city'],
    quirk: ['Doesn’t let go'],
    gear: 'Revolver, notebook, a coat with deep pockets, a car that starts most mornings.',
  },
  {
    name: 'Journalist',
    concept: 'Gets people to say the thing they meant not to say, then checks it.',
    attrs: [6, 7, 9, 10, 8],
    bfs: ['Human', 'Tertiary Education', 'Office Experience', 'Mooch'],
    skills: { Search: 2, Charm: 2 },
    spend: ['Charm', 'Search', ['Politics', 3], 'Confidence', ['Law', 2], 'PC', 'Perform'],
    fields: [['Politics', 2]],
    ltf: ['Sourcing', 'Public records'],
    quirk: ['Incurably nosy'],
    gear: 'Phone, recorder, press card, a list of numbers nobody else has.',
  },
  {
    name: 'Soldier',
    concept: 'Trained, drilled and shot at. Works as part of a unit by reflex.',
    attrs: [9, 9, 7, 7, 8],
    bfs: ['Human', 'Trained from Childhood', 'Active Duty', 'Natural Athlete'],
    skills: {},
    spend: ['Firearms', 'Athletics', 'Melee', ['Tactics', 3], 'ST', 'Heavy Weapons', 'Stealth'],
    fields: [],
    ltf: ['Section tactics', 'Your service rifle'],
    quirk: ['Sleeps anywhere'],
    gear: 'Assault rifle, tactical armor, helmet, webbing, two days of rations.',
  },
  {
    name: 'Athlete',
    concept: 'A body trained to one standard and kept there. Fast, strong, hard to stop.',
    attrs: [9, 10, 6, 7, 8],
    bfs: ['Human', 'Intense Training', 'Natural Athlete', 'Superior Specimen'],
    skills: { Athletics: 4 },
    spend: ['Athletics', 'CO', 'ST', 'Melee', ['Unarmed Combat', 1], 'Initiative'],
    fields: [],
    ltf: ['Your event', 'Reading a crowd'],
    quirk: ['Deep reserves'],
    gear: 'Kit bag, strapping tape, the shoes that fit.',
  },
  {
    name: 'Explorer',
    concept: 'Goes where maps stop and comes back with the map.',
    attrs: [8, 8, 8, 8, 8],
    bfs: ['Human', 'Abandoned & Self-Sufficient', 'Field Experience', 'Natural Athlete'],
    skills: {},
    spend: ['Athletics', ['Survival', 4], 'Search', 'Boats', ['Geology', 2], 'ST', 'Riding'],
    fields: [['Survival', 2], ['Lore', 1]],
    ltf: ['Cold country', 'Small boats'],
    quirk: ['Never panics'],
    gear: 'Pack, rope, knife, compass, a coat that has been repaired more than once.',
  },
  {
    name: 'Spy',
    concept: 'Two jobs, one of them real. Competent at both and never conspicuous.',
    attrs: [7, 9, 8, 9, 7],
    bfs: ['Human', 'Active Duty', 'Field Experience', 'Tertiary Education'],
    skills: { Stealth: 2, Charm: 2 },
    spend: ['Stealth', 'Charm', 'Firearms', ['Etiquette', 2], 'Sleight of Hand', 'CO', ['Politics', 2]],
    fields: [],
    ltf: ['Cover identities', 'Surveillance'],
    quirk: ['Forgettable face'],
    gear: 'Pistol, a passport in the wrong name, a phone that is two phones.',
  },
  {
    name: 'Scholar',
    concept: 'Knows a great deal about something, and how to find out the rest.',
    attrs: [6, 6, 10, 9, 9],
    bfs: ['Human', 'Tertiary Education', 'Office Experience', 'Gifted'],
    skills: { Theory: 3 },
    spend: [['History', 4], 'Theory', ['Lore', 3], 'IN', ['Mathematics', 3], 'Search'],
    fields: [['History', 3]],
    ltf: ['Your period', 'Archives'],
    quirk: ['Pedant'],
    gear: 'Laptop, reading glasses, a bag that is mostly books.',
  },
  {
    name: 'Thief',
    concept: 'In, out, and nobody is certain anything happened.',
    attrs: [6, 10, 8, 9, 7],
    bfs: ['Human', 'Abandoned & Self-Sufficient', 'School of Hard Knocks', 'Intense Training'],
    skills: { 'Sleight of Hand': 3, Stealth: 2 },
    spend: ['Stealth', 'Sleight of Hand', 'CO', 'Search', 'Athletics', ['Trades', 1], 'Cars'],
    fields: [],
    ltf: ['Locks', 'Rooftops'],
    quirk: ['Light sleeper'],
    gear: 'Picks, gloves, a bag that folds flat, soft shoes.',
  },
  {
    name: 'Assassin',
    concept: 'Patient, prepared and unhurried. The violence is the short part.',
    attrs: [7, 10, 8, 8, 7],
    bfs: ['Human', 'Trained from Childhood', 'Field Experience', 'Trauma Survivor'],
    skills: { Stealth: 3, Firearms: 1 },
    spend: ['Stealth', 'Melee', 'Firearms', 'CO', ['Lethal', 2], 'Search'],
    fields: [],
    ltf: ['Approach work', 'Blades'],
    quirk: ['Very still'],
    gear: 'Knife, a suppressed pistol kept elsewhere, ordinary clothes.',
  },
  {
    name: 'Driver',
    concept: 'Gets the car, the people and the plan out the other side.',
    attrs: [7, 10, 7, 9, 7],
    bfs: ['Human', 'Apprentice', 'Field Experience', 'School of Hard Knocks'],
    skills: { Cars: 4, Bikes: 2 },
    spend: ['Cars', 'CO', 'Bikes', 'Repair', ['Trades', 2], 'Boats', 'Aircraft'],
    fields: [],
    ltf: ['This city’s streets', 'Pursuit driving'],
    quirk: ['Calm at speed'],
    gear: 'Something unremarkable with a rebuilt engine; a second set of plates.',
  },
  {
    name: 'Tech',
    concept: 'Makes the thing work, or makes it stop working, usually from a van.',
    attrs: [6, 8, 10, 8, 8],
    bfs: ['Human', 'Apprentice', 'Tertiary Education', 'Office Experience'],
    skills: { Repair: 2, Theory: 1 },
    spend: ['Repair', ['Computers', 3], 'Theory', ['Electronics', 3], 'IN', 'Search'],
    fields: [['Computers', 2]],
    ltf: ['Soldering', 'Access control'],
    quirk: ['Reads manuals for pleasure'],
    gear: 'Toolkit, laptop, a box of adapters, cable ties.',
  },
  {
    name: 'Doctor',
    concept: 'Keeps people alive under conditions nobody trained for.',
    attrs: [6, 8, 10, 9, 7],
    bfs: ['Human', 'Tertiary Education', 'Office Experience', 'Gifted'],
    skills: {},
    spend: [['Medicine', 3], ['First Aid', 1], 'Theory', ['Emergency Medicine', 2], 'IN', 'Search', 'Charm'],
    fields: [['Medicine', 3], ['First Aid', 1]],
    ltf: ['Trauma', 'Triage'],
    quirk: ['Unshockable'],
    gear: 'Trauma kit, gloves, a torch held in the teeth.',
  },
  {
    name: 'Con-Artist',
    concept: 'Sells the mark the story the mark already wanted to believe.',
    attrs: [6, 7, 9, 10, 8],
    bfs: ['Human', 'Privileged Childhood', 'Mooch', 'Artistic'],
    skills: { Charm: 2, Confidence: 2, Perform: 1 },
    spend: ['Charm', 'Confidence', 'Perform', 'PC', 'Sleight of Hand', ['Psychology', 2]],
    fields: [],
    ltf: ['Long cons', 'Reading a mark'],
    quirk: ['Never breaks character'],
    gear: 'A good suit, business cards for three businesses, a cheap phone.',
  },
  {
    name: 'Martial Artist',
    concept: 'A lifetime in one discipline. Unarmed is not a fallback.',
    attrs: [8, 10, 7, 8, 7],
    bfs: ['Human', 'Trained from Childhood', 'Intense Training', 'Natural Athlete'],
    skills: { Athletics: 2 },
    spend: ['Melee', 'Athletics', ['Unarmed Combat', 1], ['Throws', 2], ['Wrestling', 2], 'CO', ['Defense', 2]],
    fields: [],
    ltf: ['Your style', 'Breaking a grapple'],
    quirk: ['Never starts it'],
    gear: 'Training gear, hand wraps, nothing you could be charged for.',
  },
]

// ── build ───────────────────────────────────────────────────────────────────

function build(spec: Spec): R.Character {
  const c = R.blankCharacter()
  c.name = spec.name
  c.concept = spec.concept
  c.arch = ''
  c.activeTags = spec.tags ?? ['standard', 'modern']
  R.ATTRS.forEach((a, i) => (c.base[a] = spec.attrs[i]))
  let uid = 1
  for (const n of spec.bfs) {
    const def = BF[n]
    if (!def) throw new Error(`${spec.name}: no such background factor "${n}"`)
    c.bfs.push({ ...def, cat: def.category, uid: 'b' + uid++ })
  }
  for (const [s, lv] of Object.entries(spec.skills ?? {})) {
    if (!SKILLS[s]) throw new Error(`${spec.name}: no such skill "${s}"`)
    c.skills[s] = { level: lv }
  }
  for (const [f, y] of spec.fields ?? []) {
    if (!FIELD[f]) throw new Error(`${spec.name}: no such field "${f}"`)
    c.field.push({ name: f, years: y })
  }
  c.ltf = spec.ltf ?? []
  c.quirk = spec.quirk ?? []
  c.gear = spec.gear ?? ''
  return c
}

/** Spend the leftover points down the template's priority list. */
function autoSpend(c: R.Character, spec: Spec) {
  const list = spec.spend ?? []
  if (!list.length) return
  let progress = true
  while (progress) {
    progress = false
    for (const item of list) {
      const before = R.pools(c, SKILLS, SKILLNAMES).pts
      if (before <= 0) return
      if (Array.isArray(item)) {
        // a field, up to the stated number of years
        const [name, maxYears] = item
        const cur = c.field.find((f) => f.name === name)
        if ((cur?.years ?? 0) >= maxYears) continue
        if (cur) cur.years++
        else c.field.push({ name, years: 1 })
      } else if ((R.ATTRS as readonly string[]).includes(item)) {
        // stop at the price break. Past 12 an attribute costs 20 a point, and a
        // greedy spender will happily sink a whole template's budget into one
        // number — which is both poor value and a strange-looking character.
        if (R.finalAttr(c, item) >= R.ATTR_COST_BREAK) continue
        c.buyBonus[item] = (c.buyBonus[item] || 0) + 1
      } else {
        // a skill level, respecting its cap
        if (!SKILLS[item]) throw new Error(`${spec.name}: no such skill "${item}"`)
        if (R.skillTotal(c, item) >= R.maxLevel(c, SKILLS, item)) continue
        c.skills[item] = { level: ((c.skills[item]?.level as number) || 0) + 1 }
      }
      if (R.pools(c, SKILLS, SKILLNAMES).pts < 0) {
        // too expensive — put it back and try the next priority
        if (Array.isArray(item)) {
          const cur = c.field.find((f) => f.name === item[0])!
          if (cur.years > 1) cur.years--
          else c.field.splice(c.field.indexOf(cur), 1)
        } else if ((R.ATTRS as readonly string[]).includes(item)) {
          c.buyBonus[item]--
        } else {
          const lv = (c.skills[item]!.level || 0) - 1
          if (lv < 0) delete c.skills[item]
          else c.skills[item]!.level = lv
        }
        continue
      }
      progress = true
    }
  }
}

const problems: string[] = []
const out: R.Character[] = []

for (const spec of SPECS) {
  const c = build(spec)
  autoSpend(c, spec)
  const sum = spec.attrs.reduce((a, b) => a + b, 0)
  if (sum !== 40) problems.push(`${c.name}: attributes total ${sum}, want 40`)
  for (const [i, v] of spec.attrs.entries())
    if (v < 6 || v > 10) problems.push(`${c.name}: ${R.ATTRS[i]} ${v} outside the archetype band 6–10`)
  for (const a of R.ATTRS) {
    const fin = R.finalAttr(c, a)
    if (fin < 3 || fin > 16) problems.push(`${c.name}: final ${a} ${fin} outside the human range 3–16`)
  }

  const slots = R.usedSlots(c)
  if (slots > c.slots) problems.push(`${c.name}: ${slots} slots used, ${c.slots} available`)

  for (const s of Object.keys(c.skills)) {
    const total = R.skillTotal(c, s)
    const max = R.maxLevel(c, SKILLS, s)
    if (total > max) problems.push(`${c.name}: ${s} at ${total} exceeds its cap of ${max}`)
  }

  const p = R.pools(c, SKILLS, SKILLNAMES)
  if (p.pts < 0) problems.push(`${c.name}: overspent by ${-p.pts} points (granted ${p.granted}, spent ${p.spent})`)
  out.push(c)

  const top = SKILLNAMES.map((n) => [n, R.score(c, SKILLS, n)] as const)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([n, v]) => `${n} ${v}`)
    .join(', ')
  console.log(
    `${c.name.padEnd(15)} ${R.ATTRS.map((a) => `${a}${String(R.finalAttr(c, a)).padStart(2)}`).join(' ')}` +
      ` | slots ${slots}/${c.slots} | pts ${String(p.pts).padStart(3)} of ${String(p.granted).padStart(3)} | ${top}`
  )
}

if (problems.length) {
  console.error('\n' + problems.length + ' PROBLEM(S):')
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}

await Bun.write('static/data/templates.json', JSON.stringify(out, null, 2) + '\n')
console.log(`\nwrote static/data/templates.json — ${out.length} templates, all legal`)
