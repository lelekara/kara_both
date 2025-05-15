"use client"
import { CloudUploadIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import imageCompression from 'browser-image-compression'

interface DropzoneProps {
  evenementId: string
}

export default function Dropzone({ evenementId }: DropzoneProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]) // État pour stocker les fichiers téléchargés

  const handleFiles = async (files: FileList | File[]) => {
    const options = {
      maxWidthOrHeight: 1920,
      maxSizeMB: 2, // optionnel, limite la taille finale
      initialQuality: 0.8, // commence à 80% de qualité
      useWebWorker: true,
      fileType: 'image/jpeg', // force la conversion en JPEG
      exifOrientation: undefined, // supprime les EXIF (undefined au lieu de null)
    }

    const processedFiles = []
    for (const file of files) {
      // Optionnel : ne traiter que les images
      if (!file.type.startsWith('image/')) continue

      const compressedFile = await imageCompression(file, options)
      processedFiles.push(compressedFile)
    }

    const formData = new FormData()
    processedFiles.forEach((file) => {
      formData.append('photo', file) // Ajouter chaque fichier au FormData
    })

    formData.append('evenementId', evenementId) // Ajouter l'ID de l'événement
    console.log('FormData:', evenementId)

    setUploading(true)

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}?evenementId=${evenementId}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Fichiers téléchargés avec succès`)
        // Mettre à jour l'état avec les noms des fichiers téléchargés
        const uploadedFileNames = processedFiles.map((file) => file.name)
        setUploadedFiles((prev) => [...prev, ...uploadedFileNames])
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) // Convertir FileList en tableau
      await handleFiles(files)
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
      <div className="mt-4">
        <h3 className="text-sm font-semibold">Fichiers téléchargés :</h3>
        <ul className="mt-2 text-sm text-muted-foreground">
          {uploadedFiles.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
