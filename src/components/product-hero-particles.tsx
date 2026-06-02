"use client";

import { useEffect, useRef } from "react";
import { getProductParticleShapeIndex } from "@/lib/product-particle-shapes";
import { ParticleMorph, type ParticleMorphHandle } from "./particle-morph";

type Props = {
  code: string;
  className?: string;
};

export function ProductHeroParticles({ code, className = "" }: Props) {
  const morphRef = useRef<ParticleMorphHandle>(null);
  const shapeIndex = getProductParticleShapeIndex(code);

  useEffect(() => {
    morphRef.current?.setShape(shapeIndex);
  }, [shapeIndex]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <ParticleMorph
        ref={morphRef}
        autoPlay={false}
        className="h-full w-full"
        motionIntensity={1.8}
      />
    </div>
  );
}
