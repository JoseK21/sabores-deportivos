import { Role } from "@/app/enum";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
};
