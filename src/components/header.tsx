"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { NavItem } from "@/lib/content-types";
import { localeLabels, locales, type AppLocale } from "@/lib/locales";
import {
  buildAboutPath,
  buildLogisticsPath,
  buildProductsPath,
  buildSectionPath,
  switchLocalePath,
} from "@/lib/routes";
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
  about: string;
  contact: string;
};

const fallbackStrings: Record<AppLocale, FallbackStrings> = {
  es: {
    products: "Productos",
    logistics: "Logística",
    financing: "Financiación",
    sustainability: "Sostenibilidad",
    about: "Nosotros",
    contact: "Contacto",
  },
  en: {
    products: "Products",
    logistics: "Logistics",
    financing: "Financing",
    sustainability: "Sustainability",
    about: "About",
    contact: "Contact",
  },
  fr: {
    products: "Produits",
    logistics: "Logistique",
    financing: "Financement",
    sustainability: "Durabilité",
    about: "À propos",
    contact: "Contact",
  },
  pt: {
    products: "Produtos",
    logistics: "Logística",
    financing: "Financiamento",
    sustainability: "Sustentabilidade",
    about: "Sobre nós",
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
    { label: t.about, href: buildAboutPath(locale) },
  ];
}

// Dedupe por destino real: dos items que resuelven al mismo href son el
// mismo enlace aunque difieran en `kind` (p. ej. `logistics` vs.
// `section/logistics`). También colapsamos secciones con el mismo
// sectionId aunque sus labels difieran en tildes ("Logistica" vs.
// "Logística").
function dedupeNav(items: NavItem[], locale: AppLocale): NavItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const href = resolveHref(item, locale);
    if (seen.has(href)) return false;
    seen.add(href);
    return true;
  });
}

// Filtro defensivo: si Payload devuelve un item "Contacto" en el nav, lo
// eliminamos — el CTA ya cubre esa acción y duplicarlo ensucia la barra.
function isContactNavItem(item: NavItem): boolean {
  const sectionId = item.kind === "section" ? (item.sectionId ?? "").toLowerCase() : "";
  const label = item.label.toLowerCase();
  return (
    sectionId === "contact" ||
    sectionId === "contacto" ||
    label === "contact" ||
    label === "contacto" ||
    label === "contato"
  );
}

// Items que apuntan al "Nosotros". Aceptamos varios sectionId y labels
// porque la copia de Payload puede llegar como "equipo", "nosotros",
// "about", "sobre nós", "à propos", etc.
function isAboutNavItem(item: NavItem): boolean {
  const sectionId = item.kind === "section" ? (item.sectionId ?? "").toLowerCase() : "";
  const label = item.label.toLowerCase();
  const aboutTokens = ["equipo", "nosotros", "about", "sobre", "sobre nós", "à propos", "a propos"];
  return aboutTokens.includes(sectionId) || aboutTokens.includes(label);
}

function resolveHref(item: NavItem, locale: AppLocale): string {
  if (item.kind === "products") return buildProductsPath(locale);
  if (item.kind === "logistics") return buildLogisticsPath(locale);
  if (item.kind === "external") return item.href ?? "#";
  if (isAboutNavItem(item)) return buildAboutPath(locale);
  return buildSectionPath(locale, item.sectionId ?? item.label.toLowerCase());
}

// Un link se considera "activo" solo si apunta a una página entera
// (sin hash) y su href coincide exactamente con el pathname actual.
// Los links a secciones con hash se omiten hasta que haya scroll-spy.
function isActiveLink(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  return href === pathname;
}

export function Header({
  locale = "es",
  brandName = "Atalant",
  nav,
  ctaLabel,
  ctaHref,
}: Props = {}) {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // Pill compacto sii la página está scrolleada. El hover ya no re-expande
  // (patrón new.studio): solo el click en hamburger abre el drawer dentro
  // del propio pill.
  const isCompact = collapsed;

  // Refs para la coreografía de entrada de los elementos del nav cuando
  // el pill se expande (fade + slide con stagger orgánico).
  const ulRef = useRef<HTMLUListElement>(null);
  const langWrapperRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  // Refs para el focus trap del drawer y para devolver foco al hamburger
  // al cerrarlo.
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerItemsRef = useRef<HTMLUListElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const links: HeaderLink[] = nav?.length
    ? dedupeNav(nav.filter((item) => !isContactNavItem(item)), locale).map(
        (item) => ({
          label: item.label,
          href: resolveHref(item, locale),
        }),
      )
    : buildFallbackNav(locale);
  const resolvedCtaLabel = ctaLabel ?? fallbackStrings[locale].contact;
  const resolvedCtaHref = ctaHref ?? buildSectionPath(locale, "contacto");

  // Scroll listener con requestAnimationFrame: el handler solo corre una
  // vez por frame aunque el evento dispare 100+ veces por segundo.
  useEffect(() => {
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const next = window.scrollY > 80;
        setCollapsed(next);
        if (next) setOpen(false);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  // Body scroll-lock mientras el drawer está abierto, para que la página
  // detrás no se desplace. Restaura el valor anterior de overflow al cerrar
  // para no pisar estilos globales que pudieran existir.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Focus trap + Escape dentro del drawer. Al abrir enfocamos el primer
  // link; Tab y Shift+Tab ciclan entre los focusables sin salir; Escape
  // cierra y devuelve el foco al hamburger que lo abrió.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusables = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey) {
        if (active === first || !drawer.contains(active)) {
          event.preventDefault();
          last?.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Al pasar de compact → expanded, los elementos del nav aparecen con
  // fade + slide-up y un pequeño stagger. Se espera ~180ms para darle
  // tiempo al pill a crecer con su transición CSS de max-width.
  useGSAP(
    () => {
      if (isCompact) return;
      const targets: Element[] = [];
      if (ulRef.current) targets.push(...Array.from(ulRef.current.children));
      if (langWrapperRef.current) targets.push(langWrapperRef.current);
      if (ctaRef.current) targets.push(ctaRef.current);
      if (!targets.length) return;
      gsap.fromTo(
        targets,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.25,
          ease: "power3.out",
          clearProps: "all",
        },
      );
    },
    { dependencies: [isCompact] },
  );

  // Cuando el drawer abre, los items entran con stagger fade + blur,
  // imitando el patrón de new.studio (opacity 0 + blur 8 → 1 + blur 0).
  useGSAP(
    () => {
      if (!open) return;
      const ul = drawerItemsRef.current;
      if (!ul) return;
      const items = Array.from(ul.children);
      if (!items.length) return;
      gsap.fromTo(
        items,
        { opacity: 0, filter: "blur(8px)", y: 4 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          delay: 0.1,
          ease: "power3.out",
        },
      );
    },
    { dependencies: [open] },
  );

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 sm:top-6 sm:px-8 lg:top-8 lg:px-12">
      <div
        className={`relative w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isCompact && open
            ? "max-w-[320px]"
            : isCompact
              ? "max-w-[240px]"
              : "max-w-[240px] sm:max-w-[1440px]"
        }`}
      >
        {/* Pill — flex-col para que el drawer crezca dentro de él (patrón
            new.studio). overflow-hidden recorta el drawer al border-radius. */}
        <nav
          className={`glass relative z-20 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "rounded-3xl" : "rounded-[32px]"
          } ${
            isCompact
              ? "shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]"
              : "shadow-none"
          }`}
        >
          {/* Top row — siempre visible, altura fija. */}
          <div
            className={`flex items-center h-12 sm:h-14 lg:h-16 justify-between px-[20px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCompact ? "" : "sm:px-8 lg:px-10"
            }`}
          >
            <Link
              href={`/${locale}`}
              onClick={() => setOpen(false)}
              className="shrink-0 cursor-pointer"
              aria-label={`${brandName} home`}
            >
              <Image
                src="/logo.svg"
                alt={brandName}
                width={136}
                height={40}
                className="h-6 w-auto sm:h-7 lg:h-8"
                priority
              />
            </Link>

            {/* Desktop nav — render condicional: cuando el pill está compact
                el UL no debe existir en el DOM. Si lo dejáramos con lg:flex +
                opacity-0, los 6 links seguirían ocupando su min-content dentro
                del flex y harían desbordar el pill de 240px. */}
            {!isCompact && (
              <ul ref={ulRef} className="hidden items-center gap-10 lg:flex">
                {links.map((link) => {
                  const active = isActiveLink(link.href, pathname);
                  return (
                    <li key={link.label}>
                      <Link
                        aria-current={active ? "page" : undefined}
                        href={link.href}
                        className={`font-sans text-[14px] transition-colors hover:text-primary ${
                          active ? "text-primary-dark" : "text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
              <div
                ref={langWrapperRef}
                className={isCompact ? "hidden" : "hidden sm:flex"}
              >
                <LanguageSwitcher currentLocale={locale} />
              </div>

              <Link
                ref={ctaRef}
                href={resolvedCtaHref}
                className={`h-9 items-center overflow-hidden rounded bg-primary text-white ${
                  isCompact ? "hidden" : "hidden sm:flex"
                }`}
              >
                <span className="border-r border-white/10 px-5 font-mono text-[12px] uppercase tracking-[2px]">
                  {resolvedCtaLabel}
                </span>
                <span className="flex items-center justify-center px-3">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* Hamburger CSS — dos líneas que rotan a X (estilo new.studio). */}
              <button
                ref={hamburgerRef}
                onClick={() => setOpen(!open)}
                className={`cursor-pointer items-center justify-center ${
                  isCompact ? "flex" : "flex lg:hidden"
                }`}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
                aria-controls="header-drawer"
              >
                <span className="relative block h-5 w-5">
                  <span
                    className={`absolute left-0 top-1/2 h-[1.5px] w-full bg-current transition-transform duration-300 ease-out ${
                      open ? "rotate-45" : "-translate-y-[3px]"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-[1.5px] w-full bg-current transition-transform duration-300 ease-out ${
                      open ? "-rotate-45" : "translate-y-[3px]"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Drawer dentro del pill — truco grid-rows [0fr]/[1fr] anima
              height auto sin conocer el alto target. inert evita foco cuando
              está colapsado. */}
          <div
            ref={drawerRef}
            id="header-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={brandName}
            aria-hidden={!open}
            inert={!open}
            className={`grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5 pt-2">
                <ul ref={drawerItemsRef} className="flex flex-col gap-3">
                  {links.map((link) => {
                    const active = isActiveLink(link.href, pathname);
                    return (
                      <li key={link.label}>
                        <Link
                          aria-current={active ? "page" : undefined}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`block font-sans text-[15px] transition-opacity hover:opacity-70 ${
                            active ? "text-primary-dark" : "text-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 flex items-center gap-4 border-t border-foreground/5 pt-4">
                  {locales.map((loc) => {
                    const active = loc === locale;
                    const href = switchLocalePath(pathname, loc);
                    return (
                      <Link
                        key={loc}
                        aria-current={active ? "page" : undefined}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`font-mono text-[11px] uppercase tracking-[0.28em] transition-opacity hover:opacity-70 ${
                          active ? "text-foreground" : "text-foreground/50"
                        }`}
                      >
                        {localeLabels[loc].slice(0, 2)}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <Link
                    href={resolvedCtaHref}
                    onClick={() => setOpen(false)}
                    className="flex h-9 items-center justify-between overflow-hidden rounded bg-primary text-white"
                  >
                    <span className="px-5 font-mono text-[12px] uppercase tracking-[2px]">
                      {resolvedCtaLabel}
                    </span>
                    <span className="flex items-center justify-center px-3">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
