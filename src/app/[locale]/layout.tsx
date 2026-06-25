import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { SiteFooter } from "@/components/site-footer";
import { getSiteSettings } from "@/lib/payload-data";
import { isLocale, type AppLocale } from "@/lib/locales";
import {
  buildContactoPath,
  buildFinancingPath,
  buildLocalePath,
  buildLogisticsPath,
  buildProductsPath,
  buildSustainabilityPath,
} from "@/lib/routes";
import { getServerURL } from "@/lib/server-url";

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

  const baseURL = getServerURL();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": `${baseURL}${buildLocalePath(typedLocale)}#organization`,
        "@type": "Organization",
        address: settings?.address,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: settings?.contactEmail,
            telephone: settings?.phone,
          },
        ],
        email: settings?.contactEmail,
        name: settings?.brandName ?? "Atalant",
        telephone: settings?.phone,
        url: `${baseURL}${buildLocalePath(typedLocale)}`,
      },
      {
        "@id": `${baseURL}${buildLocalePath(typedLocale)}#website`,
        "@type": "WebSite",
        about:
          "Industrial polymer sourcing, recycled materials, financing, and logistics support for European manufacturing buyers.",
        inLanguage: typedLocale,
        name: settings?.brandName ?? "Atalant",
        publisher: {
          "@id": `${baseURL}${buildLocalePath(typedLocale)}#organization`,
        },
        url: `${baseURL}${buildLocalePath(typedLocale)}`,
      },
      {
        "@id": `${baseURL}${buildLocalePath(typedLocale)}#offer-catalog`,
        "@type": "OfferCatalog",
        itemListElement: [
          `${baseURL}${buildProductsPath(typedLocale)}`,
          `${baseURL}${buildLogisticsPath(typedLocale)}`,
          `${baseURL}${buildFinancingPath(typedLocale)}`,
          `${baseURL}${buildSustainabilityPath(typedLocale)}`,
          `${baseURL}${buildContactoPath(typedLocale)}`,
        ],
        name: "Atalant polymer supply, logistics, financing, and sustainability services",
      },
    ],
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        type="application/ld+json"
      />
      <RouteScrollReset />
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
