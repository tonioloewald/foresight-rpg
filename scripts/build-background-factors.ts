// Generate background-factors.json on a costed budget.
//
// THE PROBLEM THIS FIXES: background factors were far too weak — a handful of
// conferred skill levels and, for three of them, a small pile of points. There
// was no stated value, so nothing said whether a factor was worth taking, and
// nothing kept two factors comparable.
//
// THE MODEL (Tonio, 2026-11-28). Every background factor is worth the same
// BUDGET, spent on a price list, and **whatever is left over you get as free
// build points**. That is the old ForeSight model with the numbers brought down
// to today's cheaper economy: "attributes, years of education, and points to
// spend freely being what was left over".
//
//   bun run scripts/build-background-factors.ts
//
// Species are NOT budgeted: a species is not an experience you had, it's what
// you are. Neutral species stay free and cost no slot.

const BUDGET = 60

const PRICE = {
  attrRestricted: 8, // a point in an attribute the factor names
  attrFree: 10, // a point the taker may put anywhere
  fieldYear: 3, // one year of a field of knowledge
  skillAcquire: 3, // x the skill's own cost — buys the skill AT ALL (level 0)
  skillLevel: 1, // x the skill's own cost — per level above 0
  perk: 5, // wealth, connections, a patron, a quirk: one step
}

const skills: any[] = JSON.parse(await Bun.file('static/data/skills.json').text())
const fields: any[] = JSON.parse(await Bun.file('static/data/fields.json').text())
const SKILL_COST = Object.fromEntries(skills.map((s) => [s.name, Number(s.cost) || 1]))
const FIELD_NAMES = new Set(fields.map((f) => f.name))

interface Spec {
  name: string
  category: 'Species' | 'Origin' | 'General' | 'Unusual' | 'Intrinsic'
  note: string
  tags?: string[]
  attrs?: Record<string, number> // restricted: named attributes
  freeAttr?: number // points the taker places anywhere
  skills?: Record<string, number> // conferred LEVELS; 0 = taught, no levels
  fields?: [string, number][]
  perks?: string[]
  slot?: 'free' | number
  exclusive?: boolean
  once?: boolean
  unbudgeted?: boolean // species: not costed against BUDGET
}

const SPECS: Spec[] = [
  // ── species: what you are, not what happened to you ──────────────────────
  { name: 'Human', category: 'Species', slot: 'free', exclusive: true, unbudgeted: true, note: 'The baseline. No bonus, no penalty, no slot — being ordinary is free.' },
  { name: 'Dwarf', category: 'Species', slot: 'free', exclusive: true, unbudgeted: true, attrs: { ST: 1, CO: -1 }, tags: ['fantasy'], note: 'Dense, durable, deliberate. Nets to nothing, so it costs no slot.' },
  { name: 'Halfling', category: 'Species', slot: 'free', exclusive: true, unbudgeted: true, attrs: { CO: 1, ST: -1 }, skills: { Stealth: 1 }, tags: ['fantasy'], note: 'Small, quick and easily overlooked.' },
  { name: 'High Elf', category: 'Species', slot: 1, exclusive: true, unbudgeted: true, attrs: { CO: 1, IN: 1, PC: 1 }, tags: ['fantasy'], note: 'Long-lived and finely made — the one species that is simply better, so it costs a slot.' },

  // ── origin: one upbringing. A BORING CHILDHOOD IS NOT A FACTOR ───────────
  {
    name: 'Trained from Childhood', category: 'Origin', exclusive: true,
    attrs: { ST: 1, WP: 1 }, skills: { Melee: 3, Athletics: 1 },
    fields: [['Unarmed Combat', 1], ['Defense', 2]],
    note: 'Handed to a master young. You have never not been able to do this, and it cost you the childhood other people had.',
  },
  {
    name: 'Privileged Childhood', category: 'Origin', exclusive: true,
    attrs: { PC: 1 }, skills: { Charm: 1, Riding: 1 },
    fields: [['Etiquette', 2], ['Lore', 1]], perks: ['family money', 'useful relatives', 'doors that open'],
    note: 'Tutors, horses, and an assumption of welcome. Money and connections are themselves a resource.',
  },
  {
    name: 'Abandoned & Self-Sufficient', category: 'Origin', exclusive: true,
    attrs: { WP: 1 }, skills: { Stealth: 2, Search: 1, Melee: 0, Athletics: 0 },
    fields: [['Survival', 2]],
    note: 'Nobody was coming. You are competent at a wide range of things because the alternative was worse.',
  },

  // ── general: the slabs of experience ─────────────────────────────────────
  {
    name: 'Tertiary Education', category: 'General',
    attrs: { IN: 1 }, skills: { Theory: 2 },
    fields: [['Science', 1], ['Mathematics', 2], ['History', 2]],
    note: 'A degree and the habits that come with one: how to read a source, frame a question, and find out what is already known. Knowledge-centric — swap the fields for your discipline.',
  },
  {
    name: 'Intense Training', category: 'General',
    attrs: { ST: 1, CO: 1 }, skills: { Athletics: 2, Melee: 2, Stealth: 1 },
    fields: [['Unarmed Combat', 1]],
    note: 'Years of it, under someone who did not care whether you enjoyed it. Skill-centric.',
  },
  {
    name: 'Office Experience', category: 'General',
    skills: { Theory: 1, Charm: 1, Confidence: 1 },
    fields: [['Business', 2], ['Accounting', 1], ['Law', 1]],
    note: 'You know how institutions actually work, who signs what, and how to be taken seriously in a meeting. Balanced.',
  },
  {
    name: 'Field Experience', category: 'General',
    attrs: { PC: 1 }, skills: { Search: 2, Stealth: 1, Firearms: 1, Cars: 1 },
    fields: [['Survival', 1], ['Tactics', 2]],
    note: 'Time spent out where the plan meets the weather. Balanced, and biased toward noticing things.',
  },
  {
    name: 'Active Duty', category: 'General',
    attrs: { WP: 1 }, skills: { Firearms: 3, Melee: 1, 'Heavy Weapons': 1, Athletics: 1 },
    fields: [['Tactics', 2]],
    note: 'You have been shot at by people who meant it, and you did your job anyway.',
  },
  {
    name: 'Apprentice', category: 'General',
    skills: { Repair: 3, Theory: 0 },
    fields: [['Trades', 1], ['Carpentry', 2], ['Electrical', 1]],
    note: 'Indentured to a trade and taught it properly. Swap the trades for yours.',
  },
  {
    name: 'School of Hard Knocks', category: 'General',
    attrs: { WP: 1 }, skills: { Melee: 2, Stealth: 1, Confidence: 1 },
    note: 'Nothing formal. You learned what you learned by it going badly first.',
  },
  {
    name: 'Mooch', category: 'General',
    skills: { Charm: 2, Confidence: 1, Perform: 0 }, perks: ['a couch anywhere', 'people who owe you'],
    note: 'You have never quite had a job and have never quite gone hungry.',
  },
  {
    name: 'Homeless', category: 'General',
    attrs: { WP: 1 }, skills: { Stealth: 1, Search: 1 },
    fields: [['Survival', 1]],
    note: 'Invisible in plain sight, and you know the city at ground level. Mostly it taught you endurance and left you time.',
  },

  // ── unusual ──────────────────────────────────────────────────────────────
  {
    name: 'Mysterious Mentor', category: 'Unusual',
    attrs: { WP: 1 }, skills: { Theory: 1, Melee: 1 },
    fields: [['Lore', 2]], perks: ['someone who will answer, eventually'],
    note: 'Somebody took an interest. You never entirely learned why, and they are not finished with you.',
  },
  {
    name: 'Trauma Survivor', category: 'Unusual',
    attrs: { WP: 2 }, skills: { Search: 1 },
    note: 'You came through something. It left you hard to frighten and alert to the wrong kind of quiet.',
  },
  {
    name: 'Magical Apprenticeship', category: 'Unusual', tags: ['fantasy'],
    skills: { Theory: 1 }, fields: [['Lore', 2]], perks: ['taught the rudiments'],
    note: 'You were shown the shape of it. Whether you can do anything with that is the Magical Talent question.',
  },

  // ── intrinsic: what you were born with ───────────────────────────────────
  {
    name: 'Superior Specimen', category: 'Intrinsic', once: true,
    freeAttr: 4,
    note: 'Simply built better than other people, in whichever way you choose. Four attribute points anywhere, and the remainder in points.',
  },
  { name: 'Natural Athlete', category: 'Intrinsic', once: true, attrs: { ST: 2, CO: 1 }, perks: ['Deep Reserves (Endurance quirk)'], note: 'Effortless physicality and rude health — the body other people train for and do not get.' },
  { name: 'Gifted', category: 'Intrinsic', once: true, attrs: { IN: 1, PC: 1, WP: 1 }, note: 'Quick, sharp and hard to rattle; always a step ahead of the room.' },
  { name: 'Artistic', category: 'Intrinsic', once: true, attrs: { CO: 1, PC: 1 }, skills: { Perform: 1 }, perks: ['Striking (Appearance quirk)'], note: 'The hands to make it, the eye to see it, and the presence to hold a room while you do.' },
  { name: 'Magical Talent', category: 'Intrinsic', once: true, tags: ['fantasy'], perks: ['the talent itself'], note: 'The rare thing that cannot be taught. Without it, only the minor magics are open to you.' },
]

// ── cost it ─────────────────────────────────────────────────────────────────

const problems: string[] = []
const out: any[] = []

for (const s of SPECS) {
  let spent = 0
  const lines: string[] = []

  for (const [a, n] of Object.entries(s.attrs ?? {})) {
    spent += n * PRICE.attrRestricted
    lines.push(`${a}${n > 0 ? '+' : ''}${n}`)
  }
  if (s.freeAttr) {
    spent += s.freeAttr * PRICE.attrFree
    lines.push(`${s.freeAttr} free attr`)
  }
  for (const [n, lv] of Object.entries(s.skills ?? {})) {
    const cost = SKILL_COST[n]
    if (cost === undefined) problems.push(`${s.name}: no such skill "${n}"`)
    spent += (cost ?? 1) * (PRICE.skillAcquire + PRICE.skillLevel * lv)
    lines.push(`${n} ${lv}`)
  }
  for (const [n, y] of s.fields ?? []) {
    if (!FIELD_NAMES.has(n)) problems.push(`${s.name}: no such field "${n}"`)
    spent += y * PRICE.fieldYear
    lines.push(`${n} ${y}y`)
  }
  spent += (s.perks?.length ?? 0) * PRICE.perk
  for (const p of s.perks ?? []) lines.push(p)

  const grant = s.unbudgeted ? 0 : BUDGET - spent
  if (!s.unbudgeted && grant < 0) problems.push(`${s.name}: costs ${spent}, over the ${BUDGET} budget by ${-grant}`)

  const row: any = { name: s.name, category: s.category }
  if (s.exclusive) row.exclusive = true
  if (s.once) row.once = true
  row.slot = s.slot ?? 1
  row.grant = grant
  row.tags = s.tags ?? ['standard']
  if (s.attrs) row.attrs = s.attrs
  if (s.freeAttr) row.freeAttr = s.freeAttr
  if (s.skills) row.skills = s.skills
  if (s.fields) row.fields = (s.fields ?? []).map(([name, years]) => ({ name, years }))
  if (s.perks) row.confers = s.perks
  row.note = s.note
  out.push(row)

  console.log(
    `${s.name.padEnd(28)} ${s.category.padEnd(10)} ${
      s.unbudgeted ? 'species'.padStart(16) : `spent ${String(spent).padStart(2)} → ${String(grant).padStart(2)} pts`
    }  ${lines.join(', ').slice(0, 70)}`
  )
}

if (problems.length) {
  console.error('\n' + problems.length + ' PROBLEM(S):')
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}

await Bun.write('static/data/background-factors.json', JSON.stringify(out, null, 2) + '\n')
console.log(`\nwrote static/data/background-factors.json — ${out.length} factors, budget ${BUDGET} each`)
