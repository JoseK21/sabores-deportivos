"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";

import { CellAction } from "./cell-action";
import { MoveDown, MoveUp } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
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
    accessorKey: "productType",
    header: "Tipo",
    cell: ({ row }) => {
      const { productType } = row.original;

      return <span>{productType?.name || '-'}</span>;
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
