import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalogCopy } from "@/lib/catalog-copy";
import { getProductFamilyBySlug } from "@/lib/payload-data";
import { defaultLocale, getProductSegment, isLocale, locales, type AppLocale } from "@/lib/locales";
import { buildFamilyPath, buildProductsPath, buildSectionPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    familySlug: string;
    locale: string;
    productSegment: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { familySlug, locale } = await params;
  const validLocale = isLocale(locale) ? (locale as AppLocale) : defaultLocale;
  const family = await getProductFamilyBySlug(validLocale, familySlug);
  const copy = catalogCopy[validLocale].family;

  return {
    alternates: {
      canonical: buildFamilyPath(validLocale, familySlug),
      languages: Object.fromEntries(
        locales.map((entry) => [entry, buildFamilyPath(entry, familySlug)]),
      ),
    },
    description: family?.seo.description || copy.seoFallbackDescription,
    title: family?.seo.title || copy.seoFallbackTitle,
  };
}

export default async function ProductFamilyPage({ params }: Props) {
  const { familySlug, locale, productSegment } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (productSegment !== getProductSegment(locale)) {
    notFound();
  }

  const family = await getProductFamilyBySlug(locale, familySlug);
  const copy = catalogCopy[locale].family;

  if (!family) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:pt-28 md:px-10 lg:px-16 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          <Link className="text-sm text-primary" href={buildProductsPath(locale)}>
            &lt;- {copy.backToCatalog}
          </Link>
          <div className="mt-8 rounded-[2.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(30,75,182,0.24),_transparent_42%),linear-gradient(180deg,_#f8fbff,_#e8edf7)] p-8 md:p-10">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${
                family.recycled ? "bg-green/10 text-green" : "bg-primary/10 text-primary"
              }`}
            >
              {family.code.toUpperCase()}
            </span>
            <h1 className="mt-6 max-w-4xl text-5xl leading-none tracking-tight text-foreground md:text-7xl">
              {family.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-body">{family.excerpt}</p>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-foreground/8 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
            {copy.variants}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {family.variants.map((variant) => (
              <span
                key={variant}
                className="rounded-full border border-foreground/8 px-3 py-1 text-xs text-muted-strong"
              >
                {variant}
              </span>
            ))}
          </div>
          <Link className="cta-primary mt-8 w-full justify-center" href={buildSectionPath(locale, "contact")}>
            {copy.talkToAtalant}
          </Link>
        </aside>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <section className="rounded-[2rem] border border-foreground/8 bg-white p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
            {copy.overview}
          </p>
          <p className="mt-5 text-lg leading-8 text-body">{family.body}</p>
        </section>
        <section className="rounded-[2rem] border border-foreground/8 bg-white p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
            {copy.applications}
          </p>
          <ul className="mt-5 space-y-3 text-body">
            {family.applications.map((application) => (
              <li key={application} className="rounded-2xl bg-background px-4 py-3">
                {application}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
