import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Política de Privacidade | ${SITE_NAME}`,
  description: `Política de privacidade do ${SITE_NAME}. Saiba como tratamos seus dados.`,
};

export default function PrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Privacidade", href: "/privacidade" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">
        Política de Privacidade
      </h1>

      <div className="prose prose-gray max-w-none">
        <p>
          <strong>Última atualização:</strong> Fevereiro de 2026
        </p>

        <h2>1. Informações que coletamos</h2>
        <p>
          O {SITE_NAME} ({SITE_URL}) é um site informativo. Não coletamos dados
          pessoais diretamente. Podemos utilizar ferramentas de analytics
          (Google Analytics) que coletam dados anônimos de navegação como
          páginas visitadas, tempo no site e localização aproximada.
        </p>

        <h2>2. Cookies</h2>
        <p>
          Utilizamos cookies essenciais para funcionamento do site e cookies de
          analytics para entender como os visitantes utilizam nossas páginas.
          Você pode desativar cookies nas configurações do seu navegador.
        </p>

        <h2>3. Links externos</h2>
        <p>
          Nosso site pode conter links para sites de terceiros, incluindo o
          OdontoConnect. Não nos responsabilizamos pelas práticas de privacidade
          desses sites.
        </p>

        <h2>4. Seus direitos (LGPD)</h2>
        <p>
          De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem
          direito a acessar, corrigir, eliminar e portar seus dados pessoais.
          Para exercer esses direitos, entre em contato conosco.
        </p>

        <h2>5. Contato</h2>
        <p>
          Para questões sobre privacidade, envie um email para{" "}
          <a href="mailto:contato@dentistaperto.com.br">
            contato@dentistaperto.com.br
          </a>
          .
        </p>
      </div>
    </div>
  );
}
