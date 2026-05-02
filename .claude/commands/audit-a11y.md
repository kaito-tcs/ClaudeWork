---
description: Accessibility audit (axe-core) and remediation plan
argument-hint: "[url-or-component]"
---

# /audit-a11y

## Purpose
Scan for accessibility violations (WCAG 2.1 Level AA): keyboard navigation, screen reader support, color contrast, ARIA labels. Generate remediation plan and implement fixes.

## When to Use
- Before shipping any user-facing feature
- Quarterly accessibility audit
- Adding new components
- Legal or compliance requirement

## Inputs
- URL or component to audit
- WCAG level target (default AA)
- Known limitations or scope restrictions

## Workflow
1. **accessibility-engineer** runs axe DevTools, Lighthouse, WAVE scans
2. **accessibility-tester** manually tests with keyboard and screen reader (NVDA, JAWS)
3. **Decision point**: Critical (blocks access) vs. minor (cosmetic) issues?
4. **accessibility-engineer** creates tickets for each violation with remediation
5. **react-engineer** implements fixes (ARIA labels, semantic HTML, focus management)
6. **accessibility-tester** re-tests and verifies fixes
7. Audit report saved to `docs/a11y-audit.md`

## Outputs
- `docs/a11y-audit.md` — audit findings, severity, remediation status
- Tickets created in backlog for each fix
- Before/after Lighthouse a11y scores
- ARIA labels and semantic HTML updated
- Keyboard navigation tested

## Quality Gates
- Lighthouse a11y score ≥ 90
- No critical axe violations
- Keyboard navigation works (Tab, Enter, Escape)
- Screen reader announces all key content
- Color contrast ≥ 4.5:1 for text
- All form inputs have labels and error messages

## Example
```
/audit-a11y https://myapp.example.com/products

Audit Results:

Critical Issues:
- Image missing alt text (15 images) → add alt text to all
- Form inputs missing labels (8 inputs) → add <label> elements

High Issues:
- Color contrast 2.8:1 (needs 4.5:1) on submit button → darken color
- Mobile focus not visible → add :focus-visible styles

Medium Issues:
- ARIA role misuse (2 instances) → correct ARIA attributes
- Keyboard navigation skips hidden content → add skip links

Lighthouse Score: 65 → 92 (after fixes)

Remediation plan: 3 issues, 1 day effort
Audit report: docs/a11y-audit.md
```
