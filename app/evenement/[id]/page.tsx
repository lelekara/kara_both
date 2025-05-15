import DropZone from '@/components/dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

interface EventPageParams {
  id: string
}

export default async function EventPage({ params }: { params: Promise<EventPageParams> }) {
  // Attendre explicitement les paramètres
  const { id } = await params

  // Vérifier si l'utilisateur est connecté
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // Récupérer l'utilisateur
  const user = session?.user

  // Récupérer l'événement
  const evenement = await prisma.evenement.findUnique({
    where: {
      id,
    },
  })

  if (!evenement) {
    return redirect('/404') // Rediriger si l'événement n'existe pas
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl shadow-2xl rounded-3xl border-0 bg-white/90 backdrop-blur-md">
        <CardHeader className="flex flex-col items-center justify-center gap-2 pb-0 rounded-t-3xl">
          <CardTitle>
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg text-center">
              {evenement.titre}
            </h1>
          </CardTitle>
          <CardDescription>
            <h2 className="text-lg text-gray-600 text-center">{evenement.description}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-6 py-6">
            <DropZone evenementId={evenement.id} />
            <span className="text-sm text-gray-400">Glissez et déposez vos photos ici</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full h-14 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg transition-all duration-200 text-lg">
            <a href={`/evenement/${evenement.id}/photos`} className="w-full h-full block text-center">
              Voir les photos
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
