import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    adminThumbnail: "thumbnail",
    focalPoint: true,
    // Aceptamos imagen y video para poder asignar cualquiera al heroMedia.
    // `imageSizes` solo aplica a imágenes; Payload las omite para videos.
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      { name: "thumbnail", width: 320 },
      { name: "card", width: 960 },
      { name: "og", width: 1200, height: 630, crop: "center" },
    ],
    staticDir: path.resolve(dirname, "../../../public/media"),
  },
};
