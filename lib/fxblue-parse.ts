/**
 * Shared FX Blue statement parser.
 *
 * The modern www.fxblue.com UI is client-rendered and yields nothing to a plain
 * fetch, but api.fxblue.com/users/<id> still serves a server-rendered statement.
 * This module is imported by BOTH the /fx-blue-links page (at request time, via
 * ISR) and scripts/fetch-fxblue.ts (to refresh the committed fallback), so the
 * scraping rules live in exactly one place.
 *
 * Keep this file free of Next.js and React imports — it has to run under plain
 * Node too.
 *
 * The accounts are PIN-protected on FX Blue. The statement URL accepts the PIN
 * as a `?pin=` query param, which is all the gate needs — no cookie round-trip.
 * The PIN lives in FXBLUE_PIN (env), never in this repo: it is a deliberate gate
 * on the accounts, so it must not reach the browser or a public commit.
 */

/**
 * The view PIN set on the FX Blue accounts. Server-side only — do NOT rename
 * this to NEXT_PUBLIC_*, which would inline it into the client bundle.
 *
 *   local  → .env.local (gitignored); `npm run fxblue` loads it via --env-file
 *   Vercel → Settings → Environment Variables, all environments
 *
 * Unset is not fatal: the fetch just hits the PIN gate, `fetchFxBlueAccount`
 * returns null, and callers fall back to the committed snapshot.
 *
 * Read per call rather than at module scope so the value comes from the running
 * server's environment, not from whatever was present when the module loaded.
 */
const fxBluePin = () => process.env.FXBLUE_PIN?.trim() || undefined;

/**
 * Server-rendered statement URL for an account, PIN attached when configured.
 * Not for public linking — use `publicUrl` on the parsed account for that.
 */
export function statementUrl(id: string): string {
  const url = new URL(`https://api.fxblue.com/users/${id}`);
  const pin = fxBluePin();
  if (pin) url.searchParams.set("pin", pin);
  return url.toString();
}

/**
 * FX Blue answers a PIN-less request with 200 and a short "you need a PIN"
 * page rather than a 4xx, so the only way to tell that case apart from a
 * markup change is to look for the prompt.
 */
function isPinGate(html: string): boolean {
  return /need\s+PIN\s+code|enter a PIN code/i.test(html);
}

/** Accounts published on /fx-blue-links. Add new ones here. */
export const FXBLUE_ACCOUNTS = [
  { id: "ClaudeTradeHQ", label: "ClaudeTradeHQ" },
  { id: "ClaudeTradeHQ_081926", label: "ClaudeTradeHQ_081926" },
  {
    id: "ClaudeTradeHQthe5ers",
    label: "ClaudeTradeHQ - The5ers 10K Challenge",
  },
] as const;

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
): FxBlueAccount {
  const get = (k: string) => p[k] ?? null;
  return {
    id,
    label,
    publicUrl: `https://www.fxblue.com/users/${id}`,
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

/**
 * Fetch and parse one account. Returns null on any network, HTTP, or parse
 * failure so callers can fall back rather than render a half-empty card.
 *
 * `revalidate` is forwarded to Next's fetch cache; plain Node ignores it.
 */
export async function fetchFxBlueAccount(
  account: { id: string; label: string },
  revalidate?: number,
): Promise<FxBlueAccount | null> {
  try {
    const res = await fetch(statementUrl(account.id), {
      headers: { "User-Agent": "Mozilla/5.0 (ClaudeTradeHQ site)" },
      ...(revalidate === undefined ? {} : { next: { revalidate } }),
    } as RequestInit);
    if (!res.ok) return null;

    const html = await res.text();
    if (isPinGate(html)) {
      console.error(
        `FX Blue: ${account.id} is PIN-gated and FXBLUE_PIN is ${
          fxBluePin() ? "set but rejected" : "not set"
        } — serving the cached snapshot instead.`,
      );
      return null;
    }

    const parsed = mapStatement(
      account.id,
      account.label,
      parsePairs(stripTags(html)),
    );

    // Balance is the one field that must be present; if the markup shifts and
    // parsing silently degrades, treat it as a failure instead of publishing
    // a card full of dashes.
    return parsed.balance ? parsed : null;
  } catch {
    return null;
  }
}
