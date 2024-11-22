"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Album, Edit, MoreHorizontal, Trash } from "lucide-react";

interface ActionDropdownProps {
  setOpenShow: (arg: boolean) => void;
  setOpenEdit: (arg: boolean) => void;
  setOpenRemove: (arg: boolean) => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({ setOpenShow, setOpenEdit, setOpenRemove }) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setOpenShow(true)}>
          <Album className="mr-2 h-4 w-4" /> Ver
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenEdit(true)}>
          <Edit className="mr-2 h-4 w-4" /> Actualizar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenRemove(true)} className=" text-red-400">
          <Trash className="mr-2 h-4 w-4" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
