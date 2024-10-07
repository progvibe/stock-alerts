import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { Resource } from "sst";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, email }) {
      const userExists = await db.query.users.findFirst({
        with: { email },
      });

      if (!userExists) {
        await db.insert(users).values({
          email: user.email,
          name: user.name,
        });
      }
      return true;
    },
  },
});
