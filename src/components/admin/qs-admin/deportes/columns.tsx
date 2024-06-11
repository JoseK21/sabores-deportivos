"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Sport } from "@/types/sport";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<Sport>[] = [
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
