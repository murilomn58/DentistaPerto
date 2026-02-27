"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  titulo: string;
  descricao: string;
  data: string;
  tags: string[];
}

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const filtered = query.trim()
    ? posts.filter((post) => {
        const text = `${post.titulo} ${post.descricao} ${post.tags.join(" ")}`
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        return normalizedQuery.split(/\s+/).every((word) => text.includes(word));
      })
    : posts;

  return (
    <>
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar no blog... ex: clareamento, implante, criança"
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Nenhum artigo encontrado para &quot;{query}&quot;
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Tente buscar por outro termo, como &quot;preço&quot;, &quot;dente&quot; ou &quot;dentista&quot;.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((post) => (
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
      )}
    </>
  );
}
