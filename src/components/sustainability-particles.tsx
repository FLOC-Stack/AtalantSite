"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
};

const PARTICLE_COUNT = 220;
const STREAMS = 5;

const COLORS = [
  new THREE.Color(0x0f7a3a),
  new THREE.Color(0x22a45a),
  new THREE.Color(0x54c878),
  new THREE.Color(0xa7e8b3),
  new THREE.Color(0xeaffef),
];

type ParticleSeed = {
  stream: number;
  phase: number;
  offset: number;
  radius: number;
  speed: number;
  depth: number;
  size: number;
};

export function SustainabilityParticles({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;
    if (initialWidth === 0 || initialHeight === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, initialWidth / initialHeight, 1, 2600);
    camera.position.set(0, 0, 820);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);
    const seeds: ParticleSeed[] = [];

    for (let index = 0; index < PARTICLE_COUNT; index++) {
      const stream = index % STREAMS;
      const phase = index / PARTICLE_COUNT;
      const roll = Math.random();
      const color =
        roll < 0.32
          ? COLORS[0]
          : roll < 0.58
            ? COLORS[1]
            : roll < 0.82
              ? COLORS[2]
              : roll < 0.95
                ? COLORS[3]
                : COLORS[4];

      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
      scales[index] = 1;
      opacities[index] = 1;
      seeds.push({
        stream,
        phase,
        offset: Math.random() * Math.PI * 2,
        radius: 0.72 + Math.random() * 0.5,
        speed: 0.35 + Math.random() * 0.45,
        depth: -160 + Math.random() * 320,
        size: 6 + Math.random() * 14,
      });
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
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (260.0 / -mvPosition.z);
          vColor = aColor;
          vOpacity = opacity;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.08, d);
          float edge = smoothstep(0.5, 0.28, d);
          gl_FragColor = vec4(vColor, (core * 0.58 + edge * 0.42) * vOpacity);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.z = -0.09;
    scene.add(particles);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(initialWidth, initialHeight);
    container.appendChild(renderer.domElement);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let tick = 0;
    let visible = true;
    let running = false;

    const drawFrame = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const spreadX = Math.min(980, width * 1.08);
      const spreadY = Math.min(520, height * 0.78);
      const pos = geometry.attributes.position.array as Float32Array;
      const sc = geometry.attributes.scale.array as Float32Array;
      const alpha = geometry.attributes.opacity.array as Float32Array;

      for (let index = 0; index < PARTICLE_COUNT; index++) {
        const seed = seeds[index];
        const t = (seed.phase + tick * seed.speed) % 1;
        const streamOffset = (seed.stream - (STREAMS - 1) / 2) * 0.15;
        const curve = Math.sin((t * Math.PI * 2 + seed.offset) * 1.4);
        const secondary = Math.cos(t * Math.PI * 4 + seed.offset);
        const x = (t - 0.5) * spreadX;
        const y = (curve * 0.34 + streamOffset + secondary * 0.045) * spreadY * seed.radius;
        const z = seed.depth + Math.sin(t * Math.PI * 2 + seed.offset) * 90;
        const fadeIn = Math.min(1, t / 0.18);
        const fadeOut = Math.min(1, (1 - t) / 0.24);
        const fade = Math.max(0, Math.min(fadeIn, fadeOut));

        pos[index * 3] = x;
        pos[index * 3 + 1] = y;
        pos[index * 3 + 2] = z;
        sc[index] = seed.size * (0.72 + fade * 1.35);
        alpha[index] = fade * (0.24 + seed.radius * 0.32);
      }

      particles.rotation.y = Math.sin(tick * 0.62) * 0.1;
      particles.rotation.x = Math.cos(tick * 0.44) * 0.035;
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;
      geometry.attributes.opacity.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!visible) {
        running = false;
        return;
      }

      running = true;
      drawFrame();
      tick += 0.0048;
      rafId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (reducedMotion) {
        drawFrame();
        return;
      }

      if (!running) animate();
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
      { threshold: 0 },
    );
    visibilityObserver.observe(container);
    start();

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
        drawFrame();
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
