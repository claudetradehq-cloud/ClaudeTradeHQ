import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Homepage announcement that ClaudeTradeHQ sponsors VuCuBit.
 * Sits under the live 40K / 25K / 10K account cards.
 */
export function SponsorPanel() {
  return (
    <section className="container-wide mt-10" aria-labelledby="sponsor-heading">
      <article className="surface p-6 md:p-8">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:text-left">
          <Image
            src="/brand/vco6.webp"
            alt="VuCuBit"
            width={144}
            height={144}
            unoptimized
            className="h-auto w-36 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neon-orange">
              Joint trading corporation
            </p>
            <h2
              id="sponsor-heading"
              className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl"
            >
              ClaudeTradeHQ sponsors VuCuBit
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              ClaudeTradeHQ sponsors VuCuBit. The two desks trade together as
              one joint trading corporation. The MT5 demo statements above are
              the same accounts published in the VuCuBit Demo Vault.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <Button asChild>
                <a
                  href="https://www.vucubit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VuCuBit
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href="https://www.vucubit.com/demo-accounts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo accounts
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              Not financial advice. Demo results leave out real-money slippage
              and execution. Past performance does not guarantee future results.
              Trading leveraged products can result in a substantial loss.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
