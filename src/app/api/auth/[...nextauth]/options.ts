import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

import GoogleProvider from "next-auth/providers/google";

import { NextAuthOptions } from "next-auth";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID as string) ?? "",
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET as string) ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!userFound) throw new Error("No user found");

        return {
          id: userFound.id,
          name: userFound.name,
          role: userFound.role,
          email: userFound.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
};
