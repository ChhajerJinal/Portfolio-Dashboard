import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Building2,
  PieChart,
  History,
  Landmark,
  Activity,
  BellRing,
  Sparkles,
} from "lucide-react";

const nav = [
  { to: "/", label: "Portfolio Overview", icon: LayoutDashboard },
  { to: "/companies", label: "Portfolio Companies", icon: Building2 },
  { to: "/ownership", label: "Ownership & Cap Table", icon: PieChart },
  { to: "/investment-history", label: "Investment History", icon: History },
  { to: "/entities", label: "Investing Entities", icon: Landmark },
  { to: "/monitoring", label: "Portfolio Monitoring", icon: Activity },
  { to: "/alerts", label: "Alerts & Actions", icon: BellRing },
  { to: "/ai-dashboard", label: "AI Dashboard", icon: Sparkles },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        <div className="border-b border-sidebar-border px-5 py-4">
          <div className="text-[15px] font-semibold tracking-tight text-sidebar-accent-foreground">
            Portfolio Intelligence Platform
          </div>
          <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground/60">
            Portfolio Intelligence
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {nav.map((item) => {
            const active =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`mb-0.5 flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] transition-colors ${
                  active
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0 opacity-80" strokeWidth={1.75} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
          <div className="mt-4 border-t border-sidebar-border pt-3">
            <Link
              to="/data-intelligence"
              className={`flex items-center gap-2.5 rounded-sm px-3 py-2 text-[13px] transition-colors ${
                pathname.startsWith("/data-intelligence")
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              }`}
            >
              <Sparkles className="size-4 shrink-0 opacity-80" strokeWidth={1.75} />
              <span className="truncate">AI Data Pipeline</span>
            </Link>
          </div>
        </nav>
        <div className="border-t border-sidebar-border px-5 py-3 text-[11px] leading-relaxed text-sidebar-foreground/55">
          Reporting as at 30 Jun 2026
          <br />
          Base currency: USD
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface/95 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="lg:hidden text-[13px] font-semibold">Portfolio Intelligence Platform</span>
            <span className="hidden text-[12px] text-muted-foreground lg:inline">
              Investment Team Workspace / Q2 2026 Reporting Cycle
            </span>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <span className="hidden sm:inline">
              Valuation basis: <span className="text-foreground">IPEV Fair Value</span>
            </span>
            <span className="flex items-center gap-2 rounded-sm border border-border bg-muted px-2 py-1">
              <span className="size-1.5 rounded-full bg-positive" />
              Data as at 30 Jun 2026
            </span>
          </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-surface px-3 py-2 lg:hidden">
          {[...nav, { to: "/data-intelligence", label: "AI Pipeline" }].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap rounded-sm px-2.5 py-1.5 text-[12px] text-muted-foreground hover:bg-muted"
              activeProps={{ className: "bg-muted text-foreground font-medium" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
      <div>
        <h1 className="text-[19px] font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}
