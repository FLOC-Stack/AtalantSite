import type { ProductFamilyDetailData } from "@/lib/content-types";
import type { AppLocale } from "@/lib/locales";

export type ProductDetailData = ProductFamilyDetailData & {
  code: string;
  related: Array<{ code: string; name: string; grades: string; slug: string }>;
  slug: string;
  title: string;
};

const related = [
  { code: "PE", name: "Polietileno", grades: "HDPE · MDPE · LDPE · LLDPE", slug: "pe" },
  { code: "PP", name: "Polipropileno", grades: "Homo · Copo · Random", slug: "pp" },
  { code: "PVC", name: "Policloruro vinilo", grades: "Rígido · Flexible", slug: "pvc" },
  { code: "EVA", name: "Etileno acetato de vinilo", grades: "MFI · Acetato de vinilo", slug: "eva" },
  { code: "PS", name: "Poliestireno", grades: "GPPS · HIPS", slug: "ps" },
  { code: "PET", name: "PET", grades: "Botella · Lámina · Fibra", slug: "pet" },
];

function relatedFor(slug: string) {
  return related.filter((entry) => entry.slug !== slug).slice(0, 4);
}

const relatedByLocale: Record<AppLocale, typeof related> = {
  es: related,
  en: [
    { code: "PE", name: "Polyethylene", grades: "HDPE · MDPE · LDPE · LLDPE", slug: "pe" },
    { code: "PP", name: "Polypropylene", grades: "Homo · Copo · Random", slug: "pp" },
    { code: "PVC", name: "Polyvinyl chloride", grades: "Rigid · Flexible", slug: "pvc" },
    { code: "EVA", name: "Ethylene vinyl acetate", grades: "MFI · Vinyl acetate", slug: "eva" },
    { code: "PS", name: "Polystyrene", grades: "GPPS · HIPS", slug: "ps" },
    { code: "PET", name: "PET", grades: "Bottle · Sheet · Fiber", slug: "pet" },
  ],
  fr: [
    { code: "PE", name: "Polyéthylène", grades: "HDPE · MDPE · LDPE · LLDPE", slug: "pe" },
    { code: "PP", name: "Polypropylène", grades: "Homo · Copo · Random", slug: "pp" },
    { code: "PVC", name: "Polychlorure de vinyle", grades: "Rigide · Flexible", slug: "pvc" },
    { code: "EVA", name: "Éthylène-acétate de vinyle", grades: "MFI · Acétate de vinyle", slug: "eva" },
    { code: "PS", name: "Polystyrène", grades: "GPPS · HIPS", slug: "ps" },
    { code: "PET", name: "PET", grades: "Bouteille · Feuille · Fibre", slug: "pet" },
  ],
  pt: [
    { code: "PE", name: "Polietileno", grades: "HDPE · MDPE · LDPE · LLDPE", slug: "pe" },
    { code: "PP", name: "Polipropileno", grades: "Homo · Copo · Random", slug: "pp" },
    { code: "PVC", name: "Cloreto de polivinilo", grades: "Rígido · Flexível", slug: "pvc" },
    { code: "EVA", name: "Etileno acetato de vinila", grades: "MFI · Acetato de vinila", slug: "eva" },
    { code: "PS", name: "Poliestireno", grades: "GPPS · HIPS", slug: "ps" },
    { code: "PET", name: "PET", grades: "Garrafa · Lâmina · Fibra", slug: "pet" },
  ],
};

function relatedForLocale(slug: string, locale: AppLocale) {
  return relatedByLocale[locale].filter((entry) => entry.slug !== slug).slice(0, 4);
}

const productDetailDataByLocale: Record<AppLocale, Record<string, ProductDetailData>> = {
  en: {},
  es: {
  pe: {
    applications: [
      "Contenedores rígidos",
      "Tuberías",
      "Envase cosmético",
      "Film flexible",
      "Sacos industriales",
      "Film agrícola",
    ],
    code: "PE",
    footerQuestion: "¿Necesitas una ficha técnica PE?",
    grades: [
      {
        code: "HDPE",
        denomination: "High-Density",
        spec: "0.941 — 0.965 g/cm³",
        application: "Contenedores rígidos · Tuberías · Envase cosmético",
        process: "Inyección, extrusión, soplado",
      },
      {
        code: "MDPE",
        denomination: "Medium-Density",
        spec: "0.926 — 0.940 g/cm³",
        application: "Tubería de gas · Sacos industriales · Film reforzado",
        process: "Extrusión, soplado",
      },
      {
        code: "LDPE",
        denomination: "Low-Density",
        spec: "0.910 — 0.925 g/cm³",
        application: "Film flexible · Envase agrícola · Tapones de flujo",
        process: "Film, extrusión, moldeo rotacional",
      },
      {
        code: "LLDPE",
        denomination: "Linear Low-Density",
        spec: "0.915 — 0.925 g/cm³",
        application: "Film stretch · Saco industrial · Film agrícola resistente",
        process: "Film principalmente",
      },
    ],
    heroLines: ["Polietileno.", "El polímero", "versátil."],
    highlight: {
      eyebrow: "VERSIÓN RECICLADA / GREENLANT",
      title: "rPE — Polietileno reciclado.",
      body: "Grados Injection Greenlant (IN-040 RD/GR/BL), Blow Molding Greenlant (BM-025 WH/NT) y Pipe Greenlant (PE-100-BK). Post-industrial y post-consumo, trazabilidad completa.",
      stats: [
        { value: "1997", label: "Origen Atalant" },
        { value: "3+3", label: "Líneas Greenlant activas" },
        { value: "100%", label: "Trazabilidad post-industrial" },
      ],
    },
    intro:
      "Cuatro grados base cubren el 90% de las transformaciones industriales del polietileno. Desde la película de baja densidad hasta los contenedores rígidos de alta densidad, todos los gradientes están cubiertos en nuestro catálogo con respuesta 24/48h desde Alicante o Valencia.",
    meta: [
      { label: "GRADOS", value: "HDPE · MDPE · LDPE · LLDPE" },
      { label: "TRANSFORMACIÓN", value: "Inyección · Extrusión · Soplado · Film" },
      { label: "DENSIDAD", value: "0.91 — 0.97 g/cm³" },
      { label: "RESPUESTA", value: "< 24 h desde depósito" },
    ],
    related: relatedFor("pe"),
    slug: "pe",
    tableTitle: "Cuatro densidades, una misma cadena.",
    title: "Polietileno",
  },
  pp: {
    applications: ["Inyección", "Rafia", "Compounds", "Automoción", "Envase rígido"],
    code: "PP",
    footerQuestion: "¿Necesitas una ficha técnica PP?",
    grades: [
      {
        code: "HOMO",
        denomination: "Homopolímero",
        spec: "Alta rigidez · buena resistencia térmica",
        application: "Menaje · Tapones · Piezas técnicas · Rafia",
        process: "Inyección, extrusión, rafia",
      },
      {
        code: "COPO",
        denomination: "Copolímero impacto",
        spec: "Mayor resistencia al impacto",
        application: "Automoción · Cajas · Contenedores · Electrodoméstico",
        process: "Inyección, compounding",
      },
      {
        code: "RAN",
        denomination: "Random copolymer",
        spec: "Transparencia y soldabilidad",
        application: "Envase transparente · Lámina · Aplicaciones médicas",
        process: "Inyección, extrusión, termoformado",
      },
    ],
    heroLines: ["Polipropileno.", "Rigidez,", "impacto y proceso."],
    intro:
      "Familia PP para transformación industrial, moldeo y fabricación repetible. Cubrimos grados homopolímero, copolímero y random para ajustar rigidez, impacto y acabado final.",
    meta: [
      { label: "GRADOS", value: "Homo · Copo · Random" },
      { label: "TRANSFORMACIÓN", value: "Inyección · Extrusión · Rafia" },
      { label: "APLICACIONES", value: "Automoción · Envase · Compounds" },
      { label: "RESPUESTA", value: "< 24 h desde consulta" },
    ],
    related: relatedFor("pp"),
    slug: "pp",
    tableTitle: "Tres familias para ajustar módulo, impacto y transparencia.",
    title: "Polipropileno",
  },
  pvc: {
    applications: ["Perfiles", "Cable", "Construcción", "Aplicaciones técnicas", "Compuestos"],
    code: "PVC",
    footerQuestion: "¿Necesitas una ficha técnica PVC?",
    grades: [
      {
        code: "RIG",
        denomination: "Rígido",
        spec: "Alto módulo · estabilidad dimensional",
        application: "Perfiles · Tubería · Placa · Construcción",
        process: "Extrusión, calandrado, compounding",
      },
      {
        code: "FLEX",
        denomination: "Flexible",
        spec: "Plasticización ajustada",
        application: "Cable · Manguera · Recubrimientos · Lámina flexible",
        process: "Extrusión, calandrado",
      },
      {
        code: "EMUL",
        denomination: "Emulsión",
        spec: "Dispersión y recubrimiento",
        application: "Pasta · Revestimientos · Aplicaciones técnicas",
        process: "Recubrimiento, plastisol",
      },
    ],
    heroLines: ["PVC.", "Rígido o", "flexible."],
    intro:
      "PVC estructurado para perfilería, cable, construcción y aplicaciones técnicas. La selección se trabaja según rigidez, plasticización, estabilidad y proceso.",
    meta: [
      { label: "GRADOS", value: "Rígido · Flexible · Emulsión" },
      { label: "TRANSFORMACIÓN", value: "Extrusión · Calandrado · Plastisol" },
      { label: "APLICACIONES", value: "Perfiles · Cable · Construcción" },
      { label: "RESPUESTA", value: "Consulta técnica por formulación" },
    ],
    related: relatedFor("pvc"),
    slug: "pvc",
    tableTitle: "Rango rígido y flexible para construcción y aplicaciones técnicas.",
    title: "Policloruro de vinilo",
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
    code: "EVA",
    footerQuestion: "¿Necesitas un grado EVA concreto?",
    grades: [
      {
        code: "MFI",
        denomination: "Diferentes MFI",
        spec: "Fluidez ajustada por aplicación",
        application: "Films · Láminas · Moldeo · Aplicaciones flexibles",
        process: "Extrusión, film, inyección",
      },
      {
        code: "VA",
        denomination: "Contenido de acetato de vinilo",
        spec: "Flexibilidad y adhesión",
        application: "Calzado · Adhesivos · Automoción · Construcción",
        process: "Compounding, laminación, adhesivos",
      },
    ],
    heroLines: ["Etileno acetato", "de vinilo."],
    intro:
      "EVA para compradores industriales que necesitan ajustar fluidez, contenido de acetato de vinilo y comportamiento final en aplicaciones flexibles, adhesivas y técnicas.",
    meta: [
      { label: "GRADOS", value: "Diferentes MFI · Contenido VA" },
      { label: "TRANSFORMACIÓN", value: "Film · Extrusión · Compounding" },
      { label: "APLICACIONES", value: "Calzado · Adhesivos · Automoción" },
      { label: "RESPUESTA", value: "Consulta técnica por grado" },
    ],
    related: relatedFor("eva"),
    slug: "eva",
    tableTitle: "Fluidez y acetato para ajustar la aplicación final.",
    title: "Etileno acetato de vinilo",
  },
  ps: {
    applications: ["Packaging", "Menaje", "Termoconformado", "Electrodoméstico", "Aislamiento"],
    code: "PS",
    footerQuestion: "¿Necesitas una ficha técnica PS?",
    grades: [
      {
        code: "GPPS",
        denomination: "Cristal",
        spec: "Transparencia · rigidez",
        application: "Packaging transparente · Menaje · Lámina",
        process: "Inyección, extrusión, termoconformado",
      },
      {
        code: "HIPS",
        denomination: "Alto impacto",
        spec: "Resistencia al impacto",
        application: "Electrodoméstico · Envase · Piezas opacas",
        process: "Inyección, extrusión",
      },
      {
        code: "EPS",
        denomination: "Expandible",
        spec: "Baja densidad · aislamiento",
        application: "Aislamiento · Embalaje protector",
        process: "Expansión, moldeo",
      },
    ],
    heroLines: ["Poliestireno.", "Claridad o", "impacto."],
    intro:
      "Poliestireno para aplicaciones donde importan transparencia, rigidez, facilidad de transformación o resistencia al impacto.",
    meta: [
      { label: "GRADOS", value: "GPPS · HIPS · EPS" },
      { label: "TRANSFORMACIÓN", value: "Inyección · Extrusión · Termoconformado" },
      { label: "APLICACIONES", value: "Packaging · Menaje · Aislamiento" },
      { label: "RESPUESTA", value: "< 24 h desde consulta" },
    ],
    related: relatedFor("ps"),
    slug: "ps",
    tableTitle: "Transparencia, impacto y expansión según uso final.",
    title: "Poliestireno",
  },
  pet: {
    applications: ["Botella", "Lámina", "Fibra", "Packaging alimentario", "rPET"],
    code: "PET",
    footerQuestion: "¿Necesitas una ficha técnica PET?",
    grades: [
      {
        code: "BTL",
        denomination: "Botella",
        spec: "IV orientada a soplado",
        application: "Bebidas · Envase alimentario · Preformas",
        process: "Inyección, soplado",
      },
      {
        code: "SHT",
        denomination: "Lámina",
        spec: "Transparencia · termoformado",
        application: "Bandejas · Packaging · Lámina técnica",
        process: "Extrusión, termoconformado",
      },
      {
        code: "FBR",
        denomination: "Fibra",
        spec: "Procesabilidad para hilatura",
        application: "Fibra · Fleje · Aplicaciones textiles",
        process: "Extrusión, hilatura",
      },
      {
        code: "rPET",
        denomination: "Reciclado",
        spec: "Trazabilidad por lote",
        application: "Packaging · Lámina · Integración circular",
        process: "Extrusión, termoformado",
      },
    ],
    heroLines: ["PET.", "Barrera y", "transparencia."],
    intro:
      "PET para cadenas de suministro orientadas a botella, lámina y fibra, con opciones recicladas cuando el proyecto exige contenido circular.",
    meta: [
      { label: "GRADOS", value: "Botella · Lámina · Fibra · rPET" },
      { label: "TRANSFORMACIÓN", value: "Inyección · Soplado · Termoconformado" },
      { label: "APLICACIONES", value: "Bebidas · Packaging · Fibra" },
      { label: "RESPUESTA", value: "Consulta por IV y aplicación" },
    ],
    related: relatedFor("pet"),
    slug: "pet",
    tableTitle: "Botella, lámina y fibra con trazabilidad comercial.",
    title: "PET",
  },
  pa: {
    applications: [
      "Colectores de admisión",
      "Automoción",
      "Piezas técnicas",
      "Componentes reforzados",
      "Aplicaciones térmicas",
    ],
    code: "PA",
    footerQuestion: "¿Necesitas una ficha técnica PA?",
    grades: [
      {
        code: "PA6",
        denomination: "Poliamida 6",
        spec: "Tenacidad · buena procesabilidad",
        application: "Piezas técnicas · Componentes industriales · Automoción",
        process: "Inyección, compounding",
      },
      {
        code: "PA66",
        denomination: "Poliamida 66",
        spec: "Mayor resistencia térmica y mecánica",
        application: "Colectores de admisión · Conectores · Piezas sometidas a carga",
        process: "Inyección técnica",
      },
      {
        code: "PA GF",
        denomination: "Reforzada con fibra",
        spec: "Rigidez y estabilidad dimensional",
        application: "Automoción · Componentes estructurales · Aplicaciones exigentes",
        process: "Inyección, compounding",
      },
    ],
    heroLines: ["Poliamida.", "Resistencia", "para piezas técnicas."],
    intro:
      "Poliamidas para aplicaciones de alta exigencia mecánica y térmica. Trabajamos grados PA6, PA66 y opciones reforzadas para ajustar rigidez, impacto y estabilidad dimensional en piezas técnicas.",
    meta: [
      { label: "GRADOS", value: "PA6 · PA66 · Reforzada" },
      { label: "TRANSFORMACIÓN", value: "Inyección · Compounding" },
      { label: "APLICACIONES", value: "Automoción · Colectores · Piezas técnicas" },
      { label: "RESPUESTA", value: "Consulta técnica por aplicación" },
    ],
    related: relatedFor("pa"),
    slug: "pa",
    tableTitle: "Poliamidas para resistencia mecánica, térmica y dimensional.",
    title: "Poliamida",
  },
  recycled: {
    applications: ["Compra circular", "Blends", "rPE", "rPP", "rPET", "rPS"],
    code: "REC",
    footerQuestion: "¿Necesitas integrar material reciclado?",
    grades: [
      {
        code: "rPE",
        denomination: "Polietileno reciclado",
        spec: "Post-industrial y post-consumo",
        application: "Film · Soplado · Tubería · Inyección",
        process: "Extrusión, soplado, inyección",
      },
      {
        code: "rPP",
        denomination: "Polipropileno reciclado",
        spec: "Flujo trazable",
        application: "Inyección · Automoción · Compounds",
        process: "Inyección, compounding",
      },
      {
        code: "rPET",
        denomination: "PET reciclado",
        spec: "Lote documentado",
        application: "Lámina · Fibra · Packaging",
        process: "Extrusión, termoformado",
      },
      {
        code: "rPS",
        denomination: "Poliestireno reciclado",
        spec: "Integración pragmática",
        application: "Packaging · Piezas técnicas · Blends",
        process: "Extrusión, inyección",
      },
    ],
    heroLines: ["Reciclados.", "Trazabilidad", "industrial."],
    highlight: {
      eyebrow: "GREENLANT / RECICLADOS",
      title: "Material reciclado tratado como línea de suministro.",
      body: "La integración se trabaja con trazabilidad, disponibilidad realista y especificación técnica suficiente para no comprometer continuidad industrial.",
      stats: [
        { value: "rPE", label: "Polietileno" },
        { value: "rPP", label: "Polipropileno" },
        { value: "rPET", label: "PET" },
      ],
    },
    intro:
      "Corrientes recicladas trazables integradas en estrategias de compra realistas, con foco en continuidad, repetibilidad y encaje técnico.",
    meta: [
      { label: "FAMILIAS", value: "rPE · rPP · rPET · rPS" },
      { label: "ORIGEN", value: "Post-industrial · Post-consumo" },
      { label: "APLICACIONES", value: "Blends · Packaging · Compounds" },
      { label: "TRAZABILIDAD", value: "Documentación por lote" },
    ],
    related: relatedFor("recycled"),
    slug: "recycled",
    tableTitle: "Cuatro corrientes recicladas para integrar con criterio industrial.",
    title: "Polímeros reciclados",
  },
  },
  fr: {},
  pt: {},
};

type DetailTranslation = Omit<ProductDetailData, "code" | "related" | "slug">;

const translatedDetailData: Record<Exclude<AppLocale, "es">, Record<string, DetailTranslation>> = {
  en: {
    pe: {
      applications: [
        "Rigid containers",
        "Pipes",
        "Cosmetic packaging",
        "Flexible film",
        "Industrial sacks",
        "Agricultural film",
      ],
      footerQuestion: "Do you need a PE technical sheet?",
      grades: [
        {
          code: "HDPE",
          denomination: "High-Density",
          spec: "0.941 — 0.965 g/cm³",
          application: "Rigid containers · Pipes · Cosmetic packaging",
          process: "Injection, extrusion, blow molding",
        },
        {
          code: "MDPE",
          denomination: "Medium-Density",
          spec: "0.926 — 0.940 g/cm³",
          application: "Gas pipe · Industrial sacks · Reinforced film",
          process: "Extrusion, blow molding",
        },
        {
          code: "LDPE",
          denomination: "Low-Density",
          spec: "0.910 — 0.925 g/cm³",
          application: "Flexible film · Agricultural packaging · Flow caps",
          process: "Film, extrusion, rotational molding",
        },
        {
          code: "LLDPE",
          denomination: "Linear Low-Density",
          spec: "0.915 — 0.925 g/cm³",
          application: "Stretch film · Industrial sack · Resistant agricultural film",
          process: "Mainly film",
        },
      ],
      heroLines: ["Polyethylene.", "The versatile", "polymer."],
      highlight: {
        eyebrow: "RECYCLED VERSION / GREENLANT",
        title: "rPE — Recycled polyethylene.",
        body:
          "Injection Greenlant grades (IN-040 RD/GR/BL), Blow Molding Greenlant (BM-025 WH/NT), and Pipe Greenlant (PE-100-BK). Post-industrial and post-consumer streams with full traceability.",
        stats: [
          { value: "1997", label: "Atalant origin" },
          { value: "3+3", label: "Active Greenlant lines" },
          { value: "100%", label: "Post-industrial traceability" },
        ],
      },
      intro:
        "Four base grades cover 90% of industrial polyethylene processing. From low-density film to rigid high-density containers, every gradient is covered in our catalog with a 24/48h response from Alicante or Valencia.",
      meta: [
        { label: "GRADES", value: "HDPE · MDPE · LDPE · LLDPE" },
        { label: "PROCESSING", value: "Injection · Extrusion · Blow molding · Film" },
        { label: "DENSITY", value: "0.91 — 0.97 g/cm³" },
        { label: "RESPONSE", value: "< 24h from warehouse" },
      ],
      tableTitle: "Four densities, one supply chain.",
      title: "Polyethylene",
    },
    pp: {
      applications: ["Injection", "Raffia", "Compounds", "Automotive", "Rigid packaging"],
      footerQuestion: "Do you need a PP technical sheet?",
      grades: [
        {
          code: "HOMO",
          denomination: "Homopolymer",
          spec: "High stiffness · good thermal resistance",
          application: "Housewares · Caps · Technical parts · Raffia",
          process: "Injection, extrusion, raffia",
        },
        {
          code: "COPO",
          denomination: "Impact copolymer",
          spec: "Higher impact resistance",
          application: "Automotive · Boxes · Containers · Home appliances",
          process: "Injection, compounding",
        },
        {
          code: "RAN",
          denomination: "Random copolymer",
          spec: "Transparency and weldability",
          application: "Transparent packaging · Sheet · Medical applications",
          process: "Injection, extrusion, thermoforming",
        },
      ],
      heroLines: ["Polypropylene.", "Stiffness,", "impact and process."],
      intro:
        "PP family for industrial processing, molding, and repeatable manufacturing. We cover homopolymer, copolymer, and random grades to tune stiffness, impact, and final finish.",
      meta: [
        { label: "GRADES", value: "Homo · Copo · Random" },
        { label: "PROCESSING", value: "Injection · Extrusion · Raffia" },
        { label: "APPLICATIONS", value: "Automotive · Packaging · Compounds" },
        { label: "RESPONSE", value: "< 24h from enquiry" },
      ],
      tableTitle: "Three families to tune modulus, impact, and transparency.",
      title: "Polypropylene",
    },
    pvc: {
      applications: ["Profiles", "Cable", "Construction", "Technical applications", "Compounds"],
      footerQuestion: "Do you need a PVC technical sheet?",
      grades: [
        {
          code: "RIG",
          denomination: "Rigid",
          spec: "High modulus · dimensional stability",
          application: "Profiles · Pipe · Sheet · Construction",
          process: "Extrusion, calendaring, compounding",
        },
        {
          code: "FLEX",
          denomination: "Flexible",
          spec: "Adjusted plasticization",
          application: "Cable · Hose · Coatings · Flexible sheet",
          process: "Extrusion, calendaring",
        },
        {
          code: "EMUL",
          denomination: "Emulsion",
          spec: "Dispersion and coating",
          application: "Paste · Coatings · Technical applications",
          process: "Coating, plastisol",
        },
      ],
      heroLines: ["PVC.", "Rigid or", "flexible."],
      intro:
        "Structured PVC for profiles, cable, construction, and technical applications. Selection is defined around stiffness, plasticization, stability, and process.",
      meta: [
        { label: "GRADES", value: "Rigid · Flexible · Emulsion" },
        { label: "PROCESSING", value: "Extrusion · Calendaring · Plastisol" },
        { label: "APPLICATIONS", value: "Profiles · Cable · Construction" },
        { label: "RESPONSE", value: "Technical enquiry by formulation" },
      ],
      tableTitle: "Rigid and flexible range for construction and technical applications.",
      title: "Polyvinyl chloride",
    },
    eva: {
      applications: ["Insoles and sheets", "Films", "Footwear", "Adhesives", "Automotive", "Construction"],
      footerQuestion: "Do you need a specific EVA grade?",
      grades: [
        {
          code: "MFI",
          denomination: "Different MFI values",
          spec: "Flow adjusted by application",
          application: "Films · Sheets · Molding · Flexible applications",
          process: "Extrusion, film, injection",
        },
        {
          code: "VA",
          denomination: "Vinyl acetate content",
          spec: "Flexibility and adhesion",
          application: "Footwear · Adhesives · Automotive · Construction",
          process: "Compounding, lamination, adhesives",
        },
      ],
      heroLines: ["Ethylene vinyl", "acetate."],
      intro:
        "EVA for industrial buyers who need to adjust flow, vinyl acetate content, and final behavior in flexible, adhesive, and technical applications.",
      meta: [
        { label: "GRADES", value: "Different MFI · VA content" },
        { label: "PROCESSING", value: "Film · Extrusion · Compounding" },
        { label: "APPLICATIONS", value: "Footwear · Adhesives · Automotive" },
        { label: "RESPONSE", value: "Technical enquiry by grade" },
      ],
      tableTitle: "Flow and acetate content to tune the final application.",
      title: "Ethylene vinyl acetate",
    },
    ps: {
      applications: ["Packaging", "Housewares", "Thermoforming", "Home appliances", "Insulation"],
      footerQuestion: "Do you need a PS technical sheet?",
      grades: [
        {
          code: "GPPS",
          denomination: "Crystal",
          spec: "Transparency · stiffness",
          application: "Transparent packaging · Housewares · Sheet",
          process: "Injection, extrusion, thermoforming",
        },
        {
          code: "HIPS",
          denomination: "High impact",
          spec: "Impact resistance",
          application: "Home appliances · Packaging · Opaque parts",
          process: "Injection, extrusion",
        },
        {
          code: "EPS",
          denomination: "Expandable",
          spec: "Low density · insulation",
          application: "Insulation · Protective packaging",
          process: "Expansion, molding",
        },
      ],
      heroLines: ["Polystyrene.", "Clarity or", "impact."],
      intro:
        "Polystyrene for applications where transparency, stiffness, ease of processing, or impact resistance matter.",
      meta: [
        { label: "GRADES", value: "GPPS · HIPS · EPS" },
        { label: "PROCESSING", value: "Injection · Extrusion · Thermoforming" },
        { label: "APPLICATIONS", value: "Packaging · Housewares · Insulation" },
        { label: "RESPONSE", value: "< 24h from enquiry" },
      ],
      tableTitle: "Transparency, impact, and expansion by end use.",
      title: "Polystyrene",
    },
    pet: {
      applications: ["Bottle", "Sheet", "Fiber", "Food packaging", "rPET"],
      footerQuestion: "Do you need a PET technical sheet?",
      grades: [
        {
          code: "BTL",
          denomination: "Bottle",
          spec: "IV oriented to blow molding",
          application: "Beverages · Food packaging · Preforms",
          process: "Injection, blow molding",
        },
        {
          code: "SHT",
          denomination: "Sheet",
          spec: "Transparency · thermoforming",
          application: "Trays · Packaging · Technical sheet",
          process: "Extrusion, thermoforming",
        },
        {
          code: "FBR",
          denomination: "Fiber",
          spec: "Processability for spinning",
          application: "Fiber · Strap · Textile applications",
          process: "Extrusion, spinning",
        },
        {
          code: "rPET",
          denomination: "Recycled",
          spec: "Batch traceability",
          application: "Packaging · Sheet · Circular integration",
          process: "Extrusion, thermoforming",
        },
      ],
      heroLines: ["PET.", "Barrier and", "transparency."],
      intro:
        "PET for supply chains focused on bottle, sheet, and fiber, with recycled options when the project requires circular content.",
      meta: [
        { label: "GRADES", value: "Bottle · Sheet · Fiber · rPET" },
        { label: "PROCESSING", value: "Injection · Blow molding · Thermoforming" },
        { label: "APPLICATIONS", value: "Beverages · Packaging · Fiber" },
        { label: "RESPONSE", value: "Enquiry by IV and application" },
      ],
      tableTitle: "Bottle, sheet, and fiber with commercial traceability.",
      title: "PET",
    },
    pa: {
      applications: ["Intake manifolds", "Automotive", "Technical parts", "Reinforced components", "Thermal applications"],
      footerQuestion: "Do you need a PA technical sheet?",
      grades: [
        {
          code: "PA6",
          denomination: "Polyamide 6",
          spec: "Toughness · good processability",
          application: "Technical parts · Industrial components · Automotive",
          process: "Injection, compounding",
        },
        {
          code: "PA66",
          denomination: "Polyamide 66",
          spec: "Higher thermal and mechanical resistance",
          application: "Intake manifolds · Connectors · Loaded parts",
          process: "Technical injection",
        },
        {
          code: "PA GF",
          denomination: "Glass fiber reinforced",
          spec: "Stiffness and dimensional stability",
          application: "Automotive · Structural components · Demanding applications",
          process: "Injection, compounding",
        },
      ],
      heroLines: ["Polyamide.", "Resistance", "for technical parts."],
      intro:
        "Polyamides for high mechanical and thermal demand applications. We work with PA6, PA66, and reinforced options to adjust stiffness, impact, and dimensional stability in technical parts.",
      meta: [
        { label: "GRADES", value: "PA6 · PA66 · Reinforced" },
        { label: "PROCESSING", value: "Injection · Compounding" },
        { label: "APPLICATIONS", value: "Automotive · Manifolds · Technical parts" },
        { label: "RESPONSE", value: "Technical enquiry by application" },
      ],
      tableTitle: "Polyamides for mechanical, thermal, and dimensional resistance.",
      title: "Polyamide",
    },
    recycled: {
      applications: ["Circular purchasing", "Blends", "rPE", "rPP", "rPET", "rPS"],
      footerQuestion: "Do you need to integrate recycled material?",
      grades: [
        {
          code: "rPE",
          denomination: "Recycled polyethylene",
          spec: "Post-industrial and post-consumer",
          application: "Film · Blow molding · Pipe · Injection",
          process: "Extrusion, blow molding, injection",
        },
        {
          code: "rPP",
          denomination: "Recycled polypropylene",
          spec: "Traceable flow",
          application: "Injection · Automotive · Compounds",
          process: "Injection, compounding",
        },
        {
          code: "rPET",
          denomination: "Recycled PET",
          spec: "Documented batch",
          application: "Sheet · Fiber · Packaging",
          process: "Extrusion, thermoforming",
        },
        {
          code: "rPS",
          denomination: "Recycled polystyrene",
          spec: "Pragmatic integration",
          application: "Packaging · Technical parts · Blends",
          process: "Extrusion, injection",
        },
      ],
      heroLines: ["Recycled.", "Industrial", "traceability."],
      highlight: {
        eyebrow: "GREENLANT / RECYCLED",
        title: "Recycled material treated as a supply line.",
        body:
          "Integration is handled with traceability, realistic availability, and enough technical specification to protect industrial continuity.",
        stats: [
          { value: "rPE", label: "Polyethylene" },
          { value: "rPP", label: "Polypropylene" },
          { value: "rPET", label: "PET" },
        ],
      },
      intro:
        "Traceable recycled streams integrated into realistic purchasing strategies, focused on continuity, repeatability, and technical fit.",
      meta: [
        { label: "FAMILIES", value: "rPE · rPP · rPET · rPS" },
        { label: "ORIGIN", value: "Post-industrial · Post-consumer" },
        { label: "APPLICATIONS", value: "Blends · Packaging · Compounds" },
        { label: "TRACEABILITY", value: "Batch documentation" },
      ],
      tableTitle: "Four recycled streams to integrate with industrial criteria.",
      title: "Recycled polymers",
    },
  },
  fr: {
    pe: {
      applications: ["Conteneurs rigides", "Tuyaux", "Packaging cosmétique", "Film flexible", "Sacs industriels", "Film agricole"],
      footerQuestion: "Besoin d'une fiche technique PE ?",
      grades: [
        { code: "HDPE", denomination: "Haute densité", spec: "0.941 — 0.965 g/cm³", application: "Conteneurs rigides · Tuyaux · Packaging cosmétique", process: "Injection, extrusion, soufflage" },
        { code: "MDPE", denomination: "Moyenne densité", spec: "0.926 — 0.940 g/cm³", application: "Tuyaux gaz · Sacs industriels · Film renforcé", process: "Extrusion, soufflage" },
        { code: "LDPE", denomination: "Basse densité", spec: "0.910 — 0.925 g/cm³", application: "Film flexible · Packaging agricole · Bouchons de flux", process: "Film, extrusion, rotomoulage" },
        { code: "LLDPE", denomination: "Basse densité linéaire", spec: "0.915 — 0.925 g/cm³", application: "Film stretch · Sac industriel · Film agricole résistant", process: "Principalement film" },
      ],
      heroLines: ["Polyéthylène.", "Le polymère", "polyvalent."],
      highlight: {
        eyebrow: "VERSION RECYCLÉE / GREENLANT",
        title: "rPE — Polyéthylène recyclé.",
        body: "Grades Injection Greenlant (IN-040 RD/GR/BL), Blow Molding Greenlant (BM-025 WH/NT) et Pipe Greenlant (PE-100-BK). Post-industriel et post-consommation, traçabilité complète.",
        stats: [
          { value: "1997", label: "Origine Atalant" },
          { value: "3+3", label: "Lignes Greenlant actives" },
          { value: "100%", label: "Traçabilité post-industrielle" },
        ],
      },
      intro: "Quatre grades de base couvrent 90 % des transformations industrielles du polyéthylène. Du film basse densité aux conteneurs rigides haute densité, toutes les variantes sont couvertes dans notre catalogue avec réponse sous 24/48h depuis Alicante ou Valence.",
      meta: [
        { label: "GRADES", value: "HDPE · MDPE · LDPE · LLDPE" },
        { label: "TRANSFORMATION", value: "Injection · Extrusion · Soufflage · Film" },
        { label: "DENSITÉ", value: "0.91 — 0.97 g/cm³" },
        { label: "RÉPONSE", value: "< 24 h depuis dépôt" },
      ],
      tableTitle: "Quatre densités, une même chaîne.",
      title: "Polyéthylène",
    },
    pp: {
      applications: ["Injection", "Rafia", "Compounds", "Automobile", "Packaging rigide"],
      footerQuestion: "Besoin d'une fiche technique PP ?",
      grades: [
        { code: "HOMO", denomination: "Homopolymère", spec: "Grande rigidité · bonne résistance thermique", application: "Articles ménagers · Bouchons · Pièces techniques · Rafia", process: "Injection, extrusion, rafia" },
        { code: "COPO", denomination: "Copolymère impact", spec: "Résistance aux chocs accrue", application: "Automobile · Caisses · Conteneurs · Électroménager", process: "Injection, compounding" },
        { code: "RAN", denomination: "Copolymère random", spec: "Transparence et soudabilité", application: "Packaging transparent · Feuille · Applications médicales", process: "Injection, extrusion, thermoformage" },
      ],
      heroLines: ["Polypropylène.", "Rigidité,", "impact et process."],
      intro: "Famille PP pour transformation industrielle, moulage et fabrication répétable. Nous couvrons les grades homopolymère, copolymère et random pour ajuster rigidité, impact et finition finale.",
      meta: [
        { label: "GRADES", value: "Homo · Copo · Random" },
        { label: "TRANSFORMATION", value: "Injection · Extrusion · Rafia" },
        { label: "APPLICATIONS", value: "Automobile · Packaging · Compounds" },
        { label: "RÉPONSE", value: "< 24 h depuis consultation" },
      ],
      tableTitle: "Trois familles pour ajuster module, impact et transparence.",
      title: "Polypropylène",
    },
    pvc: {
      applications: ["Profilés", "Câble", "Construction", "Applications techniques", "Compounds"],
      footerQuestion: "Besoin d'une fiche technique PVC ?",
      grades: [
        { code: "RIG", denomination: "Rigide", spec: "Haut module · stabilité dimensionnelle", application: "Profilés · Tuyaux · Plaques · Construction", process: "Extrusion, calandrage, compounding" },
        { code: "FLEX", denomination: "Flexible", spec: "Plasticisation ajustée", application: "Câble · Tuyau flexible · Revêtements · Feuille flexible", process: "Extrusion, calandrage" },
        { code: "EMUL", denomination: "Émulsion", spec: "Dispersion et revêtement", application: "Pâte · Revêtements · Applications techniques", process: "Revêtement, plastisol" },
      ],
      heroLines: ["PVC.", "Rigide ou", "flexible."],
      intro: "PVC structuré pour profilés, câble, construction et applications techniques. La sélection se travaille selon rigidité, plasticisation, stabilité et process.",
      meta: [
        { label: "GRADES", value: "Rigide · Flexible · Émulsion" },
        { label: "TRANSFORMATION", value: "Extrusion · Calandrage · Plastisol" },
        { label: "APPLICATIONS", value: "Profilés · Câble · Construction" },
        { label: "RÉPONSE", value: "Consultation technique par formulation" },
      ],
      tableTitle: "Gamme rigide et flexible pour construction et applications techniques.",
      title: "Polychlorure de vinyle",
    },
    eva: {
      applications: ["Semelles et feuilles", "Films", "Chaussure", "Adhésifs", "Automobile", "Construction"],
      footerQuestion: "Besoin d'un grade EVA concret ?",
      grades: [
        { code: "MFI", denomination: "Différents MFI", spec: "Fluidité ajustée par application", application: "Films · Feuilles · Moulage · Applications flexibles", process: "Extrusion, film, injection" },
        { code: "VA", denomination: "Teneur en acétate de vinyle", spec: "Flexibilité et adhésion", application: "Chaussure · Adhésifs · Automobile · Construction", process: "Compounding, laminage, adhésifs" },
      ],
      heroLines: ["Éthylène-acétate", "de vinyle."],
      intro: "EVA pour acheteurs industriels qui doivent ajuster fluidité, teneur en acétate de vinyle et comportement final dans des applications flexibles, adhésives et techniques.",
      meta: [
        { label: "GRADES", value: "Différents MFI · Teneur VA" },
        { label: "TRANSFORMATION", value: "Film · Extrusion · Compounding" },
        { label: "APPLICATIONS", value: "Chaussure · Adhésifs · Automobile" },
        { label: "RÉPONSE", value: "Consultation technique par grade" },
      ],
      tableTitle: "Fluidité et acétate pour ajuster l'application finale.",
      title: "Éthylène-acétate de vinyle",
    },
    ps: {
      applications: ["Packaging", "Articles ménagers", "Thermoformage", "Électroménager", "Isolation"],
      footerQuestion: "Besoin d'une fiche technique PS ?",
      grades: [
        { code: "GPPS", denomination: "Cristal", spec: "Transparence · rigidité", application: "Packaging transparent · Articles ménagers · Feuille", process: "Injection, extrusion, thermoformage" },
        { code: "HIPS", denomination: "Haut impact", spec: "Résistance aux chocs", application: "Électroménager · Packaging · Pièces opaques", process: "Injection, extrusion" },
        { code: "EPS", denomination: "Expansible", spec: "Basse densité · isolation", application: "Isolation · Emballage de protection", process: "Expansion, moulage" },
      ],
      heroLines: ["Polystyrène.", "Clarté ou", "impact."],
      intro: "Polystyrène pour applications où la transparence, la rigidité, la facilité de transformation ou la résistance aux chocs comptent.",
      meta: [
        { label: "GRADES", value: "GPPS · HIPS · EPS" },
        { label: "TRANSFORMATION", value: "Injection · Extrusion · Thermoformage" },
        { label: "APPLICATIONS", value: "Packaging · Articles ménagers · Isolation" },
        { label: "RÉPONSE", value: "< 24 h depuis consultation" },
      ],
      tableTitle: "Transparence, impact et expansion selon usage final.",
      title: "Polystyrène",
    },
    pet: {
      applications: ["Bouteille", "Feuille", "Fibre", "Packaging alimentaire", "rPET"],
      footerQuestion: "Besoin d'une fiche technique PET ?",
      grades: [
        { code: "BTL", denomination: "Bouteille", spec: "IV orientée soufflage", application: "Boissons · Packaging alimentaire · Préformes", process: "Injection, soufflage" },
        { code: "SHT", denomination: "Feuille", spec: "Transparence · thermoformage", application: "Barquettes · Packaging · Feuille technique", process: "Extrusion, thermoformage" },
        { code: "FBR", denomination: "Fibre", spec: "Processabilité pour filature", application: "Fibre · Feuillard · Applications textiles", process: "Extrusion, filature" },
        { code: "rPET", denomination: "Recyclé", spec: "Traçabilité par lot", application: "Packaging · Feuille · Intégration circulaire", process: "Extrusion, thermoformage" },
      ],
      heroLines: ["PET.", "Barrière et", "transparence."],
      intro: "PET pour chaînes d'approvisionnement orientées bouteille, feuille et fibre, avec options recyclées lorsque le projet exige un contenu circulaire.",
      meta: [
        { label: "GRADES", value: "Bouteille · Feuille · Fibre · rPET" },
        { label: "TRANSFORMATION", value: "Injection · Soufflage · Thermoformage" },
        { label: "APPLICATIONS", value: "Boissons · Packaging · Fibre" },
        { label: "RÉPONSE", value: "Consultation par IV et application" },
      ],
      tableTitle: "Bouteille, feuille et fibre avec traçabilité commerciale.",
      title: "PET",
    },
    pa: {
      applications: ["Collecteurs d'admission", "Automobile", "Pièces techniques", "Composants renforcés", "Applications thermiques"],
      footerQuestion: "Besoin d'une fiche technique PA ?",
      grades: [
        { code: "PA6", denomination: "Polyamide 6", spec: "Ténacité · bonne processabilité", application: "Pièces techniques · Composants industriels · Automobile", process: "Injection, compounding" },
        { code: "PA66", denomination: "Polyamide 66", spec: "Résistance thermique et mécanique accrue", application: "Collecteurs d'admission · Connecteurs · Pièces sous charge", process: "Injection technique" },
        { code: "PA GF", denomination: "Renforcée fibre de verre", spec: "Rigidité et stabilité dimensionnelle", application: "Automobile · Composants structurels · Applications exigeantes", process: "Injection, compounding" },
      ],
      heroLines: ["Polyamide.", "Résistance", "pour pièces techniques."],
      intro: "Polyamides pour applications à fortes exigences mécaniques et thermiques. Nous travaillons les grades PA6, PA66 et options renforcées pour ajuster rigidité, impact et stabilité dimensionnelle.",
      meta: [
        { label: "GRADES", value: "PA6 · PA66 · Renforcée" },
        { label: "TRANSFORMATION", value: "Injection · Compounding" },
        { label: "APPLICATIONS", value: "Automobile · Collecteurs · Pièces techniques" },
        { label: "RÉPONSE", value: "Consultation technique par application" },
      ],
      tableTitle: "Polyamides pour résistance mécanique, thermique et dimensionnelle.",
      title: "Polyamide",
    },
    recycled: {
      applications: ["Achat circulaire", "Blends", "rPE", "rPP", "rPET", "rPS"],
      footerQuestion: "Besoin d'intégrer du matériau recyclé ?",
      grades: [
        { code: "rPE", denomination: "Polyéthylène recyclé", spec: "Post-industriel et post-consommation", application: "Film · Soufflage · Tuyau · Injection", process: "Extrusion, soufflage, injection" },
        { code: "rPP", denomination: "Polypropylène recyclé", spec: "Flux traçable", application: "Injection · Automobile · Compounds", process: "Injection, compounding" },
        { code: "rPET", denomination: "PET recyclé", spec: "Lot documenté", application: "Feuille · Fibre · Packaging", process: "Extrusion, thermoformage" },
        { code: "rPS", denomination: "Polystyrène recyclé", spec: "Intégration pragmatique", application: "Packaging · Pièces techniques · Blends", process: "Extrusion, injection" },
      ],
      heroLines: ["Recyclés.", "Traçabilité", "industrielle."],
      highlight: {
        eyebrow: "GREENLANT / RECYCLÉS",
        title: "Matériau recyclé traité comme une ligne d'approvisionnement.",
        body: "L'intégration se travaille avec traçabilité, disponibilité réaliste et spécification technique suffisante pour préserver la continuité industrielle.",
        stats: [
          { value: "rPE", label: "Polyéthylène" },
          { value: "rPP", label: "Polypropylène" },
          { value: "rPET", label: "PET" },
        ],
      },
      intro: "Flux recyclés traçables intégrés dans des stratégies d'achat réalistes, avec priorité à la continuité, répétabilité et adéquation technique.",
      meta: [
        { label: "FAMILLES", value: "rPE · rPP · rPET · rPS" },
        { label: "ORIGINE", value: "Post-industriel · Post-consommation" },
        { label: "APPLICATIONS", value: "Blends · Packaging · Compounds" },
        { label: "TRAÇABILITÉ", value: "Documentation par lot" },
      ],
      tableTitle: "Quatre flux recyclés à intégrer avec critères industriels.",
      title: "Polymères recyclés",
    },
  },
  pt: {
    pe: {
      applications: ["Contentores rígidos", "Tubagens", "Embalagem cosmética", "Filme flexível", "Sacos industriais", "Filme agrícola"],
      footerQuestion: "Precisa de uma ficha técnica PE?",
      grades: [
        { code: "HDPE", denomination: "Alta densidade", spec: "0.941 — 0.965 g/cm³", application: "Contentores rígidos · Tubagens · Embalagem cosmética", process: "Injeção, extrusão, sopro" },
        { code: "MDPE", denomination: "Média densidade", spec: "0.926 — 0.940 g/cm³", application: "Tubagem de gás · Sacos industriais · Filme reforçado", process: "Extrusão, sopro" },
        { code: "LDPE", denomination: "Baixa densidade", spec: "0.910 — 0.925 g/cm³", application: "Filme flexível · Embalagem agrícola · Tampas de fluxo", process: "Filme, extrusão, rotomoldagem" },
        { code: "LLDPE", denomination: "Baixa densidade linear", spec: "0.915 — 0.925 g/cm³", application: "Filme stretch · Saco industrial · Filme agrícola resistente", process: "Principalmente filme" },
      ],
      heroLines: ["Polietileno.", "O polímero", "versátil."],
      highlight: {
        eyebrow: "VERSÃO RECICLADA / GREENLANT",
        title: "rPE — Polietileno reciclado.",
        body: "Graus Injection Greenlant (IN-040 RD/GR/BL), Blow Molding Greenlant (BM-025 WH/NT) e Pipe Greenlant (PE-100-BK). Pós-industrial e pós-consumo, com rastreabilidade completa.",
        stats: [
          { value: "1997", label: "Origem Atalant" },
          { value: "3+3", label: "Linhas Greenlant ativas" },
          { value: "100%", label: "Rastreabilidade pós-industrial" },
        ],
      },
      intro: "Quatro graus base cobrem 90% das transformações industriais do polietileno. Desde o filme de baixa densidade até contentores rígidos de alta densidade, todos os gradientes estão cobertos no nosso catálogo com resposta em 24/48h desde Alicante ou Valência.",
      meta: [
        { label: "GRAUS", value: "HDPE · MDPE · LDPE · LLDPE" },
        { label: "TRANSFORMAÇÃO", value: "Injeção · Extrusão · Sopro · Filme" },
        { label: "DENSIDADE", value: "0.91 — 0.97 g/cm³" },
        { label: "RESPOSTA", value: "< 24 h desde armazém" },
      ],
      tableTitle: "Quatro densidades, uma mesma cadeia.",
      title: "Polietileno",
    },
    pp: {
      applications: ["Injeção", "Ráfia", "Compounds", "Automóvel", "Embalagem rígida"],
      footerQuestion: "Precisa de uma ficha técnica PP?",
      grades: [
        { code: "HOMO", denomination: "Homopolímero", spec: "Alta rigidez · boa resistência térmica", application: "Utilidades domésticas · Tampas · Peças técnicas · Ráfia", process: "Injeção, extrusão, ráfia" },
        { code: "COPO", denomination: "Copolímero impacto", spec: "Maior resistência ao impacto", application: "Automóvel · Caixas · Contentores · Eletrodoméstico", process: "Injeção, compounding" },
        { code: "RAN", denomination: "Copolímero random", spec: "Transparência e soldabilidade", application: "Embalagem transparente · Lâmina · Aplicações médicas", process: "Injeção, extrusão, termoformagem" },
      ],
      heroLines: ["Polipropileno.", "Rigidez,", "impacto e processo."],
      intro: "Família PP para transformação industrial, moldagem e fabrico repetível. Cobrimos graus homopolímero, copolímero e random para ajustar rigidez, impacto e acabamento final.",
      meta: [
        { label: "GRAUS", value: "Homo · Copo · Random" },
        { label: "TRANSFORMAÇÃO", value: "Injeção · Extrusão · Ráfia" },
        { label: "APLICAÇÕES", value: "Automóvel · Embalagem · Compounds" },
        { label: "RESPOSTA", value: "< 24 h desde consulta" },
      ],
      tableTitle: "Três famílias para ajustar módulo, impacto e transparência.",
      title: "Polipropileno",
    },
    pvc: {
      applications: ["Perfis", "Cabo", "Construção", "Aplicações técnicas", "Compounds"],
      footerQuestion: "Precisa de uma ficha técnica PVC?",
      grades: [
        { code: "RIG", denomination: "Rígido", spec: "Alto módulo · estabilidade dimensional", application: "Perfis · Tubagem · Placa · Construção", process: "Extrusão, calandragem, compounding" },
        { code: "FLEX", denomination: "Flexível", spec: "Plasticização ajustada", application: "Cabo · Mangueira · Revestimentos · Lâmina flexível", process: "Extrusão, calandragem" },
        { code: "EMUL", denomination: "Emulsão", spec: "Dispersão e revestimento", application: "Pasta · Revestimentos · Aplicações técnicas", process: "Revestimento, plastisol" },
      ],
      heroLines: ["PVC.", "Rígido ou", "flexível."],
      intro: "PVC estruturado para perfis, cabo, construção e aplicações técnicas. A seleção é trabalhada segundo rigidez, plasticização, estabilidade e processo.",
      meta: [
        { label: "GRAUS", value: "Rígido · Flexível · Emulsão" },
        { label: "TRANSFORMAÇÃO", value: "Extrusão · Calandragem · Plastisol" },
        { label: "APLICAÇÕES", value: "Perfis · Cabo · Construção" },
        { label: "RESPOSTA", value: "Consulta técnica por formulação" },
      ],
      tableTitle: "Gama rígida e flexível para construção e aplicações técnicas.",
      title: "Cloreto de polivinilo",
    },
    eva: {
      applications: ["Palmilhas e lâminas", "Films", "Calçado", "Adesivos", "Automóvel", "Construção"],
      footerQuestion: "Precisa de um grau EVA concreto?",
      grades: [
        { code: "MFI", denomination: "Diferentes MFI", spec: "Fluidez ajustada por aplicação", application: "Films · Lâminas · Moldagem · Aplicações flexíveis", process: "Extrusão, filme, injeção" },
        { code: "VA", denomination: "Conteúdo de acetato de vinila", spec: "Flexibilidade e adesão", application: "Calçado · Adesivos · Automóvel · Construção", process: "Compounding, laminação, adesivos" },
      ],
      heroLines: ["Etileno acetato", "de vinila."],
      intro: "EVA para compradores industriais que precisam de ajustar fluidez, conteúdo de acetato de vinila e comportamento final em aplicações flexíveis, adesivas e técnicas.",
      meta: [
        { label: "GRAUS", value: "Diferentes MFI · Conteúdo VA" },
        { label: "TRANSFORMAÇÃO", value: "Filme · Extrusão · Compounding" },
        { label: "APLICAÇÕES", value: "Calçado · Adesivos · Automóvel" },
        { label: "RESPOSTA", value: "Consulta técnica por grau" },
      ],
      tableTitle: "Fluidez e acetato para ajustar a aplicação final.",
      title: "Etileno acetato de vinila",
    },
    ps: {
      applications: ["Packaging", "Utilidades domésticas", "Termoformagem", "Eletrodoméstico", "Isolamento"],
      footerQuestion: "Precisa de uma ficha técnica PS?",
      grades: [
        { code: "GPPS", denomination: "Cristal", spec: "Transparência · rigidez", application: "Packaging transparente · Utilidades domésticas · Lâmina", process: "Injeção, extrusão, termoformagem" },
        { code: "HIPS", denomination: "Alto impacto", spec: "Resistência ao impacto", application: "Eletrodoméstico · Embalagem · Peças opacas", process: "Injeção, extrusão" },
        { code: "EPS", denomination: "Expansível", spec: "Baixa densidade · isolamento", application: "Isolamento · Embalagem protetora", process: "Expansão, moldagem" },
      ],
      heroLines: ["Poliestireno.", "Clareza ou", "impacto."],
      intro: "Poliestireno para aplicações onde importam transparência, rigidez, facilidade de transformação ou resistência ao impacto.",
      meta: [
        { label: "GRAUS", value: "GPPS · HIPS · EPS" },
        { label: "TRANSFORMAÇÃO", value: "Injeção · Extrusão · Termoformagem" },
        { label: "APLICAÇÕES", value: "Packaging · Utilidades domésticas · Isolamento" },
        { label: "RESPOSTA", value: "< 24 h desde consulta" },
      ],
      tableTitle: "Transparência, impacto e expansão segundo uso final.",
      title: "Poliestireno",
    },
    pet: {
      applications: ["Garrafa", "Lâmina", "Fibra", "Embalagem alimentar", "rPET"],
      footerQuestion: "Precisa de uma ficha técnica PET?",
      grades: [
        { code: "BTL", denomination: "Garrafa", spec: "IV orientada a sopro", application: "Bebidas · Embalagem alimentar · Pré-formas", process: "Injeção, sopro" },
        { code: "SHT", denomination: "Lâmina", spec: "Transparência · termoformagem", application: "Tabuleiros · Packaging · Lâmina técnica", process: "Extrusão, termoformagem" },
        { code: "FBR", denomination: "Fibra", spec: "Processabilidade para fiação", application: "Fibra · Cinta · Aplicações têxteis", process: "Extrusão, fiação" },
        { code: "rPET", denomination: "Reciclado", spec: "Rastreabilidade por lote", application: "Packaging · Lâmina · Integração circular", process: "Extrusão, termoformagem" },
      ],
      heroLines: ["PET.", "Barreira e", "transparência."],
      intro: "PET para cadeias de fornecimento orientadas para garrafa, lâmina e fibra, com opções recicladas quando o projeto exige conteúdo circular.",
      meta: [
        { label: "GRAUS", value: "Garrafa · Lâmina · Fibra · rPET" },
        { label: "TRANSFORMAÇÃO", value: "Injeção · Sopro · Termoformagem" },
        { label: "APLICAÇÕES", value: "Bebidas · Packaging · Fibra" },
        { label: "RESPOSTA", value: "Consulta por IV e aplicação" },
      ],
      tableTitle: "Garrafa, lâmina e fibra com rastreabilidade comercial.",
      title: "PET",
    },
    pa: {
      applications: ["Coletores de admissão", "Automóvel", "Peças técnicas", "Componentes reforçados", "Aplicações térmicas"],
      footerQuestion: "Precisa de uma ficha técnica PA?",
      grades: [
        { code: "PA6", denomination: "Poliamida 6", spec: "Tenacidade · boa processabilidade", application: "Peças técnicas · Componentes industriais · Automóvel", process: "Injeção, compounding" },
        { code: "PA66", denomination: "Poliamida 66", spec: "Maior resistência térmica e mecânica", application: "Coletores de admissão · Conectores · Peças submetidas a carga", process: "Injeção técnica" },
        { code: "PA GF", denomination: "Reforçada com fibra", spec: "Rigidez e estabilidade dimensional", application: "Automóvel · Componentes estruturais · Aplicações exigentes", process: "Injeção, compounding" },
      ],
      heroLines: ["Poliamida.", "Resistência", "para peças técnicas."],
      intro: "Poliamidas para aplicações de elevada exigência mecânica e térmica. Trabalhamos graus PA6, PA66 e opções reforçadas para ajustar rigidez, impacto e estabilidade dimensional em peças técnicas.",
      meta: [
        { label: "GRAUS", value: "PA6 · PA66 · Reforçada" },
        { label: "TRANSFORMAÇÃO", value: "Injeção · Compounding" },
        { label: "APLICAÇÕES", value: "Automóvel · Coletores · Peças técnicas" },
        { label: "RESPOSTA", value: "Consulta técnica por aplicação" },
      ],
      tableTitle: "Poliamidas para resistência mecânica, térmica e dimensional.",
      title: "Poliamida",
    },
    recycled: {
      applications: ["Compra circular", "Blends", "rPE", "rPP", "rPET", "rPS"],
      footerQuestion: "Precisa de integrar material reciclado?",
      grades: [
        { code: "rPE", denomination: "Polietileno reciclado", spec: "Pós-industrial e pós-consumo", application: "Filme · Sopro · Tubagem · Injeção", process: "Extrusão, sopro, injeção" },
        { code: "rPP", denomination: "Polipropileno reciclado", spec: "Fluxo rastreável", application: "Injeção · Automóvel · Compounds", process: "Injeção, compounding" },
        { code: "rPET", denomination: "PET reciclado", spec: "Lote documentado", application: "Lâmina · Fibra · Packaging", process: "Extrusão, termoformagem" },
        { code: "rPS", denomination: "Poliestireno reciclado", spec: "Integração pragmática", application: "Packaging · Peças técnicas · Blends", process: "Extrusão, injeção" },
      ],
      heroLines: ["Reciclados.", "Rastreabilidade", "industrial."],
      highlight: {
        eyebrow: "GREENLANT / RECICLADOS",
        title: "Material reciclado tratado como linha de fornecimento.",
        body: "A integração é trabalhada com rastreabilidade, disponibilidade realista e especificação técnica suficiente para não comprometer a continuidade industrial.",
        stats: [
          { value: "rPE", label: "Polietileno" },
          { value: "rPP", label: "Polipropileno" },
          { value: "rPET", label: "PET" },
        ],
      },
      intro: "Fluxos reciclados rastreáveis integrados em estratégias de compra realistas, com foco em continuidade, repetibilidade e encaixe técnico.",
      meta: [
        { label: "FAMÍLIAS", value: "rPE · rPP · rPET · rPS" },
        { label: "ORIGEM", value: "Pós-industrial · Pós-consumo" },
        { label: "APLICAÇÕES", value: "Blends · Packaging · Compounds" },
        { label: "RASTREABILIDADE", value: "Documentação por lote" },
      ],
      tableTitle: "Quatro fluxos reciclados para integrar com critério industrial.",
      title: "Polímeros reciclados",
    },
  },
};

for (const locale of ["en", "fr", "pt"] as const) {
  productDetailDataByLocale[locale] = Object.fromEntries(
    Object.entries(translatedDetailData[locale]).map(([slug, detail]) => {
      const base = productDetailDataByLocale.es[slug];
      return [
        slug,
        {
          ...base,
          ...detail,
          related: relatedForLocale(slug, locale),
          slug,
        },
      ];
    }),
  );
}

export const productDetailData = productDetailDataByLocale;
