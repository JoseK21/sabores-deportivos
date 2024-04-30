"use client";

import { User } from "@/types/user";
import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { EmployeeDialog } from "../dialog/dialog";
import { useAdminsStore } from "@/store/qs-admin";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/quinisports/general/AlertModal";
import { ActionDropdown } from "@/components/quinisports/general/ActionDropdown";

interface Props {
  data: User;
}

export const EmployeeCell: React.FC<Props> = ({ data }) => {
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
      <EmployeeDialog open={openShow} setOpen={setOpenShow} data={data} isEdition={false} isShowing={true} />

      <EmployeeDialog open={openEdit} setOpen={setOpenEdit} data={data} isEdition isShowing={false} />

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
