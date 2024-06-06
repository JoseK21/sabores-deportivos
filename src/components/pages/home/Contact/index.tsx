"use client";

import { z } from "zod";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { postApi } from "@/lib/api";

const FormSchema = z.object({
  message: z.string().min(1, { message: "Mensaje requerido" }),
  name: z.string().min(1, { message: "Nombre requerido" }),
  email: z.string({ required_error: "Correo electrónico requerido" }).email({ message: "Correo electrónico inválido" }),
});

const FormSubscriptionSchema = z.object({
  name: z.string().min(1, { message: "Nombre requerido" }),
  email: z.string({ required_error: "Correo electrónico requerido" }).email({ message: "Correo electrónico inválido" }),
});

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loadingSubcription, setLoadingSubcription] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", message: "", email: "" },
  });

  const formSubscription = useForm<z.infer<typeof FormSubscriptionSchema>>({
    resolver: zodResolver(FormSubscriptionSchema),
    defaultValues: { name: "", email: "" },
  });

  async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      const response = await postApi("contact", dataForm);

      setLoading(false);
      if (response.isError) throw new Error(`response status: ${response.error}`);

      form.reset();

      toast({
        duration: 3000,
        title: "Listo",
        variant: "success",
        description: "Correo enviado con exito!",
      });
    } catch (err) {
      setLoading(false);

      console.error(err);

      toast({
        duration: 3000,
        title: "Error",
        variant: "destructive",
        description: "Envio de correo con informacion del contacto fallido!",
      });
    }
  }

  async function onSubmitSubscription(dataFormSubscription: z.infer<typeof FormSubscriptionSchema>) {
    try {
      setLoadingSubcription(true);

      const response = await postApi("subscription", dataFormSubscription);

      setLoadingSubcription(false);

      if (response.isError) {
        const code = response?.error?.code;

        if (code == "P2002") {
          toast({
            duration: 3000,
            title: "Aviso",
            variant: "info",
            description: "El correo ya esta subscrito!",
          });
        } else {
          throw new Error(`response status: ${response?.error}`);
        }
      }

      formSubscription.reset();

      toast({
        duration: 3000,
        title: "Listo",
        variant: "success",
        description: "Subscripción exito!",
      });
    } catch (err) {
      setLoadingSubcription(false);

      console.error(err);

      toast({
        duration: 3000,
        title: "Error",
        variant: "destructive",
        description: "Envio de correo con informacion del contacto fallido!",
      });
    }
  }

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="wow fadeInUp mb-12 rounded-md bg-slate-50 py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                ¿Necesitas ayuda? Contactanos
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Nuestro equipo de soporte se comunicará con usted lo antes posible por correo electrónico.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 md:w-1/2">
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
                    </div>
                    <div className="w-full px-4 md:w-1/2">
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
                    <div className="w-full px-4 mt-4">
                      <FormField
                        name="message"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mensaje</FormLabel>
                            <FormControl>
                              <Textarea
                                disabled={loading}
                                placeholder="Mensaje"
                                className="w-full"
                                {...field}
                                maxLength={300}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className=" flex flex-row justify-end mt-4">
                    <Button type="submit" disabled={loading}>
                      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {loading ? "Enviando.." : "Enviar"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp relative z-10 rounded-md bg-slate-50 p-8 dark:bg-primary/10 sm:p-11 lg:p-8 xl:p-11"
              data-wow-delay=".2s"
            >
              <h3 className="mb-4 text-2xl font-bold leading-tight text-black dark:text-white">Suscríbete Ahora!</h3>

              <p className="mb-8 text-base font-medium text-body-color">
                Recibiras notificaciones de tus equipos favoritos y precios grandiosos..
              </p>

              <Form {...formSubscription}>
                <form onSubmit={formSubscription.handleSubmit(onSubmitSubscription)} autoComplete="off">
                  <div className="w-full">
                    <FormField
                      name="name"
                      control={formSubscription.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input disabled={loadingSubcription} placeholder="Nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <FormField
                      name="email"
                      control={formSubscription.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Eléctronico</FormLabel>
                          <FormControl>
                            <Input disabled={loadingSubcription} placeholder="Correo Eléctronico" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className=" flex flex-row justify-end mt-4">
                    <Button type="submit" disabled={loadingSubcription}>
                      {loadingSubcription && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {loadingSubcription ? "Suscribiéndose.." : "Subscribirse"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
