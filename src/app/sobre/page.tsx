import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, PARTNER } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getCityCount } from "@/lib/cities";
import { getAllProcedures } from "@/lib/procedures";
import { MapPin, Search, TrendingUp, Users, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_NAME}`,
  description: `Conheça o ${SITE_NAME}, plataforma gratuita da Vertech Soluções que conecta brasileiros a dentistas em mais de 5.000 cidades. Compare preços e encontre o profissional ideal.`,
};

export default function SobrePage() {
  const cityCount = getCityCount();
  const procedureCount = getAllProcedures().length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
        ]}
      />

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-6">
        Sobre o {SITE_NAME}
      </h1>

      {/* Hero section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-10">
        <p className="text-lg text-gray-700 leading-relaxed">
          O <strong>{SITE_NAME}</strong> é a maior plataforma gratuita de
          informações odontológicas do Brasil. Reunimos dados de{" "}
          <strong>{cityCount.toLocaleString("pt-BR")} cidades</strong> e{" "}
          <strong>{procedureCount} procedimentos</strong> para ajudar você a
          encontrar o dentista certo, no lugar certo, pelo preço justo.
        </p>
      </div>

      {/* Nossa Missão */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Acreditamos que todo brasileiro merece acesso fácil e transparente a
          informações de saúde bucal. Infelizmente, a falta de dados claros
          sobre preços, especialidades e disponibilidade de dentistas por cidade
          faz com que muitas pessoas adiem tratamentos importantes.
        </p>
        <p className="text-gray-600 leading-relaxed">
          O {SITE_NAME} resolve isso. Com dados atualizados do{" "}
          <strong>IBGE</strong>, <strong>CFO (Conselho Federal de Odontologia)</strong>{" "}
          e pesquisas de mercado, oferecemos estimativas de preços regionalizadas,
          informações sobre especialidades e uma ponte direta com profissionais
          verificados através de plataformas parceiras.
        </p>
      </section>

      {/* Como Funciona */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Como Funciona</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Busque sua cidade</h3>
              <p className="text-sm text-gray-500">
                Pesquise entre {cityCount.toLocaleString("pt-BR")} municípios brasileiros
                para encontrar informações locais.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Compare preços</h3>
              <p className="text-sm text-gray-500">
                Veja estimativas de preços ajustadas para sua região e porte da cidade.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Conheça as especialidades</h3>
              <p className="text-sm text-gray-500">
                Descubra qual especialista você precisa e quais procedimentos cada um realiza.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-cyan-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Encontre profissionais</h3>
              <p className="text-sm text-gray-500">
                Conecte-se com dentistas verificados através de plataformas parceiras.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Dados */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossos Dados</h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Todas as informações do {SITE_NAME} são baseadas em fontes públicas e confiáveis:
        </p>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">&#8226;</span>
            <span><strong>IBGE</strong> — Dados demográficos e geográficos de todos os municípios brasileiros</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">&#8226;</span>
            <span><strong>CFO</strong> — Quantidade de dentistas registrados por estado</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-1">&#8226;</span>
            <span><strong>Pesquisas de mercado</strong> — Estimativas de preços regionalizadas por porte de cidade e região</span>
          </li>
        </ul>
        <p className="text-sm text-gray-400 mt-4">
          Os preços apresentados são estimativas baseadas em médias de mercado e podem
          variar. Sempre consulte diretamente o profissional para valores atualizados.
        </p>
      </section>

      {/* Vertech Section */}
      <section className="mb-10">
        <div className="bg-gradient-to-br from-[#13293D] to-[#006494] rounded-2xl p-8 text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <Image
                src="/images/vertech-logo.png"
                alt="Vertech Soluções"
                width={80}
                height={80}
                className="rounded-xl bg-white p-2"
              />
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">Um produto Vertech Soluções</h2>
              <p className="text-blue-100 leading-relaxed mb-4">
                O {SITE_NAME} faz parte do ecossistema da{" "}
                <a href="https://sitevertech-production.up.railway.app/" target="_blank" rel="noopener noreferrer" className="text-white font-bold underline hover:text-blue-200 transition-colors">Vertech Soluções</a>, empresa de
                tecnologia focada em soluções inovadoras para o setor de saúde.
                Nosso objetivo é conectar pacientes, dentistas e protéticos de forma
                inteligente, usando tecnologia para transformar a odontologia no Brasil.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={PARTNER.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#13293D] px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors"
                >
                  Conheça o {PARTNER.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 border border-white/30 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors"
                >
                  Entre em contato
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Contato</h2>
        <p className="text-gray-600 leading-relaxed">
          Tem sugestões, dúvidas ou quer saber mais sobre nossos produtos?
          Entre em contato pelo email{" "}
          <a
            href="mailto:vertech2026@gmail.com"
            className="text-blue-600 hover:underline"
          >
            vertech2026@gmail.com
          </a>{" "}
          ou visite nossa{" "}
          <Link href="/contato" className="text-blue-600 hover:underline">
            página de contato
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
