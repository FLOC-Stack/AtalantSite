"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Recycle } from "lucide-react";
import { ParticleMorph, type ParticleMorphHandle } from "./particle-morph";

export type ProductsMorphItem = {
  code: string;
  name: string;
  description: string;
  variants?: string[];
  href?: string;
  recycled?: boolean;
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
  },
  {
    code: "PP",
    name: "Polipropileno",
    description:
      "Alta rigidez, estabilidad térmica y reciclabilidad para automoción, electrodomésticos y envase rígido.",
    variants: ["Homopolímero", "Random", "Impacto"],
    href: "/es/productos/pp",
  },
  {
    code: "PVC",
    name: "Policloruro de vinilo",
    description:
      "Versatilidad rígida y flexible. Perfilería, conducciones, recubrimientos y construcción con aditivación a medida.",
    variants: ["Rígido", "Flexible", "Emulsión"],
    href: "/es/productos/pvc",
  },
  {
    code: "PS",
    name: "Poliestireno",
    description:
      "Transparencia y facilidad de termoconformado. Envase alimentario, electrodomésticos y aislamiento térmico.",
    variants: ["GPPS", "HIPS", "EPS"],
    href: "/es/productos/ps",
  },
  {
    code: "PET",
    name: "Polietilen tereftalato",
    description:
      "Barrera, transparencia y aptitud alimentaria. Grados soplado, inyección y fibra, incluyendo rPET certificado.",
    variants: ["Soplado", "Inyección", "Fibra", "rPET"],
    href: "/es/productos/pet",
  },
  {
    code: "REC",
    name: "Polímeros reciclados",
    description:
      "Corrientes recicladas tratadas como línea de producto, con trazabilidad y encaje real en el plan de suministro.",
    variants: ["rPE", "rPP", "rPET"],
    href: "/es/productos/reciclados",
    recycled: true,
  },
];

const FALLBACK_HERO: ProductsMorphHero = {
  eyebrow: "Catálogo de producto",
  title: "Polímeros técnicos\npara cada línea.",
  body: "Seis familias de material con grados específicos para inyección, extrusión, soplado y termoconformado. Stock permanente en Europa, trazabilidad por lote y asesoría técnica en cada especificación.",
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

export function ProductsMorph({ products, hero = FALLBACK_HERO }: Props = {}) {
  const items = products?.length ? products.slice(0, 6) : FALLBACK_PRODUCTS;
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
        {/* Slide 0: Hero centrado, shape 0 ya visible */}
        <article
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
          data-shape-index={0}
          className="relative flex min-h-screen flex-col items-center justify-center px-5 pt-32 text-center sm:px-8 md:px-12 lg:px-20"
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
          const isLeft = index % 2 === 0; // PE(0), PVC(2), PET(4) → izquierda
          const href = product.href ?? `#${product.code.toLowerCase()}`;
          const number = String(index + 1).padStart(2, "0");
          const total = String(items.length).padStart(2, "0");

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
              className="glass group relative flex w-[320px] flex-col rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,23,42,0.12)] sm:w-[360px] sm:p-7"
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
                  <ArrowUpRight className="h-4 w-4 text-foreground/40 transition-colors group-hover:text-primary-dark" />
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
              {product.variants && product.variants.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 font-mono text-[10px] uppercase tracking-[1.5px] text-muted-strong">
                  {product.variants.map((variant, i) => (
                    <span key={variant} className="whitespace-nowrap">
                      {variant}
                      {i < product.variants!.length - 1 ? (
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

          return (
            <article
              key={product.code}
              ref={(el) => {
                sectionRefs.current[index + 1] = el;
              }}
              data-shape-index={index}
              className={`pointer-events-none relative flex min-h-screen items-center px-5 py-24 sm:px-8 md:px-16 lg:px-[10%] xl:px-[14%] 2xl:px-[18%] ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              <div className="pointer-events-auto">{card}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
