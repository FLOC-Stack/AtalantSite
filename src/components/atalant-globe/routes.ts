/**
 * Hubs de origen y destinos de distribución de Atalant.
 * Dataset de fase 1 — cuando Payload esté listo se migra a una colección
 * `distributionHub` y este archivo se queda como fallback.
 */

export type Hub = {
  code: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  /** Rol operativo (visible en tooltip) */
  role: string;
  /** Año en que empezó a operar */
  since: number;
};

export type DestinationRegion = "Iberia" | "Europa" | "NAF";
export type DestinationStatus = "active" | "legacy";

export type Destination = {
  code: string;
  name: string;
  lat: number;
  lng: number;
  region: DestinationRegion;
  since: number;
  status: DestinationStatus;
};

export type Route = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  status: DestinationStatus;
};

export const HUBS: Hub[] = [
  {
    code: "VLC",
    name: "Valencia",
    city: "Valencia",
    country: "España",
    lat: 39.4699,
    lng: -0.3763,
    role: "Depósito Aduanero",
    since: 2009,
  },
  {
    code: "ALC",
    name: "Alicante",
    city: "Alicante",
    country: "España",
    lat: 38.3452,
    lng: -0.481,
    role: "Depósito Aduanero",
    since: 2009,
  },
];

export const DESTINATIONS: Destination[] = [
  { code: "ES", name: "España", lat: 40.4168, lng: -3.7038, region: "Iberia", since: 1997, status: "active" },
  { code: "PT", name: "Portugal", lat: 38.7223, lng: -9.1393, region: "Iberia", since: 2000, status: "active" },
  { code: "IT", name: "Italia", lat: 41.9028, lng: 12.4964, region: "Europa", since: 2010, status: "active" },
  { code: "NL", name: "Países Bajos", lat: 52.3676, lng: 4.9041, region: "Europa", since: 2010, status: "active" },
  { code: "MA", name: "Marruecos", lat: 33.5731, lng: -7.5898, region: "NAF", since: 2014, status: "active" },
  { code: "DZ", name: "Argelia", lat: 36.7538, lng: 3.0588, region: "NAF", since: 2014, status: "active" },
];

export function buildRoutes(
  hubs: Hub[] = HUBS,
  destinations: Destination[] = DESTINATIONS,
): Route[] {
  const PRIMARY = "#1e4bb6";
  const LEGACY = "rgba(27, 28, 26, 0.3)";
  return hubs.flatMap((h) =>
    destinations.map<Route>((d) => ({
      startLat: h.lat,
      startLng: h.lng,
      endLat: d.lat,
      endLng: d.lng,
      status: d.status,
      color: d.status === "active" ? PRIMARY : LEGACY,
    })),
  );
}
