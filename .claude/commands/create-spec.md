---
description: Produce a Technical Specification from a PRD
argument-hint: "[prd-file-path]"
---

# /create-spec

## Purpose
Translate a PRD into a detailed Technical Specification: system architecture, data model, API contracts, integrations, and deployment model. Output is a markdown spec with diagrams, ready for architecture review.

## When to Use
- After PRD is locked down
- Before starting implementation
- When handing off to engineering team
- To document system design decisions

## Inputs
- Path to PRD file (or link to live doc)
- Team tech stack preferences (should be set from `/start`)
- Known external integrations or APIs
- Performance / scalability targets (optional; inferred from PRD)

## Workflow
1. **tech-director** reviews PRD and flags technical unknowns
2. **lead-architect** designs high-level system: frontend tech, backend services, database, integrations
3. **Decision point**: Django + Postgres, or FastAPI + Postgres? Next.js, or React SPA?
   - Architect documents trade-offs in ADR format
   - Engineering-manager approves
4. **lead-architect** drafts spec sections: architecture diagram, data model, API endpoints, deployment, performance targets
5. **lead-frontend-engineer** & **lead-backend-engineer** review for feasibility
6. Final spec written to `docs/spec/SPEC-<date>.md` with embedded architecture diagrams

## Outputs
- `docs/spec/SPEC-<YYYY-MM-DD>.md` — technical spec with sections: architecture, data model, API, integrations, deployment, performance SLOs
- `docs/adr/001-tech-stack.md` — architecture decision record
- System architecture diagram (ASCII or SVG in docs/diagrams/)
- Data model ER diagram

## Quality Gates
- Architecture approved by lead-architect
- All PRD features mapped to system components
- API endpoints documented with request/response shapes
- Data model normalized, indexes identified
- Deployment model (Docker, K8s, serverless) decided
- No tech debt introduced (or documented as accepted)

## Example
```
/create-spec docs/prd/PRD-2026-05-02.md

Spec written to: docs/spec/SPEC-2026-05-02.md

Tech Stack Chosen:
- Frontend: Next.js 15 App Router, TypeScript, Tailwind
- Backend: FastAPI + async SQLAlchemy, Pydantic v2
- Database: PostgreSQL 16, Redis for caching
- Deployment: Docker + K8s on GCP

API designed with 12 endpoints: GET /products, POST /orders, etc.
```
