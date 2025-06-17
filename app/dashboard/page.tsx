import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, UserPlus } from "lucide-react";
import prisma from "@/lib/prisma";
import {QRCodeSVG} from 'qrcode.react';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in");
  }

  const user = session?.user;

  // Récupérer le nombre d'événements créés
  const createdEventsCount = await prisma.evenement.count({
    where: {
      userId: user.id,
    },
  });

  // Récupérer les événements récents
  const recentEvents = await prisma.evenement.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3, // Limiter à 3 événements récents
  });

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-gradient-to-r from-primary/10 to-transparent p-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">Bienvenue, {user.name}. Gérez vos événements ici.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/create-event">Créer un événement</Link>
          </Button>
          </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4  mb-8">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2 bg-primary/5">
            <CardTitle className="text-sm font-medium">Événements créés</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{createdEventsCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Événements que vous avez organisés</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Événements récents</CardTitle>
            <CardDescription>Vos événements les plus récents apparaîtront ici</CardDescription>
          </div>
          {recentEvents.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/evenement/all">Voir tous</Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {recentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentEvents.map((event) => (
                <Link key={event.id} href={`/evenement/${event.id}`} className="group block">
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md h-full">
                    <div className="bg-primary/10 p-2 h-24 flex items-center justify-center">
                      <span className="text-4xl text-primary/70">{event.titre.charAt(0)}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg truncate group-hover:text-primary transition-colors">
                        {event.titre}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10 mt-1">
                        {event.description || "Pas de description"}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold bg-primary/5">
                          Code: {event.codeAcces}
                        </span>
                        <span className="ml-auto">{new Date(event.createdAt).toLocaleDateString()}</span>
                      </div>
                      {/* QR Code */}
                      <div className="mt-4 flex justify-center">
                        <QRCodeSVG
                          value={`${process.env.NEXT_PUBLIC_BASE_URL}/evenement/${event.id}`}
                          size={100}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PlusCircle className="h-8 w-8 text-primary/60" />
              </div>
              <h3 className="font-medium text-lg">Aucun événement</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">
                Vous n'avez pas encore créé d'événements. Commencez par créer votre premier événement.
              </p>
              <Button asChild>
                <Link href="/create-event">Créer un événement</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}