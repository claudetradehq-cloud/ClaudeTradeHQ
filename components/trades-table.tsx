import { Badge } from "@/components/ui/badge";
import { recentTrades } from "@/lib/data";
import { cn, formatPercent } from "@/lib/utils";

export function TradesTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border/60">
      <table className="w-full text-sm">
        <thead className="bg-card/40">
          <tr className="text-left text-xs uppercase tracking-widest text-muted-foreground">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Symbol</th>
            <th className="px-4 py-3 font-medium">Side</th>
            <th className="px-4 py-3 font-medium text-right">Entry</th>
            <th className="px-4 py-3 font-medium text-right">Exit</th>
            <th className="px-4 py-3 font-medium text-right">PnL</th>
            <th className="px-4 py-3 font-medium">Strategy</th>
            <th className="px-4 py-3 font-medium">Closed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {recentTrades.map((t) => {
            const positive = t.pnlPct >= 0;
            return (
              <tr
                key={t.id}
                className="transition-colors hover:bg-card/40"
              >
                <td className="px-4 py-3 mono text-xs text-muted-foreground">
                  {t.id}
                </td>
                <td className="px-4 py-3 font-medium">{t.symbol}</td>
                <td className="px-4 py-3">
                  <Badge
                    variant={t.side === "Long" ? "success" : "danger"}
                    className="font-mono"
                  >
                    {t.side}
                  </Badge>
                </td>
                <td className="px-4 py-3 mono text-right">{t.entry}</td>
                <td className="px-4 py-3 mono text-right">{t.exit}</td>
                <td
                  className={cn(
                    "px-4 py-3 mono text-right font-semibold",
                    positive ? "text-neon-green" : "text-neon-red",
                  )}
                >
                  {formatPercent(t.pnlPct)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {t.strategy}
                </td>
                <td className="px-4 py-3 mono text-xs text-muted-foreground">
                  {t.closedAt}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
