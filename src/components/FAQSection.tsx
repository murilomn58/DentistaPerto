"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SchemaMarkup } from "./SchemaMarkup";
import { generateFAQSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection({
  faqs,
  title = "Perguntas Frequentes",
}: {
  faqs: FAQ[];
  title?: string;
}) {
  return (
    <section>
      <SchemaMarkup data={generateFAQSchema(faqs)} />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FAQItem key={i} faq={faq} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm card-hover">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-blue-50/30 transition-all duration-200"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-blue-500 shrink-0 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-gray-600 leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
