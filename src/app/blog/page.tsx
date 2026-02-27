import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    "Dicas de saúde bucal, preços de procedimentos e como encontrar o dentista ideal. Blog do DentistaPerto.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">Blog</h1>
      <p className="text-lg text-gray-600 mb-8">
        Dicas de saúde bucal, preços e guias para cuidar do seu sorriso.
      </p>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block bg-white border border-gray-100 rounded-xl p-6 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.data).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {post.titulo}
            </h2>
            <p className="text-gray-600 mb-3">{post.descricao}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              Ler artigo <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
