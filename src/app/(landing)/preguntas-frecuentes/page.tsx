import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faq_users = [
  {
    question: "¿Cómo puedo encontrar comercios que transmiten deportes?",
    answer:
      "Puedes utilizar nuestra barra de búsqueda avanzada para filtrar comercios según ubicación, tipo de deporte, horario, o incluso características especiales como pet-friendly o parqueo.",
  },
  {
    question: "¿Puedo reservar una mesa en los comercios que aparecen en la plataforma?",
    answer:
      "Actualmente, puedes ver los horarios de cada comercio y ponerte en contacto con ellos directamente para realizar una reserva.",
  },
  {
    question: "¿Cómo puedo saber qué deportes están transmitiendo en un comercio específico?",
    answer:
      "Cada comercio en nuestra plataforma tiene un perfil donde se muestra qué deportes están siendo transmitidos en el momento. También puedes ver horarios y partidos programados.",
  },
  {
    question: "¿Puedo participar en la quiniela de un comercio?",
    answer:
      "La quiniela está disponible como una característica secundaria, y puedes encontrarla en el perfil de cada comercio que lo ofrezca, pero no es una funcionalidad principal.",
  },
  {
    question: "¿Los comercios ofrecen información sobre el menú?",
    answer:
      "Sí, cada comercio tiene su menú detallado, incluyendo los ingredientes principales de los productos, lo que te ayuda a tomar decisiones informadas antes de hacer tu pedido.",
  },
  {
    question: "¿Cómo puedo llamar la atención del camarero o mesero en el comercio?",
    answer:
      "Puedes utilizar la función de 'Llamar atención a la mesa' desde la plataforma para que el personal del comercio sepa que necesitas asistencia.",
  },
  {
    question: "¿Puedo ver opiniones de otros clientes sobre los comercios?",
    answer:
      "Sí, cada comercio tiene un sistema de valoraciones y comentarios donde los usuarios pueden compartir su experiencia con otros clientes.",
  },
];

const faq_owners = [
  {
    question: "¿Cómo puedo agregar mi comercio a la plataforma?",
    answer:
      "Puedes registrarte fácilmente desde nuestra página web. Completa la información básica sobre tu comercio y envíala para su revisión. Una vez aprobado, tu comercio será visible en la plataforma.",
  },
  {
    question: "¿Qué tipo de información debo incluir en el perfil de mi comercio?",
    answer:
      "Es importante incluir detalles sobre tu menú, horarios de apertura, opciones de contacto, redes sociales, y cualquier característica especial como áreas pet-friendly o servicios de parqueo.",
  },
  {
    question: "¿Cómo puedo actualizar la información de mi comercio?",
    answer:
      "Puedes acceder a tu perfil de comerciante y modificar cualquier información relevante. Asegúrate de mantener siempre actualizado tu horario, menú y eventos especiales.",
  },
  {
    question: "¿Cómo puedo aprovechar la visibilidad que ofrece la plataforma?",
    answer:
      "Puedes destacar tu comercio publicando ofertas, promociones especiales o eventos deportivos que transmitirás, lo que atraerá más usuarios a tu perfil.",
  },
  {
    question: "¿La plataforma me permite interactuar con los usuarios?",
    answer:
      "Sí, puedes recibir mensajes directos de los usuarios, así como responder comentarios o preguntas que hayan dejado sobre tu comercio.",
  },
  {
    question: "¿Cómo puedo agregar la quiniela en mi comercio?",
    answer:
      "Aunque la quiniela no es una funcionalidad principal, puedes activarla en tu perfil como una opción secundaria si decides ofrecerla, pero necesitas confirmar si es compatible con las regulaciones locales.",
  },
  {
    question: "¿Puedo ver estadísticas sobre el rendimiento de mi comercio?",
    answer:
      "Sí, como comerciante, podrás acceder a estadísticas sobre la cantidad de visitas que recibe tu perfil, la interacción de los usuarios con tus publicaciones y eventos, y más.",
  },
  {
    question: "¿Cómo puedo gestionar las reservas o solicitudes de atención en mi comercio?",
    answer:
      "Recibirás notificaciones cuando los usuarios utilicen la función de 'Llamar atención a la mesa'. También puedes gestionar cualquier solicitud de reserva directamente desde tu perfil de comerciante.",
  },
];

export default function Page() {
  return (
    <section className="flex gap-3 flex-col">
      <span className="text-2xl font-bold">Preguntas Frecuentes (FAQ)</span>

      <span className="font-bold mt-5">Usuarios</span>
      <Accordion type="single" collapsible className="w-full">
        {faq_users.map((faq, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <span className="font-bold mt-9">Comercios</span>
      <Accordion type="single" collapsible className="w-full">
        {faq_owners.map((faq, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
