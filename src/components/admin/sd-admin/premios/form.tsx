"use client";

import { z } from "zod";
import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { Prize } from "@/types/prize";
import { useForm } from "react-hook-form";
import { Product } from "@/types/product";
import { BooleanOption } from "@/app/enum";
import { postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getObjectDiff } from "@/utils/object";
import { Button } from "@/components/ui/button";
import { BOOLEAN_OPTIONS } from "@/app/constants";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { usePrizesStore, useProductTypesStore } from "@/store/sd-admin";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  idBusiness: z.string({ required_error: "Comercio requerido" }).min(1, { message: "Comercio requerido" }),
  description: z.string().nullable().optional(),
  points: z.number().min(1, { message: "Los Puntos deben ser mayor a 1" }),
  enabled: z.boolean().optional(),
});

function StatusList({
  setOpen,
  products,
  addProduct,
}: {
  products: Product[] | undefined;
  setOpen: (open: boolean) => void;
  addProduct: (product: Product | undefined) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filtro..." />
      <CommandList>
        <CommandEmpty>Sin resultados</CommandEmpty>
        <CommandGroup>
          {(products || []).map((status) => (
            <CommandItem
              key={status.id}
              value={status.id}
              onSelect={(value) => {
                addProduct((products || []).find((priority) => priority.id === value) || undefined);
                setOpen(false);
              }}
            >
              {status.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default function FormData({
  data,
  setOpen,
  products,
  idBusiness,
  isEdition = false,
}: {
  data?: Prize;
  products?: Product[];
  idBusiness: string;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { prizes, setData } = usePrizesStore();

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? { ...data, idBusiness } || ({} as Prize)
      : { name: "", idBusiness, points: 0, enabled: true },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data?.ProductPrize?.length) {
      setCurrentProducts(data?.ProductPrize.map(({ product }) => product));
    }
  }, [data?.ProductPrize]);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, data ?? ({} as Prize), ["id"]);

        if (isEmpty(dataToEdit)) {
          setLoading(false);

          toast({
            duration: 3000,
            variant: "info",
            title: "Sin cambios!",
            description: "No ha nuevos datos por actualizar",
          });

          return 0;
        }

        // Validar cambios de id de productos, agregar y eliminar
        //  considera hacer el proceso por cada producto
        //  para esto necesito primero tener el premio en db

        const response = await putApi(`prize/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = prizes.map((employee) => {
            if (employee.id === response.data.id) {
              return response.data;
            }

            return employee;
          });
          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Premio no actualizado!" : "Premio actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el premio ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const updateDataForm = dataForm;

        const response = await postApi("prize", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          if (currentProducts.length > 0) {
            const responsePrizeProduct = await postApi("prize_products", {
              idPrize: response.data["id"],
              productIds: currentProducts.map((product) => product.id),
            });

            if (responsePrizeProduct.data) {
              toast({
                duration: 5000,
                variant: responsePrizeProduct.isError ? "destructive" : "success",
                title: responsePrizeProduct.isError ? "Productos no agregados!" : "Productos agregados!",
                description: responsePrizeProduct.isError
                  ? "Hubo un error interno en el servidor"
                  : `Se agregaron los productos al premio`,
              });
            }
          }

          setData([...prizes, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Premio no agregado!" : "Nuevo Premio agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el premio ${dataForm.name}`,
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.error("🚀 >>  onSubmit >>  error:", error);
      setLoading(false);
      toast({
        duration: 7000,
        variant: "destructive",
        title: "Hubo un error! por favor contactar con soporte",
        description: "Error desconocido",
      });
    }
  }

  const addProduct = useCallback(
    (newProduct: Product | undefined) => {
      if (newProduct) {
        const auxProduct: Product[] = currentProducts;
        auxProduct.push(newProduct);

        setCurrentProducts(auxProduct);
      }
    },
    [currentProducts]
  );

  const removeProduct = useCallback(
    (index: number) => {
      setCurrentProducts(currentProducts.filter((_, currentIndex) => index !== currentIndex));
    },
    [currentProducts]
  );

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="points"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puntos Requeridos</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      placeholder="Puntos Requeridos"
                      {...field}
                      value={field.value} // Asegurarse de que el valor sea un número
                      onChange={(e) => {
                        field.onChange(Number(parseFloat(e.target.value))); // Actualizar el valor del campo con el número
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Descripción" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="enabled"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilitado</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")} // Convertir la cadena 'true' a true y 'false' a false
                    defaultValue=""
                  >
                    <FormControl>
                      <SelectTrigger disabled={loading}>
                        <SelectValue placeholder="Habilitado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(BOOLEAN_OPTIONS).map((key) => (
                        <SelectItem key={key} value={key}>
                          {BOOLEAN_OPTIONS[key as BooleanOption]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name="products"
            render={() => (
              <FormItem>
                <FormLabel className=" mr-1">Productos</FormLabel>
                <FormControl className="flex items-center">
                  <Popover open={openProducts} onOpenChange={setOpenProducts}>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        type="button"
                        variant="outline"
                        disabled={loading}
                        className=" w-6 h-6 m-0 bg-primary-50"
                      >
                        +
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[244px] p-0" align="start">
                      <StatusList setOpen={setOpenProducts} addProduct={addProduct} products={products} />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <div className="flex flex-wrap gap-2 ">
                  {currentProducts.length === 0 && <span className=" text-sm text-gray-400 pl-3">Sin Productos</span>}
                  {currentProducts.map((product, index) => (
                    <Badge key={`${index}-${product.id}`} variant="outline" className=" bg-slate-100">
                      {product.name}
                      <span
                        className=" text-red-700 ml-2 font-bold cursor-pointer"
                        onClick={() => removeProduct(index)}
                      >
                        x
                      </span>
                    </Badge>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <ButtonLoadingSubmit loading={loading} isEdition={isEdition} />
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
