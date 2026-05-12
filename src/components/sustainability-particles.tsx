"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

type MaskPoint = {
  lat: number;
  lng: number;
};

const PARTICLE_COUNT = 15000;
const MASK_WIDTH = 960;
const MASK_HEIGHT = 480;

const LAND_COLORS = [
  new THREE.Color(0x0d6f38),
  new THREE.Color(0x0d6f38),
  new THREE.Color(0x15964a),
  new THREE.Color(0x35b764),
  new THREE.Color(0x8bdd9d),
];

const OCEAN_COLORS = [
  new THREE.Color(0x1e4bb6),
  new THREE.Color(0x6496f0),
  new THREE.Color(0xa0b9eb),
];

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const normalizeLng = (lng: number) => ((((lng + 180) % 360) + 360) % 360) - 180;

const drawBlob = (
  ctx: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
) => {
  if (points.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x * MASK_WIDTH, points[0].y * MASK_HEIGHT);
  for (let index = 1; index < points.length; index++) {
    ctx.lineTo(points[index].x * MASK_WIDTH, points[index].y * MASK_HEIGHT);
  }
  ctx.closePath();
  ctx.fill();
};

const createLandMask = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  canvas.width = MASK_WIDTH;
  canvas.height = MASK_HEIGHT;
  ctx.clearRect(0, 0, MASK_WIDTH, MASK_HEIGHT);
  ctx.fillStyle = "#fff";

  drawBlob(ctx, [
    { x: 0.08, y: 0.34 },
    { x: 0.13, y: 0.22 },
    { x: 0.23, y: 0.18 },
    { x: 0.32, y: 0.25 },
    { x: 0.34, y: 0.36 },
    { x: 0.28, y: 0.44 },
    { x: 0.2, y: 0.46 },
    { x: 0.16, y: 0.56 },
    { x: 0.1, y: 0.5 },
  ]);
  drawBlob(ctx, [
    { x: 0.24, y: 0.47 },
    { x: 0.32, y: 0.52 },
    { x: 0.31, y: 0.62 },
    { x: 0.35, y: 0.7 },
    { x: 0.32, y: 0.88 },
    { x: 0.27, y: 0.79 },
    { x: 0.22, y: 0.65 },
    { x: 0.21, y: 0.55 },
  ]);
  drawBlob(ctx, [
    { x: 0.36, y: 0.16 },
    { x: 0.42, y: 0.12 },
    { x: 0.46, y: 0.18 },
    { x: 0.43, y: 0.27 },
    { x: 0.37, y: 0.25 },
  ]);
  drawBlob(ctx, [
    { x: 0.45, y: 0.32 },
    { x: 0.52, y: 0.27 },
    { x: 0.59, y: 0.31 },
    { x: 0.58, y: 0.4 },
    { x: 0.5, y: 0.42 },
    { x: 0.45, y: 0.39 },
  ]);
  drawBlob(ctx, [
    { x: 0.49, y: 0.43 },
    { x: 0.58, y: 0.4 },
    { x: 0.64, y: 0.5 },
    { x: 0.61, y: 0.7 },
    { x: 0.55, y: 0.82 },
    { x: 0.49, y: 0.66 },
    { x: 0.46, y: 0.52 },
  ]);
  drawBlob(ctx, [
    { x: 0.56, y: 0.26 },
    { x: 0.7, y: 0.2 },
    { x: 0.86, y: 0.25 },
    { x: 0.92, y: 0.34 },
    { x: 0.86, y: 0.48 },
    { x: 0.76, y: 0.47 },
    { x: 0.71, y: 0.58 },
    { x: 0.63, y: 0.47 },
    { x: 0.58, y: 0.39 },
  ]);
  drawBlob(ctx, [
    { x: 0.76, y: 0.58 },
    { x: 0.84, y: 0.6 },
    { x: 0.87, y: 0.68 },
    { x: 0.82, y: 0.73 },
    { x: 0.75, y: 0.69 },
  ]);
  drawBlob(ctx, [
    { x: 0.88, y: 0.75 },
    { x: 0.94, y: 0.78 },
    { x: 0.92, y: 0.84 },
    { x: 0.86, y: 0.82 },
  ]);

  for (const island of [
    { x: 0.38, y: 0.42, r: 8 },
    { x: 0.41, y: 0.46, r: 5 },
    { x: 0.44, y: 0.28, r: 6 },
    { x: 0.69, y: 0.58, r: 7 },
    { x: 0.9, y: 0.58, r: 5 },
  ]) {
    ctx.beginPath();
    ctx.arc(island.x * MASK_WIDTH, island.y * MASK_HEIGHT, island.r, 0, Math.PI * 2);
    ctx.fill();
  }

  const imageData = ctx.getImageData(0, 0, MASK_WIDTH, MASK_HEIGHT);

  return {
    isLand(lat: number, lng: number) {
      const x = Math.round(((normalizeLng(lng) + 180) / 360) * (MASK_WIDTH - 1));
      const y = Math.round(((90 - lat) / 180) * (MASK_HEIGHT - 1));
      return imageData.data[(y * MASK_WIDTH + x) * 4 + 3] > 8;
    },
  };
};

const fibonacciSpherePoint = (index: number, count: number, radius: number) => {
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  const y = index * offset - 1 + offset / 2;
  const r = Math.sqrt(1 - y * y);
  const phi = index * increment;

  return {
    x: Math.cos(phi) * r * radius,
    y: y * radius,
    z: Math.sin(phi) * r * radius,
  };
};

const sphereLatLng = ({ x, y, z }: { x: number; y: number; z: number }): MaskPoint => {
  const lat = THREE.MathUtils.radToDeg(Math.asin(clamp01((y + 1) / 2) * 2 - 1));
  const theta = Math.atan2(z, -x);
  return {
    lat,
    lng: normalizeLng(THREE.MathUtils.radToDeg(theta) - 180),
  };
};

export function SustainabilityParticles({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;
    if (initialWidth === 0 || initialHeight === 0) return;

    const landMask = createLandMask();
    if (!landMask) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, initialWidth / initialHeight, 1, 2400);
    camera.position.set(0, 0, 920);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);
    const targetBase = new Float32Array(PARTICLE_COUNT * 3);
    const originAngles = new Float32Array(PARTICLE_COUNT);
    const originRadii = new Float32Array(PARTICLE_COUNT);
    const delays = new Float32Array(PARTICLE_COUNT);
    const depths = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const particleKinds = new Uint8Array(PARTICLE_COUNT);

    for (let index = 0; index < PARTICLE_COUNT; index++) {
      const finalPoint = fibonacciSpherePoint(index, PARTICLE_COUNT, 1);
      const { lat, lng } = sphereLatLng(finalPoint);
      const isLand = landMask.isLand(lat, lng);
      const colorRoll = Math.random();
      const palette = isLand ? LAND_COLORS : OCEAN_COLORS;
      const color = isLand
        ? colorRoll < 0.38
          ? palette[0]
          : colorRoll < 0.68
            ? palette[1]
            : colorRoll < 0.88
              ? palette[2]
              : palette[Math.min(palette.length - 1, 3 + Math.floor(Math.random() * 2))]
        : colorRoll < 0.42
          ? palette[0]
          : colorRoll < 0.78
            ? palette[1]
            : palette[2];

      targetBase[index * 3] = finalPoint.x;
      targetBase[index * 3 + 1] = finalPoint.y;
      targetBase[index * 3 + 2] = finalPoint.z;
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
      scales[index] = 1;
      opacities[index] = 0;
      originAngles[index] = Math.random() * Math.PI * 2;
      originRadii[index] = Math.pow(Math.random(), 2.4) * 34;
      delays[index] = Math.random() * 0.62;
      depths[index] = (Math.random() - 0.5) * 50;
      sizes[index] = isLand ? 5 + Math.random() * 7.2 : 3.8 + Math.random() * 5;
      phases[index] = Math.random() * Math.PI * 2;
      particleKinds[index] = isLand ? 1 : 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("opacity", new THREE.BufferAttribute(opacities, 1));

    const material = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      vertexShader: `
        attribute float scale;
        attribute float opacity;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vDepth;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (260.0 / -mvPosition.z);
          vColor = aColor;
          vOpacity = opacity;
          vDepth = -mvPosition.z;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        varying float vDepth;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.09, d);
          float halo = smoothstep(0.5, 0.26, d);
          float depthFade = clamp(1.16 - vDepth / 1180.0, 0.28, 1.0);
          gl_FragColor = vec4(vColor, (core * 0.56 + halo * 0.44) * vOpacity * depthFade);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.y = -0.38;
    particles.rotation.x = 0.12;
    scene.add(particles);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialWidth, initialHeight);
    container.appendChild(renderer.domElement);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trigger =
      document.getElementById("sustainability-intro-title") ?? container.parentElement ?? container;
    let startedAt = 0;
    let rafId = 0;
    let visible = false;
    let running = false;
    let hasStarted = false;

    const drawFrame = (now: number) => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const radius = Math.min(width * 0.31, height * 0.42, 270);
      const elapsed = reducedMotion ? 4 : Math.max(0, (now - startedAt) / 1000);
      const pos = geometry.attributes.position.array as Float32Array;
      const sc = geometry.attributes.scale.array as Float32Array;
      const alpha = geometry.attributes.opacity.array as Float32Array;

      for (let index = 0; index < PARTICLE_COUNT; index++) {
        const localProgress = reducedMotion ? 1 : clamp01((elapsed - delays[index]) / 2.6);
        const progress = easeOutCubic(localProgress);
        const originX = Math.cos(originAngles[index]) * originRadii[index];
        const originY = Math.sin(originAngles[index]) * originRadii[index];
        const targetX = targetBase[index * 3] * radius;
        const targetY = targetBase[index * 3 + 1] * radius;
        const targetZ = targetBase[index * 3 + 2] * radius + depths[index];
        const burst = Math.sin(localProgress * Math.PI) * 42;
        const breathe = Math.sin(elapsed * 0.9 + phases[index]) * 2.2 * progress;

        pos[index * 3] = originX + (targetX - originX) * progress + breathe;
        pos[index * 3 + 1] = originY + (targetY - originY) * progress;
        pos[index * 3 + 2] = burst + targetZ * progress;
        sc[index] = sizes[index] * (0.82 + progress * 0.72);
        const rotatedZ =
          targetZ * Math.cos(particles.rotation.y) - targetX * Math.sin(particles.rotation.y);
        const front = clamp01(rotatedZ / radius / 0.72);
        const back = 1 - front;
        const reveal = clamp01(localProgress / 0.25);
        const landAlpha = 0.9 + front * 0.12;
        const oceanAlpha = 0.42 + front * 0.2 + back * 0.12;

        alpha[index] = (particleKinds[index] === 1 ? landAlpha : oceanAlpha) * reveal;
      }

      particles.rotation.y = -0.38 + elapsed * 0.08;
      particles.rotation.x = 0.12 + Math.sin(elapsed * 0.38) * 0.025;
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;
      geometry.attributes.opacity.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      if (!visible) {
        running = false;
        return;
      }

      running = true;
      drawFrame(now);
      rafId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!hasStarted) {
        startedAt = performance.now();
        hasStarted = true;
      }

      if (reducedMotion) {
        drawFrame(startedAt + 5000);
        return;
      }

      if (!running) rafId = requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          start();
        } else {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.1 },
    );
    visibilityObserver.observe(trigger);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width === 0 || height === 0) return;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        if (hasStarted) drawFrame(performance.now());
      }, 150);
    };
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
