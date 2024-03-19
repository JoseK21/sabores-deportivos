import BreadCrumb from "@/components/template/breadcrumb";
import { AdminForm } from "@/components/template/forms/admin-form";
import React from "react";

export default function Page() {
  const breadcrumbItems = [
    { title: "Administradores", link: "qs-staff-rest/admin" },
    { title: "Crear", link: "qs-staff-rest/admin/create" },
  ];
  return (
    <div className="flex-1 space-y-4 p-8">
      <BreadCrumb items={breadcrumbItems} />
      <AdminForm initialData={null} key={null} />
    </div>
  );
}
