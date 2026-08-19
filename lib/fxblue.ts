import raw from "./fxblue-data.json";

/**
 * Snapshot of one FX Blue account. Values are kept as the pre-formatted strings
 * FX Blue publishes so the site never re-derives (and never mis-states) a number.
 * Refresh with `npm run fxblue`.
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

export const fxBlueAccounts = (raw as { accounts: FxBlueAccount[] }).accounts;

const isLive = (a: FxBlueAccount) => a.accountType?.toLowerCase() === "real";

export const demoAccounts = fxBlueAccounts.filter((a) => !isLive(a));
export const liveAccounts = fxBlueAccounts.filter(isLive);

/** "+5.0%" → up, "-6.0%" → down. Used to tint values without parsing magnitude. */
export function signOf(value: string | null): "up" | "down" | "flat" {
  if (!value) return "flat";
  if (value.trim().startsWith("-") && !/^-0(\.0+)?%?$/.test(value.trim()))
    return "down";
  if (value.trim().startsWith("+")) return "up";
  return "flat";
}
