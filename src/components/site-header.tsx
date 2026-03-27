"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SiteSettingsData } from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";
import { buildProductsPath, buildSectionPath } from "@/lib/routes";
import { LanguageSwitcher } from "@/components/language-switcher";

type Props = {
  locale: AppLocale;
  settings: SiteSettingsData;
};

export function SiteHeader({ locale, settings }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > 120);
      if (window.scrollY > 120) setOpen(false);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-4 z-50 px-4 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          className={`glass flex items-center justify-between transition-all duration-300 ${
            collapsed ? "mx-auto max-w-3xl rounded-full px-4 py-3" : "rounded-[2rem] px-5 py-4 md:px-7"
          }`}
        >
          <Link aria-label="Atalant home" href={`/${locale}`} className="shrink-0">
            <Image
              alt="Atalant"
              className="h-7 w-auto"
              height={40}
              priority
              src="/logo.svg"
              width={136}
            />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {settings.navigation.map((item) => {
              const href =
                item.kind === "products"
                  ? buildProductsPath(locale)
                  : item.kind === "section" && item.sectionId
                    ? buildSectionPath(locale, item.sectionId)
                    : item.href || `/${locale}`;

              return (
                <Link
                  key={`${item.kind}-${item.label}`}
                  className="text-sm text-foreground transition-opacity hover:opacity-70"
                  href={href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher currentLocale={locale} />
            <Link className="cta-primary hidden md:inline-flex" href={buildSectionPath(locale, "contact")}>
              {settings.navigation.at(-1)?.label ?? "Contact"}
            </Link>
            <button
              aria-expanded={open}
              className="rounded-full border border-foreground/10 px-4 py-2 text-sm lg:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              Menu
            </button>
          </div>
        </div>

        {open ? (
          <div className="glass mt-3 rounded-[1.75rem] p-4 lg:hidden">
            <nav className="flex flex-col gap-2">
              {settings.navigation.map((item) => {
                const href =
                  item.kind === "products"
                    ? buildProductsPath(locale)
                    : item.kind === "section" && item.sectionId
                      ? buildSectionPath(locale, item.sectionId)
                      : item.href || `/${locale}`;

                return (
                  <Link
                    key={`${item.kind}-${item.label}-mobile`}
                    className="rounded-2xl px-3 py-3 text-foreground transition-colors hover:bg-white/70"
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
