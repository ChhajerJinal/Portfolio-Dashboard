import type { ReactNode } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import type { RagStatus, Status } from "@/data/portfolio";

export function Panel({
  title,
  subtitle,
  right,
  children,
  className = "",
  bodyClassName = "p-4",
}: {
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {title && (
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <div>
            <h2 className="text-[13px] font-semibold tracking-tight">{title}</h2>
            {subtitle && <p className="mt-0.5 text-[11.5px] text-muted-foreground">{subtitle}</p>}
          </div>
          {right}
        </header>
      )}
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

export function KpiCard({
  label,
  value,
  sub,
  tone = "neutral",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "neutral" | "positive" | "negative";
}) {
  const toneClass =
    tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : "text-foreground";
  return (
    <div className="panel px-3.5 py-3">
      <div className="label-eyebrow truncate">{label}</div>
      <div className={`num mt-1.5 text-[19px] font-semibold ${toneClass}`}>{value}</div>
      {sub && <div className="mt-1 text-[11.5px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

export function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Active: "border-positive/30 bg-positive/10 text-positive",
    Watchlist: "border-warning/40 bg-warning/12 text-warning",
    Concern: "border-negative/30 bg-negative/10 text-negative",
    Realised: "border-border-strong bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[11px] font-medium ${map[status]}`}
    >
      {status}
    </span>
  );
}

export function RagDot({ rag, label }: { rag: RagStatus; label?: string }) {
  const color =
    rag === "green" ? "bg-positive" : rag === "amber" ? "bg-warning" : "bg-negative";
  const text = label ?? (rag === "green" ? "On Track" : rag === "amber" ? "Needs Attention" : "Concern");
  return (
    <span className="inline-flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
      <span className={`size-2 rounded-full ${color}`} />
      {text}
    </span>
  );
}

export function Trend({ dir }: { dir: "up" | "down" | "flat" }) {
  if (dir === "flat") return <ArrowRight className="size-3.5 text-muted-foreground" />;
  return dir === "up" ? (
    <ArrowUpRight className="size-3.5 text-positive" />
  ) : (
    <ArrowDownRight className="size-3.5 text-negative" />
  );
}

export function Signed({ value, format }: { value: number; format: (v: number) => string }) {
  return (
    <span className={`num ${value >= 0 ? "text-positive" : "text-negative"}`}>{format(value)}</span>
  );
}

export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="border-b border-border py-2 last:border-0">
      <div className="label-eyebrow">{label}</div>
      <div className="mt-0.5 text-[13px] text-foreground">{value}</div>
    </div>
  );
}

export function SelectFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex min-w-[9.5rem] flex-1 flex-col gap-1">
      <span className="label-eyebrow">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 rounded-sm border border-input bg-surface px-2 text-[12.5px] text-foreground outline-none focus:border-ring"
      >
        <option value="All">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
];
