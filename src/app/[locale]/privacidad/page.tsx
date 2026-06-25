import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import type { SeoData } from "@/lib/content-types";
import { isLocale, locales, type AppLocale } from "@/lib/locales";
import { getLegalPageCopy, getPageSeo } from "@/lib/payload-data";
import { buildPrivacyPath } from "@/lib/routes";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const seoByLocale: Record<AppLocale, SeoData> = {
  en: {
    description: "Atalant privacy policy. Placeholder text pending legal review.",
    title: "Privacy — Atalant",
  },
  es: {
    description: "Política de privacidad de Atalant. Texto placeholder pendiente de revisión legal.",
    title: "Privacidad — Atalant",
  },
  fr: {
    description: "Politique de confidentialité d'Atalant. Texte placeholder en attente de révision juridique.",
    title: "Confidentialité — Atalant",
  },
  pt: {
    description: "Política de privacidade da Atalant. Texto placeholder pendente de revisão jurídica.",
    title: "Privacidade — Atalant",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const typedLocale = locale as AppLocale;
  const seo = await getPageSeo("privacidad", typedLocale, seoByLocale[typedLocale]);

  return {
    alternates: {
      canonical: buildPrivacyPath(typedLocale),
    },
    description: seo.description,
    title: seo.title,
  };
}

export default async function PrivacyRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getLegalPageCopy("privacy", typedLocale);

  return <LegalPage copy={copy} kind="privacy" locale={typedLocale} />;
}
