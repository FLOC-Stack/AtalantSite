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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: "Nosotros · Socio estratégico — Atalant",
    description:
      "Treinta años conectando polímeros y personas. Atalant ofrece materias primas plásticas de máxima calidad con red logística propia en Iberia y Europa.",
  };
}

export default async function NosotrosRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getStaticPageCopy("nosotros", typedLocale);
  return <NosotrosPage locale={typedLocale} copy={copy} />;
}
