---
description: Run sprint retrospective and generate insights
argument-hint: "[sprint-number]"
---

# /sprint-retro

## Purpose
Conduct a blameless retrospective: what went well, what was hard, what should we change. Generate metrics (velocity, cycle time, bugs) and action items for next sprint.

## When to Use
- End of every sprint (before sprint planning)
- Team needs to reflect on process
- To identify patterns (recurring blockers, quality issues)

## Inputs
- Sprint number and date range
- Completed stories + metrics (actual vs. planned)
- Any incidents or surprises during sprint
- Optional: retrospective feedback from team members (async or live)

## Workflow
1. **engineering-manager** gathers sprint metrics: velocity, cycle time, bug count, on-call incidents
2. **team** meets for 45–60 min retro using Start/Stop/Continue format
3. **Decision point**: Should we adjust process, tooling, or workload?
4. **engineering-manager** summarizes retro to action items (max 3 for next sprint)
5. Retro summary written to `docs/sprints/retro-sprint-<N>.md`

## Outputs
- `docs/sprints/retro-sprint-<N>.md` — metrics, what went well, what was hard, action items
- Metrics dashboard update: velocity trend, cycle time trend, defect rate
- Action items (max 3) committed for next sprint

## Quality Gates
- All team members heard and acknowledged
- Action items are specific and assigned to an owner
- Metrics recorded for trend analysis
- No blame; focus on systems and process

## Example
```
/sprint-retro "Sprint 12"

Metrics:
- Planned: 26 pts | Completed: 24 pts (92% success rate)
- Avg cycle time: 3.2 days
- Bugs found during review: 4 (all fixed pre-merge)
- On-call incidents: 0

What Went Well:
+ Design handoff earlier than usual
+ Pair programming on Redis task was very efficient
+ Testing early caught most bugs

What Was Hard:
- Search indexing performance unknown until late
- Onboarding new dev slowed down one story

To Change (Action Items):
1. Performance test before Dev (testing-engineer owns)
2. Add perf benchmarks to Definition of Done (lead-architect owns)
3. Pair new devs with senior for first 3 stories (manager owns)
```
