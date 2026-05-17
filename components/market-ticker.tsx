import { tickerItems } from "@/lib/data";
import { cn, formatPercent } from "@/lib/utils";

export function MarketTicker() {
  const doubled = [...tickerItems, ...tickerItems];
  return (
    <div className="relative overflow-hidden border-b border-border/60 bg-black/40">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {doubled.map((item, i) => {
          const positive = item.change >= 0;
          return (
            <div
              key={`${item.symbol}-${i}`}
              className="mono mx-6 inline-flex items-center gap-2 text-xs"
            >
              <span className="text-muted-foreground">{item.symbol}</span>
              <span className="text-foreground">{item.price}</span>
              <span
                className={cn(
                  positive ? "text-neon-green" : "text-neon-red",
                )}
              >
                {formatPercent(item.change)}
              </span>
              <span className="text-muted-foreground/40">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
