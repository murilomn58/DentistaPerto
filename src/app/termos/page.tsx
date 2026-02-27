import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Termos de Uso | ${SITE_NAME}`,
  description: `Termos de uso do ${SITE_NAME}. Leia antes de utilizar nossos serviços.`,
};

export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Termos de Uso", href: "/termos" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">
        Termos de Uso
      </h1>

      <div className="prose prose-gray max-w-none">
        <p>
          <strong>Última atualização:</strong> Fevereiro de 2026
        </p>

        <h2>1. Aceitação dos Termos</h2>
        <p>
          Ao acessar e utilizar o {SITE_NAME} ({SITE_URL}), você concorda com
          estes termos de uso. Se não concordar, por favor não utilize o site.
        </p>

        <h2>2. Natureza do Serviço</h2>
        <p>
          O {SITE_NAME} é um site informativo que reúne dados públicos sobre
          odontologia no Brasil. As informações sobre preços, procedimentos e
          quantidades de dentistas são estimativas baseadas em fontes públicas
          e não constituem recomendação médica.
        </p>

        <h2>3. Isenção de Responsabilidade</h2>
        <p>
          Os preços apresentados são valores médios de referência e podem variar.
          Sempre consulte diretamente o profissional para obter valores
          atualizados. O {SITE_NAME} não se responsabiliza por decisões tomadas
          com base nas informações do site.
        </p>

        <h2>4. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo do {SITE_NAME}, incluindo textos, design e código,
          é propriedade da Vertech e protegido por leis de direitos autorais.
        </p>

        <h2>5. Links para Terceiros</h2>
        <p>
          O site pode direcionar para plataformas parceiras como o
          OdontoConnect. Cada plataforma possui seus próprios termos de uso.
        </p>

        <h2>6. Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas para{" "}
          <a href="mailto:contato@dentistaperto.com.br">
            contato@dentistaperto.com.br
          </a>
          .
        </p>
      </div>
    </div>
  );
}
