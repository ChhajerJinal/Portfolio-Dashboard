import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/app-shell";
import { CHART_COLORS, KpiCard, Panel, SelectFilter, StatusPill } from "@/components/kit";
import {
  aggregate,
  companies,
  entities,
  fmt,
  groupSum,
  portfolioValueSeries,
  unrealisedOf,
} from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portfolio Overview | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Portfolio command centre: cost, fair value, realisations, MOIC, IRR and exposure analytics across the Portfolio Intelligence Platform portfolio.",
      },
      { property: "og:title", content: "Portfolio Overview | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "Institutional portfolio command centre with MOIC, IRR and exposure analytics.",
      },
    ],
  }),
  component: Overview,
});

const uniq = (fn: (c: (typeof companies)[number]) => string) =>
  Array.from(new Set(companies.map(fn))).sort();

const axis = {
  tick: { fontSize: 11, fill: "var(--muted-foreground)" },
  stroke: "var(--border-strong)",
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--surface)",
    border: "1px solid var(--border-strong)",
    borderRadius: 3,
    fontSize: 12,
  },
} as const;

function Overview() {
  const [f, setF] = useState({
    company: "All",
    sector: "All",
    geography: "All",
    assetClass: "All",
    currency: "All",
    entity: "All",
    status: "All",
  });

  const list = useMemo(
    () =>
      companies.filter(
        (c) =>
          (f.company === "All" || c.name === f.company) &&
          (f.sector === "All" || c.sector === f.sector) &&
          (f.geography === "All" || c.geography === f.geography) &&
          (f.assetClass === "All" || c.assetClass === f.assetClass) &&
          (f.currency === "All" || c.currency === f.currency) &&
          (f.entity === "All" || entities.find((e) => e.id === c.entityId)?.name === f.entity) &&
          (f.status === "All" || c.status === f.status),
      ),
    [f],
  );

  const agg = aggregate(list);
  const bySector = groupSum(list, (c) => c.sector);
  const byGeo = groupSum(list, (c) => c.geography);
  const byCcy = groupSum(list, (c) => c.currency);
  const byOwnership = list
    .filter((c) => c.ownership > 0)
    .map((c) => ({ name: c.name, value: c.ownership }))
    .sort((a, b) => b.value - a.value);
  const irrRank = [...list].sort((a, b) => b.irr - a.irr).map((c) => ({ name: c.name, value: c.irr }));
  const moicRank = [...list].sort((a, b) => b.moic - a.moic).map((c) => ({ name: c.name, value: c.moic }));

  return (
    <div>
      <PageHeader
        title="Portfolio Overview"
        subtitle="Command centre for the consolidated portfolio across all investing entities. Fair values marked as at 30 Jun 2026 on an IPEV basis."
        right={
          <div className="text-right text-[11.5px] text-muted-foreground">
            <div>
              {agg.count} positions in view of {companies.length}
            </div>
            <div className="num text-foreground">Total value {fmt.m(agg.total)}</div>
          </div>
        }
      />

      <Panel
        title="Filters"
        subtitle="Applies to every KPI and chart on this page"
        className="mb-4"
        bodyClassName="flex flex-wrap gap-3 p-4"
      >
        <SelectFilter label="Company" value={f.company} options={companies.map((c) => c.name)} onChange={(v) => setF({ ...f, company: v })} />
        <SelectFilter label="Sector" value={f.sector} options={uniq((c) => c.sector)} onChange={(v) => setF({ ...f, sector: v })} />
        <SelectFilter label="Geography" value={f.geography} options={uniq((c) => c.geography)} onChange={(v) => setF({ ...f, geography: v })} />
        <SelectFilter label="Asset Class" value={f.assetClass} options={uniq((c) => c.assetClass)} onChange={(v) => setF({ ...f, assetClass: v })} />
        <SelectFilter label="Currency" value={f.currency} options={uniq((c) => c.currency)} onChange={(v) => setF({ ...f, currency: v })} />
        <SelectFilter label="Investing Entity" value={f.entity} options={entities.map((e) => e.name)} onChange={(v) => setF({ ...f, entity: v })} />
        <SelectFilter label="Investment Status" value={f.status} options={["Active", "Watchlist", "Concern", "Realised"]} onChange={(v) => setF({ ...f, status: v })} />
      </Panel>

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <KpiCard label="Total Cost / Invested" value={fmt.m(agg.cost)} sub={`${agg.count} positions`} />
        <KpiCard label="Current FMV / MTM" value={fmt.m(agg.fmv)} sub="IPEV fair value" />
        <KpiCard label="Realised Proceeds" value={fmt.m(agg.realised)} sub="Exits & distributions" />
        <KpiCard
          label="Unrealised Gain/Loss"
          value={fmt.m(agg.unrealised)}
          tone={agg.unrealised >= 0 ? "positive" : "negative"}
          sub="FMV less cost held"
        />
        <KpiCard label="Total Value" value={fmt.m(agg.total)} sub="FMV + realised" />
        <KpiCard label="MOIC" value={fmt.x(agg.moic)} tone={agg.moic >= 1 ? "positive" : "negative"} sub="Gross, multiple of cost" />
        <KpiCard label="IRR" value={fmt.pctPlain(agg.irr)} tone={agg.irr >= 0 ? "positive" : "negative"} sub="Cost-weighted gross" />
        <KpiCard label="Portfolio Companies" value={String(agg.count)} sub={`${list.filter((c) => c.status === "Realised").length} fully realised`} />
      </div>

      <div className="mb-4 grid gap-4 xl:grid-cols-3">
        <Panel title="Portfolio Value Over Time" subtitle="Cost vs fair value vs cumulative realisations (USD M)" className="xl:col-span-2">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioValueSeries} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="period" tick={axis.tick} stroke={axis.stroke} />
                <YAxis tick={axis.tick} stroke={axis.stroke} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => fmt.m(v)} />
                <Area type="monotone" dataKey="fmv" name="Fair value" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.14} strokeWidth={1.8} />
                <Area type="monotone" dataKey="cost" name="Cost" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.08} strokeWidth={1.5} />
                <Area type="monotone" dataKey="realised" name="Realised" stroke="var(--chart-4)" fill="var(--chart-4)" fillOpacity={0.1} strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel title="Investment Exposure by Sector" subtitle="Share of fair value">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={bySector} dataKey="value" nameKey="name" innerRadius={52} outerRadius={86} paddingAngle={1} stroke="var(--surface)">
                  {bySector.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(v: number) => fmt.m(v)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Legend data={bySector} />
        </Panel>
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Geography Exposure" subtitle="Fair value by country">
          <HBar data={byGeo} format={(v) => fmt.m(v)} />
        </Panel>
        <Panel title="Currency Exposure" subtitle="Fair value by local currency of investment">
          <HBar data={byCcy} format={(v) => fmt.m(v)} colorOffset={2} />
        </Panel>
        <Panel title="Ownership Exposure" subtitle="Firm ownership % by company">
          <HBar data={byOwnership} format={(v) => fmt.pctPlain(v)} colorOffset={4} />
        </Panel>
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Panel title="IRR by Portfolio Company" subtitle="Gross IRR, since inception">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={irrRank} margin={{ top: 4, right: 12, left: -18, bottom: 44 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ ...axis.tick, fontSize: 10 }} stroke={axis.stroke} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={axis.tick} stroke={axis.stroke} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => fmt.pctPlain(v)} />
                <Bar dataKey="value" name="IRR" radius={[1, 1, 0, 0]}>
                  {irrRank.map((d, i) => (
                    <Cell key={i} fill={d.value >= 0 ? "var(--chart-4)" : "var(--chart-6)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="MOIC by Portfolio Company" subtitle="Total value / cost">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moicRank} margin={{ top: 4, right: 12, left: -18, bottom: 44 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" tick={{ ...axis.tick, fontSize: 10 }} stroke={axis.stroke} angle={-35} textAnchor="end" interval={0} />
                <YAxis tick={axis.tick} stroke={axis.stroke} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => fmt.x(v)} />
                <Bar dataKey="value" name="MOIC" radius={[1, 1, 0, 0]}>
                  {moicRank.map((d, i) => (
                    <Cell key={i} fill={d.value >= 1 ? "var(--chart-2)" : "var(--chart-6)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <Panel title="Top Positions" subtitle="Ranked by fair value" bodyClassName="">
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-border text-left">
                {["Company", "Sector", "Geography", "Cost", "FMV", "Unrealised", "MOIC", "IRR", "Status"].map((h) => (
                  <th key={h} className="label-eyebrow px-4 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...list]
                .sort((a, b) => b.fmv - a.fmv)
                .slice(0, 6)
                .map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/60">
                    <td className="px-4 py-2 font-medium">
                      <Link to="/companies/$companyId" params={{ companyId: c.id }} className="hover:underline">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{c.sector}</td>
                    <td className="px-4 py-2 text-muted-foreground">{c.geography}</td>
                    <td className="num px-4 py-2">{fmt.m(c.cost)}</td>
                    <td className="num px-4 py-2">{fmt.m(c.fmv)}</td>
                    <td className={`num px-4 py-2 ${unrealisedOf(c) >= 0 ? "text-positive" : "text-negative"}`}>{fmt.m(unrealisedOf(c))}</td>
                    <td className="num px-4 py-2">{fmt.x(c.moic)}</td>
                    <td className={`num px-4 py-2 ${c.irr >= 0 ? "text-positive" : "text-negative"}`}>{fmt.pctPlain(c.irr)}</td>
                    <td className="px-4 py-2">
                      <StatusPill status={c.status} />
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

function Legend({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <ul className="mt-3 space-y-1 border-t border-border pt-3 text-[12px]">
      {data.map((d, i) => (
        <li key={d.name} className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2">
            <span className="size-2 shrink-0 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span className="truncate text-muted-foreground">{d.name}</span>
          </span>
          <span className="num shrink-0">{total ? ((d.value / total) * 100).toFixed(1) : "0.0"}%</span>
        </li>
      ))}
    </ul>
  );
}

function HBar({
  data,
  format,
  colorOffset = 0,
}: {
  data: { name: string; value: number }[];
  format: (v: number) => string;
  colorOffset?: number;
}) {
  const max = Math.max(...data.map((d) => Math.abs(d.value)), 1);
  return (
    <ul className="space-y-2.5">
      {data.map((d, i) => (
        <li key={d.name}>
          <div className="flex items-baseline justify-between gap-2 text-[12px]">
            <span className="truncate">{d.name}</span>
            <span className="num shrink-0 text-muted-foreground">{format(d.value)}</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-sm bg-muted">
            <div
              className="h-full rounded-sm"
              style={{
                width: `${(Math.abs(d.value) / max) * 100}%`,
                background: CHART_COLORS[(i + colorOffset) % CHART_COLORS.length],
              }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
