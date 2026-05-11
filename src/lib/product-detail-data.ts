import type { ProductFamilyDetailData } from "@/lib/content-types";

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
  { code: "REC", name: "Reciclados", grades: "rPE · rPP · rPET · rPS", slug: "recycled" },
];

function relatedFor(slug: string) {
  return related.filter((entry) => entry.slug !== slug).slice(0, 4);
}

export const productDetailData: Record<string, ProductDetailData> = {
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
};
