import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FinanciacionPage } from "@/components/financiacion-page";
import { isLocale, type AppLocale } from "@/lib/locales";

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
      "Sistema de crédito interno de Atalant: financiación caso a caso para acompañar la producción de cada cliente y crecer de forma equilibrada.",
  };
}

export default async function FinanciacionRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <FinanciacionPage locale={locale as AppLocale} />;
}
