import { getEmployees, getScorecards, slug } from "@/lib/aword";

export default async function EmployeesPage() {
  const [employees, scorecards] = await Promise.all([getEmployees(), getScorecards()]);
  return (
    <main className="page">
      <h1 className="section-title">Employee Scorecards</h1>
      <p className="subtle mt-2">Dual KPI summaries are editable and recompute performance bands server-side.</p>
      <section className="grid-cards mt-6">
        {employees.map((employee) => {
          const scorecard = scorecards.find((item) => item.employee_id === employee.id);
          return (
            <a className="card" href={`/employees/${employee.id || slug(employee.full_name)}`} key={employee.id}>
              <span className="badge">{scorecard?.performance_band || "No scorecard yet"}</span>
              <h2 className="mt-3 text-xl font-semibold">{employee.full_name}</h2>
              <p className="subtle">{employee.persona} - {employee.department} - {employee.state_region}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="metric"><b>{scorecard?.ai_accuracy_overall ?? "-"}</b><br /><span className="subtle">AI accuracy</span></div>
                <div className="metric"><b>{scorecard?.human_excellence_overall ?? "-"}</b><br /><span className="subtle">Human excellence</span></div>
              </div>
            </a>
          );
        })}
      </section>
    </main>
  );
}

