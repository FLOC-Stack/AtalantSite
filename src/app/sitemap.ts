import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { getPublishedFamilySitemapEntries } from "@/lib/payload-data";
import {
  buildFamilyPath,
  buildCookiesPath,
  buildLegalNoticePath,
  buildLocalePath,
  buildPrivacyPath,
  buildProductsPath,
  buildSustainabilityPath,
} from "@/lib/routes";
import { getServerURL } from "@/lib/server-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getServerURL();

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const families = await getPublishedFamilySitemapEntries(locale);

    routes.push({
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: `${baseURL}${buildLocalePath(locale)}`,
    });

    routes.push({
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 0.8,
      url: `${baseURL}${buildProductsPath(locale)}`,
    });

    routes.push({
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.7,
      url: `${baseURL}${buildSustainabilityPath(locale)}`,
    });

    for (const legalPath of [
      buildPrivacyPath(locale),
      buildCookiesPath(locale),
      buildLegalNoticePath(locale),
    ]) {
      routes.push({
        changeFrequency: "yearly",
        lastModified: new Date(),
        priority: 0.3,
        url: `${baseURL}${legalPath}`,
      });
    }

    for (const family of families) {
      routes.push({
        changeFrequency: "weekly",
        lastModified: family.updatedAt,
        priority: 0.7,
        url: `${baseURL}${buildFamilyPath(locale, family.slug)}`,
      });
    }
  }

  return routes;
}
