import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { SustainabilityParticles } from "@/components/sustainability-particles";

type Props = {
  locale: AppLocale;
  copy?: SustainabilityCopy;
};

export type SustainabilityCopy = {
  back: string;
  breadcrumb: string;
  ctaAction: string;
  ctaHref?: string;
  backHref?: string;
  ctaFootnote: string;
  ctaTitle: string;
  heroBody: string;
  heroTitle: string;
  initiatives: Array<{
    number: string;
    title: string;
    body: string;
  }>;
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  meta: Array<{
    label: string;
    value: string;
  }>;
  proofEyebrow: string;
  proofTitle: string;
  proofItems: Array<{
    label: string;
    value: string;
  }>;
  systemsVideoSrc?: string;
  systemsVideoPoster?: string;
  systemsEyebrow: string;
  systemsTitle: string;
  systemsBody: string;
};

const COPY_ES: SustainabilityCopy = {
  back: "← VOLVER",
  breadcrumb: "SOSTENIBILIDAD  /  OPERACIÓN INDUSTRIAL",
  ctaAction: "Hablar con Atalant  →",
  ctaHref: "mailto:info@atalant.com?subject=Sostenibilidad%20Atalant",
  ctaFootnote: "© MMXXVI ATALANT  /  SOST",
  ctaTitle: "La sostenibilidad se sostiene cuando mejora la operación.",
  heroBody:
    "Ser sostenible a escala industrial exige mantener eficiencia, capacidad y continuidad. Atalant ha adaptado su operación para reducir impacto sin convertir la sostenibilidad en una promesa decorativa.",
  heroTitle: "Sostenibilidad\nsin perder\ncapacidad.",
  initiatives: [
    {
      number: "01",
      title: "Gestión de residuos",
      body:
        "Sistema implantado en todos los centros para gestionar, reducir y mejorar de forma constante el impacto ambiental de la empresa.",
    },
    {
      number: "02",
      title: "Materiales reciclados",
      body:
        "La inclusión de materiales reciclados de alta calidad marca un precedente dentro del plan de sostenibilidad de Atalant.",
    },
    {
      number: "03",
      title: "Energía solar",
      body:
        "Placas solares en puntos logísticos para operar con menor dependencia de la red eléctrica y avanzar hacia autosuficiencia operativa.",
    },
    {
      number: "04",
      title: "Descarga eléctrica",
      body:
        "Camiones con cisternas eléctricas para evitar el uso de combustible durante las descargas en operaciones seleccionadas.",
    },
    {
      number: "05",
      title: "Flota eficiente",
      body:
        "Nuevos camiones y medios internos en almacenes y centros logísticos orientados a reducir consumos y contaminación.",
    },
    {
      number: "06",
      title: "I+D en hidrógeno verde",
      body:
        "Inversión y liderazgo en proyectos basados en tecnologías de hidrógeno verde para pilas de combustible y electrolizadores.",
    },
  ],
  introEyebrow: "ENFOQUE  /  EFICIENCIA Y RESPONSABILIDAD",
  introTitle: "Reducir impacto sin reducir respuesta.",
  introBody:
    "Uno de los retos industriales más complejos es ser sostenible manteniendo un trabajo eficiente. La estrategia de Atalant parte de una idea concreta: cada mejora ambiental debe integrarse en el sistema operativo, no vivir separada de la realidad logística y comercial.",
  meta: [
    { label: "CERTIFICACIÓN", value: "ISO 14001" },
    { label: "ENERGÍA", value: "Generación energía propia mediante módulos solares" },
    { label: "TRANSPORTE", value: "Silo trucks eléctricos" },
    { label: "MATERIALES", value: "Materiales reciclados de alta calidad" },
  ],
  proofEyebrow: "EVIDENCIAS  /  MEDICIÓN",
  proofTitle: "Lo medible se gestiona.",
  proofItems: [
    { label: "Sistema ambiental", value: "ISO 14001 implantado" },
    { label: "Huella de carbono", value: "Medición y certificación en seguimiento" },
    { label: "Centros", value: "Gestión de residuos en todos los puntos operativos" },
    { label: "Entorno natural", value: "Conservación de zonas con árboles y masas forestales" },
  ],
  systemsEyebrow: "SISTEMA  /  MEJORA CONTINUA",
  systemsTitle: "Sostenibilidad como infraestructura, no como campaña.",
  systemsBody:
    "La gestión ambiental se conecta con compras, almacenaje, transporte, energía e I+D. Esa integración permite avanzar en reducción de impacto sin perder capacidades industriales ni velocidad de respuesta.",
};

const COPY_EN: SustainabilityCopy = {
  ...COPY_ES,
  back: "← BACK",
  breadcrumb: "SUSTAINABILITY  /  INDUSTRIAL OPERATION",
  ctaAction: "Talk to Atalant  →",
  ctaHref: "mailto:info@atalant.com?subject=Atalant%20Sustainability",
  ctaFootnote: "© MMXXVI ATALANT  /  SUST",
  ctaTitle: "Sustainability holds when it improves the operation.",
  heroBody:
    "Being sustainable at industrial scale means maintaining efficiency, capacity, and continuity. Atalant has adapted its operation to reduce impact without turning sustainability into a decorative promise.",
  heroTitle: "Sustainability\nwithout losing\ncapacity.",
  initiatives: [
    {
      number: "01",
      title: "Waste management",
      body:
        "A system implemented across all centers to manage, reduce, and continuously improve the company's environmental impact.",
    },
    {
      number: "02",
      title: "Recycled materials",
      body:
        "The inclusion of high-quality recycled materials sets a clear precedent within Atalant's sustainability plan.",
    },
    {
      number: "03",
      title: "Solar energy",
      body:
        "Solar panels at logistics points reduce dependence on the electrical grid and move operations toward greater self-sufficiency.",
    },
    {
      number: "04",
      title: "Electric unloading",
      body:
        "Trucks with electric silo systems avoid fuel use during selected unloading operations.",
    },
    {
      number: "05",
      title: "Efficient fleet",
      body:
        "New trucks and internal warehouse equipment are designed to reduce consumption and pollution.",
    },
    {
      number: "06",
      title: "Green hydrogen R&D",
      body:
        "Investment and leadership in projects based on green hydrogen technologies for fuel cells and electrolysers.",
    },
  ],
  introEyebrow: "APPROACH  /  EFFICIENCY AND RESPONSIBILITY",
  introTitle: "Reducing impact without reducing response.",
  introBody:
    "One of the most complex industrial challenges is becoming sustainable while maintaining efficient work. Atalant's strategy starts from a concrete idea: every environmental improvement must be integrated into the operating system, not separated from logistics and commercial reality.",
  meta: [
    { label: "CERTIFICATION", value: "ISO 14001" },
    { label: "ENERGY", value: "Own energy generation through solar modules" },
    { label: "TRANSPORT", value: "Electric silo trucks" },
    { label: "MATERIALS", value: "High-quality recycled materials" },
  ],
  proofEyebrow: "EVIDENCE  /  MEASUREMENT",
  proofTitle: "What is measurable can be managed.",
  proofItems: [
    { label: "Environmental system", value: "ISO 14001 implemented" },
    { label: "Carbon footprint", value: "Measurement and certification under monitoring" },
    { label: "Centers", value: "Waste management across all operating points" },
    { label: "Natural environment", value: "Conservation of areas with trees and forest mass" },
  ],
  systemsEyebrow: "SYSTEM  /  CONTINUOUS IMPROVEMENT",
  systemsTitle: "Sustainability as infrastructure, not as a campaign.",
  systemsBody:
    "Environmental management connects purchasing, storage, transport, energy, and R&D. That integration makes it possible to reduce impact without losing industrial capability or response speed.",
};

const COPY_FR: SustainabilityCopy = {
  ...COPY_ES,
  back: "← RETOUR",
  breadcrumb: "DURABILITÉ  /  OPÉRATION INDUSTRIELLE",
  ctaAction: "Parler avec Atalant  →",
  ctaHref: "mailto:info@atalant.com?subject=Durabilit%C3%A9%20Atalant",
  ctaFootnote: "© MMXXVI ATALANT  /  DUR",
  ctaTitle: "La durabilité tient lorsqu'elle améliore l'opération.",
  heroBody:
    "Être durable à l'échelle industrielle exige de maintenir efficacité, capacité et continuité. Atalant a adapté son fonctionnement pour réduire son impact sans transformer la durabilité en promesse décorative.",
  heroTitle: "Durabilité\nsans perdre\nde capacité.",
  initiatives: [
    {
      number: "01",
      title: "Gestion des déchets",
      body:
        "Système déployé dans tous les centres pour gérer, réduire et améliorer en continu l'impact environnemental de l'entreprise.",
    },
      {
        number: "02",
        title: "Matériaux recyclés",
        body:
        "L'intégration de matériaux recyclés de haute qualité crée une référence dans le plan de durabilité d'Atalant.",
    },
    {
      number: "03",
      title: "Énergie solaire",
      body:
        "Des panneaux solaires sur les points logistiques réduisent la dépendance au réseau électrique et renforcent l'autosuffisance opérationnelle.",
    },
    {
      number: "04",
      title: "Déchargement électrique",
      body:
        "Des camions équipés de citernes électriques évitent l'utilisation de carburant pendant certaines opérations de déchargement.",
    },
    {
      number: "05",
      title: "Flotte efficace",
      body:
        "Nouveaux camions et moyens internes dans les entrepôts et centres logistiques afin de réduire consommation et pollution.",
    },
    {
      number: "06",
      title: "R&D hydrogène vert",
      body:
        "Investissement et leadership dans des projets basés sur les technologies d'hydrogène vert pour piles à combustible et électrolyseurs.",
    },
  ],
  introEyebrow: "APPROCHE  /  EFFICACITÉ ET RESPONSABILITÉ",
  introTitle: "Réduire l'impact sans réduire la réponse.",
  introBody:
    "La durabilité exige de concilier efficacité, capacité et continuité. Atalant adapte ses opérations afin de réduire son empreinte environnementale tout en maintenant ces standards au cœur de son fonctionnement.",
  meta: [
    { label: "CERTIFICATION", value: "ISO 14001" },
    { label: "ÉNERGIE", value: "Production d'énergie propre grâce à des modules solaires" },
    { label: "TRANSPORT", value: "Silo trucks électriques" },
    { label: "MATÉRIAUX", value: "Matériaux recyclés de haute qualité" },
  ],
  proofEyebrow: "PREUVES  /  MESURE",
  proofTitle: "Ce qui se mesure se gère.",
  proofItems: [
    { label: "Système environnemental", value: "ISO 14001 déployé" },
    { label: "Empreinte carbone", value: "Mesure et certification en suivi" },
    { label: "Centres", value: "Gestion des déchets sur tous les points opérationnels" },
    { label: "Milieu naturel", value: "Conservation de zones arborées et forestières" },
  ],
  systemsEyebrow: "SYSTÈME  /  AMÉLIORATION CONTINUE",
  systemsTitle: "La durabilité comme infrastructure, pas comme campagne.",
  systemsBody:
    "La gestion environnementale relie achats, stockage, transport, énergie et R&D. Cette intégration permet de progresser dans la réduction d'impact écologique sans perdre en capacités industrielles ni en réactivité.",
};

const COPY_PT: SustainabilityCopy = {
  ...COPY_ES,
  back: "← VOLTAR",
  breadcrumb: "SUSTENTABILIDADE  /  OPERAÇÃO INDUSTRIAL",
  ctaAction: "Falar com a Atalant  →",
  ctaHref: "mailto:info@atalant.com?subject=Sustentabilidade%20Atalant",
  ctaFootnote: "© MMXXVI ATALANT  /  SUST",
  ctaTitle: "A sustentabilidade mantém-se quando melhora a operação.",
  heroBody:
    "Ser sustentável à escala industrial exige manter eficiência, capacidade e continuidade. A Atalant adaptou a sua operação para reduzir impacto sem transformar a sustentabilidade numa promessa decorativa.",
  heroTitle: "Sustentabilidade\nsem perder\ncapacidade.",
  initiatives: [
    {
      number: "01",
      title: "Gestão de resíduos",
      body:
        "Sistema implementado em todos os centros para gerir, reduzir e melhorar de forma constante o impacto ambiental da empresa.",
    },
      {
        number: "02",
        title: "Materiais reciclados",
        body:
        "A inclusão de materiais reciclados de alta qualidade cria um marco no plano de sustentabilidade da Atalant.",
      },
      {
        number: "03",
        title: "Energia solar",
        body:
        "Painéis solares instalados nos centros logísticos para operar com menor dependência da rede elétrica e avançar para maior autossuficiência operacional.",
    },
    {
      number: "04",
      title: "Descarga elétrica",
      body:
        "Camiões com cisternas elétricas para evitar o uso de combustível durante descargas em operações selecionadas.",
    },
    {
      number: "05",
      title: "Frota eficiente",
      body:
        "Novos camiões e meios internos em armazéns e centros logísticos orientados para reduzir consumos e contaminação.",
    },
    {
      number: "06",
      title: "I+D em hidrogénio verde",
      body:
        "Investimento e liderança em projetos baseados em tecnologias de hidrogénio verde para pilhas de combustível e eletrolisadores.",
    },
  ],
  introEyebrow: "ENFOQUE  /  EFICIÊNCIA E RESPONSABILIDADE",
  introTitle: "Reduzir impacto sem reduzir resposta.",
  introBody:
    "Um dos desafios industriais mais complexos é ser sustentável mantendo um trabalho eficiente. A estratégia da Atalant parte de uma ideia concreta: cada melhoria ambiental deve ser integrada no seu todo, não viver separada da realidade logística e comercial.",
  meta: [
    { label: "CERTIFICAÇÃO", value: "ISO 14001" },
    { label: "ENERGIA", value: "Geração de energia própria através de módulos solares" },
    { label: "TRANSPORTE", value: "Silo trucks elétricos" },
    { label: "MATERIAIS", value: "Materiais reciclados de alta qualidade" },
  ],
  proofEyebrow: "EVIDÊNCIAS  /  MEDIÇÃO",
  proofTitle: "O que se mede, gere-se.",
  proofItems: [
    { label: "Sistema ambiental", value: "ISO 14001 implementado" },
    { label: "Pegada de carbono", value: "Medição e certificação em acompanhamento" },
    { label: "Centros", value: "Gestão de resíduos em todos os pontos operacionais" },
    { label: "Ambiente natural", value: "Conservação de zonas com árvores e massas florestais" },
  ],
  systemsEyebrow: "SISTEMA  /  MELHORIA CONTÍNUA",
  systemsTitle: "Sustentabilidade como infraestrutura, não como campanha.",
  systemsBody:
    "A gestão ambiental liga compras, armazenagem, transporte, energia e I+D. Essa integração permite avançar na redução de impacto sem perder capacidades industriais nem velocidade de resposta.",
};

export const SUSTAINABILITY_COPY: Record<AppLocale, SustainabilityCopy> = {
  es: COPY_ES,
  en: COPY_EN,
  pt: COPY_PT,
  fr: COPY_FR,
};

const initiativesHeader: Record<AppLocale, { eyebrow: string; title: string }> = {
  en: {
    eyebrow: "ACTIONS  /  SIX FRONTS",
    title: "Improvements applied across centers, fleet, energy, and product.",
  },
  es: {
    eyebrow: "ACTUACIONES  /  SEIS FRENTES",
    title: "Mejoras aplicadas en centros, flota, energía y producto.",
  },
  fr: {
    eyebrow: "ACTIONS  /  SIX AXES",
    title: "Améliorations appliquées aux centres, à la flotte, à l'énergie et au produit.",
  },
  pt: {
    eyebrow: "AÇÕES  /  SEIS FRENTES",
    title: "Melhorias aplicadas em centros, frota, energia e produto.",
  },
};

function renderMultiline(text: string) {
  return text.split("\n").map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

export function SustainabilityPage({ locale, copy: pageCopy }: Props) {
  const copy = pageCopy ?? SUSTAINABILITY_COPY[locale];
  const homeHref = copy.backHref ?? `/${locale}`;

  return (
    <main className="relative bg-background text-foreground">
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

      <section
        aria-labelledby="sustainability-hero-title"
        className="px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,460px)] 2xl:gap-x-24">
          <p
            aria-hidden="true"
            className="font-sans text-[120px] font-light leading-[0.85] tracking-[-6px] text-green sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            SO
          </p>
          <h1
            id="sustainability-hero-title"
            className="text-balance font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>
          <p className="text-pretty font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[600px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-foreground/15 pt-8 sm:mt-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {copy.meta.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {item.label}
              </dt>
              <dd className="mt-2 text-pretty font-sans text-[15px] tracking-[-0.1px] text-foreground sm:text-[16px]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="sustainability-intro-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] lg:gap-12">
          <div className="relative min-h-[500px] overflow-visible lg:min-h-[560px]">
            <SustainabilityParticles className="absolute -inset-x-16 -inset-y-24 sm:-inset-x-24 lg:-inset-x-32 lg:-inset-y-28" />
          </div>
          <div className="flex flex-col justify-center lg:pl-6">
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
              {copy.introEyebrow}
            </p>
            <h2
              id="sustainability-intro-title"
              className="mt-6 max-w-[680px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[52px] lg:tracking-[-1.6px]"
            >
              {copy.introTitle}
            </h2>
            <p className="mt-8 max-w-[560px] text-pretty font-sans text-[16px] font-light leading-[26px] tracking-[-0.1px] text-body lg:text-[18px] lg:leading-[30px]">
              {copy.introBody}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sustainability-initiatives-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
          {initiativesHeader[locale].eyebrow}
        </p>
        <h2
          id="sustainability-initiatives-title"
          className="mt-6 max-w-[1200px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {initiativesHeader[locale].title}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2">
          {copy.initiatives.map((item) => (
            <article
              key={item.number}
              className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-foreground/15 pb-10 lg:pb-14"
            >
              <p className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-green sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]">
                {item.number}
              </p>
              <div>
                <h3 className="text-balance font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[740px] text-pretty font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20">
        <div className="grid gap-12 bg-white px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-12 lg:py-14">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
              {copy.systemsEyebrow}
            </p>
            <h2 className="mt-6 max-w-[760px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]">
              {copy.systemsTitle}
            </h2>
            <p className="mt-8 max-w-[640px] text-pretty font-sans text-[16px] font-light leading-[26px] tracking-[-0.1px] text-body lg:text-[18px] lg:leading-[30px]">
              {copy.systemsBody}
            </p>
          </div>
          <div className="relative min-h-[360px] overflow-hidden bg-background">
            <video
              className="h-full w-full object-cover"
              src={copy.systemsVideoSrc ?? "/Truck%20Coastal%20Cinematic.mp4"}
              poster={copy.systemsVideoPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="sustainability-proof-title"
        className="mt-24 px-10 sm:px-14 lg:mt-32 lg:px-20"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-green">
          {copy.proofEyebrow}
        </p>
        <h2
          id="sustainability-proof-title"
          className="mt-6 max-w-[1200px] text-balance font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {copy.proofTitle}
        </h2>
        <div className="mt-10 h-px w-full bg-foreground" aria-hidden="true" />
        <dl className="divide-y divide-foreground/15">
          {copy.proofItems.map((item) => (
            <div
              key={item.label}
              className="grid gap-3 py-8 sm:grid-cols-[240px_minmax(0,1fr)] lg:grid-cols-[320px_minmax(0,1fr)]"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[2px] text-muted-strong">
                {item.label}
              </dt>
              <dd className="text-pretty font-sans text-[24px] font-light leading-[1.15] tracking-[-0.7px] text-foreground sm:text-[30px] lg:text-[36px]">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="sustainability-cta-title"
        className="mt-24 bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:mt-32 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/25" aria-hidden="true" />
        <h2
          id="sustainability-cta-title"
          className="mt-10 max-w-[1700px] text-balance font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {copy.ctaTitle}
        </h2>
        <Link
          href={copy.ctaHref ?? `mailto:info@atalant.com?subject=${encodeURIComponent("Sostenibilidad Atalant")}`}
          className="mt-10 inline-flex flex-col items-start text-white transition-opacity hover:opacity-80"
        >
          <span className="font-sans text-[15px] font-medium tracking-[0.2px] sm:text-[16px]">
            {copy.ctaAction}
          </span>
          <span className="mt-2 block h-px w-[190px] bg-white" aria-hidden="true" />
        </Link>
        <div className="mt-14 flex flex-col gap-4 border-t border-white/25 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/60">
            {copy.ctaFootnote}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-white/85">
            ISO 14001  ·  GREENLANT  ·  I+D HIDRÓGENO VERDE
          </p>
        </div>
      </section>
    </main>
  );
}
