"use client";

import { useEffect, useState } from "react";
import { LogoParticles } from "@/components/logo-particles";

export function HeroBackdrop() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      setEnabled(!reducedMotion.matches && desktop.matches);
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    desktop.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <LogoParticles
      assemblyDelay={0.15}
      assemblyDuration={2.4}
      className="absolute inset-0 h-full w-full opacity-90"
      particleStep={4}
    />
  );
}
