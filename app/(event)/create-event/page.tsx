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
  formSchema
} from "@/lib/event-schema"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreateEventPage() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
    <Card className="w-full max-w-3xl mx-auto mt-10">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Créer un évènement</CardTitle>
            <CardDescription className="text-muted-foreground">
                Créez un évènement en remplissant le formulaire ci-dessous.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input 
                placeholder="évènement de ..."
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptions</FormLabel>
              <FormControl>
                <Input 
                placeholder="Entrez une description"
                
                type="text"
                {...field} />
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
              <FormLabel>Code secret</FormLabel>
              <FormControl>
                <Input 
                placeholder="Votre code secret"
                
                type="number"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Créer l'évènement</Button>
      </form>
    </Form>
        </CardContent>
        <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
                En créant cet évènement, vous acceptez nos{" "}
                <a href="#" className="underline">conditions d'utilisation</a> et notre{" "}
                <a href="#" className="underline">politique de confidentialité</a>.
            </p>
        </CardFooter>
    </Card>
    </div>
  )
}