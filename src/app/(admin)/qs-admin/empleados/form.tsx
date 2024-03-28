"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/app/enum";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STAFF_REST_ROLES } from "@/app/constants";

const FormSchema = z.object({
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  role: z.string().min(3, { message: "Rol minimo de 3 letras" }),
  password_: z.string().min(6, { message: "Contrasena como minimo de de 6 letras" }),
  email: z
    .string({
      required_error: "Por favor seleccione un correo electrónico para mostrar.",
    })
    .email(),
});

export default function FormAdmin() {
  const [displayPassword, setDisplayPassword] = useState(false);

  // Usar setLoading si ocupo cargar algo aqui desde el api
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      role: UserRole.admin_rest,
      password_: "",
      email: "",
    },
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("🚀 >>  onSubmit >>  data:", data);

    setOpen(false);

    toast({
      variant: "success",
      title: "Nuevo administrador agregado!",
      description: `Se creo el administrador #${2} con el nombre de ${"Jose Nunez"}`,
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
                  <Input disabled={loading} placeholder="Correo Eléctronico" {...field} />
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
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {STAFF_REST_ROLES.map(({ value, label }) => (
                      <SelectItem key={`${value}_${label}`} value={value}>
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
            name="password_"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" flex items-end w-min">
                  Contraseña
                  <div className="ml-4" onClick={() => setDisplayPassword(!displayPassword)}>
                    {displayPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </div>
                </FormLabel>

                <FormControl>
                  <Input
                    type={displayPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    disabled={loading}
                    autoComplete="false"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
