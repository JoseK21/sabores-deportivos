"use client";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import useProductsData from "./useProductsData";
import { orderBy } from "lodash";

export default function ProductsTable({ idBusiness }: { idBusiness: string | undefined }) {
  const { products, isLoaded } = useProductsData(idBusiness);

  if (isLoaded) {
    return (
      <DataTable
        searchKey="name"
        columns={columns}
        placeholder="Filtro por nombre.."
        data={orderBy(products, "name")}
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
