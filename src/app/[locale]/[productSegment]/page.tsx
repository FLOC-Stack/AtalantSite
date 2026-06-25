import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductsMorph,
  type ProductsMorphHero,
  type ProductsMorphItem,
} from "@/components/products-morph";
import { getCatalogCopy, getProductFamilies } from "@/lib/payload-data";
import { defaultLocale, getProductSegment, isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildFamilyPath, buildProductsPath } from "@/lib/routes";

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
  const copy = (await getCatalogCopy(validLocale)).morph;

  return {
    alternates: {
      canonical: buildProductsPath(validLocale),
      languages: Object.fromEntries(locales.map((entry) => [entry, buildProductsPath(entry)])),
    },
    description: copy.seoDescription,
    title: copy.seoTitle,
  };
}

export default async function ProductsIndexPage({ params }: Props) {
  const { locale } = await resolveLocaleAndSegment(params);
  const catalog = await getCatalogCopy(locale);
  const families = await getProductFamilies(locale);
  const products: ProductsMorphItem[] = families.slice(0, 7).map((family) => ({
    code: family.code,
    description: family.excerpt,
    href: buildFamilyPath(locale, family.slug),
    image:
      family.heroMedia && family.heroMedia.kind === "image"
        ? family.heroMedia.url
        : undefined,
    name: family.title,
    recycled: family.recycled,
    variants: family.variants,
    video:
      family.heroMedia && family.heroMedia.kind === "video"
        ? family.heroMedia.url
        : undefined,
  }));
  const hero: ProductsMorphHero = {
    body: catalog.morph.body,
    eyebrow: catalog.morph.eyebrow,
    title: catalog.morph.title,
  };

  return (
    <main className="bg-background">
      <ProductsMorph
        copy={catalog.morph}
        products={products}
        hero={hero}
        locale={locale}
      />
    </main>
  );
}
