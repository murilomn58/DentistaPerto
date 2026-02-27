import { ExternalLink } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { BrazilMap } from "@/components/BrazilMap";
import { ProcedureCard } from "@/components/ProcedureCard";
import { CityCard } from "@/components/CityCard";
import { CTAPartner } from "@/components/CTAPartner";
import { StatsSection } from "@/components/StatsSection";
import { getTopCities, getAllCities, getCityCount, getTotalPopulation } from "@/lib/cities";
import { getTopProcedures } from "@/lib/procedures";
import { getTotalDentists } from "@/lib/cfo-stats";
import { formatNumber } from "@/lib/utils";
import { getPartnerURL, PARTNER } from "@/lib/constants";

export default function Home() {
  const topCities = getTopCities(12);
  const procedures = getTopProcedures(8);
  const searchCities = getAllCities().map((c) => ({
    nome: c.nome,
    slug: c.slug,
    uf: c.uf,
    populacao: c.populacao,
  }));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 py-20 md:py-28 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-400/15 rounded-full blur-3xl animate-float-delayed" />
          <svg
            className="absolute top-10 right-10 opacity-10 animate-float"
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
          >
            <path
              d="M60 10C65 10 75 15 78 30C81 45 85 50 95 55C85 60 81 65 78 80C75 95 65 100 60 100C55 100 45 95 42 80C39 65 35 60 25 55C35 50 39 45 42 30C45 15 55 10 60 10Z"
              fill="white"
            />
          </svg>
          <svg
            className="absolute bottom-20 left-20 opacity-10 animate-float-delayed"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle cx="40" cy="40" r="35" stroke="white" strokeWidth="2" />
            <path d="M40 20C50 20 55 30 55 40C55 50 50 60 40 60C30 60 25 50 25 40C25 30 30 20 40 20Z" fill="white" fillOpacity="0.3" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-100 font-medium">
              +{formatNumber(getCityCount())} cidades cobertas
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Encontre um{" "}
            <span className="text-cyan-300">dentista</span>
            <br className="hidden sm:block" /> perto de você
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Compare preços, especialidades e encontre o dentista ideal em mais de{" "}
            {formatNumber(getCityCount())} cidades do Brasil.
          </p>

          <div className="flex justify-center mb-8">
            <SearchBar cities={searchCities} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getPartnerURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-7 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-blue-900/20 animate-pulse-glow"
            >
              {PARTNER.cta}
              <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-sm text-blue-200">
              Agende pelo {PARTNER.name}
            </span>
          </div>
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

      {/* Brazil Map + Top Cities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dentistas em <span className="text-gradient">todo o Brasil</span>
            </h2>
            <p className="text-gray-600 mb-6">
              Clique em um estado para ver as cidades disponíveis.
            </p>
            <BrazilMap />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Maiores cidades
            </h2>
            <div className="grid gap-3">
              {topCities.map((city) => (
                <CityCard key={city.slug} city={city} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Procedimentos <span className="text-gradient">mais buscados</span>
          </h2>
          <p className="text-gray-600 mb-10 text-center max-w-2xl mx-auto">
            Veja os preços médios dos procedimentos odontológicos mais populares.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {procedures.map((proc) => (
              <ProcedureCard key={proc.slug} procedure={proc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <CTAPartner />
      </section>
    </>
  );
}
