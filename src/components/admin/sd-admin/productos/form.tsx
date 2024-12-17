"use client";

import { z } from "zod";
import { useState } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";

import { Product } from "@/types/product";
import { deleteApi, postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useProductsStore } from "@/store/sd-admin";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, urlToFile } from "@/utils/image";
import FileInputPreview, { SIZES_UNIT } from "@/components/saboresdeportivos/FileInputPreview";
import { ProductType } from "@/types/product-type";
import { useFetchData } from "@/lib/useFetchData";
import { cleanText } from "@/utils/string";
import { PutBlobResult } from "@vercel/blob";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Textarea } from "@/components/ui/textarea";
import Req from "@/components/saboresdeportivos/general/Req";
import { BOOLEAN_OPTIONS } from "@/app/constants";
import { BooleanOption } from "@/app/enum";
import { EXCEPT_SYMBOLS_INPUT_NUMBER } from "@/constants/constants-system";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  price: z.number().optional(),
  enabled: z.boolean().optional(),
  image: z
    .any()
    .refine((file) => file?.size, "Imagen requerida")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "El tamaño max es de  1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  idBusiness: z.string({ required_error: "Comercio requerido" }).min(1, { message: "Comercio requerido" }),
  productTypeId: z
    .string({ required_error: "Tipo de producto requerido" })
    .min(1, { message: "Tipo de producto requerido" }),
  description: z.string().min(10, { message: "La descripción debe ser de mas de 10 caracteres" }),
});

export default function FormData({
  data,
  setOpen,
  isEdition = false,
  idBusiness,
  productTypes = [],
}: {
  data?: Product;
  idBusiness: string;
  isEdition?: boolean;
  productTypes?: ProductType[];
  setOpen: (open: boolean) => void;
}) {
  const { products, setData } = useProductsStore();

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? data || ({} as Product)
      : { name: "", description: "", productTypeId: "", image: "", price: 0, idBusiness, enabled: true },
  });

  useFetchData(async () => {
    if (isEdition && data?.image) {
      urlToFile((data?.image as string) || "")
        .then((file) => {
          form.setValue("image", file);
        })
        .catch((error) => {
          form.setValue("image", null);
        });
    }
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, form.control._defaultValues);

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

        if (dataToEdit?.image) {
          const deletedPhoto = await deleteApi(`images/upload?fileurl=${data?.image as string}`);

          if (deletedPhoto?.isError) {
            toast({
              duration: 7000,
              variant: "warning",
              title: "Error al eliminar la foto anterior!",
              description: "La imagen del producto no se puso eliminar, consulte con soporte",
            });
          }

          const responseImageUpload = await fetch(`/api/images/upload?filename=product-${cleanText(dataForm.name)}`, {
            method: "POST",
            body: dataToEdit.image,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToEdit = { ...dataToEdit, image: newBlob.url ?? "" };
        }

        const response = await putApi(`product/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = products.map((product) => {
            if (product.id === response.data.id) {
              return response.data;
            }

            return product;
          });
          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Producto no actualizado!" : "Producto actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el producto ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const file = dataForm.image;

        const responseImageUpload = await fetch(`/api/images/upload?filename=product-${cleanText(dataForm.name)}`, {
          method: "POST",
          body: file,
        });

        const newBlob = (await responseImageUpload.json()) as PutBlobResult;

        const updateDataForm = { ...dataForm, image: newBlob.url ?? "" };

        const response = await postApi("product", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...products, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Producto no agregado!" : "Nuevo producto agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el producto ${dataForm.name}`,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex items-center flex-col">
          <FormLabel>
            Imagen de Producto <Req />
          </FormLabel>
          <FormField
            name="image"
            control={form.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem className="flex flex-col items-center justify-center my-3">
                  <FormControl>
                    <FileInputPreview
                      name={data?.name}
                      disabled={loading}
                      onChange={onChange}
                      size={SIZES_UNIT.xl}
                      src={form.getValues().image}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre <Req />
                </FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="productTypeId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipo de Producto <Req />
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Selecione un tipo de producto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productTypes.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Precio"
                    {...field}
                    onKeyDown={(e) => EXCEPT_SYMBOLS_INPUT_NUMBER.includes(e.key) && e.preventDefault()}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(parseFloat(e.target.value)));
                    }}
                  />
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
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={field.value ? "true" : "false"}
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

        {/* Agregar Habilitar producto */}
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea disabled={loading} placeholder="Descripción" className="w-full" {...field} maxLength={300} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-4">
          <ButtonLoadingSubmit loading={loading} isEdition={isEdition} />
        </DialogFooter>
      </form>
    </Form>
  );
}
