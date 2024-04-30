import { Business } from "@/types/business";
import { create } from "zustand";

type UserBusinessStore = {
  business: Business;
  error: Error | null;
  setData: (newData: Business) => void;
  setError: (error: Error) => void;
};

export const useUserBusinessStore = create<UserBusinessStore>((set) => ({
  business: {} as Business,
  error: null,
  setData: (newData) => set({ business: newData, error: null }),
  setError: (error) => set({ error }),
}));
