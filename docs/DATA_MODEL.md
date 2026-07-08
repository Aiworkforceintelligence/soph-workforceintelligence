# Data Model — AWorD-OS

## role_profiles
`id, user_id, created_at, title, taxonomy_category, taxonomy_domain, seniority_level, status (Emerging|Established|Canonical), version, country_codes[], industry_tags[], responsibilities (jsonb), skills_taxonomy (jsonb), ai_task_split (jsonb), ai_readiness_score_today, ai_readiness_score_12m, salary_min_usd, salary_max_usd`
**AI fields:** `salary_min_usd / salary_max_usd + salary_source + salary_confidence + salary_review_status`; `ret_score + ret_source + ret_confidence + ret_review_status`

## role_kpis
`id, user_id, created_at, role_profile_id → role_profiles, kpi_type (ai_accuracy|human_excellence), dimension, name, description, measurement_method, target_benchmark, weight, cadence`

## employees
`id, user_id, created_at, full_name, email, persona, role_profile_id → role_profiles, country, state_region, industry, department, seniority_level, hire_date, manager_id (self-ref)`

## dual_scorecards
`id, user_id, created_at, employee_id → employees, period_label, ai_accuracy_overall, ai_data_accuracy, ai_task_fidelity, ai_bias_score, ai_handoff_quality, ai_processing_speed, ai_error_recovery, human_excellence_overall, human_critical_thinking, human_problem_solving, human_empathic_handling, human_adaptability, human_collaboration, performance_band (computed), recommended_focus`
**AI fields:** `recommended_focus + scorecard_source + scorecard_confidence + scorecard_review_status`

## headcount_plans
`id, user_id, created_at, plan_name, country, state_region, industry_vertical, target_headcount, current_headcount, gap (computed), plan_status (Draft|Approved|Active|Closed), target_hire_by, local_salary_benchmark_annual, local_benefits_overhead_pct, local_time_to_hire_days, migration_origin_country, migration_salary_annual, migration_relocation_cost, migration_time_days, net_budget_delta (computed), scenario_notes, approved_by, approved_at`

## succession_criteria
`id, user_id, created_at, role_profile_id → role_profiles, headcount_plan_id → headcount_plans, candidate_name, readiness_rating (Ready Now|6 months|12 months|Not Ready), gap_notes, target_ready_date, elearning_path_assigned`

## arde_signals
`id, user_id, created_at, role_title, taxonomy_category, ret_score, job_posting_volume_score, unique_employer_score, geo_spread_score, skills_coherence_score, salary_data_score, velocity_flag, signal_sources[], status (Monitored|Draft|Auto-Published|Canonical), alert_triggered, alert_type`
**AI fields:** `ret_score + ret_source + ret_confidence + ret_review_status`

## alerts
`id, user_id, created_at, alert_type, priority (Critical|High|Medium|Info), title, body, related_entity_type, related_entity_id, target_persona[], country, industry, status (Open|Actioned|Dismissed), actioned_by, actioned_at`

## microlearning_modules
`id, user_id, created_at, title, format, duration_minutes, kpi_dimension, skill_tags[], content_url, is_evergreen, published_at`

## employee_learning_paths
`id, user_id, created_at, employee_id → employees, module_id → microlearning_modules, assigned_at, completed_at, nudge_sent_at, status (Assigned|In Progress|Completed|Skipped), kpi_gap_dimension`

## action_plans
`id, user_id, created_at, target_persona, plan_scope, day30_actions (jsonb), day60_actions (jsonb), day90_actions (jsonb), draft_narrative`
**AI fields:** `draft_narrative + draft_source + draft_confidence + draft_review_status`; `approval_status (Draft|Pending Approval|Approved|Rejected), approved_by, approved_at, calendar_entries_created, emails_queued`

## audit_logs
`id, user_id, created_at, actor, action, entity_type, entity_id, payload (jsonb), risk_level, approval_required, approved_by, approved_at`

## RLS (v1)
All tables: permissive read + write (no login required). Sprint 6 replaces with `auth.uid() = user_id` policies.
