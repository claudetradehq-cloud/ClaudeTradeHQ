import Image from "next/image";

const heroStats = [
  { label: "Strategies tracked", value: "27" },
  { label: "Backtests published", value: "142" },
  { label: "Live Sharpe (TTM)", value: "1.74" },
  { label: "Max DD (TTM)", value: "-9.8%" },
];

export function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[440px] w-full overflow-hidden md:h-[560px] lg:h-[640px]">
        <Image
          src="/brand/hero.jpg"
          alt="ClaudeTradeHQ — AI-powered trading intelligence"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background via-background/60 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background via-background/70 to-transparent"
          aria-hidden
        />

        {/* The hero is a clean banner image — no overlay panel. The h1 is kept
            for SEO/screen readers only, since the page still needs one. */}
        <h1 className="sr-only">
          Build Profitable MT4 &amp; MT5 EAs with Claude AI
        </h1>
      </div>

      <div className="container-wide mt-10">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="surface surface-hover p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
              <div className="mono mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 glow-divider" />
    </section>
  );
}
