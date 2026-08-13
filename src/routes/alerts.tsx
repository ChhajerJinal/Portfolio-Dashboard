import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { KpiCard, Panel, SelectFilter } from "@/components/kit";
import { SeverityPill } from "./companies.$companyId";
import { alerts, companies, companyById, fmt } from "@/data/portfolio";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts & Actions | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Portfolio alert register: KPI deterioration, runway risk, follow-on decisions, overdue MIS, milestones and valuation refreshes with recommended actions.",
      },
      { property: "og:title", content: "Alerts & Actions | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "Alert register with severity, owner, recommended action and workflow status.",
      },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [f, setF] = useState({ company: "All", severity: "All", status: "All", category: "All" });

  const rows = useMemo(
    () =>
      alerts
        .filter(
          (a) =>
            (f.company === "All" || companyById(a.companyId)?.name === f.company) &&
            (f.severity === "All" || a.severity === f.severity) &&
            (f.status === "All" || a.status === f.status) &&
            (f.category === "All" || a.category === f.category),
        )
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [f],
  );

  const open = alerts.filter((a) => a.status !== "Closed");

  return (
    <div>
      <PageHeader
        title="Alerts & Actions"
        subtitle="Exceptions raised by portfolio monitoring, governance calendars and the investment team, each with an owner and recommended action."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
        <KpiCard label="Open Alerts" value={String(open.length)} sub={`${alerts.length} raised in total`} />
        <KpiCard label="High Severity" value={String(open.filter((a) => a.severity === "High").length)} tone="negative" sub="Immediate action" />
        <KpiCard label="Medium Severity" value={String(open.filter((a) => a.severity === "Medium").length)} sub="This reporting cycle" />
        <KpiCard label="Escalated" value={String(alerts.filter((a) => a.status === "Escalated").length)} sub="Referred to IC" />
        <KpiCard label="Companies Affected" value={String(new Set(open.map((a) => a.companyId)).size)} sub={`of ${companies.length} positions`} />
      </div>

      <Panel className="mb-4" bodyClassName="flex flex-wrap gap-3 p-4">
        <SelectFilter label="Company" value={f.company} options={companies.map((c) => c.name)} onChange={(v) => setF({ ...f, company: v })} />
        <SelectFilter label="Alert Type" value={f.category} options={Array.from(new Set(alerts.map((a) => a.category))).sort()} onChange={(v) => setF({ ...f, category: v })} />
        <SelectFilter label="Severity" value={f.severity} options={["High", "Medium", "Low"]} onChange={(v) => setF({ ...f, severity: v })} />
        <SelectFilter label="Status" value={f.status} options={["Open", "In Progress", "Escalated", "Closed"]} onChange={(v) => setF({ ...f, status: v })} />
      </Panel>

      <Panel title="Alert Register" subtitle={`${rows.length} alerts in view`} bodyClassName="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px] text-[12.5px]">
            <thead className="bg-muted/60">
              <tr className="border-b border-border text-left">
                {["Date", "Company", "Alert Type", "Issue", "Severity", "Recommended Action", "Owner", "Status"].map((h) => (
                  <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 align-top hover:bg-muted/40">
                  <td className="num whitespace-nowrap px-3 py-2.5">{fmt.date(a.date)}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-medium">
                    <Link to="/companies/$companyId" params={{ companyId: a.companyId }} className="hover:underline">
                      {companyById(a.companyId)?.name}
                    </Link>
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground">{a.category}</td>
                  <td className="px-3 py-2.5">{a.issue}</td>
                  <td className="px-3 py-2.5"><SeverityPill severity={a.severity} /></td>
                  <td className="max-w-[26rem] px-3 py-2.5 text-muted-foreground">{a.action}</td>
                  <td className="whitespace-nowrap px-3 py-2.5">{a.owner}</td>
                  <td className="whitespace-nowrap px-3 py-2.5">
                    <span
                      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[11px] ${
                        a.status === "Escalated"
                          ? "border-negative/30 bg-negative/10 text-negative"
                          : a.status === "In Progress"
                            ? "border-warning/40 bg-warning/12 text-warning"
                            : a.status === "Closed"
                              ? "border-border-strong bg-muted text-muted-foreground"
                              : "border-border-strong bg-surface"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
