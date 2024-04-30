"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { FormDialog } from "./dialog";
import { useAdminsStore, useProductTypesStore } from "@/store/qs-admin";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/quinisports/general/AlertModal";
import { ActionDropdown } from "@/components/quinisports/general/ActionDropdown";
import { ProductType } from "@/types/product-type";

interface Props {
  data: ProductType;
}

export const CellAction: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { productTypes, setData } = useProductTypesStore();
  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`/api/product-type/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(productTypes.filter((productType) => productType.id !== id));
    }

    toast({
      duration: 5000,
      variant: "success",
      title: response.isError ? "Tipo de Producto no eliminado!" : "Tipo de Producto eliminado!",
      description: response.isError
        ? `${response?.error?.code}`
        : `Se eliminó el tipo de producto ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <FormDialog open={openShow} setOpen={setOpenShow} data={data} isEdition={false} isShowing={true} />

      <FormDialog open={openEdit} setOpen={setOpenEdit} data={data} isEdition isShowing={false} />

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
