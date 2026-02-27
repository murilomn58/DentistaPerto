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
            className="glass-card rounded-2xl p-6 text-center card-hover shadow-sm"
          >
            <div className="icon-gradient-solid w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gradient">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 mt-1 font-medium">
              {stat.label}
            </div>
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
          label: "População",
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
