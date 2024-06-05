import { MetadataRoute } from "next";
import { __URL } from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: __URL, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${__URL}/rankings`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${__URL}/comercios-afiliados`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${__URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
