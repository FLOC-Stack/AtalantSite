"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type NetworkHub = {
  /** Etiqueta visible, p. ej. "ES · Alicante" o "PT" */
  code: string;
  /** Rol dentro de la red: "SEDE · DA", "DA", "HUB", "DISTRIBUCIÓN", "EXPORT NAF" */
  role: string;
  /** "primary" = SEDE / HUB / DA (azul, línea larga). "secondary" = DISTRIBUCIÓN / EXPORT (gris, línea corta). */
  tier: "primary" | "secondary";
};

type Props = {
  hubs: NetworkHub[];
  caption?: string;
  legend?: string;
};

const REVEAL_DURATION = 2.4;

export function NetworkTimeline({ hubs, caption, legend }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const track = root.querySelector<HTMLElement>("[data-net-track]");
      const dots = gsap.utils.toArray<HTMLElement>("[data-net-dot]", root);
      const stems = gsap.utils.toArray<HTMLElement>("[data-net-stem]", root);
      const labels = gsap.utils.toArray<HTMLElement>("[data-net-label]", root);
      const flow = root.querySelector<HTMLElement>("[data-net-flow]");

      if (!track || !dots.length || prefersReduced) return;

      // Estado inicial: nada visible, listo para el reveal sincronizado.
      gsap.set(track, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(dots, { scale: 0, autoAlpha: 0 });
      gsap.set(stems, { scaleY: 0, transformOrigin: "bottom center", autoAlpha: 0 });
      gsap.set(labels, { autoAlpha: 0, y: 6 });
      if (flow) gsap.set(flow, { x: 0, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // La bola y la línea viajan al mismo ritmo: la bola es la cabeza del trazo.
      tl.to(track, { scaleX: 1, duration: REVEAL_DURATION, ease: "power1.inOut" }, 0);

      if (flow) {
        const getDistance = () => track.getBoundingClientRect().width;
        tl.to(flow, { autoAlpha: 1, duration: 0.25 }, 0);
        tl.to(
          flow,
          { x: getDistance, duration: REVEAL_DURATION, ease: "power1.inOut" },
          0,
        );
        // La bola se apaga al llegar al final; vuelve en loop más abajo.
        tl.to(flow, { autoAlpha: 0, duration: 0.35 }, REVEAL_DURATION - 0.15);
      }

      // Cada hub se enciende exactamente cuando la bola pasa por su posición.
      const segment = REVEAL_DURATION / Math.max(hubs.length - 1, 1);
      hubs.forEach((_, i) => {
        const t = i * segment;
        tl.to(dots[i], { scale: 1, autoAlpha: 1, duration: 0.35, ease: "back.out(2)" }, t);
        tl.to(stems[i], { scaleY: 1, autoAlpha: 1, duration: 0.45, ease: "power2.out" }, t);
        tl.to(labels[i], { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, t + 0.08);
      });
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative">
      {caption ? (
        <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
          {caption}
        </p>
      ) : null}

      {/* Timeline area — desktop: horizontal; mobile: lista vertical */}
      <div className="mt-8 hidden md:block">
        <div className="relative h-[160px]">
          {/* Línea única (se traza sincronizada con la bola) */}
          <div
            data-net-track
            className="absolute left-0 right-0 top-[88px] h-px bg-foreground will-change-transform"
            aria-hidden="true"
          />
          {/* Bola "viajera" — dibuja la línea en el primer pase, después entra en loop */}
          <div
            data-net-flow
            className="pointer-events-none absolute top-[85px] left-0 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_22px_5px_rgba(30,75,182,0.4)]"
            aria-hidden="true"
          />

          {/* Hubs distribuidos uniformemente */}
          {hubs.map((hub, i) => {
            const left = `${(i / (hubs.length - 1)) * 100}%`;
            const isPrimary = hub.tier === "primary";
            const stemHeight = isPrimary ? 50 : 30;
            return (
              <div
                key={`${hub.code}-${i}`}
                className="absolute top-0 flex h-full flex-col items-center"
                style={{ left, transform: "translateX(-50%)" }}
              >
                {/* Stem (línea vertical hacia arriba) */}
                <div
                  data-net-stem
                  className={`absolute w-px will-change-transform ${
                    isPrimary ? "bg-foreground/50" : "bg-foreground/30"
                  }`}
                  style={{ top: 88 - stemHeight, height: stemHeight }}
                  aria-hidden="true"
                />

                {/* Dot sobre la línea */}
                <div
                  data-net-dot
                  className="absolute top-[82px] flex h-[13px] w-[13px] items-center justify-center will-change-transform"
                >
                  <span
                    className={`block h-[9px] w-[9px] rounded-full ${
                      isPrimary
                        ? "bg-primary"
                        : "border border-foreground/40 bg-background"
                    }`}
                  />
                  {isPrimary ? (
                    <span
                      className="nt-pulse-ring pointer-events-none absolute inset-0 rounded-full bg-primary/30"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>

                {/* Etiqueta bajo la línea */}
                <div
                  data-net-label
                  className="absolute top-[108px] flex w-[140px] flex-col items-center text-center will-change-transform"
                >
                  <p
                    className={`font-sans text-[14px] tracking-[-0.1px] text-foreground ${
                      isPrimary ? "font-medium" : "font-normal"
                    }`}
                  >
                    {hub.code}
                  </p>
                  <p
                    className={`mt-1 font-mono text-[9px] uppercase tracking-[1.5px] ${
                      isPrimary ? "text-primary" : "text-muted-strong"
                    }`}
                  >
                    {hub.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: lista vertical */}
      <ul className="mt-8 md:hidden">
        {hubs.map((hub, i) => {
          const isPrimary = hub.tier === "primary";
          return (
            <li
              key={`${hub.code}-m-${i}`}
              className="flex items-center justify-between gap-4 border-b border-foreground/10 py-3 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    isPrimary ? "bg-primary" : "border border-foreground/40"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-sans text-[14px] tracking-[-0.1px] text-foreground ${
                    isPrimary ? "font-medium" : "font-normal"
                  }`}
                >
                  {hub.code}
                </span>
              </div>
              <span
                className={`font-mono text-[9px] uppercase tracking-[1.5px] ${
                  isPrimary ? "text-primary" : "text-muted-strong"
                }`}
              >
                {hub.role}
              </span>
            </li>
          );
        })}
      </ul>

      {legend ? (
        <p className="mt-8 hidden font-mono text-[10px] uppercase tracking-[2px] text-muted-strong md:block">
          {legend}
        </p>
      ) : null}

      {/* Keyframes locales para el pulse */}
      <style>{`
        @keyframes nt-pulse {
          0% { transform: scale(1); opacity: 0.55; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .nt-pulse-ring {
          animation: nt-pulse 2.4s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-net-flow] { display: none; }
          .nt-pulse-ring { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
