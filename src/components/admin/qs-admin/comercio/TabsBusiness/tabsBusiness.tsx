"use client";

import useBusinessData from "./useBusinessData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormBusiness from "@/components/admin/qs-admin/comercio/TabsBusiness/tabs/form";
import FormBusinessSchedule from "@/components/admin/qs-admin/comercio/TabsBusiness/tabs/form-schedule";
import FormBusinessContacts from "@/components/admin/qs-admin/comercio/TabsBusiness/tabs/form-social-media";

export default function TabsBusiness({ idBusiness }: { idBusiness: string | undefined }) {
  const { business, isLoaded } = useBusinessData(idBusiness);

  if (isLoaded) {
    return (
      <Tabs defaultValue="general-info" className="w-full">
        <TabsList>
          <TabsTrigger value="general-info">Información General</TabsTrigger>
          <TabsTrigger value="contacts">Contactos</TabsTrigger>
          <TabsTrigger value="schedule">Horario</TabsTrigger>
          <TabsTrigger value="gallery" disabled>
            Galeria de Fotos
          </TabsTrigger>
        </TabsList>
        <TabsContent className="pt-2 border-t" value="general-info">
          <FormBusiness business={business} />
        </TabsContent>
        <TabsContent className="pt-2 border-t" value="contacts">
          <FormBusinessContacts business={business} />
        </TabsContent>
        <TabsContent className="pt-2 border-t" value="schedule">
          <FormBusinessSchedule business={business} />
        </TabsContent>
        <TabsContent className="pt-2 border-t" value="gallery">
          <span>No Disponible</span>
        </TabsContent>
      </Tabs>
    );
  }

  return (
    <div className="flex items-start justify-between flex-col">
      <div className="w-full md:max-w-sm h-10 rounded-md animate-pulse bg-slate-200" />
      <div className="w-full h-96 mt-4 rounded-[inherit] animate-pulse bg-slate-200" />
    </div>
  );
}
