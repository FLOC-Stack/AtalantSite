import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { SustainabilityParticles } from "@/components/sustainability-particles";

type Props = {
  locale: AppLocale;
};

type SustainabilityCopy = {
  back: string;
  breadcrumb: string;
  ctaAction: string;
  ctaFootnote: string;
  ctaTitle: string;
  heroBody: string;
  heroTitle: string;
  initiatives: Array<{
    number: string;
    title: string;
    body: string;
  }>;
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  meta: Array<{
    label: string;
    value: string;
  }>;
  proofEyebrow: string;
  proofTitle: string;
  proofItems: Array<{
    label: string;
    value: string;
  }>;
  systemsEyebrow: string;
  systemsTitle: string;
  systemsBody: string;
};

const COPY_ES: SustainabilityCopy = {
  back: "← VOLVER",
  breadcrumb: "SOSTENIBILIDAD  /  OPERACIÓN INDUSTRIAL",
  ctaAction: "Hablar con Atalant  →",
  ctaFootnote: "© MMXXVI ATALANT  /  SOST",
  ctaTitle: "La sostenibilidad se sostiene cuando mejora la operación.",
  heroBody:
    "Ser sostenible a escala industrial exige mantener eficiencia, capacidad y continuidad. Atalant ha adaptado su operación para reducir impacto sin convertir la sostenibilidad en una promesa decorativa.",
  heroTitle: "Sostenibilidad\nsin perder\ncapacidad.",
  initiatives: [
    {
      number: "01",
      title: "Gestión de residuos",
      body:
        "Sistema implantado en todos los centros para gestionar, reducir y mejorar de forma constante el impacto ambiental de la empresa.",
    },
    {
      number: "02",
      title: "Materiales reciclados",
      body:
        "La inclusión de materiales reciclados de alta calidad marca un precedente dentro del plan de sostenibilidad de Atalant.",
    },
    {
      number: "03",
      title: "Energía solar",
      body:
        "Placas solares en puntos logísticos para operar con menor dependencia de la red eléctrica y avanzar hacia autosuficiencia operativa.",
    },
    {
      number: "04",
      title: "Descarga eléctrica",
      body:
        "Camiones con cisternas eléctricas para evitar el uso de combustible durante las descargas en operaciones seleccionadas.",
    },
    {
      number: "05",
      title: "Flota eficiente",
      body:
        "Nuevos camiones y medios internos en almacenes y centros logísticos orientados a reducir consumos y contaminación.",
    },
    {
      number: "06",
      title: "I+D en hidrógeno verde",
      body:
        "Inversión y liderazgo en proyectos basados en tecnologías de hidrógeno verde para pilas de combustible y electrolizadores.",
    },
  ],
  introEyebrow: "ENFOQUE  /  EFICIENCIA Y RESPONSABILIDAD",
  introTitle: "Reducir impacto sin reducir respuesta.",
  introBody:
    "Uno de los retos industriales más complejos es ser sostenible manteniendo un trabajo eficiente. La estrategia de Atalant parte de una idea concreta: cada mejora ambiental debe integrarse en el sistema operativo, no vivir separada de la realidad logística y comercial.",
  meta: [
    { label: "CERTIFICACIÓN", value: "ISO 14001" },
    { label: "ENERGÍA", value: "Placas solares logísticas" },
    { label: "TRANSPORTE", value: "Cisternas eléctricas" },
    { label: "MATERIALES", value: "Reciclados de alta calidad" },
  ],
  proofEyebrow: "EVIDENCIAS  /  MEDICIÓN",
  proofTitle: "Lo medible se gestiona.",
  proofItems: [
    { label: "Sistema ambiental", value: "ISO 14001 implantado" },
    { label: "Huella de carbono", value: "Medición y certificación en seguimiento" },
    { label: "Centros", value: "Gestión de residuos en todos los puntos operativos" },
    { label: "Entorno natural", value: "Conservación de zonas con árboles y masas forestales" },
  ],
  systemsEyebrow: "SISTEMA  /  MEJORA CONTINUA",
  systemsTitle: "Sostenibilidad como infraestructura, no como campaña.",
  systemsBody:
    "La gestión ambiental se conecta con compras, almacenaje, transporte, energía e I+D. Esa integración permite avanzar en reducción de impacto sin perder capacidades industriales ni velocidad de respuesta.",
};

const COPY: Record<AppLocale, SustainabilityCopy> = {
  es: COPY_ES,
  en: COPY_ES,
  pt: COPY_ES,
  fr: COPY_ES,
};

function renderMultiline(text: string) {
  return text.split("\n").map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

export function SustainabilityPage({ locale }: Props) {
  const copy = COPY[locale];
  const homeHref = `/${locale}`;

  return (
    <main className="relative bg-background text-foreground">
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

      <section
        aria-labelledby="sustainability-hero-title"
        className="px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,460px)] 2xl:gap-x-24">
          <p
            aria-hidden="true"
            className="font-sans text-[120px] font-light leading-[0.85] tracking-[-6px] text-green sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            SO
          </p>
          <h1
            id="sustainability-hero-title"
            className="text-balance font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>
          <p className="text-pretty font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[600px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-foreground/15 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {copy.meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {item.label}
              </dt>
              <dd className="mt-2 text-pretty font-sans text-[15px] tracking-[-0.1px] text-foreground sm:text-[16px]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="sustainability-intro-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:gap-12">
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
            <SustainabilityParticles className="absolute inset-0" />
          </div>
          <div className="flex flex-col justify-center lg:pl-6">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
              {copy.introEyebrow}
            </p>
            <h2
              id="sustainability-intro-title"
              className="mt-6 max-w-[680px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[52px] lg:tracking-[-1.6px]"
            >
              {copy.introTitle}
            </h2>
            <p className="mt-8 max-w-[560px] text-pretty font-sans text-[16px] font-light leading-[26px] tracking-[-0.1px] text-body lg:text-[18px] lg:leading-[30px]">
              {copy.introBody}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sustainability-initiatives-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
          ACTUACIONES  /  SEIS FRENTES
        </p>
        <h2
          id="sustainability-initiatives-title"
          className="mt-6 max-w-[1200px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          Mejoras aplicadas en centros, flota, energía y producto.
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2">
          {copy.initiatives.map((item) => (
            <article
              key={item.number}
              className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-foreground/15 pb-10 lg:pb-14"
            >
              <p className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-green sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]">
                {item.number}
              </p>
              <div>
                <h3 className="text-balance font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[740px] text-pretty font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20">
        <div className="grid gap-12 bg-white px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-12 lg:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
              {copy.systemsEyebrow}
            </p>
            <h2 className="mt-6 max-w-[760px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]">
              {copy.systemsTitle}
            </h2>
            <p className="mt-8 max-w-[640px] text-pretty font-sans text-[16px] font-light leading-[26px] tracking-[-0.1px] text-body lg:text-[18px] lg:leading-[30px]">
              {copy.systemsBody}
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden bg-background">
            <video
              className="h-full w-full object-cover"
              src="/Truck%20Coastal%20Cinematic.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sustainability-proof-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
          {copy.proofEyebrow}
        </p>
        <h2
          id="sustainability-proof-title"
          className="mt-6 max-w-[1200px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {copy.proofTitle}
        </h2>
        <div className="mt-10 h-px w-full bg-foreground" aria-hidden="true" />
        <dl className="divide-y divide-foreground/15">
          {copy.proofItems.map((item) => (
            <div
              key={item.label}
              className="grid gap-3 py-8 sm:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {item.label}
              </dt>
              <dd className="text-pretty font-sans text-[24px] font-light leading-[1.15] tracking-[-0.7px] text-foreground sm:text-[30px] lg:text-[36px]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="sustainability-cta-title"
        className="mt-24 bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:mt-32 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/25" aria-hidden="true" />
        <h2
          id="sustainability-cta-title"
          className="mt-10 max-w-[1700px] text-balance font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {copy.ctaTitle}
        </h2>
        <Link
          href={`mailto:info@atalant.com?subject=${encodeURIComponent("Sostenibilidad Atalant")}`}
          className="mt-10 inline-flex flex-col items-start text-white transition-opacity hover:opacity-80"
        >
          <span className="font-sans text-[15px] font-medium tracking-[0.2px] sm:text-[16px]">
            {copy.ctaAction}
          </span>
          <span className="mt-2 block h-px w-[190px] bg-white" aria-hidden="true" />
        </Link>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/60">
            {copy.ctaFootnote}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-white/85">
            ISO 14001  ·  GREENLANT  ·  I+D HIDRÓGENO VERDE
          </p>
        </div>
      </section>
    </main>
  );
}
