"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteApi, postApi, putApi } from "@/lib/api";
import { BUSINESS_TYPES, COUNTRIES } from "@/app/constants";
import { getObjectDiff } from "@/utils/object";
import { Business } from "@/types/business";
import { useBusinessStore } from "@/store/businessStore";
import FileInputPreview, { SIZES_UNIT } from "@/components/quinisports/FileInputPreview";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, urlToFile } from "@/utils/image";
import { useFetchData } from "@/hooks/useFetchData";
import { isEmpty } from "lodash";
import { PutBlobResult } from "@vercel/blob";
import { cleanText } from "@/utils/string";
import { PROVINCE_WITH_CANTONS } from "@/app/costa-rica-constants";
import { BusinessTypes } from "@/app/enum";

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
  address: z.string().min(10, { message: "La Dirección al menos de tener 10 letras" }),
  coverImageUrl: z
    .any()
    .refine((file) => file?.size, "Imagen requerida")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño max es de  1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  logoUrl: z
    .any()
    .refine((file) => file?.size, "Logo requerido")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño max es de  1MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  description: z.string().min(1, { message: "Descripcion requerida" }),
  province: z.string().min(1, { message: "Provincia requerida" }),
  canton: z.string().min(1, { message: "Canton requerido" }),
  district: z.string().min(1, { message: "Distrito requerido" }),
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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? data || ({} as Business)
      : {
          name: "",
          type: "",
          description: "",
          province: "",
          address: "",
          canton: "",
          district: "",
          coverImageUrl: "",
          logoUrl: "",
        },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useFetchData(async () => {
    if (isEdition && data?.coverImageUrl) {
      urlToFile((data?.coverImageUrl as string) || "")
        .then((file) => {
          form.setValue("coverImageUrl", file);
        })
        .catch((error) => {
          form.setValue("coverImageUrl", null);
        });
    }
    if (isEdition && data?.logoUrl) {
      urlToFile((data?.logoUrl as string) || "")
        .then((file) => {
          form.setValue("logoUrl", file);
        })
        .catch((error) => {
          form.setValue("logoUrl", null);
        });
    }
  });

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);

    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, data ?? ({} as Business));

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

        if (dataToEdit?.coverImageUrl) {
          const deletedPhoto = await deleteApi(`/api/images/upload?fileurl=${data?.coverImageUrl as string}`);

          if (deletedPhoto?.isError) {
            toast({
              duration: 7000,
              variant: "warning",
              title: "Error al eliminar la foto anterior!",
              description: "La imagen del administrator no se puso eliminar, consulte con soporte",
            });
          }

          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
            method: "POST",
            body: dataToEdit.coverImageUrl,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToEdit = { ...dataToEdit, coverImageUrl: newBlob.url ?? "" };
        }

        if (dataToEdit?.logoUrl) {
          const deletedPhoto = await deleteApi(`/api/images/upload?fileurl=${data?.logoUrl as string}`);

          if (deletedPhoto?.isError) {
            toast({
              duration: 7000,
              variant: "warning",
              title: "Error al eliminar la foto anterior!",
              description: "La imagen del administrator no se puso eliminar, consulte con soporte",
            });
          }

          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
            method: "POST",
            body: dataToEdit.logoUrl,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToEdit = { ...dataToEdit, logoUrl: newBlob.url ?? "" };
        }

        const response = await putApi(`/api/business/${dataForm.id}`, dataToEdit);

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
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se actualizó el comercio ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        let dataToAdd = dataForm;

        const fileCoverImage = dataToAdd.coverImageUrl;

        if (fileCoverImage) {
          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataToAdd.name)}`, {
            method: "POST",
            body: fileCoverImage,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToAdd = { ...dataToAdd, coverImageUrl: newBlob.url ?? "" };
        }

        const fileLogo = dataToAdd.logoUrl;

        if (fileLogo) {
          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataToAdd.name)}`, {
            method: "POST",
            body: fileLogo,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToAdd = { ...dataToAdd, logoUrl: newBlob.url ?? "" };
        }

        const response = await postApi("/api/business", dataToAdd);

        setOpen(response.isError);

        if (response.data) {
          setData([...businesses, response.data]);
        }

        toast({
          duration: 5000,
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
            name="coverImageUrl"
            control={form.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem className="flex flex-col items-center justify-center my-3">
                  <FormLabel>Imagen de Perfil</FormLabel>
                  <FormControl>
                    <FileInputPreview
                      name={data?.name}
                      disabled={loading}
                      onChange={onChange}
                      size={SIZES_UNIT.md}
                      src={form.getValues().coverImageUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            name="logoUrl"
            control={form.control}
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem className="flex flex-col items-center justify-center my-3">
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <FileInputPreview
                      name={data?.name}
                      disabled={loading}
                      onChange={onChange}
                      size={SIZES_UNIT.md}
                      src={form.getValues().logoUrl}
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
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un tipo de comercio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(BUSINESS_TYPES).map((key) => (
                      <SelectItem key={key} value={key}>
                        {BUSINESS_TYPES[key as BusinessTypes]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="country"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COUNTRIES.map(({ value, label, enabled }) => (
                      <SelectItem key={value} value={value} disabled={!enabled}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="province"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provincia</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("province");
                    form.setValue("canton", "");
                    form.setValue("district", "");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione una provincia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(PROVINCE_WITH_CANTONS).map((province) => (
                      <SelectItem key={province} value={province}>
                        {province}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="canton"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Canton</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.trigger("canton");
                    form.setValue("district", "");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un canton" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(PROVINCE_WITH_CANTONS?.[(form.getValues().province ?? "") as string] || []).map(
                      (canton) => (
                        <SelectItem key={canton} value={canton}>
                          {canton}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="district"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distrito</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Seleccione un distrito" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(
                      PROVINCE_WITH_CANTONS?.[(form.getValues().province ?? "") as string]?.[
                        (form.getValues().canton ?? "") as string
                      ] || []
                    ).map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Dirección" {...field} />
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
