import {
  BooleanOption,
  BusinessPlan,
  BusinessTypes,
  Countries,
  UserRole,
  UserStaffBusinessRole,
  UserStatus,
} from "./enum";

export const QUINISPORTS_URL = "https://wwww.quinisports.com";

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

export const SCHEDULE: {
  value: number;
  label: string;
}[] = [
  { value: 0, label: "12:00 am" },
  { value: 50, label: "12:30 am" },
  { value: 100, label: "1:00 am" },
  { value: 150, label: "1:30 am" },
  { value: 200, label: "2:00 am" },
  { value: 250, label: "2:30 am" },
  { value: 300, label: "3:00 am" },
  { value: 350, label: "3:30 am" },
  { value: 400, label: "4:00 am" },
  { value: 450, label: "4:30 am" },
  { value: 500, label: "5:00 am" },
  { value: 550, label: "5:30 am" },
  { value: 600, label: "6:00 am" },
  { value: 650, label: "6:30 am" },
  { value: 700, label: "7:00 am" },
  { value: 750, label: "7:30 am" },
  { value: 800, label: "8:00 am" },
  { value: 850, label: "8:30 am" },
  { value: 900, label: "9:00 am" },
  { value: 950, label: "9:30 am" },
  { value: 1000, label: "10:00 am" },
  { value: 1050, label: "10:30 am" },
  { value: 1100, label: "11:00 am" },
  { value: 1150, label: "11:30 am" },
  { value: 1200, label: "12:00 md" },
  { value: 1250, label: "12:30 pm" },
  { value: 1300, label: "1:00 pm" },
  { value: 1350, label: "1:30 pm" },
  { value: 1400, label: "2:00 pm" },
  { value: 1450, label: "2:30 pm" },
  { value: 1500, label: "3:00 pm" },
  { value: 1550, label: "3:30 pm" },
  { value: 1600, label: "4:00 pm" },
  { value: 1650, label: "4:30 pm" },
  { value: 1700, label: "5:00 pm" },
  { value: 1750, label: "5:30 pm" },
  { value: 1800, label: "6:00 pm" },
  { value: 1850, label: "6:30 pm" },
  { value: 1900, label: "7:00 pm" },
  { value: 1950, label: "7:30 pm" },
  { value: 2000, label: "8:00 pm" },
  { value: 2050, label: "8:30 pm" },
  { value: 2100, label: "9:00 pm" },
  { value: 2150, label: "9:30 pm" },
  { value: 2200, label: "10:00 pm" },
  { value: 2250, label: "10:30 pm" },
  { value: 2300, label: "11:00 pm" },
  { value: 2350, label: "11:30 pm" },
  // 2359 -> 2359
  // 2400 -> 0
];