import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { AppLocale } from "@/lib/locales";

export type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

type Props = {
  locale?: AppLocale;
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  sectionLabel?: string;
  ctaLabel?: string;
  items?: NewsItem[];
};

type NewsCopy = {
  indexLabel: string;
  counter: string;
  title: string;
  body: string;
  sectionLabel: string;
  ctaLabel: string;
  items: NewsItem[];
};

const LINKEDIN_URL = "https://www.linkedin.com/company/atalant-europe/";

const FALLBACK_NEWS_BY_LOCALE: Record<AppLocale, NewsCopy> = {
  es: {
    indexLabel: "N° 05 — COMUNICACIÓN / NOVEDADES",
    counter: "05 / 05",
    title: "Últimas\npublicaciones.",
    body: "Publicaciones recientes de Atalant. Novedades y contenidos editoriales.",
    sectionLabel: "PUBLICACIONES RECIENTES",
    ctaLabel: "Ver publicación",
    items: [
      {
        date: "25/06/2026",
        title: "New Atalant's website!",
        excerpt:
          "New website design to enhance the customer experience. Try to explore every corner",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-1.webp",
        imageAlt: "Atalant website",
      },
      {
        date: "25/03/2026",
        title: "XXVII Alicante's Employment Marathon",
        excerpt:
          "Connecting with talented students at the University of Alicante Employment Marathon",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-2.webp",
        imageAlt: "Alicante employment marathon",
      },
      {
        date: "12/02/2026",
        title: "Transportation update for a professional greener future",
        excerpt:
          "Atalant Europe expands its fleet with new trucks for efficient, reliable deliveries",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-3.webp",
        imageAlt: "Atalant greener fleet",
      },
    ],
  },
  en: {
    indexLabel: "NO. 05 — NEWS / UPDATES",
    counter: "05 / 05",
    title: "Latest\nupdates.",
    body: "Latest posts from Atalant with company news and editorial updates.",
    sectionLabel: "RECENT POSTS",
    ctaLabel: "Open publication",
    items: [
      {
        date: "APR 15, 2026",
        title: "New logistics routes across Europe",
        excerpt:
          "We increased operational capacity and strengthened coverage across key hubs.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-1.webp",
        imageAlt: "Atalant polymers",
      },
      {
        date: "APR 2, 2026",
        title: "Recycled materials sustainability update",
        excerpt:
          "We reinforce traceability and quality with advanced circularity standards.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-2.webp",
        imageAlt: "Atalant recycled materials",
      },
      {
        date: "MAR 20, 2026",
        title: "New technical resins supply agreement",
        excerpt:
          "Our technical polymers portfolio is supported by a more stable supply chain.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-3.webp",
        imageAlt: "Atalant technical polymers",
      },
    ],
  },
  pt: {
    indexLabel: "N° 05 — COMUNICAÇÃO / NOVAS",
    counter: "05 / 05",
    title: "Últimas\npublicações.",
    body: "Publicações recentes da Atalant: novidades e conteúdos editoriais.",
    sectionLabel: "PUBLICAÇÕES RECENTES",
    ctaLabel: "Ver publicação",
    items: [
      {
        date: "15 ABR 2026",
        title: "Novas rotas logísticas na Europa",
        excerpt: "Aumentámos a capacidade operacional e reforçámos a cobertura regional.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-1.webp",
        imageAlt: "Polímeros Atalant",
      },
      {
        date: "02 ABR 2026",
        title: "Avanço sustentável em reciclados",
        excerpt:
          "Consolidámos a rastreabilidade e a qualidade sob padrões europeus de circularidade.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-2.webp",
        imageAlt: "Reciclados Greenlant Atalant",
      },
      {
        date: "20 MAR 2026",
        title: "Acordo com novos fornecedores técnicos",
        excerpt:
          "Reforçámos a oferta de polímeros técnicos com uma cadeia de fornecimento mais estável.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-3.webp",
        imageAlt: "Polímeros técnicos Atalant",
      },
    ],
  },
  fr: {
    indexLabel: "N° 05 — COMMUNICATION / ACTUALITÉS",
    counter: "05 / 05",
    title: "Dernières\npublications.",
    body:
      "Publications récentes Atalant : actualités d'entreprise et contenus éditoriaux.",
    sectionLabel: "PUBLICATIONS RÉCENTES",
    ctaLabel: "Voir la publication",
    items: [
      {
        date: "15 AVR 2026",
        title: "Nouvelles routes logistiques en Europe",
        excerpt:
          "Nous avons renforcé la capacité opérationnelle et élargi la couverture en Europe.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-1.webp",
        imageAlt: "Polymères Atalant",
      },
      {
        date: "02 AVR 2026",
        title: "Avancée durable sur les matériaux recyclés",
        excerpt:
          "Nous consolidons la traçabilité et la qualité selon des standards européens.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-2.webp",
        imageAlt: "Matériaux recyclés Greenlant Atalant",
      },
      {
        date: "20 MARS 2026",
        title: "Nouveau partenariat avec fournisseurs techniques",
        excerpt:
          "Nous consolidons l'offre de polymères techniques avec une chaîne d'approvisionnement plus stable.",
        href: LINKEDIN_URL,
        image: "/imgsrc/atalant-post-3.webp",
        imageAlt: "Polymères techniques Atalant",
      },
    ],
  },
};

const LEGACY_NEWS_INDICATORS = {
  es: {
    title: "Últimas\npublicaciones.",
    body: "Publicaciones recientes de Atalant. Contenido editorial y novedades de compañía gestionadas desde CMS.",
    sectionLabel: "PUBLICACIONES RECIENTES",
    indexLabel: "N° 05 — COMUNICACIÓN / NOVEDADES",
    ctaLabel: "Ver publicación",
    itemTitles: [
      "Nuevo hub logístico en Países Bajos",
      "Greenlant alcanza certificación EuCertPlast",
      "Acuerdo con productor europeo de PP técnico",
    ],
  },
} as const;

function normalizeText(text?: string) {
  return (text ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isLegacyNewsCopy(
  locale: AppLocale,
  props: {
    indexLabel?: string;
    title?: string;
    body?: string;
    sectionLabel?: string;
    ctaLabel?: string;
    items?: NewsItem[];
  },
) {
  const localeLegacy = LEGACY_NEWS_INDICATORS[locale];
  if (!localeLegacy) return false;

  const title = normalizeText(props.title);
  const body = normalizeText(props.body);
  const sectionLabel = normalizeText(props.sectionLabel);
  const ctaLabel = normalizeText(props.ctaLabel);
  const indexLabel = normalizeText(props.indexLabel);

  if (body.includes("gestionadas desde cms")) return true;
  if (sectionLabel.includes("publicaciones recientes") && body.includes("contenido editorial")) {
    return true;
  }

  const legacyTitleHits = (props.items ?? []).filter((item) => {
    const titleNormalized = normalizeText(item.title);
    return localeLegacy.itemTitles.some((legacyTitle) => {
      const legacyTitleNormalized = normalizeText(legacyTitle);
      return titleNormalized.includes(legacyTitleNormalized) ||
        legacyTitleNormalized.includes(titleNormalized) ||
        titleNormalized.includes(legacyTitleNormalized.replace(/[^a-z ]/g, ""));
    });
  });

  return (
    title === normalizeText(localeLegacy.title) ||
    body === normalizeText(localeLegacy.body) ||
    sectionLabel === normalizeText(localeLegacy.sectionLabel) ||
    indexLabel === normalizeText(localeLegacy.indexLabel) ||
    ctaLabel === normalizeText(localeLegacy.ctaLabel) ||
    legacyTitleHits.length >= 2
  );
}

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function HomeNews({
  locale = "es",
  indexLabel,
  counter,
  title,
  body,
  sectionLabel,
  ctaLabel,
  items,
}: Props = {}) {
  const fallback = FALLBACK_NEWS_BY_LOCALE[locale];
  const useFallback =
    locale === "es" &&
    isLegacyNewsCopy(locale, {
      indexLabel,
      title,
      body,
      sectionLabel,
      ctaLabel,
      items,
    });
  const resolvedItems = useFallback
    ? fallback.items
    : items?.length
      ? items
      : fallback.items;
  const resolvedCounter = counter ?? fallback.counter;
  const displayIndexLabel = useFallback ? fallback.indexLabel : indexLabel ?? fallback.indexLabel;
  const displayTitle = useFallback ? fallback.title : title ?? fallback.title;
  const displayBody = useFallback ? fallback.body : body ?? fallback.body;
  const displaySectionLabel = useFallback
    ? fallback.sectionLabel
    : sectionLabel ?? fallback.sectionLabel;
  const displayCtaLabel = useFallback ? fallback.ctaLabel : ctaLabel ?? fallback.ctaLabel;

  return (
    <section
      aria-labelledby="home-news-title"
      className="relative flex min-h-svh snap-start flex-col bg-background text-foreground"
    >
      <div className="relative z-10 flex w-full flex-1 flex-col px-10 pt-28 pb-12 sm:px-14 sm:pt-36 sm:pb-14 lg:px-20 lg:pt-[136px] lg:pb-[80px]">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
            {displayIndexLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {resolvedCounter}
          </p>
        </div>
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="home-news-title"
            className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1] tracking-[-2px] text-foreground lg:tracking-[-3px]"
          >
            {renderMultiline(displayTitle)}
          </h2>
          <p className="max-w-[480px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[17px] lg:leading-[26px]">
            {displayBody}
          </p>
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="h-px w-full bg-foreground" aria-hidden="true" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {displaySectionLabel}
          </p>

            <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-x-10">
            {resolvedItems.map((item) => {
              const hasValidHref = item.href && item.href !== "#";

              return (
                <li key={item.title} className="group flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-foreground/5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[2px] text-muted-strong"
                        aria-hidden="true"
                      >
                        imagen
                      </div>
                    )}
                  </div>
                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                    {item.date}
                  </p>
                  <h3 className="mt-3 font-sans text-[22px] leading-[1.2] tracking-[-0.4px] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-muted-strong">
                    {item.excerpt}
                  </p>
                  {hasValidHref ? (
                    <div className="mt-5">
                      <Link
                        href={item.href}
                        className="group inline-flex items-center gap-2 border-b border-primary-dark pb-1 font-sans text-[14px] font-medium tracking-[0.2px] text-primary-dark transition-opacity hover:opacity-70"
                      >
                        {displayCtaLabel}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
