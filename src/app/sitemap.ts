import { MetadataRoute } from "next";
import { QUINISPORTS_URL } from "./constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: QUINISPORTS_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${QUINISPORTS_URL}/rankings`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${QUINISPORTS_URL}/comercios-afiliados`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${QUINISPORTS_URL}/sobre-nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
