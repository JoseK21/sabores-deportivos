"use client";

import { z } from "zod";
import { useState } from "react";
import { isEmpty } from "lodash";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Product } from "@/types/product";
import { deleteApi, postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { Button } from "@/components/ui/button";
import { useProductsStore } from "@/store/qs-admin";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, urlToFile } from "@/utils/image";
import FileInputPreview, { SIZES_UNIT } from "@/components/quinisports/FileInputPreview";
import { ProductType } from "@/types/product-type";
import { useFetchData } from "@/hooks/useFetchData";
import { cleanText } from "@/utils/string";
import { PutBlobResult } from "@vercel/blob";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function mapErrorCode(code: string): string {
  switch (code) {
    case "P2002":
      return "Hubo un error, el email ya se encuentra registrado en el sistema";
    default:
      return "Hubo un error interno en el servidor";
  }
}

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
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

const _getLabelBottom = (loading: boolean, isEdition: boolean) => {
  if (isEdition) {
    return loading ? "Actualizando.." : "Actualizar";
  } else {
    return loading ? "Creando.." : "Guardar";
  }
};

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
    defaultValues: isEdition ? data || ({} as Product) : { name: "", idBusiness },
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

  // add image logic
  // async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
  //   try {
  //     setLoading(true);

  //     if (isEdition) {
  //       let dataToEdit = getObjectDiff(dataForm, data ?? ({} as Product), ["id"]);

  //       if (isEmpty(dataToEdit)) {
  //         setLoading(false);

  //         toast({
  //           duration: 3000,
  //           variant: "info",
  //           title: "Sin cambios!",
  //           description: "No ha nuevos datos por actualizar",
  //         });

  //         return 0;
  //       }

  //       const response = await putApi(`/api/product/${dataForm.id}`, dataToEdit);

  //       setOpen(response.isError);

  //       if (response.data) {
  //         const updateData = products.map((employee) => {
  //           if (employee.id === response.data.id) {
  //             return response.data;
  //           }

  //           return employee;
  //         });
  //         setData(updateData);
  //       }

  //       toast({
  //         duration: 5000,
  //         variant: response.isError ? "destructive" : "success",
  //         title: response.isError ? "Producto no actualizado!" : "Producto actualizado!",
  //         description: response.isError
  //           ? `${mapErrorCode(response?.error?.code)}`
  //           : `Se actualizó el producto ${dataForm.name}`,
  //       });
  //       setLoading(false);
  //     } else {
  //       const updateDataForm = dataForm;

  //       const response = await postApi("/api/product", updateDataForm);

  //       setOpen(response.isError);

  //       if (response.data) {
  //         setData([...products, response.data]);
  //       }

  //       toast({
  //         duration: 5000,
  //         variant: response.isError ? "destructive" : "success",
  //         title: response.isError ? "Producto no agregado!" : "Nuevo Producto agregado!",
  //         description: response.isError
  //           ? `${mapErrorCode(response?.error?.code)}`
  //           : `Se agregó el producto ${dataForm.name}`,
  //       });
  //       setLoading(false);
  //     }
  //   } catch (error: any) {
  //     console.log("🚀 >>  onSubmit >>  error:", error);
  //     setLoading(false);
  //     toast({
  //       duration: 7000,
  //       variant: "destructive",
  //       title: "Hubo un error! por favor contactar con soporte",
  //       description: "Error desconocido",
  //     });
  //   }
  // }

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, data ?? ({} as Product));

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
          const deletedPhoto = await deleteApi(`/api/images/upload?fileurl=${data?.image as string}`);

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

        const response = await putApi(`/api/product/${dataForm.id}`, dataToEdit);

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
            ? `${mapErrorCode(response?.error?.code)}`
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

        const response = await postApi("/api/product", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...products, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Producto no agregado!" : "Nuevo producto agregado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se agregó el producto ${dataForm.name}`,
        });
        setLoading(false);
      }
    } catch (error: any) {
      console.log("🚀 >>  onSubmit >>  error:", error);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Descripción" {...field} />
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
                <FormLabel>Tipo de Producto</FormLabel>
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
        </div>
        <DialogFooter>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {_getLabelBottom(loading, isEdition)}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
