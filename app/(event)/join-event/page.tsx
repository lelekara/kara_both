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
import { Eye, EyeOff } from "lucide-react"

export default function JoinEventPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm < z.infer < typeof formSchemaJoin >> ({
    resolver: zodResolver(formSchemaJoin),
    defaultValues: {
      title: "",
      secret: "",
    },

  })

  function onSubmit(values: z.infer < typeof formSchemaJoin > ) {
    const { title, secret } = values;

    try {
      fetch(`/api/evenements/join?title=${encodeURIComponent(title)}&secret=${encodeURIComponent(secret)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch event data');
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            toast.success('Successfully joined the event!');
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
    <div className="flex items-center justify-center h-screen">
    <Card className="w-full max-w-3xl mx-auto mt-10">
        <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Rejoindre un évènement</CardTitle>
            <CardDescription className="text-muted-foreground">
                Rejoindre un évènement en entrant le titre de l'évenement ou en scannant le QRCode (si disponible).
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
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code secret</FormLabel>
              <FormControl>
              <div className="relative">
                <Input
                placeholder="Votre code secret"
                type={showPassword ? "text" : "password"}
                {...field}
                />
                <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3"
                onClick={() => setShowPassword((prev) => !prev)}
                >
                {showPassword ? <Eye/> : <EyeOff/>}
                </button>
              </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Rejoindre l'évènement</Button>
      </form>
    </Form>
        </CardContent>
        <CardFooter className="text-center">
            <p className="text-sm text-muted-foreground">
                En rejoignant cet évènement, vous acceptez nos{" "}
                <a href="#" className="underline">conditions d'utilisation</a> et notre{" "}
                <a href="#" className="underline">politique de confidentialité</a>.
            </p>
        </CardFooter>
    </Card>
    </div>
  )
}