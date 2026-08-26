import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  Gauge,
  LineChart,
  Lock,
  MessagesSquare,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Timer,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ContactEmailBanner } from "@/components/contact-email-banner";
import { WhitelistedBuildPanel } from "@/components/whitelisted-build-panel";
import { expertAdvisors } from "@/lib/data";

export const metadata: Metadata = {
  title: "Custom EA Builds",
  description:
    "Have Dan build you a custom MT4/MT5 Expert Advisor on the same concepts running live on the ClaudeTradeHQ FX Blue accounts — whitelisted to your account number.",
};

/** The engine parts every custom build is assembled from. */
const concepts = [
  {
    icon: Clock3,
    title: "Session filter",
    body: "Trades only inside the hours the edge actually shows up in. No thin-liquidity entries at 2am, no rollover-spread donations.",
  },
  {
    icon: Gauge,
    title: "Daily-range gate",
    body: "Measures how much of the day's expected range is already spent before it commits. Chasing an exhausted move is how most EAs bleed.",
  },
  {
    icon: LineChart,
    title: "Smart-trail equity exits",
    body: "Exits are managed on equity, not on a static take-profit. Open profit gets locked in progressively instead of round-tripping.",
  },
  {
    icon: ShieldCheck,
    title: "Directional drawdown protection",
    body: "When the book is leaning the wrong way, exposure is cut before the account is. Hard caps, no averaging down, no martingale.",
  },
  {
    icon: SlidersHorizontal,
    title: "Risk tuned to your balance",
    body: "Position sizing, daily loss limits, and max-exposure rules are set for your actual account size — including prop-firm rule sets.",
  },
  {
    icon: Lock,
    title: "Whitelisted to your account",
    body: "Your account number is compiled into the binary. The build refuses to trade anywhere else, so it can't be copied, leaked, or resold.",
  },
];

const steps = [
  {
    n: "01",
    title: "Email the brief",
    body: "Tell Dan your account size, broker, symbol(s), and what you want the EA to do — or just say \"the one on the FX Blue accounts, sized for me\".",
  },
  {
    n: "02",
    title: "Scope and honest answer",
    body: "You get a written scope back: what's buildable, what isn't, what it'll cost you in drawdown, and how long it takes. If the idea won't work, you'll be told before any money moves.",
  },
  {
    n: "03",
    title: "Build on proven concepts",
    body: "Your EA is assembled from the components already running on the published accounts — not written from scratch against an untested idea.",
  },
  {
    n: "04",
    title: "Backtest and forward-test",
    body: "Strategy Tester on your symbol, your timeframe, your broker conditions — then a demo forward-test on the VPS before it sees a cent of real capital.",
  },
  {
    n: "05",
    title: "Whitelisted delivery",
    body: "The compiled build lands in your inbox locked to your account number, with the chart setup, input sheet, and VPS guidance to run it 24/7.",
  },
];

const briefChecklist = [
  "MT4 or MT5, and your broker",
  "Account number(s) to whitelist — demo or live",
  "Account size and the currency it's denominated in",
  "Symbol(s) and timeframe you want traded",
  "Risk appetite: max drawdown you can actually stomach",
  "Any prop-firm rules the EA has to respect (daily loss, max loss, news windows)",
];

export default function CustomEAPage() {
  const reference = expertAdvisors[0];

  return (
    <section className="container-wide py-14 md:py-20">
      <header className="mb-10 max-w-3xl">
        <Badge variant="accent" className="mb-5">
          Custom EA builds
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          Have Dan build{" "}
          <span className="text-gradient-orange">your</span> Expert Advisor.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          Not an off-the-shelf download. Dan customises an EA for your account
          using the exact concepts running the MT5 accounts published on the{" "}
          <Link
            href="/fx-blue-links"
            className="text-neon-orange underline-offset-4 hover:underline"
          >
            FX Blue Links page
          </Link>{" "}
          &mdash; the same session filter, daily-range gate, smart-trail equity
          exits, and drawdown protection, re-tuned to your balance, your broker,
          and your symbol.
        </p>
        <p className="mt-4 text-muted-foreground">
          You can read those accounts before you speak to anyone. FX Blue pulls
          the statements straight out of the terminals, so the track record
          isn&rsquo;t a screenshot in a sales page &mdash; it&rsquo;s a live
          statement you can audit trade by trade. That is the whole pitch: see
          the engine working in public first, then have it built around your
          account.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/fx-blue-links">
              See the live FX Blue accounts
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/backtests">View the backtests</Link>
          </Button>
        </div>
      </header>

      <ContactEmailBanner eyebrow="Start your build — email Dan" />

      <section className="mt-14">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
            What gets built into it
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            The concepts behind the published accounts.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every custom build is assembled from components that are already
            running live on a VPS, 24/7, with their statements published. You
            choose which ones your account needs.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((c) => (
            <div key={c.title} className="surface surface-hover p-6">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neon-orange/30 bg-neon-orange/10 text-neon-orange">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-[1.4fr_1fr] md:items-start">
        <article className="surface p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="muted">Reference build</Badge>
            <span className="mono text-xs text-muted-foreground">
              {reference.strategy} · {reference.asset} · {reference.timeframe}
            </span>
          </div>
          <h2 className="mt-3 text-xl font-semibold">{reference.name}</h2>
          <p className="mt-1 text-sm text-neon-orange/90">
            {reference.tagline}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            {reference.description}
          </p>
          {reference.usageNotes && (
            <div className="mt-4 rounded-md border border-neon-orange/30 bg-neon-orange/5 p-3 text-xs text-foreground/90">
              {reference.usageNotes}
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-3 border-t border-border/60 pt-5">
            {reference.backtestSlug && (
              <Button asChild size="sm" variant="outline">
                <Link href={`/backtests/${reference.backtestSlug}`}>
                  <BarChart3 className="h-3.5 w-3.5" />
                  Read the backtest report
                </Link>
              </Button>
            )}
            <Button asChild size="sm" variant="outline">
              <Link href="/fx-blue-links">
                <LineChart className="h-3.5 w-3.5" />
                See it running live
              </Link>
            </Button>
          </div>
        </article>

        <aside className="space-y-4">
          <div className="surface p-6">
            <Server className="h-5 w-5 text-neon-blue" />
            <h3 className="mt-3 text-sm font-semibold">Built to run 24/7</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Every account on the{" "}
              <Link
                href="/fx-blue-links"
                className="text-neon-orange underline-offset-4 hover:underline"
              >
                FX Blue Links page
              </Link>{" "}
              runs on a dedicated VPS. Your build ships with the same setup
              guidance so it isn&rsquo;t sitting on a sleeping laptop when the
              London open arrives.
            </p>
          </div>
          <div className="surface p-6">
            <Wrench className="h-5 w-5 text-neon-orange" />
            <h3 className="mt-3 text-sm font-semibold">Revisions included</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Brokers differ. If the forward-test shows your spread, fill, or
              swap profile needs the inputs re-tuned, that gets fixed as part of
              the build &mdash; not sold back to you as version two.
            </p>
          </div>
          <div className="surface p-6">
            <Timer className="h-5 w-5 text-neon-green" />
            <h3 className="mt-3 text-sm font-semibold">
              No black-box handover
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You get the chart setup, the input sheet, and a plain-English
              explanation of what the EA does and when it deliberately stays
              flat.
            </p>
          </div>
        </aside>
      </section>

      <Separator className="my-14" />

      <section>
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
            How a build works
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
            From first email to a whitelisted EA.
          </h2>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="surface p-6">
              <span className="mono inline-flex h-7 w-9 items-center justify-center rounded-md border border-neon-blue/30 bg-neon-blue/10 text-xs font-semibold text-neon-blue">
                {s.n}
              </span>
              <h3 className="mt-4 text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 grid gap-5 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div className="surface p-6 md:p-8">
          <MessagesSquare className="h-5 w-5 text-neon-orange" />
          <h2 className="mt-3 text-xl font-semibold">
            What to put in your first email
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The more of this you include, the faster you get a real answer
            instead of a round of questions.
          </p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {briefChecklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-orange" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface p-6 md:p-8">
          <ShieldCheck className="h-5 w-5 text-neon-blue" />
          <h2 className="mt-3 text-xl font-semibold">
            What happens to your details
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account number is used for one thing: compiling the whitelist
            into your build. It isn&rsquo;t published, resold, or added to a
            mailing list, and it gives nobody access to your account &mdash; an
            account number alone can&rsquo;t log in or trade.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Replies come from the same address shown above. If an idea
            can&rsquo;t be built, or can&rsquo;t be built safely on your account
            size, you&rsquo;ll hear that instead of a sales pitch.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-border/60 pt-5">
            <Button asChild size="sm" variant="outline">
              <Link href="/fx-blue-links">
                <LineChart className="h-3.5 w-3.5" />
                Check the live accounts first
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-14">
        <WhitelistedBuildPanel />
      </div>

      <div className="surface mt-8 p-6 text-sm text-muted-foreground">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
          Before you run anything live
        </div>
        <p>
          No EA is a guarantee, and a custom build is not a promise of profit.
          Every build is backtested and demo-forward-tested on your own broker
          conditions first, and you should keep it on demo until you are
          satisfied with what you see. Past performance &mdash; backtested or
          live &mdash; is not indicative of future results. Trading leveraged
          products carries a substantial risk of loss. Nothing on this page is
          financial advice.
        </p>
      </div>
    </section>
  );
}
