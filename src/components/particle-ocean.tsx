"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleOceanProps {
  className?: string;
  mouseTargetRef?: React.RefObject<HTMLElement | null>;
}

// Mar 3D: grid en plano XZ con oscilación vertical suave por suma de senos.
// Paleta de azules como el resto del sitio (primary 55% / light 25% / pale 20%).
const SEPARATION = 20;
const AMOUNTX = 270;
const AMOUNTY = 190;

const COLORS = [
  new THREE.Color(0x1e4bb6), // primary
  new THREE.Color(0x6496f0), // light
  new THREE.Color(0xa0b9eb), // pale
];

export function ParticleOcean({ className, mouseTargetRef }: ParticleOceanProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w0 = container.clientWidth;
    const h0 = container.clientHeight;
    if (w0 === 0 || h0 === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, w0 / h0, 1, 10000);
    camera.position.z = 1300;
    camera.position.y = 220;

    const count = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let p = 0;
    let s = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[p] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[p + 1] = 0;
        positions[p + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;

        const roll = Math.random();
        const color = roll < 0.55 ? COLORS[0] : roll < 0.8 ? COLORS[1] : COLORS[2];
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
          gl_PointSize = scale * (260.0 / -mvPosition.z);
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
          float depthFade = clamp(1.15 - vDepth / 3200.0, 0.12, 1.0);
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
    container.appendChild(renderer.domElement);

    // Cámara fija: sin parallax. La escena respira sólo con las ondas.
    camera.lookAt(scene.position);

    // Frecuencia ajustada a la nueva densidad: al reducir SEPARATION a la
    // mitad duplicamos los índices por onda, así que también bajamos la
    // frecuencia a la mitad — el patrón visual de las ondas se mantiene igual
    // al de antes. Amplitud y velocidad como en la versión original.
    const FREQ_X = 0.094;
    const FREQ_Y = 0.156;
    const AMP = 50;
    const TIME_STEP = 0.08;
    const SIZE_PULSE = 4;

    let rafId = 0;
    let tick = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const pos = geometry.attributes.position.array as Float32Array;
      const sc = geometry.attributes.scale.array as Float32Array;

      let p = 0;
      let s = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        const sx = Math.sin((ix + tick) * FREQ_X);
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const sy = Math.sin((iy + tick) * FREQ_Y);
          pos[p + 1] = sx * AMP + sy * AMP;
          sc[s] = (sx + 1) * SIZE_PULSE + (sy + 1) * SIZE_PULSE;
          p += 3;
          s += 1;
        }
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
      tick += TIME_STEP;
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
  }, [mouseTargetRef]);

  return <div ref={containerRef} className={className} />;
}
