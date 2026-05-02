#!/usr/bin/env bash
# session-end-gap-detect.sh
# At session stop, look for common gaps and remind Claude before terminating:
#  - new endpoint without a test
#  - new ORM model without a migration
#  - new React component without a Storybook story
#  - lingering TODO / console.log / print() debug noise
set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$PROJECT_DIR" 2>/dev/null || exit 0

[[ -d .git ]] || exit 0

# Files changed in the last commit OR uncommitted
CHANGED=$( { git diff --name-only HEAD 2>/dev/null; git diff --cached --name-only 2>/dev/null; git ls-files -o --exclude-standard 2>/dev/null; } | sort -u)

[[ -z "$CHANGED" ]] && exit 0

warnings=()

# Endpoint without test
while IFS= read -r f; do
  case "$f" in
    *routes.py|*urls.py|*/api/*.ts|*/api/*.tsx|*/route.ts|*/route.tsx)
      base=$(basename "$f" | sed 's/\..*$//')
      if ! grep -rq "$base" tests/ 2>/dev/null; then
        warnings+=("endpoint-without-test: $f")
      fi
      ;;
  esac
done <<< "$CHANGED"

# Model without migration
while IFS= read -r f; do
  case "$f" in
    */models.py|*/models/*.py)
      if ! ls */migrations/ 2>/dev/null | tail -3 | grep -q .; then
        warnings+=("model-changed-without-migration: $f")
      fi
      ;;
  esac
done <<< "$CHANGED"

# Component without story
while IFS= read -r f; do
  case "$f" in
    */components/*.tsx|*/components/*.jsx)
      story="${f%.*}.stories.tsx"
      [[ ! -f "$story" ]] && warnings+=("component-without-story: $f")
      ;;
  esac
done <<< "$CHANGED"

# Debug noise
if echo "$CHANGED" | xargs -I{} grep -lE 'console\.log|print\(|TODO|FIXME' {} 2>/dev/null | head -1 | grep -q .; then
  warnings+=("debug-noise-detected: console.log / print / TODO / FIXME present in changed files")
fi

if (( ${#warnings[@]} > 0 )); then
  joined=$(printf '%s\n - ' "${warnings[@]}")
  python3 -c "
import json
print(json.dumps({
  'decision': 'approve',
  'systemMessage': 'session-end-gap-detect found gaps:\n - ' + '''$joined'''.rstrip(' - ')
}))
"
fi
exit 0
