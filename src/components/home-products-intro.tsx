import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AppLocale } from "@/lib/locales";

export type HomeProductsIntroStat = {
  label: string;
  value: string;
};

type Props = {
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  stats?: HomeProductsIntroStat[];
  videoSrc?: string;
  videoPoster?: string;
  locale?: AppLocale;
};

const FALLBACK_BY_LOCALE: Record<
  AppLocale,
  {
    indexLabel: string;
    counter: string;
    title: string;
    body: string;
    primaryCtaLabel: string;
    stats: HomeProductsIntroStat[];
  }
> = {
  en: {
    indexLabel: "NO. 02 — SOLUTIONS / CATALOG",
    counter: "02 / 05",
    title: "High quality\npolymers.",
    body: "Discover our product families, including PE, PP, PVC, PS, EVA and PA.",
    primaryCtaLabel: "See products",
    stats: [
      { label: "Grades", value: "+300 references" },
      { label: "Compliance", value: "Standards-friendly" },
      { label: "Product", value: "Latest generation" },
      { label: "Laboratory", value: "In-house" },
    ],
  },
  es: {
    indexLabel: "N° 02 — SOLUCIONES / CATÁLOGO",
    counter: "02 / 05",
    title: "Polímeros\nde alta calidad.",
    body: "Descubre nuestra familia de productos entre los que destacan: PE, PP, PVC, PS, EVA y PA.",
    primaryCtaLabel: "Ver productos",
    stats: [
      { label: "Grados", value: "+300 referencias" },
      { label: "Cumplimiento", value: "Adaptado a normativa" },
      { label: "Producto", value: "Última generación" },
      { label: "Laboratorio", value: "Propio" },
    ],
  },
  fr: {
    indexLabel: "N° 02 — SOLUTIONS / CATALOGUE",
    counter: "02 / 05",
    title: "Polymères\nde haute qualité.",
    body: "Découvrez nos familles de produits, notamment PE, PP, PVC, PS, EVA et PA.",
    primaryCtaLabel: "Voir les produits",
    stats: [
      { label: "Grades", value: "+300 références" },
      { label: "Conformité", value: "Adaptée à la norme" },
      { label: "Produit", value: "Génération récente" },
      { label: "Laboratoire", value: "Interne" },
    ],
  },
  pt: {
    indexLabel: "N° 02 — SOLUÇÕES / CATÁLOGO",
    counter: "02 / 05",
    title: "Polímeros\nde alta qualidade.",
    body: "Descubra as nossas famílias de produtos, incluindo PE, PP, PVC, PS, EVA e PA.",
    primaryCtaLabel: "Ver produtos",
    stats: [
      { label: "Graus", value: "+300 referências" },
      { label: "Conformidade", value: "Adaptado a normas" },
      { label: "Produto", value: "Última geração" },
      { label: "Laboratório", value: "Próprio" },
    ],
  },
};

const FALLBACK_LOCALE: AppLocale = "es";

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

function MediaLayer({
  videoSrc,
  videoPoster,
}: {
  videoSrc?: string;
  videoPoster?: string;
}) {
  return (
    <>
      {videoSrc ? (
        <div className="absolute inset-y-0 left-1/2 aspect-square h-full max-w-none -translate-x-1/2">
          <video
            src={videoSrc}
            poster={videoPoster}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-contain opacity-95 contrast-[1.08] saturate-[0.9]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-background mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#d9d9d9] font-mono text-[11px] uppercase tracking-[2px] text-muted-strong"
          aria-hidden="true"
        >
          video/imagen
        </div>
      )}
    </>
  );
}

export function HomeProductsIntro({
  indexLabel,
  counter,
  title,
  body,
  primaryCtaLabel,
  primaryCtaHref = "#",
  stats,
  videoSrc,
  videoPoster,
  locale = "es",
}: Props = {}) {
  const safeLocale: AppLocale = locale ?? FALLBACK_LOCALE;
  const fallback = FALLBACK_BY_LOCALE[safeLocale];
  const resolvedIndexLabel = indexLabel ?? fallback.indexLabel;
  const resolvedCounter = counter ?? fallback.counter;
  const resolvedTitle = title ?? fallback.title;
  const resolvedBody = body ?? fallback.body;
  const resolvedPrimaryCtaLabel = primaryCtaLabel ?? fallback.primaryCtaLabel;
  const resolvedStats = stats?.length ? stats : fallback.stats;

  return (
    <section
      aria-labelledby="home-products-intro-title"
      className="relative min-h-svh snap-start overflow-hidden bg-background text-foreground"
    >
      {/* Card editorial flotante — glass sobre el video */}
      <div className="glass relative z-10 mx-4 mt-28 mb-4 flex flex-col rounded-3xl px-6 pt-12 pb-10 backdrop-blur-[16px] backdrop-saturate-[1.2] sm:mx-6 sm:mt-36 sm:mb-6 sm:px-8 sm:pt-14 sm:pb-12 lg:absolute lg:top-[136px] lg:bottom-8 lg:left-8 lg:m-0 lg:w-[640px] lg:rounded-[28px] lg:px-12 lg:pt-12 lg:pb-10">
        {/* Header: index + counter */}
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary-dark">
            {resolvedIndexLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {resolvedCounter}
          </p>
        </div>

        {/* Divider top */}
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        {/* Title */}
        <h2
          id="home-products-intro-title"
          className="mt-8 font-sans text-[clamp(2.25rem,6vw,4.75rem)] font-light leading-[1] tracking-[-1.5px] text-foreground lg:tracking-[-2.5px]"
        >
          {renderMultiline(resolvedTitle)}
        </h2>

        {/* Body */}
        <p className="mt-7 max-w-[680px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[17px] lg:leading-[26px]">
            {resolvedBody}
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-10">
          <Link
            href={primaryCtaHref}
            className="flex h-12 items-center rounded bg-primary text-white transition-opacity hover:opacity-90 sm:h-14"
          >
            <span className="border-r border-white/10 px-6 font-mono text-[10px] uppercase tracking-[2px] sm:px-10 sm:text-[11px] sm:tracking-[2.2px]">
              {resolvedPrimaryCtaLabel}
            </span>
            <span className="flex items-center justify-center px-4 sm:px-5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>

        {/* Spacer empuja stats al fondo */}
        <div className="grow" />

        {/* Divider bottom */}
        <div className="mt-10 h-px w-full bg-foreground" aria-hidden="true" />

        {/* Stats row — 2x2 en desktop para dar aire a los valores largos */}
        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7">
            {resolvedStats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <dt className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {stat.label}
              </dt>
              <dd className="font-sans text-[14px] leading-[20px] tracking-[-0.1px] text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Video/imagen: full-bleed sobre el fondo base de la web */}
      <div className="relative z-0 h-[60vh] w-full bg-background sm:h-[70vh] lg:absolute lg:inset-0 lg:h-full">
        <MediaLayer videoSrc={videoSrc} videoPoster={videoPoster} />
      </div>

      <span className="sr-only" data-locale={locale} />
    </section>
  );
}
