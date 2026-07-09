import { getAlerts, getArdeSignals, getEmployees, getPlans, getRoles, money } from "@/lib/aword";

export default async function Home() {
  const [roles, employees, plans, alerts, arde] = await Promise.all([getRoles(), getEmployees(), getPlans(), getAlerts(), getArdeSignals()]);
  const openAlerts = alerts.filter((alert) => alert.status === "Open").length;
  const totalGap = plans.reduce((sum, plan) => sum + Number(plan.gap ?? 0), 0);
  const netDelta = plans.reduce((sum, plan) => sum + Number(plan.net_budget_delta ?? 0), 0);

  return (
    <main className="page">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <p className="badge mb-3">Anonymous v1 demo</p>
          <h1 className="section-title">Workforce intelligence command centre</h1>
          <p className="subtle mt-3 max-w-2xl">
            Create AI-native role plans, edit dual scorecards, watch ARDE signals, and push workforce actions without a login wall.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a className="button" href="/headcount-plans">Create Headcount Plan</a>
            <a className="button secondary" href="/dashboard/chro">Open CHRO Dashboard</a>
          </div>
        </section>
        <section className="grid gap-3 sm:grid-cols-2">
          <div className="metric"><b>{roles.length}</b><br /><span className="subtle">role profiles</span></div>
          <div className="metric"><b>{employees.length}</b><br /><span className="subtle">scorecard employees</span></div>
          <div className="metric"><b>{totalGap}</b><br /><span className="subtle">open headcount gap</span></div>
          <div className="metric"><b>{money(netDelta)}</b><br /><span className="subtle">net migration delta</span></div>
        </section>
      </div>
      <section className="grid-cards">
        <a className="card" href="/roles"><span className="badge">Sprint 1</span><h2 className="mt-3 text-xl font-semibold">Role library</h2><p className="subtle">Filter taxonomy and open augmented JDs with KPI sets.</p></a>
        <a className="card" href="/employees"><span className="badge">Sprint 2</span><h2 className="mt-3 text-xl font-semibold">Dual scorecards</h2><p className="subtle">Edit Siti Aminah's adaptability score and recompute the band.</p></a>
        <a className="card" href="/headcount-plans"><span className="badge">Sprint 3</span><h2 className="mt-3 text-xl font-semibold">Planning engine</h2><p className="subtle">Create Malaysia/Sarawak manufacturing plans with server-side budget delta.</p></a>
        <a className="card" href="/alerts"><span className="badge">{openAlerts} open</span><h2 className="mt-3 text-xl font-semibold">Alert centre</h2><p className="subtle">Resolve KPI and role discovery alerts with audit logging.</p></a>
      </section>
      <section className="mt-8 card">
        <h2 className="text-xl font-semibold">ARDE frontier watch</h2>
        <div className="mt-4 grid-cards">
          {arde.slice(0, 3).map((signal) => <div key={signal.id}><b>{signal.role_title}</b><p className="subtle">RET {signal.ret_score} - {signal.status}</p></div>)}
        </div>
      </section>
    </main>
  );
}
