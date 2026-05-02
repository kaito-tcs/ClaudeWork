---
description: Implement one user story end-to-end (code, tests, docs)
argument-hint: "[story-id or title]"
---

# /dev-story

## Purpose
Full-cycle implementation of a single user story: understand requirements, design implementation, write code (FE + BE if full-stack), write tests, update docs, and prepare for code review. Handles the entire dev-to-ready-for-review workflow.

## When to Use
- Picking up a story during active development
- Story is clearly scoped and ready to build
- Team is ready to review and merge

## Inputs
- Story ID and full acceptance criteria
- Acceptance criteria context (customer examples, edge cases)
- Any blocking stories or technical prerequisites (should be done already)
- Target branch (e.g., main, develop)

## Workflow
1. **lead-frontend-engineer** (if FE involved) designs component hierarchy, state management, API client calls
2. **lead-backend-engineer** (if BE involved) designs endpoints, database queries, migrations
3. **Decision point**: Does this story touch the data model? Does it need a migration?
   - Yes → create migration first (reversible, testable)
   - No → proceed to feature code
4. **react-engineer** or **nextjs-engineer** implements FE components (atomic design, test-friendly)
5. **python-engineer** or **fastapi-specialist** implements BE endpoints with Pydantic validation
6. **test-engineer** writes unit and integration tests for all new code (target: >80% coverage)
7. **code-reviewer** runs lint, type check, runs tests; approves or requests changes
8. **engineering-manager** marks story done in tracker; triggers `/story-done`

## Outputs
- Feature branch with commits following conventional commits
- FE: React components, state hooks, e2e test (if multi-page journey)
- BE: API endpoints with OpenAPI docs, ORM models, DB migrations
- Tests: unit (>80% coverage), integration tests, one e2e test
- Updated docs: API docs auto-generated from OpenAPI, README if needed
- Ready for merge to develop/main

## Quality Gates
- All acceptance criteria met and testable
- Code passes: eslint, prettier, mypy/pyright
- Tests pass: unit >80% coverage, integration tests green
- No console errors or warnings
- Database migrations are reversible and tested
- API documentation generated and accurate
- Code review approved
- No regressions in existing functionality

## Example
```
/dev-story "S1.1: Product Search"

> Implementing: GET /api/v1/products?q=laptop&limit=20&offset=0

FE: ProductSearch component with input debounce, infinite scroll
BE: FastAPI endpoint with full-text search, sorting
DB: products table indexed on name
Tests: 42 tests written, 87% coverage
Docs: OpenAPI spec updated, examples in README

Ready for review at PR #42
```
