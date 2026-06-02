import { FINANCIACION_COPY } from "../src/components/financiacion-page";
import { LOGISTICA_COPY } from "../src/components/logistica-page";
import { NOSOTROS_COPY } from "../src/components/nosotros-page";
import { SUSTAINABILITY_COPY } from "../src/components/sustainability-page";
import type { HomeBlock, NewsBlock } from "../src/lib/content-types";
import { fallbackFamilies, fallbackHomePages, fallbackSiteSettings } from "../src/lib/fallback-content";
import { locales, type AppLocale } from "../src/lib/locales";
import {
  buildContactoPath,
  buildFinancingPath,
  buildLogisticsPath,
  buildProductsPath,
  buildSustainabilityPath,
} from "../src/lib/routes";
import { productDetailData, type ProductDetailData } from "../src/lib/product-detail-data";
import nextEnv from "@next/env";
import fs from "node:fs";
import path from "node:path";
import { getPayload } from "payload";

type SeedPayload = Awaited<ReturnType<typeof getPayload>>;

let payloadClientPromise: Promise<SeedPayload> | undefined;

async function getSeedPayload() {
  if (!payloadClientPromise) {
    loadEnvConfig(process.cwd());
    const { default: config } = await import("../src/payload.config");
    payloadClientPromise = getPayload({ config });
  }

  return payloadClientPromise;
}

const { loadEnvConfig } = nextEnv;

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

const staticPageMediaBySlug: Record<string, Record<string, string>> = {
  financiacion: {
    financiacionHeroImage: "atalant-bg-financiacion.webp",
  },
  logistica: {
    logisticaHeroVideo: "Tanker Truck Aesthetic.mp4",
  },
  nosotros: {
    nosotrosChapter1Image: "atalant-about-1.webp",
    nosotrosChapter2Image: "atalant-about-2.webp",
    nosotrosChapter3Image: "atalant-about-3-v2.webp",
    nosotrosHeroImage: "atalant-about-hero.webp",
  },
  sostenibilidad: {
    sustainabilitySystemsVideo: "Truck Coastal Cinematic.mp4",
  },
};

const homeNewsBlock: Omit<NewsBlock, "type"> = {
  anchorId: "news",
  body:
    "Comunicaciones recientes, hitos y notas de prensa. Lo que cuenta y lo que se mueve en Atalant.",
  ctaLabel: "Leer noticia",
  eyebrow: "Comunicación",
  items: [
    {
      date: "15 ABR 2026",
      excerpt:
        "Ampliamos capacidad operativa y reducimos los tiempos de entrega en el norte de Europa.",
      href: "#",
      imageAlt: "Polímeros Atalant",
      title: "Nuevo hub logístico en Países Bajos",
    },
    {
      date: "02 ABR 2026",
      excerpt:
        "Nuestra línea de reciclados consolida su trazabilidad y calidad bajo estándar europeo.",
      href: "#",
      imageAlt: "Reciclados Greenlant Atalant",
      title: "Greenlant alcanza certificación EuCertPlast",
    },
    {
      date: "20 MAR 2026",
      excerpt:
        "Reforzamos la oferta de polímeros técnicos con un nuevo contrato de suministro estable.",
      href: "#",
      imageAlt: "Polímeros técnicos Atalant",
      title: "Acuerdo con productor europeo de PP técnico",
    },
  ],
  sectionLabel: "ÚLTIMAS NOTICIAS",
  title: "Últimas\nnovedades.",
};

const homeNewsImageFilenames = [
  "atalant-post-1.webp",
  "atalant-post-2.webp",
  "atalant-post-3.webp",
];

const criticalMediaAssets = [
  ...Object.values(productHeroMediaByCode).map((filename) => ({
    alt: filename.replace(/\.webp$/i, "").replace(/-/g, " "),
    filename,
    path: `public/imgsrc/products/${filename}`,
  })),
  ...Object.values(staticPageMediaBySlug).flatMap((fields) =>
    Object.values(fields).map((filename) => ({
      alt: filename.replace(/\.[^.]+$/i, "").replace(/-/g, " "),
      filename,
      path: resolvePublicMediaPath(filename),
    })),
  ),
  ...homeNewsImageFilenames.map((filename) => ({
    alt: filename.replace(/\.webp$/i, "").replace(/-/g, " "),
    filename,
    path: `public/imgsrc/${filename}`,
  })),
  {
    alt: "video morp atalant",
    filename: "video-morp-atalant.mp4",
    path: "public/video-morp-atalant.mp4",
  },
] as const;

function resolvePublicMediaPath(filename: string) {
  const candidates = [
    `public/${filename}`,
    `public/imgsrc/${filename}`,
    `public/imgsrc/about/${filename}`,
    `public/imgsrc/financing/${filename}`,
    `public/imgsrc/products/${filename}`,
  ];

  return candidates.find((candidate) => fs.existsSync(path.resolve(candidate))) ?? candidates[0];
}

function compactMediaFields(
  fields: Record<string, number | undefined>,
): Record<string, number> {
  return Object.fromEntries(
    Object.entries(fields).filter((entry): entry is [string, number] =>
      entry[1] !== undefined,
    ),
  );
}

async function getMediaByFilename(payload: SeedPayload) {
  const mediaResult = await payload.find({
    collection: "media",
    limit: 100,
    pagination: false,
    sort: "-updatedAt",
  });

  const mediaByFilename = new Map<string | null | undefined, number>();
  for (const media of mediaResult.docs) {
    const criticalAsset = criticalMediaAssets.find((asset) => asset.alt === media.alt);
    if (criticalAsset && !mediaByFilename.has(criticalAsset.filename)) {
      mediaByFilename.set(criticalAsset.filename, media.id);
    }

    if (!mediaByFilename.has(media.filename)) {
      mediaByFilename.set(media.filename, media.id);
    }
  }

  return mediaByFilename;
}

async function ensureCriticalMedia(payload: SeedPayload) {
  const shouldReupload = process.env.REUPLOAD_CRITICAL_MEDIA === "true";
  if (
    shouldReupload &&
    !/^vercel_blob_rw_[a-z\d]+_[a-z\d]+$/i.test(process.env.BLOB_READ_WRITE_TOKEN ?? "")
  ) {
    throw new Error(
      "REUPLOAD_CRITICAL_MEDIA=true requires a valid exported BLOB_READ_WRITE_TOKEN",
    );
  }

  const mediaByFilename = await getMediaByFilename(payload);

  for (const asset of criticalMediaAssets) {
    const absolutePath = path.resolve(asset.path);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(`Critical media asset is missing on disk: ${asset.path}`);
    }

    if (mediaByFilename.has(asset.filename) && !shouldReupload) {
      continue;
    }

    await payload.create({
      collection: "media",
      data: {
        alt: asset.alt,
      },
      filePath: absolutePath,
    });

    console.log(
      `${shouldReupload ? "Re-uploaded" : "Uploaded"} media: ${asset.filename}`,
    );
  }
}

function getStaticPageMedia(slug: string, mediaByFilename: Map<string | null | undefined, number>) {
  const mediaFields = staticPageMediaBySlug[slug];
  if (!mediaFields) return {};

  return compactMediaFields(
    Object.fromEntries(
      Object.entries(mediaFields).map(([field, filename]) => [
        field,
        mediaByFilename.get(filename),
      ]),
    ),
  );
}

function serializeNewsBlock(mediaByFilename: Map<string | null | undefined, number>) {
  return {
    anchorId: homeNewsBlock.anchorId,
    blockType: "news" as const,
    body: homeNewsBlock.body,
    ctaLabel: homeNewsBlock.ctaLabel,
    eyebrow: homeNewsBlock.eyebrow,
    items: homeNewsBlock.items.map((item, index) => ({
      date: item.date,
      excerpt: item.excerpt,
      href: item.href,
      image: mediaByFilename.get(homeNewsImageFilenames[index]),
      imageAlt: item.imageAlt,
      title: item.title,
    })),
    sectionLabel: homeNewsBlock.sectionLabel,
    title: homeNewsBlock.title,
  };
}

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

    if (block.type === "news") {
      return {
        ...common,
        blockType: "news" as const,
        body: block.body,
        ctaLabel: block.ctaLabel,
        eyebrow: block.eyebrow,
        items: block.items.map((item) => ({
          date: item.date,
          excerpt: item.excerpt,
          href: item.href,
          imageAlt: item.imageAlt,
          title: item.title,
        })),
        sectionLabel: block.sectionLabel,
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
  if (block.type === "contact") return buildContactoPath(locale);
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
  const payload = await getSeedPayload();
  const data = fallbackSiteSettings[locale];

  await payload.updateGlobal({
    data,
    locale,
    slug: "siteSettings",
  });
}

async function seedHomePage(locale: AppLocale) {
  const payload = await getSeedPayload();
  const data = fallbackHomePages[locale];
  const mediaByFilename = await getMediaByFilename(payload);

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
      secondaryHref: buildContactoPath(locale),
    },
    layoutBlocks: [
      ...serializeBlocks(data.blocks, locale),
      serializeNewsBlock(mediaByFilename),
    ],
    media: compactMediaFields({
      homeProductsVideo: mediaByFilename.get("video-morp-atalant.mp4"),
    }),
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
  const payload = await getSeedPayload();
  const mediaByFilename = await getMediaByFilename(payload);

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
      media: getStaticPageMedia(slug, mediaByFilename),
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
  const payload = await getSeedPayload();
  const mediaByFilename = await getMediaByFilename(payload);

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
  const payload = await getSeedPayload();
  await ensureCriticalMedia(payload);

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
