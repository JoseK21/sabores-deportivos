import { EventStatus } from "@/app/enum";

const eventStatus = EventStatus.incoming;
const todayTime = 810;
const eventStartTime = 870;

const LIMIT_MINUTES = 60;

export const getEventCardBetStarus = () => {
  // Se debe validar que sea del dia de hoy, con fecha en UTC

  if (eventStatus == EventStatus.incoming) {
    if (eventStartTime - todayTime < LIMIT_MINUTES) {
      return "Permitido para pronosticar";
    }

    return "No permitido para pronosticar, debe esperar al menos a las ${eventStartTime - LIMIT_MINUTES} para pronosticar!";
  } else if (eventStatus == EventStatus.live) {
    return "Ya no se permite hacer pronosticos";
  } else if (eventStatus == EventStatus.canceled) {
    return "No se permite hacer pronosticos";
  } else if (eventStatus == EventStatus.finished) {
    return "Ya no se permite hacer pronosticos";
  } else if (eventStatus == EventStatus.postponed) {
    return "No se permite hacer pronosticos";
  }

  return "No se permite hacer pronosticos";
};
