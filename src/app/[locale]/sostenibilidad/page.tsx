import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SustainabilityPage } from "@/components/sustainability-page";
import { isLocale, type AppLocale } from "@/lib/locales";
import { buildSustainabilityPath } from "@/lib/routes";

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
    alternates: {
      canonical: buildSustainabilityPath(locale),
    },
    description:
      "Sostenibilidad industrial en Atalant: ISO 14001, gestión de residuos, materiales reciclados, energía solar, flota eficiente e I+D en hidrógeno verde.",
    title: "Sostenibilidad industrial — Atalant",
  };
}

export default async function SustainabilityRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <SustainabilityPage locale={locale as AppLocale} />;
}
