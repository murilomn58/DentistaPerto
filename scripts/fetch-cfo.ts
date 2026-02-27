/**
 * CFO stats are manually curated from CFO website (https://website.cfo.org.br/)
 * The data/cfo-stats.json file contains dentist counts per state.
 * Run this script to verify and update the data.
 *
 * Note: CFO doesn't provide a public API, so data is maintained manually.
 * Run: npx tsx scripts/fetch-cfo.ts
 */

import fs from "fs";
import path from "path";

const cfoPath = path.join(__dirname, "..", "data", "cfo-stats.json");
const cfoData = JSON.parse(fs.readFileSync(cfoPath, "utf-8"));

console.log("CFO Stats Summary:");
console.log(`Total dentistas no Brasil: ${cfoData.total_brasil.toLocaleString()}`);
console.log(`Estados com dados: ${Object.keys(cfoData.estados).length}`);
console.log("");

const sorted = Object.entries(cfoData.estados)
  .sort(([, a]: any, [, b]: any) => b.total - a.total)
  .slice(0, 10);

console.log("Top 10 estados por numero de dentistas:");
for (const [uf, stats] of sorted) {
  const s = stats as any;
  console.log(`  ${uf}: ${s.total.toLocaleString()} dentistas (${s.proporcao} por 1.000 hab)`);
}
