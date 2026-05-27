import config from "../src/payload.config";
import { FINANCIACION_COPY } from "../src/components/financiacion-page";
import { LOGISTICA_COPY } from "../src/components/logistica-page";
import { NOSOTROS_COPY } from "../src/components/nosotros-page";
import { SUSTAINABILITY_COPY } from "../src/components/sustainability-page";
import type { HomeBlock } from "../src/lib/content-types";
import { fallbackFamilies, fallbackHomePages, fallbackSiteSettings } from "../src/lib/fallback-content";
import { locales, type AppLocale } from "../src/lib/locales";
import {
  buildFinancingPath,
  buildLogisticsPath,
  buildProductsPath,
  buildSectionPath,
  buildSustainabilityPath,
} from "../src/lib/routes";
import { productDetailData, type ProductDetailData } from "../src/lib/product-detail-data";
import { getPayload } from "payload";

const homeSectionCtaLabels: Record<AppLocale, Record<string, string>> = {
  en: {
    financing: "Discover how",
    logistics: "See bonded warehouses",
    sustainability: "See sustainability",
  },
  es: {
    financing: "Descubre cómo",
    logistics: "Ver depósitos",
    sustainability: "Ver sostenibilidad",
  },
  fr: {
    financing: "Découvrir comment",
    logistics: "Voir les entrepôts",
    sustainability: "Voir la durabilité",
  },
  pt: {
    financing: "Descobrir como",
    logistics: "Ver depósitos",
    sustainability: "Ver sustentabilidade",
  },
};

const productHeroMediaByCode: Record<string, string> = {
  eva: "3d-product-EVA.webp",
  pe: "3d-product-PE.webp",
  pet: "3d-product-PET.webp",
  pp: "3d-product-PP.webp",
  ps: "3d-product-PS.webp",
  pvc: "3d-product-PVC.webp",
  recycled: "3d-product-RE.webp",
};

function serializeBlocks(blocks: HomeBlock[], locale: AppLocale) {
  return blocks.map((block) => {
    const common = {
      anchorId: block.anchorId,
      ctaHref: getHomeBlockHref(block, locale),
      ctaLabel: getHomeBlockCtaLabel(block, locale),
    };

    if (block.type === "stats") {
      return {
        ...common,
        blockType: "stats" as const,
        body: block.body,
        eyebrow: block.eyebrow,
        stats: block.stats.map((entry) => ({
          label: entry.label,
          value: entry.value,
        })),
        title: block.title,
      };
    }

    if (block.type === "section") {
      return {
        ...common,
        blockType: "section" as const,
        body: block.body,
        eyebrow: block.eyebrow,
        title: block.title,
      };
    }

    if (block.type === "productPreview") {
      return {
        ...common,
        blockType: "productPreview" as const,
        body: block.body,
        ctaLabel: block.ctaLabel,
        eyebrow: block.eyebrow,
        title: block.title,
      };
    }

    return {
      ...common,
      blockType: "contact" as const,
      body: block.body,
      eyebrow: block.eyebrow,
      note: block.note,
      submitLabel: block.submitLabel,
      title: block.title,
    };
  });
}

function getHomeBlockCtaLabel(block: HomeBlock, locale: AppLocale) {
  if (block.type === "productPreview") return block.ctaLabel;
  if (block.type === "contact") return block.submitLabel;
  if (block.type !== "section") return undefined;
  return homeSectionCtaLabels[locale][block.anchorId];
}

function getHomeBlockHref(block: HomeBlock, locale: AppLocale) {
  if (block.type === "productPreview") return buildProductsPath(locale);
  if (block.type === "contact") return buildSectionPath(locale, "contact");
  if (block.type !== "section") return undefined;
  if (block.anchorId === "logistics") return buildLogisticsPath(locale);
  if (block.anchorId === "financing") return buildFinancingPath(locale);
  if (block.anchorId === "sustainability") return buildSustainabilityPath(locale);
  return undefined;
}

function serializeProductDetail(detail: ProductDetailData | undefined) {
  if (!detail) return undefined;

  return {
    detailApplications: detail.applications.map((value) => ({ value })),
    footerQuestion: detail.footerQuestion,
    grades: detail.grades.map((grade) => ({
      application: grade.application,
      code: grade.code,
      denomination: grade.denomination,
      process: grade.process,
      spec: grade.spec,
    })),
    heroLines: detail.heroLines.map((value) => ({ value })),
    highlight: detail.highlight
      ? {
          body: detail.highlight.body,
          eyebrow: detail.highlight.eyebrow,
          stats: detail.highlight.stats.map((stat) => ({
            label: stat.label,
            value: stat.value,
          })),
          title: detail.highlight.title,
        }
      : undefined,
    intro: detail.intro,
    meta: detail.meta.map((entry) => ({
      label: entry.label,
      value: entry.value,
    })),
    tableTitle: detail.tableTitle,
  };
}

async function seedSiteSettings(locale: AppLocale) {
  const payload = await getPayload({ config });
  const data = fallbackSiteSettings[locale];

  await payload.updateGlobal({
    data,
    locale,
    slug: "siteSettings",
  });
}

async function seedHomePage(locale: AppLocale) {
  const payload = await getPayload({ config });
  const data = fallbackHomePages[locale];

  const existing = await payload.find({
    collection: "pages",
    limit: 1,
    locale,
    pagination: false,
    where: {
      slug: {
        equals: "home",
      },
    },
  });

  const pageData = {
    _status: "published" as const,
    hero: {
      ...data.hero,
      primaryHref: buildProductsPath(locale),
      secondaryHref: buildSectionPath(locale, "contact"),
    },
    layoutBlocks: serializeBlocks(data.blocks, locale),
    pageType: "home" as const,
    seo: data.seo,
    slug: "home",
  };

  if (existing.docs[0]) {
    await payload.update({
      collection: "pages",
      data: pageData,
      id: existing.docs[0].id,
      locale,
    });
    return;
  }

  await payload.create({
    collection: "pages",
    data: pageData,
    draft: false,
    locale,
  });
}

const staticPages = {
  financiacion: {
    copy: FINANCIACION_COPY,
    pageType: "financiacion",
    seo: {
      description:
        "Sistema de crédito interno de Atalant: financiación caso a caso para acompañar la producción de cada cliente y crecer de forma equilibrada.",
      title: "Financiación · Crédito interno — Atalant",
    },
  },
  logistica: {
    copy: LOGISTICA_COPY,
    pageType: "logistica",
    seo: {
      description:
        "Almacenes con estatus oficial de Depósito Aduanero en Valencia y Alicante, hubs de distribución en Italia y Países Bajos, exportación a Norte de África.",
      title: "Logística · Depósito Aduanero — Atalant",
    },
  },
  nosotros: {
    copy: NOSOTROS_COPY,
    pageType: "nosotros",
    seo: {
      description:
        "Treinta años conectando polímeros y personas. Atalant ofrece materias primas plásticas de máxima calidad con red logística propia en Iberia y Europa.",
      title: "Nosotros · Socio estratégico — Atalant",
    },
  },
  sostenibilidad: {
    copy: SUSTAINABILITY_COPY,
    pageType: "sostenibilidad",
    seo: {
      description:
        "Sostenibilidad industrial en Atalant: ISO 14001, gestión de residuos, materiales reciclados, energía solar, flota eficiente e I+D en hidrógeno verde.",
      title: "Sostenibilidad industrial — Atalant",
    },
  },
} as const;

async function seedStaticPages(locale: AppLocale) {
  const payload = await getPayload({ config });

  for (const [slug, page] of Object.entries(staticPages)) {
    const existing = await payload.find({
      collection: "pages",
      limit: 1,
      locale,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    const data = {
      _status: "published" as const,
      hero: {
        body: page.copy[locale].heroBody,
        eyebrow: page.copy[locale].breadcrumb,
        headline: page.copy[locale].heroTitle,
        primaryLabel:
          "ctaAction" in page.copy[locale]
            ? page.copy[locale].ctaAction
            : page.copy[locale].dataEyebrow,
        secondaryLabel: page.copy[locale].back,
      },
      pageData: {
        ...page.copy[locale],
        backHref: `/${locale}`,
      },
      pageType: page.pageType,
      seo: page.seo,
      slug,
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "pages",
        data,
        draft: false,
        id: existing.docs[0].id,
        locale,
      });
      continue;
    }

    await payload.create({
      collection: "pages",
      data,
      draft: false,
      locale,
    });
  }
}

async function seedFamilies(locale: AppLocale) {
  const payload = await getPayload({ config });
  const mediaResult = await payload.find({
    collection: "media",
    limit: 100,
    pagination: false,
  });
  const mediaByFilename = new Map(
    mediaResult.docs.map((media) => [media.filename, media.id]),
  );

  for (const family of fallbackFamilies[locale]) {
    const existing = await payload.find({
      collection: "productFamilies",
      limit: 1,
      locale,
      pagination: false,
      where: {
        code: {
          equals: family.code,
        },
      },
    });

    const data = {
      _status: "published" as const,
      applications: family.applications.map((value) => ({ value })),
      body: family.body,
      code: family.code,
      detail: serializeProductDetail(productDetailData[family.slug]),
      excerpt: family.excerpt,
      featured: family.featured,
      heroMedia: mediaByFilename.get(productHeroMediaByCode[family.code]),
      order: fallbackFamilies[locale].findIndex((entry) => entry.code === family.code) + 1,
      recycled: family.recycled,
      seo: family.seo,
      slug: family.slug,
      title: family.title,
      variants: family.variants.map((value) => ({ value })),
    };
    const payloadData = data as never;

    if (existing.docs[0]) {
      await payload.update({
        collection: "productFamilies",
        data: payloadData,
        id: existing.docs[0].id,
        locale,
      });
      continue;
    }

    await payload.create({
      collection: "productFamilies",
      data: payloadData,
      locale,
    });
  }
}

async function run() {
  for (const locale of locales) {
    await seedSiteSettings(locale);
    await seedHomePage(locale);
    await seedStaticPages(locale);
    await seedFamilies(locale);
  }
}

run()
  .then(() => {
    console.log("Seed completed.");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
