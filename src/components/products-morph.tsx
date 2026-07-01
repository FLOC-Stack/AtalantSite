"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Recycle } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ResilientVideo } from "@/components/resilient-video";
import type { AppLocale } from "@/lib/locales";
import { getProductParticleShapeIndex } from "@/lib/product-particle-shapes";
import { ParticleMorph, type ParticleMorphHandle } from "./particle-morph";
import { buildFamilyPath } from "@/lib/routes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ProductsMorphItem = {
  code: string;
  name: string;
  description: string;
  variants?: string[];
  href?: string;
  recycled?: boolean;
  /** Imagen estática (fallback). Ignorada si hay `video`. */
  image?: string;
  /** Video (mp4/webm). Si existe, se reproduce autoplay/muted/loop. */
  video?: string;
};

export type ProductsMorphHero = {
  eyebrow: string;
  title: string;
  body: string;
};

type FallbackProduct = Omit<ProductsMorphItem, "href"> & { slug: string };
const FALLBACK_LOCALE: AppLocale = "es";

const FALLBACK_PRODUCTS: Record<AppLocale, FallbackProduct[]> = {
  es: [
    {
      code: "PE",
      slug: "pe",
      name: "Polietileno",
      description:
        "Resistencia química y procesabilidad para envase, tubería y film. Grados específicos para soplado, inyección y extrusión.",
      variants: ["HDPE", "LDPE", "LLDPE"],
      image: "/imgsrc/products/3d-product-PE.webp",
    },
    {
      code: "PP",
      slug: "pp",
      name: "Polipropileno",
      description:
        "Alta rigidez, estabilidad térmica y reciclabilidad para automoción, electrodomésticos y envase rígido.",
      variants: ["Homopolímero", "Random", "Impacto"],
      image: "/imgsrc/products/3d-product-PP.webp",
    },
    {
      code: "PVC",
      slug: "pvc",
      name: "Policloruro de vinilo",
      description:
        "Versatilidad rígida y flexible. Perfilería, conducciones, recubrimientos y construcción con aditivación a medida.",
      variants: ["Rígido", "Flexible", "Emulsión"],
      image: "/imgsrc/products/3d-product-PVC.webp",
    },
    {
      code: "EVA",
      slug: "eva",
      name: "Etileno acetato de vinilo",
      description:
        "Grados con diferentes MFI y contenido de acetato de vinilo para plantillas, láminas, films, calzado, adhesivos, automoción y construcción.",
      variants: ["Diferentes MFI", "Acetato de vinilo"],
      image: "/imgsrc/products/3d-product-EVA.webp",
    },
    {
      code: "PS",
      slug: "ps",
      name: "Poliestireno",
      description:
        "Transparencia y facilidad de termoconformado. Envase alimentario, electrodomésticos y aislamiento térmico.",
      variants: ["GPPS", "HIPS", "EPS"],
      image: "/imgsrc/products/3d-product-PS.webp",
    },
    {
      code: "PET",
      slug: "pet",
      name: "Polietilen tereftalato",
      description:
        "Barrera, transparencia y aptitud alimentaria. Grados soplado, inyección y fibra, incluyendo rPET certificado.",
      variants: ["Soplado", "Inyección", "Fibra", "rPET"],
      image: "/imgsrc/products/3d-product-PET.webp",
    },
  ],
  en: [
    {
      code: "PE",
      slug: "pe",
      name: "Polyethylene",
      description:
        "Chemical resistance and processability for packaging, piping and film. Specific grades for blow molding, injection and extrusion.",
      variants: ["HDPE", "LDPE", "LLDPE"],
      image: "/imgsrc/products/3d-product-PE.webp",
    },
    {
      code: "PP",
      slug: "pp",
      name: "Polypropylene",
      description:
        "High stiffness, thermal stability and recyclability for automotive, home appliances and rigid packaging.",
      variants: ["Homopolymer", "Random", "Impact"],
      image: "/imgsrc/products/3d-product-PP.webp",
    },
    {
      code: "PVC",
      slug: "pvc",
      name: "Polyvinyl chloride",
      description:
        "Rigid and flexible versatility. Profiles, piping, coatings and construction with custom additives.",
      variants: ["Rigid", "Flexible", "Emulsion"],
      image: "/imgsrc/products/3d-product-PVC.webp",
    },
    {
      code: "EVA",
      slug: "eva",
      name: "Ethylene vinyl acetate",
      description:
        "Grades with different MFI and vinyl acetate content for templates, films, sheets, footwear, adhesives, automotive and construction.",
      variants: ["Different MFI", "Vinyl acetate"],
      image: "/imgsrc/products/3d-product-EVA.webp",
    },
    {
      code: "PS",
      slug: "ps",
      name: "Polystyrene",
      description:
        "Transparency and easy thermoforming. Food packaging, home appliances and thermal insulation.",
      variants: ["GPPS", "HIPS", "EPS"],
      image: "/imgsrc/products/3d-product-PS.webp",
    },
    {
      code: "PET",
      slug: "pet",
      name: "Polyethylene terephthalate",
      description:
        "Barrier, transparency and food-grade suitability. Blow, injection and fiber grades, including certified rPET.",
      variants: ["Blow", "Injection", "Fiber", "rPET"],
      image: "/imgsrc/products/3d-product-PET.webp",
    },
  ],
  fr: [
    {
      code: "PE",
      slug: "pe",
      name: "Polyéthylène",
      description:
        "Résistance chimique et mise en œuvre pour l'emballage, la tuyauterie et les films. Grades dédiés au soufflage, injection et extrusion.",
      variants: ["HDPE", "LDPE", "LLDPE"],
      image: "/imgsrc/products/3d-product-PE.webp",
    },
    {
      code: "PP",
      slug: "pp",
      name: "Polypropylène",
      description:
        "Grande rigidité, stabilité thermique et recyclabilité pour l'automobile, les appareils ménagers et les emballages rigides.",
      variants: ["Homopolymère", "Random", "Impact"],
      image: "/imgsrc/products/3d-product-PP.webp",
    },
    {
      code: "PVC",
      slug: "pvc",
      name: "Polychlorure de vinyle",
      description:
        "Polyvalence rigide et flexible. Profilés, conduits, revêtements et construction avec aditifs sur mesure.",
      variants: ["Rigide", "Flexible", "Émulsion"],
      image: "/imgsrc/products/3d-product-PVC.webp",
    },
    {
      code: "EVA",
      slug: "eva",
      name: "Éthylène-acétate de vinyle",
      description:
        "Grades avec MFI différents et teneur en acétate de vinyle pour moules, films, semelles, adhésifs, automobile et construction.",
      variants: ["MFI différent", "Acétate de vinyle"],
      image: "/imgsrc/products/3d-product-EVA.webp",
    },
    {
      code: "PS",
      slug: "ps",
      name: "Polystyrène",
      description:
        "Transparence et thermoformage faciles. Emballages alimentaires, électroménager et isolation thermique.",
      variants: ["GPPS", "HIPS", "EPS"],
      image: "/imgsrc/products/3d-product-PS.webp",
    },
    {
      code: "PET",
      slug: "pet",
      name: "Polyéthylène téréphtalate",
      description:
        "Barrière, transparence et aptitude alimentaire. Grades de soufflage, d'injection et de fibre, y compris rPET certifié.",
      variants: ["Soufflage", "Injection", "Fibre", "rPET"],
      image: "/imgsrc/products/3d-product-PET.webp",
    },
  ],
  pt: [
    {
      code: "PE",
      slug: "pe",
      name: "Polietileno",
      description:
        "Resistência química e processabilidade para embalagem, tubagem e filme. Grades específicas para sopro, injeção e extrusão.",
      variants: ["HDPE", "LDPE", "LLDPE"],
      image: "/imgsrc/products/3d-product-PE.webp",
    },
    {
      code: "PP",
      slug: "pp",
      name: "Polipropileno",
      description:
        "Alta rigidez, estabilidade térmica e reciclabilidade para automóvel, eletrodomésticos e embalagens rígidas.",
      variants: ["Homopolímero", "Random", "Impacto"],
      image: "/imgsrc/products/3d-product-PP.webp",
    },
    {
      code: "PVC",
      slug: "pvc",
      name: "Cloreto de polivinilo",
      description:
        "Versatilidade rígida e flexível. Perfis, tubagens, revestimentos e construção com aditivação sob medida.",
      variants: ["Rígido", "Flexível", "Emulsão"],
      image: "/imgsrc/products/3d-product-PVC.webp",
    },
    {
      code: "EVA",
      slug: "eva",
      name: "Etileno acetato de vinilo",
      description:
        "Grades com diferentes MFI e teor de acetato de vinilo para moldes, folhas, filmes, calçado, adesivos, automóvel e construção.",
      variants: ["Diferentes MFI", "Acetato de vinilo"],
      image: "/imgsrc/products/3d-product-EVA.webp",
    },
    {
      code: "PS",
      slug: "ps",
      name: "Poliestireno",
      description:
        "Transparência e facilidade de termoconformação. Embalagens alimentares, eletrodomésticos e isolamento térmico.",
      variants: ["GPPS", "HIPS", "EPS"],
      image: "/imgsrc/products/3d-product-PS.webp",
    },
    {
      code: "PET",
      slug: "pet",
      name: "Polietileno tereftalato",
      description:
        "Barreira, transparência e aptidão alimentar. Grades de sopro, injeção e fibra, incluindo rPET certificado.",
      variants: ["Sopro", "Injeção", "Fibra", "rPET"],
      image: "/imgsrc/products/3d-product-PET.webp",
    },
  ],
};

const FALLBACK_HERO: ProductsMorphHero = {
  eyebrow: "Catálogo de producto",
  title: "Polímeros de alta calidad\npara tu producción.",
  body: "Descubre todas nuestras familias de productos y procesos de transformación. Stock permanente en Europa, trazabilidad por lote y asesoría técnica en cada aplicación.",
};

const HERO_BY_LOCALE: Record<AppLocale, ProductsMorphHero> = {
  en: {
    eyebrow: "Product catalog",
    title: "High-quality polymers\nfor your production.",
    body:
      "Explore all our product families and transformation processes. Permanent stock in Europe, batch traceability, and technical advice for every application.",
  },
  es: FALLBACK_HERO,
  fr: {
    eyebrow: "Catalogue produit",
    title: "Polymères de haute qualité\npour votre production.",
    body:
      "Découvrez toutes nos familles de produits et procédés de transformation. Stocks permanents en Europe, traçabilité par lot et conseils techniques pour chaque application.",
  },
  pt: {
    eyebrow: "Catálogo de produto",
    title: "Polímeros de alta qualidade\npara a sua produção.",
    body:
      "Descubra todas as nossas famílias de produtos e processos de transformação. Stock permanente na Europa, rastreabilidade por lote e assessoria técnica em cada aplicação.",
  },
};

const PRODUCT_MORPH_COPY: Record<AppLocale, { characteristics: string; recycled: string }> = {
  en: {
    characteristics: "View characteristics",
    recycled: "Recycled",
  },
  es: {
    characteristics: "Ver características",
    recycled: "Reciclado",
  },
  fr: {
    characteristics: "Voir caractéristiques",
    recycled: "Recyclé",
  },
  pt: {
    characteristics: "Ver características",
    recycled: "Reciclado",
  },
};

type Props = {
  copy?: { characteristics: string; recycled: string };
  products?: ProductsMorphItem[];
  hero?: ProductsMorphHero;
  locale?: AppLocale;
};

function renderMultiline(text: string) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 ? <br /> : null}
    </span>
  ));
}

const CODE_DISPLAY_OVERRIDES: Record<string, string> = { recycled: "REC" };

function displayCode(code: string): string {
  return CODE_DISPLAY_OVERRIDES[code.toLowerCase()] ?? code.toUpperCase();
}

type ProductImageRevealProps = {
  src?: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  mediaClassName?: string;
  animate?: boolean;
};

function ProductImageReveal({
  src,
  videoSrc,
  alt,
  className,
  mediaClassName = "object-cover",
  animate = true,
}: ProductImageRevealProps) {
  const imageSrc = src ?? "";
  const isVideo = Boolean(videoSrc);
  const hasMedia = Boolean(src || videoSrc);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      if (!animate) {
        gsap.set(root, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        gsap.set(root, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      // Initial state: oculta, encogida al 80% y desplazada 8px hacia abajo.
      gsap.set(root, { opacity: 0, scale: 0.8, y: 8 });

      const DURATION = 2.6;
      const fadeIn = () =>
        gsap.to(root, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: DURATION,
          ease: "power3.out",
          overwrite: true,
        });
      const fadeOutUp = () =>
        gsap.to(root, {
          opacity: 0,
          scale: 0.8,
          y: -8,
          duration: DURATION,
          ease: "power3.in",
          overwrite: true,
        });
      const fadeOutDown = () =>
        gsap.to(root, {
          opacity: 0,
          scale: 0.8,
          y: 8,
          duration: DURATION,
          ease: "power3.in",
          overwrite: true,
        });

      // Disparos cerca del centro del viewport (50%), no al asomar por el borde.
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 50%",
        end: "bottom 50%",
        onEnter: fadeIn, // top cruza el centro bajando → aparece creciendo
        onLeave: fadeOutUp, // bottom cruza el centro bajando → sale encogiendo hacia arriba
        onEnterBack: fadeIn, // bottom cruza el centro subiendo → aparece creciendo
        onLeaveBack: fadeOutDown, // top cruza el centro subiendo → sale encogiendo hacia abajo
      });

      // Si al montar ya estamos dentro del rango (deep link o recarga con scroll
      // persistido), deja la imagen visible de inmediato sin tween.
      if (trigger.progress > 0 && trigger.progress < 1) {
        gsap.set(root, { opacity: 1, scale: 1, y: 0 });
      }
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className={
        className ??
        "relative h-full w-[320px] overflow-hidden rounded-3xl opacity-0 will-change-transform sm:w-[360px]"
      }
    >
      {isVideo ? (
        <ResilientVideo
          className={`absolute inset-0 h-full w-full ${mediaClassName}`}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          fallbackClassName="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(30,75,182,0.08),rgba(30,75,182,0)_62%)] font-mono text-[10px] uppercase tracking-[2px] text-muted-strong"
          fallbackLabel="video/imagen"
          aria-label={alt}
        />
      ) : !hasMedia ? (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(30,75,182,0.08),rgba(30,75,182,0)_62%)]"
          aria-label={alt}
        >
          <div className="relative h-[62%] w-[74%]">
            <div className="absolute left-[8%] top-[36%] h-[28%] w-[74%] rounded-full border border-primary/35 bg-primary/10" />
            <div className="absolute right-[2%] top-[41%] h-[18%] w-[24%] rounded-full border border-primary/35 bg-background" />
            {[18, 42, 66].map((left) => (
              <div
                key={left}
                className="absolute top-[55%] h-[36%] w-[15%] rounded-b-full border border-primary/35 bg-primary/10"
                style={{ left: `${left}%` }}
              />
            ))}
            <div className="absolute left-[16%] top-[28%] h-2 w-2 rounded-full bg-primary/70" />
            <div className="absolute left-[48%] top-[30%] h-1.5 w-1.5 rounded-full bg-primary/50" />
            <div className="absolute left-[76%] top-[35%] h-2 w-2 rounded-full bg-primary/60" />
          </div>
        </div>
      ) : (
        // next/image sirve variantes en WebP al tamaño exacto del
        // contenedor (320/360 px en este slide), evitando descargar el
        // PNG original de 2048×2048 y el escalado por CSS — que es lo
        // que producía el efecto aliasing/crispy en Safari.
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 360px, 320px"
          className={mediaClassName}
        />
      )}
    </div>
  );
}

export function ProductsMorph({ copy: providedCopy, products, hero, locale = FALLBACK_LOCALE }: Props = {}) {
  const safeLocale = locale ?? FALLBACK_LOCALE;
  const resolvedHero = hero ?? HERO_BY_LOCALE[safeLocale];
  const copy = providedCopy ?? PRODUCT_MORPH_COPY[safeLocale];
  const fallbackProducts = FALLBACK_PRODUCTS[safeLocale].map(({ slug, ...product }) => ({
    ...product,
    href: buildFamilyPath(safeLocale, slug),
  }));
  // Si el CMS devuelve items sin imagen/video, caemos al media del fallback
  // con el mismo `code` para que cada producto tenga su cover sin tener que
  // tocar Payload. Cuando el cliente suba su propio heroMedia, pisa al fallback.
  // Indexamos por `displayCode` para cubrir slugs en minúsculas y códigos display.
  const fallbackMediaByCode = new Map(
    fallbackProducts.map((p) => [displayCode(p.code), { image: p.image, video: p.video }]),
  );
  const items = (products?.length ? products.slice(0, 7) : fallbackProducts).map(
    (item) => {
      if (item.image || item.video) return item;
      const fb = fallbackMediaByCode.get(displayCode(item.code));
      return fb ? { ...item, image: fb.image, video: fb.video } : item;
    },
  );
  const morphRef = useRef<ParticleMorphHandle>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handle = morphRef.current;
    if (!handle) return;

    // La bola arranca ya en la primera forma para que el hero la muestre al entrar.
    handle.setShape(0);

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idxAttr = entry.target.getAttribute("data-shape-index");
          if (idxAttr === null) continue;
          const index = Number(idxAttr);
          if (best === null || entry.intersectionRatio > best.ratio) {
            best = { index, ratio: entry.intersectionRatio };
          }
        }
        if (best) handle.setShape(best.index);
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-25% 0px -25% 0px" }
    );

    for (const el of sectionRefs.current) {
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handle = morphRef.current;
    const root = rootRef.current;
    if (!handle || !root) return;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        handle.setPaused(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(root);
    return () => visibilityObserver.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative bg-background text-foreground"
    >
      {/* Canvas sticky: la bola se queda fija en viewport desde el hero */}
      <div className="pointer-events-none sticky top-0 h-screen w-full">
        <ParticleMorph
          ref={morphRef}
          className="absolute inset-0 h-full w-full"
          autoPlay={false}
        />
      </div>

      {/* Stack de slides sobre el canvas */}
      <div className="relative" style={{ marginTop: "-100vh" }}>
        {/* Hero: shape 0 lo deja fijado el setShape(0) inicial */}
        <article
          className="relative flex min-h-screen flex-col items-center justify-center px-5 text-center sm:px-8 md:px-12 lg:px-20"
        >
          <div className="mx-auto w-full max-w-[1100px]">
            <span className="font-mono text-[10px] uppercase tracking-[2.5px] text-primary-dark sm:text-[11px] sm:tracking-[3px]">
              {resolvedHero.eyebrow}
            </span>
            <h1 className="mt-6 font-sans text-[clamp(2.5rem,8vw,8.125rem)] font-normal leading-[0.95] tracking-tight text-foreground lg:tracking-[-2.76px]">
              {renderMultiline(resolvedHero.title)}
            </h1>
            <p className="mx-auto mt-8 max-w-[640px] font-sans text-lg leading-snug text-body md:text-xl lg:text-2xl lg:leading-[1.15]">
              {resolvedHero.body}
            </p>
          </div>
        </article>

        {/* Slides 1..6: tarjeta tabla periódica, alternando izq/der */}
        {items.map((product, index) => {
          const isLeft = index % 2 === 0;
          const href = product.href ?? `#${product.code.toLowerCase()}`;
          const particleShapeIndex = getProductParticleShapeIndex(product.code);
          const number = String(index + 1).padStart(2, "0");
          const total = String(items.length).padStart(2, "0");
          const variants = product.variants ?? [];

          const symbol = displayCode(product.code);
          const symbolLen = symbol.length;
          const symbolSize =
            symbolLen >= 4
              ? "text-5xl sm:text-6xl"
              : symbolLen === 3
                ? "text-6xl sm:text-7xl"
                : "text-7xl sm:text-8xl";

          const card = (
            <Link
              href={href}
              className="glass group relative flex w-[min(86vw,300px)] flex-col overflow-hidden rounded-3xl p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,75,182,0.15)] sm:w-[360px] lg:p-7"
              aria-label={`${symbol} — ${product.name}`}
            >
              <ProductImageReveal
                src={product.image}
                videoSrc={product.video}
                alt={product.name}
                className="relative h-[190px] w-full overflow-hidden rounded-t-3xl opacity-100 sm:aspect-square sm:h-auto lg:hidden"
                mediaClassName="object-contain"
                animate={false}
              />

              <div className="flex flex-col p-5 sm:p-7 lg:p-0">
                {/* Top row: number/total + indicator */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[2px] text-muted-strong">
                    {number} / {total}
                  </span>
                  {product.recycled ? (
                    <Recycle className="h-4 w-4 text-primary-dark" aria-label={copy.recycled} />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-foreground/60 transition-colors group-hover:text-primary-dark" />
                  )}
                </div>

                {/* Atomic symbol */}
                <div className="my-4 flex items-center justify-center sm:my-6">
                  <span
                    className={`font-sans font-normal leading-none tracking-tight text-primary ${symbolSize}`}
                  >
                    {symbol}
                  </span>
                </div>

                {/* Name */}
                <p className="font-sans text-base leading-tight text-foreground sm:text-lg">
                  {product.name}
                </p>

                {/* Variants line */}
                {variants.length > 0 ? (
                  <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[10px] uppercase tracking-[1.5px] text-muted-strong">
                    {variants.map((variant, i) => (
                      <span key={variant} className="whitespace-nowrap">
                        {variant}
                        {i < variants.length - 1 ? (
                          <span aria-hidden="true"> ·</span>
                        ) : null}
                      </span>
                    ))}
                  </div>
                ) : null}

                {/* Divider */}
                <div className="mt-5 h-px w-full bg-foreground/10" />

                {/* Footer: CTA centrado */}
                <div className="mt-5 flex items-center justify-center font-mono text-[12px] uppercase tracking-[1.8px] sm:text-[13px]">
                  <span className="flex items-center gap-1 text-foreground transition-opacity group-hover:opacity-70">
                    {copy.characteristics}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );

          const image = (
            <ProductImageReveal
              src={product.image}
              videoSrc={product.video}
              alt={product.name}
            />
          );

          return (
            <article
              key={product.code}
              ref={(el) => {
                sectionRefs.current[index + 1] = el;
              }}
              data-shape-index={particleShapeIndex}
              className="pointer-events-none relative flex min-h-screen items-center px-5 py-24 sm:px-8 md:px-16 lg:px-[10%] xl:px-[14%] 2xl:px-[18%]"
            >
              <div
                className="flex w-full items-stretch justify-center lg:justify-between"
              >
                {isLeft ? (
                  <>
                    <div className="pointer-events-auto">{card}</div>
                    <div className="pointer-events-auto hidden lg:flex">{image}</div>
                  </>
                ) : (
                  <>
                    <div className="pointer-events-auto hidden lg:flex">{image}</div>
                    <div className="pointer-events-auto">{card}</div>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
