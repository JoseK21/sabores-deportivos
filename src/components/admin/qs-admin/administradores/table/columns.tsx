"use client";

import { AdminCell } from "./cell-action";

import { User } from "@/types/user";
import { USER_STATUS } from "@/app/constants";
import { ColumnDef } from "@tanstack/react-table";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const { name, image } = row.original;

      return (
        <div className="flex flex-row gap-2 items-center">
          <Avatar>
            <AvatarImage src={image ?? ""} alt={name} className=" object-cover" />
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
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const statusLabel = USER_STATUS[row.original.status] || "-";

      return <span>{statusLabel}</span>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => <AdminCell data={row.original} />,
  },
];
