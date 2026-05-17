import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KpiCard } from "@/lib/data";

export function StatCard({ kpi }: { kpi: KpiCard }) {
  const TrendIcon =
    kpi.trend === "up"
      ? ArrowUpRight
      : kpi.trend === "down"
        ? ArrowDownRight
        : Minus;
  const trendColor =
    kpi.trend === "up"
      ? "text-neon-green"
      : kpi.trend === "down"
        ? "text-neon-red"
        : "text-muted-foreground";

  return (
    <div className="surface relative overflow-hidden p-5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-orange/40 to-transparent" />
      <div className="text-xs uppercase tracking-widest text-muted-foreground">
        {kpi.label}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="mono text-3xl font-semibold tracking-tight">
          {kpi.value}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        {kpi.delta && (
          <span className={cn("inline-flex items-center gap-1", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span className="mono">{kpi.delta}</span>
          </span>
        )}
        {kpi.hint && (
          <span className="text-muted-foreground">{kpi.hint}</span>
        )}
      </div>
    </div>
  );
}
