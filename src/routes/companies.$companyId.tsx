import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { CHART_COLORS, Field, KpiCard, Panel, RagDot, StatusPill, Trend } from "@/components/kit";
import {
  alerts,
  capTableFor,
  companyById,
  entities,
  fmt,
  holdingPeriod,
  monitoring,
  transactions,
  unrealisedOf,
} from "@/data/portfolio";

export const Route = createFileRoute("/companies/$companyId")({
  loader: ({ params }) => {
    const company = companyById(params.companyId);
    if (!company) throw notFound();
    return { name: company.name, sector: company.sector, subsector: company.subsector };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Company unavailable | Portfolio Intelligence Platform" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} | Company View | Portfolio Intelligence Platform`;
    const description = `Investment snapshot, transactions, cap table and monitoring KPIs for ${loaderData.name} (${loaderData.sector} — ${loaderData.subsector}).`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CompanyView,
});

const TABS = [
  "Investment Snapshot",
  "Investment Transactions",
  "Ownership & Cap Table",
  "Portfolio Monitoring",
  "Risks & Alerts",
] as const;

function CompanyView() {
  const { companyId } = Route.useParams();
  const c = companyById(companyId)!;
  const [tab, setTab] = useState<(typeof TABS)[number]>("Investment Snapshot");
  const entity = entities.find((e) => e.id === c.entityId);
  const txns = transactions.filter((t) => t.companyId === c.id);
  const cap = capTableFor(c.id);
  const kpis = monitoring[c.id] ?? [];
  const companyAlerts = alerts.filter((a) => a.companyId === c.id);

  return (
    <div>
      <Link to="/companies" className="mb-3 inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> Portfolio Companies
      </Link>
      <PageHeader
        title={c.name}
        subtitle={c.description}
        right={
          <div className="flex flex-col items-end gap-1.5">
            <StatusPill status={c.status} />
            <span className="text-[11.5px] text-muted-foreground">
              Held via {entity?.name} · {entity?.type} · {entity?.jurisdiction}
            </span>
          </div>
        }
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Ownership %" value={fmt.pctPlain(c.ownership)} sub={`${fmt.pctPlain(c.fullyDiluted)} fully diluted`} />
        <KpiCard label="MOIC" value={fmt.x(c.moic)} tone={c.moic >= 1 ? "positive" : "negative"} sub="Total value / cost" />
        <KpiCard label="IRR" value={fmt.pctPlain(c.irr)} tone={c.irr >= 0 ? "positive" : "negative"} sub="Gross, since entry" />
        <KpiCard label="Holding Period" value={holdingPeriod(c.investmentDate)} sub={`Entry ${fmt.date(c.investmentDate)}`} />
      </div>

      <div className="mb-4 flex flex-wrap gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-3 py-2 text-[12.5px] transition-colors ${
              tab === t
                ? "border-primary font-medium text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Investment Snapshot" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Company Information">
            <Field label="Company Name" value={c.name} />
            <Field label="Sector" value={c.sector} />
            <Field label="Subsector" value={c.subsector} />
            <Field label="Geography" value={c.geography} />
            <Field label="Asset Class" value={c.assetClass} />
            <Field label="Key Management Personnel (Firm)" value={c.kmp} />
          </Panel>
          <Panel title="Investment Details" className="lg:col-span-2">
            <div className="grid gap-x-6 sm:grid-cols-2">
              <Field label="Investment Date" value={fmt.date(c.investmentDate)} />
              <Field label="Investment Round" value={c.round} />
              <Field label="Instrument" value={c.instrument} />
              <Field label="Share Class" value={c.shareClass} />
              <Field label="Total Investment / Cost" value={<span className="num">{fmt.m(c.cost)}</span>} />
              <Field label="Shares / Units" value={<span className="num">{(c.shares * 1000).toLocaleString("en-US")}</span>} />
              <Field label="Entry Valuation (post-money)" value={<span className="num">{fmt.m(c.entryValuation)}</span>} />
              <Field label="Entry ARR / Revenue Multiple" value={c.entryMultiple} />
              <Field label="Current FMV / MTM" value={<span className="num">{fmt.m(c.fmv)}</span>} />
              <Field
                label="Unrealised Gain/Loss"
                value={
                  <span className={`num ${unrealisedOf(c) >= 0 ? "text-positive" : "text-negative"}`}>
                    {fmt.m(unrealisedOf(c))}
                  </span>
                }
              />
              <Field label="Realised Proceeds" value={<span className="num">{fmt.m(c.realised)}</span>} />
              <Field label="Currency" value={`${c.currency} (reported in USD)`} />
              <Field label="Investing Entity" value={`${entity?.name} — ${entity?.type}`} />
              <Field label="Co-investors" value={c.coInvestors.join(", ")} />
            </div>
          </Panel>
        </div>
      )}

      {tab === "Investment Transactions" && (
        <Panel title="Investment Transaction History" subtitle="Primary, follow-on, secondary and realisation events" bodyClassName="">
          <TxnTable rows={txns} />
        </Panel>
      )}

      {tab === "Ownership & Cap Table" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Panel title="Ownership Breakdown" subtitle="Current basis">
            {cap ? (
              <>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={cap.rows} dataKey="current" nameKey="holder" innerRadius={46} outerRadius={80} paddingAngle={1} stroke="var(--surface)">
                        {cap.rows.map((_, i) => (
                          <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 3, fontSize: 12 }}
                        formatter={(v: number) => fmt.pctPlain(v)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-2 space-y-1 border-t border-border pt-3 text-[12px]">
                  {cap.rows.map((r, i) => (
                    <li key={r.holder} className="flex items-center justify-between gap-2">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="size-2 shrink-0 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                        <span className="truncate text-muted-foreground">{r.holder}</span>
                      </span>
                      <span className="num shrink-0">{fmt.pctPlain(r.current)}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-[12.5px] text-muted-foreground">Position fully realised — cap table closed.</p>
            )}
          </Panel>
          <Panel title="Cap Table" subtitle="Current vs fully diluted ownership" bodyClassName="" className="lg:col-span-2">
            {cap ? (
              <div className="overflow-x-auto">
                <table className="w-full text-[12.5px]">
                  <thead className="bg-muted/60">
                    <tr className="border-b border-border text-left">
                      {["Holder", "Holder Type", "Current %", "Fully Diluted %", "Dilution"].map((h) => (
                        <th key={h} className="label-eyebrow px-3 py-2 font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cap.rows.map((r) => (
                      <tr key={r.holder} className="border-b border-border last:border-0">
                        <td className="px-3 py-2 font-medium">{r.holder}</td>
                        <td className="px-3 py-2 text-muted-foreground">{r.type}</td>
                        <td className="num px-3 py-2">{fmt.pctPlain(r.current)}</td>
                        <td className="num px-3 py-2">{fmt.pctPlain(r.diluted)}</td>
                        <td className={`num px-3 py-2 ${r.diluted - r.current >= 0 ? "text-positive" : "text-negative"}`}>
                          {fmt.pct(r.diluted - r.current)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-border p-4">
                  <h3 className="label-eyebrow mb-2">Rights & Protections</h3>
                  <dl className="grid gap-x-6 text-[12.5px] sm:grid-cols-2">
                    {Object.entries(cap.rights).map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3 border-b border-border py-1.5">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ) : (
              <p className="p-4 text-[12.5px] text-muted-foreground">No live cap table — exited October 2023.</p>
            )}
          </Panel>
        </div>
      )}

      {tab === "Portfolio Monitoring" && (
        <div className="grid gap-4 lg:grid-cols-2">
          {(["Financial", "Operational"] as const).map((group) => (
            <Panel key={group} title={`${group} KPIs`} subtitle="Current vs previous period, with budget where tracked" bodyClassName="">
              {kpis.filter((k) => k.group === group).length === 0 ? (
                <p className="p-4 text-[12.5px] text-muted-foreground">No {group.toLowerCase()} MIS reported for this position.</p>
              ) : (
                <KpiTable rows={kpis.filter((k) => k.group === group)} />
              )}
            </Panel>
          ))}
        </div>
      )}

      {tab === "Risks & Alerts" && (
        <Panel title="Risks & Alerts" subtitle="Open items raised by monitoring and the investment team" bodyClassName="">
          {companyAlerts.length === 0 ? (
            <p className="p-4 text-[12.5px] text-muted-foreground">No open alerts for this position.</p>
          ) : (
            <ul>
              {companyAlerts.map((a) => (
                <li key={a.id} className="border-b border-border p-4 last:border-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[13px] font-medium">{a.issue}</span>
                    <span className="flex items-center gap-3 text-[11.5px] text-muted-foreground">
                      <SeverityPill severity={a.severity} />
                      <span className="num">{fmt.date(a.date)}</span>
                      <span>{a.status}</span>
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] text-muted-foreground">
                    <span className="text-foreground">Recommended action: </span>
                    {a.action} · Owner {a.owner}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}
    </div>
  );
}

export function SeverityPill({ severity }: { severity: "High" | "Medium" | "Low" }) {
  const map = {
    High: "border-negative/30 bg-negative/10 text-negative",
    Medium: "border-warning/40 bg-warning/12 text-warning",
    Low: "border-border-strong bg-muted text-muted-foreground",
  } as const;
  return (
    <span className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[11px] font-medium ${map[severity]}`}>
      {severity}
    </span>
  );
}

export function TxnTable({
  rows,
  showCompany,
}: {
  rows: typeof transactions;
  showCompany?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-[12.5px]">
        <thead className="bg-muted/60">
          <tr className="border-b border-border text-left">
            {[
              "Date",
              ...(showCompany ? ["Company"] : []),
              "Transaction Type",
              "Round",
              "Instrument",
              "Investment Amount",
              "Shares / Units",
              "Price per Share",
              "Share Class",
              "Ownership %",
            ].map((h) => (
              <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/40">
              <td className="num whitespace-nowrap px-3 py-2">{fmt.date(t.date)}</td>
              {showCompany && (
                <td className="whitespace-nowrap px-3 py-2 font-medium">
                  <Link to="/companies/$companyId" params={{ companyId: t.companyId }} className="hover:underline">
                    {companyById(t.companyId)?.name}
                  </Link>
                </td>
              )}
              <td className="whitespace-nowrap px-3 py-2">{t.type}</td>
              <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{t.round}</td>
              <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{t.instrument}</td>
              <td className={`num px-3 py-2 ${t.amount < 0 ? "text-positive" : ""}`}>{fmt.m(t.amount)}</td>
              <td className="num px-3 py-2">{(t.shares * 1000).toLocaleString("en-US")}</td>
              <td className="num px-3 py-2">{t.pricePerShare ? `$${t.pricePerShare.toFixed(2)}` : "—"}</td>
              <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{t.shareClass}</td>
              <td className="num px-3 py-2">{fmt.pctPlain(t.ownership)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KpiTable({ rows }: { rows: NonNullable<(typeof monitoring)[string]> }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[12.5px]">
        <thead className="bg-muted/60">
          <tr className="border-b border-border text-left">
            {["KPI", "Current", "Previous", "Budget", "Trend", "Status"].map((h) => (
              <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((k) => (
            <tr key={k.metric} className="border-b border-border last:border-0">
              <td className="px-3 py-2">
                {k.metric} <span className="text-muted-foreground">({k.unit})</span>
              </td>
              <td className="num px-3 py-2 font-medium">{k.current}</td>
              <td className="num px-3 py-2 text-muted-foreground">{k.previous}</td>
              <td className="num px-3 py-2 text-muted-foreground">{k.budget ?? "—"}</td>
              <td className="px-3 py-2">
                <Trend dir={k.trend} />
              </td>
              <td className="px-3 py-2">
                <RagDot rag={k.rag} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
