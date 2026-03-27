import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyCard } from "@/components/family-card";
import { getProductFamilies } from "@/lib/payload-data";
import { defaultLocale, getProductSegment, isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildProductsPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
    productSegment: string;
  }>;
};

async function resolveLocaleAndSegment(params: Props["params"]) {
  const { locale, productSegment } = await params;
  if (!isLocale(locale)) notFound();
  if (productSegment !== getProductSegment(locale)) notFound();
  return { locale: locale as AppLocale, productSegment };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? (locale as AppLocale) : defaultLocale;

  return {
    alternates: {
      canonical: buildProductsPath(validLocale),
      languages: Object.fromEntries(locales.map((entry) => [entry, buildProductsPath(entry)])),
    },
    description: "Catalog of published polymer families managed in Payload CMS.",
    title: "Product families | Atalant",
  };
}

export default async function ProductsIndexPage({ params }: Props) {
  const { locale } = await resolveLocaleAndSegment(params);
  const families = await getProductFamilies(locale);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-36 md:px-10 lg:px-16">
      <div className="max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-dark">
          Catalog
        </p>
        <h1 className="mt-5 text-5xl leading-none tracking-tight text-foreground md:text-7xl">
          Published product families.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-body">
          This structure is intentionally built at family level first, with room to expand later into subtypes or grades without redesigning the routing model.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {families.map((family) => (
          <FamilyCard key={family.slug} family={family} />
        ))}
      </div>
    </main>
  );
}
