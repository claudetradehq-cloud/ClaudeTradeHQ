import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { DrawdownChart, EquityCurve } from "@/components/equity-curve";
import { MonthlyReturns } from "@/components/monthly-returns";
import { AllocationChart } from "@/components/allocation-chart";
import { TradesTable } from "@/components/trades-table";
import {
  assetAllocation,
  generateEquityCurve,
  generateMonthlyReturns,
  headlineKpis,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "Live performance dashboard: equity curve, monthly returns, drawdown, and recent trades across all live strategies.",
};

export default function PerformancePage() {
  const equity = generateEquityCurve();
  const monthly = generateMonthlyReturns();

  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse-soft rounded-full bg-neon-green" />
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-green">
              Live · streaming
            </div>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Performance, in full daylight.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Aggregated metrics across every live strategy. Numbers update at the
            close of each NY session.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Period · Since 2022-01-01</Badge>
          <Badge variant="accent">Benchmark · 60/40</Badge>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {headlineKpis.map((kpi) => (
          <StatCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Equity curve</h2>
              <p className="text-xs text-muted-foreground">
                Strategy vs 60/40 benchmark, monthly close.
              </p>
            </div>
            <Badge variant="default">+184.6%</Badge>
          </div>
          <EquityCurve data={equity} />
          <div className="mt-6 border-t border-border/60 pt-4">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Underwater (drawdown)
            </div>
            <DrawdownChart data={equity} />
          </div>
        </section>

        <section className="surface flex flex-col gap-4 p-6">
          <div>
            <h2 className="text-base font-semibold">Asset allocation</h2>
            <p className="text-xs text-muted-foreground">
              Capital-weighted, current month.
            </p>
          </div>
          <AllocationChart data={assetAllocation} />

          <div className="mt-2 border-t border-border/60 pt-4">
            <h3 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Risk snapshot
            </h3>
            <ul className="space-y-2 text-sm">
              <RiskRow label="Gross exposure" value="148%" />
              <RiskRow label="Net exposure" value="64%" />
              <RiskRow label="VaR (95%, 1d)" value="-1.4%" />
              <RiskRow label="Active strategies" value="9" />
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="surface p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Monthly returns</h2>
              <p className="text-xs text-muted-foreground">
                Average across 4 calendar years, % per month.
              </p>
            </div>
            <Badge variant="success">Avg +1.6%/mo</Badge>
          </div>
          <MonthlyReturns data={monthly} />
        </section>

        <section className="surface p-6">
          <h2 className="text-base font-semibold">Notable streaks</h2>
          <p className="text-xs text-muted-foreground">
            Rolling-12m rankings across the book.
          </p>
          <ul className="mt-4 space-y-3">
            <StreakRow label="Best 12m return" value="+72.4%" tone="green" />
            <StreakRow label="Worst 12m return" value="-4.1%" tone="red" />
            <StreakRow label="Longest winning streak" value="6 months" />
            <StreakRow label="Recovery time (avg)" value="38 days" />
            <StreakRow label="Profit factor" value="1.62" />
          </ul>
        </section>
      </div>

      <section className="surface mt-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold">Recent trades</h2>
            <p className="text-xs text-muted-foreground">
              Last 7 closed positions across live strategies.
            </p>
          </div>
          <Badge variant="muted">Auto-refresh · 5m</Badge>
        </div>
        <TradesTable />
      </section>
    </section>
  );
}

function RiskRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="mono font-medium">{value}</span>
    </li>
  );
}

function StreakRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "green" | "red";
}) {
  const color =
    tone === "green"
      ? "text-neon-green"
      : tone === "red"
        ? "text-neon-red"
        : "";
  return (
    <li className="flex items-center justify-between border-b border-border/40 pb-2 text-sm last:border-b-0 last:pb-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`mono font-semibold ${color}`}>{value}</span>
    </li>
  );
}
