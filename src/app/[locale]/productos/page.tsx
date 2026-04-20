import { notFound } from "next/navigation";
import {
  ProductsMorph,
  type ProductsMorphItem,
  type ProductsMorphHero,
} from "@/components/products-morph";
import { getProductFamilies } from "@/lib/payload-data";
import { isLocale, type AppLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

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
