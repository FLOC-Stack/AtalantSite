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
      fields: [
        localizedText("eyebrow", "Eyebrow"),
        localizedText("headline", "Headline", true),
        localizedTextarea("body", "Body", true),
        localizedText("primaryLabel", "Primary label", true),
        localizedText("secondaryLabel", "Secondary label", true),
      ],
      name: "hero",
      type: "group",
    },
    {
      blocks: [
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            localizedText("eyebrow", "Eyebrow", true),
            localizedText("title", "Title", true),
            localizedTextarea("body", "Body", true),
            {
              fields: [
                localizedText("label", "Label", true),
                localizedText("value", "Value", true),
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
            localizedText("eyebrow", "Eyebrow", true),
            localizedText("title", "Title", true),
            localizedTextarea("body", "Body", true),
          ],
          slug: "section",
        },
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            localizedText("eyebrow", "Eyebrow", true),
            localizedText("title", "Title", true),
            localizedTextarea("body", "Body", true),
            localizedText("ctaLabel", "CTA label", true),
          ],
          slug: "productPreview",
        },
        {
          fields: [
            { name: "anchorId", required: true, type: "text" },
            localizedText("eyebrow", "Eyebrow", true),
            localizedText("title", "Title", true),
            localizedTextarea("body", "Body", true),
            localizedTextarea("note", "Note", true),
            localizedText("submitLabel", "Submit label", true),
          ],
          slug: "contact",
        },
      ],
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
  ],
  versions: {
    drafts: true,
  },
};
