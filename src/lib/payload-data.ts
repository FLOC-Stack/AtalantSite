import configPromise from "@payload-config";
import { cache } from "react";
import type { FinanciacionCopy } from "@/components/financiacion-page";
import { FINANCIACION_COPY } from "@/components/financiacion-page";
import type { LogisticaCopy } from "@/components/logistica-page";
import { LOGISTICA_COPY } from "@/components/logistica-page";
import type { NosotrosCopy } from "@/components/nosotros-page";
import { NOSOTROS_COPY } from "@/components/nosotros-page";
import type { SustainabilityCopy } from "@/components/sustainability-page";
import { SUSTAINABILITY_COPY } from "@/components/sustainability-page";
import type {
  HomeBlock,
  HomePageData,
  NewsBlock,
  ProductPreviewBlock,
  ProductFamilyDetailData,
  ProductFamilyData,
  ProductFamilyMedia,
  SiteSettingsData,
} from "@/lib/content-types";
import { fallbackFamilies, fallbackHomePages, fallbackSiteSettings } from "@/lib/fallback-content";
import type { AppLocale } from "@/lib/locales";
import { productDetailData } from "@/lib/product-detail-data";
import { buildContactoPath } from "@/lib/routes";
import { getPayload } from "payload";

type PageDoc = {
  hero?: {
    body?: string | null;
    eyebrow?: string | null;
    headline?: string | null;
    primaryLabel?: string | null;
    primaryHref?: string | null;
    secondaryLabel?: string | null;
    secondaryHref?: string | null;
  };
  layoutBlocks?: Array<Record<string, unknown>>;
  media?: Record<string, unknown>;
  pageData?: unknown;
  seo?: {
    description?: string | null;
    title?: string | null;
  };
};

export type StaticPageSlug =
  | "financiacion"
  | "logistica"
  | "nosotros"
  | "sostenibilidad";

type StaticPageCopyMap = {
  financiacion: FinanciacionCopy;
  logistica: LogisticaCopy;
  nosotros: NosotrosCopy;
  sostenibilidad: SustainabilityCopy;
};

const staticPageFallbacks: {
  [Slug in StaticPageSlug]: Record<AppLocale, StaticPageCopyMap[Slug]>;
} = {
  financiacion: FINANCIACION_COPY,
  logistica: LOGISTICA_COPY,
  nosotros: NOSOTROS_COPY,
  sostenibilidad: SUSTAINABILITY_COPY,
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

function mapMediaUrl(value: unknown): string | undefined {
  const record = asRecord(value);
  return typeof record?.url === "string" ? record.url : undefined;
}

function mapMediaAlt(value: unknown): string | undefined {
  const record = asRecord(value);
  return typeof record?.alt === "string" ? record.alt : undefined;
}

function normalizeContactHref(href: string | undefined, locale: AppLocale) {
  if (!href) return href;
  return href.endsWith("#contact") ? buildContactoPath(locale) : href;
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
        (kind === "section" ||
          kind === "products" ||
          kind === "logistics" ||
          kind === "external") &&
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

function normalizeSimpleLinks(items: unknown): NonNullable<SiteSettingsData["socialLinks"]> {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      return typeof record.label === "string" && typeof record.href === "string"
        ? { href: record.href, label: record.label }
        : null;
    })
    .filter(Boolean) as NonNullable<SiteSettingsData["socialLinks"]>;
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
          ctaHref: typeof record.ctaHref === "string" ? record.ctaHref : undefined,
          ctaLabel: typeof record.ctaLabel === "string" ? record.ctaLabel : undefined,
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
          ctaHref: typeof record.ctaHref === "string" ? record.ctaHref : undefined,
          ctaLabel: typeof record.ctaLabel === "string" ? record.ctaLabel : undefined,
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
          ctaHref: typeof record.ctaHref === "string" ? record.ctaHref : undefined,
          eyebrow,
          title,
          type: "productPreview" as const,
          videoSrc: mapMediaUrl(record.video),
        };
      }

      if (blockType === "news") {
        const items = Array.isArray(record.items)
          ? record.items
              .map((entry) => {
                const item = asRecord(entry);
                if (
                  typeof item?.date === "string" &&
                  typeof item.title === "string" &&
                  typeof item.excerpt === "string" &&
                  typeof item.href === "string"
                ) {
                  return {
                    date: item.date,
                    excerpt: item.excerpt,
                    href: item.href,
                    image: mapMediaUrl(item.image),
                    imageAlt:
                      typeof item.imageAlt === "string"
                        ? item.imageAlt
                        : mapMediaAlt(item.image),
                    title: item.title,
                  };
                }

                return null;
              })
              .filter(Boolean)
          : [];

        return {
          anchorId,
          body: typeof record.body === "string" ? record.body : "",
          ctaLabel:
            typeof record.ctaLabel === "string" ? record.ctaLabel : "Leer noticia",
          eyebrow,
          items: items as NewsBlock["items"],
          sectionLabel:
            typeof record.sectionLabel === "string" ? record.sectionLabel : undefined,
          title,
          type: "news" as const,
        };
      }

      if (blockType === "contact") {
        return {
          anchorId,
          body: typeof record.body === "string" ? record.body : "",
          ctaHref: typeof record.ctaHref === "string" ? record.ctaHref : undefined,
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

function applyHomeMedia(blocks: HomeBlock[], media: Record<string, unknown> | null): HomeBlock[] {
  const homeProductsVideo = mapMediaUrl(media?.homeProductsVideo);
  if (!homeProductsVideo) return blocks;

  return blocks.map((block) => {
    if (block.type !== "productPreview") return block;
    return {
      ...block,
      videoSrc: block.videoSrc ?? homeProductsVideo,
    } satisfies ProductPreviewBlock;
  });
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
      headerCtaHref:
        typeof settings.headerCtaHref === "string"
          ? normalizeContactHref(settings.headerCtaHref, locale)
          : fallbackSiteSettings[locale].headerCtaHref,
      headerCtaLabel:
        typeof settings.headerCtaLabel === "string"
          ? settings.headerCtaLabel
          : fallbackSiteSettings[locale].headerCtaLabel,
      locale,
      navigation: normalizeNavItems(settings.navigation).length
        ? normalizeNavItems(settings.navigation)
        : fallbackSiteSettings[locale].navigation,
      phone:
        typeof settings.phone === "string"
          ? settings.phone
          : fallbackSiteSettings[locale].phone,
      socialLinks: normalizeSimpleLinks(settings.socialLinks).length
        ? normalizeSimpleLinks(settings.socialLinks)
        : fallbackSiteSettings[locale].socialLinks,
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
      depth: 1,
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

    const mappedBlocks = mapBlocks(page.layoutBlocks);
    const blocks = mappedBlocks.length
      ? applyHomeMedia(mappedBlocks, asRecord(page.media))
      : fallbackHomePages[locale].blocks;

    return {
      blocks,
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
        primaryHref:
          page.hero?.primaryHref ||
          fallbackHomePages[locale].hero.primaryHref,
        secondaryLabel:
          page.hero?.secondaryLabel ||
          fallbackHomePages[locale].hero.secondaryLabel,
        secondaryHref:
          normalizeContactHref(
            page.hero?.secondaryHref || fallbackHomePages[locale].hero.secondaryHref,
            locale,
          ),
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

export const getStaticPageCopy = cache(async function getStaticPageCopy<
  Slug extends StaticPageSlug,
>(slug: Slug, locale: AppLocale): Promise<StaticPageCopyMap[Slug]> {
  const fallback = staticPageFallbacks[slug][locale];

  if (!hasPayloadDatabase()) {
    return fallback;
  }

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "pages",
      depth: 1,
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

    const page = result.docs[0] as PageDoc | undefined;
    const pageData = asRecord(page?.pageData);
    const baseCopy = pageData
      ? ({ ...fallback, ...pageData } as StaticPageCopyMap[Slug])
      : fallback;
    const mediaOverrides = getStaticPageMediaOverrides(slug, asRecord(page?.media), baseCopy);

    return { ...baseCopy, ...mediaOverrides } as StaticPageCopyMap[Slug];
  } catch {
    return fallback;
  }
});

function getStaticPageMediaOverrides<Slug extends StaticPageSlug>(
  slug: Slug,
  media: Record<string, unknown> | null,
  fallback: StaticPageCopyMap[Slug],
): Record<string, unknown> {
  if (!media) return {};

  if (slug === "logistica") {
    const heroVideoSrc = mapMediaUrl(media.logisticaHeroVideo);
    return heroVideoSrc ? { heroVideoSrc } : {};
  }

  if (slug === "sostenibilidad") {
    const systemsVideoSrc = mapMediaUrl(media.sustainabilitySystemsVideo);
    return systemsVideoSrc ? { systemsVideoSrc } : {};
  }

  if (slug === "financiacion") {
    const heroImageSrc = mapMediaUrl(media.financiacionHeroImage);
    const heroImageAlt = mapMediaAlt(media.financiacionHeroImage);
    return heroImageSrc ? { heroImageAlt, heroImageSrc } : {};
  }

  if (slug === "nosotros") {
    const chapterMedia = [
      media.nosotrosChapter1Image,
      media.nosotrosChapter2Image,
      media.nosotrosChapter3Image,
    ];
    const chapters =
      "chapters" in fallback && Array.isArray(fallback.chapters)
        ? fallback.chapters.map((chapter, index) => {
            const imageSrc = mapMediaUrl(chapterMedia[index]);
            const imageAlt = mapMediaAlt(chapterMedia[index]);
            return imageSrc
              ? {
                  ...chapter,
                  image: {
                    ...chapter.image,
                    alt: imageAlt ?? chapter.image.alt,
                    src: imageSrc,
                  },
                }
              : chapter;
          })
        : undefined;
    const heroImageSrc = mapMediaUrl(media.nosotrosHeroImage);
    const heroImageAlt = mapMediaAlt(media.nosotrosHeroImage);

    return {
      ...(chapters ? { chapters } : {}),
      ...(heroImageSrc ? { heroImageAlt, heroImageSrc } : {}),
    };
  }

  return {};
}

function mapHeroMedia(value: unknown): ProductFamilyMedia | undefined {
  const record = asRecord(value);
  if (!record) return undefined;
  const url = typeof record.url === "string" ? record.url : null;
  if (!url) return undefined;
  const mimeType = typeof record.mimeType === "string" ? record.mimeType : "";
  const kind: ProductFamilyMedia["kind"] = mimeType.startsWith("video/")
    ? "video"
    : "image";
  const alt = typeof record.alt === "string" ? record.alt : undefined;
  return { url, kind, alt };
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((entry) => {
      const record = asRecord(entry);
      return typeof record?.value === "string" ? record.value : null;
    })
    .filter(Boolean) as string[];
}

function mapProductDetail(value: unknown): ProductFamilyDetailData | undefined {
  const detail = asRecord(value);
  if (!detail) return undefined;

  const heroLines = mapStringArray(detail.heroLines);
  const applications = mapStringArray(detail.detailApplications);
  const meta = Array.isArray(detail.meta)
    ? detail.meta
        .map((entry) => {
          const record = asRecord(entry);
          if (typeof record?.label === "string" && typeof record.value === "string") {
            return { label: record.label, value: record.value };
          }
          return null;
        })
        .filter(Boolean)
    : [];
  const grades = Array.isArray(detail.grades)
    ? detail.grades
        .map((entry) => {
          const record = asRecord(entry);
          if (
            typeof record?.code === "string" &&
            typeof record.denomination === "string" &&
            typeof record.spec === "string" &&
            typeof record.application === "string" &&
            typeof record.process === "string"
          ) {
            return {
              application: record.application,
              code: record.code,
              denomination: record.denomination,
              process: record.process,
              spec: record.spec,
            };
          }
          return null;
        })
        .filter(Boolean)
    : [];

  if (
    !heroLines.length ||
    !applications.length ||
    !meta.length ||
    !grades.length ||
    typeof detail.intro !== "string" ||
    typeof detail.tableTitle !== "string" ||
    typeof detail.footerQuestion !== "string"
  ) {
    return undefined;
  }

  const highlightRecord = asRecord(detail.highlight);
  const highlightStats = Array.isArray(highlightRecord?.stats)
    ? highlightRecord.stats
        .map((entry) => {
          const record = asRecord(entry);
          if (typeof record?.value === "string" && typeof record.label === "string") {
            return { value: record.value, label: record.label };
          }
          return null;
        })
        .filter(Boolean)
    : [];
  const highlight =
    typeof highlightRecord?.eyebrow === "string" &&
    typeof highlightRecord.title === "string" &&
    typeof highlightRecord.body === "string" &&
    highlightStats.length
      ? {
          body: highlightRecord.body,
          eyebrow: highlightRecord.eyebrow,
          stats: highlightStats as Array<{ value: string; label: string }>,
          title: highlightRecord.title,
        }
      : undefined;

  return {
    applications,
    footerQuestion: detail.footerQuestion,
    grades: grades as ProductFamilyDetailData["grades"],
    heroLines,
    highlight,
    intro: detail.intro,
    meta: meta as ProductFamilyDetailData["meta"],
    tableTitle: detail.tableTitle,
  };
}

function mapFamily(locale: AppLocale, doc: Record<string, unknown>): ProductFamilyData | null {
  if (typeof doc.code !== "string" || typeof doc.slug !== "string") {
    return null;
  }

  const seo = asRecord(doc.seo);
  const heroMedia = mapHeroMedia(doc.heroMedia);

  const variants = mapStringArray(doc.variants);
  const applications = mapStringArray(doc.applications);
  const fallbackDetail = productDetailData[doc.slug];

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
    detail: mapProductDetail(doc.detail) ?? fallbackDetail,
    heroMedia,
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
      depth: 2,
      draft: false,
      limit: 100,
      locale,
      pagination: false,
      sort: "order",
    });

    const docs = result.docs
      .map((doc) => mapFamily(locale, doc as unknown as Record<string, unknown>))
      .filter(Boolean) as ProductFamilyData[];

    if (!docs.length) {
      return fallbackFamilies[locale];
    }

    const docsBySlug = new Map(docs.map((family) => [family.slug, family]));
    const orderedKnownFamilies = fallbackFamilies[locale].map(
      (family) => docsBySlug.get(family.slug) ?? family,
    );
    const extraFamilies = docs.filter(
      (family) => !fallbackFamilies[locale].some((fallback) => fallback.slug === family.slug),
    );

    return [...orderedKnownFamilies, ...extraFamilies];
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
      depth: 2,
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
