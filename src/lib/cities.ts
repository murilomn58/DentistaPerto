import citiesData from "@/../data/cities.json";
import type { City } from "@/types";

const cities: City[] = citiesData as City[];

export function getAllCities(): City[] {
  return cities;
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getTopCities(n: number): City[] {
  return cities.slice(0, n);
}

export function getCitiesByUF(uf: string): City[] {
  return cities.filter((c) => c.uf === uf.toUpperCase());
}

export function getNearbyCities(slug: string, limit = 6): City[] {
  const city = getCityBySlug(slug);
  if (!city) return [];

  // First try same UF, sorted by population
  const sameUF = cities
    .filter((c) => c.uf === city.uf && c.slug !== slug)
    .sort((a, b) => b.populacao - a.populacao)
    .slice(0, limit);

  if (sameUF.length >= limit) return sameUF;

  // Fill with nearby by coordinates
  const withDistance = cities
    .filter((c) => c.slug !== slug && !sameUF.some((s) => s.slug === c.slug))
    .map((c) => ({
      city: c,
      dist: Math.sqrt(
        Math.pow(c.lat - city.lat, 2) + Math.pow(c.lon - city.lon, 2)
      ),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, limit - sameUF.length)
    .map((c) => c.city);

  return [...sameUF, ...withDistance];
}

export function getCapitals(): City[] {
  const capitalNames = new Set([
    "Rio Branco", "Maceió", "Manaus", "Macapá", "Salvador", "Fortaleza",
    "Brasília", "Vitória", "Goiânia", "São Luís", "Belo Horizonte",
    "Campo Grande", "Cuiabá", "Belém", "João Pessoa", "Recife",
    "Teresina", "Curitiba", "Rio de Janeiro", "Natal", "Porto Velho",
    "Boa Vista", "Porto Alegre", "Florianópolis", "Aracaju",
    "São Paulo", "Palmas",
  ]);

  return cities.filter((c) => capitalNames.has(c.nome));
}

export function getUFs(): string[] {
  return [...new Set(cities.map((c) => c.uf))].sort();
}

export function getCityCount(): number {
  return cities.length;
}

export function getTotalPopulation(): number {
  return cities.reduce((sum, c) => sum + c.populacao, 0);
}
