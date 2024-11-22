import LeaguesHeader from "@/components/admin/sd-admin/ligas/header";
import LeaguesTable from "@/components/admin/sd-admin/ligas/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <LeaguesHeader />
      <Separator />
      <LeaguesTable />
    </>
  );
}
