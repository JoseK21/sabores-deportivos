import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import type { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";
import { UserRole, UserStatus } from "@/app/enum";
import { USER_STATUS } from "@/app/constants";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "jwt", maxAge: 2592000 },
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) ?? "",
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : UserRole.unknown,
          status: profile.status ? profile.status : UserStatus.unknown,
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role ? profile.role : UserRole.unknown,
          status: profile.status ? profile.status : UserStatus.unknown,
          image: profile.picture?.data?.url,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        role: { label: "Rol", type: "text", placeholder: "role" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({ where: { email: credentials?.email } });

        // validar contrasena
        if (!user) throw new Error("Usuario no encontrado");

        if (user && user.status !== UserStatus.actived) throw new Error(`Usuario ${USER_STATUS[user.status]}`);

        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role as UserRole,
            status: user.status as UserStatus,
            idBusiness: user.idBusiness ?? "N/A",
          };
        } else {
          throw new Error("Credenciales invalidas");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      if (user) token.idBusiness = user.idBusiness;
      if (user) token.status = user.status;

      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.status = token.status;
      session.user.idBusiness = token.idBusiness;

      return session;
    },
  },
};
