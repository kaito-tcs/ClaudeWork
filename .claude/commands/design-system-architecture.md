---
description: Design system services, data flow, and integration patterns
argument-hint: "[spec-path or feature-name]"
---

# /design-system-architecture

## Purpose
Create a detailed system architecture: identify services, define data flow, choose integration patterns (REST, async queues, events), and document system boundaries and scaling concerns.

## When to Use
- After tech spec is locked
- Designing a new service or major subsystem
- Planning multi-service architecture
- Before implementation begins

## Inputs
- Tech spec or feature description
- Expected scale (DAU, requests/sec, data volume)
- Team deployment model (monolith, microservices, serverless)
- Third-party integrations or APIs

## Workflow
1. **lead-architect** identifies services/components from spec: API gateway, auth service, product service, order service, payment service, etc.
2. **lead-backend-engineer** designs data flow: how does a request flow through the system?
3. **Decision point**: Monolith or microservices? Sync or async for inter-service communication?
   - Architect documents trade-offs (ADR)
4. **database-engineer** designs data ownership: which service owns which tables?
5. **lead-architect** draws system diagram with services, databases, queues, third-party integrations
6. Architecture doc written to `docs/architecture/system-architecture.md` with ASCII/SVG diagram

## Outputs
- `docs/architecture/system-architecture.md` — services, data flow, integration patterns
- Service boundary diagram (ASCII or Mermaid diagram embedded)
- Data ownership map: which service owns which domain models
- Integration checklist: API contracts, event schemas, async job types
- ADR documenting monolith vs. microservices decision

## Quality Gates
- All spec features mapped to services
- Service boundaries are clean (no circular dependencies)
- Data ownership is clear (no data duplication issues)
- Scaling concerns identified (bottlenecks, hotspots)
- Third-party integrations documented

## Example
```
/design-system-architecture docs/spec/SPEC-2026-05-02.md

Services Designed:
- API Gateway (load balance, auth, routing)
- Product Service (search, recommendations, inventory)
- Order Service (checkout, fulfillment)
- Payment Service (Stripe integration, PCI isolation)
- Notification Service (email, SMS, push)

Data Flow: Request → API Gateway → Product Service (fetch recs) → Order Service (checkout) → Payment Service (charge) → Notification Service (email)

Integration: REST between services, Redis for caching, Kafka for async notifications

Diagram: docs/architecture/system-architecture.svg
```
