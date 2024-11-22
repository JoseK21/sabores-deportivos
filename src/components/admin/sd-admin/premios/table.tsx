"use client";

import useData from "./useData";
import { orderBy } from "lodash";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function PrizeTable({ idBusiness }: { idBusiness: string | undefined }) {
  const { isLoaded, prizes } = useData(idBusiness);

  if (isLoaded) {
    return (
      <DataTable searchKey="name" columns={columns} placeholder="Filtro por nombre.." data={orderBy(prizes, "name")} />
    );
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
