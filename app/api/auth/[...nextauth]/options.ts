import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { upsertUser } from "@/lib/auth/upsertUser";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      const id = await upsertUser({
        email: user.email,
        full_name: user.name ?? null,
        avatar_url: user.image ?? null,
      });

      return Boolean(id);
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const { createServerClient } = await import("@/lib/supabase");
        const supabase = createServerClient();
        const { data } = await supabase.from("thor_users").select("id").eq("email", user.email).maybeSingle();
        if (data?.id) token.sub = data.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
};
