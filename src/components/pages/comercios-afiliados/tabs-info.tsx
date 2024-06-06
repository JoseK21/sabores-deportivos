/* eslint-disable @next/next/no-img-element */
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useBusinessInfoData from "./useBusinessInfoData";
import { Product } from "@/types/product";
import { Schedule } from "@/types/schedule";
import { DAYS_MAP } from "@/utils/date";
import { Facebook, Instagram, Locate, Mail, MapPin, Phone, X } from "lucide-react";

interface ProductMap {
  [key: string]: Product[]; // O utiliza ProductType en lugar de string si ProductType es un tipo específico
}

interface PrizeMap {
  [key: string]: Product[]; // O utiliza ProductType en lugar de string si ProductType es un tipo específico
}

const scheduleToSpanish = (schedule: Schedule | undefined): string => {
  if (!schedule) return "";

  try {
    const formatTime = (time: number): string => {
      const date = new Date(time * 60 * 1000); // Convertir minutos a milisegundos
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const period = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      return `${formattedHours}:${minutes.toString().padStart(2, "0")}${period}`;
    };

    let result = "";

    (Object.keys(DAYS_MAP) as Array<keyof Schedule>).forEach((day) => {
      const openingKey = `${day}Opening` as keyof Schedule;
      const closingKey = `${day}Close` as keyof Schedule;

      if (schedule[openingKey] !== undefined && schedule[closingKey] !== undefined) {
        result += `${DAYS_MAP[day.replace("Opening", "").replace("Close", "")]}: ${formatTime(
          schedule[openingKey] as number
        )} a ${formatTime(schedule[closingKey] as number)}\n`;
      }
    });

    return result.trim();
  } catch (error) {
    console.log("🚀 >>  scheduleToSpanish >>  error:", error);
    return "Horario no Disponible.";
  }
};

const TabsInfo = ({ slug }: { slug: string }) => {
  const { isLoaded, business } = useBusinessInfoData(slug);
  const { name, description, logoUrl, coverImageUrl, Product, Prize, displayProductPrice, Schedule } = business || {};

  const menu: ProductMap =
    Product?.reduce((acc, item) => {
      const key = `${item.productType?.name}`;

      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as ProductMap) ?? {};

  const premios: PrizeMap =
    Prize?.reduce((acc, item) => {
      const key = `${item.points} Pts | ${item.name}`;

      console.log("🚀 >>  Prize?.reduce >>  item.ProductPrize:", item);

      acc[key] = item.ProductPrize?.map((product) => product.product) || ([] as Product[]);

      return acc;
    }, {} as PrizeMap) ?? {};

  if (!isLoaded) {
    return (
      <div className="flex items-start justify-between flex-col">
        <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200 mt-10" />
        <div className=" w-64 h-10 rounded-md animate-pulse bg-slate-200 mt-5" />
        <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
      </div>
    );
  }

  return (
    <main>
      <div className=" flex flex-row items-center my-8">
        <Avatar
          className={` w-20 h-20 border-neutral-300 rounded-full border overflow-hidden ${logoUrl ? "" : " text-3xl"}`}
        >
          <AvatarImage width={80} height={80} alt={name || ""} src={logoUrl ?? ""} className="h-full object-cover" />
          <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
            {(name || "").charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h1 className=" ml-2 text-2xl font-medium uppercase">BIENVENIDOS A {name}</h1>
      </div>
      <Tabs defaultValue="menu">
        <TabsList>
          <TabsTrigger value="menu">Menu</TabsTrigger>
          <TabsTrigger value="premios">Premios</TabsTrigger>
          <TabsTrigger value="informacion-general">Información General</TabsTrigger>
          <TabsTrigger value="galeria-de-fotos">Galeria de Fotos</TabsTrigger>
        </TabsList>
        <div className="mx-4">
          <TabsContent value="menu">
            <Accordion type="single" collapsible className="w-full">
              {Object.keys(menu || {}).map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>{key}</AccordionTrigger>
                  <AccordionContent>
                    {menu?.[key].map((item) => (
                      <div className="flex flex-col gap-2 items-center bg-slate-100 p-2 rounded" key={item.id}>
                        <Avatar>
                          <AvatarImage src={item.image ?? ""} alt="-" className="object-cover" />
                          <AvatarFallback className="bg-slate-300 w-full h-full flex items-center justify-center">
                            {name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-center">
                          <span className=" font-semibold">{item.name}</span>
                          {displayProductPrice && <span>₡ {Number(item.price ?? 0).toLocaleString()}</span>}
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="premios">
            <Accordion type="single" collapsible className="w-full">
              {Object.keys(premios || {}).map((key) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger>{key}</AccordionTrigger>
                  <AccordionContent>
                    {premios?.[key].length === 0 && <div>No hay productos asociados!</div>}
                    {premios?.[key].map((item) => (
                      <div className=" flex flex-col gap-2 items-center bg-primary-100 p-2 rounded" key={item.id}>
                        <Avatar>
                          <AvatarImage src={item.image ?? ""} alt="-" className=" object-cover" />
                          <AvatarFallback className=" bg-slate-300 w-full h-full flex items-center justify-center">
                            {name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          <TabsContent value="informacion-general">
            {business.address && (
              <>
                <span className=" font-semibold text-lg">DIRECCIÓN</span>
                <p>{business.address}</p>
                <br />
              </>
            )}

            {Schedule && (
              <>
                <span className=" font-semibold text-lg">HORARIOS</span>
                <p>{scheduleToSpanish(business.Schedule)}</p>
                <br />
              </>
            )}

            {(business.wazeLink ||
              business.googleMapLink ||
              business.facebookLink ||
              business.instagramLink ||
              business.xLink) && (
              <>
                <span className=" font-semibold text-lg">SÍGUENOS</span>
                <div>
                  {business.wazeLink && (
                    <a href={business.wazeLink} target="_blank" rel="noopener noreferrer">
                      <Locate size={24} />
                    </a>
                  )}
                  {business.googleMapLink && (
                    <a href={business.googleMapLink} target="_blank" rel="noopener noreferrer">
                      <MapPin size={24} />
                    </a>
                  )}
                  {business.facebookLink && (
                    <a href={business.facebookLink} target="_blank" rel="noopener noreferrer">
                      <Facebook size={24} />
                    </a>
                  )}
                  {business.instagramLink && (
                    <a href={business.instagramLink} target="_blank" rel="noopener noreferrer">
                      <Instagram size={24} />
                    </a>
                  )}
                  {business.xLink && (
                    <a href={business.xLink} target="_blank" rel="noopener noreferrer">
                      <X size={24} />
                    </a>
                  )}
                </div>
                <br />
              </>
            )}

            {(business.phone1 || business.phone2 || business.email) && (
              <>
                <span className=" font-semibold text-lg">CONTACTO</span>
                <div>
                  {business.phone1 && (
                    <a href={`tel:${business.phone1}`}>
                      <Phone size={24} /> {business.phone1}
                    </a>
                  )}
                  {business.phone2 && (
                    <a href={`tel:${business.phone2}`}>
                      <Phone size={24} /> {business.phone2}
                    </a>
                  )}
                  {business.email && (
                    <a href={`mailto:${business.email}`}>
                      <Mail size={24} /> {business.email}
                    </a>
                  )}
                </div>
                <br />
              </>
            )}
          </TabsContent>
          <TabsContent value="gallerua-de-fotos">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallerua-de-fotos/square/image.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallerua-de-fotos/square/image-1.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="h-auto max-w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
                  alt=""
                />
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
};

export default TabsInfo;
