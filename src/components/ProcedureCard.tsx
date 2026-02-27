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
      className="group block bg-white border border-gray-100 rounded-xl p-5 hover:border-blue-200 hover:shadow-md transition-all"
    >
      <Icon className="h-8 w-8 text-blue-600 mb-3" />
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
        {procedure.nome}
      </h3>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
        {procedure.descricao}
      </p>
      <div className="text-sm font-medium text-blue-700">
        {min === 0
          ? `Até ${formatCurrency(max)}`
          : `${formatCurrency(min)} - ${formatCurrency(max)}`}
      </div>
    </Link>
  );
}
