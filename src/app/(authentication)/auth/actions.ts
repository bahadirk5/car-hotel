"use server";

import { z } from "zod";
import { hash } from "bcrypt-ts";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

import { loginSchema, registerSchema } from "./schema";
import { eq } from "drizzle-orm";

import { signIn } from "@/server/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(values: z.infer<typeof registerSchema>) {
  const hashedPassword = await hash(values.password, 10);

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, values.email),
  });

  if (existingUser) {
    throw new Error("Email allready in use!");
  }

  try {
    await db.insert(users).values({
      email: values.email,
      password: hashedPassword,
      name: values.name,
    });

    await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }

  revalidatePath("/");
  redirect("/");
}

export async function login(values: z.infer<typeof loginSchema>) {
  await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  });
}
