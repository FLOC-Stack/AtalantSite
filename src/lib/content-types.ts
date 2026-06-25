import type { AppLocale } from "@/lib/locales";

export type RichContent = string;

export type SeoData = {
  title: string;
  description: string;
};

export type NavItem = {
  label: string;
  kind: "section" | "products" | "logistics" | "external";
  sectionId?: string;
  href?: string;
};

export type SiteSettingsData = {
  locale: AppLocale;
  brandName: string;
  tagline: string;
  contactEmail: string;
  phone: string;
  address: string;
  footerText: string;
  defaultSeo: SeoData;
  headerCtaLabel?: string;
  headerCtaHref?: string;
  navigation: NavItem[];
  footerLinks: NavItem[];
  socialLinks?: Array<{
    label: string;
    href: string;
  }>;
};

export type HomeHero = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel: string;
  secondaryHref?: string;
};

export type StatsBlock = {
  anchorId: string;
  type: "stats";
  eyebrow: string;
  title: string;
  body: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
};

export type SectionBlock = {
  anchorId: string;
  type: "section";
  eyebrow: string;
  title: string;
  body: RichContent;
  ctaLabel?: string;
  ctaHref?: string;
};

export type ProductPreviewBlock = {
  anchorId: string;
  type: "productPreview";
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  videoSrc?: string;
  videoPoster?: string;
};

export type NewsBlock = {
  anchorId: string;
  type: "news";
  eyebrow: string;
  title: string;
  body: string;
  sectionLabel?: string;
  ctaLabel: string;
  items: Array<{
    date: string;
    title: string;
    excerpt: string;
    href: string;
    image?: string;
    imageAlt?: string;
  }>;
};

export type ContactBlock = {
  anchorId: string;
  type: "contact";
  eyebrow: string;
  title: string;
  body: string;
  note: string;
  submitLabel: string;
  ctaHref?: string;
};

export type HomeBlock =
  | StatsBlock
  | SectionBlock
  | ProductPreviewBlock
  | NewsBlock
  | ContactBlock;

export type HomePageData = {
  locale: AppLocale;
  seo: SeoData;
  hero: HomeHero;
  blocks: HomeBlock[];
};

export type ProductFamilyMedia = {
  url: string;
  kind: "image" | "video";
  alt?: string;
};

export type ProductFamilyDetailGrade = {
  code: string;
  denomination: string;
  spec: string;
  application: string;
  process: string;
};

export type ProductFamilyDetailData = {
  applications: string[];
  footerQuestion: string;
  grades: ProductFamilyDetailGrade[];
  highlight?: {
    eyebrow: string;
    title: string;
    body: string;
    stats: Array<{
      value: string;
      label: string;
    }>;
  };
  heroLines: string[];
  intro: string;
  meta: Array<{
    label: string;
    value: string;
  }>;
  tableTitle: string;
};

export type ProductFamilyData = {
  locale: AppLocale;
  code: string;
  slug: string;
  title: string;
  excerpt: string;
  body: RichContent;
  variants: string[];
  applications: string[];
  recycled: boolean;
  featured: boolean;
  heroMedia?: ProductFamilyMedia;
  detail?: ProductFamilyDetailData;
  seo: SeoData;
};

export type ContactoCopy = {
  breadcrumb: string;
  back: string;
  monogram: string;
  heroTitle: string;
  heroBody: string;
  metaLabels: { respuesta: string; horario: string; sede: string };
  metaValues: { respuesta: string; horario: string; sede: string };
  formEyebrow: string;
  formTitle: string;
  formBody: string;
  ctaTitle: string;
  ctaSubject: string;
  ctaAction: string;
  ctaFootnote: string;
  phone: string;
  form: ContactFormCopy;
  topics: ContactFormTopicCopy[];
};

export type ContactFormCopy = {
  name: string;
  role: string;
  phone: string;
  email: string;
  company: string;
  topic: string;
  topicPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  errorGeneric: string;
  errorValidation: string;
  errorRate: string;
  fieldRequired: string;
  emailInvalid: string;
  privacyPrefix: string;
  privacyLink: string;
  privacySuffix: string;
};

export type ContactFormTopicCopy = {
  value: string;
  label: string;
};

export type LegalPageKind = "privacy" | "cookies" | "legal";

export type LegalCopy = {
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
