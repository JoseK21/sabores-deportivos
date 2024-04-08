"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { BUSINESS_TYPES, COUNTRIES } from "@/app/constants";
import { getObjectDiff } from "@/utils/object";
import { Business } from "@/types/business";
import { useBusinessStore } from "@/store/businessStore";

function mapErrorCode(code: string): string {
  switch (code) {
    case "P2002":
      return "Hubo un error, el email ya se encuentra registrado en el sistema";
    default:
      return "Hubo un error interno en el servidor";
  }
}

const FormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  // logoUrl: z.string().min(3, { message: "Logo requerido" }),
  logoUrl: z.string().optional(),
  description: z.string().min(1, { message: "Descripcion requerida" }),
  coverImageUrl: z.string().optional(),
  // coverImageUrl: z.string().min(4, { message: "Imagen requerida" }),
  type: z.string().min(1, { message: "Debe seleccionar un tipo de comercio" }),
  country: z.string().min(1, { message: "Por favor indique el pais" }),
});

const _getLabelBottom = (loading: boolean, isEdition: boolean) => {
  if (isEdition) {
    return loading ? "Actualizando.." : "Actualizar";
  } else {
    return loading ? "Creando.." : "Guardar";
  }
};

export default function Form_({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: Business;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { businesses, setData } = useBusinessStore();

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? data || ({} as Business)
      : {
          name: "",
          type: "",
          logoUrl: "",
          country: "",
          description: "",
          coverImageUrl: "",
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);

    try {
      console.log("🚀 >>  onSubmit >>  isEdition:", isEdition);

      setLoading(true);

      if (isEdition) {
        const dataToEdit = getObjectDiff(dataForm, data ?? ({} as Business));

        console.log("🚀 >>  onSubmit >>  dataForm:", dataToEdit, data);

        const response = await putApi(`/api/business/${dataForm.id}`, dataForm);

        setOpen(response.isError);

        console.log("🚀 >>  onSubmit >>  response.data:", response.data);

        if (response.data) {
          const updateData = businesses.map((admin) => {
            if (admin.id === response.data.id) {
              return response.data;
            }

            return admin;
          });
          setData(updateData);
        }

        toast({
          duration: 7000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Comercio no actualizado!" : "Comercio actualizado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se actualizó el comercio ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);

        const response = await postApi("/api/business", dataForm);
        console.log("🚀 >>  onSubmit >>  response:", response);

        setOpen(response.isError);

        if (response.data) {
          setData([...businesses, response.data]);
        }

        toast({
          duration: 7000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Comercio no agregado!" : "Nuevo comercio agregado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se agregó el comercio ${dataForm.name}`,
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
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Descripcion" {...field} autoComplete="new-email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="type"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo de comercio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BUSINESS_TYPES.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pais */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
