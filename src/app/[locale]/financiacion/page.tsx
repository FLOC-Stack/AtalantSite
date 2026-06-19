import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FinanciacionPage } from "@/components/financiacion-page";
import { isLocale, type AppLocale } from "@/lib/locales";
import { getStaticPageCopy } from "@/lib/payload-data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Financiación · Crédito interno — Atalant",
    description:
      "Sistema de crédito interno de Atalant para reforzar y hacer crecer tu negocio, con clientes asegurados mundialmente.",
  };
}

export default async function FinanciacionRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getStaticPageCopy("financiacion", typedLocale);
  return <FinanciacionPage locale={typedLocale} copy={copy} />;
}
