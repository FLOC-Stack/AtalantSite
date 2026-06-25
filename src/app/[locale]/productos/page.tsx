import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductsMorph,
  type ProductsMorphItem,
  type ProductsMorphHero,
} from "@/components/products-morph";
import { getCatalogCopy, getProductFamilies } from "@/lib/payload-data";
import { defaultLocale, isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildFamilyPath, buildProductsPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? (locale as AppLocale) : defaultLocale;
  const copy = (await getCatalogCopy(validLocale)).morph;

  return {
    alternates: {
      canonical: buildProductsPath(validLocale),
      languages: Object.fromEntries(
        locales.map((entry) => [entry, buildProductsPath(entry)]),
      ),
    },
    description: copy.seoDescription,
    title: copy.seoTitle,
  };
}

export default async function ProductosPage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as AppLocale;
  const catalog = await getCatalogCopy(typedLocale);
  let products: ProductsMorphItem[] | undefined;

  try {
    const families = await getProductFamilies(typedLocale);
    products = families.slice(0, 7).map((family) => ({
      code: family.code,
      name: family.title,
      description: family.excerpt,
      variants: family.variants,
      recycled: family.recycled,
      href: buildFamilyPath(typedLocale, family.slug),
      image:
        family.heroMedia && family.heroMedia.kind === "image"
          ? family.heroMedia.url
          : undefined,
      video:
        family.heroMedia && family.heroMedia.kind === "video"
          ? family.heroMedia.url
          : undefined,
    }));
  } catch {
    // Fallback a los 6 hardcodeados en el componente
  }

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
        locale={typedLocale}
      />
    </main>
  );
}
