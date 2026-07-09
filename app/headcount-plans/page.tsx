import { createHeadcountPlan, getPlans, money, slug } from "@/lib/aword";

export default async function HeadcountPlansPage() {
  const plans = await getPlans();
  return (
    <main className="page">
      <h1 className="section-title">Headcount Planning Engine</h1>
      <p className="subtle mt-2">Create local-vs-migration scenarios. Gap and net budget delta are computed server-side on save.</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <section className="grid gap-3">
          {plans.length === 0 ? <div className="card">No plans yet. Create your first plan.</div> : null}
          {plans.map((plan) => (
            <a className="card" key={plan.id} href={`/headcount-plans/${plan.id || slug(plan.plan_name)}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="badge">{plan.plan_status}</span>
                  <h2 className="mt-3 text-xl font-semibold">{plan.plan_name}</h2>
                  <p className="subtle">{plan.country} / {plan.state_region} - {plan.industry_vertical}</p>
                </div>
                <div className="text-right"><b>{money(plan.net_budget_delta)}</b><p className="subtle">net budget delta</p></div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="metric"><b>{plan.target_headcount}</b><br /><span className="subtle">target</span></div>
                <div className="metric"><b>{plan.current_headcount}</b><br /><span className="subtle">current</span></div>
                <div className="metric"><b>{plan.gap}</b><br /><span className="subtle">gap</span></div>
              </div>
            </a>
          ))}
        </section>
        <form action={createHeadcountPlan} className="card">
          <h2 className="text-xl font-semibold">New Plan</h2>
          <div className="form-grid mt-4">
            <label>Plan name<input name="plan_name" required defaultValue="Sarawak Manufacturing AI Ops Plan" /></label>
            <label>Country<input name="country" required defaultValue="Malaysia" /></label>
            <label>State/region<select name="state_region" defaultValue="Sarawak"><option>Sarawak</option><option>Sabah</option><option>Kuala Lumpur</option><option>Penang</option></select></label>
            <label>Industry<select name="industry_vertical" defaultValue="Manufacturing"><option>Manufacturing</option><option>Technology</option><option>Financial Services</option><option>Healthcare</option></select></label>
            <label>Target headcount<input name="target_headcount" type="number" min="1" defaultValue="8" /></label>
            <label>Current headcount<input name="current_headcount" type="number" min="0" defaultValue="2" /></label>
            <label>Local salary annual<input name="local_salary_benchmark_annual" type="number" defaultValue="42000" /></label>
            <label>Benefits overhead %<input name="local_benefits_overhead_pct" type="number" defaultValue="22" /></label>
            <label>Local time to hire days<input name="local_time_to_hire_days" type="number" defaultValue="75" /></label>
            <label>Migration origin<input name="migration_origin_country" defaultValue="United States" /></label>
            <label>Migration salary annual<input name="migration_salary_annual" type="number" defaultValue="185000" /></label>
            <label>Relocation cost<input name="migration_relocation_cost" type="number" defaultValue="18000" /></label>
            <label>Migration time days<input name="migration_time_days" type="number" defaultValue="90" /></label>
            <label>Target hire by<input name="target_hire_by" type="date" defaultValue="2027-03-31" /></label>
          </div>
          <label className="mt-3">Scenario notes<textarea name="scenario_notes" defaultValue="Sarawak manufacturing vertical. Talent availability: moderate; stronger in Kuching, Bintulu, and Miri corridors." /></label>
          <button className="button mt-5">Create plan and compute delta</button>
        </form>
      </div>
    </main>
  );
}

