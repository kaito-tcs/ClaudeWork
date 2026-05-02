#!/usr/bin/env bash
# pre-bash-guard.sh
# Blocks dangerous shell patterns even if the permissions list misses them.
set -euo pipefail

INPUT="$(cat)"
CMD=$(echo "$INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('tool_input',{}).get('command',''))" 2>/dev/null || echo "")

# Patterns to block
BLOCK_PATTERNS=(
  'rm -rf /'
  'rm -rf /\*'
  'rm -rf ~'
  'mkfs\.'
  ':(){ :|:& };:'
  '\| sudo '
  'chmod -R 777 /'
  'curl .* \| sh'
  'wget .* \| sh'
  'terraform apply -auto-approve'
  'kubectl delete ns'
  'DROP DATABASE'
  'DROP TABLE.*--'
)

for pat in "${BLOCK_PATTERNS[@]}"; do
  if echo "$CMD" | grep -Eq "$pat"; then
    cat <<JSON
{
  "decision": "block",
  "reason": "pre-bash-guard: command matches dangerous pattern '$pat' and was blocked. If this is intentional, run it manually outside the agent."
}
JSON
    exit 0
  fi
done

exit 0
