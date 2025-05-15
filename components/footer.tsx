import { Camera } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-50 via-white to-pink-50 py-10 md:py-6 border-t border-orange-100 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">

              <Camera className="h-6 w-6 " />
 
            <span className="font-extrabold text-lg bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              KaraBooth
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="mailto:lelekara.dev@gmail.com" className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">
              Contact
            </Link>
            <Link href="https://github.com/lelekara" className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">
              GitHub
            </Link>
            <Link href="#" className="text-sm font-semibold text-gray-600 hover:text-orange-500 transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            KaraBooth
          </span>
          . Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
