import config from "../src/payload.config";
import type { HomeBlock } from "../src/lib/content-types";
import { fallbackFamilies, fallbackHomePages, fallbackSiteSettings } from "../src/lib/fallback-content";
import { locales, type AppLocale } from "../src/lib/locales";
import { getPayload } from "payload";

function serializeBlocks(blocks: HomeBlock[]) {
  return blocks.map((block) => {
    if (block.type === "stats") {
      return {
        anchorId: block.anchorId,
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
        anchorId: block.anchorId,
        blockType: "section" as const,
        body: block.body,
        eyebrow: block.eyebrow,
        title: block.title,
      };
    }

    if (block.type === "productPreview") {
      return {
        anchorId: block.anchorId,
        blockType: "productPreview" as const,
        body: block.body,
        ctaLabel: block.ctaLabel,
        eyebrow: block.eyebrow,
        title: block.title,
      };
    }

    return {
      anchorId: block.anchorId,
      blockType: "contact" as const,
      body: block.body,
      eyebrow: block.eyebrow,
      note: block.note,
      submitLabel: block.submitLabel,
      title: block.title,
    };
  });
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
    hero: data.hero,
    layoutBlocks: serializeBlocks(data.blocks),
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
    locale,
  });
}

async function seedFamilies(locale: AppLocale) {
  const payload = await getPayload({ config });

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
      excerpt: family.excerpt,
      featured: family.featured,
      order: fallbackFamilies[locale].findIndex((entry) => entry.code === family.code) + 1,
      recycled: family.recycled,
      seo: family.seo,
      slug: family.slug,
      title: family.title,
      variants: family.variants.map((value) => ({ value })),
    };

    if (existing.docs[0]) {
      await payload.update({
        collection: "productFamilies",
        data,
        id: existing.docs[0].id,
        locale,
      });
      continue;
    }

    await payload.create({
      collection: "productFamilies",
      data,
      locale,
    });
  }
}

async function run() {
  for (const locale of locales) {
    await seedSiteSettings(locale);
    await seedHomePage(locale);
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
