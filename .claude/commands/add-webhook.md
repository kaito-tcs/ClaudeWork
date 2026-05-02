---
description: Add outbound webhook delivery (signed, retried, observable)
argument-hint: "[event-type-list]"
---

# /add-webhook

## Purpose
Implement outbound webhooks for external integrations: event subscription, signed payload (HMAC-SHA256), retry logic with exponential backoff, and delivery status tracking.

## When to Use
- Third-party services need to be notified (Stripe webhook for payments)
- Custom integrations (marketplace partners)
- Audit trail of external events

## Inputs
- Events to emit (e.g., order.created, order.shipped)
- Webhook signature algorithm (default HMAC-SHA256)
- Max retries (default 5), backoff strategy (default exponential)

## Workflow
1. **lead-architect** defines events to emit
2. **backend-engineer** determines webhook triggers (when to call)
3. **Decision point**: Sync or async delivery? Should we queue failed webhooks?
4. **backend-engineer** creates webhook event model and dispatcher
5. **security-engineer** adds HMAC signing to payload
6. **task-queue-engineer** adds background task for delivery with retries
7. **test-engineer** writes webhook tests: signature, retry, failure handling
8. Admin interface to manage subscriptions

## Outputs
- Webhook model: `app/models/webhook.py` (URL, events, secret)
- Event dispatcher: `app/webhooks.py` emit_event(event_type, payload)
- Background task: deliver webhook with retries
- HMAC signing: sign payload with shared secret
- Webhook delivery log: endpoint, payload, status, retries
- Admin interface: subscribe/unsubscribe to events

## Quality Gates
- Webhook signed with HMAC-SHA256
- Delivery retried on failure (exponential backoff)
- Signature verified by receiver (using shared secret)
- Webhook delivery logged
- Failed webhooks after max retries moved to DLQ
- Events delivered in order (for same event type)

## Example
```
/add-webhook order.created order.shipped order.cancelled

Webhook Model:
class WebhookSubscription(Base):
  id: str
  url: str  # External webhook endpoint
  events: list[str]  # ["order.created", "order.shipped"]
  secret: str  # Shared secret for signing
  active: bool = True

Event Emission:
async def create_order(order: OrderCreate):
  order = db.create(order)
  
  # Emit webhook event (async)
  await emit_webhook_event("order.created", {
    "order_id": order.id,
    "user_id": order.user_id,
    "total": order.total,
    "timestamp": order.created_at.isoformat()
  })
  
  return order

Webhook Signature (HMAC-SHA256):
signature = hmac.new(
  secret.encode(),
  payload.encode(),
  hashlib.sha256
).hexdigest()

Receiver verification:
expected = hmac.new(
  secret.encode(),
  request.body,
  hashlib.sha256
).hexdigest()

if not hmac.compare_digest(expected, request.headers["X-Webhook-Signature"]):
  return 401 Unauthorized

Delivery Task:
@celery.task(bind=True, max_retries=5)
def deliver_webhook(self, subscription_id: str, event: dict):
  subscription = db.get(WebhookSubscription, subscription_id)
  
  try:
    response = requests.post(
      subscription.url,
      json=event,
      headers={"X-Webhook-Signature": sign_payload(subscription.secret, event)},
      timeout=5
    )
    response.raise_for_status()
    
    # Log success
    log_delivery(subscription_id, event, "success", response.status_code)
    
  except RequestException as exc:
    # Retry with exponential backoff: 60s, 120s, 240s, 480s, 960s
    retry_delay = 60 * (2 ** self.request.retries)
    raise self.retry(exc=exc, countdown=retry_delay)

Tests: tests/test_webhooks.py
- test_webhook_signed_correctly
- test_webhook_retried_on_failure
- test_webhook_moved_to_dlq_after_max_retries
```
