"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Business } from "@/types/business";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { putApi } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ButtonLoadingSubmit from "@/components/quinisports/ButtonLoadingSubmit";
import { useBusinessStore } from "@/store/qs-admin";

function mapErrorCode(code: string): string {
  switch (code) {
    case "P2002":
      return "Hubo un error, el email ya se encuentra registrado en el sistema";
    default:
      return "Hubo un error interno en el servidor";
  }
}

const FormSchema = z.object({
  wazeLink: z.string().optional(),
  googleMapLink: z.string().optional(),
  facebookLink: z.string().optional(),
  instagramLink: z.string().optional(),
  xLink: z.string().optional(),
});

export default function FormBusinessSocialMedia({ data }: { data?: Business }) {
  const { business, setData } = useBusinessStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: data || ({} as Business),
  });

  useEffect(() => {
    form.setValue("wazeLink", business.wazeLink);
    form.setValue("googleMapLink", business.googleMapLink);
    form.setValue("facebookLink", business.facebookLink);
    form.setValue("instagramLink", business.instagramLink);
    form.setValue("xLink", business.xLink);
  }, [business]);

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      let dataToEdit = getObjectDiff(dataForm, data ?? ({} as Business));

      console.log("🚀 >>  onSubmit >>  dataToEdit:", dataToEdit);

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

      const response = await putApi(`/api/business/${data?.id}`, dataToEdit);

      if (response.data) {
        const updateData = response.data;

        setData(updateData);
      }

      toast({
        duration: 5000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError ? "Comercio no actualizado!" : "Comercio actualizado!",
        description: response.isError ? `${mapErrorCode(response?.error?.code)}` : `Horarios Guardado`,
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
            name="wazeLink"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de Waze</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Waze" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="googleMapLink"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de GoogleMap</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="GoogleMap" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="facebookLink"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de Facebook</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Facebook" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="instagramLink"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de Instagram</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="xLink"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de X</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="X" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <ButtonLoadingSubmit loading={loading} isEdition={true} />
        </DialogFooter>
      </form>
    </Form>
  );
}
