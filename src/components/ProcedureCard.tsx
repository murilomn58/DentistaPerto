import Link from "next/link";
import {
  Sparkles,
  CircleDot,
  Smile,
  Stethoscope,
  Shield,
  Scissors,
  Heart,
  Eye,
  Zap,
  Scan,
} from "lucide-react";
import type { Procedure } from "@/types";
import type { City } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { getCityPrice } from "@/lib/pricing";

const procedureIcons: Record<string, React.ElementType> = {
  "clareamento-dental": Sparkles,
  "implante-dentario": CircleDot,
  "lente-de-contato-dental": Smile,
  "aparelho-ortodontico": Stethoscope,
  "protese-dentaria": Shield,
  "canal-dentario": Zap,
  "extracao-de-siso": Scissors,
  "limpeza-dental": Heart,
  "restauracao-dental": Eye,
  "gengivoplastia": Scan,
};

export function ProcedureCard({
  procedure,
  citySlug,
  city,
}: {
  procedure: Procedure;
  citySlug?: string;
  city?: City;
}) {
  const Icon = procedureIcons[procedure.slug] || Stethoscope;
  const href = citySlug
    ? `/quanto-custa/${procedure.slug}/${citySlug}`
    : `/quanto-custa/${procedure.slug}/sao-paulo-sp`;

  // Use city-adjusted price if city is provided
  const price = city ? getCityPrice(procedure, city) : null;
  const min = price ? price.min : procedure.preco_min;
  const max = price ? price.max : procedure.preco_max;

  return (
    <Link
      href={href}
      className="group relative block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-cyan-200/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Top gradient line */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:from-blue-100 group-hover:to-cyan-100 transition-colors duration-300">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5 font-display">
          {procedure.nome}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
          {procedure.descricao}
        </p>
        <div className="inline-flex items-center gap-1 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
          {min === 0
            ? `Ate ${formatCurrency(max)}`
            : `${formatCurrency(min)} - ${formatCurrency(max)}`}
        </div>
      </div>
    </Link>
  );
}
