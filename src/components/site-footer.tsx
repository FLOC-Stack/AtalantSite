import Link from "next/link";
import type { NavItem, SiteSettingsData } from "@/lib/content-types";
import { locales, type AppLocale } from "@/lib/locales";
import {
  buildCookiesPath,
  buildFinancingPath,
  buildLegalNoticePath,
  buildLocalePath,
  buildLogisticsPath,
  buildPrivacyPath,
  buildProductsPath,
  buildAboutPath,
  buildSectionPath,
  buildSustainabilityPath,
} from "@/lib/routes";
import { fallbackSiteSettings } from "@/lib/fallback-content";
import { FooterEmailCopy } from "@/components/footer-email-copy";

const CONTACT_EMAIL = "info@atalant.com";
const CONTACT_PHONE = "+34 965 66 18 28";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

type Props = {
  locale: AppLocale;
  settings?: SiteSettingsData;
};

const localeShort: Record<AppLocale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
  fr: "FR",
};

function resolveFooterHref(item: NavItem, locale: AppLocale): string {
  if (item.kind === "products") return buildProductsPath(locale);
  if (item.kind === "logistics") return buildLogisticsPath(locale);
  if (item.kind === "external") return item.href ?? "#";
  if (
    ["sustainability", "sostenibilidad"].includes((item.sectionId ?? "").toLowerCase())
  ) {
    return buildSustainabilityPath(locale);
  }
  if (
    ["financing", "financiacion", "financement", "financiamento"].includes(
      (item.sectionId ?? "").toLowerCase(),
    )
  ) {
    return buildFinancingPath(locale);
  }
  if (["team", "equipo", "nosotros", "about"].includes((item.sectionId ?? "").toLowerCase())) {
    return buildAboutPath(locale);
  }
  return buildSectionPath(locale, item.sectionId ?? item.label.toLowerCase());
}

function getColumns(locale: AppLocale, settings: SiteSettingsData): FooterColumn[] {
  const products = buildProductsPath(locale);
  const sustainability = buildSustainabilityPath(locale);
  const financing = buildFinancingPath(locale);
  const footerLinks = settings.footerLinks.length
    ? settings.footerLinks.map((item) => ({
        href: resolveFooterHref(item, locale),
        label: item.label,
      }))
    : [
        { label: "Productos", href: products },
        { label: "Logística", href: buildLogisticsPath(locale) },
        { label: "Financiación", href: financing },
        { label: "Sostenibilidad", href: sustainability },
      ];

  // Solo la columna de enlaces. La columna "Contacto" se renderiza aparte
  // porque el email usa un botón de copiar (componente cliente), no un link.
  return [
    {
      heading: "Enlaces",
      links: footerLinks,
    },
  ];
}

function isExternalHref(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http://") || href.startsWith("https://");
}

export function SiteFooter({ locale, settings: cmsSettings }: Props) {
  const settings = {
    ...(cmsSettings ?? fallbackSiteSettings[locale]),
    contactEmail: CONTACT_EMAIL,
    phone: CONTACT_PHONE,
  };
  const columns = getColumns(locale, settings);
  const currentYear = new Date().getFullYear();
  const socialLinks = settings.socialLinks?.length
    ? settings.socialLinks
    : fallbackSiteSettings[locale].socialLinks;

  return (
    <footer className="relative w-full bg-primary text-white">
      <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20">
        {/* Display title */}
        <h2 className="font-sans font-light leading-[0.95] tracking-tight text-white text-[clamp(2.5rem,11vw,10rem)] sm:leading-[0.95] lg:tracking-[-5.5px]">
          READY FOR RESPONSE
        </h2>

        <div className="mt-12 h-px w-full bg-white/20 sm:mt-16 lg:mt-20" aria-hidden="true" />

        {/* Columns grid */}
        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-12 lg:mt-10 lg:grid-cols-[2fr_1.4fr_1.2fr] lg:gap-14">
          {/* Atalant — info block */}
          <div className="flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-white/55">
              {settings.brandName}
            </p>
            <p className="mt-7 font-sans text-lg font-light leading-[1.4] tracking-[-0.3px] text-white/90 sm:text-xl sm:leading-[1.4]">
              {settings.footerText}
            </p>
            <address className="mt-6 flex flex-col items-start gap-1 font-mono text-[12px] not-italic leading-[1.5] tracking-[0.2px] text-white/55">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="transition-opacity hover:opacity-70 hover:text-white/80"
              >
                {settings.phone}
              </a>
            </address>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.heading} className="flex flex-col">
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-white/55">
                {column.heading}
              </p>
              <ul className="mt-7 flex flex-col gap-2.5">
                {column.links.map((link) => {
                  const isExternal = isExternalHref(link.href);

                  if (isExternal) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="font-sans text-[15px] tracking-[-0.1px] text-white/90 transition-opacity hover:opacity-70"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-[15px] tracking-[-0.1px] text-white/90 transition-opacity hover:opacity-70"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Contacto — email con botón de copiar al portapapeles */}
          <div className="flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-white/55">
              Contacto
            </p>
            <div className="mt-7">
              <FooterEmailCopy email={settings.contactEmail} locale={locale} />
            </div>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/20 sm:mt-16 lg:mt-20" aria-hidden="true" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[2px] sm:mt-7 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-white/50">
            © {currentYear} · Atalant · Todos los derechos reservados
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55"
          >
            <Link href={buildPrivacyPath(locale)} className="transition-opacity hover:opacity-70">
              Privacidad
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={buildCookiesPath(locale)} className="transition-opacity hover:opacity-70">
              Cookies
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={buildLegalNoticePath(locale)} className="transition-opacity hover:opacity-70">
              Aviso legal
            </Link>
          </nav>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/70">
            {socialLinks?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
            {socialLinks?.length ? (
              <span aria-hidden="true" className="mx-1 text-white/30">/</span>
            ) : null}
            <ul className="flex items-center gap-x-2.5">
              {locales.map((code) => {
                const active = code === locale;
                return (
                  <li key={code}>
                    <Link
                      href={buildLocalePath(code)}
                      aria-current={active ? "page" : undefined}
                      className={`transition-opacity hover:opacity-70 ${
                        active ? "text-white" : "text-white/55"
                      }`}
                    >
                      {localeShort[code]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
