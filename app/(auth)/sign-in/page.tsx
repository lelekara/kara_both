"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {
          form.reset();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
    console.log(values);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-md rounded-3xl">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-400 rounded-full p-3 mb-2 shadow-lg">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5Z"
                />
              </svg>
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
              Connectez-vous !
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Veuillez vous connecter pour accéder à plus de fonctionnalités.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-orange-500">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="JohnDoe@gmail.com"
                        {...field}
                        className="bg-gray-50 rounded-xl"
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
                    <FormLabel className="font-semibold text-pink-500">Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Entrer votre mot de passe"
                        {...field}
                        className="bg-gray-50 rounded-xl"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform">
                Connexion
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-4">
          <p className="text-sm text-gray-500">
            Vous n'avez pas de compte ?{" "}
            <Link href={"/sign-up"} className="text-orange-500 font-bold hover:underline">
              Enregistrez-vous !
            </Link>
          </p>
          <Link href="/forgot-password" className="text-xs text-pink-500 hover:underline">
            Mot de passe oublié ?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
