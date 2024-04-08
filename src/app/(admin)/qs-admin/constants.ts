import { UserRole } from "@/app/enum";

export const MENU_BY_ROLE = {
  [UserRole.client]: {
    title: "Cliente",
    items: [],
  },
  [UserRole.admin_rest]: {
    title: "Admin",
    items: [
      { title: "Dashboard", href: "/qs-admin", label: "Dashboard" },
      { title: "Empleados", href: "/qs-admin/empleados", label: "Empleados" },
      { title: "Premios", href: "/qs-admin/premios", label: "Premios" },
    ],
  },
  [UserRole.cashier_rest]: {
    title: "Cajero",
    items: [
      { title: "Dashboard", href: "/qs-admin/dashboaard-cashier", label: "Dashboard" },
      { title: "Premios", href: "/qs-admin/premios", label: "Premios" },
    ],
  },
  [UserRole.waiter_rest]: {
    title: "Mesero",
    items: [{ title: "Premios", href: "/qs-admin/premios", label: "Premios" }],
  },
  [UserRole.bartender_rest]: {
    title: "Bartender",
    items: [{ title: "Premios", href: "/qs-admin/premios", label: "Premios" }],
  },
  [UserRole.master]: {
    title: "Master",
    items: [
      { title: "Dashboard", href: "/qs-admin", label: "Dashboard" },
      { title: "Administradores", href: "/qs-admin/administradores", label: "Administrador" },
      { title: "Comercios", href: "/qs-admin/comercios", label: "Comercio" },
      { title: "Publicidad", href: "/qs-admin/publicidad", label: "Publicidad" },
      // { title: "Contabilidad", href: "/qs-admin/profile", label: "profile" },
    ],
  },
};
