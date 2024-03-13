import { MetadataRoute } from "next";
import { QUINISPORTS_URL } from "./constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/terminos-y-condiciones", "/politicas-de-privacidad", "/#/*"],
    },
    sitemap: `${QUINISPORTS_URL}/sitemap.xml`,
  };
}
