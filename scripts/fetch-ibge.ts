/**
 * Fetch all 5,570 Brazilian municipalities from IBGE API
 * Run: npx tsx scripts/fetch-ibge.ts
 */

interface IBGEMunicipio {
  id: number;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        sigla: string;
        nome: string;
        regiao: {
          sigla: string;
          nome: string;
        };
      };
    };
  };
}

interface IBGEPopulacao {
  localidade: string;
  res: Array<{ populacao: string }>;
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function fetchMunicipios(): Promise<IBGEMunicipio[]> {
  console.log("Fetching municipalities from IBGE API...");
  const res = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome"
  );
  if (!res.ok) throw new Error(`IBGE API error: ${res.status}`);
  return res.json();
}

async function fetchPopulacao(): Promise<Map<number, number>> {
  console.log("Fetching population estimates from IBGE...");
  const popMap = new Map<number, number>();

  // Use the IBGE population estimates API
  const res = await fetch(
    "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/-1/variaveis/9324?localidades=N6[all]"
  );

  if (!res.ok) {
    console.warn("Population API unavailable, using fallback estimates");
    return popMap;
  }

  const data = await res.json();
  if (data[0]?.resultados?.[0]?.series) {
    for (const serie of data[0].resultados[0].series) {
      const id = parseInt(serie.localidade.id);
      const values = Object.values(serie.serie) as string[];
      const pop = parseInt(values[values.length - 1]);
      if (!isNaN(pop)) popMap.set(id, pop);
    }
  }

  console.log(`Got population for ${popMap.size} municipalities`);
  return popMap;
}

async function main() {
  const municipios = await fetchMunicipios();
  console.log(`Fetched ${municipios.length} municipalities`);

  const popMap = await fetchPopulacao();

  const cities = municipios
    .filter((m) => m.microrregiao?.mesorregiao?.UF)
    .map((m) => {
      const uf = m.microrregiao.mesorregiao.UF.sigla.toLowerCase();
      const baseSlug = slugify(m.nome);
      const slug = `${baseSlug}-${uf}`;

      return {
        id: m.id,
        nome: m.nome,
        slug,
        uf: uf.toUpperCase(),
        regiao: m.microrregiao.mesorregiao.UF.regiao.nome,
        populacao: popMap.get(m.id) || 0,
        lat: 0,
        lon: 0,
      };
    });

  // Sort by population descending
  cities.sort((a, b) => b.populacao - a.populacao);

  const fs = await import("fs");
  const path = await import("path");
  const outPath = path.join(__dirname, "..", "data", "cities.json");
  fs.writeFileSync(outPath, JSON.stringify(cities, null, 2));
  console.log(`Wrote ${cities.length} cities to ${outPath}`);

  // Stats
  const withPop = cities.filter((c) => c.populacao > 0);
  const over50k = cities.filter((c) => c.populacao > 50000);
  console.log(`Cities with population data: ${withPop.length}`);
  console.log(`Cities over 50k: ${over50k.length}`);
}

main().catch(console.error);
