import { Camera} from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 md:py-5 border-t border-gray-200">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Camera className="h-5 w-5 text-orange-500" />
          <span className="text-lg font-semibold">KaraBooth</span>
        </div>
        <div className="flex gap-6">
          <Link href="mailto:lelekara.dev@gmail.com" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
            Contact
          </Link>
          <Link href="https://github.com/lelekara" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
            GitHub
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-orange-500 transition-colors">
            Confidentialité
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} KaraBooth. Tous droits réservés.
      </div>
    </div>
  </footer>
  )
}
