import { Business } from "@/types/business";
import { create } from "zustand";

type BusinessStore = {
  businesses: Business[];
  error: Error | null;
  setData: (newData: Business[]) => void;
  setError: (error: Error) => void;
};

export const useBusinessStore = create<BusinessStore>((set) => ({
  businesses: [],
  error: null,
  setData: (newData) => set({ businesses: newData, error: null }),
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
