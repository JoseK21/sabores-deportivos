import { Role } from "@/app/enum";

export const MENU_BY_ROLE = {
  [Role.admin_rest]: {
    title: "Admin",
    items: [
      { title: "Dashboard", href: "/qs-staff-rest/dashboaard-admin", label: "Dashboard" },
      { title: "Empleados", href: "/qs-staff-rest/employee", label: "Empleados" },
      { title: "Premios", href: "/qs-staff-rest/prize", label: "Premios" },
    ],
  },
  [Role.cashier_rest]: {
    title: "Cajero",
    items: [
      { title: "Dashboard", href: "/qs-staff-rest/dashboaard-cashier", label: "Dashboard" },
      { title: "Premios", href: "/qs-staff-rest/prize", label: "Premios" },
    ],
  },
  [Role.waiter_rest]: {
    title: "Mesero",
    items: [{ title: "Premios", href: "/qs-staff-rest/prize", label: "Premios" }],
  },
  [Role.bartender_rest]: {
    title: "Bartender",
    items: [{ title: "Premios", href: "/qs-staff-rest/prize", label: "Premios" }],
  },
  [Role.unknowen]: {
    title: "Desconocido",
    items: [],
  },
  [Role.master]: {
    title: "Master",
    items: [
      { title: "Dashboard", href: "/qs-staff-rest/dashboard-master", label: "Dashboard" },
      { title: "Administrador", href: "/qs-staff-rest/admin", label: "Administrador" },
      { title: "Comercio", href: "/qs-staff-rest/business", label: "Comercio" },
      { title: "Publicidad", href: "/qs-staff-rest/publicity", label: "Publicidad" },
      // { title: "Contabilidad", href: "/qs-staff-rest/profile", label: "profile" },
    ],
  },
};
