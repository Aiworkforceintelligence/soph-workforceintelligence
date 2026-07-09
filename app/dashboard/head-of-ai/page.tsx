import { getArdeSignals, getRoles, getScorecards } from "@/lib/aword";

export default async function HeadOfAiDashboard() {
  const [roles, arde, scorecards] = await Promise.all([getRoles(), getArdeSignals(), getScorecards()]);
  const coverage = Math.round((roles.filter((role) => role.ai_task_split).length / Math.max(roles.length, 1)) * 100);
  const maturity = Math.round((coverage + scorecards.reduce((sum, card) => sum + Number(card.ai_accuracy_overall ?? 0), 0) / Math.max(scorecards.length, 1)) / 2);
  return (
    <main className="page">
      <h1 className="section-title">Head of AI Capability Maturity</h1>
      <section className="grid-cards mt-6">
        <div className="metric"><b>{maturity}%</b><br /><span className="subtle">capability maturity</span></div>
        <div className="metric"><b>{coverage}%</b><br /><span className="subtle">augmentation coverage</span></div>
        <div className="metric"><b>{arde.length}</b><br /><span className="subtle">frontier roles watched</span></div>
      </section>
      <section className="card mt-6">
        <h2 className="text-xl font-semibold">Frontier role watch</h2>
        <table className="mt-4"><thead><tr><th>Role</th><th>RET</th><th>Status</th></tr></thead><tbody>{arde.map((signal) => <tr key={signal.id}><td>{signal.role_title}</td><td>{signal.ret_score}</td><td>{signal.status}</td></tr>)}</tbody></table>
      </section>
    </main>
  );
}

