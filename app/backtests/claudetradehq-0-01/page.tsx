import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ClaudeTradeHQ-0.01 — Backtest Report",
  description:
    "Strategy Tester results for ClaudeTradeHQ-0.01: 846 trades, 63.4% win rate, profit factor 1.58, Sharpe 1.56.",
};

export default function CthqBacktestPage() {
  return (
    <section className="container-wide py-14 md:py-20">
      <Link
        href="/downloads"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to downloads
      </Link>

      <header className="mt-6 mb-10 max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          Backtest report
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          ClaudeTradeHQ-0.01
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge variant="success">v0.01 · live</Badge>
          <Badge variant="muted">MT5 · GBPUSD · M30</Badge>
          <Badge variant="muted">Elite ClaudeTrade Bias</Badge>
        </div>
        <p className="mt-5 text-muted-foreground">
          MetaTrader 5 Strategy Tester results for ClaudeTradeHQ-0.01 on
          GBPUSD, M30, run with $1,000 starting capital, 0.01 fixed position
          size, and 100% history quality. Every trade is logged below.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm">
            <a href="/expert-advisors/ClaudeTradeHQ-0.01.ex5" download>
              <Download className="h-3.5 w-3.5" />
              Download MT5 (.ex5)
            </a>
          </Button>
          <Button asChild size="sm" variant="outline">
            <a
              href="https://x.com/ClaudeTradeHQ"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact @ClaudeTradeHQ on X
            </a>
          </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <HeadlineStat label="Net Profit" value="$608.45" tone="positive" />
        <HeadlineStat label="Profit Factor" value="1.58" tone="positive" />
        <HeadlineStat label="Total Trades" value="846" />
        <HeadlineStat label="Win Rate" value="63.4%" tone="positive" />
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <ReportCard title="General information">
          <Row label="History quality" value="100%" />
          <Row label="Bars" value="12,043" />
          <Row label="Ticks" value="1,416,918" />
          <Row label="Symbols" value="1" />
          <Row label="Initial deposit" value="$1,000.00" />
        </ReportCard>

        <ReportCard title="Profit & loss">
          <Row label="Total net profit" value="$608.45" tone="positive" />
          <Row label="Gross profit" value="$1,656.76" tone="positive" />
          <Row label="Gross loss" value="-$1,048.31" tone="negative" />
          <Row label="Profit factor" value="1.58" />
          <Row label="Expected payoff" value="0.72" />
          <Row label="Recovery factor" value="2.79" />
        </ReportCard>

        <ReportCard title="Risk & drawdown">
          <Row label="Balance DD absolute" value="$6.21" />
          <Row
            label="Balance DD maximal"
            value="$93.42 (5.79%)"
            tone="negative"
          />
          <Row
            label="Balance DD relative"
            value="7.55% ($87.16)"
            tone="negative"
          />
          <Row label="Equity DD absolute" value="$140.01" />
          <Row
            label="Equity DD maximal"
            value="$218.13 (20.23%)"
            tone="negative"
          />
          <Row
            label="Equity DD relative"
            value="20.23% ($218.13)"
            tone="negative"
          />
        </ReportCard>

        <ReportCard title="Performance ratios">
          <Row label="Sharpe ratio" value="1.56" tone="positive" />
          <Row label="Z-Score" value="-6.17 (99.74%)" />
          <Row label="AHPR" value="1.0006 (0.06%)" />
          <Row label="GHPR" value="1.0006 (0.06%)" />
          <Row label="LR correlation" value="0.98" tone="positive" />
          <Row label="LR standard error" value="38.63" />
        </ReportCard>

        <ReportCard title="Trade statistics">
          <Row label="Total trades" value="846" />
          <Row label="Long trades" value="449 (64.14% won)" tone="positive" />
          <Row label="Short trades" value="397 (62.47% won)" tone="positive" />
          <Row label="Profit trades" value="536 (63.36%)" tone="positive" />
          <Row label="Loss trades" value="310 (36.64%)" tone="negative" />
          <Row label="Total deals" value="1,692" />
        </ReportCard>

        <ReportCard title="Trade performance">
          <Row
            label="Largest profit trade"
            value="+$12.55"
            tone="positive"
          />
          <Row label="Largest loss trade" value="-$30.31" tone="negative" />
          <Row label="Average profit trade" value="+$3.09" tone="positive" />
          <Row label="Average loss trade" value="-$3.38" tone="negative" />
        </ReportCard>

        <ReportCard title="Consecutive trades" wide>
          <Row
            label="Max consecutive wins"
            value="20 ($69.22)"
            tone="positive"
          />
          <Row
            label="Max consecutive losses"
            value="10 (-$76.62)"
            tone="negative"
          />
          <Row
            label="Maximal consecutive profit"
            value="$72.75 (11 trades)"
            tone="positive"
          />
          <Row
            label="Maximal consecutive loss"
            value="-$93.42 (4 trades)"
            tone="negative"
          />
          <Row label="Average consecutive wins" value="3" />
          <Row label="Average consecutive losses" value="2" />
        </ReportCard>
      </div>

      <div className="surface mt-12 p-6 text-sm text-muted-foreground">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          Disclaimer
        </div>
        <p>
          Backtest results are historical simulations. Past performance is not
          indicative of future results. Run the EA on a demo account before
          risking real capital, and always verify behaviour on your own broker,
          symbol, and execution conditions. Nothing on this page is financial
          advice.
        </p>
      </div>
    </section>
  );
}

function HeadlineStat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative";
}) {
  const toneClass =
    tone === "positive"
      ? "text-neon-green"
      : tone === "negative"
        ? "text-neon-red"
        : "text-foreground";
  return (
    <div className="surface p-5">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`mono mt-2 text-2xl font-semibold tracking-tight ${toneClass}`}>
        {value}
      </div>
    </div>
  );
}

function ReportCard({
  title,
  children,
  wide,
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`surface p-5 ${wide ? "xl:col-span-3" : ""}`}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
        {title}
      </h2>
      <dl className="mt-4 divide-y divide-border/60">{children}</dl>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "negative";
}) {
  const toneClass =
    tone === "positive"
      ? "text-neon-green"
      : tone === "negative"
        ? "text-neon-red"
        : "text-foreground";
  return (
    <div className="flex items-center justify-between gap-4 py-2 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`mono text-right font-medium ${toneClass}`}>{value}</dd>
    </div>
  );
}
