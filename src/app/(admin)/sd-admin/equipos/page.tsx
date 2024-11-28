import { TeamHeader } from "@/components/admin/sd-admin/equipos/header/header";
import TeamTable from "@/components/admin/sd-admin/equipos/table/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <TeamHeader />
      <Separator />
      <TeamTable />
    </>
  );
}
