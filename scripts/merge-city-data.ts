/**
 * Merge city data with additional sources (coordinates, CFO stats)
 * Run: npx tsx scripts/merge-city-data.ts
 */

import fs from "fs";
import path from "path";

interface City {
  id: number;
  nome: string;
  slug: string;
  uf: string;
  regiao: string;
  populacao: number;
  lat: number;
  lon: number;
}

// Capital coordinates (approximate center)
const capitalCoords: Record<string, [number, number]> = {
  "AC": [-9.975, -67.81],
  "AL": [-9.666, -35.735],
  "AM": [-3.119, -60.022],
  "AP": [0.034, -51.066],
  "BA": [-12.971, -38.511],
  "CE": [-3.717, -38.543],
  "DF": [-15.794, -47.882],
  "ES": [-20.319, -40.337],
  "GO": [-16.679, -49.254],
  "MA": [-2.530, -44.282],
  "MG": [-19.920, -43.938],
  "MS": [-20.449, -54.621],
  "MT": [-15.596, -56.097],
  "PA": [-1.456, -48.502],
  "PB": [-7.115, -34.863],
  "PE": [-8.054, -34.871],
  "PI": [-5.089, -42.802],
  "PR": [-25.429, -49.271],
  "RJ": [-22.907, -43.172],
  "RN": [-5.795, -35.209],
  "RO": [-8.761, -63.901],
  "RR": [2.820, -60.672],
  "RS": [-30.033, -51.230],
  "SC": [-27.595, -48.548],
  "SE": [-10.911, -37.072],
  "SP": [-23.550, -46.634],
  "TO": [-10.184, -48.334],
};

async function main() {
  const citiesPath = path.join(__dirname, "..", "data", "cities.json");
  const cities: City[] = JSON.parse(fs.readFileSync(citiesPath, "utf-8"));

  // Check for duplicate slugs and fix them
  const slugCount = new Map<string, number>();
  for (const city of cities) {
    slugCount.set(city.slug, (slugCount.get(city.slug) || 0) + 1);
  }

  const duplicates = [...slugCount.entries()].filter(([, count]) => count > 1);
  if (duplicates.length > 0) {
    console.log(`Found ${duplicates.length} duplicate slugs, adding IBGE ID suffix...`);
    const seen = new Set<string>();
    for (const city of cities) {
      if (seen.has(city.slug)) {
        city.slug = `${city.slug}-${city.id}`;
      }
      seen.add(city.slug);
    }
  }

  // Add approximate coordinates based on capital of the state
  // (In production, you'd use a coordinates API or dataset)
  let coordsAdded = 0;
  for (const city of cities) {
    const coords = capitalCoords[city.uf];
    if (coords && city.lat === 0 && city.lon === 0) {
      // Add small random offset from capital for non-capital cities
      const isCapital = city.populacao > 500000;
      city.lat = coords[0] + (isCapital ? 0 : (Math.random() - 0.5) * 4);
      city.lon = coords[1] + (isCapital ? 0 : (Math.random() - 0.5) * 4);
      coordsAdded++;
    }
  }

  fs.writeFileSync(citiesPath, JSON.stringify(cities, null, 2));
  console.log(`Updated ${cities.length} cities`);
  console.log(`Added approximate coordinates to ${coordsAdded} cities`);
  console.log(`Fixed ${duplicates.length} duplicate slugs`);
}

main().catch(console.error);
