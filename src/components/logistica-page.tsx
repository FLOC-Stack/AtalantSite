import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { ResilientVideo } from "@/components/resilient-video";
import { NetworkTimeline, type NetworkHub } from "@/components/network-timeline";

type Props = {
  locale: AppLocale;
  copy?: LogisticaCopy;
};

export type LogisticaCopy = {
  breadcrumb: string;
  back: string;
  monogram: string;
  heroTitle: string; // \n separa líneas
  heroBody: string;
  metaLabels: {
    ubicaciones: string;
    estatus: string;
    hubs: string;
    exportacion: string;
  };
  metaValues: {
    ubicaciones: string;
    estatus: string;
    hubs: string;
    exportacion: string;
  };
  advantagesEyebrow: string;
  advantagesTitle: string;
  advantages: Array<{ number: string; title: string; body: string }>;
  networkEyebrow: string;
  networkTitle: string;
  networkCaption: string;
  networkLegend: string;
  processEyebrow: string;
  process: Array<{ roman: string; title: string; body: string }>;
  ctaTitle: string;
  ctaAction: string;
  ctaHref?: string;
  backHref?: string;
  ctaFootnote: string;
  heroVideoSrc?: string;
  heroVideoPoster?: string;
  phone: string;
  hubs: NetworkHub[];
};

const COPY_ES: LogisticaCopy = {
  breadcrumb: "LOGÍSTICA  /  SERVICIO INTEGRADO",
  back: "← VOLVER",
  monogram: "LG",
  heroTitle: "Logística integrada\npara el mejor servicio",
  heroBody:
    "Recibe tus pedidos en nuestra propia flota de transporte con una trazabilidad completa desde el primer momento.",
  metaLabels: {
    ubicaciones: "UBICACIONES",
    estatus: "ESTATUS",
    hubs: "Principales Hubs",
    exportacion: "EXPORTACIÓN",
  },
  metaValues: {
    ubicaciones: "Almacenes propios situados estratégicamente por Europa",
    estatus: "Operador Económico Autorizado (OEA)",
    hubs: "Antwerp Valencia Fos",
    exportacion: "18 paises",
  },
  advantagesEyebrow: "VENTAJAS  /  CUATRO PUNTOS CLAVE",
  advantagesTitle: "Por qué importa operar\ncon logística integrada.",
  advantages: [
    {
      number: "01",
      title: "Control total en la cadena de suministro",
      body: "Gestionamos directamente cada paso, garantizando fiabilidad y trazabilidad total.",
    },
    {
      number: "02",
      title: "Mayor rapidez y disponibilidad",
      body: "Entrega más rápida y stock disponible para responder con agilidad.",
    },
    {
      number: "03",
      title: "Reducción en costes y mayor eficiencia",
      body: "Elimina intermediarios y optimiza ruta para unos precios más competitivos.",
    },
    {
      number: "04",
      title: "Mejor experiencia cliente",
      body: "Seguimiento a tiempo real y servicio personalizado que genera confianza.",
    },
  ],
  networkEyebrow: "RED  /  TERRITORIOS",
  networkTitle: "Centros logísticos /\nPrincipales hubs",
  networkCaption: "RED ATALANT 2026  /  OESTE ←    → ESTE",
  networkLegend: "●  CENTRO / HUB      ○  RED / DISTRIBUCIÓN",
  processEyebrow: "PROCESO  /  PUERTA A PUERTA",
  process: [
    { roman: "01", title: "Origen", body: "Petroquímicas mundiales con la última tecnología disponible." },
    {
      roman: "02",
      title: "Importación",
      body: "Importación mediante nuestro sistema integrado.",
    },
    {
      roman: "03",
      title: "Almacenaje",
      body: "Almacenaje en lugares estratégicos.",
    },
    {
      roman: "04",
      title: "Entrega",
      body: "Entrega al cliente con trazabilidad.",
    },
  ],
  ctaTitle: "¿Necesidad de entrega urgente? Lo resolvemos.",
  ctaAction: "Solicitar condiciones  →",
  ctaHref: "mailto:logistica@atalant.com?subject=Consulta%20entrega%20urgente",
  ctaFootnote: "",
  phone: "",
  hubs: [
    { code: "Alicante", role: "Centro logístico", tier: "primary" },
    { code: "Valencia", role: "Centro logístico", tier: "secondary" },
    { code: "Leixoes", role: "Hub", tier: "primary" },
    { code: "Antwerp", role: "Hub", tier: "secondary" },
    { code: "Fos", role: "Hub", tier: "primary" },
    { code: "Ravenna", role: "Hub", tier: "secondary" },
    { code: "Chesterfield", role: "Hub", tier: "primary" },
  ],
};

const COPY_EN: LogisticaCopy = {
  ...COPY_ES,
  breadcrumb: "LOGISTICS  /  INTEGRATED SERVICE",
  back: "← BACK",
  heroTitle: "Integrated logistics\nfor better service",
  heroBody:
    "Receive your orders through our own transport fleet with complete traceability from the very first moment.",
  metaLabels: {
    ubicaciones: "LOCATIONS",
    estatus: "STATUS",
    hubs: "Main Hubs",
    exportacion: "EXPORT",
  },
  metaValues: {
    ubicaciones: "Own warehouses strategically located across Europe",
    estatus: "Authorised Economic Operator (AEO)",
    hubs: "Antwerp Valencia Fos",
    exportacion: "18 countries",
  },
  advantagesEyebrow: "ADVANTAGES  /  FOUR KEY POINTS",
  advantagesTitle: "Why integrated\nlogistics matters.",
  advantages: [
    {
      number: "01",
      title: "Full supply-chain control",
      body: "We manage every step directly, ensuring reliability and full traceability.",
    },
    {
      number: "02",
      title: "Greater speed and availability",
      body: "Faster delivery and available stock to respond with agility.",
    },
    {
      number: "03",
      title: "Lower costs and higher efficiency",
      body: "Fewer intermediaries and optimised routes for more competitive pricing.",
    },
    {
      number: "04",
      title: "Better customer experience",
      body: "Real-time tracking and personalized service that builds confidence.",
    },
  ],
  networkEyebrow: "NETWORK  /  TERRITORIES",
  networkTitle: "Logistics centers /\nMain hubs",
  networkCaption: "ATALANT NETWORK 2026  /  WEST ←    → EAST",
  networkLegend: "●  CENTER / HUB      ○  NETWORK / DISTRIBUTION",
  processEyebrow: "PROCESS  /  DOOR TO DOOR",
  process: [
    { roman: "01", title: "Origin", body: "Global petrochemical producers using the latest available technology." },
    { roman: "02", title: "Import", body: "Import managed through our integrated system." },
    { roman: "03", title: "Storage", body: "Storage in strategically located facilities." },
    { roman: "04", title: "Delivery", body: "Customer delivery with full traceability." },
  ],
  ctaTitle: "Need urgent delivery? We solve it.",
  ctaAction: "Request conditions  →",
};

const COPY_FR: LogisticaCopy = {
  ...COPY_ES,
  breadcrumb: "LOGISTIQUE  /  SERVICE INTÉGRÉ",
  back: "← RETOUR",
  heroTitle: "Logistique intégrée\npour un meilleur service",
  heroBody:
    "Recevez vos commandes avec notre propre flotte de transport et une traçabilité complète dès le premier instant.",
  metaLabels: {
    ubicaciones: "EMPLACEMENTS",
    estatus: "STATUT",
    hubs: "Hubs principaux",
    exportacion: "EXPORT",
  },
  metaValues: {
    ubicaciones: "Entrepôts propres situés stratégiquement en Europe",
    estatus: "Opérateur Économique Agréé (OEA)",
    hubs: "Antwerp Valencia Fos",
    exportacion: "18 pays",
  },
  advantagesEyebrow: "AVANTAGES  /  QUATRE POINTS CLÉS",
  advantagesTitle: "Pourquoi opérer\navec une logistique intégrée.",
  advantages: [
    {
      number: "01",
      title: "Contrôle total de la chaîne d'approvisionnement",
      body: "Nous gérons directement chaque étape, avec fiabilité et traçabilité complète.",
    },
    {
      number: "02",
      title: "Plus de rapidité et de disponibilité",
      body: "Livraison plus rapide et stock disponible pour répondre avec agilité.",
    },
    {
      number: "03",
      title: "Réduction des coûts et meilleure efficacité",
      body: "Moins d'intermédiaires et des routes optimisées pour des prix plus compétitifs.",
    },
    {
      number: "04",
      title: "Meilleure expérience client",
      body: "Suivi en temps réel et service personnalisé pour renforcer la confiance.",
    },
  ],
  networkEyebrow: "RÉSEAU  /  TERRITOIRES",
  networkTitle: "Centres logistiques /\nHubs principaux",
  networkCaption: "RÉSEAU ATALANT 2026  /  OUEST ←    → EST",
  networkLegend: "●  CENTRE / HUB      ○  RÉSEAU / DISTRIBUTION",
  processEyebrow: "PROCESSUS  /  PORTE À PORTE",
  process: [
    { roman: "01", title: "Origine", body: "Pétrochimies mondiales avec la dernière technologie disponible." },
    { roman: "02", title: "Importation", body: "Importation via notre système intégré." },
    { roman: "03", title: "Stockage", body: "Stockage dans des sites stratégiques." },
    { roman: "04", title: "Livraison", body: "Livraison au client avec traçabilité." },
  ],
  ctaTitle: "Besoin d'une livraison urgente ? Nous la gérons.",
  ctaAction: "Demander les conditions  →",
};

const COPY_PT: LogisticaCopy = {
  ...COPY_ES,
  breadcrumb: "LOGÍSTICA  /  SERVIÇO INTEGRADO",
  back: "← VOLTAR",
  heroTitle: "Logística integrada\npara o melhor serviço",
  heroBody:
    "Receba as suas encomendas na nossa própria frota de transporte com rastreabilidade completa desde o primeiro momento.",
  metaLabels: {
    ubicaciones: "LOCALIZAÇÕES",
    estatus: "ESTATUTO",
    hubs: "Principais Hubs",
    exportacion: "EXPORTAÇÃO",
  },
  metaValues: {
    ubicaciones: "Armazéns próprios situados estrategicamente pela Europa",
    estatus: "Operador Económico Autorizado (OEA)",
    hubs: "Antwerp Valencia Fos",
    exportacion: "18 países",
  },
  advantagesEyebrow: "VANTAGENS  /  QUATRO PONTOS-CHAVE",
  advantagesTitle: "Porque importa operar\ncom logística integrada.",
  advantages: [
    {
      number: "01",
      title: "Controlo total da cadeia de fornecimento",
      body: "Gerimos diretamente cada passo, garantindo fiabilidade e rastreabilidade total.",
    },
    {
      number: "02",
      title: "Maior rapidez e disponibilidade",
      body: "Entrega mais rápida e stock disponível para responder com agilidade.",
    },
    {
      number: "03",
      title: "Redução de custos e maior eficiência",
      body: "Eliminamos intermediários e otimizamos rotas para preços mais competitivos.",
    },
    {
      number: "04",
      title: "Melhor experiência para o cliente",
      body: "Acompanhamento em tempo real e serviço personalizado que gera confiança.",
    },
  ],
  networkEyebrow: "REDE  /  TERRITÓRIOS",
  networkTitle: "Centros logísticos /\nPrincipais hubs",
  networkCaption: "REDE ATALANT 2026  /  OESTE ←    → ESTE",
  networkLegend: "●  CENTRO / HUB      ○  REDE / DISTRIBUIÇÃO",
  processEyebrow: "PROCESSO  /  PORTA A PORTA",
  process: [
    { roman: "01", title: "Origem", body: "Petroquímicas mundiais equipadas com a última tecnologia" },
    { roman: "02", title: "Importação", body: "Importação através do nosso sistema integrado." },
    { roman: "03", title: "Armazenagem", body: "Armazenagem em locais estratégicos." },
    { roman: "04", title: "Entrega", body: "Entrega ao cliente com rastreabilidade." },
  ],
  ctaTitle: "Precisa de entrega urgente? Nós resolvemos.",
  ctaAction: "Solicitar condições  →",
};

export const LOGISTICA_COPY: Record<AppLocale, LogisticaCopy> = {
  es: COPY_ES,
  en: COPY_EN,
  pt: COPY_PT,
  fr: COPY_FR,
};

function renderMultiline(text: string) {
  return text.split("\n").map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));
}

export function LogisticaPage({ locale, copy: pageCopy }: Props) {
  const copy = pageCopy ?? LOGISTICA_COPY[locale];
  const homeHref = copy.backHref ?? `/${locale}`;

  return (
    <main className="relative bg-background text-foreground">
      {/* ======= Breadcrumb ======= */}
      <div className="px-10 pt-24 sm:px-14 sm:pt-28 lg:px-20 lg:pt-32">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong sm:text-[11px]">
            {copy.breadcrumb}
          </p>
          <Link
            href={homeHref}
            className="font-mono text-[10px] uppercase tracking-[2px] text-foreground transition-opacity hover:opacity-70 sm:text-[11px]"
          >
            {copy.back}
          </Link>
        </div>
        <div className="mt-5 h-px w-full bg-foreground" aria-hidden="true" />
      </div>

      {/* ======= Hero: monograma + título + bajada ======= */}
      <section
        aria-labelledby="lg-hero-title"
        className="px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,420px)] 2xl:gap-x-24">
          {/* Monograma LG */}
          <p
            aria-hidden="true"
            className="font-sans font-light leading-[0.85] tracking-[-6px] text-primary text-[120px] sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            {copy.monogram}
          </p>

          {/* Título */}
          <h1
            id="lg-hero-title"
            className="font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>

          {/* Bajada: mobile y lg debajo (fila 2, col-span-2); 2xl a la derecha */}
          <p className="font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[560px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        {/* ======= Bloque visual (video del DA) ======= */}
        <div className="mt-14 aspect-[16/9] w-full overflow-hidden bg-primary sm:aspect-[21/9] lg:mt-16 lg:aspect-[1760/693]">
          <ResilientVideo
            className="h-full w-full object-cover"
            src={copy.heroVideoSrc ?? "/Tanker%20Truck%20Aesthetic.mp4"}
            fallbackSrc="/Tanker%20Truck%20Aesthetic.mp4"
            poster={copy.heroVideoPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            fallbackClassName="flex h-full w-full items-center justify-center bg-primary font-mono text-[11px] uppercase tracking-[2px] text-white/70"
            fallbackLabel="video/imagen"
            aria-hidden="true"
          />
        </div>

        {/* ======= Meta row ======= */}
        <div className="mt-10 grid grid-cols-2 gap-y-8 border-t border-foreground/15 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {(
            [
              ["ubicaciones"],
              ["estatus"],
              ["hubs"],
              ["exportacion"],
            ] as const
          ).map(([k]) => (
            <div key={k}>
              <p className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {copy.metaLabels[k]}
              </p>
              <p className="mt-2 font-sans text-[15px] tracking-[-0.1px] text-foreground sm:text-[16px]">
                {copy.metaValues[k]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ======= Ventajas (4 puntos) ======= */}
      <section
        aria-labelledby="lg-advantages-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.advantagesEyebrow}
        </p>
        <h2
          id="lg-advantages-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.advantagesTitle)}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2">
          {copy.advantages.map((adv) => (
            <article
              key={adv.number}
              className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-foreground/15 pb-10 lg:pb-14"
            >
              <p className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]">
                {adv.number}
              </p>
              <div>
                <h3 className="font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                  {adv.title}
                </h3>
                <p className="mt-3 max-w-[740px] font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                  {adv.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======= Red / Timeline ======= */}
      <section
        aria-labelledby="lg-network-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.networkEyebrow}
        </p>
        <h2
          id="lg-network-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.networkTitle)}
        </h2>

        <div className="mt-12 lg:mt-16">
          <NetworkTimeline
            hubs={copy.hubs}
            caption={copy.networkCaption}
            legend={copy.networkLegend}
          />
        </div>
      </section>

      {/* ======= Proceso ======= */}
      <section
        aria-labelledby="lg-process-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <h2 id="lg-process-title" className="font-mono text-[11px] font-medium uppercase tracking-[2px] text-muted-strong">
          {copy.processEyebrow}
        </h2>
        <div className="mt-6 h-px w-full bg-foreground" aria-hidden="true" />

        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {copy.process.map((step, i) => (
            <li
              key={step.roman}
              className="relative flex flex-col lg:pr-6"
            >
              <span className="font-sans text-[36px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[40px] lg:text-[42px] lg:tracking-[-1px]">
                {step.roman}
              </span>
              <h3 className="mt-6 font-sans text-[20px] tracking-[-0.3px] text-foreground sm:text-[22px] lg:text-[22px] lg:tracking-[-0.4px]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[380px] font-sans text-[14px] font-light leading-[20px] tracking-[-0.1px] text-muted-strong">
                {step.body}
              </p>

              {/* Chevron entre pasos (solo desktop, oculto en el último) */}
              {i < copy.process.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 top-2 hidden font-mono text-[18px] text-muted lg:block"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {/* ======= CTA dark ======= */}
      <section
        aria-labelledby="lg-cta-title"
        className="mt-24 bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:mt-32 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/20" aria-hidden="true" />
        <h2
          id="lg-cta-title"
          className="mt-10 max-w-[1700px] font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white/95 sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {copy.ctaTitle}
        </h2>
        <Link
          href={copy.ctaHref ?? `mailto:logistica@atalant.com?subject=${encodeURIComponent("Consulta entrega urgente")}`}
          className="mt-10 inline-flex flex-col items-start text-white transition-opacity hover:opacity-80"
        >
          <span className="font-sans text-[15px] font-medium tracking-[0.2px] sm:text-[16px]">
            {copy.ctaAction}
          </span>
          <span className="mt-2 block h-px w-[212px] bg-white" aria-hidden="true" />
        </Link>

        {copy.ctaFootnote || copy.phone ? (
          <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {copy.ctaFootnote ? (
              <p className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/50">
                {copy.ctaFootnote}
              </p>
            ) : null}
            {copy.phone ? (
              <p className="font-mono text-[11px] uppercase tracking-[2px] text-white/80">
                {copy.phone}
              </p>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
