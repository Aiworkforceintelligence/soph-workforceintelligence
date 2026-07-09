import { approvePlan, getPlan, money } from "@/lib/aword";
import { notFound } from "next/navigation";

export default async function PlanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = await getPlan(id);
  if (!plan) notFound();
  const gap = Number(plan.gap ?? 0);
  const localAnnual = Number(plan.local_salary_benchmark_annual ?? 0) * (1 + Number(plan.local_benefits_overhead_pct ?? 0) / 100);
  const migrationAnnual = Number(plan.migration_salary_annual ?? 0) + Number(plan.migration_relocation_cost ?? 0) / 3;
  return (
    <main className="page">
      <a className="subtle" href="/headcount-plans">Headcount plans /</a>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="section-title">{plan.plan_name}</h1>
          <p className="subtle">{plan.country} / {plan.state_region} - {plan.industry_vertical}</p>
        </div>
        <span className="badge">{plan.plan_status}</span>
      </div>
      <section className="grid-cards mt-6">
        <div className="metric"><b>{plan.target_headcount}</b><br /><span className="subtle">target headcount</span></div>
        <div className="metric"><b>{plan.current_headcount}</b><br /><span className="subtle">current headcount</span></div>
        <div className="metric"><b>{gap}</b><br /><span className="subtle">computed gap</span></div>
        <div className="metric"><b>{money(plan.net_budget_delta)}</b><br /><span className="subtle">net budget delta</span></div>
      </section>
      <section className="card mt-6">
        <h2 className="text-xl font-semibold">Cost comparison</h2>
        <table className="mt-4">
          <thead><tr><th>Scenario</th><th>Annual unit cost</th><th>Gap heads</th><th>Total annual cost</th><th>Time</th></tr></thead>
          <tbody>
            <tr><td>Local hire</td><td>{money(localAnnual)}</td><td>{gap}</td><td>{money(localAnnual * gap)}</td><td>{plan.local_time_to_hire_days} days</td></tr>
            <tr><td>US migration</td><td>{money(migrationAnnual)}</td><td>{gap}</td><td>{money(migrationAnnual * gap)}</td><td>{plan.migration_time_days} days</td></tr>
          </tbody>
        </table>
      </section>
      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Malaysia drill-down</h2>
          <p className="mt-3"><b>{plan.state_region}</b> - {plan.industry_vertical}</p>
          <p className="subtle mt-2">Sarawak and Sabah selector support is live on the plan form. Talent availability note: moderate local availability, with migration useful for specialist ML platform roles.</p>
        </div>
        <form action={approvePlan} className="card">
          <input type="hidden" name="plan_id" value={plan.id} />
          <h2 className="text-xl font-semibold">Status action</h2>
          <p className="subtle mt-2">Approving writes the status and an audit log row when Supabase env is available.</p>
          <button className="button mt-5">Approve plan</button>
        </form>
      </section>
    </main>
  );
}

