"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const PARTICLE_COUNT = 6000;
const FOV = 800;

export interface ParticleMorphHandle {
  setShape: (index: number) => void;
}

interface ParticleMorphProps {
  className?: string;
  autoPlay?: boolean;
}

export const ParticleMorph = forwardRef<ParticleMorphHandle, ParticleMorphProps>(
  function ParticleMorph({ className = "", autoPlay = true }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const setShapeRef = useRef<(index: number) => void>(() => {});

    useImperativeHandle(ref, () => ({
      setShape: (index: number) => setShapeRef.current(index),
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      let animationFrameId: number;
      let time = 0;
      let currentShapeIndex = 0;
      let mouseX = 0;
      let mouseY = 0;
      let currentRotX = 0;
      let currentRotY = 0;

      const px = new Float32Array(PARTICLE_COUNT);
      const py = new Float32Array(PARTICLE_COUNT);
      const pz = new Float32Array(PARTICLE_COUNT);
      const tx = new Float32Array(PARTICLE_COUNT);
      const ty = new Float32Array(PARTICLE_COUNT);
      const tz = new Float32Array(PARTICLE_COUNT);
      const sizes = new Float32Array(PARTICLE_COUNT);
      const offsets = new Float32Array(PARTICLE_COUNT);
      // 0 = blue, 1 = cyan, 2 = white
      const colorType = new Uint8Array(PARTICLE_COUNT);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        sizes[i] = Math.random() * 1.5 + 0.5;
        offsets[i] = Math.random() * Math.PI * 2;
        const r = Math.random();
        colorType[i] = r > 0.9 ? 2 : r > 0.75 ? 1 : 0;
      }

      // Shape generators
      const getSphere = (count: number, radius: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
          const y = 1 - (i / (count - 1)) * 2;
          const r = Math.sqrt(1 - y * y);
          const theta = phi * i;
          points.push({
            x: Math.cos(theta) * r * radius,
            y: y * radius,
            z: Math.sin(theta) * r * radius,
          });
        }
        return points;
      };

      const getTorus = (count: number, R: number, r: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < count; i++) {
          const u = Math.random() * Math.PI * 2;
          const v = Math.random() * Math.PI * 2;
          points.push({
            x: (R + r * Math.cos(v)) * Math.cos(u),
            y: (R + r * Math.cos(v)) * Math.sin(u),
            z: r * Math.sin(v),
          });
        }
        return points;
      };

      const getHelix = (count: number, radius: number, height: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < count; i++) {
          const t = i / count;
          const angle = t * Math.PI * 20;
          points.push({
            x: Math.cos(angle) * radius,
            y: (t - 0.5) * height,
            z: Math.sin(angle) * radius,
          });
        }
        return points;
      };

      const getCube = (count: number, size: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const perFace = Math.floor(count / 6);
        for (let face = 0; face < 6; face++) {
          for (let i = 0; i < perFace; i++) {
            const u = (Math.random() - 0.5) * size;
            const v = (Math.random() - 0.5) * size;
            const half = size / 2;
            if (face === 0) points.push({ x: u, y: v, z: half });
            else if (face === 1) points.push({ x: u, y: v, z: -half });
            else if (face === 2) points.push({ x: half, y: u, z: v });
            else if (face === 3) points.push({ x: -half, y: u, z: v });
            else if (face === 4) points.push({ x: u, y: half, z: v });
            else points.push({ x: u, y: -half, z: v });
          }
        }
        while (points.length < count) points.push({ x: 0, y: 0, z: 0 });
        return points;
      };

      const getCylinder = (count: number, radius: number, height: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const y = (Math.random() - 0.5) * height;
          points.push({
            x: Math.cos(angle) * radius,
            y,
            z: Math.sin(angle) * radius,
          });
        }
        return points;
      };

      const loadLogoShape = (
        count: number,
        callback: (points: { x: number; y: number; z: number }[]) => void
      ) => {
        const svgString = `<svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.83673 37.4303C-0.302664 36.291 -0.288504 34.2732 0.941232 32.507L21.5892 2.85773C22.8998 0.9755 24.044 0 25.8265 0C27.5882 0 28.3676 1.1528 28.8146 1.99414L37.4544 18.2527L40.5369 24.2041C41.9763 26.9432 42.0066 29.4187 40.0231 31.1485C38.1232 32.8049 35.0327 32.3472 33.1436 31.0676C28.1903 27.8115 25.6533 24.7475 20.1046 27.0955C16.8429 28.4762 9.00396 34.8436 6.20604 37.0791C4.23536 38.6519 1.83657 38.4301 0.83673 37.4303Z" fill="#1E4BB6"/>
</svg>`;
        const img = new Image();
        img.onload = () => {
          const offCanvas = document.createElement("canvas");
          const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
          if (!offCtx) return;

          offCanvas.width = 400;
          offCanvas.height = 400;

          const targetWidth = 250;
          const scale = targetWidth / 42;
          const targetHeight = 39 * scale;
          const offsetX = (offCanvas.width - targetWidth) / 2;
          const offsetY = (offCanvas.height - targetHeight) / 2;

          offCtx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight);

          const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
          const pixels: { x: number; y: number }[] = [];

          for (let y = 0; y < offCanvas.height; y += 2) {
            for (let x = 0; x < offCanvas.width; x += 2) {
              const alpha = imgData.data[(y * offCanvas.width + x) * 4 + 3];
              if (alpha > 10) {
                pixels.push({ x: x - offCanvas.width / 2, y: y - offCanvas.height / 2 });
              }
            }
          }

          const points: { x: number; y: number; z: number }[] = [];
          if (pixels.length > 0) {
            for (let i = 0; i < count; i++) {
              const pixel = pixels[i % pixels.length];
              points.push({
                x: pixel.x * 3,
                y: pixel.y * 3,
                z: (Math.random() - 0.5) * 300,
              });
            }
            callback(points.sort(() => Math.random() - 0.5));
          }
        };
        img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
      };

      // 3D engine
      const rotate3D = (x: number, y: number, z: number, angleX: number, angleY: number) => {
        const cosX = Math.cos(angleX),
          sinX = Math.sin(angleX);
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const cosY = Math.cos(angleY),
          sinY = Math.sin(angleY);
        return {
          x: x * cosY + z1 * sinY,
          y: y1,
          z: -x * sinY + z1 * cosY,
        };
      };

      let cssWidth = 0;
      let cssHeight = 0;

      const project3D = (x: number, y: number, z: number, camZ: number) => {
        const scale = FOV / (FOV + z + camZ);
        if (scale < 0) return null;
        return {
          x: x * scale + cssWidth / 2,
          y: y * scale + cssHeight / 2,
          scale,
        };
      };

      // Init
      let shapes: { x: number; y: number; z: number }[][] = [];

      const updateTargets = (shapeIndex: number) => {
        if (shapeIndex < 0 || shapeIndex >= shapes.length) return;
        if (shapeIndex === currentShapeIndex) return;
        currentShapeIndex = shapeIndex;
        const target = shapes[shapeIndex];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          tx[i] = target[i].x;
          ty[i] = target[i].y;
          tz[i] = target[i].z;
        }
      };

      // Expose setShape to parent
      setShapeRef.current = updateTargets;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio, 2);
        const rect = canvas.getBoundingClientRect();
        cssWidth = rect.width;
        cssHeight = rect.height;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
      };

      const init = () => {
        resize();
        shapes = [
          getSphere(PARTICLE_COUNT, 400),       // 0 - PE
          getTorus(PARTICLE_COUNT, 320, 130),    // 1 - PP
          getHelix(PARTICLE_COUNT, 240, 1000),   // 2 - PVC
          getCube(PARTICLE_COUNT, 600),          // 3 - PS
          getCylinder(PARTICLE_COUNT, 260, 800), // 4 - PET
          getSphere(PARTICLE_COUNT, 400),        // 5 - placeholder for logo (REC)
        ];

        loadLogoShape(PARTICLE_COUNT, (logoPoints) => {
          shapes[5] = logoPoints;
          if (currentShapeIndex === 5) updateTargets(5);
        });

        // Start dispersed, targets converge to sphere
        const initial = shapes[0];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          // Scatter randomly across a large volume
          px[i] = (Math.random() - 0.5) * 2000;
          py[i] = (Math.random() - 0.5) * 2000;
          pz[i] = (Math.random() - 0.5) * 2000;
          tx[i] = initial[i].x;
          ty[i] = initial[i].y;
          tz[i] = initial[i].z;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };

      canvas.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", resize);

      init();

      const CYCLE_INTERVAL = 5;

      const animate = () => {
        ctx.clearRect(0, 0, cssWidth, cssHeight);
        time += 0.01;

        // Auto-cycle only when autoPlay is enabled
        if (autoPlay) {
          const targetIndex = Math.floor((time / CYCLE_INTERVAL) % shapes.length);
          if (targetIndex !== currentShapeIndex) {
            updateTargets(targetIndex);
          }
        }

        const camZ = 200;
        currentRotX += (mouseY - currentRotX) * 0.05;
        currentRotY += (mouseX - currentRotY) * 0.05;

        const globalAngleX = time * 0.15 + currentRotX * Math.PI * 0.3;
        const globalAngleY = time * 0.2 + currentRotY * Math.PI * 0.3;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const noiseX = Math.cos(time * 2 + offsets[i]) * 2;
          const noiseY = Math.sin(time * 2 + offsets[i]) * 2;
          const noiseZ = Math.cos(time * 2 + offsets[i] + Math.PI) * 2;
          px[i] += (tx[i] + noiseX - px[i]) * 0.04;
          py[i] += (ty[i] + noiseY - py[i]) * 0.04;
          pz[i] += (tz[i] + noiseZ - pz[i]) * 0.04;
        }

        const projected: { x: number; y: number; z: number; scale: number; color: number; size: number }[] = [];

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const rotated = rotate3D(px[i], py[i], pz[i], globalAngleX, globalAngleY);
          const p = project3D(rotated.x, rotated.y, rotated.z, camZ);
          if (p) {
            projected.push({
              x: p.x,
              y: p.y,
              z: rotated.z,
              scale: p.scale,
              color: colorType[i],
              size: sizes[i],
            });
          }
        }

        projected.sort((a, b) => b.z - a.z);

        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const depthAlpha = Math.max(0.1, Math.min(1, (1000 - p.z) / 1000));
          ctx.globalAlpha = depthAlpha;
          const colors = ["rgba(30, 75, 182, 0.8)", "rgba(100, 150, 255, 0.8)", "rgba(255, 255, 255, 1)"];
          ctx.fillStyle = colors[p.color];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        canvas.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(animationFrameId);
      };
    }, [autoPlay]);

    return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} />;
  }
);
