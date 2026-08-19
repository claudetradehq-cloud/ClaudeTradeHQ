import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFxBlueAccounts, signOf } from "@/lib/fxblue";

/**
 * Column count tracks the number of accounts so the row never leaves dead
 * space. Written as whole literals so Tailwind can see the class names.
 */
function gridCols(count: number) {
  if (count >= 4) return "grid-cols-2 lg:grid-cols-4";
  if (count === 3) return "grid-cols-2 lg:grid-cols-3";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  return "grid-cols-1";
}

/**
 * Compact version of the /fx-blue-links account cards, sized to sit under the
 * hero banner on the home page.
 *
 * Async server component — shares the ISR-cached FX Blue fetch with
 * /fx-blue-links, so both pages show the same numbers and refresh together.
 * The host route needs its own `revalidate` for that to take effect.
 */
export async function AccountSnapshot() {
  const { accounts, staleIds } = await getFxBlueAccounts();

  if (accounts.length === 0) return null;

  return (
    <div className={cn("grid gap-4", gridCols(accounts.length))}>
      {accounts.map((a) => {
        const live = a.accountType?.toLowerCase() === "real";
        const sign = signOf(a.closedProfit);
        const TrendIcon =
          sign === "up" ? ArrowUpRight : sign === "down" ? ArrowDownRight : null;

        return (
          <Link
            key={a.id}
            href="/fx-blue-links"
            className="surface surface-hover group block p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="mono truncate text-xs uppercase tracking-widest text-muted-foreground"
                title={a.label}
              >
                {a.label}
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]",
                  live
                    ? "border-neon-green/30 bg-neon-green/10 text-neon-green"
                    : "border-neon-blue/30 bg-neon-blue/10 text-neon-blue",
                )}
              >
                {live ? "Live" : "Demo"}
              </span>
            </div>

            <div
              className={cn(
                "mono mt-2 flex items-center gap-1 text-2xl font-semibold tracking-tight md:text-3xl",
                sign === "up"
                  ? "text-neon-green"
                  : sign === "down"
                    ? "text-neon-red"
                    : "text-foreground",
              )}
            >
              {TrendIcon && <TrendIcon className="h-4 w-4 shrink-0" />}
              {a.closedProfit ?? "—"}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[11px] text-muted-foreground">
              <span className="mono">{a.currency} profit</span>
              {a.totalReturn && (
                <>
                  <span className="text-neon-orange">•</span>
                  <span className="mono">{a.totalReturn}</span>
                </>
              )}
              {a.history && (
                <>
                  <span className="text-neon-orange">•</span>
                  <span>{a.history}</span>
                </>
              )}
              {staleIds.includes(a.id) && (
                <>
                  <span className="text-neon-orange">•</span>
                  <span className="text-neon-orange">cached</span>
                </>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
