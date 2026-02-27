export const SITE_NAME = "DentistaPerto";
export const SITE_DESCRIPTION =
  "Encontre dentistas perto de você. Compare preços, especialidades e avaliações de dentistas em mais de 5.000 cidades do Brasil.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dentistaperto.com.br";
export const ODONTO_CONNECT_URL =
  process.env.NEXT_PUBLIC_ODONTO_CONNECT_URL ||
  "https://odonto-connect.vercel.app";

export const UTM_PARAMS = {
  source: "dentistaperto",
  medium: "referral",
  campaign: "seo",
} as const;

export function getOdontoConnectURL(city?: string, procedure?: string): string {
  const params = new URLSearchParams({
    utm_source: UTM_PARAMS.source,
    utm_medium: UTM_PARAMS.medium,
    utm_campaign: UTM_PARAMS.campaign,
    ...(city && { utm_content: city }),
    ...(procedure && { utm_term: procedure }),
  });
  return `${ODONTO_CONNECT_URL}?${params.toString()}`;
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const SSG_CITY_COUNT = 500;
export const SSG_PROCEDURE_CITIES = 50;
export const SSG_TOP_PROCEDURES = 5;
export const ISR_REVALIDATE = 86400; // 24 hours
export const SITEMAP_CHUNK_SIZE = 2000;

export const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/quanto-custa/clareamento-dental/sao-paulo-sp", label: "Preços" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
] as const;

export const FOOTER_LEGAL = [
  { href: "/privacidade", label: "Privacidade" },
  { href: "/termos", label: "Termos de Uso" },
  { href: "/contato", label: "Contato" },
] as const;
