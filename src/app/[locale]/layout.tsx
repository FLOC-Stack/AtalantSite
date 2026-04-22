import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSettings } from "@/lib/payload-data";
import { isLocale, type AppLocale } from "@/lib/locales";

type Props = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as AppLocale;
  let brandName: string | undefined;
  let nav: Awaited<ReturnType<typeof getSiteSettings>>["navigation"] | undefined;

  try {
    const settings = await getSiteSettings(typedLocale);
    brandName = settings.brandName;
    nav = settings.navigation;
  } catch {
    // Payload no disponible — el Header usa sus fallbacks
  }

  return (
    <>
      <Header locale={typedLocale} brandName={brandName} nav={nav} />
      {children}
      <SiteFooter locale={typedLocale} />
    </>
  );
}
