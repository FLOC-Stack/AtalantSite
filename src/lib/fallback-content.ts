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
    address: "Barcelona, Espana",
    contactBody:
      "Cuentanos que familia de polimero necesitas, tu mercado objetivo y tu volumen mensual estimado. Responderemos con una ruta comercial concreta.",
    footerText:
      "Atalant coordina abastecimiento de polimeros, logistica y ejecucion comercial para compradores industriales en Europa.",
    note: "Respondemos en el idioma elegido en esta pagina siempre que sea posible.",
    seoDescription:
      "Atalant distribuye familias de polimeros y materiales reciclados para compradores industriales en Europa.",
    tagline: "Abastecimiento industrial de polimeros con disciplina operativa",
  },
  fr: {
    address: "Barcelone, Espagne",
    contactBody:
      "Indiquez la famille de polymeres recherchee, votre marche cible et votre volume mensuel estime. Nous repondrons avec une route commerciale concrete.",
    footerText:
      "Atalant coordonne l'approvisionnement en polymeres, la logistique et l'execution commerciale pour des acheteurs industriels en Europe.",
    note: "Nous repondons dans la langue choisie sur cette page lorsque c'est possible.",
    seoDescription:
      "Atalant distribue des familles de polymeres et des materiaux recycles pour des acheteurs industriels en Europe.",
    tagline: "Approvisionnement industriel en polymeres avec discipline operationnelle",
  },
  pt: {
    address: "Barcelona, Espanha",
    contactBody:
      "Diga-nos qual familia de polimeros procura, o mercado de destino e o volume mensal estimado. Respondemos com uma rota comercial concreta.",
    footerText:
      "A Atalant coordena abastecimento de polimeros, logistica e execucao comercial para compradores industriais na Europa.",
    note: "Respondemos no idioma selecionado nesta pagina sempre que possivel.",
    seoDescription:
      "A Atalant distribui familias de polimeros e materiais reciclados para compradores industriais na Europa.",
    tagline: "Abastecimento industrial de polimeros com disciplina operacional",
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
      title: "Atalant | Distribucion de polimeros en Europa",
    },
    footerLinks: [
      { kind: "logistics", label: "Logistica" },
      { kind: "section", label: "Sostenibilidad", sectionId: "sustainability" },
      { kind: "products", label: "Productos" },
      { href: "mailto:hola@atalant.eu", kind: "external", label: "hola@atalant.eu" },
    ],
    footerText: byLocale.es.footerText,
    locale: "es",
    navigation: [
      { kind: "products", label: "Productos" },
      { kind: "logistics", label: "Logistica" },
      { kind: "section", label: "Financiacion", sectionId: "financing" },
      { kind: "section", label: "Sostenibilidad", sectionId: "sustainability" },
      { kind: "section", label: "Equipo", sectionId: "team" },
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
      title: "Atalant | Distribution de polymeres en Europe",
    },
    footerLinks: [
      { kind: "logistics", label: "Logistique" },
      { kind: "section", label: "Durabilite", sectionId: "sustainability" },
      { kind: "products", label: "Produits" },
      { href: "mailto:bonjour@atalant.eu", kind: "external", label: "bonjour@atalant.eu" },
    ],
    footerText: byLocale.fr.footerText,
    locale: "fr",
    navigation: [
      { kind: "products", label: "Produits" },
      { kind: "logistics", label: "Logistique" },
      { kind: "section", label: "Financement", sectionId: "financing" },
      { kind: "section", label: "Durabilite", sectionId: "sustainability" },
      { kind: "section", label: "Equipe", sectionId: "team" },
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
      title: "Atalant | Distribuicao de polimeros na Europa",
    },
    footerLinks: [
      { kind: "logistics", label: "Logistica" },
      { kind: "section", label: "Sustentabilidade", sectionId: "sustainability" },
      { kind: "products", label: "Produtos" },
      { href: "mailto:ola@atalant.eu", kind: "external", label: "ola@atalant.eu" },
    ],
    footerText: byLocale.pt.footerText,
    locale: "pt",
    navigation: [
      { kind: "products", label: "Produtos" },
      { kind: "logistics", label: "Logistica" },
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
        body: "Cobertura europea, capacidad de respuesta comercial y reciclados integrados en una propuesta industrial pragmatica.",
        eyebrow: "Capacidades operativas",
        stats: [
          { label: "Cobertura", value: "12 paises UE" },
          { label: "Respuesta", value: "< 24h" },
          { label: "Foco", value: "Familias de polimeros" },
          { label: "Reciclados", value: "Corrientes trazables" },
        ],
        title: "Un modelo operativo pensado para continuidad industrial",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Trabajamos con rutas de suministro fiables, expectativas de calidad documentadas y respuesta comercial agil para reducir friccion en compras industriales.",
        eyebrow: "Logistica",
        title: "Logistica con menos sorpresas",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "La flexibilidad comercial importa cuando la continuidad de suministro esta en riesgo. Estructuramos pagos y aprovisionamiento desde la realidad operativa.",
        eyebrow: "Financiacion",
        title: "Estructuras comerciales que apoyan compras",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Las corrientes recicladas se tratan como una linea seria de producto con trazabilidad e integracion realista en el plan de suministro del cliente.",
        eyebrow: "Sostenibilidad",
        title: "Sostenibilidad con rigor comercial",
        type: "section",
      },
      {
        anchorId: "team",
        body: "La posicion de la compania es clara: cotizacion rapida, plazos realistas y seguimiento operativo despues del pedido.",
        eyebrow: "Por que Atalant",
        title: "Claridad comercial, no mensaje ornamental",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Polimeros basicos y reciclados estructurados como familias comerciales claras, preparadas para crecer despues hacia subtipos o grades.",
        ctaLabel: "Ver todas las familias",
        eyebrow: "Catalogo",
        title: "Familias preparadas para escalar",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.es.contactBody,
        eyebrow: "Contacto",
        note: byLocale.es.note,
        submitLabel: "Enviar solicitud",
        title: "Inicia la conversacion con un briefing claro",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribucion, reciclados y soporte operativo para compradores industriales que necesitan continuidad de suministro, no intermediacion generica.",
      eyebrow: "Distribucion de polimeros en Europa",
      headline: "Hecho para mantener tu produccion en marcha.",
      primaryLabel: "Explorar familias de producto",
      secondaryLabel: "Hablar con Atalant",
    },
    locale: "es",
    seo: {
      description: byLocale.es.seoDescription,
      title: "Atalant | Distribucion de polimeros en Europa",
    },
  },
  fr: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "Portee europeenne, reactivite commerciale et recycles integres dans une offre industrielle pragmatique.",
        eyebrow: "Capacites",
        stats: [
          { label: "Couverture", value: "12 pays UE" },
          { label: "Reponse", value: "< 24h" },
          { label: "Focus", value: "Familles de polymeres" },
          { label: "Recycles", value: "Flux tracables" },
        ],
        title: "Un modele operatoire pense pour la continuite industrielle",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Nous travaillons avec des flux fiables, des attentes qualite documentees et une reponse commerciale rapide pour reduire la friction d'achat.",
        eyebrow: "Logistique",
        title: "Une logistique avec moins d'imprevus",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "La flexibilite commerciale compte lorsque la continuite d'approvisionnement est en jeu. Nous structurons paiement et sourcing selon la realite operationnelle.",
        eyebrow: "Financement",
        title: "Des structures commerciales utiles aux achats",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Les flux recycles sont traites comme une ligne produit serieuse avec tracabilite et integration realiste au plan d'approvisionnement client.",
        eyebrow: "Durabilite",
        title: "Durabilite avec discipline commerciale",
        type: "section",
      },
      {
        anchorId: "team",
        body: "Le positionnement de l'entreprise est net : devis rapides, delais realistes et suivi operationnel apres commande.",
        eyebrow: "Pourquoi Atalant",
        title: "Clarte commerciale, pas discours decoratif",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Polymeres de base et matieres recyclees structures en familles commerciales lisibles, pretes a evoluer ensuite vers des grades.",
        ctaLabel: "Voir toutes les familles",
        eyebrow: "Catalogue",
        title: "Des familles pretes a evoluer",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.fr.contactBody,
        eyebrow: "Contact",
        note: byLocale.fr.note,
        submitLabel: "Envoyer la demande",
        title: "Demarrer avec un brief concret",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribution, polymeres recycles et support operationnel pour des acheteurs industriels qui ont besoin de continuite d'approvisionnement.",
      eyebrow: "Distribution de polymeres en Europe",
      headline: "Concu pour maintenir la production en mouvement.",
      primaryLabel: "Explorer les familles de produits",
      secondaryLabel: "Contacter Atalant",
    },
    locale: "fr",
    seo: {
      description: byLocale.fr.seoDescription,
      title: "Atalant | Distribution de polymeres en Europe",
    },
  },
  pt: {
    blocks: [
      {
        anchorId: "capabilities",
        body: "Alcance europeu, resposta comercial rapida e reciclados integrados numa oferta industrial pragmatica.",
        eyebrow: "Capacidades",
        stats: [
          { label: "Cobertura", value: "12 paises UE" },
          { label: "Resposta", value: "< 24h" },
          { label: "Foco", value: "Familias de polimeros" },
          { label: "Reciclados", value: "Fluxos rastreaveis" },
        ],
        title: "Um modelo operacional pensado para continuidade industrial",
        type: "stats",
      },
      {
        anchorId: "logistics",
        body: "Trabalhamos com rotas de fornecimento fiaveis, expectativas de qualidade documentadas e resposta comercial rapida para reduzir atrito na compra industrial.",
        eyebrow: "Logistica",
        title: "Logistica com menos surpresas",
        type: "section",
      },
      {
        anchorId: "financing",
        body: "A flexibilidade comercial importa quando a continuidade de fornecimento esta em risco. Estruturamos pagamento e sourcing a partir da realidade operacional.",
        eyebrow: "Financiamento",
        title: "Estruturas comerciais uteis para compras",
        type: "section",
      },
      {
        anchorId: "sustainability",
        body: "Os fluxos reciclados sao tratados como uma linha seria de produto com rastreabilidade e integracao realista no plano de fornecimento do cliente.",
        eyebrow: "Sustentabilidade",
        title: "Sustentabilidade com rigor comercial",
        type: "section",
      },
      {
        anchorId: "team",
        body: "A posicao da empresa e clara: orcamentacao rapida, prazos realistas e acompanhamento operacional apos a encomenda.",
        eyebrow: "Porque Atalant",
        title: "Clareza comercial, nao mensagem ornamental",
        type: "section",
      },
      {
        anchorId: "products-preview",
        body: "Polimeros basicos e reciclados organizados em familias comerciais claras, prontas para crescer depois para subtipos ou grades.",
        ctaLabel: "Ver todas as familias",
        eyebrow: "Catalogo",
        title: "Familias preparadas para escalar",
        type: "productPreview",
      },
      {
        anchorId: "contact",
        body: byLocale.pt.contactBody,
        eyebrow: "Contacto",
        note: byLocale.pt.note,
        submitLabel: "Enviar pedido",
        title: "Comecar com um briefing claro",
        type: "contact",
      },
    ],
    hero: {
      body: "Distribuicao, reciclados e suporte operacional para compradores industriais que precisam de continuidade de fornecimento.",
      eyebrow: "Distribuicao de polimeros na Europa",
      headline: "Feito para manter a sua producao em movimento.",
      primaryLabel: "Explorar familias de produto",
      secondaryLabel: "Falar com a Atalant",
    },
    locale: "pt",
    seo: {
      description: byLocale.pt.seoDescription,
      title: "Atalant | Distribuicao de polimeros na Europa",
    },
  },
};

const baseFamilies = {
  pe: {
    applications: ["Film y flexible packaging", "Extrusion general", "Bienes de consumo"],
    excerpt:
      "Soluciones de polietileno flexible y rigido para uso industrial amplio.",
    seoTitle: "PE | Atalant",
    title: {
      en: "Polyethylene",
      es: "Polietileno",
      fr: "Polyethylene",
      pt: "Polietileno",
    },
    variants: ["HDPE", "MDPE", "LDPE", "LLDPE"],
  },
  pp: {
    applications: ["Inyeccion", "Rafia", "Compounds"],
    excerpt:
      "Familia de polipropileno para transformacion, moldeo y fabricacion industrial.",
    seoTitle: "PP | Atalant",
    title: {
      en: "Polypropylene",
      es: "Polipropileno",
      fr: "Polypropylene",
      pt: "Polipropileno",
    },
    variants: ["Homo", "Copo", "Random"],
  },
  pvc: {
    applications: ["Perfiles", "Cable", "Aplicaciones tecnicas"],
    excerpt: "Familias de PVC rigido y flexible con marco operativo claro.",
    seoTitle: "PVC | Atalant",
    title: { en: "PVC", es: "PVC", fr: "PVC", pt: "PVC" },
    variants: ["Rigido", "Flexible"],
  },
  ps: {
    applications: ["Packaging", "Menaje", "Transformacion general"],
    excerpt: "Poliestireno general e impacto para uso industrial practico.",
    seoTitle: "PS | Atalant",
    title: {
      en: "Polystyrene",
      es: "Poliestireno",
      fr: "Polystyrene",
      pt: "Poliestireno",
    },
    variants: ["GPPS", "HIPS"],
  },
  pet: {
    applications: ["Botella", "Lamina", "Fibra"],
    excerpt: "PET para cadenas de suministro orientadas a botella, lamina y fibra.",
    seoTitle: "PET | Atalant",
    title: { en: "PET", es: "PET", fr: "PET", pt: "PET" },
    variants: ["Botella", "Lamina", "Fibra"],
  },
  recycled: {
    applications: ["Compra circular", "Blends", "Integracion pragmatica de reciclado"],
    excerpt:
      "Corrientes recicladas trazables integradas en estrategias de compra realistas.",
    seoTitle: "Recycled | Atalant",
    title: {
      en: "Recycled polymers",
      es: "Reciclados",
      fr: "Polymeres recycles",
      pt: "Polimeros reciclados",
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
          ? "Las familias recicladas se tratan como una linea seria de suministro, con trazabilidad y realismo comercial."
          : "Familias estructuradas para compradores industriales que necesitan continuidad, repetibilidad y respuesta comercial agil. La pagina queda preparada para crecer despues hacia grades concretos.",
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
