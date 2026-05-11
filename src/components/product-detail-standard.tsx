import Link from "next/link";
import { ProductHeroParticles } from "@/components/product-hero-particles";
import type { ProductDetailData } from "@/lib/product-detail-data";
import type { AppLocale } from "@/lib/locales";
import { buildFamilyPath, buildProductsPath, buildSectionPath } from "@/lib/routes";

type Props = {
  data: ProductDetailData;
  locale: AppLocale;
};

export function ProductDetailStandard({ data, locale }: Props) {
  const productsHref = buildProductsPath(locale);
  const contactHref = buildSectionPath(locale, "contact");

  return (
    <main className="relative bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/4"
      >
        <ProductHeroParticles code={data.slug} />
      </div>

      <div className="relative z-10 h-[120px] sm:h-[140px] lg:h-[165px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1760px] px-5 sm:px-10 lg:px-20">
        <div className="flex items-start justify-between gap-6">
          <p className="font-mono text-[11px] tracking-[2px] text-[#6b6f82]">
            PRODUCTOS&nbsp;&nbsp;/&nbsp;&nbsp;{data.title.toUpperCase()}&nbsp;&nbsp;({data.code})
          </p>
          <Link
            href={productsHref}
            className="font-mono text-[11px] tracking-[2px] text-[#1b1c1a] transition-opacity hover:opacity-70"
          >
            ← VOLVER A CATÁLOGO
          </Link>
        </div>

        <div className="mt-[23px] h-px w-full bg-[#1b1c1a]" />

        <section className="mt-4 flex flex-col items-start justify-between gap-8 rounded-[16px] border border-white/40 bg-[rgba(255,255,255,0.1)] p-6 backdrop-blur-md backdrop-saturate-150 sm:p-8 lg:min-h-[324px] lg:flex-row lg:items-start lg:p-10">
          <p className="font-sans text-[clamp(6rem,13vw,15rem)] font-light leading-[0.93] tracking-[-0.04em] text-[#1e4bb6]">
            {data.code}
          </p>
          <h1 className="font-sans text-[clamp(2.25rem,4.5vw,4rem)] font-light leading-none tracking-[-3px] text-[#1b1c1a]">
            {data.heroLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-[560px] font-sans text-[clamp(1rem,1.4vw,1.25rem)] font-light leading-[1.6] tracking-[-0.2px] text-[#1b1c1a]">
            {data.intro}
          </p>
        </section>

        <div className="mt-4">
          <div className="h-px w-full bg-[#1b1c1a]" />
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8 pb-10 pt-[22px] md:grid-cols-4">
            {data.meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[10px] tracking-[2px] text-[#6b6f82]">
                  {item.label}
                </dt>
                <dd className="mt-5 font-sans text-[16px] tracking-[-0.1px] text-[#1b1c1a]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <section className="mt-[60px]">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#1e4bb6]">
            GRADOS&nbsp;&nbsp;/&nbsp;&nbsp;FICHAS TÉCNICAS
          </p>
          <h2 className="mt-8 max-w-[980px] font-sans text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-[-1.8px] text-[#1b1c1a]">
            {data.tableTitle}
          </h2>
        </section>

        <section className="mt-[60px]">
          <div className="h-px w-full bg-[#1b1c1a]" />
          <div className="hidden grid-cols-[140px_220px_220px_minmax(0,1fr)_220px_70px] gap-x-4 pb-7 pt-[15px] font-mono text-[10px] tracking-[2px] text-[#6b6f82] lg:grid">
            <p>GRADO</p>
            <p>DENOMINACIÓN</p>
            <p>VARIABLE</p>
            <p>APLICACIÓN</p>
            <p>PROCESO</p>
            <p />
          </div>

          {data.grades.map((grade, index) => (
            <div key={grade.code}>
              {index > 0 ? <div className="h-px w-full bg-[rgba(27,28,26,0.15)]" /> : null}
              <div className="hidden grid-cols-[140px_220px_220px_minmax(0,1fr)_220px_70px] items-baseline gap-x-4 py-10 lg:grid">
                <p className="font-sans text-[44px] font-medium leading-none tracking-[-1px] text-[#1e4bb6]">
                  {grade.code}
                </p>
                <p className="font-sans text-[26px] font-light tracking-[-0.5px] text-[#1b1c1a]">
                  {grade.denomination}
                </p>
                <p className="font-mono text-[13px] tracking-[0.3px] text-[#1b1c1a]">
                  {grade.spec}
                </p>
                <p className="font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-[#1b1c1a]">
                  {grade.application}
                </p>
                <p className="font-sans text-[13px] font-light leading-[18px] tracking-[-0.1px] text-[#6b6f82]">
                  {grade.process}
                </p>
                <Link
                  href={contactHref}
                  className="font-sans text-[13px] font-medium tracking-[0.2px] text-[#1e4bb6] transition-opacity hover:opacity-70"
                >
                  Ficha ↓
                </Link>
              </div>

              <div className="grid gap-3 py-8 lg:hidden">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-sans text-[36px] font-medium leading-none tracking-[-1px] text-[#1e4bb6] sm:text-[44px]">
                    {grade.code}
                  </p>
                  <Link
                    href={contactHref}
                    className="font-sans text-[13px] font-medium tracking-[0.2px] text-[#1e4bb6] transition-opacity hover:opacity-70"
                  >
                    Ficha ↓
                  </Link>
                </div>
                <p className="font-sans text-[22px] font-light tracking-[-0.5px] text-[#1b1c1a]">
                  {grade.denomination}
                </p>
                <p className="font-mono text-[13px] tracking-[0.3px] text-[#1b1c1a]">
                  {grade.spec}
                </p>
                <p className="font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-[#1b1c1a]">
                  {grade.application}
                </p>
                <p className="font-sans text-[13px] font-light leading-[18px] tracking-[-0.1px] text-[#6b6f82]">
                  {grade.process}
                </p>
              </div>
            </div>
          ))}
          <div className="h-px w-full bg-[rgba(27,28,26,0.15)]" />
        </section>

        {data.highlight ? (
          <section className="mt-20">
            <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#00a772]">
              {data.highlight.eyebrow}
            </p>
            <div className="relative mt-[14px] overflow-hidden bg-[rgba(30,182,134,0.1)] lg:min-h-[220px]">
              <div className="absolute left-0 top-0 h-full w-1 bg-[#00a772]" aria-hidden="true" />
              <div className="flex h-full flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:gap-[140px]">
                <div className="flex flex-col gap-4 lg:w-[900px]">
                  <p className="font-sans text-[clamp(2rem,3.5vw,3rem)] font-light leading-[1.12] tracking-[-1.2px] text-[#1b1c1a]">
                    {data.highlight.title}
                  </p>
                  <p className="font-sans text-[16px] font-light leading-[24px] tracking-[-0.1px] text-[#6b6f82]">
                    {data.highlight.body}
                  </p>
                </div>
                <dl className="flex flex-col gap-2 lg:w-[329px]">
                  {data.highlight.stats.map((stat) => (
                    <div key={stat.value} className="flex items-center gap-10 lg:justify-between">
                      <dt className="font-sans text-[32px] font-light leading-none tracking-[-0.8px] text-[#1b1c1a]">
                        {stat.value}
                      </dt>
                      <dd className="font-mono text-[10px] tracking-[1.5px] text-[#6b6f82]">
                        {stat.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-20">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#6b6f82]">
            APLICACIONES
          </p>
          <div className="mt-[13px] h-px w-full bg-[#1b1c1a]" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.applications.map((application) => (
              <div
                key={application}
                className="border border-[rgba(27,28,26,0.15)] px-5 py-5 font-sans text-[18px] font-light text-[#1b1c1a]"
              >
                {application}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="font-mono text-[11px] font-medium tracking-[2px] text-[#6b6f82]">
            OTROS POLÍMEROS DEL CATÁLOGO
          </p>
          <div className="mt-[13px] h-px w-full bg-[#1b1c1a]" />
          <div className="mt-[60px] grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5">
            {data.related.map((product, index) => (
              <Link
                key={product.code}
                href={buildFamilyPath(locale, product.slug)}
                className={`group block ${
                  index > 0 ? "lg:border-l lg:border-[rgba(27,28,26,0.15)] lg:pl-5" : ""
                }`}
              >
                <p className="font-sans text-[52px] font-medium leading-none tracking-[-1.2px] text-[#1e4bb6] transition-opacity group-hover:opacity-80">
                  {product.code}
                </p>
                <p className="mt-[78px] font-sans text-[22px] font-light tracking-[-0.4px] text-[#1b1c1a]">
                  {product.name}
                </p>
                <p className="mt-[34px] font-mono text-[11px] tracking-[1px] text-[#6b6f82]">
                  {product.grades}
                </p>
                <p className="mt-[36px] font-sans text-[13px] font-medium tracking-[0.2px] text-[#1b1c1a]">
                  Ver →
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="h-[60px]" />
      </div>

      <section className="relative bg-[#1b1c1a] text-white">
        <div className="mx-auto w-full max-w-[1760px] px-5 py-10 sm:px-10 lg:px-20 lg:py-0">
          <div className="hidden h-px w-full bg-white/20 lg:block" />
          <div className="lg:relative lg:min-h-[240px] lg:pt-[32px]">
            <h2 className="font-sans text-[clamp(2.25rem,5vw,4rem)] font-light leading-[1.12] tracking-[-2px] text-white/95 lg:max-w-[1240px]">
              {data.footerQuestion}
            </h2>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-12 lg:absolute lg:left-0 lg:top-[140px] lg:mt-0">
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
              © MMXXVI ATALANT&nbsp;&nbsp;/&nbsp;&nbsp;PRODUCTOS / {data.code}
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
