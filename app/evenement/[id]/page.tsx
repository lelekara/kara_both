import DropZone from '@/components/dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function EventPage({
  params,
}: {
  params: { id: string }
}) {
  // Vérifier si l'utilisateur est connecté
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect('/sign-in')
  }

  // Récupérer l'utilisateur
  const user = session?.user

  // Récupérer l'événement
  const evenement = await prisma.evenement.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!evenement) {
    return redirect('/404') // Rediriger si l'événement n'existe pas
  }

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <Card className='w-full max-w-2xl mx-auto'>
        <CardHeader className="flex flex-col items-center justify-center">
          <CardTitle>
            <h1 className="text-4xl">{evenement.titre}</h1>
          </CardTitle>
          <CardDescription>
            <h2 className="text-xl">{evenement.description}</h2>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center">
            {/* Passer l'ID de l'événement à DropZone */}
            <DropZone evenementId={evenement.id} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full'>
            <a href={`/evenement/${evenement.id}/photos`} >Voir les photos</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
