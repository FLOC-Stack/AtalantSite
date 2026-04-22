import type { ReactNode } from "react";

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
    body: "Fundación como proveedor de PE y PP para mercado español.",
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
    highlighted: true,
  },
  {
    year: "2010/14",
    label: "Europa+NAF",
    title: "Hubs europeos",
    location: "Italia · NL · MA · DZ",
    body: "Hubs en Italia y Países Bajos. Exportación a Norte de África.",
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
          Composición invertida: en desktop el globo vive en la mitad izquierda
          y deja respirar la columna editorial a la derecha. En mobile ocupa
          todo el ancho. */}
      <div className="absolute inset-0 z-0 md:right-1/2">
        {bgNode}
      </div>
      {/* Fade muy suave en el borde derecho del globo para que no se corte en seco */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to left, rgba(246,247,253,1) 30%, rgba(246,247,253,0) 50%)",
        }}
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 flex w-full flex-1 flex-col px-10 pt-16 pb-12 sm:px-14 sm:pt-20 sm:pb-14 lg:px-20 lg:pt-[100px] lg:pb-[80px]">
        {/* Bloque editorial: en mobile full-width; en desktop empujado a la
            derecha para no solaparse con el globo que ahora vive a la izquierda. */}
        <div className="md:ml-auto md:w-1/2 lg:w-[55%]">
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
        </div>

        {/* Spacer: empuja el timeline hacia el fondo del viewport en desktop */}
        <div className="grow" />

        {/* Timeline */}
        <div className="mt-16 lg:mt-20">
          <div className="h-px w-full bg-foreground" aria-hidden="true" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {timelineLabel}
          </p>

          <ol className="mt-6 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:mt-8 lg:grid-cols-4 lg:gap-x-10">
            {milestones.map((m) => (
              <li
                key={m.year}
                className="relative flex flex-col lg:border-l lg:border-foreground/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
              >
                <span
                  className={`font-sans text-[clamp(2rem,3.5vw,2.875rem)] font-light leading-none tracking-[-1.5px] ${
                    m.highlighted ? "text-primary-dark" : "text-foreground"
                  }`}
                >
                  {m.year}
                </span>
                <span className="mt-3 font-mono text-[9px] uppercase tracking-[1.5px] text-muted-strong">
                  {m.label}
                </span>
                <p className="mt-2 font-sans text-[16px] tracking-[-0.2px] text-foreground">
                  {m.title}
                </p>
                <p className="mt-1 font-mono text-[10px] tracking-[1px] text-primary-dark">
                  {m.location}
                </p>
                <p className="mt-3 max-w-[380px] font-sans text-[13px] font-light leading-[18px] tracking-[-0.1px] text-muted-strong">
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
