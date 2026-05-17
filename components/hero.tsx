import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XIcon } from "@/components/icons/x-icon";

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

        <div className="absolute inset-0 flex items-start">
          <div className="container-wide pt-4 md:pt-6">
            <div className="ml-auto md:ml-[50%] max-w-xl rounded-2xl border border-neon-orange/20 bg-background/55 p-5 shadow-2xl shadow-black/40 backdrop-blur-md md:p-6">
              <Badge variant="accent">
                <Sparkles className="mr-1.5 h-3 w-3" />
                CLAUDE AI + MT4 / MT5
              </Badge>

              <h1 className="mt-4 text-balance text-2xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-[2.75rem]">
                Build Profitable{" "}
                <span className="text-gradient-orange text-glow-orange">
                  MT4 &amp; MT5 EAs
                </span>{" "}
                with Claude AI
              </h1>

              <p className="mt-3 text-sm text-foreground/85 md:text-base">
                No coding experience needed{" "}
                <span className="text-neon-orange">•</span> Claude Code{" "}
                <span className="text-neon-orange">•</span> VS Code{" "}
                <span className="text-neon-orange">•</span> MT4 / MT5
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <Button asChild size="lg">
                  <Link href="/backtests">
                    Browse Backtests
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a
                    href="https://youtube.com/@claudetradehq"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Youtube className="h-4 w-4 text-neon-red" />
                    Watch Tutorials on YouTube
                  </a>
                </Button>
              </div>

              <a
                href="https://x.com/ClaudeTradeHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-neon-orange"
              >
                <XIcon className="h-3.5 w-3.5" />
                Follow{" "}
                <span className="font-medium text-foreground">
                  @ClaudeTradeHQ
                </span>{" "}
                on X
                <ArrowRight className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>
        </div>
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
