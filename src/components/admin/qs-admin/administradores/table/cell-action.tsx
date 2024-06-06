"use client";

import { User } from "@/types/user";
import { useState } from "react";
import { AdminsDialog } from "../dialog/dialog";
import { deleteApi } from "@/lib/api";
import { useAdminsStore } from "@/store/qs-admin";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/quinisports/general/AlertModal";
import { useBusinessesStore } from "@/store/qs-admin";
import { ActionDropdown } from "@/components/quinisports/general/ActionDropdown";

interface Props {
  data: User;
}

export const AdminCell: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { businesses } = useBusinessesStore();
  const { admins, setData } = useAdminsStore();
  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`admin/${id}`);

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
      <AdminsDialog
        businesses={businesses}
        open={openShow}
        setOpen={setOpenShow}
        data={data}
        isEdition={false}
        isShowing={true}
      />

      <AdminsDialog
        businesses={businesses}
        open={openEdit}
        setOpen={setOpenEdit}
        data={data}
        isEdition
        isShowing={false}
      />

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

      <ActionDropdown setOpenShow={setOpenShow} setOpenEdit={setOpenEdit} setOpenRemove={setOpenRemove} />
    </>
  );
};
