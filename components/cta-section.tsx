import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CtaSection() {
  return (
    <section className="container-wide pb-24 pt-8">
      <div className="surface relative overflow-hidden p-8 md:p-14">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-orange/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-neon-blue/20 blur-3xl" aria-hidden />

        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
              Research drop
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Monthly trade journal,{" "}
              <span className="text-gradient-blue">straight to your inbox.</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              One email a month: full PnL breakdown, retired strategies, and the
              hypotheses going into walk-forward next. No upsells.
            </p>
          </div>

          <form className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                placeholder="trader@example.com"
                className="h-12 pl-9"
              />
            </div>
            <Button type="submit" size="lg">
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
