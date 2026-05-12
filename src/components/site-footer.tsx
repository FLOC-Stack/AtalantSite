import Link from "next/link";
import { locales, type AppLocale } from "@/lib/locales";
import {
  buildCookiesPath,
  buildFinancingPath,
  buildLegalNoticePath,
  buildLocalePath,
  buildPrivacyPath,
  buildProductsPath,
  buildSustainabilityPath,
} from "@/lib/routes";

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
};

const localeShort: Record<AppLocale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
  fr: "FR",
};

function getColumns(locale: AppLocale): FooterColumn[] {
  const home = buildLocalePath(locale);
  const products = buildProductsPath(locale);
  const sustainability = buildSustainabilityPath(locale);
  const financing = buildFinancingPath(locale);

  return [
    {
      heading: "Soluciones",
      links: [
        { label: "Productos", href: products },
        { label: "Logística", href: `${home}#logistica` },
        { label: "Financiación", href: financing },
        { label: "Sostenibilidad", href: sustainability },
      ],
    },
    {
      heading: "Empresa",
      links: [
        { label: "Equipo", href: `${home}#equipo` },
        { label: "Principios de trabajo", href: `${home}#principios` },
        { label: "Evolución", href: `${home}#evolucion` },
      ],
    },
    {
      heading: "Contacto",
      links: [
        { label: "info@atalant.com", href: "mailto:info@atalant.com" },
        { label: "logistics@atalant.com", href: "mailto:logistics@atalant.com" },
        { label: "marketing@atalant.com", href: "mailto:marketing@atalant.com" },
        { label: "job@atalant.com", href: "mailto:job@atalant.com" },
      ],
    },
  ];
}

export function SiteFooter({ locale }: Props) {
  const columns = getColumns(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary text-white">
      <div className="px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-20 lg:py-20">
        {/* Display title */}
        <h2 className="font-sans font-light leading-[0.95] tracking-tight text-white text-[clamp(2.5rem,11vw,10rem)] sm:leading-[0.95] lg:tracking-[-5.5px]">
          Made for responding.
        </h2>

        <div className="mt-12 h-px w-full bg-white/20 sm:mt-16 lg:mt-20" aria-hidden="true" />

        {/* Columns grid */}
        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-12 lg:mt-10 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-14">
          {/* Atalant — info block */}
          <div className="flex flex-col">
            <p className="font-mono text-[10px] uppercase tracking-[2px] text-white/55">
              Atalant
            </p>
            <p className="mt-7 font-sans text-lg font-light leading-[1.4] tracking-[-0.3px] text-white/90 sm:text-xl sm:leading-[1.4]">
              Distribución europea
              <br />
              de polímeros desde 1997.
            </p>
            <address className="mt-6 flex flex-col gap-1 font-mono text-[12px] not-italic leading-[1.5] tracking-[0.2px] text-white/55">
              <span>+34 965 661 828</span>
              <span>Avda. de la Industria, 13–15</span>
              <span>Pol. Ind. Canastell · Alicante</span>
              <span>España</span>
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
                  const isExternal = link.href.startsWith("mailto:");

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
            <a
              href="https://www.linkedin.com/company/atalant-europe/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="mx-1 text-white/30">/</span>
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
