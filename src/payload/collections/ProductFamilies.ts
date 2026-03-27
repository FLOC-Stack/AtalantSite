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
  ],
  versions: {
    drafts: true,
  },
};
