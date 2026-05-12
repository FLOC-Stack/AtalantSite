"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 3400;
const COLORS = ["#1e4bb6", "#6496f0", "#a0b9eb", "#ffffff"];

type Particle = {
  color: string;
  delay: number;
  scatterX: number;
  scatterY: number;
  scatterZ: number;
  size: number;
  targetX: number;
  targetY: number;
};

type Props = {
  className?: string;
};

function seededRandom(seed: number) {
  const x = Math.sin(seed * 999.91) * 43758.5453123;
  return x - Math.floor(x);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function sampleTextPoints(width: number, height: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  const dpr = 1;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));

  const fontSize = Math.min(width * 0.46, height * 0.88);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${fontSize}px Arial Black, Arial, sans-serif`;
  ctx.fillText("404", width / 2, height / 2 + fontSize * 0.03);

  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const points: { x: number; y: number }[] = [];
  const step = Math.max(3, Math.round(Math.min(width, height) / 140));

  for (let y = 0; y < canvas.height; y += step) {
    for (let x = 0; x < canvas.width; x += step) {
      const alpha = image.data[(y * canvas.width + x) * 4 + 3];
      if (alpha > 20) {
        points.push({ x, y });
      }
    }
  }

  return points;
}

export function NotFoundParticles({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrame = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let particles: Particle[] = [];
    let isVisible = true;
    let isPaused = false;
    let startTime = 0;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const buildParticles = () => {
      const textPoints = sampleTextPoints(cssWidth, cssHeight);
      if (!textPoints.length) {
        particles = [];
        return;
      }

      particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
        const point = textPoints[Math.floor(seededRandom(index + 1) * textPoints.length)];
        const angle = seededRandom(index + 2) * Math.PI * 2;
        const distance = Math.min(cssWidth, cssHeight) * (0.42 + seededRandom(index + 3) * 0.92);
        const verticalBias = (seededRandom(index + 4) - 0.5) * cssHeight * 0.58;
        const colorPick = seededRandom(index + 5);

        return {
          color:
            colorPick > 0.94
              ? COLORS[3]
              : colorPick > 0.7
                ? COLORS[2]
                : colorPick > 0.38
                  ? COLORS[1]
                  : COLORS[0],
          delay: seededRandom(index + 6) * 0.22,
          scatterX: cssWidth / 2 + Math.cos(angle) * distance,
          scatterY: cssHeight / 2 + Math.sin(angle) * distance * 0.78 + verticalBias,
          scatterZ: seededRandom(index + 7) * 1.8 - 0.6,
          size: 0.75 + seededRandom(index + 8) * 1.65,
          targetX: point.x,
          targetY: point.y,
        };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = Math.max(1, rect.width);
      cssHeight = Math.max(1, rect.height);
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
    };

    const getFormProgress = (cycle: number) => {
      if (reducedMotionQuery.matches) return 1;
      if (cycle < 0.34) return 1;
      if (cycle < 0.54) return 1 - easeInOutCubic((cycle - 0.34) / 0.2);
      if (cycle < 0.72) return 0;
      return easeInOutCubic((cycle - 0.72) / 0.28);
    };

    const draw = (time: number) => {
      if (isPaused || !isVisible) return;

      if (!startTime) startTime = time;
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      const elapsed = (time - startTime) / 1000;
      const cycle = (elapsed % 6.8) / 6.8;
      const baseProgress = getFormProgress(cycle);
      const drift = reducedMotionQuery.matches ? 0 : time / 1000;

      for (let index = 0; index < particles.length; index++) {
        const particle = particles[index];
        const localProgress = Math.max(0, Math.min(1, (baseProgress - particle.delay) / 0.78));
        const eased = easeInOutCubic(localProgress);
        const orbital = Math.sin(drift * 0.85 + index * 0.13) * (1 - eased) * 16;
        const x = particle.scatterX + (particle.targetX - particle.scatterX) * eased + orbital;
        const y =
          particle.scatterY +
          (particle.targetY - particle.scatterY) * eased +
          Math.cos(drift * 0.72 + index * 0.09) * (1 - eased) * 10;
        const depth = 0.72 + particle.scatterZ * (1 - eased) * 0.24;
        const alpha = 0.18 + eased * 0.66 + (1 - eased) * 0.2;
        const radius = particle.size * depth * (0.86 + eased * 0.32);

        ctx.globalAlpha = Math.max(0.08, Math.min(0.94, alpha));
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && !isPaused) {
          cancelAnimationFrame(animationFrame);
          animationFrame = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.1 },
    );

    const pauseForMotionPreference = () => {
      isPaused = false;
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    observer.observe(canvas);
    animationFrame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    reducedMotionQuery.addEventListener("change", pauseForMotionPreference);

    return () => {
      isPaused = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      reducedMotionQuery.removeEventListener("change", pauseForMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
