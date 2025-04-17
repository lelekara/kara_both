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
  // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email,password}  = values;
    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
    },
    {
      onRequest: (ctx) => {
        
      },
      onSuccess: (ctx) => {
        form.reset();
      },
      onError: (ctx) => {
        alert(ctx.error.message);
      },
    });
    console.log(values);
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connecter vous ! </CardTitle>
        <CardDescription>
          veuillez vous connecter pour accèder à plus.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="JohnDoe@gmail.com" {...field} />
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
                  <FormLabel>mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Entrer votre mot de passe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">Connexion</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <p className="text-sm text-muted-foreground">
         Vous n'avez pas de compte ? {" "}
          <Link href={"/sign-up"} className="text-primary hover:underline">
            Enregistrer vous!
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
