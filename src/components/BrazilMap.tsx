"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, TrendingUp } from "lucide-react";
import { BRAZIL_STATES, BRAZIL_VIEWBOX } from "@/lib/brazil-map-data";

interface CFOStateData {
  total: number;
  populacao: number;
  proporcao: number;
}

interface BrazilMapProps {
  cfoData?: Record<string, CFOStateData>;
}

// Color scale based on dentist density (proporcao per 1000 inhabitants)
function getDensityColor(proporcao: number): string {
  if (proporcao >= 4.0) return "#0891B2"; // Very high - cyan-600
  if (proporcao >= 2.0) return "#0EA5E9"; // High - sky-500
  if (proporcao >= 1.8) return "#2563EB"; // Above avg - blue-600
  if (proporcao >= 1.5) return "#3B82F6"; // Average - blue-500
  if (proporcao >= 1.3) return "#60A5FA"; // Below avg - blue-400
  if (proporcao >= 1.0) return "#93C5FD"; // Low - blue-300
  return "#BFDBFE"; // Very low - blue-200
}

function getDensityLabel(proporcao: number): string {
  if (proporcao >= 4.0) return "Muito alta";
  if (proporcao >= 2.0) return "Alta";
  if (proporcao >= 1.5) return "Média";
  if (proporcao >= 1.0) return "Baixa";
  return "Muito baixa";
}

function formatNum(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "k";
  return String(n);
}

export function BrazilMap({ cfoData }: BrazilMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const stateData = useMemo(() => {
    if (!cfoData) return null;
    return cfoData;
  }, [cfoData]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 12,
    });
  };

  return (
    <div className="relative w-full">
      {/* Legend */}
      <div className="flex items-center justify-center gap-1.5 mb-4">
        <span className="text-xs text-slate-400 font-medium mr-1">Densidade:</span>
        <span className="text-xs text-slate-500">Baixa</span>
        <div className="flex gap-0.5">
          {["#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6", "#2563EB", "#0EA5E9", "#0891B2"].map((c) => (
            <div key={c} className="w-4 h-2.5 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-xs text-slate-500">Alta</span>
      </div>

      {/* SVG Map */}
      <div
        className="relative"
        onMouseMove={handleMouseMove}
      >
        <svg
          viewBox={BRAZIL_VIEWBOX}
          className="w-full h-auto drop-shadow-lg"
          role="img"
          aria-label="Mapa interativo do Brasil com estados clicáveis"
        >
          <defs>
            <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="state-hover-glow">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#22D3EE" floodOpacity="0.6" />
            </filter>
            <linearGradient id="state-hover-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>

          {BRAZIL_STATES.map((state, i) => {
            const isHovered = hoveredState === state.uf;
            const data = stateData?.[state.uf];
            const fillColor = data
              ? getDensityColor(data.proporcao)
              : "#93C5FD";

            return (
              <Link key={state.uf} href={`/dentista/${state.uf.toLowerCase()}`}>
                <motion.path
                  d={state.path}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    fill: isHovered ? "url(#state-hover-gradient)" : fillColor,
                  }}
                  transition={{
                    opacity: { delay: i * 0.03, duration: 0.4 },
                    scale: { delay: i * 0.03, duration: 0.4 },
                    fill: { duration: 0.2 },
                  }}
                  className="cursor-pointer"
                  style={{
                    stroke: isHovered ? "#22D3EE" : "rgba(255,255,255,0.7)",
                    strokeWidth: isHovered ? 1.5 : 0.8,
                    filter: isHovered ? "url(#state-hover-glow)" : "none",
                    transformOrigin: "center",
                  }}
                  onMouseEnter={() => setHoveredState(state.uf)}
                  onMouseLeave={() => setHoveredState(null)}
                />
              </Link>
            );
          })}
        </svg>

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredState && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute pointer-events-none z-20"
              style={{
                left: tooltipPos.x,
                top: tooltipPos.y,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-xl px-4 py-3 shadow-2xl shadow-black/30 min-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span className="text-white font-semibold text-sm font-display">
                    {BRAZIL_STATES.find((s) => s.uf === hoveredState)?.name}
                  </span>
                  <span className="text-slate-400 text-xs ml-auto">{hoveredState}</span>
                </div>
                {stateData?.[hoveredState] && (
                  <div className="space-y-1.5 border-t border-slate-700/50 pt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="w-3 h-3 text-cyan-400" />
                      <span className="text-slate-300">
                        {formatNum(stateData[hoveredState].total)} dentistas
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      <span className="text-slate-300">
                        {formatNum(stateData[hoveredState].populacao)} habitantes
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <TrendingUp className="w-3 h-3 text-emerald-400" />
                      <span className="text-slate-300">
                        {stateData[hoveredState].proporcao.toFixed(2)}/1000 hab
                      </span>
                      <span className="text-[10px] text-slate-500 ml-auto">
                        {getDensityLabel(stateData[hoveredState].proporcao)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="mt-2 text-center">
                  <span className="text-[10px] text-cyan-400/80 font-medium">
                    Clique para ver cidades
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
