import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  GitCompareArrows,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { KpiCard, Panel } from "@/components/kit";
import { fmt } from "@/data/portfolio";

export const Route = createFileRoute("/data-intelligence")({
  head: () => ({
    meta: [
      { title: "AI Data Pipeline | Portfolio Intelligence Platform Portfolio Intelligence" },
      {
        name: "description",
        content:
          "Concept view of the assisted data pipeline: document and email ingestion, AI extraction, cross-validation, human review and approved data into the portfolio dashboards.",
      },
      { property: "og:title", content: "AI Data Pipeline | Portfolio Intelligence Platform" },
      {
        property: "og:description",
        content: "AI-assisted extraction and validation with investment-team review before data becomes official.",
      },
    ],
  }),
  component: DataIntelligencePage,
});

const stages = [
  { icon: FileText, title: "Document / Email / Data", detail: "MIS packs, board decks, SHAs, cap tables, bank statements, founder emails" },
  { icon: Sparkles, title: "AI Extraction", detail: "Field-level extraction, classification and summarisation with confidence scores" },
  { icon: GitCompareArrows, title: "Cross-Validation", detail: "Checked against prior periods, signed accounts, cap table and transaction ledger" },
  { icon: UserCheck, title: "Human Review", detail: "Investment team confirms, corrects or rejects each flagged field" },
  { icon: ShieldCheck, title: "Approved Data", detail: "Versioned, attributed and locked to the reporting period" },
  { icon: LayoutDashboard, title: "Dashboard", detail: "Flows into KPIs, monitoring scorecards, valuations and alerts" },
] as const;

const queue = [
  { doc: "Aurex Health — Jun 2026 MIS pack.pdf", company: "Aurex Health", fields: 42, confidence: 0.97, state: "Approved", reviewer: "R. Menon" },
  { doc: "Helios Foods — Q2 board deck.pptx", company: "Helios Foods", fields: 31, confidence: 0.83, state: "In Review", reviewer: "C. Whitfield" },
  { doc: "Vantage Fintech — SHA amendment 3.pdf", company: "Vantage Fintech", fields: 18, confidence: 0.91, state: "In Review", reviewer: "Legal / A. Rahman" },
  { doc: "Skyline Mobility — founder email (cash update)", company: "Skyline Mobility", fields: 7, confidence: 0.64, state: "Flagged", reviewer: "D. Novak" },
  { doc: "Orbit SaaS — May 2026 ARR export.xlsx", company: "Orbit SaaS", fields: 24, confidence: 0.99, state: "Approved", reviewer: "Portfolio Ops" },
  { doc: "Nimbus Logistics — updated cap table.xlsx", company: "Nimbus Logistics", fields: 55, confidence: 0.88, state: "In Review", reviewer: "S. Iyer" },
];

const exceptions = [
  { field: "Cash balance (Jun 26)", extracted: "$1.4M", validated: "$1.1M", note: "Conflicts with bank statement — bank figure retained pending founder confirmation" },
  { field: "Gross margin (Q2)", extracted: "26.4%", validated: "24.1%", note: "Extraction included non-recurring rebate; restated on a like-for-like basis" },
  { field: "ESOP pool (fully diluted)", extracted: "12.0%", validated: "12.5%", note: "Board-approved top-up not yet reflected in source cap table" },
];

function DataIntelligencePage() {
  const [active, setActive] = useState(1);
  const approved = queue.filter((q) => q.state === "Approved").length;

  return (
    <div>
      <PageHeader
        title="AI-Assisted Data Pipeline"
        subtitle="Concept view. AI performs extraction, classification, validation and summarisation — the investment team reviews and approves every material figure before it becomes official portfolio data."
      />

      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <KpiCard label="Documents in cycle" value={String(queue.length)} sub="Q2 2026 reporting" />
        <KpiCard label="Fields extracted" value={String(queue.reduce((s, q) => s + q.fields, 0))} sub="Across all sources" />
        <KpiCard label="Approved by team" value={`${approved} / ${queue.length}`} tone="positive" sub="Human sign-off complete" />
        <KpiCard label="Avg extraction confidence" value={fmt.pctPlain((queue.reduce((s, q) => s + q.confidence, 0) / queue.length) * 100)} sub="Below 85% routed to review" />
      </div>

      <Panel title="Workflow" subtitle="Select a stage to see what happens and who is accountable" className="mb-4">
        <div className="flex flex-wrap items-stretch gap-2">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="flex items-center gap-2">
                <button
                  onClick={() => setActive(i)}
                  className={`flex h-full min-w-[9.5rem] max-w-[11rem] flex-col gap-1.5 rounded-sm border px-3 py-2.5 text-left transition-colors ${
                    active === i ? "border-primary bg-accent/50" : "border-border hover:bg-muted"
                  }`}
                >
                  <Icon className="size-4 text-muted-foreground" strokeWidth={1.75} />
                  <span className="text-[12px] font-medium leading-tight">{s.title}</span>
                  <span className="label-eyebrow">Step {i + 1}</span>
                </button>
                {i < stages.length - 1 && <ArrowRight className="size-4 shrink-0 text-muted-foreground" />}
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-[12.5px]">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-positive" strokeWidth={1.75} />
          <p>
            <span className="font-medium">{stages[active]!.title}: </span>
            <span className="text-muted-foreground">{stages[active]!.detail}</span>
          </p>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Extraction Queue" subtitle="Nothing reaches the dashboard without an approver" bodyClassName="">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-[12.5px]">
              <thead className="bg-muted/60">
                <tr className="border-b border-border text-left">
                  {["Source", "Company", "Fields", "Confidence", "State", "Reviewer"].map((h) => (
                    <th key={h} className="label-eyebrow whitespace-nowrap px-3 py-2 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {queue.map((q) => (
                  <tr key={q.doc} className="border-b border-border last:border-0">
                    <td className="px-3 py-2">{q.doc}</td>
                    <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{q.company}</td>
                    <td className="num px-3 py-2">{q.fields}</td>
                    <td className={`num px-3 py-2 ${q.confidence < 0.85 ? "text-negative" : "text-positive"}`}>
                      {(q.confidence * 100).toFixed(0)}%
                    </td>
                    <td className="whitespace-nowrap px-3 py-2">
                      <span
                        className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[11px] ${
                          q.state === "Approved"
                            ? "border-positive/30 bg-positive/10 text-positive"
                            : q.state === "Flagged"
                              ? "border-negative/30 bg-negative/10 text-negative"
                              : "border-warning/40 bg-warning/12 text-warning"
                        }`}
                      >
                        {q.state}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-muted-foreground">{q.reviewer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Cross-Validation Exceptions" subtitle="Where the AI figure was overridden or corrected in review" bodyClassName="">
          <ul>
            {exceptions.map((e) => (
              <li key={e.field} className="border-b border-border p-4 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="text-[13px] font-medium">{e.field}</span>
                  <span className="text-[12px]">
                    <span className="num text-muted-foreground line-through">{e.extracted}</span>
                    <ArrowRight className="mx-1.5 inline size-3" />
                    <span className="num font-medium">{e.validated}</span>
                  </span>
                </div>
                <p className="mt-1 text-[12px] text-muted-foreground">{e.note}</p>
              </li>
            ))}
          </ul>
          <div className="border-t border-border bg-muted/50 p-4 text-[12px] text-muted-foreground">
            Governance: AI output is advisory only. Valuations, ownership changes and reported KPIs require named
            human approval and are versioned with an audit trail before publication to the dashboards.
          </div>
        </Panel>
      </div>
    </div>
  );
}
