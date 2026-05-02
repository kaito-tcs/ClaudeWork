---
description: Write Playwright E2E tests for user journeys
argument-hint: "[user-journey]"
---

# /write-e2e-tests

## Purpose
Write end-to-end tests using Playwright: automate user interactions (click, type, navigate) and verify page state. Test complete user journeys (signup, search, checkout, etc.).

## When to Use
- Testing critical user flows (checkout, payment, signup)
- Before major releases
- Multi-page workflows
- Visual regression testing

## Inputs
- User journey description (e.g., "user searches for product and adds to cart")
- Starting URL (login page, home page, etc.)
- Expected outcomes (product found, cart updated, etc.)

## Workflow
1. **e2e-test-engineer** designs user journey: steps and expected outcomes
2. **e2e-test-engineer** writes Playwright test with page interactions
3. **e2e-test-engineer** runs against staging environment
4. **e2e-test-engineer** debugs failures (element selectors, timing issues)
5. Test passes consistently; added to CI/CD
6. Screenshot/video captured on failure for debugging

## Outputs
- E2E test file: `tests/e2e/<journey>.spec.ts`
- Playwright config: `playwright.config.ts` (browsers, timeout, baseURL)
- Tests verify: navigation, form submission, page state changes
- Screenshots/videos captured on failure
- CI/CD integrated: tests run on every PR

## Quality Gates
- All E2E tests pass on staging
- Tests are stable (don't flake)
- Clear error messages on failure
- Screenshots/videos recorded for debugging
- Tests run in CI on every PR

## Example
```
/write-e2e-tests "user searches for product and adds to cart"

E2E test written: tests/e2e/search-and-add-to-cart.spec.ts

Journey:
1. Navigate to home page
2. Enter "laptop" in search
3. Click first result
4. Verify product details
5. Click "Add to Cart"
6. Verify cart count increased

Test code:
test('search for product and add to cart', async ({ page }) => {
  await page.goto('/');
  
  await page.fill('input[placeholder="Search products"]', 'laptop');
  await page.press('input', 'Enter');
  await page.waitForSelector('[data-testid="product-result"]');
  
  const firstProduct = page.locator('[data-testid="product-result"]').first();
  await firstProduct.click();
  
  await expect(page.locator('h1')).toContainText('laptop');
  
  const cartBefore = await page.locator('[data-testid="cart-count"]').textContent();
  await page.click('button:has-text("Add to Cart")');
  
  const cartAfter = await page.locator('[data-testid="cart-count"]').textContent();
  expect(parseInt(cartAfter)).toBe(parseInt(cartBefore) + 1);
});

Run in CI:
- Chromium, Firefox, WebKit (parallel)
- Screenshots on failure
- Video recording enabled
- Base URL: https://staging.example.com
```
