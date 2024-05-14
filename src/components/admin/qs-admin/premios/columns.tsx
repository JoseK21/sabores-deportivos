"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Prize } from "@/types/prize";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<Prize>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
