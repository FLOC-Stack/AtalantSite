"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LogoParticles } from "./logo-particles";
import type { HomeHero, StatsBlock } from "@/lib/content-types";

type HeroStat = { label: string; value: string };

type Props = {
  hero?: HomeHero;
  stats?: HeroStat[] | StatsBlock["stats"];
  primaryHref?: string;
  secondaryHref?: string;
};

const FALLBACK_HERO: HomeHero = {
  eyebrow: "Distribución de polímeros en Europa",
  headline: "Made for keeping\nyour production moving.",
  body: "Distribuimos materias primas plásticas y polímeros reciclados de alta calidad. Respuesta ágil, stock permanente y un enfoque basado en la excelencia operativa.",
  primaryLabel: "Catálogo de productos",
  secondaryLabel: "Nuestras soluciones",
};

const FALLBACK_STATS: HeroStat[] = [
  { label: "Alcance", value: "12 PAÍSES EU" },
  { label: "Capacidad", value: "400M+ KG/AÑO" },
  { label: "Latencia", value: "< 24H RESPUESTA" },
  { label: "Segmento", value: "POLÍMEROS TÉCNICOS" },
];

function renderMultiline(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 ? <br /> : null}
    </span>
  ));
}

export function Hero({
  hero = FALLBACK_HERO,
  stats = FALLBACK_STATS,
  primaryHref = "/es/productos",
  secondaryHref = "#soluciones",
}: Props = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsList = stats.length ? stats : FALLBACK_STATS;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-background px-5 pt-28 pb-32 overflow-hidden sm:px-8 sm:pt-36 sm:pb-36 md:px-12 md:pt-40 lg:px-20 lg:pt-[180px] lg:pb-20"
    >
      {/* Logo particles background */}
      <LogoParticles
        assemblyDuration={3.5}
        assemblyDelay={0.3}
        particleStep={3}
        mouseTargetRef={sectionRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Overline */}
      <div className="relative z-10 flex items-center gap-3 pb-4 sm:gap-6 sm:pb-5">
        <span className="font-mono text-[8px] uppercase tracking-[2px] text-primary-dark sm:text-[10px] sm:tracking-[3px]">
          {hero.eyebrow}
        </span>
        <div className="hidden h-px w-16 bg-primary-dark/20 sm:block" />
        <span className="hidden font-mono text-[10px] text-muted sm:inline">EST. 1994</span>
      </div>

      {/* Headline */}
      <div className="relative z-10 pb-6 sm:pb-8 lg:pb-10">
        <h1 className="max-w-[1404px] font-sans text-[clamp(2.5rem,8vw,8.125rem)] font-normal leading-[0.95] tracking-tight text-foreground lg:tracking-[-2.76px]">
          {renderMultiline(hero.headline)}
        </h1>
      </div>

      {/* Body */}
      <div className="relative z-10 pb-8 sm:pb-10">
        <p className="max-w-[500px] font-sans text-base font-light leading-snug text-body sm:text-lg md:text-xl md:max-w-[480px] lg:max-w-[720px] lg:text-2xl lg:leading-[1.1]">
          {hero.body}
        </p>
      </div>

      {/* CTAs */}
      <div className="relative z-10 flex flex-col items-start gap-3 pb-10 sm:flex-row sm:gap-6">
        <Link
          href={primaryHref}
          className="flex h-12 items-center rounded bg-primary text-white transition-opacity hover:opacity-90 sm:h-14"
        >
          <span className="border-r border-white/10 px-6 font-mono text-[10px] uppercase tracking-[2px] sm:px-10 sm:text-[11px] sm:tracking-[2.2px]">
            {hero.primaryLabel}
          </span>
          <span className="flex items-center justify-center px-4 sm:px-5">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        <Link
          href={secondaryHref}
          className="glass flex h-12 items-center rounded transition-opacity hover:opacity-70 sm:h-14"
        >
          <span className="border-r border-foreground/10 px-6 font-mono text-[10px] uppercase tracking-[2px] text-foreground sm:px-10 sm:text-[11px] sm:tracking-[2.2px]">
            {hero.secondaryLabel}
          </span>
          <span className="flex items-center justify-center px-4 sm:px-5">
            <ChevronDown className="h-2 w-2 text-foreground" />
          </span>
        </Link>
      </div>

      {/* Bottom stats */}
      <div className="absolute bottom-0 left-5 right-5 z-10 flex flex-col gap-4 pb-6 sm:left-8 sm:right-8 sm:pb-8 lg:left-20 lg:right-20 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid w-full grid-cols-2 gap-x-8 gap-y-4 border-t border-foreground/5 pt-4 sm:grid-cols-4 sm:gap-12 sm:pt-5 lg:w-[800px]">
          {statsList.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 sm:gap-2">
              <span className="font-mono text-[8px] uppercase tracking-[0.9px] text-muted sm:text-[9px]">
                {stat.label}
              </span>
              <span className="font-mono text-[10px] text-muted-strong sm:text-xs">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-4 rounded bg-primary-dark/50 px-6 py-3 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-[2.5px] text-white">
            Grade: PE-HD High Density
          </span>
          <div className="h-3 w-px bg-white/20" />
          <span className="font-mono text-[10px] text-white">BATCH #92-A</span>
        </div>
      </div>
    </section>
  );
}
