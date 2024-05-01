"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { UserStaffBusinessRole, UserStatus } from "@/app/enum";
import { deleteApi, postApi, putApi } from "@/lib/api";
import { STAFF_REST_ROLES, USER_STATUS } from "@/app/constants";
import FileInputPreview, { SIZES_UNIT } from "@/components/quinisports/FileInputPreview";
import { User } from "@/types/user";
import { getObjectDiff } from "@/utils/object";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, urlToFile } from "@/utils/image";
import { useEmployeesStore } from "@/store/employeesStore";
import { PutBlobResult } from "@vercel/blob";
import { useFetchData } from "@/hooks/useFetchData";
import { cleanText } from "@/utils/string";
import { isEmpty } from "lodash";
import ButtonLoadingSubmit from "@/components/quinisports/ButtonLoadingSubmit";

const PATH_API = "/api/employee/";

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
    .email(),
});

export default function FormEmployee({
  data,
  setOpen,
  idBusiness,
  isEdition = false,
}: {
  data?: User;
  idBusiness: string;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { employees, setData } = useEmployeesStore();
  const [displayPassword, setDisplayPassword] = useState(false);

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? { ...data, ...(isEdition ? { password: "password" } : "") } || ({} as User)
      : {
          name: "",
          image: "",
          email: "",
          password: "",
          role: "",
          status: "",
          idBusiness,
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

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (isEdition) {
        let dataToEdit = getObjectDiff(dataForm, data ?? ({} as User), ["email", "password"]);

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
              description: "La imagen del administrator no se puso eliminar, consulte con soporte",
            });
          }

          const responseImageUpload = await fetch(`/api/images/upload?filename=employee-${cleanText(dataForm.name)}`, {
            method: "POST",
            body: dataToEdit.image,
          });

          const newBlob = (await responseImageUpload.json()) as PutBlobResult;

          dataToEdit = { ...dataToEdit, image: newBlob.url ?? "" };
        }

        const response = await putApi(`/api/employee/${dataForm.id}`, dataToEdit);

        setOpen(response.isError);

        if (response.data) {
          const updateData = employees.map((employee) => {
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
          title: response.isError ? "Administrador no actualizado!" : "Administrador actualizado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se actualizó el administrador ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        const file = dataForm.image;

        const responseImageUpload = await fetch(`/api/images/upload?filename=employee-${cleanText(dataForm.name)}`, {
          method: "POST",
          body: file,
        });

        const newBlob = (await responseImageUpload.json()) as PutBlobResult;

        const updateDataForm = { ...dataForm, image: newBlob.url ?? "" };

        const response = await postApi("/api/employee", updateDataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...employees, response.data]);
        }

        toast({
          duration: 5000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Administrador no agregado!" : "Nuevo administrador agregado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
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
                    {Object.keys(STAFF_REST_ROLES).map((key) => (
                      <SelectItem key={key} value={key}>
                        {STAFF_REST_ROLES[key as UserStaffBusinessRole]}
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
                    disabled={loading || isEdition}
                    autoComplete="new-password"
                    placeholder="Contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
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
        </div>
        <DialogFooter>
          <ButtonLoadingSubmit loading={loading} isEdition={isEdition} />
        </DialogFooter>
      </form>
    </Form>
  );
}
