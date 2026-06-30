import type { CollectionConfig } from "payload";

const imageUpload = (name: string, label: string, required = false) => ({
  name,
  label,
  relationTo: "media" as const,
  required,
  type: "upload" as const,
  filterOptions: {
    mimeType: {
      contains: "image",
    },
  },
});

export const NewsPosts: CollectionConfig = {
  slug: "newsPosts",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "status", "publishedAt", "sortOrder"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "published",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "href",
      type: "text",
    },
    imageUpload("image", "Image", true),
    {
      localized: true,
      name: "title",
      required: true,
      type: "text",
    },
    {
      localized: true,
      name: "excerpt",
      required: true,
      type: "textarea",
    },
    {
      localized: true,
      name: "imageAlt",
      type: "text",
    },
  ],
  versions: {
    drafts: true,
  },
};
