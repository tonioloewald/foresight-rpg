#!/usr/bin/env bun
/**
 * Stage a set of rules pages into an isolated directory for a blind reviewer.
 *
 * The whole value of this harness is that the reviewer sees the RULES AS SHIPPED and
 * nothing else — no `Design Document.md`, no `REVIEW.md`, no `CLAUDE.md`, no git history,
 * no commit messages explaining what a rule is for. A reviewer that can read the design
 * intent is not measuring whether the text conveys the rule; it is measuring whether it can
 * read. Test Plan.md calls this "enforced context isolation" and it is the one thing that
 * makes a blind result worth anything.
 *
 *   bun test/rules-review/stage.ts --out <dir> [--rev <git-rev>] the-one-rule quality-ratings
 *
 * `--rev` stages the pages as they were at that revision, which is how the instrument gets
 * validated: stage a revision whose defect is already diagnosed, and see whether the battery
 * finds it. See fixtures.md.
 */
import { $ } from 'bun'
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { join } from 'node:path'

const argv = process.argv.slice(2)
const flag = (name: string) => {
  const i = argv.indexOf(`--${name}`)
  return i === -1 ? undefined : argv[i + 1]
}
const out = flag('out')
const rev = flag('rev')
const pages = argv.filter((a, i) => !a.startsWith('--') && argv[i - 1] !== '--out' && argv[i - 1] !== '--rev')

if (!out || pages.length === 0) {
  console.error('usage: stage.ts --out <dir> [--rev <git-rev>] <page>...   (page = basename, no .md)')
  process.exit(1)
}

// The staging PATH is itself a contamination channel: a reviewer that can see
// ".../-Users-someone-foresight/..." in its cwd can name the game, and may then answer from
// what it knows rather than from the page. Stage somewhere neutral.
const leak = /foresight|rpg/i.exec(out)
if (leak) {
  console.error(
    `refusing: the output path contains "${leak[0]}", which names the system under test.\n` +
      `Stage somewhere neutral, e.g. $(mktemp -d /tmp/rules-review.XXXX).`,
  )
  process.exit(1)
}

await rm(out, { recursive: true, force: true })
await mkdir(out, { recursive: true })

// The metadata block drives site nav and says nothing about the rule. Strip it so the
// reviewer isn't reading section ordering as if it were content.
const strip = (md: string) => md.replace(/^<!--\{[\s\S]*?\}-->\n/m, '')

const staged: string[] = []
for (const page of pages) {
  const path = `src/rules/${page}.md`
  const md = rev
    ? await $`git show ${rev}:${path}`.text()
    : await Bun.file(path).text()
  await writeFile(join(out, `${page}.md`), strip(md))
  staged.push(page)
}

await writeFile(
  join(out, '00-READ-THIS-FIRST.md'),
  `# What you are looking at

This directory holds **${staged.length} page(s) of draft rules** for a tabletop
roleplaying game. They are the complete and only material you have.

**Do not look for more.** Do not search the filesystem outside this directory, do not
look for a design document, a README, a repository, a git history or anything on the web,
and do not use anything you may happen to know about this or any similar game. If you
recognise the system, set that knowledge aside and work only from these pages — a judgement
informed by outside knowledge is worthless here, because the entire question is what *these
pages* convey to someone reading them cold.

If a question cannot be answered from these pages, the correct answer is **"the pages do not
say"** — and that is a finding, not a failure. Say which page you expected would answer it.

Pages present: ${staged.map((p) => `\`${p}.md\``).join(', ')}
${rev ? `\nStaged from revision \`${rev}\`.\n` : ''}`,
)

console.log(`staged ${staged.length} page(s) → ${out}${rev ? ` @ ${rev}` : ''}`)
