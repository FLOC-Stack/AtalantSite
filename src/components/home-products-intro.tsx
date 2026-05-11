import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

export type HomeProductsIntroStat = {
  label: string;
  value: string;
};

type Props = {
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  stats?: HomeProductsIntroStat[];
  videoSrc?: string;
  videoPoster?: string;
  locale?: string;
};

const FALLBACK_TITLE = "Polímeros\nbásicos, técnicos\ny reciclados.";

const FALLBACK_BODY =
  "Nuestra gama abarca polímeros básicos (PE, PP, PS, PVC), plásticos técnicos y polímeros reciclados de alta calidad y rendimiento. Socios de referencia de los principales productores europeos.";

const FALLBACK_STATS: HomeProductsIntroStat[] = [
  { label: "Catálogo", value: "5 familias base + reciclados" },
  { label: "Grados", value: "40+ referencias" },
  { label: "Marca", value: "Greenlant" },
  { label: "Certificación", value: "Fichas técnicas bajo petición" },
];

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
        <video
          src={videoSrc}
          poster={videoPoster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        />
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
  indexLabel = "N° 02 — SOLUCIONES / CATÁLOGO",
  counter = "02 / 05",
  title = FALLBACK_TITLE,
  body = FALLBACK_BODY,
  ctaLabel = "Descargar fichas técnicas",
  ctaHref = "#",
  primaryCtaLabel = "Ver productos",
  primaryCtaHref = "#",
  stats = FALLBACK_STATS,
  videoSrc,
  videoPoster,
  locale = "es",
}: Props = {}) {
  return (
    <section
      aria-labelledby="home-products-intro-title"
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Card editorial flotante — glass sobre el video */}
      <div className="glass relative z-10 m-4 flex flex-col rounded-3xl px-6 pt-12 pb-10 backdrop-blur-[16px] backdrop-saturate-[1.2] sm:m-6 sm:px-8 sm:pt-14 sm:pb-12 lg:absolute lg:inset-y-8 lg:left-8 lg:m-0 lg:w-[640px] lg:rounded-[28px] lg:px-12 lg:pt-12 lg:pb-10">
        {/* Header: index + counter */}
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary-dark">
            {indexLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {counter}
          </p>
        </div>

        {/* Divider top */}
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        {/* Title */}
        <h2
          id="home-products-intro-title"
          className="mt-8 font-sans text-[clamp(2.25rem,6vw,4.75rem)] font-light leading-[1] tracking-[-1.5px] text-foreground lg:tracking-[-2.5px]"
        >
          {renderMultiline(title)}
        </h2>

        {/* Body */}
        <p className="mt-7 max-w-[680px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[17px] lg:leading-[26px]">
          {body}
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-10">
          <Link
            href={primaryCtaHref}
            className="flex h-12 items-center rounded bg-primary text-white transition-opacity hover:opacity-90 sm:h-14"
          >
            <span className="border-r border-white/10 px-6 font-mono text-[10px] uppercase tracking-[2px] sm:px-10 sm:text-[11px] sm:tracking-[2.2px]">
              {primaryCtaLabel}
            </span>
            <span className="flex items-center justify-center px-4 sm:px-5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 border-b border-primary-dark pb-1 font-sans text-[15px] font-medium tracking-[0.2px] text-primary-dark transition-opacity hover:opacity-70"
          >
            {ctaLabel}
            <ArrowDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          </Link>
        </div>

        {/* Spacer empuja stats al fondo */}
        <div className="grow" />

        {/* Divider bottom */}
        <div className="mt-10 h-px w-full bg-foreground" aria-hidden="true" />

        {/* Stats row — 2x2 en desktop para dar aire a los valores largos */}
        <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7">
          {stats.map((stat) => (
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

      {/* Video/imagen — full-bleed detrás en desktop, debajo del texto en mobile */}
      <div className="relative z-0 h-[60vh] w-full sm:h-[70vh] lg:absolute lg:inset-0 lg:h-full">
        <MediaLayer videoSrc={videoSrc} videoPoster={videoPoster} />
      </div>

      <span className="sr-only" data-locale={locale} />
    </section>
  );
}
