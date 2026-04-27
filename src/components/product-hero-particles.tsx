"use client";

import { useEffect, useRef } from "react";
import { ParticleMorph, type ParticleMorphHandle } from "./particle-morph";

// Mapeo code → shape index, mismo orden que ParticlesMorph en el listado:
// 0 sphere · 1 torus · 2 helix · 3 cube · 4 cylinder · 5 logo (REC)
const SHAPE_BY_CODE: Record<string, number> = {
  pe: 0,
  pp: 1,
  pvc: 2,
  ps: 3,
  pet: 4,
  rec: 5,
  reciclados: 5,
};

type Props = {
  code: string;
  className?: string;
};

export function ProductHeroParticles({ code, className = "" }: Props) {
  const morphRef = useRef<ParticleMorphHandle>(null);
  const shapeIndex = SHAPE_BY_CODE[code.toLowerCase()] ?? 0;

  useEffect(() => {
    morphRef.current?.setShape(shapeIndex);
  }, [shapeIndex]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <ParticleMorph ref={morphRef} autoPlay={false} className="h-full w-full" />
    </div>
  );
}
