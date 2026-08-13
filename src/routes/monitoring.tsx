import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { KpiCard, Panel, RagDot, SelectFilter, StatusPill, Trend } from "@/components/kit";
import { KpiTable } from "./companies.$companyId";
import { companies, companyById, fmt, monitoring } from "@/data/portfolio";
import type { RagStatus } from "@/data/portfolio";

export const Route = createFileRoute("/monitoring")({
  head: () => ({
    meta: [
      { title: "Portfolio Monitoring / MIS | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Monitoring dashboard tracking revenue, EBITDA, burn, runway, unit economics and operating KPIs against budget with RAG status per portfolio company.",
      },
      { property: "og:title", content: "Portfolio Monitoring / MIS | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "Revenue, EBITDA, runway and operating KPIs versus budget with RAG status per company.",
      },
    ],
  }),
  component: MonitoringPage,
});

const monitored = Object.keys(monitoring);

function rollup(id: string) {
  const kpis = monitoring[id] ?? [];
  const counts: Record<RagStatus, number> = { green: 0, amber: 0, red: 0 };
  kpis.forEach((k) => counts[k.rag]++);
  const overall: RagStatus = counts.red >= 3 ? "red" : counts.red > 0 || counts.amber >= 3 ? "amber" : "green";
  return { kpis, counts, overall };
}

function MonitoringPage() {
  const [selected, setSelected] = useState(monitored[0]!);
  const [group, setGroup] = useState<"All" | "Financial" | "Operational">("All");

  const rows = monitored.map((id) => ({ company: companyById(id)!, ...rollup(id) }));
  const active = rollup(selected);
  const company = companyById(selected)!;
  const visible = active.kpis.filter((k) => group === "All" || k.group === group);

  const totals = rows.reduce(
    (s, r) => {
      s[r.overall]++;
      return s;
    },
    { green: 0, amber: 0, red: 0 } as Record<RagStatus, number>,
  );

  const headline = (id: string, metric: string[]) =>
    (monitoring[id] ?? []).find((k) => metric.some((m) => k.metric.startsWith(m)));

  return (
    <div>
      <PageHeader
        title="Portfolio Monitoring / MIS"
        subtitle="Monthly management information consolidated across reporting companies. RAG status is derived from performance against budget and prior period."
        right={
          <div className="flex gap-4 text-[12px]">
            <RagDot rag="green" label={`${totals.green} On Track`} />
            <RagDot rag="amber" label={`${totals.amber} Needs Attention`} />
            <RagDot rag="red" label={`${totals.red} Concern`} />
          </div>
        }
      />

      <Panel title="Company Scorecard" subtitle="Headline financial performance and overall monitoring status" className="mb-4" bodyClassName="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-[12.5px]">
            <thead className="bg-muted/60">
              <tr className="border-b border-border text-left">
                {["Company", "Sector", "Revenue / ARR", "Growth", "EBITDA", "Cash", "Runway (mo)", "vs Budget", "KPIs G/A/R", "Monitoring Status", "Investment Status"].map((h) => (
                  <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ company: co, counts, overall }) => {
                const rev = headline(co.id, ["Revenue (LTM)", "ARR"]);
                const growth = headline(co.id, ["Revenue Growth"]);
                const ebitda = headline(co.id, ["EBITDA ", "EBITDA"]);
                const cash = headline(co.id, ["Cash"]);
                const runway = headline(co.id, ["Cash Runway"]);
                const vsBudget =
                  rev && rev.budget != null ? (Number(rev.current) / Number(rev.budget) - 1) * 100 : null;
                return (
                  <tr
                    key={co.id}
                    onClick={() => setSelected(co.id)}
                    className={`cursor-pointer border-b border-border last:border-0 hover:bg-accent/40 ${selected === co.id ? "bg-accent/30" : ""}`}
                  >
                    <td className="whitespace-nowrap px-3 py-2 font-medium">
                      <Link to="/companies/$companyId" params={{ companyId: co.id }} className="hover:underline">
                        {co.name}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{co.sector}</td>
                    <td className="num px-3 py-2">{rev ? `$${rev.current}M` : "—"}</td>
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-1.5">
                        <span className={`num ${Number(growth?.current ?? 0) >= 0 ? "text-positive" : "text-negative"}`}>
                          {growth ? `${growth.current}%` : "—"}
                        </span>
                        {growth && <Trend dir={growth.trend} />}
                      </span>
                    </td>
                    <td className="num px-3 py-2">{ebitda ? `$${ebitda.current}M` : "—"}</td>
                    <td className="num px-3 py-2">{cash ? `$${cash.current}M` : "—"}</td>
                    <td className="num px-3 py-2">{runway ? runway.current : "—"}</td>
                    <td className={`num px-3 py-2 ${vsBudget == null ? "" : vsBudget >= 0 ? "text-positive" : "text-negative"}`}>
                      {vsBudget == null ? "—" : fmt.pct(vsBudget)}
                    </td>
                    <td className="num px-3 py-2 text-muted-foreground">
                      {counts.green}/{counts.amber}/{counts.red}
                    </td>
                    <td className="px-3 py-2"><RagDot rag={overall} /></td>
                    <td className="px-3 py-2"><StatusPill status={co.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Selected Company" value={company.name} sub={`${company.sector} · ${company.geography}`} />
        <KpiCard label="KPIs On Track" value={String(active.counts.green)} tone="positive" sub={`of ${active.kpis.length} reported`} />
        <KpiCard label="Needs Attention" value={String(active.counts.amber)} sub="Amber KPIs" />
        <KpiCard label="Concerns" value={String(active.counts.red)} tone={active.counts.red ? "negative" : "neutral"} sub="Red KPIs" />
      </div>

      <Panel
        title={`MIS Detail — ${company.name}`}
        subtitle="Current period vs previous period vs budget"
        right={
          <div className="flex items-end gap-3">
            <SelectFilter
              label="Company"
              value={company.name}
              options={monitored.map((id) => companyById(id)!.name)}
              onChange={(v) => {
                const match = monitored.find((id) => companyById(id)!.name === v);
                if (match) setSelected(match);
              }}
            />
            <label className="flex flex-col gap-1">
              <span className="label-eyebrow">KPI Group</span>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value as typeof group)}
                className="h-8 rounded-sm border border-input bg-surface px-2 text-[12.5px] outline-none focus:border-ring"
              >
                <option value="All">All</option>
                <option value="Financial">Financial</option>
                <option value="Operational">Operational</option>
              </select>
            </label>
          </div>
        }
        bodyClassName=""
      >
        <KpiTable rows={visible} />
      </Panel>

      <p className="mt-3 text-[11.5px] text-muted-foreground">
        RAG convention — <span className="text-positive">Green: on track</span> ·{" "}
        <span className="text-warning">Amber: needs attention</span> ·{" "}
        <span className="text-negative">Red: concern</span>. Positions without a live MIS obligation are excluded:{" "}
        {companies.length - monitored.length}.
      </p>
    </div>
  );
}
