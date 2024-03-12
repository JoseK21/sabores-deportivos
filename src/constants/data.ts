import { NavItem, SidebarNavItem } from "@/types/nav-items";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "dell@gmail.com",
    verified: false,
    status: "Activo",
  },
  {
    id: 2,
    name: "José Núñez",
    company: "TechCorp",
    role: "techcorp@gmail.com",
    verified: true,
    status: "Activo",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "webtech@gmail.com",
    verified: true,
    status: "Activo",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "innovate-inc@gmail.com",
    verified: false,
    status: "Inactivo",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "techguru@gmail.com",
    verified: true,
    status: "Activo",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "codegenius@gmail.com",
    verified: false,
    status: "Activo",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "softworks@gmail.com",
    verified: true,
    status: "Activo",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "devcraft@gmail.com",
    verified: false,
    status: "Activo",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "websolutions@gmail.com",
    verified: true,
    status: "Activo",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "datatech@gmail.com",
    verified: false,
    status: "Activo",
  },
];

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
