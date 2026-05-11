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
  navigation: NavItem[];
  footerLinks: NavItem[];
};

export type HomeHero = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
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
};

export type ProductPreviewBlock = {
  anchorId: string;
  type: "productPreview";
  eyebrow: string;
  title: string;
  body: string;
  ctaLabel: string;
};

export type ContactBlock = {
  anchorId: string;
  type: "contact";
  eyebrow: string;
  title: string;
  body: string;
  note: string;
  submitLabel: string;
};

export type HomeBlock = StatsBlock | SectionBlock | ProductPreviewBlock | ContactBlock;

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
