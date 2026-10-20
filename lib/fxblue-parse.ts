/**
 * Shared FX Blue statement parser.
 *
 * www.fxblue.com is client-rendered and yields nothing to a plain fetch.
 * api.fxblue.com/users/<id> is server-rendered. The demo statements are
 * public, so the fetch is a plain GET and the panel button links to the same
 * user on www.fxblue.com.
 *
 * This module is imported by BOTH the /fx-blue-links page (at request time) and
 * scripts/fetch-fxblue.mts (to refresh the committed fallback), so the scraping
 * rules live in exactly one place.
 *
 * Keep this file free of Next.js and React imports — it has to run under plain
 * Node too.
 */

export type FxBlueSource = {
  id: string;
  label: string;
  /**
   * FX Blue user id when the published statement is no longer under `id`.
   * The panel id stays put so the label and the fallback snapshot still match.
   */
  fxBlueId?: string;
  publicUrl?: string;
};

/** Accounts published on /fx-blue-links, in the same order as vucubit.com/demo-accounts. */
export const FXBLUE_ACCOUNTS = [
  {
    id: "VuCuBit_40K_MT5Demo1",
    label: "40K Start MT5 Demo",
    publicUrl: "https://www.fxblue.com/users/VuCuBit_40K_MT5Demo1",
  },
  {
    id: "VuCuBit_25K_MT5Demo1",
    label: "25K Start MT5 Demo",
    publicUrl: "https://www.fxblue.com/users/VuCuBit_25K_MT5Demo1",
  },
  {
    id: "VuCuBit_10K_The5ers1",
    label: "10K Start MT5 Demo",
    publicUrl: "https://www.fxblue.com/users/VuCuBit_10K_The5ers1",
  },
] as const satisfies readonly FxBlueSource[];

/**
 * Snapshot of one FX Blue account. Values stay as the pre-formatted strings FX
 * Blue publishes so the site never re-derives (and never mis-states) a number.
 */
export type FxBlueAccount = {
  id: string;
  label: string;
  publicUrl: string;
  accountType: string | null;
  currency: string;
  balance: string | null;
  equity: string | null;
  floatingPl: string | null;
  closedProfit: string | null;
  totalReturn: string | null;
  monthlyReturn: string | null;
  weeklyReturn: string | null;
  peakDrawdown: string | null;
  tradeWinPct: string | null;
  profitFactor: string | null;
  pips: string | null;
  tradesPerDay: string | null;
  history: string | null;
  riskRewardRatio: string | null;
  worstDay: string | null;
  worstWeek: string | null;
  worstMonth: string | null;
  riskOfRuin: string | null;
  tradeLength: string | null;
  avgResult: string | null;
  avgWin: string | null;
  avgLoss: string | null;
  lastUpdate: string | null;
};

export function stripTags(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"');
}

/**
 * The statement renders each metric as a "Label:" line followed by its value on
 * the next non-empty line. Flatten those into a lookup.
 */
export function parsePairs(text: string): Record<string, string> {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/[ \t ]+/g, " ").trim())
    .filter(Boolean);

  const pairs: Record<string, string> = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(.+?):$/);
    const next = lines[i + 1];
    if (m && next && !next.endsWith(":")) {
      const key = m[1].trim();
      if (!(key in pairs)) pairs[key] = next;
    }
  }
  return pairs;
}

export function mapStatement(
  id: string,
  label: string,
  p: Record<string, string>,
  publicUrl?: string,
): FxBlueAccount {
  const get = (k: string) => p[k] ?? null;
  return {
    id,
    label,
    publicUrl: publicUrl ?? `https://www.fxblue.com/users/${id}`,
    accountType: get("Account type"),
    currency: "USD",
    balance: get("Balance"),
    equity: get("Equity"),
    floatingPl: get("Floating P/L"),
    closedProfit: get("Closed profit"),
    totalReturn: get("Total return"),
    monthlyReturn: get("Monthly return"),
    weeklyReturn: get("Weekly return"),
    peakDrawdown: get("Peak drawdown"),
    tradeWinPct: get("Trade win %"),
    profitFactor: get("Profit factor"),
    pips: get("Pips"),
    tradesPerDay: get("Trades per day"),
    history: get("History"),
    riskRewardRatio: get("Risk/reward ratio"),
    worstDay: get("Worst day"),
    worstWeek: get("Worst week"),
    worstMonth: get("Worst month"),
    riskOfRuin: get("Risk of ruin"),
    tradeLength: get("Trade length"),
    avgResult: get("Avg result"),
    avgWin: get("Avg win"),
    avgLoss: get("Avg loss"),
    lastUpdate: get("Last update"),
  };
}

const FXBLUE_ORIGIN = "https://api.fxblue.com";

/**
 * Fetch and parse one public statement. Returns null on any network, HTTP, or
 * parse failure so callers can fall back rather than render a half-empty card.
 * A "Need PIN code" page is a failure: these statements are public.
 *
 * Callers cache the parsed result. The statement GET stays uncached here.
 */
export async function fetchFxBlueAccount(
  account: FxBlueSource,
): Promise<FxBlueAccount | null> {
  try {
    const userId = account.fxBlueId ?? account.id;
    const res = await fetch(`${FXBLUE_ORIGIN}/users/${userId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (ClaudeTradeHQ site)",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;

    const html = await res.text();
    if (/Need PIN code/i.test(html)) return null;

    const parsed = mapStatement(
      account.id,
      account.label,
      parsePairs(stripTags(html)),
      account.publicUrl,
    );

    // Balance is the one field that must be present; if the markup shifts and
    // parsing silently degrades, treat it as a failure instead of publishing
    // a card full of dashes.
    return parsed.balance ? parsed : null;
  } catch {
    return null;
  }
}
