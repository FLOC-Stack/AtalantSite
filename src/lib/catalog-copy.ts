import type { AppLocale } from "@/lib/locales";

export type CatalogIndexCopy = {
  eyebrow: string;
  title: string;
  body: string;
  seoDescription: string;
  seoTitle: string;
};

export type CatalogFamilyCopy = {
  applications: string;
  backToCatalog: string;
  overview: string;
  seoFallbackDescription: string;
  seoFallbackTitle: string;
  talkToAtalant: string;
  variants: string;
};

export type CatalogMorphCopy = {
  body: string;
  characteristics: string;
  eyebrow: string;
  recycled: string;
  seoDescription: string;
  seoTitle: string;
  title: string;
};

export type CatalogCopy = {
  family: CatalogFamilyCopy;
  index: CatalogIndexCopy;
  morph: CatalogMorphCopy;
};

export const catalogCopy: Record<AppLocale, CatalogCopy> = {
  en: {
    family: {
      applications: "Applications",
      backToCatalog: "Back to catalog",
      overview: "Overview",
      seoFallbackDescription: "Published product family managed in Payload CMS.",
      seoFallbackTitle: "Product family | Atalant",
      talkToAtalant: "Talk to Atalant",
      variants: "Variants",
    },
    index: {
      body:
        "Published polymer families with room to expand later into subtypes or grades without redesigning the routing model.",
      eyebrow: "Catalog",
      seoDescription: "Published polymer families managed in Payload CMS.",
      seoTitle: "Product families | Atalant",
      title: "Published product families.",
    },
    morph: {
      body:
        "Explore all our product families and transformation processes. Permanent stock in Europe, batch traceability, and technical advice for every application.",
      characteristics: "View characteristics",
      eyebrow: "Product catalog",
      recycled: "Recycled",
      seoDescription:
        "High-quality polymers for production, with permanent European stock, batch traceability and technical advice for every application.",
      seoTitle: "Polymer catalog — Atalant",
      title: "High-quality polymers\nfor your production.",
    },
  },
  es: {
    family: {
      applications: "Aplicaciones",
      backToCatalog: "Volver al catálogo",
      overview: "Resumen",
      seoFallbackDescription: "Familia de producto publicada y gestionada en Payload CMS.",
      seoFallbackTitle: "Familia de producto | Atalant",
      talkToAtalant: "Hablar con Atalant",
      variants: "Variantes",
    },
    index: {
      body:
        "Familias de polímeros publicadas con margen para crecer después hacia subtipos o grados sin rediseñar el modelo de rutas.",
      eyebrow: "Catálogo",
      seoDescription: "Familias de polímeros publicadas y gestionadas en Payload CMS.",
      seoTitle: "Familias de producto | Atalant",
      title: "Familias de producto publicadas.",
    },
    morph: {
      body:
        "Descubre todas nuestras familias de productos y procesos de transformación. Stock permanente en Europa, trazabilidad por lote y asesoría técnica en cada aplicación.",
      characteristics: "Ver características",
      eyebrow: "Catálogo de producto",
      recycled: "Reciclado",
      seoDescription:
        "Polímeros de alta calidad para producción, con stock permanente en Europa, trazabilidad por lote y asesoría técnica en cada aplicación.",
      seoTitle: "Catálogo de polímeros — Atalant",
      title: "Polímeros de alta calidad\npara tu producción.",
    },
  },
  fr: {
    family: {
      applications: "Applications",
      backToCatalog: "Retour au catalogue",
      overview: "Aperçu",
      seoFallbackDescription: "Famille de produit publiée et gérée dans Payload CMS.",
      seoFallbackTitle: "Famille de produit | Atalant",
      talkToAtalant: "Contacter Atalant",
      variants: "Variantes",
    },
    index: {
      body:
        "Familles de polymères publiées avec la possibilité d'ajouter plus tard des sous-types ou des grades sans refaire le modèle de routes.",
      eyebrow: "Catalogue",
      seoDescription: "Familles de polymères publiées et gérées dans Payload CMS.",
      seoTitle: "Familles de produit | Atalant",
      title: "Familles de produit publiées.",
    },
    morph: {
      body:
        "Découvrez toutes nos familles de produits et procédés de transformation. Stocks permanents en Europe, traçabilité par lot et conseils techniques pour chaque application.",
      characteristics: "Voir caractéristiques",
      eyebrow: "Catalogue produit",
      recycled: "Recyclé",
      seoDescription:
        "Polymères de haute qualité pour la production, avec stock permanent en Europe, traçabilité par lot et conseil technique pour chaque application.",
      seoTitle: "Catalogue de polymères — Atalant",
      title: "Polymères de haute qualité\npour votre production.",
    },
  },
  pt: {
    family: {
      applications: "Aplicações",
      backToCatalog: "Voltar ao catálogo",
      overview: "Visão geral",
      seoFallbackDescription: "Família de produto publicada e gerida no Payload CMS.",
      seoFallbackTitle: "Família de produto | Atalant",
      talkToAtalant: "Falar com a Atalant",
      variants: "Variantes",
    },
    index: {
      body:
        "Famílias de polímeros publicadas com espaço para evoluir depois para subtipos ou graus sem redesenhar o modelo de rotas.",
      eyebrow: "Catálogo",
      seoDescription: "Famílias de polímeros publicadas e geridas no Payload CMS.",
      seoTitle: "Famílias de produto | Atalant",
      title: "Famílias de produto publicadas.",
    },
    morph: {
      body:
        "Descubra todas as nossas famílias de produtos e processos de transformação. Stock permanente na Europa, rastreabilidade por lote e assessoria técnica em cada aplicação.",
      characteristics: "Ver características",
      eyebrow: "Catálogo de produto",
      recycled: "Reciclado",
      seoDescription:
        "Polímeros de alta qualidade para produção, com stock permanente na Europa, rastreabilidade por lote e assessoria técnica em cada aplicação.",
      seoTitle: "Catálogo de polímeros — Atalant",
      title: "Polímeros de alta qualidade\npara a sua produção.",
    },
  },
};
