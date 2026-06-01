import type { AppLocale } from "@/lib/locales";

// Asuntos del formulario de contacto. La etiqueta se traduce por
// locale; el `value` es el identificador estable que viaja al servidor
// y que decide a qué buzón se enruta el aviso.
export type ContactTopic =
  | "sales"
  | "products"
  | "logistics"
  | "financing"
  | "sustainability"
  | "press"
  | "other";

export type ContactTopicOption = {
  value: ContactTopic;
  label: Record<AppLocale, string>;
};

export const CONTACT_TOPICS: ContactTopicOption[] = [
  {
    value: "sales",
    label: {
      es: "Comercial — presupuesto o cotización",
      en: "Sales — quote or pricing",
      fr: "Commercial — devis ou tarif",
      pt: "Comercial — orçamento ou cotação",
    },
  },
  {
    value: "products",
    label: {
      es: "Información de productos",
      en: "Product information",
      fr: "Information produits",
      pt: "Informação de produtos",
    },
  },
  {
    value: "logistics",
    label: {
      es: "Logística y transporte",
      en: "Logistics and transport",
      fr: "Logistique et transport",
      pt: "Logística e transporte",
    },
  },
  {
    value: "financing",
    label: {
      es: "Financiación",
      en: "Financing",
      fr: "Financement",
      pt: "Financiamento",
    },
  },
  {
    value: "sustainability",
    label: {
      es: "Sostenibilidad y reciclados",
      en: "Sustainability and recycled materials",
      fr: "Durabilité et recyclés",
      pt: "Sustentabilidade e reciclados",
    },
  },
  {
    value: "press",
    label: {
      es: "Prensa y comunicación",
      en: "Press and communication",
      fr: "Presse et communication",
      pt: "Imprensa e comunicação",
    },
  },
  {
    value: "other",
    label: {
      es: "Otra consulta",
      en: "Other enquiry",
      fr: "Autre demande",
      pt: "Outra consulta",
    },
  },
];

export function isContactTopic(value: string): value is ContactTopic {
  return CONTACT_TOPICS.some((t) => t.value === value);
}

// === Ruteo de email por asunto ===
// Por ahora todos los asuntos viajan a hi@wearefloc.com. Cuando se
// configuren los buzones definitivos, basta con cambiar el valor del
// `process.env.CONTACT_EMAIL_<TOPIC>` correspondiente sin tocar código.
const FALLBACK_RECIPIENT = "hi@wearefloc.com";

const RECIPIENT_ENV: Record<ContactTopic, string> = {
  sales: "CONTACT_EMAIL_SALES",
  products: "CONTACT_EMAIL_PRODUCTS",
  logistics: "CONTACT_EMAIL_LOGISTICS",
  financing: "CONTACT_EMAIL_FINANCING",
  sustainability: "CONTACT_EMAIL_SUSTAINABILITY",
  press: "CONTACT_EMAIL_PRESS",
  other: "CONTACT_EMAIL_OTHER",
};

export function recipientForTopic(topic: ContactTopic): string {
  const fromEnv = process.env[RECIPIENT_ENV[topic]];
  if (fromEnv && fromEnv.includes("@")) return fromEnv;
  return process.env.CONTACT_EMAIL_DEFAULT_TO || FALLBACK_RECIPIENT;
}

// Copia maestra (BCC) que recibe SIEMPRE todos los envíos del formulario,
// sin importar a qué buzón se haya enrutado el `to`. Permite que la cuenta
// central (hi@wearefloc.com) tenga el archivo histórico completo.
export function masterBccAddress(): string {
  return process.env.CONTACT_EMAIL_BCC || FALLBACK_RECIPIENT;
}
