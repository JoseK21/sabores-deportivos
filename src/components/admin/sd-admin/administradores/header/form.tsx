"use client";

import { z } from "zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { isEmpty } from "lodash";
import { User } from "@/types/user";
import { UserStatus } from "@/app/enum";
import { useForm } from "react-hook-form";
import { cleanText } from "@/utils/string";
import { Business } from "@/types/business";
import { Input } from "@/components/ui/input";
import { getObjectDiff } from "@/utils/object";
import { Button } from "@/components/ui/button";
import type { PutBlobResult } from "@vercel/blob";
import { useAdminsStore } from "@/store/sd-admin";
import { useFetchData } from "@/lib/useFetchData";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogFooter } from "@/components/ui/dialog";
import { deleteApi, postApi, putApi } from "@/lib/api";
import { ADMIN_ROLES, USER_STATUS } from "@/app/constants";
import { Check, ChevronsUpDown, Eye, EyeOff } from "lucide-react";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, urlToFile } from "@/utils/image";
import ButtonLoadingSubmit from "@/components/saboresdeportivos/ButtonLoadingSubmit";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import FileInputPreview, { SIZES_UNIT } from "@/components/saboresdeportivos/FileInputPreview";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandList, CommandInput, CommandItem } from "@/components/ui/command";

const FormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  role: z.string().min(3, { message: "Rol minimo de 3 letras" }),
  status: z.string().min(1, { message: "Estado requerido" }),
  image: z
    .any()
    .refine((file) => file?.size, "Imagen requerida")
    .refine((file) => file?.size <= MAX_FILE_SIZE, "El tamaño max es de  1MB.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  idBusiness: z.string({ required_error: "Comercio requerido" }).min(1, { message: "Comercio requerido" }),
  password: z.string().min(4, { message: "Contrasena como minimo de de 4 letras" }),
  email: z
    .string({
      required_error: "Por favor seleccione un correo electrónico para mostrar.",
    })
    .email({ message: "Correo electrónico inválido" }),
});

export default function FormAdmin({
  data,
  setOpen,
  businesses = [],
  isEdition = false,
}: {
  data?: User;
  isEdition?: boolean;
  businesses?: Business[];
  setOpen: (open: boolean) => void;
}) {
  const { admins, setData } = useAdminsStore();
  const [displayPassword, setDisplayPassword] = useState(false);

  const dataFromDB = {
    ...data,
    ...(isEdition ? { password: "password" } : ""),
  } as User;

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? dataFromDB || ({} as User)
      : {
          name: "",
          image: "",
          email: "",
          password: "",
          idBusiness: "",
          status: "",
          role: "",
        },
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

  const { setValue, trigger } = form;

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, form.control._defaultValues, ["email", "password"]);

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
              description: "La imagen del administrator no se puso eliminar, consulte con soporte",
            });
          }

          const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
            method: "POST",
            body: dataToEdit.image,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToEdit = { ...dataToEdit, image: newBlob.url ?? "" };
        }

        const response = await putApi(`admin/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = admins.map((admin) => {
            if (admin.id === response.data.id) {
              return response.data;
            }

            return admin;
          });
          setData(updateData);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Administrador no actualizado!" : "Administrador actualizado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se actualizó el administrador ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const file = dataForm.image;

        const responseImageUpload = await fetch(`/api/images/upload?filename=${cleanText(dataForm.name)}`, {
          method: "POST",
          body: file,
        });

        const newBlob = (await responseImageUpload.json()) as PutBlobResult;

        const updateDataForm = { ...dataForm, image: newBlob.url ?? "" };

        const response = await postApi("admin", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...admins, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Administrador no agregado!" : "Nuevo administrador agregado!",
          description: response.isError
            ? "Hubo un error interno en el servidor"
            : `Se agregó el administrador ${dataForm.name}`,
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
                    placeholder="/assets/default-user-2.webp"
                    src={form.getValues().image}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

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
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Eléctronico</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading || isEdition}
                    placeholder="Correo Eléctronico"
                    {...field}
                    autoComplete="new-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="role"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Selecione un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ADMIN_ROLES.map(({ label, value }) => (
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

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline-flex items-end w-min">
                  Contraseña
                  {!isEdition && (
                    <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                      {displayPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                    </div>
                  )}
                </FormLabel>

                <FormControl>
                  <Input
                    type={displayPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Contraseña"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger disabled={loading}>
                      <SelectValue placeholder="Selecione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(USER_STATUS)
                      .filter((status) => status !== UserStatus.unknown)
                      .map((key) => (
                        <SelectItem key={key} value={key}>
                          {USER_STATUS[key as UserStatus] || "-"}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name="idBusiness"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comercio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        role="combobox"
                        variant="outline"
                        disabled={loading}
                        className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                      >
                        {field.value
                          ? (businesses ?? []).find((business) => business.id === field.value)?.name
                          : "Seleccione un comercio"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar comercio..." />
                      <CommandEmpty>Comercio no encontrado.</CommandEmpty>

                      <CommandList>
                        {(businesses ?? []).map(({ id, name }) => (
                          <CommandItem
                            value={name}
                            key={id}
                            onSelect={() => {
                              setValue("idBusiness", id);
                              trigger("idBusiness"); // Forzar la validación del campo
                            }}
                          >
                            <Check className={cn("mr-2 h-4 w-4", id === field.value ? "opacity-100" : "opacity-0")} />
                            {name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
