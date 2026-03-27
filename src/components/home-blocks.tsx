import Link from "next/link";
import type { HomePageData, ProductFamilyData } from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";
import { buildProductsPath } from "@/lib/routes";
import { ContactForm } from "@/components/contact-form";
import { FamilyCard } from "@/components/family-card";

type Props = {
  families: ProductFamilyData[];
  locale: AppLocale;
  page: HomePageData;
};

export function HomeBlocks({ families, locale, page }: Props) {
  const featuredFamilies = families.filter((family) => family.featured).slice(0, 3);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-28 md:px-10 lg:px-16">
      {page.blocks.map((block) => {
        if (block.type === "stats") {
          return (
            <section
              key={block.anchorId}
              className="rounded-[2.5rem] border border-foreground/8 bg-white px-8 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
              id={block.anchorId}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
                {block.eyebrow}
              </p>
              <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,28rem)_1fr]">
                <div>
                  <h2 className="text-4xl leading-tight tracking-tight text-foreground">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-body">{block.body}</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {block.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[1.75rem] border border-foreground/8 bg-background px-5 py-6"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                        {stat.label}
                      </p>
                      <p className="mt-3 text-3xl tracking-tight text-foreground">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (block.type === "productPreview") {
          return (
            <section
              key={block.anchorId}
              className="rounded-[2.5rem] bg-[#eef2fb] px-8 py-10"
              id={block.anchorId}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
                    {block.eyebrow}
                  </p>
                  <h2 className="mt-4 text-4xl leading-tight tracking-tight text-foreground">
                    {block.title}
                  </h2>
                  <p className="mt-4 text-body">{block.body}</p>
                </div>
                <Link className="cta-primary w-fit" href={buildProductsPath(locale)}>
                  {block.ctaLabel}
                </Link>
              </div>
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {featuredFamilies.map((family) => (
                  <FamilyCard key={family.slug} family={family} />
                ))}
              </div>
            </section>
          );
        }

        if (block.type === "contact") {
          return (
            <section
              key={block.anchorId}
              className="grid gap-8 rounded-[2.5rem] bg-foreground px-8 py-10 text-white lg:grid-cols-[minmax(0,28rem)_1fr]"
              id={block.anchorId}
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/70">
                  {block.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl leading-tight tracking-tight">
                  {block.title}
                </h2>
                <p className="mt-4 max-w-xl text-white/74">{block.body}</p>
                <p className="mt-6 max-w-lg text-sm text-white/60">{block.note}</p>
              </div>
              <ContactForm locale={locale} submitLabel={block.submitLabel} />
            </section>
          );
        }

        return (
          <section
            key={block.anchorId}
            className="grid gap-6 rounded-[2.5rem] border border-foreground/8 bg-white px-8 py-10 lg:grid-cols-[12rem_minmax(0,1fr)]"
            id={block.anchorId}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
              {block.eyebrow}
            </p>
            <div className="max-w-3xl">
              <h2 className="text-4xl leading-tight tracking-tight text-foreground">
                {block.title}
              </h2>
              <p className="mt-4 text-body">{block.body}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
