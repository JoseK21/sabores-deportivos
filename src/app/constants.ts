import { UserRole, UserStatus } from "./enum";

export const QUINISPORTS_URL = "https://wwww.quinisports.com";

export const FULL_USER_ROLES = [
  { value: UserRole.cashier_rest, label: "Cajero" },
  { value: UserRole.waiter_rest, label: "Mesero" },
  { value: UserRole.bartender_rest, label: "Bartender" },
  { value: UserRole.admin_rest, label: "Administrador" },
];

export const ADMIN_ROLES = [{ value: UserRole.admin_rest, label: "Administrador" }];

export const STAFF_REST_ROLES = [
  { value: UserRole.cashier_rest, label: "Cajero" },
  { value: UserRole.waiter_rest, label: "Mesero" },
  { value: UserRole.bartender_rest, label: "Bartender" },
];

export const ALLOWER_ROLES_TO_BUSINESS_LOGIC: UserRole[] = [
  UserRole.master,
  UserRole.admin_rest,
  UserRole.cashier_rest,
  UserRole.waiter_rest,
  UserRole.bartender_rest,
];

export const USER_STATUS = [
  { value: UserStatus.actived, label: "Activo" },
  { value: UserStatus.suspented, label: "Suspendido" },
  { value: UserStatus.deactivated, label: "Desactivo" },
];
