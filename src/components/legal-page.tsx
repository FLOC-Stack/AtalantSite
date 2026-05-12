import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { buildLocalePath } from "@/lib/routes";

export type LegalPageKind = "privacy" | "cookies" | "legal";

type Props = {
  kind: LegalPageKind;
  locale: AppLocale;
};

type LegalCopy = {
  back: string;
  breadcrumb: string;
  eyebrow: string;
  intro: string;
  title: string;
  updated: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
};

const LEGAL_COPY_ES: Record<LegalPageKind, LegalCopy> = {
  privacy: {
    back: "← VOLVER",
    breadcrumb: "LEGAL  /  PRIVACIDAD",
    eyebrow: "POLÍTICA  /  DATOS PERSONALES",
    intro:
      "Texto placeholder pendiente de revisión legal. Esta página establece la base visual y estructural para la futura política de privacidad de Atalant.",
    title: "Privacidad",
    updated: "Última actualización pendiente",
    sections: [
      {
        title: "Responsable del tratamiento",
        body:
          "Atalant será responsable del tratamiento de los datos personales facilitados a través de sus canales digitales. La información legal definitiva se incorporará en una fase posterior.",
      },
      {
        title: "Finalidad",
        body:
          "Los datos podrán utilizarse para atender solicitudes comerciales, gestionar comunicaciones y mantener la relación profesional con clientes, proveedores o candidatos.",
      },
      {
        title: "Legitimación y conservación",
        body:
          "La base jurídica, los plazos de conservación y los derechos aplicables se completarán con el texto validado por el equipo legal correspondiente.",
      },
      {
        title: "Derechos",
        body:
          "Las personas interesadas podrán ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad conforme a la normativa aplicable.",
      },
    ],
  },
  cookies: {
    back: "← VOLVER",
    breadcrumb: "LEGAL  /  COOKIES",
    eyebrow: "POLÍTICA  /  TECNOLOGÍAS DE MEDICIÓN",
    intro:
      "Texto placeholder pendiente de revisión legal. Esta página reserva la estructura para explicar el uso de cookies y tecnologías similares en el sitio web.",
    title: "Cookies",
    updated: "Última actualización pendiente",
    sections: [
      {
        title: "Qué son las cookies",
        body:
          "Las cookies son archivos o tecnologías similares que permiten recordar información técnica, preferencias de navegación o datos agregados de uso del sitio.",
      },
      {
        title: "Tipos de cookies",
        body:
          "El texto definitivo detallará las cookies técnicas, analíticas, de personalización o de terceros que puedan utilizarse en la web de Atalant.",
      },
      {
        title: "Gestión del consentimiento",
        body:
          "La configuración, aceptación o rechazo de cookies se describirá cuando la solución definitiva de consentimiento esté integrada y validada.",
      },
      {
        title: "Actualizaciones",
        body:
          "La política podrá actualizarse para reflejar cambios técnicos, normativos o de proveedores vinculados al funcionamiento del sitio.",
      },
    ],
  },
  legal: {
    back: "← VOLVER",
    breadcrumb: "LEGAL  /  AVISO LEGAL",
    eyebrow: "INFORMACIÓN  /  TITULARIDAD Y USO",
    intro:
      "Texto placeholder pendiente de revisión legal. Esta página define el contenedor visual para la información corporativa y condiciones generales de uso.",
    title: "Aviso legal",
    updated: "Última actualización pendiente",
    sections: [
      {
        title: "Titularidad del sitio",
        body:
          "La información identificativa de la sociedad titular, datos registrales, domicilio y canales de contacto se incorporará en el texto legal definitivo.",
      },
      {
        title: "Condiciones de uso",
        body:
          "El acceso y navegación por este sitio implicará la aceptación de las condiciones que se publiquen, sin perjuicio de las condiciones particulares aplicables.",
      },
      {
        title: "Propiedad intelectual",
        body:
          "Los contenidos, marcas, diseños, textos, imágenes y elementos gráficos del sitio estarán protegidos conforme a la normativa aplicable.",
      },
      {
        title: "Responsabilidad",
        body:
          "Las limitaciones de responsabilidad, enlaces externos y condiciones de actualización se completarán con la revisión jurídica correspondiente.",
      },
    ],
  },
};

const LEGAL_COPY: Record<AppLocale, Record<LegalPageKind, LegalCopy>> = {
  es: LEGAL_COPY_ES,
  en: LEGAL_COPY_ES,
  pt: LEGAL_COPY_ES,
  fr: LEGAL_COPY_ES,
};

export function LegalPage({ kind, locale }: Props) {
  const copy = LEGAL_COPY[locale][kind];

  return (
    <main className="relative bg-background text-foreground">
      <div className="px-10 pt-24 sm:px-14 sm:pt-28 lg:px-20 lg:pt-32">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong sm:text-[11px]">
            {copy.breadcrumb}
          </p>
          <Link
            href={buildLocalePath(locale)}
            className="font-mono text-[10px] uppercase tracking-[2px] text-foreground transition-opacity hover:opacity-70 sm:text-[11px]"
          >
            {copy.back}
          </Link>
        </div>
        <div className="mt-5 h-px w-full bg-foreground" aria-hidden="true" />
      </div>

      <section className="px-10 pt-14 sm:px-14 sm:pt-18 lg:px-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
              {copy.eyebrow}
            </p>
            <h1 className="mt-7 text-balance font-sans text-[56px] font-light leading-[0.95] tracking-[-2px] text-foreground sm:text-[84px] lg:text-[118px] lg:tracking-[-4px]">
              {copy.title}
            </h1>
          </div>
          <div className="flex flex-col justify-end lg:pb-4">
            <p className="text-pretty font-sans text-[17px] font-light leading-[28px] tracking-[-0.15px] text-body lg:text-[20px] lg:leading-[32px]">
              {copy.intro}
            </p>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
              {copy.updated}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20 px-10 pb-24 sm:px-14 lg:mt-28 lg:px-20 lg:pb-32">
        <div className="h-px w-full bg-foreground" aria-hidden="true" />
        <div className="divide-y divide-foreground/15">
          {copy.sections.map((section, index) => (
            <article
              key={section.title}
              className="grid gap-6 py-10 sm:grid-cols-[120px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,760px)] lg:gap-12 lg:py-14"
            >
              <p className="font-sans text-[38px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[44px]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h2 className="text-balance font-sans text-[24px] font-light leading-[1.12] tracking-[-0.5px] text-foreground sm:text-[32px] lg:text-[38px]">
                  {section.title}
                </h2>
                <p className="mt-5 text-pretty font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-muted-strong sm:text-[16px] sm:leading-[26px]">
                  {section.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
