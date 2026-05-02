---
description: Propose and execute a targeted refactor
argument-hint: "[target-module-or-issue]"
---

# /refactor

## Purpose
Improve code quality through focused refactoring: reduce duplication, improve readability, extract functions, simplify logic. Maintain all tests and behavior.

## When to Use
- Code is hard to understand or modify
- Duplication exists across files
- Function is too long (>50 lines)
- As part of tech debt paydown
- After code review identifies issues

## Inputs
- Module or function to refactor (e.g., UserService, renderProductCard)
- Specific issue (duplicated code, unclear logic, tightly coupled)
- Expected outcome (simpler, faster, more testable)

## Workflow
1. **code-reviewer** identifies refactor target and reason
2. **engineer** creates new branch
3. **engineer** refactors: extract functions, reduce duplication, simplify
4. **test-engineer** runs all tests to ensure behavior preserved
5. **code-reviewer** reviews refactored code
6. **Decision point**: Better now? Ready to merge?
7. **engineer** incorporates feedback and merges

## Outputs
- Refactored code: cleaner, more readable
- All existing tests still pass
- Performance unchanged or improved
- PR with clear explanation of changes
- Before/after code comparison

## Quality Gates
- All tests pass
- No behavior change (same inputs → same outputs)
- Code is simpler (lines of code reduced, cyclomatic complexity lower)
- Type safety maintained
- Performance not degraded

## Example
```
/refactor "UserService has duplicate auth logic"

Before:
class UserService:
  def login(self, email, password):
    user = db.query(User).filter(email=email).first()
    if not user or not verify_password(password, user.password_hash):
      raise AuthError("Invalid credentials")
    return generate_token(user.id)
  
  def reset_password(self, email, old_password, new_password):
    user = db.query(User).filter(email=email).first()
    if not user or not verify_password(old_password, user.password_hash):
      raise AuthError("Invalid credentials")
    user.password_hash = hash_password(new_password)
    db.commit()

After:
class UserService:
  def _get_verified_user(self, email, password):
    user = db.query(User).filter(email=email).first()
    if not user or not verify_password(password, user.password_hash):
      raise AuthError("Invalid credentials")
    return user
  
  def login(self, email, password):
    user = self._get_verified_user(email, password)
    return generate_token(user.id)
  
  def reset_password(self, email, old_password, new_password):
    user = self._get_verified_user(email, old_password)
    user.password_hash = hash_password(new_password)
    db.commit()

Benefits:
- Reduced duplication (extracted _get_verified_user)
- Easier to test verification logic
- Lines of code: 25 → 18
- All tests pass (no behavior change)
```
