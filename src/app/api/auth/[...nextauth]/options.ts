import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";

import type { Adapter } from "next-auth/adapters";
import { NextAuthOptions } from "next-auth";
import { Role } from "@/app/enum";

export const authOptions: NextAuthOptions = {
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
      profile(profile, tokens) {
        console.log("🚀 >>  profile >>  tokens:", tokens);
        console.log("🚀 >>  profile >>  profile:", profile);

        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : Role.client,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials, req) {
        console.log("credentials: ", credentials);

        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        // validar contrasena
        if (!userFound) throw new Error("No user found");

        return {
          id: userFound.id,
          name: userFound.name,
          role: userFound.role as Role,
          email: userFound.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
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
