"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { LogisticsMilestone } from "./home-logistics";

type Props = {
  milestones: LogisticsMilestone[];
  label?: string;
};

export function MilestoneCarousel({ milestones, label }: Props) {
  const scrollerRef = useRef<HTMLOListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft < max - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [milestones.length]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLLIElement>("li");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? el.clientWidth * 0.8;
    // Gap entre cards (gap-10 = 40px en lg). Sumar para que cada click avance una tarjeta limpia.
    const step = cardWidth + 40;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="mt-16 lg:mt-20">
      <div className="h-px w-full bg-foreground" aria-hidden="true" />

      <div className="mt-4 flex items-center justify-between gap-4">
        {label ? (
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
            {label}
          </p>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canPrev}
            aria-label="Hito anterior"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-opacity hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canNext}
            aria-label="Hito siguiente"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 text-foreground transition-opacity hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-6 lg:mt-8">
        <ol
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 lg:gap-10 3xl:gap-14 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {milestones.map((m, i) => (
            <li
              key={`${m.year}-${i}`}
              className="flex w-[80vw] flex-none snap-start flex-col sm:w-[320px] lg:w-[280px] lg:border-l lg:border-foreground/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0 3xl:w-[360px] 3xl:pl-10"
            >
              <span
                className={`font-sans text-[54px] font-light leading-none tracking-[-1.5px] ${
                  m.highlighted ? "text-primary-dark" : "text-foreground"
                }`}
              >
                {m.year}
              </span>
              <span className="mt-3 font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {m.label}
              </span>
              <p className="mt-3 font-sans text-[22px] tracking-[-0.4px] text-foreground">
                {m.title}
              </p>
              {m.location ? (
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[2px] text-primary-dark">
                  {m.location}
                </p>
              ) : null}
              <p className="mt-3 font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-muted-strong">
                {m.body}
              </p>
            </li>
          ))}
        </ol>

        {canNext ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"
          />
        ) : null}
      </div>
    </div>
  );
}
