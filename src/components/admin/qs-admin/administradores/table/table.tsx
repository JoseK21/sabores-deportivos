import { Suspense } from "react";

import { DataTable } from "@/components/ui/data-table";
import { getApi } from "@/lib/api";

import { columns } from "./columns";

export default async function AdminsTable() {
  const data = await getApi("api/admin");

  return (
    <Suspense
      fallback={
        <>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight w-40 animate-pulse h-6 mb-2 bg-slate-300" />
              <p className="text-sm text-muted-foreground w-14 animate-pulse h-4 bg-slate-300"></p>
            </div>
            <div className="w-32 h-10 animate-pulse bg-slate-300" />
          </div>
          <div className="w-full h-96 animate-pulse bg-slate-300" />
        </>
      }
    >
      <DataTable data={data.data} searchKey="name" columns={columns} placeholder="Filtro por nombre.." />
    </Suspense>
  );
}
