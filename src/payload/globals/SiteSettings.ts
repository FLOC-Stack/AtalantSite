import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  access: {
    read: () => true,
  },
  fields: [
    { name: "brandName", required: true, type: "text" },
    { localized: true, name: "tagline", required: true, type: "text" },
    { name: "contactEmail", required: true, type: "email" },
    { name: "phone", required: true, type: "text" },
    { localized: true, name: "address", required: true, type: "text" },
    { localized: true, name: "footerText", required: true, type: "textarea" },
    { localized: true, name: "headerCtaLabel", type: "text" },
    { localized: true, name: "headerCtaHref", type: "text" },
    {
      fields: [
        { localized: true, name: "title", required: true, type: "text" },
        { localized: true, name: "description", required: true, type: "textarea" },
      ],
      name: "defaultSeo",
      type: "group",
    },
    {
      fields: [
        { name: "label", required: true, type: "text" },
        {
          defaultValue: "section",
          name: "kind",
          options: [
            { label: "Section", value: "section" },
            { label: "Products", value: "products" },
            { label: "Logistics", value: "logistics" },
            { label: "External", value: "external" },
          ],
          type: "select",
        },
        { name: "sectionId", type: "text" },
        { name: "href", type: "text" },
      ],
      localized: true,
      name: "navigation",
      type: "array",
    },
    {
      fields: [
        { name: "label", required: true, type: "text" },
        {
          defaultValue: "section",
          name: "kind",
          options: [
            { label: "Section", value: "section" },
            { label: "Products", value: "products" },
            { label: "Logistics", value: "logistics" },
            { label: "External", value: "external" },
          ],
          type: "select",
        },
        { name: "sectionId", type: "text" },
        { name: "href", type: "text" },
      ],
      localized: true,
      name: "footerLinks",
      type: "array",
    },
    {
      fields: [
        { name: "label", required: true, type: "text" },
        { name: "href", required: true, type: "text" },
      ],
      localized: true,
      name: "socialLinks",
      type: "array",
    },
  ],
};
