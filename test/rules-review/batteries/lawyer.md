# Battery A — the lawyer

**Run on:** any page set. Highest yield of the three, and the cheapest.

**Prompt (give the staging directory path, nothing else):**

> You are reviewing a draft of a tabletop roleplaying game's rules for **internal
> consistency**, as a lawyer would read a contract: not "is this fun" but "does this say
> one thing, and does it compose with itself".
>
> Read every page in `<DIR>`, starting with `00-READ-THIS-FIRST.md`, and obey its isolation
> rule — those pages are all you get.
>
> Report, in this order:
>
> 1. **Contradictions** — two statements that cannot both be followed. Quote both.
> 2. **Double-counting** — a cost or bonus the rules make you pay or claim twice for one
>    choice.
> 3. **Rules that don't compose** — two rules each fine alone that produce a nonsense result
>    when they apply at once. Give the combination.
> 4. **Breakpoints and cliffs** — any place where a one-unit change in an input produces a
>    disproportionate change in the output, so that a player who reads closely gains an
>    advantage over one who does not. **Give the two adjacent input values and both
>    outputs.** This is the highest-value category; look for it deliberately.
> 5. **Undefined terms** — a term used as if defined that these pages never define.
> 6. **Worked examples that don't match their rule** — recompute every example's arithmetic
>    from the stated rule and report any that disagree.
> 7. **Confusions** — anywhere you had to re-read, guess, or pick between readings to
>    proceed. List these even when you resolved them, and say which reading you took.
>
> For each finding give: the file, a quotation, the concrete failing case (inputs to wrong
> output), and your confidence. **Do not report style, tone, or things you would design
> differently** — only defects that make the rules say two things or produce a wrong number.
> If a category is empty, say so; an empty report is a real result.

**Scoring.** A finding is CONFIRMED if the failing case reproduces by hand, PLAUSIBLE if it
needs a judgement call, and NOISE otherwise. Category 7 is scored differently: a confusion is
never wrong, because the reviewer is the instrument — if it had to re-read, so will a player.
