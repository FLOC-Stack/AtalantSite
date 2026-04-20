import configPromise from "@payload-config";
import { cache } from "react";
import type {
  HomeBlock,
  HomePageData,
  ProductFamilyData,
  SiteSettingsData,
} from "@/lib/content-types";
import { fallbackFamilies, fallbackHomePages, fallbackSiteSettings } from "@/lib/fallback-content";
import type { AppLocale } from "@/lib/locales";
import { getPayload } from "payload";

type PageDoc = {
  hero?: {
    body?: string | null;
    eyebrow?: string | null;
    headline?: string | null;
    primaryLabel?: string | null;
    secondaryLabel?: string | null;
  };
  layoutBlocks?: Array<Record<string, unknown>>;
  seo?: {
    description?: string | null;
    title?: string | null;
  };
};

type ProductFamilySitemapEntry = {
  slug: string;
  updatedAt: Date;
};

function hasPayloadDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function normalizeNavItems(items: unknown): SiteSettingsData["navigation"] {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const kind = record.kind;
      const label = record.label;

      if (
        (kind === "section" || kind === "products" || kind === "external") &&
        typeof label === "string"
      ) {
        return {
          href: typeof record.href === "string" ? record.href : undefined,
          kind,
          label,
          sectionId:
            typeof record.sectionId === "string" ? record.sectionId : undefined,
        };
      }

      return null;
    })
    .filter(Boolean) as SiteSettingsData["navigation"];
}

function mapBlocks(blocks: unknown): HomeBlock[] {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .map((block) => {
      if (!block || typeof block !== "object") return null;
      const record = block as Record<string, unknown>;
      const blockType = record.blockType;
      const anchorId =
        typeof record.anchorId === "string" ? record.anchorId : undefined;
      const eyebrow =
        typeof record.eyebrow === "string" ? record.eyebrow : undefined;
      const title = typeof record.title === "string" ? record.title : undefined;

      if (!blockType || !anchorId || !eyebrow || !title) return null;

      if (blockType === "stats") {
        const stats = Array.isArray(record.stats)
          ? record.stats
              .map((entry) => {
                if (!entry || typeof entry !== "object") return null;
                const statsRecord = entry as Record<string, unknown>;
                if (
                  typeof statsRecord.label === "string" &&
                  typeof statsRecord.value === "string"
                ) {
                  return {
                    label: statsRecord.label,
                    value: statsRecord.value,
                  };
                }

                return null;
              })
              .filter(Boolean)
          : [];

        return {
          anchorId,
          body: typeof record.body === "string" ? record.body : "",
          eyebrow,
          stats,
          title,
          type: "stats" as const,
        };
      }

      if (blockType === "section") {
        return {
          anchorId,
          body: typeof record.body === "string" ? record.body : "",
          eyebrow,
          title,
          type: "section" as const,
        };
      }

      if (blockType === "productPreview") {
        return {
          anchorId,
          body: typeof record.body === "string" ? record.body : "",
          ctaLabel:
            typeof record.ctaLabel === "string" ? record.ctaLabel : "Explore",
          eyebrow,
          title,
          type: "productPreview" as const,
        };
      }

      if (blockType === "contact") {
        return {
          anchorId,
          body: typeof record.body === "string" ? record.body : "",
          eyebrow,
          note: typeof record.note === "string" ? record.note : "",
          submitLabel:
            typeof record.submitLabel === "string"
              ? record.submitLabel
              : "Send",
          title,
          type: "contact" as const,
        };
      }

      return null;
    })
    .filter(Boolean) as HomeBlock[];
}

const getPayloadClient = cache(async function getPayloadClient() {
  return getPayload({ config: configPromise });
});

export const getSiteSettings = cache(async function getSiteSettings(
  locale: AppLocale,
): Promise<SiteSettingsData> {
  if (!hasPayloadDatabase()) {
    return fallbackSiteSettings[locale];
  }

  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      locale,
      slug: "siteSettings",
    });

    if (!settings?.brandName) {
      return fallbackSiteSettings[locale];
    }

    return {
      address:
        typeof settings.address === "string"
          ? settings.address
          : fallbackSiteSettings[locale].address,
      brandName: settings.brandName,
      contactEmail:
        typeof settings.contactEmail === "string"
          ? settings.contactEmail
          : fallbackSiteSettings[locale].contactEmail,
      defaultSeo: {
        description:
          typeof settings.defaultSeo?.description === "string"
            ? settings.defaultSeo.description
            : fallbackSiteSettings[locale].defaultSeo.description,
        title:
          typeof settings.defaultSeo?.title === "string"
            ? settings.defaultSeo.title
            : fallbackSiteSettings[locale].defaultSeo.title,
      },
      footerLinks: normalizeNavItems(settings.footerLinks).length
        ? normalizeNavItems(settings.footerLinks)
        : fallbackSiteSettings[locale].footerLinks,
      footerText:
        typeof settings.footerText === "string"
          ? settings.footerText
          : fallbackSiteSettings[locale].footerText,
      locale,
      navigation: normalizeNavItems(settings.navigation).length
        ? normalizeNavItems(settings.navigation)
        : fallbackSiteSettings[locale].navigation,
      phone:
        typeof settings.phone === "string"
          ? settings.phone
          : fallbackSiteSettings[locale].phone,
      tagline:
        typeof settings.tagline === "string"
          ? settings.tagline
          : fallbackSiteSettings[locale].tagline,
    };
  } catch {
    return fallbackSiteSettings[locale];
  }
});

export const getHomePage = cache(async function getHomePage(
  locale: AppLocale,
): Promise<HomePageData> {
  if (!hasPayloadDatabase()) {
    return fallbackHomePages[locale];
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      draft: false,
      limit: 1,
      locale,
      pagination: false,
      where: {
        slug: {
          equals: "home",
        },
      },
    });

    const page = result.docs[0] as PageDoc | undefined;

    if (!page?.hero?.headline) {
      return fallbackHomePages[locale];
    }

    return {
      blocks: mapBlocks(page.layoutBlocks).length
        ? mapBlocks(page.layoutBlocks)
        : fallbackHomePages[locale].blocks,
      hero: {
        body:
          page.hero?.body ||
          fallbackHomePages[locale].hero.body,
        eyebrow:
          page.hero?.eyebrow ||
          fallbackHomePages[locale].hero.eyebrow,
        headline:
          page.hero?.headline ||
          fallbackHomePages[locale].hero.headline,
        primaryLabel:
          page.hero?.primaryLabel ||
          fallbackHomePages[locale].hero.primaryLabel,
        secondaryLabel:
          page.hero?.secondaryLabel ||
          fallbackHomePages[locale].hero.secondaryLabel,
      },
      locale,
      seo: {
        description:
          page.seo?.description ||
          fallbackHomePages[locale].seo.description,
        title: page.seo?.title || fallbackHomePages[locale].seo.title,
      },
    };
  } catch {
    return fallbackHomePages[locale];
  }
});

function mapFamily(locale: AppLocale, doc: Record<string, unknown>): ProductFamilyData | null {
  if (typeof doc.code !== "string" || typeof doc.slug !== "string") {
    return null;
  }

  const seo = asRecord(doc.seo);

  const variants = Array.isArray(doc.variants)
    ? doc.variants
        .map((entry) =>
          entry && typeof entry === "object" && typeof entry.value === "string"
            ? entry.value
            : null,
        )
        .filter(Boolean)
    : [];

  const applications = Array.isArray(doc.applications)
    ? doc.applications
        .map((entry) =>
          entry && typeof entry === "object" && typeof entry.value === "string"
            ? entry.value
            : null,
        )
        .filter(Boolean)
    : [];

  return {
    applications: applications as string[],
    body:
      typeof doc.body === "string"
        ? doc.body
        : "",
    code: doc.code,
    excerpt:
      typeof doc.excerpt === "string"
        ? doc.excerpt
        : "",
    featured: Boolean(doc.featured),
    locale,
    recycled: Boolean(doc.recycled),
    seo: {
      description: typeof seo?.description === "string" ? seo.description : "",
      title: typeof seo?.title === "string" ? seo.title : "",
    },
    slug: doc.slug,
    title:
      typeof doc.title === "string"
        ? doc.title
        : doc.code.toUpperCase(),
    variants: variants as string[],
  };
}

export const getProductFamilies = cache(async function getProductFamilies(
  locale: AppLocale,
): Promise<ProductFamilyData[]> {
  if (!hasPayloadDatabase()) {
    return fallbackFamilies[locale];
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "productFamilies",
      draft: false,
      limit: 100,
      locale,
      pagination: false,
      sort: "order",
    });

    const docs = result.docs
      .map((doc) => mapFamily(locale, doc as unknown as Record<string, unknown>))
      .filter(Boolean) as ProductFamilyData[];

    return docs.length ? docs : fallbackFamilies[locale];
  } catch {
    return fallbackFamilies[locale];
  }
});

export const getProductFamilyBySlug = cache(async function getProductFamilyBySlug(
  locale: AppLocale,
  slug: string,
): Promise<ProductFamilyData | null> {
  if (!hasPayloadDatabase()) {
    return fallbackFamilies[locale].find((family) => family.slug === slug) ?? null;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "productFamilies",
      draft: false,
      limit: 1,
      locale,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const doc = result.docs[0];
    if (!doc) {
      return fallbackFamilies[locale].find((family) => family.slug === slug) ?? null;
    }

    return mapFamily(locale, doc as unknown as Record<string, unknown>);
  } catch {
    return fallbackFamilies[locale].find((family) => family.slug === slug) ?? null;
  }
});

export const getPublishedFamilySitemapEntries = cache(async function getPublishedFamilySitemapEntries(
  locale: AppLocale,
): Promise<ProductFamilySitemapEntry[]> {
  if (!hasPayloadDatabase()) {
    return [];
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "productFamilies",
      draft: false,
      limit: 100,
      locale,
      pagination: false,
      sort: "order",
    });

    return result.docs
      .map((doc) => {
        const record = doc as unknown as Record<string, unknown>;
        if (typeof record.slug !== "string") {
          return null;
        }

        const updatedAt =
          typeof record.updatedAt === "string" ? new Date(record.updatedAt) : new Date();

        return {
          slug: record.slug,
          updatedAt,
        };
      })
      .filter(Boolean) as ProductFamilySitemapEntry[];
  } catch {
    return [];
  }
});
