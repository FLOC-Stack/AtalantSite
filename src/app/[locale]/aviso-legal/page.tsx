import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildLegalNoticePath } from "@/lib/routes";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    alternates: {
      canonical: buildLegalNoticePath(locale),
    },
    description: "Aviso legal de Atalant. Texto placeholder pendiente de revisión legal.",
    title: "Aviso legal — Atalant",
  };
}

export default async function LegalNoticeRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage kind="legal" locale={locale as AppLocale} />;
}
