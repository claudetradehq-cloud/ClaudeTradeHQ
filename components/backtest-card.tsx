import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Backtest } from "@/lib/data";
import { cn, formatPercent } from "@/lib/utils";

export function BacktestCard({ bt }: { bt: Backtest }) {
  const statusVariant =
    bt.status === "live"
      ? "success"
      : bt.status === "experimental"
        ? "accent"
        : "muted";
  const positive = bt.returnPct >= 0;
  return (
    <article className="surface surface-hover group relative flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {bt.strategy} · {bt.asset} · {bt.timeframe}
          </div>
          <h3 className="mt-1.5 text-base font-semibold leading-snug">
            {bt.name}
          </h3>
        </div>
        <Badge variant={statusVariant as "success" | "accent" | "muted"}>
          {bt.status}
        </Badge>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {bt.description}
      </p>

      <div className="mt-5 grid grid-cols-4 gap-3 border-t border-border/60 pt-4">
        <Metric label="Return" value={formatPercent(bt.returnPct)} positive={positive} />
        <Metric label="Sharpe" value={bt.sharpe.toFixed(2)} />
        <Metric
          label="Max DD"
          value={`-${bt.maxDrawdownPct.toFixed(1)}%`}
          negative
        />
        <Metric label="Trades" value={bt.trades.toString()} />
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span className="mono">
          {bt.startDate} → {bt.endDate}
        </span>
        <span className="inline-flex items-center gap-1 text-neon-orange opacity-0 transition-opacity group-hover:opacity-100">
          Open report <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </article>
  );
}

function Metric({
  label,
  value,
  positive,
  negative,
}: {
  label: string;
  value: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mono mt-1 text-sm font-semibold tracking-tight",
          positive && "text-neon-green",
          negative && "text-neon-red",
        )}
      >
        {value}
      </div>
    </div>
  );
}
