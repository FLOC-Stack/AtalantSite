import Link from "next/link";
import type { HomePageData, SiteSettingsData } from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";
import { buildProductsPath, buildSectionPath } from "@/lib/routes";
import { HeroBackdrop } from "@/components/hero-backdrop";

type Props = {
  locale: AppLocale;
  page: HomePageData;
  settings: SiteSettingsData;
};

export function HomeHero({ locale, page, settings }: Props) {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36 md:px-10 lg:px-16 lg:pt-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(30,75,182,0.18),_transparent_45%),radial-gradient(circle_at_80%_20%,_rgba(34,139,34,0.10),_transparent_25%)]" />
      <HeroBackdrop />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-primary-dark">
            {page.hero.eyebrow}
          </p>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.4rem,9vw,8rem)] leading-[0.9] tracking-[-0.05em] text-foreground">
            {page.hero.headline}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-body md:text-xl">
            {page.hero.body}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link className="cta-primary" href={buildProductsPath(locale)}>
              {page.hero.primaryLabel}
            </Link>
            <Link className="cta-secondary" href={buildSectionPath(locale, "contact")}>
              {page.hero.secondaryLabel}
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-foreground/8 bg-white/75 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-dark">
            {settings.brandName}
          </p>
          <p className="mt-4 text-2xl leading-tight text-foreground">
            {settings.tagline}
          </p>
          <div className="mt-8 space-y-3 border-t border-foreground/8 pt-6 text-sm text-body">
            <p>{settings.contactEmail}</p>
            <p>{settings.phone}</p>
            <p>{settings.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
