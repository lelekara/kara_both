"use client"
import { CloudUploadIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import imageCompression from 'browser-image-compression'
import { supabase } from '../lib/supabase'

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

    setUploading(true)
    try {
      const uploadedFileNames: string[] = []
      for (const file of processedFiles) {
        // Nettoyer le nom du fichier pour Supabase Storage
        const cleanName = file.name
          .normalize('NFD')
          .replace(/[^a-zA-Z0-9.\-_]/g, '_');
        // 1. Upload vers Supabase Storage
        const { data, error } = await supabase.storage
          .from('uploads')
          .upload(`${evenementId}/${cleanName}`, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type,
          })
        if (error) {
          throw error
        }
        // 2. Enregistrement du chemin dans la DB via l'API
        const chemin = `/uploads/${evenementId}/${cleanName}`;
        const res = await fetch('/api/photos/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: chemin,
            evenementId,
            // tu peux ajouter d'autres infos si besoin (nom, userId, etc)
          }),
        });
        if (!res.ok) {
          throw new Error('Erreur lors de l\'enregistrement en base');
        }
        uploadedFileNames.push(cleanName)
      }
      alert(`Fichiers téléchargés avec succès`)
      setUploadedFiles((prev) => [...prev, ...uploadedFileNames])
    } catch (error: any) {
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
