import type { Metadata } from "next";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAOdontoConnect } from "@/components/CTAOdontoConnect";

export const metadata: Metadata = {
  title: `Contato | ${SITE_NAME}`,
  description: `Entre em contato com o ${SITE_NAME}. Estamos aqui para ajudar.`,
};

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Contato", href: "/contato" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">Contato</h1>

      <div className="prose prose-gray max-w-none mb-8">
        <p>
          Tem alguma dúvida, sugestão ou quer ser parceiro do {SITE_NAME}? Entre
          em contato conosco pelos canais abaixo.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <Mail className="h-8 w-8 text-blue-600 mb-3" />
          <h2 className="font-semibold text-gray-900 mb-1">Email</h2>
          <a
            href="mailto:vertech2026@gmail.com"
            className="text-blue-600 hover:underline"
          >
            vertech2026@gmail.com
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <Phone className="h-8 w-8 text-blue-600 mb-3" />
          <h2 className="font-semibold text-gray-900 mb-1">Telefone</h2>
          <a
            href="tel:+5549999551051"
            className="text-blue-600 hover:underline"
          >
            +55 (49) 99955-1051
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
          <h2 className="font-semibold text-gray-900 mb-1">WhatsApp</h2>
          <a
            href="https://wa.me/5549999551051"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            +55 (49) 99955-1051
          </a>
        </div>
      </div>

      <section className="mt-12">
        <CTAOdontoConnect />
      </section>
    </div>
  );
}
