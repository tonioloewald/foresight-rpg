# Melee Combat
<!--{ "parent": "conflict", "order": 4 }-->

*One-pager. Melee is nothing new — it's [opposed resolution](/the-one-rule/) applied to hitting someone at arm's length: your attack against their defence, **QRs compared**, exactly like stealth-vs-search or a tennis point. It just asks four questions in order, and hands the last one to [Damage](/damage/).*

## The four questions

1. **Did it land?** — your weapon skill against their **parry** or **dodge**; compare QRs.
2. **Was it wholly or partially mitigated?** — the blocking table below turns the two QRs into the attack's *effective* QR.
3. **Where did it strike?** — hit location — **unless it was an aimed strike, in which case this came first** (you called the target and paid for it up front).
4. **How hard?** — the effective QR and the weapon's DC, through armor → [Damage](/damage/). Armor and damage are that page's business, not this one's.

## Attack vs defence — compare QRs

Both sides roll their own task and the **better QR prevails** — the general opposed-resolution move. The attacker rolls their melee skill; the defender **parries** or **dodges**, each a *reaction* (so it stacks the cumulative −2 of [Intense Action](/intense-action/) — the parry you saw coming is cheaper than the one you didn't). Equal QRs cancel: the blow *just* turned aside, the tension holds, you both go again — which is what makes a melee a taut back-and-forth rather than one roll.

### Attack and defence are two intents

"Kill him with this sword" is a *statement of intent*, not one action — it plays out as discrete beats: a **lunge** to close, a **wind-up** for an especially heavy blow, the **blow** itself. **"Don't get hit" is a second intent**, and a fighter is almost always pursuing both at once — pressing the attack while keeping a guard up — one **primary**, one **secondary**; or (the berserker, the duellist waiting for the opening) all-in on just one. That is exactly the [Intense Action](/intense-action/) split: your focus is sharp and everything else is worse. So the all-out attacker hits harder and guards poorly, while the careful fighter trades a step off the attack (−1) to keep a real defence (−2) — and melee's ebb and flow *is* that choice, remade each exchange.

## Partial blocking — how much got through

A defence doesn't just win or lose; it can **eat part** of a blow. A defence **equal to or better than** the attack negates it; otherwise the attack's QR drops **(5 − the defending QR)** notches down the 1-2-3-4 scale. The failure end isn't arithmetic: a **QR7** defence is *no defence* (the attack lands at its full rolled QR), and a **QR10** defence **makes it worse** by a notch (you fumbled into it). Read off the attack's **effective QR** — what actually reaches the target:

<!-- matrix: melee-blocking -->
<div class="matrix"><style>
.mx-table{border-collapse:collapse;margin:0 0 1em;font-size:.9em}
.mx-table th,.mx-table td{border:1px solid rgba(128,128,128,.35);padding:.32em .6em;text-align:center;vertical-align:middle}
.mx-corner{border:0;background:transparent}
/* Header cells live in <thead>, which the doc-system theme paints
   background:var(--brand-color) + color:var(--brand-text-color). Overriding only
   the background there left brand-white text on light grey — so these keep the
   theme's own background/text PAIR and just restyle the type. (color:inherit
   doesn't help: it inherits that same brand text colour from <thead>.) */
.mx-colaxis,.mx-colhead{background:var(--brand-color,transparent);color:var(--brand-text-color,inherit)}
.mx-colaxis{font-size:.72em;text-transform:uppercase;letter-spacing:.08em;font-weight:600}
.mx-colhead{font-weight:600;font-size:.85em}
/* Row headers are in <tbody> — no brand paint there, so a subtle tint + the body
   text colour is correct and readable in light and dark themes. */
.mx-rowaxis{font-size:.72em;text-transform:uppercase;letter-spacing:.08em;font-weight:600;background:rgba(128,128,128,.14);color:var(--tosi-text,inherit);writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;width:1.7em}
.mx-rowhead{font-weight:600;background:rgba(128,128,128,.06);font-size:.85em;color:var(--tosi-text,inherit)}
.mx-blocked{opacity:.45;font-style:italic}
</style><table class="mx-table"><thead><tr><td class="mx-corner" colspan="2" rowspan="2"></td><th class="mx-colaxis" colspan="6">Defence →</th></tr><tr><th class="mx-colhead">QR1</th><th class="mx-colhead">QR2</th><th class="mx-colhead">QR3</th><th class="mx-colhead">QR4</th><th class="mx-colhead">QR7 fail</th><th class="mx-colhead">QR10 botch</th></tr></thead><tbody><tr><th class="mx-rowaxis" rowspan="4">Attack ↓</th><th class="mx-rowhead">QR1</th><td class="mx-blocked">blocked</td><td>QR4</td><td>QR3</td><td>QR2</td><td>QR1</td><td>QR1</td></tr><tr><th class="mx-rowhead">QR2</th><td class="mx-blocked">blocked</td><td class="mx-blocked">blocked</td><td>QR4</td><td>QR3</td><td>QR2</td><td>QR1</td></tr><tr><th class="mx-rowhead">QR3</th><td class="mx-blocked">blocked</td><td class="mx-blocked">blocked</td><td class="mx-blocked">blocked</td><td>QR4</td><td>QR3</td><td>QR2</td></tr><tr><th class="mx-rowhead">QR4</th><td class="mx-blocked">blocked</td><td class="mx-blocked">blocked</td><td class="mx-blocked">blocked</td><td class="mx-blocked">blocked</td><td>QR4</td><td>QR3</td></tr></tbody></table></div>
<!-- /matrix -->

*(The better the defence, the more of the attack it eats; an equal defence blocks it clean — the just-barely parry. A botched defence leaves you worse off than no defence at all.)*

## Parry, and the counter

A **parry** meets steel with steel (or shield, or forearm). A *critical* parry (a QR well over the attack's) lets you **counter** on the same beat; an *overwhelming* one leaves the attacker off-balance — a chance to **disarm** or **trade places**. A parry can also shade the hit rather than stop it: a strong-but-not-clean one may **shift the location roll** a step or **shave a point of DC** instead of eating a whole QR.

## Dodge — movie reality, or actual reality

A **dodge** gives ground to deny the opening — and this is where forty years show. When these rules were first written, the reconstruction of historical Western martial arts was in its infancy (the SCA and its kin); it's a far more serious discipline now, and one thing it has taught us plainly is that **dodging a blow is a losing strategy** — you do not lean out of the way of a sword.

So decide which reality your table is playing in, and read *dodge* accordingly:

- **Movie reality** — it's the hero's preternatural reflexes, the world in slow motion, the matrix-lean. Dodge freely; it's a genre convention and a perfectly good one.
- **Actual reality** — a "dodge" is really **pre-emptive movement**: you anticipate the attack and shift *before* it commits, so it can't land well — denying the opportunity, not out-reacting the blade. That makes it a matter of *positioning and timing* (a held/pre-empting action — see [Initiative](/initiative/)), not a reflex save after the fact. Under this reading, favour the parry, treat a dodge as something set up early, and penalize the desperate leap-aside for what it is.

Either is legitimate — ForeSight colours no setting. Just tell the table which one, and modify the dodge to match.

## Reach: every weapon has a range it wants

**One weapon property replaces a table of modifiers.** A melee weapon is happiest at exactly one of three distances:

| Its range | Weapons |
|---|---|
| **Reach** | pike, halberd, spear, quarterstaff, two-handed sword |
| **Normal** | rapier, longsword, battleaxe, mace |
| **Close** | dagger, cestus, fists, a bottle |

- **At your weapon's own range: +1.** You are fighting the way the thing was designed to be fought with.
- **One band off: −1.** A longsword in a knife-fight; a dagger against someone at sword's length.
- **Two bands off: −3.** A two-handed sword in a grapple — you *can* club with the hilt, but it is a badly balanced weapon held by the wrong end.

*(Even steps of two: +1, −1, −3.)*

**Both fighters are on the same range, and they rarely want the same one** — which is the whole tactical engine. The spearman wants you out there; the knife-fighter wants to be inside your arms. **Only one of them can be happy at a time**, so a melee is a running argument about distance, and the loser of that argument is either fighting at −2 or spending beats fixing it.

**And identically armed fighters still move, because giving ground is a defence.** Two men with sword and shield both want *Normal*, so reach alone gives them nothing to argue about — but **yielding distance blunts an attack** (see *dodge and give ground*, below), and yielding takes you *out* of your own band. So the defender trades his +1 for a defensive advantage, and the attacker must **spend a beat closing back** to get his own +1 back. Press, yield, close, yield: that exchange is the rhythm of a fight between equals, and it falls out of two rules that were written separately.

**Changing range is a combat move: a beat, and a Coordination roll** (see *Footwork*, below). Against someone actively keeping you out — or dragging you in — it's opposed. So closing on a pikeman is a real, rollable, failable thing, which is exactly how it looks: three men with spears are a problem you solve with a plan, not by walking up to them.

*This is why a knife is a terrifying weapon in a lift and a joke in a courtyard, without a single special rule about lifts or courtyards.*

**And it needs no miniatures.** ForeSight melee has always made footwork load-bearing — one of the real pleasures of it is that people genuinely *move* — but "who is where" has usually meant a hexgrid or a table full of figures. Three named bands replace measurement with a **shared state you can hold in your head**: not a position for each fighter, but **one word per engagement**, agreed by both. Reach, Normal, Close.

That is enough to give you a **qualitative reason to move** — *I have a two-handed sword and he has a dagger, so I want him out there and he wants to be inside my guard* — with nothing on the table at all. Miniatures remain welcome and add nothing you need.

## Footwork: giving ground, circling, and going over the furniture

A melee is not two people standing still. Fighters **circle, close, and give ground** constantly — and every bit of that is [movement](/intense-action/), which means **Coordination**, which means it can go wrong.

**This is the gap.** In previous editions of ForeSight — and in essentially every other system — a complete klutz could manoeuvre in a melee exactly as well as an acrobat. Combat movement was free, so the most common physical activity in the game was the one place your body didn't matter. Meanwhile *backing off and tripping over something* is a staple of action cinema **and** of real fights, and it never happened at anybody's table.

**Now it does, and it costs nothing to run.** On a clear floor the ease factor is high and nobody rolls. It bites exactly where it should:

- **Giving ground under pressure** — you are retreating while someone actively works to put you down, so the EF is poor. This is where the klutz goes over.
- **Closing or opening to your weapon's range** — the commonest reason to move in a fight (see *Reach*, above), and the one your opponent is actively resisting.
- **Fighting on bad footing** — rubble, stairs, a wet deck, a room full of upturned chairs, mud, a slope.
- **Disengaging from a committed opponent** — turning your back is its own problem; doing it *quickly* is a Coordination task at a penalty.

**QR7 loses your balance; QR10 puts you on the floor** — and being down in a melee is very bad indeed, which is the point. A graceful fighter can break contact, circle to better ground, and re-enter; a clumsy one commits to the fight whether they like it or not, because backing out is a risk they can't afford. **That is a real tactical difference between two characters that the old rules simply couldn't express.**

*This is also where the **graceful** and **nimble** quirks earn their keep, and where Athletics (which absorbed Acrobatics) shows up in an ordinary fight rather than only on a rooftop chase.*

## Grappling, pinning, and fighting dirty

When a fight collapses into a clinch it stops being about *landing* blows and becomes about **control** — of the other person's limbs, of a weapon, of position. Seizing, pinning, twisting, gouging, choking.

There's a light spine if you want one: track **control** as a few steps — **partially restrained → restrained → completely restrained** — and when the struggle is over an *object* (a knife, a gun, a fountain pen), simply *who holds it*. Each contested moment is an opposed roll — Strength, or whatever skill fits — and the winner shifts control a step; someone completely restrained is at the other's mercy: choked out, disarmed, pinned, or worse.

But mostly: **don't reach for a rule.** Grappling is the purest case of ForeSight's founding bet — that the people at the table understand *this* particular tangle far better than any designer ever could. Run it on [Initiative](/initiative/) (who acts, who's waiting for an opening) and [opposed resolution](/the-one-rule/) (each contested thing), and improvise the rest.

> *The gedanken cases: the brawl atop the tank in* Indiana Jones and the Last Crusade *— arms tangled, a fountain pen squirting ink into someone's eyes, everyone scrabbling for a grip on everything at once. Or Gersen and the Hetman at the close of Vance's* The Killing Machine *— his hands crippled, Gersen traps the Hetman's arms with his legs and head-butts the broken nose to drown him in his own blood. No table produces those moments; "roll Initiative, then make the opposed roll that fits" does.*

*Designer's Note: melee earns a page not because it needs new rules — it doesn't, it's the One Rule's opposed move plus the reaction economy — but because the questions have an order (land, mitigate, locate, wound) and because the dodge and the clinch each deserve an honest footnote. The blocking table is the only genuinely new thing here, and it's just "(5 − QR)" made into a lookup so you don't do arithmetic mid-swing.*
