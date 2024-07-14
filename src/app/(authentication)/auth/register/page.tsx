"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "../schema";
import { signUp } from "../actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    sign_up(values);
  }

  const { isPending, mutate: sign_up } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      toast.error(error.message || "Error creating user");
    },
  });

  return (
    <div className="min-h-screen w-full p-4 lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="grid w-full items-center gap-6 md:w-2/3">
          <div className="grid gap-2 text-center">
            <h1 className="text-5xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="h-14 text-2xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        className="h-14 text-2xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 text-2xl"
                        type="password"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="h-14 w-full"
                disabled={isPending}
                type="submit"
              >
                {isPending ? "loading" : "Submit"}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm">
            Do you allready have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden rounded-lg bg-muted lg:block">
        <Image
          src="/poster.webp"
          alt="Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 h-full w-full rounded-lg object-cover brightness-[0.6]"
        />
        <div className="relative z-20 px-12 pt-24">
          <h1 className="flex items-center text-4xl font-bold tracking-tight text-primary-foreground">
            <Github className="mr-1 h-8 w-8" />
            Süper CEMİLE
          </h1>
          <p className="max-w-sm leading-7 text-muted [&:not(:first-child)]:mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, est
            quos! Nihil est, voluptatibus fuga dolorem a esse nisi omnis!
          </p>
        </div>
      </div>
    </div>
  );
}
