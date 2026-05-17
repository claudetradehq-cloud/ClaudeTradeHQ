import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { backtests } from "@/lib/data";
import { BacktestCard } from "@/components/backtest-card";
import { Button } from "@/components/ui/button";

export function FeaturedBacktests() {
  const featured = backtests
    .filter((b) => b.status === "live")
    .sort((a, b) => b.sharpe - a.sharpe)
    .slice(0, 3);

  return (
    <section className="container-wide py-20 md:py-24">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-blue">
            Featured backtests
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Currently live on the desk.
          </h2>
        </div>
        <Button asChild variant="outline">
          <Link href="/backtests">
            All backtests <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((bt) => (
          <BacktestCard key={bt.id} bt={bt} />
        ))}
      </div>
    </section>
  );
}
