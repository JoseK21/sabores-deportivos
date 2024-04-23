/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import useData from "../hooks/useData";
import { useAdminsStore } from "@/store/adminsStore";

export default function AdminsTable() {
  const { admins } = useAdminsStore();

  const { isLoaded } = useData();

  if (isLoaded) {
    return <DataTable data={admins} searchKey="name" columns={columns} placeholder="Filtro por nombre.." />;
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
