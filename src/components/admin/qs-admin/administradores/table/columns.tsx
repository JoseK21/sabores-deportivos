"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "@/components/template/tables/user-tables/cell-action";

import { User } from "@/types/user";
import { USER_STATUS } from "@/app/constants";
import { AdminCell } from "./cell-action";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Correo",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const statusLabel = USER_STATUS.find(({ value }) => value === row.original.status)?.label || "-";

      return <span>{statusLabel}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <AdminCell data={row.original} />,
  },
];
