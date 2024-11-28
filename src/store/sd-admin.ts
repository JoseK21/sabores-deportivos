import { create } from "zustand";

import { User } from "@/types/user";
import { Prize } from "@/types/prize";
import { Sport } from "@/types/sport";
import { League } from "@/types/league";
import { Product } from "@/types/product";
import { Business } from "@/types/business";
import { Tournament } from "@/types/tournament";
import { ProductType } from "@/types/product-type";

import { REvent } from "@/relatedTypes/event";
import { RTeam } from "@/relatedTypes/team";

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

export const useLeaguesStore = create<{
  leagues: League[];
  error: Error | null;
  setData: (newData: League[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  leagues: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ leagues: data, error: null }),
}));

export const useSportsStore = create<{
  sports: Sport[];
  error: Error | null;
  setData: (newData: Sport[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  sports: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ sports: data, error: null }),
}));

export const useTournamentsStore = create<{
  tournaments: Tournament[];
  error: Error | null;
  setData: (newData: Tournament[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  tournaments: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ tournaments: data, error: null }),
}));

export const useEventsStore = create<{
  events: REvent[];
  error: Error | null;
  setData: (newData: REvent[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  events: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ events: data, error: null }),
}));

export const useTeamsStore = create<{
  teams: RTeam[];
  error: Error | null;
  setData: (newData: RTeam[]) => void;
  setError: (error: Error) => void;
}>((set) => ({
  error: null,
  teams: [],
  setError: (error) => set({ error }),
  setData: (data) => set({ teams: data, error: null }),
}));
