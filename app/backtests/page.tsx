import type { Metadata } from "next";
import { BacktestGrid } from "@/components/backtest-grid";
import { WhitelistedBuildPanel } from "@/components/whitelisted-build-panel";

export const metadata: Metadata = {
  title: "Backtests",
  description:
    "Filterable archive of every strategy backtest the ClaudeTradeHQ desk has run, including retired and experimental work.",
};

export default function BacktestsPage() {
  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-10 max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          Research archive
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Every backtest the desk has shipped.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Filter by strategy family, asset class, timeframe, or live status.
          Retired strategies stay visible — the failures matter as much as the
          winners.
        </p>
      </header>

      <BacktestGrid />

      <div className="mt-12">
        <WhitelistedBuildPanel />
      </div>
    </section>
  );
}
