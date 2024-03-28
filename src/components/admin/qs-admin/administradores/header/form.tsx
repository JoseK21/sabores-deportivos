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
import { UserRole } from "@/app/enum";
import { postApi } from "@/lib/api";
import { USER_STATUS } from "@/app/constants";

function mapErrorCode(code: string): string {
  switch (code) {
    case "P2002":
      return "Hubo un error, el email ya se encuentra registrado en el sistema";
    default:
      return "Hubo un error interno en el servidor";
  }
}

const FormSchema = z.object({
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

export default function FormAdmin({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [displayPassword, setDisplayPassword] = useState(false);

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "Administrador",
    },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    data.role = UserRole.admin_rest;

    console.log("🚀 >>  onSubmit >>  data:", data)
    
    const response = await postApi("/api/user", data);

    setLoading(false);

    setOpen(response.isError);

    toast({
      duration: 7000,
      variant: response.isError ? "destructive" : "success",
      title: response.isError ? "Administrador no agregado!" : "Nuevo administrador agregado!",
      description: response.isError
        ? `${mapErrorCode(response?.error?.code)}`
        : `Se agregó el administrador ${data.name}`,
    });
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
                <FormControl>
                  <Input disabled placeholder="Rol" {...field} autoComplete="new-rol" />
                </FormControl>
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
                    {USER_STATUS.map(({ label, status }) => (
                      <SelectItem key={status} value={status}>
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
            {loading ? "Creando.." : "Guardar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
