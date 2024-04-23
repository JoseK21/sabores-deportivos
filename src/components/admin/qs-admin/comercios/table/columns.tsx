"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Business } from "@/types/business";
import { COUNTRIES, BUSINESS_TYPES } from "@/app/constants";

import { Cell_ } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<Business>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const { name, logoUrl } = row.original;

      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src={logoUrl ?? ""} alt={name} className=" object-cover" />
            <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
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
