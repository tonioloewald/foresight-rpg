// ForeSight character rules — the point economy and derived scores, as PURE
// functions over a plain character record.
//
// WHY this is its own module: these rules were methods on the
// <foresight-character-sheet> element, which meant nothing else could use them
// and nothing could check them. Extracted, they are consumable by the UI, by the
// planned Firestore backend (server-side validation of a submitted character),
// and by NPC/instant-character generation — and they can be exercised without a
// DOM.
//
// Discipline (same as entity-specs.ts): pure data + pure functions. No DOM, no
// node, no fetch. The caller supplies the character and the catalogs.

import { ALL_TAGS } from './entity-specs'

/**
 * The five attributes. DX+AG→CO; EM→PC; and EN and AP are gone entirely, having
 * become quirk families (see Design Document → "Quirk families").
 *
 * The set has a shape worth keeping in mind, because it is how a reader will
 * remember it: ST and CO are the *power* and *finesse* of the body, WP and IN
 * the power and finesse of the mind, and PC is the feedback loop between mind,
 * body and surroundings.
 *
 * EN's mechanical load moved to WP — exhaustion, Pain Resistance, convalescence,
 * stun recovery — which the rules had already been writing as "EN or WP" all
 * along. Physical robustness (poison, disease) went to ST. Endurance quirks
 * supply the situational modifiers on all of it.
 */
export const ATTRS = ['ST', 'CO', 'IN', 'PC', 'WP'] as const
export type Attr = (typeof ATTRS)[number]

/** Background-factor categories, in the order they're offered. */
export const BF_CAT = ['Species', 'Origin', 'General', 'Unusual', 'Intrinsic'] as const

/** Starting archetypes — a fast on-ramp, not a class system. */
export const ARCH: Record<string, Record<string, number>> = {
  // 40 points each across five attributes (avg 8) — keep in sync with playtest-pack.md
  Athlete: { ST: 9, CO: 10, IN: 6, PC: 7, WP: 8 },
  Scholar: { ST: 6, CO: 6, IN: 10, PC: 9, WP: 9 },
  Socialite: { ST: 6, CO: 7, IN: 10, PC: 10, WP: 7 },
  Artist: { ST: 6, CO: 9, IN: 7, PC: 10, WP: 8 },
}

/** Attributes cost 10/point to 12, then 20 — "genetics is not fair". */
/** Attributes may be sold down to this floor. Human range is 3–16: 3 is truly
 *  hopeless, below it is disabling, and above 16 is no longer human. Typical
 *  people sit around 7–8 — NOT 9. Calibration anchor: a competent experienced
 *  tradesman has a skill Score of ~15, which is a 7–8 attribute plus levels; at
 *  EF 5 that's SC 75, so three times in four they fix your simple problem — and
 *  half of those fixes are bare QR4 successes. Which is about right for life.
 *  The EF isn't arbitrary: BEF 5, −1 because it's a problem you couldn't fix
 *  yourself, +1 for professional tools. Do it yourself at skill 10 with whatever
 *  was in the kitchen drawer (−1 tools) and it's EF 3 → SC 30. */
export const ATTR_FLOOR = 3
export const ATTR_COST_BREAK = 12
export const ATTR_COST_LOW = 10
export const ATTR_COST_HIGH = 20
/** Fields of Knowledge cost 4 points per year of study. */
export const FIELD_COST_PER_YEAR = 4

/**
 * WEALTH — a seven-rung ladder, default "Getting By". Buying up a rung costs
 * 10; selling one down refunds 5. The asymmetry is deliberate: poverty is a
 * real drawback but it is not a *bargain*, so you cannot fund a character by
 * being destitute (the same reasoning as attributes, which are symmetric
 * precisely because a low attribute bites broadly and constantly).
 */
export const WEALTH = [
  { name: 'Desperate', note: 'homeless; struggling to find food' },
  { name: 'Struggling', note: 'struggling to make rent' },
  { name: 'Getting By', note: 'paycheck to paycheck — no real savings or resources' },
  { name: 'Comfortable', note: 'all needs met, and money to spare' },
  { name: 'Rich', note: 'money to indulge' },
  { name: 'Generational Wealth', note: 'if you went broke you would still somehow be fine (think the Kennedys)' },
  { name: 'Dynastic Wealth', note: 'going broke would involve some kind of political upheaval (think the Rothschilds)' },
] as const

export const WEALTH_DEFAULT = 2 // "Getting By"
export const WEALTH_UP_COST = 10
export const WEALTH_DOWN_REFUND = 5

/** Index of a character's wealth tier. Unrecognised or empty = the default. */
export function wealthTier(c: Character): number {
  const i = WEALTH.findIndex((w) => w.name === (c.wealth || '').trim())
  return i < 0 ? WEALTH_DEFAULT : i
}

/** Points spent on wealth: 10 a rung up, 5 back a rung down. */
export function wealthSpend(c: Character): number {
  const d = wealthTier(c) - WEALTH_DEFAULT
  return d >= 0 ? d * WEALTH_UP_COST : d * WEALTH_DOWN_REFUND
}
/** Default background-factor slot budget. */
export const DEFAULT_SLOTS = 4

export { ALL_TAGS }

export interface SkillDef {
  /** attributes averaged by the skill's formula */
  a: string[]
  /** ½-skill: the average is halved (experience outweighs talent) */
  half?: boolean
  /** max-level multiplier (1, or 1.5 for ½ skills) */
  limit: number
  /** points per level */
  cost?: number
  formula?: string
  tags?: string[]
}

export interface BFDef {
  name: string
  cat?: string
  free?: boolean
  /** points this factor grants */
  grant?: number
  attrs?: Record<string, number>
  skills?: Record<string, number>
  fields?: { name: string; years: number }[]
  tags?: string[]
}

export interface Character {
  name: string
  arch: string
  age: string
  wealth: string
  concept: string
  base: Record<string, number>
  buyBonus: Record<string, number>
  /** `dropped` means "given up deliberately" — the only way to be ABSENT in a
   *  skill a background factor taught you. Without it the factor simply keeps
   *  conferring the levels back. */
  skills: Record<string, { level: number; dropped?: boolean }>
  field: { name: string; years: number }[]
  ltf: string[]
  quirk: string[]
  bfs: any[]
  awards: { note?: string; amt: number }[]
  slots: number
  activeTags: string[]
  wound: number
  exh: Record<string, number>
  shaken: boolean
  stunned: boolean
  gear: string
}

/** A fresh character: attributes at 5, standard+modern content, 4 BF slots. */
export function blankCharacter(): Character {
  const base: Record<string, number> = {}
  const buyBonus: Record<string, number> = {}
  for (const a of ATTRS) {
    base[a] = 5
    buyBonus[a] = 0
  }
  return {
    name: '', arch: '', age: '', wealth: '', concept: '',
    base, buyBonus, skills: {}, field: [], ltf: [], quirk: [], bfs: [], awards: [],
    slots: DEFAULT_SLOTS, activeTags: ['standard', 'modern'],
    // Mana is a power pool — a second exhaustion track, not a skill and no
    // longer a spend-down point pool. Present on every sheet; ignored unless
    // the character casts.
    wound: 0, exh: { Fatigue: 0, Mana: 0 }, shaken: false, stunned: false, gear: '',
  }
}

// ── conferred by background factors ────────────────────────────────────────
// Background factors confer attribute bumps, skill levels and fields. Conferred
// skill levels are FREE — you only pay for levels bought on top.

/** Has this skill been deliberately given up? */
export function skillDropped(c: Character, name: string): boolean {
  return !!c.skills[name]?.dropped
}

export function conferAttr(c: Character, a: string): number {
  return c.bfs.reduce((s, b) => s + ((b.attrs && b.attrs[a]) || 0), 0)
}

export function conferSkill(c: Character, name: string): number {
  if (skillDropped(c, name)) return 0
  return c.bfs.reduce((s, b) => s + ((b.skills && b.skills[name]) || 0), 0)
}

export function conferFields(c: Character): { name: string; years: number; src: string }[] {
  const out: { name: string; years: number; src: string }[] = []
  for (const b of c.bfs) for (const f of b.fields || []) out.push({ name: f.name, years: f.years, src: b.name })
  return out
}

// ── derived scores ─────────────────────────────────────────────────────────

export function finalAttr(c: Character, a: string): number {
  return (c.base[a] || 0) + conferAttr(c, a) + (c.buyBonus[a] || 0)
}

export function skillTotal(c: Character, name: string): number {
  return conferSkill(c, name) + ((c.skills[name] && c.skills[name].level) || 0)
}

/** The skill's formula value: average of its attributes, halved for a ½-skill. */
export function formulaVal(c: Character, defs: Record<string, SkillDef>, name: string): number {
  const s = defs[name]
  if (!s) return 0
  let sum = 0
  for (const a of s.a) sum += finalAttr(c, a)
  let v = sum / s.a.length
  if (s.half) v /= 2
  return Math.round(v)
}

/** Max level = best contributing attribute × the skill's limit (the 1987 errata definition). */
export function maxLevel(c: Character, defs: Record<string, SkillDef>, name: string): number {
  const s = defs[name]
  if (!s) return 0
  let best = 0
  for (const a of s.a) best = Math.max(best, finalAttr(c, a))
  return Math.floor(best * s.limit)
}

/** Score = formula value + total level. This is the number the One Rule multiplies. */
export function score(c: Character, defs: Record<string, SkillDef>, name: string): number {
  return formulaVal(c, defs, name) + skillTotal(c, name)
}

/** Content filter: an untagged entity always shows; otherwise any tag must be active. */
export function tagMatch(c: Character, tags?: string[]): boolean {
  return !tags || !tags.length || tags.some((t) => c.activeTags.includes(t))
}

// ── point economy ──────────────────────────────────────────────────────────

/** Attribute points bought, priced step by step across the cost break. */
export function attrBuySpend(c: Character, a: string): number {
  const floorA = (c.base[a] || 0) + conferAttr(c, a)
  const fin = floorA + (c.buyBonus[a] || 0)
  const price = (v: number) => (v <= ATTR_COST_BREAK ? ATTR_COST_LOW : ATTR_COST_HIGH)
  let pts = 0
  // Buying up costs; selling down refunds at the same rate (symmetric on one
  // axis — this is point-buy, not a disadvantage economy: a low attribute is
  // broad and genuinely bites, so it isn't a free drawback).
  if (fin >= floorA) for (let v = floorA + 1; v <= fin; v++) pts += price(v)
  else for (let v = fin + 1; v <= floorA; v++) pts -= price(v)
  return pts
}

/** The penalty for attempting a skill you were never taught at all. */
export const ABSENT_BEF_PENALTY = 2

/** Skill entry price: getting a skill AT ALL (to level 0) costs 3 × its cost. */
export const SKILL_ACQUIRE_MULT = 3

/**
 * Do you have this skill at all? Presence in `skills` means acquired — level 0
 * is a real rung (you were taught it; you have no levels yet), distinct from
 * never having been taught, which is `absent`.
 */
export function hasSkill(c: Character, name: string): boolean {
  if (skillDropped(c, name)) return false
  return !!c.skills[name] || conferredAtAll(c, name)
}

/** Did a factor TEACH this skill, even at no levels? `skills: { Melee: 0 }` on
 *  a factor means "you were taught it" — which is the entry price paid, not
 *  nothing. Summing levels would read that as absent. */
export function conferredAtAll(c: Character, name: string): boolean {
  if (skillDropped(c, name)) return false
  return c.bfs.some((b: any) => b.skills && Object.prototype.hasOwnProperty.call(b.skills, name))
}

/**
 * The ease factor a skill is rolled at. An **absent** skill is not "level 0" —
 * it is a thing you have never been shown, and it rolls at **BEF − 2**. That is
 * what makes acquiring a skill at all worth paying for, separately from levels.
 */
export function skillBef(c: Character, defs: Record<string, SkillDef>, name: string): number {
  const bef = Number(defs[name]?.bef) || 5
  return hasSkill(c, name) ? bef : bef - ABSENT_BEF_PENALTY
}

/**
 * Points spent on a skill: **3 × cost to acquire it** (reaching level 0), then
 * **1 × cost per level** on top. A background factor that confers the skill has
 * already paid the entry price, so you only pay for levels.
 */
export function skillBuySpend(c: Character, defs: Record<string, SkillDef>, name: string): number {
  const entry = c.skills[name]
  if (!entry || entry.dropped) return 0 // nothing bought, and conferred levels were free
  const lv = Math.max(0, entry.level || 0)
  const cost = (defs[name] && defs[name].cost) || 1
  return conferredAtAll(c, name) ? cost * lv : cost * (SKILL_ACQUIRE_MULT + lv)
}

/**
 * **Fields are RELATED, not nested** (Tonio, 2026-11-28). A `parent` in
 * fields.json does not mean prerequisite and does not mean containment: *"you
 * might know business and economics, or medicine and biology, but you don't
 * need to know one before the other — though doing so is an advantage in many
 * cases."* So you buy each field you want, at its own cost, in any order.
 *
 * What the link IS for is that advantage: holding a neighbour should help. This
 * returns the fields adjacent to `name` — its parent and its children — for
 * whatever that bonus turns out to be. **The size of the bonus is not yet
 * decided, so nothing applies it yet.**
 */
export function relatedFields(
  defs: Record<string, { parent?: string | null }>,
  name: string
): string[] {
  const out = new Set<string>()
  const parent = defs[name]?.parent
  if (parent) out.add(parent)
  for (const [n, d] of Object.entries(defs)) if (d?.parent === name) out.add(n)
  return [...out]
}

/** Which of a character's own fields are adjacent to `name` in the tree. */
export function relatedFieldsHeld(
  c: Character,
  defs: Record<string, { parent?: string | null }>,
  name: string
): string[] {
  const held = new Set(c.field.map((f) => f.name).concat(conferFields(c).map((f) => f.name)))
  return relatedFields(defs, name).filter((n) => held.has(n))
}

export function fieldBuySpend(c: Character): number {
  return c.field.reduce((s, f) => s + FIELD_COST_PER_YEAR * (f.years || 1), 0)
}

/** A factor is free if the data says so. background-factors.json spells this
 *  `"slot": "free"` (neutral species); `free: true` is accepted too because the
 *  pre-data sheet used it, and a stored character may still carry it. */
export function bfIsFree(b: any): boolean {
  return b?.free === true || b?.slot === 'free' || Number(b?.slot) === 0
}

/** Only non-free factors consume a slot (neutral species are free). */
export function usedSlots(c: Character): number {
  return c.bfs.reduce((s, b) => s + (bfIsFree(b) ? 0 : Number(b.slot) || 1), 0)
}

/** Granted vs spent, and the remainder. Single currency — no separate XP. */
export function pools(
  c: Character,
  defs: Record<string, SkillDef>,
  skillNames: string[]
): { pts: number; granted: number; spent: number } {
  let granted = 0
  for (const b of c.bfs) granted += b.grant || 0
  for (const a of c.awards) granted += Number(a.amt) || 0

  let spent = 0
  for (const a of ATTRS) spent += attrBuySpend(c, a)
  for (const n of skillNames) if (c.skills[n]) spent += skillBuySpend(c, defs, n)
  spent += fieldBuySpend(c)
  spent += wealthSpend(c)

  return { pts: granted - spent, granted, spent }
}

/**
 * Clamp bought skill levels so conferred + bought never exceeds the max level.
 * Needed after anything that lowers an attribute or removes a factor. Mutates.
 */
export function clampSkills(c: Character, defs: Record<string, SkillDef>): void {
  for (const name of Object.keys(c.skills)) {
    if (!defs[name]) continue
    const mx = maxLevel(c, defs, name)
    const conf = conferSkill(c, name)
    const lv = c.skills[name].level || 0
    if (conf + lv > mx) c.skills[name].level = Math.max(0, mx - conf)
  }
}
