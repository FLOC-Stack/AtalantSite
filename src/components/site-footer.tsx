import Link from "next/link";
import type { SiteSettingsData } from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";
import { buildProductsPath, buildSectionPath } from "@/lib/routes";

type Props = {
  locale: AppLocale;
  settings: SiteSettingsData;
};

export function SiteFooter({ locale, settings }: Props) {
  return (
    <footer className="mx-auto max-w-7xl px-6 pb-12 md:px-10 lg:px-16">
      <div className="rounded-[2.5rem] border border-foreground/8 bg-white px-8 py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary-dark">
              {settings.brandName}
            </p>
            <p className="mt-4 max-w-2xl text-2xl leading-tight text-foreground">
              {settings.footerText}
            </p>
          </div>
          <div className="grid gap-3">
            {settings.footerLinks.map((item) => {
              const href =
                item.kind === "products"
                  ? buildProductsPath(locale)
                  : item.kind === "section" && item.sectionId
                    ? buildSectionPath(locale, item.sectionId)
                    : item.href || `/${locale}`;

              return (
                <Link
                  key={`${item.kind}-${item.label}-footer`}
                  className="text-sm text-body transition-colors hover:text-foreground"
                  href={href}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
