import snapshot from "./fxblue-data.json";
import {
  FXBLUE_ACCOUNTS,
  fetchFxBlueAccount,
  type FxBlueAccount,
} from "./fxblue-parse";

export type { FxBlueAccount };

/** How long a fetched statement is cached before the next request refetches. */
export const REVALIDATE_SECONDS = 1800;

const fallback = (snapshot as { accounts: FxBlueAccount[] }).accounts;

export type FxBlueResult = {
  accounts: FxBlueAccount[];
  /** ids served from the committed snapshot because the live fetch failed. */
  staleIds: string[];
};

/**
 * Live stats for every tracked account, refetched at most once per
 * REVALIDATE_SECONDS. If FX Blue is unreachable for an account we serve the
 * committed snapshot from `npm run fxblue` and report it as stale so the page
 * can label it rather than passing old numbers off as current.
 */
export async function getFxBlueAccounts(): Promise<FxBlueResult> {
  const results = await Promise.all(
    FXBLUE_ACCOUNTS.map((a) => fetchFxBlueAccount(a, REVALIDATE_SECONDS)),
  );

  const accounts: FxBlueAccount[] = [];
  const staleIds: string[] = [];

  results.forEach((live, i) => {
    const meta = FXBLUE_ACCOUNTS[i];
    if (live) {
      accounts.push(live);
      return;
    }
    const cached = fallback.find((a) => a.id === meta.id);
    if (cached) {
      accounts.push(cached);
      staleIds.push(meta.id);
    }
  });

  return { accounts, staleIds };
}

const isLive = (a: FxBlueAccount) => a.accountType?.toLowerCase() === "real";

export function splitAccounts(accounts: FxBlueAccount[]) {
  return {
    demo: accounts.filter((a) => !isLive(a)),
    live: accounts.filter(isLive),
  };
}

/**
 * "26,787.95" → 26787.95, "-596.86" → -596.86, "-" / null → null.
 *
 * The cards render FX Blue's own strings verbatim; only the chart needs
 * numbers, so parsing lives here rather than in the shared statement type.
 */
export function parseAmount(value: string | null): number | null {
  if (!value) return null;
  const cleaned = value.replace(/[^0-9.+-]/g, "");
  if (!/\d/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Axis ticks need a short label; the full one stays in the tooltip/table. */
const MAX_TICK_CHARS = 22;

export function shortAccountLabel(label: string): string {
  if (label.length <= MAX_TICK_CHARS) return label;
  const stripped = label.replace(/^ClaudeTradeHQ[\s_·-]*/i, "").trim();
  const best = stripped && stripped.length < label.length ? stripped : label;
  return best.length <= MAX_TICK_CHARS
    ? best
    : `${best.slice(0, MAX_TICK_CHARS - 1).trimEnd()}…`;
}

/** One account's capital, ready to plot. */
export type FxBlueCapitalPoint = {
  id: string;
  label: string;
  shortLabel: string;
  balance: number;
  equity: number;
  floatingPl: number | null;
  live: boolean;
  stale: boolean;
};

/**
 * Chart rows derived from the same fetch the cards use — no second request, so
 * the chart can never disagree with the panel above it. Accounts whose balance
 * or equity doesn't parse are dropped rather than plotted as zero.
 */
export function toCapitalSeries(
  accounts: FxBlueAccount[],
  staleIds: string[] = [],
): FxBlueCapitalPoint[] {
  return accounts.flatMap((a) => {
    const balance = parseAmount(a.balance);
    const equity = parseAmount(a.equity);
    if (balance === null || equity === null) return [];
    return [
      {
        id: a.id,
        label: a.label,
        shortLabel: shortAccountLabel(a.label),
        balance,
        equity,
        floatingPl: parseAmount(a.floatingPl),
        live: isLive(a),
        stale: staleIds.includes(a.id),
      },
    ];
  });
}

/** "+5.0%" → up, "-6.0%" → down. Tints a value without parsing magnitude. */
export function signOf(value: string | null): "up" | "down" | "flat" {
  if (!value) return "flat";
  const v = value.trim();
  if (v.startsWith("-") && !/^-0(\.0+)?%?$/.test(v)) return "down";
  if (v.startsWith("+")) return "up";
  return "flat";
}
