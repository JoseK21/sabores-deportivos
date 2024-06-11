"use client";

import { ColumnDef } from "@tanstack/react-table";
import { League } from "@/types/league";

import { CellAction } from "./cell-action";

export const columns: ColumnDef<League>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "abbrName",
    header: "Nombre Abreviado",
  },
  {
    id: "sport",
    header: "Deporte",
    cell: ({ row }) => <span>{row.original.Sport?.name || "-"}</span>,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
