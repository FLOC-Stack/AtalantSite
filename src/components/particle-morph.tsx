"use client";

import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const PARTICLE_COUNT = 6000;
const FOV = 800;

export interface ParticleMorphHandle {
  setShape: (index: number) => void;
  setPaused: (paused: boolean) => void;
}

interface ParticleMorphProps {
  className?: string;
  autoPlay?: boolean;
}

export const ParticleMorph = forwardRef<ParticleMorphHandle, ParticleMorphProps>(
  function ParticleMorph({ className = "", autoPlay = true }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const setShapeRef = useRef<(index: number) => void>(() => {});
    const setPausedRef = useRef<(paused: boolean) => void>(() => {});

    useImperativeHandle(ref, () => ({
      setShape: (index: number) => setShapeRef.current(index),
      setPaused: (paused: boolean) => setPausedRef.current(paused),
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

      const getElbowPipe = (count: number, radius: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const bendRadius = 170;
        const straightLength = 190;
        const arcLength = bendRadius * Math.PI * 0.5;
        const totalLength = straightLength * 2 + arcLength;

        for (let i = 0; i < count; i++) {
          const s = Math.random() * totalLength;
          const cross = Math.random() * Math.PI * 2;
          let x = 0;
          let y = 0;
          let tangent = 0;

          if (s < straightLength) {
            x = -bendRadius - straightLength + s;
            y = 0;
            tangent = 0;
          } else if (s < straightLength + arcLength) {
            const t = (s - straightLength) / arcLength;
            const theta = -Math.PI * 0.5 + t * Math.PI * 0.5;
            x = -bendRadius + bendRadius * Math.cos(theta);
            y = bendRadius + bendRadius * Math.sin(theta);
            tangent = theta + Math.PI * 0.5;
          } else {
            x = 0;
            y = bendRadius + s - straightLength - arcLength;
            tangent = Math.PI * 0.5;
          }

          const normalX = -Math.sin(tangent);
          const normalY = Math.cos(tangent);

          points.push({
            x: x + normalX * Math.cos(cross) * radius,
            y: y + normalY * Math.cos(cross) * radius - 160,
            z: Math.sin(cross) * radius * 0.82,
          });
        }

        return points;
      };

      const getCup = (count: number, height: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const half = height / 2;
        const topRadius = 285;
        const bottomRadius = 155;

        for (let i = 0; i < count; i++) {
          const section = Math.random();
          const angle = Math.random() * Math.PI * 2;
          let y = 0;
          let radius = topRadius;

          if (section < 0.78) {
            const t = Math.random();
            y = half - t * height;
            radius = topRadius - (topRadius - bottomRadius) * t;
          } else if (section < 0.9) {
            y = half - Math.random() * 42;
            radius = topRadius + 18 + Math.random() * 18;
          } else {
            const t = Math.sqrt(Math.random());
            y = -half + Math.random() * 28;
            radius = bottomRadius * t;
          }

          points.push({
            x: Math.cos(angle) * radius,
            y,
            z: Math.sin(angle) * radius * 0.72,
          });
        }

        return points;
      };

      const getWaterBottle = (count: number, height: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const half = height / 2;
        const bottom = -half;
        const bodyTop = half * 0.36;
        const shoulderTop = half * 0.58;
        const neckTop = half * 0.82;
        const capTop = half * 0.95;

        const radiusAt = (y: number) => {
          if (y < bottom + height * 0.08) {
            const t = (y - bottom) / (height * 0.08);
            return 118 + Math.sin(t * Math.PI) * 16;
          }
          if (y < bodyTop) {
            return 132 + Math.sin((y - bottom) / height * Math.PI * 10) * 7;
          }
          if (y < shoulderTop) {
            const t = (y - bodyTop) / (shoulderTop - bodyTop);
            return 132 - t * t * 72;
          }
          if (y < neckTop) return 58;
          if (y < capTop) return 72;
          return 62;
        };

        for (let i = 0; i < count; i++) {
          const section = Math.random();
          const angle = Math.random() * Math.PI * 2;
          let y = bottom + Math.random() * height;
          let radius = radiusAt(y);

          if (section > 0.9) {
            y = bottom + Math.random() * 34;
            radius = Math.sqrt(Math.random()) * 118;
          } else if (section > 0.8) {
            y = capTop - Math.random() * 58;
            radius = 76 + Math.random() * 10;
          }

          points.push({
            x: Math.cos(angle) * radius,
            y,
            z: Math.sin(angle) * radius * 0.78,
          });
        }

        return points;
      };

      const getBottle = (count: number, height: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const half = height / 2;
        const bottom = -half;
        const bodyTop = half * 0.34;
        const shoulderTop = half * 0.54;
        const neckTop = half * 0.78;
        const capTop = half * 0.94;

        const radiusAt = (y: number) => {
          if (y < bottom + height * 0.08) {
            const t = (y - bottom) / (height * 0.08);
            return 205 + Math.sin(t * Math.PI) * 18;
          }
          if (y < bodyTop) return 215;
          if (y < shoulderTop) {
            const t = (y - bodyTop) / (shoulderTop - bodyTop);
            return 215 - t * t * 122;
          }
          if (y < neckTop) return 93;
          if (y < capTop) return 112;
          return 96;
        };

        for (let i = 0; i < count; i++) {
          if (Math.random() > 0.78) {
            const loop = Math.random() * Math.PI * 2;
            const tube = Math.random() * Math.PI * 2;
            const tubeRadius = 26 + Math.random() * 12;
            const handleX = 225 + Math.cos(loop) * 50 + Math.cos(tube) * tubeRadius;
            const handleY = half * 0.02 + Math.sin(loop) * 175 + Math.sin(tube) * tubeRadius;
            const handleZ = Math.sin(tube) * 42 + Math.cos(loop) * 18;

            points.push({
              x: handleX,
              y: handleY,
              z: handleZ,
            });
            continue;
          }

          const t = i / count;
          const y = bottom + t * height;
          const angle = Math.random() * Math.PI * 2;
          const radius = radiusAt(y);
          const surfaceNoise = Math.sin(t * Math.PI * 8) * 6;

          points.push({
            x: Math.cos(angle) * (radius + surfaceNoise),
            y,
            z: Math.sin(angle) * radius * 0.72,
          });
        }

        return points;
      };

      const getWave = (count: number, width: number, depth: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i < count; i++) {
          const x = (Math.random() - 0.5) * width;
          const z = (Math.random() - 0.5) * depth;
          points.push({
            x,
            y: Math.sin(x * 0.018) * 90 + Math.cos(z * 0.014) * 70,
            z,
          });
        }
        return points;
      };

      const getShoppingBag = (count: number, height: number) => {
        const points: { x: number; y: number; z: number }[] = [];
        const half = height / 2;
        const bodyTop = half * 0.55;
        const bodyBottom = -half * 0.74;
        const bodyHeight = bodyTop - bodyBottom;

        for (let i = 0; i < count; i++) {
          const section = Math.random();

          if (section > 0.82) {
            const side = Math.random() > 0.5 ? 1 : -1;
            const t = Math.random() * Math.PI;
            const tube = Math.random() * Math.PI * 2;
            const tubeRadius = 16 + Math.random() * 10;

            points.push({
              x: side * 108 + Math.cos(tube) * tubeRadius,
              y: bodyTop + Math.sin(t) * 185 + Math.sin(tube) * tubeRadius,
              z: Math.cos(t) * 34 + Math.sin(tube) * 24,
            });
            continue;
          }

          const t = Math.random();
          const y = bodyTop - t * bodyHeight;
          const angle = Math.random() * Math.PI * 2;
          const width = 245 - t * 42 + Math.sin(t * Math.PI * 4) * 12;
          const depth = 78 + Math.sin(t * Math.PI) * 26;
          const crease = Math.sin((angle + t * 5) * 3) * 13;

          points.push({
            x: Math.cos(angle) * (width + crease),
            y,
            z: Math.sin(angle) * depth,
          });
        }

        return points;
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
        const snap = isReducedMotion();
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          tx[i] = target[i].x;
          ty[i] = target[i].y;
          tz[i] = target[i].z;
          if (snap) {
            px[i] = tx[i];
            py[i] = ty[i];
            pz[i] = tz[i];
          }
        }
      };

      // Expose setShape to parent
      setShapeRef.current = updateTargets;

      // Reduced motion: skip in-flight tweens by snapping current to target.
      const reducedMotionQuery =
        typeof window !== "undefined"
          ? window.matchMedia("(prefers-reduced-motion: reduce)")
          : null;
      const isReducedMotion = () => Boolean(reducedMotionQuery?.matches);

      let isPaused = false;
      setPausedRef.current = (paused: boolean) => {
        if (paused === isPaused) return;
        isPaused = paused;
        if (!paused) {
          animate();
        }
      };

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
          getSphere(PARTICLE_COUNT, 400),        // 0 - hero
          getBottle(PARTICLE_COUNT, 920),        // 1 - PE
          getTorus(PARTICLE_COUNT, 320, 130),    // 2 - PP
          getElbowPipe(PARTICLE_COUNT, 128),      // 3 - PVC
          getWave(PARTICLE_COUNT, 900, 620),     // 4 - EVA
          getCup(PARTICLE_COUNT, 760),           // 5 - PS
          getWaterBottle(PARTICLE_COUNT, 900),    // 6 - PET
          getShoppingBag(PARTICLE_COUNT, 780),    // 7 - REC
        ];

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
        if (isPaused) return;

        ctx.clearRect(0, 0, cssWidth, cssHeight);
        const reduced = isReducedMotion();
        if (!reduced) time += 0.01;

        // Auto-cycle only when autoPlay is enabled (and motion is allowed)
        if (autoPlay && !reduced) {
          const targetIndex = Math.floor((time / CYCLE_INTERVAL) % shapes.length);
          if (targetIndex !== currentShapeIndex) {
            updateTargets(targetIndex);
          }
        }

        const camZ = 200;
        currentRotX += (mouseY - currentRotX) * 0.05;
        currentRotY += (mouseX - currentRotY) * 0.05;

        const isBottleShape = currentShapeIndex === 1;
        const isElbowPipeShape = currentShapeIndex === 3;
        const globalAngleX = isBottleShape
          ? -0.08 + Math.sin(time * 0.7) * 0.035 + currentRotX * Math.PI * 0.12
          : isElbowPipeShape
            ? -0.08 + Math.sin(time * 0.6) * 0.025 + currentRotX * Math.PI * 0.08
          : time * 0.15 + currentRotX * Math.PI * 0.3;
        const globalAngleY = isBottleShape
          ? -0.22 + Math.sin(time * 0.55) * 0.075 + currentRotY * Math.PI * 0.12
          : isElbowPipeShape
            ? -0.34 + Math.sin(time * 0.5) * 0.05 + currentRotY * Math.PI * 0.08
          : time * 0.2 + currentRotY * Math.PI * 0.3;

        if (reduced) {
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            px[i] = tx[i];
            py[i] = ty[i];
            pz[i] = tz[i];
          }
        } else {
          for (let i = 0; i < PARTICLE_COUNT; i++) {
            const noiseX = Math.cos(time * 2 + offsets[i]) * 2;
            const noiseY = Math.sin(time * 2 + offsets[i]) * 2;
            const noiseZ = Math.cos(time * 2 + offsets[i] + Math.PI) * 2;
            px[i] += (tx[i] + noiseX - px[i]) * 0.04;
            py[i] += (ty[i] + noiseY - py[i]) * 0.04;
            pz[i] += (tz[i] + noiseZ - pz[i]) * 0.04;
          }
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
