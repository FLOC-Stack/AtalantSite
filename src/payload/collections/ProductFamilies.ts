import type { CollectionConfig } from "payload";

export const ProductFamilies: CollectionConfig = {
  slug: "productFamilies",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["code", "slug", "featured", "order"],
    useAsTitle: "code",
  },
  fields: [
    { name: "code", required: true, type: "text", unique: true },
    { name: "slug", required: true, type: "text", unique: true },
    { name: "order", type: "number" },
    { name: "featured", type: "checkbox" },
    { name: "recycled", type: "checkbox" },
    {
      name: "heroMedia",
      relationTo: "media",
      type: "relationship",
    },
    { localized: true, name: "title", required: true, type: "text" },
    { localized: true, name: "excerpt", required: true, type: "textarea" },
    { localized: true, name: "body", required: true, type: "textarea" },
    {
      fields: [{ localized: true, name: "value", required: true, type: "text" }],
      minRows: 1,
      name: "variants",
      type: "array",
    },
    {
      fields: [{ localized: true, name: "value", required: true, type: "text" }],
      minRows: 1,
      name: "applications",
      type: "array",
    },
    {
      fields: [
        { localized: true, name: "title", required: true, type: "text" },
        { localized: true, name: "description", required: true, type: "textarea" },
      ],
      name: "seo",
      type: "group",
    },
    {
      admin: {
        description: "Contenido de la página detalle con el estilo editorial de producto.",
      },
      fields: [
        {
          fields: [{ localized: true, name: "value", required: true, type: "text" }],
          minRows: 1,
          name: "heroLines",
          type: "array",
        },
        { localized: true, name: "intro", required: true, type: "textarea" },
        {
          fields: [
            { localized: true, name: "label", required: true, type: "text" },
            { localized: true, name: "value", required: true, type: "text" },
          ],
          minRows: 1,
          name: "meta",
          type: "array",
        },
        { localized: true, name: "tableTitle", required: true, type: "text" },
        {
          fields: [
            { name: "code", required: true, type: "text" },
            { localized: true, name: "denomination", required: true, type: "text" },
            { localized: true, name: "spec", required: true, type: "text" },
            { localized: true, name: "application", required: true, type: "textarea" },
            { localized: true, name: "process", required: true, type: "text" },
          ],
          minRows: 1,
          name: "grades",
          type: "array",
        },
        {
          fields: [{ localized: true, name: "value", required: true, type: "text" }],
          minRows: 1,
          name: "detailApplications",
          type: "array",
        },
        {
          fields: [
            { localized: true, name: "eyebrow", type: "text" },
            { localized: true, name: "title", type: "text" },
            { localized: true, name: "body", type: "textarea" },
            {
              fields: [
                { localized: true, name: "value", required: true, type: "text" },
                { localized: true, name: "label", required: true, type: "text" },
              ],
              name: "stats",
              type: "array",
            },
          ],
          name: "highlight",
          type: "group",
        },
        { localized: true, name: "footerQuestion", required: true, type: "text" },
      ],
      name: "detail",
      type: "group",
    },
  ],
  versions: {
    drafts: true,
  },
};
