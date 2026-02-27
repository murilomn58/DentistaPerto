import cfoData from "@/../data/cfo-stats.json";
import type { CFOStats, UFStats } from "@/types";

const stats: CFOStats = cfoData as CFOStats;

export function getCFOStats(): CFOStats {
  return stats;
}

export function getStatsByUF(uf: string): UFStats | undefined {
  return stats.estados[uf.toUpperCase()];
}

export function getDentistCount(uf: string): number {
  return stats.estados[uf.toUpperCase()]?.total || 0;
}

export function getTotalDentists(): number {
  return stats.total_brasil;
}

export function getDentistRatio(uf: string): number {
  return stats.estados[uf.toUpperCase()]?.proporcao || 0;
}
