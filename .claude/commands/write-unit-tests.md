---
description: Write pytest or Vitest unit tests for changed code
argument-hint: "[file-path-or-component]"
---

# /write-unit-tests

## Purpose
Write comprehensive unit tests for new or changed code: test happy path, edge cases, and error conditions. Target >80% code coverage. Tests are isolated and fast (no DB).

## When to Use
- After writing feature code
- Before code review
- Refactoring existing functions
- To document expected behavior

## Inputs
- File or component to test (e.g., app/services/product_service.py or components/ProductCard.tsx)
- Existing test structure (pytest or Vitest)
- Known edge cases or requirements

## Workflow
1. **test-engineer** reviews code to understand logic
2. **test-engineer** identifies test cases: happy path, edge cases, errors
3. **Decision point**: Mock external dependencies or use real objects?
4. **test-engineer** writes tests using framework fixtures (pytest, Vitest)
5. **test-engineer** runs tests and measures coverage
6. If coverage < 80%, identify gaps and write more tests
7. Tests pass and coverage report generated

## Outputs
- Test file: `tests/unit/test_<module>.py` (backend) or `src/__tests__/<component>.test.tsx` (frontend)
- Tests cover: happy path, edge cases, error cases
- Coverage report: coverage.xml or coverage/
- All tests passing

## Quality Gates
- All tests pass
- Coverage > 80% for new code
- Tests are isolated (no side effects, no DB calls)
- Tests run fast (< 1s per test)
- Clear test names: test_<function>_<scenario>_<expected_result>

## Example
```
/write-unit-tests "app/services/product_service.py"

Tests written: tests/unit/test_product_service.py

Test cases:
1. test_get_product_success
   - Input: valid product_id
   - Expected: return Product object

2. test_get_product_not_found
   - Input: non-existent product_id
   - Expected: raise ProductNotFound error

3. test_search_products_empty_query
   - Input: empty search string
   - Expected: return all products

4. test_search_products_with_filters
   - Input: query="laptop", category="electronics", max_price=1000
   - Expected: return matching products

5. test_create_product_invalid_price
   - Input: price < 0
   - Expected: raise ValueError

Coverage: 87% (lines), 92% (branches)

All tests passing: 5/5
Run time: 0.23s
```
