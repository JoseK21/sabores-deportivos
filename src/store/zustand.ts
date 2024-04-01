import { UserRole } from "@/app/enum";
import { User } from "@/types/user";
import { create } from "zustand";

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

