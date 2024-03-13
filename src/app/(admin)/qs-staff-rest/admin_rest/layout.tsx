import Header from "@/components/template/layout/header";
import Sidebar from "@/components/template/layout/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuiniSports | Master",
  description:
    "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
  authors: [{ name: "JDataByte" }],
  keywords:
    "Quinielas deportivas, Pronósticos deportivos, Premios en quinielas, Emoción del deporte, Plataforma deportiva en línea",
  metadataBase: new URL("https://www.quinisports.com"),
  openGraph: {
    type: "website",
    url: "https://wwww.quinisports.com",
    title: "QuiniSports",
    description:
      "¡Experimenta la emoción deportiva con QUINISPORTS! Haz pronósticos, gana premios y disfruta de la pasión del deporte. ¡Únete ahora y vive la adrenalina!",
    siteName: "QuiniSports",
    images: [
      {
        url: "/logo.png",
      },
    ],
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          title="Admin"
          items={[
            {
              title: "Dashboard",
              href: "/qs-staff-rest",
              label: "Dashboard",
            },
            {
              title: "User",
              href: "/qs-staff-rest/user",
              label: "user",
            },
            {
              title: "Employee",
              href: "/qs-staff-rest/employee",
              label: "employee",
            },
            {
              title: "Profile",
              href: "/qs-staff-rest/profile",
              label: "profile",
            },
            {
              title: "Kanban",
              href: "/qs-staff-rest/kanban",
              label: "kanban",
            },
            {
              title: "Login",
              href: "/auth/login",
              label: "login",
            },
          ]}
        />
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
