import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SchemaMarkup } from "./SchemaMarkup";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${SITE_URL}${item.href}`,
  }));

  return (
    <>
      <SchemaMarkup data={generateBreadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i === items.length - 1 ? (
                <span className="text-gray-900 font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
