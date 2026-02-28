import { ExternalLink, ChevronRight, MapPin, Users, Sparkles } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { BrazilMap } from "@/components/BrazilMap";
import { ProcedureCard } from "@/components/ProcedureCard";
import { CTAPartner } from "@/components/CTAPartner";
import { StatsSection } from "@/components/StatsSection";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal";
import { getTopCities, getAllCities, getCityCount, getTotalPopulation } from "@/lib/cities";
import { getTopProcedures } from "@/lib/procedures";
import { getTotalDentists, getCFOStats } from "@/lib/cfo-stats";
import { formatNumber } from "@/lib/utils";
import { getPartnerURL, PARTNER } from "@/lib/constants";
import Link from "next/link";

export default function Home() {
  const topCities = getTopCities(12);
  const procedures = getTopProcedures(8);
  const searchCities = getAllCities().map((c) => ({
    nome: c.nome,
    slug: c.slug,
    uf: c.uf,
    populacao: c.populacao,
  }));
  const cfoStats = getCFOStats();

  // Find max population for bar chart scaling
  const maxPop = Math.max(...topCities.map((c) => c.populacao));

  return (
    <>
      {/* Hero */}
      <section className="relative hero-gradient py-24 md:py-32 overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid" />

        {/* Decorative blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-cyan-400/15 rounded-full blur-[100px] animate-float" />
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[15%] w-2 h-2 bg-cyan-400/40 rounded-full animate-float" />
          <div className="absolute top-40 left-[10%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float-delayed" />
          <div className="absolute bottom-32 right-[25%] w-1 h-1 bg-cyan-300/30 rounded-full animate-float" />
          <div className="absolute top-1/3 left-[30%] w-2.5 h-2.5 bg-blue-300/20 rounded-full animate-float-delayed" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-full px-5 py-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-sm text-blue-100/90 font-medium tracking-wide">
                +{formatNumber(getCityCount())} cidades cobertas
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight font-display">
              Encontre um{" "}
              <span className="relative">
                <span className="text-cyan-300">dentista</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C40 2 80 1 100 3C120 5 160 6 199 2.5" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                </svg>
              </span>
              <br className="hidden sm:block" /> perto de voce
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Compare precos, especialidades e encontre o dentista ideal em mais de{" "}
              <span className="text-cyan-300 font-semibold">{formatNumber(getCityCount())}</span> cidades do Brasil.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex justify-center mb-10">
              <SearchBar cities={searchCities} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getPartnerURL()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:bg-cyan-50 transition-all duration-300 shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-0.5"
              >
                <Sparkles className="h-4 w-4 text-cyan-500" />
                {PARTNER.cta}
                <ExternalLink className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </a>
              <span className="text-sm text-blue-200/60">
                Agende pelo {PARTNER.name}
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <StatsSection
          stats={[
            {
              label: "Cidades",
              value: formatNumber(getCityCount()),
              icon: "cities",
            },
            {
              label: "Dentistas",
              value: formatNumber(getTotalDentists()),
              icon: "dentists",
            },
            {
              label: "Brasileiros",
              value: formatNumber(getTotalPopulation()),
              icon: "population",
            },
            {
              label: "Procedimentos",
              value: "20+",
              icon: "ratio",
            },
          ]}
        />
      </section>

      {/* Brazil Map + Top Cities - Dark Section */}
      <section className="relative mesh-gradient-dark py-24 mt-20 overflow-hidden noise-overlay">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 dot-grid opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Map Side */}
            <ScrollReveal direction="left">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-cyan-400/80 text-sm font-semibold tracking-widest uppercase mb-4">
                    <MapPin className="w-4 h-4" />
                    Cobertura Nacional
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight font-display">
                    Dentistas em{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                      todo o Brasil
                    </span>
                  </h2>
                  <p className="text-slate-400 mt-3 text-lg">
                    Clique em um estado para ver as cidades disponiveis.
                  </p>
                </div>

                {/* Map Card */}
                <div className="relative rounded-2xl bg-slate-900/50 border border-slate-700/30 p-6 glow-ring">
                  <BrazilMap cfoData={cfoStats.estados} />
                </div>
              </div>
            </ScrollReveal>

            {/* Top Cities Side */}
            <ScrollReveal direction="right">
              <div>
                <div className="mb-8">
                  <span className="inline-flex items-center gap-2 text-blue-400/80 text-sm font-semibold tracking-widest uppercase mb-4">
                    <Users className="w-4 h-4" />
                    Destaque
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight font-display">
                    Maiores cidades
                  </h2>
                  <p className="text-slate-400 mt-3">
                    As principais cidades com dentistas cadastrados.
                  </p>
                </div>

                <StaggerContainer className="space-y-2.5" staggerDelay={0.06}>
                  {topCities.map((city, i) => (
                    <StaggerItem key={city.slug}>
                      <Link
                        href={`/dentista/${city.slug}`}
                        className="group flex items-center gap-4 bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/20 hover:border-cyan-500/20 rounded-xl px-5 py-3.5 transition-all duration-300"
                      >
                        <span className="text-sm font-bold text-slate-600 w-6 text-right font-display">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                              {city.nome}
                            </span>
                            <div className="flex items-center gap-2 shrink-0 ml-3">
                              <span className="text-xs text-slate-400">
                                {formatNumber(city.populacao)}
                              </span>
                              <span className="text-[10px] font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-0.5 rounded-full">
                                {city.uf}
                              </span>
                            </div>
                          </div>
                          {/* Population bar */}
                          <div className="h-1 bg-slate-700/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-fill-bar"
                              style={{
                                width: `${Math.max((city.populacao / maxPop) * 100, 5)}%`,
                              }}
                            />
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="relative bg-gradient-to-b from-slate-50 to-white py-24 overflow-hidden">
        {/* Subtle decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 text-blue-600/80 text-sm font-semibold tracking-widest uppercase mb-4">
                <Sparkles className="w-4 h-4" />
                Procedimentos
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight font-display">
                Procedimentos{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  mais buscados
                </span>
              </h2>
              <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-lg">
                Veja os precos medios dos procedimentos odontologicos mais populares.
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
            {procedures.map((proc) => (
              <StaggerItem key={proc.slug}>
                <ProcedureCard procedure={proc} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ScrollReveal>
          <CTAPartner />
        </ScrollReveal>
      </section>
    </>
  );
}
