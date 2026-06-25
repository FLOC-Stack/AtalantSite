import type { CollectionConfig } from "payload";

const localizedText = (name: string, label: string, required = false) => ({
  localized: true,
  name,
  required,
  type: "text" as const,
  label,
});

const localizedTextarea = (name: string, label: string, required = false) => ({
  localized: true,
  name,
  required,
  type: "textarea" as const,
  label,
});

const text = (name: string, label: string, required = false) => ({
  name,
  required,
  type: "text" as const,
  label,
});

const textarea = (name: string, label: string, required = false) => ({
  name,
  required,
  type: "textarea" as const,
  label,
});

const mediaRelationship = (name: string, label: string) => ({
  name,
  label,
  relationTo: "media" as const,
  type: "relationship" as const,
});

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["slug", "updatedAt"],
    useAsTitle: "slug",
  },
  fields: [
    {
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "pageType",
      type: "select",
      defaultValue: "home",
      options: [
        { label: "Home", value: "home" },
        { label: "Logistica", value: "logistica" },
        { label: "Nosotros", value: "nosotros" },
        { label: "Sostenibilidad", value: "sostenibilidad" },
        { label: "Financiacion", value: "financiacion" },
        { label: "Productos", value: "productos" },
        { label: "Contacto", value: "contacto" },
        { label: "Privacidad", value: "privacidad" },
        { label: "Cookies", value: "cookies" },
        { label: "Aviso legal", value: "aviso-legal" },
      ],
      required: true,
    },
    {
      fields: [
        localizedText("eyebrow", "Eyebrow"),
        localizedText("headline", "Headline", true),
        localizedTextarea("body", "Body", true),
        localizedText("primaryLabel", "Primary label", true),
        localizedText("primaryHref", "Primary URL"),
        localizedText("secondaryLabel", "Secondary label", true),
        localizedText("secondaryHref", "Secondary URL"),
      ],
      name: "hero",
      type: "group",
    },
    {
      fields: [
        mediaRelationship("homeProductsVideo", "Home products video"),
        mediaRelationship("logisticaHeroVideo", "Logistica hero video"),
        mediaRelationship("sustainabilitySystemsVideo", "Sustainability systems video"),
        mediaRelationship("nosotrosHeroImage", "Nosotros hero image"),
        mediaRelationship("nosotrosChapter1Image", "Nosotros chapter 1 image"),
        mediaRelationship("nosotrosChapter2Image", "Nosotros chapter 2 image"),
        mediaRelationship("nosotrosChapter3Image", "Nosotros chapter 3 image"),
        mediaRelationship("financiacionHeroImage", "Financiacion hero image"),
      ],
      name: "media",
      type: "group",
    },
    {
      blocks: [
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            text("eyebrow", "Eyebrow", true),
            text("title", "Title", true),
            textarea("body", "Body", true),
            text("ctaLabel", "CTA label"),
            text("ctaHref", "CTA URL"),
            {
              fields: [
                text("label", "Label", true),
                text("value", "Value", true),
              ],
              minRows: 1,
              name: "stats",
              type: "array",
            },
          ],
          slug: "stats",
        },
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            text("eyebrow", "Eyebrow", true),
            text("title", "Title", true),
            textarea("body", "Body", true),
            text("ctaLabel", "CTA label"),
            text("ctaHref", "CTA URL"),
          ],
          slug: "section",
        },
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            text("eyebrow", "Eyebrow", true),
            text("title", "Title", true),
            textarea("body", "Body", true),
            text("ctaLabel", "CTA label", true),
            text("ctaHref", "CTA URL"),
          ],
          slug: "productPreview",
        },
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            text("eyebrow", "Eyebrow", true),
            text("title", "Title", true),
            textarea("body", "Body", true),
            text("sectionLabel", "Section label"),
            text("ctaLabel", "CTA label", true),
            {
              fields: [
                text("date", "Date", true),
                text("title", "Title", true),
                textarea("excerpt", "Excerpt", true),
                text("href", "URL", true),
                mediaRelationship("image", "Image"),
                text("imageAlt", "Image alt"),
              ],
              minRows: 1,
              name: "items",
              type: "array",
            },
          ],
          slug: "news",
        },
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            text("eyebrow", "Eyebrow", true),
            text("title", "Title", true),
            textarea("body", "Body", true),
            textarea("note", "Note", true),
            text("submitLabel", "Submit label", true),
            text("ctaHref", "CTA URL"),
          ],
          slug: "contact",
        },
      ],
      localized: true,
      name: "layoutBlocks",
      type: "blocks",
    },
    {
      fields: [
        localizedText("title", "SEO title", true),
        localizedTextarea("description", "SEO description", true),
      ],
      name: "seo",
      type: "group",
    },
    {
      admin: {
        description:
          "Structured content for non-home pages. Keep object keys intact when editing.",
      },
      localized: true,
      name: "pageData",
      type: "json",
    },
  ],
  versions: {
    drafts: true,
  },
};
