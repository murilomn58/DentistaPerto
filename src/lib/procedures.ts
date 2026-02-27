import proceduresData from "@/../data/procedures.json";
import type { Procedure } from "@/types";

const procedures: Procedure[] = proceduresData as Procedure[];

export function getAllProcedures(): Procedure[] {
  return procedures;
}

export function getProcedureBySlug(slug: string): Procedure | undefined {
  return procedures.find((p) => p.slug === slug);
}

export function getTopProcedures(n: number): Procedure[] {
  return procedures.slice(0, n);
}
