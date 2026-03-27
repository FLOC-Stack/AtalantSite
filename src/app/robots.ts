import type { MetadataRoute } from "next";
import { getServerURL } from "@/lib/server-url";

export default function robots(): MetadataRoute.Robots {
  const baseURL = getServerURL();

  return {
    host: baseURL,
    rules: {
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
