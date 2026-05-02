---
description: Add Celery or ARQ background tasks with retries and DLQ
argument-hint: "[task-description]"
---

# /add-background-task

## Purpose
Implement asynchronous background tasks: Celery (with Redis broker) or ARQ, with retries, idempotency, dead-letter queue, and monitoring.

## When to Use
- Long-running operations (email, PDF generation, data import)
- Scheduled tasks (daily reports, cleanup)
- Non-critical but important operations that shouldn't block API

## Inputs
- Task description (e.g., "send order confirmation email")
- Expected duration (seconds)
- Retry strategy (exponential backoff, max retries)
- Idempotency requirement (same input = same result)

## Workflow
1. **task-queue-engineer** designs task: input, output, failure handling
2. **backend-engineer** determines sync vs. async need (can operation be deferred?)
3. **Decision point**: Celery or ARQ? Redis or other broker?
4. **task-queue-engineer** implements task with retry decorator, idempotency key
5. **backend-engineer** integrates task into endpoint (fire-and-forget)
6. **test-engineer** writes task tests: success, failure, retry
7. **devops-engineer** configures task worker and monitor

## Outputs
- Task implementation: `app/tasks.py` or `app/celery_tasks.py`
- Task with decorator: @task(bind=True, max_retries=3, default_retry_delay=60)
- Idempotency: check if task already run before re-running
- Dead-letter queue: failed tasks after max retries
- Task tests: success, failure, retry count
- Worker monitoring: queue depth, task duration

## Quality Gates
- Task completes successfully
- Failed tasks retried (exponential backoff)
- Dead tasks logged (not silently lost)
- Idempotent: running twice with same input = once
- Tests verify task behavior

## Example
```
/add-background-task "send order confirmation email"

Task created: app/tasks.py

@celery.task(bind=True, max_retries=3, default_retry_delay=60)
def send_order_confirmation(self, order_id: str, user_email: str):
  try:
    # Idempotency check
    if redis.get(f"task_sent::order::{order_id}"):
      return  # Already sent, don't re-send
    
    # Send email
    send_email(
      to=user_email,
      subject="Order Confirmation",
      template="order_confirmation.html",
      context={"order_id": order_id}
    )
    
    # Mark as sent
    redis.setex(f"task_sent::order::{order_id}", 86400, "1")
    
  except SMTPException as exc:
    # Retry with exponential backoff
    raise self.retry(exc=exc, countdown=2 ** self.request.retries)

Usage in endpoint:
@app.post("/orders")
async def create_order(order: OrderCreate, user = Depends(get_current_user)):
  order = db.create(order)
  
  # Fire async task, don't wait
  send_order_confirmation.delay(order.id, user.email)
  
  return {"order_id": order.id, "status": "pending"}

Worker command:
celery -A app.celery worker -l info

Tests: tests/test_tasks.py
- test_send_order_confirmation_success
- test_send_order_confirmation_retry_on_smtp_error
- test_send_order_confirmation_idempotent (don't send twice)
```
