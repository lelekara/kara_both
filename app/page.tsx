import Image from "next/image"
import Link from "next/link"
import { QrCode, Camera, Share2, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Partagez vos souvenirs, <span className="text-peach-600">en toute simplicité</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                KaraBooth simplifie le partage de photos d'événements. Créez un album, partagez un lien ou un QR code, et
                laissez vos invités ajouter leurs plus beaux moments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-peach-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-peach-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-500"
                >
                  Créer un événement
                </Link>
                <Link
                  href="#"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-3 text-base font-medium transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-500"
                >
                  Rejoindre un événement
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/public/img/QR_code.svg"
                alt="KaraBooth App Demo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-sm font-medium">Mariage de Sophie & Thomas</p>
                  <p className="text-xs opacity-80">128 photos partagées</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
              <p className="text-gray-600">
                Créez, partagez et collectez les souvenirs de vos événements en quelques clics
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center mb-4">
                  <QrCode className="h-6 w-6 text-peach-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Créez votre événement</h3>
                <p className="text-gray-600">
                  Créez un album pour votre mariage, anniversaire ou toute autre occasion spéciale en quelques secondes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-peach-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Partagez le QR code</h3>
                <p className="text-gray-600">
                  Envoyez le lien ou affichez le QR code lors de votre événement pour que vos invités puissent y
                  accéder.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-peach-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Collectez les souvenirs</h3>
                <p className="text-gray-600">
                  Vos invités ajoutent leurs photos directement dans l'album partagé, créant une collection de souvenirs
                  unique.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="bg-peach-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Voir KaraBooth en action</h2>
                <p className="text-gray-600">
                  Scannez le QR code, accédez à l'album et ajoutez vos photos en quelques secondes. C'est aussi simple
                  que ça !
                </p>
                <div className="pt-4">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-peach-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-peach-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-500"
                  >
                    Essayer la démo
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64">
                  <Image
                    src="/placeholder.svg?height=256&width=256"
                    alt="QR Code Demo"
                    width={256}
                    height={256}
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Prêt à créer des souvenirs inoubliables ?</h2>
            <p className="text-gray-600 mb-8">
              Rejoignez des milliers d'utilisateurs qui partagent déjà leurs moments précieux avec KaraBooth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-md bg-peach-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-peach-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-500"
              >
                Créer un événement
              </Link>
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-3 text-base font-medium transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-500"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Camera className="h-5 w-5 text-peach-600" />
              <span className="text-lg font-semibold">KaraBooth</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-peach-600 transition-colors">
                Contact
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-peach-600 transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-peach-600 transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} KaraBooth. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
