import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const { url, evenementId, nom, prenom, userId } = await req.json()
  if (!url || !evenementId) {
    return NextResponse.json({ error: 'url et evenementId requis' }, { status: 400 })
  }
  const photo = await prisma.photo.create({
    data: {
      url,
      evenementId,
      nom,
      prenom,
      userId,
    },
  })
  return NextResponse.json({ photo })
}