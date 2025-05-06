"use client"
import { CloudUploadIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'

interface DropzoneProps {
  evenementId: string
}

export default function Dropzone({ evenementId }: DropzoneProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) // Convertir FileList en tableau

      const formData = new FormData()
      files.forEach((file) => {
        // Vérifier si chaque fichier est une image
        if (!file.type.startsWith("image/")) {
          alert("Veuillez déposer uniquement des fichiers image.")
          return
        }
        formData.append('files', file) // Ajouter chaque fichier au FormData
      })

      formData.append('evenementId', evenementId) // Ajouter l'ID de l'événement

      setUploading(true)

      try {
        const response = await fetch('/api/photos/uploads', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (response.ok) {
          alert(`Fichiers téléchargés avec succès : ${result.photos.map((photo: any) => photo.url).join(', ')}`)
        } else {
          alert(`Erreur : ${result.error}`)
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement :', error)
        alert('Erreur lors du téléchargement des fichiers.')
      } finally {
        setUploading(false)
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 border-2 border-dashed rounded-lg bg-muted/20">
      <CloudUploadIcon className="w-12 h-12 text-muted-foreground" />
      <p className="mt-2 text-sm text-muted-foreground">Glissez et déposez vos photos ici</p>
      <Button
        variant="outline"
        className="mt-4"
        onClick={() => document.getElementById('fileInput')?.click()}
        disabled={uploading}
      >
        {uploading ? 'Téléchargement...' : 'Choisir des photos'}
      </Button>
      <input
        id="fileInput"
        type="file"
        accept="image/*" // Accepter uniquement les fichiers image
        multiple // Permettre la sélection de plusieurs fichiers
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
