/**
 * Verify all city slugs are unique
 * Run: npx tsx scripts/generate-slugs.ts
 */

import fs from "fs";
import path from "path";

const citiesPath = path.join(__dirname, "..", "data", "cities.json");
const cities = JSON.parse(fs.readFileSync(citiesPath, "utf-8"));

const slugs = new Map<string, any[]>();
for (const city of cities) {
  if (!slugs.has(city.slug)) {
    slugs.set(city.slug, []);
  }
  slugs.get(city.slug)!.push(city);
}

const duplicates = [...slugs.entries()].filter(([, cities]) => cities.length > 1);

if (duplicates.length === 0) {
  console.log(`All ${cities.length} slugs are unique!`);
} else {
  console.log(`Found ${duplicates.length} duplicate slugs:`);
  for (const [slug, dups] of duplicates) {
    console.log(`  ${slug}: ${dups.map((c: any) => `${c.nome}/${c.uf} (${c.id})`).join(", ")}`);
  }
}

// Sample some slugs
console.log("\nSample slugs:");
for (const city of cities.slice(0, 10)) {
  console.log(`  ${city.nome} (${city.uf}) -> ${city.slug}`);
}
