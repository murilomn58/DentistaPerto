import type { Metadata } from "next";
import type { City, Procedure } from "@/types";
import { SITE_NAME, SITE_URL } from "./constants";
import { UF_MAP } from "@/types";
import { getDentistCount } from "./cfo-stats";
import { formatNumberFull } from "./utils";

export function generateCityMetadata(city: City): Metadata {
  const ufName = UF_MAP[city.uf] || city.uf;
  const dentistas = getDentistCount(city.uf);
  const title = `Dentista em ${city.nome} - ${city.uf} | ${SITE_NAME}`;
  const description = `Encontre dentistas em ${city.nome}, ${ufName}. ${dentistas > 0 ? `${formatNumberFull(dentistas)} dentistas registrados no estado.` : ""} Compare precos, especialidades e agende sua consulta.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/dentista/${city.slug}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
    },
    alternates: {
      canonical: `${SITE_URL}/dentista/${city.slug}`,
    },
  };
}

export function generateUFMetadata(uf: string): Metadata {
  const ufName = UF_MAP[uf] || uf;
  const dentistas = getDentistCount(uf);
  const title = `Dentistas em ${ufName} (${uf}) | ${SITE_NAME}`;
  const description = `Encontre dentistas em ${ufName}. ${dentistas > 0 ? `${formatNumberFull(dentistas)} dentistas registrados.` : ""} Veja as principais cidades e especialidades disponiveis.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/dentista/${uf.toLowerCase()}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
    },
    alternates: {
      canonical: `${SITE_URL}/dentista/${uf.toLowerCase()}`,
    },
  };
}

export function generateProcedureMetadata(
  procedure: Procedure,
  city: City
): Metadata {
  const title = `Quanto custa ${procedure.nome} em ${city.nome} - ${city.uf}? | ${SITE_NAME}`;
  const description = `Precos de ${procedure.nome} em ${city.nome}: de R$ ${procedure.preco_min} a R$ ${procedure.preco_max}. Compare valores e encontre o melhor dentista.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/quanto-custa/${procedure.slug}/${city.slug}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "pt_BR",
    },
    alternates: {
      canonical: `${SITE_URL}/quanto-custa/${procedure.slug}/${city.slug}`,
    },
  };
}

export interface SchemaMarkupProps {
  type: "Dentist" | "FAQPage" | "BreadcrumbList" | "Article";
  data: Record<string, unknown>;
}

export function generateDentistSchema(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `Dentistas em ${city.nome}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: city.nome,
      addressRegion: city.uf,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lon,
    },
    areaServed: {
      "@type": "City",
      name: city.nome,
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateArticleSchema(post: {
  titulo: string;
  descricao: string;
  data: string;
  autor: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.titulo,
    description: post.descricao,
    author: {
      "@type": "Person",
      name: post.autor,
    },
    datePublished: post.data,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}
