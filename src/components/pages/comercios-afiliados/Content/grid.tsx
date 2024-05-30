"use client";

import React, { use, useEffect, useState } from "react";
import { Business } from "@/types/business";
import ComercioCard from "@/components/quinisports/general/ComercioCard";
import useBusinessData from "@/components/admin/qs-admin/comercios/table/useBusinessData";

type Props = {
  filterText: string;
  category: string;
};

const Grid = ({ filterText, category }: Props) => {
  const { error, isLoaded, businesses } = useBusinessData();
  const [filterBusinesses, setFilter] = useState<Business[]>([]);
  
  useEffect(() => {
    let fb: Business[] = [];
    fb = businesses.filter((x) => {
      const isNameIncluded = filterText ? x.name.includes(filterText) : true;
      const isSameCategory = category && category !== "*" ? x.type === category : true
      return isNameIncluded && isSameCategory
    });
    setFilter(fb);
  }, [filterText, category]);

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
    <div className="grid grid-cols-4 gap-4">
      {filterBusinesses.map((business) => (
        <ComercioCard key={business.id} {...business} />
      ))}
      {!filterBusinesses.length && (
        <>
         <span>Sin resultados</span>
        </>
      )}
    </div>
  );
};

export default Grid;
