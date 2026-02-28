"use client";

import { Users, MapPin, Activity, Building2 } from "lucide-react";
import { formatNumberFull } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";

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
    <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4" staggerDelay={0.1}>
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <StaggerItem key={stat.label}>
            <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:border-cyan-200/50 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-display">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-slate-500 mt-1 font-medium">
                {stat.label}
              </div>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
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
