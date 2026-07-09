import { getAlerts, getPlans, getRoles, money } from "@/lib/aword";

export default async function CeoDashboard() {
  const [roles, plans, alerts] = await Promise.all([getRoles(), getPlans(), getAlerts()]);
  const readiness = Math.round(roles.reduce((sum, role) => sum + Number(role.ai_readiness_score_today ?? 0), 0) / Math.max(roles.length, 1));
  const gap = plans.reduce((sum, plan) => sum + Number(plan.gap ?? 0), 0);
  const delta = plans.reduce((sum, plan) => sum + Number(plan.net_budget_delta ?? 0), 0);
  return (
    <main className="page">
      <h1 className="section-title">CEO AI Readiness Dashboard</h1>
      <section className="grid-cards mt-6">
        <div className="metric"><b>{readiness}%</b><br /><span className="subtle">AI Readiness Index</span></div>
        <div className="metric"><b>{roles.length}</b><br /><span className="subtle">role coverage</span></div>
        <div className="metric"><b>{gap}</b><br /><span className="subtle">AI talent gap</span></div>
        <div className="metric"><b>{money(delta)}</b><br /><span className="subtle">budget movement</span></div>
      </section>
      <section className="card mt-6"><h2 className="text-xl font-semibold">Market salary alerts</h2><table className="mt-4"><tbody>{alerts.filter((alert) => alert.alert_type === "Market").map((alert) => <tr key={alert.id}><td>{alert.priority}</td><td>{alert.title}</td><td>{alert.status}</td></tr>)}</tbody></table></section>
    </main>
  );
}

