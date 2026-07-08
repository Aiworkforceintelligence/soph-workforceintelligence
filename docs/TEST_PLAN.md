# Test Plan — AWorD-OS

## v1 Success Scenario (manual, end-to-end)

### Step 1 — Role Library
1. Open `/roles` as anonymous visitor
2. Filter by category = `Technical` → confirm ML Engineer row appears
3. Click ML Engineer → confirm augmented JD, AI task split, and dual KPI list load from DB
4. **Pass:** all data visible; no login prompt

### Step 2 — Employee Scorecard Edit
1. Open `/employees` → click Siti Aminah
2. Edit `human_adaptability` score: change 60 → 72, save
3. Confirm `performance_band` updates from `Developing` → `Meeting` on the same page
4. Open Supabase dashboard → confirm `dual_scorecards` row shows new score and band
5. **Pass:** data persists, band recomputes, no page reload required

### Step 3 — Headcount Plan Core Engine
1. Open `/headcount-plans` → click New Plan
2. Enter: Malaysia / Sarawak / Manufacturing / target 8 / current 2 / local salary MYR 42,000 / benefits 22% / migration origin USA / migration salary USD 185,000 / relocation USD 18,000 / gap 6
3. Save → confirm plan card appears with computed `net_budget_delta`
4. Open plan detail → confirm side-by-side cost table shows local total vs. migration total
5. Open Supabase → confirm `headcount_plans` row with correct `net_budget_delta`
6. **Pass:** budget delta computed server-side, persisted, displayed

### Step 4 — Alert Resolution
1. Open `/alerts` → find KPI Stagnation alert for Siti Aminah
2. Click Resolve → confirm status changes to `Actioned`
3. Open Supabase `audit_logs` → confirm row with `action = resolve_alert`
4. **Pass:** alert status updated, audit log written

### Step 5 — Persona Dashboard
1. Switch persona to CHRO using nav switcher
2. Confirm CHRO dashboard loads: Dual Scorecard distribution, New Role Alert Log
3. New Role Alert Log should show `AI Observability Engineer` from seed data
4. **Pass:** dashboard shows real data from DB, not hardcoded values

---

## Empty State Tests
- Delete all headcount plans → `/headcount-plans` shows empty illustration + "Create your first plan" CTA
- Employee with no scorecard → scorecard tab shows "No scorecard yet" + Add Score button
- No open alerts → alert centre shows "All clear" state

## Error State Tests
- Submit headcount plan with `target_headcount = 0` → form validation error displayed inline
- Supabase offline (disable network) → all list pages show "Unable to load data. Try again." — no crash
- AI draft action plan fails (mock 500 from OpenAI route) → shows "Draft unavailable — enter manually" fallback

## Data Integrity Checks
- `net_budget_delta` recalculates correctly for three different input combinations (verify against manual arithmetic)
- Performance band boundaries: score 55 → `Developing`; score 75 → `Meeting`; score 90 → `Exceeding`; score 54 → `Needs Support`
- RET auto-publish: ARDE signal with `ret_score = 80` shows status `Auto-Published`; score 64 shows `Monitored`
