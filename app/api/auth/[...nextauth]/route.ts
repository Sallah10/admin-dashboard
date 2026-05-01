// app/api/auth/[...nextauth]/route.ts
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  // debug: process.env.NODE_ENV === "development",
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // This callback ensures the user ID and role are accessible in the session object
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // @ts-ignore - NextAuth types are notoriously strict, this safely passes our DB role
        session.user.role = user.role;
      }
      return session;
    },
    async redirect() {
      return "/";
    },
  },
};

const handler = NextAuth(authOptions);

// In App Router, we export GET and POST for API routes
export { handler as GET, handler as POST };
