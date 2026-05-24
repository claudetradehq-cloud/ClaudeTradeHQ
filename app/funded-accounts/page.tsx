import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Flag,
  Gauge,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Funded Accounts",
  description:
    "Prop firm challenges and funded trading accounts run by ClaudeTradeHQ — starting with the FundedNext challenge.",
};

const phases = [
  {
    n: "01",
    icon: Target,
    title: "Phase 1 — Evaluation",
    body: "Hit the profit target without breaching the daily or overall drawdown. Time limits vary by firm; ClaudeTradeHQ-0.01 risk settings are designed to stay well inside typical 5% daily / 10% overall caps.",
  },
  {
    n: "02",
    icon: Gauge,
    title: "Phase 2 — Verification",
    body: "A second evaluation at a reduced profit target. Same drawdown rules. The EA runs identically — the goal here is consistency, not heroics.",
  },
  {
    n: "03",
    icon: Trophy,
    title: "Funded",
    body: "Trade the firm's capital and split the profits. Withdrawals on a fixed cycle. Same risk framework, same EA configuration, same magic number.",
  },
];

const firms = [
  {
    name: "FundedNext",
    status: "In progress",
    statusTone: "orange" as const,
    blurb:
      "Currently running ClaudeTradeHQ-0.01 through the FundedNext evaluation on GBPUSD M30. Live progress and pass/fail outcome will be published here.",
    site: "https://fundednext.com",
  },
  {
    name: "FTMO",
    status: "Planned",
    statusTone: "muted" as const,
    blurb:
      "Once the FundedNext run is complete, the same EA configuration will be put through an FTMO challenge for a side-by-side comparison.",
    site: null,
  },
  {
    name: "The Funded Trader",
    status: "Planned",
    statusTone: "muted" as const,
    blurb:
      "A third prop firm run is planned to compare drawdown rules, scaling plans, and payout cycles across vendors.",
    site: null,
  },
];

const guardrails = [
  "Hard stop loss on every position — no exception.",
  "Daily equity cap below the firm's daily drawdown limit, with margin.",
  "Magic number isolates the EA so no manual trade contaminates the challenge.",
  "Single symbol, single timeframe — GBPUSD M30 only.",
];

export default function FundedAccountsPage() {
  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-12 max-w-3xl">
        <Badge variant="accent" className="mb-5">
          Prop firm challenges
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Funded accounts &mdash;{" "}
          <span className="text-gradient-orange">live, in public.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We&rsquo;re running ClaudeTradeHQ-0.01 through prop firm evaluations
          and publishing every step. First up: the FundedNext challenge on
          GBPUSD M30. Pass or fail, the result lands on this page.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-neon-orange/30 bg-neon-orange/10 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-neon-orange">
            Status: setting up
          </span>
          <span className="mono text-muted-foreground">
            Updated 2026-05-24
          </span>
        </div>
      </header>

      <section className="mb-14">
        <div className="mb-5 flex items-center gap-2">
          <Flag className="h-5 w-5 text-neon-orange" />
          <h2 className="text-xl font-semibold">Featured: FundedNext</h2>
        </div>
        <div className="surface p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold tracking-tight">
                FundedNext Stellar Challenge
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Two-phase evaluation. ClaudeTradeHQ-0.01 will be attached to a
                GBPUSD M30 chart for the full evaluation window. Account size,
                target percentages, and final outcome will be filled in once the
                challenge is live.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://fundednext.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                fundednext.com
              </a>
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Account size" value="TBD" />
            <Stat label="Phase 1 target" value="TBD" />
            <Stat label="Daily drawdown" value="TBD" />
            <Stat label="Overall drawdown" value="TBD" />
          </div>
        </div>
      </section>

      <Separator className="my-14" />

      <section className="mb-14">
        <h2 className="mb-5 text-xl font-semibold">How a challenge works</h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {phases.map((p) => (
            <li key={p.n} className="surface p-5">
              <div className="flex items-center gap-3">
                <span className="mono inline-flex h-7 w-9 items-center justify-center rounded-md border border-neon-orange/30 bg-neon-orange/10 text-xs font-semibold text-neon-orange">
                  {p.n}
                </span>
                <p.icon className="h-4 w-4 text-neon-blue" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="mb-5 text-xl font-semibold">Firms on the roadmap</h2>
          <ul className="space-y-3">
            {firms.map((f) => (
              <li key={f.name} className="surface surface-hover p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold">{f.name}</h3>
                  <span
                    className={
                      f.statusTone === "orange"
                        ? "rounded-full border border-neon-orange/30 bg-neon-orange/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-neon-orange"
                        : "rounded-full border border-border/60 bg-muted/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    }
                  >
                    {f.status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.blurb}</p>
                {f.site && (
                  <a
                    href={f.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-xs font-medium text-neon-blue hover:underline"
                  >
                    {f.site.replace(/^https?:\/\//, "")}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-5">
          <div className="surface p-6">
            <ShieldCheck className="h-5 w-5 text-neon-blue" />
            <h3 className="mt-3 text-sm font-semibold">Why prop firms?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A funded account is the cleanest way to scale a small, disciplined
              edge into meaningful capital without risking personal funds beyond
              the evaluation fee.
            </p>
          </div>

          <div className="surface p-6">
            <CheckCircle2 className="h-5 w-5 text-neon-orange" />
            <h3 className="mt-3 text-sm font-semibold">Guardrails for the run</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {guardrails.map((g) => (
                <li key={g} className="flex gap-2">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-neon-orange" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="surface flex flex-col gap-6 p-6 md:flex-row md:items-start">
        <AlertTriangle className="h-6 w-6 shrink-0 text-neon-orange" />
        <div className="space-y-3 text-sm text-muted-foreground">
          <h2 className="text-base font-semibold text-foreground">
            Not financial advice
          </h2>
          <p>
            Prop firm challenges involve a non-refundable evaluation fee.
            Passing an evaluation does not guarantee future profitability on the
            funded phase. Drawdown rules, payout cycles, and trading conditions
            differ across firms &mdash; read each firm&rsquo;s terms in full
            before signing up.
          </p>
          <p>
            Nothing on this page is investment advice. All results published
            here are for research and educational purposes only.
          </p>
        </div>
      </section>

      <div className="mt-14 flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Want the EA running on your own challenge?
        </h2>
        <p className="max-w-xl text-sm text-muted-foreground">
          Grab the compiled binary from the downloads page and run it on a
          GBPUSD M30 chart. For adjustable position sizing, DM on X.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/downloads">Download the EA</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/backtests/claudetradehq-0-01">View the backtest</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border/60 bg-background/40 p-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mono mt-1 text-lg text-foreground">{value}</div>
    </div>
  );
}
