import React from 'react'
import prisma from '@/lib/prisma'
import Image from 'next/image'

export default async function PicturePage({ params }: { params: { id: string } }) {
  // Récupérer les photos de l'événement
  const photos = await prisma.photo.findMany({
    where: {
      evenementId: params.id,
    },
    orderBy: {
      createdAt: 'desc', // Trier par date de création
    },
  })

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Galerie des photos</h1>
      {photos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative w-full h-64 border rounded-lg overflow-hidden">
              <Image
                src={photo.url}
                alt="Photo de l'événement"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Aucune photo disponible pour cet événement.</p>
      )}
    </div>
  )
}
