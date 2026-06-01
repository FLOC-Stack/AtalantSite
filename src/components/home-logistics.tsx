import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MilestoneCarousel } from "./milestone-carousel";

export type LogisticsMilestone = {
  year: string;
  label: string;
  title: string;
  location: string;
  body: string;
  /** Si true, año destacado en primary-dark */
  highlighted?: boolean;
};

type Props = {
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  timelineLabel?: string;
  milestones?: LogisticsMilestone[];
  /** Video de fondo. Se renderiza con object-cover detrás del overlay. */
  videoSrc?: string;
  videoPoster?: string;
  /** Alternativa totalmente custom al background (p. ej. un DitheredVideo). Tiene prioridad sobre videoSrc. */
  background?: ReactNode;
};

const FALLBACK_TITLE = "Del Mediterráneo\nal resto de Europa.";

const FALLBACK_BODY =
  "Almacenes propios con estatus oficial de Depósito Aduanero en Valencia y Alicante. Hubs de distribución en Italia y Países Bajos. Un solo interlocutor para el flujo completo: importación, almacenaje, entrega, financiación.";

const FALLBACK_MILESTONES: LogisticsMilestone[] = [
  {
    year: "1997",
    label: "Origen",
    title: "Plast Alacant",
    location: "Alicante · España",
    body: "Fundación como proveedor de PE y PP para el mercado español.",
  },
  {
    year: "2000/05",
    label: "Ibérica",
    title: "Mercado ibérico",
    location: "España + Portugal",
    body: "Expansión del territorio de distribución a la Península.",
  },
  {
    year: "2006/09",
    label: "Aduanero",
    title: "Depósito Aduanero",
    location: "Valencia · Alicante",
    body: "Consolidación logística. Denominación oficial obtenida.",
  },
  {
    year: "2010/14",
    label: "Europa + NAF",
    title: "Hubs europeos",
    location: "UK · FR · NL · LU · BE",
    body: "Exportación a Brasil y resto de Sudamérica, además del Norte de África.",
  },
  {
    year: "2019",
    label: "OEA",
    title: "Operador Económico Autorizado",
    location: "",
    body: "Obtención del certificado oficial.",
  },
  {
    year: "2024",
    label: "Red personal",
    title: "Logística personal europea",
    location: "Europa",
    body: "Ampliación de la red de distribución a nivel europeo.",
  },
  {
    year: "2026",
    label: "Centros",
    title: "Nuevos centros logísticos",
    location: "",
    body: "Diseño y construcción de centros de apoyo.",
  },
];

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function HomeLogistics({
  indexLabel = "N° 03 — RUTAS / DEPÓSITOS",
  counter = "03 / 05",
  title = FALLBACK_TITLE,
  body = FALLBACK_BODY,
  ctaLabel = "Ver depósitos",
  ctaHref,
  timelineLabel = "Evolución Atalant",
  milestones = FALLBACK_MILESTONES,
  videoSrc,
  videoPoster,
  background,
}: Props = {}) {
  const bgNode =
    background ??
    (videoSrc ? (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={videoPoster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    ) : (
      <div
        className="absolute inset-0 flex items-center justify-center bg-[#eceef2] font-mono text-[11px] uppercase tracking-[2px] text-muted-strong"
        aria-hidden="true"
      >
        video/animación
      </div>
    ));

  return (
    <section
      aria-labelledby="home-logistics-title"
      className="relative flex min-h-screen flex-col overflow-hidden bg-background text-foreground"
    >
      {/* Background: video / animación / globo.
          Composición invertida: en desktop el globo vive en la mitad izquierda,
          contenido en un cuadrante reducido para no robar protagonismo a la
          columna editorial. En mobile ocupa todo el ancho. */}
      <div className="absolute inset-0 z-0 md:left-[2%] md:right-1/2 md:top-[10%] md:bottom-[10%]">
        {bgNode}
      </div>
      {/* Fade muy suave en el borde derecho del globo para que no se corte en seco */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to left, rgba(246,247,253,1) 50%, rgba(246,247,253,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 flex w-full flex-1 flex-col px-10 pt-16 pb-12 sm:px-14 sm:pt-20 sm:pb-14 lg:px-20 lg:pt-[100px] lg:pb-[80px]">
        {/* Bloque editorial: en mobile full-width; en desktop empujado a la
            derecha para no solaparse con el globo que ahora vive a la izquierda. */}
        <div className="md:ml-auto md:w-[45%]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary-dark">
              {indexLabel}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
              {counter}
            </p>
          </div>

          {/* Divider superior */}
          <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

          {/* Título */}
          <h2
            id="home-logistics-title"
            className="mt-10 font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1] tracking-[-2px] text-foreground lg:tracking-[-3px]"
          >
            {renderMultiline(title)}
          </h2>

          {/* Body */}
          <p className="mt-8 max-w-[680px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[18px] lg:leading-[28px]">
            {body}
          </p>

          {/* CTA */}
          {ctaHref ? (
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex h-11 items-center rounded bg-primary text-white transition-opacity hover:opacity-90"
              >
                <span className="border-r border-white/10 px-5 font-mono text-[10px] uppercase tracking-[2px] sm:text-[11px] sm:tracking-[2.2px]">
                  {ctaLabel}
                </span>
                <span className="flex items-center justify-center px-3.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          ) : null}
        </div>

        {/* Spacer: empuja el timeline hacia el fondo del viewport en desktop */}
        <div className="grow" />

        {/* Timeline */}
        <MilestoneCarousel milestones={milestones} label={timelineLabel} />
      </div>
    </section>
  );
}
