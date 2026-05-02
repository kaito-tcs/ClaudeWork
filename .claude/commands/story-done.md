---
description: Final review gate, test execution, and story completion
argument-hint: "[story-id]"
---

# /story-done

## Purpose
Run final quality checks, execute automated test suite, conduct peer review if needed, and mark the story complete. Ensures every story meets Definition of Done before closing.

## When to Use
- Developer says story is ready for review
- Code has passed local tests
- All acceptance criteria are met
- Ready to merge to main/develop

## Inputs
- Story ID and link to PR or branch
- Self-assessment: which QA gates have been run
- Any flagged risks or known limitations

## Workflow
1. **code-reviewer** does full code review (security, performance, style)
2. **test-engineer** runs automated test suite and coverage check
3. **Decision point**: Do all tests pass and is coverage acceptable (>80%)?
   - No → return to developer with specific failures
   - Yes → continue to smoke tests
4. **qa-engineer** or **test-engineer** runs smoke tests against staging (if available)
5. **engineering-manager** verifies acceptance criteria are 100% met, no scope creep
6. **code-reviewer** approves for merge; story marked DONE in tracker

## Outputs
- Story moved to Done column in project tracker
- Merged PR or commit message linking story
- Test execution report (link or summary)
- Any follow-up tech debt tickets created (if spotted during review)

## Quality Gates
- All automated tests pass (unit + integration)
- Code review approved (no "request changes")
- Test coverage >80% for new code
- No console errors, warnings in dev/staging
- Acceptance criteria 100% verified
- Database migrations are applied and tested
- Documentation updated (README, API docs, etc.)

## Example
```
/story-done "S1.1: Product Search"

Code Review: APPROVED (2 minor style suggestions; non-blocking)
Tests: 42 unit tests PASS, 8 integration tests PASS, coverage 87%
Staging: Smoke test PASS (search returns results <200ms)
AC Verification:
  ✓ Search by name works
  ✓ Results within 200ms
  ✓ Pagination at 20/page
  ✓ No errors in browser console

Status: DONE
Merged to develop at commit abc123ef
```
