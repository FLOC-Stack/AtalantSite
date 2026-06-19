import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NosotrosPage } from "@/components/nosotros-page";
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
    title: "About · Strategic partner — Atalant",
    description:
      "Thirty years connecting polymers and people. Atalant provides top-quality plastic raw materials with its own logistics network in Iberia and Europe.",
  },
  es: {
    title: "Nosotros · Socio estratégico — Atalant",
    description:
      "Treinta años conectando polímeros y personas. Atalant ofrece materias primas plásticas de máxima calidad con red logística propia en Iberia y Europa.",
  },
  fr: {
    title: "À propos · Partenaire stratégique — Atalant",
    description:
      "Trente ans à relier polymères et personnes. Atalant fournit des matières premières plastiques de qualité maximale avec son propre réseau logistique en Ibérie et en Europe.",
  },
  pt: {
    title: "Sobre nós · Parceiro estratégico — Atalant",
    description:
      "Trinta anos a unir polímeros e pessoas. A Atalant oferece matérias-primas plásticas de máxima qualidade com rede logística própria na Ibéria e na Europa.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return metadataByLocale[locale];
}

export default async function NosotrosRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getStaticPageCopy("nosotros", typedLocale);
  return <NosotrosPage locale={typedLocale} copy={copy} />;
}
