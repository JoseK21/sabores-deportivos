import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import React from "react";

const Page = () => {
  // return info

  return (
    <main>
      <h1 className="my-8 text-2xl font-medium">La Cervecería de Barrio</h1>
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="history">Historia</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="schedule-location">Horario y Ubicacion</TabsTrigger>
        </TabsList>
        <div className="mx-4">
          <TabsContent value="history">
            <h2 className=" font-semibold text-lg">BIENVENIDOS A LA CERVECERÍA DE BARRIO</h2>
            <br />
            Nuestro concepto se inspira en los tradicionales mercados populares. Ubicamos todas nuestras sucursales en
            el oasis del tráfico de la ciudad, predominando los espacios al aire libre para obtener un ambiente relajado
            que les ayude a disfrutar de una buena cerveza preparada, platillos con deliciosos frutos del mar,
            exquisitos cortes de carnes y mucho más.
            <br />
            <br />
            Nuestro objetivo es transmitir la rutina familiar del barrio a la experiencia gastronómica del cliente.
            Ofreciendo una deliciosa experiencia involucrando sabores, ambiente y el mejor servicio de la cocina al
            comensal.
          </TabsContent>
          <TabsContent value="menu">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger> PARA EMPEZAR</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>MESA FRÍA</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>TOSTADAS</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>DE NUESTRA PARRILLA</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>PLATILLOS</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>COMPLEMENTOS</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>POSTRES</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="schedule-location">
            <span className=" font-semibold text-lg">HORARIOS</span>
            <p>Lunes a Domingo 12:00hrs a 00:00hrs</p>

            <br/>
            <span className=" font-semibold text-lg">SÍGUENOS</span>
            <p>@lacerveceriadebarriomx @lacerveceriadebarriomx @lacerveceriadebarriomx</p>
            <br/>
            <span className=" font-semibold text-lg">CONTACTO</span>
            <p>info@lacerveceriadebarrio.mx</p>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default Page;
