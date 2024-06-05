import { MetadataRoute } from "next";
import { __URL } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/#/*", "/qs-admin/*", "/preguntas-frecuentes","/terminos-y-condiciones", "/politicas-de-privacidad"],
    },
    sitemap: `${__URL}/sitemap.xml`,
  };
}
