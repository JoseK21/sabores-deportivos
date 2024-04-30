import { User } from "@/types/user";
import { create } from "zustand";

type EmployeesStore = {
  employees: User[];
  error: Error | null;
  setData: (newData: User[]) => void;
  setError: (error: Error) => void;
};

export const useEmployeesStore = create<EmployeesStore>((set) => ({
  employees: [],
  error: null,
  setData: (newData: User[]) => set({ employees: newData, error: null }),
  setError: (error) => set({ error }),
}));
