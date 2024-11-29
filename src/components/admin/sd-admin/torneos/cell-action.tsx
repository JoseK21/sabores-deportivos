"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { FormDialog } from "./dialog";
import { useToast } from "@/components/ui/use-toast";
import { useTournamentsStore } from "@/store/sd-admin";
import { AlertModal } from "@/components/saboresdeportivos/general/AlertModal";
import { RTournament } from "@/relatedTypes/tournament";
import { DialogTeams } from "./dialogs/dialogTeams";
import { Button } from "@/components/ui/button";
import { Album, Edit, Hexagon, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

interface Props {
  data: RTournament;
}

export const CellAction: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openTeams, setOpenTeams] = useState(false);

  const { toast } = useToast();
  const { tournaments, setData } = useTournamentsStore();

  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`tournament/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(tournaments.filter((tournament) => tournament.id !== id));
    }

    toast({
      duration: 5000,
      variant: response.isError ? "destructive" : "success",
      title: response.isError ? "Torneo no eliminado!" : "Torneo eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el torneo ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <FormDialog data={data} open={openShow} isShowing={true} isEdition={false} setOpen={setOpenShow} />

      <FormDialog isEdition data={data} open={openEdit} isShowing={false} setOpen={setOpenEdit} />

      <DialogTeams open={openTeams} setOpen={setOpenTeams} data={data} />

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
        setOpenTeams={setOpenTeams}
      />
    </>
  );
};

interface ActionDropdownProps {
  setOpenShow: (arg: boolean) => void;
  setOpenEdit: (arg: boolean) => void;
  setOpenRemove: (arg: boolean) => void;
  setOpenTeams: (arg: boolean) => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({ setOpenShow, setOpenEdit, setOpenRemove, setOpenTeams }) => {
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
        <DropdownMenuItem onClick={() => setOpenTeams(true)}>
          <Hexagon className="mr-2 h-4 w-4" /> Equipos
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenRemove(true)} className=" text-red-400">
          <Trash className="mr-2 h-4 w-4" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
