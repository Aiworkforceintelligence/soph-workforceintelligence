# PRD — AWorD-OS Workforce Intelligence OS

## Problem
Organisations have no single system to validate AI-native roles, measure human + AI performance together, plan headcount across geographies with cost-migration analysis, and push timely learning nudges — so workforce decisions lag the market by months.

## Target Users
CEO, CTO, CHRO, Head of AI, CFO, COO, HR Director, People Managers, Individual Contributors across SMEs and corporates, primarily in Malaysia, Singapore, US, UK, Australia.

## Core Objects
- **Role Profile** — augmented JD with AI task split, dual KPI set, version, country/industry tags
- **Dual Scorecard** — AI accuracy + human excellence scores per employee per period
- **ARDE Signal** — autonomous role emergence detection record with RET score and alert status
- **Headcount Plan** — country/state/industry target, local vs. migration cost comparison, budget delta
- **Alert** — priority-tagged notification tied to a role, scorecard, or market signal
- **Microlearning Module** — format, duration, KPI dimension, skill tags
- **Action Plan** — 30/60/90-day draft requiring human-loop approval before calendar + email dispatch

## MVP Must-Haves (v1)
- [ ] Role library browsable by taxonomy, country, industry — full augmented JD visible anonymously
- [ ] Dual Scorecard create/edit/view per employee; performance band computed server-side
- [ ] Headcount Plan create/edit with local vs. migration cost comparison and net budget delta
- [ ] Malaysia state drill-down (Sarawak, Sabah) with industry vertical breakdown
- [ ] ARDE Signal feed with RET score and status badges
- [ ] Alert centre with priority, type, and resolve action
- [ ] Persona dashboard switcher (CEO / CTO / CHRO / Head of AI) — no login required in v1
- [ ] Seed data renders on first load — no blank screens

## Non-Goals (v1)
- Multi-tenant auth and per-org data isolation (Sprint 6)
- Live job feed ingestion pipelines (later)
- AEO candidate sourcing integration (later)
- HRIS API connectors (later)
- White-label microlearning delivery (later)

## Definition of Done
A demo visitor opens `/headcount-plans`, creates a plan for Malaysia/Sarawak in Manufacturing, enters local hire vs. US migration numbers, sees a computed net budget delta persisted to the database, then navigates to the CHRO dashboard and sees the new plan reflected in the headcount gap widget — all without logging in.
