import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import type { SeoData } from "@/lib/content-types";
import { isLocale, locales, type AppLocale } from "@/lib/locales";
import { getLegalPageCopy, getPageSeo } from "@/lib/payload-data";
import { buildCookiesPath } from "@/lib/routes";

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
    description: "Atalant cookie policy. Placeholder text pending legal review.",
    title: "Cookies — Atalant",
  },
  es: {
    description: "Política de cookies de Atalant. Texto placeholder pendiente de revisión legal.",
    title: "Cookies — Atalant",
  },
  fr: {
    description: "Politique de cookies d'Atalant. Texte placeholder en attente de révision juridique.",
    title: "Cookies — Atalant",
  },
  pt: {
    description: "Política de cookies da Atalant. Texto placeholder pendente de revisão jurídica.",
    title: "Cookies — Atalant",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const typedLocale = locale as AppLocale;
  const seo = await getPageSeo("cookies", typedLocale, seoByLocale[typedLocale]);

  return {
    alternates: {
      canonical: buildCookiesPath(typedLocale),
    },
    description: seo.description,
    title: seo.title,
  };
}

export default async function CookiesRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getLegalPageCopy("cookies", typedLocale);

  return <LegalPage copy={copy} kind="cookies" locale={typedLocale} />;
}
