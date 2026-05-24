export type BacktestStatus = "live" | "archived" | "experimental";

export interface Backtest {
  id: string;
  name: string;
  slug: string;
  strategy: "Trend" | "Mean Reversion" | "Breakout" | "Carry" | "ML / RL" | "Bias";
  asset: "FX" | "Crypto" | "Equities" | "Indices" | "Metals";
  timeframe: "M5" | "M15" | "M30" | "H1" | "H4" | "D1";
  returnPct: number;
  sharpe: number;
  sortino?: number;
  maxDrawdownPct: number;
  winRatePct: number;
  trades: number;
  startDate?: string;
  endDate?: string;
  status: BacktestStatus;
  description: string;
}

export const backtests: Backtest[] = [
  {
    id: "bt-cthq-0.01",
    name: "ClaudeTradeHQ-0.01 / GBPUSD M30",
    slug: "claudetradehq-0-01",
    strategy: "Bias",
    asset: "FX",
    timeframe: "M30",
    returnPct: 60.85,
    sharpe: 1.56,
    maxDrawdownPct: 5.79,
    winRatePct: 63.4,
    trades: 846,
    status: "live",
    description:
      "Elite ClaudeTrade bias model with locked defaults. MT5 Strategy Tester run on GBPUSD M30, $1,000 starting capital, 0.01 fixed lot, 100% history quality.",
  },
];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export interface EquityPoint {
  date: string;
  equity: number;
  benchmark: number;
  drawdown: number;
}

export function generateEquityCurve(): EquityPoint[] {
  const rand = seededRandom(42);
  const points: EquityPoint[] = [];
  let equity = 100_000;
  let benchmark = 100_000;
  let peak = equity;
  const start = new Date(2022, 0, 1);
  for (let i = 0; i < 48; i++) {
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);

    const monthlyReturn = (rand() - 0.42) * 0.06 + 0.012;
    const benchReturn = (rand() - 0.48) * 0.05 + 0.007;
    equity = equity * (1 + monthlyReturn);
    benchmark = benchmark * (1 + benchReturn);
    peak = Math.max(peak, equity);
    const drawdown = ((equity - peak) / peak) * 100;

    points.push({
      date: `${months[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`,
      equity: Math.round(equity),
      benchmark: Math.round(benchmark),
      drawdown: Number(drawdown.toFixed(2)),
    });
  }
  return points;
}

export interface MonthlyReturn {
  month: string;
  returnPct: number;
}

export function generateMonthlyReturns(): MonthlyReturn[] {
  const rand = seededRandom(7);
  return months.map((m) => ({
    month: m,
    returnPct: Number(((rand() - 0.4) * 9).toFixed(2)),
  }));
}

export interface AssetAllocation {
  name: string;
  value: number;
  color: string;
}

export const assetAllocation: AssetAllocation[] = [
  { name: "FX", value: 32, color: "#ff7a18" },
  { name: "Crypto", value: 24, color: "#00d4ff" },
  { name: "Indices", value: 22, color: "#22f5a3" },
  { name: "Metals", value: 12, color: "#ffb547" },
  { name: "Equities", value: 10, color: "#6ae6ff" },
];

export interface Trade {
  id: string;
  symbol: string;
  side: "Long" | "Short";
  entry: number;
  exit: number;
  pnlPct: number;
  closedAt: string;
  strategy: string;
}

export const recentTrades: Trade[] = [
  {
    id: "T-10241",
    symbol: "EURUSD",
    side: "Long",
    entry: 1.0824,
    exit: 1.0891,
    pnlPct: 0.62,
    closedAt: "2026-05-16 14:22",
    strategy: "Aurora Trend",
  },
  {
    id: "T-10240",
    symbol: "BTCUSD",
    side: "Long",
    entry: 67_240,
    exit: 71_180,
    pnlPct: 5.86,
    closedAt: "2026-05-16 09:10",
    strategy: "Vector Breakout",
  },
  {
    id: "T-10239",
    symbol: "XAUUSD",
    side: "Short",
    entry: 2_412.4,
    exit: 2_398.1,
    pnlPct: 0.59,
    closedAt: "2026-05-15 22:48",
    strategy: "Orion Trend",
  },
  {
    id: "T-10238",
    symbol: "NQ",
    side: "Long",
    entry: 18_412,
    exit: 18_388,
    pnlPct: -0.13,
    closedAt: "2026-05-15 16:01",
    strategy: "Pulse Breakout",
  },
  {
    id: "T-10237",
    symbol: "SPX",
    side: "Short",
    entry: 5_412,
    exit: 5_368,
    pnlPct: 0.81,
    closedAt: "2026-05-15 13:30",
    strategy: "Lumen Mean-Revert",
  },
  {
    id: "T-10236",
    symbol: "ETHUSD",
    side: "Long",
    entry: 3_204,
    exit: 3_188,
    pnlPct: -0.5,
    closedAt: "2026-05-15 11:08",
    strategy: "Nyx RL Scalper",
  },
  {
    id: "T-10235",
    symbol: "GBPJPY",
    side: "Long",
    entry: 189.42,
    exit: 190.88,
    pnlPct: 0.77,
    closedAt: "2026-05-14 19:54",
    strategy: "Aurora Trend",
  },
];

export interface KpiCard {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  hint?: string;
}

export const headlineKpis: KpiCard[] = [
  {
    label: "Total Return (live)",
    value: "+184.6%",
    delta: "+3.4% MTD",
    trend: "up",
    hint: "Since Jan 2022",
  },
  {
    label: "Sharpe Ratio",
    value: "1.74",
    delta: "+0.08 vs prior Q",
    trend: "up",
    hint: "Rolling 12-month",
  },
  {
    label: "Max Drawdown",
    value: "-9.8%",
    delta: "-1.2% vs benchmark",
    trend: "neutral",
    hint: "Peak to trough",
  },
  {
    label: "Win Rate",
    value: "57.2%",
    delta: "+0.6%",
    trend: "up",
    hint: "All strategies, weighted",
  },
];

export const tickerItems = [
  { symbol: "EURUSD", price: "1.0891", change: 0.18 },
  { symbol: "GBPUSD", price: "1.2724", change: -0.04 },
  { symbol: "USDJPY", price: "154.62", change: 0.31 },
  { symbol: "BTCUSD", price: "71,180", change: 2.46 },
  { symbol: "ETHUSD", price: "3,188", change: -0.62 },
  { symbol: "XAUUSD", price: "2,398.1", change: 0.42 },
  { symbol: "SPX", price: "5,368", change: -0.27 },
  { symbol: "NDX", price: "18,388", change: -0.13 },
  { symbol: "DAX", price: "18,712", change: 0.55 },
  { symbol: "WTI", price: "78.42", change: 1.08 },
];

export const strategies = [
  "Bias",
  "Trend",
  "Mean Reversion",
  "Breakout",
  "Carry",
  "ML / RL",
] as const;

export const assets = [
  "FX",
  "Crypto",
  "Equities",
  "Indices",
  "Metals",
] as const;

export const timeframes = ["M5", "M15", "M30", "H1", "H4", "D1"] as const;

export const statuses: BacktestStatus[] = ["live", "archived", "experimental"];

export interface ExpertAdvisor {
  id: string;
  name: string;
  tagline: string;
  description: string;
  usageNotes?: string;
  contactCTA?: { label: string; url: string };
  backtestSlug?: string;
  strategy: string;
  asset: string;
  timeframe: string;
  version: string;
  mt4File: string | null;
  mt5File: string | null;
  available: boolean;
}

export const expertAdvisors: ExpertAdvisor[] = [
  {
    id: "ea-cthq-0.01",
    name: "ClaudeTradeHQ-0.01",
    tagline: "Elite ClaudeTrade bias EA with locked institutional defaults.",
    description:
      "MT5 Expert Advisor built on an Elite ClaudeTrade bias model. Ships with locked defaults — no user-editable inputs — so every account runs identical risk, timing, and exit logic. Includes session filter, daily-range gate, smart-trail equity exits, and directional drawdown protection.",
    usageNotes:
      "$1,000 starting balance advisable. Position size is hard-coded to 0.01. Let the bot do its job — do not interfere with open positions. IMPORTANT: this EA must be loaded onto a GBPUSD M30 chart, and it's strongly recommended to run MT5 24/7 on a VPS.",
    contactCTA: {
      label: "For adjustable position sizing, contact Dan on X — @ClaudeTradeHQ",
      url: "https://x.com/ClaudeTradeHQ",
    },
    backtestSlug: "claudetradehq-0-01",
    strategy: "Bias",
    asset: "GBPUSD",
    timeframe: "M30",
    version: "0.01",
    mt4File: null,
    mt5File: "ClaudeTradeHQ-0.01.ex5",
    available: true,
  },
];
