import SportsHeader from "@/components/admin/sd-admin/deportes/header";
import SportsTable from "@/components/admin/sd-admin/deportes/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <SportsHeader />
      <Separator />
      <SportsTable />
    </>
  );
}
