---
description: Setup internationalization (i18n) with next-intl or formatjs
argument-hint: "[language-list]"
---

# /add-i18n

## Purpose
Configure multi-language support for the app: routing (URL-based), translation files, language switcher, and SEO (hreflang). Ready to support 2+ languages.

## When to Use
- Multi-market product (US, EU, APAC, etc.)
- Before shipping to new regions
- Building global SaaS product

## Inputs
- List of supported languages (e.g., en, es, fr, de, ja)
- Default language (usually en)
- Routing strategy: URL path (/en/, /es/) or subdomain

## Workflow
1. **i18n-engineer** chooses library: `next-intl` (recommended for Next.js) or `react-i18next`
2. **i18n-engineer** configures routing and middleware
3. **nextjs-engineer** updates App Router for i18n (e.g., `app/[locale]/page.tsx`)
4. **i18n-engineer** creates translation files: `messages/en.json`, `messages/es.json`, etc.
5. **ux-engineer** designs language switcher component
6. **test-engineer** tests language switching and translations
7. SEO setup: hreflang tags per language

## Outputs
- `next-intl.config.ts` (or i18next config)
- `app/[locale]/layout.tsx` (locale-aware routing)
- `messages/` directory with translation JSON files
- Language switcher component
- Middleware for locale detection and routing
- README with translation workflow

## Quality Gates
- All pages render in all languages
- Language switcher works without page reload
- URL updates when language changes
- hreflang tags correct in HTML head
- No missing translation keys
- No hardcoded English strings in code

## Example
```
/add-i18n en es fr de

Config created: next-intl.config.ts

Routes:
- /en/products (English)
- /es/productos (Spanish)
- /fr/produits (French)
- /de/produkte (German)

Messages:
- messages/en.json
- messages/es.json
- messages/fr.json
- messages/de.json

Language switcher: components/LanguageSwitcher.tsx
Middleware: middleware.ts (locale detection)
```
