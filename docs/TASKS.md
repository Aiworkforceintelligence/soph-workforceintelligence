# Tasks & Sprints — AWorD-OS

## Sprint 1 — Schema, Seed & Role Library  *(v1 foundation)*
**Goal:** Database live, role library browsable anonymously, no blank screens.
- [ ] Run `migration_sql` against Supabase project — verify all tables created, seed rows visible
- [ ] `/roles` page: filterable list (taxonomy category, country, status) — loading / empty / error states
- [ ] Role detail page: augmented JD, AI task split, skills taxonomy, dual KPI list
- [ ] Breadcrumb navigation between list and detail
- [ ] All pages render for anonymous visitors — no redirect to login

**Definition of Done:** Anonymous visitor opens `/roles`, filters by `Technical`, clicks `ML Engineer`, sees full augmented JD and KPI set pulled from live Supabase rows.

---

## Sprint 2 — Employee Scorecards & ARDE Feed
**Goal:** Dual scorecards are editable; ARDE emergence feed is live.
- [ ] `/employees` list with scorecard summary chips (AI band, Human band)
- [ ] Employee detail: Dual Scorecard with all dimension scores — create and edit form
- [ ] Performance band auto-computed on save (server action)
- [ ] `/arde` feed: list of ARDE signals sorted by RET score, status badge, velocity flag
- [ ] Create/edit ARDE signal record
- [ ] Empty state for both pages

**Definition of Done:** Open employee Siti Aminah, edit `human_adaptability` score from 60 to 72, save, see band update from `Developing` to `Meeting` without page refresh.

---

## Sprint 3 — Headcount Planning Engine  *(core engine — v1 functional milestone)*
**Goal:** Headcount planning creates, computes budget delta, and persists. App is end-to-end usable.
- [ ] `/headcount-plans` list: plan cards with country, gap, status, budget delta
- [ ] New Plan form: country, state/region, industry, headcount fields, local salary + benefits, migration fields
- [ ] `compute_budget_delta` server action — writes `net_budget_delta` and `gap` to DB on save
- [ ] Plan detail: side-by-side cost comparison table (local vs. migration)
- [ ] Malaysia state drill-down selector: Sarawak / Sabah — shows industry vertical and talent availability note
- [ ] Edit and status-change (Draft → Approved) with audit log write
- [ ] Empty / error states; loading skeleton on plan list

**Definition of Done (v1 success scenario):** Create a headcount plan for Malaysia/Sarawak/Manufacturing, enter local hire cost MYR 42K and US migration cost USD 185K + USD 18K relocation for 6 heads — see computed `net_budget_delta` saved to DB and displayed in plan card. CHRO dashboard widget reflects new plan gap.

**→ v1 FUNCTIONAL MILESTONE reached at end of Sprint 3.**

---

## Sprint 4 — Alert Centre & Persona Dashboards
**Goal:** Alerts are actionable; all four persona dashboards render real data.
- [ ] Alert engine: server action evaluates thresholds (salary gap, KPI stagnation, ARDE auto-publish) — writes alert rows
- [ ] `/alerts` page: list with priority badge, type, body, resolve/dismiss action — audit log on resolve
- [ ] `/dashboard/ceo` — AI Readiness Index gauge, Role Coverage treemap, AI Talent Gap bar, Market Salary Alert table
- [ ] `/dashboard/cto` — Technical Skills Coverage, Role Emergence Feed, Skills Gap Heatmap
- [ ] `/dashboard/chro` — Dual Scorecard distribution scatter, KPI Velocity trend, New Role Alert Log
- [ ] `/dashboard/head-of-ai` — Capability Maturity spider, Augmentation Coverage, Frontier Role Watch
- [ ] Persona switcher in nav (cookie-stored, no auth)

**Definition of Done:** Switch to CHRO persona, open alert for KPI stagnation on Siti Aminah, click Resolve, see status update in alert list and audit log row written.

---

## Sprint 5 — Microlearning, Nudges & 30/60/90-Day Plans
**Goal:** Learning paths assigned, nudges logged, action plans approved and dispatched.
- [ ] `/learning` module library: list, create, edit microlearning modules
- [ ] `assign_learning_path` server action: assign top 3 modules per employee by lowest KPI dim
- [ ] Employee learning path tab: assigned modules, status, nudge log
- [ ] `/action-plans` create: pulls open alerts + lowest KPI dims → calls `draft_action_plan` tool → shows draft with review badge
- [ ] Approval flow: Approve / Reject buttons — on Approve, sets `calendar_entries_created=true`, queues email flag, writes audit log
- [ ] Succession criteria create/edit per role + headcount plan

**Definition of Done:** Open Priya Nair's profile, run assign learning path — see 3 modules assigned. Create a CHRO action plan — see AI-drafted narrative with `unreviewed` badge. Click Approve — see `approval_status = Approved` in DB and audit log row with `approved_by`.

---

## Sprint 6 — Lock It Down  *(auth + per-org data isolation)*
**Goal:** Real users can sign up; orgs cannot see each other's data.
- [ ] Supabase Auth: email/password signup, login, logout
- [ ] `organisations` table: org record + invite-based membership + persona assignment
- [ ] Replace all v1 permissive RLS policies with `auth.uid() = user_id` owner-scoped policies
- [ ] Persona-based route guards — redirect unauthorised persona to their dashboard
- [ ] Audit log visible to org admin only
- [ ] Confirm: User A in Org 1 cannot read User B's headcount plans in Org 2

**Definition of Done:** Two separate org accounts created; each sees only their own roles, plans, scorecards, and alerts.

---

## Gantt (sprint → calendar weeks, 2-week sprints)
```
Sprint 1  [W1–W2]   Schema + Role Library
Sprint 2  [W3–W4]   Scorecards + ARDE Feed
Sprint 3  [W5–W6]   Headcount Planning Engine  ← v1 functional
Sprint 4  [W7–W8]   Alerts + Persona Dashboards
Sprint 5  [W9–W10]  Learning + Action Plans
Sprint 6  [W11–W12] Lock It Down
```
