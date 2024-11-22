import { Testimonial } from "@/types/testimonial";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: "1",
    name: "Luis Martínez",
    designation: "Dueño de Bar Deportivo 'El Golazo'",
    content:
      "Implementar Sabores Deportivos en nuestro sportbar ha sido una decisión excelente. Nuestros clientes disfrutan mucho más de los partidos con las estadísticas en tiempo real y las predicciones que ofrece la plataforma. Además, ha aumentado la interacción y las apuestas amigables entre los asistentes. Definitivamente lo recomiendo a otros dueños de sportbars.",
    image: "/assets/testimonials/auth-1.webp",
    star: 5,
  },
  {
    id: "2",
    name: "María Rodríguez",
    designation: "Propietaria de Restaurante 'La Cancha'",
    content:
      "Sabores Deportivos ha revolucionado la experiencia de nuestros clientes durante eventos deportivos. Las funciones de predicción y análisis en vivo han generado un ambiente más dinámico y entretenido. Hemos notado un incremento en la afluencia de clientes durante los días de partidos importantes. ¡Una herramienta indispensable para cualquier negocio orientado al deporte!",
    image: "/assets/testimonials/auth-2.webp",
    star: 5,
  },
  {
    id: "3",
    name: "Juan Pérez",
    designation: "Gerente del Bar 'Tiempo Extra'",
    content:
      "Desde que introdujimos Sabores Deportivos en nuestro bar, la respuesta de los clientes ha sido increíble. Las predicciones deportivas y los datos en tiempo real han creado una atmósfera emocionante y competitiva. Esto no solo ha mejorado la satisfacción de nuestros clientes, sino que también ha incrementado nuestras ventas en días de juego. Muy recomendable.",
    image: "/assets/testimonials/auth-3.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
      {testimonialData.map((testimonial) => (
        <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
};

export default Testimonials;
