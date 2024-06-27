import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../interfaces/users/users.api";
import { authConfig } from "../auth";

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
