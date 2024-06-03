"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { FormDialog } from "./dialog";
import { Prize } from "@/types/prize";
import { useToast } from "@/components/ui/use-toast";
import { useProductTypesStore } from "@/store/qs-admin";
import { AlertModal } from "@/components/quinisports/general/AlertModal";
import { ActionDropdown } from "@/components/quinisports/general/ActionDropdown";
import useProductsData from "../productos/useProductsData";

interface Props {
  data: Prize;
}

export const CellAction: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { toast } = useToast();
  const { productTypes, setData } = useProductTypesStore();
  const { products, isLoaded } = useProductsData(data.idBusiness);

  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`/api/prize/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(productTypes.filter((productType) => productType.id !== id));
    }

    toast({
      duration: 5000,
      variant: "success",
      title: response.isError ? "Premio no eliminado!" : "Premio eliminado!",
      description: response.isError ? `${response?.error?.code}` : `Se eliminó el premio ${response.data.name}`,
    });

    setLoading(false);
  };

  return (
    <>
      <FormDialog
        data={data}
        open={openShow}
        isShowing={true}
        isEdition={false}
        products={products}
        setOpen={setOpenShow}
        idBusiness={data.idBusiness}
      />

      <FormDialog
        isEdition
        data={data}
        open={openEdit}
        isShowing={false}
        products={products}
        setOpen={setOpenEdit}
        idBusiness={data.idBusiness}
      />

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
