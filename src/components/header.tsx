"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";
import { buildProductsPath, buildSectionPath } from "@/lib/routes";
import { LanguageSwitcher } from "@/components/language-switcher";

type HeaderLink = { label: string; href: string };

type Props = {
  locale?: AppLocale;
  brandName?: string;
  nav?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
};

// Copia de fallback por locale. Los IDs de sección (logistica, financiacion,
// sostenibilidad, equipo, contacto) son identificadores técnicos estables
// que viven en español para casar con los anchors reales del DOM; los labels
// sí se traducen.
type FallbackStrings = {
  products: string;
  logistics: string;
  financing: string;
  sustainability: string;
  team: string;
  contact: string;
};

const fallbackStrings: Record<AppLocale, FallbackStrings> = {
  es: {
    products: "Productos",
    logistics: "Logística",
    financing: "Financiación",
    sustainability: "Sostenibilidad",
    team: "Equipo",
    contact: "Contacto",
  },
  en: {
    products: "Products",
    logistics: "Logistics",
    financing: "Financing",
    sustainability: "Sustainability",
    team: "Team",
    contact: "Contact",
  },
  fr: {
    products: "Produits",
    logistics: "Logistique",
    financing: "Financement",
    sustainability: "Durabilité",
    team: "Équipe",
    contact: "Contact",
  },
  pt: {
    products: "Produtos",
    logistics: "Logística",
    financing: "Financiamento",
    sustainability: "Sustentabilidade",
    team: "Equipa",
    contact: "Contato",
  },
};

function buildFallbackNav(locale: AppLocale): HeaderLink[] {
  const t = fallbackStrings[locale];
  return [
    { label: t.products, href: buildProductsPath(locale) },
    { label: t.logistics, href: buildSectionPath(locale, "logistica") },
    { label: t.financing, href: buildSectionPath(locale, "financiacion") },
    { label: t.sustainability, href: buildSectionPath(locale, "sostenibilidad") },
    { label: t.team, href: buildSectionPath(locale, "equipo") },
  ];
}

function resolveHref(item: NavItem, locale: AppLocale): string {
  if (item.kind === "products") return buildProductsPath(locale);
  if (item.kind === "external") return item.href ?? "#";
  return buildSectionPath(locale, item.sectionId ?? item.label.toLowerCase());
}

export function Header({
  locale = "es",
  brandName = "Atalant",
  nav,
  ctaLabel,
  ctaHref,
}: Props = {}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // Expandido "temporal" por hover o focus teclado sobre el header.
  // Al salir o desenfocar, vuelve al estado compacto si sigue colapsado.
  // Si el drawer está abierto el header se queda desplegado aunque se
  // pierda el hover, para no dejarlo flotando sobre un pill minúsculo.
  const [hovered, setHovered] = useState(false);
  const isCompact = collapsed && !hovered && !open;

  const links: HeaderLink[] = nav?.length
    ? nav.map((item) => ({ label: item.label, href: resolveHref(item, locale) }))
    : buildFallbackNav(locale);
  const resolvedCtaLabel = ctaLabel ?? fallbackStrings[locale].contact;
  const resolvedCtaHref = ctaHref ?? buildSectionPath(locale, "contacto");

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 120;
      setCollapsed(next);
      if (next) setOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:top-6 sm:px-8 lg:top-8 lg:px-12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        className={`relative transition-all duration-300 ease-out ${
          isCompact ? "w-auto" : "w-full max-w-[1440px]"
        }`}
      >
        {/* Nav bar — always pill */}
        <nav
          className={`glass relative z-20 flex items-center rounded-full h-12 sm:h-14 lg:h-16 transition-all duration-300 ease-out ${
            isCompact
              ? "justify-center gap-4 px-4 sm:px-5 lg:px-6"
              : "justify-between px-5 sm:px-8 lg:px-10"
          }`}
        >
          <Link href={`/${locale}`} className="shrink-0" aria-label={`${brandName} home`}>
            <Image
              src="/logo.svg"
              alt={brandName}
              width={136}
              height={40}
              className="h-6 w-auto sm:h-7 lg:h-8"
              priority
            />
          </Link>

          {/* Desktop nav */}
          {!isCompact && (
            <ul className="hidden items-center gap-10 lg:flex">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-[13px] text-foreground transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
            <div className={isCompact ? "hidden" : "hidden sm:flex"}>
              <LanguageSwitcher currentLocale={locale} />
            </div>

            <Link
              href={resolvedCtaHref}
              className={`h-9 items-center overflow-hidden rounded bg-primary text-white ${
                isCompact ? "hidden" : "hidden sm:flex"
              }`}
            >
              <span className="border-r border-white/10 px-5 font-mono text-[10px] uppercase tracking-[2px]">
                {resolvedCtaLabel}
              </span>
              <span className="flex items-center justify-center px-3">
                <ChevronDown className="h-2 w-2 -rotate-90" />
              </span>
            </Link>

            {/* Menu button — visible bajo lg por defecto, y también en lg+
                cuando el header está en estado compact (sustituye al CTA). */}
            <button
              onClick={() => setOpen(!open)}
              className={`items-center justify-center ${
                isCompact ? "flex" : "flex lg:hidden"
              }`}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Dropdown — accesible desde cualquier breakpoint cuando open. */}
        <div
          className={`glass absolute right-0 top-full mt-2 w-1/3 min-w-[220px] rounded-2xl transition-all duration-300 ease-in-out origin-top ${
            open
              ? "opacity-100 scale-y-100 pointer-events-auto"
              : "opacity-0 scale-y-90 pointer-events-none"
          }`}
        >
          <div className="px-5 pt-4 pb-5">
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block font-sans text-[15px] text-foreground transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 border-t border-foreground/5 pt-4">
              <LanguageSwitcher currentLocale={locale} />
            </div>
            <div className="mt-4 sm:hidden">
              <Link
                href={resolvedCtaHref}
                onClick={() => setOpen(false)}
                className="flex h-9 items-center overflow-hidden rounded bg-primary text-white"
              >
                <span className="border-r border-white/10 px-5 font-mono text-[10px] uppercase tracking-[2px]">
                  {resolvedCtaLabel}
                </span>
                <span className="flex items-center justify-center px-3">
                  <ChevronDown className="h-2 w-2 -rotate-90" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
