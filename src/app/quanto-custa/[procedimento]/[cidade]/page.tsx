import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityBySlug, getTopCities } from "@/lib/cities";
import { getProcedureBySlug, getTopProcedures, getAllProcedures } from "@/lib/procedures";
import { generateProcedureMetadata } from "@/lib/seo";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FAQSection } from "@/components/FAQSection";
import { CTAPartner } from "@/components/CTAPartner";
import { AdSlot } from "@/components/AdSlot";
import { UF_MAP } from "@/types";
import { SSG_PROCEDURE_CITIES, SSG_TOP_PROCEDURES, SITE_URL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { getCityPrice, getPriceContext } from "@/lib/pricing";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const topProcedures = getTopProcedures(SSG_TOP_PROCEDURES);
  const topCities = getTopCities(SSG_PROCEDURE_CITIES);

  const params: Array<{ procedimento: string; cidade: string }> = [];
  for (const proc of topProcedures) {
    for (const city of topCities) {
      params.push({ procedimento: proc.slug, cidade: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ procedimento: string; cidade: string }>;
}): Promise<Metadata> {
  const { procedimento, cidade } = await params;
  const procedure = getProcedureBySlug(procedimento);
  const city = getCityBySlug(cidade);
  if (!procedure || !city) return {};
  return generateProcedureMetadata(procedure, city);
}

export default async function ProcedureCityPage({
  params,
}: {
  params: Promise<{ procedimento: string; cidade: string }>;
}) {
  const { procedimento, cidade } = await params;
  const procedure = getProcedureBySlug(procedimento);
  const city = getCityBySlug(cidade);
  if (!procedure || !city) notFound();

  const ufName = UF_MAP[city.uf] || city.uf;
  const otherProcedures = getAllProcedures().filter(
    (p) => p.slug !== procedure.slug
  );

  // Preço ajustado para a cidade
  const cityPrice = getCityPrice(procedure, city);
  const priceContext = getPriceContext(city);

  const faqs = [
    {
      question: `Quanto custa ${procedure.nome} em ${city.nome}?`,
      answer: `O preço estimado de ${procedure.nome} em ${city.nome} varia entre ${formatCurrency(cityPrice.min)} e ${formatCurrency(cityPrice.max)}. Este valor é ajustado para a região ${city.regiao} e o porte da cidade, e pode variar conforme o profissional, material utilizado e complexidade do caso.`,
    },
    {
      question: `O preço de ${procedure.nome} é mais caro em ${city.nome}?`,
      answer: `Os preços em ${city.nome} estão ${cityPrice.label}. A média nacional de ${procedure.nome} fica entre ${formatCurrency(procedure.preco_min)} e ${formatCurrency(procedure.preco_max)}. Fatores como custo de vida, concorrência e infraestrutura local influenciam nos valores.`,
    },
    {
      question: `${procedure.nome} dói?`,
      answer: `O procedimento de ${procedure.nome} é geralmente realizado com anestesia local, minimizando qualquer desconforto. O dentista irá orientar sobre os cuidados pós-procedimento para uma recuperação tranquila.`,
    },
    {
      question: `Plano dental cobre ${procedure.nome} em ${city.nome}?`,
      answer: `A cobertura de ${procedure.nome} depende do plano contratado. Planos básicos podem não cobrir procedimentos estéticos. Consulte seu plano ou opte por pagamento particular com condições especiais.`,
    },
  ];

  const PriceIcon =
    cityPrice.label.includes("acima") ? TrendingUp :
    cityPrice.label.includes("abaixo") ? TrendingDown :
    Minus;

  const priceColor =
    cityPrice.label.includes("acima") ? "text-orange-600" :
    cityPrice.label.includes("abaixo") ? "text-green-600" :
    "text-blue-600";

  const priceBg =
    cityPrice.label.includes("acima") ? "bg-orange-50 border-orange-100" :
    cityPrice.label.includes("abaixo") ? "bg-green-50 border-green-100" :
    "bg-blue-50 border-blue-100";

  return (
    <>
      <SchemaMarkup data={generateFAQSchema(faqs)} />
      <SchemaMarkup
        data={generateBreadcrumbSchema([
          { name: "Início", url: SITE_URL },
          { name: city.nome, url: `${SITE_URL}/dentista/${city.slug}` },
          {
            name: procedure.nome,
            url: `${SITE_URL}/quanto-custa/${procedure.slug}/${city.slug}`,
          },
        ])}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: ufName, href: `/dentista/${city.uf.toLowerCase()}` },
            { label: city.nome, href: `/dentista/${city.slug}` },
            {
              label: procedure.nome,
              href: `/quanto-custa/${procedure.slug}/${city.slug}`,
            },
          ]}
        />

        <AdSlot position="header" />

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
          Quanto custa {procedure.nome} em {city.nome}?
        </h1>

        {/* Price Range - City-specific */}
        <div className={`border rounded-2xl p-8 mb-8 ${priceBg}`}>
          <div className="text-center">
            <p className={`text-sm font-medium mb-2 ${priceColor}`}>
              Preço estimado em {city.nome} - {city.uf}
            </p>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {cityPrice.min === 0
                ? `Até ${formatCurrency(cityPrice.max)}`
                : `${formatCurrency(cityPrice.min)} - ${formatCurrency(cityPrice.max)}`}
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              <PriceIcon className={`w-4 h-4 ${priceColor}`} />
              <span className={`text-sm font-medium capitalize ${priceColor}`}>
                {cityPrice.label}
              </span>
            </div>
          </div>
        </div>

        {/* National Reference */}
        <div className="flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4 mb-8">
          <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Referência nacional: </span>
            {procedure.preco_min === 0
              ? `Até ${formatCurrency(procedure.preco_max)}`
              : `${formatCurrency(procedure.preco_min)} - ${formatCurrency(procedure.preco_max)}`}
            {" "}&#8226; Valores aproximados que podem variar conforme o profissional e complexidade do caso.
          </div>
        </div>

        {/* Description */}
        <section className="prose prose-gray max-w-none mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sobre {procedure.nome}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {procedure.descricao}
          </p>
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
            Preços em {city.nome}, {ufName}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {priceContext}
          </p>
          <p className="text-gray-600 leading-relaxed">
            Para {procedure.nome} especificamente, os valores em {city.nome} ficam
            entre {formatCurrency(cityPrice.min)} e {formatCurrency(cityPrice.max)}.
            Profissionais mais experientes ou com equipamentos de última geração
            podem cobrar valores na faixa superior, enquanto clínicas populares
            e recém-formados tendem a oferecer preços mais acessíveis.
          </p>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <CTAPartner city={city.slug} procedure={procedure.slug} />
        </section>

        <AdSlot position="in-content" />

        {/* FAQ */}
        <section className="mb-8">
          <FAQSection faqs={faqs} />
        </section>

        {/* Other Procedures */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Outros procedimentos em {city.nome}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {otherProcedures.slice(0, 6).map((proc) => {
              const procPrice = getCityPrice(proc, city);
              return (
                <Link
                  key={proc.slug}
                  href={`/quanto-custa/${proc.slug}/${city.slug}`}
                  className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-blue-200 transition-colors"
                >
                  <span className="font-medium text-gray-900">{proc.nome}</span>
                  <span className="text-sm text-blue-600">
                    {procPrice.min === 0
                      ? `Até ${formatCurrency(procPrice.max)}`
                      : `A partir de ${formatCurrency(procPrice.min)}`}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <AdSlot position="footer" />
      </div>
    </>
  );
}
