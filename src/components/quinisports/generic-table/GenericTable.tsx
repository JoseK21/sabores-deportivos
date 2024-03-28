// "use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { getApi } from "@/lib/api";
import GenericDialog from "./dialog";

interface Props {
  path: string;
  columns: any;
  pathGet: string;
  titleModal: string;
  headerTitle: string;
  description: string;
  placeholder: string;
  textRowsSelected: string;
}


export default async function GenericTable({
  pathGet,
  columns,
  titleModal,
  headerTitle,
  description,
  placeholder,
  textRowsSelected,
}: Props) {
  const data = await getApi(pathGet);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`${headerTitle} (${data.data.length})`} description={description} />
        <GenericDialog titleModal={titleModal} />
      </div>
      <Separator />
      <DataTable
        data={data.data}
        searchKey="name"
        columns={columns}
        placeholder={placeholder}
        textRowsSelected={textRowsSelected}
      />
    </>
  );
}
