import type { MetadataRoute } from "next";
import { fallbackFamilies } from "@/lib/fallback-content";
import { locales } from "@/lib/locales";
import { buildFamilyPath, buildLocalePath, buildProductsPath } from "@/lib/routes";
import { getServerURL } from "@/lib/server-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseURL = getServerURL();

  const routes: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
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

    for (const family of fallbackFamilies[locale]) {
      routes.push({
        changeFrequency: "weekly",
        lastModified: new Date(),
        priority: 0.7,
        url: `${baseURL}${buildFamilyPath(locale, family.slug)}`,
      });
    }
  }

  return routes;
}
