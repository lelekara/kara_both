import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const data = await req.formData()
    const files = data.getAll('files') as File[]
    const evenementId = data.get('evenementId') as string

    if (!files || files.length === 0 || !evenementId) {
      return NextResponse.json({ error: 'Fichiers et ID de l\'événement requis' }, { status: 400 })
    }

    const evenement = await prisma.evenement.findUnique({
      where: { id: evenementId },
    })

    if (!evenement) {
      return NextResponse.json({ error: 'Événement introuvable' }, { status: 404 })
    }

    const eventTitle = evenement.titre.replace(/[^a-zA-Z0-9]/g, '_')
    const uploadsDir = path.join(process.cwd(), 'public/uploads', eventTitle)
    await fs.mkdir(uploadsDir, { recursive: true })

    const uploadedPhotos = []

    for (const file of files) {
      const filePath = path.join(uploadsDir, file.name)
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      await fs.writeFile(filePath, fileBuffer)

      const photo = await prisma.photo.create({
        data: {
          url: `/uploads/${eventTitle}/${file.name}`,
          evenementId: evenementId,
        },
      })

      uploadedPhotos.push(photo)
    }

    return NextResponse.json({ message: 'Photos téléchargées avec succès', photos: uploadedPhotos })
  } catch (error) {
    console.error('Erreur lors du téléchargement des photos :', error)
    return NextResponse.json({ error: 'Erreur lors du téléchargement des photos' }, { status: 500 })
  }
}