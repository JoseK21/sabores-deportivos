"use client";

import { z } from "zod";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Business } from "@/types/business";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { putApi } from "@/lib/api";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { useBusinessStore } from "@/store/sd-admin";
import { EXCEPT_NUMBER_SYMBOLS } from "@/app/constants";

const FormSchema = z.object({
  wazeLink: z.string().optional(),
  googleMapLink: z.string().optional(),
  facebookLink: z.string().optional(),
  instagramLink: z.string().optional(),
  xLink: z.string().optional(),
  phone1: z.number().optional(),
  phone2: z.number().optional(),
  email: z.string().optional(),
});

export default function FormBusinessContacts({ business }: { business?: Business }) {
  const { setData } = useBusinessStore();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      wazeLink: business?.wazeLink ?? "",
      googleMapLink: business?.googleMapLink ?? "",
      facebookLink: business?.facebookLink ?? "",
      instagramLink: business?.instagramLink ?? "",
      xLink: business?.xLink ?? "",
      phone1: business?.phone1,
      phone2: business?.phone2,
      email: business?.email ?? "",
    } as Business,
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
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

      const response = await putApi(`business/${business?.id}`, dataToEdit);

      if (response.data) {
        setData(response.data);
      }

      toast({
        duration: 5000,
        variant: response.isError ? "destructive" : "success",
        title: response.isError ? "Comercio no actualizado!" : "Comercio actualizado!",
        description: response.isError ? "Hubo un error interno en el servidor" : `Horarios Guardado`,
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
        <p>Redes Sociales</p>
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
                <FormLabel>Link de Google Maps</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Google Maps" {...field} />
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
        <p>Contactos</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FormField
            name="phone1"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono Principal</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    onKeyDown={(e) => EXCEPT_NUMBER_SYMBOLS.includes(e.key) && e.preventDefault()}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(Number(parseFloat(e.target.value)));
                    }}
                    placeholder="Teléfono Principal"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone2"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono Secundario</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={loading}
                    placeholder="Teléfono Secundario"
                    onKeyDown={(e) => EXCEPT_NUMBER_SYMBOLS.includes(e.key) && e.preventDefault()}
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
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Eléctronico</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Correo Eléctronico" {...field} />
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
