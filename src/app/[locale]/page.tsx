import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { HomeProductsIntro } from "@/components/home-products-intro";
import { HomeLogistics } from "@/components/home-logistics";
import { AtalantGlobe } from "@/components/atalant-globe";
import { FullpageScroll } from "@/components/fullpage-scroll";
import { getHomePage } from "@/lib/payload-data";
import { isLocale, type AppLocale } from "@/lib/locales";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleHomePage({ params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as AppLocale;
  const productsHref = `/${typedLocale}/productos`;

  let heroProps;
  let statsProps;
  try {
    const page = await getHomePage(typedLocale);
    const statsBlock = page.blocks.find((block) => block.type === "stats");
    heroProps = page.hero;
    statsProps = statsBlock?.stats;
  } catch {
    // Fallbacks del componente
  }

  return (
    <>
      <FullpageScroll />
      <Hero hero={heroProps} stats={statsProps} primaryHref={productsHref} />
      <HomeProductsIntro
        locale={typedLocale}
        ctaHref={productsHref}
        videoSrc="/Morphing%20Figures%20Animation.mp4"
      />
      <HomeLogistics background={<AtalantGlobe style="dotted" />} />
    </>
  );
}
