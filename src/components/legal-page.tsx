import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import type { LegalCopy, LegalPageKind } from "@/lib/content-types";
import { buildLocalePath } from "@/lib/routes";

type Props = {
  copy?: LegalCopy;
  kind: LegalPageKind;
  locale: AppLocale;
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

const LEGAL_COPY_EN: Record<LegalPageKind, LegalCopy> = {
  privacy: {
    back: "← BACK",
    breadcrumb: "LEGAL  /  PRIVACY",
    eyebrow: "POLICY  /  PERSONAL DATA",
    intro:
      "Placeholder text pending legal review. This page defines the visual and structural base for Atalant's future privacy policy.",
    title: "Privacy",
    updated: "Last update pending",
    sections: [
      {
        title: "Data controller",
        body:
          "Atalant will be responsible for processing personal data submitted through its digital channels. Final legal information will be incorporated in a later phase.",
      },
      {
        title: "Purpose",
        body:
          "Data may be used to handle commercial enquiries, manage communications, and maintain professional relationships with customers, suppliers, or candidates.",
      },
      {
        title: "Legal basis and retention",
        body:
          "The legal basis, retention periods, and applicable rights will be completed with text validated by the corresponding legal team.",
      },
      {
        title: "Rights",
        body:
          "Data subjects may exercise access, rectification, erasure, objection, restriction, and portability rights in accordance with applicable regulations.",
      },
    ],
  },
  cookies: {
    back: "← BACK",
    breadcrumb: "LEGAL  /  COOKIES",
    eyebrow: "POLICY  /  MEASUREMENT TECHNOLOGIES",
    intro:
      "Placeholder text pending legal review. This page reserves the structure for explaining the use of cookies and similar technologies on the website.",
    title: "Cookies",
    updated: "Last update pending",
    sections: [
      {
        title: "What cookies are",
        body:
          "Cookies are files or similar technologies that make it possible to remember technical information, browsing preferences, or aggregated website usage data.",
      },
      {
        title: "Types of cookies",
        body:
          "The final text will detail the technical, analytics, personalization, or third-party cookies that may be used on Atalant's website.",
      },
      {
        title: "Consent management",
        body:
          "Cookie configuration, acceptance, or rejection will be described once the final consent solution is integrated and validated.",
      },
      {
        title: "Updates",
        body:
          "This policy may be updated to reflect technical, regulatory, or provider changes linked to the operation of the website.",
      },
    ],
  },
  legal: {
    back: "← BACK",
    breadcrumb: "LEGAL  /  LEGAL NOTICE",
    eyebrow: "INFORMATION  /  OWNERSHIP AND USE",
    intro:
      "Placeholder text pending legal review. This page defines the visual container for corporate information and general terms of use.",
    title: "Legal notice",
    updated: "Last update pending",
    sections: [
      {
        title: "Website ownership",
        body:
          "The identifying information of the owner company, registration details, address, and contact channels will be incorporated into the final legal text.",
      },
      {
        title: "Terms of use",
        body:
          "Accessing and browsing this website will imply acceptance of the published terms, without prejudice to any applicable specific conditions.",
      },
      {
        title: "Intellectual property",
        body:
          "The website's content, trademarks, designs, text, images, and graphic elements will be protected in accordance with applicable regulations.",
      },
      {
        title: "Liability",
        body:
          "Limitations of liability, external links, and update conditions will be completed with the corresponding legal review.",
      },
    ],
  },
};

const LEGAL_COPY_FR: Record<LegalPageKind, LegalCopy> = {
  privacy: {
    back: "← RETOUR",
    breadcrumb: "LEGAL  /  CONFIDENTIALITÉ",
    eyebrow: "POLITIQUE  /  DONNÉES PERSONNELLES",
    intro:
      "Texte placeholder en attente de révision juridique. Cette page établit la base visuelle et structurelle de la future politique de confidentialité d'Atalant.",
    title: "Confidentialité",
    updated: "Dernière mise à jour en attente",
    sections: [
      {
        title: "Responsable du traitement",
        body:
          "Atalant sera responsable du traitement des données personnelles fournies via ses canaux numériques. Les informations juridiques définitives seront intégrées ultérieurement.",
      },
      {
        title: "Finalité",
        body:
          "Les données pourront être utilisées pour traiter des demandes commerciales, gérer les communications et maintenir la relation professionnelle avec clients, fournisseurs ou candidats.",
      },
      {
        title: "Base juridique et conservation",
        body:
          "La base juridique, les durées de conservation et les droits applicables seront complétés avec le texte validé par l'équipe juridique compétente.",
      },
      {
        title: "Droits",
        body:
          "Les personnes concernées pourront exercer leurs droits d'accès, rectification, suppression, opposition, limitation et portabilité selon la réglementation applicable.",
      },
    ],
  },
  cookies: {
    back: "← RETOUR",
    breadcrumb: "LEGAL  /  COOKIES",
    eyebrow: "POLITIQUE  /  TECHNOLOGIES DE MESURE",
    intro:
      "Texte placeholder en attente de révision juridique. Cette page réserve la structure destinée à expliquer l'utilisation des cookies et technologies similaires.",
    title: "Cookies",
    updated: "Dernière mise à jour en attente",
    sections: [
      {
        title: "Que sont les cookies",
        body:
          "Les cookies sont des fichiers ou technologies similaires permettant de mémoriser des informations techniques, des préférences de navigation ou des données agrégées d'utilisation.",
      },
      {
        title: "Types de cookies",
        body:
          "Le texte définitif détaillera les cookies techniques, analytiques, de personnalisation ou de tiers qui pourraient être utilisés sur le site d'Atalant.",
      },
      {
        title: "Gestion du consentement",
        body:
          "La configuration, l'acceptation ou le refus des cookies seront décrits lorsque la solution définitive de consentement sera intégrée et validée.",
      },
      {
        title: "Mises à jour",
        body:
          "Cette politique pourra être mise à jour afin de refléter les changements techniques, réglementaires ou de fournisseurs liés au fonctionnement du site.",
      },
    ],
  },
  legal: {
    back: "← RETOUR",
    breadcrumb: "LEGAL  /  MENTIONS LÉGALES",
    eyebrow: "INFORMATION  /  TITULARITÉ ET UTILISATION",
    intro:
      "Texte placeholder en attente de révision juridique. Cette page définit le conteneur visuel des informations d'entreprise et des conditions générales d'utilisation.",
    title: "Mentions légales",
    updated: "Dernière mise à jour en attente",
    sections: [
      {
        title: "Titularité du site",
        body:
          "Les informations d'identification de la société titulaire, les données d'enregistrement, l'adresse et les canaux de contact seront intégrés au texte juridique définitif.",
      },
      {
        title: "Conditions d'utilisation",
        body:
          "L'accès et la navigation sur ce site impliqueront l'acceptation des conditions publiées, sans préjudice des conditions particulières applicables.",
      },
      {
        title: "Propriété intellectuelle",
        body:
          "Les contenus, marques, designs, textes, images et éléments graphiques du site seront protégés conformément à la réglementation applicable.",
      },
      {
        title: "Responsabilité",
        body:
          "Les limitations de responsabilité, liens externes et conditions de mise à jour seront complétés avec la révision juridique correspondante.",
      },
    ],
  },
};

const LEGAL_COPY_PT: Record<LegalPageKind, LegalCopy> = {
  privacy: {
    back: "← VOLTAR",
    breadcrumb: "LEGAL  /  PRIVACIDADE",
    eyebrow: "POLÍTICA  /  DADOS PESSOAIS",
    intro:
      "Texto placeholder pendente de revisão jurídica. Esta página estabelece a base visual e estrutural da futura política de privacidade da Atalant.",
    title: "Privacidade",
    updated: "Última atualização pendente",
    sections: [
      {
        title: "Responsável pelo tratamento",
        body:
          "A Atalant será responsável pelo tratamento dos dados pessoais fornecidos através dos seus canais digitais. A informação legal definitiva será incorporada numa fase posterior.",
      },
      {
        title: "Finalidade",
        body:
          "Os dados poderão ser utilizados para responder a pedidos comerciais, gerir comunicações e manter a relação profissional com clientes, fornecedores ou candidatos.",
      },
      {
        title: "Base jurídica e conservação",
        body:
          "A base jurídica, os prazos de conservação e os direitos aplicáveis serão completados com o texto validado pela equipa jurídica correspondente.",
      },
      {
        title: "Direitos",
        body:
          "As pessoas interessadas poderão exercer os direitos de acesso, retificação, apagamento, oposição, limitação e portabilidade nos termos da regulamentação aplicável.",
      },
    ],
  },
  cookies: {
    back: "← VOLTAR",
    breadcrumb: "LEGAL  /  COOKIES",
    eyebrow: "POLÍTICA  /  TECNOLOGIAS DE MEDIÇÃO",
    intro:
      "Texto placeholder pendente de revisão jurídica. Esta página reserva a estrutura para explicar a utilização de cookies e tecnologias semelhantes no site.",
    title: "Cookies",
    updated: "Última atualização pendente",
    sections: [
      {
        title: "O que são cookies",
        body:
          "Cookies são ficheiros ou tecnologias semelhantes que permitem recordar informação técnica, preferências de navegação ou dados agregados de utilização do site.",
      },
      {
        title: "Tipos de cookies",
        body:
          "O texto definitivo detalhará os cookies técnicos, analíticos, de personalização ou de terceiros que possam ser utilizados no site da Atalant.",
      },
      {
        title: "Gestão do consentimento",
        body:
          "A configuração, aceitação ou rejeição de cookies será descrita quando a solução definitiva de consentimento estiver integrada e validada.",
      },
      {
        title: "Atualizações",
        body:
          "Esta política poderá ser atualizada para refletir alterações técnicas, regulamentares ou de fornecedores ligadas ao funcionamento do site.",
      },
    ],
  },
  legal: {
    back: "← VOLTAR",
    breadcrumb: "LEGAL  /  AVISO LEGAL",
    eyebrow: "INFORMAÇÃO  /  TITULARIDADE E USO",
    intro:
      "Texto placeholder pendente de revisão jurídica. Esta página define o contentor visual para a informação corporativa e condições gerais de utilização.",
    title: "Aviso legal",
    updated: "Última atualização pendente",
    sections: [
      {
        title: "Titularidade do site",
        body:
          "A informação identificativa da sociedade titular, dados registrais, morada e canais de contacto serão incorporados no texto legal definitivo.",
      },
      {
        title: "Condições de utilização",
        body:
          "O acesso e navegação neste site implicará a aceitação das condições publicadas, sem prejuízo das condições particulares aplicáveis.",
      },
      {
        title: "Propriedade intelectual",
        body:
          "Os conteúdos, marcas, designs, textos, imagens e elementos gráficos do site estarão protegidos nos termos da regulamentação aplicável.",
      },
      {
        title: "Responsabilidade",
        body:
          "As limitações de responsabilidade, ligações externas e condições de atualização serão completadas com a revisão jurídica correspondente.",
      },
    ],
  },
};

export const LEGAL_COPY: Record<AppLocale, Record<LegalPageKind, LegalCopy>> = {
  es: LEGAL_COPY_ES,
  en: LEGAL_COPY_EN,
  pt: LEGAL_COPY_PT,
  fr: LEGAL_COPY_FR,
};

export function LegalPage({ copy: providedCopy, kind, locale }: Props) {
  const copy = providedCopy ?? LEGAL_COPY[locale][kind];

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
