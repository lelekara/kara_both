import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle, UserPlus } from "lucide-react"
import prisma from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return redirect("/sign-in")
  }

  const user = session?.user

  // Récupérer le nombre d'événements créés
  const createdEventsCount = await prisma.evenement.count({
    where: {
      userId: user.id,
    },
  })

  // Récupérer les événements récents
  const recentEvents = await prisma.evenement.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3, // Limiter à 3 événements récents
  })

  return (
    <div className="min-h-screen bg-muted/20 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground mt-1">Bienvenue, {user.name}. Gérez vos événements ici.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Événements créés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{createdEventsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Événements rejoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Que souhaitez-vous faire?</CardTitle>
          <CardDescription>Créez un nouvel événement ou rejoignez un événement existant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Créer un événement</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Créez un nouvel événement et invitez des participants
                </p>
                <Button asChild>
                  <Link href="/create-event">Créer un événement</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Rejoindre un événement</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Rejoignez un événement existant avec un code d'invitation
                </p>
                <Button asChild>
                  <Link href="/join-event">Rejoindre un événement</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Recent Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Événements récents</CardTitle>
            <CardDescription>Vos événements les plus récents apparaîtront ici</CardDescription>
          </div>
          {recentEvents.length > 0 && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/mes-evenements">Voir tous</Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {recentEvents.length > 0 ? (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              {recentEvents.map((event) => (
                <Link key={event.id} href={`/evenement/${event.id}`} className="group block">
                  <div className="overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md">
                    <div className="bg-primary/10 p-2">
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg truncate group-hover:text-primary transition-colors">
                        {event.titre}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 h-10 mt-1">
                        {event.description || "Pas de description"}
                      </p>
                      <div className="mt-3 flex items-center text-xs text-muted-foreground">
                        <span className="inline-flex items-center rounded-full border px-4 py-1 font-semibold">
                          Code: {event.codeAcces}
                        </span>
                        <span className="px-4 ml-auto">{new Date(event.createdAt).toLocaleDateString()}</span>
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
  )
}
