# Security — AWorD-OS

## Secret Handling
- `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY` stored in Vercel environment variables — never in client code, never in `.env` committed to repo
- All AI calls made from Next.js route handlers (server-side only); frontend receives only the response
- Supabase anon key is public-safe; service role key is server-only

## Permission Model (v1 — demo phase)
- All tables have permissive RLS policies (`using (true)`) — readable and writable by anyone
- This is intentional for the demo-first phase; no real employee or organisational data should be entered until Sprint 6
- Sprint 6 replaces all v1 policies with `auth.uid() = user_id` owner-scoped policies
- Persona dashboard switcher in v1 is a UI filter only — it does not enforce data isolation (that comes at Sprint 6)

## Approved Tools Rule
- Agents may only call the named tools listed in `AGENTIC_LAYER.md`
- No `exec`, `eval`, or raw HTTP calls to arbitrary endpoints from agent context
- Every tool call writes a row to `audit_logs` before returning — if the write fails, the tool aborts

## Audit Principle
- Every meaningful state change (score edit, plan approval, alert resolution, action plan send) writes an audit log row
- Audit logs are append-only — no update or delete permitted (enforced by RLS: insert only after Sprint 6)
- High and Critical risk actions require `approved_by` to be non-null before execution proceeds

## Before Real Data Goes In (checklist)
- [ ] Sprint 6 auth + RLS lock-down complete and tested
- [ ] No employee PII in seed data
- [ ] Service role key rotation documented
- [ ] A human security reviewer has checked RLS policies — do not self-certify
