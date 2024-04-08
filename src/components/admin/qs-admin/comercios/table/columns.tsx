"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Business } from "@/types/business";
import { COUNTRIES, BUSINESS_TYPES } from "@/app/constants";

import { Cell_ } from "./cell-action";

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const statusLabel = BUSINESS_TYPES.find(({ value }) => value === row.original.type)?.label || "-";

      return <span>{statusLabel}</span>;
    },
  },
  {
    accessorKey: "country",
    header: "País",
    cell: ({ row }) => {
      const statusLabel = COUNTRIES.find(({ value }) => value === row.original.country)?.label || "-";

      return <span>{statusLabel}</span>;
    },
  },
  {
    accessorKey: "address",
    header: "Direccion",
  },
  {
    id: "actions",
    cell: ({ row }) => <Cell_ data={row.original} />,
  },
];
