"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleOceanProps {
  className?: string;
  mouseTargetRef?: React.RefObject<HTMLElement | null>;
  variant?: "default" | "home";
}

const COLORS = [
  new THREE.Color(0x1e4bb6), // primary
  new THREE.Color(0x6496f0), // light
  new THREE.Color(0xa0b9eb), // pale
];

const PARTICLE_CONFIG = {
  default: {
    separation: 20,
    amountX: 270,
    amountY: 190,
    cameraZ: 1300,
    cameraY: 220,
    pointSize: 260,
    freqX: 0.094,
    freqY: 0.156,
    amplitude: 50,
    timeStep: 0.08,
    sizePulse: 4,
    depthFadeMin: 0.12,
    depthFadeFalloff: 3200,
    colorMix: [0.55, 0.8],
    shimmerOpacity: 0.16,
    gridOpacity: 0.55,
  },
  home: {
    separation: 18,
    amountX: 290,
    amountY: 210,
    cameraZ: 1220,
    cameraY: 190,
    pointSize: 330,
    freqX: 0.082,
    freqY: 0.14,
    amplitude: 64,
    timeStep: 0.07,
    sizePulse: 5.2,
    depthFadeMin: 0.18,
    depthFadeFalloff: 2900,
    colorMix: [0.52, 0.83],
    shimmerOpacity: 0.22,
    gridOpacity: 0.42,
  },
} as const;

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function ParticleOcean({
  className,
  mouseTargetRef,
  variant = "default",
}: ParticleOceanProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = PARTICLE_CONFIG[variant];

  useEffect(() => {
    const particleConfig = PARTICLE_CONFIG[variant];
    const container = containerRef.current;
    if (!container) return;

    const w0 = container.clientWidth;
    const h0 = container.clientHeight;
    if (w0 === 0 || h0 === 0) return;

    if (!hasWebGLSupport()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w0 / h0, 1, 10000);
    camera.position.z = particleConfig.cameraZ;
    camera.position.y = particleConfig.cameraY;

    const count = particleConfig.amountX * particleConfig.amountY;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let p = 0;
    let s = 0;
    for (let ix = 0; ix < particleConfig.amountX; ix++) {
      for (let iy = 0; iy < particleConfig.amountY; iy++) {
        positions[p] = ix * particleConfig.separation - (particleConfig.amountX * particleConfig.separation) / 2;
        positions[p + 1] = 0;
        positions[p + 2] = iy * particleConfig.separation - (particleConfig.amountY * particleConfig.separation) / 2;

        const roll = Math.random();
        const color =
          roll < particleConfig.colorMix[0]
            ? COLORS[0]
            : roll < particleConfig.colorMix[1]
              ? COLORS[1]
              : COLORS[2];
        colors[p] = color.r;
        colors[p + 1] = color.g;
        colors[p + 2] = color.b;

        scales[s] = 1;
        p += 3;
        s += 1;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      vertexShader: `
        attribute float scale;
        attribute vec3 aColor;
        varying float vDepth;
        varying vec3 vColor;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * (${particleConfig.pointSize.toFixed(1)} / -mvPosition.z);
          vDepth = -mvPosition.z;
          vColor = aColor;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vDepth;
        varying vec3 vColor;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float edge = smoothstep(0.5, 0.4, d);
          float depthFade = clamp(1.18 - vDepth / ${particleConfig.depthFadeFalloff.toFixed(1)}, ${particleConfig.depthFadeMin.toFixed(2)}, 1.0);
          gl_FragColor = vec4(vColor, edge * depthFade);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w0, h0);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.zIndex = "2";
    container.appendChild(renderer.domElement);

    // Cámara fija: sin parallax. La escena respira sólo con las ondas.
    camera.lookAt(scene.position);

    // Frecuencia ajustada a la nueva densidad: al reducir SEPARATION a la
    // mitad duplicamos los índices por onda, así que también bajamos la
    // frecuencia a la mitad — el patrón visual de las ondas se mantiene igual
    // al de antes. Amplitud y velocidad como en la versión original.
    let rafId = 0;
    let tick = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array as Float32Array;
      const sc = geometry.attributes.scale.array as Float32Array;

      let p = 0;
      let s = 0;
      for (let ix = 0; ix < particleConfig.amountX; ix++) {
        const sx = Math.sin((ix + tick) * particleConfig.freqX);
        for (let iy = 0; iy < particleConfig.amountY; iy++) {
          const sy = Math.sin((iy + tick) * particleConfig.freqY);
          pos[p + 1] = sx * particleConfig.amplitude + sy * particleConfig.amplitude;
          sc[s] = (sx + 1) * particleConfig.sizePulse + (sy + 1) * particleConfig.sizePulse;
          p += 3;
          s += 1;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
      tick += particleConfig.timeStep;
    };
    animate();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 150);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [mouseTargetRef, variant]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ""}`}>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(30,75,182,0.22)_0,rgba(30,75,182,0.08)_30%,rgba(255,255,255,0)_66%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 [background-image:radial-gradient(circle,rgba(30,75,182,0.32)_1px,transparent_1px)] [background-size:18px_18px]"
        style={{ opacity: config.gridOpacity }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{
          opacity: config.shimmerOpacity,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(246,247,253,0) 30%, rgba(30,75,182,0.12) 68%, rgba(246,247,253,0) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
