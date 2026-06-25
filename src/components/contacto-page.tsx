import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import type { ContactFormCopy, ContactFormTopicCopy, ContactoCopy } from "@/lib/content-types";
import { NosotrosGrid } from "@/components/nosotros-grid";
import { ContactoForm } from "@/components/contacto-form";

type Props = {
  copy?: ContactoCopy;
  locale: AppLocale;
};

const FORM_COPY_ES: ContactFormCopy = {
  name: "Nombre completo",
  role: "Rol o cargo",
  phone: "Teléfono",
  email: "Email",
  company: "Empresa",
  topic: "¿Cómo te podemos ayudar?",
  topicPlaceholder: "Selecciona un asunto",
  message: "Cuéntanos un poco más",
  messagePlaceholder:
    "Volúmenes, tipo de polímero, plazos, certificaciones… cuanta más información, mejor.",
  submit: "Enviar mensaje",
  sending: "Enviando…",
  successTitle: "Mensaje enviado",
  successBody:
    "Gracias. Nuestro equipo te responderá lo antes posible al email indicado.",
  errorGeneric: "No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.",
  errorValidation: "Revisa los campos marcados antes de enviar.",
  errorRate: "Has hecho demasiados envíos seguidos. Espera un minuto y vuelve a intentarlo.",
  fieldRequired: "Campo obligatorio.",
  emailInvalid: "Introduce un email válido.",
  privacyPrefix: "Al enviar este formulario aceptas nuestra",
  privacyLink: "política de privacidad",
  privacySuffix: "y el tratamiento de tus datos para responder a tu consulta.",
};

const FORM_COPY_EN: ContactFormCopy = {
  name: "Full name",
  role: "Role or position",
  phone: "Phone number",
  email: "Email",
  company: "Company name",
  topic: "How can we help?",
  topicPlaceholder: "Select a topic",
  message: "Tell us a bit more",
  messagePlaceholder:
    "Volumes, polymer types, deadlines, certifications — the more detail, the better.",
  submit: "Send message",
  sending: "Sending…",
  successTitle: "Message sent",
  successBody:
    "Thank you. Our team will get back to you as soon as possible at the email provided.",
  errorGeneric: "We couldn't send your message. Please try again in a few minutes.",
  errorValidation: "Please review the highlighted fields before submitting.",
  errorRate: "Too many submissions in a row. Please wait a minute and try again.",
  fieldRequired: "Required field.",
  emailInvalid: "Enter a valid email.",
  privacyPrefix: "By submitting this form you accept our",
  privacyLink: "privacy policy",
  privacySuffix: "and the processing of your data to respond to your enquiry.",
};

const FORM_COPY_FR: ContactFormCopy = {
  name: "Nom complet",
  role: "Poste ou fonction",
  phone: "Téléphone",
  email: "Email",
  company: "Entreprise",
  topic: "Comment pouvons-nous vous aider ?",
  topicPlaceholder: "Sélectionnez un sujet",
  message: "Dites-nous en plus",
  messagePlaceholder:
    "Volumes, types de polymères, délais, certifications… plus c'est précis, mieux c'est.",
  submit: "Envoyer le message",
  sending: "Envoi…",
  successTitle: "Message envoyé",
  successBody:
    "Merci. Notre équipe vous répondra dès que possible à l'email indiqué.",
  errorGeneric: "Nous n'avons pas pu envoyer votre message. Réessayez dans quelques minutes.",
  errorValidation: "Veuillez vérifier les champs marqués avant l'envoi.",
  errorRate: "Trop d'envois successifs. Attendez une minute puis réessayez.",
  fieldRequired: "Champ obligatoire.",
  emailInvalid: "Saisissez un email valide.",
  privacyPrefix: "En soumettant ce formulaire, vous acceptez notre",
  privacyLink: "politique de confidentialité",
  privacySuffix: "et le traitement de vos données pour répondre à votre demande.",
};

const FORM_COPY_PT: ContactFormCopy = {
  name: "Nome completo",
  role: "Função ou cargo",
  phone: "Telefone",
  email: "Email",
  company: "Empresa",
  topic: "Como podemos ajudar?",
  topicPlaceholder: "Selecione um assunto",
  message: "Conte-nos um pouco mais",
  messagePlaceholder:
    "Volumes, tipo de polímero, prazos, certificações… quanto mais detalhe, melhor.",
  submit: "Enviar mensagem",
  sending: "A enviar…",
  successTitle: "Mensagem enviada",
  successBody:
    "Obrigado. A nossa equipa responderá assim que possível para o email indicado.",
  errorGeneric: "Não foi possível enviar a sua mensagem. Tente novamente em alguns minutos.",
  errorValidation: "Reveja os campos marcados antes de enviar.",
  errorRate: "Demasiados envios seguidos. Aguarde um minuto e tente novamente.",
  fieldRequired: "Campo obrigatório.",
  emailInvalid: "Introduza um email válido.",
  privacyPrefix: "Ao enviar este formulário aceita a nossa",
  privacyLink: "política de privacidade",
  privacySuffix: "e o tratamento dos seus dados para responder à sua consulta.",
};

const CONTACT_FORM_TOPICS: Record<AppLocale, ContactFormTopicCopy[]> = {
  es: [
    { value: "sales", label: "Comercial — presupuesto o cotización" },
    { value: "products", label: "Información de productos" },
    { value: "logistics", label: "Logística y transporte" },
    { value: "financing", label: "Financiación" },
    { value: "sustainability", label: "Sostenibilidad y reciclados" },
    { value: "press", label: "Prensa y comunicación" },
    { value: "other", label: "Otra consulta" },
  ],
  en: [
    { value: "sales", label: "Sales — quote or pricing" },
    { value: "products", label: "Product information" },
    { value: "logistics", label: "Logistics and transport" },
    { value: "financing", label: "Financing" },
    { value: "sustainability", label: "Sustainability and recycled materials" },
    { value: "press", label: "Press and communication" },
    { value: "other", label: "Other enquiry" },
  ],
  fr: [
    { value: "sales", label: "Commercial — devis ou tarif" },
    { value: "products", label: "Information produits" },
    { value: "logistics", label: "Logistique et transport" },
    { value: "financing", label: "Financement" },
    { value: "sustainability", label: "Durabilité et recyclés" },
    { value: "press", label: "Presse et communication" },
    { value: "other", label: "Autre demande" },
  ],
  pt: [
    { value: "sales", label: "Comercial — orçamento ou cotação" },
    { value: "products", label: "Informação de produtos" },
    { value: "logistics", label: "Logística e transporte" },
    { value: "financing", label: "Financiamento" },
    { value: "sustainability", label: "Sustentabilidade e reciclados" },
    { value: "press", label: "Imprensa e comunicação" },
    { value: "other", label: "Outra consulta" },
  ],
};

const COPY_ES: ContactoCopy = {
  breadcrumb: "CONTACTO  /  HABLEMOS",
  back: "← VOLVER",
  monogram: "CT",
  heroTitle: "Socio estratégico",
  heroBody:
    "Cuéntanos qué necesitas: volúmenes, grados, plazos o ese reto logístico que no te deja dormir. Te respondemos rápido y con el equipo adecuado.",
  metaLabels: {
    respuesta: "RESPUESTA",
    horario: "HORARIO",
    sede: "SEDE",
  },
  metaValues: {
    respuesta: "< 24 h laborables",
    horario: "Lun–Vie · 9–18h CET",
    sede: "Alicante (España)",
  },
  formEyebrow: "FORMULARIO  /  PRIMER CONTACTO",
  formTitle: "Dinos cómo\nte podemos ayudar.",
  formBody:
    "Selecciona el asunto que mejor encaje y te pondremos en contacto con la persona del equipo que mejor pueda responderte.",
  ctaTitle: "¿Prefieres llamar\no escribirnos directamente?",
  ctaSubject: "Contacto Atalant",
  ctaAction: "logistics@atalant.com  →",
  ctaFootnote: "© MMXXVI ATALANT  /  CT",
  phone: "+34 965 66 18 28",
  form: FORM_COPY_ES,
  topics: CONTACT_FORM_TOPICS.es,
};

const COPY_EN: ContactoCopy = {
  breadcrumb: "CONTACT  /  LET'S TALK",
  back: "← BACK",
  monogram: "CT",
  heroTitle: "Strategic partner,\nnot just a supplier.",
  heroBody:
    "Tell us what you need: volumes, polymer types, lead times, or that logistics headache that's keeping you awake. We respond fast and with the right people.",
  metaLabels: {
    respuesta: "RESPONSE",
    horario: "HOURS",
    sede: "HQ",
  },
  metaValues: {
    respuesta: "< 24 working hours",
    horario: "Mon–Fri · 9am–6pm CET",
    sede: "Alicante (Spain)",
  },
  formEyebrow: "FORM  /  FIRST CONTACT",
  formTitle: "Tell us how\nwe can help.",
  formBody:
    "Pick the topic that fits your enquiry and we'll route you to the right person on our team.",
  ctaTitle: "Prefer to call\nor email us directly?",
  ctaSubject: "Contact Atalant",
  ctaAction: "logistics@atalant.com  →",
  ctaFootnote: "© MMXXVI ATALANT  /  CT",
  phone: "+34 965 66 18 28",
  form: FORM_COPY_EN,
  topics: CONTACT_FORM_TOPICS.en,
};

const COPY_FR: ContactoCopy = {
  breadcrumb: "CONTACT  /  PARLONS",
  back: "← RETOUR",
  monogram: "CT",
  heroTitle: "Partenaire stratégique,\npas seulement fournisseur.",
  heroBody:
    "Dites-nous ce dont vous avez besoin : volumes, types de polymères, délais ou ce défi logistique qui vous préoccupe. Nous répondons vite, avec la bonne équipe.",
  metaLabels: {
    respuesta: "RÉPONSE",
    horario: "HORAIRES",
    sede: "SIÈGE",
  },
  metaValues: {
    respuesta: "< 24 h ouvrables",
    horario: "Lun–Ven · 9h–18h CET",
    sede: "Alicante (Espagne)",
  },
  formEyebrow: "FORMULAIRE  /  PREMIER CONTACT",
  formTitle: "Dites-nous comment\nnous pouvons vous aider.",
  formBody:
    "Sélectionnez le sujet le plus adapté et nous vous mettrons en contact avec la personne de l'équipe la mieux placée pour vous répondre.",
  ctaTitle: "Vous préférez appeler\nou nous écrire directement ?",
  ctaSubject: "Contact Atalant",
  ctaAction: "logistics@atalant.com  →",
  ctaFootnote: "© MMXXVI ATALANT  /  CT",
  phone: "+34 965 66 18 28",
  form: FORM_COPY_FR,
  topics: CONTACT_FORM_TOPICS.fr,
};

const COPY_PT: ContactoCopy = {
  breadcrumb: "CONTACTO  /  FALEMOS",
  back: "← VOLTAR",
  monogram: "CT",
  heroTitle: "Parceiro estratégico,\nnão apenas fornecedor.",
  heroBody:
    "Diga-nos o que precisa: volumes, graus, prazos ou esse desafio logístico que não o deixa dormir. Respondemos rápido e com a equipa adequada.",
  metaLabels: {
    respuesta: "RESPOSTA",
    horario: "HORÁRIO",
    sede: "SEDE",
  },
  metaValues: {
    respuesta: "< 24 h úteis",
    horario: "Seg–Sex · 9h–18h CET",
    sede: "Alicante (Espanha)",
  },
  formEyebrow: "FORMULÁRIO  /  PRIMEIRO CONTACTO",
  formTitle: "Diga-nos como\npodemos ajudar.",
  formBody:
    "Selecione o assunto que melhor se ajusta e colocá-lo-emos em contacto com a pessoa da equipa que melhor pode responder.",
  ctaTitle: "Prefere ligar\nou escrever-nos diretamente?",
  ctaSubject: "Contacte a Atalant",
  ctaAction: "logistics@atalant.com  →",
  ctaFootnote: "© MMXXVI ATALANT  /  CT",
  phone: "+34 965 66 18 28",
  form: FORM_COPY_PT,
  topics: CONTACT_FORM_TOPICS.pt,
};

export const CONTACTO_COPY: Record<AppLocale, ContactoCopy> = {
  es: COPY_ES,
  en: COPY_EN,
  pt: COPY_PT,
  fr: COPY_FR,
};

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function ContactoPage({ copy: providedCopy, locale }: Props) {
  const copy = providedCopy ?? CONTACTO_COPY[locale];
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

      {/* ======= Hero + formulario (mismo bloque, mismo fondo de grid) =======
          La retícula full-bleed cubre hero, meta-row y la sección del
          formulario hasta el CTA final. Es el mismo recurso visual que
          aparece en Nosotros bajo "Socio estratégico, no solo proveedor.". */}
      <section
        aria-labelledby="ct-hero-title"
        className="relative overflow-x-clip px-10 pt-12 pb-24 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20 lg:pb-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2"
        >
          <NosotrosGrid />
        </div>

        {/* Hero estilo tabla periódica: monograma | titular | bajada */}
        <div className="relative z-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,420px)] 2xl:gap-x-24">
          <p
            aria-hidden="true"
            className="font-sans font-light leading-[0.85] tracking-[-6px] text-primary text-[120px] sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            {copy.monogram}
          </p>

          <h1
            id="ct-hero-title"
            className="font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>

          <p className="font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[560px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        {/* Meta row */}
        <div className="relative z-10 mt-10 grid grid-cols-2 gap-y-8 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-3 lg:gap-x-10">
          {(
            [
              ["respuesta"],
              ["horario"],
              ["sede"],
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

        {/* ======= Sección del formulario (compartiendo grid de fondo) ======= */}
        <div className="relative z-10 mt-24 grid grid-cols-1 gap-x-16 gap-y-12 lg:mt-32 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
              {copy.formEyebrow}
            </p>
            <h2 className="mt-6 font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[40px] lg:text-[48px] lg:tracking-[-1.6px]">
              {renderMultiline(copy.formTitle)}
            </h2>
            <p className="mt-6 max-w-[420px] font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-muted-strong lg:text-[16px] lg:leading-[26px]">
              {copy.formBody}
            </p>
          </div>

          <div>
            <ContactoForm copy={copy.form} locale={locale} topics={copy.topics} />
          </div>
        </div>
      </section>

      {/* ======= CTA dark — mismo patrón que el resto de páginas ======= */}
      <section
        aria-labelledby="ct-cta-title"
        className="bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/20" aria-hidden="true" />
        <h2
          id="ct-cta-title"
          className="mt-10 max-w-[1700px] font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white/95 sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {renderMultiline(copy.ctaTitle)}
        </h2>
        <Link
          href={`mailto:logistics@atalant.com?subject=${encodeURIComponent(copy.ctaSubject)}`}
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
