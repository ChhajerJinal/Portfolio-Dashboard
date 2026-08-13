import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader } from "@/components/app-shell";
import { CHART_COLORS, KpiCard, Panel, StatusPill } from "@/components/kit";
import { aggregate, companies, entities, fmt, unrealisedOf } from "@/data/portfolio";

export const Route = createFileRoute("/entities")({
  head: () => ({
    meta: [
      { title: "Investing Entities | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Consolidated and entity-level view of SPVs, trusts, holding companies and personal accounts holding portfolio positions.",
      },
      { property: "og:title", content: "Investing Entities | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "SPV, trust, HoldCo and personal account performance with cost, FMV, MOIC and IRR.",
      },
    ],
  }),
  component: EntitiesPage,
});

function EntitiesPage() {
  const [open, setOpen] = useState<string | null>(entities[0]!.id);
  const consolidated = aggregate(companies);

  const rows = entities.map((e) => {
    const held = companies.filter((c) => c.entityId === e.id);
    return { entity: e, held, agg: aggregate(held) };
  });

  const byEntity = rows.map((r) => ({ name: r.entity.name, value: r.agg.fmv }));

  return (
    <div>
      <PageHeader
        title="Investing Entities"
        subtitle="Positions are held through multiple investing vehicles. Performance is presented per entity and on a consolidated basis."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
        <KpiCard label="Entities" value={String(entities.length)} sub="SPV, Trust, HoldCo, Personal" />
        <KpiCard label="Consolidated Cost" value={fmt.m(consolidated.cost)} />
        <KpiCard label="Consolidated FMV" value={fmt.m(consolidated.fmv)} />
        <KpiCard label="Unrealised G/L" value={fmt.m(consolidated.unrealised)} tone={consolidated.unrealised >= 0 ? "positive" : "negative"} />
        <KpiCard label="Realised Proceeds" value={fmt.m(consolidated.realised)} />
        <KpiCard label="MOIC" value={fmt.x(consolidated.moic)} tone="positive" />
        <KpiCard label="IRR" value={fmt.pctPlain(consolidated.irr)} tone="positive" />
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Fair Value by Investing Entity" subtitle="Share of consolidated FMV">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byEntity} dataKey="value" nameKey="name" innerRadius={50} outerRadius={84} paddingAngle={1} stroke="var(--surface)">
                  {byEntity.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 3, fontSize: 12 }} formatter={(v: number) => fmt.m(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1 border-t border-border pt-3 text-[12px]">
            {byEntity.map((d, i) => (
              <li key={d.name} className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="size-2 shrink-0 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="truncate text-muted-foreground">{d.name}</span>
                </span>
                <span className="num shrink-0">{fmt.m(d.value)}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Consolidated Entity Performance" subtitle="Select an entity to view the underlying holdings" className="lg:col-span-2" bodyClassName="">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-[12.5px]">
              <thead className="bg-muted/60">
                <tr className="border-b border-border text-left">
                  {["Investing Entity", "Entity Type", "Jurisdiction", "Companies", "Total Cost", "Current FMV", "Unrealised G/L", "Realised", "MOIC", "IRR"].map((h) => (
                    <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(({ entity, held, agg }) => (
                  <tr
                    key={entity.id}
                    onClick={() => setOpen(entity.id)}
                    className={`cursor-pointer border-b border-border last:border-0 hover:bg-accent/40 ${open === entity.id ? "bg-accent/30" : ""}`}
                  >
                    <td className="whitespace-nowrap px-3 py-2 font-medium">{entity.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{entity.type}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{entity.jurisdiction}</td>
                    <td className="num px-3 py-2">{held.length}</td>
                    <td className="num px-3 py-2">{fmt.m(agg.cost)}</td>
                    <td className="num px-3 py-2">{fmt.m(agg.fmv)}</td>
                    <td className={`num px-3 py-2 ${agg.unrealised >= 0 ? "text-positive" : "text-negative"}`}>{fmt.m(agg.unrealised)}</td>
                    <td className="num px-3 py-2">{fmt.m(agg.realised)}</td>
                    <td className="num px-3 py-2 font-medium">{fmt.x(agg.moic)}</td>
                    <td className={`num px-3 py-2 font-medium ${agg.irr >= 0 ? "text-positive" : "text-negative"}`}>{fmt.pctPlain(agg.irr)}</td>
                  </tr>
                ))}
                <tr className="border-t border-border-strong bg-muted/60 font-medium">
                  <td className="px-3 py-2" colSpan={3}>Consolidated</td>
                  <td className="num px-3 py-2">{consolidated.count}</td>
                  <td className="num px-3 py-2">{fmt.m(consolidated.cost)}</td>
                  <td className="num px-3 py-2">{fmt.m(consolidated.fmv)}</td>
                  <td className={`num px-3 py-2 ${consolidated.unrealised >= 0 ? "text-positive" : "text-negative"}`}>{fmt.m(consolidated.unrealised)}</td>
                  <td className="num px-3 py-2">{fmt.m(consolidated.realised)}</td>
                  <td className="num px-3 py-2">{fmt.x(consolidated.moic)}</td>
                  <td className="num px-3 py-2">{fmt.pctPlain(consolidated.irr)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {rows
        .filter((r) => r.entity.id === open)
        .map(({ entity, held }) => (
          <Panel
            key={entity.id}
            title={`Holdings — ${entity.name}`}
            subtitle={`${entity.type} · ${entity.jurisdiction} · formed ${fmt.date(entity.formed)}`}
            bodyClassName=""
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-[12.5px]">
                <thead className="bg-muted/60">
                  <tr className="border-b border-border text-left">
                    {["Company", "Sector", "Geography", "Instrument", "Cost", "FMV", "Unrealised", "Realised", "Ownership %", "MOIC", "IRR", "Status"].map((h) => (
                      <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {held.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                      <td className="whitespace-nowrap px-3 py-2 font-medium">
                        <Link to="/companies/$companyId" params={{ companyId: c.id }} className="hover:underline">
                          {c.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 text-muted-foreground">{c.sector}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{c.geography}</td>
                      <td className="px-3 py-2 text-muted-foreground">{c.instrument}</td>
                      <td className="num px-3 py-2">{fmt.m(c.cost)}</td>
                      <td className="num px-3 py-2">{fmt.m(c.fmv)}</td>
                      <td className={`num px-3 py-2 ${unrealisedOf(c) >= 0 ? "text-positive" : "text-negative"}`}>{fmt.m(unrealisedOf(c))}</td>
                      <td className="num px-3 py-2">{fmt.m(c.realised)}</td>
                      <td className="num px-3 py-2">{fmt.pctPlain(c.ownership)}</td>
                      <td className="num px-3 py-2">{fmt.x(c.moic)}</td>
                      <td className={`num px-3 py-2 ${c.irr >= 0 ? "text-positive" : "text-negative"}`}>{fmt.pctPlain(c.irr)}</td>
                      <td className="px-3 py-2"><StatusPill status={c.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        ))}
    </div>
  );
}
