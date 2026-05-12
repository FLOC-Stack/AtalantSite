import type { AppLocale } from "@/lib/locales";
import { getProductSegment, isLocale, locales, productSegments } from "@/lib/locales";

export function buildLocalePath(locale: AppLocale) {
  return `/${locale}`;
}

export function buildProductsPath(locale: AppLocale) {
  return `/${locale}/${getProductSegment(locale)}`;
}

export function buildLogisticsPath(locale: AppLocale) {
  return `/${locale}/logistica`;
}

export function buildAboutPath(locale: AppLocale) {
  return `/${locale}/nosotros`;
}

export function buildSustainabilityPath(locale: AppLocale) {
  return `/${locale}/sostenibilidad`;
}

export function buildPrivacyPath(locale: AppLocale) {
  return `/${locale}/privacidad`;
}

export function buildCookiesPath(locale: AppLocale) {
  return `/${locale}/cookies`;
}

export function buildLegalNoticePath(locale: AppLocale) {
  return `/${locale}/aviso-legal`;
}

export function buildFamilyPath(locale: AppLocale, slug: string) {
  return `${buildProductsPath(locale)}/${slug}`;
}

export function buildSectionPath(locale: AppLocale, sectionId: string) {
  return `${buildLocalePath(locale)}#${sectionId}`;
}

export function switchLocalePath(pathname: string, nextLocale: AppLocale) {
  const segments = pathname.split("/").filter(Boolean);

  if (!segments.length) {
    return buildLocalePath(nextLocale);
  }

  if (!isLocale(segments[0])) {
    return buildLocalePath(nextLocale);
  }

  const [, maybeSegment, maybeSlug] = segments;
  const nextSegments: string[] = [nextLocale];

  if (maybeSegment) {
    const isProductPath = locales.some(
      (locale) => productSegments[locale] === maybeSegment,
    );

    if (isProductPath) {
      nextSegments.push(getProductSegment(nextLocale));
      if (maybeSlug) nextSegments.push(maybeSlug);
      return `/${nextSegments.join("/")}`;
    }

    if (maybeSegment === "sostenibilidad") {
      nextSegments.push("sostenibilidad");
      return `/${nextSegments.join("/")}`;
    }

    if (maybeSegment === "nosotros") {
      nextSegments.push("nosotros");
      return `/${nextSegments.join("/")}`;
    }

    if (["privacidad", "cookies", "aviso-legal"].includes(maybeSegment)) {
      nextSegments.push(maybeSegment);
      return `/${nextSegments.join("/")}`;
    }
  }

  return `/${nextSegments.join("/")}`;
}
