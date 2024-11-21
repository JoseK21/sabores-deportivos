import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sabores Deportivos",
    short_name: "Sabores Deportivos",
    description: "Encuentra el mejor lugar para disfrutar del deporte y la buena cocida cerca de ti.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
