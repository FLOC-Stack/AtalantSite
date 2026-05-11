# Imágenes placeholder — Página Nosotros

Carpeta intermedia mientras no estén montadas en Payload.

## Archivos esperados

El componente `src/components/nosotros-page.tsx` referencia estos paths
directamente. Sustituye estos ficheros y el sitio recoge el cambio sin
tocar código:

| Slot | Path | Capítulo |
|------|------|----------|
| 01   | `/imgsrc/about/chapter-01.jpg` | Manifiesto / Origen |
| 02   | `/imgsrc/about/chapter-02.jpg` | Misión / Disponibilidad |
| 03   | `/imgsrc/about/chapter-03.jpg` | Método / Acompañamiento |

## Especificaciones

- **Formato:** `.jpg` (preferido) o `.webp`. Para no romper la referencia
  mantén la extensión `.jpg` o actualiza el `src` en `nosotros-page.tsx`.
- **Ratio:** se renderizan con `aspect-[4/5]` en mobile/desktop grande y
  `aspect-[5/4]` en tablet. Sube originales en **4:5** vertical y el
  `object-cover` se encarga del recorte horizontal.
- **Resolución mínima:** 1200 × 1500 px. Recomendado 1600 × 2000 px.
- **Peso máximo:** ~ 350 KB por archivo (optimizar antes de subir).

## Migración a Payload

Cuando exista la colección de medias en Payload:
1. Mapea cada upload al slot correspondiente (`chapter-01`, etc.).
2. En `nosotros-page.tsx`, sustituye el array `chapters` por una query
   que rellene `image.src` / `image.alt` desde el CMS.
3. Borra esta carpeta — Payload servirá las imágenes desde su propia ruta.
