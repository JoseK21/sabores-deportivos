import { Metadata } from "next";
import GridFilter from "../../../components/pages/comercios-afiliados/GridFilter";

export const metadata: Metadata = {
  title: "QuiniSports | Comercios Afiliados",
  description:
    "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
  authors: [{ name: "JDataByte" }],
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  metadataBase: new URL("https://www.quinisports.com"),
  openGraph: {
    type: "website",
    url: "https://wwww.quinisports.com",
    title: "QuiniSports",
    description:
      "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
    siteName: "QuiniSports",
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
};

const Page = () => {
  return (
    <main>
      <GridFilter />
    </main>
  );
};

export default Page;
