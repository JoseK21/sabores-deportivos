import { UserRole } from "@/app/enum";

export const MENU_BY_ROLE = {
  [UserRole.unknown]: {
    title: "-",
    items: [],
  },
  [UserRole.client]: {
    title: "Cliente",
    items: [],
  },
  [UserRole.admin_rest]: {
    title: "Admin",
    items: [
      { title: "Dashboard", href: "/qs-admin" },
      { title: "Comercio", href: "/qs-admin/comercio" },
      { title: "Empleados", href: "/qs-admin/empleados" },
      { title: "Productos", href: "/qs-admin/productos" },
      { title: "Premios", href: "/qs-admin/premios" },
    ],
  },
  [UserRole.cashier_rest]: {
    title: "Cajero",
    items: [
      { title: "Dashboard", href: "/qs-admin/dashboaard-cashier" },
      { title: "Premios", href: "/qs-admin/premios" },
    ],
  },
  [UserRole.waiter_rest]: {
    title: "Mesero",
    items: [{ title: "Premios", href: "/qs-admin/premios" }],
  },
  [UserRole.bartender_rest]: {
    title: "Bartender",
    items: [{ title: "Premios", href: "/qs-admin/premios" }],
  },
  [UserRole.master]: {
    title: "Master",
    items: [
      { title: "Dashboard", href: "/qs-admin" },
      { title: "Administradores", href: "/qs-admin/administradores" },
      { title: "Comercios", href: "/qs-admin/comercios" },
      { title: "Tipos de Productos", href: "/qs-admin/tipos-de-productos" },
      // { title: "Publicidad", href: "/qs-admin/publicidad", label: "Publicidad" },
      // { title: "Contabilidad", href: "/qs-admin/profile", label: "profile" },
    ],
  },
};
