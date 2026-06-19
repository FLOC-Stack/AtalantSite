import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SustainabilityPage } from "@/components/sustainability-page";
import { isLocale, type AppLocale } from "@/lib/locales";
import { getStaticPageCopy } from "@/lib/payload-data";
import { buildSustainabilityPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const metadataByLocale: Record<AppLocale, Omit<Metadata, "alternates">> = {
  en: {
    description:
      "Industrial sustainability at Atalant: ISO 14001, own energy generation through solar modules, electric silo trucks, and recycled materials.",
    title: "Industrial sustainability — Atalant",
  },
  es: {
    description:
      "Sostenibilidad industrial en Atalant: ISO 14001, generación de energía propia mediante módulos solares, silo trucks eléctricos y materiales reciclados.",
    title: "Sostenibilidad industrial — Atalant",
  },
  fr: {
    description:
      "Durabilité industrielle chez Atalant : ISO 14001, production d'énergie propre par modules solaires, silo trucks électriques et matériaux recyclés.",
    title: "Durabilité industrielle — Atalant",
  },
  pt: {
    description:
      "Sustentabilidade industrial na Atalant: ISO 14001, geração de energia própria através de módulos solares, silo trucks elétricos e materiais reciclados.",
    title: "Sustentabilidade industrial — Atalant",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedMetadata = metadataByLocale[locale];

  return {
    alternates: {
      canonical: buildSustainabilityPath(locale),
    },
    ...localizedMetadata,
  };
}

export default async function SustainabilityRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getStaticPageCopy("sostenibilidad", typedLocale);
  return <SustainabilityPage locale={typedLocale} copy={copy} />;
}
