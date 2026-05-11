"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Chapter = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  reverse?: boolean;
};

type Props = {
  chapters: Chapter[];
};

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

// Paleta del barrido. Cada palabra recorre 3 estaciones:
//   FROM  → ACCENT (primary azul) → TO (foreground sólido)
// El stagger + scrub deja el azul visible solo en la "cresta" de la ola
// que va revelando el párrafo, igual que en terminal-industries.com/about.
const WORD_FROM = "rgba(27, 28, 26, 0.18)";
const WORD_ACCENT = "#1e4bb6"; // var(--color-primary)
const WORD_TO = "rgba(27, 28, 26, 1)";

// Divide cada párrafo en palabras envueltas en <span> para poder animar
// el barrido de color (estilo terminal-industries.com/about): texto en
// gris al entrar, foreground sólido al pasar el scroll.
function splitWords(text: string) {
  return text.split(/(\s+)/).map((token, i) => {
    if (/^\s+$/.test(token)) return token;
    return (
      <span
        key={i}
        data-reveal-word
        className="inline-block"
        style={{ color: WORD_FROM }}
      >
        {token}
      </span>
    );
  });
}

export function NosotrosChapters({ chapters }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const articles = gsap.utils.toArray<HTMLElement>("[data-chapter]", root);

      articles.forEach((article) => {
        const words = gsap.utils.toArray<HTMLElement>(
          "[data-reveal-word]",
          article,
        );
        if (!words.length) return;

        if (prefersReduced) {
          gsap.set(words, { color: WORD_TO });
          return;
        }

        // Estado inicial explícito (además del inline style, para que GSAP
        // tenga la "from" cacheada antes de empezar el scrub).
        gsap.set(words, { color: WORD_FROM });

        // Keyframes con timing explícito:
        //   - 0 → 12%: sube de gris a azul (chispazo)
        //   - 12% → 22%: cae rápido del azul al foreground
        //   - 22% → 100%: se mantiene en foreground sin más interpolación
        // El azul solo existe en una ventana corta de cada palabra: deja
        // de verse "azulada" muy pronto y el resto del recorrido es negro
        // plano. Combinado con el stagger se traduce en un destello sutil
        // viajando por el párrafo.
        gsap.to(words, {
          keyframes: [
            { color: WORD_ACCENT, duration: 0.12, ease: "power2.out" },
            { color: WORD_TO, duration: 0.1, ease: "power2.in" },
            { color: WORD_TO, duration: 0.78, ease: "none" },
          ],
          stagger: { each: 0.05, from: "start" },
          scrollTrigger: {
            trigger: article,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });
      });

      // Recalcula posiciones tras montar (fuentes/imagenes pueden
      // desplazar el layout y dejar los triggers fuera de sitio).
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && root.contains(st.trigger)) st.kill();
        });
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="flex flex-col gap-24 lg:gap-32">
      {chapters.map((chapter, i) => {
        const numeral = String(i + 1).padStart(2, "0");
        return (
          <article
            key={i}
            data-chapter
            className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2 lg:items-center"
          >
            {/* Texto */}
            <div className={chapter.reverse ? "lg:order-2" : ""}>
              <div className="grid grid-cols-[auto_1fr] gap-x-8">
                {/* Numeral 01/02/03 — mismo registro tipográfico que la sección de valores */}
                <p
                  aria-hidden="true"
                  className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]"
                >
                  {numeral}
                </p>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
                    {chapter.eyebrow}
                  </p>
                  <h2 className="mt-6 max-w-[640px] font-sans text-[32px] font-medium leading-[1.08] tracking-[-1px] text-foreground sm:text-[40px] lg:text-[48px] lg:tracking-[-1.6px]">
                    {renderMultiline(chapter.title)}
                  </h2>
                  <div className="mt-10 max-w-[620px] space-y-6">
                    {chapter.paragraphs.map((p, j) => (
                      <p
                        key={j}
                        className="font-sans text-[20px] font-light leading-[30px] tracking-[-0.2px] lg:text-[26px] lg:leading-[36px] lg:tracking-[-0.4px]"
                      >
                        {splitWords(p)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen */}
            <div
              className={`relative aspect-[4/5] w-full overflow-hidden bg-foreground/5 sm:aspect-[5/4] lg:aspect-[4/5] ${
                chapter.reverse ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={chapter.image.src}
                alt={chapter.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
