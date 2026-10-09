# Battery C — extrapolation

**Run on:** a deliberately incomplete page set — the core pages, with the page under test
**withheld**.

This is the one that measures the actual design goal. The book claims you can *run the game
from memory* because everything is one rule applied to a situation. If that is true, a reader
given the core should be able to **predict** a subsystem they have never seen. Where they
predict it correctly, the subsystem is derivable and could arguably be shorter. Where they
predict something *better*, that is a design finding. Where they cannot predict it at all,
the subsystem is carrying a special case — which may be right, but should be deliberate.

**Prompt:**

> Read every page in `<DIR>`, starting with `00-READ-THIS-FIRST.md`, and obey its isolation
> rule. You have the core resolution rules of a tabletop roleplaying game, but **not** the
> page covering `<SUBSYSTEM>`.
>
> Working only from what you have, write the rule you would **expect** that page to contain.
> Be specific and numeric: give the formula, the modifiers and their sizes, and what the dice
> decide. Then say:
> - which parts you are confident follow from the core rules, and which you are guessing;
> - what you would need the missing page to tell you that you cannot derive;
> - any place where the core rules seem to *point at* two different answers.
>
> Do not hedge into generalities. A specific wrong guess is far more useful than a vague
> right one.
>
> **State the units of anything you invent.** If your rule tracks a quantity, say what one
> point of it is and what the whole range means. If it is a modifier, say what it modifies.

**Scoring.** Compare against the real page and classify each element: **DERIVED** (predicted
correctly — the page may be able to shrink to just the non-obvious part), **ARBITRARY**
(predicted something reasonable but different — the real rule is a choice, so the page must
*justify* it, not just state it), **UNGUESSABLE** (could not be predicted — a genuine special
case; check it earns its keep), **BETTER** (the prediction is an improvement; file it).

**Staging note.** Put `scores.md` in the core set whenever the withheld page rolls an
attribute. Without it a reviewer cannot tell whether `ST` is Strength or a third toughness
attribute, and the resulting confusion is an artifact of the staging rather than a property of
the text under test. (2026-10-09: it cost one otherwise-good run a false ambiguity report.)

**Why the units clause is there.** The two sharpest findings of the first run were both missing
units in the *real* page, and the reviewer only exposed them by supplying its own: a 0-10 Lead
track where `pursuit.md` says "QR says by how much", and a QR-numbered exhaustion table where
the page uses prose labels. An extrapolator that hedges on units cannot find that class of
defect.
