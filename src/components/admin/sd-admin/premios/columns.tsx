"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Prize } from "@/types/prize";

import { CellAction } from "./cell-action";
import { MoveDown, MoveUp } from "lucide-react";

export const columns: ColumnDef<Prize>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "points",
    header: "Puntos",
  },
  {
    accessorKey: "enabled",
    header: "Estado",
    cell: ({ row }) => (
      <div className=" flex items-center gap-2">
        {row.original.enabled ? (
          <MoveUp size={18} className="text-primary-400" />
        ) : (
          <MoveDown size={18} className="text-red-500" />
        )}
        <span>{row.original.enabled ? "Habilitado" : "Deshabilitado"}</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
