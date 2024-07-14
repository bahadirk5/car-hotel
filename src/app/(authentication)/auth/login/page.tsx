"use client";

import Link from "next/link";

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
import { loginSchema } from "../schema";
import { Button } from "@/components/ui/button";
import { login } from "../actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    sign_in(values);
  }

  const { isPending, mutate: sign_in } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login successful");
      router.push("/");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error("Email or password is not matching!");
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
                    <div className="flex justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
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
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="underline">
              Sign up
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
       <div className="relative px-12 pt-24 z-20">
          <h1 className="text-4xl flex items-center font-bold tracking-tight text-primary-foreground">
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
