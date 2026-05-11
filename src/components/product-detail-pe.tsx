import Link from "next/link";
import { ProductHeroParticles } from "@/components/product-hero-particles";
import type { AppLocale } from "@/lib/locales";
import { buildFamilyPath, buildProductsPath, buildSectionPath } from "@/lib/routes";

// Datos extraídos del nodo Figma 145:25 — no se inventa nada.
type Grade = {
  code: string;
  denomination: string;
  density: string;
  application: string;
  process: string;
};

const GRADES: Grade[] = [
  {
    code: "HDPE",
    denomination: "High-Density",
    density: "0.941 — 0.965 g/cm³",
    application: "Contenedores rígidos · Tuberías · Envase cosmético",
    process: "Inyección, extrusión, soplado",
  },
  {
    code: "MDPE",
    denomination: "Medium-Density",
    density: "0.926 — 0.940 g/cm³",
    application: "Tubería de gas · Sacos industriales · Film reforzado",
    process: "Extrusión, soplado",
  },
  {
    code: "LDPE",
    denomination: "Low-Density",
    density: "0.910 — 0.925 g/cm³",
    application: "Film flexible · Envase agrícola · Tapones de flujo",
    process: "Film, extrusión, moldeo rotacional",
  },
  {
    code: "LLDPE",
    denomination: "Linear Low-Density",
    density: "0.915 — 0.925 g/cm³",
    application: "Film stretch · Saco industrial · Film agrícola resistente",
    process: "Film principalmente",
  },
];

const META = [
  { label: "GRADOS", value: "HDPE · MDPE · LDPE · LLDPE" },
  { label: "TRANSFORMACIÓN", value: "Inyección · Extrusión · Soplado · Film" },
  { label: "DENSIDAD", value: "0.91 — 0.97 g/cm³" },
  { label: "RESPUESTA", value: "< 24 h desde depósito" },
];

const STATS = [
  { value: "1997", label: "Origen Atalant" },
  { value: "3+3", label: "Líneas Greenlant activas" },
  { value: "100%", label: "Trazabilidad post-industrial" },
];

const RELATED = [
  { code: "PP", name: "Polipropileno", grades: "Homo · Copo · Random", slug: "pp" },
  { code: "PVC", name: "Policloruro vinilo", grades: "Rígido · Flexible", slug: "pvc" },
  { code: "PS", name: "Poliestireno", grades: "GPPS · HIPS", slug: "ps" },
  { code: "PET", name: "PET", grades: "Botella · Lámina · Fibra", slug: "pet" },
];

type Props = {
  locale: AppLocale;
};

export function ProductDetailPE({ locale }: Props) {
  const productsHref = buildProductsPath(locale);
  const contactHref = buildSectionPath(locale, "contact");

  return (
    <main className="relative bg-white">
      {/* Sistema de partículas — canvas cuadrado fijo (800×800 px) en posición
          absolute en la parte superior. -translate-y-1/4 → 25% del canvas
          (200px) sobresale por encima del main, 75% (600px) cae dentro y
          atraviesa la zona del header/hero. Tamaño en px (no vh) para que el
          motor 3D mida un buffer estable al montar y la esfera no se deforme. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/4"
      >
        <ProductHeroParticles code="pe" />
      </div>

      {/* Espacio para el header fijo del proyecto */}
      <div className="relative z-10 h-[120px] sm:h-[140px] lg:h-[165px]" />

      {/* Container 1760 max */}
      <div className="relative z-10 mx-auto w-full max-w-[1760px] px-5 sm:px-10 lg:px-20">
        {/* Breadcrumb row — figma top:197 */}
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-[11px] tracking-[2px] text-[#6b6f82]">
            PRODUCTOS&nbsp;&nbsp;/&nbsp;&nbsp;POLIETILENO&nbsp;&nbsp;(PE)
          </p>
          <Link
            href={productsHref}
            className="font-mono text-[11px] tracking-[2px] text-[#1b1c1a] transition-opacity hover:opacity-70"
          >
            ← VOLVER A CATÁLOGO
          </Link>
        </div>

        {/* Divider full width */}
        <div className="mt-[23px] h-px w-full bg-[#1b1c1a]" />

        {/* Hero card glass — el blur filtra las partículas que vienen del
            canvas global del main (definido arriba con position absolute). */}
        <div className="mt-4 flex flex-col items-start justify-between gap-8 rounded-[16px] border border-white/40 bg-[rgba(255,255,255,0.1)] p-6 backdrop-blur-md backdrop-saturate-150 sm:p-8 lg:h-[324px] lg:flex-row lg:items-start lg:p-10">
            <p className="font-sans text-[clamp(7rem,16vw,17.5rem)] font-light leading-[0.93] tracking-[-0.04em] text-[#1e4bb6]">
              PE
            </p>
            <div className="font-sans text-[clamp(2.25rem,4.5vw,4rem)] font-light leading-none tracking-[-3px] text-[#1b1c1a]">
              <p>Polietileno.</p>
              <p>El polímero</p>
              <p>versátil.</p>
            </div>
          <p className="max-w-[520px] font-sans text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-[1.6] tracking-[-0.2px] text-[#1b1c1a]">
            Cuatro grados base cubren el 90% de las transformaciones industriales del polietileno. Desde
            la película de baja densidad hasta los contenedores rígidos de alta densidad, todos los
            gradientes están cubiertos en nuestro catálogo con respuesta 24/48h desde Alicante o Valencia.
          </p>
        </div>

        {/* Meta row */}
        <div className="mt-4">
          <div className="h-px w-full bg-[#1b1c1a]" />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 pb-10 pt-[22px] md:grid-cols-4">
            {META.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[10px] tracking-[2px] text-[#6b6f82]">{m.label}</dt>
                <dd className="mt-5 font-sans text-[16px] tracking-[-0.1px] text-[#1b1c1a]">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* GRADOS / FICHAS TÉCNICAS — figma top:808 */}
        <div className="mt-[60px]">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#1e4bb6]">
            GRADOS&nbsp;&nbsp;/&nbsp;&nbsp;FICHAS TÉCNICAS
          </p>
          <h2 className="mt-8 font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-1.8px] text-[#1b1c1a]">
            Cuatro densidades, una misma cadena.
          </h2>
        </div>

        {/* Tabla de grados */}
        <div className="mt-[60px]">
          <div className="h-px w-full bg-[#1b1c1a]" />

          {/* Headers — solo desktop */}
          <div className="hidden grid-cols-[140px_220px_180px_minmax(0,1fr)_200px_70px] gap-x-4 pb-7 pt-[15px] font-mono text-[10px] tracking-[2px] text-[#6b6f82] lg:grid">
            <p>GRADO</p>
            <p>DENOMINACIÓN</p>
            <p>DENSIDAD</p>
            <p>APLICACIÓN</p>
            <p>PROCESO</p>
            <p />
          </div>

          {/* Filas */}
          {GRADES.map((g, i) => (
            <div key={g.code}>
              {i > 0 ? <div className="h-px w-full bg-[rgba(27,28,26,0.15)]" /> : null}
              {/* Desktop grid */}
              <div className="hidden grid-cols-[140px_220px_180px_minmax(0,1fr)_200px_70px] items-baseline gap-x-4 py-10 lg:grid">
                <p className="font-sans text-[44px] font-medium leading-none tracking-[-1px] text-[#1e4bb6]">
                  {g.code}
                </p>
                <p className="font-sans text-[26px] font-light tracking-[-0.5px] text-[#1b1c1a]">
                  {g.denomination}
                </p>
                <div>
                  <p className="font-mono text-[13px] tracking-[0.3px] text-[#1b1c1a]">{g.density}</p>
                  <p className="mt-[11px] font-mono text-[9px] tracking-[1.5px] text-[#6b6f82]">
                    GRADOS
                  </p>
                </div>
                <p className="font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-[#1b1c1a]">
                  {g.application}
                </p>
                <p className="font-sans text-[13px] font-light leading-[18px] tracking-[-0.1px] text-[#6b6f82]">
                  {g.process}
                </p>
                <Link
                  href="#"
                  className="font-sans text-[13px] font-medium tracking-[0.2px] text-[#1e4bb6] transition-opacity hover:opacity-70"
                >
                  Ficha ↓
                </Link>
              </div>
              {/* Mobile/tablet stack */}
              <div className="grid gap-3 py-8 lg:hidden">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-sans text-[36px] font-medium leading-none tracking-[-1px] text-[#1e4bb6] sm:text-[44px]">
                    {g.code}
                  </p>
                  <Link
                    href="#"
                    className="font-sans text-[13px] font-medium tracking-[0.2px] text-[#1e4bb6] transition-opacity hover:opacity-70"
                  >
                    Ficha ↓
                  </Link>
                </div>
                <p className="font-sans text-[22px] font-light tracking-[-0.5px] text-[#1b1c1a]">
                  {g.denomination}
                </p>
                <p className="font-mono text-[13px] tracking-[0.3px] text-[#1b1c1a]">{g.density}</p>
                <p className="font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-[#1b1c1a]">
                  {g.application}
                </p>
                <p className="font-sans text-[13px] font-light leading-[18px] tracking-[-0.1px] text-[#6b6f82]">
                  {g.process}
                </p>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-[rgba(27,28,26,0.15)]" />
        </div>

        {/* Greenlant rPE */}
        <div className="mt-20">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#00a772]">
            VERSIÓN RECICLADA&nbsp;&nbsp;/&nbsp;&nbsp;GREENLANT
          </p>
          <div className="relative mt-[14px] overflow-hidden bg-[rgba(30,182,134,0.1)] lg:h-[220px]">
            <div className="absolute left-0 top-0 h-full w-1 bg-[#00a772]" aria-hidden="true" />
            <div className="flex h-full flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:gap-[140px]">
              <div className="flex flex-col gap-4 lg:w-[900px]">
                <p className="font-sans text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.12] tracking-[-1.2px] text-[#1b1c1a]">
                  rPE — Polietileno reciclado.
                </p>
                <p className="font-sans text-[16px] font-light leading-[24px] tracking-[-0.1px] text-[#6b6f82]">
                  Grados Injection Greenlant (IN-040 RD/GR/BL), Blow Molding Greenlant (BM-025 WH/NT) y
                  Pipe Greenlant (PE-100-BK). Post-industrial y post-consumo, trazabilidad completa.
                </p>
              </div>
              <dl className="flex flex-col gap-2 lg:w-[329px]">
                {STATS.map((s) => (
                  <div key={s.value} className="flex items-center gap-10 lg:justify-between">
                    <dt className="font-sans text-[32px] font-light leading-none tracking-[-0.8px] text-[#1b1c1a]">
                      {s.value}
                    </dt>
                    <dd className="font-mono text-[10px] tracking-[1.5px] text-[#6b6f82]">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <Link
              href="#"
              className="absolute right-6 top-6 font-sans text-[15px] font-medium tracking-[0.2px] text-[#1eb686] transition-opacity hover:opacity-70 sm:right-10 lg:top-1/2 lg:-translate-y-1/2"
            >
              Ver Greenlant&nbsp;&nbsp;→
            </Link>
          </div>
        </div>

        {/* Otros polímeros del catálogo */}
        <div className="mt-20">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#6b6f82]">
            OTROS POLÍMEROS DEL CATÁLOGO
          </p>
          <div className="mt-[13px] h-px w-full bg-[#1b1c1a]" />
          <div className="mt-[60px] grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5">
            {RELATED.map((r, i) => (
              <Link
                key={r.code}
                href={buildFamilyPath(locale, r.slug)}
                className={`group block ${i > 0 ? "lg:border-l lg:border-[rgba(27,28,26,0.15)] lg:pl-5" : ""}`}
              >
                <p className="font-sans text-[52px] font-medium leading-none tracking-[-1.2px] text-[#1e4bb6] transition-opacity group-hover:opacity-80">
                  {r.code}
                </p>
                <p className="mt-[78px] font-sans text-[22px] font-light tracking-[-0.4px] text-[#1b1c1a]">
                  {r.name}
                </p>
                <p className="mt-[34px] font-mono text-[11px] tracking-[1px] text-[#6b6f82]">
                  {r.grades}
                </p>
                <p className="mt-[36px] font-sans text-[13px] font-medium tracking-[0.2px] text-[#1b1c1a]">
                  Ver →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Spacer antes del footer dark */}
        <div className="h-[60px]" />
      </div>

      {/* Dark footer CTA — full bleed */}
      <section className="relative bg-[#1b1c1a] text-white">
        <div className="mx-auto w-full max-w-[1760px] px-5 py-10 sm:px-10 lg:px-20 lg:py-0">
          <div className="hidden h-px w-full bg-white/20 lg:block" />
          <div className="lg:relative lg:h-[240px] lg:pt-[32px]">
            <h2 className="font-sans text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.12] tracking-[-2px] text-white/95 lg:max-w-[1240px]">
              ¿Necesitas una ficha técnica PE?
            </h2>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-12 lg:absolute lg:left-0 lg:top-[140px] lg:mt-0">
              <Link
                href="#"
                className="group inline-flex flex-col gap-1 font-sans text-[16px] font-medium tracking-[0.2px] text-white"
              >
                <span>Descargar fichas&nbsp;&nbsp;↓</span>
                <span className="block h-px w-[170px] bg-white transition-opacity group-hover:opacity-70" />
              </Link>
              <Link
                href={contactHref}
                className="group inline-flex flex-col gap-1 font-sans text-[16px] font-medium tracking-[0.2px] text-white"
              >
                <span>Contactar ventas&nbsp;&nbsp;→</span>
                <span className="block h-px w-[170px] bg-white transition-opacity group-hover:opacity-70" />
              </Link>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 lg:pb-10">
            <p className="font-mono text-[10px] tracking-[2px] text-white/50">
              © MMXXVI ATALANT&nbsp;&nbsp;/&nbsp;&nbsp;PRODUCTOS / PE
            </p>
            <p className="font-mono text-[11px] font-medium tracking-[2px] text-white/80">
              INFO@ATALANT.COM&nbsp;&nbsp;·&nbsp;&nbsp;+34 965 661 828
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
