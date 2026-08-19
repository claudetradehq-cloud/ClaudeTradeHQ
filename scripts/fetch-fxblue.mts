/**
 * Refreshes lib/fxblue-data.json, the committed fallback that /fx-blue-links
 * serves if FX Blue is unreachable at request time.
 *
 *   npm run fxblue
 *
 * The page fetches live stats on its own (see lib/fxblue.ts), so this is only
 * needed to keep the offline fallback from drifting too far behind. Run it after
 * adding an account to FXBLUE_ACCOUNTS in lib/fxblue-parse.ts.
 */

import { writeFile } from "node:fs/promises";
import { FXBLUE_ACCOUNTS, fetchFxBlueAccount } from "../lib/fxblue-parse.ts";

const accounts = [];

for (const meta of FXBLUE_ACCOUNTS) {
  const data = await fetchFxBlueAccount(meta);
  if (!data) {
    console.error(`FAILED ${meta.id} — leaving it out of the snapshot`);
    process.exitCode = 1;
    continue;
  }
  accounts.push(data);
  console.log(
    `${meta.id}: ${data.accountType} | bal ${data.balance} | ret ${data.totalReturn} | PF ${data.profitFactor} | ${data.history}`,
  );
}

if (accounts.length === 0) {
  console.error("\nNo accounts fetched — refusing to overwrite the snapshot.");
  process.exit(1);
}

await writeFile(
  new URL("../lib/fxblue-data.json", import.meta.url),
  `${JSON.stringify({ accounts }, null, 2)}\n`,
);
console.log(`\nWrote lib/fxblue-data.json (${accounts.length} accounts)`);
