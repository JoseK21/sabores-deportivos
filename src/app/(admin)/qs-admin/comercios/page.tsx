import { BusinessHeader } from "@/components/admin/qs-admin/comercios/header/header";
import BusinessTable from "@/components/admin/qs-admin/comercios/table/table";
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
