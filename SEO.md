# SEO — Atalant Florence

Auditoría técnica SEO (clásico + GEO/LLM) y roadmap priorizado.
Targets: Google/Bing/DuckDuckGo + ChatGPT Search, Claude, Perplexity, Gemini, Copilot, Apple Intelligence.

**Estado del documento:** auditado 2026-04-22. Pendiente de ejecución.

---

## 1. Estado actual

### ✅ Presente y correcto

- **`src/app/robots.ts`** dinámico (allow `/`, disallow `/admin` y `/api`, apunta a sitemap).
- **`src/app/sitemap.ts`** dinámico multi-locale con familias de productos desde Payload.
- **`generateMetadata`** en `[locale]/[productSegment]/page.tsx` y `[locale]/[productSegment]/[familySlug]/page.tsx` con `alternates.languages` (hreflang completo) + `alternates.canonical`.
- **4 locales** ES/EN/FR/PT funcionales, redirect `/` → `/es`.
- **`next/font`** (Aeonik local + JetBrains Mono Google) cargados con CSS vars.
- **SSR** con fallbacks graceful (`hasPayloadDatabase()` guard).
- **HTML semántico** con `<main>`, `<aside>`, `<section>` en rutas de producto.
- **Datos oficiales** ya presentes en `fallback-content.ts` y `site-footer.tsx`:
  - Dirección: Avda. de la Industria, 13–15 · Pol. Ind. Canastell · Alicante · España
  - Teléfono real: +34 965 661 828
  - Email: hola@atalant.eu (con variantes por locale)
  - Depósitos aduaneros: Valencia y Alicante
  - Marca propia: Greenlant (reciclados)

### 🔴 BLOCKER

| # | Issue | Impacto |
|---|-------|---------|
| B1 | Sin JSON-LD global (falta `Organization`, `WebSite`) | Pérdida de rich results + invisibilidad para LLMs |
| B2 | Home por locale sin `generateMetadata` — hereda del root genérico | Ruta más importante sin title/description/canonical/OG específicos |
| B3 | `[locale]/layout.tsx` sin metadata | Sin title template localizado ni OG per-locale |

### 🟠 HIGH

| # | Issue | Impacto |
|---|-------|---------|
| H1 | Múltiples `<h1>` en home (Hero + ProductsMorph) | Confusión de prioridad de keyword |
| H2 | Alt texts casi inexistentes (solo logo) | Fallo accesibilidad + SEO de imágenes |
| H3 | `not-found.tsx` hardcoded en inglés | Mal UX localizado + penalización i18n |
| H4 | Inconsistencia factual: Hero dice "EST. 1994", Logistics dice fundación 1997 | Credibilidad + datos para schema |
| H5 | Copy sin tildes en fallback (`Distribucion de polimeros`) | Aparece en SERPs como title fallback |
| H6 | Sin `llms.txt` / `llms-full.txt` | Ventana GEO abierta sin ocupar |

### 🟡 MEDIUM

| # | Issue | Impacto |
|---|-------|---------|
| M1 | `next.config.ts` sin `headers` (security + cache) | Sin HSTS, nosniff, referrer-policy |
| M2 | `next/image` sin `sizes` responsive | Imágenes no óptimas por viewport |
| M3 | Video `Morphing Figures Animation.mp4` (2.3 MB) sin `preload="metadata"` | LCP penalizado en home |
| M4 | `images.remotePatterns` sin restringir host | Riesgo de servir imágenes arbitrarias en prod |
| M5 | Sin `BreadcrumbList` schema en catálogo y familia | Pérdida de breadcrumbs en SERP |
| M6 | Sin `Product` schema en familias de polímero | Pérdida de rich product results |

### 🔵 LOW

| # | Issue |
|---|-------|
| L1 | Sin `/.well-known/ai-plugin.json` (no hay API agentic todavía) |
| L2 | Sin feed RSS (no hay blog todavía) |
| L3 | Sin `<article>` envolviendo contenido principal en algunas rutas |
| L4 | RRSS en footer con `href` vacíos — penaliza `sameAs` de Organization hasta tener URLs reales |

---

## 2. Decisiones tomadas

| Decisión | Valor | Motivo |
|---|---|---|
| **Año fundación oficial** | **1997** | Origen operativo (Plast Alacant). Corregir "EST. 1994" del hero. |
| **Política de bots IA** | Parametrizable vía env var | `SEO_ALLOW_TRAINING_BOTS=false` por defecto. User-agents listados y comentados en `robots.ts` para flip rápido cuando contenido esté listo. |
| **Default search bots** | Allow | OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User. |
| **Default training bots** | Disallow | GPTBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended, Bytespider. |
| **Contenido real** | TODO explícito, no inventar | Bios, FAQs, cifras verificables requieren input del cliente. |
| **Librerías SEO** | Nativas de Next | `generateMetadata` sobre `next-seo`. JSON-LD inline sobre `schema-dts`. |
| **Scope primera sesión de ejecución** | Quick wins (Q1–Q8) | JSON-LD + metadata home + layout + llms.txt + alt texts + fix H1 + fix 1994 + fix tildes. |

---

## 3. Roadmap

### Quick wins (< 30 min c/u) — BLOCKER + HIGH

| ID | Tarea | Ficheros | Done = |
|---|---|---|---|
| Q1 | JSON-LD `Organization` + `WebSite` globales | `src/components/seo/organization-schema.tsx` (nuevo), `src/components/seo/website-schema.tsx` (nuevo), `src/app/[locale]/layout.tsx` | schema validator pasa + rich-results detecta ambos |
| Q2 | `generateMetadata` en home por locale | `src/app/[locale]/page.tsx`, `src/lib/home-copy.ts` (nuevo) | `view-source /es` muestra title/description/canonical/hreflang/OG específicos |
| Q3 | `generateMetadata` en `[locale]/layout.tsx` | `src/app/[locale]/layout.tsx` | Title template `"%s | Atalant"` localizado, OG site_name presente |
| Q4 | Fix "EST. 1994" → 1997 | `src/components/hero.tsx` | `grep -r "1994" src/` vacío |
| Q5 | Fix tildes en fallback | `src/lib/fallback-content.ts` | `grep -r "polimeros\|Distribucion\|basicos" src/lib/fallback-content.ts` vacío |
| Q6 | `llms.txt` | `src/app/llms.txt/route.ts` (nuevo) | `curl /llms.txt` → 200 + parseable Markdown |
| Q7 | Alt texts mínimos | `hero.tsx`, `home-products-intro.tsx`, `home-logistics.tsx`, `dithered-video.tsx` | Lighthouse Accessibility ≥95 |
| Q8 | Fix doble h1 en home (→ Hero único h1, ProductsMorph h2) | `hero.tsx`, `products-morph.tsx` | `curl /es \| grep -c "<h1"` = 1 |

### Medium (1–3 h c/u) — MEDIUM

| ID | Tarea | Ficheros | Done = |
|---|---|---|---|
| M1 | `BreadcrumbList` schema en catálogo y familia | `src/components/seo/breadcrumb-schema.tsx` (nuevo), integrar en `[productSegment]/page.tsx` y `[familySlug]/page.tsx` | rich-results detecta breadcrumbs |
| M2 | `Product` schema en páginas de familia | `src/components/seo/product-schema.tsx` (nuevo), integrar en `[familySlug]/page.tsx` | rich-results detecta Product |
| M3 | `not-found.tsx` i18n | `src/app/[locale]/not-found.tsx` | Navegar a URL inexistente por locale muestra copy traducida |
| M4 | Vercel headers + security | `next.config.ts` (o `vercel.json`) | `curl -I <url>` muestra HSTS + nosniff + referrer-policy |
| M5 | Optimización imágenes y video CWV | `header.tsx`, `hero.tsx`, `dithered-video.tsx` | Lighthouse Performance ≥90, LCP < 2.5s |
| M6 | `robots.ts` parametrizable bots IA | `src/app/robots.ts` | con `SEO_ALLOW_TRAINING_BOTS=false`: `curl -A GPTBot /robots.txt` muestra Disallow |

### Strategic (requiere input cliente — ver §4)

| ID | Tarea | Requiere |
|---|---|---|
| S1 | Página `/[locale]/sobre-nosotros` | Historia real, bios del equipo, cifras verificables, URLs RRSS oficiales |
| S2 | FAQs reales con `FAQPage` schema | 6–10 preguntas/respuestas reales del negocio |
| S3 | Case studies con datos verificables | Clientes autorizados, números de operación |
| S4 | Blog / insights con `Article` schema | Calendario editorial + autores |
| S5 | `llms-full.txt` | Catálogo estable y copy final aprobada |

---

## 4. TODO — pendiente de input cliente

**Regla dura:** no se inventa contenido. Schema vacío > schema ficticio. Todo lo de abajo queda bloqueado hasta recibir material.

### Organization schema (bloquea Q1 parcialmente — se hace sin estos campos y se completa después)
- [ ] URLs reales de LinkedIn, Twitter/X, Instagram, YouTube (para `sameAs: []`)
- [ ] Logo corporativo en URL absoluta (para `logo`)
- [ ] VAT / CIF legal (opcional, para `taxID`)
- [ ] Rango horario de atención (`openingHoursSpecification`)
- [ ] Confirmación de si hay oficinas adicionales más allá de Alicante

### S1 — `/sobre-nosotros`
- [ ] Historia real del negocio: narrativa Plast Alacant → Atalant (1997 → hoy)
- [ ] Bios del equipo: nombre, rol, LinkedIn, foto, 2–3 frases factuales
- [ ] Cifras verificables: facturación orden de magnitud, toneladas/año movidas, países, empleados
- [ ] Hitos verificables complementarios al timeline existente

### S2 — FAQs reales
- [ ] 6–10 preguntas frecuentes de clientes reales (no inventadas por marketing)
- [ ] Respuestas factuales (no "somos líderes" — datos concretos)
- [ ] Idealmente segmentadas: logística, catálogo, financiación, sostenibilidad

### S3 — Case studies
- [ ] Lista de clientes autorizados para mencionar públicamente
- [ ] Caso de uso + cifra (toneladas entregadas, lead time, país)
- [ ] Testimoniales con nombre + empresa (opcional)

### S4 — Blog / insights
- [ ] Calendario editorial: temas, autores, frecuencia
- [ ] Autores: bios con `Person` schema (se reutiliza lo de S1)

### Misc
- [ ] Confirmar si Atalant tendrá buscador interno (para decidir `SearchAction` en WebSite schema)
- [ ] Confirmar si `Google-Extended` se activa cuando el contenido final esté aprobado
- [ ] Decidir `foundingDate` exacto si el cliente quiere registrar también 1994 como hito (añadir a timeline)

---

## 5. Checklist de verificación

Gate de "done" por bloque. Cada cambio debe pasar al menos una verificación.

### Clásico
```bash
# Headers
curl -I https://<dominio> | grep -iE "content-type|cache-control|x-content-type|strict-transport|referrer-policy"

# Metadata
curl -s https://<dominio>/es | grep -oE "<(title|meta[^>]*(name|property)=(\"|')(description|og:|twitter:|canonical)[^\"']*(\"|')[^>]*)>"

# Hreflang
curl -s https://<dominio>/es | grep -oE "<link[^>]*hreflang[^>]*>"

# H1 único
curl -s https://<dominio>/es | grep -c "<h1"   # debe ser 1

# Sitemap
curl -s https://<dominio>/sitemap.xml | head -50
curl -s https://<dominio>/robots.txt
```

### GEO / LLM
```bash
# Bots IA — contenido renderizado
curl -A "GPTBot" -s https://<dominio>/es | grep -E "<h1|<h2" | head -5
curl -A "OAI-SearchBot" -s https://<dominio>/es | grep -E "<h1|<h2" | head -5
curl -A "ClaudeBot" -s https://<dominio>/es | grep -E "<h1|<h2" | head -5
curl -A "PerplexityBot" -s https://<dominio>/es | grep -E "<h1|<h2" | head -5

# llms.txt
curl -s https://<dominio>/llms.txt | head -30

# view-source — contenido en HTML inicial, no dependiente de JS
curl -s https://<dominio>/es | grep -c "polímeros"   # debe aparecer >0 sin JS
```

### Schema validation
- <https://validator.schema.org> — pegar URL de home + una familia
- <https://search.google.com/test/rich-results> — ídem

### Lighthouse (target)
- SEO: **100**
- Accessibility: **≥95**
- Performance: **≥90**
- Best Practices: **≥95**

### Checklist específico antes de flip `SEO_ALLOW_TRAINING_BOTS=true`
1. [ ] Copy del home aprobada por cliente (sin errores factuales, tildes OK, tagline oficial)
2. [ ] `/sobre-nosotros` publicada con contenido real
3. [ ] FAQs reales publicadas
4. [ ] Organization schema con `sameAs` completo (URLs RRSS reales)
5. [ ] Última revisión legal del contenido

---

## 6. Log de cambios

Cada implementación se registra aquí: fecha + qué se cambió + cómo se verificó.

_(vacío — pendiente de primera ejecución)_

---

## 7. Referencias

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Organization](https://schema.org/Organization)
- [Schema.org Product](https://schema.org/Product)
- [llms.txt proposal (Howard)](https://llmstxt.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [OpenAI GPTBot docs](https://platform.openai.com/docs/gptbot)
- [Anthropic ClaudeBot](https://docs.anthropic.com/en/docs/claude-code/overview)
