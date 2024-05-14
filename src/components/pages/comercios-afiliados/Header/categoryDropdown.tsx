"use client";

import { useMemo } from "react";

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

export default function CategoryDropdown() {
  const { businesses } = useBusinessStore();

  const categories: string[] = useMemo(
    () =>
      businesses.reduce((acc, { type }) => {
        const businessName = BUSINESS_TYPES[type as BusinessTypes];

        if (!acc.includes(businessName)) {
          acc.push(businessName);
        }

        return acc;
      }, [] as string[]),
    [businesses]
  );

  return (
    <div className="flex justify-end my-7 px-2 gap-3">
      <Input type="text" placeholder="Nombre" className=" max-w-60" />

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipos" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipos</SelectLabel>
            <SelectItem value="*">Todos</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
