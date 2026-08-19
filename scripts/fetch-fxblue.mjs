// Scrapes the legacy FX Blue statement page for each tracked account and writes
// lib/fxblue-data.json. The modern www.fxblue.com UI is client-rendered, but
// api.fxblue.com/users/<id> still serves a server-rendered statement we can parse.
//
//   node scripts/fetch-fxblue.mjs
//
// Re-run whenever you want to refresh the numbers on /fx-blue-links.

import { writeFile } from "node:fs/promises";

const ACCOUNTS = [
  { id: "ClaudeTradeHQ", label: "ClaudeTradeHQ" },
  { id: "ClaudeTradeHQ_081926", label: "ClaudeTradeHQ_081926" },
];

const stripTags = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"');

// The statement renders each metric as a "Label:" line followed by its value on
// the next non-empty line. Collect them into a flat map.
function parsePairs(text) {
  const lines = text
    .split("\n")
    .map((l) => l.replace(/[ \t ]+/g, " ").trim())
    .filter(Boolean);

  const pairs = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(.+?):$/);
    if (m && lines[i + 1] && !lines[i + 1].endsWith(":")) {
      const key = m[1].trim();
      if (!(key in pairs)) pairs[key] = lines[i + 1];
    }
  }
  return pairs;
}

async function fetchAccount({ id, label }) {
  const url = `https://api.fxblue.com/users/${id}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (ClaudeTradeHQ site build)" },
  });
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  const p = parsePairs(stripTags(await res.text()));

  return {
    id,
    label,
    publicUrl: `https://www.fxblue.com/users/${id}`,
    accountType: p["Account type"] ?? null,
    currency: "USD",
    balance: p["Balance"] ?? null,
    equity: p["Equity"] ?? null,
    floatingPl: p["Floating P/L"] ?? null,
    closedProfit: p["Closed profit"] ?? null,
    totalReturn: p["Total return"] ?? null,
    monthlyReturn: p["Monthly return"] ?? null,
    weeklyReturn: p["Weekly return"] ?? null,
    peakDrawdown: p["Peak drawdown"] ?? null,
    tradeWinPct: p["Trade win %"] ?? null,
    profitFactor: p["Profit factor"] ?? null,
    pips: p["Pips"] ?? null,
    tradesPerDay: p["Trades per day"] ?? null,
    history: p["History"] ?? null,
    riskRewardRatio: p["Risk/reward ratio"] ?? null,
    worstDay: p["Worst day"] ?? null,
    worstWeek: p["Worst week"] ?? null,
    worstMonth: p["Worst month"] ?? null,
    riskOfRuin: p["Risk of ruin"] ?? null,
    tradeLength: p["Trade length"] ?? null,
    avgResult: p["Avg result"] ?? null,
    avgWin: p["Avg win"] ?? null,
    avgLoss: p["Avg loss"] ?? null,
    lastUpdate: p["Last update"] ?? null,
  };
}

const accounts = [];
for (const a of ACCOUNTS) {
  try {
    const data = await fetchAccount(a);
    accounts.push(data);
    console.log(
      `${a.id}: ${data.accountType} | bal ${data.balance} | ret ${data.totalReturn} | PF ${data.profitFactor} | ${data.history}`,
    );
  } catch (err) {
    console.error(`FAILED ${a.id}:`, err.message);
    process.exitCode = 1;
  }
}

await writeFile(
  new URL("../lib/fxblue-data.json", import.meta.url),
  `${JSON.stringify({ accounts }, null, 2)}\n`,
);
console.log(`\nWrote lib/fxblue-data.json (${accounts.length} accounts)`);
