# Agentic Layer — AWorD-OS

## Risk Classification

### Low — Auto-execute (no approval)
- Tag a role with taxonomy category and domain on ingest
- Compute performance band from scorecard scores
- Compute `net_budget_delta` from headcount plan inputs
- Assign microlearning modules to employees based on lowest KPI dimension
- Send daily nudge (in-app only, not email) to employee learning path
- Trigger an alert record when a threshold is breached

### Medium — Draft → human approves → execute
- Draft a 30/60/90-day action plan narrative from open alerts and KPI gaps
- Propose a new ARDE-discovered role profile for library publication
- Flag a role for deprecation based on 6-month declining signal
- Recommend a salary band revision based on market gap alert

### High — Always requires explicit approval before any external action
- Queue emails to managers/employees (calendar invites, nudge escalations)
- Mark a headcount plan as Approved and unlock budget commitment
- Publish an ARDE role to the live library (when RET 65–79, needs human sign-off)

### Critical — Human-only, no agent involvement
- Delete employee records or scorecard history
- Override a compliance flag
- Finalise legal or regulatory role definitions

## Named Tools (v1)
- `compute_performance_band(scorecard_id)` — reads scores, writes band to DB
- `compute_budget_delta(headcount_plan_id)` — reads plan fields, writes delta
- `assign_learning_path(employee_id)` — reads lowest KPI dim, inserts learning path rows
- `trigger_alert(type, entity_type, entity_id, priority)` — inserts alert row
- `draft_action_plan(persona, scope, alert_ids[])` — calls OpenAI, writes draft with review_status='unreviewed'
- `approve_action_plan(action_plan_id, approver)` — sets approval_status, queues calendar + email (human must click)

## Audit Log Fields (every agent action)
`actor, action, entity_type, entity_id, payload, risk_level, approval_required, approved_by, approved_at`

## v1 vs. Later
**v1:** Low-risk tools run automatically; medium/high require button-click approval in UI before any write.
**Later:** Scheduled ARDE signal ingestion pipeline; automated JD refresh from live job feeds; AEO candidate scoring via Profound/BrightEdge integration.
