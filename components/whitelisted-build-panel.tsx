import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactEmailBanner } from "@/components/contact-email-banner";

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
            There is no public EA download &mdash; every Expert Advisor is built
            to order. For{" "}
            <span className="text-foreground">funded-account challenges</span>{" "}
            or <span className="text-foreground">live capital</span>, Dan issues
            individual builds with an{" "}
            <span className="text-foreground">account-number whitelist</span>{" "}
            baked into the binary. The EA refuses to trade on any account that
            isn&rsquo;t on the list, so the build can&rsquo;t be reused or
            resold downstream.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Adjustable position sizing, custom risk caps, prop-firm rule limits,
            and broker locks can all be included on request. The concepts come
            from the accounts published on the{" "}
            <Link
              href="/fx-blue-links"
              className="text-neon-orange underline-offset-4 hover:underline"
            >
              FX Blue Links page
            </Link>
            .
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/downloads">How custom builds work</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/fx-blue-links">See the live accounts</Link>
            </Button>
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
              be replied to by email with the build set up for your trading
              account.
            </p>
          </div>
        </aside>
      </div>

      <ContactEmailBanner
        eyebrow="Apply by email"
        note="Send your account number, broker, and account size. Quotes and timelines come back by reply."
        className="mt-8 border-neon-orange/30"
      />
    </section>
  );
}
