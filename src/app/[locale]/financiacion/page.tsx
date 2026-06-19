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

const metadataByLocale: Record<AppLocale, Metadata> = {
  en: {
    title: "Financing · Internal credit — Atalant",
    description:
      "Atalant internal credit system to strengthen and grow your business, with customers insured worldwide.",
  },
  es: {
    title: "Financiación · Crédito interno — Atalant",
    description:
      "Sistema de crédito interno de Atalant para reforzar y hacer crecer tu negocio, con clientes asegurados mundialmente.",
  },
  fr: {
    title: "Financement · Crédit interne — Atalant",
    description:
      "Système de crédit interne d'Atalant pour renforcer et développer votre activité, avec des clients assurés dans le monde entier.",
  },
  pt: {
    title: "Financiamento · Crédito interno — Atalant",
    description:
      "Sistema de crédito interno da Atalant para reforçar e fazer crescer o seu negócio, com clientes assegurados a nível mundial.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return metadataByLocale[locale];
}

export default async function FinanciacionRoute({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as AppLocale;
  const copy = await getStaticPageCopy("financiacion", typedLocale);
  return <FinanciacionPage locale={typedLocale} copy={copy} />;
}
