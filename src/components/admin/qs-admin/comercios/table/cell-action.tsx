"use client";

import { Business } from "@/types/business";
import { useState } from "react";
import { Dialog_ } from "../dialog/dialog";
import { deleteApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useBusinessStore } from "@/store/businessStore";
import { AlertModal } from "@/components/quinisports/general/AlertModal";
import { ActionDropdown } from "@/components/quinisports/general/ActionDropdown";

interface Props {
  data: Business;
}

export const Cell_: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { businesses, setData } = useBusinessStore();
  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`/api/business/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(businesses.filter((admin) => admin.id !== id));
    }

    toast({
      duration: 7000,
      variant: "success",
      title: response.isError ? "Comercio no eliminado!" : "Comercio eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el comercio ${response.data.name}`,
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
        onClose={() => setOpenRemove(false)}
        onConfirm={() => onConfirmRemove(data.id)}
        title={`Estas seguro de remove a ${data.name}?`}
        description="Esta acción no se puede deshacer!"
      />

      <ActionDropdown setOpenShow={setOpenShow} setOpenEdit={setOpenEdit} setOpenRemove={setOpenRemove} />
    </>
  );
};
