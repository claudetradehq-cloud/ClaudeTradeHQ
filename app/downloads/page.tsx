import type { Metadata } from "next";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EADownloadCard } from "@/components/ea-download-card";
import { expertAdvisors } from "@/lib/data";

const CONTACT_EMAIL = "claudetradehq@gmail.com";

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

      <section className="surface mt-12 overflow-hidden p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
              <Lock className="h-3.5 w-3.5" />
              EAs for funded accounts &amp; live trading
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Want a build locked to your trading account?
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              The public{" "}
              <span className="mono text-foreground">ClaudeTradeHQ-0.01</span>{" "}
              download above is the free, unlocked demo &mdash; anyone can run
              it on any account. For{" "}
              <span className="text-foreground">funded-account challenges</span>{" "}
              or{" "}
              <span className="text-foreground">live capital</span>, I issue
              individual builds with an{" "}
              <span className="text-foreground">
                account-number whitelist
              </span>{" "}
              baked into the binary. The EA refuses to trade on any account
              that isn&rsquo;t on the list, so the build can&rsquo;t be reused
              or resold downstream.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Adjustable position sizing, custom risk caps, and broker locks
              can be included in the whitelisted build on request.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${CONTACT_EMAIL}?subject=Whitelisted%20EA%20request`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Apply via email
                </a>
              </Button>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mono text-sm text-neon-blue hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-md border border-border/60 bg-background/40 p-5">
              <ShieldCheck className="h-5 w-5 text-neon-orange" />
              <h3 className="mt-3 text-sm font-semibold">
                What to include in your email
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon-orange" />
                  <span>
                    MT5 <span className="mono text-foreground">account number(s)</span>{" "}
                    to whitelist
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon-orange" />
                  <span>
                    Broker name and server (e.g.{" "}
                    <span className="mono text-foreground">BlackBull-Live</span>)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon-orange" />
                  <span>
                    Account type &mdash; funded challenge, funded live, or
                    personal live
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon-orange" />
                  <span>Preferred lot size or risk per trade</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

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
