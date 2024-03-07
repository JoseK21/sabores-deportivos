import ComercioCard from "@/components/quinisports/general/ComercioCard";
import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Buisiness } from "@/types/business";
import { Metadata } from "next";

const places: Buisiness[] = [
  {
    id: "1",
    name: "La Cervecería de Barrio",
    photoUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "La Cervecería de Barrio es conocida por su ambiente animado y su amplia selección de cervezas y platillos típicos mexicanos.",
  },
  {
    id: "2",
    name: "Wings Army",
    photoUrl:
      "https://plus.unsplash.com/premium_photo-1670984940156-c7f833fe8397?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Wings Army es famoso por sus deliciosas alitas de pollo y su variedad de salsas picantes, perfecto para los amantes de la comida picante y las bebidas frías.",
  },
  {
    id: "3",
    name: "Hooters",
    photoUrl:
      "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Hooters es conocido por su ambiente relajado, sus alitas de pollo y su personal amigable. Es un lugar popular para ver eventos deportivos en pantalla grande.",
  },
  {
    id: "4",
    name: "Hard Rock Cafe",
    photoUrl:
      "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Hard Rock Cafe es famoso por su decoración estilo rock and roll, su ambiente vibrante y su menú de comida estadounidense clásica. También es conocido por exhibir memorabilia de música.",
  },
  {
    id: "5",
    name: "Buffalo Wild Wings",
    photoUrl:
      "https://images.unsplash.com/photo-1462539405390-d0bdb635c7d1?q=80&w=3320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Buffalo Wild Wings es conocido por sus alitas de pollo, su variedad de salsas y aderezos, y sus múltiples pantallas para ver deportes en vivo.",
  },
  {
    id: "6",
    name: "The Beer Box",
    photoUrl:
      "https://media.istockphoto.com/id/1293140882/es/foto/pareja-joven-usando-sus-tel%C3%A9fonos-m%C3%B3viles.jpg?s=2048x2048&w=is&k=20&c=VnRkkMxHLmGKZO62JVVSKFip7w2iuw9rmiIXMC17WmA=",
    description:
      "The Beer Box es un lugar popular entre los amantes de la cerveza artesanal, con una amplia selección de cervezas locales e internacionales y un ambiente acogedor.",
  },
  {
    id: "7",
    name: "Sports Bar México",
    photoUrl:
      "https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Sports Bar México es un destino popular para los fanáticos del deporte, con múltiples pantallas para ver eventos en vivo, bebidas frías y comida deliciosa.",
  },
];

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
      <div className="flex justify-end my-7">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Restaurante X" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {places.map((place) => (
          <ComercioCard key={place.id} {...place} />
        ))}
      </div>
    </main>
  );
};

export default Page;
