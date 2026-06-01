import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { HomeProductsIntro } from "@/components/home-products-intro";
import { HomeLogistics } from "@/components/home-logistics";
import { HomeFinancing } from "@/components/home-financing";
import { HomeNews } from "@/components/home-news";
import { AtalantGlobe } from "@/components/atalant-globe";
import { FullpageScroll } from "@/components/fullpage-scroll";
import { getHomePage } from "@/lib/payload-data";
import type {
  HomeBlock,
  NewsBlock,
  ProductPreviewBlock,
  SectionBlock,
  StatsBlock,
} from "@/lib/content-types";
import { isLocale, type AppLocale } from "@/lib/locales";
import { buildContactoPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

function isStatsBlock(block: HomeBlock): block is StatsBlock {
  return block.type === "stats";
}

function isSectionBlock(block: HomeBlock): block is SectionBlock {
  return block.type === "section";
}

function isProductPreviewBlock(block: HomeBlock): block is ProductPreviewBlock {
  return block.type === "productPreview";
}

function isNewsBlock(block: HomeBlock): block is NewsBlock {
  return block.type === "news";
}

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as AppLocale;
  const productsHref = `/${typedLocale}/productos`;

  let heroProps;
  let statsProps;
  let productsBlock;
  let logisticsBlock;
  let financingBlock;
  let newsBlock;
  try {
    const page = await getHomePage(typedLocale);
    const statsBlock = page.blocks.find(isStatsBlock);
    productsBlock = page.blocks.find(isProductPreviewBlock);
    newsBlock = page.blocks.find(isNewsBlock);
    logisticsBlock = page.blocks.find(
      (block): block is SectionBlock => isSectionBlock(block) && block.anchorId === "logistics",
    );
    financingBlock = page.blocks.find(
      (block): block is SectionBlock => isSectionBlock(block) && block.anchorId === "financing",
    );
    heroProps = page.hero;
    statsProps = statsBlock?.stats;
  } catch {
    // Fallbacks del componente
  }

  return (
    <FullpageScroll>
      <Hero
        hero={heroProps}
        stats={statsProps}
        primaryHref={heroProps?.primaryHref ?? productsHref}
        secondaryHref={heroProps?.secondaryHref ?? buildContactoPath(typedLocale)}
      />
      <HomeProductsIntro
        locale={typedLocale}
        title={productsBlock?.title}
        body={productsBlock?.body}
        primaryCtaLabel={productsBlock?.ctaLabel}
        primaryCtaHref={productsBlock?.ctaHref ?? productsHref}
        videoSrc={productsBlock?.videoSrc ?? "/video-morp-atalant.mp4"}
        videoPoster={productsBlock?.videoPoster}
      />
      <HomeLogistics
        background={<AtalantGlobe style="dotted" />}
        title={logisticsBlock?.title}
        body={logisticsBlock?.body}
        ctaLabel={logisticsBlock?.ctaLabel}
        ctaHref={logisticsBlock?.ctaHref ?? `/${typedLocale}/logistica`}
      />
      <HomeFinancing
        locale={typedLocale}
        title={financingBlock?.title}
        body={financingBlock?.body}
        ctaLabel={financingBlock?.ctaLabel}
        ctaHref={financingBlock?.ctaHref}
      />
      <HomeNews
        title={newsBlock?.title}
        body={newsBlock?.body}
        sectionLabel={newsBlock?.sectionLabel}
        ctaLabel={newsBlock?.ctaLabel}
        items={newsBlock?.items}
      />
    </FullpageScroll>
  );
}
