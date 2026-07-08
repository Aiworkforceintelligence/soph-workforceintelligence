# Intelligence Layer — AWorD-OS

## Messy Inputs
- Uploaded or typed job descriptions (unstructured text)
- Manual KPI scores entered by managers
- ARDE signal data (role titles, posting volumes, sources)
- Employee survey free-text (engagement, stress signals)
- Headcount numbers and salary figures pasted from spreadsheets

## Auto-Structure Schema (example — ARDE signal → role draft)
```json
{
  "role_title": "AI Observability Engineer",
  "taxonomy_category": "Emerging & Specialised",
  "ret_score": 83,
  "signal_sources": ["LinkedIn", "GitHub", "Hugging Face"],
  "status": "Auto-Published",
  "ret_source": "ARDE v2.0",
  "ret_confidence": 0.83,
  "ret_review_status": "unreviewed",
  "draft_responsibilities": ["Monitor LLM pipeline health", "Define observability metrics for model drift"],
  "draft_skills": ["OpenTelemetry", "Prometheus", "Python", "MLflow"]
}
```

## Events to Track
- Role profile viewed, created, updated, version bumped
- Scorecard score entered or changed — which dimension, old vs. new value
- Headcount plan created, approved, budget delta computed
- Alert triggered, opened, actioned, dismissed
- Learning module assigned, nudge sent, module completed
- Action plan drafted, submitted for approval, approved, calendar entries created

## Scoring Rules (v1 — rule-based)
- **Performance band:** `score ≥ 90 → Exceeding; 75–89 → Meeting; 55–74 → Developing; <55 → Needs Support`
- **RET threshold:** `score ≥ 80 → Auto-publish + alert; 65–79 → Draft + digest; <65 → Monitored`
- **Salary gap alert:** `market_rate > internal_band × 1.15 → High priority alert`
- **KPI stagnation:** `no scorecard change in 60 days → Medium alert`
- **Budget delta:** `net_budget_delta = (migration_salary + relocation_cost/3) × gap - (local_salary × (1 + benefits_pct/100)) × gap`

## What Gets Ranked
- Employees by lowest KPI dimension (drives microlearning assignment)
- Roles by RET score (drives ARDE feed order)
- Alerts by priority + recency
- Headcount plans by gap size and target date proximity

## v1 vs. Later
**v1:** All scoring is deterministic rule-based logic in server actions and Postgres.
**Later:** OpenAI API drafts action plan narratives, scorecard summaries, and role descriptions. All AI output stored with `source + confidence + review_status`. ARDE signal clustering uses NLP (OpenAI embeddings) to detect new role title patterns from job feed data.
