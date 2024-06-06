import { getApi } from "@/lib/api";
import { Business } from "@/types/business";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TabsBusiness from "@/components/admin/qs-admin/comercio/TabsBusiness/tabsBusiness";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness || "";

  const newData = await getApi(`business/${idBusiness}`);

  const data = newData?.data ?? ({} as Business);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <TabsBusiness idBusiness={idBusiness} />
    </div>
  );
}
