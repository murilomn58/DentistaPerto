import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowLeft } from "lucide-react";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { generateArticleSchema } from "@/lib/seo";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CTAPartner } from "@/components/CTAPartner";
import { SITE_NAME } from "@/lib/constants";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.titulo} | ${SITE_NAME}`,
    description: post.descricao,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Simple markdown to HTML (headings, paragraphs, bold, links, tables)
  const htmlContent = post.conteudo
    .split("\n\n")
    .map((block) => {
      if (block.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${block.slice(3)}</h2>`;
      }
      if (block.startsWith("### ")) {
        return `<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">${block.slice(4)}</h3>`;
      }
      if (block.startsWith("| ")) {
        const rows = block.split("\n").filter((r) => !r.match(/^\|[-\s|]+\|$/));
        const cells = rows.map((r) =>
          r
            .split("|")
            .filter(Boolean)
            .map((c) => c.trim())
        );
        const header = cells[0];
        const body = cells.slice(1);
        return `<div class="overflow-x-auto my-4"><table class="w-full text-left border-collapse"><thead><tr>${header.map((h) => `<th class="border-b-2 border-gray-200 p-3 font-semibold">${h}</th>`).join("")}</tr></thead><tbody>${body.map((row) => `<tr>${row.map((c) => `<td class="border-b border-gray-100 p-3">${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
      }
      if (block.match(/^\d+\.\s/)) {
        const items = block.split("\n").map((line) => {
          const text = line.replace(/^\d+\.\s/, "");
          return `<li>${text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
        });
        return `<ol class="list-decimal list-inside space-y-2 my-4 text-gray-600">${items.join("")}</ol>`;
      }
      if (block.match(/^- /m)) {
        const items = block.split("\n").map((line) => {
          const text = line.replace(/^- /, "");
          return `<li>${text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</li>`;
        });
        return `<ul class="list-disc list-inside space-y-2 my-4 text-gray-600">${items.join("")}</ul>`;
      }
      return `<p class="text-gray-600 leading-relaxed my-4">${block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</p>`;
    })
    .join("");

  return (
    <>
      <SchemaMarkup data={generateArticleSchema(post)} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.titulo, href: `/blog/${post.slug}` },
          ]}
        />

        <article className="mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Calendar className="h-4 w-4" />
            {new Date(post.data).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <span className="mx-1">&middot;</span>
            {post.autor}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {post.titulo}
          </h1>

          <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Internal links */}
          {post.procedimentos_relacionados.length > 0 && (
            <section className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Procedimentos mencionados
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.procedimentos_relacionados.map((slug) => (
                  <Link
                    key={slug}
                    href={`/quanto-custa/${slug}/sao-paulo-sp`}
                    className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-blue-300 transition-colors"
                  >
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {post.cidades_relacionadas.length > 0 && (
            <section className="mt-6 p-6 bg-gray-50 rounded-xl">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Cidades relacionadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {post.cidades_relacionadas.map((slug) => (
                  <Link
                    key={slug}
                    href={`/dentista/${slug}`}
                    className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-blue-300 transition-colors"
                  >
                    {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* CTA */}
        <section className="mt-12">
          <CTAPartner />
        </section>

        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao blog
          </Link>
        </div>
      </div>
    </>
  );
}
