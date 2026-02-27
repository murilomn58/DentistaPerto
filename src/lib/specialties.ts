import specialtiesData from "@/../data/specialties.json";
import type { Specialty } from "@/types";

const specialties: Specialty[] = specialtiesData as Specialty[];

export function getAllSpecialties(): Specialty[] {
  return specialties;
}

export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return specialties.find((s) => s.slug === slug);
}
