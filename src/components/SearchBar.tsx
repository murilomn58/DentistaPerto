"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { City } from "@/types";

interface SearchBarProps {
  cities: Array<Pick<City, "nome" | "slug" | "uf" | "populacao">>;
  placeholder?: string;
}

export function SearchBar({
  cities,
  placeholder = "Busque sua cidade...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof cities>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const normalized = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const filtered = cities
      .filter((c) => {
        const name = c.nome
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        return name.includes(normalized);
      })
      .slice(0, 8);

    setResults(filtered);
    setIsOpen(filtered.length > 0);
    setSelected(-1);
  }, [query, cities]);

  function navigate(slug: string) {
    setIsOpen(false);
    setQuery("");
    router.push(`/dentista/${slug}`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && selected >= 0) {
      e.preventDefault();
      navigate(results[selected].slug);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-10 py-4 bg-white/95 backdrop-blur-sm border border-white/30 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent shadow-xl shadow-blue-900/10 text-lg"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpar busca"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl overflow-hidden"
        >
          {results.map((city, i) => (
            <li
              key={city.slug}
              role="option"
              aria-selected={i === selected}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between ${
                i === selected ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => navigate(city.slug)}
              onMouseEnter={() => setSelected(i)}
            >
              <span className="font-medium text-gray-900">{city.nome}</span>
              <span className="text-xs text-gray-400">{city.uf}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
