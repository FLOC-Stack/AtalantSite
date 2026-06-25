import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import type { SeoData } from "@/lib/content-types";
import { isLocale, locales, type AppLocale } from "@/lib/locales";
import { getLegalPageCopy, getPageSeo } from "@/lib/payload-data";
import { buildLegalNoticePath } from "@/lib/routes";

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
    description: "Atalant legal notice. Placeholder text pending legal review.",
    title: "Legal notice — Atalant",
  },
  es: {
    description: "Aviso legal de Atalant. Texto placeholder pendiente de revisión legal.",
    title: "Aviso legal — Atalant",
  },
  fr: {
    description: "Mentions légales d'Atalant. Texte placeholder en attente de révision juridique.",
    title: "Mentions légales — Atalant",
  },
  pt: {
    description: "Aviso legal da Atalant. Texto placeholder pendente de revisão jurídica.",
    title: "Aviso legal — Atalant",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const typedLocale = locale as AppLocale;
  const seo = await getPageSeo("aviso-legal", typedLocale, seoByLocale[typedLocale]);

  return {
    alternates: {
      canonical: buildLegalNoticePath(typedLocale),
    },
    description: seo.description,
    title: seo.title,
  };
}

export default async function LegalNoticeRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getLegalPageCopy("legal", typedLocale);

  return <LegalPage copy={copy} kind="legal" locale={typedLocale} />;
}
