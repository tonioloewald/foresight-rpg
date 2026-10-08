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
