import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAPartner } from "@/components/CTAPartner";
import { PARTNER } from "@/lib/constants";

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
        <p>
          A Vertech Soluções, responsável pelo {SITE_NAME} ({SITE_URL}),
          valoriza a privacidade dos seus usuários e está comprometida com a
          proteção dos dados pessoais, em conformidade com a Lei Geral de
          Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
        </p>

        <h2>1. Informações que Coletamos</h2>
        <p>
          O {SITE_NAME} é um site de caráter informativo. A coleta de dados
          ocorre de forma limitada e pode incluir:
        </p>
        <ul>
          <li>
            <strong>Dados de navegação:</strong> páginas visitadas, tempo de
            permanência, origem do acesso, tipo de dispositivo e navegador.
            Estes dados são coletados de forma anônima por meio de ferramentas de
            analytics (Google Analytics);
          </li>
          <li>
            <strong>Dados de localização aproximada:</strong> cidade e estado,
            obtidos a partir do endereço IP, utilizados para apresentar
            informações regionalizadas;
          </li>
          <li>
            <strong>Dados fornecidos voluntariamente:</strong> caso o usuário
            entre em contato conosco por email ou WhatsApp, poderemos coletar
            nome, email e telefone para fins de atendimento.
          </li>
        </ul>

        <h2>2. Finalidade do Tratamento de Dados</h2>
        <p>Os dados coletados são utilizados exclusivamente para:</p>
        <ul>
          <li>Melhorar a experiência de navegação e o conteúdo do site;</li>
          <li>
            Apresentar informações relevantes com base na localização do
            usuário;
          </li>
          <li>Gerar estatísticas anônimas de uso do site;</li>
          <li>Responder a solicitações e dúvidas dos usuários;</li>
          <li>Cumprir obrigações legais e regulatórias.</li>
        </ul>

        <h2>3. Base Legal para o Tratamento</h2>
        <p>
          O tratamento de dados pessoais pelo {SITE_NAME} fundamenta-se nas
          seguintes bases legais previstas na LGPD:
        </p>
        <ul>
          <li>
            <strong>Consentimento:</strong> para coleta de cookies não essenciais
            e dados de analytics;
          </li>
          <li>
            <strong>Legítimo interesse:</strong> para melhoria dos serviços e
            geração de estatísticas anônimas;
          </li>
          <li>
            <strong>Cumprimento de obrigação legal:</strong> quando aplicável.
          </li>
        </ul>

        <h2>4. Cookies</h2>
        <p>O {SITE_NAME} utiliza os seguintes tipos de cookies:</p>
        <ul>
          <li>
            <strong>Cookies essenciais:</strong> necessários para o
            funcionamento básico do site;
          </li>
          <li>
            <strong>Cookies de analytics:</strong> utilizados para compreender
            como os visitantes interagem com o site (Google Analytics). Estes
            cookies coletam informações de forma anônima e agregada.
          </li>
        </ul>
        <p>
          Você pode gerenciar ou desativar cookies a qualquer momento nas
          configurações do seu navegador. A desativação de cookies essenciais
          pode afetar o funcionamento do site.
        </p>

        <h2>5. Compartilhamento de Dados</h2>
        <p>
          O {SITE_NAME} não vende, aluga ou comercializa dados pessoais de seus
          usuários. Dados podem ser compartilhados apenas com:
        </p>
        <ul>
          <li>
            <strong>Google Analytics:</strong> para fins de análise estatística,
            conforme a{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Política de Privacidade do Google
            </a>
            ;
          </li>
          <li>
            <strong>Autoridades competentes:</strong> quando exigido por lei ou
            ordem judicial.
          </li>
        </ul>

        <h2>6. Retenção de Dados</h2>
        <p>
          Os dados de navegação coletados por meio de cookies de analytics são
          retidos pelo período padrão configurado no Google Analytics (26 meses).
          Dados fornecidos voluntariamente por meio de contato são mantidos
          apenas pelo tempo necessário para o atendimento da solicitação, salvo
          obrigação legal de manutenção por período superior.
        </p>

        <h2>7. Segurança dos Dados</h2>
        <p>
          Adotamos medidas técnicas e organizacionais adequadas para proteger os
          dados pessoais contra acesso não autorizado, perda, alteração ou
          destruição, incluindo:
        </p>
        <ul>
          <li>Uso de protocolo HTTPS em todo o site;</li>
          <li>Hospedagem em plataforma segura (Vercel) com certificado SSL;</li>
          <li>Acesso restrito a dados apenas a pessoal autorizado.</li>
        </ul>

        <h2>8. Seus Direitos (LGPD)</h2>
        <p>
          De acordo com a LGPD (Lei nº 13.709/2018), você tem os seguintes
          direitos em relação aos seus dados pessoais:
        </p>
        <ul>
          <li>
            <strong>Confirmação e acesso:</strong> saber se tratamos seus dados e
            acessar as informações;
          </li>
          <li>
            <strong>Correção:</strong> solicitar a correção de dados incompletos
            ou desatualizados;
          </li>
          <li>
            <strong>Anonimização ou eliminação:</strong> solicitar a
            anonimização ou exclusão de dados desnecessários;
          </li>
          <li>
            <strong>Portabilidade:</strong> solicitar a transferência dos seus
            dados a outro fornecedor;
          </li>
          <li>
            <strong>Revogação do consentimento:</strong> retirar o consentimento
            a qualquer momento;
          </li>
          <li>
            <strong>Oposição:</strong> opor-se ao tratamento de dados quando
            realizado com base em legítimo interesse.
          </li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, entre em contato conosco pelos
          canais indicados abaixo. Responderemos à sua solicitação em até 15
          dias úteis.
        </p>

        <h2>9. Links Externos</h2>
        <p>
          O {SITE_NAME} pode conter links para sites de terceiros, incluindo o
          {PARTNER.name} e outros parceiros. Esta Política de Privacidade
          aplica-se exclusivamente ao {SITE_NAME}. Recomendamos que o usuário
          consulte as políticas de privacidade dos sites externos antes de
          fornecer qualquer dado pessoal.
        </p>

        <h2>10. Alterações nesta Política</h2>
        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente para
          refletir mudanças nas nossas práticas ou na legislação aplicável. A
          data da última atualização será sempre indicada no topo desta página.
          Recomendamos a revisão periódica desta política.
        </p>

        <h2>11. Contato e Encarregado de Dados</h2>
        <p>
          Para questões sobre privacidade, proteção de dados ou para exercer
          seus direitos previstos na LGPD, entre em contato:
        </p>
        <ul>
          <li>
            <strong>Responsável:</strong> Vertech Soluções
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:vertech2026@gmail.com">vertech2026@gmail.com</a>
          </li>
          <li>
            <strong>Telefone:</strong>{" "}
            <a href="tel:+5549999551051">+55 (49) 99955-1051</a>
          </li>
        </ul>
      </div>

      <section className="mt-12">
        <CTAPartner />
      </section>
    </div>
  );
}
