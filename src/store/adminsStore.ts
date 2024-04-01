import { User } from "@/types/user";
import { create } from "zustand";

type AdminsStore = {
  admins: User[];
  error: Error | null;
  setData: (newData: User[]) => void;
  setError: (error: Error) => void;
};

export const useAdminsStore = create<AdminsStore>((set) => ({
  admins: [],
  error: null,
  setData: (newData) => set({ admins: newData, error: null }),
  setError: (error) => set({ error }),
}));

// const FAIR_SELLERS = 'fairSellers'

// export const useFairSellersStore = create((set) => (
//   {
//     [FAIR_SELLERS]: [],

//     fetchFairSellers: (fairSellers) => fetchItems(set, { fairSellers }),
//     addFairSeller: (fairSeller) => addItem(set, FAIR_SELLERS, fairSeller),
//     updateFairSeller: (updatedFairSeller) => updateItem(set, FAIR_SELLERS, updatedFairSeller),
//     deleteFairSeller: (idFairSeller) => deleteItem(set, FAIR_SELLERS, idFairSeller)
//   }
// ))
