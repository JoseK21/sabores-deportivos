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

export function getESDate(endDate: Date | null | undefined, fallback: string = "N/A") {
  return endDate ? format(endDate, "PPP", { locale: es }) : fallback;
}
