// Extract quirks.md's catalogue into static/data/quirks.json.
//
//   bun run scripts/build-quirks.ts
//
// NOT an invention: every entry below is lifted from src/rules/quirks.md, which
// already designs the system — five families, a combine rule per family, and
// the two tests that decide whether a thing is a quirk, a perk or a flaw. The
// page is the source of truth; this file is the machine-readable copy the
// character builder needs for a picker.
//
// The page is explicit that the list is EXAMPLES, not a menu: "there is no list
// to pick from... a good quirk is specific to the character." So whatever picker
// consumes this must keep "write your own" as a first-class option, not a
// fallback. `exampleOnly: true` on every row says so in the data.
//
// CARRIERS. A family spans all three — Endurance holds a perk (Deep Reserves),
// several quirks, and a flaw — because a family is defined by WHAT IT TOUCHES,
// not by what it cost.
//   quirk: free, two-sided. The drawback must bite.
//   perk:  points at full price, no downside. Narrow scope makes it affordable.
//   flaw:  free, funds nothing, and nobody would ever want the deal.

interface Q {
  name: string
  family: 'Appearance' | 'Empathy' | 'Endurance' | 'Coordination' | 'Age' | 'Condition'
  kind: 'quirk' | 'perk' | 'flaw'
  effect: string
  note?: string
  /** Age: it is simply true of you now, vs it fires on a trigger. */
  mode?: 'standing' | 'intermittent'
  /** Chronic conditions are written in four lines; the fourth decides the carrier. */
  attach?: string
  trigger?: string
  management?: string
  /** Conferred by time or circumstance, never bought, and granting no points. */
  acquired?: boolean
  /** The severer half of a pair written twice rather than given a dial. */
  pairedWith?: string
  tags?: string[]
}

const QUIRKS: Q[] = [
  // ── Appearance — what people see first, and how differently they read it ──
  { name: 'Striking', family: 'Appearance', kind: 'quirk',
    effect: '+2 where being noticed and remembered helps; −2 where you needed to be forgettable — and you do not get to be nobody in a crowd.',
    note: 'Name the audience: striking in a particular way, and here is who it works on.' },
  { name: 'Well-turned-out', family: 'Appearance', kind: 'quirk',
    effect: '+2 where someone is deciding whether you belong; −1 anywhere that reads as money, where it marks you.',
    note: 'Good clothes, good teeth, the accent.' },
  { name: 'Plain', family: 'Appearance', kind: 'quirk',
    effect: '+1 blending in and being underestimated; −1 making a memorable first impression.' },
  { name: 'Nondescript', family: 'Appearance', kind: 'quirk',
    effect: '+2 blending into crowds, +1 reading people; −1 making memorable impressions.' },
  { name: 'Scarred', family: 'Appearance', kind: 'quirk', pairedWith: 'Disfigured',
    effect: '−2 on first impressions with the appropriate audience, paid back one way, chosen once: you learned to suck it up (+1 on WP-flavoured tasks), turned it into a joke (+1 Charm), or gained insight (+1 reading people).' },
  { name: 'Disfigured', family: 'Appearance', kind: 'flaw', pairedWith: 'Scarred',
    effect: '−2 on first impressions with the appropriate audience, and it is not paid back.' },

  // ── Empathy — reading people; PC is the spine, these are the deviations ──
  { name: 'Reads People', family: 'Empathy', kind: 'quirk',
    effect: '+2 PC reading people and detecting lies; −1 PC noticing physical detail while you are doing it.' },
  { name: 'Oblivious', family: 'Empathy', kind: 'quirk',
    effect: '−2 PC reading people; +1 sustained concentration, and most social pressure simply does not land.' },
  { name: 'Face-blind', family: 'Empathy', kind: 'flaw',
    effect: 'The thing PC does for everyone else, it does not do for you.',
    note: 'Routes capacity hard: there is a reason this character knows the timetable, the ledger or the machine better than anyone.' },
  { name: 'No theory of mind', family: 'Empathy', kind: 'flaw',
    effect: 'The thing PC does for everyone else, it does not do for you.',
    note: 'As Face-blind: the capacity goes somewhere the flaw cannot reach.' },

  // ── Endurance — the rolls that were EN's; WP carries them, these say how ──
  { name: 'Deep Reserves', family: 'Endurance', kind: 'perk',
    effect: '+1 EF on exhaustion checks.', note: 'Built for distance.' },
  { name: 'Hardy', family: 'Endurance', kind: 'quirk',
    effect: '+1 EF resisting cold, hunger, poison and disease; −1 on anything requiring a turn of speed.' },
  { name: 'Conditioned', family: 'Endurance', kind: 'quirk',
    effect: '+1 EF on exhaustion checks while fit.',
    note: 'The catch is that it is maintained, and lapses when the training does.' },
  { name: 'Hardened', family: 'Endurance', kind: 'quirk',
    effect: '+1 EF on Pain Resistance and shrugging off a stun; −1 where someone needed you to show you cared.' },
  { name: 'Weathered', family: 'Endurance', kind: 'quirk',
    effect: '+1 EF on exposure and going without; −1 on convalescence, because the body is already running a deficit.' },
  { name: 'Sprinter', family: 'Endurance', kind: 'quirk', pairedWith: 'Marathoner',
    effect: '+1 EF at your distance, −1 at the other.',
    note: 'Sprinter and Marathoner fire for the same reason, so they never stack.' },
  { name: 'Marathoner', family: 'Endurance', kind: 'quirk', pairedWith: 'Sprinter',
    effect: '+1 EF at your distance, −1 at the other.',
    note: 'Sprinter and Marathoner fire for the same reason, so they never stack.' },

  // ── Coordination — sub-capabilities that must not become attributes ──
  { name: 'Nimble Fingered', family: 'Coordination', kind: 'perk',
    effect: '+1 EF in one named kind of movement.',
    note: 'Covers what quirks.md lists as a separate "Sleight of Hand" perk — that name collides with the SKILL of the same name, and this is the same +1 either way.' },
  { name: 'Graceful', family: 'Coordination', kind: 'perk',
    effect: '+1 EF in one named kind of movement.' },
  { name: 'Remarkable Agility', family: 'Coordination', kind: 'perk',
    effect: '+1 EF in one named kind of movement.' },
  { name: 'Corrected Vision', family: 'Coordination', kind: 'quirk',
    effect: 'Fine with your glasses; lose them and it is −2 on anything at distance.' },
  { name: 'Short-sighted', family: 'Coordination', kind: 'flaw',
    effect: 'A flaw names what it closes off, and the capacity goes somewhere the flaw cannot reach.' },
  { name: 'One-handed', family: 'Coordination', kind: 'flaw',
    effect: 'A flaw names what it closes off, and the capacity goes somewhere the flaw cannot reach.' },
  { name: 'Blind', family: 'Coordination', kind: 'flaw',
    effect: 'A flaw names what it closes off, and the capacity goes somewhere the flaw cannot reach.' },

  // ── Age — conferred, never bought, and granting no points ──
  { name: 'Stiff', family: 'Age', kind: 'quirk', mode: 'standing', acquired: true,
    effect: '−1 EF on agility tasks and on running speed.', note: 'The commonest first one, and the one players feel.' },
  { name: 'Long-sighted', family: 'Age', kind: 'quirk', mode: 'standing', acquired: true,
    effect: '−1 EF on fine close work; nothing at all with reading glasses.',
    note: 'The Corrected Vision shape — and the day you lose them is a scene.' },
  { name: 'Hard of hearing', family: 'Age', kind: 'quirk', mode: 'standing', acquired: true, pairedWith: 'Deaf',
    effect: '−1 EF on PC where hearing carries it, and −2 in a noisy room.' },
  { name: 'Deaf', family: 'Age', kind: 'flaw', mode: 'standing', acquired: true, pairedWith: 'Hard of hearing',
    effect: 'Closes off what hearing carried, and routes the capacity somewhere age cannot reach.' },
  { name: 'Slow to mend', family: 'Age', kind: 'quirk', mode: 'standing', acquired: true,
    effect: '−1 EF on convalescence.',
    note: 'The wound that cost a young character a week costs you a month — a campaign-level fact rather than a combat one.' },
  { name: 'Winded', family: 'Age', kind: 'quirk', mode: 'standing', acquired: true,
    effect: 'The first exhaustion level comes one push earlier than it used to.' },
  { name: 'Arthritic', family: 'Age', kind: 'quirk', mode: 'intermittent', acquired: true,
    effect: '−1 EF on anything needing hands or fast movement, for as long as the weather lasts.',
    trigger: 'Cold or damp — and the GM already narrates the weather.' },
  { name: 'An old break', family: 'Age', kind: 'quirk', mode: 'intermittent', acquired: true,
    effect: "−1 EF on that limb's tasks for the scene.",
    trigger: 'The first hard exertion of the day, or the first hit you take.' },
  { name: 'A knee that goes', family: 'Age', kind: 'quirk', mode: 'intermittent', acquired: true,
    effect: 'Running and agility tasks are −2 until you have rested it off.',
    trigger: 'Exhaustion level 2 or worse — it attaches to a track someone is already moving.' },

  // ── Chronic conditions — four lines, and the fourth decides the carrier ──
  { name: 'Asthma', family: 'Condition', kind: 'quirk',
    attach: 'Exhaustion checks.', trigger: 'Cold air, dust, smoke, hard exertion.',
    effect: '−1 EF on the check, and a failure costs an extra exhaustion level.',
    management: 'An inhaler, used in time.' },
  { name: 'Haemophilia', family: 'Condition', kind: 'flaw',
    attach: 'Wounds and convalescence.', trigger: 'Any wound.',
    effect: '−2 EF on convalescence, and a wound that would normally close keeps bleeding — treat an untreated wound as one level worse after a scene.',
    management: 'Clotting factor, where the setting has it. Without it this is a flaw, and in most settings a severe one.' },
  { name: 'Insulin-dependent diabetes', family: 'Condition', kind: 'quirk',
    attach: 'The exhaustion track.', trigger: 'A missed meal, or no insulin.',
    effect: 'Start the scene one exhaustion level down; no insulin and it worsens each scene.',
    management: 'Insulin and food on a schedule — a logistics problem for the whole party.' },
  { name: 'Chronic pain', family: 'Condition', kind: 'quirk',
    attach: 'Pain Resistance and agility tasks.', trigger: 'Cold, damp, the first hour of the day.',
    effect: '−1 EF while it is up.', management: 'Warmth, movement, and something for it.' },
  { name: 'Epilepsy', family: 'Condition', kind: 'quirk',
    attach: 'Whatever you were doing.', trigger: 'Sleep lost, a missed dose, a strobing light — and a GM should let the trigger be visible before it fires.',
    effect: 'A seizure ends the scene for you, and you come out of it an exhaustion level or two down.',
    management: 'Medication, kept up. In a setting without it, a flaw.' },
  { name: 'Severe allergy', family: 'Condition', kind: 'quirk',
    attach: 'Nothing at all, until exposure.', trigger: 'The allergen, which the player names.',
    effect: 'Exhaustion levels fast; true anaphylaxis runs on the wound track instead, and is minutes rather than hours.',
    management: "Avoidance, which the party has to help with, plus whatever the setting's adrenaline is.",
    note: 'The cheapest quirk to carry and the worst to carry badly.' },
]

// ── validate ────────────────────────────────────────────────────────────────

const FAMILIES = ['Appearance', 'Empathy', 'Endurance', 'Coordination', 'Age', 'Condition']
const problems: string[] = []
const seen = new Set<string>()

for (const q of QUIRKS) {
  if (seen.has(q.name)) problems.push(`duplicate name: ${q.name}`)
  seen.add(q.name)
  if (!FAMILIES.includes(q.family)) problems.push(`${q.name}: unknown family ${q.family}`)
  if (!q.effect) problems.push(`${q.name}: no effect`)
  // "Write all four" — a condition without its four lines is not finished
  if (q.family === 'Condition' && !(q.attach && q.trigger && q.management))
    problems.push(`${q.name}: a chronic condition needs attach, trigger, effect AND management`)
  // "Nobody spends points to get older, and nobody is paid for it"
  if (q.family === 'Age' && !q.acquired) problems.push(`${q.name}: age entries are conferred, not bought`)
  if (q.pairedWith && !QUIRKS.some((o) => o.name === q.pairedWith))
    problems.push(`${q.name}: paired with "${q.pairedWith}", which does not exist`)
}

const out = QUIRKS.map((q) => ({ ...q, exampleOnly: true, tags: q.tags ?? ['standard'] }))

const byFamily: Record<string, Record<string, number>> = {}
for (const q of out) ((byFamily[q.family] ||= {})[q.kind] = (byFamily[q.family]?.[q.kind] || 0) + 1)
for (const [f, kinds] of Object.entries(byFamily))
  console.log(`${f.padEnd(14)} ${Object.entries(kinds).map(([k, n]) => `${n} ${k}${n > 1 ? 's' : ''}`).join(', ')}`)

if (problems.length) {
  console.error('\n' + problems.length + ' PROBLEM(S):')
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}

await Bun.write('static/data/quirks.json', JSON.stringify(out, null, 2) + '\n')
console.log(`\nwrote static/data/quirks.json — ${out.length} entries across ${Object.keys(byFamily).length} families`)
