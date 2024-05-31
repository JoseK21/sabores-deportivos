import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import FormBusiness from "@/components/admin/qs-admin/comercio/form";
import FormBusinessSchedule from "@/components/admin/qs-admin/comercio/form-schedule";
import FormBusinessSocialMedia from "@/components/admin/qs-admin/comercio/form-social-media";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getApi } from "@/lib/api";
import { Business } from "@/types/business";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness || "";

  const newData = await getApi(`api/business/${idBusiness}`);

  const data = newData?.data ?? ({} as Business);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Tabs defaultValue="general-info" className="w-full">
          <TabsList>
            <TabsTrigger value="general-info">Información General</TabsTrigger>
            <TabsTrigger value="social-media">Redes Sociales</TabsTrigger>
            <TabsTrigger value="schedule">Horarios</TabsTrigger>
          </TabsList>
          <TabsContent className="pt-2 border-t" value="general-info">
            <FormBusiness data={data} />
          </TabsContent>
          <TabsContent className="pt-2 border-t" value="social-media">
            <FormBusinessSocialMedia data={data} />
          </TabsContent>
          <TabsContent className="pt-2 border-t" value="schedule">
            <FormBusinessSchedule schedule={data.Schedule} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
