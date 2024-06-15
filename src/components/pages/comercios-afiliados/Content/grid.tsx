"use client";
import { format } from "date-fns";
import { SearchX } from "lucide-react";
import { Business } from "@/types/business";
import { Schedule } from "@/types/schedule";
import React, { use, useEffect, useState } from "react";
import ComercioCard from "@/components/quinisports/general/ComercioCard";
import useBusinessData from "@/components/admin/qs-admin/comercios/table/useBusinessData";

type Props = {
  search: string;
  category: string;
};

// Function to calculate half an hour before in HHMM format

const Grid = ({ search, category }: Props) => {
  const { error, isLoaded, businesses } = useBusinessData();
  const [filterBusinesses, setFilter] = useState<Business[]>([]);

  useEffect(() => {
    let fb: Business[] = [];

    fb = businesses.filter((x) => {
      const isNameIncluded = search ? x.name.toLowerCase().includes(search.toLowerCase()) : true;
      const isSameCategory = category && category !== "*" ? x.type === category : true;

      return isNameIncluded && isSameCategory;
    });
    setFilter(fb);
  }, [search, category, businesses]);

  useEffect(() => {
    setFilter(isLoaded ? businesses : []);
  }, [isLoaded, businesses]);

  if (!isLoaded) {
    return (
      <>
        <div className="flex items-start flex-row gap-4">
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
        </div>
        <div className="flex items-start flex-row gap-4 mt-4">
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
          <div className="max-w-sm w-96 h-96 rounded-md animate-pulse bg-slate-200" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div>
        <span>Ocurrio un error, por favor refrescar el navegador</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {filterBusinesses.map((business) => (
          <ComercioCard key={business.id} {...business} />
        ))}
      </div>
      <>
        {!filterBusinesses.length && (
          <div className="flex items-center flex-col w-full gap-2">
            <SearchX size={24} color="#9a9a9a" />
            <span>Sin resultados</span>
          </div>
        )}
      </>
    </>
  );
};

export default Grid;
