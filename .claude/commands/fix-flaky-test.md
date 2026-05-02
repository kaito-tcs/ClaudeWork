---
description: Root-cause flaky test and stabilize
argument-hint: "[test-name]"
---

# /fix-flaky-test

## Purpose
Fix a test that passes inconsistently (flakes): identify race conditions, timing issues, or environmental problems, and stabilize the test.

## When to Use
- Test passes sometimes, fails other times
- Fails in CI but passes locally
- Timeout issues or timing-dependent assertions
- Parallel test execution causes failures

## Inputs
- Flaky test name
- Failure pattern (always fails, fails 1 in 10 runs, fails in CI only)
- Error message from failing runs

## Workflow
1. **test-engineer** collects multiple failing runs (logs, failure details)
2. **test-engineer** runs test repeatedly locally to reproduce flake
3. **engineer** analyzes: race condition (async timing)? Mock issues? Data pollution?
4. **Decision point**: Fix test, fix code, or both?
5. **engineer** implements fix: add waits, fix mock timing, isolate test data
6. **test-engineer** runs test repeatedly (50+ times) to verify stability
7. Test is stable and no longer flakes

## Outputs
- Root cause documented
- Fix implemented (code or test change)
- Test runs 50+ times without flaking
- CI re-run shows test is stable

## Quality Gates
- Test passes 50+ consecutive runs
- Root cause identified and documented
- Fix doesn't hide real bugs (test still validating behavior)
- No new timeouts introduced

## Example
```
/fix-flaky-test "test_order_status_updates_immediately"

Failure Pattern:
- Passes locally consistently
- Fails in CI ~2/10 runs
- Error: AssertionError: expected "completed" got "pending"

Root Cause Analysis:
Test code:
def test_order_status_updates_immediately():
  order = create_order()
  complete_order(order.id)
  assert order.status == "completed"  ← fails sometimes

Root cause: complete_order() updates DB asynchronously
Test checks status before DB write completes (race condition)

Fix:
def test_order_status_updates_immediately():
  order = create_order()
  complete_order(order.id)
  
  # Wait for async task to complete (added wait-for logic)
  def order_completed():
    refreshed = db.get(Order, order.id)
    return refreshed.status == "completed"
  
  wait_until(order_completed, timeout=5)  # retry with timeout

Stability Test:
Ran test 100 times in CI: 100/100 passing ✓
No longer flakes
```
