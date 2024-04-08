"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/user";
import { Album, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { Dialog_ } from "../dialog/dialog";
import { deleteApi } from "@/lib/api";
import { useAdminsStore } from "@/store/adminsStore";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/quinisports/general/AlertModal";

interface Props {
  data: User;
}

export const AdminCell: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { admins, setData } = useAdminsStore();
  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`/api/employee/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(admins.filter((admin) => admin.id !== id));
    }

    toast({
      duration: 7000,
      variant: "success",
      title: response.isError ? "Administrador no eliminado!" : "Administrador eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el administrador ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <Dialog_ open={openShow} setOpen={setOpenShow} data={data} isEdition={false} isShowing={true} />

      <Dialog_ open={openEdit} setOpen={setOpenEdit} data={data} isEdition isShowing={false} />

      <AlertModal
        text="Eliminar"
        loading={loading}
        isOpen={openRemove}
        textLoading="Eliminando.."
        onConfirm={() => onConfirmRemove(data.id)}
        onClose={() => setOpenRemove(false)}
        title={`Estas seguro de remove a ${data.name}?`}
        description="Esta acción no se puede deshacer!"
      />

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
    </>
  );
};
