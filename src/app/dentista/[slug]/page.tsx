import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityBySlug, getTopCities, getNearbyCities, getCitiesByUF, getUFs } from "@/lib/cities";
import { getAllProcedures } from "@/lib/procedures";
import { getStatsByUF } from "@/lib/cfo-stats";
import {
  generateCityMetadata,
  generateUFMetadata,
  generateDentistSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CityStatsSection, StatsSection } from "@/components/StatsSection";
import { ProcedureCard } from "@/components/ProcedureCard";
import { CityCard } from "@/components/CityCard";
import { FAQSection } from "@/components/FAQSection";
import { CTAOdontoConnect } from "@/components/CTAOdontoConnect";
import { AdSlot } from "@/components/AdSlot";
import { UF_MAP } from "@/types";
import { SITE_URL, SSG_CITY_COUNT } from "@/lib/constants";
import { formatNumberFull, formatNumber } from "@/lib/utils";

export const dynamicParams = true;
export const revalidate = 86400;

const UF_SET = new Set(Object.keys(UF_MAP).map((u) => u.toLowerCase()));

function isUFSlug(slug: string): boolean {
  return slug.length === 2 && UF_SET.has(slug);
}

export async function generateStaticParams() {
  // Generate both UF and city params
  const ufParams = getUFs().map((uf) => ({ slug: uf.toLowerCase() }));
  const cityParams = getTopCities(SSG_CITY_COUNT).map((city) => ({
    slug: city.slug,
  }));
  return [...ufParams, ...cityParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (isUFSlug(slug)) {
    const ufUpper = slug.toUpperCase();
    if (!UF_MAP[ufUpper]) return {};
    return generateUFMetadata(ufUpper);
  }

  const city = getCityBySlug(slug);
  if (!city) return {};
  return generateCityMetadata(city);
}

export default async function DentistaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isUFSlug(slug)) {
    return <UFView uf={slug.toUpperCase()} />;
  }

  const city = getCityBySlug(slug);
  if (!city) notFound();

  return <CityView citySlug={slug} />;
}

// ─── UF View ──────────────────────────────────────────────

function UFView({ uf }: { uf: string }) {
  const ufName = UF_MAP[uf];
  if (!ufName) notFound();

  const cities = getCitiesByUF(uf);
  const ufStats = getStatsByUF(uf);
  const topCities = cities
    .sort((a, b) => b.populacao - a.populacao)
    .slice(0, 20);
  const totalPop = cities.reduce((sum, c) => sum + c.populacao, 0);

  return (
    <>
      <SchemaMarkup
        data={generateBreadcrumbSchema([
          { name: "Início", url: SITE_URL },
          { name: ufName, url: `${SITE_URL}/dentista/${uf.toLowerCase()}` },
        ])}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: ufName, href: `/dentista/${uf.toLowerCase()}` },
          ]}
        />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
          Dentistas em {ufName} ({uf})
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Encontre dentistas em {ufName}. O estado possui{" "}
          {formatNumberFull(ufStats?.total || 0)} dentistas registrados,
          atendendo uma população de {formatNumberFull(totalPop)} habitantes em{" "}
          {cities.length} municípios.
        </p>

        <section className="mb-12">
          <StatsSection
            stats={[
              {
                label: "Dentistas",
                value: formatNumberFull(ufStats?.total || 0),
                icon: "dentists",
              },
              {
                label: "População",
                value: formatNumber(totalPop),
                icon: "population",
              },
              {
                label: "Por 1.000 hab",
                value: (ufStats?.proporcao || 0).toFixed(2),
                icon: "ratio",
              },
              {
                label: "Municípios",
                value: String(cities.length),
                icon: "cities",
              },
            ]}
          />
        </section>

        <section className="mb-12">
          <CTAOdontoConnect city={uf.toLowerCase()} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Principais cidades de {ufName}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCities.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        </section>

        {cities.length > 20 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Todas as cidades de {ufName}
            </h2>
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
              {cities.map((city) => (
                <a
                  key={city.slug}
                  href={`/dentista/${city.slug}`}
                  className="block text-sm text-gray-600 hover:text-blue-600 py-0.5 transition-colors"
                >
                  {city.nome}
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

// ─── City View ──────────────────────────────────────────────

function CityView({ citySlug }: { citySlug: string }) {
  const city = getCityBySlug(citySlug)!;
  const ufName = UF_MAP[city.uf] || city.uf;
  const ufStats = getStatsByUF(city.uf);
  const procedures = getAllProcedures();
  const nearbyCities = getNearbyCities(city.slug, 6);

  const faqs = [
    {
      question: `Quantos dentistas tem em ${city.nome}?`,
      answer: `${city.nome} faz parte do estado de ${ufName}, que possui aproximadamente ${formatNumberFull(ufStats?.total || 0)} dentistas registrados no Conselho Federal de Odontologia (CFO). A proporção é de ${ufStats?.proporcao || 0} dentistas para cada 1.000 habitantes.`,
    },
    {
      question: `Quanto custa uma consulta com dentista em ${city.nome}?`,
      answer: `O valor de uma consulta odontológica em ${city.nome} varia entre R$ 100 e R$ 300, dependendo da especialidade e do profissional. Muitos dentistas oferecem avaliação inicial gratuita.`,
    },
    {
      question: `Como encontrar um bom dentista em ${city.nome}?`,
      answer: `Para encontrar um dentista de confiança em ${city.nome}, verifique o registro no CRO, busque avaliações de outros pacientes, confirme a especialidade desejada e agende uma consulta de avaliação. O OdontoConnect pode ajudar você a encontrar profissionais verificados.`,
    },
    {
      question: `Quais especialidades odontológicas estão disponíveis em ${city.nome}?`,
      answer: `Em ${city.nome} você encontra dentistas de diversas especialidades, incluindo ortodontia, implantodontia, endodontia, periodontia, odontopediatria, cirurgia bucomaxilofacial e harmonização orofacial.`,
    },
    {
      question: `Qual o melhor plano dental para ${city.nome}?`,
      answer: `Os planos dentais mais populares em ${ufName} incluem Amil Dental, Bradesco Dental e SulAmérica Odonto. Valores variam de R$ 20 a R$ 100/mês dependendo da cobertura.`,
    },
  ];

  return (
    <>
      <SchemaMarkup data={generateDentistSchema(city)} />
      <SchemaMarkup data={generateFAQSchema(faqs)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: ufName, href: `/dentista/${city.uf.toLowerCase()}` },
            { label: city.nome, href: `/dentista/${city.slug}` },
          ]}
        />

        <AdSlot position="header" />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
          Dentista em {city.nome} - {city.uf}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Encontre os melhores dentistas em {city.nome}, {ufName}. Compare
          preços, especialidades e agende sua consulta com profissionais
          verificados.
        </p>

        <section className="mb-12">
          <CityStatsSection
            populacao={city.populacao}
            dentistasUF={ufStats?.total || 0}
            uf={city.uf}
            proporcao={ufStats?.proporcao || 0}
          />
        </section>

        <section className="mb-12">
          <CTAOdontoConnect city={city.slug} />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Procedimentos em {city.nome}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {procedures.slice(0, 9).map((proc) => (
              <ProcedureCard
                key={proc.slug}
                procedure={proc}
                citySlug={city.slug}
              />
            ))}
          </div>
        </section>

        <AdSlot position="in-content" />

        <section className="mb-12">
          <FAQSection faqs={faqs} />
        </section>

        {nearbyCities.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dentistas em cidades próximas
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyCities.map((c) => (
                <CityCard key={c.slug} city={c} />
              ))}
            </div>
          </section>
        )}

        <section className="mb-12 text-center">
          <Link
            href={`/dentista/${city.uf.toLowerCase()}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Ver todos os dentistas em {ufName} ({city.uf})
          </Link>
        </section>

        <AdSlot position="footer" />
      </div>
    </>
  );
}
