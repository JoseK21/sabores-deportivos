"use client";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import useBusinessData from "./useBusinessData";
import { useBusinessStore } from "@/store/businessStore";

export default function BusinessTable() {
  const { businesses } = useBusinessStore();

  const { isLoaded } = useBusinessData();

  if (isLoaded) {
    return <DataTable data={businesses} searchKey="name" columns={columns} placeholder="Filtro por nombre.." />;
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
