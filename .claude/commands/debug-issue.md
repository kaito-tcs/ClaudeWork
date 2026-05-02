---
description: Structured debug workflow (reproduce, isolate, fix, test)
argument-hint: "[error-message-or-symptom]"
---

# /debug-issue

## Purpose
Methodically debug and fix an issue: reproduce, isolate root cause, implement fix, write regression test. Document solution for future reference.

## When to Use
- Bug report received
- Issue in staging or production
- Inconsistent behavior across environments
- Test fails but unclear why

## Inputs
- Error message or symptom
- Environment where issue occurs (dev, staging, prod)
- Steps to reproduce (if known)
- Expected vs. actual behavior

## Workflow
1. **engineer** reproduces issue locally (creates minimal test case)
2. **engineer** isolates root cause: logs, browser DevTools, profiler
3. **Decision point**: Is it a code bug, config issue, or environmental?
4. **engineer** implements fix
5. **test-engineer** writes regression test to prevent re-occurrence
6. **code-reviewer** reviews fix and regression test
7. Fix merged; issue documented in commit/PR

## Outputs
- Minimal reproduction case
- Root cause identified and documented
- Fix implemented
- Regression test added
- Issue closed with explanation

## Quality Gates
- Issue is reproducible with steps documented
- Root cause is understood and explained
- Fix addresses root cause (not symptom)
- Regression test added and passing
- Fix verified on staging before production

## Example
```
/debug-issue "404 error when searching products with & in name"

Reproduction:
1. Create product with name "Laptop & Accessories"
2. Search for "&"
3. Result: 404 Not Found (should return product)

Root Cause Analysis:
- Logs show: SearchService receives query=" & "
- URL-encoded to %26 in request
- Database search uses raw query (no decoding)
- SELECT * FROM products WHERE name LIKE '%&%' → no match
  (because & is URL-encoded in the request)

Root Cause: Query parameter not URL-decoded before DB search

Fix Implemented:
- app/services/product_service.py, line 45
  Before: query = request.query_string
  After: query = urllib.parse.unquote(request.query_string)

Regression Test:
tests/test_product_search.py
def test_search_products_with_special_chars():
  product = create_product("Laptop & Accessories")
  results = search_products("&")
  assert product in results

Test Result: PASS
Verification: Issue fixed on staging; user can now search for "&"
```
