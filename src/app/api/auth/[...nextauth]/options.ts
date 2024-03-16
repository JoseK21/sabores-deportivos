import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import type { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  // debug: true,
  secret: (process.env.NEXTAUTH_SECRET as string) ?? "",
  session: {
    strategy: "jwt",
    maxAge: 2592000, // 30 days
  },
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) ?? "",
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     id: { label: "Id", type: "number", placeholder: "jsmith" },
    //     email: { label: "Email", type: "text", placeholder: "jsmith" },
    //     name: { label: "Nombre", type: "text", placeholder: "..." },
    //     role: { label: "Rol", type: "text", placeholder: "..." },
    //     password: { label: "Password", type: "password", placeholder: "*****" },
    //   },
    //   async authorize(credentials, req) {
    //     console.log(credentials);

    //     const userFound = await prisma.user.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });

    //     if (!userFound) throw new Error("No user found");

    //     return {
    //       id: userFound.id,
    //       name: userFound.name,
    //       role: userFound.role,
    //       email: userFound.email,
    //     };
    //   },
    // }),
  ],
  pages: {
    // signIn: "/auth/login",
    // --- DEFAULT VALUES ---
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user'
  },
};
