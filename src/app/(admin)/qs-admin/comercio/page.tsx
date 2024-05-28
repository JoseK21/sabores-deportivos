import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import FormBusiness from "@/components/admin/qs-admin/comercio/form";
import { Business } from "@/types/business";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness || "";
  console.log("🚀 >>  Page >>  idBusiness:", idBusiness);

  const data = {} as Business;

  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <FormBusiness data={data} />
      </div>
    </>
  );
}
