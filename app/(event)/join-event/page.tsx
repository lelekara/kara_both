"use client"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  formSchemaJoin
} from "@/lib/event-schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function JoinEventPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchemaJoin>>({
    resolver: zodResolver(formSchemaJoin),
    defaultValues: {
      title: "",
      secret: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchemaJoin>) {
    // Utilise 'titre' au lieu de 'title' pour correspondre à la DB
    const titre = values.title;
    const { secret } = values;

    try {
      const url = `/api/evenements/join?titre=${encodeURIComponent(titre ?? "")}` + (secret ? `&secret=${encodeURIComponent(secret)}` : "");
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch event data');
          }
          return response.json();
        })
        .then((data) => {
          if (data.success && data.data?.id) {
            toast.success('Successfully joined the event!');
            window.location.href = `/evenement/${data.data.id}`;
          } else {
            toast.error(data.message || 'Invalid title or secret code.');
          }
        })
        .catch((error) => {
          console.error('Error joining event:', error);
          toast.error('Failed to join the event. Please try again.');
        });
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4">
      <Card className="w-full max-w-xl mx-auto rounded-3xl shadow-2xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className="text-center  rounded-t-3xl">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-400 rounded-full p-3 mb-2 shadow-lg">
              <LogIn className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
              Rejoindre un évènement
            </CardTitle>
            <CardDescription className="text-gray-600 font-medium">
              Entrez le titre et le code secret ou scannez le QRCode pour rejoindre un évènement.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-orange-500">Titre de l'évènement</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Anniversaire de Marie"
                        type="text"
                        className="bg-gray-50 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-pink-500">Code secret</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Votre code secret"
                          type={showPassword ? "text" : "password"}
                          className="bg-gray-50 rounded-xl pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 flex items-center px-3"
                          onClick={() => setShowPassword((prev) => !prev)}
                          tabIndex={-1}
                        >
                          {showPassword ? <Eye className="text-pink-400" /> : <EyeOff className="text-pink-400" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                Rejoindre l'évènement
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col text-center border-t px-6 py-4">
          <p className="text-sm text-gray-500">
            En rejoignant cet évènement, vous acceptez nos{" "}
            <a href="#" className="text-orange-500 font-bold hover:underline">
              conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-pink-500 font-bold hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}