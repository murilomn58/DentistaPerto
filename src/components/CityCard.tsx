import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { City } from "@/types";
import { formatNumber } from "@/lib/utils";

export function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={`/dentista/${city.slug}`}
      className="group relative block bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-cyan-200/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors font-display">
          {city.nome}
        </h3>
        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2.5 py-0.5 rounded-full">
          {city.uf}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-blue-500" />
          {formatNumber(city.populacao)} hab
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-cyan-500" />
          {city.regiao}
        </span>
      </div>
    </Link>
  );
}
