---
description: Create a typed React component with story and unit test
argument-hint: "[component-name]"
---

# /create-component

## Purpose
Generate a single React component: TypeScript definition, Storybook story, unit test, and CSS/Tailwind styling. Component is atomic, testable, and documented.

## When to Use
- Building new UI feature
- Every story that requires a new component
- Adding to component library
- Reusable, isolated UI element

## Inputs
- Component name (PascalCase, e.g., ProductCard)
- Purpose (1 sentence)
- Props the component accepts (or infer from story)
- Optional: component category (buttons, cards, forms, etc.)

## Workflow
1. **react-engineer** or **typescript-specialist** designs component API (props interface)
2. **ux-engineer** confirms visual design and behavior
3. **Decision point**: Simple presentational or stateful component? Reuse from design system?
4. **react-engineer** implements component in `src/components/<category>/<ComponentName>.tsx`
5. **component-library-engineer** adds Storybook story in `.stories.tsx`
6. **test-engineer** writes unit test in `.test.tsx` with 80%+ coverage
7. Component added to barrel export `src/components/index.ts`

## Outputs
- `src/components/<category>/<ComponentName>.tsx` — component with TypeScript props, JSDoc comments
- `src/components/<category>/<ComponentName>.stories.tsx` — Storybook story with variants
- `src/components/<category>/<ComponentName>.test.tsx` — unit tests (RTL)
- Updated `src/components/index.ts` barrel export

## Quality Gates
- Props are typed (interface exported)
- Component renders without errors
- Storybook story shows all variants
- Unit tests cover all use cases (80%+)
- No console warnings or type errors
- Accessible: ARIA labels, semantic HTML

## Example
```
/create-component "ProductCard"

Component created:
- src/components/cards/ProductCard.tsx
  export interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    rating?: number;
    onAddToCart: (id: string) => void;
  }

- src/components/cards/ProductCard.stories.tsx
  Stories: Default, WithRating, HighPrice

- src/components/cards/ProductCard.test.tsx
  Tests: renders correctly, click handler called, accessibility checks
  Coverage: 85%

Added to: src/components/index.ts
```
