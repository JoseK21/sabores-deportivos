import { format } from "date-fns";
import { es } from "date-fns/locale";

export const DAYS_MAP: { [key: string]: string } = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export function getESDate(date: Date | null | undefined, fallback: string = "N/A") {
  return date ? format(date, "PPP", { locale: es }) : fallback;
}

export function getShortDate(date: Date | null | undefined, fallback: string = "N/A") {
  return date ? format(date, "P", { locale: es }) : fallback;
}

export function getShortDateTime(date: Date | null | undefined, fallback: string = "N/A") {
  return date ? format(date, "dd/MM/yyyy, p", {}) : fallback;
}
