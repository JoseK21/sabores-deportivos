"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useState } from "react";
import { putApi } from "@/lib/api";
import { useForm } from "react-hook-form";
import { Business } from "@/types/business";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useBusinessesStore } from "@/store/sd-admin";
import { BooleanOption, BusinessPlan } from "@/app/enum";
import { BOOLEAN_OPTIONS, BUSINESS_PLAN } from "@/app/constants";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FormSchemaConfig = z.object({
  displayProductPrice: z.boolean().optional(),
  plan: z.string().min(3, { message: "Plan requerido" }),
});

export default function FormConfig({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: Business;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { businesses, setData } = useBusinessesStore();

  const form = useForm<z.infer<typeof FormSchemaConfig>>({
    resolver: zodResolver(FormSchemaConfig),
    defaultValues: { ...data },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchemaConfig>) {
    try {
      setLoading(true);

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

      const response = await putApi(`business/${data?.id}`, dataToEdit);

      setOpen(response.isError);

      if (response.data) {
        const updateData = businesses.map((business) => {
          if (business.id === response.data.id) {
            return response.data;
          }

          return business;
        });
        setData(updateData);
      }

      toast({
        duration: 5000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError ? "Comercio no actualizado!" : "Comercio actualizado!",
        description: response.isError
          ? "Hubo un error interno en el servidor"
          : `Se actualizó el comercio ${data?.name}`,
      });
      setLoading(false);
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
            name="plan"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un tipo de comercio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(BUSINESS_PLAN).map((key) => (
                      <SelectItem key={key} value={key}>
                        {BUSINESS_PLAN[key as BusinessPlan]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="displayProductPrice"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mostrar precios en el menú</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")} // Convertir la cadena 'true' a true y 'false' a false
                  defaultValue={field.value ? BooleanOption.true : BooleanOption.false}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione una opción" />
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
        <DialogFooter>
          <ButtonLoadingSubmit loading={loading} isEdition={isEdition} />
        </DialogFooter>
      </form>
    </Form>
  );
}
