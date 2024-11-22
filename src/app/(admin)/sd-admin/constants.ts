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
      { title: "Dashboard", href: "/sd-admin" },
      { title: "Comercio", href: "/sd-admin/comercio" },
      { title: "Empleados", href: "/sd-admin/empleados" },
      { title: "Productos", href: "/sd-admin/productos" },
      { title: "Premios", href: "/sd-admin/premios" },
    ],
  },
  [UserRole.cashier_rest]: {
    title: "Cajero",
    items: [
      { title: "Dashboard", href: "/sd-admin/dashboaard-cashier" },
      { title: "Premios", href: "/sd-admin/premios" },
    ],
  },
  [UserRole.waiter_rest]: {
    title: "Mesero",
    items: [{ title: "Premios", href: "/sd-admin/premios" }],
  },
  [UserRole.bartender_rest]: {
    title: "Bartender",
    items: [{ title: "Premios", href: "/sd-admin/premios" }],
  },
  [UserRole.master]: {
    title: "Master",
    items: [
      { title: "Dashboard", href: "/sd-admin" },
      { title: "Administradores", href: "/sd-admin/administradores" },
      { title: "Comercios", href: "/sd-admin/comercios" },
      { title: "Tipos de Productos", href: "/sd-admin/tipos-de-productos" },
      { title: "Deportes", href: "/sd-admin/deportes" },
      { title: "Ligas", href: "/sd-admin/ligas" },
      { title: "Torneos", href: "/sd-admin/torneos" },
      // { title: "Publicidad", href: "/sd-admin/publicidad", label: "Publicidad" },
      // { title: "Contabilidad", href: "/sd-admin/profile", label: "profile" },
    ],
  },
};
