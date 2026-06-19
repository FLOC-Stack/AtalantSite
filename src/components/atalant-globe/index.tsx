"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { MeshBasicMaterial } from "three";
import {
  DESTINATIONS,
  HUBS,
  buildRoutes,
  type Destination,
  type Hub,
} from "./routes";
import { GlobeTooltip, type TooltipNode } from "./globe-tooltip";

/**
 * react-globe.gl es SSR-hostile (usa WebGL + referencias a window).
 * Lo importamos como componente dinámico solo en cliente.
 */
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

/**
 * GeoJSON público de países a baja resolución (Natural Earth 110m) — se usa
 * para pintar continentes como mallas de hexágonos en modo "dotted".
 */
// Sirviendo el GeoJSON local desde /public para evitar CORS/404 de CDNs
// (Natural Earth 110m admin 0 — ~820 KB).
const COUNTRIES_GEOJSON_URL = "/datasets/countries-110m.geojson";

const BLUE_MARBLE_URL =
  "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";

export type AtalantGlobeStyle = "dotted" | "blueMarble";

type Props = {
  style?: AtalantGlobeStyle;
  hubs?: Hub[];
  destinations?: Destination[];
};

type PointDatum =
  | { kind: "hub"; data: Hub; lat: number; lng: number }
  | { kind: "destination"; data: Destination; lat: number; lng: number };

// Tipo ligero para features de GeoJSON (evitamos importar @types/geojson)
type Feature = { type: "Feature"; geometry: unknown; properties: unknown };

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

function GlobeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative aspect-square h-[78%] max-h-[620px] min-h-[260px] rounded-full border border-primary/15 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.95)_0,rgba(246,247,253,0.88)_34%,rgba(30,75,182,0.12)_68%,rgba(30,75,182,0.04)_100%)] shadow-[0_30px_90px_rgba(30,75,182,0.16)]">
        <div className="absolute inset-[10%] rounded-full border border-primary/10" />
        <div className="absolute inset-[20%] rounded-full border border-primary/10" />
        <div className="absolute left-[18%] top-[47%] h-px w-[64%] rotate-[-12deg] bg-primary/35" />
        <div className="absolute left-[24%] top-[54%] h-px w-[52%] rotate-[18deg] bg-primary/25" />
        <span className="absolute left-[39%] top-[48%] h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="absolute left-[43%] top-[52%] h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="absolute left-[61%] top-[37%] h-2 w-2 rounded-full bg-primary/70" />
        <span className="absolute left-[67%] top-[62%] h-2 w-2 rounded-full bg-primary/60" />
      </div>
    </div>
  );
}

export function AtalantGlobe({
  style = "dotted",
  hubs = HUBS,
  destinations = DESTINATIONS,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(undefined);
  const [hovered, setHovered] = useState<TooltipNode | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [countries, setCountries] = useState<Feature[]>([]);
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) setWebglAvailable(hasWebGLSupport());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch del geojson (solo modo dotted)
  useEffect(() => {
    if (style !== "dotted" || !webglAvailable) return;
    let cancelled = false;
    fetch(COUNTRIES_GEOJSON_URL)
      .then((r) => r.json())
      .then((gj: { features: Feature[] }) => {
        if (!cancelled) setCountries(gj.features ?? []);
      })
      .catch(() => {
        if (!cancelled) setCountries([]);
      });
    return () => {
      cancelled = true;
    };
  }, [style, webglAvailable]);

  // Medición responsive del contenedor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setDims({
        w: Math.max(1, Math.floor(entry.contentRect.width)),
        h: Math.max(1, Math.floor(entry.contentRect.height)),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // La configuración de cámara se aplica también vía onGlobeReady (más fiable
  // que un useEffect que corre antes de que el canvas exista).
  const applyCamera = () => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls();
    controls.autoRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    // Centro sobre la Península Ibérica para enseñar el diseño estático
    g.pointOfView({ lat: 40, lng: -3, altitude: 2.3 }, 0);
  };
  useEffect(() => {
    if (dims.w === 0) return;
    applyCamera();
  }, [dims.w, dims.h]);

  const points = useMemo<PointDatum[]>(
    () => [
      ...hubs.map((h) => ({
        kind: "hub" as const,
        data: h,
        lat: h.lat,
        lng: h.lng,
      })),
      ...destinations.map((d) => ({
        kind: "destination" as const,
        data: d,
        lat: d.lat,
        lng: d.lng,
      })),
    ],
    [hubs, destinations],
  );

  const routes = useMemo(() => buildRoutes(hubs, destinations), [hubs, destinations]);

  // Material blanco sólido para la esfera del globo — oculta la cara trasera
  // de los dots sin depender de luces (MeshBasic es flat-shaded).
  const solidWhiteMaterial = useMemo(
    () => new MeshBasicMaterial({ color: 0xffffff }),
    [],
  );

  const handleHover = (raw: object | null) => {
    const p = raw as PointDatum | null;
    if (!p) {
      setHovered(null);
      return;
    }
    setHovered(
      p.kind === "hub"
        ? { type: "hub", data: p.data }
        : { type: "destination", data: p.data },
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const dottedProps =
    style === "dotted"
      ? {
          hexPolygonsData: countries,
          hexPolygonResolution: 4,
          hexPolygonMargin: 0.55,
          hexPolygonUseDots: true,
          hexPolygonColor: () => "#1e4bb6",
          // Dots flotando 4% por encima del radio de la esfera blanca →
          // en la silueta los puntos sobresalen del borde creando un halo
          // que insinúa volumen (la esfera sólida queda "dentro" del cascarón).
          hexPolygonAltitude: 0.04,
        }
      : {};

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onMouseMove={handleMouseMove}
    >
      {webglAvailable === false ? <GlobeFallback /> : null}

      {webglAvailable && dims.w > 0 && dims.h > 0 ? (
        <div
          className="absolute"
          style={{
            top: -50,
            left: -50,
            width: dims.w + 100,
            height: dims.h + 100,
          }}
        >
        <Globe
          ref={globeRef}
          width={dims.w + 100}
          height={dims.h + 100}
          backgroundColor="rgba(0,0,0,0)"
          showGlobe
          showAtmosphere
          atmosphereColor="#1e4bb6"
          atmosphereAltitude={0.14}
          globeImageUrl={style === "blueMarble" ? BLUE_MARBLE_URL : undefined}
          globeMaterial={style === "dotted" ? solidWhiteMaterial : undefined}
          onGlobeReady={applyCamera}
          {...dottedProps}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointAltitude={0.01}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          pointRadius={(p: any) => (p.kind === "hub" ? 0.45 : 0.3)}
          // Dots sutiles del color del background — se leen como huecos/marcas
          // tenues sobre la esfera blanca en vez de competir con los arcos.
          pointColor={() => "#f6f7fd"}
          pointsMerge={false}
          onPointHover={handleHover}
          arcsData={routes}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          arcColor={(a: any) => a.color}
          arcStroke={0.18}
          arcDashLength={0.4}
          arcDashGap={2.5}
          arcDashAnimateTime={1400}
          arcAltitudeAutoScale={0.5}
        />
        </div>
      ) : null}

      <GlobeTooltip node={hovered} x={cursor.x} y={cursor.y} />
    </div>
  );
}

export default AtalantGlobe;
