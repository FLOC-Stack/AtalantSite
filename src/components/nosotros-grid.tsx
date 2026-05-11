"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Fondo decorativo: retícula tenue + trazos finos que recorren las
// líneas horizontalmente y verticalmente, al estilo
// terminal-industries.com/about (sección "Our Story / Our Values").
//
// La SVG dibuja un viewBox fijo (GRID_W × GRID_H) y se escala con
// preserveAspectRatio="xMidYMid slice", así llena cualquier tamaño de
// sección sin distorsionar las celdas.

// Celdas rectangulares en formato horizontal (2:1). Dan al fondo un
// ritmo editorial más marcado que la cuadrícula perfecta.
const CELL_W = 144;
const CELL_H = 72;
const GRID_W = 1920;
const GRID_H = 1080;

// Posiciones deterministas — escogidas a mano para que se vean bien
// distribuidas. Definirlas estáticas evita el mismatch SSR/CSR de
// Math.random durante la hidratación.
type Tracer = {
  orient: "h" | "v";
  /** Índice de fila (h) o columna (v) sobre la retícula */
  lane: number;
  /** Largo del trazo (en unidades del viewBox) */
  length: number;
  /** Multiplicador de velocidad */
  speed: number;
  /** Retardo inicial (s) */
  delay: number;
  /** Pausa entre repeticiones (s) */
  gap: number;
};

// Trazos cortos (≤ 48px en pantalla, ~64 unidades de viewBox) — son
// "blips" recorriendo la retícula. Lanes repartidos sobre la rejilla
// rectangular (13 columnas × 15 filas).
const TRACERS: Tracer[] = [
  { orient: "h", lane: 2, length: 56, speed: 7, delay: 0, gap: 1.6 },
  { orient: "h", lane: 5, length: 64, speed: 9, delay: 1.2, gap: 2.4 },
  { orient: "h", lane: 8, length: 48, speed: 6, delay: 2.8, gap: 1.0 },
  { orient: "h", lane: 12, length: 60, speed: 10, delay: 0.6, gap: 3.0 },
  { orient: "v", lane: 2, length: 56, speed: 8, delay: 1.4, gap: 1.8 },
  { orient: "v", lane: 5, length: 64, speed: 11, delay: 0.2, gap: 2.6 },
  { orient: "v", lane: 8, length: 48, speed: 7, delay: 2.0, gap: 1.2 },
  { orient: "v", lane: 11, length: 60, speed: 9, delay: 3.2, gap: 2.0 },
];

export function NosotrosGrid({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tracers = svg.querySelectorAll<SVGRectElement>("[data-tracer]");

      tracers.forEach((tracer) => {
        const orient = tracer.dataset.orient as "h" | "v";
        const length = Number(tracer.dataset.length);
        const speed = Number(tracer.dataset.speed);
        const delay = Number(tracer.dataset.delay);
        const gap = Number(tracer.dataset.gap);

        const axis = orient === "h" ? "x" : "y";
        const max = orient === "h" ? GRID_W : GRID_H;

        gsap.fromTo(
          tracer,
          { [axis]: -length },
          {
            [axis]: max + length,
            duration: speed,
            delay,
            repeat: -1,
            repeatDelay: gap,
            ease: "none",
          },
        );
      });
    },
    { scope: svgRef },
  );

  // Máscara para que la retícula y los trazos se desvanezcan en los
  // bordes superior e inferior — evita el corte duro contra el resto
  // de la página. 80px de fade en cada extremo.
  const fadeMask =
    "linear-gradient(to bottom, transparent 0, black 80px, black calc(100% - 80px), transparent 100%)";

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${GRID_W} ${GRID_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full text-foreground ${className}`}
      style={{ maskImage: fadeMask, WebkitMaskImage: fadeMask }}
      aria-hidden="true"
    >
      <defs>
        {/* Retícula de fondo — celdas rectangulares (CELL_W × CELL_H) */}
        <pattern
          id="ns-grid-pattern"
          width={CELL_W}
          height={CELL_H}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${CELL_W} 0 L 0 0 0 ${CELL_H}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.08}
            strokeWidth={1}
          />
        </pattern>

        {/* Degradado para la cola del trazo horizontal: transparente →
            azul (color primary). El extremo brillante es la "cabeza"
            del trazo, que apunta hacia donde se mueve. */}
        <linearGradient id="ns-tracer-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e4bb6" stopOpacity="0" />
          <stop offset="70%" stopColor="#1e4bb6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e4bb6" stopOpacity="1" />
        </linearGradient>

        <linearGradient id="ns-tracer-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e4bb6" stopOpacity="0" />
          <stop offset="70%" stopColor="#1e4bb6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e4bb6" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Capa de retícula */}
      <rect width="100%" height="100%" fill="url(#ns-grid-pattern)" />

      {/* Trazos animados */}
      {TRACERS.map((t, i) => {
        const common = {
          "data-tracer": "",
          "data-orient": t.orient,
          "data-length": t.length,
          "data-speed": t.speed,
          "data-delay": t.delay,
          "data-gap": t.gap,
        };

        if (t.orient === "h") {
          // Carril horizontal → y = lane × CELL_H (cae sobre una línea
          // horizontal de la rejilla rectangular).
          return (
            <rect
              key={`t-${i}`}
              {...common}
              x={0}
              y={t.lane * CELL_H}
              width={t.length}
              height={1.5}
              fill="url(#ns-tracer-h)"
            />
          );
        }

        // Carril vertical → x = lane × CELL_W.
        return (
          <rect
            key={`t-${i}`}
            {...common}
            x={t.lane * CELL_W}
            y={0}
            width={1.5}
            height={t.length}
            fill="url(#ns-tracer-v)"
          />
        );
      })}
    </svg>
  );
}
