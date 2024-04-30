/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import useAdminUsersData from "./useAdminUsersData";
import { useAdminsStore } from "@/store/qs-admin";
import { orderBy } from "lodash";

export default function AdminsTable() {
  const { admins } = useAdminsStore();

  const { isLoaded } = useAdminUsersData();

  if (isLoaded) {
    return (
      <DataTable searchKey="name" columns={columns} data={orderBy(admins, "name")} placeholder="Filtro por nombre.." />
    );
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
