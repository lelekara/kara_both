"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema } from "@/lib/event-schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { ArrowLeft, Calendar, Info, Key, Pencil } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { redirect } from "next/navigation"

export default function CreateEventPage() {
  const { data: sessionData} = authClient.useSession();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      Description: "",
      secret: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, Description, secret } = values

    try {
      fetch("/api/evenements/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, Description, secret, userId: sessionData?.user.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit the form")
          }
          return response.json()
        })
        .then((data) => {
          toast.success("Événement créé avec succès!")
          redirect("/dashboard")
        })
        .catch((error) => {
          toast.error("Échec de la création de l'événement. Veuillez réessayer.")
        })
    } catch (error) {
      toast.error("Échec de la création de l'événement. Veuillez réessayer.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4 md:p-8 flex flex-col">
      <div className="mb-8 max-w-3xl mx-auto">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
        </Button>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
          Créer un événement
        </h1>
        <p className="text-lg text-gray-700 font-medium">
          Remplissez le formulaire pour créer un nouvel événement et partager vos souvenirs.
        </p>
      </div>

      <Card className="w-full max-w-3xl mx-auto rounded-3xl shadow-2xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className=" rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-400 flex items-center justify-center shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                Détails de l'événement
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium">
                Fournissez les informations nécessaires pour votre événement
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center font-semibold text-orange-500">
                      <Pencil className="h-4 w-4 mr-2 text-orange-400" />
                      Titre de l'événement
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Anniversaire de Marie, Réunion d'équipe..."
                        className="bg-gray-50 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Choisissez un titre clair et descriptif pour votre événement</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center font-semibold text-pink-500">
                      <Info className="h-4 w-4 mr-2 text-pink-400" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre événement, incluez des détails importants..."
                        className="min-h-[120px] bg-gray-50 rounded-xl resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Fournissez des détails sur l'événement pour informer les participants
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center font-semibold text-yellow-500">
                      <Key className="h-4 w-4 mr-2 text-yellow-400" />
                      Code secret
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Créez un code secret pour votre événement"
                        className="bg-gray-50 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Ce code sera utilisé par les participants pour rejoindre votre événement
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto h-14 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                >
                  Créer l'événement
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col text-center border-t px-6 py-4">
          <p className="text-sm text-gray-500">
            En créant cet événement, vous acceptez nos{" "}
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
