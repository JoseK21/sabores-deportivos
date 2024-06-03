import { create } from "zustand";

import { User } from "@/types/user";
import { ProductType } from "@/types/product-type";
import { Product } from "@/types/product";
import { Prize } from "@/types/prize";
import { Business } from "@/types/business";

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

export const usePrizesStore = create<{
  prizes: Prize[];
  error: Error | null;
  setData: (newData: Prize[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  prizes: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ prizes: data, error: null }),
}));

export const useBusinessStore = create<{
  business: Business;
  error: Error | null;
  setData: (newData: Business) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  business: {} as Business,
  setError: (error) => set({ error }),
  setData: (data) => set({ business: data, error: null }),
}));

export const useBusinessesStore = create<{
  businesses: Business[];
  error: Error | null;
  setData: (newData: Business[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  businesses: [],
  error: null,
  setData: (newData) => set({ businesses: newData, error: null }),
  setError: (error) => set({ error }),
}));