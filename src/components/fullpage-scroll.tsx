"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Wheel hijack que encaja el scroll de las secciones hijas en pasos de 100vh.
 * Cada tick salta exactamente a la sección siguiente o anterior, con un lock
 * de 700ms para evitar que los swipes de trackpad disparen varios saltos
 * encadenados. Solo actúa cuando el scroll está dentro del rango del propio
 * contenedor — así el footer (y cualquier contenido fuera) se alcanza con
 * scroll nativo. Deja pasar zoom (Ctrl/Cmd + wheel) y cualquier wheel que
 * ocurra dentro de un elemento marcado con `data-allow-wheel` para no
 * bloquear scrolls internos (dropdowns, drawers, listas).
 */
export function FullpageScroll({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isSnapping = false;
    let unlockTimer: number | undefined;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-allow-wheel]")) return;

      const height = window.innerHeight;
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top + window.scrollY;
      const containerHeight = container.offsetHeight;
      const maxIndex = Math.max(
        0,
        Math.round(containerHeight / height) - 1,
      );
      const lastSnapY = containerTop + maxIndex * height;
      const scrollY = window.scrollY;

      // Fuera del rango de secciones: scroll nativo (footer, cualquier
      // contenido arriba del contenedor si existiera).
      if (scrollY < containerTop - 1 || scrollY > lastSnapY + 1) return;

      const currentIndex = Math.round((scrollY - containerTop) / height);
      const goingDown = event.deltaY > 0;
      const goingUp = event.deltaY < 0;

      // Al final bajando: liberar scroll para alcanzar el footer.
      if (goingDown && currentIndex >= maxIndex) return;
      // Al principio subiendo: liberar por si hubiera contenido arriba.
      if (goingUp && currentIndex <= 0) return;

      event.preventDefault();
      if (isSnapping) return;

      const nextIndex = goingDown ? currentIndex + 1 : currentIndex - 1;
      const clamped = Math.max(0, Math.min(nextIndex, maxIndex));
      if (clamped === currentIndex) return;

      isSnapping = true;
      window.scrollTo({
        top: containerTop + clamped * height,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      unlockTimer = window.setTimeout(() => {
        isSnapping = false;
      }, 700);
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      document.removeEventListener("wheel", onWheel);
      if (unlockTimer !== undefined) window.clearTimeout(unlockTimer);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
