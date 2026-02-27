import { ExternalLink } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { BrazilMap } from "@/components/BrazilMap";
import { ProcedureCard } from "@/components/ProcedureCard";
import { CityCard } from "@/components/CityCard";
import { CTAOdontoConnect } from "@/components/CTAOdontoConnect";
import { StatsSection } from "@/components/StatsSection";
import { getTopCities, getAllCities, getCityCount, getTotalPopulation } from "@/lib/cities";
import { getTopProcedures } from "@/lib/procedures";
import { getTotalDentists } from "@/lib/cfo-stats";
import { formatNumber } from "@/lib/utils";
import { getOdontoConnectURL } from "@/lib/constants";

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
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Encontre um <span className="text-blue-600">dentista</span> perto de
            você
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare preços, especialidades e encontre o dentista ideal em mais de{" "}
            {formatNumber(getCityCount())} cidades do Brasil.
          </p>
          <div className="flex justify-center mb-6">
            <SearchBar cities={searchCities} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={getOdontoConnectURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Encontrar dentistas avaliados
              <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-sm text-gray-400">
              Agende pelo OdontoConnect
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Dentistas em todo o Brasil
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
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Procedimentos mais buscados
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            Veja os preços médios dos procedimentos odontológicos mais populares.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {procedures.map((proc) => (
              <ProcedureCard key={proc.slug} procedure={proc} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CTAOdontoConnect />
      </section>
    </>
  );
}
