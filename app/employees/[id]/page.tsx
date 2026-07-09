import { getEmployee, updateScorecard } from "@/lib/aword";
import { notFound } from "next/navigation";

export default async function EmployeeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { employee, scorecard } = await getEmployee(id);
  if (!employee) notFound();
  return (
    <main className="page">
      <a className="subtle" href="/employees">Employees /</a>
      <h1 className="section-title mt-2">{employee.full_name}</h1>
      <p className="subtle">{employee.persona} - {employee.country} / {employee.state_region} - {employee.industry}</p>
      {!scorecard ? (
        <section className="card mt-6">No scorecard yet. Add score support is ready for Sprint 6 org isolation.</section>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="card">
            <h2 className="text-xl font-semibold">Current band</h2>
            <p className="mt-4 text-4xl font-bold">{scorecard.performance_band}</p>
            <p className="subtle mt-2">{scorecard.recommended_focus}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="metric"><b>{scorecard.ai_accuracy_overall}</b><br /><span className="subtle">AI overall</span></div>
              <div className="metric"><b>{scorecard.human_excellence_overall}</b><br /><span className="subtle">Human overall</span></div>
            </div>
          </section>
          <form action={updateScorecard} className="card">
            <input type="hidden" name="scorecard_id" value={scorecard.id} />
            <h2 className="text-xl font-semibold">Edit human excellence dimensions</h2>
            <div className="form-grid mt-4">
              <label>Critical thinking<input name="human_critical_thinking" type="number" min="0" max="100" defaultValue={scorecard.human_critical_thinking ?? 0} /></label>
              <label>Problem solving<input name="human_problem_solving" type="number" min="0" max="100" defaultValue={scorecard.human_problem_solving ?? 0} /></label>
              <label>Empathic handling<input name="human_empathic_handling" type="number" min="0" max="100" defaultValue={scorecard.human_empathic_handling ?? 0} /></label>
              <label>Adaptability<input name="human_adaptability" type="number" min="0" max="100" defaultValue={scorecard.human_adaptability ?? 0} /></label>
              <label>Collaboration<input name="human_collaboration" type="number" min="0" max="100" defaultValue={scorecard.human_collaboration ?? 0} /></label>
            </div>
            <button className="button mt-5">Save and recompute band</button>
          </form>
        </div>
      )}
    </main>
  );
}

