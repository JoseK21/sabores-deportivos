import { UserRole } from "@/app/enum";
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
  role: UserRole;
  remove: () => void;
  set: (newRole: UserRole) => void;
};

export const useRoleStore = create<RolStore>((set) => ({
  role: UserRole.client,
  remove: () => set(() => ({ role: UserRole.client })),
  set: (newRole: UserRole) => set(() => ({ role: newRole })),
}));
