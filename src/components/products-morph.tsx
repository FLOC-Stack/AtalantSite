"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Recycle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ParticleMorph, type ParticleMorphHandle } from "./particle-morph";

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

const FALLBACK_PRODUCTS: ProductsMorphItem[] = [
  {
    code: "PE",
    name: "Polietileno",
    description:
      "Resistencia química y procesabilidad para envase, tubería y film. Grados específicos para soplado, inyección y extrusión.",
    variants: ["HDPE", "LDPE", "LLDPE"],
    href: "/es/productos/pe",
    image: "/imgsrc/products/3d-product-PE.webp",
  },
  {
    code: "PP",
    name: "Polipropileno",
    description:
      "Alta rigidez, estabilidad térmica y reciclabilidad para automoción, electrodomésticos y envase rígido.",
    variants: ["Homopolímero", "Random", "Impacto"],
    href: "/es/productos/pp",
    image: "/imgsrc/products/3d-product-PP.webp",
  },
  {
    code: "PVC",
    name: "Policloruro de vinilo",
    description:
      "Versatilidad rígida y flexible. Perfilería, conducciones, recubrimientos y construcción con aditivación a medida.",
    variants: ["Rígido", "Flexible", "Emulsión"],
    href: "/es/productos/pvc",
    image: "/imgsrc/products/3d-product-PVC.webp",
  },
  {
    code: "EVA",
    name: "Etileno acetato de vinilo",
    description:
      "Grados con diferentes MFI y contenido de acetato de vinilo para plantillas, láminas, films, calzado, adhesivos, automoción y construcción.",
    variants: ["Diferentes MFI", "Acetato de vinilo"],
    href: "/es/productos/eva",
    image: "/imgsrc/products/3d-product-EVA.webp",
  },
  {
    code: "PS",
    name: "Poliestireno",
    description:
      "Transparencia y facilidad de termoconformado. Envase alimentario, electrodomésticos y aislamiento térmico.",
    variants: ["GPPS", "HIPS", "EPS"],
    href: "/es/productos/ps",
    image: "/imgsrc/products/3d-product-PS.webp",
  },
  {
    code: "PET",
    name: "Polietilen tereftalato",
    description:
      "Barrera, transparencia y aptitud alimentaria. Grados soplado, inyección y fibra, incluyendo rPET certificado.",
    variants: ["Soplado", "Inyección", "Fibra", "rPET"],
    href: "/es/productos/pet",
    image: "/imgsrc/products/3d-product-PET.webp",
  },
  {
    code: "REC",
    name: "Polímeros reciclados",
    description:
      "Corrientes recicladas tratadas como línea de producto, con trazabilidad y encaje real en el plan de suministro.",
    variants: ["rPE", "rPP", "rPET"],
    href: "/es/productos/recycled",
    recycled: true,
    image: "/imgsrc/products/3d-product-RE.webp",
  },
];

const FALLBACK_HERO: ProductsMorphHero = {
  eyebrow: "Catálogo de producto",
  title: "Polímeros técnicos\npara cada línea.",
  body: "Siete familias de material con grados específicos para inyección, extrusión, soplado y termoconformado. Stock permanente en Europa, trazabilidad por lote y asesoría técnica en cada especificación.",
};

type Props = {
  products?: ProductsMorphItem[];
  hero?: ProductsMorphHero;
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

const PLACEHOLDER_IMAGE = "/imgsrc/botella_detergente.webp";

type ProductImageRevealProps = {
  src?: string;
  videoSrc?: string;
  alt: string;
};

function ProductImageReveal({ src, videoSrc, alt }: ProductImageRevealProps) {
  const imageSrc = src ?? PLACEHOLDER_IMAGE;
  const isVideo = Boolean(videoSrc);
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

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
      className="relative h-full w-[320px] overflow-hidden rounded-3xl opacity-0 will-change-transform sm:w-[360px]"
    >
      {isVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      ) : (
        // next/image sirve variantes en WebP al tamaño exacto del
        // contenedor (320/360 px en este slide), evitando descargar el
        // PNG original de 2048×2048 y el escalado por CSS — que es lo
        // que producía el efecto aliasing/crispy en Safari.
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes="(min-width: 640px) 360px, 320px"
          className="object-cover"
        />
      )}
    </div>
  );
}

export function ProductsMorph({ products, hero = FALLBACK_HERO }: Props = {}) {
  // Si el CMS devuelve items sin imagen/video, caemos al media del fallback
  // con el mismo `code` para que cada producto tenga su cover sin tener que
  // tocar Payload. Cuando el cliente suba su propio heroMedia, pisa al fallback.
  // Indexamos por `displayCode` para que tanto si Payload devuelve el
  // slug en minúsculas ("recycled") como si llega ya el código display
  // ("REC"), el lookup acierte. Sin esto, el item de reciclados caía al
  // PLACEHOLDER_IMAGE porque "RECYCLED" ≠ "REC".
  const fallbackMediaByCode = new Map(
    FALLBACK_PRODUCTS.map((p) => [displayCode(p.code), { image: p.image, video: p.video }]),
  );
  const items = (products?.length ? products.slice(0, 7) : FALLBACK_PRODUCTS).map(
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
              {hero.eyebrow}
            </span>
            <h1 className="mt-6 font-sans text-[clamp(2.5rem,8vw,8.125rem)] font-normal leading-[0.95] tracking-tight text-foreground lg:tracking-[-2.76px]">
              {renderMultiline(hero.title)}
            </h1>
            <p className="mx-auto mt-8 max-w-[640px] font-sans text-lg leading-snug text-body md:text-xl lg:text-2xl lg:leading-[1.15]">
              {hero.body}
            </p>
          </div>
        </article>

        {/* Slides 1..6: tarjeta tabla periódica, alternando izq/der */}
        {items.map((product, index) => {
          const isLeft = index % 2 === 0;
          const href = product.href ?? `#${product.code.toLowerCase()}`;
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
              className="glass group relative flex w-[320px] flex-col rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(30,75,182,0.15)] sm:w-[360px] sm:p-7"
              aria-label={`${symbol} — ${product.name}`}
            >
              {/* Top row: number/total + indicator */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[2px] text-muted-strong">
                  {number} / {total}
                </span>
                {product.recycled ? (
                  <Recycle className="h-4 w-4 text-primary-dark" aria-label="Reciclado" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-foreground/60 transition-colors group-hover:text-primary-dark" />
                )}
              </div>

              {/* Atomic symbol */}
              <div className="my-6 flex items-center justify-center">
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

              {/* Description */}
              <p className="mt-4 font-sans text-[13px] leading-snug text-body sm:text-sm">
                {product.description}
              </p>

              {/* Footer: CTA centrado */}
              <div className="mt-5 flex items-center justify-center font-mono text-[10px] uppercase tracking-[1.8px]">
                <span className="flex items-center gap-1 text-foreground transition-opacity group-hover:opacity-70">
                  Ver ficha
                  <ArrowUpRight className="h-3 w-3" />
                </span>
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
              data-shape-index={index + 1}
              className="pointer-events-none relative flex min-h-screen items-center px-5 py-24 sm:px-8 md:px-16 lg:px-[10%] xl:px-[14%] 2xl:px-[18%]"
            >
              <div
                className={`flex w-full items-stretch lg:justify-between ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
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
