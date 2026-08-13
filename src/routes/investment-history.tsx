import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { KpiCard, Panel, SelectFilter } from "@/components/kit";
import { TxnTable } from "./companies.$companyId";
import { companies, companyById, transactions } from "@/data/portfolio";
import { fmt } from "@/data/portfolio";

export const Route = createFileRoute("/investment-history")({
  head: () => ({
    meta: [
      { title: "Investment History | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Complete transaction history across the portfolio: primary investments, follow-ons, secondaries, distributions and exits.",
      },
      { property: "og:title", content: "Investment History | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "Primary, follow-on, secondary, distribution and exit transactions across the portfolio.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [f, setF] = useState({ company: "All", type: "All", instrument: "All" });

  const rows = useMemo(
    () =>
      transactions
        .filter(
          (t) =>
            (f.company === "All" || companyById(t.companyId)?.name === f.company) &&
            (f.type === "All" || t.type === f.type) &&
            (f.instrument === "All" || t.instrument === f.instrument),
        )
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [f],
  );

  const deployed = rows.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const returned = rows.filter((t) => t.amount < 0).reduce((s, t) => s - t.amount, 0);

  return (
    <div>
      <PageHeader
        title="Investment History"
        subtitle="Every capital event recorded across the portfolio, from initial primary subscription through to realisation."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Transactions in view" value={String(rows.length)} />
        <KpiCard label="Capital Deployed" value={fmt.m(deployed)} sub="Primary, follow-on & secondary" />
        <KpiCard label="Capital Returned" value={fmt.m(returned)} tone="positive" sub="Exits & distributions" />
        <KpiCard label="Net Cash Invested" value={fmt.m(deployed - returned)} />
      </div>

      <Panel className="mb-4" bodyClassName="flex flex-wrap gap-3 p-4">
        <SelectFilter label="Company" value={f.company} options={companies.map((c) => c.name)} onChange={(v) => setF({ ...f, company: v })} />
        <SelectFilter label="Transaction Type" value={f.type} options={Array.from(new Set(transactions.map((t) => t.type))).sort()} onChange={(v) => setF({ ...f, type: v })} />
        <SelectFilter label="Instrument" value={f.instrument} options={Array.from(new Set(transactions.map((t) => t.instrument))).sort()} onChange={(v) => setF({ ...f, instrument: v })} />
      </Panel>

      <Panel title="Transaction Register" subtitle="Negative amounts represent cash returned to the investing entity" bodyClassName="">
        <TxnTable rows={rows} showCompany />
      </Panel>
    </div>
  );
}
