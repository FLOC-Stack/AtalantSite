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
