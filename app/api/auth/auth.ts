import { getServerSession } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";

const SECRET_KEY = process.env.NEXTAUTH_SECRET;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}

export const authConfig = {
  pages: {
    signIn: "/admin/signin",
  },
  secret: SECRET_KEY,
  callbacks: {},
  providers: [],
} satisfies NextAuthOptions;