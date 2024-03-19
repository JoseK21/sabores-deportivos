import { Role } from "@/app/enum";
import { create } from "zustand";

type CartStore = {
  cart: number;
  add: () => void;
  remove: () => void;
  removeAll: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cart: 0,
  add: () => set((state) => ({ cart: state.cart + 1 })),
  remove: () => set((state) => ({ cart: state.cart - 1 })),
  removeAll: () => set({ cart: 0 }),
}));

type RolStore = {
  role: Role;
  remove: () => void;
  set: (newRole: Role) => void;
};

export const useRoleStore = create<RolStore>((set) => ({
  role: Role.unknowen,
  remove: () => set(() => ({ role: Role.unknowen })),
  set: (newRole: Role) => set(() => ({ role: newRole })),
}));
