"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { RSport } from "@/relatedTypes/sport";

export const columns: ColumnDef<RSport>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "abbrName",
    header: "Nombre Abreviado",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
