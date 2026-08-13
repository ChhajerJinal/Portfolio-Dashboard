import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { CHART_COLORS, KpiCard, Panel, SelectFilter } from "@/components/kit";
import { capTables, companies, companyById, fmt, groupSum } from "@/data/portfolio";

export const Route = createFileRoute("/ownership")({
  head: () => ({
    meta: [
      { title: "Ownership & Cap Table | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Cap-table view across the portfolio: founder, firm, other investor and ESOP ownership on a current and fully diluted basis, with governance rights.",
      },
      { property: "og:title", content: "Ownership & Cap Table | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "Founder, firm, investor and ESOP ownership with governance and protective rights.",
      },
    ],
  }),
  component: OwnershipPage,
});

const holders = ["Founder", "Firm", "Investor", "ESOP"] as const;

function OwnershipPage() {
  const [selected, setSelected] = useState(capTables[0]!.companyId);
  const cap = capTables.find((c) => c.companyId === selected)!;
  const company = companyById(selected)!;

  const stacked = capTables.map((ct) => {
    const row: Record<string, string | number> = { name: companyById(ct.companyId)!.name };
    holders.forEach((h) => {
      row[h] = ct.rows.filter((r) => r.type === h).reduce((s, r) => s + r.current, 0);
    });
    return row;
  });

  const firmOwnership = companies
    .filter((c) => c.ownership > 0)
    .map((c) => ({ name: c.name, value: c.ownership, diluted: c.fullyDiluted }))
    .sort((a, b) => b.value - a.value);

  const bySector = groupSum(
    companies.filter((c) => c.status !== "Realised"),
    (c) => c.sector,
  );

  const totalFirmOwnedFmv = companies.reduce((s, c) => s + c.fmv, 0);

  return (
    <div>
      <PageHeader
        title="Ownership & Cap Table"
        subtitle="Consolidated ownership position of the firm alongside founders, co-investors and employee pools, with contractual rights per instrument."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard
          label="Weighted Firm Ownership"
          value={fmt.pctPlain(
            companies.reduce((s, c) => s + c.ownership * c.fmv, 0) / (totalFirmOwnedFmv || 1),
          )}
          sub="FMV-weighted, live positions"
        />
        <KpiCard label="Board Seats Held" value={String(companies.filter((c) => c.boardSeat).length)} sub={`${companies.filter((c) => !c.boardSeat && c.status !== "Realised").length} observer-only`} />
        <KpiCard
          label="Avg ESOP Pool (diluted)"
          value={fmt.pctPlain(
            capTables.reduce(
              (s, ct) => s + ct.rows.filter((r) => r.type === "ESOP").reduce((a, r) => a + r.diluted, 0),
              0,
            ) / capTables.length,
          )}
          sub="Across live cap tables"
        />
        <KpiCard label="Live Cap Tables" value={String(capTables.length)} sub="1 closed on exit" />
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Ownership Composition by Company" subtitle="Current basis, % of share capital">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stacked} margin={{ top: 4, right: 8, left: -18, bottom: 56 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} angle={-35} textAnchor="end" interval={0} stroke="var(--border-strong)" />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} stroke="var(--border-strong)" />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 3, fontSize: 12 }} formatter={(v: number) => fmt.pctPlain(v)} />
                {holders.map((h, i) => (
                  <Bar key={h} dataKey={h} stackId="a" fill={CHART_COLORS[i]} name={h === "Firm" ? "Portfolio Intelligence Platform" : h} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 flex flex-wrap gap-4 border-t border-border pt-3 text-[12px]">
            {holders.map((h, i) => (
              <li key={h} className="flex items-center gap-2 text-muted-foreground">
                <span className="size-2 rounded-sm" style={{ background: CHART_COLORS[i] }} />
                {h === "Firm" ? "Portfolio Intelligence Platform" : h}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Firm Ownership — Current vs Fully Diluted" subtitle="Exposure ranking across live positions">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={firmOwnership} margin={{ top: 4, right: 8, left: -18, bottom: 56 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} angle={-35} textAnchor="end" interval={0} stroke="var(--border-strong)" />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} stroke="var(--border-strong)" />
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 3, fontSize: 12 }} formatter={(v: number) => fmt.pctPlain(v)} />
                <Bar dataKey="value" name="Current %" fill="var(--chart-1)" radius={[1, 1, 0, 0]} />
                <Bar dataKey="diluted" name="Fully diluted %" fill="var(--chart-3)" radius={[1, 1, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel
        title="Company Cap Table Detail"
        subtitle={`${company.name} — ${company.round} · ${company.instrument}`}
        className="mb-4"
        right={
          <div className="flex items-end gap-3">
            <SelectFilter
              label="Company"
              value={companyById(selected)!.name}
              options={capTables.map((ct) => companyById(ct.companyId)!.name)}
              onChange={(v) => {
                const match = capTables.find((ct) => companyById(ct.companyId)!.name === v);
                if (match) setSelected(match.companyId);
              }}
            />
            <Link to="/companies/$companyId" params={{ companyId: selected }} className="mb-0.5 whitespace-nowrap text-[12px] text-muted-foreground hover:text-foreground hover:underline">
              Open company view →
            </Link>
          </div>
        }
        bodyClassName=""
      >
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="overflow-x-auto border-b border-border lg:border-b-0 lg:border-r">
            <table className="w-full text-[12.5px]">
              <thead className="bg-muted/60">
                <tr className="border-b border-border text-left">
                  {["Holder", "Type", "Current %", "Fully Diluted %"].map((h) => (
                    <th key={h} className="label-eyebrow px-4 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cap.rows.map((r, i) => (
                  <tr key={r.holder} className="border-b border-border last:border-0">
                    <td className="px-4 py-2">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                        <span className={r.type === "Firm" ? "font-medium" : ""}>{r.holder}</span>
                      </span>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{r.type}</td>
                    <td className="num px-4 py-2">{fmt.pctPlain(r.current)}</td>
                    <td className="num px-4 py-2">{fmt.pctPlain(r.diluted)}</td>
                  </tr>
                ))}
                <tr className="border-t border-border-strong bg-muted/60 font-medium">
                  <td className="px-4 py-2" colSpan={2}>Total</td>
                  <td className="num px-4 py-2">{fmt.pctPlain(cap.rows.reduce((s, r) => s + r.current, 0))}</td>
                  <td className="num px-4 py-2">{fmt.pctPlain(cap.rows.reduce((s, r) => s + r.diluted, 0))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4">
            <h3 className="label-eyebrow mb-2">Rights & Protective Provisions</h3>
            <dl className="grid gap-x-8 text-[12.5px] sm:grid-cols-2">
              {Object.entries(cap.rights).map(([k, v]) => (
                <div key={k} className="border-b border-border py-1.5">
                  <dt className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{k}</dt>
                  <dd className="mt-0.5">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Panel>

      <Panel title="Cross-Portfolio Ownership by Sector" subtitle="Fair value of live positions by sector (USD M)">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bySector} margin={{ top: 4, right: 8, left: -18, bottom: 32 }}>
              <CartesianGrid stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} stroke="var(--border-strong)" angle={-20} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} stroke="var(--border-strong)" />
              <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 3, fontSize: 12 }} formatter={(v: number) => fmt.m(v)} />
              <Bar dataKey="value" name="Fair value" radius={[1, 1, 0, 0]}>
                {bySector.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </div>
  );
}
