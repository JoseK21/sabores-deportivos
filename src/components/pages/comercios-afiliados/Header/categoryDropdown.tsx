"use client";

import { useEffect, useMemo } from "react";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useBusinessesStore } from "@/store/sd-admin";
import { BUSINESS_TYPES } from "@/app/constants";
import { BusinessTypes } from "@/app/enum";
import { InputWithClean } from "@/components/ui/input-with-clean";

interface CategoryDropdownProps {
  search: string;
  category: string;
  handleSearch: (search: string) => void;
  handleCategories: (categoryName: string) => void;
}

type CategoryT = {
  type: string;
  name: string;
};

const CategoryDropdown = ({ handleSearch, handleCategories, search, category }: CategoryDropdownProps) => {
  const { businesses } = useBusinessesStore();

  const categories: CategoryT[] = useMemo(
    () =>
      businesses.reduce((acc, { type }) => {
        if (!acc.some((business) => business.type === type))
          acc.push({ type, name: BUSINESS_TYPES[type as BusinessTypes] });

        return acc;
      }, [] as CategoryT[]),
    [businesses]
  );

  useEffect(() => {
    if (category && categories.length && !categories.find(({ type }) => category === type)) {
      handleCategories("");
    }
  }, [category, categories]);

  return (
    <div className="flex justify-end mb-7 px-2 gap-3">
      <InputWithClean type="text" placeholder="Nombre" className=" max-w-60" value={search} handle={handleSearch} />

      <Select
        value={categories.find(({ type }) => category === type)?.name || ""}
        onValueChange={(type) => handleCategories(categories.find(({ name }) => type === name)?.type || "")}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipos" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipos</SelectLabel>
            <SelectItem value="*">Todos</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.type} value={category.name} id={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryDropdown;
