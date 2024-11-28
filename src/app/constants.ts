import { EventStatus } from "@prisma/client";
import {
  BooleanOption,
  BusinessPlan,
  BusinessScheduleStatus,
  BusinessTypes,
  Countries,
  TournamentStatus,
  UserRole,
  UserStaffBusinessRole,
  UserStatus,
} from "./enum";

export const EXCEPT_NUMBER_SYMBOLS = ["e", "E", "+", "-", ".", ","];

export const FULL_USER_ROLES = {
  [UserRole.unknown]: "Desconocido",
  [UserRole.client]: "Cliente",
  [UserRole.master]: "Master",
  [UserRole.admin_rest]: "Administrador",
  [UserRole.cashier_rest]: "Cajero",
  [UserRole.waiter_rest]: "Mesero",
  [UserRole.bartender_rest]: "Bartender",
};

export const ADMIN_ROLES = [{ value: UserRole.admin_rest, label: "Administrador" }];

export const STAFF_REST_ROLES: { [key in UserStaffBusinessRole]: string } = {
  [UserRole.cashier_rest]: "Cajero",
  [UserRole.waiter_rest]: "Mesero",
  [UserRole.bartender_rest]: "Bartender",
};

export const ALLOWER_ROLES_TO_BUSINESS_LOGIC: UserRole[] = [
  UserRole.master,
  UserRole.admin_rest,
  UserRole.cashier_rest,
  UserRole.waiter_rest,
  UserRole.bartender_rest,
];

export const USER_STATUS: { [key in UserStatus]: string } = {
  [UserStatus.actived]: "Activo",
  [UserStatus.unknown]: "Desconocido",
  [UserStatus.suspented]: "Suspendido",
  [UserStatus.deactivated]: "Desactivo",
};

export const BUSINESS_TYPES: { [key in BusinessTypes]: string } = {
  [BusinessTypes.bar]: "Bar",
  [BusinessTypes.cafe]: "Caferia",
  [BusinessTypes.hotel]: "Hotel",
  [BusinessTypes.sportbar]: "SportBar",
  [BusinessTypes.restaurant]: "Restaurante",
  [BusinessTypes.sports_club]: "Club Deportivo",
  [BusinessTypes.bar_restaurant]: "Bar & Restaurante",
  [BusinessTypes.shopping_center]: "Centro Comercial",
  [BusinessTypes.recreation_center]: "Centro Recreativo",
};

export const BUSINESS_PLAN: { [key in BusinessPlan]: string } = {
  [BusinessPlan.basic]: "Basico",
  [BusinessPlan.intermediate]: "Intermedio",
  [BusinessPlan.premium]: "Premium",
};

export const BOOLEAN_OPTIONS: { [key in BooleanOption]: string } = {
  [BooleanOption.true]: "Si",
  [BooleanOption.false]: "No",
};

export const COUNTRIES = [
  { value: Countries.cr, label: "Costa Rica", enabled: true },
  { value: Countries.mx, label: "Mexico", enabled: false },
  { value: Countries.es, label: "España", enabled: false },
];

export const TOURNAMENT_STATUS: { [key in TournamentStatus]: string } = {
  [TournamentStatus.upcoming]: "Próximo",
  [TournamentStatus.ongoing]: "En Curso",
  [TournamentStatus.completed]: "Terminado",
  [TournamentStatus.cancelled]: "Cancelado",
};

export const BUSINESS_SCHEDULE_STATUS: { [key in BusinessScheduleStatus]: { class: string; label: string } } = {
  [BusinessScheduleStatus.to_open]: {
    class: "text-blue-700", // #3d56aa
    label: "Por Abrir",
  },
  [BusinessScheduleStatus.opened]: {
    class: "text-primary-500", // #3daa47
    label: "Abierto",
  },
  [BusinessScheduleStatus.to_close]: {
    class: "text-yellow-700", // #aa7d3d
    label: "Por Cerrar",
  },
  [BusinessScheduleStatus.closed]: {
    class: "text-red-600", // #aa3d3d
    label: "Cerrado",
  },
};

export const EVENT_STATUS: { [key in EventStatus]: string } = {
  [EventStatus.canceled]: "Cancelado",
  [EventStatus.finished]: "Finalizado",
  [EventStatus.incoming]: "Proximamente",
  [EventStatus.live]: "En Vivo",
  [EventStatus.pending]: "Pendiente",
  [EventStatus.postponed]: "Pospuesto",
};

export const SCHEDULE: {
  value: number | null;
  label: string;
}[] = [
  { value: null, label: "-" },
  { value: 0, label: "12:00 am" },
  { value: 30, label: "12:30 am" },
  { value: 60, label: "1:00 am" },
  { value: 90, label: "1:30 am" },
  { value: 120, label: "2:00 am" },
  { value: 150, label: "2:30 am" },
  { value: 180, label: "3:00 am" },
  { value: 210, label: "3:30 am" },
  { value: 240, label: "4:00 am" },
  { value: 270, label: "4:30 am" },
  { value: 300, label: "5:00 am" },
  { value: 330, label: "5:30 am" },
  { value: 360, label: "6:00 am" },
  { value: 390, label: "6:30 am" },
  { value: 420, label: "7:00 am" },
  { value: 450, label: "7:30 am" },
  { value: 480, label: "8:00 am" },
  { value: 510, label: "8:30 am" },
  { value: 540, label: "9:00 am" },
  { value: 570, label: "9:30 am" },
  { value: 600, label: "10:00 am" },
  { value: 630, label: "10:30 am" },
  { value: 660, label: "11:00 am" },
  { value: 690, label: "11:30 am" },
  { value: 720, label: "12:00 md" },
  { value: 750, label: "12:30 pm" },
  { value: 780, label: "1:00 pm" },
  { value: 810, label: "1:30 pm" },
  { value: 840, label: "2:00 pm" },
  { value: 870, label: "2:30 pm" },
  { value: 900, label: "3:00 pm" },
  { value: 930, label: "3:30 pm" },
  { value: 960, label: "4:00 pm" },
  { value: 990, label: "4:30 pm" },
  { value: 1020, label: "5:00 pm" },
  { value: 1050, label: "5:30 pm" },
  { value: 1080, label: "6:00 pm" },
  { value: 1110, label: "6:30 pm" },
  { value: 1140, label: "7:00 pm" },
  { value: 1170, label: "7:30 pm" },
  { value: 1200, label: "8:00 pm" },
  { value: 1230, label: "8:30 pm" },
  { value: 1260, label: "9:00 pm" },
  { value: 1290, label: "9:30 pm" },
  { value: 1320, label: "10:00 pm" },
  { value: 1350, label: "10:30 pm" },
  { value: 1380, label: "11:00 pm" },
  { value: 1410, label: "11:30 pm" },
];

export const ACCESS_HEADER = "sd-access";