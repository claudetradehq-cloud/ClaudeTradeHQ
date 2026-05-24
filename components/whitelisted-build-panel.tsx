import { Lock, ShieldCheck } from "lucide-react";

const CONTACT_EMAIL = "claudetradehq@gmail.com";

export function WhitelistedBuildPanel() {
  return (
    <section className="surface overflow-hidden p-6 md:p-8">
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
            download is the free, unlocked demo &mdash; anyone can run it on
            any account. For{" "}
            <span className="text-foreground">funded-account challenges</span>{" "}
            or{" "}
            <span className="text-foreground">live capital</span>, I issue
            individual builds with an{" "}
            <span className="text-foreground">account-number whitelist</span>{" "}
            baked into the binary. The EA refuses to trade on any account that
            isn&rsquo;t on the list, so the build can&rsquo;t be reused or
            resold downstream.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Adjustable position sizing, custom risk caps, and broker locks can
            be included in the whitelisted build on request.
          </p>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Apply by email
            </div>
            <div className="mono mt-2 text-2xl font-semibold tracking-tight text-neon-orange md:text-3xl">
              {CONTACT_EMAIL}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-md border border-border/60 bg-background/40 p-5">
            <ShieldCheck className="h-5 w-5 text-neon-orange" />
            <h3 className="mt-3 text-sm font-semibold">
              What to include in your email
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Your MT4 or MT5 account number is required to whitelist. You will
              be replied via email with your updated EA for your trading
              account.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
