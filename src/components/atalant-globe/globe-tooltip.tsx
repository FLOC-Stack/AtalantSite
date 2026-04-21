"use client";

import type { Destination, Hub } from "./routes";

export type TooltipNode =
  | { type: "hub"; data: Hub }
  | { type: "destination"; data: Destination };

type Props = {
  node: TooltipNode | null;
  /** Coordenadas en píxeles dentro del contenedor del globo */
  x?: number;
  y?: number;
};

export function GlobeTooltip({ node, x = 0, y = 0 }: Props) {
  if (!node) return null;

  return (
    <div
      className="glass pointer-events-none absolute z-20 min-w-[220px] max-w-[280px] rounded-xl p-4"
      style={{
        left: x + 14,
        top: y + 14,
        transform: "translate3d(0,0,0)",
      }}
      role="tooltip"
      aria-live="polite"
    >
      {node.type === "hub" ? (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-primary-dark">
            Hub · {node.data.role}
          </p>
          <p className="mt-2 font-sans text-lg leading-tight tracking-[-0.2px] text-foreground">
            {node.data.city}
          </p>
          <p className="font-sans text-[14px] leading-tight tracking-[-0.1px] text-muted-strong">
            {node.data.country}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[1.5px] text-muted-strong">
            Operativo desde {node.data.since}
          </p>
        </>
      ) : (
        <>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-primary-dark">
            Destino · {node.data.region}
          </p>
          <p className="mt-2 font-sans text-lg leading-tight tracking-[-0.2px] text-foreground">
            {node.data.name}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[1.5px] text-muted-strong">
            {node.data.status === "active" ? "Activo" : "Legacy"} · desde {node.data.since}
          </p>
        </>
      )}
    </div>
  );
}
