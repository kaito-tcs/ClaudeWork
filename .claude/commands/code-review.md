---
description: Full code review pass (security, performance, correctness)
argument-hint: "[pr-url or branch-name]"
---

# /code-review

## Purpose
Conduct comprehensive code review: check for security vulnerabilities, performance issues, style compliance, type safety, and test coverage. Approve or request changes before merge.

## When to Use
- PR ready for review
- Before merging to main/develop
- Major feature changes
- Security-sensitive code changes

## Inputs
- PR URL or branch name
- Context: story ID, feature description
- Any known concerns from author

## Workflow
1. **code-reviewer** checks: linting (eslint/ruff), type-checking (TypeScript/pyright)
2. **code-reviewer** reviews code for logic errors, edge cases, test coverage
3. **security-auditor** (if relevant) checks for security issues: injection, auth, data leaks
4. **backend-performance-engineer** or **frontend-performance-engineer** checks perf: N+1 queries, bundle size, renders
5. **Decision point**: Approve, request minor changes, or request major rework?
6. **code-reviewer** leaves comments with specific feedback
7. Author addresses comments and requests re-review
8. Approve and merge when satisfied

## Outputs
- Code review checklist completed
- Comments left in PR (constructive, specific)
- Approval or request for changes
- Test coverage verified (>80%)
- No critical issues blocking merge

## Quality Gates
- Linting passes (eslint/ruff)
- Type-checking passes (no any types)
- Tests pass and cover >80% of new code
- No security issues (injection, auth, data leaks)
- No obvious performance issues
- PR description explains changes
- Commits are logical (not one mega-commit)

## Example
```
/code-review PR #42

Review Checklist:
✓ Linting: PASS (eslint)
✓ Type-check: PASS (pyright)
✓ Tests: PASS (coverage 84%)
✓ Security: No obvious issues
✓ Performance: No N+1 queries

Comments:
1. Line 45: Consider caching this query—it runs per-request
   Author: Good point, added Redis cache

2. Line 89: Type error—missing null check
   Author: Fixed, added guard clause

3. Line 120: Test missing for error case
   Author: Added test_handle_payment_failure

Changes Requested:
- Document API rate limit in comment (now done)

Final Decision: APPROVED

Merge ready at: https://github.com/project/pull/42
```
