"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { RLeague } from "@/relatedTypes/league";
import { MoveDown, MoveUp } from "lucide-react";
import { getESDate } from "@/utils/date";

export const columns: ColumnDef<RLeague>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    id: "sport",
    header: "Deporte",
    cell: ({ row }) => <span>{row.original.Sport?.name || "-"}</span>,
  },
  {
    id: "startDate",
    header: "Fecha de Inicio",
    cell: ({ row }) => {
      const startDate = row.original.startDate ? new Date(row.original.startDate) : null;
      return <span>{getESDate(startDate)}</span>;
    },
  },
  {
    id: "endDate",
    header: "Fecha de Cierre",
    cell: ({ row }) => {
      const endDate = row.original.endDate ? new Date(row.original.endDate) : null;
      return <span>{getESDate(endDate)}</span>;
    },
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
