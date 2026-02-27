import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Contato | ${SITE_NAME}`,
  description: `Entre em contato com o ${SITE_NAME}. Estamos aqui para ajudar.`,
};

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Inicio", href: "/" },
          { label: "Contato", href: "/contato" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-6">Contato</h1>

      <div className="prose prose-gray max-w-none mb-8">
        <p>
          Tem alguma duvida, sugestao ou quer ser parceiro do {SITE_NAME}? Entre
          em contato conosco pelos canais abaixo.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <Mail className="h-8 w-8 text-blue-600 mb-3" />
          <h2 className="font-semibold text-gray-900 mb-1">Email</h2>
          <a
            href="mailto:contato@dentistaperto.com.br"
            className="text-blue-600 hover:underline"
          >
            contato@dentistaperto.com.br
          </a>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
          <h2 className="font-semibold text-gray-900 mb-1">WhatsApp</h2>
          <p className="text-gray-600 text-sm">Em breve</p>
        </div>
      </div>
    </div>
  );
}
