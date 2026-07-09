import { getAlerts, resolveAlert } from "@/lib/aword";

export default async function AlertsPage() {
  const alerts = await getAlerts();
  return (
    <main className="page">
      <h1 className="section-title">Alert Centre</h1>
      <p className="subtle mt-2">Priority alerts can be resolved or reviewed without auth in v1.</p>
      <section className="mt-6 grid gap-3">
        {alerts.length === 0 ? <div className="card">All clear.</div> : null}
        {alerts.map((alert) => (
          <article className="card" key={alert.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="badge">{alert.priority} - {alert.status}</span>
                <h2 className="mt-3 text-xl font-semibold">{alert.title}</h2>
                <p className="subtle mt-2">{alert.body}</p>
                <p className="subtle mt-2">{alert.alert_type} - {alert.country || "Global"} - {alert.industry || "All industries"}</p>
              </div>
              {alert.status === "Open" ? (
                <form action={resolveAlert}>
                  <input type="hidden" name="alert_id" value={alert.id} />
                  <button className="button">Resolve</button>
                </form>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

