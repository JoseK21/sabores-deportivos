"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserRole, UserStatus } from "@/app/enum";
import { postApi, putApi } from "@/lib/api";
import { STAFF_REST_ROLES, USER_STATUS } from "@/app/constants";
import { useAdminsStore } from "@/store/adminsStore";
import { User } from "@/types/user";
import { getObjectDiff } from "@/utils/object";

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
  password: z.string().min(4, { message: "Contrasena como minimo de de 4 letras" }),
  email: z
    .string({
      required_error: "Por favor seleccione un correo electrónico para mostrar.",
    })
    .email(),
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
  data?: User;
  isEdition?: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { admins, setData } = useAdminsStore();
  const [displayPassword, setDisplayPassword] = useState(false);

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: isEdition
      ? data || ({} as User)
      : {
          name: "",
          email: "",
          password: "",
          role: "",
          status: UserStatus.deactivated,
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
        const dataToEdit = getObjectDiff(dataForm, data ?? ({} as User));

        console.log("🚀 >>  onSubmit >>  dataForm:", dataToEdit, data);

        const response = await putApi(`/api/admin/${dataForm.id}`, dataForm);

        setOpen(response.isError);

        console.log("🚀 >>  onSubmit >>  response.data:", response.data);

        if (response.data) {
          const updateAdmin = admins.map((admin) => {
            if (admin.id === response.data.id) {
              return response.data;
            }

            return admin;
          });
          setData(updateAdmin);
        }

        toast({
          duration: 7000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Empleado no actualizado!" : "Empleado actualizado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se actualizó el empleado ${dataForm.name}`,
        });
        setLoading(false);
      } else {
        console.log("🚀 >>  onSubmit >>  dataForm:", dataForm);

        const response = await postApi("/api/admin", dataForm);

        setOpen(response.isError);

        if (response.data) {
          setData([...admins, response.data]);
        }

        toast({
          duration: 7000,
          variant: response.isError ? "destructive" : "success",
          title: response.isError ? "Empleado no agregado!" : "Nuevo empleado agregado!",
          description: response.isError
            ? `${mapErrorCode(response?.error?.code)}`
            : `Se agregó el empleado ${dataForm.name}`,
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
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Eléctronico</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Correo Eléctronico" {...field} autoComplete="new-email" />
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
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STAFF_REST_ROLES.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormControl>
                  <Input disabled placeholder="Rol" {...field} value="Administrsdor" autoComplete="new-rol" />
                </FormControl> */}
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
                  <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                    {displayPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </div>
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
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione un estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_STATUS.map(({ label, value }) => (
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
