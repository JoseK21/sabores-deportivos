import { BooleanOption, BusinessPlan, BusinessTypes, Countries, UserRole, UserStaffBusinessRole, UserStatus } from "./enum";

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
