# Expected rule: multiple actions in a round

The missing page is almost certainly the one `initiative.md` links to as **Intense Action** ("Initiative sets the *when*, Intense Action prices the *how much*"). Here is what I would expect it to say.

## The rule I'd expect

**1. Declare the count, pay once.** When your declaration comes round and you choose to act, you say how many tasks you are attempting this round, N. Every one of them takes **−(N − 1) EF**, summed with all other modifiers before stepping along the ladder. One task is free, two are −1 each, three are −2 each.

**2. One D100 per task, each read normally.** Each roll is against its own Score × EF and gives its own QR. With Score 15 and BEF 5:

| Tasks | EF each | SC each |
|---|---|---|
| 1 | 5 | 75% |
| 2 | 4 | 60% |
| 3 | 3 | 45% |
| 5 | 1 | 15% |
| 6 | ½ | 8% |
| 8 | 0 | impossible |

There is no separate cap on actions, because the ladder supplies one. A Score of 26–28 (20+2) does three things at a flat 100%, which is the "what lesser mortals cannot" clause at work.

**3. Reactions come out of the same budget.** A parry, dodge or block is a task. If you declared it, it sits inside N. If you did not, it takes **−1 EF for each task you have already attempted this round**, and your earlier rolls are not revised.

**4. Parry or dodge is an Oppose.** The defender rolls Melee (parry) or Athletics (dodge) and compares QRs with the attack.
- **Defender better or equal:** no hit ("equal QRs cancel — the blow *just* parried").
- **Attacker better:** the hit lands, degraded by the margin. One rank better reads Yield as QR4, two as QR3, three as QR2.
- **Defence fails (QR7):** the attack keeps its own QR.
- **Defence fumbles (QR10):** the attack improves one rank.

**5. Helping is a Build.** The helper spends one of their own tasks, rolls their own ability, and the helped character gets **+(5 − QR)**: +4, +3, +2 or +1. A failed assist gives nothing and a QR10 gives −1. Only one helper's result applies (the best).

**6. All-out.** Forgoing all defence gives **+2 EF** on attacks; forgoing all offence gives **+2 EF** on defences. A QR7 Initiative roll (panic) forces one of the two. A QR10 (freeze) means N = 0, and any reaction that round is at −2.

**7. Waiting.** A waiting character has spent nothing, so a triggered action is their first task at no penalty. The pre-emption Coordination roll is not counted as a task.

## Confident versus guessing

**Follows from the core rules:**
- The price is an EF modifier, summed first, and paid up front ("Pay once").
- It is small per step, since ±1 is "already potent".
- Parry is Oppose with ties cancelling.
- Help is Build at +(5 − QR).
- Each task gets a normal D100 and QR read.
- High scores absorb the penalty better.
- Panic implies all-out offence and all-out defence exist as defined modes.

**Guessed:**
- The size, −1 per extra task rather than −2.
- The penalty hitting all tasks equally rather than escalating.
- Undeclared reactions costing −1 per prior task.
- The whole margin-to-Yield mapping in step 4.
- +2 for all-out.
- Failed and fumbled assists.
- One helper only.
- Pre-emption being free.

## What I cannot derive

- **The penalty's size and shape:** flat or escalating, and whether it differs for same-skill and different-skill combinations.
- **Whether one defence is free each round.** "No holding back" suggests a normal round includes held-back defence.
- **Whether movement is a task.**
- **How a parry margin converts to damage.** `quality-ratings.md` defers to an absent Opposed Resolution page and its "blocking table".
- **Whether one defence roll covers several attackers.**
- **How Initiative QR numerically modifies anything.** The pre-emption text says "modified by" with no number.
- **What LTF means** in the Melee and Firearms entries. No page here defines it.

## Where the core rules point two ways

- **Help: +(5 − QR) or 4 − QR?** Build gives +4 to +1 and has no failure value. PM gives +3 to +0 and −3 or −6 on failure. An assist is arguably a "product used in a later task". I chose Build.
- **Parry has three mechanics on offer.** `the-one-rule.md` says compare QRs, or take 5 − QR as a penalty against a "standing" result. `quality-ratings.md` adds a third: use the prior QR as the *base ease factor* of the counter-task. A parry against a QR1 attack is a QR comparison under one reading and a BEF 1 roll under another.
- **Up-front price or Time column?** "Pay once, up front" implies a declared penalty. But Time says a QR1 is "done in a flash", which invites a rule where a fast first action buys a second. "Read one column" seems to forbid this without quite saying so.
- **Declared versus reactive.** A flat declared penalty and an unplanned parry cannot both be "paid up front". My escalating reaction cost is a patch over that gap.
- **One roll or many.** "One roll tells you *whether* and *how well*" could mean a single D100 read against every task's SC. I chose separate rolls because Oppose needs independent results.

Two inconsistencies also touch this:
- Initiative's BEF is 5 in `skills.md` but "3 + E" in `scores.md`.
- `the-one-rule.md` has the Duke resist with WP, which `scores.md` says has "since gone".

## Files read

`00-READ-THIS-FIRST.md`, `the-one-rule.md`, `quality-ratings.md`, `scores.md`, `skills.md`, `initiative.md` — all six, in full.

Nothing outside the directory was opened: no searches, no web, and I did not read the memory directory. One shell loop to print the files was blocked before running, so I read them individually. The only outside material in my context was session metadata supplied automatically (your email, tool lists, the date), and none of it was used. The pages themselves name the game and its James Bond 007 lineage; I worked only from the page text and did not draw on anything I might know of either.
