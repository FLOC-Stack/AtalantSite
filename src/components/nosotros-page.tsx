import Image from "next/image";
import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { NosotrosChapters, type Chapter } from "@/components/nosotros-chapters";
import { NosotrosGrid } from "@/components/nosotros-grid";

type Props = {
  locale: AppLocale;
};

// === i18n preparado ===
// Estructura tipada por locale, igual que en logistica-page.tsx.
// Por ahora solo `es` está traducido; el resto cae al fallback.
type ValueCard = {
  number: string;
  title: string;
  body: string;
};

type NosotrosCopy = {
  breadcrumb: string;
  back: string;
  monogram: string;
  heroTitle: string;
  heroBody: string;
  metaLabels: {
    experiencia: string;
    sede: string;
    red: string;
    enfoque: string;
  };
  metaValues: {
    experiencia: string;
    sede: string;
    red: string;
    enfoque: string;
  };
  chapters: Chapter[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueCard[];
  closingEyebrow: string;
  closingTitle: string;
  closingBody: string;
  ctaTitle: string;
  ctaAction: string;
  ctaFootnote: string;
  phone: string;
};

const COPY_ES: NosotrosCopy = {
  breadcrumb: "NOSOTROS  /  SOCIO ESTRATÉGICO",
  back: "← VOLVER",
  monogram: "NS",
  heroTitle: "Treinta años\nuniendo polímeros\ny personas.",
  heroBody:
    "Atalant trabaja desde hace tres décadas para asegurar una cadena de suministro sólida y competitiva en materias primas plásticas y recicladas. Creemos en las relaciones fuertes y a largo plazo.",
  metaLabels: {
    experiencia: "EXPERIENCIA",
    sede: "SEDE",
    red: "RED",
    enfoque: "ENFOQUE",
  },
  metaValues: {
    experiencia: "30 años de mercado",
    sede: "Alicante · Iberia",
    red: "Iberia + Europa",
    enfoque: "Socio a largo plazo",
  },

  chapters: [
    {
      eyebrow: "MANIFIESTO  /  ORIGEN",
      title: "Una cadena de suministro\nque no se rompe.",
      paragraphs: [
        "Con 30 años de experiencia en el sector de los polímeros, Atalant ha trabajado siempre para asegurar una cadena de suministro sólida y competitiva para sus clientes en lo referente no solo a la entrega y disponibilidad de materias primas plásticas y recicladas.",
        "En estos años, hemos aprendido a creer en las relaciones fuertes y a largo plazo.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-1.jpg",
        alt: "Materia prima plástica lista para producción",
      },
    },
    {
      eyebrow: "MISIÓN  /  DISPONIBILIDAD",
      title: "Calidad máxima,\nsiempre disponible.",
      paragraphs: [
        "Nuestra misión es facilitar la compra de materias primas plásticas de la máxima calidad, y esto lo logramos gracias a nuestra amplia red logística propia y centros de almacenamiento de diseño propio en Iberia y el resto de Europa.",
        "De esta forma, mantenemos siempre los niveles de disponibilidad para nuestros clientes —desde volúmenes regulares hasta pedidos urgentes— sin perder de vista la sostenibilidad ni la calidad de trabajo.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-2.jpg",
        alt: "Centro logístico y almacenaje Atalant",
      },
      reverse: true,
    },
    {
      eyebrow: "MÉTODO  /  ACOMPAÑAMIENTO",
      title: "Un enfoque personalizado,\nun compromiso firme.",
      paragraphs: [
        "Acompañamos a cada cliente para optimizar su producción, garantizando calidad, trazabilidad y respuesta inmediata ante cualquier cambio del mercado.",
        "Ofrecemos soluciones de abastecimiento flexibles, adaptadas a la realidad operativa de cada planta y a los ritmos reales de cada producción.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-3.jpg",
        alt: "Producto terminado en polímero de alta calidad",
      },
    },
  ],

  valuesEyebrow: "VALORES  /  CUATRO PRINCIPIOS",
  valuesTitle: "Lo que sostiene\ncada decisión.",
  values: [
    {
      number: "01",
      title: "Compromiso",
      body: "Nuestro apoyo a las relaciones fuertes es incondicional y responde al compromiso con clientes y proveedores, ofreciendo siempre la mejor solución a sus necesidades.",
    },
    {
      number: "02",
      title: "Agilidad",
      body: "Las soluciones ágiles forman parte de nuestro ADN. Respondemos con energía y estamos en movimiento continuo, sin conformarnos y buscando nuevas vías para dar lo mejor.",
    },
    {
      number: "03",
      title: "Flexibilidad",
      body: "Nos adaptamos a la realidad de cada cliente y proveedor. Solo porque estamos cerca podemos escuchar activamente y responder con rapidez y eficacia.",
    },
    {
      number: "04",
      title: "Confianza",
      body: "Sabemos lo que hacemos. Somos especialistas en materias primas plásticas y estamos siempre enfocados en ser el mejor socio posible para nuestros clientes.",
    },
  ],

  closingEyebrow: "POSICIÓN  /  MÁS QUE UN PROVEEDOR",
  closingTitle: "Socio estratégico,\nno solo proveedor.",
  closingBody:
    "Atalant se posiciona como socio estratégico a largo plazo para las empresas que buscan seriedad, tranquilidad y mayores ventajas que las que pueda ofrecer cualquier trader, distribuidor o petroquímica. Respaldados por la experiencia, la flexibilidad y el equipo, ponemos a disposición del cliente productos y servicios nunca antes vistos en el sector.",

  ctaTitle: "Hablemos de tu cadena\nde suministro.",
  ctaAction: "Escribir al equipo  →",
  ctaFootnote: "© MMXXVI ATALANT  /  NS",
  phone: "+34 965 661 828",
};

const COPY: Record<AppLocale, NosotrosCopy> = {
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

export function NosotrosPage({ locale }: Props) {
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
        aria-labelledby="ns-hero-title"
        className="relative overflow-x-clip px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        {/* Retícula full-bleed: arranca en el borde superior del hero
            (donde están el monograma NS y el titular) y se extiende
            -bottom-40 / lg:-bottom-56 más allá del meta row para cubrir
            el `mt-24 + pt-16` (lg: `mt-32 + pt-24`) hasta el inicio del
            primer capítulo del manifesto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -bottom-40 z-0 w-screen -translate-x-1/2 lg:-bottom-56"
        >
          <NosotrosGrid />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,420px)] 2xl:gap-x-24">
          {/* Monograma NS */}
          <p
            aria-hidden="true"
            className="font-sans font-light leading-[0.85] tracking-[-6px] text-primary text-[120px] sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            {copy.monogram}
          </p>

          {/* Título */}
          <h1
            id="ns-hero-title"
            className="font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>

          {/* Bajada */}
          <p className="font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[560px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        {/* ======= Imagen hero (sobre la retícula) ======= */}
        <div className="relative z-10 mt-14 aspect-[16/9] w-full overflow-hidden bg-foreground/5 sm:aspect-[21/9] lg:mt-16 lg:aspect-[1760/693]">
          <Image
            src="/imgsrc/about/atalant-about-hero.jpg"
            alt="Equipo Atalant en planta de polímeros"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ======= Meta row ======= */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-y-8 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {(
            [
              ["experiencia"],
              ["sede"],
              ["red"],
              ["enfoque"],
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

      {/* ======= Manifiesto: capítulos texto-imagen con scroll reveal ======= */}
      <section
        aria-label="Manifiesto Atalant"
        className="mt-24 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <NosotrosChapters chapters={copy.chapters} />
      </section>

      {/* ======= Valores (4 puntos) ======= */}
      <section
        aria-labelledby="ns-values-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.valuesEyebrow}
        </p>
        <h2
          id="ns-values-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.valuesTitle)}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2">
          {copy.values.map((val) => (
            <article
              key={val.number}
              className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-foreground/15 pb-10 lg:pb-14"
            >
              <p className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]">
                {val.number}
              </p>
              <div>
                <h3 className="font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                  {val.title}
                </h3>
                <p className="mt-3 max-w-[740px] font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                  {val.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======= Cierre: posicionamiento (composición centrada sobre
          retícula full-bleed) ======= */}
      <section
        aria-labelledby="ns-closing-title"
        className="relative mt-24 overflow-x-clip px-10 py-20 sm:px-14 lg:mt-32 lg:px-20 lg:py-36"
      >
        {/* Retícula de fondo, full-bleed (100vw), cubre toda la sección */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2"
        >
          <NosotrosGrid />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center text-center">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
            {copy.closingEyebrow}
          </p>
          <h2
            id="ns-closing-title"
            className="mt-8 font-sans text-[40px] font-medium leading-[1.02] tracking-[-1.5px] text-foreground sm:text-[56px] lg:mt-10 lg:text-[80px] lg:leading-[0.98] lg:tracking-[-3px]"
          >
            {renderMultiline(copy.closingTitle)}
          </h2>
          <p className="mt-10 max-w-[720px] font-sans text-[17px] font-light leading-[28px] tracking-[-0.1px] text-muted-strong lg:mt-14 lg:text-[20px] lg:leading-[32px]">
            {copy.closingBody}
          </p>
        </div>
      </section>

      {/* ======= CTA dark ======= */}
      <section
        aria-labelledby="ns-cta-title"
        className="mt-24 bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:mt-32 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/20" aria-hidden="true" />
        <h2
          id="ns-cta-title"
          className="mt-10 max-w-[1700px] font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white/95 sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {renderMultiline(copy.ctaTitle)}
        </h2>
        <Link
          href={`mailto:hola@atalant.com?subject=${encodeURIComponent("Contacto Atalant")}`}
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
