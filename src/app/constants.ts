import { Role } from "./enum";

export const QUINISPORTS_URL = "https://wwww.quinisports.com";

export const ROLES = [
  { value: Role.client, label: "Cliente" },
  { value: Role.admin_rest, label: "Administrador" },
  { value: Role.cashier_rest, label: "Cajero" },
  { value: Role.waiter_rest, label: "Mesero" },
  { value: Role.bartender_rest, label: "Bartender" },
];
