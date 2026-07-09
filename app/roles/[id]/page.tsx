import { getKpis, getRole, money } from "@/lib/aword";
import { notFound } from "next/navigation";

export default async function RoleDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const role = await getRole(id);
  if (!role) notFound();
  const kpis = await getKpis(role.id);
  return (
    <main className="page">
      <a className="subtle" href="/roles">Roles /</a>
      <h1 className="section-title mt-2">{role.title}</h1>
      <p className="subtle">{role.taxonomy_category} - {role.taxonomy_domain} - {role.seniority_level}</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className="card">
          <h2 className="text-xl font-semibold">Augmented JD</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">{role.responsibilities?.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
        <section className="card">
          <h2 className="text-xl font-semibold">Market and readiness</h2>
          <p className="mt-3">Salary band: {money(role.salary_min_usd)} - {money(role.salary_max_usd)}</p>
          <p>AI readiness: {role.ai_readiness_score_today}% today, {role.ai_readiness_score_12m}% in 12 months</p>
          <p>Countries: {role.country_codes?.join(", ")}</p>
          <p>Industries: {role.industry_tags?.join(", ")}</p>
        </section>
      </div>
      <section className="mt-6 grid-cards">
        {Object.entries(role.ai_task_split || {}).map(([key, items]) => <div className="card" key={key}><h3 className="font-semibold">{key.replaceAll("_", " ")}</h3><p className="subtle mt-2">{items.join(", ")}</p></div>)}
      </section>
      <section className="card mt-6">
        <h2 className="text-xl font-semibold">Dual KPI set</h2>
        <table className="mt-4"><thead><tr><th>Type</th><th>Dimension</th><th>KPI</th><th>Target</th></tr></thead><tbody>{kpis.map((kpi) => <tr key={kpi.id}><td>{kpi.kpi_type}</td><td>{kpi.dimension}</td><td>{kpi.name}</td><td>{kpi.target_benchmark}</td></tr>)}</tbody></table>
      </section>
    </main>
  );
}

