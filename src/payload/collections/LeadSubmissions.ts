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
    defaultColumns: ["name", "company", "email", "locale", "createdAt"],
    useAsTitle: "email",
  },
  fields: [
    { name: "name", required: true, type: "text" },
    { name: "company", type: "text" },
    { name: "email", required: true, type: "email" },
    { name: "country", type: "text" },
    { name: "message", required: true, type: "textarea" },
    { name: "locale", required: true, type: "text" },
    { name: "sourcePath", required: true, type: "text" },
  ],
};
