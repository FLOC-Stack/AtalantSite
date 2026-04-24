import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LogisticaPage } from "@/components/logistica-page";
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
    title: "Logística · Depósito Aduanero — Atalant",
    description:
      "Almacenes con estatus oficial de Depósito Aduanero en Valencia y Alicante, hubs de distribución en Italia y Países Bajos, exportación a Norte de África.",
  };
}

export default async function LogisticaRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LogisticaPage locale={locale as AppLocale} />;
}
