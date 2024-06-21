import { getServerSession } from "next-auth";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextAuthOptions } from "next-auth";

const SECRET_KEY = "pMXEqOO3xX7Y2U3slnSqqIvdLwBczbHV3y3lqq12Btc=";

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