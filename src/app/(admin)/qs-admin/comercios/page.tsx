import { BusinessHeader } from "@/components/admin/qs-admin/comercios/header/header";
import BusinessTable from "@/components/admin/qs-admin/comercios/table/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BusinessHeader />
        <Separator />
        <BusinessTable />
      </div>
    </>
  );
}
