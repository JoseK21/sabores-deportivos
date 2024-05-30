"use client";

import { SetStateAction, useMemo, useState } from "react";

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useBusinessStore } from "@/store/businessStore";
import { BUSINESS_TYPES } from "@/app/constants";
import { BusinessTypes } from "@/app/enum";
import { Input } from "@/components/ui/input";

interface CategoryDropdownProps {
  handleTextChange: (filterText: string) => void;
  filterText: string;
  handleCategories: (categoryName: string) => void;
}

type CategoryT = {
  type: string;
  name: string;
};

const CategoryDropdown = ({ handleTextChange, filterText, handleCategories }: CategoryDropdownProps) => {
  const { businesses } = useBusinessStore();

  const categories: CategoryT[] = useMemo(
    () =>
      businesses.reduce((acc, { type }) => {
        if (!acc.some((business) => business.type === type))
          acc.push({ type, name: BUSINESS_TYPES[type as BusinessTypes] });

        return acc;
      }, [] as CategoryT[]),
    [businesses]
  );

  return (
    <div className="flex justify-end my-7 px-2 gap-3">
      <Input
        type="text"
        placeholder="Nombre"
        className=" max-w-60"
        value={filterText}
        onChange={(event) => handleTextChange(event.target.value)}
      />

      <Select onValueChange={(type) => handleCategories(categories.find(({ name }) => type === name)?.type || "")}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipos" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipos</SelectLabel>
            <SelectItem value="*">Todos</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.type} value={category.name}>
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
