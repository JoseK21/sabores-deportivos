"use client";

import { z } from "zod";
import { useState } from "react";
import { Eye, EyeOff, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { User } from "@/constants/data";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTitle, DialogFooter, DialogHeader, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Role } from "@/app/enum";

const ROLES: { value: Role; label: string }[] = [
  { value: Role.admin_rest, label: "Adminitrador" },
  { value: Role.cashier_rest, label: "Cajero" },
  { value: Role.waiter_rest, label: "Mesero" },
  { value: Role.bartender_rest, label: "Bartender" },
];

const FormSchema = z.object({
  name: z.string().min(3, { message: "Nombre al menos de 3 letras" }),
  role: z.string().min(3, { message: "Rol minimo de 3 letras" }),
  password: z.string().min(6, { message: "Contrasena como minimo de de 6 letras" }),
  email: z
    .string({
      required_error: "Por favor seleccione un correo electrónico para mostrar.",
    })
    .email(),
});

interface ProductsClientProps {
  data: User[];
  headerTitle: string;
  description: string;
  path: string;
  columns: any;
  placeholder: string;
  textRowsSelected: string;
}

export const UserClient: React.FC<ProductsClientProps> = ({
  data,
  headerTitle,
  description,
  columns,
  placeholder,
  textRowsSelected,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [displayPassword, setDisplayPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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
    <>
      <div className="flex items-start justify-between">
        <Heading title={headerTitle} description={description} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="text-xs md:text-sm">
              <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Nuevo Administrador</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            {ROLES.map(({ value, label }) => (
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
                    name="password"
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
            {/* <DialogFooter>
              <Button type="button">Guardar</Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <DataTable
        data={data}
        searchKey="name"
        columns={columns}
        placeholder={placeholder}
        textRowsSelected={textRowsSelected}
      />
    </>
  );
};
