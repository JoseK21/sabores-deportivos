"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Cell_ } from "./cell-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RTeam } from "@/relatedTypes/team";

export const columns: ColumnDef<RTeam>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const { name, logoUrl } = row.original;

      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src={logoUrl ?? ""} alt={name} className=" object-cover" />
            <AvatarFallback className="bg-slate-300 w-full h-full flex items-center justify-center">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "shortName",
    header: "Nombre Corto",
    cell: ({ row }) => <span>{row.original.shortName ?? "-"}</span>,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <Cell_ data={row.original} />,
  },
];
