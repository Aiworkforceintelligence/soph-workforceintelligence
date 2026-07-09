import { approveActionPlan, createActionPlan, getActionPlans, getAlerts } from "@/lib/aword";

export default async function ActionPlansPage() {
  const [plans, alerts] = await Promise.all([getActionPlans(), getAlerts()]);
  return (
    <main className="page">
      <h1 className="section-title">30/60/90-Day Action Plans</h1>
      <p className="subtle mt-2">Drafts use deterministic v1 rules and stay marked unreviewed until a human approves.</p>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className="grid gap-3">
          {plans.map((plan) => (
            <article className="card" key={plan.id}>
              <span className="badge">{plan.approval_status} - {plan.draft_review_status}</span>
              <h2 className="mt-3 text-xl font-semibold">{plan.target_persona}: {plan.plan_scope}</h2>
              <p className="subtle mt-2">{plan.draft_narrative}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div><b>30 days</b><ul className="mt-2 list-disc pl-5">{plan.day30_actions?.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><b>60 days</b><ul className="mt-2 list-disc pl-5">{plan.day60_actions?.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div><b>90 days</b><ul className="mt-2 list-disc pl-5">{plan.day90_actions?.map((item) => <li key={item}>{item}</li>)}</ul></div>
              </div>
              {plan.approval_status !== "Approved" ? <form action={approveActionPlan} className="mt-4"><input type="hidden" name="action_plan_id" value={plan.id} /><button className="button">Approve plan</button></form> : null}
            </article>
          ))}
        </section>
        <form action={createActionPlan} className="card">
          <h2 className="text-xl font-semibold">Draft action plan</h2>
          <p className="subtle mt-2">Open alerts available: {alerts.filter((alert) => alert.status === "Open").length}</p>
          <div className="mt-4 grid gap-3">
            <label>Persona<select name="target_persona" defaultValue="CHRO"><option>CEO</option><option>CTO</option><option>CHRO</option><option>Head of AI</option></select></label>
            <label>Scope<input name="plan_scope" defaultValue="Open alerts and lowest KPI dimensions" /></label>
          </div>
          <button className="button mt-5">Generate draft</button>
        </form>
      </div>
    </main>
  );
}

