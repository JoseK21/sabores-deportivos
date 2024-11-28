"use client";

import useEventData from "../../../../hooks/useEventsData";
import { orderBy } from "lodash";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function EventsTable() {
  const { isLoaded, events } = useEventData();

  if (isLoaded) {
    return (
      <DataTable searchKey="title" columns={columns} placeholder="Filtro por nombre.." data={orderBy(events, "title")} />
    );
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
