#!/usr/bin/env bash
# post-edit-lint.sh
# After a Write/Edit, run quick lint/type checks on the changed file and
# surface any issues as a hint to the agent (non-blocking).
set -euo pipefail

INPUT="$(cat)"
FILE=$(echo "$INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); ti=d.get('tool_input',{}); print(ti.get('file_path') or ti.get('path') or '')" 2>/dev/null || echo "")

[[ -z "$FILE" || ! -f "$FILE" ]] && exit 0

issues=()

case "$FILE" in
  *.py)
    if command -v ruff >/dev/null 2>&1; then
      out=$(ruff check "$FILE" 2>&1 || true)
      [[ -n "$out" ]] && issues+=("ruff: $out")
    fi
    if command -v mypy >/dev/null 2>&1; then
      out=$(mypy --no-error-summary "$FILE" 2>&1 || true)
      [[ -n "$out" ]] && issues+=("mypy: $out")
    fi
    ;;
  *.ts|*.tsx|*.js|*.jsx)
    if command -v eslint >/dev/null 2>&1; then
      out=$(eslint "$FILE" 2>&1 || true)
      [[ -n "$out" ]] && issues+=("eslint: $out")
    fi
    ;;
esac

if (( ${#issues[@]} > 0 )); then
  joined=$(printf '%s\n' "${issues[@]}")
  python3 -c "
import json,sys
print(json.dumps({
  'decision': 'approve',
  'systemMessage': 'post-edit-lint found issues in $FILE:\n' + '''$joined'''
}))
"
fi
exit 0
