"use client";

import { useEffect, useRef } from "react";

/**
 * Matriz Bayer 8×8 clásica (valores 0..63).
 * Se normaliza a 0..1 para usar como umbral por píxel.
 */
const BAYER_8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

export type Rgb = [number, number, number];

type Props = {
  src: string;
  poster?: string;
  /** Tamaño (en px de CSS) de cada "celda" del dither. 2 = fino, 6 = grueso. Por defecto 3. */
  cellSize?: number;
  /** Color claro (RGB 0-255). Por defecto blanco. */
  light?: Rgb;
  /** Color oscuro (RGB 0-255). Por defecto primary-dark (#1e4bb6). */
  dark?: Rgb;
  /** fps máximo del efecto. 24 por defecto — suficiente y ahorra CPU. */
  targetFps?: number;
  className?: string;
};

export function DitheredVideo({
  src,
  poster,
  cellSize = 3,
  light = [255, 255, 255],
  dark = [30, 75, 182],
  targetFps = 24,
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let rafId = 0;
    let lastDraw = 0;
    let offW = 0;
    let offH = 0;
    const minFrameMs = 1000 / Math.max(1, targetFps);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width / cellSize));
      const h = Math.max(1, Math.floor(rect.height / cellSize));
      if (w === offW && h === offH) return;
      offW = w;
      offH = h;
      canvas.width = w;
      canvas.height = h;
    };

    const tick = (ts: number) => {
      rafId = requestAnimationFrame(tick);
      if (ts - lastDraw < minFrameMs) return;
      if (video.readyState < 2 || offW === 0 || offH === 0) return;
      lastDraw = ts;

      try {
        // 1) Downscale del frame actual al tamaño del canvas interno
        ctx.drawImage(video, 0, 0, offW, offH);
        const frame = ctx.getImageData(0, 0, offW, offH);
        const data = frame.data;
        const [lr, lg, lb] = light;
        const [dr, dg, db] = dark;

        // 2) Bayer threshold → duotone
        for (let y = 0; y < offH; y++) {
          const rowOffset = (y & 7) << 3;
          for (let x = 0; x < offW; x++) {
            const i = (y * offW + x) * 4;
            const brightness =
              (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) /
              255;
            const threshold = BAYER_8[rowOffset + (x & 7)] / 64;
            const useLight = brightness > threshold;
            data[i] = useLight ? lr : dr;
            data[i + 1] = useLight ? lg : dg;
            data[i + 2] = useLight ? lb : db;
            data[i + 3] = 255;
          }
        }

        ctx.putImageData(frame, 0, 0);
      } catch {
        // SecurityError (CORS), InvalidStateError, etc. — dejamos el bucle vivo
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Arranca el bucle de rendering desde el mount.
    // Mientras readyState < 2 simplemente skip — en cuanto haya frame, pinta.
    rafId = requestAnimationFrame(tick);

    // Forzamos play (muted + playsInline permite autoplay sin gesto de usuario)
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* Si el navegador bloquea autoplay, el video queda en pausa.
           El bucle sigue y pintará el poster / primer frame. */
      });
    }

    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cellSize, light, dark, targetFps]);

  return (
    <div
      className={className}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Video real — detrás, invisible pero sigue decodificando */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Canvas con el dither por encima */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
          zIndex: 1,
        }}
      />
    </div>
  );
}
