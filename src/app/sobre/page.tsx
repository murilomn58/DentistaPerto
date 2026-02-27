import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_NAME}`,
  description: `Conheça o ${SITE_NAME}, a plataforma que ajuda você a encontrar dentistas perto de você em todo o Brasil.`,
};

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Sobre", href: "/sobre" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">
        Sobre o {SITE_NAME}
      </h1>

      <div className="prose prose-gray max-w-none">
        <p>
          O {SITE_NAME} é uma plataforma gratuita que ajuda brasileiros a
          encontrar dentistas de qualidade em sua cidade. Nosso objetivo é
          democratizar o acesso à informação odontológica no Brasil.
        </p>

        <h2>Nossa Missão</h2>
        <p>
          Acreditamos que todos os brasileiros merecem acesso fácil a informações
          sobre saúde bucal. Por isso, reunimos dados de mais de 5.000 cidades,
          20 procedimentos e milhares de profissionais para ajudar você a tomar a
          melhor decisão.
        </p>

        <h2>Como Funciona</h2>
        <p>
          Basta buscar sua cidade ou estado para encontrar informações sobre
          dentistas disponíveis, preços médios de procedimentos e dicas de saúde
          bucal. Quando estiver pronto para agendar, o{" "}
          <a
            href="https://odonto-connect.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            OdontoConnect
          </a>{" "}
          conecta você diretamente com profissionais verificados.
        </p>

        <h2>Vertech</h2>
        <p>
          O {SITE_NAME} é um produto da Vertech, empresa de tecnologia focada em
          soluções inovadoras para o setor de saúde.
        </p>
      </div>
    </div>
  );
}
