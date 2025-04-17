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
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";



export default function SignUp() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name,email,password}  = values;
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/sign-in",
    },
    {
      onRequest: (ctx) => {
        toast.message(`Creating your account...`, {
          action: { label: "Cancel", onClick: () => ctx.abort() },
        });
      },
      onSuccess: (ctx) => {
        form.reset();
        toast.success("Account created successfully!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
    console.log(values);
  }


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>s'enregistrer</CardTitle>
        <CardDescription>
          Veuillez crééer un compte on s'occupe du reste!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                    <Input placeholder="John@exemple.com" {...field} />
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
            <Button className="w-full" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col items-center space-y-4">
        <p className="text-sm text-muted-foreground">
         Vous avez déja un compte ? {" "}
          <Link href={"/sign-in"} className="text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
