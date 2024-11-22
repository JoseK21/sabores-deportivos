"use client";

import { z } from "zod";
import { useState } from "react";
import { isEmpty } from "lodash";
import { Sport } from "@/types/sport";
import { useForm } from "react-hook-form";
import { postApi, putApi } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { useSportsStore } from "@/store/sd-admin";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  abbrName: z.string().min(2, { message: "Nombre al menos de 2 letras" }),
});

export default function FormData({
  data,
  setOpen,
  isEdition = false,
}: {
  data?: Sport;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { sports, setData } = useSportsStore();

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition ? data || ({} as Sport) : { name: "", abbrName: "" },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, data ?? ({} as Sport), ["id"]);

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

        const response = await putApi(`sport/${dataForm.id}`, dataToEdit);

        console.log("🚀 >>  onSubmit >>  response:", response);

        setOpen(response.isError);

        if (response.data) {
          const updateData = sports.map((sport) => {
            if (sport.id === response.data.id) {
              return response.data;
            }

            return sport;
          });

          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Deporte no actualizado!" : "Deporte actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el deporte ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const updateDataForm = dataForm;

        console.log("🚀 >>  onSubmit >>  updateDataForm:", updateDataForm);

        const response = await postApi("sport", updateDataForm);

        console.log("🚀 >>  onSubmit >>  response:", response);

        setOpen(response.isError);

        if (response.data) {
          setData([...sports, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Deporte no agregado!" : "Nuevo Deporte agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el deporte ${dataForm.name}`,
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
              name="abbrName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Abreviado</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nombre Abreviado" {...field} />
                  </FormControl>
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
    </>
  );
}
