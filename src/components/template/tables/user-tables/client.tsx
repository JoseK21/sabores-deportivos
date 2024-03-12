"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

interface ProductsClientProps {
  data: User[];
  headerTitle: string;
  description: string;
  path: string;
  columns: any;
  placeholder: string;
  textRowsSelected: string;
}

export const UserClient: React.FC<ProductsClientProps> = ({
  data,
  headerTitle,
  description,
  path,
  columns,
  placeholder,
  textRowsSelected,
}) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={headerTitle} description={description} />
        <Button className="text-xs md:text-sm" onClick={() => router.push(`${path}/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Agregar Nuevo
        </Button>
      </div>
      <Separator />
      <DataTable
        data={data}
        searchKey="name"
        columns={columns}
        placeholder={placeholder}
        textRowsSelected={textRowsSelected}
      />
    </>
  );
};
