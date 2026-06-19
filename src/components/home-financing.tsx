"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { ParticleOcean } from "@/components/particle-ocean";
import { buildFinancingPath } from "@/lib/routes";
import type { AppLocale } from "@/lib/locales";

export type FinancingPrinciple = {
  numeral: string;
  title: string;
  body: string;
};

type Props = {
  /** Locale del documento — usado para construir el href del CTA */
  locale?: AppLocale;
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  /** Etiqueta del CTA primary que enlaza a la página interna */
  ctaLabel?: string;
  ctaHref?: string;
  quote?: string;
  quoteLabel?: string;
  principlesLabel?: string;
  principles?: FinancingPrinciple[];
};

const FALLBACK_TITLE = "Mantenemos tu flujo\nde suministro constante.";

const FALLBACK_BODY =
  "Aportamos flexibilidad, asesoramiento y reducimos tu incertidumbre en la cadena de suministro. Te acompañamos en todo el proceso de aprovisionamiento.";

const FALLBACK_QUOTE =
  "En Atalant potenciamos tu negocio y lo hacemos a través de nuestros valores.";

const FALLBACK_PRINCIPLES: FinancingPrinciple[] = [
  {
    numeral: "01",
    title: "Compromiso",
    body: "Ampliar nuestro espíritu de servicio para dar lo mejor con cada solución.",
  },
  {
    numeral: "02",
    title: "Nos adaptamos",
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
  locale = "es",
  indexLabel = "N° 04 — CRÉDITO / PRINCIPIOS",
  counter = "04 / 05",
  title = FALLBACK_TITLE,
  body = FALLBACK_BODY,
  ctaLabel = "Descubre cómo",
  ctaHref,
  quote = FALLBACK_QUOTE,
  quoteLabel = "PRINCIPIOS DE TRABAJO — ATALANT",
  principlesLabel = "CUATRO PRINCIPIOS",
  principles = FALLBACK_PRINCIPLES,
}: Props = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const resolvedCtaHref = ctaHref ?? buildFinancingPath(locale);

  return (
    <section
      id="financing"
      ref={sectionRef}
      aria-labelledby="home-financing-title"
      className="relative flex min-h-svh snap-start flex-col overflow-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-0 min-h-full w-full md:w-[78%]">
        <ParticleOcean
          className="absolute inset-0 h-full min-h-svh"
          mouseTargetRef={sectionRef}
          variant="home"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(to bottom, rgba(246,247,253,0) 0%, var(--color-background) 100%)",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
        style={{
          background:
            "linear-gradient(to right, var(--color-background) 18%, rgba(246,247,253,0.72) 40%, rgba(246,247,253,0) 62%)",
        }}
        aria-hidden="true"
      />
      <span id="financiacion" className="absolute top-0" aria-hidden="true" />
      {/* Content wrapper — inherits side padding from the layout system */}
      <div className="relative z-10 flex w-full flex-1 flex-col px-10 pt-28 pb-12 sm:px-14 sm:pt-36 sm:pb-14 lg:px-20 lg:pt-[112px] lg:pb-11">
        {/* Top header row */}
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
            {indexLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {counter}
          </p>
        </div>
        <div className="mt-5 h-px w-full bg-foreground" aria-hidden="true" />

        {/* Central block: editorial text above the section-level particle ocean. */}
        <div className="relative mt-8 flex grow flex-col">
          {/* Editorial text — above the ocean */}
          <div className="relative z-10 md:w-[68%] lg:w-[72%] xl:w-[78%]">
            <h2
              id="home-financing-title"
              className="max-w-[980px] font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1] tracking-[-2px] text-foreground lg:tracking-[-3px]"
            >
              {renderMultiline(title)}
            </h2>

            <p className="mt-6 max-w-[560px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[17px] lg:leading-[26px]">
              {body}
            </p>

            <div className="mt-6">
              <Link
                href={resolvedCtaHref}
                className="inline-flex h-12 items-center rounded bg-primary text-white transition-opacity hover:opacity-90 sm:h-14"
              >
                <span className="border-r border-white/10 px-6 font-mono text-[10px] uppercase tracking-[2px] sm:px-10 sm:text-[11px] sm:tracking-[2.2px]">
                  {ctaLabel}
                </span>
                <span className="flex items-center justify-center px-4 sm:px-5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>

            <div className="mt-10 max-w-[520px]">
              <p className="font-sans text-[clamp(1.375rem,2.1vw,2rem)] font-light leading-[1.2] tracking-[-0.8px] text-foreground">
                {quote}
              </p>
              <div className="mt-5 h-px w-12 bg-primary" aria-hidden="true" />
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {quoteLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: four principles */}
        <div className="mt-10">
          <div className="h-px w-full bg-foreground" aria-hidden="true" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {principlesLabel}
          </p>

          <ol className="mt-5 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-10">
            {principles.map((p, idx) => (
              <li
                key={p.numeral}
                className={
                  idx === 0
                    ? "flex flex-col"
                    : "flex flex-col lg:border-l lg:border-foreground/15 lg:pl-6"
                }
              >
                <span className="font-sans text-[46px] font-light leading-none tracking-[-1.5px] text-primary lg:text-[48px]">
                  {p.numeral}
                </span>
                <p className="mt-2 font-sans text-[20px] tracking-[-0.4px] text-foreground lg:text-[21px]">
                  {p.title}
                </p>
                <p className="mt-2 max-w-[360px] font-sans text-[13px] font-light leading-[18px] tracking-[-0.1px] text-muted-strong lg:text-[13.5px] lg:leading-[19px]">
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
