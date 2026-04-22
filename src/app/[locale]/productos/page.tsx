import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ProductsMorph,
  type ProductsMorphItem,
  type ProductsMorphHero,
} from "@/components/products-morph";
import { catalogCopy } from "@/lib/catalog-copy";
import { getProductFamilies } from "@/lib/payload-data";
import { defaultLocale, isLocale, locales, type AppLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = isLocale(locale) ? (locale as AppLocale) : defaultLocale;
  const copy = catalogCopy[validLocale].morph;

  return {
    alternates: {
      canonical: `/${validLocale}/productos`,
      languages: Object.fromEntries(
        locales.map((entry) => [entry, `/${entry}/productos`]),
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
  let products: ProductsMorphItem[] | undefined;

  try {
    const families = await getProductFamilies(typedLocale);
    products = families.slice(0, 6).map((family) => ({
      code: family.code,
      name: family.title,
      description: family.excerpt,
      variants: family.variants,
      recycled: family.recycled,
      href: `/${typedLocale}/productos/${family.slug}`,
    }));
  } catch {
    // Fallback a los 6 hardcodeados en el componente
  }

  // Hero se deja en fallback del componente; cuando haya copy en Payload
  // para la propia página Productos se pasa aquí como prop `hero`.
  const hero: ProductsMorphHero | undefined = undefined;

  return (
    <main className="bg-background">
      <ProductsMorph products={products} hero={hero} />
    </main>
  );
}
