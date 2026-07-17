"use client";

import { useEffect } from "react";

const SNAP_CLASS = "home-scroll-snap-enabled";
const FOOTER_RELEASE_DISTANCE = 1.5;

export function HomeScrollSnap() {
  useEffect(() => {
    const root = document.documentElement;
    const footer = document.querySelector("footer");
    let frame: number | null = null;

    const syncSnapState = () => {
      frame = null;
      const footerTop = footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const nearFooter =
        window.scrollY > 0 &&
        footerTop <= window.innerHeight * FOOTER_RELEASE_DISTANCE;

      root.classList.toggle(SNAP_CLASS, !nearFooter);
    };

    const scheduleSync = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(syncSnapState);
    };

    root.classList.add(SNAP_CLASS);
    syncSnapState();
    window.addEventListener("resize", scheduleSync);
    window.addEventListener("scroll", scheduleSync, { passive: true });

    return () => {
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("scroll", scheduleSync);
      if (frame !== null) cancelAnimationFrame(frame);
      root.classList.remove(SNAP_CLASS);
    };
  }, []);

  return null;
}
