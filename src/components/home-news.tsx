import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type NewsItem = {
  date: string;
  title: string;
  excerpt: string;
  href: string;
  image?: string;
  imageAlt?: string;
};

type Props = {
  indexLabel?: string;
  counter?: string;
  title?: string;
  body?: string;
  sectionLabel?: string;
  ctaLabel?: string;
  items?: NewsItem[];
};

const FALLBACK_TITLE = "Últimas\nnovedades.";

const FALLBACK_BODY =
  "Comunicaciones recientes, hitos y notas de prensa. Lo que cuenta y lo que se mueve en Atalant.";

const FALLBACK_ITEMS: NewsItem[] = [
  {
    date: "15 ABR 2026",
    title: "Nuevo hub logístico en Países Bajos",
    excerpt:
      "Ampliamos capacidad operativa y reducimos los tiempos de entrega en el norte de Europa.",
    href: "#",
    image: "/imgsrc/atalant-post-1.jpeg",
    imageAlt: "Polímeros Atalant",
  },
  {
    date: "02 ABR 2026",
    title: "Greenlant alcanza certificación EuCertPlast",
    excerpt:
      "Nuestra línea de reciclados consolida su trazabilidad y calidad bajo estándar europeo.",
    href: "#",
    image: "/imgsrc/atalant-post-2.jpeg",
    imageAlt: "Reciclados Greenlant Atalant",
  },
  {
    date: "20 MAR 2026",
    title: "Acuerdo con productor europeo de PP técnico",
    excerpt:
      "Reforzamos la oferta de polímeros técnicos con un nuevo contrato de suministro estable.",
    href: "#",
    image: "/imgsrc/atalant-post-3.jpeg",
    imageAlt: "Polímeros técnicos Atalant",
  },
];

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function HomeNews({
  indexLabel = "N° 05 — COMUNICACIÓN / NOVEDADES",
  counter = "05 / 05",
  title = FALLBACK_TITLE,
  body = FALLBACK_BODY,
  sectionLabel = "ÚLTIMAS NOTICIAS",
  ctaLabel = "Leer noticia",
  items = FALLBACK_ITEMS,
}: Props = {}) {
  return (
    <section
      aria-labelledby="home-news-title"
      className="relative flex min-h-screen flex-col bg-background text-foreground"
    >
      <div className="relative z-10 flex w-full flex-1 flex-col px-10 pt-16 pb-12 sm:px-14 sm:pt-20 sm:pb-14 lg:px-20 lg:pt-[100px] lg:pb-[80px]">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
            {indexLabel}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {counter}
          </p>
        </div>
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        <div className="mt-10 flex flex-col gap-8 lg:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="home-news-title"
            className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1] tracking-[-2px] text-foreground lg:tracking-[-3px]"
          >
            {renderMultiline(title)}
          </h2>
          <p className="max-w-[480px] font-sans text-[17px] font-light leading-[1.55] tracking-[-0.15px] text-foreground sm:text-lg lg:text-[17px] lg:leading-[26px]">
            {body}
          </p>
        </div>

        <div className="mt-16 lg:mt-20">
          <div className="h-px w-full bg-foreground" aria-hidden="true" />
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {sectionLabel}
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-x-10">
            {items.map((item) => (
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
                <div className="mt-5">
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 border-b border-primary-dark pb-1 font-sans text-[14px] font-medium tracking-[0.2px] text-primary-dark transition-opacity hover:opacity-70"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
