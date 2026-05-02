#!/usr/bin/env bash
# pre-write-approval.sh
# Enforces the studio-wide collaboration contract:
#   Question -> Options -> Decision -> Draft -> Approval
# This hook fires before any Write or Edit. If the agent has NOT shown a
# diff/draft to the user yet, it nudges the agent to do so first.
#
# Behavior:
#   - Reads the tool input from stdin (JSON payload).
#   - Looks for a marker file `.claude/.approval-given` in the project root.
#   - If absent, prints a JSON object asking Claude to follow the contract.
#   - If present, deletes it (single-use) and lets the write proceed.
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
MARKER="$PROJECT_DIR/.claude/.approval-given"

INPUT="$(cat)"
TOOL=$(echo "$INPUT" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_name',''))" 2>/dev/null || echo "")

if [[ "$TOOL" != "Write" && "$TOOL" != "Edit" ]]; then
  exit 0
fi

if [[ -f "$MARKER" ]]; then
  rm -f "$MARKER"
  exit 0
fi

cat <<'JSON'
{
  "decision": "approve",
  "systemMessage": "Reminder: Web Engineering Studio contract — show the change as a diff/draft FIRST and obtain user approval before writing. If approval was just given, ignore this message."
}
JSON
exit 0
