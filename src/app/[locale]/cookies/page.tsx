import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildCookiesPath } from "@/lib/routes";

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
      canonical: buildCookiesPath(locale),
    },
    description: "Política de cookies de Atalant. Texto placeholder pendiente de revisión legal.",
    title: "Cookies — Atalant",
  };
}

export default async function CookiesRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalPage kind="cookies" locale={locale as AppLocale} />;
}
