import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import TabsBusiness from "@/components/admin/qs-admin/comercio/TabsBusiness/tabsBusiness";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const idBusiness = session?.user.idBusiness || "";

  return (
    <>
      <TabsBusiness idBusiness={idBusiness} />
    </>
  );
}
