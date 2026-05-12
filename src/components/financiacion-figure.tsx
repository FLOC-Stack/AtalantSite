"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** Valor numérico final del contador (cuenta de 0 a `to`) */
  to: number;
  /** Sufijo estático junto a la cifra (ej. "%", "M€"). No se anima. */
  suffix?: string;
  /** Decimales a mostrar (default 0) */
  decimals?: number;
  /** Etiqueta accesible para lectores de pantalla */
  ariaLabel?: string;
  className?: string;
  /** Duración del contador en ms */
  duration?: number;
  /** Blur inicial en px (se desvanece a 0 al llegar al valor final) */
  maxBlur?: number;
};

// Counter animado con desenfoque inicial: la cifra arranca borrosa y
// cuenta de 0 a `to` mientras el filtro blur se desvanece. Se dispara
// con IntersectionObserver en cuanto el bloque entra en el viewport.
// Respeta prefers-reduced-motion (muestra el valor final sin animación).
export function FinanciacionFigure({
  to,
  suffix,
  decimals = 0,
  ariaLabel,
  className = "",
  duration = 1500,
  maxBlur = 12,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf: number | null = null;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => {
        setCurrent(to);
        setProgress(1);
      });
      return () => {
        if (raf !== null) cancelAnimationFrame(raf);
      };
    }

    const runCounter = () => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        // ease-out cubic — frena suavemente al acercarse al valor final
        const eased = 1 - Math.pow(1 - t, 3);
        setCurrent(to * eased);
        setProgress(t);
        if (t < 1) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounter();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const display =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toString();

  const blurPx = (1 - progress) * maxBlur;

  return (
    <span
      ref={ref}
      className={`inline-flex items-baseline ${className}`}
      style={{
        filter: blurPx > 0 ? `blur(${blurPx.toFixed(2)}px)` : "none",
        // willChange ayuda al compositor a mantener el filtro suave.
        willChange: progress < 1 ? "filter" : "auto",
      }}
      aria-label={ariaLabel ?? `${to}${suffix ?? ""}`}
    >
      <span aria-hidden="true">{display}</span>
      {suffix ? <span aria-hidden="true">{suffix}</span> : null}
    </span>
  );
}
