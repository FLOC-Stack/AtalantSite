import type {
  HomePageData,
  ProductFamilyData,
  SiteSettingsData,
} from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";

const byLocale = {
  en: {
    address: "Barcelona, Spain",
    contactBody:
      "Tell us which polymer family you are sourcing, your target market, and your expected monthly volume. We will reply with a concrete commercial route.",
    footerText:
      "Atalant coordinates polymer sourcing, logistics, and commercial execution for industrial buyers across Europe.",
    note: "We reply in the selected page language whenever possible.",
    seoDescription:
      "Atalant distributes polymer families and recycled materials for industrial buyers across Europe.",
    tagline: "Industrial polymer sourcing with operational discipline",
  },
  es: {
    address: "Barcelona, España",
    contactBody:
      "Cuéntanos qué familia de polímero necesitas, tu mercado objetivo y tu volumen mensual estimado. Responderemos con una ruta comercial concreta.",
    footerText:
      "Atalant coordina abastecimiento de polímeros, logística y ejecución comercial para compradores industriales en Europa.",
    note: "Respondemos en el idioma elegido en esta página siempre que sea posible.",
    seoDescription:
      "Atalant distribuye familias de polímeros y materiales reciclados para compradores industriales en Europa.",
    tagline: "Abastecimiento industrial de polímeros con disciplina operativa",
  },
  fr: {
    address: "Barcelone, Espagne",
    contactBody:
      "Indiquez la famille de polymères recherchée, votre marché cible et votre volume mensuel estimé. Nous répondrons avec une route commerciale concrète.",
    footerText:
      "Atalant coordonne l'approvisionnement en polymères, la logistique et l'exécution commerciale pour des acheteurs industriels en Europe.",
    note: "Nous répondons dans la langue choisie sur cette page lorsque c'est possible.",
    seoDescription:
      "Atalant distribue des familles de polymères et des matériaux recyclés pour des acheteurs industriels en Europe.",
    tagline: "Approvisionnement industriel en polymères avec discipline opérationnelle",
  },
  pt: {
    address: "Barcelona, Espanha",
    contactBody:
      "Diga-nos qual família de polímeros procura, o mercado de destino e o volume mensal estimado. Respondemos com uma rota comercial concreta.",
    footerText:
      "A Atalant coordena abastecimento de polímeros, logística e execução comercial para compradores industriais na Europa.",
    note: "Respondemos no idioma selecionado nesta página sempre que possível.",
    seoDescription:
      "A Atalant distribui famílias de polímeros e materiais reciclados para compradores industriais na Europa.",
    tagline: "Abastecimento industrial de polímeros com disciplina operacional",
  },
} as const satisfies Record<
  AppLocale,
  {
    address: string;
    contactBody: string;
    footerText: string;
    note: string;
    seoDescription: string;
    tagline: string;
  }
>;

export const fallbackSiteSettings: Record<AppLocale, SiteSettingsData> = {
  en: {
    address: byLocale.en.address,
    brandName: "Atalant",
    contactEmail: "hello@atalant.eu",
    defaultSeo: {
      description: byLocale.en.seoDescription,
      title: "Atalant | Polymer distribution in Europe",
    },
    footerLinks: [
      { kind: "logistics", label: "Logistics" },
      { kind: "section", label: "Sustainability", sectionId: "sustainability" },
      { kind: "products", label: "Products" },
      { href: "mailto:hello@atalant.eu", kind: "external", label: "hello@atalant.eu" },
    ],
    footerText: byLocale.en.footerText,
    locale: "en",
    navigation: [
      { kind: "products", label: "Products" },
      { kind: "logistics", label: "Logistics" },
      { kind: "section", label: "Financing", sectionId: "financing" },
      { kind: "section", label: "Sustainability", sectionId: "sustainability" },
      { kind: "section", label: "Team", sectionId: "team" },
      { kind: "section", label: "Contact", sectionId: "contact" },
    ],
    phone: "+34 93 555 0101",
    tagline: byLocale.en.tagline,
  },
  es: {
    address: byLocale.es.address,
    brandName: "Atalant",
    contactEmail: "hola@atalant.eu",
    defaultSeo: {
      description: byLocale.es.seoDescription,
      title: "Atalant | Distribución de polímeros en Europa",
    },
    footerLinks: [
      { kind: "products", label: "Productos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Sostenibilidad", sectionId: "sustainability" },
      { href: "mailto:hola@atalant.eu", kind: "external", label: "hola@atalant.eu" },
    ],
    footerText: byLocale.es.footerText,
    locale: "es",
    navigation: [
      { kind: "products", label: "Productos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Financiación", sectionId: "financing" },
      { kind: "section", label: "Sostenibilidad", sectionId: "sustainability" },
      { kind: "section", label: "Nosotros", sectionId: "team" },
      { kind: "section", label: "Contacto", sectionId: "contact" },
    ],
    phone: "+34 93 555 0101",
    tagline: byLocale.es.tagline,
  },
  fr: {
    address: byLocale.fr.address,
    brandName: "Atalant",
    contactEmail: "bonjour@atalant.eu",
    defaultSeo: {
      description: byLocale.fr.seoDescription,
      title: "Atalant | Distribution de polymères en Europe",
    },
    footerLinks: [
      { kind: "products", label: "Produits" },
      { kind: "logistics", label: "Logistique" },
      { kind: "section", label: "Durabilité", sectionId: "sustainability" },
      { href: "mailto:bonjour@atalant.eu", kind: "external", label: "bonjour@atalant.eu" },
    ],
    footerText: byLocale.fr.footerText,
    locale: "fr",
    navigation: [
      { kind: "products", label: "Produits" },
      { kind: "logistics", label: "Logistique" },
      { kind: "section", label: "Financement", sectionId: "financing" },
      { kind: "section", label: "Durabilité", sectionId: "sustainability" },
      { kind: "section", label: "Équipe", sectionId: "team" },
      { kind: "section", label: "Contact", sectionId: "contact" },
    ],
    phone: "+34 93 555 0101",
    tagline: byLocale.fr.tagline,
  },
  pt: {
    address: byLocale.pt.address,
    brandName: "Atalant",
    contactEmail: "ola@atalant.eu",
    defaultSeo: {
      description: byLocale.pt.seoDescription,
      title: "Atalant | Distribuição de polímeros na Europa",
    },
    footerLinks: [
      { kind: "products", label: "Produtos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Sustentabilidade", sectionId: "sustainability" },
      { href: "mailto:ola@atalant.eu", kind: "external", label: "ola@atalant.eu" },
    ],
    footerText: byLocale.pt.footerText,
    locale: "pt",
    navigation: [
      { kind: "products", label: "Produtos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Financiamento", sectionId: "financing" },
      { kind: "section", label: "Sustentabilidade", sectionId: "sustainability" },
      { kind: "section", label: "Equipa", sectionId: "team" },
      { kind: "section", label: "Contacto", sectionId: "contact" },
    ],
    phone: "+34 93 555 0101",
    tagline: byLocale.pt.tagline,
  },
};

export const fallbackHomePages: Record<AppLocale, HomePageData> = {
  en: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "European reach, fast commercial response, and recycled materials integrated into a pragmatic industrial offer.",
        eyebrow: "Capabilities",
        stats: [
          { label: "Reach", value: "12 EU countries" },
          { label: "Response", value: "< 24h" },
          { label: "Focus", value: "Polymer families" },
          { label: "Recycled", value: "Traceable streams" },
        ],
        title: "An operating model designed for industrial continuity",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "We work with dependable supply lanes, documented quality expectations, and fast commercial response to reduce friction in industrial procurement.",
        eyebrow: "Logistics",
        title: "Logistics with fewer surprises",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "Commercial flexibility matters when supply continuity is at risk. We structure payment and sourcing conversations around operational reality, not generic promises.",
        eyebrow: "Financing",
        title: "Commercial structures that support procurement",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Recycled streams are treated as a serious product line with traceability and realistic integration into customer supply plans.",
        eyebrow: "Sustainability",
        title: "Sustainability with commercial rigor",
        type: "section",
      },
      {
        anchorId: "team",
        body: "The company position is clear: fast quoting, realistic lead times, and operational follow-through after the order is placed.",
        eyebrow: "Why Atalant",
        title: "Commercial clarity, not ornamental messaging",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Base polymers and recycled materials, structured as clear commercial families that can later expand into subtypes or grades.",
        ctaLabel: "See all product families",
        eyebrow: "Catalog",
        title: "Families prepared to scale",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.en.contactBody,
        eyebrow: "Contact",
        note: byLocale.en.note,
        submitLabel: "Send request",
        title: "Start the conversation with a concrete brief",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribution, recycled polymers, and operational support for industrial buyers who need supply continuity rather than generic trading.",
      eyebrow: "Polymer distribution in Europe",
      headline: "Built to keep production moving.",
      primaryLabel: "Explore product families",
      secondaryLabel: "Talk to Atalant",
    },
    locale: "en",
    seo: {
      description: byLocale.en.seoDescription,
      title: "Atalant | Polymer distribution in Europe",
    },
  },
  es: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "Cobertura europea, capacidad de respuesta comercial y reciclados integrados en una propuesta industrial pragmática.",
        eyebrow: "Capacidades operativas",
        stats: [
          { label: "Cobertura", value: "12 países UE" },
          { label: "Respuesta", value: "< 24h" },
          { label: "Foco", value: "Familias de polímeros" },
          { label: "Reciclados", value: "Corrientes trazables" },
        ],
        title: "Un modelo operativo pensado para continuidad industrial",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Trabajamos con rutas de suministro fiables, expectativas de calidad documentadas y respuesta comercial ágil para reducir fricción en compras industriales.",
        eyebrow: "Logística",
        title: "Logística con menos sorpresas",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "La flexibilidad comercial importa cuando la continuidad de suministro está en riesgo. Estructuramos pagos y aprovisionamiento desde la realidad operativa.",
        eyebrow: "Financiación",
        title: "Estructuras comerciales que apoyan compras",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Las corrientes recicladas se tratan como una línea seria de producto con trazabilidad e integración realista en el plan de suministro del cliente.",
        eyebrow: "Sostenibilidad",
        title: "Sostenibilidad con rigor comercial",
        type: "section",
      },
      {
        anchorId: "team",
        body: "La posición de la compañía es clara: cotización rápida, plazos realistas y seguimiento operativo después del pedido.",
        eyebrow: "Por qué Atalant",
        title: "Claridad comercial, no mensaje ornamental",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Polímeros básicos y reciclados estructurados como familias comerciales claras, preparadas para crecer después hacia subtipos o grades.",
        ctaLabel: "Ver todas las familias",
        eyebrow: "Catálogo",
        title: "Familias preparadas para escalar",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.es.contactBody,
        eyebrow: "Contacto",
        note: byLocale.es.note,
        submitLabel: "Enviar solicitud",
        title: "Inicia la conversación con un briefing claro",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribución, reciclados y soporte operativo para compradores industriales que necesitan continuidad de suministro, no intermediación genérica.",
      eyebrow: "Distribución de polímeros en Europa",
      headline: "Hecho para mantener tu producción en marcha.",
      primaryLabel: "Explorar productos",
      secondaryLabel: "Hablemos",
    },
    locale: "es",
    seo: {
      description: byLocale.es.seoDescription,
      title: "Atalant | Distribución de polímeros en Europa",
    },
  },
  fr: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "Portée européenne, réactivité commerciale et recyclés intégrés dans une offre industrielle pragmatique.",
        eyebrow: "Capacités",
        stats: [
          { label: "Couverture", value: "12 pays UE" },
          { label: "Réponse", value: "< 24h" },
          { label: "Focus", value: "Familles de polymères" },
          { label: "Recyclés", value: "Flux traçables" },
        ],
        title: "Un modèle opératoire pensé pour la continuité industrielle",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Nous travaillons avec des flux fiables, des attentes qualité documentées et une réponse commerciale rapide pour réduire la friction d'achat.",
        eyebrow: "Logistique",
        title: "Une logistique avec moins d'imprévus",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "La flexibilité commerciale compte lorsque la continuité d'approvisionnement est en jeu. Nous structurons paiement et sourcing selon la réalité opérationnelle.",
        eyebrow: "Financement",
        title: "Des structures commerciales utiles aux achats",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Les flux recyclés sont traités comme une ligne produit sérieuse avec traçabilité et intégration réaliste au plan d'approvisionnement client.",
        eyebrow: "Durabilité",
        title: "Durabilité avec discipline commerciale",
        type: "section",
      },
      {
        anchorId: "team",
        body: "Le positionnement de l'entreprise est net : devis rapides, délais réalistes et suivi opérationnel après commande.",
        eyebrow: "Pourquoi Atalant",
        title: "Clarté commerciale, pas discours décoratif",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Polymères de base et matières recyclées structurés en familles commerciales lisibles, prêtes à évoluer ensuite vers des grades.",
        ctaLabel: "Voir toutes les familles",
        eyebrow: "Catalogue",
        title: "Des familles prêtes à évoluer",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.fr.contactBody,
        eyebrow: "Contact",
        note: byLocale.fr.note,
        submitLabel: "Envoyer la demande",
        title: "Démarrer avec un brief concret",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribution, polymères recyclés et support opérationnel pour des acheteurs industriels qui ont besoin de continuité d'approvisionnement.",
      eyebrow: "Distribution de polymères en Europe",
      headline: "Conçu pour maintenir la production en mouvement.",
      primaryLabel: "Explorer les familles de produits",
      secondaryLabel: "Contacter Atalant",
    },
    locale: "fr",
    seo: {
      description: byLocale.fr.seoDescription,
      title: "Atalant | Distribution de polymères en Europe",
    },
  },
  pt: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "Alcance europeu, resposta comercial rápida e reciclados integrados numa oferta industrial pragmática.",
        eyebrow: "Capacidades",
        stats: [
          { label: "Cobertura", value: "12 países UE" },
          { label: "Resposta", value: "< 24h" },
          { label: "Foco", value: "Famílias de polímeros" },
          { label: "Reciclados", value: "Fluxos rastreáveis" },
        ],
        title: "Um modelo operacional pensado para continuidade industrial",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Trabalhamos com rotas de fornecimento fiáveis, expectativas de qualidade documentadas e resposta comercial rápida para reduzir atrito na compra industrial.",
        eyebrow: "Logística",
        title: "Logística com menos surpresas",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "A flexibilidade comercial importa quando a continuidade de fornecimento está em risco. Estruturamos pagamento e sourcing a partir da realidade operacional.",
        eyebrow: "Financiamento",
        title: "Estruturas comerciais úteis para compras",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Os fluxos reciclados são tratados como uma linha séria de produto com rastreabilidade e integração realista no plano de fornecimento do cliente.",
        eyebrow: "Sustentabilidade",
        title: "Sustentabilidade com rigor comercial",
        type: "section",
      },
      {
        anchorId: "team",
        body: "A posição da empresa é clara: orçamentação rápida, prazos realistas e acompanhamento operacional após a encomenda.",
        eyebrow: "Porquê Atalant",
        title: "Clareza comercial, não mensagem ornamental",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Polímeros básicos e reciclados organizados em famílias comerciais claras, prontas para crescer depois para subtipos ou grades.",
        ctaLabel: "Ver todas as famílias",
        eyebrow: "Catálogo",
        title: "Famílias preparadas para escalar",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.pt.contactBody,
        eyebrow: "Contacto",
        note: byLocale.pt.note,
        submitLabel: "Enviar pedido",
        title: "Começar com um briefing claro",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribuição, reciclados e suporte operacional para compradores industriais que precisam de continuidade de fornecimento.",
      eyebrow: "Distribuição de polímeros na Europa",
      headline: "Feito para manter a sua produção em movimento.",
      primaryLabel: "Explorar famílias de produto",
      secondaryLabel: "Falar com a Atalant",
    },
    locale: "pt",
    seo: {
      description: byLocale.pt.seoDescription,
      title: "Atalant | Distribuição de polímeros na Europa",
    },
  },
};

const baseFamilies = {
  pe: {
    applications: ["Film y flexible packaging", "Extrusión general", "Bienes de consumo"],
    excerpt:
      "Soluciones de polietileno flexible y rígido para uso industrial amplio.",
    seoTitle: "PE | Atalant",
    title: {
      en: "Polyethylene",
      es: "Polietileno",
      fr: "Polyéthylène",
      pt: "Polietileno",
    },
    variants: ["HDPE", "MDPE", "LDPE", "LLDPE"],
  },
  pp: {
    applications: ["Inyección", "Rafia", "Compounds"],
    excerpt:
      "Familia de polipropileno para transformación, moldeo y fabricación industrial.",
    seoTitle: "PP | Atalant",
    title: {
      en: "Polypropylene",
      es: "Polipropileno",
      fr: "Polypropylène",
      pt: "Polipropileno",
    },
    variants: ["Homo", "Copo", "Random"],
  },
  pvc: {
    applications: ["Perfiles", "Cable", "Aplicaciones técnicas"],
    excerpt: "Familias de PVC rígido y flexible con marco operativo claro.",
    seoTitle: "PVC | Atalant",
    title: { en: "PVC", es: "PVC", fr: "PVC", pt: "PVC" },
    variants: ["Rígido", "Flexible"],
  },
  eva: {
    applications: [
      "Plantillas y láminas",
      "Films",
      "Calzado",
      "Adhesivos",
      "Automoción",
      "Construcción",
    ],
    excerpt:
      "Etileno acetato de vinilo con diferentes MFI y contenido de acetato de vinilo.",
    seoTitle: "EVA | Atalant",
    title: {
      en: "Ethylene vinyl acetate",
      es: "Etileno acetato de vinilo",
      fr: "Éthylène-acétate de vinyle",
      pt: "Etileno acetato de vinila",
    },
    variants: ["Diferentes MFI", "Contenido de acetato de vinilo"],
  },
  ps: {
    applications: ["Packaging", "Menaje", "Transformación general"],
    excerpt: "Poliestireno general e impacto para uso industrial práctico.",
    seoTitle: "PS | Atalant",
    title: {
      en: "Polystyrene",
      es: "Poliestireno",
      fr: "Polystyrène",
      pt: "Poliestireno",
    },
    variants: ["GPPS", "HIPS"],
  },
  pet: {
    applications: ["Botella", "Lámina", "Fibra"],
    excerpt: "PET para cadenas de suministro orientadas a botella, lámina y fibra.",
    seoTitle: "PET | Atalant",
    title: { en: "PET", es: "PET", fr: "PET", pt: "PET" },
    variants: ["Botella", "Lámina", "Fibra"],
  },
  recycled: {
    applications: ["Compra circular", "Blends", "Integración pragmática de reciclado"],
    excerpt:
      "Corrientes recicladas trazables integradas en estrategias de compra realistas.",
    seoTitle: "Recycled | Atalant",
    title: {
      en: "Recycled polymers",
      es: "Reciclados",
      fr: "Polymères recyclés",
      pt: "Polímeros reciclados",
    },
    variants: ["rPE", "rPP", "rPET", "rPS"],
  },
} as const;

export const fallbackFamilies: Record<AppLocale, ProductFamilyData[]> = (
  Object.keys(byLocale) as AppLocale[]
).reduce(
  (acc, locale) => {
    acc[locale] = Object.entries(baseFamilies).map(([slug, family], index) => ({
      applications: [...family.applications],
      body:
        slug === "recycled"
          ? "Las familias recicladas se tratan como una línea seria de suministro, con trazabilidad y realismo comercial."
          : "Familias estructuradas para compradores industriales que necesitan continuidad, repetibilidad y respuesta comercial ágil. La página queda preparada para crecer después hacia grades concretos.",
      code: slug,
      excerpt: family.excerpt,
      featured: index < 2 || slug === "recycled",
      locale,
      recycled: slug === "recycled",
      seo: {
        description: `${family.title[locale]} | ${byLocale[locale].seoDescription}`,
        title: family.seoTitle,
      },
      slug,
      title: family.title[locale],
      variants: [...family.variants],
    }));

    return acc;
  },
  {} as Record<AppLocale, ProductFamilyData[]>,
);
