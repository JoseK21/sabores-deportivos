import { Feature } from "@/types/feature";
import { Calendar, Store, MenuSquare, Megaphone, MessageSquareText, FastForwardIcon, Star } from "lucide-react";

const featuresData: Feature[] = [
  {
    icon: Store,
    title: "Encuentra el lugar perfecto para disfrutar deportes en vivo",
    paragraph:
      "Visita comercios donde transmiten tus deportes favoritos. Filtra por categoria, ubicación, horarios y amenidades para elegir el lugar ideal.",
  },
  {
    icon: MenuSquare,
    title: "Descubre menús únicos y experiencias gastronómicas",
    paragraph: "Explora los menús de los comercios y encuentra platos que se adapten a tu gusto y estilo de vida.",
  },
  {
    icon: FastForwardIcon,
    title: "Sigue tus eventos deportivos favoritos",
    paragraph:
      "Consulta qué partidos o eventos deportivos estarán disponibles en cada comercio. Nunca te pierdas una jugada importante.",
  },
  {
    icon: Megaphone,
    title: "Solicita Atención Personalizada en Comercios",
    paragraph:
      "Usa nuestro sistema para pedir asistencia o solicitar servicio directamente desde tu mesa, facilitando la comunicación con el personal del comercio.",
  },
  {
    icon: MessageSquareText,
    title: "Opiniones de otros usuarios",
    paragraph:
      "Lee reseñas y calificaciones de otros amantes del deporte para encontrar el lugar que mejor se adapta a tus preferencias.",
  },
  {
    icon: Star,
    title: "Comercios destacados y recomendados",
    paragraph:
      "Explora la lista de comercios mejor valorados por los usuarios y descubre nuevas experiencias para disfrutar deportes en compañía.",
  },
];

export default featuresData;
