import { Role } from "@/app/enum";

export const MENU_BY_ROLE = {
  [Role.client]: {
    title: "Cliente",
    items: [],
  },
  [Role.admin_rest]: {
    title: "Admin",
    items: [
      { title: "Dashboard", href: "/qs-admin/dashboaard-admin", label: "Dashboard" },
      { title: "Empleados", href: "/qs-admin/employee", label: "Empleados" },
      { title: "Premios", href: "/qs-admin/prize", label: "Premios" },
    ],
  },
  [Role.cashier_rest]: {
    title: "Cajero",
    items: [
      { title: "Dashboard", href: "/qs-admin/dashboaard-cashier", label: "Dashboard" },
      { title: "Premios", href: "/qs-admin/prize", label: "Premios" },
    ],
  },
  [Role.waiter_rest]: {
    title: "Mesero",
    items: [{ title: "Premios", href: "/qs-admin/prize", label: "Premios" }],
  },
  [Role.bartender_rest]: {
    title: "Bartender",
    items: [{ title: "Premios", href: "/qs-admin/prize", label: "Premios" }],
  },
  [Role.unknowen]: {
    title: "Desconocido",
    items: [],
  },
  [Role.master]: {
    title: "Master",
    items: [
      { title: "Dashboard", href: "/qs-admin/dashboard-master", label: "Dashboard" },
      { title: "Administrador", href: "/qs-admin/admin", label: "Administrador" },
      { title: "Comercio", href: "/qs-admin/business", label: "Comercio" },
      { title: "Publicidad", href: "/qs-admin/publicity", label: "Publicidad" },
      // { title: "Contabilidad", href: "/qs-admin/profile", label: "profile" },
    ],
  },
};
