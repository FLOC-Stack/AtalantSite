"use client";

import { useRef } from "react";
import { ParticleOcean } from "@/components/particle-ocean";

export type FinancingPrinciple = {
  numeral: string;
  title: string;
  body: string;
};

type Props = {
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  quote?: string;
  quoteLabel?: string;
  principlesLabel?: string;
  principles?: FinancingPrinciple[];
};

const FALLBACK_TITLE = "Financiación\nque escucha.";

const FALLBACK_BODY =
  "Participamos en la financiación de los clientes con un sistema de crédito propio. Adaptamos las condiciones a la realidad de cada relación comercial, escuchando activamente las necesidades del cliente y del proveedor.";

const FALLBACK_QUOTE =
  "\u201cEn Atalant potenciamos nuestro negocio y saber hacer a través de nuestros valores.\u201d";

const FALLBACK_PRINCIPLES: FinancingPrinciple[] = [
  {
    numeral: "01",
    title: "Compromiso",
    body: "Ampliar nuestro espíritu de servicio para dar lo mejor con cada solución.",
  },
  {
    numeral: "02",
    title: "Flexibilidad",
    body: "Adaptarnos a la realidad de nuestros clientes y proveedores escuchando activamente sus necesidades.",
  },
  {
    numeral: "03",
    title: "Agilidad",
    body: "Responder con energía y eficacia para ofrecer soluciones en constante evolución.",
  },
  {
    numeral: "04",
    title: "Fiabilidad",
    body: "Convertirse en la opción más segura en cada ocasión como expertos en la distribución.",
  },
];

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function HomeFinancing({
  indexLabel = "N° 04 — CRÉDITO / PRINCIPIOS",
  counter = "04 / 05",
  title = FALLBACK_TITLE,
  body = FALLBACK_BODY,
  quote = FALLBACK_QUOTE,
  quoteLabel = "PRINCIPIOS DE TRABAJO — ATALANT",
  principlesLabel = "CUATRO PRINCIPIOS",
  principles = FALLBACK_PRINCIPLES,
}: Props = {}) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-financing-title"
      className="relative flex min-h-screen flex-col overflow-hidden bg-white text-foreground"
    >
      {/* Content wrapper — inherits side padding from the layout system */}
      <div className="relative z-10 flex w-full flex-1 flex-col px-10 pt-16 pb-12 sm:px-14 sm:pt-20 sm:pb-14 lg:px-20 lg:pt-[100px] lg:pb-[80px]">
        {/* Top header row */}
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
            {indexLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {counter}
          </p>
        </div>
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        {/* Central block: editorial text + particle ocean as background.
            The ocean fills the full height of this block (between top header
            and the bottom principles divider) and 3/4 of the width, aligned
            right. Left padding of the layout is preserved — the section's
            px-* applies to this wrapper, so the ocean's right edge also
            stops at that padding. */}
        <div className="relative mt-10 flex grow flex-col lg:mt-14">
          {/* Ocean layer */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full md:w-3/4">
            <ParticleOcean
              className="h-full w-full"
              mouseTargetRef={sectionRef}
            />
          </div>
          {/* Soft horizontal fade so the ocean doesn't fight with the text column */}
          <div
            className="pointer-events-none absolute inset-0 z-0 hidden md:block"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,1) 25%, rgba(255,255,255,0) 55%)",
            }}
            aria-hidden="true"
          />

          {/* Editorial text — above the ocean */}
          <div className="relative z-10 md:w-1/2">
            <h2
              id="home-financing-title"
              className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1] tracking-[-2px] text-foreground lg:tracking-[-3px]"
            >
              {renderMultiline(title)}
            </h2>

            <p className="mt-8 max-w-[560px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[18px] lg:leading-[28px]">
              {body}
            </p>

            <div className="mt-14 max-w-[520px] lg:mt-20">
              <p className="font-sans text-[clamp(1.5rem,2.6vw,2.25rem)] font-light leading-[1.25] tracking-[-0.8px] text-foreground">
                {quote}
              </p>
              <div className="mt-8 h-px w-12 bg-primary" aria-hidden="true" />
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {quoteLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: four principles */}
        <div className="mt-16 lg:mt-20">
          <div className="h-px w-full bg-foreground" aria-hidden="true" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {principlesLabel}
          </p>

          <ol className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:mt-8 lg:grid-cols-4 lg:gap-x-10">
            {principles.map((p, idx) => (
              <li
                key={p.numeral}
                className={
                  idx === 0
                    ? "flex flex-col"
                    : "flex flex-col lg:border-l lg:border-foreground/15 lg:pl-6"
                }
              >
                <span className="font-sans text-[54px] font-light leading-none tracking-[-1.5px] text-primary">
                  {p.numeral}
                </span>
                <p className="mt-3 font-sans text-[22px] tracking-[-0.4px] text-foreground">
                  {p.title}
                </p>
                <p className="mt-3 max-w-[360px] font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-muted-strong">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
