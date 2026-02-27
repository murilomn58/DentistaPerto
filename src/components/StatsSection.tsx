import { Users, MapPin, Activity, Building2 } from "lucide-react";
import { formatNumberFull } from "@/lib/utils";

interface Stat {
  label: string;
  value: string;
  icon: "dentists" | "population" | "ratio" | "cities";
}

const iconMap = {
  dentists: Users,
  population: MapPin,
  ratio: Activity,
  cities: Building2,
};

export function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <div
            key={stat.label}
            className="bg-white border border-gray-100 rounded-xl p-5 text-center"
          >
            <Icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

export function CityStatsSection({
  populacao,
  dentistasUF,
  uf,
  proporcao,
}: {
  populacao: number;
  dentistasUF: number;
  uf: string;
  proporcao: number;
}) {
  return (
    <StatsSection
      stats={[
        {
          label: "Populacao",
          value: formatNumberFull(populacao),
          icon: "population",
        },
        {
          label: `Dentistas no ${uf}`,
          value: formatNumberFull(dentistasUF),
          icon: "dentists",
        },
        {
          label: "Por 1.000 hab",
          value: proporcao.toFixed(2),
          icon: "ratio",
        },
        {
          label: "Especialidades",
          value: "10+",
          icon: "cities",
        },
      ]}
    />
  );
}
