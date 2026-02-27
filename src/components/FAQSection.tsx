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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-400 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      )}
    </div>
  );
}
