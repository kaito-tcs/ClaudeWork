---
description: Setup OpenTelemetry, Prometheus, Grafana, Sentry
argument-hint: "[tools]"
---

# /setup-observability

## Purpose
Configure observability stack: application tracing (OpenTelemetry), metrics (Prometheus), dashboards (Grafana), and error tracking (Sentry). Monitor app health and debug issues.

## When to Use
- Before production release
- Large distributed system
- Need to understand system behavior

## Inputs
- Tools to include: otel (tracing), prometheus (metrics), grafana (dashboards), sentry (errors)
- Export destination: local (Prometheus) or cloud (Datadog, New Relic, etc.)
- Alert rules (optional, e.g., CPU > 80%, error rate > 1%)

## Workflow
1. **monitoring-engineer** chooses observability stack
2. **backend-engineer** instruments app with OpenTelemetry SDK
3. **devops-engineer** sets up Prometheus + Grafana locally or cloud
4. **devops-engineer** configures Sentry for error tracking
5. **monitoring-engineer** creates dashboards: request latency, error rate, resource usage
6. **devops-engineer** sets up alerts and notification channels

## Outputs
- OpenTelemetry instrumentation in app code
- Prometheus configuration: scrape targets, job config
- Grafana dashboards: latency, errors, resource metrics
- Sentry project: error tracking and alerting
- Monitoring runbook: how to use dashboards, troubleshoot

## Quality Gates
- App traces visible in trace collector
- Prometheus scrapes metrics from app
- Grafana dashboards display live data
- Sentry captures errors and sends alerts
- Alert rules functional (test by triggering)

## Example
```
/setup-observability otel prometheus grafana sentry

Instrumentation:

app/main.py (FastAPI):
  from opentelemetry import trace
  from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
  
  tracer = trace.get_tracer(__name__)
  
  @app.get("/products")
  async def get_products():
    with tracer.start_as_current_span("fetch_products"):
      products = db.query(Product).all()
      return products

Prometheus Metrics:
  http_requests_total (counter)
  http_request_duration_seconds (histogram)
  db_query_duration_seconds (histogram)
  cache_hits_total (counter)
  errors_total (counter)

Grafana Dashboards:
  - Request Latency (p50, p95, p99)
  - Error Rate (errors/minute)
  - Database Query Performance (slow queries)
  - Cache Hit Rate
  - Resource Usage (CPU, memory)

Sentry Integration:
  - Automatic error capture
  - Source maps for JavaScript
  - Release tracking
  - Alerts on critical errors

Alerts:
  - High Error Rate (> 1% errors)
  - Slow Response Time (p95 > 1s)
  - High CPU (> 80%)
  - Database Connection Pool Exhausted

Stack Files:
  - docker-compose.observability.yml (Prometheus, Grafana)
  - Sentry.io account (cloud-hosted)

Runbook: docs/observability-runbook.md
Dashboards: http://localhost:3000 (Grafana)
Sentry: https://sentry.io/...
```
