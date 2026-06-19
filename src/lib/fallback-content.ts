import type {
  HomePageData,
  ProductFamilyData,
  SiteSettingsData,
} from "@/lib/content-types";
import { buildContactoPath } from "@/lib/routes";
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
    contactEmail: "info@atalant.com",
    defaultSeo: {
      description: byLocale.en.seoDescription,
      title: "Atalant | Polymer distribution in Europe",
    },
    footerLinks: [
      { kind: "products", label: "Products" },
      { kind: "logistics", label: "Logistics" },
      { kind: "section", label: "Financing", sectionId: "financing" },
      { kind: "section", label: "Sustainability", sectionId: "sustainability" },
      { kind: "section", label: "About", sectionId: "team" },
    ],
    footerText: byLocale.en.footerText,
    headerCtaHref: buildContactoPath("en"),
    headerCtaLabel: "Contact",
    locale: "en",
    navigation: [
      { kind: "products", label: "Products" },
      { kind: "logistics", label: "Logistics" },
      { kind: "section", label: "Financing", sectionId: "financing" },
      { kind: "section", label: "Sustainability", sectionId: "sustainability" },
      { kind: "section", label: "Team", sectionId: "team" },
      { kind: "section", label: "Contact", sectionId: "contact" },
    ],
    phone: "+34 965 66 18 28",
    socialLinks: [
      { href: "https://www.linkedin.com/company/atalant-europe/", label: "LinkedIn" },
    ],
    tagline: byLocale.en.tagline,
  },
  es: {
    address: byLocale.es.address,
    brandName: "Atalant",
    contactEmail: "info@atalant.com",
    defaultSeo: {
      description: byLocale.es.seoDescription,
      title: "Atalant | Distribución de polímeros en Europa",
    },
    footerLinks: [
      { kind: "products", label: "Productos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Financiación", sectionId: "financing" },
      { kind: "section", label: "Sostenibilidad", sectionId: "sustainability" },
      { kind: "section", label: "Nosotros", sectionId: "team" },
    ],
    footerText: byLocale.es.footerText,
    headerCtaHref: buildContactoPath("es"),
    headerCtaLabel: "Contacto",
    locale: "es",
    navigation: [
      { kind: "products", label: "Productos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Financiación", sectionId: "financing" },
      { kind: "section", label: "Sostenibilidad", sectionId: "sustainability" },
      { kind: "section", label: "Nosotros", sectionId: "team" },
      { kind: "section", label: "Contacto", sectionId: "contact" },
    ],
    phone: "+34 965 66 18 28",
    socialLinks: [
      { href: "https://www.linkedin.com/company/atalant-europe/", label: "LinkedIn" },
    ],
    tagline: byLocale.es.tagline,
  },
  fr: {
    address: byLocale.fr.address,
    brandName: "Atalant",
    contactEmail: "info@atalant.com",
    defaultSeo: {
      description: byLocale.fr.seoDescription,
      title: "Atalant | Distribution de polymères en Europe",
    },
    footerLinks: [
      { kind: "products", label: "Produits" },
      { kind: "logistics", label: "Logistique" },
      { kind: "section", label: "Financement", sectionId: "financing" },
      { kind: "section", label: "Durabilité", sectionId: "sustainability" },
      { kind: "section", label: "À propos", sectionId: "team" },
    ],
    footerText: byLocale.fr.footerText,
    headerCtaHref: buildContactoPath("fr"),
    headerCtaLabel: "Contact",
    locale: "fr",
    navigation: [
      { kind: "products", label: "Produits" },
      { kind: "logistics", label: "Logistique" },
      { kind: "section", label: "Financement", sectionId: "financing" },
      { kind: "section", label: "Durabilité", sectionId: "sustainability" },
      { kind: "section", label: "Équipe", sectionId: "team" },
      { kind: "section", label: "Contact", sectionId: "contact" },
    ],
    phone: "+34 965 66 18 28",
    socialLinks: [
      { href: "https://www.linkedin.com/company/atalant-europe/", label: "LinkedIn" },
    ],
    tagline: byLocale.fr.tagline,
  },
  pt: {
    address: byLocale.pt.address,
    brandName: "Atalant",
    contactEmail: "info@atalant.com",
    defaultSeo: {
      description: byLocale.pt.seoDescription,
      title: "Atalant | Distribuição de polímeros na Europa",
    },
    footerLinks: [
      { kind: "products", label: "Produtos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Financiamento", sectionId: "financing" },
      { kind: "section", label: "Sustentabilidade", sectionId: "sustainability" },
      { kind: "section", label: "Sobre nós", sectionId: "team" },
    ],
    footerText: byLocale.pt.footerText,
    headerCtaHref: buildContactoPath("pt"),
    headerCtaLabel: "Contato",
    locale: "pt",
    navigation: [
      { kind: "products", label: "Produtos" },
      { kind: "logistics", label: "Logística" },
      { kind: "section", label: "Financiamento", sectionId: "financing" },
      { kind: "section", label: "Sustentabilidade", sectionId: "sustainability" },
      { kind: "section", label: "Equipa", sectionId: "team" },
      { kind: "section", label: "Contacto", sectionId: "contact" },
    ],
    phone: "+34 965 66 18 28",
    socialLinks: [
      { href: "https://www.linkedin.com/company/atalant-europe/", label: "LinkedIn" },
    ],
    tagline: byLocale.pt.tagline,
  },
};

export const fallbackHomePages: Record<AppLocale, HomePageData> = {
  en: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "European coverage, fast commercial response, a broad portfolio, and packaging options adapted to each customer.",
        eyebrow: "Capabilities",
        stats: [
          { label: "Coverage", value: "18 EU countries" },
          { label: "Response", value: "< 24 h" },
          { label: "Portfolio", value: "+300 products" },
          { label: "Packaging", value: "Customer-adaptable" },
        ],
        title: "An operating model designed for industrial continuity",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "We work with dependable supply lanes, documented quality expectations, and fast commercial response to reduce uncertainty in your purchasing.",
        eyebrow: "Logistics",
        title: "Logistics with fewer surprises",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "We bring flexibility, advice, and less uncertainty to your supply chain. We support you throughout the entire procurement process.",
        eyebrow: "Financing",
        title: "We keep your supply flow constant",
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
        body: "Discover our product families, including PE, PP, PVC, PS, EVA, and PA.",
        ctaLabel: "See all product families",
        eyebrow: "Catalog",
        title: "High-quality polymers",
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
      body: "Distribution of plastic raw materials and recycled polymers.",
      eyebrow: "Polymer distribution",
      headline: "An evolution in the supply chain.",
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
        body: "Cobertura europea, respuesta comercial rápida, portfolio amplio y opciones de packaging adaptadas a cada cliente.",
        eyebrow: "Capacidades operativas",
        stats: [
          { label: "Cobertura", value: "18 países UE" },
          { label: "Respuesta", value: "< 24 h" },
          { label: "Portfolio", value: "+300 productos" },
          { label: "Packaging", value: "Adaptable al cliente" },
        ],
        title: "Un modelo operativo pensado para continuidad industrial",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Recibe tus pedidos en nuestra propia flota de transporte con una trazabilidad completa desde el primer momento.",
        eyebrow: "Logística",
        title: "Logística integrada para el mejor servicio",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "Aportamos flexibilidad, asesoramiento y reducimos tu incertidumbre en la cadena de suministro. Te acompañamos en todo el proceso de aprovisionamiento.",
        eyebrow: "Financiación",
        title: "Mantenemos tu flujo de suministro constante",
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
        body: "Descubre nuestra familia de productos entre los que destacan: PE, PP, PVC, PS, EVA y PA.",
        ctaLabel: "Ver todas las familias",
        eyebrow: "Catálogo",
        title: "Polímeros de alta calidad",
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
      body: "Distribución de materia prima plástica y polímeros reciclados. Hechos para mantener tu producción en marcha.",
      eyebrow: "Distribución de polímeros",
      headline: "Una evolución en la cadena de suministro.",
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
        body: "Couverture européenne, réponse commerciale rapide, large portefeuille et options de packaging adaptées à chaque client.",
        eyebrow: "Capacités",
        stats: [
          { label: "Couverture", value: "18 pays UE" },
          { label: "Réponse", value: "< 24 h" },
          { label: "Portefeuille", value: "+300 produits" },
          { label: "Packaging", value: "Adapté au client" },
        ],
        title: "Un modèle opératoire pensé pour la continuité industrielle",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Nous travaillons avec des flux fiables, des attentes qualité documentées et une réponse commerciale rapide pour réduire l'incertitude dans vos achats.",
        eyebrow: "Logistique",
        title: "Une logistique avec moins d'imprévus",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "Nous apportons flexibilité, conseil et moins d'incertitude dans votre chaîne d'approvisionnement. Nous vous accompagnons tout au long du processus.",
        eyebrow: "Financement",
        title: "Nous maintenons votre flux d'approvisionnement constant",
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
        body: "Découvrez nos familles de produits, notamment PE, PP, PVC, PS, EVA et PA.",
        ctaLabel: "Voir toutes les familles",
        eyebrow: "Catalogue",
        title: "Polymères de haute qualité",
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
      body: "Distribution de matières premières plastiques et de polymères recyclés.",
      eyebrow: "Distribution de polymères",
      headline: "Une évolution dans la chaîne d'approvisionnement.",
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
        body: "Cobertura europeia, resposta comercial rápida, portfólio amplo e opções de packaging adaptadas a cada cliente.",
        eyebrow: "Capacidades",
        stats: [
          { label: "Cobertura", value: "18 países UE" },
          { label: "Resposta", value: "< 24 h" },
          { label: "Portfólio", value: "+300 produtos" },
          { label: "Packaging", value: "Adaptável ao cliente" },
        ],
        title: "Um modelo operacional pensado para continuidade industrial",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Trabalhamos com rotas de fornecimento fiáveis, expectativas de qualidade documentadas e resposta comercial rápida para reduzir incerteza nas suas compras.",
        eyebrow: "Logística",
        title: "Logística com menos surpresas",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "Aportamos flexibilidade, aconselhamento e reduzimos a incerteza na sua cadeia de fornecimento. Acompanhamos todo o processo de aprovisionamento.",
        eyebrow: "Financiamento",
        title: "Mantemos o seu fluxo de fornecimento constante",
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
        body: "Descubra as nossas famílias de produtos, incluindo PE, PP, PVC, PS, EVA e PA.",
        ctaLabel: "Ver todas as famílias",
        eyebrow: "Catálogo",
        title: "Polímeros de alta qualidade",
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
      body: "Distribuição de matéria-prima plástica e polímeros reciclados.",
      eyebrow: "Distribuição de polímeros",
      headline: "Uma evolução na cadeia de fornecimento.",
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
  pa: {
    applications: ["Automoción", "Colectores de admisión", "Piezas técnicas"],
    excerpt:
      "Poliamida para aplicaciones técnicas de alta exigencia mecánica y térmica.",
    seoTitle: "PA | Atalant",
    title: {
      en: "Polyamide",
      es: "Poliamida",
      fr: "Polyamide",
      pt: "Poliamida",
    },
    variants: ["PA6", "PA66", "Reforzada"],
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
      featured: index < 2 || slug === "pa",
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
