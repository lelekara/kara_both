import React from 'react'
import prisma from "@/lib/prisma";
import Link from "next/link";
import { QRCodeSVG } from 'qrcode.react';

export default async function seeAllPAge() {
  const evenements = await prisma.evenement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Tous les événements</h1>
      <ul className="space-y-4">
        {evenements.length === 0 && <li>Aucun événement trouvé.</li>}
        {evenements.map((event) => (
          <Link key={event.id} href={`/evenement/${event.id}`} className="block">
            <li className="p-4 border rounded-lg bg-white shadow hover:bg-orange-50 transition-colors cursor-pointer flex items-center justify-between gap-4">
              <div>
                <div className="text-lg font-semibold">{event.titre || "Événement sans titre"}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {event.date ? new Date(event.date).toLocaleDateString("fr-FR") : "Date inconnue"}
                </div>
                {event.description && (
                  <div className="mt-2 text-gray-700 text-sm">{event.description}</div>
                )}
              </div>
              <QRCodeSVG
                value={`${process.env.NEXT_PUBLIC_BASE_URL}/evenement/${event.id}`}
                size={100}
                className="rounded-lg shrink-0"
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
