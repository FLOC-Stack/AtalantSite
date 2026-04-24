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

      // `from`-style: los elementos quedan en su estado final por CSS; GSAP los
      // lleva al estado "from" justo antes de animar y termina donde ya estaban.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.from(
        track,
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          ease: "power3.out",
        },
        0,
      );
      tl.from(
        dots,
        {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
          stagger: 0.08,
        },
        0.5,
      );
      tl.from(
        stems,
        {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
        },
        0.55,
      );
      tl.from(
        labels,
        {
          opacity: 0,
          y: 6,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.06,
        },
        0.7,
      );

      // Flujo oeste → este en loop. Arranca al terminar el reveal.
      if (flow) {
        const getDistance = () => track.getBoundingClientRect().width;
        const flowLoop = gsap.timeline({
          repeat: -1,
          repeatDelay: 2.5,
          defaults: { ease: "power1.inOut" },
        });
        flowLoop.set(flow, { x: 0, opacity: 0 });
        flowLoop.to(flow, { opacity: 1, duration: 0.25 }, 0);
        flowLoop.to(flow, { x: getDistance, duration: 4.2 }, 0);
        flowLoop.to(flow, { opacity: 0, duration: 0.3 }, ">-0.3");
        tl.add(flowLoop, ">");
      }
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="relative border border-foreground bg-background/60 px-6 py-8 sm:px-10 sm:py-10"
    >
      {caption ? (
        <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
          {caption}
        </p>
      ) : null}

      {/* Timeline area — desktop: horizontal; mobile: lista vertical accesible con los mismos datos */}
      <div className="mt-8 hidden md:block">
        <div className="relative h-[160px]">
          {/* Línea base */}
          <div className="absolute left-0 right-0 top-[88px] h-px bg-foreground/25" />
          {/* Línea animada encima (se dibuja) */}
          <div
            data-net-track
            className="absolute left-0 right-0 top-[88px] h-px bg-foreground will-change-transform"
            aria-hidden="true"
          />
          {/* Punto viajero (flow) — viaja oeste→este en loop tras el reveal */}
          <div
            data-net-flow
            className="pointer-events-none absolute top-[85px] left-0 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_18px_4px_rgba(30,75,182,0.35)]"
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
                  style={{
                    top: 88 - stemHeight,
                    height: stemHeight,
                  }}
                  aria-hidden="true"
                />

                {/* Dot sobre la línea, con pulse para primary */}
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

      {/* Mobile: lista vertical (sin animación compleja, mantiene legibilidad) */}
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
