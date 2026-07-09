import { getAlerts, getArdeSignals, getEmployees, getPlans, getScorecards, money } from "@/lib/aword";

export default async function ChroDashboard() {
  const [employees, scorecards, plans, alerts, arde] = await Promise.all([getEmployees(), getScorecards(), getPlans(), getAlerts(), getArdeSignals()]);
  const totalGap = plans.reduce((sum, plan) => sum + Number(plan.gap ?? 0), 0);
  const openPlans = plans.filter((plan) => plan.plan_status !== "Closed").length;
  const delta = plans.reduce((sum, plan) => sum + Number(plan.net_budget_delta ?? 0), 0);
  const openAlerts = alerts.filter((alert) => alert.status === "Open");
  return (
    <main className="page">
      <h1 className="section-title">CHRO Workforce Command Centre</h1>
      <p className="subtle mt-2">Real aggregates from plans, scorecards, ARDE signals, and alerts.</p>
      <section className="grid-cards mt-6">
        <div className="metric"><b>{employees.length}</b><br /><span className="subtle">employees tracked</span></div>
        <div className="metric"><b>{totalGap}</b><br /><span className="subtle">headcount gap</span></div>
        <div className="metric"><b>{openPlans}</b><br /><span className="subtle">active plans</span></div>
        <div className="metric"><b>{money(delta)}</b><br /><span className="subtle">net budget delta</span></div>
      </section>
      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="card">
          <h2 className="text-xl font-semibold">Dual scorecard distribution</h2>
          <table className="mt-4"><thead><tr><th>Employee</th><th>AI</th><th>Human</th><th>Band</th></tr></thead><tbody>{scorecards.map((card) => <tr key={card.id}><td>{employees.find((employee) => employee.id === card.employee_id)?.full_name}</td><td>{card.ai_accuracy_overall}</td><td>{card.human_excellence_overall}</td><td>{card.performance_band}</td></tr>)}</tbody></table>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">New role alert log</h2>
          <div className="mt-4 grid gap-3">{arde.map((signal) => <div key={signal.id}><b>{signal.role_title}</b><p className="subtle">RET {signal.ret_score} - {signal.status}</p></div>)}</div>
        </div>
      </section>
      <section className="card mt-6">
        <h2 className="text-xl font-semibold">Open CHRO alerts</h2>
        <div className="mt-4 grid-cards">{openAlerts.map((alert) => <div key={alert.id}><span className="badge">{alert.priority}</span><h3 className="mt-2 font-semibold">{alert.title}</h3><p className="subtle">{alert.body}</p></div>)}</div>
      </section>
    </main>
  );
}

