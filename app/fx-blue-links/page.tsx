import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  ExternalLink,
  RefreshCw,
  Server,
  ShieldCheck,
  Signal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  REVALIDATE_SECONDS,
  getFxBlueAccounts,
  signOf,
  splitAccounts,
  type FxBlueAccount,
} from "@/lib/fxblue";

export const metadata: Metadata = {
  title: "FX Blue Links",
  description:
    "Live FX Blue statistics for the ClaudeTradeHQ MT5 demo and live accounts — running 24/7 on a dedicated VPS.",
};

/** Re-fetch the statements from FX Blue at most twice an hour. */
export const revalidate = 1800;

export default async function FxBlueLinksPage() {
  const { accounts, staleIds } = await getFxBlueAccounts();
  const { demo: demoAccounts, live: liveAccounts } = splitAccounts(accounts);
  const refreshMinutes = Math.round(REVALIDATE_SECONDS / 60);

  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-12 max-w-3xl">
        <Badge variant="accent" className="mb-5">
          FX Blue statistics
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          MT5 account stats &mdash;{" "}
          <span className="text-gradient-orange">streamed from FX Blue.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Every account below runs <strong className="text-foreground">24/7 on a dedicated VPS</strong>{" "}
          and publishes its own statement to FX Blue. These are the raw,
          third-party numbers &mdash; no screenshots, no cherry-picking. Click
          through to any account to inspect the full trade history yourself.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-neon-green">
            <Signal className="h-3 w-3" />
            VPS · 24/7
          </span>
          <span className="mono text-muted-foreground">
            {accounts.length} account{accounts.length === 1 ? "" : "s"} tracked
          </span>
          <span className="inline-flex items-center gap-1.5 text-muted-foreground">
            <RefreshCw className="h-3 w-3" />
            Pulled from FX Blue every {refreshMinutes} min
          </span>
        </div>
      </header>

      <section className="mb-14">
        <SectionHeading
          icon={Server}
          title="Demo accounts"
          count={demoAccounts.length}
          blurb="Forward-testing the current builds on live market data. Same VPS, same execution path as the live accounts — only the capital is simulated."
        />
        {demoAccounts.length > 0 ? (
          <div className="mt-6 space-y-5">
            {demoAccounts.map((a) => (
              <AccountCard
                key={a.id}
                account={a}
                stale={staleIds.includes(a.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState kind="demo" />
        )}
      </section>

      <Separator className="my-14" />

      <section className="mb-14">
        <SectionHeading
          icon={Activity}
          title="Live accounts"
          count={liveAccounts.length}
          blurb="Real capital, real spreads, real slippage. Published here the moment an account goes live."
        />
        {liveAccounts.length > 0 ? (
          <div className="mt-6 space-y-5">
            {liveAccounts.map((a) => (
              <AccountCard
                key={a.id}
                account={a}
                stale={staleIds.includes(a.id)}
              />
            ))}
          </div>
        ) : (
          <EmptyState kind="live" />
        )}
      </section>

      <section className="mb-14 grid gap-5 md:grid-cols-3">
        <div className="surface p-6">
          <Server className="h-5 w-5 text-neon-blue" />
          <h3 className="mt-3 text-sm font-semibold">Always-on VPS</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Every EA runs on a dedicated VPS rather than a desktop, so the
            terminals stay connected through the full trading week. No missed
            entries from a sleeping laptop or a dropped home connection.
          </p>
        </div>
        <div className="surface p-6">
          <ShieldCheck className="h-5 w-5 text-neon-orange" />
          <h3 className="mt-3 text-sm font-semibold">Third-party verified</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            FX Blue reads each statement straight from the MT5 terminal. The
            numbers on this page are pulled from those public statements &mdash;
            I can&rsquo;t edit them, and neither can you.
          </p>
        </div>
        <div className="surface p-6">
          <Activity className="h-5 w-5 text-neon-green" />
          <h3 className="mt-3 text-sm font-semibold">Full history, not highlights</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Each link exposes every closed trade, the drawdown curve, and the
            losing days. Short track records are labelled as such &mdash; read
            the <span className="mono">History</span> figure before drawing
            conclusions.
          </p>
        </div>
      </section>

      <section className="surface flex flex-col gap-6 p-6 md:flex-row md:items-start">
        <AlertTriangle className="h-6 w-6 shrink-0 text-neon-orange" />
        <div className="space-y-3 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            Not financial advice
          </h2>
          <p>
            Demo results do not account for real-money slippage, commission
            tiers, or execution latency, and a short track record is not
            evidence of an edge. Accounts with only weeks of history can and do
            reverse. Past performance does not guarantee future results.
          </p>
          <p>
            Nothing on this page is investment advice. All figures are published
            for research and educational purposes only. Trading leveraged
            products carries a substantial risk of loss.
          </p>
        </div>
      </section>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Want to run the same EA?
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          The public build is a free download. For live capital I issue builds
          whitelisted to your account number.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/downloads">Download the EA</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/backtests">View the backtests</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  count,
  blurb,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: number;
  blurb: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-neon-orange" />
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="mono rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-xs text-muted-foreground">
          {count}
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
    </div>
  );
}

function AccountCard({
  account: a,
  stale = false,
}: {
  account: FxBlueAccount;
  stale?: boolean;
}) {
  const live = a.accountType?.toLowerCase() === "real";

  return (
    <article className="surface surface-hover p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="mono text-xl font-semibold tracking-tight">
              {a.label}
            </h3>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]",
                live
                  ? "border-neon-green/30 bg-neon-green/10 text-neon-green"
                  : "border-neon-blue/30 bg-neon-blue/10 text-neon-blue",
              )}
            >
              {live ? "Live" : "Demo"}
            </span>
            <span className="mono text-xs text-muted-foreground">
              {a.currency}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {a.history ? `${a.history} of history` : "History unavailable"}
            {a.lastUpdate && (
              <>
                {" · "}
                <span className="mono">last update {a.lastUpdate} GMT</span>
              </>
            )}
            {stale && (
              <>
                {" · "}
                <span className="text-neon-orange">
                  cached &mdash; FX Blue unreachable
                </span>
              </>
            )}
          </p>
        </div>
        <Button asChild variant="outline" size="sm">
          <a href={a.publicUrl} target="_blank" rel="noopener noreferrer">
            View on FX Blue
            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
          </a>
        </Button>
      </div>

      {/* Headline performance */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Total return" value={a.totalReturn} tinted />
        <Metric label="Peak drawdown" value={a.peakDrawdown} tinted />
        <Metric label="Profit factor" value={a.profitFactor} />
        <Metric label="Trade win %" value={a.tradeWinPct} />
      </div>

      {/* Account state */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Balance" value={a.balance} />
        <Metric label="Equity" value={a.equity} />
        <Metric label="Closed profit" value={a.closedProfit} tinted />
        <Metric label="Floating P/L" value={a.floatingPl} tinted />
      </div>

      <details className="group mt-4">
        <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-neon-orange">
          Risk &amp; trade detail
          <span className="ml-1.5 inline-block transition-transform group-open:rotate-90">
            &rsaquo;
          </span>
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Risk / reward" value={a.riskRewardRatio} />
          <Metric label="Avg win" value={a.avgWin} tinted />
          <Metric label="Avg loss" value={a.avgLoss} tinted />
          <Metric label="Avg result" value={a.avgResult} tinted />
          <Metric label="Worst day" value={a.worstDay} />
          <Metric label="Worst week" value={a.worstWeek} />
          <Metric label="Worst month" value={a.worstMonth} />
          <Metric label="Risk of ruin" value={a.riskOfRuin} />
          <Metric label="Trades per day" value={a.tradesPerDay} />
          <Metric label="Avg trade length" value={a.tradeLength} />
          <Metric label="Pips" value={a.pips} tinted />
          <Metric label="Monthly return" value={a.monthlyReturn} tinted />
        </div>
      </details>
    </article>
  );
}

function Metric({
  label,
  value,
  tinted = false,
}: {
  label: string;
  value: string | null;
  tinted?: boolean;
}) {
  const sign = tinted ? signOf(value) : "flat";
  const TrendIcon =
    sign === "up" ? ArrowUpRight : sign === "down" ? ArrowDownRight : null;

  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div
        className={cn(
          "mono mt-1 flex items-center gap-1 text-lg",
          sign === "up"
            ? "text-neon-green"
            : sign === "down"
              ? "text-neon-red"
              : "text-foreground",
        )}
      >
        {TrendIcon && <TrendIcon className="h-3.5 w-3.5" />}
        {value ?? "—"}
      </div>
    </div>
  );
}

function EmptyState({ kind }: { kind: "demo" | "live" }) {
  return (
    <div className="surface mt-6 p-6 text-sm text-muted-foreground">
      {kind === "live" ? (
        <>
          No live accounts are published yet. The demo accounts above are
          forward-testing the builds first &mdash; a live statement gets added
          here as soon as one is funded and running on the VPS.
        </>
      ) : (
        <>No demo accounts are currently published.</>
      )}
    </div>
  );
}
