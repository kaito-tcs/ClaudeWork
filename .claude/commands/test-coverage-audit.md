---
description: Generate coverage report and identify gaps
argument-hint: "[target-percent]"
---

# /test-coverage-audit

## Purpose
Run code coverage analysis: generate reports showing covered vs. uncovered lines, identify gaps, and create plan to reach target coverage (default 80%).

## When to Use
- Before release
- After large refactor
- When coverage drops unexpectedly
- Quarterly quality audit

## Inputs
- Target coverage % (default 80%)
- Optional: focus on specific files or directories

## Workflow
1. **test-engineer** runs coverage tool: `pytest --cov` or `vitest --coverage`
2. **test-engineer** generates HTML report and summary
3. **test-engineer** identifies low-coverage areas (< 50%)
4. **code-reviewer** and **test-engineer** assess coverage gaps
5. **Decision point**: Write more tests or accept gap (with reason)?
6. **test-engineer** creates tickets for missing tests
7. Coverage report published to docs or CI dashboard

## Outputs
- Coverage report: `coverage/index.html` or `coverage.xml`
- Coverage summary: total %, per-file %
- Identified gaps: uncovered branches, error paths
- Plan: which files need more tests

## Quality Gates
- Overall coverage >= target % (default 80%)
- Critical paths covered (auth, payments, core logic) >= 90%
- No regression in coverage
- Coverage trend tracked over time

## Example
```
/test-coverage-audit 80

Coverage Report Generated:

Overall Coverage: 76% (target: 80%)

Per-Module Coverage:
- app/services/product.py: 92% (excellent)
- app/services/order.py: 68% (gaps)
- app/api/endpoints/orders.py: 71% (gaps)
- components/ProductCard.tsx: 85% (good)
- components/Checkout.tsx: 52% (low)

Coverage Gaps Identified:
- order.py: missing error handling tests for payment failures
- endpoints/orders.py: missing 404 edge case tests
- Checkout.tsx: missing form validation tests (8% uncovered)

Recommendations:
1. Write tests for order payment failure scenarios (3 tests)
2. Add 404 endpoint tests (2 tests)
3. Test Checkout form validation (5 tests)
Effort: 0.5 day to reach 83% coverage

Report: coverage/index.html
```
