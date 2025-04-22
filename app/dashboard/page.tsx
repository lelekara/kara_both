import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default  async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
      });
    
      if (!session) {
        return redirect("/sign-in");
      }
    
      const user = session?.user;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Bienvenue {user.name} vous souhaitez créer ou rejoindre un évenement?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mx-auto max-w-4xl gap-4">
            <div>
                <Button variant="outline" className="w-full">
                    <Link href="/create-event">
                    <span className="text-sm">Créer un évenement</span>
                    </Link>
                </Button>
            </div>
            <div>
                <Button variant="outline" className="w-full">
                    <Link href="/join-event">
                    <span className="text-sm">Rejoindre un évenement</span>
                    </Link>
                </Button>
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Voulez vous vous déconnecter? {" "}
          </p>
          <form
            action={async () => {
              "use server";
              await auth.api.signOut({
                headers: await headers(),
              });
              redirect("/sign-in");
            }}
          >
            <Button variant="link" type="submit" className="w-full">
              Déconnexion
            </Button>
          </form>

      </CardFooter>
    </Card>
  </div>
  );
}
