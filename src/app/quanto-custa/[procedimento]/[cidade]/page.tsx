import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCityBySlug, getTopCities } from "@/lib/cities";
import { getProcedureBySlug, getTopProcedures, getAllProcedures } from "@/lib/procedures";
import { generateProcedureMetadata } from "@/lib/seo";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FAQSection } from "@/components/FAQSection";
import { CTAOdontoConnect } from "@/components/CTAOdontoConnect";
import { AdSlot } from "@/components/AdSlot";
import { UF_MAP } from "@/types";
import { SSG_PROCEDURE_CITIES, SSG_TOP_PROCEDURES, SITE_URL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

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

  const faqs = [
    {
      question: `Quanto custa ${procedure.nome} em ${city.nome}?`,
      answer: `O preco medio de ${procedure.nome} em ${city.nome} varia entre ${formatCurrency(procedure.preco_min)} e ${formatCurrency(procedure.preco_max)}, dependendo do profissional, material utilizado e complexidade do caso.`,
    },
    {
      question: `${procedure.nome} doi?`,
      answer: `O procedimento de ${procedure.nome} e geralmente realizado com anestesia local, minimizando qualquer desconforto. O dentista ira orientar sobre os cuidados pos-procedimento para uma recuperacao tranquila.`,
    },
    {
      question: `Quanto tempo dura o ${procedure.nome}?`,
      answer: `A duracao do ${procedure.nome} varia conforme a complexidade do caso. Em geral, uma sessao leva entre 30 minutos e 2 horas. Alguns tratamentos podem exigir mais de uma visita.`,
    },
    {
      question: `Plano dental cobre ${procedure.nome} em ${city.nome}?`,
      answer: `A cobertura de ${procedure.nome} depende do plano contratado. Planos basicos podem nao cobrir procedimentos esteticos. Consulte seu plano ou opte por pagamento particular com condicoes especiais.`,
    },
  ];

  return (
    <>
      <SchemaMarkup data={generateFAQSchema(faqs)} />
      <SchemaMarkup
        data={generateBreadcrumbSchema([
          { name: "Inicio", url: SITE_URL },
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
            { label: "Inicio", href: "/" },
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

        {/* Price Range */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8">
          <div className="text-center">
            <p className="text-sm text-blue-600 font-medium mb-2">
              Faixa de preco em {city.nome} - {city.uf}
            </p>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {procedure.preco_min === 0
                ? `Ate ${formatCurrency(procedure.preco_max)}`
                : `${formatCurrency(procedure.preco_min)} - ${formatCurrency(procedure.preco_max)}`}
            </div>
            <p className="text-sm text-gray-500">
              *Valores aproximados. Consulte diretamente com o dentista.
            </p>
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
          <p className="text-gray-600 leading-relaxed">
            Em {city.nome}, {ufName}, voce encontra diversos profissionais
            qualificados para realizar {procedure.nome}. Os precos podem variar
            de acordo com a experiencia do dentista, a localizacao do
            consultorio, os materiais utilizados e a complexidade do seu caso
            especifico.
          </p>
        </section>

        {/* CTA */}
        <section className="mb-8">
          <CTAOdontoConnect city={city.slug} procedure={procedure.slug} />
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
            {otherProcedures.slice(0, 6).map((proc) => (
              <Link
                key={proc.slug}
                href={`/quanto-custa/${proc.slug}/${city.slug}`}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:border-blue-200 transition-colors"
              >
                <span className="font-medium text-gray-900">{proc.nome}</span>
                <span className="text-sm text-blue-600">
                  {proc.preco_min === 0
                    ? `Ate ${formatCurrency(proc.preco_max)}`
                    : `A partir de ${formatCurrency(proc.preco_min)}`}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot position="footer" />
      </div>
    </>
  );
}
