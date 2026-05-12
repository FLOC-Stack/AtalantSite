# Imágenes placeholder — Página Financiación

Carpeta intermedia mientras no estén montadas en Payload.

## Archivos esperados

El componente `src/components/financiacion-page.tsx` referencia este
path directamente. Sustituye este fichero y el sitio recoge el cambio
sin tocar código:

| Slot | Path | Uso |
|------|------|-----|
| Hero | `/imgsrc/financing/atalant-bg-financiacion.jpg` | Imagen grande del hero, debajo del titular |

## Especificaciones

- **Formato:** `.jpg` (preferido) o `.webp`. Para no romper la
  referencia mantén la extensión `.jpg` o actualiza el `src` en
  `financiacion-page.tsx`.
- **Ratio:** se renderiza en horizontal panorámico:
  `aspect-[16/9]` en mobile, `sm:aspect-[21/9]` en tablet,
  `lg:aspect-[1760/693]` (≈ 2.54:1) en desktop. Sube el original
  en **21:9** o más panorámico; el `object-cover` ajusta los
  formatos más cuadrados.
- **Resolución mínima:** 1760 × 770 px. Recomendado 2400 × 1050 px.
- **Peso máximo:** ~ 400 KB tras optimización.

## Migración a Payload

Cuando exista la colección de medias en Payload:
1. Sube la imagen del hero como single-media field "financing_hero".
2. En `financiacion-page.tsx`, sustituye el `src` por el campo del CMS.
3. Borra esta carpeta — Payload servirá la imagen desde su propia ruta.
