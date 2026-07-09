import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

type Json = Record<string, unknown> | unknown[] | null;

export type RoleProfile = {
  id: string;
  title: string;
  taxonomy_category: string;
  taxonomy_domain: string | null;
  seniority_level: string | null;
  status: string;
  version: string;
  country_codes: string[] | null;
  industry_tags: string[] | null;
  responsibilities: string[] | null;
  skills_taxonomy: Record<string, string[]> | null;
  ai_task_split: Record<string, string[]> | null;
  ai_readiness_score_today: number | null;
  ai_readiness_score_12m: number | null;
  salary_min_usd: number | null;
  salary_max_usd: number | null;
  ret_score?: number | null;
};

export type RoleKpi = {
  id: string;
  role_profile_id: string;
  kpi_type: string;
  dimension: string | null;
  name: string;
  description: string | null;
  measurement_method: string | null;
  target_benchmark: string | null;
  weight: number | null;
  cadence: string | null;
};

export type Employee = {
  id: string;
  full_name: string;
  email: string | null;
  persona: string | null;
  country: string | null;
  state_region: string | null;
  industry: string | null;
  department: string | null;
  seniority_level: string | null;
};

export type Scorecard = {
  id: string;
  employee_id: string;
  period_label: string;
  ai_accuracy_overall: number | null;
  ai_data_accuracy: number | null;
  ai_task_fidelity: number | null;
  ai_bias_score: number | null;
  ai_handoff_quality: number | null;
  human_excellence_overall: number | null;
  human_critical_thinking: number | null;
  human_problem_solving: number | null;
  human_empathic_handling: number | null;
  human_adaptability: number | null;
  human_collaboration: number | null;
  performance_band: string | null;
  recommended_focus: string | null;
};

export type HeadcountPlan = {
  id: string;
  created_at?: string;
  plan_name: string;
  country: string;
  state_region: string | null;
  industry_vertical: string | null;
  target_headcount: number | null;
  current_headcount: number | null;
  gap: number | null;
  plan_status: string;
  target_hire_by: string | null;
  local_salary_benchmark_annual: number | null;
  local_benefits_overhead_pct: number | null;
  local_time_to_hire_days: number | null;
  migration_origin_country: string | null;
  migration_salary_annual: number | null;
  migration_relocation_cost: number | null;
  migration_time_days: number | null;
  net_budget_delta: number | null;
  scenario_notes: string | null;
};

export type ArdeSignal = {
  id: string;
  role_title: string;
  taxonomy_category: string | null;
  ret_score: number | null;
  velocity_flag: boolean | null;
  signal_sources: string[] | null;
  status: string | null;
  alert_type: string | null;
};

export type Alert = {
  id: string;
  alert_type: string;
  priority: string;
  title: string;
  body: string | null;
  target_persona: string[] | null;
  country: string | null;
  industry: string | null;
  status: string;
};

export type LearningModule = {
  id: string;
  title: string;
  format: string;
  duration_minutes: number | null;
  kpi_dimension: string | null;
  skill_tags: string[] | null;
  is_evergreen: boolean | null;
};

const seedRoles: RoleProfile[] = [
  {
    id: "role-caio",
    title: "Chief AI Officer (CAIO)",
    taxonomy_category: "Management",
    taxonomy_domain: "Leadership & Strategy",
    seniority_level: "C-Suite",
    status: "Canonical",
    version: "v2.1.0",
    country_codes: ["US", "MY", "SG", "UK"],
    industry_tags: ["Technology", "Financial Services", "Consulting"],
    responsibilities: ["Define enterprise AI strategy", "Govern AI ethics and risk", "Lead AI transformation programmes", "Align AI investment to ROI", "Report AI readiness to board"],
    skills_taxonomy: { hard: ["LLM architecture", "AI governance"], soft: ["Executive leadership", "Change management"], ai_native: ["Prompt strategy", "AI risk frameworks"] },
    ai_task_split: { human_led: ["Board communication", "Ethics decisions"], ai_assisted: ["Strategy drafting", "Market benchmarking"], ai_automated: ["Signal monitoring", "KPI aggregation"] },
    ai_readiness_score_today: 55,
    ai_readiness_score_12m: 70,
    salary_min_usd: 220000,
    salary_max_usd: 290000,
  },
  {
    id: "role-ml-engineer",
    title: "ML Engineer",
    taxonomy_category: "Technical",
    taxonomy_domain: "Engineering & Development",
    seniority_level: "Senior",
    status: "Established",
    version: "v2.0.1",
    country_codes: ["US", "MY", "SG", "AU"],
    industry_tags: ["Technology", "Financial Services", "Healthcare"],
    responsibilities: ["Design and train production ML models", "Build and maintain ML pipelines", "Implement MLOps practices", "Evaluate model performance and bias", "Collaborate on feature stores"],
    skills_taxonomy: { hard: ["Python", "PyTorch", "Kubeflow", "MLflow", "SQL"], soft: ["Problem solving", "Collaboration"], ai_native: ["LLM fine-tuning", "RAG pipelines"] },
    ai_task_split: { human_led: ["Model design decisions", "Ethical review"], ai_assisted: ["Code generation", "Hyperparameter tuning"], ai_automated: ["Pipeline monitoring", "Test execution"] },
    ai_readiness_score_today: 68,
    ai_readiness_score_12m: 82,
    salary_min_usd: 180000,
    salary_max_usd: 280000,
  },
  {
    id: "role-workforce-planner",
    title: "AI Workforce Planner",
    taxonomy_category: "Emerging & Specialised",
    taxonomy_domain: "People & Culture",
    seniority_level: "Mid",
    status: "Emerging",
    version: "v1.0.0",
    country_codes: ["MY", "SG", "AU", "US"],
    industry_tags: ["All Industries"],
    responsibilities: ["Model headcount demand by role and country", "Build cost-comparison scenarios", "Maintain succession pipeline data", "Monitor ARDE signals", "Produce workforce action plans"],
    skills_taxonomy: { hard: ["Workforce analytics", "Headcount modelling"], soft: ["Strategic thinking", "Communication"], ai_native: ["AI-assisted scenario planning"] },
    ai_task_split: { human_led: ["Budget approvals", "Succession decisions"], ai_assisted: ["Scenario modelling", "Draft plans"], ai_automated: ["Signal monitoring", "Alert routing"] },
    ai_readiness_score_today: 52,
    ai_readiness_score_12m: 70,
    salary_min_usd: 85000,
    salary_max_usd: 130000,
  },
];

const seedKpis: RoleKpi[] = [
  { id: "kpi-1", role_profile_id: "role-ml-engineer", kpi_type: "ai_accuracy", dimension: "ai_task_fidelity", name: "Model output fidelity", description: "Quality of model outputs against acceptance criteria.", measurement_method: "Human review and automated evals", target_benchmark: "4.2/5 average", weight: 25, cadence: "Monthly" },
  { id: "kpi-2", role_profile_id: "role-ml-engineer", kpi_type: "human_excellence", dimension: "human_problem_solving", name: "Production problem solving", description: "Resolves incidents and root causes across the model lifecycle.", measurement_method: "Incident review", target_benchmark: "Meeting or higher", weight: 20, cadence: "Quarterly" },
  { id: "kpi-3", role_profile_id: "role-caio", kpi_type: "human_excellence", dimension: "human_critical_thinking", name: "Strategic decision depth", description: "Board-level AI trade-off decisions backed by evidence.", measurement_method: "Executive review", target_benchmark: "90% confidence", weight: 30, cadence: "Quarterly" },
  { id: "kpi-4", role_profile_id: "role-workforce-planner", kpi_type: "human_excellence", dimension: "human_adaptability", name: "Scenario agility", description: "Updates workforce plans as signals change.", measurement_method: "Plan revision audit", target_benchmark: "Within 7 days", weight: 20, cadence: "Monthly" },
];

const seedEmployees: Employee[] = [
  { id: "emp-priya", full_name: "Priya Nair", email: "priya.nair@demo.aword.os", persona: "CHRO", country: "Malaysia", state_region: "Kuala Lumpur", industry: "Technology", department: "People & Culture", seniority_level: "C-Suite" },
  { id: "emp-james", full_name: "James Okonkwo", email: "james.okonkwo@demo.aword.os", persona: "CTO", country: "United States", state_region: "California", industry: "Technology", department: "Engineering", seniority_level: "C-Suite" },
  { id: "emp-siti", full_name: "Siti Aminah", email: "siti.aminah@demo.aword.os", persona: "HR Director", country: "Malaysia", state_region: "Sarawak", industry: "Manufacturing", department: "Human Resources", seniority_level: "Director" },
];

const seedScorecards: Scorecard[] = [
  { id: "score-priya", employee_id: "emp-priya", period_label: "Q2 2026", ai_accuracy_overall: 88, ai_data_accuracy: 94, ai_task_fidelity: 4.3, ai_bias_score: 1.4, ai_handoff_quality: 91, human_excellence_overall: 81, human_critical_thinking: 84, human_problem_solving: 78, human_empathic_handling: 71, human_adaptability: 86, human_collaboration: 85, performance_band: "Meeting", recommended_focus: "Empathic handling microlearning" },
  { id: "score-james", employee_id: "emp-james", period_label: "Q2 2026", ai_accuracy_overall: 93, ai_data_accuracy: 97, ai_task_fidelity: 4.6, ai_bias_score: 0.9, ai_handoff_quality: 95, human_excellence_overall: 76, human_critical_thinking: 80, human_problem_solving: 75, human_empathic_handling: 68, human_adaptability: 78, human_collaboration: 79, performance_band: "Meeting", recommended_focus: "Adaptability nudges" },
  { id: "score-siti", employee_id: "emp-siti", period_label: "Q2 2026", ai_accuracy_overall: 72, ai_data_accuracy: 80, ai_task_fidelity: 3.9, ai_bias_score: 2.1, ai_handoff_quality: 84, human_excellence_overall: 66, human_critical_thinking: 70, human_problem_solving: 72, human_empathic_handling: 60, human_adaptability: 60, human_collaboration: 68, performance_band: "Developing", recommended_focus: "Problem solving and adaptability modules" },
];

const seedPlans: HeadcountPlan[] = [
  { id: "plan-kl", plan_name: "Malaysia AI Engineering Scale-Up", country: "Malaysia", state_region: "Kuala Lumpur", industry_vertical: "Technology", target_headcount: 12, current_headcount: 5, gap: 7, plan_status: "Active", target_hire_by: "2026-12-31", local_salary_benchmark_annual: 55000, local_benefits_overhead_pct: 25, local_time_to_hire_days: 60, migration_origin_country: "United States", migration_salary_annual: 185000, migration_relocation_cost: 18000, migration_time_days: 90, net_budget_delta: 917000, scenario_notes: "Migrate 4 ML roles from US team to KL; hire 3 locally." },
  { id: "plan-sarawak", plan_name: "Sarawak Digital Industries Expansion", country: "Malaysia", state_region: "Sarawak", industry_vertical: "Manufacturing", target_headcount: 8, current_headcount: 2, gap: 6, plan_status: "Draft", target_hire_by: "2027-03-31", local_salary_benchmark_annual: 42000, local_benefits_overhead_pct: 22, local_time_to_hire_days: 75, migration_origin_country: "United States", migration_salary_annual: 185000, migration_relocation_cost: 18000, migration_time_days: 90, net_budget_delta: 838560, scenario_notes: "Talent availability: moderate in Sarawak industrial corridors." },
];

const seedArde: ArdeSignal[] = [
  { id: "arde-observe", role_title: "AI Observability Engineer", taxonomy_category: "Emerging & Specialised", ret_score: 83, velocity_flag: false, signal_sources: ["LinkedIn", "GitHub", "Hugging Face"], status: "Auto-Published", alert_type: "New Role Published" },
  { id: "arde-quantum", role_title: "Quantum ML Engineer", taxonomy_category: "Emerging & Specialised", ret_score: 61, velocity_flag: false, signal_sources: ["arXiv", "USPTO", "NeurIPS"], status: "Monitored", alert_type: null },
  { id: "arde-finops", role_title: "AI FinOps Analyst", taxonomy_category: "Emerging & Specialised", ret_score: 77, velocity_flag: true, signal_sources: ["LinkedIn", "Gartner", "Y Combinator"], status: "Draft", alert_type: "Emerging Role Watch" },
];

const seedAlerts: Alert[] = [
  { id: "alert-role", alert_type: "Role Discovery", priority: "High", title: "New Role Published: AI Observability Engineer", body: "ARDE detected AI Observability Engineer with RET score 83.", target_persona: ["CHRO", "Head of AI", "CTO"], country: null, industry: null, status: "Open" },
  { id: "alert-kpi", alert_type: "Performance", priority: "Medium", title: "KPI Stagnation: Siti Aminah - Adaptability", body: "Adaptability KPI score unchanged for 62 days. Recommend microlearning intervention.", target_persona: ["HR Director", "People Manager"], country: "Malaysia", industry: "Manufacturing", status: "Open" },
  { id: "alert-market", alert_type: "Market", priority: "High", title: "Salary Band Gap: ML Engineer - Malaysia", body: "Market rate for ML Engineer in Malaysia has exceeded internal band by 18%.", target_persona: ["CHRO", "CEO", "CFO"], country: "Malaysia", industry: null, status: "Open" },
];

const seedModules: LearningModule[] = [
  { id: "module-listening", title: "3 Techniques for Active Listening in AI-Augmented Teams", format: "Bite-sized lesson", duration_minutes: 4, kpi_dimension: "human_empathic_handling", skill_tags: ["active listening", "empathy"], is_evergreen: true },
  { id: "module-5why", title: "Root Cause Analysis: A 5-Why Walkthrough", format: "Scenario challenge", duration_minutes: 8, kpi_dimension: "human_problem_solving", skill_tags: ["critical thinking", "root cause"], is_evergreen: true },
  { id: "module-adapt", title: "Adapting to New AI Tools: A 4-Step Framework", format: "Bite-sized lesson", duration_minutes: 5, kpi_dimension: "human_adaptability", skill_tags: ["change adoption", "AI tools"], is_evergreen: false },
];

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("YOUR-PROJECT")) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function fromDb<T>(table: string, fallback: T[], order?: string): Promise<T[]> {
  const client = db();
  if (!client) return fallback;
  let query = client.from(table).select("*");
  if (order) query = query.order(order, { ascending: table === "role_profiles" });
  const { data, error } = await query;
  if (error || !data) return fallback;
  return data as T[];
}

export function money(value: number | null | undefined) {
  if (value == null || Number.isNaN(Number(value))) return "Not set";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value));
}

export function band(score: number) {
  if (score >= 90) return "Exceeding";
  if (score >= 75) return "Meeting";
  if (score >= 55) return "Developing";
  return "Needs Support";
}

export function budgetDelta(input: {
  target_headcount?: number | null;
  current_headcount?: number | null;
  local_salary_benchmark_annual?: number | null;
  local_benefits_overhead_pct?: number | null;
  migration_salary_annual?: number | null;
  migration_relocation_cost?: number | null;
}) {
  const gap = Math.max(0, Number(input.target_headcount ?? 0) - Number(input.current_headcount ?? 0));
  const local = Number(input.local_salary_benchmark_annual ?? 0) * (1 + Number(input.local_benefits_overhead_pct ?? 0) / 100);
  const migration = Number(input.migration_salary_annual ?? 0) + Number(input.migration_relocation_cost ?? 0) / 3;
  return { gap, net_budget_delta: Math.round((migration - local) * gap) };
}

export async function getRoles() {
  return fromDb<RoleProfile>("role_profiles", seedRoles, "title");
}

export async function getRole(id: string) {
  const roles = await getRoles();
  return roles.find((role) => role.id === id || slug(role.title) === id) ?? null;
}

export async function getKpis(roleId?: string) {
  const client = db();
  if (client) {
    let query = client.from("role_kpis").select("*");
    if (roleId) query = query.eq("role_profile_id", roleId);
    const { data, error } = await query;
    if (!error && data) return data as RoleKpi[];
  }
  return roleId ? seedKpis.filter((kpi) => kpi.role_profile_id === roleId) : seedKpis;
}

export async function getEmployees() {
  return fromDb<Employee>("employees", seedEmployees, "full_name");
}

export async function getScorecards() {
  return fromDb<Scorecard>("dual_scorecards", seedScorecards, "period_label");
}

export async function getEmployee(id: string) {
  const employees = await getEmployees();
  const scorecards = await getScorecards();
  const employee = employees.find((item) => item.id === id || slug(item.full_name) === id) ?? null;
  return { employee, scorecard: employee ? scorecards.find((card) => card.employee_id === employee.id) ?? null : null };
}

export async function getPlans() {
  return fromDb<HeadcountPlan>("headcount_plans", seedPlans, "created_at");
}

export async function getPlan(id: string) {
  const plans = await getPlans();
  return plans.find((plan) => plan.id === id || slug(plan.plan_name) === id) ?? null;
}

export async function getArdeSignals() {
  const signals = await fromDb<ArdeSignal>("arde_signals", seedArde, "ret_score");
  return signals.sort((a, b) => Number(b.ret_score ?? 0) - Number(a.ret_score ?? 0));
}

export async function getAlerts() {
  return fromDb<Alert>("alerts", seedAlerts, "created_at");
}

export async function getLearningModules() {
  return fromDb<LearningModule>("microlearning_modules", seedModules, "title");
}

export function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function number(form: FormData, key: string) {
  const value = form.get(key);
  return value === null || value === "" ? null : Number(value);
}

function text(form: FormData, key: string) {
  const value = form.get(key);
  return value === null ? null : String(value);
}

export async function createHeadcountPlan(form: FormData) {
  "use server";
  const input = {
    plan_name: text(form, "plan_name") || "Untitled plan",
    country: text(form, "country") || "Malaysia",
    state_region: text(form, "state_region"),
    industry_vertical: text(form, "industry_vertical"),
    target_headcount: number(form, "target_headcount"),
    current_headcount: number(form, "current_headcount"),
    plan_status: "Draft",
    target_hire_by: text(form, "target_hire_by"),
    local_salary_benchmark_annual: number(form, "local_salary_benchmark_annual"),
    local_benefits_overhead_pct: number(form, "local_benefits_overhead_pct"),
    local_time_to_hire_days: number(form, "local_time_to_hire_days"),
    migration_origin_country: text(form, "migration_origin_country"),
    migration_salary_annual: number(form, "migration_salary_annual"),
    migration_relocation_cost: number(form, "migration_relocation_cost"),
    migration_time_days: number(form, "migration_time_days"),
    scenario_notes: text(form, "scenario_notes"),
  };
  const computed = budgetDelta(input);
  const payload = { ...input, ...computed };
  const client = db();
  if (client) {
    const { data } = await client.from("headcount_plans").insert(payload).select("id").single();
    if (data?.id) {
      await client.from("audit_logs").insert({ actor: "demo_user", action: "compute_budget_delta", entity_type: "headcount_plan", entity_id: data.id, payload: computed as Json, risk_level: "Low" });
    }
  }
  revalidatePath("/headcount-plans");
  revalidatePath("/dashboard/chro");
}

export async function updateScorecard(form: FormData) {
  "use server";
  const id = String(form.get("scorecard_id"));
  const human_adaptability = Number(form.get("human_adaptability"));
  const human_problem_solving = Number(form.get("human_problem_solving"));
  const human_critical_thinking = Number(form.get("human_critical_thinking"));
  const human_empathic_handling = Number(form.get("human_empathic_handling"));
  const human_collaboration = Number(form.get("human_collaboration"));
  const human_excellence_overall = Math.round((human_adaptability + human_problem_solving + human_critical_thinking + human_empathic_handling + human_collaboration) / 5);
  const performance_band = band(human_excellence_overall);
  const payload = { human_adaptability, human_problem_solving, human_critical_thinking, human_empathic_handling, human_collaboration, human_excellence_overall, performance_band };
  const client = db();
  if (client) {
    await client.from("dual_scorecards").update(payload).eq("id", id);
    await client.from("audit_logs").insert({ actor: "demo_user", action: "compute_performance_band", entity_type: "dual_scorecard", entity_id: id, payload: payload as Json, risk_level: "Low" });
  }
  revalidatePath("/employees");
}

export async function resolveAlert(form: FormData) {
  "use server";
  const id = String(form.get("alert_id"));
  const client = db();
  if (client) {
    await client.from("alerts").update({ status: "Actioned", actioned_by: "demo_user", actioned_at: new Date().toISOString() }).eq("id", id);
    await client.from("audit_logs").insert({ actor: "demo_user", action: "resolve_alert", entity_type: "alert", entity_id: id, payload: { status: "Actioned" } as Json, risk_level: "Low" });
  }
  revalidatePath("/alerts");
}

export async function approvePlan(form: FormData) {
  "use server";
  const id = String(form.get("plan_id"));
  const client = db();
  if (client) {
    await client.from("headcount_plans").update({ plan_status: "Approved", approved_by: "demo_user", approved_at: new Date().toISOString() }).eq("id", id);
    await client.from("audit_logs").insert({ actor: "demo_user", action: "approve_headcount_plan", entity_type: "headcount_plan", entity_id: id, payload: { status: "Approved" } as Json, risk_level: "High", approval_required: true, approved_by: "demo_user", approved_at: new Date().toISOString() });
  }
  revalidatePath("/headcount-plans");
}

export async function createArdeSignal(form: FormData) {
  "use server";
  const ret_score = number(form, "ret_score") ?? 0;
  const status = ret_score >= 80 ? "Auto-Published" : ret_score >= 65 ? "Draft" : "Monitored";
  const payload = {
    role_title: text(form, "role_title") || "Untitled role",
    taxonomy_category: text(form, "taxonomy_category") || "Emerging & Specialised",
    ret_score,
    velocity_flag: form.get("velocity_flag") === "on",
    signal_sources: String(text(form, "signal_sources") || "Manual").split(",").map((item) => item.trim()).filter(Boolean),
    status,
    alert_triggered: ret_score >= 65,
    alert_type: ret_score >= 80 ? "New Role Published" : ret_score >= 65 ? "Emerging Role Watch" : null,
  };
  const client = db();
  if (client) await client.from("arde_signals").insert(payload);
  revalidatePath("/arde");
}

export async function createLearningModule(form: FormData) {
  "use server";
  const payload = {
    title: text(form, "title") || "Untitled module",
    format: text(form, "format") || "Bite-sized lesson",
    duration_minutes: number(form, "duration_minutes"),
    kpi_dimension: text(form, "kpi_dimension"),
    skill_tags: String(text(form, "skill_tags") || "").split(",").map((item) => item.trim()).filter(Boolean),
    is_evergreen: form.get("is_evergreen") === "on",
  };
  const client = db();
  if (client) await client.from("microlearning_modules").insert(payload);
  revalidatePath("/learning");
}

export async function createActionPlan(form: FormData) {
  "use server";
  const persona = text(form, "target_persona") || "CHRO";
  const scope = text(form, "plan_scope") || "Workforce capability recovery";
  const payload = {
    target_persona: persona,
    plan_scope: scope,
    day30_actions: ["Resolve open KPI alerts", "Assign three microlearning modules", "Refresh Sarawak headcount plan"],
    day60_actions: ["Approve priority workforce scenarios", "Review ARDE published roles", "Measure KPI velocity"],
    day90_actions: ["Lock budget decisions", "Publish executive workforce readiness report", "Prepare Sprint 6 security review"],
    draft_narrative: `${persona} action plan for ${scope}: stabilise KPI gaps, fund priority headcount, and keep AI-native role discovery reviewed by a human owner.`,
    draft_source: "rule_based_v1",
    draft_confidence: 0.82,
    draft_review_status: "unreviewed",
    approval_status: "Pending Approval",
  };
  const client = db();
  if (client) await client.from("action_plans").insert(payload);
  revalidatePath("/action-plans");
}

