import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import clientPromise from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import connectDb from "@/utils/connectDb";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
        },
        password: {
          type: "password",
        },
      },
      async authorize(credentials) {
        await connectDb();
        const user = await User.findOne({ email: credentials?.email });
        if (
          !user ||
          !user.password ||
          !(await bcrypt.compare(credentials!.password, user.password))
        ) {
          throw new Error("Email hoặc mật khẩu không chính xác.");
        }

        return user;
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/dang-nhap",
  },
});
