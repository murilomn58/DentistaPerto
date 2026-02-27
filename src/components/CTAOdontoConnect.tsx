import { ExternalLink } from "lucide-react";
import { getOdontoConnectURL } from "@/lib/constants";

interface CTAProps {
  city?: string;
  procedure?: string;
  variant?: "banner" | "inline";
}

export function CTAOdontoConnect({
  city,
  procedure,
  variant = "banner",
}: CTAProps) {
  const url = getOdontoConnectURL(city, procedure);

  if (variant === "inline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Encontrar dentistas avaliados
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
      <h2 className="text-2xl font-bold mb-3">
        Encontre dentistas avaliados perto de voce
      </h2>
      <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
        O OdontoConnect conecta voce com dentistas verificados, com avaliacoes
        reais de pacientes e agendamento online.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
      >
        Acessar OdontoConnect
        <ExternalLink className="h-5 w-5" />
      </a>
    </section>
  );
}
