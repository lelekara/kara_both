import prisma from "@/lib/prisma";
import Image from "next/image";
import { Camera, Calendar, ImageOff } from "lucide-react";
import ButtonDownload from "@/components/buttondonwload";
import { redirect } from "next/navigation";
import LazyImage from "@/components/LazyImage";

const PHOTOS_PER_PAGE = 12;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const getPhotoUrl = (photoUrl: string) =>
  `${supabaseUrl}/storage/v1/object/public${photoUrl}`;

export default async function PicturePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam) > 0 ? Number(pageParam) : 1;
  const skip = (page - 1) * PHOTOS_PER_PAGE;

  // Récupérer les photos paginées
  const [photos, totalPhotos] = await Promise.all([
    prisma.photo.findMany({
      where: { evenementId: id },
      orderBy: { createdAt: "desc" },
      include: { evenement: true },
      skip,
      take: PHOTOS_PER_PAGE,
    }),
    prisma.photo.count({ where: { evenementId: id } }),
  ]);

  // Récupérer toutes les photos pour le téléchargement
  const allPhotos = await prisma.photo.findMany({
    where: { evenementId: id },
    orderBy: { createdAt: "desc" },
  });

  // Récupérer les informations de l'événement (pour le titre)
  const eventInfo =
    photos[0]?.evenement ||
    (await prisma.evenement.findUnique({ where: { id } })) ||
    null;

  // Si l'événement n'existe pas
  if (!eventInfo) return redirect("/404");

  const totalPages = Math.ceil(totalPhotos / PHOTOS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-400 rounded-full p-2 shadow-lg">
                  <Camera className="h-6 w-6 text-white" />
                </span>
                <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg uppercase tracking-wide">
                  Galerie photo : {eventInfo?.titre}
                </span>
              </div>
              {eventInfo && eventInfo.date && (
                <div className="flex items-center gap-2 text-gray-500 font-medium">
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
            </div>
          </div>
        </header>

        {photos.length > 0 ? (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 via-white to-pink-50 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <LazyImage
                    src={getPhotoUrl(photo.url) || "/placeholder.svg"}
                    alt={"Photo de l'événement"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={photos.indexOf(photo) < 4}
                  />
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-10">
                <a
                  href={`?page=${page - 1}`}
                  className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                    page <= 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg hover:scale-105"
                  }`}
                  aria-disabled={page <= 1}
                  tabIndex={page <= 1 ? -1 : 0}
                >
                  Précédent
                </a>
                <span className="px-4 py-2 text-orange-500 font-bold">
                  Page {page} / {totalPages}
                </span>
                <a
                  href={`?page=${page + 1}`}
                  className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                    page >= totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg hover:scale-105"
                  }`}
                  aria-disabled={page >= totalPages}
                  tabIndex={page >= totalPages ? -1 : 0}
                >
                  Suivant
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 bg-white/90 backdrop-blur-md rounded-3xl border-0 shadow-2xl text-center">
            <ImageOff className="h-16 w-16 text-pink-300 mb-4" />
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent mb-2">
              Aucune photo disponible
            </h3>
            <p className="text-gray-500 max-w-md">
              Aucune photo n&apos;a encore été ajoutée pour cet événement. Revenez
              plus tard ou contactez l&apos;organisateur.
            </p>
          </div>
        )}
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <ButtonDownload photos={allPhotos} eventName={eventInfo?.titre} />
      </div>
    </div>
  );
}