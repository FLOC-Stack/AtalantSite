import Link from "next/link";
import type { NavItem, SiteSettingsData } from "@/lib/content-types";
import { locales, type AppLocale } from "@/lib/locales";
import {
  buildCookiesPath,
  buildFinancingPath,
  buildLegalNoticePath,
  buildLocalePath,
  buildLogisticsPath,
  buildContactoPath,
  buildPrivacyPath,
  buildProductsPath,
  buildAboutPath,
  buildSectionPath,
  buildSustainabilityPath,
  withPageTopAnchor,
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

const footerCopy: Record<
  AppLocale,
  {
    allRights: string;
    contact: string;
    cookies: string;
    legal: string;
    links: string;
    privacy: string;
  }
> = {
  en: {
    allRights: "All rights reserved",
    contact: "Contact",
    cookies: "Cookies",
    legal: "Legal notice",
    links: "Links",
    privacy: "Privacy",
  },
  es: {
    allRights: "Todos los derechos reservados",
    contact: "Contacto",
    cookies: "Cookies",
    legal: "Aviso legal",
    links: "Enlaces",
    privacy: "Privacidad",
  },
  fr: {
    allRights: "Tous droits réservés",
    contact: "Contact",
    cookies: "Cookies",
    legal: "Mentions légales",
    links: "Liens",
    privacy: "Confidentialité",
  },
  pt: {
    allRights: "Todos os direitos reservados",
    contact: "Contacto",
    cookies: "Cookies",
    legal: "Aviso legal",
    links: "Ligações",
    privacy: "Privacidade",
  },
};

const fallbackLinks: Record<AppLocale, FooterLink[]> = {
  en: [
    { label: "Products", href: withPageTopAnchor(buildProductsPath("en")) },
    { label: "Logistics", href: withPageTopAnchor(buildLogisticsPath("en")) },
    { label: "Financing", href: withPageTopAnchor(buildFinancingPath("en")) },
    { label: "Sustainability", href: withPageTopAnchor(buildSustainabilityPath("en")) },
  ],
  es: [
    { label: "Productos", href: withPageTopAnchor(buildProductsPath("es")) },
    { label: "Logística", href: withPageTopAnchor(buildLogisticsPath("es")) },
    { label: "Financiación", href: withPageTopAnchor(buildFinancingPath("es")) },
    { label: "Sostenibilidad", href: withPageTopAnchor(buildSustainabilityPath("es")) },
  ],
  fr: [
    { label: "Produits", href: withPageTopAnchor(buildProductsPath("fr")) },
    { label: "Logistique", href: withPageTopAnchor(buildLogisticsPath("fr")) },
    { label: "Financement", href: withPageTopAnchor(buildFinancingPath("fr")) },
    { label: "Durabilité", href: withPageTopAnchor(buildSustainabilityPath("fr")) },
  ],
  pt: [
    { label: "Produtos", href: withPageTopAnchor(buildProductsPath("pt")) },
    { label: "Logística", href: withPageTopAnchor(buildLogisticsPath("pt")) },
    { label: "Financiamento", href: withPageTopAnchor(buildFinancingPath("pt")) },
    { label: "Sustentabilidade", href: withPageTopAnchor(buildSustainabilityPath("pt")) },
  ],
};

function normalizeSectionToken(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function resolveFooterSectionPath(sectionId: string, label: string, locale: AppLocale): string {
  const section = normalizeSectionToken(sectionId || label);

  if (["logistica", "logistics", "logistic", "distribucion"].includes(section)) {
    return buildLogisticsPath(locale);
  }
  if (["financing", "financiacion", "financement", "financiamento"].includes(section)) {
    return buildFinancingPath(locale);
  }
  if (["sostenibilidad", "durabilidad", "durability", "sustainability"].includes(section)) {
    return buildSustainabilityPath(locale);
  }
  if (["team", "equipo", "nosotros", "about", "sobre", "sobre nos", "a propos", "a-propos"].includes(section)) {
    return buildAboutPath(locale);
  }
  if (["contact", "contacto", "contato"].includes(section)) {
    return buildContactoPath(locale);
  }
  if (section) {
    return buildSectionPath(locale, section);
  }

  return buildProductsPath(locale);
}

function resolveFooterHref(item: NavItem, locale: AppLocale): string {
  if (item.kind === "products") return withPageTopAnchor(buildProductsPath(locale));
  if (item.kind === "logistics") return withPageTopAnchor(buildLogisticsPath(locale));
  if (item.kind === "external") {
    const href = typeof item.href === "string" ? item.href.trim() : "";
    if (href && href !== "#" && !href.startsWith("#") && href !== "/#") {
      return href;
    }
    return withPageTopAnchor(resolveFooterSectionPath(item.sectionId ?? "", item.label, locale));
  }
  if (item.kind === "section") {
    return withPageTopAnchor(resolveFooterSectionPath(item.sectionId ?? "", item.label, locale));
  }
  return withPageTopAnchor(resolveFooterSectionPath(item.sectionId ?? "", item.label, locale));
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
        ...fallbackLinks[locale],
      ];

  // Solo la columna de enlaces. La columna "Contacto" se renderiza aparte
  // porque el email usa un botón de copiar (componente cliente), no un link.
  return [
    {
      heading: footerCopy[locale].links,
      links: footerLinks,
    },
  ];
}

function isExternalHref(href: string) {
  return href.startsWith("mailto:") || href.startsWith("http://") || href.startsWith("https://");
}

export function SiteFooter({ locale, settings: cmsSettings }: Props) {
  const copy = footerCopy[locale];
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
              {copy.contact}
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
            © {currentYear} · Atalant · {copy.allRights}
          </p>

          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/55"
          >
            <Link href={buildPrivacyPath(locale)} className="transition-opacity hover:opacity-70">
              {copy.privacy}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={buildCookiesPath(locale)} className="transition-opacity hover:opacity-70">
              {copy.cookies}
            </Link>
            <span aria-hidden="true">·</span>
            <Link href={buildLegalNoticePath(locale)} className="transition-opacity hover:opacity-70">
              {copy.legal}
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
