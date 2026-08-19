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

/** "+5.0%" → up, "-6.0%" → down. Tints a value without parsing magnitude. */
export function signOf(value: string | null): "up" | "down" | "flat" {
  if (!value) return "flat";
  const v = value.trim();
  if (v.startsWith("-") && !/^-0(\.0+)?%?$/.test(v)) return "down";
  if (v.startsWith("+")) return "up";
  return "flat";
}
