import type { Metadata } from "next";
import { EADownloadCard } from "@/components/ea-download-card";
import { WhitelistedBuildPanel } from "@/components/whitelisted-build-panel";
import { expertAdvisors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Downloads",
  description:
    "Download MetaTrader 4 and MetaTrader 5 Expert Advisors built by the ClaudeTradeHQ desk.",
};

export default function DownloadsPage() {
  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-10 max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          MT4 / MT5 Expert Advisors
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Download the EAs.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Compiled Expert Advisors for MetaTrader 4 and MetaTrader 5. Drop the{" "}
          <span className="mono text-foreground">.ex4</span> or{" "}
          <span className="mono text-foreground">.ex5</span> file into your
          terminal&rsquo;s{" "}
          <span className="mono text-foreground">MQL4/Experts</span> or{" "}
          <span className="mono text-foreground">MQL5/Experts</span> folder,
          restart MetaTrader, then attach to a chart.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {expertAdvisors.map((ea) => (
          <EADownloadCard key={ea.id} ea={ea} />
        ))}
      </div>

      <div className="mt-12">
        <WhitelistedBuildPanel />
      </div>

      <div className="surface mt-8 p-6 text-sm text-muted-foreground">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          Before you run anything live
        </div>
        <p>
          Backtest every EA in the Strategy Tester on the exact symbol,
          timeframe, and broker conditions you intend to trade. Forward-test on
          a demo account before risking real capital. Past performance is not
          indicative of future results. Nothing here is financial advice.
        </p>
      </div>
    </section>
  );
}
