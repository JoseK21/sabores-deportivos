"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { REvent } from "@/relatedTypes/event";

export const columns: ColumnDef<REvent>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
  },
  // {
  //   accessorKey: "enabled",
  //   header: "Estado",
  //   cell: ({ row }) => (
  //     <div className=" flex items-center gap-2">
  //       {row.original.enabled ? (
  //         <MoveUp size={18} className="text-primary-400" />
  //       ) : (
  //         <MoveDown size={18} className="text-red-500" />
  //       )}
  //       <span>{row.original.enabled ? "Habilitado" : "Deshabilitado"}</span>
  //     </div>
  //   ),
  // },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
