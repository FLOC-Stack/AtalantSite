import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { NetworkTimeline, type NetworkHub } from "@/components/network-timeline";

type Props = {
  locale: AppLocale;
};

// === i18n preparado ===
// Los textos quedan tipados por locale para cuando llegue la traducción.
// Por ahora solo `es` está traducido; el resto cae al fallback.
type LogisticaCopy = {
  breadcrumb: string;
  back: string;
  monogram: string;
  heroTitle: string; // \n separa líneas
  heroBody: string;
  metaLabels: {
    ubicaciones: string;
    estatus: string;
    hubs: string;
    exportacion: string;
  };
  metaValues: {
    ubicaciones: string;
    estatus: string;
    hubs: string;
    exportacion: string;
  };
  advantagesEyebrow: string;
  advantagesTitle: string;
  advantages: Array<{ number: string; title: string; body: string }>;
  networkEyebrow: string;
  networkTitle: string;
  networkCaption: string;
  networkLegend: string;
  processEyebrow: string;
  process: Array<{ roman: string; title: string; body: string }>;
  ctaTitle: string;
  ctaAction: string;
  ctaFootnote: string;
  phone: string;
  hubs: NetworkHub[];
};

const COPY_ES: LogisticaCopy = {
  breadcrumb: "LOGÍSTICA  /  DEPÓSITO ADUANERO",
  back: "← VOLVER",
  monogram: "LG",
  heroTitle: "Estatus aduanero\noficial, desde 2006.",
  heroBody:
    "Los almacenes de la costa mediterránea obtuvieron la denominación oficial de Depósito Aduanero entre 2006 y 2009. Valencia y Alicante operan con ventajas fiscales en operaciones de importación y exportación.",
  metaLabels: {
    ubicaciones: "UBICACIONES",
    estatus: "ESTATUS",
    hubs: "HUBS EUROPA",
    exportacion: "EXPORTACIÓN",
  },
  metaValues: {
    ubicaciones: "Valencia · Alicante",
    estatus: "Depósito Aduanero oficial",
    hubs: "Italia · Países Bajos",
    exportacion: "Marruecos · Argelia",
  },
  advantagesEyebrow: "VENTAJAS  /  CUATRO PUNTOS CLAVE",
  advantagesTitle: "Por qué importa operar\ndesde Depósito Aduanero.",
  advantages: [
    {
      number: "01",
      title: "Aplazamiento fiscal",
      body:
        "Las mercancías no pagan derechos de aduana ni IVA hasta que salen del depósito, mejorando el cash-flow del cliente.",
    },
    {
      number: "02",
      title: "Ventaja en importación",
      body:
        "Importa desde fuera de la UE sin coste aduanero inmediato; libera solo lo necesario.",
    },
    {
      number: "03",
      title: "Reexportación sin carga",
      body:
        "Posibilidad de reexportar a terceros países sin devolución ni costes adicionales.",
    },
    {
      number: "04",
      title: "Almacenaje prolongado",
      body:
        "Sin límite temporal bajo el régimen; la materia prima se libera al ritmo de la producción.",
    },
  ],
  networkEyebrow: "RED  /  TERRITORIOS",
  networkTitle: "Dos depósitos, dos hubs,\nsiete países activos.",
  networkCaption: "RED ATALANT 2026  /  OESTE ←    → ESTE",
  networkLegend: "●  SEDE / HUB / DA      ○  DISTRIBUCIÓN / EXPORTACIÓN",
  processEyebrow: "PROCESO  /  PUERTA A PUERTA",
  process: [
    { roman: "i.", title: "Origen", body: "Fabricante europeo." },
    {
      roman: "ii.",
      title: "Importación",
      body: "Entrada sin carga fiscal en depósito aduanero.",
    },
    {
      roman: "iii.",
      title: "Almacenaje",
      body: "Stock disponible en ES, IT o NL.",
    },
    {
      roman: "iv.",
      title: "Entrega",
      body: "Liberación y transporte a planta del cliente.",
    },
  ],
  ctaTitle: "¿Ruta específica? Lo resolvemos.",
  ctaAction: "Solicitar condiciones  →",
  ctaFootnote: "© MMXXVI ATALANT  /  LG",
  phone: "+34 965 661 828",
  hubs: [
    { code: "ES · Alicante", role: "SEDE · DA", tier: "primary" },
    { code: "ES · Valencia", role: "DA", tier: "primary" },
    { code: "PT", role: "DISTRIBUCIÓN", tier: "secondary" },
    { code: "FR", role: "DISTRIBUCIÓN", tier: "secondary" },
    { code: "IT", role: "HUB", tier: "primary" },
    { code: "NL", role: "HUB", tier: "primary" },
    { code: "MA", role: "EXPORT NAF", tier: "secondary" },
    { code: "DZ", role: "EXPORT NAF", tier: "secondary" },
  ],
};

const COPY: Record<AppLocale, LogisticaCopy> = {
  es: COPY_ES,
  en: COPY_ES,
  pt: COPY_ES,
  fr: COPY_ES,
};

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function LogisticaPage({ locale }: Props) {
  const copy = COPY[locale];
  const homeHref = `/${locale}`;

  return (
    <main className="relative bg-background text-foreground">
      {/* ======= Breadcrumb ======= */}
      <div className="px-10 pt-24 sm:px-14 sm:pt-28 lg:px-20 lg:pt-32">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong sm:text-[11px]">
            {copy.breadcrumb}
          </p>
          <Link
            href={homeHref}
            className="font-mono text-[10px] uppercase tracking-[2px] text-foreground transition-opacity hover:opacity-70 sm:text-[11px]"
          >
            {copy.back}
          </Link>
        </div>
        <div className="mt-5 h-px w-full bg-foreground" aria-hidden="true" />
      </div>

      {/* ======= Hero: monograma + título + bajada ======= */}
      <section
        aria-labelledby="lg-hero-title"
        className="px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,420px)] 2xl:gap-x-24">
          {/* Monograma LG */}
          <p
            aria-hidden="true"
            className="font-sans font-light leading-[0.85] tracking-[-6px] text-primary text-[120px] sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            {copy.monogram}
          </p>

          {/* Título */}
          <h1
            id="lg-hero-title"
            className="font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>

          {/* Bajada: mobile y lg debajo (fila 2, col-span-2); 2xl a la derecha */}
          <p className="font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[560px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        {/* ======= Bloque visual (video del DA) ======= */}
        <div className="mt-14 aspect-[16/9] w-full overflow-hidden bg-primary sm:aspect-[21/9] lg:mt-16 lg:aspect-[1760/693]">
          <video
            className="h-full w-full object-cover"
            src="/Tanker%20Truck%20Aesthetic.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>

        {/* ======= Meta row ======= */}
        <div className="mt-10 grid grid-cols-2 gap-y-8 border-t border-foreground/15 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {(
            [
              ["ubicaciones"],
              ["estatus"],
              ["hubs"],
              ["exportacion"],
            ] as const
          ).map(([k]) => (
            <div key={k}>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {copy.metaLabels[k]}
              </p>
              <p className="mt-2 font-sans text-[15px] tracking-[-0.1px] text-foreground sm:text-[16px]">
                {copy.metaValues[k]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= Ventajas (4 puntos) ======= */}
      <section
        aria-labelledby="lg-advantages-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.advantagesEyebrow}
        </p>
        <h2
          id="lg-advantages-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.advantagesTitle)}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2">
          {copy.advantages.map((adv) => (
            <article
              key={adv.number}
              className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-foreground/15 pb-10 lg:pb-14"
            >
              <p className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]">
                {adv.number}
              </p>
              <div>
                <h3 className="font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                  {adv.title}
                </h3>
                <p className="mt-3 max-w-[740px] font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                  {adv.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======= Red / Timeline ======= */}
      <section
        aria-labelledby="lg-network-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.networkEyebrow}
        </p>
        <h2
          id="lg-network-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.networkTitle)}
        </h2>

        <div className="mt-12 lg:mt-16">
          <NetworkTimeline
            hubs={copy.hubs}
            caption={copy.networkCaption}
            legend={copy.networkLegend}
          />
        </div>
      </section>

      {/* ======= Proceso ======= */}
      <section
        aria-labelledby="lg-process-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <h2 id="lg-process-title" className="font-mono text-[11px] font-medium uppercase tracking-[2px] text-muted-strong">
          {copy.processEyebrow}
        </h2>
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {copy.process.map((step, i) => (
            <li
              key={step.roman}
              className="relative flex flex-col lg:pr-6"
            >
              <span className="font-sans text-[36px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[40px] lg:text-[42px] lg:tracking-[-1px]">
                {step.roman}
              </span>
              <h3 className="mt-6 font-sans text-[20px] tracking-[-0.3px] text-foreground sm:text-[22px] lg:text-[22px] lg:tracking-[-0.4px]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[380px] font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-muted-strong">
                {step.body}
              </p>

              {/* Chevron entre pasos (solo desktop, oculto en el último) */}
              {i < copy.process.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-2 hidden font-mono text-[18px] text-muted lg:block"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {/* ======= CTA dark ======= */}
      <section
        aria-labelledby="lg-cta-title"
        className="mt-24 bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:mt-32 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/20" aria-hidden="true" />
        <h2
          id="lg-cta-title"
          className="mt-10 max-w-[1700px] font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white/95 sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {copy.ctaTitle}
        </h2>
        <Link
          href={`mailto:logistica@atalant.com?subject=${encodeURIComponent("Consulta ruta DA")}`}
          className="mt-10 inline-flex flex-col items-start text-white transition-opacity hover:opacity-80"
        >
          <span className="font-sans text-[15px] font-medium tracking-[0.2px] sm:text-[16px]">
            {copy.ctaAction}
          </span>
          <span className="mt-2 block h-px w-[212px] bg-white" aria-hidden="true" />
        </Link>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/50">
            {copy.ctaFootnote}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-white/80">
            {copy.phone}
          </p>
        </div>
      </section>
    </main>
  );
}
