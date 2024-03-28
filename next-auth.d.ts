// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { UserRole } from "@/app/enum";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: UserRole;
      email: string;
      image: string;
      password?: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: UserRole;
  }
}
