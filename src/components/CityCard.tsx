import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import type { City } from "@/types";
import { formatNumber } from "@/lib/utils";

export function CityCard({ city }: { city: City }) {
  return (
    <Link
      href={`/dentista/${city.slug}`}
      className="group block bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {city.nome}
        </h3>
        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
          {city.uf}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {formatNumber(city.populacao)} hab
        </span>
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" />
          {city.regiao}
        </span>
      </div>
    </Link>
  );
}
