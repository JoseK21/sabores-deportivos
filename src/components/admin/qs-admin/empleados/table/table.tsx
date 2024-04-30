/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import useEmployersData from "./useEmployersData";
import { useEmployeesStore } from "@/store/employeesStore";
import { orderBy } from "lodash";

export default function EmployerTable({ idBusiness }: { idBusiness: string | undefined }) {
  const { employees } = useEmployeesStore();

  const { isLoaded } = useEmployersData(idBusiness);

  if (isLoaded) {
    return (
      <DataTable
        searchKey="name"
        columns={columns}
        data={orderBy(employees, "name")}
        placeholder="Filtro por nombre.."
      />
    );
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
