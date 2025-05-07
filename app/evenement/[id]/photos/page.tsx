import prisma from "@/lib/prisma";
import Image from "next/image";
import { Camera, Calendar, ImageOff } from "lucide-react";
import ButtonDownload from "@/components/buttondonwload";

export default async function PicturePage({ params }: { params: { id: string } }) {
  // Récupérer les photos de l'événement
  const photos = await prisma.photo.findMany({
    where: {
      evenementId: params.id,
    },
    orderBy: {
      createdAt: "desc", // Trier par date de création
    },
    include: {
      evenement: true, // Inclure les informations de l'événement
    },
  });

  // Récupérer les informations de l'événement (pour le titre)
  const eventInfo = photos[0]?.evenement || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/10 to-muted/30 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Camera className="h-5 w-5" />
            <span className="text-xl font-medium uppercase tracking-wide">Galerie photo : {eventInfo.titre}</span>
          </div>
          {eventInfo && eventInfo.date && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <time dateTime={new Date(eventInfo.date).toISOString()}>
                {new Date(eventInfo.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          )}
        </header>

        {photos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted/20 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={photo.url || "/placeholder.svg"}
                  alt={photo.description || "Photo de l'événement"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={photos.indexOf(photo) < 4} // Prioritize loading for first 4 images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  {photo.description && (
                    <p className="text-white text-sm font-medium line-clamp-2">{photo.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-muted/10 rounded-xl border border-muted text-center">
            <ImageOff className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Aucune photo disponible</h3>
            <p className="text-muted-foreground max-w-md">
              Aucune photo n'a encore été ajoutée pour cet événement. Revenez plus tard ou contactez l'organisateur.
            </p>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ButtonDownload photos={photos} eventName={eventInfo?.nom} />
      </div>
    </div>
  );
}