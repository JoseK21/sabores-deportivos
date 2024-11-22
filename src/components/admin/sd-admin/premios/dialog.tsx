import FormData from "./form";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Prize } from "@/types/prize";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/product";

interface Props {
  data?: Prize;
  open: boolean;
  isEdition: boolean;
  isShowing: boolean;
  products: Product[];
  idBusiness: string;
  setOpen: (open: boolean) => void;
}

export const FormDialog = ({ open, setOpen, data, isEdition, products, idBusiness, isShowing = false }: Props) => {
  if (isShowing) {
    const { name, points, enabled } = data || ({} as Prize);

    const products = data?.ProductPrize || [];

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Premio</DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-4">
            <div className=" rounded-sm bg-slate-100 p-2 flex flex-col flex-1">
              <span>
                <strong>Nombre:</strong> {name}
              </span>
              <span>
                <strong>Puntos:</strong> {points}
              </span>
              <span>
                <strong>Estado:</strong> {enabled ? "Habilitado" : "Deshabilitado"}
              </span>
              <span>
                <strong>Productos:</strong>
              </span>
              <div className=" flex gap-2 flex-wrap flex-row bg-white rounded-md">
                {products.map(
                  ({ product }, i) =>
                    product && (
                      <div key={i} className="flex gap-2 flex-col justify-center items-center p-3 text-center max-w-24">
                        <div className=" w-14 h-14 relative rounded-sm">
                          <Image fill alt="" src={product.image} />
                        </div>

                        <span>{product.name}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEdition && (
        <DialogTrigger asChild>
          <Button className="text-xs md:text-sm">
            <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEdition ? "Edición de Premio" : "Nuevo Premio"}</DialogTitle>
        </DialogHeader>
        <FormData setOpen={setOpen} isEdition={isEdition} data={data} products={products} idBusiness={idBusiness} />
      </DialogContent>
    </Dialog>
  );
};
