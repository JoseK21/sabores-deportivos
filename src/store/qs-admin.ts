import { create } from "zustand";

import { User } from "@/types/user";
import { ProductType } from "@/types/product-type";
import { Product } from "@/types/product";

export const useAdminsStore = create<{
  admins: User[];
  error: Error | null;
  setData: (newData: User[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  admins: [],
  setError: (error) => set({ error }),
  setData: (newData) => set({ admins: newData, error: null }),
}));

export const useProductTypesStore = create<{
  productTypes: ProductType[];
  error: Error | null;
  setData: (newData: ProductType[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  productTypes: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ productTypes: data, error: null }),
}));

export const useProductsStore = create<{
  products: Product[];
  error: Error | null;
  setData: (newData: Product[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  products: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ products: data, error: null }),
}));
