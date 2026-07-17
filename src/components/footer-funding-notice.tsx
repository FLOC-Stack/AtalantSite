import Image from "next/image";

const FUNDING_IMAGE = "/imgsrc/funding/atalant-autoconsumo-nextgenerationeu.png";

const FUNDING_IMAGE_ALT =
  "Logotipos de Generalitat Valenciana, IVACE, Unión Europea NextGenerationEU, Gobierno de España, IDAE y Plan de Recuperación, Transformación y Resiliencia";

export function FooterFundingNotice() {
  return (
    <section
      aria-labelledby="footer-funding-title"
      className="mt-12 sm:mt-16 lg:mt-14"
    >
      <p className="font-mono text-[10px] uppercase text-white/55">
        Proyecto de autoconsumo
      </p>

      <div className="mt-5 grid gap-8 border-t border-white/20 pt-8 sm:pt-10 lg:grid-cols-12 lg:gap-12">
        <div className="w-fit max-w-full lg:col-span-5">
          <Image
            src={FUNDING_IMAGE}
            alt={FUNDING_IMAGE_ALT}
            width={1265}
            height={87}
            sizes="(min-width: 1024px) 28rem, 20rem"
            unoptimized
            className="h-auto w-full max-w-80 lg:max-w-md"
          />
        </div>

        <div className="grid gap-8 lg:col-span-7 lg:grid-cols-7 lg:gap-10">
          <h3
            id="footer-funding-title"
            className="text-balance font-sans text-lg font-light leading-[1.4] text-white/90 sm:text-xl lg:col-span-3"
          >
            ATALANT EUROPE SL ha finalizado la instalación de una cubierta
            fotovoltaica para autoconsumo, con una potencia de 35,88 kWp, en
            sus instalaciones de San Vicente del Raspeig.
          </h3>

          <div className="lg:col-span-4 lg:border-l lg:border-white/20 lg:pl-10">
            <p className="text-pretty font-sans text-[13px] leading-relaxed text-white/70 sm:text-sm">
              Este proyecto ha recibido una ayuda de 4.743,00 € por parte de
              IVACE-IDAE, dentro del Programa de incentivos ligados al
              autoconsumo y al almacenamiento, con fuentes de energía
              renovable, así como a la implantación de sistemas térmicos
              renovables en el sector residencial, en el marco del Plan de
              Recuperación, Transformación y Resiliencia, financiado por la
              Unión Europea – NextGenerationEU.
            </p>

            <div className="mt-6 border-t border-white/20 pt-4 font-mono text-[10px] uppercase text-white/55 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
              <span>Expediente</span>
              <span className="mt-1 block font-medium text-white sm:mt-0 tabular-nums">
                IDAUT1/2021/3909
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
