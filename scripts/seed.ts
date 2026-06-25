import { CONTACTO_COPY } from "../src/components/contacto-page";
import { FINANCIACION_COPY } from "../src/components/financiacion-page";
import { LEGAL_COPY } from "../src/components/legal-page";
import { LOGISTICA_COPY } from "../src/components/logistica-page";
import { NOSOTROS_COPY } from "../src/components/nosotros-page";
import { SUSTAINABILITY_COPY } from "../src/components/sustainability-page";
import type { HomeBlock, LegalPageKind, NewsBlock } from "../src/lib/content-types";
import { fallbackFamilies, fallbackHomePages, fallbackSiteSettings } from "../src/lib/fallback-content";
import { catalogCopy } from "../src/lib/catalog-copy";
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

const productHeroMediaByCode: Partial<Record<string, string>> = {
  eva: "3d-product-EVA.webp",
  pe: "3d-product-PE.webp",
  pet: "3d-product-PET.webp",
  pp: "3d-product-PP.webp",
  ps: "3d-product-PS.webp",
  pvc: "3d-product-PVC.webp",
  recycled: "3d-product-RE.webp",
};

const productHeroMediaFilenames = Object.values(productHeroMediaByCode).filter(
  (filename): filename is string => Boolean(filename),
);

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
    nosotrosChapter3Image: "atalant-industrial-logistics.webp",
    nosotrosHeroImage: "atalant-about-hero.webp",
  },
  sostenibilidad: {
    sustainabilitySystemsVideo: "Truck Coastal Cinematic.mp4",
  },
};

const homeNewsBlock: Record<AppLocale, Omit<NewsBlock, "type">> = {
  en: {
    anchorId: "news",
    body: "Latest posts from Atalant with company news and editorial updates.",
    ctaLabel: "Open publication",
    eyebrow: "LinkedIn",
    items: [
      {
        date: "APR 15, 2026",
        excerpt: "We increased operational capacity and strengthened coverage across key hubs.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Atalant polymers",
        title: "New logistics routes across Europe",
      },
      {
        date: "APR 2, 2026",
        excerpt:
          "We reinforce traceability and quality with advanced circularity standards.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Atalant recycled materials",
        title: "Recycled materials sustainability update",
      },
      {
        date: "MAR 20, 2026",
        excerpt:
          "Our technical polymers portfolio is supported by a more stable supply chain.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Atalant technical polymers",
        title: "New technical resins supply agreement",
      },
    ],
    sectionLabel: "RECENT POSTS",
    title: "Latest\nupdates.",
  },
  es: {
    anchorId: "news",
    body:
      "Publicaciones recientes de Atalant. Novedades y contenidos editoriales.",
    ctaLabel: "Ver publicación",
    eyebrow: "LinkedIn",
    items: [
      {
        date: "25/06/2026",
        excerpt:
          "Nuevo diseño de sitio web para mejorar la experiencia de compra. Explora cada rincón",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Atalant website",
        title: "¡Nuevo sitio web de Atalant!",
      },
      {
        date: "25/03/2026",
        excerpt:
          "Conexión con estudiantes y talento en el Maratón de Empleo de la Universidad de Alicante",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Alicante employment marathon",
        title: "XXVII Maratón de Empleo de Alicante",
      },
      {
        date: "12/02/2026",
        excerpt:
          "Atalant Europe amplía su flota con nuevos camiones para entregas más eficientes y seguras",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Atalant greener fleet",
        title: "Actualización de transporte para un futuro más verde",
      },
    ],
    sectionLabel: "PUBLICACIONES RECIENTES",
    title: "Últimas\npublicaciones.",
  },
  fr: {
    anchorId: "news",
    body:
      "Publications récentes Atalant : actualités d'entreprise et contenus éditoriaux.",
    ctaLabel: "Voir la publication",
    eyebrow: "LinkedIn",
    items: [
      {
        date: "15 AVR 2026",
        excerpt:
          "Nous avons renforcé la capacité opérationnelle et élargi la couverture en Europe.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Polymères Atalant",
        title: "Nouvelles routes logistiques en Europe",
      },
      {
        date: "02 AVR 2026",
        excerpt:
          "Nous consolidons la traçabilité et la qualité selon des standards européens.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Matériaux recyclés Greenlant Atalant",
        title: "Avancée durable sur les matériaux recyclés",
      },
      {
        date: "20 MARS 2026",
        excerpt:
          "Nous consolidons l'offre de polymères techniques avec une chaîne d'approvisionnement plus stable.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Polymères techniques Atalant",
        title: "Nouveau partenariat avec fournisseurs techniques",
      },
    ],
    sectionLabel: "PUBLICATIONS RÉCENTES",
    title: "Dernières\npublications.",
  },
  pt: {
    anchorId: "news",
    body: "Publicações recentes da Atalant: novidades e conteúdos editoriais.",
    ctaLabel: "Ver publicação",
    eyebrow: "LinkedIn",
    items: [
      {
        date: "15 ABR 2026",
        excerpt:
          "Aumentámos a capacidade operacional e reforçámos a cobertura regional.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Polímeros Atalant",
        title: "Novas rotas logísticas na Europa",
      },
      {
        date: "02 ABR 2026",
        excerpt:
          "Consolidámos a rastreabilidade e a qualidade sob padrões europeus de circularidade.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Reciclados Greenlant Atalant",
        title: "Avanço sustentável em reciclados",
      },
      {
        date: "20 MAR 2026",
        excerpt:
          "Reforçámos a oferta de polímeros técnicos com uma cadeia de fornecimento mais estável.",
        href: "https://www.linkedin.com/company/atalant-europe/",
        imageAlt: "Polímeros técnicos Atalant",
        title: "Acordo com novos fornecedores técnicos",
      },
    ],
    sectionLabel: "PUBLICAÇÕES RECENTES",
    title: "Últimas\npublicações.",
  },
};

const homeNewsImageFilenames = [
  "atalant-post-1.webp",
  "atalant-post-2.webp",
  "atalant-post-3.webp",
];

const criticalMediaAssets = [
  ...productHeroMediaFilenames.map((filename) => ({
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

function serializeNewsBlock(mediaByFilename: Map<string | null | undefined, number>, locale: AppLocale) {
  const homeNewsBlockLocale = homeNewsBlock[locale];
  return {
    anchorId: homeNewsBlockLocale.anchorId,
    blockType: "news" as const,
    body: homeNewsBlockLocale.body,
    ctaLabel: homeNewsBlockLocale.ctaLabel,
    eyebrow: homeNewsBlockLocale.eyebrow,
    items: homeNewsBlockLocale.items.map((item, index) => ({
      date: item.date,
      excerpt: item.excerpt,
      href: item.href,
      image: mediaByFilename.get(homeNewsImageFilenames[index]),
      imageAlt: item.imageAlt,
      title: item.title,
    })),
    sectionLabel: homeNewsBlockLocale.sectionLabel,
    title: homeNewsBlockLocale.title,
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
      serializeNewsBlock(mediaByFilename, locale),
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
      en: {
        description:
          "Atalant internal credit system to strengthen and grow your business, with customers insured worldwide.",
        title: "Financing · Internal credit — Atalant",
      },
      es: {
        description:
          "Sistema de crédito interno de Atalant para reforzar y hacer crecer tu negocio, con clientes asegurados mundialmente.",
        title: "Financiación · Crédito interno — Atalant",
      },
      fr: {
        description:
          "Système de crédit interne d'Atalant pour renforcer et développer votre activité, avec des clients assurés dans le monde entier.",
        title: "Financement · Crédit interne — Atalant",
      },
      pt: {
        description:
          "Sistema de crédito interno da Atalant para reforçar e fazer crescer o seu negócio, com clientes assegurados a nível mundial.",
        title: "Financiamento · Crédito interno — Atalant",
      },
    },
  },
  logistica: {
    copy: LOGISTICA_COPY,
    pageType: "logistica",
    seo: {
      en: {
        description:
          "Atalant integrated logistics with its own fleet, full traceability, logistics centers, and main European hubs.",
        title: "Integrated logistics — Atalant",
      },
      es: {
        description:
          "Logística integrada de Atalant con flota propia, trazabilidad completa, centros logísticos y principales hubs europeos.",
        title: "Logística integrada — Atalant",
      },
      fr: {
        description:
          "Logistique intégrée d'Atalant avec flotte propre, traçabilité complète, centres logistiques et hubs européens principaux.",
        title: "Logistique intégrée — Atalant",
      },
      pt: {
        description:
          "Logística integrada da Atalant com frota própria, rastreabilidade completa, centros logísticos e principais hubs europeus.",
        title: "Logística integrada — Atalant",
      },
    },
  },
  nosotros: {
    copy: NOSOTROS_COPY,
    pageType: "nosotros",
    seo: {
      en: {
        description:
          "Thirty years connecting polymers and people. Atalant provides top-quality plastic raw materials with its own logistics network in Iberia and Europe.",
        title: "About · Strategic partner — Atalant",
      },
      es: {
        description:
          "Treinta años conectando polímeros y personas. Atalant ofrece materias primas plásticas de máxima calidad con red logística propia en Iberia y Europa.",
        title: "Nosotros · Socio estratégico — Atalant",
      },
      fr: {
        description:
          "Trente ans à relier polymères et personnes. Atalant fournit des matières premières plastiques de qualité maximale avec son propre réseau logistique en Ibérie et en Europe.",
        title: "À propos · Partenaire stratégique — Atalant",
      },
      pt: {
        description:
          "Trinta anos a unir polímeros e pessoas. A Atalant oferece matérias-primas plásticas de máxima qualidade com rede logística própria na Ibéria e na Europa.",
        title: "Sobre nós · Parceiro estratégico — Atalant",
      },
    },
  },
  sostenibilidad: {
    copy: SUSTAINABILITY_COPY,
    pageType: "sostenibilidad",
    seo: {
      en: {
        description:
          "Industrial sustainability at Atalant: ISO 14001, own energy generation through solar modules, electric silo trucks, and recycled materials.",
        title: "Industrial sustainability — Atalant",
      },
      es: {
        description:
          "Sostenibilidad industrial en Atalant: ISO 14001, generación de energía propia mediante módulos solares, silo trucks eléctricos y materiales reciclados.",
        title: "Sostenibilidad industrial — Atalant",
      },
      fr: {
        description:
          "Durabilité industrielle chez Atalant : ISO 14001, production d'énergie propre par modules solaires, silo trucks électriques et matériaux recyclés.",
        title: "Durabilité industrielle — Atalant",
      },
      pt: {
        description:
          "Sustentabilidade industrial na Atalant: ISO 14001, geração de energia própria através de módulos solares, silo trucks elétricos e materiais reciclados.",
        title: "Sustentabilidade industrial — Atalant",
      },
    },
  },
  productos: {
    copy: catalogCopy,
    pageType: "productos",
    seo: {
      en: {
        description: catalogCopy.en.morph.seoDescription,
        title: catalogCopy.en.morph.seoTitle,
      },
      es: {
        description: catalogCopy.es.morph.seoDescription,
        title: catalogCopy.es.morph.seoTitle,
      },
      fr: {
        description: catalogCopy.fr.morph.seoDescription,
        title: catalogCopy.fr.morph.seoTitle,
      },
      pt: {
        description: catalogCopy.pt.morph.seoDescription,
        title: catalogCopy.pt.morph.seoTitle,
      },
    },
  },
  contacto: {
    copy: CONTACTO_COPY,
    pageType: "contacto",
    seo: {
      en: {
        description:
          "Tell Atalant your polymer sourcing, financing, or logistics needs. The team responds in less than 24 working hours.",
        title: "Contact Atalant — Polymer sourcing and logistics",
      },
      es: {
        description:
          "Cuéntale a Atalant tus necesidades de polímeros, financiación o logística. El equipo responde en menos de 24 horas laborables.",
        title: "Contacto Atalant — Polímeros y logística",
      },
      fr: {
        description:
          "Présentez à Atalant vos besoins en polymères, financement ou logistique. L'équipe répond sous 24 heures ouvrables.",
        title: "Contact Atalant — Polymères et logistique",
      },
      pt: {
        description:
          "Indique à Atalant as suas necessidades de polímeros, financiamento ou logística. A equipa responde em menos de 24 horas úteis.",
        title: "Contacto Atalant — Polímeros e logística",
      },
    },
  },
} as const;

const legalPages: Record<
  "privacidad" | "cookies" | "aviso-legal",
  {
    kind: LegalPageKind;
    pageType: "privacidad" | "cookies" | "aviso-legal";
    seo: Record<AppLocale, { description: string; title: string }>;
  }
> = {
  privacidad: {
    kind: "privacy",
    pageType: "privacidad",
    seo: {
      en: {
        description: "Atalant privacy policy. Placeholder text pending legal review.",
        title: "Privacy — Atalant",
      },
      es: {
        description:
          "Política de privacidad de Atalant. Texto placeholder pendiente de revisión legal.",
        title: "Privacidad — Atalant",
      },
      fr: {
        description:
          "Politique de confidentialité d'Atalant. Texte placeholder en attente de révision juridique.",
        title: "Confidentialité — Atalant",
      },
      pt: {
        description:
          "Política de privacidade da Atalant. Texto placeholder pendente de revisão jurídica.",
        title: "Privacidade — Atalant",
      },
    },
  },
  cookies: {
    kind: "cookies",
    pageType: "cookies",
    seo: {
      en: {
        description: "Atalant cookie policy. Placeholder text pending legal review.",
        title: "Cookies — Atalant",
      },
      es: {
        description:
          "Política de cookies de Atalant. Texto placeholder pendiente de revisión legal.",
        title: "Cookies — Atalant",
      },
      fr: {
        description:
          "Politique de cookies d'Atalant. Texte placeholder en attente de révision juridique.",
        title: "Cookies — Atalant",
      },
      pt: {
        description:
          "Política de cookies da Atalant. Texto placeholder pendente de revisão jurídica.",
        title: "Cookies — Atalant",
      },
    },
  },
  "aviso-legal": {
    kind: "legal",
    pageType: "aviso-legal",
    seo: {
      en: {
        description: "Atalant legal notice. Placeholder text pending legal review.",
        title: "Legal notice — Atalant",
      },
      es: {
        description: "Aviso legal de Atalant. Texto placeholder pendiente de revisión legal.",
        title: "Aviso legal — Atalant",
      },
      fr: {
        description:
          "Mentions légales d'Atalant. Texte placeholder en attente de révision juridique.",
        title: "Mentions légales — Atalant",
      },
      pt: {
        description: "Aviso legal da Atalant. Texto placeholder pendente de revisão jurídica.",
        title: "Aviso legal — Atalant",
      },
    },
  },
};

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

    const localeCopy = page.copy[locale];
    const isCatalogPage = slug === "productos";
    const hero = isCatalogPage
      ? {
          body: catalogCopy[locale].morph.body,
          eyebrow: catalogCopy[locale].morph.eyebrow,
          headline: catalogCopy[locale].morph.title,
          primaryLabel: catalogCopy[locale].morph.characteristics,
          secondaryLabel: catalogCopy[locale].morph.recycled,
        }
      : {
          body: "heroBody" in localeCopy ? localeCopy.heroBody : "",
          eyebrow: "breadcrumb" in localeCopy ? localeCopy.breadcrumb : "",
          headline: "heroTitle" in localeCopy ? localeCopy.heroTitle : "",
          primaryLabel:
            "ctaAction" in localeCopy
              ? localeCopy.ctaAction
              : "dataEyebrow" in localeCopy
                ? localeCopy.dataEyebrow
                : "",
          secondaryLabel: "back" in localeCopy ? localeCopy.back : "",
        };

    const data = {
      _status: "published" as const,
      hero,
      pageData: isCatalogPage
        ? localeCopy
        : {
            ...localeCopy,
            backHref: `/${locale}`,
          },
      pageType: page.pageType,
      media: getStaticPageMedia(slug, mediaByFilename),
      seo: page.seo[locale],
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

  for (const [slug, page] of Object.entries(legalPages)) {
    const copy = LEGAL_COPY[locale][page.kind];
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
        body: copy.intro,
        eyebrow: copy.eyebrow,
        headline: copy.title,
        primaryLabel: copy.updated,
        secondaryLabel: copy.back,
      },
      pageData: copy,
      pageType: page.pageType,
      seo: page.seo[locale],
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
      detail: serializeProductDetail(productDetailData[locale][family.slug]),
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
