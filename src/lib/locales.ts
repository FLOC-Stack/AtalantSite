export const locales = ["es", "en", "pt", "fr"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "es";

export const productSegments: Record<AppLocale, string> = {
  en: "products",
  es: "productos",
  fr: "produits",
  pt: "produtos",
};

export const localeLabels: Record<AppLocale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
};

export function isLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}

export function getProductSegment(locale: AppLocale) {
  return productSegments[locale];
}
