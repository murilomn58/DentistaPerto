import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, PARTNER } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getCityCount } from "@/lib/cities";
import { getAllProcedures } from "@/lib/procedures";
import { MapPin, Search, TrendingUp, Users, ExternalLink, Shield, Cpu, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_NAME}`,
  description: `Conheça o ${SITE_NAME}, plataforma gratuita da Vertech Soluções que conecta brasileiros a dentistas em mais de 5.000 cidades. Compare preços e encontre o profissional ideal.`,
};

function VertechLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 52"
      fill="none"
      className={className}
    >
      <path
        d="M30 52L4 18L12 18L30 44L48 18L56 18L30 52Z"
        fill="#22D3EE"
      />
      <path
        d="M30 40L10 10L18 10L30 28L42 10L50 10L30 40Z"
        fill="#0891B2"
        fillOpacity="0.6"
      />
      <path
        d="M22 0L30 12L38 0"
        stroke="#22D3EE"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

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
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl card-hover">
            <div className="flex-shrink-0 w-10 h-10 icon-gradient rounded-lg flex items-center justify-center">
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
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl card-hover">
            <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Compare preços</h3>
              <p className="text-sm text-gray-500">
                Veja estimativas de preços ajustadas para sua região e porte da cidade.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl card-hover">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Conheça as especialidades</h3>
              <p className="text-sm text-gray-500">
                Descubra qual especialista você precisa e quais procedimentos cada um realiza.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-xl card-hover">
            <div className="flex-shrink-0 w-10 h-10 bg-cyan-50 rounded-lg flex items-center justify-center">
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
            <span className="text-[#0891B2] mt-1">&#8226;</span>
            <span><strong>IBGE</strong> — Dados demográficos e geográficos de todos os municípios brasileiros</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#0891B2] mt-1">&#8226;</span>
            <span><strong>CFO</strong> — Quantidade de dentistas registrados por estado</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#0891B2] mt-1">&#8226;</span>
            <span><strong>Pesquisas de mercado</strong> — Estimativas de preços regionalizadas por porte de cidade e região</span>
          </li>
        </ul>
        <p className="text-sm text-gray-400 mt-4">
          Os preços apresentados são estimativas baseadas em médias de mercado e podem
          variar. Sempre consulte diretamente o profissional para valores atualizados.
        </p>
      </section>

      {/* Vertech Section — Brand Identity */}
      <section className="mb-10">
        <div className="relative bg-[#0F172A] rounded-2xl overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#0891B2]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#22D3EE]/8 rounded-full blur-3xl" />
            {/* Top accent bar matching brand */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0891B2] to-[#22D3EE]" />
          </div>

          <div className="relative p-8 md:p-10">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-4 mb-6">
              <VertechLogo className="w-14 h-14 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  VERTECH
                </h2>
                <p className="text-[#22D3EE] text-sm tracking-[0.25em] font-medium">
                  SOLUÇÕES
                </p>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-[#22D3EE] text-lg font-medium italic mb-6">
              Tecnologia que mantém você à frente.
            </p>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl">
              O {SITE_NAME} faz parte do ecossistema da{" "}
              <a
                href="https://sitevertech-production.up.railway.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#22D3EE] font-semibold hover:text-white transition-colors"
              >
                Vertech Soluções
              </a>
              , empresa especializada em IA aplicada, automação e segurança para
              pequenas e médias empresas. Conectamos tecnologia de ponta às
              necessidades reais do seu negócio, com atendimento personalizado e
              soluções sob medida.
            </p>

            {/* Capabilities */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 bg-[#0891B2]/20 rounded-lg flex items-center justify-center mb-3">
                  <Cpu className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">IA Aplicada</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Soluções inteligentes com inteligência artificial para otimizar processos.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 bg-[#0891B2]/20 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">Automação</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Automatize tarefas repetitivas e foque no crescimento do seu negócio.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 bg-[#0891B2]/20 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-[#22D3EE]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">Segurança</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Proteção de dados e infraestrutura com as melhores práticas do mercado.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://sitevertech-production.up.railway.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0891B2] to-[#22D3EE] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-[#0891B2]/90 hover:to-[#22D3EE]/90 transition-all duration-300 shadow-lg shadow-[#0891B2]/25"
              >
                Conheça a Vertech
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={PARTNER.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/20 transition-all duration-300"
              >
                Conheça o {PARTNER.name}
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 border border-[#22D3EE]/30 text-[#22D3EE] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#22D3EE]/10 transition-all duration-300"
              >
                Entre em contato
              </Link>
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
