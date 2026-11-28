// The Fvaldanon party — five player characters for Tonio's story.
//
//   bun run scripts/build-party.ts
//
// Same discipline as the templates: declared here, costed against the live
// rules, and rejected if illegal. Output: static/data/party-fvaldanon.json,
// which imports into the character builder as a group.
//
// PREMISE (Tonio, 2026-11-28). Five students who met at an English-language
// summer immersion camp at **Cambridge** and found a portal to Fvaldanon in a
// **disused WWII air-raid shelter** in the grounds of the derelict **Ida Darwin
// Hospital** at Fulbourn, four miles east — closed, awaiting redevelopment, and
// documented by explorers in 2017–18. (The hospital is real and really
// derelict; the shelter in its grounds is an assumption, though a hospital of
// that date would have had one. Cambridge land values mean almost nothing
// inside the city stays derelict, which is why the door is just outside it.)
//
// They have gone back as a group ever since, and have spent the last year or so
// around a small town in upland **Hyalis**, near the frontier. Mid-thirties.
//
// MAP REFERENCE for that Hyalis town — not Earth geography, purely a model to
// draw from: **Invergarry**, Inverness-shire. A small village on Loch Oich in
// the Great Glen under the ruin of **Invergarry Castle**, a small tower house
// burned by Cumberland in 1746. A handful of houses, a loch, a road through,
// and a dead castle above them is exactly the shape of an upland frontier town.

import * as R from '../src/character-rules'

const read = async (f: string) => JSON.parse(await Bun.file(`static/data/${f}.json`).text())
const skillsRaw: any[] = await read('skills')
const bfsRaw: any[] = await read('background-factors')
const fieldsRaw: any[] = await read('fields')

const SKILLS: Record<string, R.SkillDef> = {}
for (const s of skillsRaw) {
  const attrs = String(s.formula || '')
    .replace(/[()/\d.]/g, ' ')
    .split(/[^A-Z]+/)
    .filter((t) => (R.ATTRS as readonly string[]).includes(t))
  SKILLS[s.name] = { ...s, a: attrs.length ? attrs : ['CO'], half: Number(s.limit) > 1, limit: Number(s.limit) || 1, cost: Number(s.cost) || 1 } as R.SkillDef
}
const SKILLNAMES = Object.keys(SKILLS)
const BF = Object.fromEntries(bfsRaw.map((b) => [b.name, b]))
const FIELD = Object.fromEntries(fieldsRaw.map((f) => [f.name, f]))

interface Spec {
  name: string
  player: string
  concept: string
  wealth?: string
  attrs: [number, number, number, number, number] // ST CO IN PC WP, 40 total, each 6–10
  bfs: string[]
  fields?: [string, number][]
  spend?: (string | [string, number])[]
  /** Points deliberately left unspent — an Earth profession not yet decided. */
  reserve?: number
  ltf?: string[]
  quirk?: string[]
  gear?: string
}

const SPECS: Spec[] = [
  {
    name: 'Ezekiel Blackthorne',
    player: 'Jarmo',
    concept:
      'Hunter, ranger and scout. The one who finds the way through and the way back. Has not gone native — he still has a life on Earth, and a profession there still to be decided (15 points and 5 years of education are held in reserve for it).',
    attrs: [8, 9, 7, 10, 6],
    bfs: ['Human', 'Field Experience', 'Intense Training', 'Natural Athlete', 'Tertiary Education'],
    fields: [['Survival', 3], ['Beast Lore', 2], ['Tactics', 1]],
    spend: ['Search', 'Stealth', 'Archery', 'Athletics', 'Riding', 'Melee', ['Survival', 4], 'Firearms'],
    reserve: 15,
    ltf: ['The uplands of Hyalis', 'Tracking', 'The crossing itself'],
    quirk: ['Speaks last', 'Carries a compass he does not trust'],
    gear: 'Crossbow and a good knife; a coat for the weather on both sides; boots that have been resoled twice.',
  },
  {
    name: 'William the White',
    player: 'Ville',
    concept:
      'Full-time magician, and the first of them to stop going home. Has the Talent, which is what opens the advanced fundamentals to him. Works in **Perception, Time, Shaping and Apportation** — in a world where magical apparatus runs the factories and carries the post, that is a profession with standing.',
    wealth: 'Comfortable — a magician who can be hired',
    attrs: [6, 7, 10, 9, 8],
    bfs: ['Human', 'Magical Talent', 'Magical Apprenticeship', 'Tertiary Education', 'Mysterious Mentor'],
    fields: [['Natural Philosophy', 2], ['Alchemy', 2], ['Lore', 2]],
    spend: ['Theory', ['Lore', 4], ['Natural Philosophy', 2], 'Search', 'Confidence', ['Mathematics', 3]],
    ltf: ['Fvaldan apparatus', 'The four fundamentals he actually knows', 'Reading a room before speaking'],
    quirk: ['Has not been back to Earth in a year', 'Writes everything down'],
    gear: 'A working magician’s kit, notebooks, and the local licence that says he may use it.',
  },
  {
    name: 'Roland Farharvest',
    player: 'Elena',
    concept:
      'Gone native, and prospering: a successful sheep farmer — wool and meat — who read agricultural science on Earth and has quietly applied four centuries of it to a renaissance countryside. The most materially successful of the five, and the one with the most to lose.',
    wealth: 'Prosperous — land, flock and a good name locally',
    attrs: [9, 8, 9, 8, 6],
    bfs: ['Human', 'Tertiary Education', 'Office Experience', 'Field Experience', 'Apprentice'],
    fields: [['Biology', 3], ['Beast Lore', 2], ['Herbalism', 1]],
    spend: [['Biology', 4], ['Business', 3], 'Theory', 'Riding', 'Charm', ['Trades', 2], 'Repair', 'Melee'],
    ltf: ['Sheep', 'The Hyalis uplands', 'Market day'],
    quirk: ['Talks to the dogs', 'Never explains where an idea came from'],
    gear: 'A farm, a flock, two dogs, a fowling piece, and an account at the market town.',
  },
  {
    name: 'Serafina von Aldpricht',
    player: 'Anu',
    concept:
      'Daughter of a British baron, and the only one of them whose background translates directly: Fvaldanon runs on 19th-century social structures, so an aristocrat who knows how to be received is useful on both sides of the cellar door. Has not gone native; her Earth profession is still to be decided (15 points and 5 years of education held in reserve).',
    wealth: 'Family money on Earth; standing, not cash, in Fvaldanon',
    attrs: [6, 8, 9, 10, 7],
    bfs: ['Human', 'Privileged Childhood', 'Tertiary Education', 'Office Experience', 'Artistic'],
    fields: [['Etiquette', 3], ['Politics', 2], ['History', 1]],
    spend: ['Charm', 'Confidence', ['Politics', 4], 'Riding', 'Perform', ['Law', 2], 'Search'],
    reserve: 15,
    ltf: ['Being received', 'Fvaldan precedence and title', 'Horses'],
    quirk: ['Never hurries', 'Assumes the door will be opened'],
    gear: 'Correct clothes for two centuries, letters of introduction, a riding horse kept stabled in town.',
  },
  {
    name: 'Wilhemina Ashcroft',
    player: 'Terhi',
    concept:
      'A doctor on Earth and a healer in Fvaldanon, where she practises as a herbalist and uses the minor magics — she has the apprenticeship but not the Talent, so the great fundamentals are closed to her and the small ones are enough. Modern medicine in a renaissance town is the most dangerous secret any of them carry.',
    attrs: [6, 9, 10, 9, 6],
    bfs: ['Human', 'Tertiary Education', 'Magical Apprenticeship', 'Field Experience', 'Gifted'],
    fields: [['First Aid', 1], ['Medicine', 3], ['Herbalism', 2]],
    spend: [['Medicine', 3], ['Healing', 3], ['Emergency Medicine', 2], 'Theory', 'Search', ['Herbalism', 3], 'Charm'],
    ltf: ['Trauma', 'What grows in Hyalis', 'Explaining without explaining'],
    quirk: ['Washes her hands, always', 'Will not let anyone die quietly'],
    gear: 'A doctor’s bag reprovisioned on both sides, a herbal she wrote herself, and no antibiotics worth the name.',
  },
]

// ── build & validate ────────────────────────────────────────────────────────

function build(spec: Spec): R.Character {
  const c = R.blankCharacter()
  c.name = spec.name
  c.concept = spec.concept
  c.age = '35'
  c.wealth = spec.wealth ?? ''
  // They move between a modern Earth and a renaissance-fantasy world, so both
  // content sets are live on the sheet.
  c.activeTags = ['standard', 'modern', 'fantasy']
  R.ATTRS.forEach((a, i) => (c.base[a] = spec.attrs[i]))
  let uid = 1
  for (const n of spec.bfs) {
    if (!BF[n]) throw new Error(`${spec.name}: no such background factor "${n}"`)
    c.bfs.push({ ...BF[n], cat: BF[n].category, uid: 'b' + uid++ })
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

/** Spend down the priority list, stopping `reserve` points short. */
function autoSpend(c: R.Character, spec: Spec) {
  const floor = spec.reserve ?? 0
  const list = spec.spend ?? []
  let progress = true
  while (progress) {
    progress = false
    for (const item of list) {
      if (R.pools(c, SKILLS, SKILLNAMES).pts <= floor) return
      const undo: (() => void)[] = []
      if (Array.isArray(item)) {
        const [name, maxYears] = item
        const cur = c.field.find((f) => f.name === name)
        if ((cur?.years ?? 0) >= maxYears) continue
        if (cur) { cur.years++; undo.push(() => cur.years--) }
        else { c.field.push({ name, years: 1 }); undo.push(() => c.field.splice(c.field.findIndex((f) => f.name === name), 1)) }
      } else if ((R.ATTRS as readonly string[]).includes(item)) {
        if (R.finalAttr(c, item) >= R.ATTR_COST_BREAK) continue
        c.buyBonus[item] = (c.buyBonus[item] || 0) + 1
        undo.push(() => c.buyBonus[item]--)
      } else {
        if (!SKILLS[item]) throw new Error(`${spec.name}: no such skill "${item}"`)
        if (R.skillTotal(c, item) >= R.maxLevel(c, SKILLS, item)) continue
        const was = c.skills[item]?.level
        c.skills[item] = { level: (was || 0) + 1 }
        undo.push(() => { if (was === undefined) delete c.skills[item]; else c.skills[item]!.level = was })
      }
      if (R.pools(c, SKILLS, SKILLNAMES).pts < floor) { for (const u of undo) u(); continue }
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
  const slots = R.usedSlots(c)
  if (slots > c.slots) problems.push(`${c.name}: ${slots} slots used, ${c.slots} available`)
  for (const s of Object.keys(c.skills))
    if (R.skillTotal(c, s) > R.maxLevel(c, SKILLS, s)) problems.push(`${c.name}: ${s} over its cap`)
  const p = R.pools(c, SKILLS, SKILLNAMES)
  if (p.pts < 0) problems.push(`${c.name}: overspent by ${-p.pts}`)
  out.push(c)

  const top = SKILLNAMES.map((n) => [n, R.score(c, SKILLS, n)] as const)
    .filter(([n]) => R.hasSkill(c, n))
    .sort((a, b) => b[1] - a[1]).slice(0, 5).map(([n, v]) => `${n} ${v}`).join(', ')
  console.log(
    `${c.name.padEnd(22)} ${R.ATTRS.map((a) => `${a}${String(R.finalAttr(c, a)).padStart(2)}`).join(' ')}` +
      ` | slots ${slots}/${c.slots} | ${String(p.pts).padStart(2)} left of ${String(p.granted).padStart(3)}` +
      `${spec.reserve ? ` (${spec.reserve} reserved)` : ''}\n` +
      `${''.padEnd(22)} ${top}\n${''.padEnd(22)} fields: ${c.field.map((f) => `${f.name} ${f.years}y`).join(', ')}`
  )
}

if (problems.length) {
  console.error('\n' + problems.length + ' PROBLEM(S):')
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}

await Bun.write('static/data/party-fvaldanon.json', JSON.stringify(out, null, 2) + '\n')
console.log(`\nwrote static/data/party-fvaldanon.json — ${out.length} characters, all legal`)
