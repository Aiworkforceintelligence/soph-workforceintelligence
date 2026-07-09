import { getRoles, slug } from "@/lib/aword";

export default async function RolesPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const roles = await getRoles();
  const filtered = roles.filter((role) =>
    (!params.category || role.taxonomy_category === params.category) &&
    (!params.country || role.country_codes?.includes(params.country)) &&
    (!params.status || role.status === params.status)
  );
  return (
    <main className="page">
      <h1 className="section-title">Role Library</h1>
      <form className="mt-5 form-grid">
        <label>Category<select name="category" defaultValue={params.category || ""}><option value="">All</option><option>Management</option><option>Business</option><option>Technical</option><option>Emerging & Specialised</option></select></label>
        <label>Country<select name="country" defaultValue={params.country || ""}><option value="">All</option><option>MY</option><option>US</option><option>SG</option><option>UK</option><option>AU</option></select></label>
        <label>Status<select name="status" defaultValue={params.status || ""}><option value="">All</option><option>Emerging</option><option>Established</option><option>Canonical</option></select></label>
        <button className="button self-end">Filter</button>
      </form>
      <section className="grid-cards mt-6">
        {filtered.map((role) => (
          <a className="card" key={role.id} href={`/roles/${role.id || slug(role.title)}`}>
            <span className="badge">{role.taxonomy_category}</span>
            <h2 className="mt-3 text-xl font-semibold">{role.title}</h2>
            <p className="subtle">{role.taxonomy_domain} - {role.status} - {role.version}</p>
            <p className="mt-3">AI readiness: {role.ai_readiness_score_today}% today, {role.ai_readiness_score_12m}% in 12 months</p>
          </a>
        ))}
      </section>
    </main>
  );
}

