import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  Cpu,
  Database,
  GitBranch,
  Hexagon,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who runs the ClaudeTradeHQ desk, the research process, the stack, and the risk disclosure.",
};

const principles = [
  {
    title: "Out-of-sample or it didn't happen",
    body: "No strategy goes live without 12+ months of walk-forward results and 60 days of shadow trading.",
  },
  {
    title: "Retire in public",
    body: "When a strategy stops working, we say so — and we say why. The post-mortem stays on the site.",
  },
  {
    title: "Risk before return",
    body: "Position sizing is volatility-scaled. No leverage cocktails, no martingale, no doubling down on losers.",
  },
  {
    title: "Receipts, always",
    body: "Audited broker statements are available on request for every live track record.",
  },
];

const stack = [
  { icon: Cpu, label: "Python · pandas · numba" },
  { icon: Database, label: "Tick-level data · DuckDB" },
  { icon: GitBranch, label: "Versioned backtests in git" },
  { icon: Hexagon, label: "Recharts · Next.js · Tailwind" },
];

export default function AboutPage() {
  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-12 max-w-3xl">
        <Badge variant="accent" className="mb-5">
          The desk
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          We trade systematic strategies and{" "}
          <span className="text-gradient-orange">show our work.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          ClaudeTradeHQ is a one-desk systematic trading & research practice.
          The goal is to publish the kind of trading content we wished existed
          when we started: real strategies, real PnL, real failures.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <article className="space-y-10">
          <section>
            <h2 className="mb-4 text-xl font-semibold">Principles</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {principles.map((p) => (
                <li key={p.title} className="surface p-5">
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {p.body}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="mb-4 text-xl font-semibold">Research methodology</h2>
            <ol className="space-y-4 text-sm text-muted-foreground">
              <Step
                n="01"
                title="Hypothesis spec"
                body="Every strategy starts as a one-page written hypothesis: the inefficiency, the regime it depends on, and the conditions that would falsify it."
              />
              <Step
                n="02"
                title="Clean-data backtest"
                body="Backtests run on tick data with realistic spreads, slippage, and commissions. Survivorship bias and look-ahead are tested with adversarial date splits."
              />
              <Step
                n="03"
                title="Walk-forward + monte carlo"
                body="Parameters are optimised on rolling windows. We require stable Sharpe across folds and acceptable tail behaviour in 1,000 monte-carlo trade resamples."
              />
              <Step
                n="04"
                title="Paper-trade in shadow mode"
                body="A minimum 60-day live paper run on the same data feed as production. We compare expected slippage to realised slippage before any capital is committed."
              />
              <Step
                n="05"
                title="Capital-allocated live"
                body="Live capital starts at the smallest tradable size and scales only after the live track record matches the walk-forward distribution."
              />
            </ol>
          </section>
        </article>

        <aside className="space-y-5">
          <div className="surface p-6">
            <BookOpen className="h-5 w-5 text-neon-orange" />
            <h3 className="mt-3 text-sm font-semibold">For traders, by a trader</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The desk is run by a former discretionary FX trader who got tired
              of guessing and rebuilt everything systematically.
            </p>
          </div>

          <div className="surface p-6">
            <ShieldCheck className="h-5 w-5 text-neon-blue" />
            <h3 className="mt-3 text-sm font-semibold">Independent verification</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Live broker statements available on request. We&apos;re happy to be
              audited by a third-party that doesn&apos;t sell signals or courses.
            </p>
          </div>

          <div className="surface p-6">
            <h3 className="text-sm font-semibold">Stack</h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              {stack.map((s) => (
                <li key={s.label} className="flex items-center gap-2.5">
                  <s.icon className="h-4 w-4 text-neon-orange" />
                  <span className="text-muted-foreground">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="surface mt-14 flex flex-col gap-6 p-6 md:flex-row md:items-start">
        <AlertTriangle className="h-6 w-6 shrink-0 text-neon-orange" />
        <div className="space-y-3 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            Risk disclosure
          </h2>
          <p>
            Nothing on this site is investment advice. All content is for
            research and educational purposes only. Backtests are hypothetical
            and have inherent limitations — they do not reflect actual trading
            and may not account for the full impact of liquidity, slippage,
            broker risk, or material events.
          </p>
          <p>
            Live track records are real but past performance does not guarantee
            future results. Trading leveraged instruments carries a high risk of
            loss and may not be suitable for all investors. You can lose more
            than your initial deposit.
          </p>
        </div>
      </section>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          See the work, not just the marketing.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/backtests">Browse backtests</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/performance">View live performance</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <span className="mono mt-0.5 inline-flex h-7 w-9 shrink-0 items-center justify-center rounded-md border border-neon-orange/30 bg-neon-orange/10 text-xs font-semibold text-neon-orange">
        {n}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-1">{body}</p>
      </div>
    </li>
  );
}
