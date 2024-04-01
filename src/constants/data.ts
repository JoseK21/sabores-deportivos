import { NavItem } from "@/types/nav-items";

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/master",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/master/user",
    label: "user",
  },
  {
    title: "Employee",
    href: "/master/employee",
    label: "employee",
  },
  {
    title: "Profile",
    href: "/master/profile",
    label: "profile",
  },
  {
    title: "Kanban",
    href: "/master/kanban",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/auth/login",
    label: "login",
  },
];
