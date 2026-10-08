# Rules review harness

Runs the rules past reviewers who have **never seen the design intent**, and measures what
the text alone conveys. Three batteries, in increasing ambition:

| | Battery | Asks | Produces |
|---|---|---|---|
| **A** | [lawyer](batteries/lawyer.md) | does this say one thing, and compose with itself? | findings, each a checkable failing case |
| **B** | [comprehension](batteries/comprehension.md) | can a reader get the right number out of it? | a score, against ground truth |
| **C** | [extrapolation](batteries/extrapolation.md) | can a reader *predict* a page they haven't seen? | which subsystems are derived, arbitrary, or special cases |

Battery C is the one that tests the actual design claim. The book says you can run the game
from memory because everything is one rule applied to a situation. If that is true, the core
should let you guess the rest.

## The isolation rule — the whole point

A reviewer that can read `Design Document.md`, `REVIEW.md`, `CLAUDE.md` or a commit message
is not measuring whether the prose conveys the rule. It is measuring whether it can read a
design document. So `stage.ts` copies **only** the pages under test into an empty directory,
drops a `00-READ-THIS-FIRST.md` stating the rule, and the reviewer gets that path and nothing
else.

```
bun test/rules-review/stage.ts --out /tmp/run --rev <git-rev> the-one-rule intense-action
```

Every battery ends by asking the reviewer to list **FILES READ**. That is the contamination
check: a path outside the staging directory invalidates the run, and a reviewer that cites a
design rationale absent from the staged pages has either guessed or wandered. Check it before
you believe a result.

Isolation cannot be *enforced*, only instructed and then audited. Treat the file list as
evidence, not proof.

## Validate the instrument before you trust it

**Git history is a labelled test set.** Every defect this project has already found and fixed
is a known-positive sitting at a known revision, so a battery can be scored for sensitivity
before it is pointed at rules we are unsure about. A battery that cannot rediscover a defect
we know is there tells you nothing when it reports a page is clean. See [fixtures.md](fixtures.md).

Run a known-bad fixture and a current page set **in the same session**, so the two results
are comparable and the clean one means something.

## Reviewers

Fresh agents with no conversation context. A smaller or cheaper model is *better* here, not
worse: the floor is what matters. A reviewer clever enough to repair the prose as it reads is
measuring its own ability, not the page's clarity. Blind matters; clever does not.

Battery B's score is only comparable across runs of the **same question bank at the same
revision**. Adding questions resets the baseline.

## What this does not do

It does not measure whether the game is *fun*, whether a rule survives contact with a table,
or whether anyone will bother tracking it. Those need people. This measures the properties the
text can be held to on its own: consistency, legibility, and derivability.

## First run, 2026-10-08 — and what it taught us about the harness

**Instrument validated.** Battery A on fixture 1 (`e06095e`) found the planted defect
unprompted, in the category it was predicted to fall in: *"Score 5 → 6 = 1 beat → 2 beats. One
point of Score doubles your attacks per round."* It then found the same cliff recurring every
five points, and noticed that the page's **own example character** escapes its own verdict for
one point of Coordination — a sharper statement of the defect than the commit that fixed it.
So Battery A detects breakpoints, and a clean category-4 report from it now means something.

**Battery B scored 16/16 — twice.** That is a ceiling effect, not a triumph: these questions
do not discriminate at the top of the model range. What the runs produced of value was not the
score but the **ambiguity reports**, which is why those are collected separately and not
penalised. Two of them independently out-reasoned this bank's own ground truth on `qr-100`
(the fumble row's `> SC` condition cannot fire when SC exceeds 100), and the bank has been
corrected. **Run Battery B on a smaller model** — the floor is the measurement.

**The contamination channel we missed, and that the harness caught.** A subagent inherits the
parent session's project context, so this repo's `CLAUDE.md` — which summarises the EF ladder,
the QR thresholds and yields, and a damage formula — arrived in both reviewers' windows before
the task did. Neither opened a file outside the staging directory, and both disclosed the
injection unprompted because the battery asks what they read. **The FILES READ audit is the
part of this harness that works; do not drop it.**

Two fixes landed: `run.sh` runs the reviewer with cwd inside the staging directory and settings
sources suppressed, which a probe confirms yields no `CLAUDE.md` and no memory; and `stage.ts`
now **refuses a staging path that names the system**, because a reviewer that can read
`.../-Users-someone-foresight/...` in its own cwd can name the game.

**And then the measurement that matters: it made no difference.** The contaminated and
clean-room runs of Battery B both scored 16/16 and flagged the same four ambiguities with the
same reasoning. So the first run's findings stand, and more usefully: on these pages the
battery is reading the page rather than the context. That is a result about the instrument,
obtained for the price of one extra run, and it is the reason to keep running the clean path
anyway — the next page set may not be so robust.
