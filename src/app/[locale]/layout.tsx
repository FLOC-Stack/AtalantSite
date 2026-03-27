import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getSiteSettings } from "@/lib/payload-data";
import { isLocale, type AppLocale } from "@/lib/locales";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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

  const settings = await getSiteSettings(locale as AppLocale);

  return (
    <>
      <SiteHeader locale={locale} settings={settings} />
      <div className="pt-6">{children}</div>
      <SiteFooter locale={locale} settings={settings} />
    </>
  );
}
