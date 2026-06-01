import type { CollectionConfig } from "payload";

export const LeadSubmissions: CollectionConfig = {
  slug: "leadSubmissions",
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    defaultColumns: ["name", "company", "email", "topic", "locale", "createdAt"],
    useAsTitle: "email",
  },
  fields: [
    { name: "name", required: true, type: "text" },
    { name: "role", type: "text" },
    { name: "phone", type: "text" },
    { name: "email", required: true, type: "email" },
    { name: "company", type: "text" },
    { name: "country", type: "text" },
    {
      name: "topic",
      type: "select",
      options: [
        { label: "Comercial / Presupuesto", value: "sales" },
        { label: "Información de productos", value: "products" },
        { label: "Logística y transporte", value: "logistics" },
        { label: "Financiación", value: "financing" },
        { label: "Sostenibilidad y reciclados", value: "sustainability" },
        { label: "Prensa y comunicación", value: "press" },
        { label: "Otra consulta", value: "other" },
      ],
    },
    { name: "message", required: true, type: "textarea" },
    { name: "locale", required: true, type: "text" },
    { name: "sourcePath", required: true, type: "text" },
    {
      name: "ipHash",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "userAgent",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
  ],
};
