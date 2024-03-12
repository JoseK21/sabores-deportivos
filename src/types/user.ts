import { Role } from "@/app/enum";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
