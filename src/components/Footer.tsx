import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { SITE_NAME, FOOTER_LEGAL } from "@/lib/constants";
import { UF_LIST } from "@/types";

export function Footer() {
  const regioes = ["Norte", "Nordeste", "Centro-Oeste", "Sudeste", "Sul"];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-white mb-4"
            >
              <Stethoscope className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Encontre dentistas perto de você em mais de 5.000 cidades do
              Brasil. Compare preços e especialidades.
            </p>
          </div>

          {/* States by region */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">
              Dentistas por Estado
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
              {UF_LIST.map((uf) => (
                <Link
                  key={uf.sigla}
                  href={`/dentista/${uf.sigla.toLowerCase()}`}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {uf.nome}
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Institucional</h3>
            <div className="flex flex-col gap-2">
              {FOOTER_LEGAL.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Todos os direitos
          reservados. Um produto{" "}
          <a
            href="https://vertech.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Vertech
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
