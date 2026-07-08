create table if not exists role_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  title text not null,
  taxonomy_category text not null,
  taxonomy_domain text,
  seniority_level text,
  status text not null default 'Established',
  version text not null default 'v1.0.0',
  country_codes text[],
  industry_tags text[],
  responsibilities jsonb,
  skills_taxonomy jsonb,
  ai_task_split jsonb,
  ai_readiness_score_today numeric,
  ai_readiness_score_12m numeric,
  salary_min_usd numeric,
  salary_max_usd numeric,
  salary_source text,
  salary_confidence numeric,
  salary_review_status text default 'unreviewed',
  ret_score numeric,
  ret_source text,
  ret_confidence numeric,
  ret_review_status text default 'unreviewed',
  signal_first_detected_at timestamptz,
  signal_sources text[],
  confidence_score numeric,
  is_arde_discovered boolean default false
);
alter table role_profiles enable row level security;
drop policy if exists "role_profiles_v1_read" on role_profiles;
create policy "role_profiles_v1_read" on role_profiles for select using (true);
drop policy if exists "role_profiles_v1_write" on role_profiles;
create policy "role_profiles_v1_write" on role_profiles for all using (true) with check (true);

create table if not exists role_kpis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  role_profile_id uuid references role_profiles(id) on delete cascade,
  kpi_type text not null,
  dimension text,
  name text not null,
  description text,
  measurement_method text,
  target_benchmark text,
  weight numeric,
  cadence text
);
alter table role_kpis enable row level security;
drop policy if exists "role_kpis_v1_read" on role_kpis;
create policy "role_kpis_v1_read" on role_kpis for select using (true);
drop policy if exists "role_kpis_v1_write" on role_kpis;
create policy "role_kpis_v1_write" on role_kpis for all using (true) with check (true);

create table if not exists employees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text,
  persona text,
  role_profile_id uuid references role_profiles(id),
  country text,
  state_region text,
  industry text,
  department text,
  seniority_level text,
  hire_date date,
  manager_id uuid
);
alter table employees enable row level security;
drop policy if exists "employees_v1_read" on employees;
create policy "employees_v1_read" on employees for select using (true);
drop policy if exists "employees_v1_write" on employees;
create policy "employees_v1_write" on employees for all using (true) with check (true);

create table if not exists dual_scorecards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  employee_id uuid references employees(id) on delete cascade,
  period_label text not null,
  ai_accuracy_overall numeric,
  ai_data_accuracy numeric,
  ai_task_fidelity numeric,
  ai_bias_score numeric,
  ai_handoff_quality numeric,
  ai_processing_speed numeric,
  ai_error_recovery numeric,
  human_excellence_overall numeric,
  human_critical_thinking numeric,
  human_problem_solving numeric,
  human_empathic_handling numeric,
  human_adaptability numeric,
  human_collaboration numeric,
  performance_band text,
  recommended_focus text,
  scorecard_source text,
  scorecard_confidence numeric,
  scorecard_review_status text default 'unreviewed'
);
alter table dual_scorecards enable row level security;
drop policy if exists "dual_scorecards_v1_read" on dual_scorecards;
create policy "dual_scorecards_v1_read" on dual_scorecards for select using (true);
drop policy if exists "dual_scorecards_v1_write" on dual_scorecards;
create policy "dual_scorecards_v1_write" on dual_scorecards for all using (true) with check (true);

create table if not exists headcount_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  plan_name text not null,
  country text not null,
  state_region text,
  industry_vertical text,
  target_headcount integer,
  current_headcount integer,
  gap integer,
  plan_status text not null default 'Draft',
  target_hire_by date,
  local_salary_benchmark_annual numeric,
  local_benefits_overhead_pct numeric,
  local_time_to_hire_days integer,
  migration_origin_country text,
  migration_salary_annual numeric,
  migration_relocation_cost numeric,
  migration_time_days integer,
  net_budget_delta numeric,
  scenario_notes text,
  approved_by text,
  approved_at timestamptz
);
alter table headcount_plans enable row level security;
drop policy if exists "headcount_plans_v1_read" on headcount_plans;
create policy "headcount_plans_v1_read" on headcount_plans for select using (true);
drop policy if exists "headcount_plans_v1_write" on headcount_plans;
create policy "headcount_plans_v1_write" on headcount_plans for all using (true) with check (true);

create table if not exists succession_criteria (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  role_profile_id uuid references role_profiles(id),
  headcount_plan_id uuid references headcount_plans(id),
  candidate_name text,
  readiness_rating text,
  gap_notes text,
  target_ready_date date,
  elearning_path_assigned boolean default false
);
alter table succession_criteria enable row level security;
drop policy if exists "succession_criteria_v1_read" on succession_criteria;
create policy "succession_criteria_v1_read" on succession_criteria for select using (true);
drop policy if exists "succession_criteria_v1_write" on succession_criteria;
create policy "succession_criteria_v1_write" on succession_criteria for all using (true) with check (true);

create table if not exists arde_signals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  role_title text not null,
  taxonomy_category text,
  ret_score numeric,
  job_posting_volume_score numeric,
  unique_employer_score numeric,
  geo_spread_score numeric,
  skills_coherence_score numeric,
  salary_data_score numeric,
  velocity_flag boolean default false,
  signal_sources text[],
  status text default 'Monitored',
  alert_triggered boolean default false,
  alert_type text,
  ret_source text,
  ret_confidence numeric,
  ret_review_status text default 'unreviewed'
);
alter table arde_signals enable row level security;
drop policy if exists "arde_signals_v1_read" on arde_signals;
create policy "arde_signals_v1_read" on arde_signals for select using (true);
drop policy if exists "arde_signals_v1_write" on arde_signals;
create policy "arde_signals_v1_write" on arde_signals for all using (true) with check (true);

create table if not exists alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  alert_type text not null,
  priority text not null,
  title text not null,
  body text,
  related_entity_type text,
  related_entity_id uuid,
  target_persona text[],
  country text,
  industry text,
  status text not null default 'Open',
  actioned_by text,
  actioned_at timestamptz
);
alter table alerts enable row level security;
drop policy if exists "alerts_v1_read" on alerts;
create policy "alerts_v1_read" on alerts for select using (true);
drop policy if exists "alerts_v1_write" on alerts;
create policy "alerts_v1_write" on alerts for all using (true) with check (true);

create table if not exists microlearning_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  title text not null,
  format text not null,
  duration_minutes numeric,
  kpi_dimension text,
  skill_tags text[],
  content_url text,
  is_evergreen boolean default false,
  published_at timestamptz
);
alter table microlearning_modules enable row level security;
drop policy if exists "microlearning_modules_v1_read" on microlearning_modules;
create policy "microlearning_modules_v1_read" on microlearning_modules for select using (true);
drop policy if exists "microlearning_modules_v1_write" on microlearning_modules;
create policy "microlearning_modules_v1_write" on microlearning_modules for all using (true) with check (true);

create table if not exists employee_learning_paths (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  employee_id uuid references employees(id) on delete cascade,
  module_id uuid references microlearning_modules(id),
  assigned_at timestamptz default now(),
  completed_at timestamptz,
  nudge_sent_at timestamptz,
  status text default 'Assigned',
  kpi_gap_dimension text
);
alter table employee_learning_paths enable row level security;
drop policy if exists "employee_learning_paths_v1_read" on employee_learning_paths;
create policy "employee_learning_paths_v1_read" on employee_learning_paths for select using (true);
drop policy if exists "employee_learning_paths_v1_write" on employee_learning_paths;
create policy "employee_learning_paths_v1_write" on employee_learning_paths for all using (true) with check (true);

create table if not exists action_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  target_persona text,
  plan_scope text,
  day30_actions jsonb,
  day60_actions jsonb,
  day90_actions jsonb,
  draft_narrative text,
  draft_source text,
  draft_confidence numeric,
  draft_review_status text default 'unreviewed',
  approval_status text default 'Draft',
  approved_by text,
  approved_at timestamptz,
  calendar_entries_created boolean default false,
  emails_queued boolean default false
);
alter table action_plans enable row level security;
drop policy if exists "action_plans_v1_read" on action_plans;
create policy "action_plans_v1_read" on action_plans for select using (true);
drop policy if exists "action_plans_v1_write" on action_plans;
create policy "action_plans_v1_write" on action_plans for all using (true) with check (true);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  created_at timestamptz not null default now(),
  actor text,
  action text not null,
  entity_type text,
  entity_id uuid,
  payload jsonb,
  risk_level text,
  approval_required boolean default false,
  approved_by text,
  approved_at timestamptz
);
alter table audit_logs enable row level security;
drop policy if exists "audit_logs_v1_read" on audit_logs;
create policy "audit_logs_v1_read" on audit_logs for select using (true);
drop policy if exists "audit_logs_v1_write" on audit_logs;
create policy "audit_logs_v1_write" on audit_logs for all using (true) with check (true);

insert into role_profiles (title, taxonomy_category, taxonomy_domain, seniority_level, status, version, country_codes, industry_tags, responsibilities, skills_taxonomy, ai_task_split, ai_readiness_score_today, ai_readiness_score_12m, salary_min_usd, salary_max_usd, salary_source, salary_confidence, salary_review_status, confidence_score, is_arde_discovered) values
('Chief AI Officer (CAIO)', 'Management', 'Leadership & Strategy', 'C-Suite', 'Canonical', 'v2.1.0', '{"US","MY","SG","UK"}', '{"Technology","Financial Services","Consulting"}', '["Define enterprise AI strategy","Govern AI ethics and risk","Lead AI transformation programmes","Align AI investment to business ROI","Report AI readiness to board"]', '{"hard":["LLM architecture","AI governance frameworks","MLOps"],"soft":["Strategic communication","Executive leadership","Change management"],"ai_native":["Prompt strategy","AI risk frameworks"]}', '{"human_led":["Board communication","Ethics decisions","Culture leadership"],"ai_assisted":["Strategy drafting","Market benchmarking","Reporting"],"ai_automated":["Signal monitoring","KPI aggregation"]}', 55, 70, 220000, 290000, 'LinkedIn/PwC 2026', 88, 'reviewed', 92, false),
('ML Engineer', 'Technical', 'Engineering & Development', 'Senior', 'Established', 'v2.0.1', '{"US","MY","SG","AU"}', '{"Technology","Financial Services","Healthcare"}', '["Design and train production ML models","Build and maintain ML pipelines","Implement MLOps practices","Evaluate model performance and bias","Collaborate with data engineers on feature stores"]', '{"hard":["Python","PyTorch","Kubeflow","MLflow","SQL"],"soft":["Problem solving","Collaboration"],"ai_native":["LLM fine-tuning","RAG pipelines"]}', '{"human_led":["Model design decisions","Ethical review","Stakeholder communication"],"ai_assisted":["Code generation","Hyperparameter tuning","Documentation"],"ai_automated":["Pipeline monitoring","Test execution","Alerting"]}', 68, 82, 180000, 280000, 'LinkedIn/levels.fyi 2026', 91, 'reviewed', 95, false),
('AI HR Business Partner', 'Business', 'People & Culture', 'Mid', 'Established', 'v1.3.0', '{"MY","SG","UK","AU"}', '{"All Industries"}', '["Translate HR strategy into AI-augmented workforce plans","Advise managers on dual KPI frameworks","Run role augmentation workshops","Monitor employee engagement and KPI trends","Coordinate microlearning programme adoption"]', '{"hard":["HRIS platforms","People analytics","KPI design"],"soft":["Empathy","Coaching","Communication"],"ai_native":["Prompt-assisted reporting","AI survey analysis"]}', '{"human_led":["Sensitive employee conversations","Performance decisions","Cultural programmes"],"ai_assisted":["Report drafting","Survey analysis","Learning path recommendation"],"ai_automated":["KPI tracking","Nudge scheduling","Alert routing"]}', 48, 65, 90000, 140000, 'DOSM/LinkedIn MY 2026', 80, 'reviewed', 84, false),
('Generative AI Product Manager', 'Emerging & Specialised', 'Emerging & Specialised', 'Senior', 'Emerging', 'v1.0.0', '{"US","UK","SG"}', '{"Technology","SaaS","EdTech"}', '["Own product roadmap for GenAI-powered features","Define evaluation criteria for LLM outputs","Work with ML engineers on prompt and model strategy","Define user research for AI UX","Measure feature adoption and accuracy KPIs"]', '{"hard":["Product management","LLM evaluation","A/B testing"],"soft":["Stakeholder management","Critical thinking"],"ai_native":["Prompt design","AI feature scoping"]}', '{"human_led":["Roadmap prioritisation","User interviews","Ethical trade-offs"],"ai_assisted":["PRD drafting","Competitive research","KPI reporting"],"ai_automated":["Usage telemetry","Alert triggers"]}', 60, 78, 175000, 260000, 'LinkedIn 2026', 76, 'unreviewed', 78, true),
('AI Workforce Planner', 'Emerging & Specialised', 'People & Culture', 'Mid', 'Emerging', 'v1.0.0', '{"MY","SG","AU","US"}', '{"All Industries"}', '["Model headcount demand by role and country","Build cost-comparison scenarios for local hire vs. migration","Maintain succession pipeline data","Monitor role emergence signals from ARDE","Produce 30/60/90-day workforce action plans"]', '{"hard":["Workforce analytics","Headcount modelling","Excel/BI tools"],"soft":["Strategic thinking","Communication"],"ai_native":["Predictive modelling prompts","AI-assisted scenario planning"]}', '{"human_led":["Budget approvals","Succession decisions","Plan sign-off"],"ai_assisted":["Scenario modelling","Draft plans","Cost benchmarking"],"ai_automated":["Signal monitoring","Alert routing","Data refresh"]}', 52, 70, 85000, 130000, 'LinkedIn/DOSM 2026', 74, 'unreviewed', 71, true);

insert into employees (full_name, email, persona, country, state_region, industry, department, seniority_level, hire_date) values
('Priya Nair', 'priya.nair@demo.aword.os', 'CHRO', 'Malaysia', 'Kuala Lumpur', 'Technology', 'People & Culture', 'C-Suite', '2022-03-15'),
('James Okonkwo', 'james.okonkwo@demo.aword.os', 'CTO', 'United States', 'California', 'Technology', 'Engineering', 'C-Suite', '2021-08-01'),
('Siti Aminah', 'siti.aminah@demo.aword.os', 'HR Director', 'Malaysia', 'Sarawak', 'Manufacturing', 'Human Resources', 'Director', '2023-01-10');

insert into dual_scorecards (employee_id, period_label, ai_accuracy_overall, ai_data_accuracy, ai_task_fidelity, ai_bias_score, ai_handoff_quality, human_excellence_overall, human_critical_thinking, human_problem_solving, human_empathic_handling, human_adaptability, human_collaboration, performance_band, recommended_focus, scorecard_source, scorecard_confidence, scorecard_review_status) values
((select id from employees where email='priya.nair@demo.aword.os'), 'Q2 2026', 88, 94, 4.3, 1.4, 91, 81, 84, 78, 71, 86, 85, 'Meeting', 'Empathic handling microlearning', 'system_assessment', 85, 'reviewed'),
((select id from employees where email='james.okonkwo@demo.aword.os'), 'Q2 2026', 93, 97, 4.6, 0.9, 95, 76, 80, 75, 68, 78, 79, 'Meeting', 'Adaptability & growth nudges', 'system_assessment', 87, 'reviewed'),
((select id from employees where email='siti.aminah@demo.aword.os'), 'Q2 2026', 72, 80, 3.9, 2.1, 84, 66, 70, 72, 60, 64, 68, 'Developing', 'Problem solving and adaptability modules', 'system_assessment', 79, 'unreviewed');

insert into headcount_plans (plan_name, country, state_region, industry_vertical, target_headcount, current_headcount, gap, plan_status, target_hire_by, local_salary_benchmark_annual, local_benefits_overhead_pct, local_time_to_hire_days, migration_origin_country, migration_salary_annual, migration_relocation_cost, migration_time_days, net_budget_delta, scenario_notes) values
('Malaysia AI Engineering Scale-Up', 'Malaysia', 'Kuala Lumpur', 'Technology', 12, 5, 7, 'Active', '2026-12-31', 55000, 25, 60, 'United States', 185000, 18000, 90, -882000, 'Migrate 4 ML roles from US team to KL; hire 3 locally. Net saving vs. full US hire: ~USD 882K/yr'),
('Sarawak Digital Industries Expansion', 'Malaysia', 'Sarawak', 'Manufacturing & Industrial', 8, 2, 6, 'Draft', '2027-03-31', 42000, 22, 75, null, null, null, null, null, 'Greenfield AI ops team for Bintulu industrial corridor; local hire preferred. Talent availability: moderate.');

insert into arde_signals (role_title, taxonomy_category, ret_score, job_posting_volume_score, unique_employer_score, geo_spread_score, skills_coherence_score, salary_data_score, velocity_flag, signal_sources, status, alert_triggered, alert_type, ret_source, ret_confidence, ret_review_status) values
('AI Observability Engineer', 'Emerging & Specialised', 83, 78, 80, 72, 91, 85, false, '{"LinkedIn","GitHub","Hugging Face"}', 'Auto-Published', true, 'New Role Published', 'ARDE v2.0', 83, 'reviewed'),
('Quantum ML Engineer', 'Emerging & Specialised', 61, 55, 58, 50, 74, 48, false, '{"arXiv","USPTO","NeurIPS 2025"}', 'Monitored', false, null, 'ARDE v2.0', 61, 'unreviewed'),
('AI FinOps Analyst', 'Emerging & Specialised', 77, 74, 70, 68, 82, 79, true, '{"LinkedIn","Gartner","Y Combinator"}', 'Draft', true, 'Emerging Role Watch', 'ARDE v2.0', 77, 'unreviewed');

insert into alerts (alert_type, priority, title, body, related_entity_type, target_persona, country, industry, status) values
('Role Discovery', 'High', 'New Role Published: AI Observability Engineer', 'ARDE detected AI Observability Engineer with RET score 83. Auto-published to library. Review and assign hiring budget.', 'arde_signal', '{"CHRO","Head of AI","CTO"}', null, null, 'Open'),
('Performance', 'Medium', 'KPI Stagnation: Siti Aminah — Adaptability', 'Adaptability KPI score unchanged for 62 days (score: 60). Recommend escalated microlearning intervention.', 'dual_scorecard', '{"HR Director","People Manager"}', 'Malaysia', 'Manufacturing', 'Open'),
('Market', 'High', 'Salary Band Gap: ML Engineer — Malaysia', 'Market rate for ML Engineer in Malaysia has exceeded internal band by 18%. Review compensation before Q3 cycle.', 'role_profile', '{"CHRO","CEO","CFO"}', 'Malaysia', null, 'Open');

insert into microlearning_modules (title, format, duration_minutes, kpi_dimension, skill_tags, is_evergreen) values
('3 Techniques for Active Listening in AI-Augmented Teams', 'Bite-sized lesson', 4, 'human_empathic_handling', '{"active listening","empathy","team communication"}', true),
('Root Cause Analysis: A 5-Why Walkthrough', 'Scenario challenge', 8, 'human_problem_solving', '{"critical thinking","root cause","decision making"}', true),
('Adapting to New AI Tools: A 4-Step Framework', 'Bite-sized lesson', 5, 'human_adaptability', '{"change adoption","learning agility","AI tools"}', false),
('Understanding LLM Output Fidelity for Non-Technical Leaders', 'Case study digest', 10, 'ai_task_fidelity', '{"LLM","AI accuracy","output quality"}', false);