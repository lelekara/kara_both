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
  const { data: sessionData } = authClient.useSession()
  console.log("Session data:", sessionData)

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
      // Send data to the API
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
          console.log("Form submitted successfully:", data)
          toast.success("Événement créé avec succès!")
          redirect("/dashboard")
        })
        .catch((error) => {
          console.error("Error submitting form:", error)
          toast.error("Échec de la création de l'événement. Veuillez réessayer.")
        })
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Échec de la création de l'événement. Veuillez réessayer.")
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8 flex flex-col">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au tableau de bord
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Créer un événement</h1>
        <p className="text-muted-foreground mt-1">Remplissez le formulaire pour créer un nouvel événement</p>
      </div>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle>Détails de l'événement</CardTitle>
              <CardDescription>Fournissez les informations nécessaires pour votre événement</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      <Pencil className="h-4 w-4 mr-2 text-muted-foreground" />
                      Titre de l'événement
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Anniversaire de Marie, Réunion d'équipe..."
                        className="bg-background"
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
                    <FormLabel className="flex items-center">
                      <Info className="h-4 w-4 mr-2 text-muted-foreground" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez votre événement, incluez des détails importants..."
                        className="min-h-[120px] bg-background resize-y"
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
                    <FormLabel className="flex items-center">
                      <Key className="h-4 w-4 mr-2 text-muted-foreground" />
                      Code secret
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Créez un code secret pour votre événement"
                        className="bg-background"
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
                <Button type="submit" className="w-full sm:w-auto">
                  Créer l'événement
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col text-center border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">
            En créant cet événement, vous acceptez nos{" "}
            <a href="#" className="text-primary hover:underline">
              conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="#" className="text-primary hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
