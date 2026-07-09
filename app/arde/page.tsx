import { createArdeSignal, getArdeSignals } from "@/lib/aword";

export default async function ArdePage() {
  const signals = await getArdeSignals();
  return (
    <main className="page">
      <h1 className="section-title">ARDE Signal Feed</h1>
      <p className="subtle mt-2">Role emergence records sorted by RET score with deterministic publication status.</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className="grid gap-3">
          {signals.map((signal) => (
            <article className="card" key={signal.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><h2 className="text-xl font-semibold">{signal.role_title}</h2><p className="subtle">{signal.taxonomy_category} - {signal.signal_sources?.join(", ")}</p></div>
                <span className="badge">RET {signal.ret_score} - {signal.status}</span>
              </div>
              {signal.velocity_flag ? <p className="mt-3 font-semibold text-[#8a4d00]">Velocity flag active</p> : null}
            </article>
          ))}
        </section>
        <form action={createArdeSignal} className="card">
          <h2 className="text-xl font-semibold">Create ARDE signal</h2>
          <div className="mt-4 grid gap-3">
            <label>Role title<input name="role_title" required placeholder="AI Reliability Engineer" /></label>
            <label>Category<select name="taxonomy_category" defaultValue="Emerging & Specialised"><option>Management</option><option>Business</option><option>Technical</option><option>Emerging & Specialised</option></select></label>
            <label>RET score<input name="ret_score" type="number" min="0" max="100" defaultValue="80" /></label>
            <label>Sources<input name="signal_sources" defaultValue="LinkedIn, GitHub" /></label>
            <label className="flex-row items-center gap-2"><input className="w-auto" name="velocity_flag" type="checkbox" /> Velocity flag</label>
          </div>
          <button className="button mt-5">Save signal</button>
        </form>
      </div>
    </main>
  );
}

