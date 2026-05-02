---
description: Accessibility review (accessibility-engineer + tester + UX lead)
argument-hint: "[scope]"
---

# /team-a11y

## Purpose
Comprehensive accessibility audit: axe-core scanning, manual testing with screen readers, keyboard navigation, color contrast. Coordinate across accessibility experts. Remediate issues for inclusive product.

## When to Use
- Before launch
- Quarterly accessibility audit
- After major UI changes
- Legal/compliance requirement (WCAG 2.1 AA)

## Inputs
- Scope: full app or specific pages
- Known accessibility concerns
- Target: WCAG 2.1 Level AA or AAA

## Workflow
1. **accessibility-engineer** runs axe-core scan for violations
2. **accessibility-tester** manually tests with NVDA/JAWS screen readers
3. **accessibility-tester** tests keyboard navigation (Tab, Enter, Escape)
4. **ux-engineer** reviews visual design (contrast, readability)
5. **team** triages: critical (blocks access), high, medium, low
6. **engineer** implements fixes
7. **accessibility-tester** re-tests and verifies

## Outputs
- Accessibility audit report: violations and fixes
- WCAG score (Lighthouse a11y)
- Screen reader testing results
- Keyboard navigation checklist
- Remediation plan and fixes applied

## Quality Gates
- Lighthouse a11y score >= 90
- No critical violations (WCAG critical)
- Keyboard navigation complete
- Screen reader works (NVDA/JAWS)
- Color contrast >= 4.5:1 for text
- All form inputs have labels

## Example
```
/team-a11y "product listing page"

Accessibility Audit Results:

Automated Scan (axe-core):

Critical Issues (blocks access):
  - Images missing alt text (12 images) → add descriptive alt
  - Form inputs missing labels (5 inputs) → add <label> elements
  - Empty button text (2 buttons) → add aria-label

High Issues:
  - Color contrast 2.8:1 on primary button → increase to 4.5:1
  - Missing focus indication on links → add :focus-visible style
  - Heading hierarchy broken (h1 missing) → add proper heading structure

Medium Issues:
  - Form error messages not linked to input → use aria-describedby
  - Modal dialog not marked as dialog → add role="dialog"

Manual Testing (Screen Reader - NVDA):

✓ Page structure announced correctly
✓ Headings navigable with H key
✓ Form labels announced with inputs
✗ Product card data not fully announced (needs ARIA)
✗ "Add to cart" button announces as generic (needs aria-label)

Keyboard Navigation:

✓ Tab order logical (left-to-right, top-to-bottom)
✓ Enter submits forms
✓ Escape closes modals
✗ Some buttons not keyboard accessible (missing tabindex=0)

Visual Design:

✓ Font size minimum 14px (readable)
✗ Color contrast: submit button 2.8:1 (needs 4.5:1)
✗ Focus state not obvious (too subtle)

Lighthouse a11y Score:
  Before: 68/100
  Target: 90/100

Remediation Plan:

Critical (must fix):
  1. Add alt text to all images (0.5 day)
  2. Add labels to form inputs (0.5 day)
  3. Mark modal as dialog (0.25 day)
  Total: 1.25 days

High (fix soon):
  1. Improve button contrast (0.25 day)
  2. Add focus-visible styles (0.25 day)
  3. Fix heading hierarchy (0.25 day)
  Total: 0.75 day

Fixes Applied:

Images:
  <img src="product.jpg" alt="Red hiking backpack">

Form inputs:
  <label for="search">Search products</label>
  <input id="search" type="text">

Button contrast:
  - Before: #5C6AC4 text on #F0F0F0 (2.8:1)
  - After: #3E47B5 on #FFFFFF (5.2:1) ✓

Focus styles:
  input:focus-visible {
    outline: 3px solid #3E47B5;
    outline-offset: 2px;
  }

Screen Reader Re-test:
  ✓ Page structure correct
  ✓ All buttons announced
  ✓ Form labels connected to inputs
  ✓ Product cards fully described

Keyboard Navigation Re-test:
  ✓ All buttons keyboard accessible
  ✓ Tab order logical
  ✓ Focus visible on all interactive elements

Lighthouse Re-test:
  Score: 92/100 ✓ TARGET MET

Compliance:
  - WCAG 2.1 Level AA: PASS ✓
  - Accessible to users with disabilities: ✓

Sign-off:

Accessibility Engineer: ✓ Approved
Accessibility Tester: ✓ Verified
UX Lead: ✓ Approved

Status: ACCESSIBLE ✓
```
