import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../interfaces/users/users.api";
import { getServerSession } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

const SECRET_KEY = "pMXEqOO3xX7Y2U3slnSqqIvdLwBczbHV3y3lqq12Btc=";

export const authConfig = {
  pages: {
    signIn: "/admin/signin",
  },
  secret: SECRET_KEY,
  callbacks: {},
  providers: [],
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}

const handler = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "default@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await loginUser({
          email: credentials?.email,
          password: credentials?.password,
        });

        if (user) {
          const { id, name, email } = user;

          return { id, name, email } as any;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
