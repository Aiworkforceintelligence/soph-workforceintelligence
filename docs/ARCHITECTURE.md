# Architecture — AWorD-OS

## Stack
- **Frontend:** Next.js 14 (App Router) — Vercel
- **Database + Auth:** Supabase (Postgres + RLS + Auth)
- **AI features:** OpenAI API (server-side only, via Next.js route handlers)
- **Styling:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts

## Build Sequence
**Now:** schema + seed → role library UI → dual scorecards → headcount planning engine → ARDE feed → alert centre → persona dashboards
**Next:** microlearning nudge engine → 30/60/90-day plan generator with approval flow → succession criteria
**Later:** Supabase Auth + per-org RLS lock-down → HRIS integrations → live job feed ingestion

## Key User Action — Step-by-Step
1. HR Director opens `/headcount-plans` — page fetches plans from `headcount_plans` table (Supabase RLS: open in v1)
2. Clicks **New Plan** → form captures country, state, industry, target headcount, local salary, migration origin + salary + relocation cost
3. On submit: server action calculates `net_budget_delta = (migration_salary + relocation_annualised) × headcount - local_total_cost × headcount`, writes row to `headcount_plans`
4. Page re-renders with new plan card — no refresh needed (optimistic update)
5. Alert engine (cron / on-demand) scans `headcount_plans` and `dual_scorecards` for threshold breaches → writes rows to `alerts`
6. CHRO dashboard reads `headcount_plans`, `dual_scorecards`, `alerts` — aggregates server-side, renders widgets
7. Any AI-drafted narrative (action plan, scorecard summary) is written with `source`, `confidence`, `review_status` fields; shown with a review badge until approved

## Why Core Runs Without AI
All KPI scores, headcount budget deltas, performance bands, and alert triggers are computed by deterministic Postgres logic and Next.js server actions. AI is additive — it drafts narratives and auto-tags signals; removing it leaves every number and action intact.
