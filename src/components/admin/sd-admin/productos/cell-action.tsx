"use client";

import { useState } from "react";
import { deleteApi } from "@/lib/api";
import { FormDialog } from "./dialog";
import { useAdminsStore, useProductsStore } from "@/store/sd-admin";
import { useToast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/saboresdeportivos/general/AlertModal";
import { ActionDropdown } from "@/components/saboresdeportivos/general/ActionDropdown";
import { Product } from "@/types/product";
import useData from "../tipos-de-productos/useData";

interface Props {
  data: Product;
}
export const CellAction: React.FC<Props> = ({ data }) => {
  const [openShow, setOpenShow] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const { productTypes } = useData();

  const { toast } = useToast();
  const { products, setData } = useProductsStore();
  const [loading, setLoading] = useState(false);

  const onConfirmRemove = async (id: string) => {
    setLoading(true);

    const response = await deleteApi(`product/${id}`);

    setOpenRemove(response.isError);

    if (response.data) {
      setData(products.filter((product) => product.id !== id));
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
      <FormDialog idBusiness={data.idBusiness} open={openShow} setOpen={setOpenShow} data={data} isEdition={false} isShowing={true} productTypes={productTypes} />

      <FormDialog idBusiness={data.idBusiness} open={openEdit} setOpen={setOpenEdit} data={data} isEdition isShowing={false} productTypes={productTypes} />

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
