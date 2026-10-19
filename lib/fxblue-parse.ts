/**
 * Shared FX Blue statement parser.
 *
 * www.fxblue.com is client-rendered and yields nothing to a plain fetch.
 * api.fxblue.com/users/<id> is still server-rendered, but each statement asks
 * for a viewer PIN first. Posting the PIN sets an MTIPin cookie; the statement
 * request then sends that cookie.
 *
 * This module is imported by BOTH the /fx-blue-links page (at request time) and
 * scripts/fetch-fxblue.mts (to refresh the committed fallback), so the scraping
 * rules live in exactly one place.
 *
 * Keep this file free of Next.js and React imports — it has to run under plain
 * Node too. The viewer PIN is FXBLUE_PIN, read per call from the environment.
 * It must never be rendered, and it must not be committed.
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
  /**
   * Env var holding this statement's viewer PIN when it is not FXBLUE_PIN.
   * VuCuBit statements can use a different PIN from the ClaudeTradeHQ one.
   */
  pinEnv?: string;
};

/**
 * Viewer PIN for one statement. A panel with `pinEnv` reads that variable.
 * Everything else reads FXBLUE_PIN. Read per call so the value comes from the
 * running server, not from whatever was present when the module loaded.
 */
function fxBluePin(account: { pinEnv?: string }): string | undefined {
  if (account.pinEnv) return process.env[account.pinEnv]?.trim() || undefined;
  return process.env.FXBLUE_PIN?.trim() || undefined;
}

/** Accounts published on /fx-blue-links. Add new ones here. */
export const FXBLUE_ACCOUNTS = [
  {
    id: "ClaudeTradeHQ",
    label: "ClaudeTradeHQ",
    fxBlueId: "VuCuBit_25K",
    publicUrl: "https://www.fxblue.com/users/VuCuBit_25K",
    pinEnv: "FXBLUE_PIN_25K",
  },
  {
    id: "ClaudeTradeHQ_081926",
    label: "ClaudeTradeHQ_081926",
    // FX Blue has no user called ClaudeTradeHQ_081926. The statement this
    // panel links to is published as VuCuBit_Demo_.
    fxBlueId: "VuCuBit_Demo_",
    publicUrl: "https://www.fxblue.com/users/VuCuBit_Demo_",
  },
  {
    id: "ClaudeTradeHQthe5ers",
    label: "ClaudeTradeHQ - The5ers 10K Challenge",
    fxBlueId: "vucubit_The5ers",
    publicUrl: "https://www.fxblue.com/users/vucubit_The5ers",
    pinEnv: "FXBLUE_PIN_THE5ERS",
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cookieFrom(response: Response, id: string): string | null {
  const withGetSetCookie = response.headers as Headers & { getSetCookie?: () => string[] };
  const parts =
    typeof withGetSetCookie.getSetCookie === "function" ? withGetSetCookie.getSetCookie() : [];
  const raw = parts.length > 0 ? parts.join("\n") : (response.headers.get("set-cookie") ?? "");
  // FX Blue lowercases some user ids in the cookie name. Send the name
  // exactly as Set-Cookie wrote it.
  const match = raw.match(new RegExp(`(MTIPin_${escapeRegExp(id)})=([^;\\s]+)`, "i"));
  return match ? `${match[1]}=${match[2]}` : null;
}

async function unlockStatement(id: string, pin: string): Promise<string | null> {
  const response = await fetch(`${FXBLUE_ORIGIN}/_NeedPin.aspx`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (ClaudeTradeHQ site)",
      Referer: `${FXBLUE_ORIGIN}/users/${id}`,
    },
    body: new URLSearchParams({ userid: id, pin }).toString(),
    cache: "no-store",
  });
  if (!response.ok) return null;
  const text = await response.text();
  if (!text.includes("OKAY")) return null;
  return cookieFrom(response, id);
}

/**
 * Fetch and parse one account. Returns null on any network, HTTP, PIN, or
 * parse failure so callers can fall back rather than render a half-empty card.
 *
 * Callers cache the parsed result. The PIN post and the statement GET stay
 * uncached so a fresh cookie is not stored under a shared fetch entry.
 */
export async function fetchFxBlueAccount(
  account: FxBlueSource,
): Promise<FxBlueAccount | null> {
  try {
    const pinName = account.pinEnv ?? "FXBLUE_PIN";
    const pin = fxBluePin(account);
    if (!pin) {
      console.error(
        `FX Blue: ${pinName} is not set — serving the cached snapshot for ${account.id}.`,
      );
      return null;
    }

    const userId = account.fxBlueId ?? account.id;
    const cookie = await unlockStatement(userId, pin);
    if (!cookie) {
      console.error(
        `FX Blue: ${userId} rejected ${pinName} — serving the cached snapshot for ${account.id}.`,
      );
      return null;
    }

    const res = await fetch(`${FXBLUE_ORIGIN}/users/${userId}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (ClaudeTradeHQ site)",
        Cookie: cookie,
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
