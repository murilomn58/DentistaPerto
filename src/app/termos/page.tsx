import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Termos de Uso | ${SITE_NAME}`,
  description: `Termos de uso do ${SITE_NAME}. Leia antes de utilizar nossos servicos.`,
};

export default function TermosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Termos de Uso", href: "/termos" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">
        Termos de Uso
      </h1>

      <div className="prose prose-gray max-w-none">
        <p>
          <strong>Ultima atualizacao:</strong> Fevereiro de 2026
        </p>

        <h2>1. Aceitacao dos Termos</h2>
        <p>
          Ao acessar e utilizar o {SITE_NAME} ({SITE_URL}), voce concorda com
          estes termos de uso. Se nao concordar, por favor nao utilize o site.
        </p>

        <h2>2. Natureza do Servico</h2>
        <p>
          O {SITE_NAME} e um site informativo que reune dados publicos sobre
          odontologia no Brasil. As informacoes sobre precos, procedimentos e
          quantidades de dentistas sao estimativas baseadas em fontes publicas
          e nao constituem recomendacao medica.
        </p>

        <h2>3. Isencao de Responsabilidade</h2>
        <p>
          Os precos apresentados sao valores medios de referencia e podem variar.
          Sempre consulte diretamente o profissional para obter valores
          atualizados. O {SITE_NAME} nao se responsabiliza por decisoes tomadas
          com base nas informacoes do site.
        </p>

        <h2>4. Propriedade Intelectual</h2>
        <p>
          Todo o conteudo do {SITE_NAME}, incluindo textos, design e codigo,
          e propriedade da Vertech e protegido por leis de direitos autorais.
        </p>

        <h2>5. Links para Terceiros</h2>
        <p>
          O site pode direcionar para plataformas parceiras como o
          OdontoConnect. Cada plataforma possui seus proprios termos de uso.
        </p>

        <h2>6. Contato</h2>
        <p>
          Duvidas sobre estes termos podem ser enviadas para{" "}
          <a href="mailto:contato@dentistaperto.com.br">
            contato@dentistaperto.com.br
          </a>
          .
        </p>
      </div>
    </div>
  );
}
