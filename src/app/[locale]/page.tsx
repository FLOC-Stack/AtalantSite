import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeBlocks } from "@/components/home-blocks";
import { HomeHero } from "@/components/home-hero";
import { getHomePage, getProductFamilies, getSiteSettings } from "@/lib/payload-data";
import { defaultLocale, isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildLocalePath } from "@/lib/routes";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? (locale as AppLocale) : defaultLocale;
  const page = await getHomePage(validLocale);

  return {
    alternates: {
      canonical: buildLocalePath(validLocale),
      languages: Object.fromEntries(locales.map((entry) => [entry, buildLocalePath(entry)])),
    },
    description: page.seo.description,
    title: page.seo.title,
  };
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const [page, settings, families] = await Promise.all([
    getHomePage(locale),
    getSiteSettings(locale),
    getProductFamilies(locale),
  ]);

  return (
    <main>
      <HomeHero locale={locale} page={page} settings={settings} />
      <HomeBlocks families={families} locale={locale} page={page} />
    </main>
  );
}
