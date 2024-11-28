import EventsHeader from "@/components/admin/sd-admin/eventos/header";
import EventsTable from "@/components/admin/sd-admin/eventos/table";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  return (
    <>
      <EventsHeader />
      <Separator />
      <EventsTable />
    </>
  );
}
