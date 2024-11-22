import { BusinessHeader } from "@/components/admin/sd-admin/comercios/header/header";
import BusinessTable from "@/components/admin/sd-admin/comercios/table/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <BusinessHeader />
      <Separator />
      <BusinessTable />
    </>
  );
}
