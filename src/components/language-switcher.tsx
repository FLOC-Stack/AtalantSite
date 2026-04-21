"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type AppLocale } from "@/lib/locales";
import { switchLocalePath } from "@/lib/routes";

type Props = {
  currentLocale: AppLocale;
};

export function LanguageSwitcher({ currentLocale }: Props) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => {
        const href = switchLocalePath(pathname, locale);
        const active = locale === currentLocale;

        return (
          <Link
            key={locale}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.28em] transition-colors ${
              active
                ? "bg-foreground text-background"
                : "text-muted hover:bg-foreground/6 hover:text-foreground"
            }`}
            href={href}
          >
            {localeLabels[locale].slice(0, 2)}
          </Link>
        );
      })}
    </div>
  );
}
