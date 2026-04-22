"use client";

import { useEffect } from "react";

/**
 * Wheel hijack que encaja el scroll de la home en pasos de 100vh. Cada tick
 * salta exactamente a la sección siguiente o anterior, con un lock de 700ms
 * durante la animación para evitar que los swipes de trackpad disparen varios
 * saltos encadenados. Deja pasar zoom (Ctrl/Cmd + wheel) y cualquier wheel
 * que ocurra dentro de un elemento marcado con `data-allow-wheel` para no
 * bloquear scrolls internos (dropdowns, drawers, listas).
 *
 * Solo se monta donde se renderiza — por diseño vive únicamente en la home
 * para que el resto de rutas (productos, admin) conserven su scroll nativo.
 */
export function FullpageScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let isSnapping = false;
    let unlockTimer: number | undefined;

    const onWheel = (event: WheelEvent) => {
      // Zoom con Ctrl/Cmd + wheel pasa sin tocar.
      if (event.ctrlKey || event.metaKey) return;
      // Wheel dentro de un contenedor con scroll propio (dropdowns, etc.).
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-allow-wheel]")) return;

      event.preventDefault();
      if (isSnapping) return;

      const height = window.innerHeight;
      const currentIndex = Math.round(window.scrollY / height);
      const nextIndex =
        event.deltaY > 0 ? currentIndex + 1 : currentIndex - 1;
      const maxIndex = Math.floor(
        (document.documentElement.scrollHeight - height) / height,
      );
      const clamped = Math.max(0, Math.min(nextIndex, maxIndex));
      if (clamped === currentIndex) return;

      isSnapping = true;
      window.scrollTo({
        top: clamped * height,
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

  return null;
}
