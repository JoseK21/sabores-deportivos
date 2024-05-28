"use client";

import React from "react";

import ComercioCard from "@/components/quinisports/general/ComercioCard";
import useBusinessData from "@/components/admin/qs-admin/comercios/table/useBusinessData";

const Grid = () => {
  const { isLoaded, businesses, error } = useBusinessData();

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
      {businesses.map((business) => (
        <ComercioCard key={business.id} {...business} />
      ))}
    </div>
  );
};

export default Grid;
