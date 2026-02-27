import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/constants";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BlogSearch } from "@/components/BlogSearch";
import { CTAOdontoConnect } from "@/components/CTAOdontoConnect";

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description:
    "Dicas de saúde bucal, preços de procedimentos e como encontrar o dentista ideal. Blog do DentistaPerto.",
};

export default function BlogPage() {
  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    titulo: post.titulo,
    descricao: post.descricao,
    data: post.data,
    tags: post.tags,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">Blog</h1>
      <p className="text-lg text-gray-600 mb-6">
        Dicas de saúde bucal, preços e guias para cuidar do seu sorriso.
      </p>

      <BlogSearch posts={posts} />

      <section className="mt-12">
        <CTAOdontoConnect />
      </section>
    </div>
  );
}
