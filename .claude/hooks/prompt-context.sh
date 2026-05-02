#!/usr/bin/env bash
# prompt-context.sh
# On every user prompt, inject lightweight studio context (current branch,
# recently-changed files, active sprint pointer if present).
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR" 2>/dev/null || exit 0

ctx=""

if [[ -d .git ]]; then
  branch=$(git symbolic-ref --short HEAD 2>/dev/null || echo "(detached)")
  ctx+="branch: $branch\n"
  recent=$(git log --pretty=format:'%h %s' -n 5 2>/dev/null || true)
  [[ -n "$recent" ]] && ctx+="recent commits:\n$recent\n"
fi

if [[ -f docs/sprint/CURRENT.md ]]; then
  ctx+="active sprint: docs/sprint/CURRENT.md exists\n"
fi

[[ -z "$ctx" ]] && exit 0

python3 -c "
import json
print(json.dumps({
  'hookSpecificOutput': {
    'hookEventName': 'UserPromptSubmit',
    'additionalContext': '''$ctx'''
  }
}))
"
exit 0
