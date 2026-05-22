export type BacktestStatus = "live" | "archived" | "experimental";

export interface Backtest {
  id: string;
  name: string;
  slug: string;
  strategy: "Trend" | "Mean Reversion" | "Breakout" | "Carry" | "ML / RL";
  asset: "FX" | "Crypto" | "Equities" | "Indices" | "Metals";
  timeframe: "M5" | "M15" | "H1" | "H4" | "D1";
  returnPct: number;
  sharpe: number;
  sortino: number;
  maxDrawdownPct: number;
  winRatePct: number;
  trades: number;
  startDate: string;
  endDate: string;
  status: BacktestStatus;
  description: string;
}

export const backtests: Backtest[] = [
  {
    id: "bt-001",
    name: "Aurora Trend / EURUSD H1",
    slug: "aurora-trend-eurusd-h1",
    strategy: "Trend",
    asset: "FX",
    timeframe: "H1",
    returnPct: 42.6,
    sharpe: 1.82,
    sortino: 2.41,
    maxDrawdownPct: 8.4,
    winRatePct: 58.1,
    trades: 412,
    startDate: "2022-01-03",
    endDate: "2025-12-30",
    status: "live",
    description:
      "Adaptive Donchian breakout with volatility-scaled position sizing and session filters.",
  },
  {
    id: "bt-002",
    name: "Lumen Mean-Revert / SPX D1",
    slug: "lumen-mean-revert-spx-d1",
    strategy: "Mean Reversion",
    asset: "Indices",
    timeframe: "D1",
    returnPct: 28.3,
    sharpe: 1.47,
    sortino: 1.92,
    maxDrawdownPct: 6.1,
    winRatePct: 64.8,
    trades: 184,
    startDate: "2021-06-15",
    endDate: "2025-12-30",
    status: "live",
    description:
      "Z-score reversion on SPX with regime gating using realised vol and VIX term structure.",
  },
  {
    id: "bt-003",
    name: "Vector Breakout / BTCUSD H4",
    slug: "vector-breakout-btcusd-h4",
    strategy: "Breakout",
    asset: "Crypto",
    timeframe: "H4",
    returnPct: 96.4,
    sharpe: 1.69,
    sortino: 2.18,
    maxDrawdownPct: 22.7,
    winRatePct: 47.5,
    trades: 268,
    startDate: "2020-01-01",
    endDate: "2025-12-30",
    status: "live",
    description:
      "Range-expansion breakout with trailing ATR stops; long-only crypto exposure with risk caps.",
  },
  {
    id: "bt-004",
    name: "Helios Carry / G10 FX D1",
    slug: "helios-carry-g10-fx-d1",
    strategy: "Carry",
    asset: "FX",
    timeframe: "D1",
    returnPct: 19.8,
    sharpe: 1.21,
    sortino: 1.55,
    maxDrawdownPct: 9.6,
    winRatePct: 56.2,
    trades: 96,
    startDate: "2019-01-02",
    endDate: "2025-12-30",
    status: "archived",
    description:
      "Cross-sectional G10 FX carry with risk-off de-grossing using credit spreads.",
  },
  {
    id: "bt-005",
    name: "Nyx RL Scalper / ETHUSD M15",
    slug: "nyx-rl-scalper-ethusd-m15",
    strategy: "ML / RL",
    asset: "Crypto",
    timeframe: "M15",
    returnPct: 54.1,
    sharpe: 1.94,
    sortino: 2.63,
    maxDrawdownPct: 11.3,
    winRatePct: 53.4,
    trades: 1843,
    startDate: "2023-01-01",
    endDate: "2025-12-30",
    status: "experimental",
    description:
      "PPO-based RL agent trained on micro-structure features; live shadow mode only.",
  },
  {
    id: "bt-006",
    name: "Orion Trend / Gold H4",
    slug: "orion-trend-gold-h4",
    strategy: "Trend",
    asset: "Metals",
    timeframe: "H4",
    returnPct: 36.2,
    sharpe: 1.55,
    sortino: 2.04,
    maxDrawdownPct: 10.2,
    winRatePct: 52.7,
    trades: 224,
    startDate: "2020-06-01",
    endDate: "2025-12-30",
    status: "live",
    description:
      "Dual-MA trend with macro filter on real yields; gold-only with USD hedge overlay.",
  },
  {
    id: "bt-007",
    name: "Pulse Breakout / NQ M15",
    slug: "pulse-breakout-nq-m15",
    strategy: "Breakout",
    asset: "Indices",
    timeframe: "M15",
    returnPct: 31.7,
    sharpe: 1.36,
    sortino: 1.78,
    maxDrawdownPct: 7.8,
    winRatePct: 49.3,
    trades: 612,
    startDate: "2022-03-01",
    endDate: "2025-12-30",
    status: "live",
    description:
      "Opening-range breakout on Nasdaq futures with news-window blackouts.",
  },
  {
    id: "bt-008",
    name: "Sable Carry / EM FX D1",
    slug: "sable-carry-em-fx-d1",
    strategy: "Carry",
    asset: "FX",
    timeframe: "D1",
    returnPct: 14.4,
    sharpe: 0.92,
    sortino: 1.18,
    maxDrawdownPct: 14.8,
    winRatePct: 54.0,
    trades: 78,
    startDate: "2018-01-02",
    endDate: "2025-12-30",
    status: "archived",
    description:
      "EM carry basket with crash-risk overlay; retired after 2024 regime change.",
  },
  {
    id: "bt-009",
    name: "Echo Mean-Revert / DAX H1",
    slug: "echo-mean-revert-dax-h1",
    strategy: "Mean Reversion",
    asset: "Indices",
    timeframe: "H1",
    returnPct: 22.9,
    sharpe: 1.28,
    sortino: 1.61,
    maxDrawdownPct: 5.7,
    winRatePct: 61.4,
    trades: 304,
    startDate: "2022-01-03",
    endDate: "2025-12-30",
    status: "experimental",
    description:
      "Intraday mean reversion on DAX with VWAP anchor and volatility-bucket sizing.",
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

export const timeframes = ["M5", "M15", "H1", "H4", "D1"] as const;

export const statuses: BacktestStatus[] = ["live", "archived", "experimental"];

export interface ExpertAdvisor {
  id: string;
  name: string;
  tagline: string;
  description: string;
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
    id: "ea-001",
    name: "Aurora Trend EA",
    tagline: "Adaptive Donchian breakout with volatility-scaled sizing.",
    description:
      "Session-filtered trend follower built from the Aurora research line. Risk per trade is sized from ATR, and the EA respects broker stop / freeze levels automatically.",
    strategy: "Trend",
    asset: "FX",
    timeframe: "H1",
    version: "1.0.0",
    mt4File: "aurora-trend-v1.0.0.ex4",
    mt5File: "aurora-trend-v1.0.0.ex5",
    available: false,
  },
  {
    id: "ea-002",
    name: "Lumen Mean-Revert EA",
    tagline: "RSI-2 style fade with volatility regime gating.",
    description:
      "Daily-bar mean reversion across index CFDs. Includes a regime filter that disables entries during sustained high-volatility periods to avoid getting stomped during crash regimes.",
    strategy: "Mean Reversion",
    asset: "Indices",
    timeframe: "D1",
    version: "1.0.0",
    mt4File: "lumen-meanrevert-v1.0.0.ex4",
    mt5File: "lumen-meanrevert-v1.0.0.ex5",
    available: false,
  },
  {
    id: "ea-003",
    name: "Helix Scalper EA",
    tagline: "London open momentum scalper with hard daily loss limit.",
    description:
      "Short-horizon momentum entries around the London open. Strict daily-loss kill switch, magic-number isolated so it co-exists with other EAs on the same account.",
    strategy: "Breakout",
    asset: "FX",
    timeframe: "M15",
    version: "0.9.0",
    mt4File: "helix-scalper-v0.9.0.ex4",
    mt5File: "helix-scalper-v0.9.0.ex5",
    available: false,
  },
];
