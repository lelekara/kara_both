import { Camera, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function NavBar() {

  const session = await auth.api.getSession({
    headers: await headers(),
})

  return (
    <div className="border-b px-4">
      <div className="flex items-center justify-between mx-auto max-w-4xl h-16">
        <Link href="/" className="flex items-center gap-2">
          <Camera className="h-6 w-6"/>
            <span className="font-bold text-lg">KaraBooth</span>
        </Link>
        <div className="flex gap-4">
        {
                  session ? (
                    <form action={async () => {
                      'use server'
                      await auth.api.signOut({
                        headers: await headers(),
                      });
                      redirect('/sign-in')
                    }}>
                      <Button type="button" variant={"link"} className=""><Link href={"/dashboard"}>Dashboard</Link></Button>
                      <Button type='submit'><LogOut/>Déconnexion</Button>
                    </form>
                  ) : (
                    <Link href='/sign-in' className={buttonVariants({ variant: 'ghost' })}>
                      Connexion
                    </Link>
                  )
                }
        </div>
      </div>
    </div>
  );
}
