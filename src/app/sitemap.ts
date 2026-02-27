import type { MetadataRoute } from "next";
import { getAllCities, getUFs } from "@/lib/cities";
import { getAllProcedures } from "@/lib/procedures";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = getAllCities();
  const procedures = getAllProcedures();
  const ufs = getUFs();
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [];

  // Static pages
  urls.push(
    { url: `${SITE_URL}`, lastModified: now },
    { url: `${SITE_URL}/blog`, lastModified: now },
    { url: `${SITE_URL}/sobre`, lastModified: now },
    { url: `${SITE_URL}/contato`, lastModified: now },
    { url: `${SITE_URL}/privacidade`, lastModified: now },
    { url: `${SITE_URL}/termos`, lastModified: now },
  );

  // UF pages (27)
  for (const uf of ufs) {
    urls.push({
      url: `${SITE_URL}/dentista/${uf.toLowerCase()}`,
      lastModified: now,
    });
  }

  // City pages (5,570)
  for (const city of cities) {
    urls.push({
      url: `${SITE_URL}/dentista/${city.slug}`,
      lastModified: now,
    });
  }

  // Procedure × top 100 cities (2,000 combos — keeps sitemap under 50k limit)
  const topCities = cities.slice(0, 100);
  for (const proc of procedures) {
    for (const city of topCities) {
      urls.push({
        url: `${SITE_URL}/quanto-custa/${proc.slug}/${city.slug}`,
        lastModified: now,
      });
    }
  }

  return urls;
}
