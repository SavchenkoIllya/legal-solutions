import NextAuth from "next-auth";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

const secretKey = "pMXEqOO3xX7Y2U3slnSqqIvdLwBczbHV3y3lqq12Btc=";

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/admin/signin",
  },
  secret: secretKey,
  callbacks: {
    // async authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
    //   const isOnAuth = nextUrl.pathname.indexOf("/auth") == 0;
    //   const empty = nextUrl.pathname === "/dashboard";
    //   if (isLoggedIn) {
    //     if (empty || isOnAuth) {
    //       return NextResponse.redirect(new URL("/dashboard/profile", nextUrl));
    //     }
    //     if (isOnDashboard) {
    //       return true;
    //     }
    //   } else {
    //     if (isOnAuth) {
    //       return true;
    //     }
    //     return NextResponse.redirect(new URL("/", nextUrl));
    //   }
    // },
  },
  providers: [],
};

async function getUser(email: string): Promise<any | undefined> {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

const handler = NextAuth({
  ...authConfig,
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. 'Sign in with...')
    //   name: "Credentials",
    //   // The credentials is used to generate a suitable form on the sign in page.
    //   // You can specify whatever fields you are expecting to be submitted.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     // You need to provide your own logic here that takes the credentials
    //     // submitted and returns either a object representing a user or value
    //     // that is false/null if the credentials are invalid.
    //     // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
    //     // You can also use the `req` object to obtain additional parameters
    //     // (i.e., the request IP address)
    //     const res = await fetch("/your/endpoint", {
    //       method: "POST",
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     const user = await res.json();
    //     // If no error and we have user data, return it
    //     if (res.ok && user) {
    //       return user;
    //     }
    //     // Return null if user data could not be retrieved
    //     return null;
    //   },
    // }),
  ],
});

export { handler as GET, handler as POST };

// export const { signIn, signOut, auth } = NextAuth();

// Credentials({
//   async authorize(credentials: any) {
//     if (credentials) {
//       const { email, password } = credentials;
//       const user = await getUser(email);

//       if (!user) {
//         throw new Error("No user found");
//       }

//       const passwordsMatch = await bcrypt.compare(password, user.password);
//       if (passwordsMatch) {
//         return user;
//       }
//     }
//   },
// }),
