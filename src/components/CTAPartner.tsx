import { ExternalLink } from "lucide-react";
import { getPartnerURL, PARTNER } from "@/lib/constants";

interface CTAProps {
  city?: string;
  procedure?: string;
  variant?: "banner" | "inline";
}

export function CTAPartner({
  city,
  procedure,
  variant = "banner",
}: CTAProps) {
  const url = getPartnerURL(city, procedure);

  if (variant === "inline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
      >
        {PARTNER.cta}
        <ExternalLink className="h-4 w-4" />
      </a>
    );
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-2xl p-10 text-white text-center overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-bg pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl" />

      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          {PARTNER.cta} perto de você
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
          O {PARTNER.name} {PARTNER.description}.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-xl shadow-blue-900/20"
        >
          {PARTNER.ctaAction} {PARTNER.name}
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}

// Backwards compat alias
export const CTAOdontoConnect = CTAPartner;
