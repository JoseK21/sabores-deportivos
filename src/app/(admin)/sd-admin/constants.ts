import { UserRole } from "@/app/enum";
import { Award, Beef, Component, Gift, LandPlot, LayoutDashboard, Store, Trophy, User, Users, UserSquare } from "lucide-react";

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
      { title: "Dashboard", icon: LayoutDashboard, href: "/sd-admin" },
      { title: "Comercio", icon: Store, href: "/sd-admin/comercio" },
      { title: "Empleados", icon: Users, href: "/sd-admin/empleados" },
      { title: "Productos", icon: Beef, href: "/sd-admin/productos" },
      { title: "Premios", icon: Gift, href: "/sd-admin/premios" },
    ],
  },
  [UserRole.cashier_rest]: {
    title: "Cajero",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/sd-admin/dashboaard-cashier" },
      { title: "Premios", icon: Gift, href: "/sd-admin/premios" },
    ],
  },
  [UserRole.waiter_rest]: {
    title: "Mesero",
    items: [{ title: "Premios", icon: Gift, href: "/sd-admin/premios" }],
  },
  [UserRole.bartender_rest]: {
    title: "Bartender",
    items: [{ title: "Premios", icon: Gift, href: "/sd-admin/premios" }],
  },
  [UserRole.master]: {
    title: "Master",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, href: "/sd-admin" },
      { title: "Administradores", icon: Users, href: "/sd-admin/administradores" },
      { title: "Comercios", icon: Store, href: "/sd-admin/comercios" },
      { title: "Tipos de Productos", icon: LayoutDashboard, href: "/sd-admin/tipos-de-productos" },
      { title: "Equipos", icon: UserSquare , href: "/sd-admin/equipos" },
      { title: "Eventos", icon: LandPlot, href: "/sd-admin/eventos" },
      { title: "Torneos", icon: Trophy, href: "/sd-admin/torneos" },
      { title: "Ligas", icon: Component, href: "/sd-admin/ligas" },
      { title: "Deportes", icon: Award, href: "/sd-admin/deportes" },
      // { title: "Publicidad", icon: LayoutDashboard, href: "/sd-admin/publicidad", label: "Publicidad" },
      // { title: "Contabilidad", icon: LayoutDashboard, href: "/sd-admin/profile", label: "profile" },
    ],
  },
};
