import Image from "next/image"
import Link from "next/link"
import { QrCode, Share2, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col ">
      <main className="flex-1">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
          Partagez vos souvenirs, <span className="underline decoration-wavy decoration-orange-400">en toute simplicité</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-lg font-medium">
          KaraBooth simplifie le partage de photos d'événements. Créez un album, partagez un lien ou un QR code, et laissez vos invités ajouter leurs plus beaux moments.
          </p>
          <div className="flex flex-col gap-4 pt-6">
          <Link
            href="/create-event"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:scale-105 transition-transform"
          >
            Créer un événement
          </Link>
{/*           <Link
            href="/join-event"
            className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-orange-200 bg-white px-8 py-4 text-lg font-semibold text-orange-500 shadow hover:bg-orange-50 hover:scale-105 transition-transform"
          >
            Rejoindre un événement
          </Link> */}
          </div>
        </div>
        <div className="relative h-[730px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-100">
          <Image
          src="/SophieEtThomas.png"
          width={730}
          height={600}
          quality={100}
          alt="KaraBooth App Demo"
          className="object-cover w-full h-full scale-105"
          priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
          <div className="text-white">
            <p className="text-lg font-bold">Mariage de Sophie & Thomas</p>
            <p className="text-sm opacity-80">128 photos partagées</p>
          </div>
          </div>
        </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-r from-orange-50 via-white to-pink-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold mb-4 text-orange-500">Comment ça marche</h2>
          <p className="text-lg text-gray-700">
          Créez, partagez et collectez les souvenirs de vos événements en quelques clics
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-orange-400">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 shadow">
            <QrCode className="h-8 w-8 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-orange-500">Créez votre événement</h3>
          <p className="text-gray-600 text-base">
            Créez un album pour votre mariage, anniversaire ou toute autre occasion spéciale en quelques secondes.
          </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-pink-400">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 shadow">
            <Share2 className="h-8 w-8 text-pink-500" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-pink-500">Partagez le QR code</h3>
          <p className="text-gray-600 text-base">
            Envoyez le lien ou affichez le QR code lors de votre événement pour que vos invités puissent y accéder.
          </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border-t-4 border-yellow-400">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6 shadow">
            <Users className="h-8 w-8 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-yellow-500">Collectez les souvenirs</h3>
          <p className="text-gray-600 text-base">
            Vos invités ajoutent leurs photos directement dans l'album partagé, créant une collection de souvenirs unique.
          </p>
          </div>
        </div>
        </div>
      </section>

      {/* Demo Section
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="bg-gradient-to-br from-orange-100 via-white to-pink-100 rounded-3xl p-12 md:p-16 shadow-2xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-orange-500">Voir KaraBooth en action</h2>
          <p className="text-lg text-gray-700">
            Scannez le QR code, accédez à l'album et ajoutez vos photos en quelques secondes. C'est aussi simple que ça !
          </p>
          <div className="pt-4">
            <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:scale-105 transition-transform"
            >
            Essayer la démo
            </Link>
          </div>
          </div>
          <div className="flex justify-center">
          <div className="relative w-64 h-64 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-orange-100">
            <Image
            src="/QR_code.svg"
            alt="QR Code Demo"
            width={256}
            height={256}
            className="rounded-lg shadow-md"
            />
          </div>
          </div>
        </div>
        </div>
      </section> */}

      {/* Call to action */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
        <h2 className="text-4xl font-extrabold mb-4 text-white drop-shadow-lg">Prêt à créer des souvenirs inoubliables ?</h2>
        <p className="text-lg text-white/90 mb-10 font-medium">
          Rejoignez des milliers d'utilisateurs qui partagent déjà leurs moments précieux avec KaraBooth.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
          href="/create-event"
          className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-500 shadow-lg hover:bg-orange-50 hover:scale-105 transition-transform"
          >
          Créer un événement
          </Link>
          <Link
          href="https://lelekara.github.io/portfolio/"
          className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-white bg-transparent px-8 py-4 text-lg font-bold text-white shadow hover:bg-white/10 hover:scale-105 transition-transform"
          >
          En savoir plus
          </Link>
        </div>
        </div>
      </section>
      </main>
    </div>
  )
}
