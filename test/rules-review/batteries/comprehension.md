# Battery B — comprehension

**Run on:** the page set that the questions' `pages` field names.

Measures whether the text **conveys the rule**, against the ground truth in
`../questions/core.json`. This is the only battery with right answers, so it is the one that
produces a number.

**Prompt:**

> Read every page in `<DIR>`, starting with `00-READ-THIS-FIRST.md`, and obey its isolation
> rule.
>
> Then answer the questions below. For **each** one give:
> - **Answer** — the number or ruling.
> - **Derivation** — the steps, naming the rule and the page you used. An answer without a
>   derivation does not count.
> - **Confidence** — high / medium / low.
> - **Ambiguity** — if the pages admit more than one reading, say so, give both, and say
>   which you answered with. If the pages do not answer the question at all, say exactly
>   that and name the page you expected would.
>
> Do not look anything up and do not reason from other games you know.
>
> <QUESTIONS>

**Scoring**, per item: **1** correct answer with a correct derivation; **0.5** correct answer
with a wrong or absent derivation (it guessed); **0** wrong. Score the *ambiguity* reports
separately and do not penalise them — an item where the reviewer answers correctly *and*
flags a genuine ambiguity is the best possible outcome, because it has found a prose defect
without being misled by it.

Two items (`qr-100`, `pm-vs-build`) have no clean answer on purpose. They are calibration:
a reviewer that answers them confidently and without hedging is not reading carefully, and a
run where nobody flags them is evidence the battery is too easy or the reviewer too agreeable.
