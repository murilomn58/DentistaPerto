export interface City {
  id: number;
  nome: string;
  slug: string;
  uf: string;
  regiao: string;
  populacao: number;
  lat: number;
  lon: number;
}

export interface Procedure {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  preco_min: number;
  preco_max: number;
  keywords: string[];
}

export interface Specialty {
  id: number;
  nome: string;
  slug: string;
  descricao: string;
  procedimentos_relacionados: string[];
}

export interface CFOStats {
  fonte: string;
  total_brasil: number;
  estados: Record<string, UFStats>;
}

export interface UFStats {
  total: number;
  populacao: number;
  proporcao: number;
}

export interface BlogPost {
  slug: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  data: string;
  autor: string;
  tags: string[];
  cidades_relacionadas: string[];
  procedimentos_relacionados: string[];
}

export interface UF {
  sigla: string;
  nome: string;
  regiao: string;
}

export const UF_MAP: Record<string, string> = {
  AC: "Acre",
  AL: "Alagoas",
  AM: "Amazonas",
  AP: "Amapa",
  BA: "Bahia",
  CE: "Ceara",
  DF: "Distrito Federal",
  ES: "Espirito Santo",
  GO: "Goias",
  MA: "Maranhao",
  MG: "Minas Gerais",
  MS: "Mato Grosso do Sul",
  MT: "Mato Grosso",
  PA: "Para",
  PB: "Paraiba",
  PE: "Pernambuco",
  PI: "Piaui",
  PR: "Parana",
  RJ: "Rio de Janeiro",
  RN: "Rio Grande do Norte",
  RO: "Rondonia",
  RR: "Roraima",
  RS: "Rio Grande do Sul",
  SC: "Santa Catarina",
  SE: "Sergipe",
  SP: "Sao Paulo",
  TO: "Tocantins",
};

export const UF_LIST: UF[] = [
  { sigla: "AC", nome: "Acre", regiao: "Norte" },
  { sigla: "AL", nome: "Alagoas", regiao: "Nordeste" },
  { sigla: "AM", nome: "Amazonas", regiao: "Norte" },
  { sigla: "AP", nome: "Amapa", regiao: "Norte" },
  { sigla: "BA", nome: "Bahia", regiao: "Nordeste" },
  { sigla: "CE", nome: "Ceara", regiao: "Nordeste" },
  { sigla: "DF", nome: "Distrito Federal", regiao: "Centro-Oeste" },
  { sigla: "ES", nome: "Espirito Santo", regiao: "Sudeste" },
  { sigla: "GO", nome: "Goias", regiao: "Centro-Oeste" },
  { sigla: "MA", nome: "Maranhao", regiao: "Nordeste" },
  { sigla: "MG", nome: "Minas Gerais", regiao: "Sudeste" },
  { sigla: "MS", nome: "Mato Grosso do Sul", regiao: "Centro-Oeste" },
  { sigla: "MT", nome: "Mato Grosso", regiao: "Centro-Oeste" },
  { sigla: "PA", nome: "Para", regiao: "Norte" },
  { sigla: "PB", nome: "Paraiba", regiao: "Nordeste" },
  { sigla: "PE", nome: "Pernambuco", regiao: "Nordeste" },
  { sigla: "PI", nome: "Piaui", regiao: "Nordeste" },
  { sigla: "PR", nome: "Parana", regiao: "Sul" },
  { sigla: "RJ", nome: "Rio de Janeiro", regiao: "Sudeste" },
  { sigla: "RN", nome: "Rio Grande do Norte", regiao: "Nordeste" },
  { sigla: "RO", nome: "Rondonia", regiao: "Norte" },
  { sigla: "RR", nome: "Roraima", regiao: "Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul", regiao: "Sul" },
  { sigla: "SC", nome: "Santa Catarina", regiao: "Sul" },
  { sigla: "SE", nome: "Sergipe", regiao: "Nordeste" },
  { sigla: "SP", nome: "Sao Paulo", regiao: "Sudeste" },
  { sigla: "TO", nome: "Tocantins", regiao: "Norte" },
];
