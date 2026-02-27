import type { City, Procedure } from "@/types";

/**
 * Calcula multiplicador de preço baseado na cidade.
 * Fatores: região, população, se é capital.
 * Referência base = 1.0 (média nacional, cidade ~200k hab)
 */

const REGION_MULTIPLIER: Record<string, number> = {
  Sudeste: 1.15,
  Sul: 1.05,
  "Centro-Oeste": 1.0,
  Nordeste: 0.85,
  Norte: 0.80,
};

const CAPITALS = new Set([
  "Rio Branco", "Maceió", "Manaus", "Macapá", "Salvador", "Fortaleza",
  "Brasília", "Vitória", "Goiânia", "São Luís", "Belo Horizonte",
  "Campo Grande", "Cuiabá", "Belém", "João Pessoa", "Recife",
  "Teresina", "Curitiba", "Rio de Janeiro", "Natal", "Porto Velho",
  "Boa Vista", "Porto Alegre", "Florianópolis", "Aracaju",
  "São Paulo", "Palmas",
]);

function getPopulationMultiplier(pop: number): number {
  if (pop >= 5_000_000) return 1.25;   // Metrópoles (SP, RJ)
  if (pop >= 1_000_000) return 1.15;   // Grandes capitais
  if (pop >= 500_000) return 1.08;     // Cidades grandes
  if (pop >= 200_000) return 1.0;      // Cidades médias
  if (pop >= 100_000) return 0.93;     // Cidades médio-pequenas
  if (pop >= 50_000) return 0.88;      // Cidades pequenas
  if (pop >= 20_000) return 0.82;      // Cidades muito pequenas
  return 0.75;                          // Municípios rurais
}

function getCityMultiplier(city: City): number {
  const regionMult = REGION_MULTIPLIER[city.regiao] ?? 1.0;
  const popMult = getPopulationMultiplier(city.populacao);
  const capitalBonus = CAPITALS.has(city.nome) ? 1.05 : 1.0;

  return regionMult * popMult * capitalBonus;
}

export interface CityPriceRange {
  min: number;
  max: number;
  label: string;
}

/**
 * Retorna faixa de preço ajustada para uma cidade específica.
 * Arredonda para valores "limpos" (múltiplos de 50).
 */
export function getCityPrice(procedure: Procedure, city: City): CityPriceRange {
  const mult = getCityMultiplier(city);

  const rawMin = procedure.preco_min * mult;
  const rawMax = procedure.preco_max * mult;

  // Arredonda para múltiplo de 50 mais próximo
  const min = Math.round(rawMin / 50) * 50;
  const max = Math.round(rawMax / 50) * 50;

  return {
    min: Math.max(min, 0),
    max: Math.max(max, 50),
    label: getCostLabel(mult),
  };
}

function getCostLabel(mult: number): string {
  if (mult >= 1.3) return "acima da média nacional";
  if (mult >= 1.1) return "ligeiramente acima da média";
  if (mult >= 0.9) return "na média nacional";
  if (mult >= 0.75) return "abaixo da média nacional";
  return "bem abaixo da média nacional";
}

/**
 * Retorna texto descritivo sobre os preços na cidade.
 */
export function getPriceContext(city: City): string {
  const mult = getCityMultiplier(city);
  const isCapital = CAPITALS.has(city.nome);

  if (mult >= 1.3) {
    return `${city.nome} é uma das cidades com maior custo de vida do Brasil, o que se reflete nos preços de procedimentos odontológicos. A alta concentração de profissionais especializados e a demanda elevada contribuem para valores acima da média nacional.`;
  }
  if (mult >= 1.1) {
    return `${city.nome}${isCapital ? ", como capital," : ""} possui preços ligeiramente acima da média nacional para procedimentos odontológicos. A boa infraestrutura e a variedade de profissionais permitem encontrar opções com diferentes faixas de preço.`;
  }
  if (mult >= 0.9) {
    return `Os preços de procedimentos odontológicos em ${city.nome} estão na média nacional. A cidade oferece boa relação custo-benefício com profissionais qualificados a preços acessíveis.`;
  }
  return `${city.nome} apresenta preços abaixo da média nacional para procedimentos odontológicos, tornando-se uma opção mais acessível. A região oferece bons profissionais com valores competitivos.`;
}
