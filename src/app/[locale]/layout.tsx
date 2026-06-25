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
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | undefined;

  try {
    settings = await getSiteSettings(typedLocale);
  } catch {
    // Payload no disponible — Header y Footer usan sus fallbacks
  }

  return (
    <>
      <div id="page-top" aria-hidden="true" className="sr-only" />
      <Header
        locale={typedLocale}
        brandName={settings?.brandName}
        ctaHref={settings?.headerCtaHref}
        ctaLabel={settings?.headerCtaLabel}
        nav={settings?.navigation}
      />
      {children}
      <SiteFooter locale={typedLocale} settings={settings} />
    </>
  );
}
