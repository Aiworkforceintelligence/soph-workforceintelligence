import { getArdeSignals, getEmployees, getRoles, getScorecards } from "@/lib/aword";

export default async function CtoDashboard() {
  const [roles, arde, employees, scorecards] = await Promise.all([getRoles(), getArdeSignals(), getEmployees(), getScorecards()]);
  const technicalRoles = roles.filter((role) => role.taxonomy_category === "Technical").length;
  return (
    <main className="page">
      <h1 className="section-title">CTO Technical AI Capability</h1>
      <section className="grid-cards mt-6">
        <div className="metric"><b>{technicalRoles}</b><br /><span className="subtle">technical role profiles</span></div>
        <div className="metric"><b>{arde.filter((signal) => signal.status === "Auto-Published").length}</b><br /><span className="subtle">published ARDE roles</span></div>
        <div className="metric"><b>{Math.round(scorecards.reduce((sum, card) => sum + Number(card.ai_accuracy_overall ?? 0), 0) / Math.max(scorecards.length, 1))}</b><br /><span className="subtle">AI KPI average</span></div>
      </section>
      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="card"><h2 className="text-xl font-semibold">Role emergence feed</h2>{arde.map((signal) => <p className="mt-3" key={signal.id}><b>{signal.role_title}</b> <span className="subtle">RET {signal.ret_score}</span></p>)}</div>
        <div className="card"><h2 className="text-xl font-semibold">Engineering KPI distribution</h2>{scorecards.map((card) => <p className="mt-3" key={card.id}>{employees.find((employee) => employee.id === card.employee_id)?.full_name}: {card.ai_accuracy_overall}</p>)}</div>
      </section>
    </main>
  );
}

