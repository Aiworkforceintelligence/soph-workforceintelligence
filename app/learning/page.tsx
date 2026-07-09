import { createLearningModule, getEmployees, getLearningModules, getScorecards } from "@/lib/aword";

export default async function LearningPage() {
  const [modules, employees, scorecards] = await Promise.all([getLearningModules(), getEmployees(), getScorecards()]);
  return (
    <main className="page">
      <h1 className="section-title">Microlearning Library</h1>
      <p className="subtle mt-2">Modules are tied to KPI dimensions, ready for gap-based assignment.</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className="grid gap-3">
          {modules.map((module) => (
            <article className="card" key={module.id}>
              <span className="badge">{module.kpi_dimension}</span>
              <h2 className="mt-3 text-xl font-semibold">{module.title}</h2>
              <p className="subtle">{module.format} - {module.duration_minutes} min - {module.skill_tags?.join(", ")}</p>
            </article>
          ))}
          <div className="card">
            <h2 className="text-xl font-semibold">Suggested employee assignments</h2>
            {scorecards.map((card) => {
              const employee = employees.find((item) => item.id === card.employee_id);
              const lowest = [
                ["human_adaptability", card.human_adaptability],
                ["human_problem_solving", card.human_problem_solving],
                ["human_empathic_handling", card.human_empathic_handling],
              ].sort((a, b) => Number(a[1]) - Number(b[1]))[0][0];
              return <p className="mt-3" key={card.id}><b>{employee?.full_name}</b>: assign modules for {lowest}</p>;
            })}
          </div>
        </section>
        <form action={createLearningModule} className="card">
          <h2 className="text-xl font-semibold">Create module</h2>
          <div className="mt-4 grid gap-3">
            <label>Title<input name="title" required placeholder="Coaching Adaptability in AI Teams" /></label>
            <label>Format<input name="format" defaultValue="Bite-sized lesson" /></label>
            <label>Duration minutes<input name="duration_minutes" type="number" defaultValue="6" /></label>
            <label>KPI dimension<input name="kpi_dimension" defaultValue="human_adaptability" /></label>
            <label>Skill tags<input name="skill_tags" defaultValue="adaptability, coaching, AI tools" /></label>
            <label className="flex-row items-center gap-2"><input className="w-auto" name="is_evergreen" type="checkbox" /> Evergreen</label>
          </div>
          <button className="button mt-5">Save module</button>
        </form>
      </div>
    </main>
  );
}

