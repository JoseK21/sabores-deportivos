"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { ProductType } from "@/types/product-type";

export const columns: ColumnDef<ProductType>[] = [
  {
    header: "Nombre",
    accessorKey: "name",
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
