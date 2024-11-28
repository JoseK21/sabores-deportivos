"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { FormDialog } from "./dialog";
import { useToast } from "@/components/ui/use-toast";
import { useEventsStore } from "@/store/sd-admin";
import { AlertModal } from "@/components/saboresdeportivos/general/AlertModal";
import { ActionDropdown } from "@/components/saboresdeportivos/general/ActionDropdown";
import { REvent } from "@/relatedTypes/event";

interface Props {
  data: REvent;
}

export const CellAction: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { events, setData } = useEventsStore();

  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`event/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(events.filter((event) => event.id !== id));
    }

    toast({
      duration: 5000,
      variant: "success",
      title: response.isError ? "Evento no eliminado!" : "Evento eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el evento ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <FormDialog data={data} open={openShow} isShowing={true} isEdition={false} setOpen={setOpenShow} />

      <FormDialog isEdition data={data} open={openEdit} isShowing={false} setOpen={setOpenEdit} />

      <AlertModal
        text="Eliminar"
        loading={loading}
        isOpen={openRemove}
        textLoading="Eliminando.."
        onClose={() => setOpenRemove(false)}
        onConfirm={() => onConfirmRemove(data.id)}
        title={`Estas seguro de remove a ${`${`${data.title} `.trim() || ""}${data.homeTeam?.name || '-'} vs ${data.awayTeam?.name || '-'}`}?`}
        description="Esta acción no se puede deshacer!"
      />

      <ActionDropdown setOpenShow={setOpenShow} setOpenEdit={setOpenEdit} setOpenRemove={setOpenRemove} />
    </>
  );
};
