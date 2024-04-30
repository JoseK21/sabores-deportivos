"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "company",
    header: "Comercio",
  },
  {
    accessorKey: "role",
    header: "Correo",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    id: "actions",
    header: "Acciones",
    // cell: ({ row }) => <CellAction data={row.original} />,
  },
];
