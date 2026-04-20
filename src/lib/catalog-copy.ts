import type { AppLocale } from "@/lib/locales";

type CatalogIndexCopy = {
  eyebrow: string;
  title: string;
  body: string;
  seoDescription: string;
  seoTitle: string;
};

type CatalogFamilyCopy = {
  applications: string;
  backToCatalog: string;
  overview: string;
  seoFallbackDescription: string;
  seoFallbackTitle: string;
  talkToAtalant: string;
  variants: string;
};

type CatalogCopy = {
  family: CatalogFamilyCopy;
  index: CatalogIndexCopy;
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
  },
};
