#!/usr/bin/env bash
# Run a battery against a staged directory as a GENUINELY blind reviewer.
#
# Why this exists rather than just spawning a subagent: a subagent inherits the parent
# session's project context, so `CLAUDE.md` and the auto-memory index arrive in its window
# before the task does — and this project's CLAUDE.md contains a condensed summary of the
# rules (the EF ladder, the QR thresholds and yields, a damage formula). A reviewer holding
# that is not reading the page cold. The first run of Battery B caught this itself, because
# the battery asks for the files it read and the reviewer was honest about what was injected.
#
# Three things make the read clean:
#   - cwd is the staging directory, which lives outside the repo, so no project CLAUDE.md is
#     an ancestor and none is discovered;
#   - --setting-sources '' drops user and project settings, including user-level memory;
#   - --exclude-dynamic-system-prompt-sections drops cwd/env/memory-path/git-status blocks.
#
#   test/rules-review/run.sh <staged-dir> <battery-prompt-file> [out-file]
#
# The battery prompt files under batteries/ hold the prompt as prose; pass a file containing
# the final prompt text (with <DIR> already substituted, or just say "this directory").
set -euo pipefail

dir="${1:?usage: run.sh <staged-dir> <prompt-file> [out-file]}"
prompt_file="${2:?usage: run.sh <staged-dir> <prompt-file> [out-file]}"
out="${3:-${dir%/}.review.md}"   # NOT inside $dir: the reviewer would see it

[[ -d $dir ]] || { echo "no such staged dir: $dir" >&2; exit 1; }
[[ -f $dir/00-READ-THIS-FIRST.md ]] || { echo "$dir is not a staged dir (no notice file)" >&2; exit 1; }
case "$(cd "$dir" && pwd)" in
  "$(git rev-parse --show-toplevel)"*)
    echo "REFUSING: $dir is inside the repo, so the project CLAUDE.md would be discovered." >&2
    echo "Stage somewhere outside the checkout." >&2
    exit 1;;
esac

cd "$dir"
claude -p "$(cat "$prompt_file")" \
  --setting-sources '' \
  --exclude-dynamic-system-prompt-sections \
  < /dev/null > "$out"
echo "review → $out ($(wc -l < "$out") lines)"
