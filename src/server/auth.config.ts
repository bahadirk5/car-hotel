import { compare } from "bcrypt-ts";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { loginSchema } from "@/app/(authentication)/auth/schema";
import { getUserbyEmail } from "@/lib/user";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserbyEmail(email);
          if (!user || !user.password) {
            throw new Error("User not found.");
          }

          const passwordsMatch = await compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
