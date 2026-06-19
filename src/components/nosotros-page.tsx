import Image from "next/image";
import Link from "next/link";
import type { AppLocale } from "@/lib/locales";
import { NosotrosChapters, type Chapter } from "@/components/nosotros-chapters";
import { NosotrosGrid } from "@/components/nosotros-grid";

type Props = {
  locale: AppLocale;
  copy?: NosotrosCopy;
};

export type ValueCard = {
  number: string;
  title: string;
  body: string;
};

export type NosotrosCopy = {
  breadcrumb: string;
  back: string;
  monogram: string;
  heroTitle: string;
  heroBody: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  metaLabels: {
    experiencia: string;
    sede: string;
    red: string;
    enfoque: string;
  };
  metaValues: {
    experiencia: string;
    sede: string;
    red: string;
    enfoque: string;
  };
  chapters: Chapter[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueCard[];
  closingEyebrow: string;
  closingTitle: string;
  closingBody: string;
  ctaTitle: string;
  ctaAction: string;
  ctaHref?: string;
  backHref?: string;
  ctaFootnote: string;
  phone: string;
};

const COPY_ES: NosotrosCopy = {
  breadcrumb: "NOSOTROS  /  SOCIO ESTRATÉGICO",
  back: "← VOLVER",
  monogram: "NS",
  heroTitle: "Treinta años\nuniendo polímeros\ny personas.",
  heroBody:
    "Atalant trabaja desde hace tres décadas para asegurar una cadena de suministro sólida y competitiva en materias primas plásticas y recicladas. Creemos en las relaciones fuertes y a largo plazo.",
  metaLabels: {
    experiencia: "EXPERIENCIA",
    sede: "SEDE",
    red: "RED",
    enfoque: "ENFOQUE",
  },
  metaValues: {
    experiencia: "30 años de mercado",
    sede: "San Vicente del Raspeig (España)",
    red: "",
    enfoque: "Socio a largo plazo",
  },

  chapters: [
    {
      eyebrow: "MANIFIESTO  /  ORIGEN",
      title: "Una cadena de suministro\nque no se rompe.",
      paragraphs: [
        "Con 30 años de experiencia en el sector de los polímeros, Atalant ha trabajado siempre para asegurar una cadena de suministro sólida y competitiva para sus clientes en lo referente no solo a la entrega y disponibilidad de materias primas plásticas y recicladas.",
        "En estos años, hemos aprendido a creer en las relaciones fuertes y a largo plazo.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-1.webp",
        alt: "Materia prima plástica lista para producción",
      },
    },
    {
      eyebrow: "MISIÓN  /  DISPONIBILIDAD",
      title: "Calidad máxima,\nsiempre disponible.",
      paragraphs: [
        "Nuestra misión es facilitar la compra de materias primas plásticas de la máxima calidad, y esto lo logramos gracias a nuestra amplia red logística propia y centros de almacenamiento de diseño propio en Iberia y el resto de Europa.",
        "De esta forma, mantenemos siempre los niveles de disponibilidad para nuestros clientes —desde volúmenes regulares hasta pedidos urgentes— sin perder de vista la sostenibilidad ni la calidad de trabajo.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-2.webp",
        alt: "Centro logístico y almacenaje Atalant",
      },
      reverse: true,
    },
    {
      eyebrow: "MÉTODO  /  ACOMPAÑAMIENTO",
      title: "Un enfoque personalizado,\nun compromiso firme.",
      paragraphs: [
        "Acompañamos a cada cliente para optimizar su producción, garantizando calidad, trazabilidad y respuesta inmediata ante cualquier cambio del mercado.",
        "Ofrecemos soluciones de abastecimiento flexibles, adaptadas a la realidad operativa de cada planta y a los ritmos reales de cada producción.",
      ],
      image: {
        src: "/imgsrc/about/atalant-industrial-logistics.webp",
        alt: "Flota Atalant en muelle de carga industrial",
      },
    },
  ],

  valuesEyebrow: "VALORES  /  CUATRO PRINCIPIOS",
  valuesTitle: "Lo que sostiene\ncada decisión.",
  values: [
    {
      number: "01",
      title: "Compromiso",
      body: "Nuestro apoyo a las relaciones fuertes es incondicional y responde al compromiso con clientes y proveedores, ofreciendo siempre la mejor solución a sus necesidades.",
    },
    {
      number: "02",
      title: "Agilidad",
      body: "Las soluciones ágiles forman parte de nuestro ADN. Respondemos con energía y estamos en movimiento continuo, sin conformarnos y buscando nuevas vías para dar lo mejor.",
    },
    {
      number: "03",
      title: "Flexibilidad",
      body: "Nos adaptamos a la realidad de cada cliente y proveedor. Solo porque estamos cerca podemos escuchar activamente y responder con rapidez y eficacia.",
    },
    {
      number: "04",
      title: "Confianza",
      body: "Sabemos lo que hacemos. Somos especialistas en materias primas plásticas y estamos siempre enfocados en ser el mejor socio posible para nuestros clientes.",
    },
  ],

  closingEyebrow: "POSICIÓN  /  MÁS QUE UN PROVEEDOR",
  closingTitle: "Socio estratégico,\nno solo proveedor.",
  closingBody:
    "Atalant se posiciona como socio estratégico a largo plazo para las empresas que buscan seriedad, tranquilidad y mayores ventajas que las que pueda ofrecer cualquier trader, distribuidor o petroquímica. Respaldados por la experiencia, la flexibilidad y el equipo, ponemos a disposición del cliente productos y servicios nunca antes vistos en el sector.",

  ctaTitle: "Hablemos de tu cadena\nde suministro.",
  ctaAction: "Escribir al equipo  →",
  ctaHref: "mailto:hola@atalant.com?subject=Contacto%20Atalant",
  ctaFootnote: "© MMXXVI ATALANT  /  NS",
  phone: "+34 965 66 18 28",
};

const COPY_EN: NosotrosCopy = {
  ...COPY_ES,
  breadcrumb: "ABOUT  /  STRATEGIC PARTNER",
  back: "← BACK",
  heroTitle: "Thirty years\nconnecting polymers\nand people.",
  heroBody:
    "For three decades, Atalant has worked to secure a solid and competitive supply chain for plastic and recycled raw materials. We believe in strong, long-term relationships.",
  metaLabels: {
    experiencia: "EXPERIENCE",
    sede: "HEADQUARTERS",
    red: "NETWORK",
    enfoque: "APPROACH",
  },
  metaValues: {
    experiencia: "30 years in the market",
    sede: "San Vicente del Raspeig (Spain)",
    red: "",
    enfoque: "Long-term partner",
  },
  chapters: [
    {
      eyebrow: "MANIFESTO  /  ORIGIN",
      title: "A supply chain\nthat does not break.",
      paragraphs: [
        "With 30 years of experience in the polymer sector, Atalant has always worked to secure a solid and competitive supply chain for its customers, not only in the delivery and availability of plastic and recycled raw materials.",
        "Over these years, we have learned to believe in strong, long-term relationships.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-1.webp",
        alt: "Plastic raw material ready for production",
      },
    },
    {
      eyebrow: "MISSION  /  AVAILABILITY",
      title: "Maximum quality,\nalways available.",
      paragraphs: [
        "Our mission is to make the purchase of top-quality plastic raw materials easier, and we achieve this through our broad proprietary logistics network and self-designed storage centers in Iberia and across Europe.",
        "This allows us to maintain availability levels for our customers, from regular volumes to urgent orders, without losing sight of sustainability or quality of work.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-2.webp",
        alt: "Atalant logistics and storage center",
      },
      reverse: true,
    },
    {
      eyebrow: "METHOD  /  SUPPORT",
      title: "A personalized approach,\na firm commitment.",
      paragraphs: [
        "We support every customer in optimizing production, ensuring quality, traceability, and an immediate response to any market change.",
        "We provide flexible sourcing solutions adapted to the operating reality of each plant and to the real pace of each production cycle.",
      ],
      image: {
        src: "/imgsrc/about/atalant-industrial-logistics.webp",
        alt: "Atalant fleet at an industrial loading dock",
      },
    },
  ],
  valuesEyebrow: "VALUES  /  FOUR PRINCIPLES",
  valuesTitle: "What supports\nevery decision.",
  values: [
    {
      number: "01",
      title: "Commitment",
      body: "Our support for strong relationships is unconditional and reflects our commitment to customers and suppliers, always offering the best solution for their needs.",
    },
    {
      number: "02",
      title: "Agility",
      body: "Agile solutions are part of our DNA. We respond with energy and remain in constant motion, always looking for new ways to do better.",
    },
    {
      number: "03",
      title: "Flexibility",
      body: "We adapt to the reality of every customer and supplier. Because we stay close, we can listen actively and respond quickly and effectively.",
    },
    {
      number: "04",
      title: "Trust",
      body: "We know what we do. We are specialists in plastic raw materials and remain focused on being the best possible partner for our customers.",
    },
  ],
  closingEyebrow: "POSITION  /  MORE THAN A SUPPLIER",
  closingTitle: "Strategic partner,\nnot just a supplier.",
  closingBody:
    "Atalant positions itself as a long-term strategic partner for companies seeking seriousness, calm, and greater advantages than any trader, distributor, or petrochemical supplier can offer. Backed by experience, flexibility, and the team, we make products and services available to customers that were previously unseen in the sector.",
  ctaTitle: "Let's talk about your\nsupply chain.",
  ctaAction: "Write to the team  →",
  ctaHref: "mailto:hola@atalant.com?subject=Atalant%20Contact",
  ctaFootnote: "© MMXXVI ATALANT  /  AB",
};

const COPY_FR: NosotrosCopy = {
  ...COPY_ES,
  breadcrumb: "À PROPOS  /  PARTENAIRE STRATÉGIQUE",
  back: "← RETOUR",
  heroTitle: "Trente ans\nà relier polymères\net personnes.",
  heroBody:
    "Depuis trois décennies, Atalant travaille à sécuriser une chaîne d'approvisionnement solide et compétitive en matières premières plastiques et recyclées. Nous croyons aux relations fortes et durables.",
  metaLabels: {
    experiencia: "EXPÉRIENCE",
    sede: "SIÈGE",
    red: "RÉSEAU",
    enfoque: "APPROCHE",
  },
  metaValues: {
    experiencia: "30 ans de marché",
    sede: "San Vicente del Raspeig (Espagne)",
    red: "",
    enfoque: "Partenaire à long terme",
  },
  chapters: [
    {
      eyebrow: "MANIFESTE  /  ORIGINE",
      title: "Une chaîne d'approvisionnement\nqui ne se rompt pas.",
      paragraphs: [
        "Avec 30 ans d'expérience dans le secteur des polymères, Atalant a toujours travaillé pour assurer à ses clients une chaîne d'approvisionnement solide et compétitive, au-delà de la seule livraison et disponibilité de matières premières plastiques et recyclées.",
        "Au fil des années, nous avons appris à croire aux relations fortes et durables.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-1.webp",
        alt: "Matière première plastique prête pour la production",
      },
    },
    {
      eyebrow: "MISSION  /  DISPONIBILITÉ",
      title: "Qualité maximale,\ntoujours disponible.",
      paragraphs: [
        "Notre mission est de faciliter l'achat de matières premières plastiques de qualité maximale, grâce à notre vaste réseau logistique propre et à nos centres de stockage conçus en interne en Ibérie et dans le reste de l'Europe.",
        "Nous maintenons ainsi les niveaux de disponibilité pour nos clients, des volumes réguliers aux commandes urgentes, sans perdre de vue la durabilité ni la qualité du travail.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-2.webp",
        alt: "Centre logistique et de stockage Atalant",
      },
      reverse: true,
    },
    {
      eyebrow: "MÉTHODE  /  ACCOMPAGNEMENT",
      title: "Une approche personnalisée,\nun engagement ferme.",
      paragraphs: [
        "Nous accompagnons chaque client pour optimiser sa production, en garantissant qualité, traçabilité et réponse immédiate à tout changement de marché.",
        "Nous proposons des solutions d'approvisionnement flexibles, adaptées à la réalité opérationnelle de chaque site et aux rythmes réels de chaque production.",
      ],
      image: {
        src: "/imgsrc/about/atalant-industrial-logistics.webp",
        alt: "Flotte Atalant sur un quai de chargement industriel",
      },
    },
  ],
  valuesEyebrow: "VALEURS  /  QUATRE PRINCIPES",
  valuesTitle: "Ce qui soutient\nchaque décision.",
  values: [
    {
      number: "01",
      title: "Engagement",
      body: "Notre soutien aux relations fortes est inconditionnel et répond à notre engagement envers clients et fournisseurs, avec toujours la meilleure solution pour leurs besoins.",
    },
    {
      number: "02",
      title: "Agilité",
      body: "Les solutions agiles font partie de notre ADN. Nous répondons avec énergie et restons en mouvement constant, sans nous conformer et en cherchant toujours à faire mieux.",
    },
    {
      number: "03",
      title: "Flexibilité",
      body: "Nous nous adaptons à la réalité de chaque client et fournisseur. Parce que nous sommes proches, nous pouvons écouter activement et répondre vite et efficacement.",
    },
    {
      number: "04",
      title: "Confiance",
      body: "Nous savons ce que nous faisons. Spécialistes des matières premières plastiques, nous restons concentrés sur notre rôle de meilleur partenaire possible pour nos clients.",
    },
  ],
  closingEyebrow: "POSITION  /  PLUS QU'UN FOURNISSEUR",
  closingTitle: "Partenaire stratégique,\npas seulement fournisseur.",
  closingBody:
    "Atalant se positionne comme partenaire stratégique à long terme pour les entreprises qui recherchent sérieux, tranquillité et avantages supérieurs à ceux qu'un trader, distributeur ou pétrochimiste peut offrir. Soutenus par l'expérience, la flexibilité et l'équipe, nous mettons à disposition des clients des produits et services jamais vus auparavant dans le secteur.",
  ctaTitle: "Parlons de votre\nchaîne d'approvisionnement.",
  ctaAction: "Écrire à l'équipe  →",
  ctaHref: "mailto:hola@atalant.com?subject=Contact%20Atalant",
  ctaFootnote: "© MMXXVI ATALANT  /  AP",
};

const COPY_PT: NosotrosCopy = {
  ...COPY_ES,
  breadcrumb: "SOBRE NÓS  /  PARCEIRO ESTRATÉGICO",
  back: "← VOLTAR",
  heroTitle: "Trinta anos\na unir polímeros\ne pessoas.",
  heroBody:
    "A Atalant trabalha há três décadas para assegurar uma cadeia de fornecimento sólida e competitiva em matérias-primas plásticas e recicladas. Acreditamos em relações fortes e de longo prazo.",
  metaLabels: {
    experiencia: "EXPERIÊNCIA",
    sede: "SEDE",
    red: "REDE",
    enfoque: "ENFOQUE",
  },
  metaValues: {
    experiencia: "30 anos de mercado",
    sede: "San Vicente del Raspeig (Espanha)",
    red: "",
    enfoque: "Parceiro de longo prazo",
  },
  chapters: [
    {
      eyebrow: "MANIFESTO  /  ORIGEM",
      title: "Uma cadeia de fornecimento\nque não se rompe.",
      paragraphs: [
        "Com 30 anos de experiência no setor dos polímeros, a Atalant trabalhou sempre para assegurar aos seus clientes uma cadeia de fornecimento sólida e competitiva, não só na entrega e disponibilidade de matérias-primas plásticas e recicladas.",
        "Ao longo destes anos, aprendemos a acreditar em relações fortes e de longo prazo.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-1.webp",
        alt: "Matéria-prima plástica pronta para produção",
      },
    },
    {
      eyebrow: "MISSÃO  /  DISPONIBILIDADE",
      title: "Qualidade máxima,\nsempre disponível.",
      paragraphs: [
        "A nossa missão é facilitar a compra de matérias-primas plásticas da máxima qualidade, e conseguimos fazê-lo graças à nossa ampla rede logística própria e centros de armazenagem de desenho próprio na Ibéria e no resto da Europa.",
        "Desta forma, mantemos sempre os níveis de disponibilidade para os nossos clientes, desde volumes regulares até encomendas urgentes, sem perder de vista a sustentabilidade nem a qualidade do trabalho.",
      ],
      image: {
        src: "/imgsrc/about/atalant-about-2.webp",
        alt: "Centro logístico e armazenagem Atalant",
      },
      reverse: true,
    },
    {
      eyebrow: "MÉTODO  /  ACOMPANHAMENTO",
      title: "Um enfoque personalizado,\num compromisso firme.",
      paragraphs: [
        "Acompanhamos cada cliente para otimizar a sua produção, garantindo qualidade, rastreabilidade e resposta imediata perante qualquer mudança do mercado.",
        "Oferecemos soluções de abastecimento flexíveis, adaptadas à realidade operacional de cada fábrica e aos ritmos reais de cada produção.",
      ],
      image: {
        src: "/imgsrc/about/atalant-industrial-logistics.webp",
        alt: "Frota Atalant num cais de carga industrial",
      },
    },
  ],
  valuesEyebrow: "VALORES  /  QUATRO PRINCÍPIOS",
  valuesTitle: "O que sustenta\ncada decisão.",
  values: [
    {
      number: "01",
      title: "Compromisso",
      body: "O nosso apoio às relações fortes é incondicional e responde ao compromisso com clientes e fornecedores, oferecendo sempre a melhor solução para as suas necessidades.",
    },
    {
      number: "02",
      title: "Agilidade",
      body: "As soluções ágeis fazem parte do nosso ADN. Respondemos com energia e estamos em movimento contínuo, sem nos conformarmos e procurando novas formas de dar o melhor.",
    },
    {
      number: "03",
      title: "Flexibilidade",
      body: "Adaptamo-nos à realidade de cada cliente e fornecedor. Só porque estamos próximos conseguimos escutar ativamente e responder com rapidez e eficácia.",
    },
    {
      number: "04",
      title: "Confiança",
      body: "Sabemos o que fazemos. Somos especialistas em matérias-primas plásticas e estamos sempre focados em ser o melhor parceiro possível para os nossos clientes.",
    },
  ],
  closingEyebrow: "POSIÇÃO  /  MAIS DO QUE UM FORNECEDOR",
  closingTitle: "Parceiro estratégico,\nnão apenas fornecedor.",
  closingBody:
    "A Atalant posiciona-se como parceiro estratégico de longo prazo para empresas que procuram seriedade, tranquilidade e maiores vantagens do que as que qualquer trader, distribuidor ou petroquímica pode oferecer. Apoiamo-nos na experiência, flexibilidade e equipa para disponibilizar ao cliente produtos e serviços nunca antes vistos no setor.",
  ctaTitle: "Falemos da sua cadeia\nde fornecimento.",
  ctaAction: "Escrever à equipa  →",
  ctaHref: "mailto:hola@atalant.com?subject=Contacto%20Atalant",
  ctaFootnote: "© MMXXVI ATALANT  /  SN",
};

export const NOSOTROS_COPY: Record<AppLocale, NosotrosCopy> = {
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

export function NosotrosPage({ locale, copy: pageCopy }: Props) {
  const copy = pageCopy ?? NOSOTROS_COPY[locale];
  const homeHref = copy.backHref ?? `/${locale}`;
  const metaEntries = (
    [
      ["experiencia"],
      ["sede"],
      ["red"],
      ["enfoque"],
    ] as const
  ).filter(([k]) => copy.metaLabels[k] && copy.metaValues[k]);

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
        aria-labelledby="ns-hero-title"
        className="relative overflow-x-clip px-10 pt-12 sm:px-14 sm:pt-16 lg:px-20 lg:pt-20"
      >
        {/* Retícula full-bleed: arranca en el borde superior del hero
            (donde están el monograma NS y el titular) y se extiende
            -bottom-40 / lg:-bottom-56 más allá del meta row para cubrir
            el `mt-24 + pt-16` (lg: `mt-32 + pt-24`) hasta el inicio del
            primer capítulo del manifesto. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -bottom-40 z-0 w-screen -translate-x-1/2 lg:-bottom-56"
        >
          <NosotrosGrid />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[auto_1fr] lg:gap-x-16 lg:gap-y-12 2xl:grid-cols-[auto_minmax(0,1fr)_minmax(0,420px)] 2xl:gap-x-24">
          {/* Monograma NS */}
          <p
            aria-hidden="true"
            className="font-sans font-light leading-[0.85] tracking-[-6px] text-primary text-[120px] sm:text-[180px] lg:self-start lg:text-[220px] xl:text-[240px] 2xl:text-[280px] 2xl:tracking-[-10px]"
          >
            {copy.monogram}
          </p>

          {/* Título */}
          <h1
            id="ns-hero-title"
            className="font-sans text-[36px] font-light leading-[1.05] tracking-[-1.2px] text-foreground sm:text-[52px] lg:self-center lg:text-[64px] lg:leading-[1.08] lg:tracking-[-2.2px] xl:text-[72px] 2xl:text-[80px] 2xl:leading-[1.15] 2xl:tracking-[-3px]"
          >
            {renderMultiline(copy.heroTitle)}
          </h1>

          {/* Bajada */}
          <p className="font-sans text-[15px] font-light leading-[24px] tracking-[-0.1px] text-foreground lg:col-span-2 lg:max-w-[560px] lg:justify-self-end lg:text-[17px] lg:leading-[28px] 2xl:col-span-1 2xl:self-end 2xl:justify-self-stretch 2xl:pb-4 2xl:text-[20px] 2xl:leading-[32px] 2xl:tracking-[-0.2px]">
            {copy.heroBody}
          </p>
        </div>

        {/* ======= Imagen hero (sobre la retícula) ======= */}
        <div className="relative z-10 mt-14 aspect-[16/9] w-full overflow-hidden bg-foreground/5 sm:aspect-[21/9] lg:mt-16 lg:aspect-[1760/693]">
          <Image
            src={copy.heroImageSrc ?? "/imgsrc/about/atalant-about-hero.webp"}
            alt={copy.heroImageAlt ?? "Equipo Atalant en planta de polímeros"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* ======= Meta row ======= */}
        <div className="relative z-10 mt-10 grid grid-cols-1 gap-y-8 pt-8 sm:mt-14 sm:grid-cols-3 sm:gap-x-10 lg:mt-16">
          {metaEntries.map(([k]) => (
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

      {/* ======= Manifiesto: capítulos texto-imagen con scroll reveal ======= */}
      <section
        aria-label="Manifiesto Atalant"
        className="mt-24 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <NosotrosChapters chapters={copy.chapters} />
      </section>

      {/* ======= Valores (4 puntos) ======= */}
      <section
        aria-labelledby="ns-values-title"
        className="mt-24 border-t border-foreground/15 px-10 pt-16 sm:px-14 lg:mt-32 lg:px-20 lg:pt-24"
      >
        <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
          {copy.valuesEyebrow}
        </p>
        <h2
          id="ns-values-title"
          className="mt-6 max-w-[1200px] font-sans text-[32px] font-light leading-[1.08] tracking-[-1px] text-foreground sm:text-[44px] lg:text-[56px] lg:tracking-[-1.8px]"
        >
          {renderMultiline(copy.valuesTitle)}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-2">
          {copy.values.map((val) => (
            <article
              key={val.number}
              className="grid grid-cols-[auto_1fr] gap-x-8 border-b border-foreground/15 pb-10 lg:pb-14"
            >
              <p className="font-sans text-[40px] font-light leading-none tracking-[-0.8px] text-primary sm:text-[48px] lg:text-[52px] lg:tracking-[-1.2px]">
                {val.number}
              </p>
              <div>
                <h3 className="font-sans text-[22px] tracking-[-0.4px] text-foreground sm:text-[26px] lg:text-[28px] lg:tracking-[-0.5px]">
                  {val.title}
                </h3>
                <p className="mt-3 max-w-[740px] font-sans text-[14px] font-light leading-[22px] tracking-[-0.1px] text-muted-strong lg:text-[15px] lg:leading-[24px]">
                  {val.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======= Cierre: posicionamiento (composición centrada sobre
          retícula full-bleed) ======= */}
      <section
        aria-labelledby="ns-closing-title"
        className="relative mt-24 overflow-x-clip px-10 py-20 sm:px-14 lg:mt-32 lg:px-20 lg:py-36"
      >
        {/* Retícula de fondo, full-bleed (100vw), cubre toda la sección */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2"
        >
          <NosotrosGrid />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center text-center">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-primary">
            {copy.closingEyebrow}
          </p>
          <h2
            id="ns-closing-title"
            className="mt-8 font-sans text-[40px] font-medium leading-[1.02] tracking-[-1.5px] text-foreground sm:text-[56px] lg:mt-10 lg:text-[80px] lg:leading-[0.98] lg:tracking-[-3px]"
          >
            {renderMultiline(copy.closingTitle)}
          </h2>
          <p className="mt-10 max-w-[720px] font-sans text-[17px] font-light leading-[28px] tracking-[-0.1px] text-muted-strong lg:mt-14 lg:text-[20px] lg:leading-[32px]">
            {copy.closingBody}
          </p>
        </div>
      </section>

      {/* ======= CTA dark ======= */}
      <section
        aria-labelledby="ns-cta-title"
        className="mt-24 bg-foreground px-10 py-16 text-white sm:px-14 sm:py-20 lg:mt-32 lg:px-20 lg:py-24"
      >
        <div className="h-px w-full bg-white/20" aria-hidden="true" />
        <h2
          id="ns-cta-title"
          className="mt-10 max-w-[1700px] font-sans text-[34px] font-light leading-[1.1] tracking-[-1px] text-white/95 sm:text-[48px] lg:text-[64px] lg:leading-[72px] lg:tracking-[-2px]"
        >
          {renderMultiline(copy.ctaTitle)}
        </h2>
        <Link
          href={copy.ctaHref ?? `mailto:hola@atalant.com?subject=${encodeURIComponent("Contacto Atalant")}`}
          className="mt-10 inline-flex flex-col items-start text-white transition-opacity hover:opacity-80"
        >
          <span className="font-sans text-[15px] font-medium tracking-[0.2px] sm:text-[16px]">
            {copy.ctaAction}
          </span>
          <span className="mt-2 block h-px w-[212px] bg-white" aria-hidden="true" />
        </Link>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[1.5px] text-white/50">
            {copy.ctaFootnote}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-white/80">
            {copy.phone}
          </p>
        </div>
      </section>
    </main>
  );
}
