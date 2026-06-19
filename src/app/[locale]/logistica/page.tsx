import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LogisticaPage } from "@/components/logistica-page";
import { isLocale, type AppLocale } from "@/lib/locales";
import { getStaticPageCopy } from "@/lib/payload-data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const metadataByLocale: Record<AppLocale, Metadata> = {
  en: {
    title: "Integrated logistics — Atalant",
    description:
      "Atalant integrated logistics with its own fleet, full traceability, logistics centers, and main European hubs.",
  },
  es: {
    title: "Logística integrada — Atalant",
    description:
      "Logística integrada de Atalant con flota propia, trazabilidad completa, centros logísticos y principales hubs europeos.",
  },
  fr: {
    title: "Logistique intégrée — Atalant",
    description:
      "Logistique intégrée d'Atalant avec flotte propre, traçabilité complète, centres logistiques et hubs européens principaux.",
  },
  pt: {
    title: "Logística integrada — Atalant",
    description:
      "Logística integrada da Atalant com frota própria, rastreabilidade completa, centros logísticos e principais hubs europeus.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return metadataByLocale[locale];
}

export default async function LogisticaRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getStaticPageCopy("logistica", typedLocale);
  return <LogisticaPage locale={typedLocale} copy={copy} />;
}
