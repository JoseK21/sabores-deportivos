import { UserRole, UserStatus } from "@/app/enum";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
};
