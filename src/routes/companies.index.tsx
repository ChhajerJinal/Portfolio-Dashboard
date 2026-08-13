import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { KpiCard, Panel, SelectFilter, StatusPill } from "@/components/kit";
import { aggregate, companies, fmt, unrealisedOf } from "@/data/portfolio";

export const Route = createFileRoute("/companies/")({
  head: () => ({
    meta: [
      { title: "Portfolio Companies | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Searchable register of portfolio companies with cost, fair value, ownership, MOIC, IRR and investment status.",
      },
      { property: "og:title", content: "Portfolio Companies | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "Register of portfolio companies with cost, fair value, ownership, MOIC and IRR.",
      },
    ],
  }),
  component: CompaniesPage,
});

const uniq = (fn: (c: (typeof companies)[number]) => string) =>
  Array.from(new Set(companies.map(fn))).sort();

type SortKey = "name" | "cost" | "fmv" | "moic" | "irr" | "ownership";

export function CompaniesPage() {
  const [q, setQ] = useState("");
  const [f, setF] = useState({ sector: "All", geography: "All", assetClass: "All", status: "All" });
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "fmv", dir: -1 });

  const rows = useMemo(() => {
    const filtered = companies.filter(
      (c) =>
        (f.sector === "All" || c.sector === f.sector) &&
        (f.geography === "All" || c.geography === f.geography) &&
        (f.assetClass === "All" || c.assetClass === f.assetClass) &&
        (f.status === "All" || c.status === f.status) &&
        (q.trim() === "" ||
          [c.name, c.sector, c.subsector, c.geography, c.instrument, c.round]
            .join(" ")
            .toLowerCase()
            .includes(q.toLowerCase())),
    );
    return filtered.sort((a, b) => {
      if (sort.key === "name") return a.name.localeCompare(b.name) * sort.dir;
      return ((a[sort.key] as number) - (b[sort.key] as number)) * sort.dir;
    });
  }, [q, f, sort]);

  const agg = aggregate(rows);
  const th = (label: string, key?: SortKey, align = "left") => (
    <th
      key={label}
      className={`label-eyebrow whitespace-nowrap px-3 py-2 font-medium ${align === "right" ? "text-right" : "text-left"} ${key ? "cursor-pointer select-none hover:text-foreground" : ""}`}
      onClick={key ? () => setSort((s) => ({ key, dir: s.key === key && s.dir === -1 ? 1 : -1 })) : undefined}
    >
      {label}
      {sort.key === key ? (sort.dir === -1 ? " ↓" : " ↑") : ""}
    </th>
  );

  return (
    <div>
      <PageHeader
        title="Portfolio Companies"
        subtitle="Investment register across all investing entities. Select a company to open the full company view."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KpiCard label="Companies in view" value={String(agg.count)} />
        <KpiCard label="Total Cost" value={fmt.m(agg.cost)} />
        <KpiCard label="Current FMV" value={fmt.m(agg.fmv)} />
        <KpiCard label="Realised" value={fmt.m(agg.realised)} />
        <KpiCard label="MOIC" value={fmt.x(agg.moic)} tone={agg.moic >= 1 ? "positive" : "negative"} />
        <KpiCard label="IRR" value={fmt.pctPlain(agg.irr)} tone={agg.irr >= 0 ? "positive" : "negative"} />
      </div>

      <Panel className="mb-4" bodyClassName="flex flex-wrap items-end gap-3 p-4">
        <label className="flex min-w-[14rem] flex-1 flex-col gap-1">
          <span className="label-eyebrow">Search</span>
          <span className="relative">
            <Search className="pointer-events-none absolute left-2 top-2 size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Company, sector, instrument, round…"
              className="h-8 w-full rounded-sm border border-input bg-surface pl-8 pr-2 text-[12.5px] outline-none focus:border-ring"
            />
          </span>
        </label>
        <SelectFilter label="Sector" value={f.sector} options={uniq((c) => c.sector)} onChange={(v) => setF({ ...f, sector: v })} />
        <SelectFilter label="Geography" value={f.geography} options={uniq((c) => c.geography)} onChange={(v) => setF({ ...f, geography: v })} />
        <SelectFilter label="Asset Class" value={f.assetClass} options={uniq((c) => c.assetClass)} onChange={(v) => setF({ ...f, assetClass: v })} />
        <SelectFilter label="Status" value={f.status} options={["Active", "Watchlist", "Concern", "Realised"]} onChange={(v) => setF({ ...f, status: v })} />
      </Panel>

      <Panel bodyClassName="">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1500px] text-[12.5px]">
            <thead className="bg-muted/60">
              <tr className="border-b border-border">
                {th("Company", "name")}
                {th("Sector")}
                {th("Subsector")}
                {th("Geography")}
                {th("Asset Class")}
                {th("Investment Date")}
                {th("Round")}
                {th("Instrument")}
                {th("Total Cost", "cost", "right")}
                {th("Current FMV", "fmv", "right")}
                {th("Realised", undefined, "right")}
                {th("Unrealised G/L", undefined, "right")}
                {th("Ownership %", "ownership", "right")}
                {th("MOIC", "moic", "right")}
                {th("IRR", "irr", "right")}
                {th("Status")}
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-accent/40">
                  <td className="px-3 py-2 font-medium">
                    <Link to="/companies/$companyId" params={{ companyId: c.id }} className="hover:underline">
                      {c.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{c.sector}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{c.subsector}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{c.geography}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{c.assetClass}</td>
                  <td className="num whitespace-nowrap px-3 py-2">{fmt.date(c.investmentDate)}</td>
                  <td className="whitespace-nowrap px-3 py-2">{c.round}</td>
                  <td className="whitespace-nowrap px-3 py-2">{c.instrument}</td>
                  <td className="num px-3 py-2 text-right">{fmt.m(c.cost)}</td>
                  <td className="num px-3 py-2 text-right">{fmt.m(c.fmv)}</td>
                  <td className="num px-3 py-2 text-right">{fmt.m(c.realised)}</td>
                  <td className={`num px-3 py-2 text-right ${unrealisedOf(c) >= 0 ? "text-positive" : "text-negative"}`}>{fmt.m(unrealisedOf(c))}</td>
                  <td className="num px-3 py-2 text-right">{fmt.pctPlain(c.ownership)}</td>
                  <td className="num px-3 py-2 text-right font-medium">{fmt.x(c.moic)}</td>
                  <td className={`num px-3 py-2 text-right font-medium ${c.irr >= 0 ? "text-positive" : "text-negative"}`}>{fmt.pctPlain(c.irr)}</td>
                  <td className="px-3 py-2">
                    <StatusPill status={c.status} />
                  </td>
                </tr>
              ))}
              <tr className="border-t border-border-strong bg-muted/60 font-medium">
                <td className="px-3 py-2" colSpan={8}>
                  Total ({rows.length})
                </td>
                <td className="num px-3 py-2 text-right">{fmt.m(agg.cost)}</td>
                <td className="num px-3 py-2 text-right">{fmt.m(agg.fmv)}</td>
                <td className="num px-3 py-2 text-right">{fmt.m(agg.realised)}</td>
                <td className={`num px-3 py-2 text-right ${agg.unrealised >= 0 ? "text-positive" : "text-negative"}`}>{fmt.m(agg.unrealised)}</td>
                <td className="px-3 py-2" />
                <td className="num px-3 py-2 text-right">{fmt.x(agg.moic)}</td>
                <td className="num px-3 py-2 text-right">{fmt.pctPlain(agg.irr)}</td>
                <td className="px-3 py-2" />
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
