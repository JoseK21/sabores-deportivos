"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { Dialog_ } from "../dialog/dialog";
import { Business } from "@/types/business";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useBusinessesStore } from "@/store/sd-admin";
import { DialogConfig } from "../dialog/dialogConfig";
import { AlertModal } from "@/components/saboresdeportivos/general/AlertModal";
import { Album, Edit, MoreHorizontal, Settings, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface Props {
  data: Business;
}

export const Cell_: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openConfig, setOpenConfig] = useState(false);

  const { toast } = useToast();
  const { businesses, setData } = useBusinessesStore();
  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`business/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(businesses.filter((admin) => admin.id !== id));
    }

    toast({
      duration: 7000,
      variant: response.isError ? "destructive" : "success",
      title: response.isError ? "Comercio no eliminado!" : "Comercio eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el comercio ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <Dialog_ open={openShow} setOpen={setOpenShow} data={data} isEdition={false} isShowing={true} />

      <Dialog_ open={openEdit} setOpen={setOpenEdit} data={data} isEdition isShowing={false} />

      <DialogConfig open={openConfig} setOpen={setOpenConfig} data={data} />

      <AlertModal
        text="Eliminar"
        loading={loading}
        isOpen={openRemove}
        textLoading="Eliminando.."
        onClose={() => setOpenRemove(false)}
        onConfirm={() => onConfirmRemove(data.id)}
        title={`Estas seguro de remove a ${data.name}?`}
        description="Esta acción no se puede deshacer!"
      />

      <ActionDropdown
        setOpenShow={setOpenShow}
        setOpenEdit={setOpenEdit}
        setOpenRemove={setOpenRemove}
        setOpenConfig={setOpenConfig}
      />
    </>
  );
};

interface ActionDropdownProps {
  setOpenShow: (arg: boolean) => void;
  setOpenEdit: (arg: boolean) => void;
  setOpenRemove: (arg: boolean) => void;
  setOpenConfig: (arg: boolean) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ setOpenShow, setOpenEdit, setOpenRemove, setOpenConfig }) => {
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
        <DropdownMenuItem onClick={() => setOpenConfig(true)}>
          <Settings className="mr-2 h-4 w-4" /> Configuración
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenRemove(true)} className=" text-red-400">
          <Trash className="mr-2 h-4 w-4" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
