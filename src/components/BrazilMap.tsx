"use client";

import Link from "next/link";

// Simplified SVG paths for Brazilian states (approximate boundaries)
const states: Array<{
  uf: string;
  name: string;
  d: string;
  labelX: number;
  labelY: number;
}> = [
  { uf: "AC", name: "Acre", d: "M95,285 L115,275 L130,285 L125,300 L105,305 Z", labelX: 112, labelY: 292 },
  { uf: "AM", name: "Amazonas", d: "M130,220 L220,210 L250,230 L240,280 L180,300 L130,285 L115,275 L120,240 Z", labelX: 180, labelY: 255 },
  { uf: "RR", name: "Roraima", d: "M180,170 L210,160 L225,180 L220,210 L190,210 L175,195 Z", labelX: 198, labelY: 190 },
  { uf: "AP", name: "Amapa", d: "M280,175 L300,165 L310,180 L305,200 L285,205 L275,195 Z", labelX: 292, labelY: 188 },
  { uf: "PA", name: "Para", d: "M220,210 L280,195 L305,200 L330,230 L340,270 L300,300 L260,290 L240,280 L250,230 Z", labelX: 285, labelY: 250 },
  { uf: "MA", name: "Maranhao", d: "M330,230 L370,225 L385,250 L375,280 L340,285 L330,270 Z", labelX: 355, labelY: 255 },
  { uf: "TO", name: "Tocantins", d: "M300,300 L330,285 L340,285 L345,320 L330,360 L305,350 L295,320 Z", labelX: 320, labelY: 325 },
  { uf: "PI", name: "Piaui", d: "M370,225 L395,225 L405,250 L400,290 L375,280 L385,250 Z", labelX: 390, labelY: 258 },
  { uf: "CE", name: "Ceara", d: "M395,225 L425,215 L440,235 L425,255 L405,250 Z", labelX: 418, labelY: 238 },
  { uf: "RN", name: "R. G. do Norte", d: "M425,215 L455,218 L455,235 L440,235 Z", labelX: 442, labelY: 226 },
  { uf: "PB", name: "Paraiba", d: "M425,235 L455,235 L455,250 L430,252 Z", labelX: 442, labelY: 244 },
  { uf: "PE", name: "Pernambuco", d: "M405,250 L425,255 L455,250 L455,268 L400,272 Z", labelX: 430, labelY: 262 },
  { uf: "AL", name: "Alagoas", d: "M440,268 L455,268 L455,282 L445,280 Z", labelX: 448, labelY: 276 },
  { uf: "SE", name: "Sergipe", d: "M435,282 L450,280 L450,295 L440,295 Z", labelX: 443, labelY: 289 },
  { uf: "BA", name: "Bahia", d: "M340,285 L375,280 L400,290 L440,268 L445,280 L440,295 L445,340 L420,380 L370,390 L340,365 L330,360 L345,320 Z", labelX: 395, labelY: 335 },
  { uf: "MT", name: "Mato Grosso", d: "M180,300 L240,280 L260,290 L295,320 L295,360 L270,380 L230,385 L195,360 L175,330 Z", labelX: 235, labelY: 335 },
  { uf: "GO", name: "Goias", d: "M295,360 L330,360 L340,365 L345,400 L320,415 L290,405 L280,385 Z", labelX: 315, labelY: 388 },
  { uf: "DF", name: "Distrito Federal", d: "M320,380 L330,375 L335,385 L325,388 Z", labelX: 328, labelY: 383 },
  { uf: "MS", name: "Mato Grosso do Sul", d: "M195,360 L230,385 L270,380 L280,385 L290,405 L280,440 L240,450 L210,430 L195,400 Z", labelX: 240, labelY: 415 },
  { uf: "MG", name: "Minas Gerais", d: "M290,405 L320,415 L345,400 L370,390 L420,380 L425,410 L400,440 L360,450 L330,445 L295,440 Z", labelX: 360, labelY: 425 },
  { uf: "ES", name: "Espirito Santo", d: "M420,380 L445,375 L445,410 L425,410 Z", labelX: 434, labelY: 396 },
  { uf: "RJ", name: "Rio de Janeiro", d: "M400,440 L425,430 L440,440 L430,455 L405,455 Z", labelX: 420, labelY: 447 },
  { uf: "SP", name: "Sao Paulo", d: "M280,440 L295,440 L330,445 L360,450 L380,455 L375,475 L340,485 L295,480 L275,465 Z", labelX: 325, labelY: 465 },
  { uf: "PR", name: "Parana", d: "M240,450 L280,440 L275,465 L295,480 L290,500 L255,505 L235,490 L230,470 Z", labelX: 262, labelY: 480 },
  { uf: "SC", name: "Santa Catarina", d: "M255,505 L290,500 L300,520 L280,535 L255,530 Z", labelX: 275, labelY: 518 },
  { uf: "RS", name: "R. G. do Sul", d: "M235,530 L255,530 L280,535 L290,555 L275,580 L245,585 L220,565 L225,545 Z", labelX: 255, labelY: 558 },
  { uf: "RO", name: "Rondonia", d: "M130,285 L180,300 L175,330 L155,340 L130,325 Z", labelX: 153, labelY: 315 },
];

export function BrazilMap() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <svg viewBox="80 150 400 460" className="w-full h-auto">
        {states.map((state) => (
          <Link key={state.uf} href={`/dentista/${state.uf.toLowerCase()}`}>
            <path
              d={state.d}
              className="fill-blue-100 stroke-white stroke-[1.5] hover:fill-blue-400 transition-colors cursor-pointer"
            />
            <text
              x={state.labelX}
              y={state.labelY}
              className="text-[7px] fill-gray-600 font-medium pointer-events-none"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {state.uf}
            </text>
          </Link>
        ))}
      </svg>
    </div>
  );
}
