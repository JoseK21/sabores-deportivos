"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { postApi, putApi } from "@/lib/api";
import { ProductType } from "@/types/product-type";
import { getObjectDiff } from "@/utils/object";
import { useEmployeesStore } from "@/store/employeesStore";
import { isEmpty } from "lodash";
import { useProductTypesStore } from "@/store/qs-admin";

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
}: {
  data?: ProductType;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { productTypes, setData } = useProductTypesStore();

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition ? data || ({} as ProductType) : { name: "" },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, data ?? ({} as ProductType), ["id"]);

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

        const response = await putApi(`/api/product-type/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = productTypes.map((employee) => {
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
          title: response.isError ? "Tipo de Producto no actualizado!" : "Tipo de Producto actualizado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se actualizó el tipo de producto ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const updateDataForm = dataForm;

        const response = await postApi("/api/product-type", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...productTypes, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Tipo de Producto no agregado!" : "Nuevo Tipo de Producto agregado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se agregó el tipo de producto ${dataForm.name}`,
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
