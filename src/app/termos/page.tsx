import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAPartner } from "@/components/CTAPartner";
import { PARTNER } from "@/lib/constants";

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
          Ao acessar e utilizar o {SITE_NAME} ({SITE_URL}), você declara que leu,
          compreendeu e concorda integralmente com estes Termos de Uso. Caso não
          concorde com qualquer disposição aqui apresentada, solicitamos que não
          utilize o site. O uso continuado do {SITE_NAME} após eventuais
          alterações nestes termos constitui aceitação das mudanças.
        </p>

        <h2>2. Descrição do Serviço</h2>
        <p>
          O {SITE_NAME} é uma plataforma informativa que reúne e organiza dados
          públicos sobre odontologia no Brasil, incluindo estimativas de preços de
          procedimentos, quantidade de profissionais por cidade e informações sobre
          especialidades odontológicas. O serviço é oferecido gratuitamente e tem
          caráter exclusivamente informativo.
        </p>

        <h2>3. Natureza das Informações</h2>
        <p>
          As informações disponibilizadas no {SITE_NAME}, incluindo preços de
          procedimentos, dados sobre profissionais e estatísticas regionais, são
          estimativas baseadas em fontes públicas e pesquisas de mercado. Estes
          dados:
        </p>
        <ul>
          <li>
            <strong>Não constituem</strong> recomendação, diagnóstico ou
            prescrição médica ou odontológica;
          </li>
          <li>
            <strong>Não substituem</strong> a consulta presencial com um
            profissional de odontologia devidamente registrado no CRO;
          </li>
          <li>
            <strong>Podem variar</strong> significativamente conforme a região,
            o profissional, a complexidade do caso e o momento da consulta.
          </li>
        </ul>

        <h2>4. Isenção de Responsabilidade</h2>
        <p>
          O {SITE_NAME} e a Vertech Soluções não se responsabilizam por:
        </p>
        <ul>
          <li>
            Decisões tomadas com base nas informações apresentadas no site;
          </li>
          <li>
            Divergências entre os preços estimados e os valores efetivamente
            cobrados por profissionais;
          </li>
          <li>
            Qualidade, competência ou resultados dos serviços prestados por
            profissionais listados ou referenciados;
          </li>
          <li>
            Indisponibilidade temporária do site por motivos técnicos ou de
            manutenção;
          </li>
          <li>
            Conteúdo de sites de terceiros acessados por meio de links
            disponíveis no {SITE_NAME}.
          </li>
        </ul>
        <p>
          Sempre consulte diretamente o profissional de odontologia para obter
          valores atualizados e informações específicas sobre o seu caso.
        </p>

        <h2>5. Obrigações do Usuário</h2>
        <p>Ao utilizar o {SITE_NAME}, o usuário compromete-se a:</p>
        <ul>
          <li>
            Utilizar o site de forma ética, legal e em conformidade com estes
            Termos;
          </li>
          <li>
            Não reproduzir, distribuir ou explorar comercialmente o conteúdo do
            site sem autorização prévia por escrito;
          </li>
          <li>
            Não tentar acessar áreas restritas do site, sistemas ou servidores
            sem autorização;
          </li>
          <li>
            Não utilizar ferramentas automatizadas (bots, scrapers) para coletar
            dados do site sem consentimento prévio.
          </li>
        </ul>

        <h2>6. Propriedade Intelectual</h2>
        <p>
          Todo o conteúdo do {SITE_NAME}, incluindo mas não limitado a textos,
          gráficos, logotipos, ícones, imagens, design, código-fonte e
          compilação de dados, é propriedade da Vertech Soluções ou de seus
          licenciantes, protegido pelas leis brasileiras de direitos autorais
          (Lei nº 9.610/98) e de propriedade industrial (Lei nº 9.279/96).
        </p>
        <p>
          É permitida a citação parcial do conteúdo para fins não comerciais,
          desde que acompanhada da devida atribuição ao {SITE_NAME} e link para
          a página original.
        </p>

        <h2>7. Links para Terceiros</h2>
        <p>
          O {SITE_NAME} pode conter links para sites e plataformas de terceiros,
          incluindo o {PARTNER.name} e outros parceiros. Esses links são
          disponibilizados para conveniência do usuário. Cada plataforma externa
          possui seus próprios termos de uso e políticas de privacidade, pelos
          quais o {SITE_NAME} não se responsabiliza.
        </p>

        <h2>8. Modificações nos Termos</h2>
        <p>
          A Vertech Soluções reserva-se o direito de alterar estes Termos de Uso
          a qualquer momento, sem aviso prévio. As alterações entram em vigor
          imediatamente após a publicação nesta página. Recomendamos que o
          usuário revise periodicamente esta página para manter-se informado
          sobre eventuais atualizações.
        </p>

        <h2>9. Legislação Aplicável e Foro</h2>
        <p>
          Estes Termos de Uso são regidos pelas leis da República Federativa do
          Brasil. Para dirimir quaisquer controvérsias decorrentes destes termos,
          fica eleito o foro da Comarca de Chapecó, Estado de Santa Catarina,
          com renúncia expressa a qualquer outro, por mais privilegiado que seja.
        </p>

        <h2>10. Contato</h2>
        <p>
          Para dúvidas, sugestões ou solicitações relacionadas a estes Termos de
          Uso, entre em contato conosco:
        </p>
        <ul>
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
