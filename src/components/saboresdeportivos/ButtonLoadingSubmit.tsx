"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const _getLabelBottom = (loading: boolean, isEdition: boolean) => {
  if (isEdition) {
    return loading ? "Actualizando.." : "Actualizar";
  } else {
    return loading ? "Creando.." : "Guardar";
  }
};

const ButtonLoadingSubmit = ({ loading, isEdition }: { loading: boolean; isEdition: boolean }) => {
  return (
    <Button type="submit" disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {_getLabelBottom(loading, isEdition)}
    </Button>
  );
};

export const CustomButtonLoadingSubmit = ({
  text,
  textLoading,
  textEdit,
  textLoadingEdit,
  loading,
  isEdition,
}: {
  text: string;
  textLoading: string;
  textEdit: string;
  textLoadingEdit: string;
  loading: boolean;
  isEdition: boolean;
}) => {
  return (
    <Button type="submit" disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isEdition ? (loading ? textLoadingEdit : textEdit) : (loading ? textLoading : text)}
    </Button>
  );
};

export default ButtonLoadingSubmit;
