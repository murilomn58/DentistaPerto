import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { City } from "@/types";
import { formatNumber } from "@/lib/utils";

export function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={`/dentista/${city.slug}`}
      className="group block bg-white rounded-2xl p-5 card-hover gradient-border shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {city.nome}
        </h3>
        <span className="text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-2.5 py-0.5 rounded-full">
          {city.uf}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
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
