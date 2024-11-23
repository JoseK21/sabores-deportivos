"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Grid from "@/components/pages/comercios/Content/grid";
import CategoryDropdown from "@/components/pages/comercios/Header/categoryDropdown";

const GridFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [search, handleSearch] = useState("");
  const [category, handleCategories] = useState("");

  useEffect(() => {
    handleSearch(searchParams.get("search") ?? "");
    handleCategories(searchParams.get("category") ?? "");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    search ? params.set("search", search) : params.delete("search");
    category ? params.set("category", category) : params.delete("category");

    replace(`${pathname}?${params.toString()}`);
  }, [search, category]);

  return (
    <>
      <CategoryDropdown
        search={search}
        category={category}
        handleSearch={handleSearch}
        handleCategories={handleCategories}
      />
      <Grid search={search} category={category} />
    </>
  );
};

export default GridFilter;
