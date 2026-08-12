// Runnable check of the point economy and derived scores: `bun run check`.
// Not a test framework — one file, no runner config. It exists because these are
// the numbers players will argue about, and 'it compiled' proves nothing about
// arithmetic. Add a case whenever a rule changes.
import * as R from './character-rules'
const defs: Record<string, R.SkillDef> = {
  Climbing: { a: ['ST', 'CO'], limit: 1, cost: 1, formula: '(ST+CO)/2' },
  Archery:  { a: ['CO', 'PC'], half: true, limit: 1.5, cost: 2, formula: '(CO+PC)/4' },
}
const c = R.blankCharacter()
let fail = 0
const eq = (label: string, got: any, want: any) => {
  const ok = JSON.stringify(got) === JSON.stringify(want)
  if (!ok) fail++
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`)
}
// baseline: all attrs 6
eq('finalAttr ST (base 5)', R.finalAttr(c, 'ST'), 5)
eq('formulaVal Climbing (5+5)/2', R.formulaVal(c, defs, 'Climbing'), 5)
eq('formulaVal Archery half (5+5)/4', R.formulaVal(c, defs, 'Archery'), 3)
eq('maxLevel Climbing 5*1', R.maxLevel(c, defs, 'Climbing'), 5)
eq('maxLevel Archery 5*1.5', R.maxLevel(c, defs, 'Archery'), 7)
// buy 3 points of ST: 7,8,9 all under the break → 10 each
c.buyBonus.ST = 3
eq('attrBuySpend ST 5→8', R.attrBuySpend(c, 'ST'), 30)
// push across the 12 break: 10,11,12 @10 then 13 @20
c.buyBonus.ST = 8
eq('attrBuySpend ST 5→13 (crosses break)', R.attrBuySpend(c, 'ST'), 10 * 7 + 20)
c.buyBonus.ST = -2
eq('attrBuySpend ST 5→3 sold down (refund)', R.attrBuySpend(c, 'ST'), -20)
eq('finalAttr ST at floor', R.finalAttr(c, 'ST'), R.ATTR_FLOOR)
c.buyBonus.ST = 0
// skill bought from scratch: cost x (level+2)
c.skills.Climbing = { level: 3 }
eq('skillBuySpend Climbing L3 from scratch (1x(3+2))', R.skillBuySpend(c, defs, 'Climbing'), 5)
// a BF conferring the skill removes the +2 entry price, grants points, costs a slot
c.bfs.push({ name: 'Mountain Born', skills: { Climbing: 2 }, attrs: { CO: 1 }, grant: 20 })
eq('conferSkill Climbing', R.conferSkill(c, 'Climbing'), 2)
eq('conferAttr CO', R.conferAttr(c, 'CO'), 1)
eq('finalAttr CO 5+1', R.finalAttr(c, 'CO'), 6)
eq('skillTotal Climbing 2+3', R.skillTotal(c, 'Climbing'), 5)
eq('skillBuySpend Climbing conferred (1x3)', R.skillBuySpend(c, defs, 'Climbing'), 3)
eq('score Climbing formula(6,7)+5', R.score(c, defs, 'Climbing'), R.formulaVal(c, defs, 'Climbing') + 5)
eq('usedSlots (1 non-free)', R.usedSlots(c), 1)
// fields: 4/yr
c.field.push({ name: 'Medicine', years: 3 })
eq('fieldBuySpend 3yr', R.fieldBuySpend(c), 12)
// pools: granted 20 + award 5; spent = skills 3 + fields 12
c.awards.push({ amt: 5 })
eq('pools', R.pools(c, defs, Object.keys(defs)), { pts: 25 - 15, granted: 25, spent: 15 })
// clamp: drop CO so Archery's max falls, ensure bought level is clamped
c.skills.Archery = { level: 9 }
c.base.CO = 2
R.clampSkills(c, defs)
eq('clampSkills Archery to maxLevel', c.skills.Archery.level <= R.maxLevel(c, defs, 'Archery'), true)
console.log(fail ? `\n${fail} FAILURE(S)` : '\nall rules checks passed')
