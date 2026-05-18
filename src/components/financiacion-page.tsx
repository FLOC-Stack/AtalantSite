import Image from "next/image";
import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { FinanciacionFigure } from "@/components/financiacion-figure";
import { ParticleOcean } from "@/components/particle-ocean";

type Props = {
  locale: AppLocale;
};

// === i18n preparado ===
// Estructura tipada por locale, igual que en logistica-page.tsx y
// nosotros-page.tsx. Por ahora solo `es` está traducido; el resto cae
// al fallback español.
type DataModule = {
  /** Valor numérico final del contador (anima 0 → to) */
  to: number;
  /** Sufijo estático que acompaña a la cifra (ej. "%", "M€") */
  suffix?: string;
  /** Decimales a mostrar en el contador (default 0) */
  decimals?: number;
  /** Etiqueta accesible (leída por screen readers) */
  figureAriaLabel?: string;
  /** Unidad pequeña en mono junto a la cifra (ej. "años", "días") */
  unit?: string;
  title: string;
  body: string;
};

type FinanciacionCopy = {
  breadcrumb: string;
  back: string;
  monogram: string;
  heroTitle: string;
  heroBody: string;
  metaLabels: {
    programa: string;
    modelo: string;
    alcance: string;
    desde: string;
  };
  metaValues: {
    programa: string;
    modelo: string;
    alcance: string;
    desde: string;
  };
  dataEyebrow: string;
  dataTitle: string;
  modules: DataModule[];
};

const COPY_ES: FinanciacionCopy = {
  breadcrumb: "FINANCIACIÓN  /  CRÉDITO INTERNO",
  back: "← VOLVER",
  monogram: "FN",
  heroTitle: "Financiación\nque crece contigo.",
  heroBody:
    "Atalant participa activamente en la financiación de los clientes con nuestro sistema de crédito interno. Cada cliente es único para Atalant: estudiamos cada caso de la forma que más favorezca a ambas partes para mantener un ciclo de trabajo correcto y crecer de forma equilibrada.",
  metaLabels: {
    programa: "PROGRAMA",
    modelo: "MODELO",
    alcance: "ALCANCE",
    desde: "DESDE",
  },
  metaValues: {
    programa: "Crédito interno",
    modelo: "Caso a caso",
    alcance: "Iberia + Europa",
    desde: "1996",
  },

  dataEyebrow: "DATOS  /  EL SISTEMA EN CIFRAS",
  dataTitle: "Crecimiento equilibrado,\nen cifras.",
  modules: [
    {
      to: 30,
      figureAriaLabel: "treinta años",
      unit: "años",
      title: "Aplicando crédito interno",
      body: "Tres décadas acompañando a clientes con líneas de crédito propias, sin intermediarios bancarios.",
    },
    {
      to: 78,
      suffix: "%",
      figureAriaLabel: "setenta y ocho por ciento",
      unit: "clientes",
      title: "Con línea de crédito activa",
      body: "La mayoría de nuestra cartera opera con un programa de crédito interno ajustado a su producción.",
    },
    {
      to: 90,
      figureAriaLabel: "noventa días",
      unit: "días",
      title: "Plazo medio de pago",
      body: "Plazos diseñados para alinearse con los ciclos de fabricación reales del cliente.",
    },
    {
      to: 5,
      suffix: "M€",
      figureAriaLabel: "cinco millones de euros",
      unit: "agregados",
      title: "Línea de crédito desplegada",
      body: "Capital interno comprometido en operaciones de crédito a clientes durante el último ejercicio.",
    },
  ],
};

const COPY: Record<AppLocale, FinanciacionCopy> = {
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

export function FinanciacionPage({ locale }: Props) {
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
        aria-labelledby="fn-hero-title"
        className="px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,420px)] 2xl:gap-x-24">
          {/* Monograma FN */}
          <p
            aria-hidden="true"
            className="font-sans font-light leading-[0.85] tracking-[-6px] text-primary text-[120px] sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            {copy.monogram}
          </p>

          {/* Título */}
          <h1
            id="fn-hero-title"
            className="font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>

          {/* Bajada */}
          <p className="font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[560px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        {/* ======= Imagen hero ======= */}
        <div className="relative mt-14 aspect-[16/9] w-full overflow-hidden bg-primary sm:aspect-[21/9] lg:mt-16 lg:aspect-[1760/693]">
          <Image
            src="/imgsrc/financing/atalant-bg-financiacion.webp"
            alt="Equipo de Atalant trabajando con clientes"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ======= Meta row ======= */}
        <div className="mt-10 grid grid-cols-2 gap-y-8 border-t border-foreground/15 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {(
            [
              ["programa"],
              ["modelo"],
              ["alcance"],
              ["desde"],
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

      {/* ======= Datos (4 módulos en 2×2 con cifra animada) ======= */}
      <section
        aria-labelledby="fn-data-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.dataEyebrow}
        </p>
        <h2
          id="fn-data-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.dataTitle)}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2 lg:gap-y-20">
          {copy.modules.map((mod, i) => (
            <article
              key={i}
              className="border-t border-foreground/15 pt-10 lg:pt-12"
            >
              {/* Cifra grande tipo counter — arranca borrosa y cuenta de
                  0 a `to` mientras el blur se desvanece al valor final. */}
              <div className="flex items-baseline gap-3">
                <FinanciacionFigure
                  to={mod.to}
                  suffix={mod.suffix}
                  decimals={mod.decimals}
                  ariaLabel={mod.figureAriaLabel}
                  className="font-sans text-[88px] font-light leading-[0.9] tracking-[-3px] text-primary sm:text-[112px] lg:text-[140px] lg:tracking-[-5px]"
                />
                {mod.unit ? (
                  <span className="font-mono text-[11px] uppercase tracking-[2px] text-muted-strong">
                    {mod.unit}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-6 font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                {mod.title}
              </h3>
              <p className="mt-3 max-w-[520px] font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                {mod.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ======= Banda full-width con animación de partículas =======
          Misma capa que el fondo de la sección Financiación del home.
          Fondo en `bg-background` para que haya continuidad con la
          página. Gradient inferior fundiéndose con ese mismo color
          para evitar un corte duro contra el footer. */}
      <section aria-hidden="true" className="mt-10 lg:mt-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-background sm:aspect-[21/9] lg:aspect-[1760/600]">
          <ParticleOcean className="absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(246,247,253,0) 0%, var(--color-background) 100%)",
            }}
          />
        </div>
      </section>
    </main>
  );
}
