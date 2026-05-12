"use client";

import { useEffect, useRef } from "react";

interface LogoParticlesProps {
  /** Duration in seconds for the assembly animation */
  assemblyDuration?: number;
  /** Delay in seconds before animation starts */
  assemblyDelay?: number;
  mouseRepulsionRadius?: number;
  particleStep?: number;
  startDelayAfterLoadMs?: number;
  backgroundColor?: string;
  className?: string;
  /** Parent element to listen for mouse events (covers full section) */
  mouseTargetRef?: React.RefObject<HTMLElement | null>;
}

const SVG_PATH =
  "M0.83673 37.4303C-0.302664 36.291 -0.288504 34.2732 0.941232 32.507L21.5892 2.85773C22.8998 0.9755 24.044 0 25.8265 0C27.5882 0 28.3676 1.1528 28.8146 1.99414L37.4544 18.2527L40.5369 24.2041C41.9763 26.9432 42.0066 29.4187 40.0231 31.1485C38.1232 32.8049 35.0327 32.3472 33.1436 31.0676C28.1903 27.8115 25.6533 24.7475 20.1046 27.0955C16.8429 28.4762 9.00396 34.8436 6.20604 37.0791C4.23536 38.6519 1.83657 38.4301 0.83673 37.4303Z";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function LogoParticles({
  assemblyDuration = 3,
  assemblyDelay = 0.5,
  mouseRepulsionRadius = 160,
  particleStep = 3,
  startDelayAfterLoadMs = 0,
  backgroundColor = "transparent",
  className,
  mouseTargetRef,
}: LogoParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const containerEl = container;
    const ctx2d = ctx;

    let count = 0;
    let x: Float32Array;
    let y: Float32Array;
    let baseX: Float32Array;
    let baseY: Float32Array;
    let startX: Float32Array;
    let startY: Float32Array;
    let size: Float32Array;
    let density: Float32Array;
    let floatSpeed: Float32Array;
    let floatOffset: Float32Array;
    let floatAmplitude: Float32Array;
    // 0 = primary blue, 1 = light blue, 2 = white
    let colorType: Uint8Array;
    let isVisible = true;
    let isFrameScheduled = false;
    let hasStarted = false;
    let loadTimer: number | undefined;
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const mouseTarget = mouseTargetRef?.current ?? canvas;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    mouseTarget.addEventListener("mousemove", handleMouseMove);
    mouseTarget.addEventListener("mouseleave", handleMouseLeave);

    const init = () => {
      const rect = containerEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Use a fixed rasterization size for consistent pixel sampling
      const rasterW = Math.floor(w);
      const rasterH = Math.floor(h);
      const targetWidth = Math.min(rasterW * 0.55, 800);
      const targetHeight = 39 * (targetWidth / 42);
      // Position logo in the right half, vertically centered
      const offX = Math.floor(rasterW * 0.5 + (rasterW * 0.5 - targetWidth) / 2);
      const offY = Math.floor((rasterH - targetHeight) / 2);

      // Render SVG at target resolution to avoid scaling artifacts
      const svgW = Math.ceil(targetWidth);
      const svgH = Math.ceil(targetHeight);
      const svgString = `<svg width="${svgW}" height="${svgH}" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${SVG_PATH}" fill="#1E4BB6"/></svg>`;
      const img = new Image();
      img.onload = () => {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = rasterW;
        offCanvas.height = rasterH;
        const offCtx = offCanvas.getContext("2d", {
          willReadFrequently: true,
        })!;
        offCtx.drawImage(img, offX, offY, svgW, svgH);
        const imageData = offCtx.getImageData(0, 0, rasterW, rasterH);

        const step = window.innerWidth < 768 ? Math.max(particleStep, 5) : particleStep;
        const positions: { px: number; py: number }[] = [];

        for (let row = 0; row < rasterH; row += step) {
          for (let col = 0; col < rasterW; col += step) {
            const idx = (row * rasterW + col) * 4;
            if (imageData.data[idx + 3] > 10) {
              positions.push({ px: col, py: row });
            }
          }
        }

        count = positions.length;
        x = new Float32Array(count);
        y = new Float32Array(count);
        baseX = new Float32Array(count);
        baseY = new Float32Array(count);
        startX = new Float32Array(count);
        startY = new Float32Array(count);
        size = new Float32Array(count);
        density = new Float32Array(count);
        floatSpeed = new Float32Array(count);
        floatOffset = new Float32Array(count);
        floatAmplitude = new Float32Array(count);
        colorType = new Uint8Array(count);

        for (let i = 0; i < count; i++) {
          const p = positions[i];
          baseX[i] = p.px;
          baseY[i] = p.py;

          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * Math.max(w, h) * 0.72 + 80;
          startX[i] = p.px + Math.cos(angle) * dist;
          startY[i] = p.py + Math.sin(angle) * dist;
          x[i] = startX[i];
          y[i] = startY[i];
          // Color-dependent sizing: white particles are bigger for visibility
          const cRoll = Math.random();
          if (cRoll < 0.55) {
            colorType[i] = 0;
            size[i] = Math.random() * 1.5 + 0.5;
          } else if (cRoll < 0.80) {
            colorType[i] = 1;
            size[i] = Math.random() * 1.8 + 0.8;
          } else {
            colorType[i] = 2;
            size[i] = Math.random() * 2.2 + 1.2;
          }
          density[i] = Math.random() * 60 + 10;
          floatSpeed[i] = Math.random() * 2 + 0.5;
          floatOffset[i] = Math.random() * Math.PI * 2;
          floatAmplitude[i] = Math.random() * 80 + 20;

        }

        startTimeRef.current = performance.now();
        if (reduceMotion) {
          x.set(baseX);
          y.set(baseY);
          progressRef.current = 1;
        }
      };
      img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      if (!hasStarted) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    });
    ro.observe(containerEl);
    init();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = Boolean(entry?.isIntersecting);
        if (isVisible && hasStarted) {
          requestNextFrame();
        }
      },
      { threshold: 0.05 },
    );
    visibilityObserver.observe(containerEl);

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      if (reduceMotion && count > 0) {
        x.set(baseX);
        y.set(baseY);
        progressRef.current = 1;
        requestNextFrame();
      } else {
        startTimeRef.current = performance.now();
        requestNextFrame();
      }
    };
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    const start = () => {
      if (hasStarted) return;
      hasStarted = true;
      init();
      requestNextFrame();
    };

    const scheduleStart = () => {
      loadTimer = window.setTimeout(start, startDelayAfterLoadMs);
    };

    function requestNextFrame() {
      if (!isVisible || isFrameScheduled) return;
      isFrameScheduled = true;
      animFrameRef.current = requestAnimationFrame(() => {
        isFrameScheduled = false;
        animate();
      });
    }

    function animate() {
      if (!isVisible) return;
      if (count === 0 || startTimeRef.current === null) {
        requestNextFrame();
        return;
      }

      const rect = containerEl.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx2d.clearRect(0, 0, w, h);

      // Time-based assembly progress
      const elapsed =
        (performance.now() - startTimeRef.current) / 1000 - assemblyDelay;
      const rawProgress = reduceMotion
        ? 1
        : Math.max(0, Math.min(1, elapsed / assemblyDuration));
      const sp = easeOutCubic(rawProgress);
      progressRef.current = sp;

      // After assembly, subtle idle float
      const idleAmplitude = !reduceMotion && sp >= 1 ? 3 : 0;
      const floatFactor = 1 - sp;
      const t = performance.now() * 0.001;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const repR = mouseRepulsionRadius;

      for (let i = 0; i < count; i++) {
        const cfx =
          Math.cos(t * floatSpeed[i] + floatOffset[i]) *
          (floatAmplitude[i] * floatFactor + idleAmplitude);
        const cfy =
          Math.sin(t * floatSpeed[i] + floatOffset[i]) *
          (floatAmplitude[i] * floatFactor + idleAmplitude);

        let tx = startX[i] + (baseX[i] - startX[i]) * sp + cfx;
        let ty = startY[i] + (baseY[i] - startY[i]) * sp + cfy;

        if (mx != null && my != null) {
          const dx = mx - x[i];
          const dy = my - y[i];
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repR) {
            const force = ((repR - dist) / repR) ** 2;
            const push = force * density[i] * 3;
            const safeDist = Math.max(dist, 0.001);
            tx -= (dx / safeDist) * push;
            ty -= (dy / safeDist) * push;
          }
        }

        // Fast dispersion, slow reconstruction
        const dxTarget = tx - x[i];
        const dyTarget = ty - y[i];
        const distToTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);
        const lerpSpeed = distToTarget > 30 ? 0.15 : 0.04;
        x[i] += dxTarget * lerpSpeed;
        y[i] += dyTarget * lerpSpeed;
      }

      // Fade in particles during assembly
      const opacity = Math.min(1, rawProgress * 3);
      const introOpacity = reduceMotion ? 1 : Math.max(0.18, opacity);

      // Draw particles in 3 color batches for performance
      const colors = [
        `rgba(30, 75, 182, ${0.75 * introOpacity})`,    // primary blue
        `rgba(100, 150, 240, ${0.7 * introOpacity})`,    // light blue
        `rgba(160, 185, 235, ${0.8 * introOpacity})`,    // pale blue (visible on #f6f7fd)
      ];

      for (let c = 0; c < 3; c++) {
        ctx2d.beginPath();
        for (let i = 0; i < count; i++) {
          if (colorType[i] !== c) continue;
          ctx2d.moveTo(x[i] + size[i], y[i]);
          ctx2d.arc(x[i], y[i], size[i], 0, Math.PI * 2);
        }
        ctx2d.fillStyle = colors[c];
        ctx2d.fill();
      }

      if (!reduceMotion) {
        requestNextFrame();
      }
    }

    if (document.readyState === "complete") {
      scheduleStart();
    } else {
      window.addEventListener("load", scheduleStart, { once: true });
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimer);
      if (loadTimer !== undefined) window.clearTimeout(loadTimer);
      window.removeEventListener("load", scheduleStart);
      ro.disconnect();
      visibilityObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      mouseTarget.removeEventListener("mousemove", handleMouseMove);
      mouseTarget.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    particleStep,
    mouseRepulsionRadius,
    assemblyDuration,
    assemblyDelay,
    startDelayAfterLoadMs,
    mouseTargetRef,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ backgroundColor, overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
